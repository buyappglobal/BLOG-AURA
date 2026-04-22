import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { getPostBySlug } from '../lib/posts';
import SEO from '../components/SEO';
import CategoryBadge from '../components/CategoryBadge';
import { AudioDemo } from '../components/AudioDemo';
import { ArrowLeft, Calendar, User, Share2 } from 'lucide-react';
import { useEffect } from 'react';

export default function PostPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = slug ? getPostBySlug(slug) : null;

  useEffect(() => {
    if (!post && slug) {
      navigate('/');
    }
    window.scrollTo(0, 0);
  }, [post, slug, navigate]);

  if (!post) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <SEO 
        title={post.title}
        description={post.description}
        keywords={post.keywords}
        image={post.image}
        slug={post.slug}
        category={post.category}
        type="article"
      />

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-12"
      >
        <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-aura-muted hover:text-aura-text transition-colors">
          <ArrowLeft className="w-4 h-4" /> Volver al blog
        </Link>
      </motion.div>

      <header className="mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-4 font-mono text-xs text-aura-muted mb-6 uppercase tracking-widest">
            <CategoryBadge category={post.category} />
            <div className="w-1 h-1 bg-aura-border rounded-full" />
            <span>{post.date}</span>
            <div className="w-1 h-1 bg-aura-border rounded-full" />
            <span className="text-aura-accent">12 Min Read</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-10 leading-[1.1]">
            {post.title}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="aspect-video rounded-[32px] overflow-hidden aura-border bg-aura-card mb-16"
        >
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover opacity-80"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1200";
            }}
          />
        </motion.div>
      </header>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="markdown-body"
      >
        <ReactMarkdown
          rehypePlugins={[rehypeRaw]}
          components={{
            p: ({ children, ...props }) => {
              const childrenArray = Array.isArray(children) ? children : [children];
              // Detect link that starts with "audio:" as an AudioDemo trigger
              const audioMatch = childrenArray.find(
                (child: any) => 
                  child?.props?.href?.startsWith('audio:') || 
                  (typeof child === 'string' && child.startsWith('audio:'))
              );

              if (audioMatch) {
                const audioData = typeof audioMatch === 'string' ? audioMatch : audioMatch.props.children;
                const [_, url, title, subtitle] = audioData.split('|');
                return <AudioDemo url={url} title={title} subtitle={subtitle} />;
              }
              return <p {...props}>{children}</p>;
            }
          }}
        >
          {post.content}
        </ReactMarkdown>
      </motion.div>

      <footer className="mt-24 pt-12 border-t border-aura-border">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-full bg-aura-card aura-border flex items-center justify-center">
              <User className="w-7 h-7 text-aura-muted" />
            </div>
            <div>
              <p className="text-sm font-bold text-aura-text uppercase tracking-wider">{post.author}</p>
              <p className="text-xs font-mono text-aura-muted uppercase tracking-tighter">Aura Business Strategy Team</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={() => {
                const url = window.location.href;
                if (navigator.share) {
                  navigator.share({
                    title: post.title,
                    text: post.description,
                    url: url,
                  }).catch(console.error);
                } else {
                  navigator.clipboard.writeText(url);
                  // Simple toast notification
                  const toast = document.createElement('div');
                  toast.className = 'fixed bottom-24 left-1/2 -translate-x-1/2 bg-aura-accent text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest shadow-2xl z-50 animate-bounce';
                  toast.innerText = '¡Enlace copiado!';
                  document.body.appendChild(toast);
                  setTimeout(() => toast.remove(), 3000);
                }
              }}
              className="p-4 rounded-full aura-border hover:bg-aura-accent hover:text-white transition-all group relative"
              title="Compartir artículo"
            >
              <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
