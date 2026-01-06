
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Settings, Globe } from 'lucide-react';

export default function Layout({ children, currentPageName }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [language, setLanguage] = useState('pl');
  const [showLangMenu, setShowLangMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Authentication removed - base44 dependency removed
  }, []);

  // Don't show layout nav on Book, Services, Gallery, and Admin pages
  if (currentPageName === 'Book' || currentPageName === 'Services' || currentPageName === 'Gallery' || currentPageName === 'Admin') {
    return (
      <div>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
          
          * {
            font-family: 'Space Grotesk', sans-serif;
          }
          
          html {
            scroll-behavior: smooth;
          }
          
          ::-webkit-scrollbar {
            width: 6px;
          }
          
          ::-webkit-scrollbar-track {
            background: #000;
          }
          
          ::-webkit-scrollbar-thumb {
            background: #333;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: #555;
          }
        `}</style>
        
        {/* Simplified Navigation for Services and Book pages */}
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md"
        >
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
            <Link 
              to={createPageUrl('Home')}
              className="text-white text-lg sm:text-xl font-bold tracking-[-0.02em]"
            >
              NEO
            </Link>

            <div className="hidden md:flex items-center gap-6 lg:gap-8 xl:gap-12">
              <Link to={createPageUrl('Home')} className="text-white/60 hover:text-white text-[10px] lg:text-xs tracking-[0.15em] lg:tracking-[0.2em] uppercase transition-colors whitespace-nowrap">
                {language === 'pl' ? 'Strona Główna' : 'Home'}
              </Link>
              <Link to={createPageUrl('Services')} className="text-white/60 hover:text-white text-[10px] lg:text-xs tracking-[0.15em] lg:tracking-[0.2em] uppercase transition-colors whitespace-nowrap">
                {language === 'pl' ? 'Usługi' : 'Services'}
              </Link>
              <Link to={createPageUrl('Gallery')} className="text-white/60 hover:text-white text-[10px] lg:text-xs tracking-[0.15em] lg:tracking-[0.2em] uppercase transition-colors whitespace-nowrap">
                {language === 'pl' ? 'Galeria' : 'Gallery'}
              </Link>
              <Link 
                to={createPageUrl('Book')}
                className="text-black bg-white px-4 lg:px-6 py-2 lg:py-3 text-[10px] lg:text-xs tracking-[0.15em] lg:tracking-[0.2em] uppercase hover:bg-white/90 transition-colors whitespace-nowrap"
              >
                {language === 'pl' ? 'Zarezerwuj' : 'Book Now'}
              </Link>
              {user?.role === 'admin' && (
                <Link
                  to={createPageUrl('Admin')}
                  className="flex items-center gap-1.5 lg:gap-2 text-white/60 hover:text-white text-[10px] lg:text-xs tracking-[0.15em] lg:tracking-[0.2em] uppercase transition-colors group whitespace-nowrap"
                >
                  <Settings className="w-3.5 h-3.5 lg:w-4 lg:h-4 group-hover:rotate-90 transition-transform duration-300" />
                  Admin
                </Link>
              )}
              <div className="relative">
                <button
                  onClick={() => setShowLangMenu(!showLangMenu)}
                  className="flex items-center gap-1.5 lg:gap-2 text-white/60 hover:text-white text-[10px] lg:text-xs tracking-[0.15em] lg:tracking-[0.2em] uppercase transition-colors whitespace-nowrap"
                >
                  <Globe className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                  {language.toUpperCase()}
                </button>
                {showLangMenu && (
                  <div className="absolute right-0 top-full mt-2 bg-black/90 backdrop-blur-md border border-white/10 rounded-lg overflow-hidden min-w-[100px]">
                    <button
                      onClick={() => { setLanguage('en'); setShowLangMenu(false); }}
                      className={`block w-full px-4 lg:px-6 py-2.5 lg:py-3 text-left text-[10px] lg:text-xs tracking-[0.15em] lg:tracking-[0.2em] uppercase transition-colors ${language === 'en' ? 'text-white bg-white/10' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
                    >
                      EN
                    </button>
                    <button
                      onClick={() => { setLanguage('pl'); setShowLangMenu(false); }}
                      className={`block w-full px-4 lg:px-6 py-2.5 lg:py-3 text-left text-[10px] lg:text-xs tracking-[0.15em] lg:tracking-[0.2em] uppercase transition-colors ${language === 'pl' ? 'text-white bg-white/10' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
                    >
                      PL
                    </button>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white p-2"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </nav>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden bg-black border-t border-white/10"
              >
                <div className="px-6 py-8 space-y-6">
                  <Link 
                    to={createPageUrl('Home')}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-white/60 hover:text-white text-sm tracking-[0.2em] uppercase transition-colors"
                  >
                    Home
                  </Link>
                  <Link 
                    to={createPageUrl('Services')}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-white/60 hover:text-white text-sm tracking-[0.2em] uppercase transition-colors"
                  >
                    Services
                  </Link>
                  <Link 
                    to={createPageUrl('Gallery')}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-white/60 hover:text-white text-sm tracking-[0.2em] uppercase transition-colors"
                  >
                    Gallery
                  </Link>
                  <Link 
                    to={createPageUrl('Book')}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-center text-black bg-white px-6 py-4 text-sm tracking-[0.2em] uppercase hover:bg-white/90 transition-colors"
                  >
                    Book Now
                  </Link>
                  {user?.role === 'admin' && (
                    <Link 
                      to={createPageUrl('Admin')}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-center gap-2 text-white/60 hover:text-white text-sm tracking-[0.2em] uppercase transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      Admin Dashboard
                    </Link>
                  )}
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-white/40 text-xs tracking-[0.2em] uppercase mb-3">{language === 'pl' ? 'Język' : 'Language'}</p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => { setLanguage('en'); setIsMenuOpen(false); }}
                        className={`flex-1 px-4 py-2 text-xs tracking-[0.2em] uppercase transition-colors ${language === 'en' ? 'bg-white text-black' : 'bg-white/10 text-white hover:bg-white/20'}`}
                      >
                        EN
                      </button>
                      <button
                        onClick={() => { setLanguage('pl'); setIsMenuOpen(false); }}
                        className={`flex-1 px-4 py-2 text-xs tracking-[0.2em] uppercase transition-colors ${language === 'pl' ? 'bg-white text-black' : 'bg-white/10 text-white hover:bg-white/20'}`}
                      >
                        PL
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>
        
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        
        * {
          font-family: 'Space Grotesk', sans-serif;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        ::-webkit-scrollbar {
          width: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: #000;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #333;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>

      {/* Navigation */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-black/90 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <Link 
            to={createPageUrl('Home')}
            className="text-white text-lg sm:text-xl font-bold tracking-[-0.02em]"
          >
            NEO
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 xl:gap-12">
            {currentPageName === 'Home' ? (
              <>
                <a href="#portfolio" className="text-white/60 hover:text-white text-[10px] lg:text-xs tracking-[0.15em] lg:tracking-[0.2em] uppercase transition-colors whitespace-nowrap">
                  Portfolio
                </a>
                <a href="#about" className="text-white/60 hover:text-white text-[10px] lg:text-xs tracking-[0.15em] lg:tracking-[0.2em] uppercase transition-colors whitespace-nowrap">
                  {language === 'pl' ? 'O Nas' : 'About'}
                </a>
              </>
            ) : (
              <>
                <Link to={createPageUrl('Home')} className="text-white/60 hover:text-white text-[10px] lg:text-xs tracking-[0.15em] lg:tracking-[0.2em] uppercase transition-colors whitespace-nowrap">
                  {language === 'pl' ? 'Strona Główna' : 'Home'}
                </Link>
              </>
            )}
            <Link 
              to={createPageUrl('Services')}
              className="text-white/60 hover:text-white text-[10px] lg:text-xs tracking-[0.15em] lg:tracking-[0.2em] uppercase transition-colors whitespace-nowrap"
            >
              {language === 'pl' ? 'Usługi' : 'Services'}
            </Link>
            <Link 
              to={createPageUrl('Gallery')}
              className="text-white/60 hover:text-white text-[10px] lg:text-xs tracking-[0.15em] lg:tracking-[0.2em] uppercase transition-colors whitespace-nowrap"
            >
              {language === 'pl' ? 'Galeria' : 'Gallery'}
            </Link>
            {currentPageName === 'Home' && (
              <a href="#contact" className="text-white/60 hover:text-white text-[10px] lg:text-xs tracking-[0.15em] lg:tracking-[0.2em] uppercase transition-colors whitespace-nowrap">
                {language === 'pl' ? 'Kontakt' : 'Contact'}
              </a>
            )}
            <Link 
              to={createPageUrl('Book')}
              className="text-black bg-white px-4 lg:px-6 py-2 lg:py-3 text-[10px] lg:text-xs tracking-[0.15em] lg:tracking-[0.2em] uppercase hover:bg-white/90 transition-colors whitespace-nowrap"
            >
              {language === 'pl' ? 'Zarezerwuj' : 'Book Now'}
            </Link>
            {user?.role === 'admin' && (
              <Link
                to={createPageUrl('Admin')}
                className="flex items-center gap-1.5 lg:gap-2 text-white/60 hover:text-white text-[10px] lg:text-xs tracking-[0.15em] lg:tracking-[0.2em] uppercase transition-colors group whitespace-nowrap"
              >
                <Settings className="w-3.5 h-3.5 lg:w-4 lg:h-4 group-hover:rotate-90 transition-transform duration-300" />
                Admin
              </Link>
            )}
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center gap-1.5 lg:gap-2 text-white/60 hover:text-white text-[10px] lg:text-xs tracking-[0.15em] lg:tracking-[0.2em] uppercase transition-colors whitespace-nowrap"
              >
                <Globe className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                {language.toUpperCase()}
              </button>
              {showLangMenu && (
                <div className="absolute right-0 top-full mt-2 bg-black/90 backdrop-blur-md border border-white/10 rounded-lg overflow-hidden z-50 min-w-[100px]">
                  <button
                    onClick={() => { setLanguage('en'); setShowLangMenu(false); }}
                    className={`block w-full px-4 lg:px-6 py-2.5 lg:py-3 text-left text-[10px] lg:text-xs tracking-[0.15em] lg:tracking-[0.2em] uppercase transition-colors ${language === 'en' ? 'text-white bg-white/10' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => { setLanguage('pl'); setShowLangMenu(false); }}
                    className={`block w-full px-4 lg:px-6 py-2.5 lg:py-3 text-left text-[10px] lg:text-xs tracking-[0.15em] lg:tracking-[0.2em] uppercase transition-colors ${language === 'pl' ? 'text-white bg-white/10' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
                  >
                    PL
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-black border-t border-white/10"
            >
              <div className="px-6 py-8 space-y-6">
                {currentPageName === 'Home' ? (
                  <>
                    <a 
                      href="#portfolio" 
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-white/60 hover:text-white text-sm tracking-[0.2em] uppercase transition-colors"
                    >
                      Portfolio
                    </a>
                    <a 
                      href="#about" 
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-white/60 hover:text-white text-sm tracking-[0.2em] uppercase transition-colors"
                    >
                      About
                    </a>
                  </>
                ) : (
                  <Link 
                    to={createPageUrl('Home')}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-white/60 hover:text-white text-sm tracking-[0.2em] uppercase transition-colors"
                  >
                    Home
                  </Link>
                )}
                <Link 
                  to={createPageUrl('Services')}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-white/60 hover:text-white text-sm tracking-[0.2em] uppercase transition-colors"
                >
                  Services
                </Link>
                <Link 
                  to={createPageUrl('Gallery')}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-white/60 hover:text-white text-sm tracking-[0.2em] uppercase transition-colors"
                >
                  Gallery
                </Link>
                {currentPageName === 'Home' && (
                  <a 
                    href="#contact" 
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-white/60 hover:text-white text-sm tracking-[0.2em] uppercase transition-colors"
                  >
                    Contact
                  </a>
                )}
                <Link 
                  to={createPageUrl('Book')}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-center text-black bg-white px-6 py-4 text-sm tracking-[0.2em] uppercase hover:bg-white/90 transition-colors"
                >
                  Book Now
                </Link>
                {user?.role === 'admin' && (
                  <Link 
                    to={createPageUrl('Admin')}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center gap-2 text-white/60 hover:text-white text-sm tracking-[0.2em] uppercase transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    Admin Dashboard
                  </Link>
                )}
                <div className="pt-4 border-t border-white/10">
                  <p className="text-white/40 text-xs tracking-[0.2em] uppercase mb-3">{language === 'pl' ? 'Język' : 'Language'}</p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => { setLanguage('en'); setIsMenuOpen(false); }}
                      className={`flex-1 px-4 py-2 text-xs tracking-[0.2em] uppercase transition-colors ${language === 'en' ? 'bg-white text-black' : 'bg-white/10 text-white hover:bg-white/20'}`}
                    >
                      EN
                    </button>
                    <button
                      onClick={() => { setLanguage('pl'); setIsMenuOpen(false); }}
                      className={`flex-1 px-4 py-2 text-xs tracking-[0.2em] uppercase transition-colors ${language === 'pl' ? 'bg-white text-black' : 'bg-white/10 text-white hover:bg-white/20'}`}
                    >
                      PL
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {children}
    </div>
  );
}
