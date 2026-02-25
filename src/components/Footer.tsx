import { Link } from 'react-router-dom';
import { BrainCircuit, Twitter, Linkedin, Github, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-brand-bg relative border-t border-brand-border pt-20 pb-10">
            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

                    <div className="col-span-1 md:col-span-2">
                        <Link to="/" className="flex items-center gap-2 mb-6">
                            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-accent-blue to-accent-purple p-[1px]">
                                <div className="w-full h-full bg-brand-bg rounded-lg flex items-center justify-center">
                                    <BrainCircuit className="w-4 h-4 text-brand-text" />
                                </div>
                            </div>
                            <span className="text-xl font-bold tracking-tight text-brand-text">
                                Maikus <span className="text-gradient">AI</span>
                            </span>
                        </Link>
                        <p className="text-brand-text-muted max-w-sm mb-8 leading-relaxed">
                            We build intelligent automation systems that generate leads, reply to customers, create content, and scale your operations — 24/7 on autopilot.
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="#" className="w-10 h-10 rounded-full border border-brand-border flex items-center justify-center text-brand-text-muted hover:text-brand-text hover:border-accent-blue hover:bg-accent-blue/10 transition-all">
                                <Twitter className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full border border-brand-border flex items-center justify-center text-brand-text-muted hover:text-brand-text hover:border-accent-blue hover:bg-accent-blue/10 transition-all">
                                <Linkedin className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full border border-brand-border flex items-center justify-center text-brand-text-muted hover:text-brand-text hover:border-accent-blue hover:bg-accent-blue/10 transition-all">
                                <Github className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-brand-text font-semibold mb-6">Company</h4>
                        <ul className="flex flex-col gap-4">
                            <li><Link to="/about" className="text-brand-text-muted hover:text-accent-blue transition-colors">About Us</Link></li>
                            <li><Link to="/services" className="text-brand-text-muted hover:text-accent-blue transition-colors">Services</Link></li>
                            <li><Link to="/#case-studies" className="text-brand-text-muted hover:text-accent-blue transition-colors">Case Studies</Link></li>
                            <li><Link to="/blog" className="text-brand-text-muted hover:text-accent-blue transition-colors">Blog</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-brand-text font-semibold mb-6">Contact</h4>
                        <ul className="flex flex-col gap-4">
                            <li><Link to="/contact" className="text-brand-text-muted hover:text-accent-blue transition-colors">Contact Us</Link></li>
                            <li>
                                <a href="mailto:hello@neuroflowai.com" className="flex items-center gap-2 text-brand-text-muted hover:text-accent-blue transition-colors">
                                    <Mail className="w-4 h-4" />
                                    maikusai@gmail.com
                                </a>
                            </li>
                            <li><a href="#" className="text-brand-text-muted hover:text-accent-blue transition-colors">Book a Strategy Call</a></li>
                        </ul>
                    </div>

                </div>

                <div className="border-t border-brand-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-brand-text-muted text-sm">
                        &copy; {new Date().getFullYear()} Maikus AI. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm text-brand-text-muted">
                        <Link to="/privacy" className="hover:text-brand-text transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-brand-text transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
