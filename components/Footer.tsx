import React from 'react';
import { Cpu, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="footer" className="section-divider border-white/10 border-t pt-16 pb-16 bg-[#0b0f1a]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex gap-3 items-center mb-4">
               <div className="bg-gradient-to-br from-sky-500 to-indigo-600 p-1.5 rounded-lg">
                <Cpu className="text-white h-5 w-5" />
              </div>
              <span className="text-xl font-bold text-white">Системотех</span>
            </div>
            <p className="text-white/60 text-sm max-w-md mb-6">
              Удаленный инженерный офис полного цикла. Аудит, проектирование, сопровождение и пусконаладка систем автоматизации.
            </p>
            <div className="space-y-3 mb-8">
              <a href="mailto:info@sistemotech.ru" className="flex items-center gap-3 text-white/60 hover:text-white transition-colors">
                <Mail className="h-4 w-4" />
                <span className="text-sm">info@sistemotech.ru</span>
              </a>
              <div className="flex items-center gap-3 text-white/60">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">Работаем по всей России (онлайн)</span>
              </div>
            </div>

            <form className="max-w-md space-y-3 bg-white/5 p-6 rounded-xl border border-white/10" onSubmit={(e) => e.preventDefault()}>
              <h5 className="text-white font-medium mb-1">Связаться с нами</h5>
              <p className="text-xs text-white/50 mb-4">Оставьте заявку, и мы свяжемся с вами в течение рабочего дня.</p>
              
              <div className="grid grid-cols-2 gap-3">
                <input 
                  type="text" 
                  placeholder="Имя" 
                  className="w-full bg-[#0b0f1a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-sky-500/50 transition-colors"
                />
                <input 
                  type="tel" 
                  placeholder="Телефон" 
                  className="w-full bg-[#0b0f1a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-sky-500/50 transition-colors"
                />
              </div>
              <input 
                type="email" 
                placeholder="Email" 
                className="w-full bg-[#0b0f1a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-sky-500/50 transition-colors"
              />
              <textarea 
                placeholder="Сообщение или краткое описание задачи" 
                rows={3}
                className="w-full bg-[#0b0f1a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-sky-500/50 transition-colors resize-none"
              ></textarea>
              <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-medium rounded-lg px-4 py-2.5 text-sm hover:shadow-lg hover:shadow-sky-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Отправить заявку
              </button>
            </form>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Услуги</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-white/60 hover:text-white hover:translate-x-1 transition-all duration-200">Аудит АСУ ТП</a></li>
              <li><a href="#" className="text-white/60 hover:text-white hover:translate-x-1 transition-all duration-200">Проектирование</a></li>
              <li><a href="#" className="text-white/60 hover:text-white hover:translate-x-1 transition-all duration-200">Программирование ПЛК</a></li>
              <li><a href="#" className="text-white/60 hover:text-white hover:translate-x-1 transition-all duration-200">Пусконаладка</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Информация</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-white/60 hover:text-white hover:translate-x-1 transition-all duration-200">О компании</a></li>
              <li><a href="#" className="text-white/60 hover:text-white hover:translate-x-1 transition-all duration-200">Импортозамещение</a></li>
              <li><a href="#" className="text-white/60 hover:text-white hover:translate-x-1 transition-all duration-200">Реквизиты</a></li>
              <li><a href="#" className="text-white/60 hover:text-white hover:translate-x-1 transition-all duration-200">Политика конфиденциальности</a></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row border-white/10 border-t mt-12 pt-8 items-center justify-between">
          <p className="text-white/50 text-sm">© 2024 ООО «Системотех». Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;