import React from 'react';
import Hero from '@/components/portfolio/Hero';
import PortfolioGrid from '@/components/portfolio/PortfolioGrid';
import About from '@/components/portfolio/About';
import Contact from '@/components/portfolio/Contact';

export default function Home() {
  return (
    <main className="bg-black">
      <Hero />
      <PortfolioGrid />
      <About />
      <Contact />
    </main>
  );
}