import React, { useState } from 'react';
import { MessageCircle, Send } from 'lucide-react';

export const CompactContactWidget: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const WHATSAPP_NUMBER = '34648512127';

  const handleWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const message = encodeURIComponent(`Hola Aura Business, me llamo ${name}. Mi teléfono es ${phone}. Me gustaría recibir más información.`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <div className="bg-aura-accent/5 border border-aura-accent/20 rounded-3xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <MessageCircle className="w-4 h-4 text-aura-accent" />
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-aura-accent">Contacto Rápido</h3>
      </div>
      <p className="text-xs text-aura-muted leading-relaxed mb-6">
        ¿Dudas técnicas o comerciales? Habla con nuestro equipo de estrategas por WhatsApp.
      </p>
      <form onSubmit={handleWhatsApp} className="space-y-4">
        <input 
          type="text" 
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tu nombre..."
          className="w-full bg-aura-card border border-aura-border rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-aura-accent transition-colors"
        />
        <input 
          type="tel" 
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Tu número (Ej. +34 600...) "
          className="w-full bg-aura-card border border-aura-border rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-aura-accent transition-colors"
        />
        <button 
          type="submit"
          className="w-full bg-aura-accent text-black font-bold uppercase tracking-widest text-[10px] py-3 rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
        >
          Iniciar chat <Send className="w-3 h-3" />
        </button>
      </form>
    </div>
  );
};
