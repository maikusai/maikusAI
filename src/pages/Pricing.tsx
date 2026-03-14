import { motion } from 'framer-motion';
import { CheckCircle2, ShieldCheck, Phone, ArrowRight, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
const Pricing = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const voicePlans = [
        {
            id: 'essential',
            name: 'Essential',
            monthly: '₹5,000',
            setup: '₹20,000 one-time setup',
            minutes: '200 mins/mo free',
            overage: '₹40 / min overage',
            features: [
                '1 AI Receptionist Bot',
                'Dedicated Phone Number',
                'Appointment Booking Automation',
                'Email Notifications for Calls',
                'HIPAA-Ready Infrastructure',
            ],
            cta: 'Get Started',
            popular: false,
            color: 'accent-blue',
        },
        {
            id: 'excel-integration',
            name: 'Excel Integration',
            monthly: '₹6,000',
            setup: '₹20,000 one-time setup',
            minutes: '200 mins/mo free',
            overage: '₹40 / min overage',
            features: [
                'All Essential Features',
                'Direct Excel/Google Sheets Integration',
                'Automated Data Entry',
                'Custom Caller Routing',
                'Priority Email Support',
            ],
            cta: 'Get Started',
            popular: false,
            color: 'accent-green',
        },
        {
            id: 'dashboard-pro',
            name: 'Dashboard Pro',
            monthly: '₹7,500',
            setup: '₹25,000 one-time setup',
            minutes: '400 mins/mo free',
            overage: '₹35 / min overage',
            features: [
                'Live Call Summary Dashboard',
                'Full Call Transcripts & Recordings',
                'Custom Script & AI Persona',
                'Analytics & Insights',
                'Dedicated Account Manager',
            ],
            cta: 'Most Popular — Start Now',
            popular: true,
            color: 'accent-purple',
        },
        {
            id: 'custom-enterprise',
            name: 'Fully Custom',
            monthly: 'Custom',
            setup: 'Custom bespoke development',
            minutes: 'Custom Volume',
            overage: 'Negotiated',
            features: [
                'Unlimited AI Receptionists',
                'Custom CRM/EHR Integrations',
                'Multi-location Routing Patterns',
                'Dedicated Infrastructure',
                '24/7 Priority Support Line',
            ],
            cta: 'Contact Us',
            popular: false,
            color: 'brand-text',
        },
    ];

    const faqs = [
        {
            q: 'Why should I use an AI Receptionist instead of a human?',
            a: 'Unlike a human, an AI Receptionist never takes breaks, never sleeps, and handles multiple calls simultaneously without ever putting patients on hold. This ensures you capture every single lead and never miss out on valuable revenue.',
        },
        {
            q: 'Is this actually HIPAA compliant?',
            a: 'Yes, our platform is built on fully HIPAA-compliant infrastructure combined with securely encrypted phone numbers. Patient names, symptoms, and appointment data are strictly encrypted at rest and in transit, keeping your data absolutely safe.',
        },
        {
            q: 'What happens if I use more minutes than my plan?',
            a: 'Overage minutes are billed at a transparent rate (e.g. ₹20/min on the Standard plan). We send you a usage report so there are no surprises. You can easily upgrade your plan if you require higher capacity.',
        },
        {
            q: 'How does payment work?',
            a: 'We use automated billing. Your monthly platform fee is charged on the 1st of each month. Overage usage is calculated and added to the following month\'s invoice. You receive itemized PDF invoices by email.',
        },
        {
            q: 'Can my patients tell they\'re talking to an AI?',
            a: 'Our bots are fine-tuned to sound natural, warm, and highly professional. Most patients appreciate the instant response and efficient booking process. The bot can also efficiently route calls to a human staff member for complex queries.',
        },
        {
            q: 'What industries do you support?',
            a: 'We\'ve deployed AI receptionists for dental clinics, medical offices, real estate agencies, salons, law firms, and restaurants. If your business receives inbound calls and needs to handle appointments and FAQs, we can completely automate it.',
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-24">
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
                                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-accent-blue to-accent-purple text-brand-text text-xs text-white font-bold text-center py-1">
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
                                to="/services/ai-voice-receptionist"
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
                    <Link to="/services/ai-voice-receptionist" className="btn-primary py-4 px-10">
                        Get Free Demo <ArrowRight className="inline ml-2 w-4 h-4" />
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default Pricing;
