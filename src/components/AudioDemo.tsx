import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, SkipBack, SkipForward, Music } from 'lucide-react';
import { motion } from 'motion/react';

interface AudioDemoProps {
  initialPlaylist?: { url: string; title: string }[];
}

export const AudioDemo: React.FC<AudioDemoProps> = ({ 
  initialPlaylist = [
    { url: "https://media.auradisplay.es/aura_flamenca/Sevilla%20de%20Seda.mp3", title: "Sevilla de Seda" },
    { url: "https://media.auradisplay.es/aura_flamenca/Azahar%20Catedral.mp3", title: "Azahar Catedral" },
    { url: "https://media.auradisplay.es/midnight/copa_de_medianoche.mp3", title: "Copa de Medianoche" }
  ]
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = initialPlaylist[currentIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      if (isPlaying) audioRef.current.play();
    }
  }, [currentIndex]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const changeTrack = (direction: 'next' | 'prev') => {
    let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    if (nextIndex >= initialPlaylist.length) nextIndex = 0;
    else if (nextIndex < 0) nextIndex = initialPlaylist.length - 1;
    setCurrentIndex(nextIndex);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) audioRef.current.volume = newVolume;
  };

  return (
    <div className="bg-black/40 border border-white/5 rounded-2xl p-4 backdrop-blur-md">
      <div className="flex items-center gap-4 mb-4">
        <button onClick={togglePlay} className="w-12 h-12 flex items-center justify-center rounded-full bg-aura-accent text-black hover:scale-105 transition-transform">
          {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
        </button>
        <div className="flex-grow min-w-0">
          <p className="text-[10px] uppercase tracking-widest text-aura-accent font-bold">Branding Sonoro</p>
          <p className="text-sm font-medium text-white truncate">{currentTrack.title}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2 mb-4">
        <button onClick={() => changeTrack('prev')} className="text-white/60 hover:text-white"><SkipBack size={16} /></button>
        <button onClick={() => changeTrack('next')} className="text-white/60 hover:text-white"><SkipForward size={16} /></button>
        <div className="flex-grow flex items-center gap-2 ml-2">
          <Volume2 size={12} className="text-white/40" />
          <input type="range" min="0" max="1" step="0.1" value={volume} onChange={handleVolumeChange} className="w-full h-1 bg-white/10 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:bg-aura-accent [&::-webkit-slider-thumb]:rounded-full" />
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/5">
        <span className="w-1.5 h-1.5 rounded-full bg-aura-accent/50" />
        <p className="text-[9px] text-white/30 uppercase tracking-[0.1em] font-mono">© Aura Business Strategy</p>
      </div>

      <audio ref={audioRef} src={currentTrack.url} onEnded={() => changeTrack('next')} />
    </div>
  );
};
