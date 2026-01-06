import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { photos } from '@/utils/images';

const portfolioImages = [
  {
    id: 1,
    src: photos.photo_0001,
    title: "INTIMATE PORTRAIT",
    category: "portrait"
  },
  {
    id: 2,
    src: photos.photo_0002,
    title: "HAUTE COUTURE",
    category: "fashion"
  },
  {
    id: 3,
    src: photos.photo_0003,
    title: "SHADOW STUDY",
    category: "portrait"
  },
  {
    id: 4,
    src: photos.photo_0004,
    title: "ELEGANCE",
    category: "editorial"
  },
  {
    id: 5,
    src: photos.photo_0005,
    title: "NOIR SERIES",
    category: "editorial"
  },
  {
    id: 6,
    src: photos.photo_0006,
    title: "URBAN SOUL",
    category: "portrait"
  },
  {
    id: 7,
    src: photos.photo_0007,
    title: "RUNWAY",
    category: "fashion"
  },
  {
    id: 8,
    src: photos.photo_0008,
    title: "STREET STYLE",
    category: "fashion"
  },
  {
    id: 9,
    src: photos.photo_0009,
    title: "COMMERCIAL APPEAL",
    category: "commercial"
  },
  {
    id: 10,
    src: photos.photo_0010,
    title: "BRAND IDENTITY",
    category: "commercial"
  },
  {
    id: 11,
    src: photos.photo_0011,
    title: "GALA NIGHT",
    category: "event"
  },
  {
    id: 12,
    src: photos.photo_0012,
    title: "CELEBRATION",
    category: "event"
  },
  {
    id: 13,
    src: photos.photo_0013,
    title: "ESSENCE",
    category: "portrait"
  },
  {
    id: 14,
    src: photos.photo_0014,
    title: "VOGUE",
    category: "fashion"
  },
  {
    id: 15,
    src: photos.photo_0015,
    title: "NARRATIVE",
    category: "editorial"
  },
  {
    id: 16,
    src: photos.photo_0025,
    title: "TIMELESS",
    category: "portrait"
  },
  {
    id: 17,
    src: photos.photo_0026,
    title: "MOTION",
    category: "fashion"
  },
  {
    id: 18,
    src: photos.photo_0029,
    title: "PRODUCT VISION",
    category: "commercial"
  }
];

export default function PortfolioGrid() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState('all');

  const filteredImages = filter === 'all' 
    ? portfolioImages 
    : portfolioImages.filter(img => img.category === filter);

  const categories = [
    { value: 'all', label: 'All Works', count: portfolioImages.length },
    { value: 'portrait', label: 'Portrait', count: portfolioImages.filter(img => img.category === 'portrait').length },
    { value: 'fashion', label: 'Fashion', count: portfolioImages.filter(img => img.category === 'fashion').length },
    { value: 'editorial', label: 'Editorial', count: portfolioImages.filter(img => img.category === 'editorial').length },
    { value: 'commercial', label: 'Commercial', count: portfolioImages.filter(img => img.category === 'commercial').length },
    { value: 'event', label: 'Event', count: portfolioImages.filter(img => img.category === 'event').length }
  ];

  return (
    <section className="bg-white py-32 px-6" id="portfolio">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <p className="text-black/40 tracking-[0.3em] sm:tracking-[0.4em] uppercase text-[10px] sm:text-xs mb-3 sm:mb-4 px-4">Selected Works</p>
          <h2 className="text-black text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.03em] px-4"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            PORTFOLIO
          </h2>
        </motion.div>

        {/* Enhanced Filter */}
        <div className="mb-12 sm:mb-16">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-6 px-4">
            {categories.map((cat) => (
              <motion.button
                key={cat.value}
                onClick={() => setFilter(cat.value)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`group relative px-4 sm:px-6 py-2 sm:py-3 transition-all duration-500 ${
                  filter === cat.value 
                    ? 'text-white' 
                    : 'text-black/50 hover:text-black/80'
                }`}
              >
                {/* Background */}
                <motion.div
                  className="absolute inset-0 bg-black"
                  initial={false}
                  animate={{
                    scaleX: filter === cat.value ? 1 : 0,
                    opacity: filter === cat.value ? 1 : 0
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  style={{ originX: 0 }}
                />
                
                {/* Hover background */}
                <div className={`absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  filter === cat.value ? 'hidden' : ''
                }`} />
                
                {/* Content */}
                <span className="relative flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] uppercase font-medium">
                  {cat.label}
                  <span className={`text-[9px] sm:text-[10px] transition-colors duration-300 ${
                    filter === cat.value ? 'text-white/60' : 'text-black/30'
                  }`}>
                    ({cat.count})
                  </span>
                </span>
              </motion.button>
            ))}
          </div>
          
          {/* Active filter indicator */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-6 sm:mt-8 px-4"
          >
            <p className="text-black/30 text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em]">
              SHOWING {filteredImages.length} {filteredImages.length === 1 ? 'IMAGE' : 'IMAGES'}
            </p>
          </motion.div>
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          >
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.05,
                  ease: "easeOut"
                }}
                className={`group relative overflow-hidden cursor-pointer ${
                  (index === 0 || index === 7 || index === 13) && filteredImages.length > 6
                    ? 'sm:col-span-2 sm:row-span-2' 
                    : ''
                }`}
                onClick={() => setSelectedImage(image)}
              >
                {/* Image container */}
                <div className="aspect-square overflow-hidden bg-black/5">
                  <motion.img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover grayscale"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                </div>
                
                {/* Overlay */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end p-4 sm:p-6"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <div>
                    <motion.p 
                      className="text-white/50 text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-1 sm:mb-2"
                      initial={{ y: 20, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {image.category}
                    </motion.p>
                    <motion.p 
                      className="text-white text-base sm:text-lg md:text-xl font-medium tracking-wide"
                      initial={{ y: 20, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.05 }}
                    >
                      {image.title}
                    </motion.p>
                  </div>
                </motion.div>

                {/* Subtle corner accent */}
                <div className="absolute top-4 right-4 w-12 h-12 border-t border-r border-white/0 group-hover:border-white/30 transition-all duration-500" />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {filteredImages.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-black/30 text-sm tracking-[0.2em] uppercase">
              No images found in this category
            </p>
          </motion.div>
        )}
      </div>

      {/* Enhanced Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/98 z-50 flex items-center justify-center"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close button */}
            <motion.button 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute top-4 right-4 sm:top-8 sm:right-8 text-white/40 hover:text-white transition-colors z-10 p-2"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6 sm:w-7 sm:h-7" />
            </motion.button>

            {/* Image */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative max-h-[70vh] sm:max-h-[80vh] max-w-[90vw] sm:max-w-[85vw] mx-auto px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="max-h-[70vh] sm:max-h-[80vh] max-w-full object-contain"
              />
              
              {/* Image info overlay */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute -bottom-16 sm:-bottom-20 left-0 right-0 text-center px-4"
              >
                <div className="inline-block bg-white/5 backdrop-blur-sm px-4 sm:px-8 py-3 sm:py-4 rounded-lg border border-white/10">
                  <p className="text-white/40 text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-1 sm:mb-2">
                    {selectedImage.category}
                  </p>
                  <p className="text-white text-base sm:text-xl font-medium tracking-wide">
                    {selectedImage.title}
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Decorative corners */}
            <div className="absolute top-4 left-4 sm:top-8 sm:left-8 w-12 h-12 sm:w-16 sm:h-16 border-t border-l border-white/10" />
            <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 w-12 h-12 sm:w-16 sm:h-16 border-b border-r border-white/10" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}