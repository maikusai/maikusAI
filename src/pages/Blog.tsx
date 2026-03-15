import { ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { posts } from '../data/posts';

const Blog = () => {
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
                        <Link to={`/blog/${post.id}`} key={post.id} className="glass-card p-0 overflow-hidden flex flex-col group cursor-pointer hover:-translate-y-2 transition-transform h-full block">
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
                                <div className="flex items-center text-sm font-bold text-brand-text group-hover:text-accent-blue transition-colors mt-auto">
                                    Read Article <ArrowRight className="w-4 h-4 ml-2" />
                                </div>
                            </div>
                        </Link>
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
