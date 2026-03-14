import { motion } from 'framer-motion';
import { CheckCircle2, Phone, Clock, Mail, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FormSuccessScreenProps {
    contactName?: string;
    planName?: string;
    onReset: () => void;
}

const FormSuccessScreen = ({ contactName, planName, onReset }: FormSuccessScreenProps) => {
    const steps = [
        { icon: Mail, title: 'Request Received', desc: 'Your details have landed safely in our inbox.' },
        { icon: Clock, title: 'Review within 24h', desc: 'Our team reviews every request the same day.' },
        { icon: Phone, title: 'We Call You', desc: 'Expect a call from us to walk you through your custom demo.' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
            className="relative w-full overflow-hidden rounded-2xl"
        >
            {/* Animated background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent-green/10 via-brand-bg-alt to-brand-bg-alt -z-10" />
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-accent-green/10 blur-3xl -z-10" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-accent-blue/10 blur-3xl -z-10" />

            <div className="border border-accent-green/30 rounded-2xl p-8 md:p-12 text-center shadow-[0_0_60px_rgba(74,222,128,0.08)]">

                {/* Pulsing check icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="flex justify-center mb-6"
                >
                    <div className="relative flex items-center justify-center">
                        <span className="absolute w-24 h-24 rounded-full bg-accent-green/10 animate-ping opacity-50" />
                        <span className="absolute w-20 h-20 rounded-full bg-accent-green/15" />
                        <CheckCircle2 className="relative w-14 h-14 text-accent-green" strokeWidth={1.5} />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                >
                    <p className="text-accent-green text-xs font-bold tracking-widest uppercase mb-3">Request Sent Successfully</p>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-brand-text mb-3 tracking-tight">
                        {contactName ? `You're all set, ${contactName}!` : "You're all set!"}
                    </h2>
                    <p className="text-brand-text-muted text-lg mb-2 max-w-md mx-auto leading-relaxed">
                        Your request for the <span className="text-brand-text font-semibold">{planName ?? 'AI Receptionist'}</span> plan has been received.
                    </p>
                    <p className="text-brand-text-muted mb-10 max-w-sm mx-auto">
                        Our team will call you personally within <span className="text-accent-green font-semibold">24 hours</span> to walk you through your custom demo.
                    </p>
                </motion.div>

                {/* What happens next */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10"
                >
                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.55 + i * 0.12 }}
                            className="bg-brand-bg/60 border border-brand-border rounded-xl p-5 flex flex-col items-center gap-3"
                        >
                            <div className="w-10 h-10 rounded-full bg-accent-green/10 flex items-center justify-center">
                                <step.icon className="w-5 h-5 text-accent-green" />
                            </div>
                            <div>
                                <p className="font-semibold text-brand-text text-sm mb-1">{step.title}</p>
                                <p className="text-brand-text-muted text-xs leading-relaxed">{step.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Actions */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.85 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link to="/" className="btn-secondary flex items-center gap-2 text-sm py-2.5 px-6">
                        Back to Home
                    </Link>
                    <button
                        onClick={onReset}
                        className="btn-primary flex items-center gap-2 text-sm py-2.5 px-6"
                    >
                        Submit Another Request <ArrowRight className="w-4 h-4" />
                    </button>
                </motion.div>

            </div>
        </motion.div>
    );
};

export default FormSuccessScreen;
