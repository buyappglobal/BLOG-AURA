import { motion } from 'motion/react';
import { ShieldCheck, Zap, BarChart3, Tv, MessageSquare, Clock, ArrowRight, CheckCircle2, LayoutPanelLeft, Sparkles, Monitor } from 'lucide-react';
import SEO from '../components/SEO';

export default function LandingPage() {
  const pillars = [
    {
      title: "Aura Soundscape (Audio)",
      description: "Mucho más que música. Paisajes sonoros circadianos que se sincronizan con el ritmo biológico de tus clientes para maximizar el bienestar.",
      icon: <Sparkles className="w-8 h-8 text-aura-accent" />,
      features: ["Ritmos circadianos automáticos", "IA de Biometría Sonora", "Exención total SGAE/AGEDI"],
      image: "https://images.unsplash.com/photo-1514525253361-bee8718a340b?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Aura Visuals (Signage)",
      description: "Convierte cualquier Smart TV en un canal de marketing dinámico. Promociones en tiempo real y estética de lujo sin hardware externo.",
      icon: <Tv className="w-8 h-8 text-aura-accent" />,
      features: ["Tickers de noticias en vivo", "Slides de contenido 4K", "Actualización remota instantánea"],
      image: "https://images.unsplash.com/photo-1542744173-8e7e5381bb03?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Aura AI Agent (Ventas) - EN CONSTRUCCIÓN",
      description: "El asistente que vende por ti. Conexión directa mediante QR inteligente para fidelización, pedidos o información en el punto de venta.",
      icon: <MessageSquare className="w-8 h-8 text-aura-accent" />,
      features: ["Integración WhatsApp Business", "Fidelización automática", "Atención 24/7 sin personal"],
      image: "https://images.unsplash.com/photo-1531746790731-6c087fecd05a?auto=format&fit=crop&q=80&w=800"
    }
  ];

  const useCases = [
    {
      niche: "Supermercados & Retail",
      benefit: "Gestión de turnos visual y ofertas flash que aumentan el ticket medio de forma inmediata.",
      context: "Ideal para el sector gran consumo (Ej. Supermercados El Jamón)."
    },
    {
      niche: "Hoteles & Lobbies",
      benefit: "Arquitectura invisible que define el lujo. Branding visual y sonoro de alta gama sincronizado.",
      context: "Estándar premium para el corazón de la hospitalidad andaluza."
    },
    {
      niche: "Gastronomía & Ocio",
      benefit: "Ambientes que evolucionan del brunch relajado a las copas nocturnas sin intervención humana.",
      context: "Dinamiza tu local según la hora del día."
    },
    {
      niche: "Gimnasios & Wellness",
      benefit: "Paisajes sonoros motivacionales que se sincronizan con la intensidad de la clase dirigida.",
      context: "Potencia el rendimiento con biofeedback sonoro en tiempo real."
    },
    {
      niche: "Joyerías & Lujo",
      benefit: "Atmosferas minimalistas que resaltan la exclusividad del producto mediante iluminación y silencio absoluto.",
      context: "El entorno perfecto para cerrar ventas de alto valor."
    }
  ];

  return (
    <div className="relative">
      <SEO 
        title="Atmósfera Inteligente | Aura Display: Gestiona Sonido, Imagen y Ventas"
        description="Aura Display es el cerebro de tu establecimiento. Sincroniza marketing sensorial, cartelería digital e IA de ventas en un solo sistema sin hardware."
        keywords="gestor atmosfera negocio, marketing sensorial 360, cartelería digital sevilla, hilo musical inteligente huelva, biometria sonora retail, aura display"
      />

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-aura-accent/10 border border-aura-accent/20 mb-8"
          >
            <LayoutPanelLeft className="w-4 h-4 text-aura-accent" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-aura-accent">Gestión Sensorial 360° para tu Negocio</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.85]"
          >
            SINCRONIZA TU <br />
            <span className="text-aura-accent">ATMÓSFERA.</span><br />
            <span className="text-white">AUTOMATIZA</span> <span className="text-aura-muted/20 italic">VENTAS.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl mx-auto text-xl md:text-2xl text-aura-muted leading-relaxed mb-12 px-4"
          >
            Aura Display no es una App de música. Es el <strong>cerebro de tu establecimiento</strong> que sincroniza sonido, imagen y atención al cliente en un solo sistema inteligente.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <a 
              href="https://auradisplay.es" 
              className="group px-12 py-6 bg-aura-accent text-black font-bold uppercase tracking-widest text-xs rounded-full hover:scale-105 transition-all flex items-center gap-3 shadow-2xl shadow-aura-accent/30"
            >
              Conectar y Brillar <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Feature Grid: UI for Value Prop */}
      <section className="py-24 border-y border-aura-border bg-aura-card/20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <h4 className="text-aura-accent font-bold text-3xl mb-2">100%</h4>
              <p className="text-aura-muted text-[10px] uppercase font-bold tracking-widest">Exención SGAE/AGEDI</p>
            </div>
            <div className="text-center border-x border-aura-border/40 px-4">
              <h4 className="text-white font-bold text-3xl mb-2">PWA</h4>
              <p className="text-aura-muted text-[10px] uppercase font-bold tracking-widest">Cero Hardware Externo</p>
            </div>
            <div className="text-center">
              <h4 className="text-aura-accent font-bold text-3xl mb-2">+15%</h4>
              <p className="text-aura-muted text-[10px] uppercase font-bold tracking-widest">Incremento Ticket Medio</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Trident pillars section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">El tridente del poder sensorial</h2>
            <p className="text-aura-muted max-w-xl mx-auto uppercase text-[10px] tracking-[0.3em] font-bold">Tres soluciones. Un solo ecosistema.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-aura-card aura-border rounded-[40px] overflow-hidden group hover:border-aura-accent/40 transition-all duration-500"
              >
                <div className="p-10 flex flex-col h-full">
                  <div className="w-16 h-16 rounded-2xl bg-aura-accent/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                    {pillar.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 tracking-tight">{pillar.title}</h3>
                  <p className="text-aura-muted text-sm leading-relaxed mb-8 flex-grow">{pillar.description}</p>
                  <ul className="space-y-4 mb-10">
                    {pillar.features.map(f => (
                      <li key={f} className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-wider text-white/80">
                        <CheckCircle2 className="w-4 h-4 text-aura-accent" /> {f}
                      </li>
                    ))}
                  </ul>
                  <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl relative">
                    <img 
                      src={pillar.image} 
                      alt={pillar.title} 
                      className="w-full h-full object-cover opacity-40 group-hover:scale-110 group-hover:opacity-80 transition-all duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-aura-bg to-transparent opacity-60" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Circadian Mode Section */}
      <section className="py-32 bg-aura-accent/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="absolute -inset-10 bg-aura-accent/20 blur-[120px] rounded-full opacity-30 animate-pulse" />
              <div className="bg-aura-card aura-border rounded-[48px] p-8 relative">
                 <div className="flex items-center justify-between mb-12">
                    <div className="flex items-center gap-4">
                       <Clock className="w-6 h-6 text-aura-accent" />
                       <span className="text-xs font-bold uppercase tracking-widest">Modo Circadiano Activo</span>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-500 text-[8px] font-bold uppercase tracking-widest animate-pulse">Automatizado</div>
                 </div>
                 <div className="space-y-6">
                    <div className="p-5 rounded-2xl bg-aura-bg/50 border border-aura-border flex justify-between items-center opacity-40">
                       <span className="text-xs font-bold uppercase tracking-widest">Desayuno Relajado</span>
                       <span className="text-[10px] font-mono">60 BPM</span>
                    </div>
                    <div className="p-5 rounded-2xl bg-white/5 border border-aura-accent/40 flex justify-between items-center shadow-2xl shadow-aura-accent/10">
                       <span className="text-xs font-bold uppercase tracking-widest text-aura-accent italic">Hora del Vermut (Impulso)</span>
                       <span className="text-[10px] font-mono text-aura-accent">105 BPM</span>
                    </div>
                    <div className="p-5 rounded-2xl bg-aura-bg/50 border border-aura-border flex justify-between items-center opacity-40">
                       <span className="text-xs font-bold uppercase tracking-widest">Tarde de Compras</span>
                       <span className="text-[10px] font-mono">85 BPM</span>
                    </div>
                 </div>
              </div>
            </div>
            <div>
              <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-8 leading-[0.9]">
                OLVIDA LA GESTIÓN. <br />
                <span className="text-aura-accent">PULSA IMPULSO.</span>
              </h2>
              <p className="text-aura-muted text-lg mb-10 leading-relaxed">
                El sistema Aura conoce el pulso biológico de tus clientes. Se adapta automáticamente a la hora del día, pero te permite tomar el control absoluto con un solo clic desde tu móvil: **Activa la 'Hora del Vermut' o el 'After-work'** y cambia la energía de tu local al instante.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <div className="p-6 rounded-3xl bg-white/5 aura-border">
                    <ShieldCheck className="w-6 h-6 text-aura-accent mb-4" />
                    <h5 className="font-bold text-xs uppercase tracking-widest mb-2">Legalidad Art. 157 LPI</h5>
                    <p className="text-[11px] text-aura-muted">Blindaje total ante inspecciones. 100% libre de gestión colectiva.</p>
                 </div>
                 <div className="p-6 rounded-3xl bg-white/5 aura-border">
                    <Monitor className="w-6 h-6 text-aura-accent mb-4" />
                    <h5 className="font-bold text-xs uppercase tracking-widest mb-2">Cero Hardware</h5>
                    <p className="text-[11px] text-aura-muted">Funciona en Smart TV, Fire Stick o Tablets. Sin cables, sin complicaciones.</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Niche Cases */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mb-20">
             <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 text-center">Verticales de Éxito</h2>
             <p className="text-aura-muted text-center uppercase text-[10px] tracking-[0.2em] font-bold">Soluciones diseñadas por y para profesionales en Andalucía</p>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {useCases.map((uc, i) => (
              <motion.div
                key={uc.niche}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 rounded-[32px] bg-aura-card aura-border relative group"
              >
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-6 h-6 -rotate-45" />
                </div>
                <h4 className="text-xs font-bold text-aura-accent uppercase tracking-widest mb-6">{uc.niche}</h4>
                <p className="text-lg font-bold mb-4 leading-snug">{uc.benefit}</p>
                <p className="text-xs text-aura-muted italic">{uc.context}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section Re-imagined */}
      <section className="py-32 px-4 max-w-7xl mx-auto">
        <div className="bg-aura-accent rounded-[60px] p-12 md:p-24 text-black text-center relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05)_0%,transparent_70%)]" />
          <div className="relative z-10">
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 italic">PAZ MENTAL. EXPERIENCIA PREMIUM.</h2>
            <p className="text-xl md:text-2xl font-medium mb-12 max-w-2xl mx-auto leading-tight opacity-80">
              El audio es solo el vehículo. El destino es la venta, la imagen de marca y la tranquilidad legal de tu negocio.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a 
                href="https://auradisplay.es" 
                className="px-14 py-7 bg-black text-white font-bold uppercase tracking-[0.3em] text-xs rounded-full hover:scale-105 transition-transform shadow-2xl"
              >
                Comienza a Brillar Gratis
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
