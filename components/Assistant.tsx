import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, Loader2, Globe, Trash2, AlertCircle, Key, ExternalLink } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// Removed conflicting global declaration for window.aistudio as it is already defined in the environment.

const KNOWLEDGE_BASE = `
Вы — официальный ИИ-ассистент инженерного офиса "Системотех". 
Специализация: АСУ ТП, аудит, проектирование, программирование ПЛК/SCADA.
Отвечай технически грамотно, вежливо, на русском языке.
Используй Google Search для проверки актуальных норм ГОСТ и оборудования.
`;

const Assistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasKey, setHasKey] = useState<boolean>(true); // Предполагаем наличие, проверим при открытии
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; text: string; sources?: any[] }[]>([
    { role: 'assistant', text: 'Инженерный офис Системотех на связи. Чем могу помочь?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const checkApiKey = async () => {
    // Accessing aistudio from the environment
    const aiStudio = (window as any).aistudio;
    if (aiStudio) {
      const selected = await aiStudio.hasSelectedApiKey();
      setHasKey(selected);
    }
  };

  useEffect(() => {
    if (isOpen) {
      checkApiKey();
      scrollToBottom();
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectKey = async () => {
    const aiStudio = (window as any).aistudio;
    if (aiStudio) {
      await aiStudio.openSelectKey();
      // Assume success after triggering the selection dialog
      setHasKey(true);
      setErrorStatus(null);
    }
  };

  const clearChat = () => {
    setMessages([{ role: 'assistant', text: 'Чат очищен. Жду ваших вопросов по АСУ ТП.' }]);
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
      // Create a new GoogleGenAI instance right before making an API call to ensure it uses the latest key
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const historyForAPI = updatedMessages
        .filter((m, i) => !(i === 0 && m.role === 'assistant'))
        .map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.text }]
        }));

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: historyForAPI,
        config: {
          systemInstruction: KNOWLEDGE_BASE,
          tools: [{ googleSearch: {} }],
        },
      });

      const assistantText = response.text || "Не удалось получить ответ.";
      
      // Extract grounding chunks for Google Search sources
      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const sources = groundingChunks.map((chunk: any) => chunk.web).filter(Boolean);

      setMessages(prev => [...prev, { 
        role: 'assistant', 
        text: assistantText,
        sources: sources.length > 0 ? sources : undefined
      }]);
    } catch (error: any) {
      console.error("API Error:", error);
      const msg = error?.message || "";
      
      // Handle missing key or invalid key errors by prompting selection
      if (msg.includes("Requested entity was not found") || msg.includes("API Key")) {
        setHasKey(false);
        setErrorStatus("Требуется настройка API ключа.");
      } else {
        setErrorStatus(msg);
      }
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        text: "Произошла ошибка при обращении к ИИ. Попробуйте проверить настройки подключения." 
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
          className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 text-white shadow-xl hover:scale-110 transition-all animate-glow"
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
              <button onClick={clearChat} className="p-2 text-white/30 hover:text-rose-400 transition-colors">
                <Trash2 className="h-4 w-4" />
              </button>
              <button onClick={() => setIsOpen(false)} className="p-2 text-white/30 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {!hasKey ? (
            /* Key Selection State */
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-6">
              <div className="p-4 bg-amber-500/10 rounded-full">
                <Key className="h-10 w-10 text-amber-400" />
              </div>
              <div className="space-y-2">
                <h4 className="text-white font-semibold">Требуется активация ИИ</h4>
                <p className="text-sm text-white/50">
                  Для работы ассистента необходимо подключить ваш персональный API ключ.
                </p>
              </div>
              <button
                onClick={handleSelectKey}
                className="w-full py-3 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-medium transition-all shadow-lg shadow-sky-600/20"
              >
                Подключить Gemini API
              </button>
              <a 
                href="https://ai.google.dev/gemini-api/docs/billing" 
                target="_blank" 
                rel="noreferrer"
                className="text-[11px] text-sky-400 flex items-center gap-1 hover:underline"
              >
                Документация по биллингу <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          ) : (
            /* Standard Chat State */
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                    <div className={`p-3 rounded-2xl text-sm leading-relaxed max-w-[85%] ${
                      msg.role === 'user' ? 'bg-sky-600 text-white rounded-tr-none' : 'bg-white/5 text-slate-200 border border-white/10 rounded-tl-none'
                    }`}>
                      {msg.text}
                      {msg.sources && (
                        <div className="mt-3 pt-2 border-t border-white/5 flex flex-wrap gap-1">
                          {msg.sources.map((s, i) => (
                            <a key={i} href={s.uri} target="_blank" rel="noreferrer" className="text-[10px] px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20 hover:bg-sky-500 hover:text-white transition-all">
                              {s.title || 'Источник'}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-center gap-2 text-slate-400 text-xs p-2">
                    <Loader2 className="h-3 w-3 animate-spin text-sky-400" /> Ищем лучшее решение...
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

              <div className="p-4 border-t border-white/5">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ваш вопрос..."
                    className="w-full rounded-xl bg-white/5 border border-white/10 py-3 pl-4 pr-12 text-sm text-white focus:outline-none focus:ring-1 focus:ring-sky-500 transition-all"
                  />
                  <button onClick={handleSend} disabled={!input.trim() || isLoading} className="absolute right-2 p-2 text-sky-500 disabled:text-white/10">
                    <Send className="h-5 w-5" />
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