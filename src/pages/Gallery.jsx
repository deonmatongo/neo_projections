import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { photos } from '@/utils/images';
import Footer from '@/components/Footer';

const galleryImages = [
  { id: 1, src: photos.photo_0007, category: 'portrait', title: 'Modern Portrait' },
  { id: 2, src: photos.photo_0008, category: 'portrait', title: 'Studio Session' },
  { id: 3, src: photos.photo_0009, category: 'fashion', title: 'Fashion Editorial' },
  { id: 4, src: photos.photo_0010, category: 'fashion', title: 'High Fashion' },
  { id: 5, src: photos.photo_0011, category: 'commercial', title: 'Product Photography' },
  { id: 6, src: photos.photo_0012, category: 'commercial', title: 'Brand Campaign' },
  { id: 7, src: photos.photo_0013, category: 'portrait', title: 'Creative Portrait' },
  { id: 8, src: photos.photo_0015, category: 'fashion', title: 'Street Fashion' },
  { id: 9, src: photos.photo_0016, category: 'event', title: 'Event Coverage' },
  { id: 10, src: photos.photo_0017, category: 'commercial', title: 'Commercial Shoot' },
  { id: 11, src: photos.photo_0018, category: 'portrait', title: 'Expressive Portrait' },
  { id: 12, src: photos.photo_0019, category: 'fashion', title: 'Fashion Outdoor' },
  { id: 13, src: photos.photo_0020, category: 'event', title: 'Live Event' },
  { id: 14, src: photos.photo_0021, category: 'commercial', title: 'Studio Commercial' },
  { id: 15, src: photos.photo_0022, category: 'portrait', title: 'Natural Light' },
];

const categories = [
  { id: 'all', label: 'All Work' },
  { id: 'portrait', label: 'Portrait' },
  { id: 'fashion', label: 'Fashion' },
  { id: 'commercial', label: 'Commercial' },
  { id: 'event', label: 'Event' },
];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const handlePrevious = () => {
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const previousIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
    setSelectedImage(filteredImages[previousIndex]);
  };

  const handleNext = () => {
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const nextIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
    setSelectedImage(filteredImages[nextIndex]);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-white/40 tracking-[0.3em] sm:tracking-[0.4em] uppercase text-[10px] sm:text-xs mb-4 sm:mb-6"
            >
              Our Work
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-[-0.03em] mb-6 sm:mb-8"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              GALLERY
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-white/60 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg leading-relaxed px-4"
            >
              A curated collection of our finest work across portrait, fashion, commercial, and event photography.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="pb-8 sm:pb-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-2 sm:gap-4"
          >
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm tracking-[0.2em] uppercase transition-all ${
                  selectedCategory === category.id
                    ? 'bg-white text-black'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {category.label}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            >
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  className="relative aspect-[3/4] overflow-hidden cursor-pointer group"
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover transition-all duration-500"
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4 sm:p-6"
                  >
                    <div>
                      <p className="text-white font-bold text-sm sm:text-base mb-1">{image.title}</p>
                      <p className="text-white/60 text-xs tracking-[0.2em] uppercase">{image.category}</p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 sm:top-8 sm:right-8 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.button>

            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevious();
              }}
              className="absolute left-4 sm:left-8 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.button>

            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 sm:right-8 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.button>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="max-w-6xl max-h-[90vh] w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-full h-full object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 sm:p-8">
                <h3 className="text-white text-xl sm:text-2xl font-bold mb-2"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {selectedImage.title}
                </h3>
                <p className="text-white/60 text-xs sm:text-sm tracking-[0.2em] uppercase">
                  {selectedImage.category}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-black py-12 sm:py-16">
        <div className="max-w-7xl mx-auto">
          <Footer />
        </div>
      </footer>
    </div>
  );
}