import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Bot, Zap, Clock, Users, Target, ShieldCheck, Mail, MessageSquare, Workflow, BrainCircuit } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    // Mouse tracking for parallax effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth springing for the mouse values
    const smoothX = useSpring(mouseX, { damping: 50, stiffness: 400 });
    const smoothY = useSpring(mouseY, { damping: 50, stiffness: 400 });

    // Transform mouse values to movement ranges for different background layers
    const layer1X = useTransform(smoothX, [-1000, 1000], [-30, 30]);
    const layer1Y = useTransform(smoothY, [-1000, 1000], [-30, 30]);

    const layer2X = useTransform(smoothX, [-1000, 1000], [-60, 60]);
    const layer2Y = useTransform(smoothY, [-1000, 1000], [-60, 60]);

    const layer3X = useTransform(smoothX, [-1000, 1000], [-100, 100]);
    const layer3Y = useTransform(smoothY, [-1000, 1000], [-100, 100]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Calculate center of screen
            const clientX = e.clientX - window.innerWidth / 2;
            const clientY = e.clientY - window.innerHeight / 2;

            mouseX.set(clientX);
            mouseY.set(clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div className="flex flex-col w-full">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center pt-32 lg:pt-40 overflow-hidden bg-brand-bg">
                {/* Interactive Parallax Background Pattern */}
                <div className="absolute inset-0 z-0 overflow-hidden bg-brand-bg">
                    {/* Deep Layer (slowest) */}
                    <motion.div
                        style={{ x: layer1X, y: layer1Y }}
                        className="absolute inset-[-10%] opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent-blue/30 via-transparent to-transparent pointer-events-none"
                    />

                    {/* Middle Layer */}
                    <motion.div
                        style={{ x: layer2X, y: layer2Y }}
                        className="absolute top-[20%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-accent-purple/10 blur-[120px] mix-blend-screen pointer-events-none"
                    />

                    {/* Front Layer (fastest) */}
                    <motion.div
                        style={{ x: layer3X, y: layer3Y }}
                        className="absolute bottom-[10%] left-[10%] w-[30vw] h-[30vw] rounded-full bg-accent-blue/10 blur-[100px] mix-blend-screen pointer-events-none"
                    />

                    {/* Subtle grid pattern linked to deepest layer */}
                    <motion.div
                        style={{
                            x: layer1X,
                            y: layer1Y,
                            ...({
                                maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
                                WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)'
                            } as React.CSSProperties)
                        }}
                        className="absolute inset-[-50%] bg-[linear-gradient(to_right,var(--theme-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--theme-border)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30 pointer-events-none"
                    />
                </div>

                <div className="container relative z-10 mx-auto px-6 lg:px-12 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto"
                    >
                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-6 md:mb-8 leading-tight text-brand-text">
                            Automate Your Business With{' '}
                            <span className="text-gradient">Intelligent AI Systems</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-brand-text-muted mb-12 max-w-3xl mx-auto leading-relaxed">
                            We build AI-powered automation that captures leads, replies instantly, generates content, and scales your operations — 24/7.
                        </p>

                        <div className="relative inline-flex flex-col sm:flex-row items-center justify-center gap-6 mt-4">
                            <Link to="/contact" className="btn-primary w-full sm:w-auto text-lg py-4 px-10">
                                Get Free AI Audit
                            </Link>
                            <a href="#services" className="btn-secondary w-full sm:w-auto text-lg py-4 px-10 gap-2 group">
                                Book Strategy Call <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </a>

                            {/* Animated Pointing Arrow (Desktop Only) */}
                            <motion.div
                                className="hidden lg:block absolute -right-32 top-[-60px] pointer-events-none"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1.2, duration: 0.5 }}
                            >
                                <motion.svg
                                    width="160"
                                    height="120"
                                    viewBox="0 0 160 120"
                                    fill="none"
                                    className="text-accent-blue drop-shadow-[0_0_8px_rgba(0,240,255,0.6)] overflow-visible"
                                    animate={{ y: [0, 8, 0], rotate: [0, 5, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    {/* Arrow Path */}
                                    <motion.path
                                        d="M 110 30 Q 80 15 30 80 L 45 85 M 30 80 L 30 65"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ delay: 1.5, duration: 1, ease: "circOut" }}
                                    />
                                    {/* Fun Text */}
                                    <motion.text
                                        x="55"
                                        y="25"
                                        className="text-sm font-bold fill-current tracking-wider uppercase"
                                        transform="rotate(-12, 70, 25)"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 2, duration: 0.5 }}
                                    >
                                        Let's Build!
                                    </motion.text>
                                </motion.svg>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Problem Section */}
            <section className="py-24 bg-brand-bg-alt relative border-t border-brand-border">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-brand-text">Most Businesses Are Still Doing This <span className="text-accent-red">Manually</span></h2>
                        <p className="text-brand-text-muted text-lg max-w-2xl mx-auto">Wasting time on repetitive tasks means losing money and stunting growth.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: Users, title: "Manual lead follow-ups", desc: "Leads get cold while you sleep." },
                            { icon: Clock, title: "Slow customer replies", desc: "Customers go to competitors who answer faster." },
                            { icon: Target, title: "Inconsistent marketing", desc: "No time to post on social media regularly." },
                            { icon: ShieldCheck, title: "Wasted employee hours", desc: "Paying humans to do robot work." }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.5 }}
                                className="glass-card flex flex-col items-center text-center group"
                            >
                                <div className="w-14 h-14 rounded-full bg-accent-red/10 flex items-center justify-center text-accent-red mb-6 group-hover:scale-110 transition-transform">
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-brand-text mb-3">{item.title}</h3>
                                <p className="text-brand-text-muted">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-24 bg-gradient-to-b from-brand-bg to-brand-bg-alt relative">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-brand-text">Our <span className="text-gradient">AI Systems</span></h2>
                        <p className="text-brand-text-muted text-lg max-w-2xl mx-auto">We don't just give advice. We build custom infrastructure that runs your business automatically.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { icon: Mail, title: "AI Email Automation", desc: "Automate outbound sequences, inbound routing, and custom support replies based on your docs." },
                            { icon: Zap, title: "Smart Lead Generation Funnels", desc: "AI qualifies leads, books meetings, and adds them to your CRM without human input." },
                            { icon: Bot, title: "Website AI Chatbots", desc: "Next-gen intelligent bots that speak your brand voice and close sales 24/7." },
                            { icon: MessageSquare, title: "Social Media Automation", desc: "AI-generated content schedules, auto-replies to DMs, and community management." },
                            { icon: Workflow, title: "CRM & Workflow Automation", desc: "Connect thousands of apps. Data flows instantly where it needs to go." },
                            { icon: BrainCircuit, title: "Custom AI Tools", desc: "Bespoke internal dashboards and AI assistants trained on your proprietary data." }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.5 }}
                                className="glass-card relative overflow-hidden group"
                            >
                                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <item.icon className="w-24 h-24 text-accent-blue" />
                                </div>
                                <div className="relative z-10 w-12 h-12 rounded-lg bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 flex items-center justify-center text-accent-blue mb-6 border border-brand-border">
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-brand-text mb-3 relative z-10">{item.title}</h3>
                                <p className="text-brand-text-muted mb-6 relative z-10">{item.desc}</p>
                                <Link
                                    to={
                                        item.title === "AI Email Automation" ? "/services/ai-email-automation" :
                                            item.title === "Smart Lead Generation Funnels" ? "/services/leadgen" :
                                                item.title === "Website AI Chatbots" ? "/services/chatbots" :
                                                    item.title === "Social Media Automation" ? "/services/social-media" :
                                                        item.title === "CRM & Workflow Automation" ? "/services/workflows" :
                                                            item.title === "Custom AI Tools" ? "/services/custom" : "/services"
                                    }
                                    className="inline-flex items-center text-accent-blue font-semibold hover:text-accent-purple transition-colors relative z-10"
                                >
                                    Learn More <ArrowRight className="w-4 h-4 ml-2" />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-24 bg-brand-bg relative border-t border-brand-border">
                <div className="container mx-auto px-6 lg:px-12 text-center">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-16 text-brand-text">How We Build <span className="text-gradient">Your Machine</span></h2>

                    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { step: "1", title: "Audit & Strategy", desc: "We map out your current bottlenecks." },
                            { step: "2", title: "Custom AI Dev", desc: "We build tailored infrastructure." },
                            { step: "3", title: "Deployment", desc: "Seamless integration into your workflow." },
                            { step: "4", title: "Scale & Grow", desc: "We optimize for maximum ROI." }
                        ].map((item, idx) => (
                            <div key={idx} className="relative flex flex-col items-center">
                                <div className="w-16 h-16 rounded-full bg-brand-bg border-2 border-accent-blue flex items-center justify-center text-2xl font-bold text-accent-blue mb-6 z-10 shadow-[0_0_30px_rgba(0,240,255,0.2)]">
                                    {item.step}
                                </div>
                                {idx !== 3 && (
                                    <div className="hidden md:block absolute top-8 left-1/2 w-full h-[2px] bg-gradient-to-r from-accent-blue via-accent-purple to-transparent -z-0"></div>
                                )}
                                <h3 className="text-lg font-bold text-brand-text mb-2">{item.title}</h3>
                                <p className="text-brand-text-muted text-sm px-4">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Case Study Section */}
            <section id="case-studies" className="py-24 bg-brand-bg-alt relative border-y border-brand-border">
                <div className="container mx-auto px-6 lg:px-12">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-16 text-center text-brand-text">Real <span className="text-gradient">Results</span></h2>

                    <div className="max-w-4xl mx-auto glass-card p-6 md:p-10 bg-gradient-to-br from-brand-bg to-brand-bg-alt flex flex-col md:flex-row items-center gap-10">
                        <div className="flex-1">
                            <div className="text-sm text-accent-blue font-bold tracking-wider uppercase mb-2">Case Study - Dental Clinic</div>
                            <h3 className="text-3xl font-bold text-brand-text mb-6 leading-tight">Increased Appointments by <span className="text-accent-green">42%</span> Using AI Automation.</h3>

                            <div className="flex gap-8 mb-8">
                                <div>
                                    <div className="text-sm text-brand-text-muted mb-1">Before AI</div>
                                    <div className="text-xl font-bold text-brand-text">12 Hrs/wk</div>
                                    <div className="text-xs text-brand-text-muted mt-1">on follow-ups</div>
                                </div>
                                <div className="w-[1px] bg-brand-border"></div>
                                <div>
                                    <div className="text-sm text-brand-text-muted mb-1">After AI</div>
                                    <div className="text-xl font-bold text-accent-green">0 Hrs/wk</div>
                                    <div className="text-xs text-brand-text-muted mt-1">100% automated</div>
                                </div>
                            </div>

                            <blockquote className="border-l-4 border-accent-blue pl-4 mb-6">
                                <p className="italic text-brand-text-muted">"We literally stopped worrying about missed leads. The AI bot talks to patients and books them straight into our calendar."</p>
                                <footer className="mt-2 text-sm text-brand-text-muted">— Dr. Sarah Jenkins, Owner</footer>
                            </blockquote>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 bg-brand-bg">
                <div className="container mx-auto px-6 lg:px-12 text-center">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-16 text-center text-brand-text">What Founders Are Saying</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { name: "Alex R.", role: "SaaS Founder", quote: "They replaced our entire Tier 1 support team with an AI bot in 2 weeks. Insane." },
                            { name: "Marcus T.", role: "eCommerce Brand", quote: "Our abandoned cart recovery went from 12% to 38% after implementing Maikus AI's workflows." },
                            { name: "Priya M.", role: "Local Agency Owner", quote: "Best investment I made this year. It feels like I have 5 extra employees working 24/7." },
                            { name: "James L.", role: "Real Estate", quote: "Lead qualification is completely hands-off now. I only talk to ready buyers." },
                        ].map((t, i) => (
                            <div key={i} className="glass-card text-left flex flex-col justify-between">
                                <p className="text-brand-text-muted text-sm italic mb-6">"{t.quote}"</p>
                                <div>
                                    <div className="font-bold text-brand-text">{t.name}</div>
                                    <div className="text-xs text-accent-blue">{t.role}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-24 bg-brand-bg-alt relative border-t border-brand-border">
                <div className="container mx-auto px-6 lg:px-12 text-center">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-brand-text">Simple <span className="text-gradient">Pricing</span></h2>
                    <p className="text-brand-text-muted text-lg mb-16">High-ROI systems that pay for themselves in weeks.</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* Starter */}
                        <div className="glass-card flex flex-col items-center justify-between p-10 border-brand-border opacity-90 hover:opacity-100 transition-opacity">
                            <div className="w-full text-center">
                                <h3 className="text-2xl font-bold text-brand-text mb-2">Starter</h3>
                                <div className="text-brand-text-muted text-sm mb-6">For small businesses</div>
                                <div className="text-4xl font-bold text-brand-text mb-8">₹15,000<span className="text-lg text-brand-text-muted font-normal"> setup</span></div>
                                <ul className="text-left space-y-4 mb-8 text-brand-text-muted w-full">
                                    <li className="flex items-center gap-2"><Zap className="w-4 h-4 text-accent-blue" /> Basic Email Automation</li>
                                    <li className="flex items-center gap-2"><Zap className="w-4 h-4 text-accent-blue" /> Standard Web Chatbot</li>
                                    <li className="flex items-center gap-2"><Zap className="w-4 h-4 opacity-50" /> No CRM Integration</li>
                                </ul>
                            </div>
                            <Link to="/contact" className="btn-secondary w-full py-3">Start Now</Link>
                        </div>
                        {/* Growth - Highlighted */}
                        <div className="glass-card flex flex-col items-center justify-between p-10 border-accent-blue relative transform md:-translate-y-4 shadow-[0_0_50px_rgba(0,240,255,0.1)]">
                            <div className="absolute top-0 w-full bg-gradient-to-r from-accent-blue to-accent-purple text-white text-xs font-bold text-center py-1 rounded-t-2xl">MOST POPULAR</div>
                            <div className="w-full text-center mt-6">
                                <h3 className="text-2xl font-bold text-brand-text mb-2">Growth</h3>
                                <div className="text-brand-text-muted text-sm mb-6">For scaling companies</div>
                                <div className="text-4xl font-bold text-brand-text mb-8">₹35,000<span className="text-lg text-brand-text-muted font-normal"> setup</span></div>
                                <ul className="text-left space-y-4 mb-8 text-brand-text-muted w-full">
                                    <li className="flex items-center gap-2"><Zap className="w-4 h-4 text-accent-blue" /> Adv. Lead Gen Funnels</li>
                                    <li className="flex items-center gap-2"><Zap className="w-4 h-4 text-accent-blue" /> AI Sales Chatbot</li>
                                    <li className="flex items-center gap-2"><Zap className="w-4 h-4 text-accent-blue" /> Full CRM Integration</li>
                                </ul>
                            </div>
                            <Link to="/contact" className="btn-primary w-full py-3">Start Now</Link>
                        </div>
                        {/* Enterprise */}
                        <div className="glass-card flex flex-col items-center justify-between p-10 border-brand-border opacity-90 hover:opacity-100 transition-opacity">
                            <div className="w-full text-center">
                                <h3 className="text-2xl font-bold text-brand-text mb-2">Enterprise</h3>
                                <div className="text-brand-text-muted text-sm mb-6">Custom deployment</div>
                                <div className="text-4xl font-bold text-brand-text mb-8">Custom<span className="text-lg text-brand-text-muted font-normal"> pricing</span></div>
                                <ul className="text-left space-y-4 mb-8 text-brand-text-muted w-full">
                                    <li className="flex items-center gap-2"><Zap className="w-4 h-4 text-accent-blue" /> Custom Private LLMs</li>
                                    <li className="flex items-center gap-2"><Zap className="w-4 h-4 text-accent-blue" /> Dedicated Infrastructure</li>
                                    <li className="flex items-center gap-2"><Zap className="w-4 h-4 text-accent-blue" /> 24/7 Priority Support</li>
                                </ul>
                            </div>
                            <Link to="/contact" className="btn-secondary w-full py-3">Contact Sales</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 bg-brand-bg relative overflow-hidden border-t border-brand-border">
                <div className="absolute inset-0 bg-gradient-to-t from-accent-blue/10 to-transparent"></div>
                <div className="container relative z-10 mx-auto px-6 text-center">
                    <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-brand-text mb-10 tracking-tight">Let AI Work <span className="text-gradient">For You</span></h2>
                    <Link to="/contact" className="btn-primary text-xl py-5 px-12 shadow-[0_0_40px_rgba(209,0,255,0.4)]">Get Your Free AI Blueprint</Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
