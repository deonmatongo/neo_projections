import React from 'react';
import { motion } from 'framer-motion';
import { photos } from '@/utils/images';

export default function About() {
  return (
    <section className="bg-black py-16 sm:py-24 md:py-32 px-4 sm:px-6" id="about">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <img
                src={photos.photo_0027}
                alt="Photographer"
                className="w-full grayscale"
              />
              <div className="absolute inset-0 border border-white/20 -translate-x-4 -translate-y-4" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-white/40 tracking-[0.3em] sm:tracking-[0.4em] uppercase text-[10px] sm:text-xs mb-4 sm:mb-6">About</p>
            <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] mb-6 sm:mb-8"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              THE VISION
            </h2>
            
            <div className="space-y-4 sm:space-y-6 text-white/60 leading-relaxed text-sm sm:text-base">
              <p>
                Neo Projections is a contemporary photography studio dedicated to capturing 
                the essence of light and shadow. Founded on the principle that photography 
                is an art form, not just documentation.
              </p>
              <p>
                Every frame is meticulously crafted to tell a story—bold, intimate, 
                and unapologetically artistic. Specializing in portrait, fashion, 
                and editorial photography.
              </p>
            </div>

            <div className="mt-8 sm:mt-10 md:mt-12 grid grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {[
                { number: '10+', label: 'Years' },
                { number: '500+', label: 'Projects' },
                { number: '50+', label: 'Awards' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                >
                  <p className="text-white text-2xl sm:text-3xl font-bold tracking-tight"
                     style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {stat.number}
                  </p>
                  <p className="text-white/40 text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase mt-1 sm:mt-2">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}