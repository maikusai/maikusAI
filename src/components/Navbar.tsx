import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logoUrl from '../assets/logotransparent.png';

const Navbar = ({ theme, toggleTheme }: { theme: string; toggleTheme: () => void }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'AI Receptionist', path: '/services/ai-voice-receptionist' },
        { name: 'Pricing', path: '/pricing' },
        { name: 'Blog', path: '/blog' },
        { name: 'About', path: '/about' }
    ];

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-brand-bg/80 backdrop-blur-lg py-3 shadow-lg shadow-black/20' : 'bg-transparent py-5'}`}>
            <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <img src={logoUrl} alt="Maikus AI Logo" className="h-10 w-auto object-contain" />
                    <span className="text-xl font-bold tracking-tight text-brand-text">
                        Maikus <span className="text-gradient">AI</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`text-sm font-medium transition-colors hover:text-accent-blue ${location.pathname === link.path ? 'text-brand-text' : 'text-brand-text-muted'}`}
                        >
                            {link.name}
                        </Link>
                    ))}

                    {/* Theme Toggle Button */}
                    <button
                        onClick={toggleTheme}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-brand-glass border border-brand-border text-brand-text hover:text-accent-blue transition-colors overflow-hidden relative"
                        aria-label="Toggle Theme"
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={theme}
                                initial={{ y: -20, opacity: 0, rotate: -90 }}
                                animate={{ y: 0, opacity: 1, rotate: 0 }}
                                exit={{ y: 20, opacity: 0, rotate: 90 }}
                                transition={{ duration: 0.3 }}
                                className="absolute"
                            >
                                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            </motion.div>
                        </AnimatePresence>
                    </button>

                    <Link to="/contact" className="btn-secondary px-6 py-2 text-xs">
                        Let's Talk
                    </Link>
                </nav>

                {/* Mobile Menu Toggle & Theme Toggle */}
                <div className="flex items-center gap-4 md:hidden">
                    <button
                        onClick={toggleTheme}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-brand-glass border border-brand-border text-brand-text hover:text-accent-blue transition-colors overflow-hidden relative"
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={theme}
                                initial={{ y: -20, opacity: 0, rotate: -90 }}
                                animate={{ y: 0, opacity: 1, rotate: 0 }}
                                exit={{ y: 20, opacity: 0, rotate: 90 }}
                                transition={{ duration: 0.3 }}
                                className="absolute"
                            >
                                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            </motion.div>
                        </AnimatePresence>
                    </button>

                    <button
                        className="text-brand-text-muted hover:text-brand-text transition-colors"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden absolute top-full left-0 right-0 bg-brand-bg/95 backdrop-blur-xl border-b border-brand-border overflow-hidden shadow-2xl"
                    >
                        <div className="p-6 flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`text-lg font-medium transition-colors hover:text-accent-blue ${location.pathname === link.path ? 'text-brand-text' : 'text-brand-text-muted'}`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link to="/contact" className="btn-primary mt-4 w-full text-center py-4">
                                Get Your Free AI Blueprint
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;
