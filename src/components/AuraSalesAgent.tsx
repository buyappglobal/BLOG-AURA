import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { MessageSquare, Send, X, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const AuraSalesAgent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([
    { role: 'model', text: '¡Hola! Soy tu asistente comercial de Aura Business. ¿En qué puedo ayudarte hoy sobre nuestras soluciones de IA, marketing sensorial o cartelería digital?' }
  ]);
  const [input, setInput] = useState('');
  const [context, setContext] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    fetch('/api/posts-context')
      .then(res => res.json())
      .then(data => setContext(data.context))
      .catch(err => console.error("Failed to load posts context", err));
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = { role: 'user' as const, text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite-preview",
        contents: [
            ...messages.map(m => ({ role: m.role === 'user' ? 'user' : 'model', parts: [{ text: m.text }] })),
            { role: 'user', parts: [{ text: userMessage.text }] }
        ],
        config: {
            systemInstruction: `Eres un agente comercial experto en el Ecosistema Aura Business. Tu objetivo es educar y convertir visitantes en clientes.
            
            BASE DE CONOCIMIENTO (Blog):
            ${context}

            CONOCIMIENTO DEL ECOSISTEMA:
            1. AuraSoundscape: Marketing sensorial 360°. No es hilo musical; son paisajes sonoros circadianos que se sincronizan con el ritmo biológico de los clientes para maximizar el bienestar. Exento 100% de cánones SGAE/AGEDI.
            2. AuraVisuals: Cartelería digital inteligente. Convierte Smart TVs/Tablets en canales de marketing dinámico sin hardware externo. Automatiza ofertas flash, tickers en vivo y estética 4K.
            3. AuraAIAgent: Asistente comercial con IA para el punto de venta (QR inteligente, Whatsapp Business, atención 24/7 sin personal). - EN CONSTRUCCIÓN.
            
            DIRECTRICES:
            - Tu tono es profesional, entusiasta y eficiente.
            - Responde a dudas técnicas o comerciales usando la BASE DE CONOCIMIENTO y este Ecosistema.
            - Si preguntan por AuraAIAgent, indica que está "en construcción".
            - SIEMPRE guía al usuario a contactar por WhatsApp para cerrar la venta.
            - Si el usuario muestra interés en profundizar, recomienda leer un post específico del blog usando la información de la BASE DE CONOCIMIENTO.
            - No generes imágenes. Solo texto.`
        }
      });
      setMessages(prev => [...prev, { role: 'model', text: response.text || 'Lo siento, no he podido procesar tu solicitud.' }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: 'Lo siento, ha ocurrido un error. Por favor, intenta de nuevo.' }]);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-4 bg-aura-accent text-black rounded-full shadow-2xl hover:scale-110 transition-transform z-50"
      >
        <Bot className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-24 right-6 w-80 h-96 bg-aura-card border border-aura-border rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            <div className="p-4 border-b border-aura-border bg-aura-bg flex justify-between items-center">
              <span className="font-bold text-xs uppercase tracking-widest text-aura-accent">Aura Sales Agent</span>
              <button onClick={() => setIsOpen(false)}><X className="w-4 h-4 text-aura-muted" /></button>
            </div>
            <div className="flex-grow p-4 overflow-y-auto space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={`text-xs p-3 rounded-xl ${m.role === 'user' ? 'bg-aura-accent text-black ml-auto max-w-[80%]' : 'bg-aura-bg text-aura-text max-w-[80%]'}`}>
                  {m.text}
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            <div className="p-4 border-t border-aura-border flex items-center gap-2">
              <input 
                className="flex-grow bg-aura-bg text-xs p-3 rounded-xl outline-none border border-aura-border"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Pregúntame algo..."
              />
              <button onClick={handleSend} className="p-3 bg-aura-accent text-black rounded-xl hover:scale-105 transition-transform"><Send className="w-4 h-4" /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
