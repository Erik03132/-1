import React from 'react';
import Reveal from './Reveal';
import { FileText, MonitorPlay, Video } from 'lucide-react';

const KeyboardSection: React.FC = () => {
  return (
    <div id="format" className="max-w-7xl sm:px-6 lg:px-8 mt-9 mx-auto px-4">
      <div className="mx-auto max-w-3xl text-center mb-16">
        <Reveal animation="animate-blur-in" delay="animate-delay-600">
          <h2 className="text-3xl sm:text-4xl text-white tracking-tighter font-medium">
            Формат работы
          </h2>
        </Reveal>
        <Reveal animation="animate-slide-up" delay="animate-delay-700">
          <p className="mt-4 text-lg text-white/70">
            Мы выступаем как удалённый инженерный офис: вы ведёте стройку и пусконаладку, мы отвечаем за аудит, концепцию и документацию.
          </p>
        </Reveal>
      </div>

      <section className="max-w-full sm:px-6 mt-10 mb-8 px-4">
        <Reveal animation="animate-scale-in" delay="animate-delay-800" className="w-full">
          <div className="relative mx-auto mb-8 w-full max-w-4xl">
            <div className="relative bg-gradient-to-b from-slate-800/40 to-slate-900/60 rounded-2xl border border-white/10 shadow-2xl shadow-black/50 p-8 backdrop-blur-sm hover:border-white/15 hover:shadow-3xl transition-all duration-500 hover-lift">
              
              <div className="grid md:grid-cols-3 gap-6 relative z-10">
                 {/* Step 1 */}
                 <div className="flex flex-col items-center text-center space-y-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                    <div className="h-12 w-12 rounded-full bg-sky-500/20 flex items-center justify-center text-sky-400">
                        <Video className="w-6 h-6" />
                    </div>
                    <h3 className="text-white font-medium">Онлайн-встречи</h3>
                    <p className="text-sm text-slate-400">Регулярные планерки и оперативное решение технических вопросов без лишних выездов.</p>
                 </div>

                 {/* Step 2 */}
                 <div className="flex flex-col items-center text-center space-y-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                    <div className="h-12 w-12 rounded-full bg-violet-500/20 flex items-center justify-center text-violet-400">
                        <FileText className="w-6 h-6" />
                    </div>
                    <h3 className="text-white font-medium">Обмен документацией</h3>
                    <p className="text-sm text-slate-400">Марк-апы в чертежах, проверка исполнительной документации и актуализация схем.</p>
                 </div>

                 {/* Step 3 */}
                 <div className="flex flex-col items-center text-center space-y-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                    <div className="h-12 w-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                        <MonitorPlay className="w-6 h-6" />
                    </div>
                    <h3 className="text-white font-medium">Сопровождение</h3>
                    <p className="text-sm text-slate-400">Поддержка бригад на этапе ПНР, участие в настройке алгоритмов и параметров онлайн.</p>
                 </div>
              </div>

              {/* Decorative timeline line */}
              <div className="hidden md:block absolute top-1/2 left-10 right-10 h-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent -z-0 transform -translate-y-1/2"></div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
};

export default KeyboardSection;