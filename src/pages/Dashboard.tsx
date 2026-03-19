import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { supabase } from '../lib/supabaseClient';
import { Phone, Calendar, MessageSquare, AlertCircle, Clock, CheckCircle2, XCircle, BarChart2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardAnalytics from '../components/DashboardAnalytics';

type CallData = {
    id: string;
    created_at: string;
    phone_number: string;
    call_status: string;
    call_summary: string;
    sentiment: string;
    extracted_variables: any;
    full_conversation: string;
};

type AppointmentData = {
    id: string;
    created_at: string;
    patient_name: string;
    phone_number: string;
    preferred_date: string;
    preferred_time: string;
    branch_name: string;
    treatment_type: string;
    status: string;
};

type QueryData = {
    id: string;
    created_at: string;
    patient_name: string;
    phone_number: string;
    query_text: string;
    category: string;
};

const Dashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'all' | 'appointments' | 'queries' | 'analytics'>('all');
    const [calls, setCalls] = useState<CallData[]>([]);
    const [appointments, setAppointments] = useState<AppointmentData[]>([]);
    const [queries, setQueries] = useState<QueryData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCall, setSelectedCall] = useState<CallData | null>(null);

    useEffect(() => {
        fetchData();

        const callsSub = supabase.channel('calls_changes')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'call_logs' }, () => {
                pollData();
            }).subscribe();

        const apptsSub = supabase.channel('appts_changes')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'appointments' }, () => {
                pollData();
            }).subscribe();

        const queriesSub = supabase.channel('queries_changes')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'patient_queries' }, () => {
                pollData();
            }).subscribe();

        // Bulletproof backup polling for presentation
        const intervalId = setInterval(pollData, 3000);

        return () => {
            supabase.removeChannel(callsSub);
            supabase.removeChannel(apptsSub);
            supabase.removeChannel(queriesSub);
            clearInterval(intervalId);
        };
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        await pollData();
        setIsLoading(false);
    };

    const pollData = async () => {
        try {
            const [cb, ab, qb] = await Promise.all([
                supabase.from('call_logs').select('*').order('created_at', { ascending: false }),
                supabase.from('appointments').select('*').order('created_at', { ascending: false }),
                supabase.from('patient_queries').select('*').order('created_at', { ascending: false })
            ]);

            if (cb.data) setCalls(cb.data);
            if (ab.data) setAppointments(ab.data);
            if (qb.data) setQueries(qb.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const SentimentBadge = ({ sentiment }: { sentiment: string }) => {
        const s = (sentiment || '').toLowerCase();
        if (s.includes('positive')) return <span className="bg-green-500/10 text-green-400 px-2 py-0.5 rounded text-xs border border-green-500/20">Positive</span>;
        if (s.includes('negative')) return <span className="bg-red-500/10 text-red-400 px-2 py-0.5 rounded text-xs border border-red-500/20">Negative</span>;
        return <span className="bg-gray-500/10 text-gray-400 px-2 py-0.5 rounded text-xs border border-gray-500/20">Neutral</span>;
    };

    const modalContent = selectedCall ? (
        <AnimatePresence>
            <div className="fixed inset-0 flex items-center justify-center p-2 sm:p-4" style={{ zIndex: 99999 }}>
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="absolute inset-0"
                    style={{ backgroundColor: 'rgba(3,5,14,0.97)', backdropFilter: 'blur(12px)' }}
                    onClick={() => setSelectedCall(null)}
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.96, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 24 }}
                    transition={{ type: 'spring', duration: 0.35, bounce: 0.1 }}
                    className="relative w-full max-w-3xl rounded-2xl p-4 sm:p-6 md:p-8 overflow-y-auto"
                    style={{ backgroundColor: '#0B0F19', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 0 60px rgba(0,0,0,0.9)', maxHeight: '92vh', zIndex: 100000 }}
                >
                    {/* Close Button */}
                    <button
                        onClick={() => setSelectedCall(null)}
                        className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full text-brand-text-muted hover:text-white hover:bg-white/10 transition-all"
                        style={{ zIndex: 100001 }}
                    >
                        <XCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>

                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-5 pr-10">
                        <div>
                            <h2 className="text-lg sm:text-2xl font-bold text-white break-all leading-snug">{selectedCall.phone_number}</h2>
                            <p className="text-brand-text-muted text-xs sm:text-sm mt-1">{new Date(selectedCall.created_at).toLocaleString()}</p>
                        </div>
                        <div className="shrink-0"><SentimentBadge sentiment={selectedCall.sentiment} /></div>
                    </div>

                    {/* Body sections */}
                    <div className="space-y-4 sm:space-y-5">

                        {/* Call Summary */}
                        <div>
                            <h3 className="text-[10px] sm:text-xs font-bold text-white/50 uppercase tracking-widest mb-2">Call Summary</h3>
                            <div className="rounded-xl p-3 sm:p-4 text-sm text-brand-text-muted/90 leading-relaxed break-words" style={{ backgroundColor: '#0f1524', border: '1px solid rgba(255,255,255,0.07)' }}>
                                {selectedCall.call_summary || 'No summary available.'}
                            </div>
                        </div>

                        {/* Extracted Variables */}
                        {selectedCall.extracted_variables && Object.keys(selectedCall.extracted_variables).length > 0 && (
                            <div>
                                <h3 className="text-[10px] sm:text-xs font-bold text-white/50 uppercase tracking-widest mb-2">Extracted Information</h3>
                                <div className="rounded-xl overflow-hidden" style={{ backgroundColor: '#0f1524', border: '1px solid rgba(255,255,255,0.07)' }}>
                                    {Object.entries(selectedCall.extracted_variables).map(([k, v], i) => (
                                        <div key={k} className={`flex flex-col sm:flex-row sm:items-start px-4 py-2.5 gap-1 sm:gap-4 ${ i % 2 === 0 ? 'bg-white/[0.02]' : '' }`}>
                                            <span className="text-xs sm:text-sm text-brand-text-muted/60 sm:w-2/5 capitalize shrink-0 font-medium">{k.replace(/_/g, ' ')}</span>
                                            <span className="text-xs sm:text-sm text-white font-semibold sm:w-3/5 break-words">{String(v)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Full Transcript */}
                        {selectedCall.full_conversation && (
                            <div>
                                <h3 className="text-[10px] sm:text-xs font-bold text-white/50 uppercase tracking-widest mb-2">Full Transcript</h3>
                                <div className="rounded-xl p-3 sm:p-4 text-[11px] sm:text-xs font-mono break-words whitespace-pre-wrap leading-relaxed" style={{ backgroundColor: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.55)' }}>
                                    {typeof selectedCall.full_conversation === 'object'
                                        ? JSON.stringify(selectedCall.full_conversation, null, 2)
                                        : selectedCall.full_conversation}
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    ) : null;

    return (
    <React.Fragment>
        <div className="pt-24 pb-20 min-h-screen bg-brand-bg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 border-b border-brand-border pb-6">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Live AI Call Dashboard</h1>
                        <p className="text-sm md:text-base text-brand-text-muted">Real-time view of AI receptionist call data and extracted intelligence.</p>
                    </div>
                    <div className="mt-4 md:mt-0 flex gap-2">
                        <span className="flex items-center gap-2 text-xs font-mono bg-accent-green/10 text-accent-green px-3 py-1.5 rounded-full border border-accent-green/20">
                            <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse"></span>
                            Live Sync Active
                        </span>
                    </div>
                </div>

                <div className="flex gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                    <button onClick={() => setActiveTab('all')} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all shrink-0 text-sm ${activeTab === 'all' ? 'bg-accent-blue/10 border-accent-blue text-accent-blue' : 'bg-brand-bg-alt border-brand-border text-brand-text-muted hover:border-brand-border/80 hover:text-brand-text'}`}>
                        <Phone className="w-4 h-4" /> All Call Logs ({calls.length})
                    </button>
                    <button onClick={() => setActiveTab('appointments')} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all shrink-0 text-sm ${activeTab === 'appointments' ? 'bg-purple-500/10 border-purple-500 text-purple-400' : 'bg-brand-bg-alt border-brand-border text-brand-text-muted hover:border-brand-border/80 hover:text-brand-text'}`}>
                        <Calendar className="w-4 h-4" /> Appointments ({appointments.length})
                    </button>
                    <button onClick={() => setActiveTab('queries')} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all shrink-0 text-sm ${activeTab === 'queries' ? 'bg-orange-500/10 border-orange-500 text-orange-400' : 'bg-brand-bg-alt border-brand-border text-brand-text-muted hover:border-brand-border/80 hover:text-brand-text'}`}>
                        <MessageSquare className="w-4 h-4" /> Queries & Emergencies ({queries.length})
                    </button>
                    <button onClick={() => setActiveTab('analytics')} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all shrink-0 text-sm ${activeTab === 'analytics' ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400' : 'bg-brand-bg-alt border-brand-border text-brand-text-muted hover:border-brand-border/80 hover:text-brand-text'}`}>
                        <BarChart2 className="w-4 h-4" /> Analytics
                    </button>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-8 h-8 rounded-full border-2 border-accent-blue border-t-transparent animate-spin"></div>
                    </div>
                ) : (
                    <AnimatePresence mode="wait">
                        {activeTab === 'all' && (
                            <motion.div key="all" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
                                {calls.length === 0 ? (
                                    <div className="glass-card py-16 text-center border-dashed border-2">
                                        <p className="text-brand-text-muted">No call logs recorded yet.</p>
                                    </div>
                                ) : calls.map((log) => (
                                    <div key={log.id} 
                                        onClick={() => setSelectedCall(log)}
                                        className="bg-brand-bg border border-brand-border/50 rounded-xl p-5 md:p-6 border-l-4 border-l-accent-blue cursor-pointer hover:bg-brand-bg-alt transition-colors shadow-lg">
                                        <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                                            <div>
                                                <h3 className="font-bold text-lg text-white flex items-center gap-2">
                                                    {log.phone_number} 
                                                    {log.call_status === 'completed' || log.call_status === 'ended' ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Clock className="w-4 h-4 text-yellow-400" />}
                                                </h3>
                                                <p className="text-xs text-brand-text-muted mt-1">{new Date(log.created_at).toLocaleString()}</p>
                                            </div>
                                            <SentimentBadge sentiment={log.sentiment} />
                                        </div>
                                        <div className="bg-brand-bg rounded-lg p-4 border border-brand-border/50 text-sm text-brand-text-muted/90 mb-4 line-clamp-2">
                                            {log.call_summary || 'No summary available.'}
                                        </div>
                                        {log.extracted_variables && Object.keys(log.extracted_variables).length > 0 && (
                                            <div className="flex gap-2 text-xs text-brand-text-muted">
                                                <span className="font-semibold text-brand-text">{Object.keys(log.extracted_variables).length} Variables Extracted</span>
                                                <span>(Click to view details)</span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </motion.div>
                        )}

                        {activeTab === 'appointments' && (
                            <motion.div key="appts" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {appointments.length === 0 ? (
                                    <div className="col-span-full glass-card py-16 text-center border-dashed border-2">
                                        <p className="text-brand-text-muted">No appointments booked yet.</p>
                                    </div>
                                ) : appointments.map((appt) => (
                                    <div key={appt.id} className="bg-brand-bg border border-brand-border/50 rounded-xl p-5 md:p-6 border-t-4 border-t-purple-500 shadow-lg">
                                        <h3 className="font-bold text-lg text-white mb-1">{appt.patient_name || 'Unknown Patient'}</h3>
                                        <p className="font-mono text-sm text-purple-400 mb-4">{appt.phone_number}</p>
                                        
                                        <div className="space-y-3 mt-4 text-sm bg-brand-bg rounded-lg p-4 border border-brand-border/40">
                                            <div className="flex justify-between items-center border-b border-brand-border/50 pb-2">
                                                <span className="text-brand-text-muted">Date</span>
                                                <span className="text-white font-medium">{appt.preferred_date || 'TBD'}</span>
                                            </div>
                                            <div className="flex justify-between items-center border-b border-brand-border/50 pb-2">
                                                <span className="text-brand-text-muted">Time</span>
                                                <span className="text-white font-medium">{appt.preferred_time || 'TBD'}</span>
                                            </div>
                                            <div className="flex justify-between items-center border-b border-brand-border/50 pb-2">
                                                <span className="text-brand-text-muted">Treatment</span>
                                                <span className="text-white font-medium truncate max-w-[120px]" title={appt.treatment_type}>{appt.treatment_type || 'General Checkup'}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-brand-text-muted">Branch</span>
                                                <span className="text-white font-medium">{appt.branch_name || 'Main Clinic'}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        )}

                        {activeTab === 'queries' && (
                            <motion.div key="queries" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
                                {queries.length === 0 ? (
                                    <div className="glass-card py-16 text-center border-dashed border-2">
                                        <p className="text-brand-text-muted">No general queries logged.</p>
                                    </div>
                                ) : queries.map((query) => (
                                    <div key={query.id} className={`bg-brand-bg border border-brand-border/50 rounded-xl p-5 md:p-6 shadow-lg border-l-4 ${query.category === 'Emergency' ? 'border-l-red-500 bg-red-500/5' : 'border-l-orange-500'}`}>
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="font-bold text-lg text-white">{query.patient_name || 'Anonymous Caller'}</h3>
                                                <p className="font-mono text-xs text-brand-text-muted mt-1">{query.phone_number}</p>
                                            </div>
                                            {query.category === 'Emergency' && (
                                                <span className="flex items-center gap-1 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]">
                                                    <AlertCircle className="w-3 h-3" /> EMERGENCY
                                                </span>
                                            )}
                                        </div>
                                        <div className="mt-4 bg-brand-bg rounded-lg p-4 border border-brand-border/50">
                                            <p className="text-sm text-brand-text leading-relaxed">"{query.query_text}"</p>
                                        </div>
                                        <p className="text-xs text-brand-text-muted/50 mt-4 text-right">{new Date(query.created_at).toLocaleString()}</p>
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                )}

                {/* Modal is rendered via Portal — see ReactDOM.createPortal below */}
                {activeTab === 'analytics' && (
                    <motion.div key="analytics" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                        <DashboardAnalytics calls={calls} appointments={appointments} queries={queries} />
                    </motion.div>
                )}
            </div>
        </div>
        {/* Portal: renders modal directly into document.body to escape stacking context */}
        {ReactDOM.createPortal(modalContent, document.body)}
    </React.Fragment>
    );
};

export default Dashboard;
