import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Zap, MessageSquare, Workflow, BrainCircuit, Phone, ArrowRight, CheckCircle2, Play, X, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
    const [demoVideo, setDemoVideo] = useState<string | null>(null);

    const flagshipService = {
        id: "ai-voice-receptionist",
        icon: Phone,
        title: "AI Voice Receptionist",
        isFlagship: true,
        problem: "Your front desk misses calls after hours, loses leads to voicemail, and costs you a full-time salary every month.",
        solution: "We deploy a 24/7 HIPAA-ready AI receptionist on your phone line. It books appointments, answers FAQs, and captures every lead — automatically.",
        benefits: ["Never miss an inbound call", "HIPAA-compliant infrastructure", "Setup fee + predictable monthly plan"],
        useCase: "A dental clinic deployed an AI receptionist and booked 22 extra appointments in the first month — at zero extra staffing cost."
    };

    const upcomingServices = [
        {
            id: "email",
            icon: Mail,
            title: "AI Email Systems",
            isFlagship: false,
            problem: "Your sales team spends 60% of their day writing follow-ups and answering repetitive questions.",
            solution: "We deploy an AI agent that drafts, personalizes, and sends emails automatically based on intent.",
            benefits: ["Instant replies (under 2 minutes)", "Hyper-personalized cold outreach", "Zero missed leads"],
            useCase: "A B2B agency automated their cold outreach and achieved a 22% reply rate, booking 15 extra meetings per month."
        },
        {
            id: "leadgen",
            icon: Zap,
            title: "Lead Generation Systems",
            isFlagship: false,
            problem: "You have traffic, but no predictable way to capture and qualify them automatically.",
            solution: "Intelligent funnels that offer personalized lead magnets and dynamically qualify prospects.",
            benefits: ["24/7 prospect qualification", "Seamless CRM integration", "Higher conversion rates"],
            useCase: "A real estate firm used our system to qualify 500+ leads automatically, only passing hot buyers to agents."
        },
        {
            id: "chatbots",
            icon: MessageSquare,
            title: "AI Chatbots",
            isFlagship: false,
            problem: "Customers bounce from your website because they can't get their specific questions answered instantly.",
            solution: "Custom-trained LLM chatbots that know your entire business and speak in your brand voice.",
            benefits: ["Resolves 80% of support queries", "Books appointments instantly", "Multi-language support"],
            useCase: "An eCommerce store recovered $12k in abandoned carts using an AI chatbot that answered sizing questions."
        },
        {
            id: "social-media",
            icon: MessageSquare,
            title: "Social Media Automation",
            isFlagship: false,
            problem: "You are spending hours daily creating content, scheduling posts, and replying to repetitive DMs.",
            solution: "AI generation and distribution systems that run your socials and handle inbound messages automatically.",
            benefits: ["Automated content calendars", "Instant DM lead capture", "Multi-platform scheduling"],
            useCase: "A fitness coach automated Instagram DMs to send booking links and scaled their client calendar by 30%."
        },
        {
            id: "workflows",
            icon: Workflow,
            title: "Automation Workflows",
            isFlagship: false,
            problem: "Data is siloed across 10 different apps. Your team manually copies and pastes information daily.",
            solution: "Architectural workflows via Zapier/Make that connect your tools and orchestrate complex tasks.",
            benefits: ["Eliminates human error", "Saves 20+ hours per week", "Instantly triggers actions across platforms"],
            useCase: "A clinic automated patient onboarding, consent forms, and follow-ups, saving the admin staff 12 hours a week."
        },
        {
            id: "custom",
            icon: BrainCircuit,
            title: "Custom AI Development",
            isFlagship: false,
            problem: "Off-the-shelf software doesn't fit your unique operational workflows and proprietary data.",
            solution: "Bespoke internal AI applications, tools, and dashboards built entirely for your specific needs.",
            benefits: ["Full data ownership & privacy", "Tailored to your exact SOPs", "Scalable infrastructure"],
            useCase: "A consulting firm got a custom internal research tool that summarized 100-page reports in seconds."
        }
    ];

    const services = [flagshipService, ...upcomingServices];

    return (
        <div className="pt-32 lg:pt-40 pb-20 bg-brand-bg text-brand-text">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-blue/10 border border-accent-blue/20 text-accent-blue text-sm font-bold tracking-widest uppercase mb-8">
                        The Hub
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-brand-text"><span className="text-gradient">AI Automations</span> Platform</h1>
                    <p className="text-brand-text-muted text-lg md:text-xl leading-relaxed">
                        We build intelligent systems that run your business operations smoothly 24/7. Discover our flagship platform and upcoming ecosystem.
                    </p>
                </div>
                
                {/* Service Quick Navigation */}
                <div className="sticky top-20 z-40 py-4 mb-20 -mx-6 px-6 bg-brand-bg/80 backdrop-blur-md border-y border-brand-border overflow-x-auto no-scrollbar">
                    <div className="flex items-center gap-4 md:justify-center min-w-max pb-2 md:pb-0">
                        {services.map((service) => (
                            <button
                                key={`nav-${service.id}`}
                                onClick={() => document.getElementById(service.id)?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all group shrink-0 ${service.isFlagship ? 'border-accent-blue bg-accent-blue/10 hover:bg-accent-blue/20' : 'border-brand-border bg-brand-bg-alt hover:border-accent-purple/30'}`}
                            >
                                <service.icon className={`w-4 h-4 transition-colors ${service.isFlagship ? 'text-accent-blue' : 'text-brand-text-muted group-hover:text-accent-purple'}`} />
                                <span className={`text-sm font-medium transition-colors ${service.isFlagship ? 'text-brand-text' : 'text-brand-text-muted group-hover:text-brand-text'}`}>
                                    {service.title} {service.isFlagship ? '' : '(Coming Soon)'}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-32">
                    {services.map((service, index) => {
                        const isFlagship = service.isFlagship;
                        return (
                            <motion.div
                                key={service.id}
                                id={service.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6 }}
                                className={`relative flex flex-col md:flex-row gap-12 items-center scroll-mt-40 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                            >
                                {!isFlagship && (
                                    <div className="absolute inset-0 z-20 bg-brand-bg/60 backdrop-blur-[2px] rounded-3xl border border-brand-border flex items-center justify-center -m-8 pointer-events-none">
                                        <div className="flex flex-col items-center bg-brand-bg/90 border border-brand-border px-8 py-4 rounded-full shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                                            <Lock className="w-6 h-6 text-brand-text-muted mb-2" />
                                            <span className="text-xl font-bold tracking-widest uppercase text-brand-text/50">Coming Soon</span>
                                        </div>
                                    </div>
                                )}

                                <div className={`flex-1 ${!isFlagship ? 'opacity-40 grayscale pointer-events-none' : ''}`}>
                                    <div className={`w-20 h-20 rounded-2xl flex items-center justify-center border shadow-lg mb-8 ${isFlagship ? 'bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 border-accent-blue/30 shadow-accent-blue/20' : 'bg-brand-bg-alt border-white/5'}`}>
                                        <service.icon className={`w-10 h-10 ${isFlagship ? 'text-accent-blue' : 'text-brand-text'}`} />
                                    </div>
                                    
                                    <div className="flex items-center gap-4 mb-6">
                                        <h2 className={`text-3xl md:text-4xl font-bold text-brand-text ${isFlagship && 'text-gradient'}`}>{service.title}</h2>
                                        {isFlagship && (
                                            <span className="px-3 py-1 bg-accent-blue/20 text-accent-blue text-xs font-bold uppercase tracking-widest rounded-full">Flagship</span>
                                        )}
                                    </div>

                                    <div className="space-y-8 glass-card border-none bg-transparent p-0">
                                        <div className="relative pl-6 border-l-2 border-accent-red/50">
                                            <h4 className="text-accent-red font-bold uppercase tracking-wide text-xs mb-2">The Problem</h4>
                                            <p className="text-brand-text-muted text-lg">{service.problem}</p>
                                        </div>
                                        <div className="relative pl-6 border-l-2 border-accent-blue/50">
                                            <h4 className="text-accent-blue font-bold uppercase tracking-wide text-xs mb-2">Our Solution</h4>
                                            <p className="text-brand-text text-lg">{service.solution}</p>
                                        </div>
                                    </div>

                                    <div className="mt-8 pt-8 border-t border-brand-border">
                                        <h4 className="text-brand-text font-semibold mb-4 text-lg">Core Benefits:</h4>
                                        <ul className="space-y-4">
                                            {service.benefits.map((benefit, i) => (
                                                <li key={i} className="flex items-center gap-3 text-brand-text-muted text-lg">
                                                    <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${isFlagship ? 'text-accent-blue' : 'text-brand-text-muted'}`} />
                                                    {benefit}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="mt-10 flex flex-wrap gap-4">
                                        <Link to={`/contact`} className={`${isFlagship ? 'btn-primary' : 'btn-secondary opacity-50'} py-4 px-8 text-lg font-bold`}>
                                            {isFlagship ? 'Request Service' : 'Join Waitlist'}
                                        </Link>
                                        
                                        {isFlagship && (
                                            <button
                                                onClick={() => setDemoVideo(`/videos/${service.id}-demo.mp4`)}
                                                className="btn-secondary py-4 px-8 flex items-center gap-2 text-lg hover:border-accent-blue transition-colors"
                                            >
                                                <Play className="w-5 h-5" /> View Demo
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className={`flex-1 w-full relative ${!isFlagship ? 'opacity-40 grayscale pointer-events-none' : ''}`}>
                                    <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/20 to-accent-purple/20 blur-[100px] opacity-40 rounded-full"></div>
                                    <div className={`glass-card relative p-10 border ${isFlagship ? 'border-accent-blue/30 shadow-[0_0_40px_rgba(0,240,255,0.15)] bg-brand-bg-alt/80' : 'border-brand-border bg-brand-bg/50'}`}>
                                        <h4 className="text-brand-text font-bold mb-6 flex items-center gap-3 text-xl">
                                            <Zap className={`w-6 h-6 ${isFlagship ? 'text-accent-purple' : 'text-brand-text-muted'}`} />
                                            Example Use Case
                                        </h4>
                                        <p className="text-brand-text-muted italic text-xl leading-relaxed">"{service.useCase}"</p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                <div className="mt-40 text-center glass-card bg-brand-bg-alt p-12 md:p-16 border border-accent-blue/30 relative overflow-hidden shadow-[0_0_60px_rgba(0,240,255,0.1)]">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-blue to-accent-purple"></div>
                    <h2 className="text-4xl sm:text-5xl font-bold text-brand-text mb-6">Ready to automate your calls?</h2>
                    <p className="text-brand-text-muted text-xl mb-10 max-w-2xl mx-auto">Stop paying humans to do robotic work. Let's engineer a voice system tailored to your specific bottlenecks.</p>
                    <Link to="/contact" className="btn-primary py-5 px-12 text-xl shadow-[0_0_30px_rgba(0,240,255,0.3)] hover:shadow-[0_0_50px_rgba(0,240,255,0.5)]">Get Your Free AI Audit <ArrowRight className="inline ml-2" /></Link>
                </div>
            </div>

            {/* Video Modal */}
            <AnimatePresence>
                {demoVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-bg/95 backdrop-blur-md p-4"
                    >
                        <div className="relative w-full max-w-5xl rounded-2xl overflow-hidden bg-brand-bg border border-brand-border shadow-[0_0_100px_rgba(0,240,255,0.2)]">
                            <button
                                onClick={() => setDemoVideo(null)}
                                className="absolute top-4 right-4 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-brand-bg/50 border border-brand-border text-brand-text hover:bg-accent-blue hover:text-brand-bg transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                            <div className="aspect-video bg-black flex items-center justify-center relative">
                                <video
                                    src={demoVideo}
                                    controls
                                    autoPlay
                                    className="w-full h-full object-contain"
                                >
                                    <p className="text-brand-text">Your browser does not support the video tag. Please update your browser.</p>
                                </video>
                                {/* Fallback UI if video doesn't load/exist */}
                                <div className="absolute inset-0 mt-20 flex flex-col items-center justify-center pointer-events-none opacity-50">
                                    <Play className="w-20 h-20 text-brand-border mb-4" />
                                    <p className="text-brand-text-muted">Video Demo Not Available</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Services;
