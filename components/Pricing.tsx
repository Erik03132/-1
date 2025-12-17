import React from 'react';
import Reveal from './Reveal';
import { Search, FileText, Settings, PlayCircle, BookOpen, Shield, Code2 } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      title: "Аудит ИТ и АСУ ТП",
      desc: "Риск-ориентированный анализ архитектуры, схем, логики и документации. План улучшений с приоритизацией.",
      icon: <Search className="w-6 h-6 text-sky-400" />,
      gradient: "from-sky-500/10 to-blue-600/10",
      border: "border-sky-500/30"
    },
    {
      title: "Предпроектные работы и ТЭО",
      desc: "Сбор исходных данных, уточнение целей и границ системы. Подготовка нескольких концептуальных вариантов решения.",
      icon: <FileText className="w-6 h-6 text-indigo-400" />,
      gradient: "from-indigo-500/10 to-violet-600/10",
      border: "border-indigo-500/30"
    },
    {
      title: "Разработка ТЗ и решений",
      desc: "Техническое задание по ГОСТ 34.602. Архитектура системы, структура сигналов и интеграции с системами верхнего уровня.",
      icon: <Settings className="w-6 h-6 text-violet-400" />,
      gradient: "from-violet-500/10 to-purple-600/10",
      border: "border-violet-500/30"
    },
    {
      title: "Рабочая документация и ПО",
      desc: "Схемы подключений, кабельные журналы, спецификации. Разработка прикладного ПО (ПЛК, HMI, SCADA).",
      icon: <Code2 className="w-6 h-6 text-amber-400" />,
      gradient: "from-amber-500/10 to-orange-600/10",
      border: "border-amber-500/30"
    },
    {
      title: "Сопровождение СМР и ПНР",
      desc: "Поддержка бригад онлайн: от подготовки к монтажу до комплексных испытаний. Разбор спорных моментов.",
      icon: <PlayCircle className="w-6 h-6 text-emerald-400" />,
      gradient: "from-emerald-500/10 to-green-600/10",
      border: "border-emerald-500/30"
    },
    {
      title: "Ввод в эксплуатацию",
      desc: "Программы испытаний, акты, чек-листы. Обучение операторов и ИТ/инженерного персонала.",
      icon: <BookOpen className="w-6 h-6 text-rose-400" />,
      gradient: "from-rose-500/10 to-red-600/10",
      border: "border-rose-500/30"
    },
    {
      title: "Сопровождение и развитие",
      desc: "Реагирование на инциденты, регулярный аудит. Пошаговое увеличение степени автоматизации.",
      icon: <Shield className="w-6 h-6 text-cyan-400" />,
      gradient: "from-cyan-500/10 to-blue-600/10",
      border: "border-cyan-500/30"
    }
  ];

  return (
    <section id="services" className="relative max-w-7xl mx-auto pt-20 px-6 pb-20">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="sm:text-4xl text-3xl text-neutral-50 tracking-tighter font-medium">Наши услуги</h1>
        <p className="mt-3 text-white/70">Закрываем полный цикл инженерных задач. Четко, по стандартам, с гарантией результата.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-14 max-w-7xl mx-auto">
        {services.map((service, index) => (
          <Reveal key={service.title} animation="animate-blur-in" delay={`animate-delay-${(index + 1) * 100}`}>
            <div className="group relative h-full">
              <div className="relative h-full overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-6 hover:border-white/20 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                 <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                 
                 <div className="relative z-10 flex flex-col h-full">
                    <div className={`w-12 h-12 rounded-lg border ${service.border} bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        {service.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{service.title}</h3>
                    <p className="text-sm text-white/70 leading-relaxed">{service.desc}</p>
                 </div>
              </div>
            </div>
          </Reveal>
        ))}
        
        {/* Contact Card */}
        <Reveal animation="animate-blur-in" delay="animate-delay-800">
             <div className="group relative h-full flex items-center justify-center">
              <div className="relative w-full h-full overflow-hidden rounded-2xl bg-gradient-to-br from-sky-600 to-indigo-700 p-6 flex flex-col items-center justify-center text-center hover:scale-105 transition-transform duration-300 shadow-xl cursor-pointer">
                 <div className="relative z-10">
                    <h3 className="text-lg font-bold text-white mb-2">Нужен проект?</h3>
                    <p className="text-sm text-white/90 mb-4">Оставьте заявку на расчет</p>
                    <button className="px-4 py-2 bg-white text-indigo-600 rounded-lg font-semibold text-sm hover:bg-slate-100 transition-colors">
                        Связаться
                    </button>
                 </div>
              </div>
            </div>
        </Reveal>
      </div>

      {/* Glow effect */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-24 h-96 w-96 -translate-x-1/2 rounded-full bg-gradient-radial from-sky-500/20 via-violet-500/10 to-transparent blur-[120px]"></div>
      </div>
    </section>
  );
};

export default Services;