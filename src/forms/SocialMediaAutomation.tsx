import { useState } from 'react';
import { Target, MessageSquare, Clock, Phone, CheckCircle } from 'lucide-react';

const SocialMediaAutomation = () => {
    const [quickCall, setQuickCall] = useState(false);
    return (
        <div className="pt-24 pb-16">
            <section className="relative overflow-hidden pt-20 pb-32">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent-purple/20 via-brand-bg to-brand-bg -z-10"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center max-w-4xl">
                                        {/* Service Indicator Badge */}
                    <div className="flex justify-center mb-6">
                        <div className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-brand-bg-alt/80 backdrop-blur-sm border border-brand-border/80 text-sm font-medium shadow-[0_0_15px_rgba(0,0,0,0.2)]">
                            <span className="w-2 h-2 rounded-full bg-accent-purple animate-pulse"></span>
                            <span className="text-brand-text-muted">Service:</span> 
                            <span className="text-white font-semibold tracking-wide uppercase text-xs">Social Media Auto</span>
                        </div>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                        Dominate Your Socials on <span className="text-gradient">Autopilot.</span>
                    </h1>
                    <p className="text-xl text-brand-text-muted mb-10 leading-relaxed max-w-2xl mx-auto">
                        Stop spending hours daily creating posts, manually replying to comments, and chasing DMs. We build an AI infrastructure that grows your community while you sleep.
                    </p>
                    <a href="#intake-form" className="btn-primary w-full sm:w-auto text-lg px-10 py-4">Automate My Socials</a>
                </div>
            </section>

            <section className="py-24 relative bg-brand-bg-alt/50 border-y border-brand-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8 text-center">
                    {[{ icon: <Target className="w-8 h-8 text-accent-blue" />, title: "AI Content Generation", desc: "We train LLMs on your brand voice to dynamically generate a month of highly engaging posts in minutes." },
                    { icon: <MessageSquare className="w-8 h-8 text-accent-purple" />, title: "Instant DM Responses", desc: "Never leave a follower hanging. AI replies to comments and DMs instantly, routing warm leads to your CRM." },
                    { icon: <Clock className="w-8 h-8 text-accent-green" />, title: "Smart Scheduling", desc: "Automate cross-platform scheduling using predictive analytics to post exactly when your audience is active." }].map((b, i) => (
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
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-purple via-accent-blue to-accent-purple"></div>

                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold mb-4">Initialize Your <span className="text-gradient">System</span></h2>
                            <p className="text-brand-text-muted">Fill out this quick intake so we know exactly the scale before we connect.</p>
                        </div>

                        <div className="flex items-center gap-4 mb-10 bg-brand-bg/40 p-5 rounded-2xl border border-brand-border/50 max-w-md mx-auto hover:bg-brand-bg/60 transition-colors">
                            <button
                                type="button"
                                onClick={() => setQuickCall(!quickCall)}
                                className={"w-14 h-7 rounded-full transition-colors relative " + (quickCall ? "bg-accent-purple" : "bg-brand-bg-alt border border-brand-border") + " outline-none focus:ring-2 focus:ring-accent-purple/50 focus:ring-offset-2 focus:ring-offset-brand-bg shrink-0"}
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
                                        <input type="text" required className="w-full bg-brand-bg/30 border border-brand-border/60 hover:bg-brand-bg/50 hover:border-brand-border backdrop-blur-sm rounded-lg px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-accent-purple/50 focus:ring-offset-2 focus:ring-offset-brand-bg shadow-[0_0_15px_rgba(0,0,0,0)] focus:shadow-[0_0_20px_rgba(0,0,0,0.3)] shadow-accent-purple/20 transition-all" placeholder="John Doe" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-brand-text-muted mb-2">Phone / WhatsApp</label>
                                        <input type="tel" required className="w-full bg-brand-bg/30 border border-brand-border/60 hover:bg-brand-bg/50 hover:border-brand-border backdrop-blur-sm rounded-lg px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-accent-purple/50 focus:ring-offset-2 focus:ring-offset-brand-bg shadow-[0_0_15px_rgba(0,0,0,0)] focus:shadow-[0_0_20px_rgba(0,0,0,0.3)] shadow-accent-purple/20 transition-all" placeholder="+91 98765 43210" />
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {/* Component 1 */}
                                    <div className="space-y-6">
                                        <h3 className="text-xl font-semibold flex items-center gap-2 border-b border-brand-border pb-2">
                                            <span className="w-6 h-6 rounded-full bg-accent-purple/20 text-accent-purple flex items-center justify-center text-sm">1</span>
                                            Basic Info
                                        </h3>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-brand-text-muted mb-2">Business Name</label>
                                                <input type="text" required className="w-full bg-brand-bg/30 border border-brand-border/60 hover:bg-brand-bg/50 hover:border-brand-border backdrop-blur-sm rounded-lg px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-accent-purple/50 focus:ring-offset-2 focus:ring-offset-brand-bg shadow-[0_0_15px_rgba(0,0,0,0)] focus:shadow-[0_0_20px_rgba(0,0,0,0.3)] shadow-accent-purple/20 transition-all" placeholder="Acme Corp" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-brand-text-muted mb-2">Contact Name</label>
                                                <input type="text" required className="w-full bg-brand-bg/30 border border-brand-border/60 hover:bg-brand-bg/50 hover:border-brand-border backdrop-blur-sm rounded-lg px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-accent-purple/50 focus:ring-offset-2 focus:ring-offset-brand-bg shadow-[0_0_15px_rgba(0,0,0,0)] focus:shadow-[0_0_20px_rgba(0,0,0,0.3)] shadow-accent-purple/20 transition-all" placeholder="John Doe" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-brand-text-muted mb-2">Phone / WhatsApp</label>
                                                <input type="tel" required className="w-full bg-brand-bg/30 border border-brand-border/60 hover:bg-brand-bg/50 hover:border-brand-border backdrop-blur-sm rounded-lg px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-accent-purple/50 focus:ring-offset-2 focus:ring-offset-brand-bg shadow-[0_0_15px_rgba(0,0,0,0)] focus:shadow-[0_0_20px_rgba(0,0,0,0.3)] shadow-accent-purple/20 transition-all" placeholder="+91 98765 43210" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-brand-text-muted mb-2">Instagram / Facebook Page Link</label>
                                                <input type="text" required className="w-full bg-brand-bg/30 border border-brand-border/60 hover:bg-brand-bg/50 hover:border-brand-border backdrop-blur-sm rounded-lg px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-accent-purple/50 focus:ring-offset-2 focus:ring-offset-brand-bg shadow-[0_0_15px_rgba(0,0,0,0)] focus:shadow-[0_0_20px_rgba(0,0,0,0.3)] shadow-accent-purple/20 transition-all" placeholder="https://instagram.com/yourbrand" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Component 2 */}
                                    <div className="space-y-6">
                                        <h3 className="text-xl font-semibold flex items-center gap-2 border-b border-brand-border pb-2">
                                            <span className="w-6 h-6 rounded-full bg-accent-blue/20 text-accent-blue flex items-center justify-center text-sm">2</span>
                                            What They Want
                                        </h3>
                                        <div>
                                            <label className="block text-sm font-medium text-brand-text-muted mb-2">1. Which platforms do you use?</label>
                                            <select required className="w-full bg-brand-bg/30 border border-brand-border/60 hover:bg-brand-bg/50 hover:border-brand-border backdrop-blur-sm rounded-lg px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:ring-offset-2 focus:ring-offset-brand-bg shadow-[0_0_15px_rgba(0,0,0,0)] focus:shadow-[0_0_20px_rgba(0,0,0,0.3)] shadow-accent-blue/20 transition-all appearance-none cursor-pointer">
                                                <option value="" className="bg-brand-bg text-white">Select platform...</option>
                                                <option value="Instagram" className="bg-brand-bg text-white">Instagram</option>
                                                <option value="Facebook" className="bg-brand-bg text-white">Facebook</option>
                                                <option value="WhatsApp" className="bg-brand-bg text-white">WhatsApp</option>
                                                <option value="LinkedIn" className="bg-brand-bg text-white">LinkedIn</option>
                                                <option value="Multiple" className="bg-brand-bg text-white">Multiple</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-brand-text-muted mb-2">2. What do you need help with?</label>
                                            <select required className="w-full bg-brand-bg/30 border border-brand-border/60 hover:bg-brand-bg/50 hover:border-brand-border backdrop-blur-sm rounded-lg px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:ring-offset-2 focus:ring-offset-brand-bg shadow-[0_0_15px_rgba(0,0,0,0)] focus:shadow-[0_0_20px_rgba(0,0,0,0.3)] shadow-accent-blue/20 transition-all appearance-none cursor-pointer">
                                                <option value="" className="bg-brand-bg text-white">Select need...</option>
                                                <option value="Content scheduling" className="bg-brand-bg text-white">Content scheduling</option>
                                                <option value="Auto-reply to DMs" className="bg-brand-bg text-white">Auto-reply to DMs</option>
                                                <option value="Lead collection from DMs" className="bg-brand-bg text-white">Lead collection from DMs</option>
                                                <option value="Posting consistently" className="bg-brand-bg text-white">Posting consistently</option>
                                                <option value="Engagement management" className="bg-brand-bg text-white">Engagement management</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Component 3 */}
                                    <div className="space-y-6">
                                        <h3 className="text-xl font-semibold flex items-center gap-2 border-b border-brand-border pb-2">
                                            <span className="w-6 h-6 rounded-full bg-accent-purple/20 text-accent-purple flex items-center justify-center text-sm">3</span>
                                            Volume Indicator
                                        </h3>
                                        <div>
                                            <label className="block text-sm font-medium text-brand-text-muted mb-2">3. How often do you currently post?</label>
                                            <select required className="w-full bg-brand-bg/30 border border-brand-border/60 hover:bg-brand-bg/50 hover:border-brand-border backdrop-blur-sm rounded-lg px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-accent-purple/50 focus:ring-offset-2 focus:ring-offset-brand-bg shadow-[0_0_15px_rgba(0,0,0,0)] focus:shadow-[0_0_20px_rgba(0,0,0,0.3)] shadow-accent-purple/20 transition-all appearance-none cursor-pointer">
                                                <option value="" className="bg-brand-bg text-white">Select frequency...</option>
                                                <option value="Rarely" className="bg-brand-bg text-white">Rarely</option>
                                                <option value="1–2 times per week" className="bg-brand-bg text-white">1–2 times per week</option>
                                                <option value="3+ times per week" className="bg-brand-bg text-white">3+ times per week</option>
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

            <a href="/contact" className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-brand-glass backdrop-blur-lg border border-accent-purple/50 px-5 py-3.5 rounded-full hover:-translate-y-1 transition-all group">
                <Phone className="w-5 h-5 text-accent-blue" /><span className="font-semibold text-brand-text">Doubt? Let's talk!</span>
            </a>
        </div>
    );
};
export default SocialMediaAutomation;
