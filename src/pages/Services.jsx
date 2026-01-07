import React from 'react';
import { motion } from 'framer-motion';
import ServiceCard from '@/components/services/ServiceCard';
import { photos } from '@/utils/images';
import Footer from '@/components/Footer';

const services = [
  {
    value: 'portrait',
    title: 'Portrait Session',
    category: 'Personal Photography',
    price: '1,400 zł',
    duration: '2 hours',
    deliverables: '30+ images',
    image: photos.photo_0002,
    description: 'Intimate and expressive portrait sessions designed to capture your unique personality. Perfect for personal branding, headshots, or creative expression.',
    includes: [
      'Pre-session consultation to discuss vision and styling',
      '2-hour shooting session at our studio or location of choice',
      'Professional editing and retouching of all selected images',
      '30+ high-resolution digital images',
      'Online gallery for easy sharing and downloading'
    ]
  },
  {
    value: 'fashion',
    title: 'Fashion Shoot',
    category: 'Fashion & Editorial',
    price: '3,000 zł',
    duration: '4 hours',
    deliverables: '50+ images',
    image: photos.photo_0003,
    description: 'High-fashion photography for designers, models, and brands. Conceptual styling and dynamic compositions that make a statement.',
    includes: [
      'Full creative direction and mood board development',
      '4-hour session with multiple looks and setups',
      'Access to studio lighting and backdrop options',
      '50+ professionally edited images',
      'Collaboration with our network of stylists and makeup artists (additional fee)',
      'Usage rights for portfolio and social media'
    ]
  },
  {
    value: 'editorial',
    title: 'Editorial Photography',
    category: 'Magazine & Publications',
    price: '4,800 zł',
    duration: '6 hours',
    deliverables: '75+ images',
    image: photos.photo_0004,
    description: 'Narrative-driven photography for magazines, publications, and storytelling projects. Conceptual artistry meets technical precision.',
    includes: [
      'Full concept development and storyboarding',
      'Location scouting and art direction',
      '6-hour production with multiple setups',
      '75+ curated and edited images',
      'Print-ready files optimized for publication',
      'Creative consultation throughout the project',
      'Full commercial usage rights'
    ]
  },
  {
    value: 'commercial',
    title: 'Commercial Photography',
    category: 'Brand & Advertising',
    price: '10,000 zł',
    duration: 'Full day',
    deliverables: '100+ images',
    image: photos.photo_0005,
    description: 'Professional commercial photography for brands, products, and advertising campaigns. Tailored solutions for your business needs.',
    includes: [
      'Comprehensive pre-production planning and strategy',
      'Full-day shoot with multiple concepts and setups',
      'Professional lighting and equipment',
      '100+ fully edited deliverables',
      'Brand-aligned color grading and post-production',
      'Expedited delivery within 5 business days',
      'Full commercial and advertising usage rights',
      'Option for video content capture'
    ]
  },
  {
    value: 'event',
    title: 'Event Coverage',
    category: 'Events & Occasions',
    price: '7,200 zł',
    duration: '8 hours',
    deliverables: '200+ images',
    image: photos.photo_0006,
    description: 'Comprehensive event documentation with an artistic eye. From corporate events to private celebrations, we capture every meaningful moment.',
    includes: [
      'Pre-event consultation and shot list planning',
      'Up to 8 hours of continuous coverage',
      'Candid and posed photography',
      '200+ professionally edited images',
      'Online gallery delivery within 7 days',
      'Print release for personal use',
      'Second photographer available (additional fee)',
      'Same-day preview gallery option'
    ]
  }
];

export default function Services() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-white/40 tracking-[0.3em] sm:tracking-[0.4em] uppercase text-[10px] sm:text-xs mb-4 sm:mb-6"
            >
              What We Offer
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-[-0.03em] mb-6 sm:mb-8"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              SERVICES
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-white/60 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg leading-relaxed px-4"
            >
              Each service is crafted to deliver exceptional results, 
              combining technical expertise with artistic vision.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 xl:gap-20">
            {services.map((service, index) => (
              <ServiceCard key={service.value} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] mb-4 sm:mb-6"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              CUSTOM PACKAGES AVAILABLE
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-white/60 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base px-4"
            >
              Need something unique? We create bespoke photography packages 
              tailored to your specific requirements and vision.
            </motion.p>
            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-white text-black px-8 sm:px-12 py-4 sm:py-5 text-xs sm:text-sm tracking-[0.3em] uppercase hover:bg-white/90 transition-colors shadow-lg"
            >
              Discuss Your Project
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 border-t border-black/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {[
              { label: 'Professional Quality', value: '100%' },
              { label: 'Client Satisfaction', value: '5.0★' },
              { label: 'Turnaround Time', value: '5-7 Days' },
              { label: 'Revisions Included', value: '2 Rounds' }
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center"
              >
                <motion.p 
                  className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-1 sm:mb-2"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  {item.value}
                </motion.p>
                <p className="text-black/40 text-[10px] sm:text-xs tracking-[0.2em] uppercase">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Footer variant="light" />
        </div>
      </footer>
    </div>
  );
}