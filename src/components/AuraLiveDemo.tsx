import React, { useState } from 'react';
import { Play } from 'lucide-react';

interface AuraLiveDemoProps {
  demoUrl: string;
  posterUrl: string;
}

export const AuraLiveDemo: React.FC<AuraLiveDemoProps> = ({ demoUrl, posterUrl }) => {
  const [isActive, setIsActive] = useState(false);

  if (!isActive) {
    return (
      <div 
        className="relative aspect-video rounded-3xl overflow-hidden border border-aura-border group cursor-pointer"
        onClick={() => setIsActive(true)}
      >
        <img 
          src={posterUrl} 
          alt="Vista previa de la demo" 
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-16 h-16 rounded-full bg-aura-accent flex items-center justify-center">
            <Play className="text-black ml-1" fill="currentColor" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="aspect-video rounded-3xl overflow-hidden border border-aura-border bg-black">
      <iframe 
        src={demoUrl} 
        className="w-full h-full"
        title="AuraDisplay Live Demo"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};
