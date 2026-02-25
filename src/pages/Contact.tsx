import { Mail, MessageSquare, MapPin } from 'lucide-react';

const Contact = () => {
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
                                <a href="mailto:maikusai@gmail.com" className="text-brand-text-muted hover:text-accent-blue transition-colors">maikusai.com</a>
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
                                <p className="text-brand-text-muted">Telanagana,<br />Hyderabad</p>
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="glass-card p-2 rounded-2xl h-48 relative overflow-hidden flex items-center justify-center bg-brand-bg-alt">
                            <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=San+Francisco,CA&zoom=12&size=600x300&maptype=roadmap&style=feature:all|element:labels.text.fill|color:0x8ec3b9&style=feature:all|element:labels.text.stroke|color:0x1a3646&style=feature:all|element:labels.icon|visibility:off&style=feature:administrative.country|element:geometry.stroke|color:0x4b6878&style=feature:administrative.land_parcel|element:labels.text.fill|color:0x64779e&style=feature:administrative.province|element:geometry.stroke|color:0x4b6878&style=feature:landscape.man_made|element:geometry.stroke|color:0x334e87&style=feature:landscape.natural|element:geometry|color:0x021019&style=feature:poi|element:geometry|color:0x283d6a&style=feature:poi|element:labels.text.fill|color:0x6f9ba5&style=feature:poi|element:labels.text.stroke|color:0x1d2c4d&style=feature:poi.park|element:geometry.fill|color:0x021206&style=feature:poi.park|element:labels.text.fill|color:0x3c7680&style=feature:road|element:geometry|color:0x304a7d&style=feature:road|element:labels.text.fill|color:0x98a5be&style=feature:road|element:labels.text.stroke|color:0x1d2c4d&style=feature:road.highway|element:geometry|color:0x2c6675&style=feature:road.highway|element:geometry.stroke|color:0x255763&style=feature:road.highway|element:labels.text.fill|color:0xb0d5ce&style=feature:road.highway|element:labels.text.stroke|color:0x023e58&style=feature:transit|element:labels.text.fill|color:0x98a5be&style=feature:transit|element:labels.text.stroke|color:0x1d2c4d&style=feature:transit.line|element:geometry.fill|color:0x283d6a&style=feature:transit.station|element:geometry|color:0x3a4762&style=feature:water|element:geometry|color:0x0e1626&style=feature:water|element:labels.text.fill|color:0x4e6d70')] bg-cover opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer"></div>
                            <div className="absolute z-10 w-4 h-4 rounded-full bg-accent-blue shadow-[0_0_15px_rgba(0,240,255,1)]"></div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="lg:w-2/3 glass-card p-8 md:p-12 relative overflow-hidden">
                        <form className="relative z-10 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-brand-text">Name</label>
                                    <input type="text" className="w-full bg-brand-bg border border-brand-border rounded-lg px-4 py-3 text-brand-text focus:outline-none focus:border-accent-blue transition-colors" placeholder="John Doe" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-brand-text">Work Email</label>
                                    <input type="email" className="w-full bg-brand-bg border border-brand-border rounded-lg px-4 py-3 text-brand-text focus:outline-none focus:border-accent-blue transition-colors" placeholder="john@company.com" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-brand-text">Business Type</label>
                                    <select className="w-full bg-brand-bg border border-brand-border rounded-lg px-4 py-3 text-brand-text-muted focus:outline-none focus:border-accent-blue transition-colors appearance-none">
                                        <option>Select Industry</option>
                                        <option>eCommerce</option>
                                        <option>Real Estate / Agency</option>
                                        <option>Healthcare / Clinic</option>
                                        <option>SaaS / Tech</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-brand-text">Monthly Revenue Range</label>
                                    <select className="w-full bg-brand-bg border border-brand-border rounded-lg px-4 py-3 text-brand-text-muted focus:outline-none focus:border-accent-blue transition-colors appearance-none">
                                        <option>Select Range</option>
                                        <option>&lt; $10k / mo</option>
                                        <option>$10k - $50k / mo</option>
                                        <option>$50k - $200k / mo</option>
                                        <option>$200k+ / mo</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-brand-text">What do you want to automate?</label>
                                <textarea rows={4} className="w-full bg-brand-bg border border-brand-border rounded-lg px-4 py-3 text-brand-text focus:outline-none focus:border-accent-blue transition-colors resize-none" placeholder="e.g. We spend 10 hours a day replying to simple emails..."></textarea>
                            </div>

                            <div className="pt-4 border-t border-brand-border">
                                <button type="button" className="btn-primary w-full py-4 text-lg">Request Free Blueprint</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Contact;
