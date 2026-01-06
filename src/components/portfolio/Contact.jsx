import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Instagram, ArrowUpRight } from 'lucide-react';

export default function Contact() {
  return (
    <section className="bg-black py-32 px-6" id="contact">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-white/40 tracking-[0.4em] uppercase text-xs mb-6">Get in Touch</p>
            <h2 className="text-white text-4xl md:text-5xl font-bold tracking-[-0.03em] mb-8"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              LET'S CREATE<br />TOGETHER
            </h2>
            
            <div className="space-y-6">
              <a href="mailto:hello@neoprojections.com" 
                 className="flex items-center gap-4 text-white/60 hover:text-white transition-colors group">
                <Mail className="w-5 h-5" />
                <span className="tracking-wide">hello@neoprojections.com</span>
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              
              <a href="tel:+15551234567" 
                 className="flex items-center gap-4 text-white/60 hover:text-white transition-colors group">
                <Phone className="w-5 h-5" />
                <span className="tracking-wide">+1 (555) 123-4567</span>
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              
              <div className="flex items-center gap-4 text-white/60">
                <MapPin className="w-5 h-5" />
                <span className="tracking-wide">New York, NY</span>
              </div>
            </div>

            <div className="mt-12 flex gap-6">
              <a href="https://instagram.com" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-xs tracking-[0.2em] uppercase">
                <Instagram className="w-4 h-4" />
                Instagram
              </a>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-32 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <p className="text-white text-xl font-bold tracking-[-0.02em]"
             style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            NEO PROJECTIONS
          </p>
          <p className="text-white/30 text-xs tracking-[0.2em]">
            © {new Date().getFullYear()} ALL RIGHTS RESERVED
          </p>
        </motion.div>
      </div>
    </section>
  );
}