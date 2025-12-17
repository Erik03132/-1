
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, Loader2, Globe, Trash2, AlertCircle, Key, ExternalLink, ShieldCheck, Info } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }

  interface Window {
    // Added optional modifier to match existing global property definition
    aistudio?: AIStudio;
  }
}

const KNOWLEDGE_BASE = `
Вы — ведущий экспертный ИИ-ассистент инженерного офиса "Системотех". 
Ваша специализация: промышленная автоматизация (АСУ ТП), проектирование систем управления, программирование ПЛК (S7-1200/1500, ОВЕН, Segnetics), SCADA-системы и аудит безопасности.

ПРАВИЛА ОТВЕТОВ:
1. Формат: Технически точный, структурированный, лаконичный. Используйте списки и выделение жирным.
2. Поиск: ОБЯЗАТЕЛЬНО используйте Google Search для проверки актуальных версий ГОСТ и подбора современных аналогов оборудования.
3. Язык: Строго русский.
4. Этикета: Вежливость, профессионализм. Вы — часть команды "Системотех".
`;

const Assistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasKey, setHasKey] = useState<boolean>(true); 
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; text: string; sources?: any[] }[]>([
    { 
      role: 'assistant', 
      text: 'Инженерный офис "Системотех" приветствует вас. Биллинг подтвержден, поиск по ГОСТ и базам оборудования активен. Какой узел автоматизации обсудим?' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const checkApiKey = async () => {
    try {
      if (window.aistudio) {
        const selected = await window.aistudio.hasSelectedApiKey();
        setHasKey(selected);
      } else {
        setHasKey(!!process.env.API_KEY);
      }
    } catch (e) {
      console.error("Ошибка проверки ключа:", e);
    }
  };

  useEffect(() => {
    if (isOpen) {
      checkApiKey();
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectKey = async () => {
    if (window.aistudio) {
      try {
        await window.aistudio.openSelectKey();
        // После вызова диалога считаем выбор успешным, чтобы пользователь мог продолжить
        setHasKey(true);
        setErrorStatus(null);
      } catch (e) {
        console.error("Ошибка открытия выбора ключа:", e);
      }
    }
  };

  const clearChat = () => {
    setMessages([{ 
      role: 'assistant', 
      text: 'Сессия перезапущена. Я готов к расчету архитектуры или аудиту вашей документации.' 
    }]);
    setErrorStatus(null);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setErrorStatus(null);
    
    const updatedMessages = [...messages, { role: 'user' as const, text: userMessage }];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      // Всегда создаем новый экземпляр перед запросом, чтобы использовать актуальный ключ
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const historyForAPI = updatedMessages
        .filter((m, i) => !(i === 0 && m.role === 'assistant'))
        .map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.text }]
        }));

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: historyForAPI,
        config: {
          systemInstruction: KNOWLEDGE_BASE,
          tools: [{ googleSearch: {} }],
        },
      });

      const assistantText = response.text || "Не удалось сформировать ответ. Проверьте настройки API.";
      
      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const sources = groundingChunks.map((chunk: any) => chunk.web).filter(Boolean);

      setMessages(prev => [...prev, { 
        role: 'assistant', 
        text: assistantText,
        sources: sources.length > 0 ? sources : undefined
      }]);
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      const msg = error?.message || "";
      
      if (msg.includes("Requested entity was not found") || msg.includes("API Key") || msg.includes("invalid")) {
        setHasKey(false);
        setErrorStatus("Ошибка авторизации. Пожалуйста, выберите ключ заново.");
      } else {
        setErrorStatus(`Ошибка: ${msg}`);
      }
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        text: "Произошла ошибка связи. Убедитесь, что ваш API ключ привязан к проекту с включенной оплатой (Billing)." 
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
          <Bot className="h-6 w-6" />
        </button>
      )}

      {isOpen && (
        <div className="flex h-[620px] w-[360px] sm:w-[450px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0b0f1a]/98 shadow-2xl backdrop-blur-3xl animate-scale-in origin-bottom-right">
          {/* Header */}
          <div className="flex items-center justify-between bg-white/5 p-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-sky-500/20 rounded-xl border border-sky-500/30">
                <ShieldCheck className="h-5 w-5 text-sky-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white leading-none">Системотех Эксперт</h3>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] text-emerald-400 font-medium uppercase tracking-wider">G3 PRO • СЕРВИС АКТИВЕН</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={clearChat} title="Очистить сессию" className="p-2 text-white/30 hover:text-rose-400 transition-colors">
                <Trash2 className="h-4 w-4" />
              </button>
              <button onClick={() => setIsOpen(false)} className="p-2 text-white/30 hover:text-white transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {!hasKey ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="p-5 bg-amber-500/10 rounded-full border border-amber-500/20 mb-6">
                <Key className="h-10 w-10 text-amber-400" />
              </div>
              <h4 className="text-white font-semibold text-lg mb-2">Настройка доступа</h4>
              <p className="text-sm text-white/50 leading-relaxed mb-8">
                Для активации поиска по ГОСТ и использования модели Pro, необходимо выбрать API ключ, привязанный к вашему платному проекту в Google Cloud.
              </p>
              
              <button
                onClick={handleSelectKey}
                className="w-full py-4 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-sky-600/20 active:scale-95 mb-6"
              >
                Выбрать Ключ
              </button>

              <div className="w-full space-y-3 pt-4 border-t border-white/5">
                <a 
                  href="https://aistudio.google.com/app/apikey" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 text-[11px] text-sky-400 hover:text-sky-300 transition-colors"
                >
                  <ExternalLink className="h-3 w-3" /> Создать ключ в AI Studio
                </a>
                <a 
                  href="https://ai.google.dev/gemini-api/docs/billing" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 text-[11px] text-white/30 hover:text-white/50 transition-colors"
                >
                  <Info className="h-3 w-3" /> Документация по биллингу
                </a>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-5 space-y-5 scrollbar-thin scrollbar-thumb-white/10">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                    <div className={`p-4 rounded-2xl text-[13px] leading-relaxed max-w-[90%] shadow-sm ${
                      msg.role === 'user' 
                        ? 'bg-sky-600 text-white rounded-tr-none' 
                        : 'bg-white/5 text-slate-200 border border-white/10 rounded-tl-none'
                    }`}>
                      <div className="whitespace-pre-wrap">{msg.text}</div>
                      {msg.sources && (
                        <div className="mt-4 pt-3 border-t border-white/5">
                          <p className="text-[9px] text-white/40 mb-2 flex items-center gap-1 uppercase font-bold tracking-widest">
                            <Globe className="h-3 w-3" /> Источники данных:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {msg.sources.map((s, i) => (
                              <a 
                                key={i} 
                                href={s.uri} 
                                target="_blank" 
                                rel="noreferrer" 
                                className="text-[9px] px-2 py-1 rounded-md bg-white/5 text-sky-400 border border-white/10 hover:bg-sky-500/20 hover:text-white transition-all flex items-center gap-1"
                              >
                                {s.title?.substring(0, 30) || 'Ссылка'}...
                                <ExternalLink className="h-2 w-2" />
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-center gap-3 text-slate-400 text-[11px] p-2 bg-white/5 rounded-xl border border-white/5 animate-pulse">
                    <Loader2 className="h-3 w-3 animate-spin text-sky-400" /> 
                    <span>ИИ анализирует сеть и стандарты...</span>
                  </div>
                )}
                {errorStatus && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px]">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <p>{errorStatus}</p>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-4 bg-white/[0.03] border-t border-white/10">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Запрос по АСУ ТП или ГОСТ..."
                    className="w-full rounded-2xl bg-[#0b0f1a] border border-white/10 py-4 pl-5 pr-14 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50 placeholder:text-white/20 transition-all shadow-inner"
                  />
                  <button 
                    onClick={handleSend} 
                    disabled={!input.trim() || isLoading} 
                    className="absolute right-3 p-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl disabled:bg-white/5 disabled:text-white/10 transition-all shadow-lg active:scale-95"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Assistant;
