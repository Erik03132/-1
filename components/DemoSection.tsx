import React from 'react';
import Reveal from './Reveal';

const DemoSection: React.FC = () => {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-12">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '18px 18px' }}></div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Import Substitution Demo */}
        <Reveal animation="animate-fade-in" delay="animate-delay-900" className="h-full">
          <article className="shadow-[0_10px_30px_rgba(0,0,0,0.35)] p-6 md:p-8 bg-[#0b0f1a] border border-white/10 rounded-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:border-white/15 hover:scale-105 transition-all duration-500 hover-lift h-full flex flex-col">
            <header className="mb-6">
              <h2 className="text-2xl text-white tracking-tighter font-medium">Импортозамещение</h2>
              <p className="mt-2 text-white/70">
                Снижение операционных рисков и зависимости от зарубежных поставщиков. Мы помогаем выбрать оптимальные российские и дружественные платформы.
              </p>
            </header>

            <div className="bg-[#0d1322] border border-white/10 rounded-xl p-6 hover:border-white/15 hover:bg-[#0f1525] transition-all duration-300 flex-1 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-3xl"></div>
                
                <ul className="space-y-4 relative z-10">
                    <li className="flex items-center gap-3 text-slate-300">
                        <div className="h-2 w-2 rounded-full bg-sky-400"></div>
                        <span>Контроллеры и модули ввода-вывода (ПЛК)</span>
                    </li>
                    <li className="flex items-center gap-3 text-slate-300">
                        <div className="h-2 w-2 rounded-full bg-sky-400"></div>
                        <span>SCADA-системы и HMI панели</span>
                    </li>
                    <li className="flex items-center gap-3 text-slate-300">
                        <div className="h-2 w-2 rounded-full bg-sky-400"></div>
                        <span>Промышленное сетевое оборудование</span>
                    </li>
                    <li className="flex items-center gap-3 text-slate-300">
                        <div className="h-2 w-2 rounded-full bg-sky-400"></div>
                        <span>Прикладное программное обеспечение</span>
                    </li>
                </ul>
                
                <div className="mt-6 pt-4 border-t border-white/10">
                    <p className="text-sm text-sky-400/80">Сохраняем логику работы и масштабируемость системы при переходе.</p>
                </div>
            </div>
          </article>
        </Reveal>

        {/* Standards Demo */}
        <Reveal animation="animate-fade-in" delay="animate-delay-900" className="h-full">
          <article className="rounded-2xl border border-white/10 bg-[#0b0f1a] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.35)] md:p-8 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:border-white/15 hover:scale-105 transition-all duration-500 hover-lift h-full flex flex-col">
            <header className="mb-8">
              <h2 className="text-2xl text-white tracking-tighter font-medium">Работа по ГОСТ</h2>
              <p className="mt-2 text-white/70">
                Обеспечиваем понятную документацию и управляемость. Каждый этап фиксируется в соответствии с государственными стандартами.
              </p>
            </header>

            <div className="space-y-4 flex-1">
                <div className="p-4 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between group hover:border-violet-500/30 transition-colors">
                    <div>
                        <h4 className="text-white font-medium">ГОСТ Р 59793</h4>
                        <p className="text-sm text-slate-400">Автоматизированные системы. Стадии создания.</p>
                    </div>
                    <div className="text-violet-400 font-mono text-sm opacity-60 group-hover:opacity-100">ISO/IEC</div>
                </div>

                <div className="p-4 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between group hover:border-violet-500/30 transition-colors">
                    <div>
                        <h4 className="text-white font-medium">ГОСТ 34.602</h4>
                        <p className="text-sm text-slate-400">Техническое задание на создание АС.</p>
                    </div>
                    <div className="text-violet-400 font-mono text-sm opacity-60 group-hover:opacity-100">ТЗ</div>
                </div>

                <div className="p-4 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between group hover:border-violet-500/30 transition-colors">
                    <div>
                        <h4 className="text-white font-medium">РД 50-34.698-90</h4>
                        <p className="text-sm text-slate-400">Требования к содержанию документов.</p>
                    </div>
                    <div className="text-violet-400 font-mono text-sm opacity-60 group-hover:opacity-100">ДОК</div>
                </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
};

export default DemoSection;