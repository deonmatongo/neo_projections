import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="mt-32 pt-12 border-t border-black/10 dark:border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 px-4 sm:px-6"
    >
      <p className="text-black dark:text-white text-xl font-bold tracking-[-0.02em]"
         style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        NEO PROJECTIONS
      </p>
      <p className="text-black/30 dark:text-white/30 text-xs tracking-[0.2em]">
        © {new Date().getFullYear()} ALL RIGHTS RESERVED
      </p>
    </motion.div>
  );
}

