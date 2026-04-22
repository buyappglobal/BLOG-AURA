import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { getAllPosts } from '../lib/posts';
import SEO from '../components/SEO';
import CategoryBadge from '../components/CategoryBadge';
import FeaturedCarousel from '../components/FeaturedCarousel';
import { AuraLiveDemo } from '../components/AuraLiveDemo';
import { AudioDemo } from '../components/AudioDemo';
import { CompactContactWidget } from '../components/CompactContactWidget';
import { BlogSearch } from '../components/BlogSearch';
import { Sparkles, ArrowRight, Filter, ShieldCheck, Zap } from 'lucide-react';

export default function BlogList() {
  const allPosts = getAllPosts();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // URL to Aura Live Demo
  const auraDemoUrl = "https://auradisplay.es";
  const auraPosterUrl = "https://solonet.es/wp-content/uploads/2026/03/LOGO-AURA-BUSINESS-512-x-512-px.png";

  const categories = ['Retail', 'Hostelería', 'Partners', 'Ecosistema'];

  const filteredPosts = allPosts.filter(post => {
    const matchesCategory = selectedCategory ? post.category === selectedCategory : true;
    const matchesSearch = searchQuery 
      ? post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        post.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  });

  const displayPosts = filteredPosts;

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
          {/* Search Widget */}
          <BlogSearch onSearch={setSearchQuery} />

          {/* Live Demo Widget */}
          <div className="bg-aura-card aura-border rounded-3xl p-6">
             <div className="flex items-center gap-2 mb-4">
               <Sparkles className="w-4 h-4 text-aura-accent" />
               <h3 className="text-[10px] font-bold uppercase tracking-widest text-aura-accent">Demo en Vivo</h3>
             </div>
             <AuraLiveDemo demoUrl={auraDemoUrl} posterUrl={auraPosterUrl} />
          </div>

          {/* Audio Demo Widget */}
          <div className="bg-aura-card aura-border rounded-3xl p-1 overflow-hidden">
             <div className="p-6 pb-0">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-3 h-3 text-aura-accent" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-aura-accent">Branding Sonoro</span>
                </div>
                <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Siente la Atmósfera</h3>
             </div>
             <div className="px-2 pb-2">
                <AudioDemo 
                  url="https://media.auradisplay.es/aura_flamenca/Sevilla%20de%20Seda.mp3" 
                  title="Sevilla de Seda" 
                  subtitle="Branding Sonoro"
                />
             </div>
          </div>

          <div className="bg-aura-card aura-border rounded-2xl p-8">
            <h3 className="text-xs font-bold uppercase tracking-widest text-aura-accent mb-6">Artículos Recientes</h3>
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

          {/* Legal Security Widget */}
          <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-3xl p-8 relative overflow-hidden group">
            <ShieldCheck className="absolute -right-4 -bottom-4 w-32 h-32 text-emerald-500/10 -rotate-12 group-hover:scale-110 transition-transform duration-700" />
            <div className="relative z-10">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6 text-emerald-500" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-500 mb-4">Blindaje Legal Tech</h3>
              <p className="text-xs text-aura-muted leading-relaxed mb-6 italic">
                "Certificamos la exención total de cánones SGAE/AGEDI mediante el uso de IA y derechos directos."
              </p>
              <Link to="/guia-legal-sgae" className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 flex items-center gap-2 hover:translate-x-1 transition-transform">
                Ver Certificación <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          <CompactContactWidget />

          <div className="bg-aura-accent/5 border border-aura-accent/20 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-4 h-4 text-aura-accent" />
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-aura-accent">Aura Business Insights</h3>
            </div>
            <p className="text-xs text-aura-muted leading-relaxed mb-4">
              Optimizando el ecosistema sensorial con <strong>JSON-LD</strong> y esquemas avanzados.
            </p>
            <div className="font-mono text-[9px] text-aura-muted/40 bg-aura-bg p-3 rounded border border-aura-border overflow-hidden">
              <code className="block animate-pulse">&lt;script type="application/ld+json"&gt;...</code>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
