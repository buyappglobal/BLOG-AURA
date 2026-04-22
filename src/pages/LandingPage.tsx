import { motion } from 'motion/react';
import { ShieldCheck, Zap, BarChart3, Radio, Monitor, Globe, ArrowRight, CheckCircle2 } from 'lucide-react';
import SEO from '../components/SEO';

export default function LandingPage() {
  const pillars = [
    {
      title: "Aura Business",
      description: "El motor de rentabilidad para PYMES. Hilo musical inteligente exento de SGAE/AGEDI.",
      icon: <Zap className="w-8 h-8 text-aura-accent" />,
      features: ["Ahorro 100% en cánones", "IA de Biometría Sonora", "Instalación PWA inmediata"],
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Aura Soundscape",
      description: "Alta costura sonora para el sector lujo. Paisajes inmersivos que definen tu marca.",
      icon: <Radio className="w-8 h-8 text-aura-accent" />,
      features: ["Curación Algorítmica", "Arquitectura Invisible", "Soporte Técnico de Élite"],
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Aura Public",
      description: "Transformando ciudades en Smart Cities mediante comunicación dinámica y ahorro.",
      icon: <Globe className="w-8 h-8 text-aura-accent" />,
      features: ["Tickers informativos", "Eficiencia Pública", "Gestión Centralizada"],
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <div className="relative">
      <SEO 
        title="Aura Display | El Futuro del Marketing Sensorial en Andalucía"
        description="Aura Display profesionaliza la atmósfera de tu negocio con IA. Hilo musical inteligente, biometría sonora y exención SGAE en Sevilla y Huelva."
        keywords="marketing sensorial sevilla, hilo musical huelva, aura display, aura business, ahorro sgae bar, sonido retail lujo"
      />

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-aura-accent/10 aura-border mb-8"
          >
            <Zap className="w-4 h-4 text-aura-accent" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-aura-accent">Tecnología Legal Tech líder en España</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 leading-[0.95]"
          >
            AURA <span className="text-aura-accent">DISPLAY</span><br />
            EL PODER DE <span className="text-aura-muted/40">SENTIR.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-aura-muted leading-relaxed mb-12"
          >
            No somos simplemente música de fondo. Somos la arquitectura sensorial que maximiza la rentabilidad de tu negocio en <strong>Andalucía</strong> mediante IA y biometría sonora.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a 
              href="https://auradisplay.es" 
              className="px-10 py-5 bg-aura-accent text-black font-bold uppercase tracking-widest text-xs rounded-full hover:scale-105 transition-transform flex items-center gap-2 shadow-2xl shadow-aura-accent/20"
            >
              Entrar a la Herramienta <ArrowRight className="w-4 h-4" />
            </a>
            <a 
              href="#pilares" 
              className="px-10 py-5 bg-aura-card aura-border text-aura-text font-bold uppercase tracking-widest text-xs rounded-full hover:bg-aura-border transition-colors"
            >
              Explorar Soluciones
            </a>
          </motion.div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-12 border-y border-aura-border bg-aura-card/50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-aura-muted/40 mb-8">Nuestros clientes operan en</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 grayscale">
            <span className="text-xl font-bold italic tracking-tighter">HOSTELERÍA SEVILLA</span>
            <span className="text-xl font-bold italic tracking-tighter">RETAIL HUELVA</span>
            <span className="text-xl font-bold italic tracking-tighter">LUJO MARBELLA</span>
            <span className="text-xl font-bold italic tracking-tighter">DIGITAL SIGNAGE</span>
          </div>
        </div>
      </section>

      {/* The Pillars */}
      <section id="pilares" className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-aura-card aura-border rounded-[32px] overflow-hidden group hover:border-aura-accent/40 transition-colors"
              >
                <div className="p-10">
                  <div className="mb-6">{pillar.icon}</div>
                  <h3 className="text-2xl font-bold mb-4 tracking-tight">{pillar.title}</h3>
                  <p className="text-aura-muted text-sm leading-relaxed mb-8">{pillar.description}</p>
                  <ul className="space-y-3 mb-10">
                    {pillar.features.map(f => (
                      <li key={f} className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-aura-text">
                        <CheckCircle2 className="w-4 h-4 text-aura-accent" /> {f}
                      </li>
                    ))}
                  </ul>
                  <div className="h-48 rounded-2xl overflow-hidden shadow-inner bg-black/20">
                    <img 
                      src={pillar.image} 
                      alt={pillar.title} 
                      className="w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Focus */}
      <section className="py-32 bg-aura-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-10 leading-none">
                MENOS <span className="text-aura-accent">HARDWARE.</span><br />
                MÁS <span className="text-aura-muted/40">MARGEN.</span>
              </h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-aura-accent/10 flex items-center justify-center shrink-0">
                    <Monitor className="w-7 h-7 text-aura-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Arquitectura PWA</h4>
                    <p className="text-aura-muted text-sm leading-relaxed">Sin dispositivos externos. Sin cables. Instala Aura directamente en tu Smart TV en segundos.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-aura-accent/10 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-7 h-7 text-aura-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Blindaje Legal Tech</h4>
                    <p className="text-aura-muted text-sm leading-relaxed">Música generada por IA 100% legal y certificada. Di adiós a los inspectores y a las facturas de la SGAE.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-aura-accent/10 flex items-center justify-center shrink-0">
                    <BarChart3 className="w-7 h-7 text-aura-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Biometría Predictiva</h4>
                    <p className="text-aura-muted text-sm leading-relaxed">Nuestra IA ajusta el BPM de tu local según el flujo de clientes para maximizar el ticket medio.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-10 bg-aura-accent/20 blur-[100px] rounded-full opacity-50" />
              <div className="relative bg-aura-bg aura-border rounded-[40px] p-2 overflow-hidden shadow-2xl shadow-aura-accent/20">
                <img 
                  src="https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=1200" 
                  alt="Aura Tech"
                  className="w-full h-full rounded-[38px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-32">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-aura-accent rounded-[48px] p-12 md:p-24 text-center text-black relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0%,transparent_70%)] animate-pulse" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8 italic">
                ¿A QUÉ SUENA TU ÉXITO?
              </h2>
              <p className="text-xl font-medium mb-12 opacity-80 max-w-xl mx-auto leading-relaxed">
                Únete a los líderes del sector en Sevilla, Huelva y toda Andalucía que ya operan dentro del ecosistema Aura.
              </p>
              <a 
                href="https://auradisplay.es" 
                className="inline-flex items-center gap-2 px-12 py-6 bg-black text-white font-bold uppercase tracking-[0.2em] text-xs rounded-full hover:scale-105 transition-transform"
              >
                Comenzar ahora gratis <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
