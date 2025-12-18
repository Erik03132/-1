
import React from 'react';
import Reveal from './Reveal';
import { Play, Activity, Cpu, FileCheck, ShieldCheck, MessageSquare, Zap, BarChart3, Settings2, ArrowUpRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-36 pb-24 lg:pt-52 lg:pb-40 grid-pattern">
      {/* Decorative Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-sky-500/10 via-transparent to-transparent pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-4xl text-center space-y-10">
          <Reveal animation="animate-blur-in">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-sky-500/5 border border-sky-500/20 text-sky-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6 shadow-sm">
              <Settings2 className="w-3.5 h-3.5" /> Инженерный офис АСУ ТП
            </div>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl leading-[0.95] text-white tracking-tight font-black">
              Проектируем <br />
              <span className="gradient-text">будущее систем</span>
            </h1>
          </Reveal>
          
          <Reveal animation="animate-slide-up" delay="animate-delay-200">
            <p className="text-xl sm:text-2xl text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed">
              Комплексные решения автоматизации для объектов до 100 сигналов. 
              Аудит, ТЗ по ГОСТ, прикладное ПО и удаленное сопровождение ПНР.
            </p>
          </Reveal>

          <Reveal animation="animate-scale-in" delay="animate-delay-300">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
              <a href="#services" className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white text-[#0b0f1a] rounded-2xl px-10 py-5 font-black text-lg hover:bg-sky-50 transition-all shadow-2xl shadow-white/5 active:scale-95">
                Наши услуги
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <a href="#format" className="w-full sm:w-auto inline-flex items-center justify-center gap-3 text-white border border-white/10 bg-white/5 rounded-2xl px-10 py-5 font-bold text-lg hover:bg-white/10 transition-all active:scale-95 backdrop-blur-xl">
                <Play className="w-5 h-5 fill-current text-sky-400" />
                Формат работы
              </a>
            </div>
          </Reveal>
        </div>

        {/* Engineering Dashboard Visualization */}
        <Reveal animation="animate-blur-in" delay="animate-delay-500" className="mt-24 lg:mt-36">
          <div className="glass-card rounded-[3rem] p-2 overflow-hidden shadow-[0_0_100px_rgba(56,189,248,0.1)]">
            <div className="bg-[#0b0f1a] rounded-[2.8rem] overflow-hidden border border-white/5 shadow-inner">
              {/* Toolbar */}
              <div className="flex items-center justify-between px-8 py-5 border-b border-white/5 bg-white/[0.02]">
                <div className="flex gap-2.5">
                  <div className="w-3.5 h-3.5 rounded-full bg-rose-500/20 border border-rose-500/30"></div>
                  <div className="w-3.5 h-3.5 rounded-full bg-amber-500/20 border border-amber-500/30"></div>
                  <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/20 border border-emerald-500/30"></div>
                </div>
                <div className="flex items-center gap-6 text-[11px] font-mono text-slate-500 uppercase tracking-[0.15em] font-bold">
                  <div className="flex items-center gap-2"><Activity className="w-3.5 h-3.5" /> Link Quality: 99%</div>
                  <div className="flex items-center gap-2 text-emerald-400"><ShieldCheck className="w-3.5 h-3.5" /> Security: Active</div>
                </div>
              </div>

              {/* Console Layout */}
              <div className="p-8 grid lg:grid-cols-12 gap-8 h-[460px]">
                {/* Metrics */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="bg-white/5 p-6 rounded-3xl border border-white/5 space-y-5 group hover:border-sky-500/20 transition-colors">
                     <div className="flex justify-between items-end">
                        <span className="text-[11px] text-slate-400 uppercase font-black tracking-widest">Прогресс аудита</span>
                        <span className="text-2xl font-mono font-black text-sky-400">84.2%</span>
                     </div>
                     <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-sky-500 w-[84%] shadow-[0_0_20px_rgba(56,189,248,0.4)] transition-all duration-1000"></div>
                     </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="bg-white/5 p-6 rounded-3xl border border-white/5 flex flex-col justify-between hover:bg-white/[0.07] transition-colors">
                        <Cpu className="w-5 h-5 text-indigo-400 mb-4" />
                        <div>
                          <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Сигналы</div>
                          <div className="text-xl font-mono font-black text-white">96/100</div>
                        </div>
                     </div>
                     <div className="bg-white/5 p-6 rounded-3xl border border-white/5 flex flex-col justify-between hover:bg-white/[0.07] transition-colors">
                        <FileCheck className="w-5 h-5 text-emerald-400 mb-4" />
                        <div>
                          <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">ГОСТ-чек</div>
                          <div className="text-xl font-mono font-black text-white">Pass</div>
                        </div>
                     </div>
                  </div>
                </div>

                {/* Main View */}
                <div className="lg:col-span-8 bg-gradient-to-br from-white/[0.03] to-transparent rounded-[2rem] border border-white/5 p-8 flex flex-col relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 rounded-full blur-[80px] -z-0"></div>
                  
                  <div className="flex items-center justify-between mb-10 relative z-10">
                    <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-3">
                      <Zap className="w-4 h-4 text-amber-400" /> Текущая стадия проектирования
                    </h3>
                    <span className="px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-500 text-[10px] font-black uppercase tracking-widest border border-amber-500/20">Active Task</span>
                  </div>

                  <div className="flex-1 space-y-5 relative z-10">
                    <div className="flex items-center gap-6 p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all cursor-default">
                      <div className="w-12 h-12 rounded-xl bg-sky-500/20 flex items-center justify-center text-sky-400 shadow-inner">
                        <BarChart3 className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="text-base font-bold text-white mb-0.5">Разработка прикладного ПО ПЛК</div>
                        <div className="text-xs text-slate-500 uppercase tracking-wider font-bold">Оптимизация логики управления</div>
                      </div>
                      <div className="text-[11px] font-mono text-slate-600 font-bold">HEX: 49302</div>
                    </div>

                    <div className="flex items-center gap-6 p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all cursor-default">
                      <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 shadow-inner">
                        <MessageSquare className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="text-base font-bold text-white mb-0.5">Консультация по монтажу</div>
                        <div className="text-xs text-slate-500 uppercase tracking-wider font-bold">Удаленное сопровождение бригады</div>
                      </div>
                      <div className="text-[11px] font-mono text-slate-600 font-bold">Live Sync</div>
                    </div>
                  </div>
                  
                  <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between relative z-10">
                     <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                        <span className="text-[11px] text-slate-500 uppercase font-black tracking-widest">Data Link: Secured</span>
                     </div>
                     <button className="text-[11px] text-sky-400 uppercase font-black tracking-[0.2em] hover:text-sky-300 transition-colors">View Details</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Background Decor */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[1000px] h-[1000px] bg-sky-500/[0.03] rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-indigo-500/[0.03] rounded-full blur-[120px] pointer-events-none"></div>
    </section>
  );
};

export default Hero;
