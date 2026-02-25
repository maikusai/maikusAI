import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Zap, MessageSquare, Workflow, BrainCircuit, ArrowRight, CheckCircle2, Play, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
    const [demoVideo, setDemoVideo] = useState<string | null>(null);

    const services = [
        {
            id: "email",
            icon: Mail,
            title: "AI Email Systems",
            problem: "Your sales team spends 60% of their day writing follow-ups and answering repetitive questions.",
            solution: "We deploy an AI agent that drafts, personalizes, and sends emails automatically based on intent.",
            benefits: ["Instant replies (under 2 minutes)", "Hyper-personalized cold outreach", "Zero missed leads"],
            useCase: "A B2B agency automated their cold outreach and achieved a 22% reply rate, booking 15 extra meetings per month."
        },
        {
            id: "leadgen",
            icon: Zap,
            title: "Lead Generation Systems",
            problem: "You have traffic, but no predictable way to capture and qualify them automatically.",
            solution: "Intelligent funnels that offer personalized lead magnets and dynamically qualify prospects.",
            benefits: ["24/7 prospect qualification", "Seamless CRM integration", "Higher conversion rates"],
            useCase: "A real estate firm used our system to qualify 500+ leads automatically, only passing hot buyers to agents."
        },
        {
            id: "chatbots",
            icon: MessageSquare,
            title: "AI Chatbots",
            problem: "Customers bounce from your website because they can't get their specific questions answered instantly.",
            solution: "Custom-trained LLM chatbots that know your entire business and speak in your brand voice.",
            benefits: ["Resolves 80% of support queries", "Books appointments instantly", "Multi-language support"],
            useCase: "An eCommerce store recovered $12k in abandoned carts using an AI chatbot that answered sizing questions."
        },
        {
            id: "social-media",
            icon: MessageSquare,
            title: "Social Media Automation",
            problem: "You are spending hours daily creating content, scheduling posts, and replying to repetitive DMs.",
            solution: "AI generation and distribution systems that run your socials and handle inbound messages automatically.",
            benefits: ["Automated content calendars", "Instant DM lead capture", "Multi-platform scheduling"],
            useCase: "A fitness coach automated Instagram DMs to send booking links and scaled their client calendar by 30%."
        },
        {
            id: "workflows",
            icon: Workflow,
            title: "Automation Workflows",
            problem: "Data is siloed across 10 different apps. Your team manually copies and pastes information daily.",
            solution: "Architectural workflows via Zapier/Make that connect your tools and orchestrate complex tasks.",
            benefits: ["Eliminates human error", "Saves 20+ hours per week", "Instantly triggers actions across platforms"],
            useCase: "A clinic automated patient onboarding, consent forms, and follow-ups, saving the admin staff 12 hours a week."
        },
        {
            id: "custom",
            icon: BrainCircuit,
            title: "Custom AI Development",
            problem: "Off-the-shelf software doesn't fit your unique operational workflows and proprietary data.",
            solution: "Bespoke internal AI applications, tools, and dashboards built entirely for your specific needs.",
            benefits: ["Full data ownership & privacy", "Tailored to your exact SOPs", "Scalable infrastructure"],
            useCase: "A consulting firm got a custom internal research tool that summarized 100-page reports in seconds."
        }
    ];

    return (
        <div className="pt-32 lg:pt-40 pb-20">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-brand-text">Our <span className="text-gradient">Capabilities</span></h1>
                    <p className="text-brand-text-muted text-lg md:text-xl">
                        We don't sell generic ChatGPT prompts. We engineer robust, enterprise-grade AI systems that run your operations automatically.
                    </p>
                </div>

                <div className="flex flex-col gap-20">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                            className={`flex flex-col md:flex-row gap-12 items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                        >
                            <div className="flex-1">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-blue/10 to-accent-purple/10 flex items-center justify-center border border-white/5 mb-6">
                                    <service.icon className="w-8 h-8 text-accent-blue" />
                                </div>
                                <h2 className="text-3xl font-bold text-brand-text mb-6">{service.title}</h2>
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-brand-text-muted font-bold uppercase tracking-wide text-xs mb-2">The Problem</h4>
                                        <p className="text-brand-text-muted">{service.problem}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-brand-text-muted font-bold uppercase tracking-wide text-xs mb-2">Our Solution</h4>
                                        <p className="text-brand-text-muted">{service.solution}</p>
                                    </div>
                                </div>

                                <div className="mt-8 pt-8 border-t border-brand-border">
                                    <h4 className="text-brand-text font-semibold mb-4">Core Benefits:</h4>
                                    <ul className="space-y-3">
                                        {service.benefits.map((benefit, i) => (
                                            <li key={i} className="flex items-center gap-3 text-brand-text-muted">
                                                <CheckCircle2 className="w-5 h-5 text-accent-blue flex-shrink-0" />
                                                {benefit}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="mt-8 flex flex-wrap gap-4">
                                    <Link to={`/services/${service.id === 'email' ? 'ai-email-automation' : service.id}`} className="btn-primary py-3 px-6">Request Service</Link>
                                    <button
                                        onClick={() => setDemoVideo(`/videos/${service.id}-demo.mp4`)}
                                        className="btn-secondary py-3 px-6 flex items-center gap-2"
                                    >
                                        <Play className="w-4 h-4" /> Show Demo
                                    </button>
                                </div>
                            </div>

                            <div className="flex-1 w-full relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/20 to-accent-purple/20 blur-3xl opacity-30 rounded-full"></div>
                                <div className="glass-card relative p-8 border border-brand-border">
                                    <h4 className="text-brand-text font-bold mb-4 flex items-center gap-2">
                                        <Zap className="w-5 h-5 text-accent-purple" />
                                        Example Use Case
                                    </h4>
                                    <p className="text-brand-text-muted italic">"{service.useCase}"</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-32 text-center glass-card bg-brand-bg-alt p-8 md:p-12 border border-accent-blue/30 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-blue to-accent-purple"></div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-brand-text mb-4">Ready to automate your workflows?</h2>
                    <p className="text-brand-text-muted mb-8 max-w-2xl mx-auto">Stop paying humans to do robotic work. Let's engineer a system tailored to your specific bottlenecks.</p>
                    <Link to="/contact" className="btn-primary py-4 px-10">Get Your Free AI Audit <ArrowRight className="inline ml-2" /></Link>
                </div>
            </div>

            {/* Video Modal */}
            <AnimatePresence>
                {demoVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-bg/90 backdrop-blur-sm p-4"
                    >
                        <div className="relative w-full max-w-5xl rounded-2xl overflow-hidden bg-brand-bg border border-brand-border shadow-2xl">
                            <button
                                onClick={() => setDemoVideo(null)}
                                className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-accent-blue transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                            <div className="aspect-video bg-black flex items-center justify-center">
                                <video
                                    src={demoVideo}
                                    controls
                                    autoPlay
                                    className="w-full h-full object-contain"
                                >
                                    <p className="text-white">Your browser does not support the video tag. Please update your browser.</p>
                                </video>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Services;
