// @ts-nocheck
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

console.log("OmniDimension Webhook Function Booted!");

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
        // Use SERVICE_ROLE_KEY to bypass any Row Level Security (RLS) rules
        const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || Deno.env.get('SUPABASE_ANON_KEY') || '';
        const supabase = createClient(supabaseUrl, supabaseKey);

        const payload = await req.json();
        console.log("Received Webhook Payload:", JSON.stringify(payload, null, 2));

        // Deep-scan for nested analytics: Real Omni calls embed everything inside `call_report`
        const report = payload.call_report || {};

        // Safely extract core data regardless of exact structural variations
        const phoneNumber = payload.call?.phone_number || payload.phone_number || payload.caller_number || "+1234567890";
        const callStatus = payload.call?.status || payload.call_status || payload.status || "completed";
        
        const summary = report.summary || payload.summary || payload.call_summary || payload.transcript || "No summary provided.";
        const sentiment = report.sentiment || payload.sentiment || "Neutral";
        
        const rawConvo = report.full_conversation || payload.full_conversation || payload.transcript;
        // Convert to object so it securely stores in JSONB without breaking if it's a string
        const fullConversation = typeof rawConvo === 'string' 
            ? { transcript: rawConvo } 
            : (rawConvo || { transcript: "No transcript provided." });
        
        const extractedVars = report.extracted_variables || payload.extracted_variables || payload.extracted_information || {};

        // Extracted Variable Keys we expect to exist:
        const callIntent = (extractedVars.call_intent || '').toLowerCase();
        const patientName = extractedVars.patient_name || 'Anonymous';
        const queryText = extractedVars.query_text || summary;
        
        // 1. ALWAYS LOG THE CALL to `call_logs` table AND RETRIEVE ITS ID
        const { data: callLogData, error: logError } = await supabase
            .from('call_logs')
            .insert({
                phone_number: phoneNumber,
                call_status: callStatus,
                call_summary: summary,
                sentiment: sentiment,
                extracted_variables: extractedVars,
                full_conversation: fullConversation
            })
            .select('id')
            .single();

        if (logError) {
            console.error("Error inserting call log:", logError);
            throw new Error(`Call Logs Insertion Failed: ${logError.message}`);
        }

        const callLogId = callLogData?.id;

        // Detect if this is the OmniDimension "Test Webhook" dummy payload
        // Even if the user deletes variables from Omni settings, we can detect the test webhook by its hardcoded default signature
        const isOmniTestPayload = 
            callIntent.includes("test value") || 
            JSON.stringify(extractedVars).toLowerCase().includes("test value") ||
            (phoneNumber === "+1234567890" && summary === "No summary provided.");

        // 2. APPOINTMENTS TABLE LOGIC (Booking vs Cancelling)
        if (isOmniTestPayload || callIntent.includes('book') || callIntent.includes('appointment')) {
            await supabase
                .from('appointments')
                .insert({
                    patient_name: patientName,
                    phone_number: phoneNumber,
                    preferred_date: extractedVars.appointment_date || 'TBD',
                    preferred_time: extractedVars.appointment_time || 'TBD',
                    branch_name: extractedVars.branch || 'Main Clinic',
                    treatment_type: extractedVars.treatment_type || 'General Checkup',
                    reason_for_visit: extractedVars.query_text || '',
                    status: 'confirmed',
                    call_log_id: callLogId
                });
        } 
        
        // Handle intelligent automatic appointment deletion / cancellation
        if (callIntent.includes('cancel') || callIntent.includes('delete')) {
            await supabase
                .from('appointments')
                .delete()
                .eq('phone_number', phoneNumber);
        }

        // 3. PATIENT QUERIES TABLE LOGIC
        if (isOmniTestPayload || callIntent.includes('query') || callIntent.includes('general') || callIntent.includes('question')) {
            // Determine emergency flag
            const emergencyValue = String(extractedVars.emergency_flag || '').toLowerCase();
            const isEmergency = emergencyValue === 'true' || emergencyValue === 'yes' || emergencyValue.includes('emergency');
            const category = isEmergency ? 'Emergency' : 'General';

            await supabase
                .from('patient_queries')
                .insert({
                    patient_name: patientName,
                    phone_number: phoneNumber,
                    query_text: queryText,
                    category: category,
                    call_log_id: callLogId
                });
        }

        return new Response(JSON.stringify({ success: true, message: "Webhook successfully processed." }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
        })

    } catch (error) {
        console.error('Webhook processing failure:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 500,
        });
    }
})
