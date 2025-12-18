
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
import Assistant from './components/Assistant';

const App: React.FC = () => {
  return (
    <div className="font-inter min-h-screen text-slate-100 bg-[#0b0f1a] relative">
      
      {/* Background Layer: Particles */}
      <SnowEffect />
      
      {/* Subtle overlay for better text contrast */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-900/10 via-transparent to-[#0b0f1a]/80"></div>
      
      {/* Content Layer */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Hero />
          <Features />
          <KeyboardSection />
          <DemoSection />
          <HowItWorks />
          <Pricing />
        </main>
        <Footer />
        
        {/* AI Assistant */}
        <Assistant />
      </div>
    </div>
  );
};

export default App;
