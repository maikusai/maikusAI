import { ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog = () => {
    const posts = [
        {
            id: 1,
            category: "Automation",
            title: "How AI Can Replace 50% of Manual Tasks in Your Business Today",
            excerpt: "Stop wasting expensive human hours on repetitive data entry. Here is a battle-tested framework to automate your company's most annoying bottlenecks.",
            date: "Oct 24, 2023",
            readTime: "5 min read",
            image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop"
        },
        {
            id: 2,
            category: "Case Study",
            title: "AI for Dentists: Automating Patient Follow-ups and Booking",
            excerpt: "How a local clinic increased total appointments by 42% simply by deploying an intelligent SMS routing system.",
            date: "Oct 18, 2023",
            readTime: "4 min read",
            image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800&auto=format&fit=crop"
        },
        {
            id: 3,
            category: "Strategy",
            title: "Lead Generation Systems Explained: The Invisible Funnel",
            excerpt: "Traffic without conversion is useless. Learn how to build an AI-powered qualification funnel that only passes hot leads to your sales team.",
            date: "Oct 12, 2023",
            readTime: "7 min read",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"
        },
        {
            id: 4,
            category: "Technology",
            title: "Why Using ChatGPT Directly Is Costing You Money",
            excerpt: "Prompting a chatbot is still a manual task. Real ROI comes from integrating LLMs natively into your CRMs and workflows.",
            date: "Oct 05, 2023",
            readTime: "6 min read",
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop"
        },
        {
            id: 5,
            category: "Support",
            title: "Building Customer Service Bots That Don't Suck",
            excerpt: "Most chatbots are glorified FAQs. Learn the architecture behind context-aware AI agents that actually resolve tier-1 tickets.",
            date: "Sep 28, 2023",
            readTime: "8 min read",
            image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=800&auto=format&fit=crop"
        },
        {
            id: 6,
            category: "Operations",
            title: "The Ultimate CRM Automation Stack for 2024",
            excerpt: "Connect HubSpot, Zapier, Make, and OpenAI to build a completely self-updating system of record.",
            date: "Sep 20, 2023",
            readTime: "10 min read",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop"
        }
    ];

    return (
        <div className="pt-32 lg:pt-40 pb-20">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-brand-text">The <span className="text-gradient">Automation Archive</span></h1>
                    <p className="text-brand-text-muted text-lg">
                        Insights, strategies, and case studies on how to leverage AI to radically scale your operations.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <div key={post.id} className="glass-card p-0 overflow-hidden flex flex-col group cursor-pointer hover:-translate-y-2 transition-transform">
                            <div className="h-48 relative overflow-hidden">
                                <div className="absolute inset-0 bg-brand-bg/20 group-hover:bg-transparent transition-colors z-10"></div>
                                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute top-4 left-4 z-20">
                                    <span className="bg-brand-glass backdrop-blur text-brand-text text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-md border border-brand-border">
                                        {post.category}
                                    </span>
                                </div>
                            </div>
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex items-center gap-4 text-xs text-brand-text-muted mb-4">
                                    <span>{post.date}</span>
                                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                                </div>
                                <h3 className="text-xl font-bold text-brand-text mb-3 group-hover:text-accent-blue transition-colors leading-snug">
                                    {post.title}
                                </h3>
                                <p className="text-brand-text-muted text-sm mb-6 flex-1">
                                    {post.excerpt}
                                </p>
                                <Link to="#" className="flex items-center text-sm font-bold text-brand-text group-hover:text-accent-blue transition-colors mt-auto">
                                    Read Article <ArrowRight className="w-4 h-4 ml-2" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <button className="btn-secondary py-3 px-8 text-sm">Load More Articles</button>
                </div>

            </div>
        </div>
    );
};

export default Blog;
