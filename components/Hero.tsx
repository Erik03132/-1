import React from 'react';
import Reveal from './Reveal';
import { Play, Filter, Activity, Cpu, FileCheck, CheckCircle2, Layout, ShieldCheck, MessageSquare, Zap, BarChart3 } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center space-y-8">
          <Reveal animation="animate-blur-in">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl leading-[1.1] text-white tracking-tighter font-medium">
              Полный цикл задач <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-indigo-400">по автоматизации</span>
            </h1>
          </Reveal>
          
          <Reveal animation="animate-slide-up" delay="animate-delay-300">
            <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto">
              От риск‑ориентированного аудита и ТЭО до ввода АСУ ТП в эксплуатацию. Фокус на объектах до 100 точек, импортозамещении и удалённом консалтинге. Работаем по ГОСТ Р 59793 и ГОСТ 34.602.
            </p>
          </Reveal>

          <Reveal animation="animate-scale-in" delay="animate-delay-500">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 relative z-10">
              <a href="#services" className="inline-flex items-center gap-2 shadow-sky-500/25 hover:shadow-sky-500/60 hover:from-sky-400 hover:to-indigo-500 transition-all duration-300 hover:scale-110 hover:shadow-xl group text-base font-medium text-neutral-50 bg-gradient-to-r from-sky-500 to-indigo-600 rounded-xl px-6 py-3 shadow-lg">
                Наши услуги
                <Layout className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
              </a>
              <a href="#format" className="inline-flex items-center gap-2 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-300 group hover:scale-105 hover:shadow-lg font-medium text-white/90 border border-white/20 rounded-xl px-6 py-3">
                <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform duration-200" />
                Формат работы
              </a>
            </div>
          </Reveal>
        </div>

        {/* Product Preview / Visualization */}
        <Reveal animation="animate-blur-in" delay="animate-delay-700" className="sm:mt-24 mt-16 hover-lift relative">
          <div className="antialiased relative z-10 text-slate-100 p-0 sm:p-6">
            <section className="relative shadow-[0_10px_60px_-15px_rgba(0,0,0,0.6)] overflow-hidden hover:shadow-[0_20px_80px_-15px_rgba(0,0,0,0.8)] border border-white/10 rounded-3xl bg-[#0b0f1a]/40 backdrop-blur-2xl transition-all duration-500">
              <div className="pointer-events-none absolute -inset-px rounded-[1.45rem] bg-[radial-gradient(80%_60%_at_50%_0%,rgba(56,189,248,0.15),transparent_60%)]"></div>
              
              <div className="relative p-4 sm:p-8">
                <div className="relative mx-auto w-full">
                  <div className="absolute inset-0 translate-y-8 scale-[0.96] rounded-2xl bg-slate-900/50 ring-1 ring-white/5 blur-[0.3px]"></div>
                  <div className="relative rounded-2xl bg-[linear-gradient(180deg,rgba(19,24,31,0.95),rgba(10,13,18,0.95))] ring-1 ring-white/10 overflow-hidden hover:ring-white/15 transition-all duration-300">
                    {/* Header of fake window */}
                    <div className="flex hover:bg-slate-950/70 transition-all duration-300 bg-slate-950/50 border-b border-white/5 rounded-t-2xl p-4 md:px-6 backdrop-blur items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-red-500/60 hover:bg-red-500 transition-colors duration-200"></span>
                        <span className="h-2.5 w-2.5 rounded-full bg-amber-500/60 hover:bg-amber-500 transition-colors duration-200"></span>
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/60 hover:bg-emerald-500 transition-colors duration-200"></span>
                      </div>
                      <div className="hidden sm:flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/60 px-4 py-2 text-sm text-slate-300 shadow-inner shadow-black/20 hover:border-white/15 hover:bg-slate-900/80 transition-all duration-200">
                        <Filter className="h-4 w-4 text-slate-400" />
                        <span className="text-slate-400/80">Статус проекта: АКТИВЕН</span>
                      </div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                        Система в норме
                      </div>
                    </div>

                    {/* Content of fake window */}
                    <div className="relative h-80">
                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_0%,rgba(87,107,255,0.08),transparent_50%)]"></div>
                      <div className="absolute inset-0 overflow-hidden p-6 space-y-4">
                        
                        {/* Task 1 */}
                        <div className="flex items-center gap-4 p-4 rounded-lg bg-slate-900/40 border border-white/5 hover:bg-slate-900/80 hover:border-white/10 transition-all duration-300 group">
                          <div className="h-4 w-4 rounded border-2 border-emerald-500/60 bg-emerald-500/10 group-hover:border-emerald-500 group-hover:bg-emerald-500/20 transition-all duration-200"></div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 text-sm">
                              <span className="text-slate-200 font-medium truncate group-hover:text-white transition-colors duration-200">Аудит архитектуры АСУ ТП</span>
                              <span className="px-2 py-0.5 text-xs rounded-full bg-sky-500/15 text-sky-300 border border-sky-500/20 group-hover:bg-sky-500/25 group-hover:border-sky-500/30 transition-all duration-200">Аудит</span>
                            </div>
                            <div className="text-xs text-slate-400 mt-1 group-hover:text-slate-300 transition-colors duration-200">Завершено: Анализ рисков и отказоустойчивости</div>
                          </div>
                          <div className="flex items-center gap-3">
                            <ShieldCheck className="w-4 h-4 text-emerald-500 group-hover:text-emerald-400 transition-colors" />
                          </div>
                        </div>

                        {/* Task 2 */}
                        <div className="flex items-center gap-4 p-4 rounded-lg bg-slate-900/40 border border-white/5 hover:bg-slate-900/80 hover:border-white/10 transition-all duration-300 group">
                          <div className="h-4 w-4 rounded border-2 border-amber-500/60 group-hover:border-amber-500 transition-colors duration-200"></div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 text-sm">
                              <span className="text-slate-200 font-medium truncate group-hover:text-white transition-colors duration-200">Разработка прикладного ПО (ПЛК)</span>
                              <span className="px-2 py-0.5 text-xs rounded-full bg-orange-500/15 text-orange-300 border border-orange-500/20 group-hover:bg-orange-500/25 group-hover:border-orange-500/30 transition-all duration-200">В работе</span>
                            </div>
                            <div className="text-xs text-slate-400 mt-1 group-hover:text-slate-300 transition-colors duration-200">Импортозамещение: Переход на отечественную платформу</div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Cpu className="w-4 h-4 text-amber-500 group-hover:text-amber-400 transition-colors" />
                          </div>
                        </div>

                        {/* Task 3 */}
                        <div className="flex items-center gap-4 p-4 rounded-lg bg-slate-900/40 border border-white/5 hover:bg-slate-900/80 hover:border-white/10 transition-all duration-300 group">
                          <div className="h-4 w-4 rounded border-2 border-violet-500/60 bg-violet-500/10 group-hover:border-violet-500 group-hover:bg-violet-500/20 transition-all duration-200 flex items-center justify-center">
                            <div className="w-2 h-2 bg-violet-400 rounded-full"></div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 text-sm">
                              <span className="text-slate-400 font-medium truncate group-hover:text-slate-300 transition-colors duration-200">Согласование ТЗ по ГОСТ 34.602</span>
                              <span className="px-2 py-0.5 text-xs rounded-full bg-violet-500/15 text-violet-300 border border-violet-500/20 group-hover:bg-violet-500/25 group-hover:border-violet-500/30 transition-all duration-200">Документация</span>
                            </div>
                            <div className="text-xs text-slate-500 mt-1 group-hover:text-slate-400 transition-colors duration-200">Версия 1.4 утверждена заказчиком</div>
                          </div>
                          <div className="flex items-center gap-3">
                            <FileCheck className="w-4 h-4 text-violet-500 group-hover:scale-110 transition-transform" />
                          </div>
                        </div>

                      </div>
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0B0F14] to-transparent"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expressive Project Manageability Footer Block */}
              <div className="relative z-10 border-t border-white/5 bg-white/[0.02] backdrop-blur-md p-6 sm:p-10">
                <div className="grid lg:grid-cols-2 gap-10 items-center">
                  <div>
                    <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-400 mb-6 tracking-wide uppercase">
                      Стандарт ГОСТ Р 59793
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                    </div>
                    <h2 className="text-3xl sm:text-4xl text-white tracking-tighter font-medium leading-tight">
                      Управляемость <br className="hidden sm:block" />
                      <span className="text-sky-400">вашего проекта</span>
                    </h2>
                    <p className="sm:text-lg text-base text-slate-400 mt-5 leading-relaxed max-w-xl">
                      Мы не просто проектируем — мы выстраиваем систему прозрачного контроля. Используем современные инструменты цифрового взаимодействия для исключения "слепых зон" в ходе работ.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 group hover:border-sky-500/40 hover:bg-white/10 transition-all duration-300">
                      <div className="h-10 w-10 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-400 shrink-0 group-hover:scale-110 transition-transform">
                        <Activity className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white">Мониторинг</p>
                        <p className="text-xs text-slate-400 truncate">Прозрачность 24/7</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 group hover:border-violet-500/40 hover:bg-white/10 transition-all duration-300">
                      <div className="h-10 w-10 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400 shrink-0 group-hover:scale-110 transition-transform">
                        <MessageSquare className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white">Связь</p>
                        <p className="text-xs text-slate-400 truncate">Оперативные правки</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 group hover:border-amber-500/40 hover:bg-white/10 transition-all duration-300">
                      <div className="h-10 w-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0 group-hover:scale-110 transition-transform">
                        <BarChart3 className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white">Логика</p>
                        <p className="text-xs text-slate-400 truncate">Контроль алгоритмов</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 group hover:border-emerald-500/40 hover:bg-white/10 transition-all duration-300">
                      <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0 group-hover:scale-110 transition-transform">
                        <Zap className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white">Скорость</p>
                        <p className="text-xs text-slate-400 truncate">Соблюдение сроков</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Hero;