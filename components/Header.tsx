import React from 'react';
import { ArrowRight, Cpu } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-white/10 border-b backdrop-blur-xl bg-[#0b0f1a]/80 transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#" className="inline-flex items-center gap-2 hover:scale-105 transition-transform duration-200">
          <div className="bg-gradient-to-br from-sky-500 to-indigo-600 p-1.5 rounded-lg">
            <Cpu className="text-white h-5 w-5" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">Системотех</span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {['Услуги', 'Формат', 'Для кого', 'Контакты'].map((item) => (
            <a 
              key={item} 
              href={`#${item === 'Услуги' ? 'services' : item === 'Формат' ? 'format' : item === 'Для кого' ? 'clients' : 'footer'}`} 
              className="text-white/60 hover:text-white transition-colors duration-200 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-sky-400 after:transition-all after:duration-200 hover:after:w-full"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="#footer" className="hidden sm:inline-block text-white/70 hover:text-white transition-colors duration-200 text-sm font-medium hover:scale-105 transform">
            Связаться
          </a>
          <a href="#services" className="inline-flex items-center gap-2 shadow-sky-500/25 hover:shadow-sky-500/40 hover:from-sky-400 hover:to-indigo-500 transition-all duration-200 hover:scale-105 hover:shadow-xl text-sm font-medium text-neutral-50 bg-gradient-to-r from-sky-500 to-indigo-600 rounded-xl px-4 py-2 shadow-lg group">
            Рассчитать проект
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;