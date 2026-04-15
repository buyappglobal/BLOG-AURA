import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PostMetadata } from '../lib/posts';
import CategoryBadge from './CategoryBadge';

interface FeaturedCarouselProps {
  posts: PostMetadata[];
}

export default function FeaturedCarousel({ posts }: FeaturedCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuredPosts = posts.slice(0, 5); // Show top 5 as featured

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredPosts.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [featuredPosts.length]);

  const next = () => setCurrentIndex((prev) => (prev + 1) % featuredPosts.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + featuredPosts.length) % featuredPosts.length);

  if (featuredPosts.length === 0) return null;

  return (
    <div className="relative h-[500px] md:h-[600px] rounded-[40px] overflow-hidden aura-border bg-aura-card mb-16 group">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img 
            src={featuredPosts[currentIndex].image} 
            alt={featuredPosts[currentIndex].title}
            className="w-full h-full object-cover opacity-60 scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-aura-bg via-aura-bg/20 to-transparent" />
          
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="max-w-3xl"
            >
              <CategoryBadge category={featuredPosts[currentIndex].category} size="md" className="mb-6" />
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 leading-[1.1] text-white">
                <Link to={`/${featuredPosts[currentIndex].slug}`} className="hover:text-aura-accent transition-colors">
                  {featuredPosts[currentIndex].title}
                </Link>
              </h2>
              <p className="text-aura-muted text-lg md:text-xl line-clamp-2 mb-8 max-w-2xl">
                {featuredPosts[currentIndex].description}
              </p>
              <div className="flex items-center gap-6 font-mono text-xs text-aura-muted uppercase tracking-widest">
                <span>{featuredPosts[currentIndex].author}</span>
                <div className="w-1 h-1 bg-aura-border rounded-full" />
                <span>{featuredPosts[currentIndex].date}</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="absolute bottom-8 right-8 flex gap-3 z-20">
        <button 
          onClick={prev}
          className="p-4 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-aura-accent hover:border-aura-accent transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={next}
          className="p-4 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-aura-accent hover:border-aura-accent transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-8 left-8 flex gap-2 z-20">
        {featuredPosts.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-1 transition-all duration-500 rounded-full ${
              i === currentIndex ? "w-12 bg-aura-accent" : "w-4 bg-white/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
