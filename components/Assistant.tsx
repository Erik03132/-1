import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, User, Loader2, Globe, Trash2, AlertCircle } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// Версия компонента: 2.1.0 (Стабильный поиск и история)
const KNOWLEDGE_BASE = `
Вы — официальный ИИ-ассистент инженерного офиса "Системотех". 
Специализация: АСУ ТП, аудит, проектирование, программирование ПЛК/SCADA.

Контекст:
- "Системотех" работает удаленно по всей России.
- Помогаем подрядчикам СМР закрывать инженерные разделы.
- Фокус: малые и средние объекты (до 100 точек), импортозамещение.

Инструкции:
1. Используй Google Search для поиска актуальных данных, если в базе знаний нет ответа.
2. Всегда давай ссылки на источники из поисковой выдачи.
3. Отвечай технически грамотно, вежливо, на русском языке.
`;

const Assistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; text: string; sources?: any[] }[]>([
    { role: 'assistant', text: 'Инженерный офис Системотех на связи. Как я могу помочь в вашем проекте?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isLoading, isOpen]);

  const clearChat = () => {
    setMessages([{ role: 'assistant', text: 'Чат очищен. Готов к новым вопросам!' }]);
    setErrorStatus(null);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setErrorStatus(null);
    
    // Добавляем сообщение пользователя в UI
    const updatedMessages = [...messages, { role: 'user' as const, text: userMessage }];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const apiKey = process.env.API_KEY;
      
      if (!apiKey) {
        throw new Error("API_KEY не обнаружен. Убедитесь, что переменная добавлена в Vercel Settings -> Environment Variables и сделан RE-DEPLOY.");
      }

      const ai = new GoogleGenAI({ apiKey });
      
      /**
       * Формируем массив contents для generateContent.
       * История должна начинаться с 'user' и чередоваться: user, model, user...
       */
      const historyForAPI = updatedMessages
        .filter((m, i) => !(i === 0 && m.role === 'assistant')) // Пропускаем начальное приветствие ассистента
        .map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.text }]
        }));

      // Используем прямой вызов generateContent для стабильной работы инструментов поиска
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: historyForAPI,
        config: {
          systemInstruction: KNOWLEDGE_BASE,
          tools: [{ googleSearch: {} }],
        },
      });

      const assistantText = response.text || "Извините, не удалось получить текстовый ответ от системы.";
      
      // Извлекаем ссылки из данных заземления (Google Search)
      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const sources = groundingChunks.map((chunk: any) => chunk.web).filter(Boolean);

      setMessages(prev => [...prev, { 
        role: 'assistant', 
        text: assistantText,
        sources: sources.length > 0 ? sources : undefined
      }]);
    } catch (error: any) {
      console.error("Assistant API Error:", error);
      const errorMessage = error?.message || "Неизвестная ошибка связи с ИИ.";
      setErrorStatus(errorMessage);
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        text: `Ошибка: ${errorMessage.includes('API Key') ? 'Проблема с API ключом в настройках Vercel.' : 'Не удалось выполнить запрос.'}` 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-inter">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 text-white shadow-xl hover:scale-110 active:scale-95 transition-all animate-glow"
        >
          <MessageSquare className="h-6 w-6" />
        </button>
      )}

      {isOpen && (
        <div className="flex h-[600px] w-[350px] sm:w-[420px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0b0f1a]/95 shadow-2xl backdrop-blur-2xl animate-scale-in origin-bottom-right">
          {/* Header */}
          <div className="flex items-center justify-between bg-white/5 p-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-sky-500/10 rounded-xl">
                <Bot className="h-5 w-5 text-sky-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white leading-none">Системотех ИИ</h3>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1 mt-1">
                  <span className="h-1 w-1 rounded-full bg-emerald-400 animate-pulse" /> онлайн
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button 
                onClick={clearChat}
                title="Очистить историю"
                className="p-2 text-white/30 hover:text-rose-400 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
              <button 
                onClick={() => setIsOpen(false)} 
                className="p-2 text-white/30 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                <div className={`flex max-w-[90%] gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-sky-600 text-white rounded-tr-none' 
                      : 'bg-white/5 text-slate-200 border border-white/10 rounded-tl-none'
                  }`}>
                    {msg.text}
                    {msg.sources && (
                      <div className="mt-3 pt-2 border-t border-white/5">
                        <p className="text-[10px] text-white/30 mb-2 flex items-center gap-1">
                          <Globe className="h-3 w-3" /> Источники из сети:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {msg.sources.map((s: any, i: number) => (
                            <a key={i} href={s.uri} target="_blank" rel="noreferrer" className="text-[10px] px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20 hover:bg-sky-500 hover:text-white transition-all">
                              {s.title || 'Источник'}
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
              <div className="flex items-center gap-2 text-slate-400 text-xs p-2 animate-pulse">
                <Loader2 className="h-3 w-3 animate-spin text-sky-400" /> Формируем ответ...
              </div>
            )}
            {errorStatus && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] leading-tight break-words">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <p>Системная ошибка: {errorStatus}</p>
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
                placeholder="Задайте технический вопрос..."
                className="w-full rounded-xl bg-white/5 border border-white/10 py-3 pl-4 pr-12 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-all"
              />
              <button 
                onClick={handleSend} 
                disabled={!input.trim() || isLoading} 
                className="absolute right-2 p-2 text-sky-500 hover:text-sky-400 disabled:text-white/10 transition-colors"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-2 text-[9px] text-center text-white/20 uppercase tracking-widest">
              Системотех • Powered by Gemini 3 Flash
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Assistant;