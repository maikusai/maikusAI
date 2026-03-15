import { Mail, MessageSquare, MapPin } from 'lucide-react';
import { useState } from 'react';

const Contact = () => {
    const [status, setStatus] = useState<"IDLE" | "SUBMITTING" | "SUCCESS" | "ERROR">("IDLE");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("SUBMITTING");
        const form = e.currentTarget;
        const data = new FormData(form);
        
        try {
            const response = await fetch("https://formspree.io/f/mkoqvowg", {
                method: "POST",
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                setStatus("SUCCESS");
                form.reset();
            } else {
                setStatus("ERROR");
            }
        } catch (error) {
            setStatus("ERROR");
        }
    };

    return (
        <div className="pt-32 lg:pt-40 pb-20">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-brand-text">Let's <span className="text-gradient">Automate Your Growth</span></h1>
                    <p className="text-brand-text-muted text-lg">
                        Stop losing hours to manual work. Fill out the form below to see if your business qualifies for a custom AI automation build.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
                    {/* Contact Details & Info */}
                    <div className="lg:w-1/3 space-y-8">
                        <div className="glass-card flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-accent-blue/10 flex items-center justify-center text-accent-blue flex-shrink-0">
                                <Mail className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-brand-text font-bold mb-1">Email Us</h4>
                                <a href="mailto:maikus.aisolutions@gmail.com" className="text-brand-text-muted hover:text-accent-blue transition-colors">maikus.aisolutions@gmail.com</a>
                            </div>
                        </div>

                        <div className="glass-card flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-accent-purple/10 flex items-center justify-center text-accent-purple flex-shrink-0">
                                <MessageSquare className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-brand-text font-bold mb-1">WhatsApp</h4>
                                <p className="text-brand-text-muted">+91 8008998312</p>
                            </div>
                        </div>

                        <div className="glass-card flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-brand-glass flex items-center justify-center text-brand-text flex-shrink-0">
                                <MapPin className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-brand-text font-bold mb-1">HQ</h4>
                                <p className="text-brand-text-muted">Hyderabad, Telangana</p>
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="glass-card p-2 rounded-2xl h-48 relative overflow-hidden flex items-center justify-center bg-brand-bg-alt">
                            <div className="absolute inset-0 bg-[url('https://www.nobroker.in/locality-iq/images/Peerzadiguda.webp')] bg-cover bg-center opacity-70 hover:opacity-100 transition-all cursor-pointer"></div>
                            <MapPin className="absolute z-10 w-8 h-8 text-accent-blue filter drop-shadow-[0_0_8px_rgba(0,240,255,1)]" />
                        </div>
                    </div>

                    {/* Form */}
                    <div className="lg:w-2/3 glass-card p-8 md:p-12 relative overflow-hidden">
                        {status === "SUCCESS" ? (
                            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center space-y-4 py-8">
                                <div className="w-16 h-16 bg-accent-blue/10 rounded-full flex items-center justify-center text-accent-blue mb-4">
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-brand-text">Thank You!</h3>
                                <p className="text-brand-text-muted">Your request has been received. We will get back to you with a custom blueprint shortly.</p>
                                <button onClick={() => setStatus("IDLE")} className="btn-primary mt-6">Send Another Request</button>
                            </div>
                        ) : (
                        <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-brand-text">Name</label>
                                    <input type="text" name="name" required className="w-full bg-brand-bg border border-brand-border rounded-lg px-4 py-3 text-brand-text focus:outline-none focus:border-accent-blue transition-colors" placeholder="John Doe" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-brand-text">Work Email</label>
                                    <input type="email" name="email" required className="w-full bg-brand-bg border border-brand-border rounded-lg px-4 py-3 text-brand-text focus:outline-none focus:border-accent-blue transition-colors" placeholder="john@company.com" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-brand-text">Business Type</label>
                                    <select name="businessType" className="w-full bg-brand-bg border border-brand-border rounded-lg px-4 py-3 text-brand-text-muted focus:outline-none focus:border-accent-blue transition-colors appearance-none">
                                        <option value="">Select Industry</option>
                                        <option value="eCommerce">eCommerce</option>
                                        <option value="Real Estate / Agency">Real Estate / Agency</option>
                                        <option value="Healthcare / Clinic">Healthcare / Clinic</option>
                                        <option value="SaaS / Tech">SaaS / Tech</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-brand-text">Monthly Revenue Range</label>
                                    <select name="revenueRange" className="w-full bg-brand-bg border border-brand-border rounded-lg px-4 py-3 text-brand-text-muted focus:outline-none focus:border-accent-blue transition-colors appearance-none">
                                        <option value="">Select Range</option>
                                        <option value="< $10k / mo">&lt; $10k / mo</option>
                                        <option value="$10k - $50k / mo">$10k - $50k / mo</option>
                                        <option value="$50k - $200k / mo">$50k - $200k / mo</option>
                                        <option value="$200k+ / mo">$200k+ / mo</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-brand-text">What do you want to automate?</label>
                                <textarea name="automationNeeds" required rows={4} className="w-full bg-brand-bg border border-brand-border rounded-lg px-4 py-3 text-brand-text focus:outline-none focus:border-accent-blue transition-colors resize-none" placeholder="e.g. We spend 10 hours a day replying to simple emails..."></textarea>
                            </div>

                            <div className="pt-4 border-t border-brand-border">
                                <button type="submit" disabled={status === "SUBMITTING"} className="btn-primary w-full py-4 text-lg disabled:opacity-50 transition-all">
                                    {status === "SUBMITTING" ? "Submitting..." : "Request Free Blueprint"}
                                </button>
                                {status === "ERROR" && (
                                    <p className="text-red-500 text-sm mt-3 text-center">Sorry, there was a problem submitting your request. Please try again.</p>
                                )}
                            </div>
                        </form>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Contact;
