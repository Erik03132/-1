
import React from 'react';
import Reveal from './Reveal';
import { Play, Filter, Activity, Cpu, FileCheck, ShieldCheck, MessageSquare, Zap, BarChart3, Settings2 } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32 grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-4xl text-center space-y-8">
          <Reveal animation="animate-blur-in">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold uppercase tracking-widest mb-4">
              <Settings2 className="w-3 h-3" /> Инженерный офис полного цикла
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl leading-[1.05] text-white tracking-tighter font-extrabold">
              Проектирование <br />
              <span className="gradient-text">АСУ ТП без рисков</span>
            </h1>
          </Reveal>
          
          <Reveal animation="animate-slide-up" delay="animate-delay-200">
            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto font-medium">
              От аудита и ТЗ до внедрения. Специализация на объектах до 100 сигналов, импортозамещении и удалённом сопровождении ПНР по ГОСТ.
            </p>
          </Reveal>

          <Reveal animation="animate-scale-in" delay="animate-delay-300">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-4">
              <a href="#services" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-brand-dark rounded-xl px-8 py-4 font-bold text-base hover:bg-sky-50 transition-all shadow-xl shadow-white/5 active:scale-95">
                Наши услуги
              </a>
              <a href="#format" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-white border border-white/10 bg-white/5 rounded-xl px-8 py-4 font-bold text-base hover:bg-white/10 transition-all active:scale-95 backdrop-blur-md">
                <Play className="w-4 h-4 fill-current" />
                Формат работы
              </a>
            </div>
          </Reveal>
        </div>

        {/* Dashboard Visualization */}
        <Reveal animation="animate-blur-in" delay="animate-delay-500" className="mt-20 lg:mt-32">
          <div className="glass-card rounded-[2.5rem] p-1 sm:p-2 overflow-hidden shadow-2xl">
            <div className="bg-[#0b0f1a] rounded-[2.2rem] overflow-hidden border border-white/5">
              {/* Header Bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02]">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/40"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/40"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/40"></div>
                </div>
                <div className="flex items-center gap-4 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                  <div className="flex items-center gap-1.5"><Activity className="w-3 h-3" /> CPU Load: 12%</div>
                  <div className="flex items-center gap-1.5 text-emerald-500"><ShieldCheck className="w-3 h-3" /> Security: Verified</div>
                </div>
              </div>

              {/* Grid Content */}
              <div className="p-6 grid lg:grid-cols-3 gap-6 h-[400px]">
                {/* Left Panel: Stats */}
                <div className="space-y-4">
                  <div className="bg-white/5 p-5 rounded-2xl border border-white/5 space-y-4">
                     <div className="flex justify-between items-end">
                        <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Прогресс аудита</span>
                        <span className="text-xl font-mono font-bold text-sky-400">84%</span>
                     </div>
                     <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-sky-500 w-[84%] shadow-[0_0_10px_rgba(56,189,248,0.5)]"></div>
                     </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                     <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                        <Cpu className="w-4 h-4 text-indigo-400 mb-2" />
                        <div className="text-[10px] text-slate-500 uppercase">Сигналов</div>
                        <div className="text-lg font-mono font-bold text-white">96 / 100</div>
                     </div>
                     <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                        <FileCheck className="w-4 h-4 text-emerald-400 mb-2" />
                        <div className="text-[10px] text-slate-500 uppercase">ГОСТ</div>
                        <div className="text-lg font-mono font-bold text-white">Pass</div>
                     </div>
                  </div>
                </div>

                {/* Middle Panel: Active Task */}
                <div className="lg:col-span-2 bg-gradient-to-b from-white/[0.04] to-transparent rounded-2xl border border-white/5 p-6 flex flex-col">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-sm font-bold text-white uppercase tracking-widest">Текущая задача</h3>
                    <span className="px-2 py-1 rounded bg-amber-500/10 text-amber-500 text-[10px] font-bold uppercase">В работе</span>
                  </div>
                  <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-6 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                      <div className="w-10 h-10 rounded-lg bg-sky-500/20 flex items-center justify-center text-sky-400">
                        <BarChart3 className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-bold text-white">Разработка прикладного ПО ПЛК</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">Импортозамещение на базе Segnetics / ОВЕН</div>
                      </div>
                      <div className="text-[10px] font-mono text-slate-600">ID: 49302</div>
                    </div>

                    <div className="flex items-center gap-6 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                      <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                        <MessageSquare className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-bold text-white">Консультация по монтажу</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">Удаленное сопровождение бригады</div>
                      </div>
                      <div className="text-[10px] font-mono text-slate-600">Live Sync</div>
                    </div>
                  </div>
                  
                  <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                     <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="text-[10px] text-slate-500 uppercase font-bold">Связь установлена</span>
                     </div>
                     <button className="text-[10px] text-sky-400 uppercase font-bold hover:underline">Подробнее</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Background Decor */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"></div>
    </section>
  );
};

export default Hero;
