import React from 'react';
import { motion } from 'framer-motion';

export default function Footer({ variant = 'dark' }) {
  const isDark = variant === 'dark';
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className={`mt-32 pt-12 border-t ${isDark ? 'border-white/10' : 'border-black/10'} flex flex-col md:flex-row justify-between items-center gap-6`}
    >
      <p className={`${isDark ? 'text-white' : 'text-black'} text-xl font-bold tracking-[-0.02em]`}
         style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        NEO PROJECTIONS
      </p>
      <p className={`${isDark ? 'text-white/30' : 'text-black/30'} text-xs tracking-[0.2em]`}>
        © {new Date().getFullYear()} ALL RIGHTS RESERVED
      </p>
    </motion.div>
  );
}

