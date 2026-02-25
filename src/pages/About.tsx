import { motion } from 'framer-motion';
import { Target, Zap, Shield, Cpu } from 'lucide-react';

const About = () => {
    return (
        <div className="pt-32 lg:pt-40 pb-20">
            <div className="container mx-auto px-6 lg:px-12">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-brand-text"
                    >
                        We Build The <span className="text-gradient">Future Of Work</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-brand-text-muted text-lg md:text-xl"
                    >
                        Maikus AI is an automation agency bridging the gap between cutting-edge artificial intelligence and everyday business operations.
                    </motion.p>
                </div>

                {/* Mission & Vision */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
                    <div className="glass-card p-10 border-t-2 border-t-accent-blue">
                        <h3 className="text-2xl font-bold text-brand-text mb-4">Our Mission</h3>
                        <p className="text-brand-text-muted leading-relaxed">
                            To drastically reduce the time businesses spend on repetitive, manual tasks. We believe human talent should be reserved for strategy, creativity, and connection—not data entry and email follow-ups.
                        </p>
                    </div>
                    <div className="glass-card p-10 border-t-2 border-t-accent-purple">
                        <h3 className="text-2xl font-bold text-brand-text mb-4">Our Vision</h3>
                        <p className="text-brand-text-muted leading-relaxed">
                            Helping 10,000 operations-heavy businesses fully automate their workflows by 2030, transforming them into lean, highly profitable, AI-powered machines.
                        </p>
                    </div>
                </div>

                {/* Founder Story */}
                <div className="mb-24 flex flex-col md:flex-row items-center gap-16">
                    <div className="w-full md:w-1/2 relative">
                        <div className="aspect-square rounded-3xl overflow-hidden bg-brand-bg border border-brand-border relative">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent-blue/20 to-transparent blur-2xl"></div>
                            {/* Placeholder for founder image */}
                            <div className="w-full h-full flex flex-col items-center justify-center text-brand-text-muted">
                                <Cpu className="w-24 h-24 mb-4 opacity-50" />
                                <span className="font-mono text-sm uppercase tracking-widest text-accent-blue">Founder Portrait</span>
                            </div>
                        </div>
                        {/* Decorative elements */}
                        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent-purple/20 rounded-full blur-3xl"></div>
                    </div>
                    <div className="w-full md:w-1/2">
                        <h2 className="text-3xl md:text-4xl font-bold text-brand-text mb-6">Built by engineers. Driven by ROI.</h2>
                        <p className="text-brand-text-muted mb-6 leading-relaxed">
                            It started simply: seeing incredibly smart business owners drowning in mundane administrative tasks. From missing client inquiries due to high volume, to spending weekends manually organizing CRMs.
                        </p>
                        <p className="text-brand-text-muted mb-6 leading-relaxed">
                            I realized that existing software wasn't enough. Businesses didn't need another SaaS subscription; they needed a custom infrastructure that stitched their tools together using AI reasoning.
                        </p>
                        <p className="text-brand-text-muted leading-relaxed">
                            Today, Maikus AI exists to build bespoke systems that act as an invisible, flawless team working behind the scenes 24/7.
                        </p>
                        <div className="mt-8">
                            <div className="font-bold text-brand-text text-xl">Founder Name</div>
                            <div className="text-accent-blue text-sm">Lead Solutions Engineer</div>
                        </div>
                    </div>
                </div>

                {/* Core Values */}
                <div>
                    <h2 className="text-3xl font-bold text-center mb-12 text-brand-text">Our Core Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            { icon: Target, title: "ROI-Focused", desc: "If our systems don't save you money or make you money, we don't build them." },
                            { icon: Zap, title: "Speed", desc: "We deploy lean, iterate fast, and deliver working systems in weeks, not months." },
                            { icon: Shield, title: "Simplicity", desc: "Complex on the backend, beautifully simple and frictionless for your team." },
                            { icon: Cpu, title: "Innovation", desc: "We constantly test the latest LLMs to give our clients an unfair advantage." }
                        ].map((value, idx) => (
                            <div key={idx} className="glass-card text-center py-10 px-6 hover:-translate-y-2 transition-transform">
                                <div className="w-12 h-12 mx-auto rounded-full bg-accent-blue/10 flex items-center justify-center text-accent-blue mb-6">
                                    <value.icon className="w-6 h-6" />
                                </div>
                                <h4 className="text-brand-text font-bold mb-3">{value.title}</h4>
                                <p className="text-brand-text-muted text-sm leading-relaxed">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default About;
