import { useState } from 'react';
import { Phone, ShieldCheck, CheckCircle, CheckCircle2, Star, HelpCircle, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DecryptedText from '../components/DecryptedText';
import FormSuccessScreen from '../components/FormSuccessScreen';
import { supabase } from '../lib/supabaseClient';

const inputClass =
    'w-full bg-brand-bg/30 border border-brand-border/60 hover:bg-brand-bg/50 hover:border-brand-border backdrop-blur-sm rounded-lg px-4 py-3.5 text-brand-text focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:ring-offset-2 focus:ring-offset-brand-bg transition-all';

const selectClass =
    'w-full bg-brand-bg/30 border border-brand-border/60 hover:bg-brand-bg/50 hover:border-brand-border backdrop-blur-sm rounded-lg px-4 py-3.5 text-brand-text focus:outline-none focus:ring-2 focus:ring-accent-purple/50 focus:ring-offset-2 focus:ring-offset-brand-bg transition-all appearance-none cursor-pointer';

const plans = [
    {
        id: 'essential',
        name: 'Essential',
        monthly: '₹5,000',
        minutes: '200 mins/mo free',
        overage: '₹40 / min overage',
        setup: '₹20,000 one-time setup',
        features: [
            '1 AI Receptionist',
            'Dedicated Phone Number',
            'Appointment Booking',
            'Email Notifications',
            'Basic Support',
        ],
        popular: false,
    },
    {
        id: 'excel-integration',
        name: 'Excel Integration',
        monthly: '₹6,000',
        minutes: '200 mins/mo free',
        overage: '₹40 / min overage',
        setup: '₹20,000 one-time setup',
        features: [
            'All Essential Features',
            'Direct Excel Integration',
            'Automated Data Entry',
            'Custom Caller Routing',
            'Priority Support',
        ],
        popular: false,
    },
    {
        id: 'dashboard-pro',
        name: 'Dashboard Pro',
        monthly: '₹7,500',
        minutes: '400 mins/mo free',
        overage: '₹35 / min overage',
        setup: '₹25,000 one-time setup',
        features: [
            'Live Call Summary Dashboard',
            'Transcripts & Recordings',
            'Custom Script & Persona',
            'Full Call Analytics',
            'Account Manager',
        ],
        popular: true,
    },
    {
        id: 'custom-enterprise',
        name: 'Fully Custom',
        monthly: 'Custom',
        minutes: 'Custom Volume',
        overage: 'Negotiated',
        setup: 'Custom bespoke setup',
        features: [
            'Unlimited Receptionists',
            'Custom CRM/EHR Integrations',
            'Bespoke AI Development',
            'Dedicated Infrastructure',
            '24/7 Priority SLA Support',
        ],
        popular: false,
    },
];

const faqs = [
    {
        q: "Will my patients know they're speaking to an AI?",
        a: 'Our receptionists are designed to sound warm, natural, and professional. We recommend transparent disclosure — most patients appreciate an instant response over being put on hold. For complex or sensitive conversations, the AI hands off to your human staff seamlessly.',
    },
    {
        q: 'What happens outside office hours and on weekends?',
        a: 'Your AI receptionist is always on — 24 hours a day, 7 days a week, including public holidays. Every call after closing time is handled exactly the same as during business hours. No missed calls, no voicemail.',
    },
    {
        q: 'How long does it take to go live?',
        a: 'Most clients are fully live within 5 business days of signing up. We handle all the technical configuration, script writing, and testing. You simply review the final result before we switch it on.',
    },
    {
        q: 'Do I need any technical knowledge?',
        a: 'None at all. We manage everything from setup to ongoing maintenance. Your only job is to tell us about your practice — we handle the rest.',
    },
    {
        q: 'Can I cancel my subscription?',
        a: 'Yes. All plans require 30 days written notice to cancel. There are no lock-in contracts or cancellation penalties. We keep clients because the service works, not because we trap them.',
    },
    {
        q: 'What types of businesses does this work for?',
        a: 'Any business that receives inbound calls and books appointments — including dental clinics, medical offices, real estate agencies, law firms, salons, and physiotherapy studios. If your team answers repetitive phone calls, we can automate it.',
    },
];

const smoothScroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

const AnimatedWaveform = () => {
    return (
        <div className="flex items-center gap-1 h-12">
            {[...Array(9)].map((_, i) => (
                <motion.div
                    key={i}
                    className="w-1.5 bg-accent-blue rounded-full"
                    animate={{
                        height: ['20%', '100%', '20%']
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.1
                    }}
                />
            ))}
        </div>
    );
};

const BREVO_API_KEY = import.meta.env.VITE_BREVO_API_KEY as string;
const SENDER_EMAIL = import.meta.env.VITE_BREVO_SENDER_EMAIL as string;

const AIVoiceReceptionist = () => {
    const [quickCall, setQuickCall] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<string>('dashboard-pro');
    const [contactForPricing, setContactForPricing] = useState(false);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const [demoPhone, setDemoPhone] = useState('');
    const [demoState, setDemoState] = useState<'idle' | 'calling' | 'connected'>('idle');

    // ── form fields ──
    const [formData, setFormData] = useState({
        quickName: '', quickPhone: '',
        practiceName: '', contactName: '', email: '', phone: '',
        industry: '', goal: '', callVolume: '', currentSetup: '',
    });
    const [submitState, setSubmitState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [submitted, setSubmitted] = useState(false);

    const setField = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
        setFormData(prev => ({ ...prev, [key]: e.target.value }));

    const handleDemoCall = (e: React.FormEvent) => {
        e.preventDefault();
        if (!demoPhone) return;
        setDemoState('calling');
        setTimeout(() => setDemoState('connected'), 3000);
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitState('sending');

        const chosenPlan = contactForPricing
            ? 'Not sure – wants to discuss pricing'
            : plans.find(p => p.id === selectedPlan)?.name ?? selectedPlan;


        const htmlBody = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f7;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f7;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;border-radius:12px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,0.10);">

        <!-- Header strip -->
        <tr><td style="background:#1a1a2e;padding:0;"><div style="height:5px;background:linear-gradient(90deg,#6c3fc5,#00c2ff);"></div></td></tr>

        <!-- Header -->
        <tr>
          <td style="background:#1a1a2e;padding:36px 40px 28px;text-align:center;">
            <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:4px;text-transform:uppercase;color:#8b5cf6;">Maikus AI — Internal Notification</p>
            <h1 style="margin:0;font-size:24px;font-weight:800;color:#ffffff;">New AI Voice Receptionist Request</h1>
            <p style="margin:10px 0 0;font-size:13px;color:#94a3b8;">A client has submitted a service request via the website</p>
          </td>
        </tr>

        <!-- Alert bar -->
        <tr>
          <td style="background:#1e2235;padding:14px 40px;border-top:1px solid rgba(255,255,255,0.06);">
            <p style="margin:0;font-size:12px;font-weight:700;color:#f59e0b;letter-spacing:1.5px;text-transform:uppercase;">ACTION REQUIRED — Respond within 24 hours</p>
          </td>
        </tr>

        <!-- Service label -->
        <tr>
          <td style="background:#ffffff;padding:24px 40px 8px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="background:#ede9fe;border-left:4px solid #7c3aed;border-radius:0 6px 6px 0;padding:12px 16px;">
                  <p style="margin:0 0 2px;font-size:11px;font-weight:700;color:#7c3aed;text-transform:uppercase;letter-spacing:1px;">Service Requested</p>
                  <p style="margin:0;font-size:16px;font-weight:700;color:#3b0764;">AI Voice Receptionist</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        ${quickCall ? `
        <!-- Quick Call --->
        <tr>
          <td style="background:#ffffff;padding:24px 40px 32px;">
            <p style="margin:0 0 16px;font-size:13px;font-weight:700;color:#374151;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid #e5e7eb;padding-bottom:10px;">Client Details</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;">
                  <p style="margin:0 0 2px;font-size:11px;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;">Name</p>
                  <p style="margin:0;font-size:16px;font-weight:600;color:#111827;">${formData.quickName}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;">
                  <p style="margin:0 0 2px;font-size:11px;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;">Phone / WhatsApp</p>
                  <p style="margin:0;font-size:20px;font-weight:700;color:#7c3aed;">${formData.quickPhone}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        ` : `
        <!-- Full Details -->
        <tr>
          <td style="background:#ffffff;padding:24px 40px 8px;">
            <p style="margin:0 0 16px;font-size:13px;font-weight:700;color:#374151;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid #e5e7eb;padding-bottom:10px;">Practice / Business Details</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td width="50%" style="padding:8px 16px 8px 0;vertical-align:top;">
                  <p style="margin:0 0 2px;font-size:11px;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;">Practice / Business</p>
                  <p style="margin:0;font-size:15px;font-weight:600;color:#111827;">${formData.practiceName}</p>
                </td>
                <td width="50%" style="padding:8px 0;vertical-align:top;">
                  <p style="margin:0 0 2px;font-size:11px;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;">Contact Person</p>
                  <p style="margin:0;font-size:15px;font-weight:600;color:#111827;">${formData.contactName}</p>
                </td>
              </tr>
              <tr>
                <td width="50%" style="padding:8px 16px 8px 0;vertical-align:top;border-top:1px solid #f3f4f6;">
                  <p style="margin:0 0 2px;font-size:11px;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;">Email</p>
                  <p style="margin:0;"><a href="mailto:${formData.email}" style="font-size:14px;font-weight:600;color:#7c3aed;text-decoration:none;">${formData.email}</a></p>
                </td>
                <td width="50%" style="padding:8px 0;vertical-align:top;border-top:1px solid #f3f4f6;">
                  <p style="margin:0 0 2px;font-size:11px;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;">Phone / WhatsApp</p>
                  <p style="margin:0;font-size:15px;font-weight:700;color:#7c3aed;">${formData.phone}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background:#ffffff;padding:16px 40px 8px;">
            <p style="margin:0 0 16px;font-size:13px;font-weight:700;color:#374151;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid #e5e7eb;padding-bottom:10px;">Call Requirements</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td width="50%" style="padding:8px 16px 8px 0;vertical-align:top;">
                  <p style="margin:0 0 2px;font-size:11px;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;">Industry</p>
                  <p style="margin:0;font-size:15px;font-weight:600;color:#111827;">${formData.industry}</p>
                </td>
                <td width="50%" style="padding:8px 0;vertical-align:top;">
                  <p style="margin:0 0 2px;font-size:11px;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;">Primary Goal</p>
                  <p style="margin:0;font-size:15px;font-weight:600;color:#111827;">${formData.goal}</p>
                </td>
              </tr>
              <tr>
                <td width="50%" style="padding:8px 16px 8px 0;vertical-align:top;border-top:1px solid #f3f4f6;">
                  <p style="margin:0 0 2px;font-size:11px;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;">Monthly Call Volume</p>
                  <p style="margin:0;font-size:15px;font-weight:600;color:#111827;">${formData.callVolume}</p>
                </td>
                <td width="50%" style="padding:8px 0;vertical-align:top;border-top:1px solid #f3f4f6;">
                  <p style="margin:0 0 2px;font-size:11px;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;">Current Setup</p>
                  <p style="margin:0;font-size:15px;font-weight:600;color:#111827;">${formData.currentSetup}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background:#ffffff;padding:16px 40px 32px;">
            <p style="margin:0 0 12px;font-size:13px;font-weight:700;color:#374151;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid #e5e7eb;padding-bottom:10px;">Plan Selected</p>
            <div style="display:inline-block;background:#ede9fe;border:1px solid #c4b5fd;border-radius:8px;padding:10px 20px;">
              <p style="margin:0;font-size:17px;font-weight:800;color:#5b21b6;">${chosenPlan}</p>
            </div>
          </td>
        </tr>
        `}

        <!-- Footer -->
        <tr>
          <td style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:20px 40px;text-align:center;">
            <p style="margin:0;color:#9ca3af;font-size:12px;">Auto-generated by the Maikus AI website. Do not reply to this email.</p>
            <p style="margin:6px 0 0;color:#9ca3af;font-size:12px;">&copy; ${new Date().getFullYear()} Maikus AI Solutions</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

        // ── Build client confirmation email ──
        const clientName = quickCall ? formData.quickName : formData.contactName;
        const clientEmail = quickCall ? '' : formData.email;

        const clientHtmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <style>
    @media screen and (max-width: 600px) {
      .content-padding { padding: 24px 20px !important; }
      .header-title { font-size: 22px !important; }
      .service-table { display: block !important; }
      .service-cell { display: block !important; width: 100% !important; text-align: left !important; padding: 10px 0 !important; }
      .plan-badge { text-align: left !important; margin-top: 10px; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f7;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f7;padding:20px 0;">
    <tr>
      <td align="center">
        <!-- Main Container -->
        <table class="container" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;width:95%;border-radius:12px;overflow:hidden;background-color:#ffffff;box-shadow:0 10px 30px rgba(0,0,0,0.08);">
          
          <!-- Top Gradient Accent -->
          <tr><td style="padding:0;"><div style="height:6px;background:linear-gradient(90deg,#7c3aed,#00c2ff);"></div></td></tr>

          <!-- Header Section -->
          <tr>
            <td class="content-padding" style="padding:40px 40px 30px;text-align:center;border-bottom:1px solid #f0f0f5;">
              <img src="https://maikusai.onrender.com/logotransparent.png" alt="Maikus AI Logo" style="display:block;margin:0 auto 20px auto;max-width:150px;width:100%;height:auto;" />
              <p style="margin:0 0 10px;font-size:12px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#7c3aed;">Maikus AI Solutions</p>
              <h1 class="header-title" style="margin:0 0 12px;font-size:28px;font-weight:800;color:#111827;line-height:1.2;">Request Received</h1>
              <p style="margin:0;font-size:16px;color:#4b5563;">Hi ${clientName}, we've received your request for an AI Receptionist.</p>
            </td>
          </tr>

          <!-- Service Highlights -->
          <tr>
            <td style="background-color:#faf9ff;border-bottom:1px solid #ede9fe;padding:20px 40px;" class="content-padding">
              <table width="100%" cellpadding="0" cellspacing="0" class="service-table">
                <tr>
                  <td class="service-cell" style="vertical-align: middle;">
                    <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#7c3aed;text-transform:uppercase;letter-spacing:1px;">Service Requested</p>
                    <p style="margin:0;font-size:19px;font-weight:800;color:#1e1b4b;">AI Voice Receptionist</p>
                  </td>
                  <td class="service-cell plan-badge" align="right" style="vertical-align: middle;">
                    <div style="background-color:#7c3aed;border-radius:8px;padding:8px 16px;display:inline-block;box-shadow:0 4px 10px rgba(124,58,237,0.2);">
                      <p style="margin:0;font-size:10px;color:#ede9fe;text-transform:uppercase;letter-spacing:1px;font-weight:700;">Plan Selected</p>
                      <p style="margin:2px 0 0;font-size:15px;color:#ffffff;font-weight:800;">${chosenPlan}</p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Message -->
          <tr>
            <td class="content-padding" style="padding:35px 40px;">
              <p style="margin:0 0 18px;font-size:16px;color:#374151;line-height:1.6;">Thank you for reaching out. We have successfully logged your request for the <strong style="color:#7c3aed;">AI Voice Receptionist</strong>. This system will be custom-built to automatically handle your patient/customer calls, book appointments, and scale your business 24/7.</p>
              <p style="margin:0 0 30px;font-size:16px;color:#374151;line-height:1.6;">Our team is reviewing your requirements and will reach out to you within <strong style="color:#059669;">24 hours</strong> to set up your personalised live demo.</p>

              <!-- Progress Steps -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">
                <tr><td style="padding:18px 20px;border-bottom:1px solid #e2e8f0;background-color:#ffffff;">
                  <p style="margin:0;font-size:13px;font-weight:700;color:#1e293b;text-transform:uppercase;letter-spacing:1px;">What's Next?</p>
                </td></tr>
                
                <!-- Step 1 -->
                <tr>
                  <td style="padding:16px 20px;border-bottom:1px solid #f1f5f9;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="32" style="vertical-align:top;padding-top:2px;">
                          <div style="width:24px;height:24px;line-height:24px;background-color:#7c3aed;color:#ffffff;text-align:center;border-radius:50%;font-size:12px;font-weight:800;">1</div>
                        </td>
                        <td style="padding-left:12px;font-size:14px;color:#475569;line-height:1.4;">
                          Reviewing your submission and call requirements
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Step 2 -->
                <tr>
                  <td style="padding:16px 20px;border-bottom:1px solid #f1f5f9;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="32" style="vertical-align:top;padding-top:2px;">
                          <div style="width:24px;height:24px;line-height:24px;background-color:#7c3aed;color:#ffffff;text-align:center;border-radius:50%;font-size:12px;font-weight:800;">2</div>
                        </td>
                        <td style="padding-left:12px;font-size:14px;color:#475569;line-height:1.4;">
                          Configuring a custom AI Receptionist for your specific business needs
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Step 3 -->
                <tr>
                  <td style="padding:16px 20px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="32" style="vertical-align:top;padding-top:2px;">
                          <div style="width:24px;height:24px;line-height:24px;background-color:#059669;color:#ffffff;text-align:center;border-radius:50%;font-size:12px;font-weight:800;">3</div>
                        </td>
                        <td style="padding-left:12px;font-size:14px;color:#475569;line-height:1.4;">
                          Live demo call to walk you through the voice experience
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <p style="margin:30px 0 0;font-size:14px;color:#64748b;line-height:1.5;text-align:center;">
                Have an urgent query? Reply to this email or contact us via 
                <a href="https://wa.me/918008998312" style="color:#25d366;font-weight:700;text-decoration:none;border-bottom:1px solid #25d366;">WhatsApp</a>.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f8fafc;padding:30px 40px;text-align:center;border-top:1px solid #f1f5f9;">
              <p style="margin:0 0 8px;font-size:12px;color:#94a3b8;">
                You received this because you submitted a request at 
                <a href="https://maikusai.onrender.com" style="color:#7c3aed;text-decoration:none;font-weight:600;">maikus.ai</a>
              </p>
              <p style="margin:0;font-size:12px;color:#94a3b8;font-weight:500;">
                &copy; ${new Date().getFullYear()} Maikus AI Solutions. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

        const sendEmail = (to: { email: string; name: string }[], subject: string, htmlContent: string) =>
            fetch('https://api.brevo.com/v3/smtp/email', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'api-key': BREVO_API_KEY,
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    sender: { name: 'Maikus AI', email: SENDER_EMAIL },
                    to,
                    subject,
                    htmlContent,
                }),
            });

        try {
            const ownerSubject = quickCall
                ? `AI Voice Receptionist – Quick Call Request from ${formData.quickName}`
                : `AI Voice Receptionist – New Service Request from ${formData.practiceName} (${chosenPlan})`;

            const clientSubject = `Your AI Voice Receptionist Request – Maikus AI will contact you within 24 hours`;

            // Supabase row
            const supabasePayload = quickCall
                ? {
                    type: 'quick_call',
                    contact_name: formData.quickName,
                    phone: formData.quickPhone,
                    plan_selected: 'Quick Call',
                  }
                : {
                    type: 'full_request',
                    practice_name: formData.practiceName,
                    contact_name: formData.contactName,
                    email: formData.email,
                    phone: formData.phone,
                    industry: formData.industry,
                    primary_goal: formData.goal,
                    call_volume: formData.callVolume,
                    current_setup: formData.currentSetup,
                    plan_selected: chosenPlan,
                    contact_for_pricing: contactForPricing,
                  };

            const tasks: Promise<unknown>[] = [
                // 1. Owner email
                sendEmail([{ email: SENDER_EMAIL, name: 'Maikus AI Team' }], ownerSubject, htmlBody),
                // 2. Supabase insert
                (async () => { const r = await supabase.from('service_requests').insert([supabasePayload]); if (r.error) throw r.error; })(),
            ];

            // 3. Client email (only if we have their email)
            if (clientEmail) {
                tasks.push(sendEmail([{ email: clientEmail, name: clientName }], clientSubject, clientHtmlBody));
            }

            const results = await Promise.allSettled(tasks);
            const anyFailed = results.some(r => r.status === 'rejected');

            if (!anyFailed) {
                setSubmitState('success');
                setSubmitted(true);
                setFormData({ quickName: '', quickPhone: '', practiceName: '', contactName: '', email: '', phone: '', industry: '', goal: '', callVolume: '', currentSetup: '' });
            } else {
                setSubmitState('error');
            }
        } catch {
            setSubmitState('error');
        }
    };

    return (
        <div className="pt-24 pb-16">

            {/* ─── HERO & LIVE DEMO ─── */}
            <section id="live-demo" className="relative overflow-hidden pt-20 pb-24 border-b border-brand-border">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent-blue/10 via-brand-bg to-brand-bg -z-10" />
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-12">

                    <div className="flex justify-center mb-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-green/10 border border-accent-green/40 dark:text-accent-green text-xs font-bold tracking-widest uppercase mb-2">
                            <ShieldCheck className="w-4 h-4 shrink-0" />
                            <DecryptedText text="HIPAA-Protected" animateOn="view" speed={50} maxIterations={4} />
                        </div>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                        Have a <span className="dark:bg-white dark:text-black text-white bg-black px-4 mx-2 rounded-lg">Live</span> Demo!
                    </h1>
                    <p className="text-xl text-brand-text-muted mb-12 max-w-2xl mx-auto leading-relaxed">
                        Enter your number and our AI will call you instantly. Hear how human it sounds — no hold music, no waiting.
                    </p>

                    <div className="max-w-md mx-auto relative z-10">
                        <AnimatePresence mode="wait">
                            {demoState === 'idle' && (
                                <motion.form 
                                    key="form"
                                    initial={{opacity: 0, y: 20}}
                                    animate={{opacity: 1, y: 0}}
                                    exit={{opacity: 0, scale: 0.95}}
                                    onSubmit={handleDemoCall}
                                    className="flex flex-col gap-4"
                                >
                                    <input 
                                        type="tel" 
                                        value={demoPhone}
                                        onChange={e => setDemoPhone(e.target.value)}
                                        placeholder="Enter your mobile number" 
                                        className="w-full bg-brand-bg border border-brand-border rounded-xl px-6 py-5 text-lg text-brand-text outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-all shadow-xl"
                                        required
                                    />
                                    <button type="submit" className="btn-primary w-full py-5 text-lg shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_40px_rgba(0,240,255,0.5)] flex items-center justify-center gap-3">
                                        <Phone className="w-5 h-5" /> Receive Demo Call
                                    </button>
                                </motion.form>
                            )}

                            {demoState === 'calling' && (
                                <motion.div 
                                    key="calling"
                                    initial={{opacity: 0, scale: 0.95}}
                                    animate={{opacity: 1, scale: 1}}
                                    className="glass-card py-12 flex flex-col items-center justify-center border-accent-blue/40 shadow-[0_0_50px_rgba(0,240,255,0.2)]"
                                >
                                    <div className="w-20 h-20 rounded-full bg-accent-blue/20 flex items-center justify-center mb-6 animate-pulse">
                                        <Phone className="w-8 h-8 text-accent-blue animate-bounce" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2 text-brand-text">Connecting...</h3>
                                    <p className="text-brand-text-muted">You will receive a call momentarily.</p>
                                </motion.div>
                            )}

                            {demoState === 'connected' && (
                                <motion.div 
                                    key="connected"
                                    initial={{opacity: 0, scale: 0.95}}
                                    animate={{opacity: 1, scale: 1}}
                                    className="glass-card py-12 flex flex-col items-center justify-center border-accent-green/40 shadow-[0_0_50px_rgba(16,185,129,0.2)]"
                                >
                                    <AnimatedWaveform />
                                    <h3 className="text-2xl font-bold mt-8 mb-2 text-brand-text">Call in Progress</h3>
                                    <p className="text-brand-text-muted mb-6">Speak to the AI normally.</p>
                                    <div className="flex items-center justify-center w-full min-h-[40px] mb-8">
                                        <div className="flex items-center gap-2 text-accent-green text-xs font-bold bg-accent-green/10 px-4 py-2 rounded-full shadow-sm text-center">
                                            <ShieldCheck className="w-4 h-4 shrink-0" />
                                            <DecryptedText text="Live Audio Stream: Fully encrypted" animateOn="view" speed={40} maxIterations={2} />
                                        </div>
                                    </div>
                                    <button onClick={(e: any) => {e.preventDefault(); setDemoState('idle');}} className="btn-secondary py-2 px-6 text-sm flex items-center gap-2 text-brand-text"><Phone className="w-4 h-4"/> End Call Simulation</button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="mt-16 flex items-center justify-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                        <span className="ml-2 text-brand-text-muted text-sm border-l border-brand-border/50 pl-3">Trusted by clinics, dentists & real estate</span>
                    </div>
                </div>
            </section>

            {/* ─── HOW IT WORKS ─── */}
            <section className="py-24 bg-brand-bg">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-brand-text">
                        Up and Running in <span className="dark:bg-white dark:text-black text-white bg-black px-3 mx-2 rounded-lg">5 Days</span>
                    </h2>
                    <p className="text-brand-text-muted mb-16 max-w-2xl mx-auto">
                        We handle everything. You simply tell us about your practice and we'll handle the rest.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { step: '1', title: 'Free Demo', desc: 'We build a tailored demo for your practice and walk you through how it sounds live.' },
                            { step: '2', title: 'Onboarding', desc: "We configure your receptionist's script, personality, and connect it to your phone line." },
                            { step: '3', title: 'Go Live', desc: 'Your AI receptionist is switched on. Every inbound call is handled automatically from day one.' },
                            { step: '4', title: 'Ongoing Management', desc: 'We monitor performance and fine-tune monthly. You receive a simple usage report.' },
                        ].map((item, idx) => (
                            <div key={idx} className="relative flex flex-col items-center">
                                <div className="w-16 h-16 rounded-full bg-brand-bg border-2 border-accent-blue flex items-center justify-center text-2xl font-bold text-accent-blue mb-6 z-10 shadow-[0_0_30px_rgba(0,240,255,0.2)] hover:scale-110 transition-transform">
                                    {item.step}
                                </div>
                                {idx !== 3 && (
                                    <div className="hidden md:block absolute top-8 left-1/2 w-full h-[2px] bg-gradient-to-r from-accent-blue via-accent-blue/50 to-transparent -z-0" />
                                )}
                                <h3 className="text-lg font-bold text-brand-text mb-2">{item.title}</h3>
                                <p className="text-brand-text-muted text-sm px-4">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── PRICING ─── */}
            <section id="pricing" className="py-24 bg-brand-bg-alt/40 border-y border-brand-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-brand-text mb-4">
                            Simple, Transparent <span className="dark:bg-white dark:text-black text-white bg-black px-3 mx-1 rounded-lg">Plans</span>
                        </h2>
                        <p className="text-brand-text-muted max-w-2xl mx-auto">
                            Flat monthly fees and transparent per-minute usage. Every plan includes setup, configuration, and ongoing management — handled entirely by us.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {plans.map((plan, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                className={`glass-card flex flex-col p-8 relative overflow-hidden ${plan.popular
                                    ? 'border-accent-purple shadow-[0_0_40px_rgba(155,81,224,0.15)] md:-translate-y-2'
                                    : 'border-brand-border'
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-accent-blue to-accent-purple text-brand-text text-xs font-bold text-center py-1">
                                        MOST POPULAR
                                    </div>
                                )}
                                <div className={plan.popular ? 'mt-4 flex flex-col flex-grow' : 'flex flex-col flex-grow'}>
                                    <div className="flex items-center gap-1 text-accent-green text-xs font-semibold mb-4">
                                        <ShieldCheck className="w-3 h-3" />
                                        Fully Managed
                                    </div>

                                    <h3 className="text-2xl font-bold text-brand-text mb-1">{plan.name}</h3>
                                    <div className="text-4xl font-bold text-brand-text mb-1">
                                        {plan.monthly}
                                        {plan.monthly !== 'Custom' && <span className="text-lg font-normal text-brand-text-muted">/mo</span>}
                                    </div>
                                    <div className="text-xs text-brand-text-muted mb-1">{plan.setup}</div>
                                    <div className="text-xs text-brand-text-muted mb-6 pb-6 border-b border-brand-border">
                                        {plan.minutes} · {plan.overage}
                                    </div>

                                    <ul className="space-y-3 mb-8 flex-grow">
                                        {plan.features.map((f, j) => (
                                            <li key={j} className="flex items-start gap-2 text-brand-text-muted text-sm">
                                                <CheckCircle2 className="w-4 h-4 text-accent-green flex-shrink-0 mt-0.5" />
                                                {f}
                                            </li>
                                        ))}
                                    </ul>

                                    <button
                                        onClick={() => {
                                            setSelectedPlan(plan.id);
                                            setContactForPricing(plan.id === 'enterprise');
                                            smoothScroll('intake-form');
                                        }}
                                        className={plan.popular ? 'btn-primary w-full py-3 text-center' : 'btn-secondary w-full py-3 text-center'}
                                    >
                                        {plan.id === 'enterprise' ? 'Contact Us' : 'Get Started'}
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── INTAKE FORM ─── */}
            <section id="intake-form" className="py-24 relative bg-brand-bg-alt/30">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                    {submitted ? (
                        <FormSuccessScreen
                            contactName={quickCall ? formData.quickName : formData.contactName}
                            planName={contactForPricing ? 'Discuss Pricing' : plans.find(p => p.id === selectedPlan)?.name}
                            onReset={() => { setSubmitted(false); setSubmitState('idle'); setSelectedPlan('dashboard-pro'); setContactForPricing(false); }}
                        />
                    ) : (
                    <div className="glass-card p-8 md:p-12 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-purple via-accent-blue to-accent-purple" />

                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold mb-4">
                                Get Your AI Receptionist <span className="text-gradient">Running</span>
                            </h2>
                            <p className="text-brand-text-muted">Tell us about your practice and we'll be in touch within 24 hours with a custom demo.</p>
                        </div>

                        {/* Quick call toggle */}
                        <div className="flex items-center gap-4 mb-10 bg-brand-bg/40 p-5 rounded-2xl border border-brand-border/50 max-w-md mx-auto hover:bg-brand-bg/60 transition-colors">
                            <button
                                type="button"
                                onClick={() => setQuickCall(!quickCall)}
                                className={
                                    'w-14 h-7 rounded-full transition-colors relative outline-none focus:ring-2 focus:ring-accent-blue/50 focus:ring-offset-2 focus:ring-offset-brand-bg shrink-0 ' +
                                    (quickCall ? 'bg-accent-blue' : 'bg-brand-bg-alt border border-brand-border')
                                }
                            >
                                <div className={'w-5 h-5 rounded-full bg-white absolute top-1/2 -translate-y-1/2 transition-all shadow-sm ' + (quickCall ? 'left-[calc(100%-1.5rem)]' : 'left-0.5')} />
                            </button>
                            <div>
                                <h4 className="font-semibold text-brand-text text-lg leading-tight mb-1">I'm in a hurry</h4>
                                <p className="text-sm text-brand-text-muted">Just take my number and call me.</p>
                            </div>
                        </div>

                        {/* Submission feedback banner — only error shown here now */}
                        {submitState === 'error' && (
                            <div className="mb-6 flex items-center gap-3 bg-red-500/10 border border-red-400/30 text-red-400 text-sm font-semibold px-5 py-4 rounded-xl">
                                <CheckCircle className="w-5 h-5 shrink-0" />
                                Something went wrong. Please try again or email us directly.
                            </div>
                        )}

                        <form
                            className="space-y-8"
                            onSubmit={handleFormSubmit}
                        >
                            {quickCall ? (
                                <div className="space-y-6 max-w-lg mx-auto">
                                    <div>
                                        <label className="block text-sm font-medium text-brand-text-muted mb-2">Name</label>
                                        <input type="text" required className={inputClass} placeholder="Dr. John Smith" value={formData.quickName} onChange={setField('quickName')} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-brand-text-muted mb-2">Phone / WhatsApp</label>
                                        <input type="tel" required className={inputClass} placeholder="+91 98765 43210" value={formData.quickPhone} onChange={setField('quickPhone')} />
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {/* Section 1 — Basic Info */}
                                    <div className="space-y-6">
                                        <h3 className="text-xl font-semibold flex items-center gap-2 border-b border-brand-border pb-2">
                                            <span className="w-6 h-6 rounded-full bg-accent-blue/20 text-accent-blue flex items-center justify-center text-sm">1</span>
                                            Your Practice
                                        </h3>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-brand-text-muted mb-2">Practice / Business Name</label>
                                                <input type="text" required className={inputClass} placeholder="Dr. Smith's Dental Clinic" value={formData.practiceName} onChange={setField('practiceName')} />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-brand-text-muted mb-2">Contact Name</label>
                                                <input type="text" required className={inputClass} placeholder="Dr. John Smith" value={formData.contactName} onChange={setField('contactName')} />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-brand-text-muted mb-2">Email</label>
                                                <input type="email" required className={inputClass} placeholder="john@clinic.com" value={formData.email} onChange={setField('email')} />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-brand-text-muted mb-2">Phone / WhatsApp</label>
                                                <input type="tel" required className={inputClass} placeholder="+91 98765 43210" value={formData.phone} onChange={setField('phone')} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Section 2 — About Your Calls */}
                                    <div className="space-y-6">
                                        <h3 className="text-xl font-semibold flex items-center gap-2 border-b border-brand-border pb-2">
                                            <span className="w-6 h-6 rounded-full bg-accent-purple/20 text-accent-purple flex items-center justify-center text-sm">2</span>
                                            About Your Calls
                                        </h3>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-brand-text-muted mb-2">Industry / Specialty</label>
                                                <select required className={selectClass} value={formData.industry} onChange={setField('industry')}>
                                                    <option value="" className="bg-brand-bg text-brand-text">Select industry...</option>
                                                    <option value="Dental" className="bg-brand-bg text-brand-text">Dental Clinic</option>
                                                    <option value="Medical" className="bg-brand-bg text-brand-text">Medical / GP</option>
                                                    <option value="Real Estate" className="bg-brand-bg text-brand-text">Real Estate</option>
                                                    <option value="Law Firm" className="bg-brand-bg text-brand-text">Law Firm</option>
                                                    <option value="Salon/Spa" className="bg-brand-bg text-brand-text">Salon / Spa</option>
                                                    <option value="Other" className="bg-brand-bg text-brand-text">Other</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-brand-text-muted mb-2">Primary Goal</label>
                                                <select required className={selectClass} value={formData.goal} onChange={setField('goal')}>
                                                    <option value="" className="bg-brand-bg text-brand-text">Select goal...</option>
                                                    <option value="Book appointments" className="bg-brand-bg text-brand-text">Book Appointments</option>
                                                    <option value="Answer FAQs" className="bg-brand-bg text-brand-text">Answer FAQs &amp; Hours</option>
                                                    <option value="Capture leads" className="bg-brand-bg text-brand-text">Capture New Leads</option>
                                                    <option value="All" className="bg-brand-bg text-brand-text">All of the above</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-brand-text-muted mb-2">Approx. Inbound Calls / Month</label>
                                                <select required className={selectClass} value={formData.callVolume} onChange={setField('callVolume')}>
                                                    <option value="" className="bg-brand-bg text-brand-text">Select volume...</option>
                                                    <option value="0–50" className="bg-brand-bg text-brand-text">0 – 50 calls</option>
                                                    <option value="50–200" className="bg-brand-bg text-brand-text">50 – 200 calls</option>
                                                    <option value="200–500" className="bg-brand-bg text-brand-text">200 – 500 calls</option>
                                                    <option value="500+" className="bg-brand-bg text-brand-text">500+ calls</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-brand-text-muted mb-2">Current Setup</label>
                                                <select required className={selectClass} value={formData.currentSetup} onChange={setField('currentSetup')}>
                                                    <option value="" className="bg-brand-bg text-brand-text">Select current setup...</option>
                                                    <option value="Human only" className="bg-brand-bg text-brand-text">Human Receptionist Only</option>
                                                    <option value="Voicemail" className="bg-brand-bg text-brand-text">Mostly Voicemail</option>
                                                    <option value="Answering service" className="bg-brand-bg text-brand-text">Answering Service</option>
                                                    <option value="Nothing" className="bg-brand-bg text-brand-text">Nothing Yet</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Section 3 — Plan Selection */}
                                    <div className="space-y-6">
                                        <h3 className="text-xl font-semibold flex items-center gap-2 border-b border-brand-border pb-2">
                                            <span className="w-6 h-6 rounded-full bg-accent-blue/20 text-accent-blue flex items-center justify-center text-sm">3</span>
                                            Choose Your Plan
                                        </h3>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            {plans.map(plan => (
                                                <button
                                                    key={plan.id}
                                                    type="button"
                                                    onClick={() => { setSelectedPlan(plan.id); setContactForPricing(false); }}
                                                    className={`p-4 rounded-xl border-2 text-left transition-all relative ${!contactForPricing && selectedPlan === plan.id
                                                        ? 'border-accent-blue bg-accent-blue/10'
                                                        : 'border-brand-border bg-brand-bg/20 hover:border-brand-border/60'
                                                        }`}
                                                >
                                                    {plan.popular && (
                                                        <span className="absolute top-2 right-2 text-[10px] font-bold uppercase tracking-widest text-accent-purple bg-accent-purple/10 border border-accent-purple/30 px-2 py-0.5 rounded-full">
                                                            Popular
                                                        </span>
                                                    )}
                                                    <div className="font-bold text-brand-text mb-0.5 flex items-center gap-2">
                                                        {!contactForPricing && selectedPlan === plan.id && (
                                                            <CheckCircle className="w-4 h-4 text-accent-blue shrink-0" />
                                                        )}
                                                        {plan.name}
                                                    </div>
                                                    <div className="text-accent-blue font-semibold text-sm">
                                                        {plan.monthly === 'Custom' ? 'Custom pricing' : `${plan.monthly}/mo`}
                                                    </div>
                                                    <div className="text-xs text-brand-text-muted mt-1">{plan.minutes}</div>
                                                </button>
                                            ))}
                                        </div>

                                        {/* Contact for pricing option */}
                                        <button
                                            type="button"
                                            onClick={() => { setContactForPricing(true); setSelectedPlan(''); }}
                                            className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center gap-3 ${contactForPricing
                                                ? 'border-accent-purple bg-accent-purple/10'
                                                : 'border-brand-border bg-brand-bg/20 hover:border-brand-border/60'
                                                }`}
                                        >
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${contactForPricing ? 'border-accent-purple bg-accent-purple' : 'border-brand-text-muted'}`}>
                                                {contactForPricing && <Zap className="w-3 h-3 text-brand-text" />}
                                            </div>
                                            <div>
                                                <div className="font-semibold text-brand-text text-sm">I'm not sure — contact me to discuss pricing</div>
                                                <div className="text-xs text-brand-text-muted">We'll recommend the best plan for your call volume</div>
                                            </div>
                                        </button>
                                    </div>
                                </>
                            )}

                            <div className="pt-6 border-t border-brand-border/50">
                                <button
                                    type="submit"
                                    disabled={submitState === 'sending'}
                                    className="w-full btn-primary text-lg py-4 disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {submitState === 'sending'
                                        ? 'Sending…'
                                        : quickCall ? 'Request Quick Call' : 'Request My Free Demo'}
                                </button>
                                <p className="text-center text-xs text-brand-text-muted mt-4 flex items-center justify-center gap-1">
                                    <CheckCircle className="w-3 h-3 text-accent-green" />
                                    We review every request and contact you within 24 hours.
                                </p>
                            </div>
                        </form>
                    </div>
                    )}
                </div>
            </section>

            {/* ─── FAQ ─── */}
            <section className="py-24 bg-brand-bg">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-brand-text mb-4">
                            Common <span className="dark:bg-white dark:text-black text-white bg-black px-3 mx-1 rounded-lg">Questions</span>
                        </h2>
                        <p className="text-brand-text-muted">Everything you need to know before going live.</p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div key={i} className="glass-card p-0 overflow-hidden">
                                <button
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    className="w-full flex items-center justify-between gap-4 p-6 text-left hover:bg-brand-glass/50 transition-colors"
                                >
                                    <span className="font-semibold text-brand-text flex items-center gap-3">
                                        <HelpCircle className="w-4 h-4 text-accent-blue shrink-0" />
                                        {faq.q}
                                    </span>
                                    <span className={`text-accent-blue text-xl transition-transform duration-200 ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                                </button>
                                <AnimatePresence>
                                    {openFaq === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-6 text-brand-text-muted text-sm leading-relaxed border-t border-brand-border pt-4">
                                                {faq.a}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom Security Notice */}
            <div className="container mx-auto px-6 mt-16 mb-8 text-center flex items-center justify-center">
                <div className="flex items-center gap-2 dark:text-accent-green text-sm font-bold bg-accent-green/5 border border-accent-green/20 px-6 py-3 rounded-full">
                    <ShieldCheck className="w-5 h-5 shrink-0" />
                    <DecryptedText text="Data Safe with HIPAA" animateOn="view" speed={60} maxIterations={3} />
                </div>
            </div>

            {/* Floating CTA */}
            <a
                href="/contact"
                className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-brand-glass backdrop-blur-lg border border-accent-purple/50 px-5 py-3.5 rounded-full hover:-translate-y-1 transition-all group shadow-xl"
            >
                <Phone className="w-5 h-5 text-accent-purple" />
                <span className="font-semibold text-brand-text">Doubt? Let's talk!</span>
            </a>
        </div>
    );
};

export default AIVoiceReceptionist;
