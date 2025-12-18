
import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Bot, Loader2, Globe, Trash2, AlertCircle, Key, ExternalLink, ShieldCheck, Zap, MessageSquare, RefreshCcw } from 'lucide-react';
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
Вы — "Системотех ИИ", инженерный ассистент по промышленной автоматизации.
ЦЕЛЬ: Краткие, технически точные ответы (1-3 предложения) без Markdown-оформления.
ПРАВИЛА:
1. Запрещено использовать *, **, #, _ и другие символы разметки. Только чистый текст.
2. Фокус на АСУ ТП, ГОСТ, ПЛК, SCADA и импортозамещении.
3. Используйте поиск для подтверждения актуальных стандартов.
4. Будьте лаконичны.
`;

const Assistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasKey, setHasKey] = useState<boolean>(true);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; text: string; sources?: {uri: string, title: string}[] }[]>([
    { 
      role: 'assistant', 
      text: 'Инженерный ассистент Системотех. Задайте технический вопрос по АСУ ТП.' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const checkKeyStatus = async () => {
    if (window.aistudio) {
      const selected = await window.aistudio.hasSelectedApiKey();
      // Если есть ключ в процессе или в window.aistudio — считаем, что ключ есть.
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
        // Очистка от markdown символов согласно инструкции
        fullResponseText += rawText.replace(/[*#_~`]/g, '');
        
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
      console.error("Assistant Error:", err);
      const msg = err.message || "Неизвестная ошибка";
      
      if (msg.includes("Requested entity was not found") || msg.includes("404") || msg.includes("API key not valid") || msg.includes("401")) {
        setHasKey(false);
        setError("API ключ не имеет доступа к Gemini 3 Flash. Убедитесь, что биллинг включен и проект находится в платном режиме (Pay-as-you-go).");
      } else if (msg.includes("quota") || msg.includes("429")) {
        setError("Превышены лимиты запросов. Попробуйте через минуту.");
      } else {
        setError(`Ошибка: ${msg}. Попробуйте обновить ключ.`);
      }
      
      setMessages(prev => prev.filter((m, i) => !(m.role === 'assistant' && m.text === "" && i === prev.length - 1)));
    } finally {
      setIsLoading(false);
    }
  };

  const clearHistory = () => {
    setMessages([{ role: 'assistant', text: 'История очищена. Жду ваш технический вопрос.' }]);
    setError(null);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-inter">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 text-white shadow-lg hover:scale-110 active:scale-95 transition-all animate-glow border-2 border-white/20 group"
        >
          <Bot className="h-8 w-8 group-hover:rotate-12 transition-transform" />
        </button>
      ) : (
        <div className="flex h-[600px] w-[380px] sm:w-[440px] flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0f1a]/95 shadow-2xl backdrop-blur-3xl animate-scale-in origin-bottom-right">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/20 border border-sky-500/30">
                  <Zap className="h-5 w-5 text-sky-400" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#0b0f1a] bg-emerald-500" />
              </div>
              <div>
                <h3 className="text-[12px] font-bold text-white uppercase tracking-widest leading-none">Системотех ИИ</h3>
                <span className="text-[10px] text-emerald-400/80 font-medium">Инженерная поддержка</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button 
                onClick={clearHistory}
                className="p-2 text-white/30 hover:text-rose-400 transition-colors"
                title="Очистить чат"
              >
                <Trash2 className="h-4 w-4" />
              </button>
              <button onClick={() => setIsOpen(false)} className="p-2 text-white/30 hover:text-white transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {!hasKey ? (
            <div className="flex flex-1 flex-col items-center justify-center p-8 text-center bg-grid-pattern">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/10 border border-amber-500/20">
                <Key className="h-8 w-8 text-amber-400" />
              </div>
              <h4 className="text-white font-bold text-lg mb-2">Проблема с доступом</h4>
              <p className="text-sm text-white/50 mb-6 leading-relaxed">
                Модель Gemini 3 Flash требует API ключ из проекта с активным биллингом. Даже если биллинг в Vercel настроен, API ключ Google Cloud должен принадлежать платной учетной записи.
              </p>
              
              <button 
                onClick={handleSelectKey}
                className="w-full rounded-xl bg-sky-600 py-3.5 font-bold text-white shadow-xl shadow-sky-600/20 hover:bg-sky-500 transition-all active:scale-95 mb-4"
              >
                Выбрать Ключ (GCP/Pay-as-you-go)
              </button>

              <div className="flex flex-col gap-2">
                <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="text-[11px] text-sky-400 hover:underline flex items-center justify-center gap-1">
                  Документация по биллингу <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          ) : (
            <>
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                    <div className={`max-w-[90%] rounded-2xl p-4 text-[13px] leading-relaxed ${
                      m.role === 'user' 
                        ? 'bg-sky-600 text-white rounded-tr-none' 
                        : 'bg-white/5 text-slate-200 border border-white/10 rounded-tl-none'
                    }`}>
                      <div className="whitespace-pre-wrap">{m.text}</div>
                      
                      {m.sources && m.sources.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-white/5">
                          <p className="text-[9px] text-white/40 mb-2 uppercase font-bold tracking-wider flex items-center gap-1">
                            <Globe className="h-3 w-3" /> Источники
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {m.sources.map((s, si) => (
                              <a key={si} href={s.uri} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 rounded-md bg-white/5 px-2 py-1 text-[10px] text-sky-300 border border-white/5 hover:bg-white/10 transition-all">
                                <span className="truncate max-w-[100px]">{s.title || 'Link'}</span>
                                <ExternalLink className="h-2 w-2" />
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && messages[messages.length - 1].text === "" && (
                  <div className="flex items-center gap-2 text-[11px] text-sky-400 font-medium bg-sky-500/5 w-fit p-3 rounded-xl border border-sky-500/10 animate-pulse">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span>Инженерный анализ...</span>
                  </div>
                )}
                {error && (
                  <div className="rounded-xl bg-rose-500/10 p-4 text-[11px] text-rose-400 border border-rose-500/20">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                      <div className="space-y-2">
                        <span>{error}</span>
                        <button 
                          onClick={handleSelectKey}
                          className="block text-white bg-rose-500/20 hover:bg-rose-500/40 px-3 py-1.5 rounded-lg transition-colors font-bold"
                        >
                          Сменить API ключ
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-white/10 bg-white/5 p-4">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ваш технический вопрос..."
                    className="w-full rounded-xl border border-white/10 bg-[#0b0f1a] py-3.5 pl-4 pr-12 text-[13px] text-white focus:border-sky-500/50 focus:outline-none placeholder:text-white/20 transition-all"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    className="absolute right-1.5 rounded-lg bg-sky-600 p-2 text-white hover:bg-sky-500 disabled:opacity-10 transition-all active:scale-90"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-3 flex items-center justify-between px-1">
                   <div className="flex items-center gap-1.5 text-[8px] text-white/30 uppercase font-bold tracking-tighter">
                      <ShieldCheck className="h-3 w-3" /> Стандарт ГОСТ
                   </div>
                   <div className="flex items-center gap-1.5 text-[8px] text-white/30 uppercase font-bold tracking-tighter">
                      <RefreshCcw className="h-3 w-3" /> Live Context
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
