import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Hls from 'hls.js';

interface SoundscapePlayerProps {
  streamUrl?: string;
}

export const SoundscapePlayer: React.FC<SoundscapePlayerProps> = ({ 
  streamUrl = "https://a5.asurahosting.com/hls/aura_music_business/live.m3u8"
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);

  useEffect(() => {
    if (audioRef.current && streamUrl.endsWith('.m3u8')) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(streamUrl);
        hls.attachMedia(audioRef.current);
        hlsRef.current = hls;
      } else if (audioRef.current.canPlayType('application/vnd.apple.mpegurl')) {
        // For Safari which supports HLS natively
        audioRef.current.src = streamUrl;
      }
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
    };
  }, [streamUrl]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => console.error("Error playing audio:", err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 p-4 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl w-64"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-400/20 to-amber-600/20 flex items-center justify-center border border-amber-500/30">
                <Music className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <h4 className="text-white font-medium text-sm">Aura Soundscape</h4>
                <p className="text-white/50 text-xs">Live Stream Business</p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4">
              <button
                onClick={togglePlay}
                className="flex-1 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-black font-bold transition-colors flex items-center justify-center gap-2"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isPlaying ? 'Pausa' : 'Escuchar'}
              </button>
              
              <button
                onClick={toggleMute}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
            </div>
            
            <audio 
              ref={audioRef} 
              loop 
              preload="none"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`p-4 rounded-full shadow-2xl transition-all duration-300 flex items-center gap-2 group ${
          isExpanded 
            ? 'bg-white text-black' 
            : 'bg-black text-white border border-white/10 hover:border-amber-500/50'
        }`}
      >
        <div className="relative">
          <Music className={`w-6 h-6 ${isPlaying && !isMuted ? 'animate-pulse text-amber-500' : ''}`} />
          {isPlaying && !isMuted && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
            </span>
          )}
        </div>
        {!isExpanded && (
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap font-medium text-sm">
            Escuchar Aura Soundscape
          </span>
        )}
      </button>
    </div>
  );
};
