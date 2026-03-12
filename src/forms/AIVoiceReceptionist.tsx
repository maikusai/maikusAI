import { useState } from 'react';
import { Phone, ShieldCheck, Clock, CheckCircle, CheckCircle2, DollarSign, ArrowRight, Star, HelpCircle, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const inputClass =
    'w-full bg-brand-bg/30 border border-brand-border/60 hover:bg-brand-bg/50 hover:border-brand-border backdrop-blur-sm rounded-lg px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:ring-offset-2 focus:ring-offset-brand-bg transition-all';

const selectClass =
    'w-full bg-brand-bg/30 border border-brand-border/60 hover:bg-brand-bg/50 hover:border-brand-border backdrop-blur-sm rounded-lg px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-accent-purple/50 focus:ring-offset-2 focus:ring-offset-brand-bg transition-all appearance-none cursor-pointer';

const plans = [
    {
        id: 'starter',
        name: 'Starter',
        monthly: '$149',
        minutes: '50 mins/mo included',
        overage: '$0.60 / min overage',
        setup: '$1,000 one-time setup',
        features: [
            '1 AI Receptionist',
            'Dedicated Phone Number',
            'Appointment Booking',
            'Email Support',
            'Basic Call Analytics',
        ],
        popular: false,
    },
    {
        id: 'growth',
        name: 'Growth',
        monthly: '$349',
        minutes: '200 mins/mo included',
        overage: '$0.55 / min overage',
        setup: '$1,000 one-time setup',
        features: [
            '1 AI Receptionist',
            'Dedicated Phone Number',
            'Custom Script & Persona',
            'Priority Support',
            'Call Analytics + Recordings',
            'Monthly Performance Report',
        ],
        popular: true,
    },
    {
        id: 'clinic-pro',
        name: 'Clinic Pro',
        monthly: '$699',
        minutes: '500 mins/mo included',
        overage: '$0.50 / min overage',
        setup: '$1,500 one-time setup',
        features: [
            '2 AI Receptionists',
            '2 Dedicated Phone Numbers',
            'Fully Custom Script & Tone',
            'Priority Support with SLA',
            'Full Call Analytics',
            'Dedicated Account Manager',
        ],
        popular: false,
    },
    {
        id: 'enterprise',
        name: 'Enterprise',
        monthly: 'Custom',
        minutes: 'Unlimited',
        overage: 'Negotiated',
        setup: 'Custom',
        features: [
            'Unlimited Receptionists',
            'White-Label Option',
            'Custom SLA & Uptime Guarantee',
            'Dedicated Infrastructure',
            '24/7 Priority Support Line',
            'Custom Integrations (EHR, CRM)',
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

const AIVoiceReceptionist = () => {
    const [quickCall, setQuickCall] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<string>('growth');
    const [contactForPricing, setContactForPricing] = useState(false);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="pt-24 pb-16">

            {/* ─── HERO ─── */}
            <section className="relative overflow-hidden pt-20 pb-32">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent-purple/20 via-brand-bg to-brand-bg -z-10" />
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

                    <div className="flex justify-center mb-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-bg-alt/80 backdrop-blur-sm border border-brand-border/80 text-sm font-medium shadow-lg">
                            <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
                            <span className="text-brand-text-muted">Service:</span>
                            <span className="text-white font-semibold tracking-wide uppercase text-xs">AI Voice Receptionist</span>
                        </div>
                    </div>

                    <div className="flex justify-center mb-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-green/10 border border-accent-green/40 text-accent-green text-xs font-bold tracking-widest uppercase">
                            <ShieldCheck className="w-4 h-4" />
                            Enterprise-Grade Security &amp; Compliance
                        </div>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                        Never Miss a{' '}
                        <span className="text-gradient">Patient Call</span>{' '}
                        Again.
                    </h1>
                    <p className="text-xl text-brand-text-muted mb-10 leading-relaxed max-w-3xl mx-auto">
                        We deploy a conversational AI receptionist on your phone line — 24/7, fully compliant, and indistinguishable from a real human. It books appointments, answers FAQs, and captures every lead while you focus on your work.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button onClick={() => smoothScroll('intake-form')} className="btn-primary text-lg px-10 py-4">
                            Deploy My AI Receptionist
                        </button>
                        <button onClick={() => smoothScroll('pricing')} className="btn-secondary text-lg px-10 py-4 flex items-center gap-2 group">
                            View Plans <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    <div className="mt-10 flex items-center justify-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                        <span className="ml-2 text-brand-text-muted text-sm">Trusted by clinics, dentists &amp; real-estate offices</span>
                    </div>
                </div>
            </section>

            {/* ─── FEATURE CARDS ─── */}
            <section className="py-24 relative bg-brand-bg-alt/50 border-y border-brand-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8 text-center">
                    {[
                        {
                            icon: <Clock className="w-8 h-8 text-accent-blue" />,
                            title: '24/7 — Never Offline',
                            desc: 'Your AI receptionist answers every call — even at 2 AM on a holiday. Never lose a patient to voicemail again.',
                        },
                        {
                            icon: <ShieldCheck className="w-8 h-8 text-accent-green" />,
                            title: 'Secure & Compliant',
                            desc: 'Patient data is encrypted at rest and in transit, meeting the highest healthcare security standards.',
                        },
                        {
                            icon: <DollarSign className="w-8 h-8 text-accent-purple" />,
                            title: 'Predictable Monthly Cost',
                            desc: 'Flat monthly fee plus transparent per-minute usage. No surprise bills, no hidden costs — ever.',
                        },
                    ].map((b, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-card p-8 group hover:shadow-[0_0_30px_-5px_#00f0ff40]"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-brand-bg flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                {b.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-3">{b.title}</h3>
                            <p className="text-brand-text-muted leading-relaxed">{b.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ─── HOW IT WORKS ─── */}
            <section className="py-24 bg-brand-bg">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-brand-text">
                        Up and Running in <span className="text-gradient">5 Days</span>
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
                                <div className="w-16 h-16 rounded-full bg-brand-bg border-2 border-accent-purple flex items-center justify-center text-2xl font-bold text-accent-purple mb-6 z-10 shadow-[0_0_30px_rgba(155,81,224,0.2)]">
                                    {item.step}
                                </div>
                                {idx !== 3 && (
                                    <div className="hidden md:block absolute top-8 left-1/2 w-full h-[2px] bg-gradient-to-r from-accent-purple via-accent-blue to-transparent -z-0" />
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
                            Simple, Transparent <span className="text-gradient">Plans</span>
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
                                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-accent-blue to-accent-purple text-white text-xs font-bold text-center py-1">
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
                                <h4 className="font-semibold text-white text-lg leading-tight mb-1">I'm in a hurry</h4>
                                <p className="text-sm text-brand-text-muted">Just take my number and call me.</p>
                            </div>
                        </div>

                        <form
                            className="space-y-8"
                            onSubmit={(e) => { e.preventDefault(); alert("Request submitted! We'll contact you within 24 hours."); }}
                        >
                            {quickCall ? (
                                <div className="space-y-6 max-w-lg mx-auto">
                                    <div>
                                        <label className="block text-sm font-medium text-brand-text-muted mb-2">Name</label>
                                        <input type="text" required className={inputClass} placeholder="Dr. John Smith" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-brand-text-muted mb-2">Phone / WhatsApp</label>
                                        <input type="tel" required className={inputClass} placeholder="+1 555 000 1234" />
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
                                                <input type="text" required className={inputClass} placeholder="Dr. Smith's Dental Clinic" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-brand-text-muted mb-2">Contact Name</label>
                                                <input type="text" required className={inputClass} placeholder="Dr. John Smith" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-brand-text-muted mb-2">Email</label>
                                                <input type="email" required className={inputClass} placeholder="john@clinic.com" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-brand-text-muted mb-2">Phone / WhatsApp</label>
                                                <input type="tel" required className={inputClass} placeholder="+1 555 000 1234" />
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
                                                <select required className={selectClass}>
                                                    <option value="" className="bg-brand-bg text-white">Select industry...</option>
                                                    <option value="Dental" className="bg-brand-bg text-white">Dental Clinic</option>
                                                    <option value="Medical" className="bg-brand-bg text-white">Medical / GP</option>
                                                    <option value="Real Estate" className="bg-brand-bg text-white">Real Estate</option>
                                                    <option value="Law Firm" className="bg-brand-bg text-white">Law Firm</option>
                                                    <option value="Salon/Spa" className="bg-brand-bg text-white">Salon / Spa</option>
                                                    <option value="Other" className="bg-brand-bg text-white">Other</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-brand-text-muted mb-2">Primary Goal</label>
                                                <select required className={selectClass}>
                                                    <option value="" className="bg-brand-bg text-white">Select goal...</option>
                                                    <option value="Book appointments" className="bg-brand-bg text-white">Book Appointments</option>
                                                    <option value="Answer FAQs" className="bg-brand-bg text-white">Answer FAQs &amp; Hours</option>
                                                    <option value="Capture leads" className="bg-brand-bg text-white">Capture New Leads</option>
                                                    <option value="All" className="bg-brand-bg text-white">All of the above</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-brand-text-muted mb-2">Approx. Inbound Calls / Month</label>
                                                <select required className={selectClass}>
                                                    <option value="" className="bg-brand-bg text-white">Select volume...</option>
                                                    <option value="0–50" className="bg-brand-bg text-white">0 – 50 calls</option>
                                                    <option value="50–200" className="bg-brand-bg text-white">50 – 200 calls</option>
                                                    <option value="200–500" className="bg-brand-bg text-white">200 – 500 calls</option>
                                                    <option value="500+" className="bg-brand-bg text-white">500+ calls</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-brand-text-muted mb-2">Current Setup</label>
                                                <select required className={selectClass}>
                                                    <option value="" className="bg-brand-bg text-white">Select current setup...</option>
                                                    <option value="Human only" className="bg-brand-bg text-white">Human Receptionist Only</option>
                                                    <option value="Voicemail" className="bg-brand-bg text-white">Mostly Voicemail</option>
                                                    <option value="Answering service" className="bg-brand-bg text-white">Answering Service</option>
                                                    <option value="Nothing" className="bg-brand-bg text-white">Nothing Yet</option>
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
                                                    <div className="font-bold text-white mb-0.5 flex items-center gap-2">
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
                                                {contactForPricing && <Zap className="w-3 h-3 text-white" />}
                                            </div>
                                            <div>
                                                <div className="font-semibold text-white text-sm">I'm not sure — contact me to discuss pricing</div>
                                                <div className="text-xs text-brand-text-muted">We'll recommend the best plan for your call volume</div>
                                            </div>
                                        </button>
                                    </div>
                                </>
                            )}

                            <div className="pt-6 border-t border-brand-border/50">
                                <button type="submit" className="w-full btn-primary text-lg py-4">
                                    {quickCall ? 'Request Quick Call' : 'Request My Free Demo'}
                                </button>
                                <p className="text-center text-xs text-brand-text-muted mt-4 flex items-center justify-center gap-1">
                                    <CheckCircle className="w-3 h-3 text-accent-green" />
                                    We review every request and contact you within 24 hours.
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            {/* ─── FAQ ─── */}
            <section className="py-24 bg-brand-bg">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-brand-text mb-4">
                            Common <span className="text-gradient">Questions</span>
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

            {/* Floating CTA */}
            <a
                href="/contact"
                className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-brand-glass backdrop-blur-lg border border-accent-purple/50 px-5 py-3.5 rounded-full hover:-translate-y-1 transition-all group"
            >
                <Phone className="w-5 h-5 text-accent-purple" />
                <span className="font-semibold text-brand-text">Doubt? Let's talk!</span>
            </a>
        </div>
    );
};

export default AIVoiceReceptionist;
