import React from 'react';
import Reveal from './Reveal';
import { ArrowRight, Check, HardHat, Building2, Wrench } from 'lucide-react';

const HowItWorks: React.FC = () => {
  return (
    <section id="clients" className="relative sm:py-28 section-divider pt-20 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <Reveal animation="animate-slide-in-left" delay="animate-delay-300">
            <h2 className="text-3xl sm:text-4xl text-white mb-6 tracking-tighter font-medium">
              Для кого <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">мы работаем</span>
            </h2>
            <p className="text-lg text-white/70 mb-8 leading-relaxed">
              Наши услуги рассчитаны на команды, которые отвечают за результат на площадке, а не хотят раздувать собственный проектный департамент.
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4 group hover:bg-white/5 rounded-lg p-3 transition-all duration-200">
                  <div className="h-10 w-10 rounded-lg bg-sky-500/20 flex items-center justify-center shrink-0">
                    <HardHat className="h-5 w-5 text-sky-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Подрядчики СМР и электромонтажа</h4>
                    <p className="text-white/70 text-sm">Работающие на объектах энергетики, ЖКХ, промышленности и коммерческой недвижимости.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group hover:bg-white/5 rounded-lg p-3 transition-all duration-200">
                  <div className="h-10 w-10 rounded-lg bg-indigo-500/20 flex items-center justify-center shrink-0">
                    <Wrench className="h-5 w-5 text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Пусконаладочные и сервисные организации</h4>
                    <p className="text-white/70 text-sm">Которым нужна сильная инженерная поддержка под конкретные проекты или тендеры.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group hover:bg-white/5 rounded-lg p-3 transition-all duration-200">
                  <div className="h-10 w-10 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0">
                    <Building2 className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Собственники и управляющие объектов</h4>
                    <p className="text-white/70 text-sm">Которым важны сроки, окупаемость и возможность поэтапной модернизации.</p>
                  </div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#footer" className="inline-flex items-center gap-2 shadow-sky-500/25 hover:shadow-sky-500/60 hover:from-sky-400 hover:to-indigo-500 transition-all duration-300 hover:scale-110 hover:shadow-xl group text-base font-medium text-neutral-50 bg-gradient-to-r from-sky-500 to-indigo-600 rounded-xl px-6 py-3 shadow-lg">
                Обсудить проект
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
              </a>
            </div>
          </Reveal>

          <Reveal animation="animate-slide-in-right" delay="animate-delay-400">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-sky-500/20 to-indigo-500/20 blur-3xl"></div>
              <div className="relative glass rounded-2xl p-8 border border-white/10 hover:border-white/15 hover:shadow-2xl transition-all duration-500 hover-lift">
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <h3 className="font-semibold text-white">Ключевые показатели</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                      <div className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-green-400" />
                        <span className="text-sm font-medium text-white">Снижение ошибок "на земле"</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                      <div className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-green-400" />
                        <span className="text-sm font-medium text-white">Удержание сроков ПНР</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                      <div className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-green-400" />
                        <span className="text-sm font-medium text-white">Окупаемая модернизация</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                      <div className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-green-400" />
                        <span className="text-sm font-medium text-white">Соответствие ГОСТ</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;