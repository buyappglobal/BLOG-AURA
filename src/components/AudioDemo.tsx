import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, SkipBack, SkipForward, Music } from 'lucide-react';
import { motion } from 'motion/react';

interface AudioDemoProps {
  url: string;
  title: string;
  subtitle?: string;
}

export const AudioDemo: React.FC<AudioDemoProps> = ({ 
  url,
  title,
  subtitle = "Branding Sonoro"
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const instanceId = useRef(Math.random().toString(36).substring(7));

  useEffect(() => {
    const handleOtherPlay = (e: CustomEvent) => {
      if (e.detail.instanceId !== instanceId.current && isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      }
    };
    window.addEventListener('aura-audio-play', handleOtherPlay as EventListener);
    return () => window.removeEventListener('aura-audio-play', handleOtherPlay as EventListener);
  }, [isPlaying]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
        window.dispatchEvent(new CustomEvent('aura-audio-play', { detail: { instanceId: instanceId.current } }));
      }
    }
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
          <p className="text-[10px] uppercase tracking-widest text-aura-accent font-bold">{subtitle}</p>
          <p className="text-sm font-medium text-white truncate">{title}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2 mb-4">
        <div className="flex-grow flex items-center gap-2">
          <Volume2 size={12} className="text-white/40" />
          <input type="range" min="0" max="1" step="0.1" value={volume} onChange={handleVolumeChange} className="w-full h-1 bg-white/10 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:bg-aura-accent [&::-webkit-slider-thumb]:rounded-full" />
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/5">
        <span className="w-1.5 h-1.5 rounded-full bg-aura-accent/50" />
        <p className="text-[9px] text-white/30 uppercase tracking-[0.1em] font-mono">© Aura Business Strategy</p>
      </div>

      <audio ref={audioRef} src={url} />
    </div>
  );
};
