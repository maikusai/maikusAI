import { motion } from 'framer-motion';
import { CheckCircle2, Zap, ShieldCheck, Phone, ArrowRight, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Pricing = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const voicePlans = [
        {
            name: 'Starter',
            monthly: '$149',
            setup: '$1,000 one-time setup',
            minutes: '50 mins/mo included',
            overage: '$0.60 / min overage',
            features: [
                '1 AI Receptionist Bot',
                'Dedicated Phone Number (Twilio)',
                'Appointment Booking Script',
                'Email Support',
                'Basic Analytics Dashboard',
                'HIPAA-Ready Infrastructure',
            ],
            cta: 'Get Started',
            popular: false,
            color: 'accent-blue',
        },
        {
            name: 'Growth',
            monthly: '$349',
            setup: '$1,000 one-time setup',
            minutes: '200 mins/mo included',
            overage: '$0.55 / min overage',
            features: [
                '1 AI Receptionist Bot',
                'Dedicated Phone Number (Twilio)',
                'Custom Script + Persona',
                'Priority Email & Chat Support',
                'Call Analytics + Recordings',
                'HIPAA-Ready Infrastructure',
                'Monthly Performance Report',
                'Stripe Metered Billing',
            ],
            cta: 'Most Popular — Start Now',
            popular: true,
            color: 'accent-purple',
        },
        {
            name: 'Clinic Pro',
            monthly: '$699',
            setup: '$1,500 one-time setup',
            minutes: '500 mins/mo included',
            overage: '$0.50 / min overage',
            features: [
                '2 AI Receptionist Bots',
                '2 Dedicated Phone Numbers',
                'Custom Script + Persona + Tone',
                'Priority Support with SLA',
                'Full Call Analytics Dashboard',
                'HIPAA-Ready Infrastructure',
                'Dedicated Account Manager',
                'Quarterly Strategy Review',
            ],
            cta: 'Book Strategy Call',
            popular: false,
            color: 'accent-blue',
        },
        {
            name: 'Enterprise',
            monthly: 'Custom',
            setup: 'Custom',
            minutes: 'Unlimited',
            overage: 'Negotiated',
            features: [
                'Unlimited Bots',
                'White-Label Option',
                'Custom SLA & Uptime Guarantee',
                'Dedicated Infrastructure',
                'Full HIPAA BAA Signing',
                '24/7 Priority Support Line',
                'Private LLM Option',
                'Custom Integrations (EHR, CRM)',
            ],
            cta: 'Contact Sales',
            popular: false,
            color: 'accent-purple',
        },
    ];

    const automationPlans = [
        {
            name: 'Starter',
            price: '₹15,000',
            label: 'setup',
            target: 'For small businesses',
            features: ['Basic Email Automation', 'Standard Web Chatbot', 'Single Workflow'],
            cta: 'Start Now',
            to: '/contact',
        },
        {
            name: 'Growth',
            price: '₹35,000',
            label: 'setup',
            target: 'For scaling companies',
            features: ['Advanced Lead Gen Funnels', 'AI Sales Chatbot', 'Full CRM Integration'],
            cta: 'Start Now',
            to: '/contact',
            popular: true,
        },
        {
            name: 'Enterprise',
            price: 'Custom',
            label: 'pricing',
            target: 'Custom deployment',
            features: ['Custom Private LLMs', 'Dedicated Infrastructure', '24/7 Priority Support'],
            cta: 'Contact Sales',
            to: '/contact',
        },
    ];

    const faqs = [
        {
            q: 'What is Vapi and who actually pays for it?',
            a: 'Vapi is the AI calling infrastructure we use to power your receptionist bot. Under the Managed Service model, we pay Vapi on your behalf and bill you a transparent monthly fee + per-minute usage. You never need a Vapi account.',
        },
        {
            q: 'Is this actually HIPAA compliant?',
            a: 'We use Vapi\'s HIPAA-compliant infrastructure ($1,000/yr plan) combined with encrypted Twilio phone numbers. Patient names, symptoms, and appointment data are encrypted at rest and in transit. We can also sign a Business Associate Agreement (BAA) on Growth+ plans.',
        },
        {
            q: 'What happens if I use more minutes than my plan?',
            a: 'Overage minutes are billed at the per-minute rate shown in your plan (e.g. $0.55/min on Growth). We send you a usage report mid-month so there are no surprises. You can also upgrade your plan at any time.',
        },
        {
            q: 'How does payment work? Will I get an invoice?',
            a: 'We use Stripe for automated billing. Your monthly platform fee is charged on the 1st of each month. Overage usage is calculated and added to the following month\'s invoice. You receive itemized PDF invoices by email.',
        },
        {
            q: 'Can my patients tell they\'re talking to an AI?',
            a: 'Our bots are trained to sound natural, warm, and professional. We recommend being transparent — most patients appreciate the instant response. That said, the bot is designed to hand off to a human for complex or sensitive queries.',
        },
        {
            q: 'What industries do you support?',
            a: 'We\'ve deployed bots for dental clinics, medical GP offices, real estate offices, law firms, salons, and restaurants. If your business receives inbound calls and handles appointments or FAQs — we can automate it.',
        },
    ];

    return (
        <div className="pt-32 lg:pt-40 pb-20">
            <div className="container mx-auto px-6 lg:px-12">

                {/* ─── Page Header ─── */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-brand-text">
                        Simple, <span className="text-gradient">Profitable</span> Pricing
                    </h1>
                    <p className="text-brand-text-muted text-lg md:text-xl">
                        Flat monthly fees, transparent per-minute usage, and zero hidden costs. Every plan is designed so your AI pays for itself within weeks.
                    </p>
                </div>

                {/* ─── Voice Receptionist Plans ─── */}
                <div className="mb-6">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-accent-purple/10 flex items-center justify-center">
                            <Phone className="w-4 h-4 text-accent-purple" />
                        </div>
                        <h2 className="text-2xl font-bold text-brand-text">AI Voice Receptionist Plans</h2>
                    </div>
                    <p className="text-brand-text-muted ml-11">For clinics, dentists, real estate offices, and any business that receives inbound calls.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
                    {voicePlans.map((plan, i) => (
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
                            <div className={plan.popular ? 'mt-4' : ''}>
                                {/* HIPAA badge on each card */}
                                <div className="flex items-center gap-1 text-accent-green text-xs font-semibold mb-4">
                                    <ShieldCheck className="w-3 h-3" />
                                    HIPAA-Ready
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
                            </div>

                            <Link
                                to="/services/ai-receptionist"
                                className={plan.popular ? 'btn-primary w-full py-3 text-center' : 'btn-secondary w-full py-3 text-center'}
                            >
                                {plan.cta}
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* ─── Profit Transparency Note ─── */}
                <div className="glass-card bg-brand-bg-alt p-8 md:p-10 border border-accent-blue/20 mb-24 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-blue to-accent-purple" />
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="w-12 h-12 rounded-xl bg-accent-blue/10 flex items-center justify-center shrink-0">
                            <Zap className="w-6 h-6 text-accent-blue" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-brand-text mb-3">How the "Spread" Model Guarantees Your Profit</h3>
                            <p className="text-brand-text-muted mb-4">
                                Under our Managed Service model, you never need to worry about Vapi bills eating your margin. Here's the math:
                            </p>
                            <div className="grid sm:grid-cols-3 gap-4">
                                {[
                                    { label: 'Our Vapi Cost', value: '~$0.20 / min', color: 'text-accent-red' },
                                    { label: 'What We Charge You', value: '$0.55–$0.60 / min', color: 'text-brand-text' },
                                    { label: 'Our Margin per Minute', value: '$0.35–$0.40 profit', color: 'text-accent-green' },
                                ].map((item, i) => (
                                    <div key={i} className="bg-brand-bg/40 rounded-xl p-4 border border-brand-border">
                                        <div className="text-xs text-brand-text-muted mb-1 uppercase tracking-wide font-semibold">{item.label}</div>
                                        <div className={`text-xl font-bold ${item.color}`}>{item.value}</div>
                                    </div>
                                ))}
                            </div>
                            <p className="text-brand-text-muted text-sm mt-4">
                                On top of the per-minute spread, the monthly platform fee covers your management time, HIPAA infrastructure, and support costs — ensuring you are always profitable.
                            </p>
                        </div>
                    </div>
                </div>

                {/* ─── General AI Automation Plans ─── */}
                <div className="mb-6">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-accent-blue/10 flex items-center justify-center">
                            <Zap className="w-4 h-4 text-accent-blue" />
                        </div>
                        <h2 className="text-2xl font-bold text-brand-text">General AI Automation Plans</h2>
                    </div>
                    <p className="text-brand-text-muted ml-11">Email automation, chatbots, lead funnels, and workflow integrations.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 max-w-5xl mx-auto">
                    {automationPlans.map((plan, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={`glass-card flex flex-col items-center p-10 relative overflow-hidden ${plan.popular
                                ? 'border-accent-blue shadow-[0_0_50px_rgba(0,240,255,0.1)] md:-translate-y-4'
                                : 'border-brand-border opacity-90 hover:opacity-100 transition-opacity'
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 w-full bg-gradient-to-r from-accent-blue to-accent-purple text-white text-xs font-bold text-center py-1 rounded-t-2xl">
                                    MOST POPULAR
                                </div>
                            )}
                            <div className={`w-full text-center ${plan.popular ? 'mt-4' : ''}`}>
                                <h3 className="text-2xl font-bold text-brand-text mb-2">{plan.name}</h3>
                                <div className="text-brand-text-muted text-sm mb-6">{plan.target}</div>
                                <div className="text-4xl font-bold text-brand-text mb-8">
                                    {plan.price}
                                    <span className="text-lg text-brand-text-muted font-normal"> {plan.label}</span>
                                </div>
                                <ul className="text-left space-y-4 mb-8 text-brand-text-muted w-full">
                                    {plan.features.map((f, j) => (
                                        <li key={j} className="flex items-center gap-2">
                                            <Zap className="w-4 h-4 text-accent-blue" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <Link
                                to={plan.to}
                                className={plan.popular ? 'btn-primary w-full py-3 text-center' : 'btn-secondary w-full py-3 text-center'}
                            >
                                {plan.cta}
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* ─── FAQ ─── */}
                <div className="max-w-3xl mx-auto mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-brand-text mb-4">
                            Frequently Asked <span className="text-gradient">Questions</span>
                        </h2>
                        <p className="text-brand-text-muted">Everything you need to know before you go live.</p>
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
                                    <span className={`text-accent-blue text-xl transition-transform ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                                </button>
                                {openFaq === i && (
                                    <div className="px-6 pb-6 text-brand-text-muted text-sm leading-relaxed border-t border-brand-border pt-4">
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* ─── CTA Banner ─── */}
                <div className="glass-card bg-brand-bg-alt p-8 md:p-12 border border-accent-blue/30 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-blue to-accent-purple" />
                    <h2 className="text-2xl sm:text-3xl font-bold text-brand-text mb-4">
                        Ready to deploy your AI receptionist?
                    </h2>
                    <p className="text-brand-text-muted mb-8 max-w-xl mx-auto">
                        Get a free custom demo built for your practice in 48 hours. No commitment required.
                    </p>
                    <Link to="/services/ai-receptionist" className="btn-primary py-4 px-10">
                        Get Free Demo <ArrowRight className="inline ml-2 w-4 h-4" />
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default Pricing;
