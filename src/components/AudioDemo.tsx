import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Music, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AudioDemoProps {
  url: string;
  title: string;
  subtitle?: string;
  accentColor?: string;
}

export const AudioDemo: React.FC<AudioDemoProps> = ({ 
  url, 
  title, 
  subtitle = "Experiencia Sensorial Aura",
  accentColor = "var(--color-aura-accent)"
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = async () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        try {
          setIsLoading(true);
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (err) {
          console.error("Audio playback error:", err);
          setIsPlaying(false);
        } finally {
          setIsLoading(false);
        }
      }
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      if (duration > 0) {
        setProgress((current / duration) * 100);
      }
    }
  };

  return (
    <div className="my-12 p-1 rounded-[32px] bg-gradient-to-br from-aura-border via-aura-card to-aura-border shadow-2xl relative overflow-hidden group">
      <div className="bg-aura-card rounded-[31px] p-6 md:p-8 flex items-center gap-6 relative z-10 backdrop-blur-3xl">
        <div className="relative shrink-0">
          <button
            onClick={togglePlay}
            disabled={isLoading}
            style={{ backgroundColor: isPlaying ? 'transparent' : accentColor }}
            className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-xl group/btn ${
              isPlaying ? 'border-2 border-aura-accent' : 'text-black'
            }`}
          >
            {isLoading ? (
              <Loader2 className="w-8 h-8 animate-spin text-aura-accent" />
            ) : isPlaying ? (
              <Pause className="w-8 h-8 text-aura-accent" fill="currentColor" />
            ) : (
              <Play className="w-8 h-8 md:ml-1" fill="currentColor" />
            )}
          </button>
          
          {/* Progress ring around the button */}
          <svg className="absolute -inset-2 w-[calc(100%+16px)] h-[calc(100%+16px)] -rotate-90 pointer-events-none">
            <circle
              cx="50%"
              cy="50%"
              r="48%"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-aura-border/20"
            />
            <circle
              cx="50%"
              cy="50%"
              r="48%"
              fill="none"
              stroke={accentColor}
              strokeWidth="2"
              strokeDasharray="100 100"
              strokeDashoffset={100 - progress}
              strokeLinecap="round"
              className="transition-all duration-300 ease-linear shadow-[0_0_10px_rgba(var(--color-aura-accent),0.5)]"
            />
          </svg>
        </div>

        <div className="flex-grow min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-aura-accent animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-aura-muted">{subtitle}</span>
          </div>
          <h4 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-2 truncate group-hover:text-aura-accent transition-colors">
            {title}
          </h4>
          <div className="flex items-center gap-4">
             <button 
               onClick={toggleMute}
               className="text-aura-muted hover:text-white transition-colors p-1"
             >
               {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
             </button>
             <div className="h-[2px] flex-grow bg-aura-border/30 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-aura-accent/40"
                />
             </div>
          </div>
        </div>

        <div className="hidden md:flex shrink-0 w-12 h-12 items-center justify-center rounded-xl bg-white/5 border border-white/10 opacity-20 group-hover:opacity-100 transition-opacity">
          <Music className={`w-5 h-5 text-aura-accent ${isPlaying ? 'animate-bounce' : ''}`} />
        </div>

        <audio 
          ref={audioRef}
          src={url}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => {
            setIsPlaying(false);
            setProgress(0);
          }}
          onWaiting={() => setIsLoading(true)}
          onPlaying={() => setIsLoading(false)}
          onError={(e) => {
            console.error("Audio Load Error:", e);
            setIsLoading(false);
          }}
        />
      </div>
      
      {/* Background glow animation */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-aura-accent blur-[40px] pointer-events-none"
          />
        )}
      </AnimatePresence>
    </div>
  );
};
