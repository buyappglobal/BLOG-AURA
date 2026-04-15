import { Link, Outlet } from 'react-router-dom';
import { motion } from 'motion/react';
import { Zap, Menu, X } from 'lucide-react';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import { SoundscapePlayer } from './SoundscapePlayer';
import ContactCTA from './ContactCTA';

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <div className="aura-glow-top" />
      <div className="aura-glow-bottom" />

      <header className="sticky top-0 z-50 bg-aura-bg/80 backdrop-blur-md border-b border-aura-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center gap-3 group">
              <img 
                src="https://solonet.es/wp-content/uploads/2026/03/LOGO-AURA-BUSINESS-512-x-512-px-128-x-128-px.png" 
                alt="Aura Business" 
                className="w-10 h-10 object-contain group-hover:scale-110 transition-transform"
                referrerPolicy="no-referrer"
              />
              <span className="text-xl font-extrabold tracking-tighter text-aura-text flex items-center gap-2">
                AURA <span className="text-aura-accent">BUSINESS</span>
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-10">
              <Link to="/" className="text-[10px] font-bold text-aura-muted hover:text-aura-accent transition-colors uppercase tracking-[0.2em]">Ecosistema</Link>
              <a 
                href="https://auradisplay.es" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[10px] font-bold text-aura-muted hover:text-aura-accent transition-colors uppercase tracking-[0.2em]"
              >
                Aura Display
              </a>
              <a 
                href="https://partners.auradisplay.es" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[10px] font-bold text-aura-muted hover:text-aura-accent transition-colors uppercase tracking-[0.2em]"
              >
                Partners
              </a>
              <div className="h-3 w-[1px] bg-aura-border" />
              <ThemeToggle />
            </nav>

            <div className="md:hidden flex items-center gap-4">
              <ThemeToggle />
              <button className="text-aura-text" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-aura-bg border-b border-aura-border px-4 py-6 flex flex-col gap-4"
          >
            <Link to="/" className="text-sm font-bold text-aura-text uppercase tracking-widest" onClick={() => setIsMenuOpen(false)}>Ecosistema</Link>
            <a href="https://auradisplay.es" className="text-sm font-bold text-aura-text uppercase tracking-widest">Neuro-Venta</a>
            <a href="https://partners.auradisplay.es" className="text-sm font-bold text-aura-text uppercase tracking-widest">Legal Tech</a>
          </motion.div>
        )}
      </header>

      <main className="flex-grow relative z-10">
        <Outlet />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactCTA />
        </div>
      </main>

      <footer className="bg-aura-bg border-t border-aura-border py-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 font-mono text-[9px] text-aura-muted/40 uppercase tracking-[0.1em]">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-500/50 rounded-full" />
              <span>System: ISR Active</span>
            </div>
            
            <div className="flex gap-4 opacity-50">
              <span>Stack: Next/Tailwind</span>
              <span>SEO: JSON-LD/OG</span>
            </div>

            <div>
              &copy; 2026 Aura Business Strategy
            </div>
          </div>
        </div>
      </footer>
      <SoundscapePlayer />
    </div>
  );
}
