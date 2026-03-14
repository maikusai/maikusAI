import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, Clock, Calendar, Globe, Target, Building2, Stethoscope, Scissors, Home as HomeIcon, Bot, MessageSquare, Zap, Users, Mail, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import DecryptedText from '../components/DecryptedText';
import { Canvas } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';

// Interactive 3D Sphere Component
const AnimatedSphere = () => {
    return (
        <Sphere visible args={[1, 100, 200]} scale={2}>
            <MeshDistortMaterial
                color="#00f0ff"
                attach="material"
                distort={0.4}
                speed={2}
                roughness={0.2}
            />
        </Sphere>
    );
};



const NumberCounter = ({ from, to, duration = 2, prefix = "", suffix = "" }: { from: number, to: number, duration?: number, prefix?: string, suffix?: string }) => {
    const [count, setCount] = useState(from);

    useEffect(() => {
        let startTime: number;
        const animate = (time: number) => {
            if (!startTime) startTime = time;
            const progress = (time - startTime) / (duration * 1000);
            if (progress < 1) {
                setCount(Math.floor(from + (to - from) * progress));
                requestAnimationFrame(animate);
            } else {
                setCount(to);
            }
        };
        requestAnimationFrame(animate);
    }, [from, to, duration]);

    return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
}

const Home = () => {
    // unused yTransform removed
    const navigate = useNavigate();

    const handleDemoNavigation = (e: React.MouseEvent) => {
        e.preventDefault();
        navigate('/services/ai-voice-receptionist');
        setTimeout(() => {
            document.getElementById('live-demo')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    return (
        <div className="flex flex-col w-full bg-brand-bg text-brand-text overflow-hidden">

            {/* HERO SECTION */}
            <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 lg:pt-40 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Canvas className="w-full h-full opacity-40">
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[2, 2, 5]} intensity={1} />
                        <AnimatedSphere />
                    </Canvas>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-bg/80 to-brand-bg z-10" />
                </div>

                <div className="container relative z-20 mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-5xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-accent-blue/20 text-accent-blue text-sm font-bold tracking-widest uppercase mb-8">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-blue opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-blue"></span>
                            </span>
                            Maikus AI Receptionist
                        </div>
                        <h1 className="text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-tight mb-8 leading-tight">
                            Never Miss Another <br />
                            <span className="text-gradient">Customer Call</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-brand-text-muted mb-12 max-w-3xl mx-auto leading-relaxed">
                            Maikus AI Receptionist answers calls, books appointments, and captures leads 24/7.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <button onClick={handleDemoNavigation} className="btn-primary w-full sm:w-auto text-lg py-5 px-10 shadow-[0_0_40px_rgba(0,240,255,0.4)] hover:shadow-[0_0_60px_rgba(0,240,255,0.6)]">
                                Try Live Demo
                            </button>
                            <a href="#how-it-works" className="btn-secondary w-full sm:w-auto text-lg py-5 px-10 gap-2 group">
                                See How It Works <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* PROBLEM SECTION - ROI Focus */}
            <section className="py-24 relative border-t border-brand-border bg-brand-bg-alt">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-6xl font-bold mb-6">Every Missed Call Is <span className="text-black bg-white px-5">Lost Revenue</span></h2>
                        <p className="text-brand-text-muted text-xl max-w-2xl mx-auto">Businesses lose thousands monthly just by missing the phone.</p>
                    </div>

                    <div className="max-w-4xl mx-auto glass-card flex flex-col md:flex-row items-center justify-between p-8 md:p-12 border-accent-red/20 gap-8">
                        <div className="flex-1 space-y-6">
                            <div className="flex justify-between items-end border-b border-brand-border pb-4">
                                <span className="text-brand-text-muted">Average daily calls</span>
                                <span className="text-2xl font-bold">60</span>
                            </div>
                            <div className="flex justify-between items-end border-b border-brand-border pb-4">
                                <span className="text-brand-text-muted">Missed calls rate</span>
                                <span className="text-2xl font-bold text-red-300">20%</span>
                            </div>
                            <div className="flex justify-between items-end border-b border-brand-border pb-4">
                                <span className="text-brand-text-muted">Average patient/client value</span>
                                <span className="text-2xl font-bold">₹3,000</span>
                            </div>
                        </div>
                        <div className="w-px h-40 bg-brand-border hidden md:block"></div>
                        <div className="flex-1 text-center">
                            <div className="text-sm text-brand-text-muted font-bold uppercase tracking-widest mb-2">Revenue Lost Monthly</div>
                            <div className="text-5xl md:text-6xl font-extrabold text-red-300 mb-6">
                                <NumberCounter from={0} to={1080000} prefix="₹" />
                            </div>
                            <p className="text-brand-text text-lg">Maikus AI answers every call instantly. <br />Stop losing money.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SOLUTION SECTION */}
            <section className="py-24 relative bg-brand-bg">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-6xl font-bold mb-6">Meet Your <span className="bg-white text-black px-5">AI Voice Receptionist</span></h2>
                        <p className="text-brand-text-muted text-xl max-w-2xl mx-auto">A hyper-realistic voice agent that handles your front desk 24 hours a day.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {[
                            { icon: Phone, title: "Answers Calls Instantly", desc: "No hold music. The AI picks up the phone on the first ring, every single time." },
                            { icon: Calendar, title: "Books Appointments", desc: "Integrates with your calendar to schedule, reschedule or cancel appointments." },
                            { icon: Clock, title: "Works 24/7/365", desc: "Never takes a break, never calls in sick, and handles after-hours inquiries." },
                            { icon: Globe, title: "Speaks Multiple Languages", desc: "Fluent in English, Hindi, and regional languages to assist any caller." },
                            { icon: Target, title: "Captures Leads Instantly", desc: "Records caller details and immediately texts them follow-up information." },
                            { icon: Bot, title: "Human-Like Voice", desc: "Sounds exactly like a real person with natural pauses, intonation, and empathy." }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="glass-card group hover:border-accent-blue/40 transition-all duration-300"
                            >
                                <div className="w-14 h-14 rounded-full bg-accent-blue/10 flex items-center justify-center text-accent-blue mb-6 group-hover:scale-110 group-hover:bg-accent-blue/20 transition-all">
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold mb-3 group-hover:text-accent-blue transition-colors">{item.title}</h3>
                                <p className="text-brand-text-muted leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section id="how-it-works" className="py-32 relative bg-brand-bg-alt border-y border-brand-border overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent-purple/5 via-brand-bg-alt to-brand-bg-alt -z-10" />
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-6xl font-bold mb-6">Simple <span className="bg-white text-black px-5">3-Step Automation</span></h2>
                        <p className="text-brand-text-muted text-xl max-w-2xl mx-auto">Zero technical knowledge required. We handle the complex setup.</p>
                    </div>

                    <div className="max-w-6xl mx-auto relative flex flex-col md:flex-row justify-between gap-12 md:gap-6 mt-16">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-brand-border z-0">
                            <motion.div
                                className="h-full bg-gradient-to-r from-accent-blue to-accent-purple"
                                initial={{ width: "0%" }}
                                whileInView={{ width: "100%" }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.5, delay: 0.2 }}
                            />
                        </div>

                        {/* Connecting Line (Mobile) */}
                        <div className="md:hidden absolute top-0 bottom-0 left-[31px] w-0.5 bg-brand-border z-0">
                            <motion.div
                                className="w-full bg-gradient-to-b from-accent-blue to-accent-purple"
                                initial={{ height: "0%" }}
                                whileInView={{ height: "100%" }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.5, delay: 0.2 }}
                            />
                        </div>

                        {[
                            { step: "1", icon: Phone, title: "Customer calls your business", desc: "A prospect dials your business number looking for an appointment or pricing." },
                            { step: "2", icon: Bot, title: "Maikus AI answers instantly", desc: "The AI greets them naturally, answers FAQs, and qualifies the lead." },
                            { step: "3", icon: Calendar, title: "Appointment booked automatically", desc: "The AI checks your live calendar, books the slot, and sends confirmation texts." }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
                                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: idx * 0.3, type: "spring", stiffness: 100 }}
                                style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
                                className="relative z-10 flex flex-row md:flex-col items-start md:items-center gap-6 md:w-1/4 group cursor-default"
                            >
                                <div className="relative shrink-0 flex items-center justify-center w-16 h-16 md:w-24 md:h-24 rounded-full bg-brand-bg  border-brand-border group-hover:border-white/30 transition-colors ">
                                    <span className="absolute -top-3 -right-3 md:-top-4 md:-right-4 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white text-black flex items-center justify-center font-black text-sm md:text-lg shadow-lg">
                                        {item.step}
                                    </span>
                                    <item.icon className="w-6 h-6 md:w-10 md:h-10 text-brand-text-muted group-hover:text-accent-blue transition-colors" />
                                </div>
                                <div className="md:text-center mt-2 md:mt-6">
                                    <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:text-white transition-all">{item.title}</h3>
                                    <p className="text-brand-text-muted text-base md:text-lg">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* REAL CONVERSATION EXAMPLE */}
            <section className="py-32 relative bg-brand-bg">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-6xl font-bold mb-6">Hear It In <span className="text-black bg-white px-5">Action</span></h2>
                        <p className="text-brand-text-muted text-xl max-w-2xl mx-auto">Conversations are decrypted instantly into a natural, hyper-realistic flow.</p>
                    </div>

                    <div className="max-w-5xl mx-auto">
                        <div className="space-y-16">
                            {/* Caller */}
                            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex justify-start">
                                <div className="max-w-[85%]">
                                    <p className="text-brand-text-muted mb-2 font-bold tracking-widest uppercase text-xs">Caller</p>
                                    <p className="text-3xl md:text-5xl font-semibold text-brand-text leading-tight opacity-90">"Hi, I'd like to book a dental cleaning if possible."</p>
                                </div>
                            </motion.div>

                            {/* AI Receptionist */}
                            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="flex justify-end text-right">
                                <div className="max-w-[95%]">
                                    <div className="flex items-center justify-end gap-2 text-accent-blue mb-2 font-bold tracking-widest uppercase text-xs">
                                        <div className="w-2 h-2 rounded-full bg-accent-blue animate-pulse" />
                                        Maikus AI
                                    </div>
                                    <div className="text-3xl md:text-5xl text-transparent bg-clip-text text-gradient">
                                        <DecryptedText text="I'd be happy to help with that! Are you an existing patient?" speed={30} maxIterations={2} animateOn="view" />
                                    </div>
                                </div>
                            </motion.div>

                            {/* Caller */}
                            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 1.5 }} className="flex justify-start">
                                <div className="max-w-[85%]">
                                    <p className="text-brand-text-muted mb-2 font-bold tracking-widest uppercase text-xs">Caller</p>
                                    <p className="text-3xl md:text-5xl font-semibold text-brand-text leading-tight opacity-90">"I'm a new patient. My name is Rahul."</p>
                                </div>
                            </motion.div>

                            {/* AI Receptionist */}
                            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 2 }} className="flex justify-end text-right">
                                <div className="max-w-[100%]">
                                    <div className="flex items-center justify-end gap-2 text-accent-blue mb-2 font-bold tracking-widest uppercase text-xs">
                                        <div className="w-2 h-2 rounded-full bg-accent-blue animate-pulse" />
                                        Maikus AI
                                    </div>
                                    <div className="text-3xl md:text-5xl text-transparent bg-clip-text text-gradient">
                                        <DecryptedText text="Nice to meet you, Rahul! I have a slot available this Thursday at 2:00 PM. Would that work?" speed={30} maxIterations={2} animateOn="view" />
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ENCRYPTION EFFECT SECTION */}
            <section className="py-32 relative bg-brand-bg-alt border-y border-brand-border overflow-hidden flex flex-col items-center justify-center text-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent-green/5 via-transparent to-transparent"></div>

                <div className="container relative mx-auto px-6 z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-green/10 border border-accent-green/20 text-white text-sm font-bold tracking-widest uppercase mb-12 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                        <ShieldCheck className="w-5 h-5 shrink-0" />
                        Locally Encrypted Streams
                    </div>

                    <p className="text-xl md:text-2xl text-brand-text-muted max-w-3xl mx-auto">
                        Every patient conversation is strictly processed via HIPAA-compliant channels. The conversations you see are completely decoupled from patient identity.
                    </p>
                </div>
            </section>

            {/* INDUSTRIES */}
            <section className="py-24 relative bg-brand-bg">
                <div className="container mx-auto px-6 lg:px-12 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-16">Trusted by <span className="text-gradient">Modern Clinics & Businesses</span></h2>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                        {[
                            { icon: Stethoscope, name: "Dental Clinics" },
                            { icon: HomeIcon, name: "Real Estate" },
                            { icon: Scissors, name: "Salons & Spas" },
                            { icon: Building2, name: "Service Businesses" },
                            { icon: Users, name: "Law Firms" }
                        ].map((item, idx) => (
                            <div key={idx} className="glass-card flex flex-col items-center justify-center p-6 hover:border-accent-blue/30 transition-all hover:-translate-y-2 cursor-default group">
                                <item.icon className="w-8 h-8 text-brand-text-muted group-hover:text-accent-blue mb-4 transition-colors" />
                                <span className="font-bold text-brand-text group-hover:text-accent-blue transition-colors">{item.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ADDITIONAL AUTOMATIONS - COMING SOON */}
            <section className="py-24 relative bg-brand-bg-alt border-t border-brand-border overflow-hidden">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-border/30 border border-brand-border text-brand-text-muted text-[10px] font-bold tracking-widest uppercase mb-6">
                            The Full Platform
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Additional <span className="bg-white text-black px-5">AI Automations</span></h2>
                        <p className="text-brand-text-muted text-lg max-w-2xl mx-auto">We are building an entire ecosystem of AI tools. Coming soon.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-60">
                        {[
                            { title: "AI Email Automation", icon: Mail },
                            { title: "Smart Lead Funnels", icon: Target },
                            { title: "Website AI Chatbots", icon: MessageSquare },
                            { title: "Social Media Automation", icon: Globe },
                            { title: "CRM Workflow Automation", icon: Zap },
                            { title: "Custom AI Tools", icon: Bot }
                        ].map((item, idx) => (
                            <div key={idx} className="glass-card relative overflow-hidden flex flex-col items-center text-center">
                                <div className="absolute top-4 right-4 bg-accent-blue/20 text-accent-blue text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                                    Coming Soon
                                </div>
                                <item.icon className="w-8 h-8 text-brand-text-muted mb-4 mt-4" />
                                <h3 className="font-bold text-brand-text">{item.title}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="py-32 bg-brand-bg relative overflow-hidden border-t border-brand-border text-center">
                <div className="absolute inset-0 bg-gradient-to-t from-accent-blue/10 via-transparent to-transparent"></div>
                <div className="container relative mx-auto px-6 z-10">
                    <h2 className="text-5xl md:text-7xl font-extrabold text-brand-text mb-8 tracking-tight">Never Miss Another <br className="hidden md:block" />Customer Call</h2>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10">
                        <button onClick={handleDemoNavigation} className="btn-primary text-xl py-5 px-12 shadow-[0_0_40px_rgba(0,240,255,0.4)]">Try AI Demo</button>
                        <Link to="/contact" className="btn-secondary text-xl py-5 px-12">Book Consultation</Link>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-accent-green text-sm font-bold bg-accent-green/10 px-6 py-3 rounded-full mx-auto w-max max-w-full">
                        <ShieldCheck className="w-5 h-5 shrink-0" />
                        <DecryptedText text="HIPAA-Compliant: All patient data is fully decrypted locally and safe." animateOn="view" speed={60} maxIterations={15} />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
