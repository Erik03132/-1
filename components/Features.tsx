import React from 'react';
import Reveal from './Reveal';
import { Network, Zap, Briefcase } from 'lucide-react';

const Features: React.FC = () => {
  return (
    <section id="features" className="relative sm:py-28 section-divider pt-20 pb-20 space-y-20">
      <div className="max-w-7xl sm:px-6 lg:px-8 mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <Reveal animation="animate-blur-in">
            <h2 className="text-3xl sm:text-4xl text-white tracking-tighter font-medium">
              Почему нас выбирают подрядчики
            </h2>
          </Reveal>
          <Reveal animation="animate-slide-up" delay="animate-delay-200">
            <p className="mt-4 text-lg text-white/70">
              Помогаем строительным и монтажным компаниям закрывать инженерные задачи без раздувания штата.
            </p>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Reveal animation="animate-blur-in" delay="animate-delay-300">
            <div className="hover:bg-white/8 hover:border-white/20 hover:scale-105 hover:shadow-2xl transition-all duration-500 group hover-lift bg-white/5 border border-white/10 rounded-2xl p-8 h-full">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-sky-500/20 to-sky-600/20 flex items-center justify-center mb-6 group-hover:from-sky-500/40 group-hover:to-sky-600/40 group-hover:scale-110 transition-all duration-300">
                <Network className="h-6 w-6 text-sky-400 group-hover:scale-110 transition-transform duration-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-sky-300 transition-colors duration-300">Удалённый инженерный офис</h3>
              <p className="text-white/70 leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                Мы берём на себя сложную методологию и документацию, вы концентрируетесь на выполнении работ на площадке.
              </p>
            </div>
          </Reveal>

          <Reveal animation="animate-blur-in" delay="animate-delay-400">
            <div className="hover:bg-white/8 hover:border-white/20 hover:scale-105 hover:shadow-2xl transition-all duration-500 group hover-lift bg-white/5 border border-white/10 rounded-2xl p-8 h-full">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-indigo-600/20 flex items-center justify-center mb-6 group-hover:from-indigo-500/40 group-hover:to-indigo-600/40 group-hover:scale-110 transition-all duration-300">
                <Briefcase className="h-6 w-6 text-indigo-400 group-hover:scale-125 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-indigo-300 transition-colors duration-300">Объекты до 100 точек</h3>
              <p className="text-white/70 leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                Специализация на компактных и поэтапных проектах обеспечивает адекватные сроки, фиксируемый объём работ и понятную экономику.
              </p>
            </div>
          </Reveal>

          <Reveal animation="animate-blur-in" delay="animate-delay-500">
            <div className="hover:bg-white/8 hover:border-white/20 hover:scale-105 hover:shadow-2xl transition-all duration-500 group hover-lift bg-white/5 border border-white/10 rounded-2xl p-8 h-full">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center mb-6 group-hover:from-amber-500/40 group-hover:to-amber-600/40 group-hover:scale-110 transition-all duration-300">
                <Zap className="h-6 w-6 text-amber-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-amber-300 transition-colors duration-300">Экспертиза по ГОСТ</h3>
              <p className="text-white/70 leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                Дополнительный плюс в тендерах и при взаимодействии с техническими заказчиками и надзорными органами.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Features;