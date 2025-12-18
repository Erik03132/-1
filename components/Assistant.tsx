
import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Bot, Loader2, Globe, Trash2, AlertCircle, Key, ExternalLink, ShieldCheck, Zap, RefreshCcw, MessageSquare } from 'lucide-react';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }
  interface Window {
    aistudio?: AIStudio;
  }
}

const SYSTEM_INSTRUCTION = `
Вы — "Системотех ИИ", экспертный инженерный ассистент компании "Системотех".
Ваша специализация: Промышленная автоматизация (АСУ ТП), проектирование по ГОСТ (34.602, 19.xxx, 21.xxx), импортозамещение.
ЦЕЛЬ: Предоставлять точные, профессиональные ответы инженерам.
ПРАВИЛА:
1. Не используйте Markdown-разметку (никаких *, **, #). Только чистый текст.
2. Если вопрос касается стандартов, ссылайтесь на конкретные номера ГОСТ.
3. Будьте лаконичны.
`;

const Assistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasKey, setHasKey] = useState<boolean>(true);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; text: string; sources?: {uri: string, title: string}[] }[]>([
    { 
      role: 'assistant', 
      text: 'Инженерный ассистент Системотех готов к работе. Чем я могу помочь в области АСУ ТП?' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const checkKey = async () => {
    if (window.aistudio) {
      const selected = await window.aistudio.hasSelectedApiKey();
      setHasKey(selected);
    }
  };

  useEffect(() => {
    if (isOpen) checkKey();
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleOpenKeyDialog = async () => {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      // Согласно правилам, предполагаем успех сразу после открытия диалога
      setHasKey(true);
      setError(null);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput('');
    setError(null);

    const newMessages = [...messages, { role: 'user' as const, text: userText }];
    setMessages(newMessages);
    setIsLoading(true);
    
    setMessages(prev => [...prev, { role: 'assistant', text: '' }]);

    try {
      // Создаем экземпляр прямо перед вызовом для актуальности ключа
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: newMessages.map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.text }]
        })),
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          tools: [{ googleSearch: {} }],
        },
      });

      const rawText = response.text || "Не удалось получить ответ от системы.";
      // Очистка от markdown для соответствия системной инструкции
      const cleanText = rawText.replace(/[*#_~`]/g, '');
      
      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      let sources: {uri: string, title: string}[] = [];
      if (groundingChunks) {
        sources = groundingChunks
          .map((chunk: any) => chunk.web)
          .filter(Boolean)
          .map((web: any) => ({ uri: web.uri, title: web.title }));
      }

      setMessages(prev => {
        const updated = [...prev];
        const lastIndex = updated.length - 1;
        if (updated[lastIndex].role === 'assistant') {
          updated[lastIndex] = { role: 'assistant', text: cleanText, sources };
        }
        return updated;
      });

    } catch (err: any) {
      console.error("AI Assistant Detailed Error:", err);
      const msg = (err.message || err.toString()).toLowerCase();
      
      // Расширенная проверка на ошибки доступа и платного режима
      const isAccessError = 
        msg.includes("not found") || 
        msg.includes("404") || 
        msg.includes("403") || 
        msg.includes("permission") || 
        msg.includes("billing") || 
        msg.includes("api key");

      if (isAccessError) {
        setHasKey(false);
        setError("Модель Gemini 3 Flash недоступна. Вероятно, ваш API ключ не привязан к платному аккаунту Google Cloud (Pay-as-you-go). Пожалуйста, выберите ключ от платного проекта.");
      } else if (msg.includes("quota") || msg.includes("429")) {
        setError("Превышены лимиты запросов. Попробуйте через минуту.");
      } else {
        setError("Произошла техническая ошибка. Возможно, выбранный API ключ не поддерживает Gemini 3. Попробуйте сменить ключ.");
      }
      
      // Удаляем пустую карточку ассистента
      setMessages(prev => prev.filter((m, i) => !(m.role === 'assistant' && m.text === "" && i === prev.length - 1)));
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([{ role: 'assistant', text: 'Чат очищен. Готов к новым вопросам.' }]);
    setError(null);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-inter">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 text-white shadow-2xl hover:scale-110 active:scale-95 transition-all border-2 border-white/20 group"
        >
          <Bot className="h-8 w-8 group-hover:rotate-12 transition-transform" />
        </button>
      ) : (
        <div className="flex h-[620px] w-[380px] sm:w-[460px] flex-col overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0b0f1a]/95 shadow-2xl backdrop-blur-3xl animate-scale-in origin-bottom-right">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 bg-white/5 p-5">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/20 border border-sky-500/30">
                  <Zap className="h-6 w-6 text-sky-400" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-[#0b0f1a] bg-emerald-500" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider leading-none">Системотех ИИ</h3>
                <span className="text-[10px] text-emerald-400/80 font-bold uppercase">Online Support</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={clearChat} className="p-2.5 text-white/30 hover:text-rose-400 transition-colors rounded-xl">
                <Trash2 className="h-4 w-4" />
              </button>
              <button onClick={() => setIsOpen(false)} className="p-2.5 text-white/30 hover:text-white transition-colors rounded-xl">
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {!hasKey ? (
            <div className="flex flex-1 flex-col items-center justify-center p-10 text-center bg-grid-pattern">
              <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-amber-500/10 border border-amber-500/20">
                <Key className="h-10 w-10 text-amber-400" />
              </div>
              <h4 className="text-white font-bold text-xl mb-3">Ошибка доступа</h4>
              <p className="text-sm text-white/50 mb-8 leading-relaxed">
                Для работы Gemini 3 требуется API ключ от платного проекта Google Cloud (с включенным биллингом). Бесплатные ключи часто блокируют доступ к новым моделям.
              </p>
              
              <button 
                onClick={handleOpenKeyDialog}
                className="w-full rounded-2xl bg-sky-600 py-4 font-bold text-white shadow-xl shadow-sky-600/20 hover:bg-sky-500 transition-all active:scale-95 mb-4"
              >
                Выбрать платный API Ключ
              </button>

              <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="text-[11px] text-sky-400 hover:underline flex items-center justify-center gap-1.5">
                О биллинге в Gemini API <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-5 space-y-5 scrollbar-thin">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}>
                    <div className={`max-w-[85%] rounded-[1.5rem] p-5 text-[13px] leading-relaxed ${
                      m.role === 'user' 
                        ? 'bg-sky-600 text-white rounded-tr-none' 
                        : 'bg-white/5 text-slate-200 border border-white/10 rounded-tl-none'
                    }`}>
                      <div className="whitespace-pre-wrap">{m.text}</div>
                      {m.sources && m.sources.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-white/5">
                          <p className="text-[9px] text-white/40 mb-3 uppercase font-bold tracking-widest flex items-center gap-2">
                            <Globe className="h-3 w-3" /> Источники
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {m.sources.map((s, si) => (
                              <a key={si} href={s.uri} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-lg bg-white/5 px-2.5 py-1.5 text-[10px] text-sky-300 border border-white/5 hover:bg-white/10 transition-all">
                                <span className="truncate max-w-[120px]">{s.title || 'Ссылка'}</span>
                                <ExternalLink className="h-2.5 w-2.5" />
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && messages[messages.length - 1].text === "" && (
                  <div className="flex items-center gap-3 text-[11px] text-sky-400 font-bold bg-sky-500/5 w-fit p-4 rounded-2xl border border-sky-500/10 animate-pulse">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Инженерный анализ...</span>
                  </div>
                )}
                {error && (
                  <div className="rounded-2xl bg-rose-500/10 p-5 text-[12px] text-rose-400 border border-rose-500/20">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 mt-0.5 shrink-0" />
                      <div className="space-y-3">
                        <p className="font-medium">{error}</p>
                        <button 
                          onClick={handleOpenKeyDialog}
                          className="flex items-center gap-2 text-white bg-rose-500/30 hover:bg-rose-500/50 px-4 py-2 rounded-xl transition-all font-bold text-[10px] uppercase tracking-wider"
                        >
                          <RefreshCcw className="h-3 w-3" /> Сменить Ключ
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="border-t border-white/10 bg-white/5 p-5">
                <div className="relative flex items-center group">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ваш технический вопрос..."
                    className="w-full rounded-2xl border border-white/10 bg-[#0b0f1a] py-4 pl-5 pr-14 text-[13px] text-white focus:border-sky-500/50 focus:outline-none placeholder:text-white/20 transition-all"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    className="absolute right-2 rounded-xl bg-sky-600 p-2.5 text-white hover:bg-sky-500 disabled:opacity-20 transition-all"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
                <div className="mt-4 flex items-center justify-between px-1 opacity-40">
                   <div className="flex items-center gap-2 text-[9px] text-white uppercase font-black tracking-widest">
                      <ShieldCheck className="h-3 w-3" /> ГОСТ Стандарт
                   </div>
                   <div className="flex items-center gap-2 text-[9px] text-white uppercase font-black tracking-widest">
                      <MessageSquare className="h-3 w-3" /> Real-time
                   </div>
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
