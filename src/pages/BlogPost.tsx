import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import { posts } from '../data/posts';

const BlogPost = () => {
    const { id } = useParams();
    const post = posts.find(p => p.id === id);

    if (!post) {
        return (
            <div className="pt-40 pb-20 text-center min-h-screen">
                <h1 className="text-4xl font-bold text-brand-text mb-4">Post not found</h1>
                <Link to="/blog" className="text-accent-blue hover:underline text-lg">Back to Blog</Link>
            </div>
        );
    }

    return (
        <div className="pt-32 lg:pt-40 pb-20">
            <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
                
                <Link to="/blog" className="inline-flex items-center text-brand-text-muted hover:text-accent-blue transition-colors mb-8">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Articles
                </Link>

                <div className="mb-10 text-center">
                    <div className="mb-6 flex items-center justify-center gap-4 text-sm text-brand-text-muted">
                        <span className="bg-brand-glass backdrop-blur text-brand-text font-bold uppercase tracking-wider py-1 px-3 rounded-md border border-brand-border">
                            {post.category}
                        </span>
                        <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {post.date}</span>
                        <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {post.readTime}</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold text-brand-text mb-6 leading-tight">
                        {post.title}
                    </h1>
                </div>

                <div className="h-64 md:h-96 w-full rounded-2xl overflow-hidden mb-12">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                </div>

                <div 
                    className="prose prose-invert prose-lg max-w-none text-brand-text-muted
                        prose-headings:text-brand-text prose-a:text-accent-blue hover:prose-a:text-accent-purple 
                        prose-strong:text-brand-text"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />
            </div>
        </div>
    );
};

export default BlogPost;
