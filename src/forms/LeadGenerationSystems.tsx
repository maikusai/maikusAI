import { useState } from 'react';
import { Target, Search, BarChart, Phone, CheckCircle } from 'lucide-react';

const LeadGenerationSystems = () => {
    const [quickCall, setQuickCall] = useState(false);
    return (
        <div className="pt-24 pb-16">
            <section className="relative overflow-hidden pt-20 pb-32">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent-green/20 via-brand-bg to-brand-bg -z-10"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center max-w-4xl">
                                        {/* Service Indicator Badge */}
                    <div className="flex justify-center mb-6">
                        <div className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-brand-bg-alt/80 backdrop-blur-sm border border-brand-border/80 text-sm font-medium shadow-[0_0_15px_rgba(0,0,0,0.2)]">
                            <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse"></span>
                            <span className="text-brand-text-muted">Service:</span> 
                            <span className="text-white font-semibold tracking-wide uppercase text-xs">Lead Gen Funnels</span>
                        </div>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                        Scale Your <span className="text-gradient hover:from-accent-green hover:to-accent-blue">Lead Machine.</span>
                    </h1>
                    <p className="text-xl text-brand-text-muted mb-10 leading-relaxed max-w-2xl mx-auto">
                        Intelligent funnels that offer personalized lead magnets, qualify your prospects, and route the hottest buyers directly to your calendar—completely hands-free.
                    </p>
                    <a href="#intake-form" className="btn-primary w-full sm:w-auto text-lg px-10 py-4">Build My Funnel</a>
                </div>
            </section>

            <section className="py-24 relative bg-brand-bg-alt/50 border-y border-brand-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8 text-center">
                    {[{ icon: <Search className="w-8 h-8 text-accent-blue" />, title: "24/7 Qualification", desc: "Our systems converse and collect necessary pre-qualification data so your team only talks to hot targets." },
                    { icon: <Target className="w-8 h-8 text-accent-purple" />, title: "Seamless Routing", desc: "Connect directly to HubSpot/Salesforce, creating highly enriched contact profiles immediately upon capture." },
                    { icon: <BarChart className="w-8 h-8 text-accent-green" />, title: "Higher Conversion", desc: "AI-driven lead magnets have significantly higher opting-rates since they instantly generate customized value for the user." }].map((b, i) => (
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
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-green via-accent-blue to-accent-green"></div>

                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold mb-4">Initialize Your <span className="text-gradient">System</span></h2>
                            <p className="text-brand-text-muted">Fill out this quick intake so we know exactly the scale before we connect.</p>
                        </div>

                        <div className="flex items-center gap-4 mb-10 bg-brand-bg/40 p-5 rounded-2xl border border-brand-border/50 max-w-md mx-auto hover:bg-brand-bg/60 transition-colors">
                            <button
                                type="button"
                                onClick={() => setQuickCall(!quickCall)}
                                className={"w-14 h-7 rounded-full transition-colors relative " + (quickCall ? "bg-accent-green" : "bg-brand-bg-alt border border-brand-border") + " outline-none focus:ring-2 focus:ring-accent-green/50 focus:ring-offset-2 focus:ring-offset-brand-bg shrink-0"}
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
                                        <input type="text" required className="w-full bg-brand-bg/30 border border-brand-border/60 hover:bg-brand-bg/50 hover:border-brand-border backdrop-blur-sm rounded-lg px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-accent-green/50 focus:ring-offset-2 focus:ring-offset-brand-bg shadow-[0_0_15px_rgba(0,0,0,0)] focus:shadow-[0_0_20px_rgba(0,0,0,0.3)] shadow-accent-green/20 transition-all" placeholder="John Doe" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-brand-text-muted mb-2">Phone / WhatsApp</label>
                                        <input type="tel" required className="w-full bg-brand-bg/30 border border-brand-border/60 hover:bg-brand-bg/50 hover:border-brand-border backdrop-blur-sm rounded-lg px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-accent-green/50 focus:ring-offset-2 focus:ring-offset-brand-bg shadow-[0_0_15px_rgba(0,0,0,0)] focus:shadow-[0_0_20px_rgba(0,0,0,0.3)] shadow-accent-green/20 transition-all" placeholder="+91 98765 43210" />
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {/* Component 1 */}
                                    <div className="space-y-6">
                                        <h3 className="text-xl font-semibold flex items-center gap-2 border-b border-brand-border pb-2">
                                            <span className="w-6 h-6 rounded-full bg-accent-green/20 text-accent-green flex items-center justify-center text-sm">1</span>
                                            Basic Info
                                        </h3>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-brand-text-muted mb-2">Company Name</label>
                                                <input type="text" required className="w-full bg-brand-bg/30 border border-brand-border/60 hover:bg-brand-bg/50 hover:border-brand-border backdrop-blur-sm rounded-lg px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-accent-green/50 focus:ring-offset-2 focus:ring-offset-brand-bg shadow-[0_0_15px_rgba(0,0,0,0)] focus:shadow-[0_0_20px_rgba(0,0,0,0.3)] shadow-accent-green/20 transition-all" placeholder="Acme Corp" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-brand-text-muted mb-2">Contact Name</label>
                                                <input type="text" required className="w-full bg-brand-bg/30 border border-brand-border/60 hover:bg-brand-bg/50 hover:border-brand-border backdrop-blur-sm rounded-lg px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-accent-green/50 focus:ring-offset-2 focus:ring-offset-brand-bg shadow-[0_0_15px_rgba(0,0,0,0)] focus:shadow-[0_0_20px_rgba(0,0,0,0.3)] shadow-accent-green/20 transition-all" placeholder="John Doe" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-brand-text-muted mb-2">Phone / WhatsApp</label>
                                                <input type="tel" required className="w-full bg-brand-bg/30 border border-brand-border/60 hover:bg-brand-bg/50 hover:border-brand-border backdrop-blur-sm rounded-lg px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-accent-green/50 focus:ring-offset-2 focus:ring-offset-brand-bg shadow-[0_0_15px_rgba(0,0,0,0)] focus:shadow-[0_0_20px_rgba(0,0,0,0.3)] shadow-accent-green/20 transition-all" placeholder="+91 98765 43210" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-brand-text-muted mb-2">Email</label>
                                                <input type="email" required className="w-full bg-brand-bg/30 border border-brand-border/60 hover:bg-brand-bg/50 hover:border-brand-border backdrop-blur-sm rounded-lg px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-accent-green/50 focus:ring-offset-2 focus:ring-offset-brand-bg shadow-[0_0_15px_rgba(0,0,0,0)] focus:shadow-[0_0_20px_rgba(0,0,0,0.3)] shadow-accent-green/20 transition-all" placeholder="john@example.com" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Component 2 */}
                                    <div className="space-y-6">
                                        <h3 className="text-xl font-semibold flex items-center gap-2 border-b border-brand-border pb-2">
                                            <span className="w-6 h-6 rounded-full bg-accent-blue/20 text-accent-blue flex items-center justify-center text-sm">2</span>
                                            Funnel Goals
                                        </h3>
                                        <div>
                                            <label className="block text-sm font-medium text-brand-text-muted mb-2">Where do most of your leads come from?</label>
                                            <select required className="w-full bg-brand-bg/30 border border-brand-border/60 hover:bg-brand-bg/50 hover:border-brand-border backdrop-blur-sm rounded-lg px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:ring-offset-2 focus:ring-offset-brand-bg shadow-[0_0_15px_rgba(0,0,0,0)] focus:shadow-[0_0_20px_rgba(0,0,0,0.3)] shadow-accent-blue/20 transition-all appearance-none cursor-pointer">
                                                <option value="" className="bg-brand-bg text-white">Select source...</option>
                                                <option value="Instagram" className="bg-brand-bg text-white">Instagram</option>
                                                <option value="Facebook Ads" className="bg-brand-bg text-white">Facebook Ads</option>
                                                <option value="Website" className="bg-brand-bg text-white">Website</option>
                                                <option value="Walk-ins" className="bg-brand-bg text-white">Walk-ins</option>
                                                <option value="Other" className="bg-brand-bg text-white">Other</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-brand-text-muted mb-2">What do you want to improve?</label>
                                            <select required className="w-full bg-brand-bg/30 border border-brand-border/60 hover:bg-brand-bg/50 hover:border-brand-border backdrop-blur-sm rounded-lg px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:ring-offset-2 focus:ring-offset-brand-bg shadow-[0_0_15px_rgba(0,0,0,0)] focus:shadow-[0_0_20px_rgba(0,0,0,0.3)] shadow-accent-blue/20 transition-all appearance-none cursor-pointer">
                                                <option value="" className="bg-brand-bg text-white">Select goal...</option>
                                                <option value="More qualified leads" className="bg-brand-bg text-white">More qualified leads</option>
                                                <option value="Faster response" className="bg-brand-bg text-white">Faster response</option>
                                                <option value="Automatic follow-ups" className="bg-brand-bg text-white">Automatic follow-ups</option>
                                                <option value="Booking appointments automatically" className="bg-brand-bg text-white">Booking appointments automatically</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Component 3 */}
                                    <div className="space-y-6">
                                        <h3 className="text-xl font-semibold flex items-center gap-2 border-b border-brand-border pb-2">
                                            <span className="w-6 h-6 rounded-full bg-accent-green/20 text-accent-green flex items-center justify-center text-sm">3</span>
                                            Volume Indicator
                                        </h3>
                                        <div>
                                            <label className="block text-sm font-medium text-brand-text-muted mb-2">Current monthly lead volume?</label>
                                            <select required className="w-full bg-brand-bg/30 border border-brand-border/60 hover:bg-brand-bg/50 hover:border-brand-border backdrop-blur-sm rounded-lg px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-accent-green/50 focus:ring-offset-2 focus:ring-offset-brand-bg shadow-[0_0_15px_rgba(0,0,0,0)] focus:shadow-[0_0_20px_rgba(0,0,0,0.3)] shadow-accent-green/20 transition-all appearance-none cursor-pointer">
                                                <option value="" className="bg-brand-bg text-white">Select volume...</option>
                                                <option value="0–50" className="bg-brand-bg text-white">0–50</option>
                                                <option value="50–200" className="bg-brand-bg text-white">50–200</option>
                                                <option value="200+" className="bg-brand-bg text-white">200+</option>
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

            <a href="/contact" className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-brand-glass backdrop-blur-lg border border-accent-green/50 px-5 py-3.5 rounded-full hover:-translate-y-1 transition-all group">
                <Phone className="w-5 h-5 text-accent-green" /><span className="font-semibold text-brand-text">Doubt? Let's talk!</span>
            </a>
        </div>
    );
};
export default LeadGenerationSystems;
