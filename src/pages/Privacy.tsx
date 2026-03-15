const Privacy = () => {
    return (
        <div className="pt-32 lg:pt-40 pb-20">
            <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-brand-text">Privacy Policy</h1>
                    <p className="text-brand-text-muted text-lg">Last updated: {new Date().toLocaleDateString()}</p>
                </div>
                
                <div className="glass-card p-8 md:p-12 space-y-8 text-brand-text-muted prose prose-invert max-w-none">
                    <section>
                        <h2 className="text-2xl font-bold text-brand-text mb-4">1. Information We Collect</h2>
                        <p>We collect information that you provide directly to us, such as when you request a blueprint, fill out a contact form, or communicate with us. This may include your name, email address, business type, and specific automation needs.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-brand-text mb-4">2. How We Use Your Information</h2>
                        <p>We use the information we collect to primarily provide, maintain, and improve our services to you. Additionally, we may use it to communicate back to you regarding your inquiries or to discuss potential implementation strategies.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-brand-text mb-4">3. Data Sharing and Security</h2>
                        <p>We do not sell your personal information. We may share information with trusted third-party service providers who assist us in operating our business and website, so long as those parties agree to keep this information confidential. We implement reasonable security practices to protect your information.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-brand-text mb-4">4. Your Rights</h2>
                        <p>Depending on your location, you may have the right to access, correct, or delete your personal data. If you wish to exercise any of these rights, please contact us at our provided contact email address.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-brand-text mb-4">5. Contact Us</h2>
                        <p>If you have any questions about this Privacy Policy, please contact us at: <a href="mailto:maikus.aisolutions@gmail.com" className="text-accent-blue hover:underline">maikus.aisolutions@gmail.com</a>.</p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Privacy;
