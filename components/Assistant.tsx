import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, User, Loader2, Globe } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const KNOWLEDGE_BASE = `
Вы — официальный ИИ-ассистент компании "Системотех". 
Ваша задача: отвечать на вопросы о компании, услугах и автоматизации (АСУ ТП).

О компании:
- "Системотех" — это удаленный инженерный офис АСУ ТП.
- Специализация: аудит, проектирование, программирование и сопровождение систем автоматизации.
- Фокус: объекты до 100 точек мониторинга, импортозамещение.
- Работаем по стандартам: ГОСТ Р 59793 (стадии создания АС) и ГОСТ 34.602 (Техническое задание).

Услуги:
1. Аудит ИТ и АСУ ТП: анализ рисков, архитектуры и документации.
2. Предпроектные работы и ТЭО: сбор данных, концепции решений.
3. Разработка ТЗ (ГОСТ 34.602): архитектура, сигналы, интеграции.
4. Рабочая документация и ПО: схемы, журналы, программирование ПЛК, HMI, SCADA.
5. Сопровождение СМР и ПНР: удаленная поддержка бригад, решение споров.
6. Ввод в эксплуатацию: программы испытаний, обучение персонала.
7. Сопровождение и развитие: инциденты, поэтапная автоматизация.

Формат работы:
- Удаленное взаимодействие: видео-встречи, цифровой обмен документами.
- Помогаем подрядчикам СМР не раздувать штат инженеров.

Инструкции:
- Отвечайте вежливо на русском языке.
- Используйте информацию из этой базы знаний в первую очередь.
- Если информации нет в базе знаний, используйте инструмент Google Search для поиска актуальных данных в интернете.
- Всегда упоминайте ссылки из результатов поиска, если используете внешние данные.
`;

const Assistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; text: string; sources?: any[] }[]>([
    { role: 'assistant', text: 'Здравствуйте! Я ваш инженерный ассистент Системотех. Чем я могу помочь вам сегодня?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isLoading, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      // Прямая инициализация согласно правилам SDK
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Формирование истории: Gemini ожидает 'user' и 'model'
      const history = messages.slice(1).map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      }));

      const chat = ai.chats.create({
        model: 'gemini-3-pro-preview',
        config: {
          systemInstruction: KNOWLEDGE_BASE,
          tools: [{ googleSearch: {} }],
        },
        history: history
      });

      const response = await chat.sendMessage({ message: userMessage });
      
      const assistantText = response.text || "Не удалось получить ответ от системы. Попробуйте перефразировать вопрос.";
      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const sources = groundingChunks.map((chunk: any) => chunk.web).filter(Boolean);

      setMessages(prev => [...prev, { 
        role: 'assistant', 
        text: assistantText,
        sources: sources.length > 0 ? sources : undefined
      }]);
    } catch (error: any) {
      console.error("AI Error:", error);
      let errorMessage = 'Ошибка соединения с ИИ-модулем. Убедитесь, что API ключ корректно добавлен в настройки Vercel.';
      
      if (error?.message?.includes('404')) {
        errorMessage = 'Модель временно недоступна. Попробуйте позже.';
      } else if (error?.message?.includes('429')) {
        errorMessage = 'Слишком много запросов. Пожалуйста, подождите минуту.';
      }

      setMessages(prev => [...prev, { role: 'assistant', text: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-inter">
      {/* Widget Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 text-white shadow-lg shadow-sky-500/30 transition-all hover:scale-110 active:scale-95 animate-glow"
          aria-label="Открыть чат"
        >
          <MessageSquare className="h-6 w-6" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-sky-500"></span>
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="flex h-[550px] w-[350px] sm:w-[400px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0b0f1a]/95 shadow-2xl backdrop-blur-2xl animate-scale-in origin-bottom-right">
          {/* Header */}
          <div className="flex items-center justify-between bg-gradient-to-r from-sky-500/20 to-indigo-600/20 p-4 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white tracking-tight">Ассистент Системотех</h3>
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[10px] uppercase text-emerald-400 font-semibold tracking-wider">Онлайн</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-2 text-white/50 hover:bg-white/5 hover:text-white transition-all"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                <div className={`flex max-w-[85%] items-start gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white ${msg.role === 'user' ? 'bg-indigo-600 shadow-md shadow-indigo-500/20' : 'bg-sky-500/20 border border-sky-500/30 text-sky-400'}`}>
                    {msg.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </div>
                  <div className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-indigo-600 text-white rounded-tr-none shadow-lg' 
                      : 'bg-white/5 border border-white/10 text-slate-200 rounded-tl-none'
                  }`}>
                    {msg.text}
                    
                    {msg.sources && msg.sources.length > 0 && (
                      <div className="mt-3 pt-2 border-t border-white/10">
                        <p className="text-[10px] text-white/40 mb-2 flex items-center gap-1">
                          <Globe className="h-3 w-3" /> Найдено в сети:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {msg.sources.map((source: any, sIdx: number) => (
                            <a 
                              key={sIdx} 
                              href={source.uri} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-[10px] px-2 py-1 rounded bg-white/5 border border-white/5 text-sky-400 hover:bg-sky-500 hover:text-white transition-all truncate max-w-[140px]"
                            >
                              {source.title || 'Источник'}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2.5 rounded-2xl bg-white/5 border border-white/10 px-4 py-2 text-sm text-slate-400">
                  <Loader2 className="h-4 w-4 animate-spin text-sky-400" />
                  Инженер анализирует...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white/[0.02] border-t border-white/5">
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ваш вопрос по АСУ ТП..."
                className="w-full rounded-xl bg-[#0b0f1a] border border-white/10 py-3 pl-4 pr-12 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all shadow-inner"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="absolute right-2 p-2 text-sky-500 hover:text-sky-400 disabled:text-white/10 transition-colors"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-2 text-[10px] text-center text-white/20">
              База знаний Системотех + Поиск Google
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Assistant;