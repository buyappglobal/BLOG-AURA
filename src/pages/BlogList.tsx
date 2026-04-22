import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { getAllPosts } from '../lib/posts';
import SEO from '../components/SEO';
import CategoryBadge from '../components/CategoryBadge';
import FeaturedCarousel from '../components/FeaturedCarousel';
import { ArrowRight, Filter } from 'lucide-react';

export default function BlogList() {
  const allPosts = getAllPosts();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = ['Retail', 'Hostelería', 'Partners', 'Ecosistema'];

  const filteredPosts = selectedCategory 
    ? allPosts.filter(post => post.category === selectedCategory)
    : allPosts;

  const displayPosts = selectedCategory ? filteredPosts : filteredPosts.slice(5);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <SEO 
        title="Blog" 
        description="Explora el ecosistema sensorial de Aura Business: iluminación circadiana, biometría sonora y neuro-arquitectura para retail y hostelería."
        category="Ecosistema"
      />

      {!selectedCategory && <FeaturedCarousel posts={allPosts} />}

      {/* Category Filter */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <Filter className="w-4 h-4 text-aura-accent" />
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-aura-muted">Filtrar por Categoría</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 border ${
              selectedCategory === null 
                ? "bg-aura-accent text-black border-aura-accent" 
                : "bg-aura-card text-aura-muted border-aura-border hover:border-aura-accent/40"
            }`}
          >
            Todos
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 border ${
                selectedCategory === cat 
                  ? "bg-aura-accent text-black border-aura-accent" 
                  : "bg-aura-card text-aura-muted border-aura-border hover:border-aura-accent/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-10">
          <AnimatePresence mode="wait">
            <div key={selectedCategory || 'all'} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {displayPosts.map((post, index) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-aura-card aura-border rounded-2xl overflow-hidden flex flex-col group"
                >
                  {post.image && (
                    <div className="h-48 overflow-hidden relative">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1200";
                        }}
                      />
                      <div className="absolute top-4 left-4">
                        <CategoryBadge category={post.category} />
                      </div>
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-[9px] text-aura-muted/60 uppercase tracking-wider">{post.date}</span>
                      <span className="font-mono text-[9px] text-aura-muted/60 uppercase tracking-wider">{post.author.split(' ')[0]}</span>
                    </div>
                    <h2 className="text-xl font-bold mb-3 leading-snug group-hover:text-aura-accent transition-colors">
                      <Link to={`/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <p className="text-aura-muted text-sm line-clamp-2 mb-6 flex-grow">
                      {post.description}
                    </p>
                    <Link 
                      to={`/${post.slug}`}
                      className="text-xs font-bold uppercase tracking-widest text-aura-accent hover:text-white transition-colors flex items-center gap-2"
                    >
                      Leer Artículo <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </motion.article>
              ))}
              
              {displayPosts.length === 0 && (
                <div className="col-span-full py-20 text-center">
                  <p className="text-aura-muted uppercase tracking-widest text-xs">No hay artículos en esta categoría todavía.</p>
                </div>
              )}
            </div>
          </AnimatePresence>
        </div>

        {/* Sidebar */}
        <aside className="space-y-8">
          <div className="bg-aura-card aura-border rounded-2xl p-8">
            <h3 className="text-xs font-bold uppercase tracking-widest text-aura-accent mb-6">Recientes</h3>
            <div className="space-y-6">
              {allPosts.slice(0, 4).map((post) => (
                <div key={post.slug} className="group">
                  <Link to={`/${post.slug}`} className="block">
                    <h4 className="text-sm font-bold mb-1 group-hover:text-aura-accent transition-colors">{post.title}</h4>
                    <p className="text-[11px] text-aura-muted line-clamp-1">{post.description}</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-aura-accent/5 border border-aura-accent/20 rounded-2xl p-8">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-aura-accent mb-4">Aura Business Insights</h3>
            <p className="text-xs text-aura-muted leading-relaxed mb-4">
              Optimizando el ecosistema sensorial con <strong>JSON-LD</strong> y esquemas avanzados.
            </p>
            <div className="font-mono text-[9px] text-aura-muted/40 bg-aura-bg p-3 rounded border border-aura-border">
              &lt;script type="application/ld+json"&gt;...
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
