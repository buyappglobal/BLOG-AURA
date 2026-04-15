import React, { useState } from 'react';
import { MessageCircle, Send } from 'lucide-react';
import { motion } from 'motion/react';

export default function ContactCTA() {
  const [name, setName] = useState('');
  const WHATSAPP_NUMBER = '34648512127';

  const handleWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const message = encodeURIComponent(`Hola Aura Business, me llamo ${name} y me gustaría recibir más información sobre cómo contratar vuestros servicios.`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <section className="my-24 bg-aura-card aura-border rounded-[40px] overflow-hidden relative group">
      <div className="absolute inset-0 bg-aura-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      <div className="relative z-10 p-8 md:p-16 flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-grow text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-aura-accent/10 text-aura-accent text-[10px] font-bold uppercase tracking-widest mb-6">
            <MessageCircle className="w-3 h-3" /> Contacto Directo
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6 leading-tight">
            ¿Listo para profesionalizar <br /> tu <span className="text-aura-accent">Ecosistema Sensorial?</span>
          </h2>
          <p className="text-aura-muted text-lg max-w-xl mx-auto lg:mx-0">
            Solicita una auditoría gratuita y descubre cómo ahorrar en cánones mientras optimizas tus ventas.
          </p>
        </div>

        <div className="w-full lg:w-auto min-w-[320px] md:min-w-[400px]">
          <form onSubmit={handleWhatsApp} className="bg-aura-bg aura-border p-8 rounded-3xl shadow-2xl">
            <div className="mb-6">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-aura-muted mb-3">Tu Nombre</label>
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Escribe tu nombre..."
                className="w-full bg-aura-card border border-aura-border rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-aura-accent transition-colors"
              />
            </div>
            
            <button 
              type="submit"
              className="w-full bg-aura-accent text-black font-bold uppercase tracking-widest text-xs py-5 rounded-xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-aura-accent/20"
            >
              Contactar por WhatsApp <Send className="w-4 h-4" />
            </button>
            
            <p className="mt-4 text-center text-[9px] text-aura-muted uppercase tracking-tighter">
              Atención inmediata: +34 648 512 127
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
