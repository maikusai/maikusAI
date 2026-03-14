import { useState } from 'react';
import { Phone, ShieldCheck, CheckCircle, CheckCircle2, Star, HelpCircle, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DecryptedText from '../components/DecryptedText';
import FormSuccessScreen from '../components/FormSuccessScreen';

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
<body style="margin:0;padding:0;background:#0B0F19;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0B0F19;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#00f0ff22,#9b51e022);border:1px solid rgba(255,255,255,0.1);border-radius:16px 16px 0 0;padding:32px 40px;text-align:center;">
            <p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:4px;text-transform:uppercase;color:#9b51e0;">Maikus AI — AI Voice Receptionist</p>
            <h1 style="margin:0;font-size:28px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">📬 New Service Request</h1>
            <p style="margin:10px 0 0;font-size:14px;color:#9ca3af;">Someone just submitted a demo request from the website</p>
          </td>
        </tr>

        <!-- Alert badge -->
        <tr>
          <td style="background:#111122;border-left:1px solid rgba(255,255,255,0.1);border-right:1px solid rgba(255,255,255,0.1);padding:16px 40px;">
            <div style="background:#00f0ff12;border:1px solid #00f0ff33;border-radius:8px;padding:10px 16px;display:inline-block;">
              <span style="color:#00f0ff;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">⚡ Action Required — Respond within 24 hours</span>
            </div>
          </td>
        </tr>

        ${quickCall ? `
        <!-- Quick Call Section -->
        <tr>
          <td style="background:#111122;border-left:1px solid rgba(255,255,255,0.1);border-right:1px solid rgba(255,255,255,0.1);padding:8px 40px 32px;">
            <h2 style="font-size:14px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#9ca3af;border-bottom:1px solid rgba(255,255,255,0.08);padding-bottom:10px;margin-bottom:20px;">Quick Call Request</h2>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
                  <span style="color:#9ca3af;font-size:13px;">Name</span>
                  <p style="margin:4px 0 0;color:#ffffff;font-size:16px;font-weight:600;">${formData.quickName}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:8px 0;">
                  <span style="color:#9ca3af;font-size:13px;">Phone / WhatsApp</span>
                  <p style="margin:4px 0 0;color:#00f0ff;font-size:20px;font-weight:700;">${formData.quickPhone}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        ` : `
        <!-- Full Form Details -->
        <tr>
          <td style="background:#111122;border-left:1px solid rgba(255,255,255,0.1);border-right:1px solid rgba(255,255,255,0.1);padding:8px 40px 24px;">
            <h2 style="font-size:14px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#9ca3af;border-bottom:1px solid rgba(255,255,255,0.08);padding-bottom:10px;margin-bottom:20px;">Practice Details</h2>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td width="50%" style="padding:8px 12px 8px 0;vertical-align:top;">
                  <span style="color:#9ca3af;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Practice / Business</span>
                  <p style="margin:4px 0 0;color:#ffffff;font-size:15px;font-weight:600;">${formData.practiceName}</p>
                </td>
                <td width="50%" style="padding:8px 0;vertical-align:top;">
                  <span style="color:#9ca3af;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Contact Person</span>
                  <p style="margin:4px 0 0;color:#ffffff;font-size:15px;font-weight:600;">${formData.contactName}</p>
                </td>
              </tr>
              <tr>
                <td width="50%" style="padding:8px 12px 8px 0;vertical-align:top;border-top:1px solid rgba(255,255,255,0.06);">
                  <span style="color:#9ca3af;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Email</span>
                  <p style="margin:4px 0 0;"><a href="mailto:${formData.email}" style="color:#00f0ff;font-size:15px;font-weight:600;text-decoration:none;">${formData.email}</a></p>
                </td>
                <td width="50%" style="padding:8px 0;vertical-align:top;border-top:1px solid rgba(255,255,255,0.06);">
                  <span style="color:#9ca3af;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Phone / WhatsApp</span>
                  <p style="margin:4px 0 0;color:#00f0ff;font-size:15px;font-weight:700;">${formData.phone}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background:#111122;border-left:1px solid rgba(255,255,255,0.1);border-right:1px solid rgba(255,255,255,0.1);padding:8px 40px 24px;">
            <h2 style="font-size:14px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#9ca3af;border-bottom:1px solid rgba(255,255,255,0.08);padding-bottom:10px;margin-bottom:20px;">Call Profile</h2>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td width="50%" style="padding:8px 12px 8px 0;vertical-align:top;">
                  <span style="color:#9ca3af;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Industry</span>
                  <p style="margin:4px 0 0;color:#ffffff;font-size:15px;font-weight:600;">${formData.industry}</p>
                </td>
                <td width="50%" style="padding:8px 0;vertical-align:top;">
                  <span style="color:#9ca3af;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Primary Goal</span>
                  <p style="margin:4px 0 0;color:#ffffff;font-size:15px;font-weight:600;">${formData.goal}</p>
                </td>
              </tr>
              <tr>
                <td width="50%" style="padding:8px 12px 8px 0;vertical-align:top;border-top:1px solid rgba(255,255,255,0.06);">
                  <span style="color:#9ca3af;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Monthly Call Volume</span>
                  <p style="margin:4px 0 0;color:#ffffff;font-size:15px;font-weight:600;">${formData.callVolume}</p>
                </td>
                <td width="50%" style="padding:8px 0;vertical-align:top;border-top:1px solid rgba(255,255,255,0.06);">
                  <span style="color:#9ca3af;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Current Setup</span>
                  <p style="margin:4px 0 0;color:#ffffff;font-size:15px;font-weight:600;">${formData.currentSetup}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- Plan -->
        <tr>
          <td style="background:#111122;border-left:1px solid rgba(255,255,255,0.1);border-right:1px solid rgba(255,255,255,0.1);padding:8px 40px 32px;">
            <h2 style="font-size:14px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#9ca3af;border-bottom:1px solid rgba(255,255,255,0.08);padding-bottom:10px;margin-bottom:20px;">Plan Selected</h2>
            <div style="background:linear-gradient(135deg,#9b51e022,#00f0ff11);border:1px solid #9b51e044;border-radius:10px;padding:14px 20px;display:inline-block;">
              <span style="color:#9b51e0;font-size:20px;font-weight:800;">${chosenPlan}</span>
            </div>
          </td>
        </tr>
        `}

        <!-- Footer -->
        <tr>
          <td style="background:#0B0F19;border:1px solid rgba(255,255,255,0.1);border-top:none;border-radius:0 0 16px 16px;padding:24px 40px;text-align:center;">
            <p style="margin:0;color:#4b5563;font-size:12px;">This email was auto-generated by the Maikus AI website.</p>
            <p style="margin:6px 0 0;color:#4b5563;font-size:12px;">© ${new Date().getFullYear()} Maikus AI Solutions</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

        try {
            const res = await fetch('https://api.brevo.com/v3/smtp/email', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'api-key': BREVO_API_KEY,
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    sender: { name: 'Maikus AI Website', email: SENDER_EMAIL },
                    to: [{ email: SENDER_EMAIL, name: 'Maikus AI Team' }],
                    subject: quickCall
                        ? `⚡ Quick Call Request – ${formData.quickName}`
                        : `📬 New Demo Request – ${formData.practiceName} (${chosenPlan})`,
                    htmlContent: htmlBody,
                }),
            });

            if (res.ok) {
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
                            <DecryptedText text="HIPAA-Compliant: All patient data is fully encrypted." animateOn="view" speed={60} maxIterations={15} />
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
                                            <DecryptedText text="Live Audio Stream: Fully encrypted and privately processed." animateOn="view" speed={40} maxIterations={12} />
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
                    <DecryptedText text="HIPAA-Compliant: All patient data is encrypted locally and completely safe." animateOn="view" speed={60} maxIterations={15} />
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
