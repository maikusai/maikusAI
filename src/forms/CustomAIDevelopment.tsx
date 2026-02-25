import { useState } from 'react';
import { BrainCircuit, Lock, Server, Phone, CheckCircle } from 'lucide-react';

const CustomAIDevelopment = () => {
    const [quickCall, setQuickCall] = useState(false);
    return (
        <div className="pt-24 pb-16">
            <section className="relative overflow-hidden pt-20 pb-32">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent-blue/20 via-brand-bg to-brand-bg -z-10"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center max-w-4xl">
                                        {/* Service Indicator Badge */}
                    <div className="flex justify-center mb-6">
                        <div className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-brand-bg-alt/80 backdrop-blur-sm border border-brand-border/80 text-sm font-medium shadow-[0_0_15px_rgba(0,0,0,0.2)]">
                            <span className="w-2 h-2 rounded-full bg-accent-blue animate-pulse"></span>
                            <span className="text-brand-text-muted">Service:</span> 
                            <span className="text-white font-semibold tracking-wide uppercase text-xs">Custom AI Apps</span>
                        </div>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                        Build Proprietary <span className="text-gradient">Intelligence.</span>
                    </h1>
                    <p className="text-xl text-brand-text-muted mb-10 leading-relaxed max-w-2xl mx-auto">
                        We build bespoke internal AI applications and dashboards directly on top of your proprietary data, isolated from public models.
                    </p>
                    <a href="#intake-form" className="btn-primary w-full sm:w-auto text-lg px-10 py-4">Consult On An App</a>
                </div>
            </section>

            <section className="py-24 relative bg-brand-bg-alt/50 border-y border-brand-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8 text-center">
                    {[{ icon: <Lock className="w-8 h-8 text-accent-blue" />, title: "Full Data Ownership", desc: "Your data never leaves your enclosed cloud environment, adhering strictly to global security standardizations." },
                    { icon: <BrainCircuit className="w-8 h-8 text-accent-purple" />, title: "Tailored to your exact SOPs", desc: "Off-the-shelf tools fail because they are generic. We program agents that mimic your specific company procedures exactly." },
                    { icon: <Server className="w-8 h-8 text-accent-green" />, title: "Scalable Infrastructure", desc: "Built using cloud-native microservices logic so the application scales regardless of user volume or data sets." }].map((b, i) => (
                        <div key={i} className="glass-card p-8 group hover:shadow-[0_0_30px_-5px_#00f0ff40]">
                            <div className="w-16 h-16 rounded-2xl bg-brand-bg flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">{b.icon}</div>
                            <h3 className="text-xl font-semibold mb-3">{b.title}</h3>
                            <p className="text-brand-text-muted leading-relaxed">{b.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section id="intake-form" className="py-24 relative bg-brand-bg-alt/30">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="glass-card p-8 md:p-12 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-blue via-accent-purple to-accent-blue"></div>

                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold mb-4">Initialize Your <span className="text-gradient">System</span></h2>
                            <p className="text-brand-text-muted">Fill out this quick intake so we know exactly the scale before we connect.</p>
                        </div>

                        <div className="flex items-center gap-4 mb-10 bg-brand-bg/40 p-5 rounded-2xl border border-brand-border/50 max-w-md mx-auto hover:bg-brand-bg/60 transition-colors">
                            <button
                                type="button"
                                onClick={() => setQuickCall(!quickCall)}
                                className={"w-14 h-7 rounded-full transition-colors relative " + (quickCall ? "bg-accent-blue" : "bg-brand-bg-alt border border-brand-border") + " outline-none focus:ring-2 focus:ring-accent-blue/50 focus:ring-offset-2 focus:ring-offset-brand-bg shrink-0"}
                            >
                                <div className={"w-5 h-5 rounded-full bg-white absolute top-1/2 -translate-y-1/2 transition-all shadow-sm " + (quickCall ? "left-[calc(100%-1.5rem)]" : "left-0.5")}></div>
                            </button>
                            <div>
                                <h4 className="font-semibold text-white text-lg leading-tight mb-1">I am in a hurry</h4 >
                                <p className="text-sm text-brand-text-muted">Just take my number and call me.</p>
                            </div>
                        </div>

                        <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); alert("Form submitted successfully!"); }}>
                            {quickCall ? (
                                <div className="space-y-6 max-w-lg mx-auto">
                                    <div>
                                        <label className="block text-sm font-medium text-brand-text-muted mb-2">Name</label>
                                        <input type="text" required className="w-full bg-brand-bg/30 border border-brand-border/60 hover:bg-brand-bg/50 hover:border-brand-border backdrop-blur-sm rounded-lg px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:ring-offset-2 focus:ring-offset-brand-bg shadow-[0_0_15px_rgba(0,0,0,0)] focus:shadow-[0_0_20px_rgba(0,0,0,0.3)] shadow-accent-blue/20 transition-all" placeholder="John Doe" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-brand-text-muted mb-2">Phone / WhatsApp</label>
                                        <input type="tel" required className="w-full bg-brand-bg/30 border border-brand-border/60 hover:bg-brand-bg/50 hover:border-brand-border backdrop-blur-sm rounded-lg px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:ring-offset-2 focus:ring-offset-brand-bg shadow-[0_0_15px_rgba(0,0,0,0)] focus:shadow-[0_0_20px_rgba(0,0,0,0.3)] shadow-accent-blue/20 transition-all" placeholder="+91 98765 43210" />
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {/* Component 1 */}
                                    <div className="space-y-6">
                                        <h3 className="text-xl font-semibold flex items-center gap-2 border-b border-brand-border pb-2">
                                            <span className="w-6 h-6 rounded-full bg-accent-blue/20 text-accent-blue flex items-center justify-center text-sm">1</span>
                                            Basic Info
                                        </h3>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-brand-text-muted mb-2">Business Name</label>
                                                <input type="text" required className="w-full bg-brand-bg/30 border border-brand-border/60 hover:bg-brand-bg/50 hover:border-brand-border backdrop-blur-sm rounded-lg px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:ring-offset-2 focus:ring-offset-brand-bg shadow-[0_0_15px_rgba(0,0,0,0)] focus:shadow-[0_0_20px_rgba(0,0,0,0.3)] shadow-accent-blue/20 transition-all" placeholder="Acme Corp" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-brand-text-muted mb-2">Contact Name</label>
                                                <input type="text" required className="w-full bg-brand-bg/30 border border-brand-border/60 hover:bg-brand-bg/50 hover:border-brand-border backdrop-blur-sm rounded-lg px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:ring-offset-2 focus:ring-offset-brand-bg shadow-[0_0_15px_rgba(0,0,0,0)] focus:shadow-[0_0_20px_rgba(0,0,0,0.3)] shadow-accent-blue/20 transition-all" placeholder="John Doe" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-brand-text-muted mb-2">Phone / WhatsApp</label>
                                                <input type="tel" required className="w-full bg-brand-bg/30 border border-brand-border/60 hover:bg-brand-bg/50 hover:border-brand-border backdrop-blur-sm rounded-lg px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:ring-offset-2 focus:ring-offset-brand-bg shadow-[0_0_15px_rgba(0,0,0,0)] focus:shadow-[0_0_20px_rgba(0,0,0,0.3)] shadow-accent-blue/20 transition-all" placeholder="+91 98765 43210" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-brand-text-muted mb-2">Email</label>
                                                <input type="email" required className="w-full bg-brand-bg/30 border border-brand-border/60 hover:bg-brand-bg/50 hover:border-brand-border backdrop-blur-sm rounded-lg px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:ring-offset-2 focus:ring-offset-brand-bg shadow-[0_0_15px_rgba(0,0,0,0)] focus:shadow-[0_0_20px_rgba(0,0,0,0.3)] shadow-accent-blue/20 transition-all" placeholder="john@example.com" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Component 2 */}
                                    <div className="space-y-6">
                                        <h3 className="text-xl font-semibold flex items-center gap-2 border-b border-brand-border pb-2">
                                            <span className="w-6 h-6 rounded-full bg-accent-purple/20 text-accent-purple flex items-center justify-center text-sm">2</span>
                                            What Do You Want?
                                        </h3>
                                        <div>
                                            <label className="block text-sm font-medium text-brand-text-muted mb-2">1. What process or task do you want automated?</label>
                                            <textarea rows={3} required className="w-full bg-brand-bg/30 border border-brand-border/60 hover:bg-brand-bg/50 hover:border-brand-border backdrop-blur-sm rounded-lg px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-accent-purple/50 focus:ring-offset-2 focus:ring-offset-brand-bg shadow-[0_0_15px_rgba(0,0,0,0)] focus:shadow-[0_0_20px_rgba(0,0,0,0.3)] shadow-accent-purple/20 transition-all resize-none" placeholder="E.g., Automatically generate leads from Instagram, summarize emails, or build a custom dashboard for sales data."></textarea>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-brand-text-muted mb-2">2. What is your main goal?</label>
                                            <select required className="w-full bg-brand-bg/30 border border-brand-border/60 hover:bg-brand-bg/50 hover:border-brand-border backdrop-blur-sm rounded-lg px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-accent-purple/50 focus:ring-offset-2 focus:ring-offset-brand-bg shadow-[0_0_15px_rgba(0,0,0,0)] focus:shadow-[0_0_20px_rgba(0,0,0,0.3)] shadow-accent-purple/20 transition-all appearance-none cursor-pointer">
                                                <option value="" className="bg-brand-bg text-white">Select a goal...</option>
                                                <option value="Save time" className="bg-brand-bg text-white">Save time</option>
                                                <option value="Increase sales" className="bg-brand-bg text-white">Increase sales</option>
                                                <option value="Reduce errors" className="bg-brand-bg text-white">Reduce errors</option>
                                                <option value="Improve customer experience" className="bg-brand-bg text-white">Improve customer experience</option>
                                                <option value="Other" className="bg-brand-bg text-white">Other</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Component 3 */}
                                    <div className="space-y-6">
                                        <h3 className="text-xl font-semibold flex items-center gap-2 border-b border-brand-border pb-2">
                                            <span className="w-6 h-6 rounded-full bg-accent-blue/20 text-accent-blue flex items-center justify-center text-sm">3</span>
                                            Volume Indicator
                                        </h3>
                                        <div>
                                            <label className="block text-sm font-medium text-brand-text-muted mb-2">3. Approx volume / frequency?</label>
                                            <select required className="w-full bg-brand-bg/30 border border-brand-border/60 hover:bg-brand-bg/50 hover:border-brand-border backdrop-blur-sm rounded-lg px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:ring-offset-2 focus:ring-offset-brand-bg shadow-[0_0_15px_rgba(0,0,0,0)] focus:shadow-[0_0_20px_rgba(0,0,0,0.3)] shadow-accent-blue/20 transition-all appearance-none cursor-pointer">
                                                <option value="" className="bg-brand-bg text-white">Select frequency...</option>
                                                <option value="Daily" className="bg-brand-bg text-white">Daily</option>
                                                <option value="Weekly" className="bg-brand-bg text-white">Weekly</option>
                                                <option value="Monthly" className="bg-brand-bg text-white">Monthly</option>
                                            </select>
                                        </div>
                                    </div>
                                </>
                            )}

                            <div className="pt-6 border-t border-brand-border/50">
                                <button type="submit" className="w-full btn-primary text-lg py-4">
                                    {quickCall ? "Request Quick Call" : "Request Analysis Session"}
                                </button>
                                <p className="text-center text-xs text-brand-text-muted mt-4 flex items-center justify-center gap-1">
                                    <CheckCircle className="w-3 h-3 text-accent-green" /> We will review and contact you within 24 hours.
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            <a href="/contact" className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-brand-glass backdrop-blur-lg border border-accent-blue/50 px-5 py-3.5 rounded-full hover:-translate-y-1 transition-all group">
                <Phone className="w-5 h-5 text-accent-blue" /><span className="font-semibold text-brand-text">Doubt? Let's talk!</span>
            </a>
        </div>
    );
};
export default CustomAIDevelopment;
