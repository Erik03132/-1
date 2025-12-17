import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import KeyboardSection from './components/KeyboardSection';
import DemoSection from './components/DemoSection';
import HowItWorks from './components/HowItWorks';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import SnowEffect from './components/SnowEffect';

const App: React.FC = () => {
  return (
    <div className="font-inter min-h-screen text-slate-100 overflow-x-hidden selection:bg-sky-500/30 selection:text-sky-200 relative">
      
      {/* Background Layer: Particles (z-minus-10 inside SnowEffect component) */}
      <SnowEffect />
      
      {/* Subtle overlay for better text contrast and atmosphere */}
      <div className="fixed top-0 left-0 w-full h-screen z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-900/10 via-[#0b0f1a]/60 to-[#0b0f1a]"></div>
      
      {/* Content Layer: Relative + z-10 to sit on top of background */}
      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <Features />
          <KeyboardSection />
          <DemoSection />
          <HowItWorks />
          <Pricing />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;