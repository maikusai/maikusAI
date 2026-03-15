const Terms = () => {
    return (
        <div className="pt-32 lg:pt-40 pb-20">
            <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-brand-text">Terms of Service</h1>
                    <p className="text-brand-text-muted text-lg">Last updated: {new Date().toLocaleDateString()}</p>
                </div>
                
                <div className="glass-card p-8 md:p-12 space-y-8 text-brand-text-muted prose prose-invert max-w-none">
                    <section>
                        <h2 className="text-2xl font-bold text-brand-text mb-4">1. Acceptance of Terms</h2>
                        <p>By accessing and using the Maikus AI website and services, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-brand-text mb-4">2. Description of Service</h2>
                        <p>Maikus AI provides businesses with AI automation blueprints, development, and consulting services. We reserve the right to modify or discontinue the service with or without notice to the user.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-brand-text mb-4">3. Intellectual Property Rights</h2>
                        <p>All content included on this site, such as text, graphics, logos, images, as well as the compilation thereof, and any software used on the site, is the property of Maikus AI or its suppliers and protected by copyright and other laws that protect intellectual property and proprietary rights.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-brand-text mb-4">4. Limitation of Liability</h2>
                        <p>In no event shall Maikus AI, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-brand-text mb-4">5. Governing Law</h2>
                        <p>These Terms shall be governed and construed in accordance with the laws, without regard to its conflict of law provisions.</p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Terms;
