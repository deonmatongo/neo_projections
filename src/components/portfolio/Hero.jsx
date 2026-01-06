import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { photos } from '@/utils/images';

const heroImages = [
  photos.photo_0021,
  photos.photo_0022,
  photos.photo_0023,
  photos.photo_0024
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState({});

  // Preload all hero images for better quality
  useEffect(() => {
    heroImages.forEach((imgSrc, index) => {
      const img = new Image();
      img.src = imgSrc;
      img.onload = () => {
        setImagesLoaded(prev => ({ ...prev, [index]: true }));
      };
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen bg-black flex flex-col justify-center items-center relative px-6 overflow-hidden">
      {/* Carousel Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={heroImages[currentIndex]}
            alt={`Hero image ${currentIndex + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ 
              imageRendering: 'auto',
              WebkitImageRendering: 'optimizeQuality',
              imageRendering: '-webkit-optimize-contrast',
              backfaceVisibility: 'hidden',
              transform: 'translateZ(0)'
            }}
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 bg-black/60" />
        </motion.div>
      </AnimatePresence>

      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-5 z-[1]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }} />
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="text-center z-10 relative"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-white/40 tracking-[0.3em] sm:tracking-[0.4em] uppercase text-[10px] sm:text-xs mb-6 sm:mb-8"
        >
          Photography Studio
        </motion.p>
        
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-white text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-[-0.04em] leading-[0.85] px-4"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          NEO
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/60">
            PROJECTIONS
          </span>
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="w-16 sm:w-20 md:w-24 h-[1px] bg-white/30 mx-auto mt-8 sm:mt-10 md:mt-12"
        />
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="text-white/50 mt-6 sm:mt-8 tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[9px] sm:text-[10px] px-4"
        >
          Capturing moments in light & shadow
        </motion.p>
      </motion.div>
      
      {/* Carousel indicators */}
      <div className="absolute bottom-24 z-10 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-white w-8' : 'bg-white/30'
            }`}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown className="w-5 h-5 text-white/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}