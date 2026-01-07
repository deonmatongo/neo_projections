import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowRight, Clock, Camera } from 'lucide-react';

export default function ServiceCard({ service, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={{ y: -10 }}
      className="group"
    >
      <motion.div 
        className="relative overflow-hidden aspect-[4/5] mb-4 sm:mb-6"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.6 }}
      >
        <motion.img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover transition-all duration-700"
          whileHover={{ scale: 1.15 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        />
        
        {/* Overlay info */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8"
          initial={{ y: "100%" }}
          whileHover={{ y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-3 sm:gap-4 text-white/60 text-[10px] sm:text-xs mb-3">
            <motion.div 
              className="flex items-center gap-1.5 sm:gap-2"
              initial={{ opacity: 0, x: -20 }}
              whileHover={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>{service.duration}</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-1.5 sm:gap-2"
              initial={{ opacity: 0, x: -20 }}
              whileHover={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Camera className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>{service.deliverables}</span>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-start justify-between gap-3 sm:gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 + 0.2 }}
          >
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-1 sm:mb-2"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {service.title}
            </h3>
            <p className="text-black/40 text-[10px] sm:text-xs tracking-[0.2em] uppercase">
              {service.category}
            </p>
          </motion.div>
          <motion.div 
            className="text-right"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 + 0.3, type: "spring" }}
          >
            <p className="text-2xl sm:text-3xl font-bold tracking-tight"
               style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {service.price}
            </p>
            <p className="text-black/40 text-[10px] sm:text-xs mt-1">Starting from</p>
          </motion.div>
        </div>

        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15 + 0.4 }}
          className="text-black/60 leading-relaxed text-sm sm:text-base"
        >
          {service.description}
        </motion.p>

        <ul className="space-y-1.5 sm:space-y-2">
          {service.includes.map((item, idx) => (
            <motion.li 
              key={idx} 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 + 0.5 + idx * 0.05 }}
              className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-black/50"
            >
              <span className="w-1 h-1 rounded-full bg-black/30 mt-1.5 sm:mt-2 flex-shrink-0" />
              {item}
            </motion.li>
          ))}
        </ul>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15 + 0.6 }}
        >
          <Link
            to={createPageUrl('Book') + `?service=${service.value}`}
            className="inline-flex items-center gap-2 sm:gap-3 text-black hover:gap-4 sm:hover:gap-5 transition-all duration-300 text-xs sm:text-sm tracking-[0.2em] uppercase mt-3 sm:mt-4 group/link"
          >
            Book This Service
            <motion.div
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}