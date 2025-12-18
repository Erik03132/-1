import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Bot, Loader2, Globe, Trash2, AlertCircle, Key, ExternalLink, ShieldCheck, Zap, MessageSquare } from 'lucide-react';
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
Вы — "Системотех ИИ", лаконичный инженерный ассистент.
ВАША ЦЕЛЬ: Давать краткие ответы (1-3 предложения) по теме АСУ ТП и автоматизации.

КРИТИЧЕСКИЕ ПРАВИЛА:
1. НИКАКИХ СПЕЦСИМВОЛОВ: Категорически запрещено использовать звездочки (*), двойные звездочки (**), решетки (#) или подчеркивания (_) для оформления. Ваш ответ должен быть чистым текстом без Markdown.
2. КРАТКОСТЬ: Только суть. Без вводных фраз "Как эксперт..." или "Я могу помочь...".
3. ПОИСК: Используйте поиск для актуальных цен и ГОСТов.
4. ЯЗЫК: Русский.
`;

const Assistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasKey, setHasKey] = useState<boolean>(true);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; text: string; sources?: {uri: string, title: string}[] }[]>([
    { 
      role: 'assistant', 
      text: 'Инженерный офис Системотех. Напишите ваш технический вопрос.' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const checkKeyStatus = async () => {
    if (window.aistudio) {
      const selected = await window.aistudio.hasSelectedApiKey();
      setHasKey(selected || !!process.env.API_KEY);
    } else {
      setHasKey(!!process.env.API_KEY);
    }
  };

  useEffect(() => {
    if (isOpen) checkKeyStatus();
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSelectKey = async () => {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      // Согласно правилам, предполагаем успех сразу после вызова окна
      setHasKey(true);
      setError(null);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput('');
    setError(null);

    const history = [...messages, { role: 'user' as const, text: userText }];
    setMessages(history);
    setIsLoading(true);
    setMessages(prev => [...prev, { role: 'assistant', text: '' }]);

    try {
      // Всегда создаем новый экземпляр перед запросом для актуального ключа
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const responseStream = await ai.models.generateContentStream({
        model: 'gemini-3-flash-preview',
        contents: history.map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.text }]
        })),
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          tools: [{ googleSearch: {} }],
          thinkingConfig: { thinkingBudget: 0 }
        },
      });

      let fullResponseText = "";
      let groundingMetadata: any = null;

      for await (const chunk of responseStream) {
        const chunkRes = chunk as GenerateContentResponse;
        const rawText = chunkRes.text || "";
        fullResponseText += rawText.replace(/\*/g, '');
        
        if (chunkRes.candidates?.[0]?.groundingMetadata) {
          groundingMetadata = chunkRes.candidates[0].groundingMetadata;
        }

        setMessages(prev => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          if (last && last.role === 'assistant') {
            last.text = fullResponseText;
          }
          return updated;
        });
      }

      if (groundingMetadata?.groundingChunks) {
        const sources = groundingMetadata.groundingChunks
          .map((c: any) => c.web)
          .filter(Boolean)
          .map((s: any) => ({ uri: s.uri, title: s.title }));

        if (sources.length > 0) {
          setMessages(prev => {
            const updated = [...prev];
            const last = updated[updated.length - 1];
            if (last) last.sources = sources;
            return updated;
          });
        }
      }

    } catch (err: any) {
      console.error("API Error:", err);
      const msg = err.message || "";
      
      // Если сущность не найдена — значит ключ не подходит для этой модели
      if (msg.includes("Requested entity was not found") || msg.includes("404") || msg.includes("API_KEY") || msg.includes("401")) {
        setHasKey(false);
        setError("Текущий ключ не имеет доступа к модели. Пожалуйста, выберите ключ из ПЛАТНОГО проекта Google Cloud.");
      } else {
        setError("Ошибка сети или превышено время ожидания. Попробуйте снова.");
      }
      
      setMessages(prev => prev.filter((m, i) => !(m.role === 'assistant' && m.text === "" && i === prev.length - 1)));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-inter">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 text-white shadow-[0_0_40px_rgba(56,189,248,0.4)] hover:scale-110 active:scale-95 transition-all animate-glow group border-2 border-white/20"
        >
          <Bot className="h-8 w-8 transition-transform group-hover:rotate-12" />
        </button>
      ) : (
        <div className="flex h-[580px] w-[360px] sm:w-[420px] flex-col overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0b0f1a]/95 shadow-2xl backdrop-blur-3xl animate-scale-in origin-bottom-right">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 bg-white/5 p-5">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-500/20 border border-sky-500/30">
                  <Zap className="h-6 w-6 text-sky-400" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-[#0b0f1a] bg-emerald-500 animate-pulse" />
              </div>
              <div>
                <h3 className="text-[13px] font-bold text-white uppercase tracking-wider leading-none">Системотех ИИ</h3>
                <span className="text-[10px] text-emerald-400 font-semibold tracking-wide">Live • Pay-as-you-go</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setMessages([{ role: 'assistant', text: 'История очищена.' }])}
                className="p-2 text-white/30 hover:text-white transition-colors"
                title="Очистить"
              >
                <Trash2 className="h-4 w-4" />
              </button>
              <button onClick={() => setIsOpen(false)} className="p-2 text-white/30 hover:text-white transition-colors">
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          {!hasKey ? (
            <div className="flex flex-1 flex-col items-center justify-center p-10 text-center">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-amber-500/10 border border-amber-500/20">
                <Key className="h-10 w-10 text-amber-400" />
              </div>
              <h4 className="text-white font-bold text-lg mb-2">Требуется платный ключ</h4>
              <p className="text-sm text-white/50 mb-6 leading-relaxed">Для работы Gemini 3 Flash на внешних сайтах необходим ключ из проекта с включенным биллингом.</p>
              
              <button 
                onClick={handleSelectKey}
                className="w-full rounded-2xl bg-sky-600 py-4 font-bold text-white shadow-xl shadow-sky-600/30 hover:bg-sky-500 transition-all active:scale-95 mb-4"
              >
                Выбрать Ключ (GCP)
              </button>

              <div className="flex flex-col gap-2">
                <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="text-[11px] text-sky-400 hover:underline flex items-center justify-center gap-1">
                  Инструкция по настройке биллинга <ExternalLink className="h-3 w-3" />
                </a>
                <p className="text-[10px] text-white/20 italic">После выбора ключа ассистент станет доступен мгновенно.</p>
              </div>
            </div>
          ) : (
            <>
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-5 space-y-5 scrollbar-thin scrollbar-thumb-white/10">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                    <div className={`max-w-[88%] rounded-2xl p-4 text-[13.5px] leading-relaxed shadow-sm ${
                      m.role === 'user' 
                        ? 'bg-sky-600 text-white rounded-tr-none border border-sky-400/30' 
                        : 'bg-white/5 text-slate-100 border border-white/10 rounded-tl-none'
                    }`}>
                      <div className="whitespace-pre-wrap">{m.text}</div>
                      
                      {m.sources && m.sources.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-white/10">
                          <p className="text-[9px] text-white/40 mb-2 flex items-center gap-1.5 uppercase font-bold tracking-widest">
                            <Globe className="h-3 w-3" /> Источники:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {m.sources.map((s, si) => (
                              <a key={si} href={s.uri} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 rounded-lg bg-sky-500/5 px-2.5 py-1.5 text-[10px] text-sky-400 border border-sky-500/10 hover:bg-sky-500/20 transition-all">
                                <span className="truncate max-w-[120px]">{s.title || 'Подробнее'}</span>
                                <ExternalLink className="h-2.5 w-2.5 shrink-0" />
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && messages[messages.length - 1].text === "" && (
                  <div className="flex items-center gap-2.5 text-[11px] text-sky-400 font-medium animate-pulse bg-sky-500/10 w-fit p-3 rounded-2xl border border-sky-500/20">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span>Поиск и анализ...</span>
                  </div>
                )}
                {error && (
                  <div className="flex flex-col gap-3 rounded-2xl bg-rose-500/10 p-4 text-[11px] text-rose-400 border border-rose-500/20 shadow-lg">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="h-5 w-5 shrink-0" />
                      <span>{error}</span>
                    </div>
                    <button 
                      onClick={handleSelectKey}
                      className="text-white bg-rose-600/40 hover:bg-rose-600 px-3 py-1.5 rounded-lg transition-colors w-fit font-bold"
                    >
                      Сменить API ключ
                    </button>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-white/10 bg-white/5 p-5">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Технический вопрос..."
                    className="w-full rounded-2xl border border-white/10 bg-[#0b0f1a] py-4.5 pl-5 pr-14 text-sm text-white focus:border-sky-500/50 focus:outline-none focus:ring-4 focus:ring-sky-500/10 placeholder:text-white/20 transition-all shadow-inner"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    className="absolute right-2 rounded-xl bg-sky-600 p-2.5 text-white hover:bg-sky-500 disabled:opacity-20 transition-all active:scale-90 shadow-lg"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
                <div className="mt-4 flex items-center justify-center gap-6">
                   <div className="flex items-center gap-1.5 text-[9px] text-white/20 uppercase font-bold tracking-tighter">
                      <ShieldCheck className="h-3 w-3" /> Инженерный чат
                   </div>
                   <div className="flex items-center gap-1.5 text-[9px] text-white/20 uppercase font-bold tracking-tighter">
                      <MessageSquare className="h-3 w-3" /> Без Markdown
                   </div>
                   <div className="flex items-center gap-1.5 text-[9px] text-white/20 uppercase font-bold tracking-tighter">
                      <Zap className="h-3 w-3" /> Flash Speed
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