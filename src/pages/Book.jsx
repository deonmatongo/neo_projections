import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft } from 'lucide-react';
import BookingForm from '@/components/booking/BookingForm';
import Footer from '@/components/Footer';

export default function Book() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link 
            to={createPageUrl('Home')}
            className="flex items-center gap-3 text-black/60 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-xs tracking-[0.2em] uppercase">Back</span>
          </Link>
          
          <Link 
            to={createPageUrl('Home')}
            className="text-xl font-bold tracking-[-0.02em] text-black"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            NEO PROJECTIONS
          </Link>
          
          <div className="w-20" />
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-12 sm:mb-16"
          >
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-black/40 tracking-[0.3em] sm:tracking-[0.4em] uppercase text-[10px] sm:text-xs mb-3 sm:mb-4"
            >
              Book a Session
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-black text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] mb-4 sm:mb-6 leading-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              SCHEDULE YOUR<br />SHOOT
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-black/50 max-w-md mx-auto text-sm sm:text-base px-4"
            >
              Select your preferred service, date, and time. 
              We'll send you a confirmation email with all the details.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white"
          >
            <BookingForm />
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Footer variant="light" />
        </div>
      </footer>
    </div>
  );
}