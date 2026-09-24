import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Trash2, ChevronDown, Bot, User } from 'lucide-react';

interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

const STARTER_PROMPTS = [
  "Tell me about the new Mechatronics track",
  "How long are the internships?",
  "What is the eligibility for the AI & ML track?",
  "How does the GitHub Proof of Work work?"
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      text: "Hi there! 👋 I'm the Skill Set Go Assistant. Ask me anything about our 12 project-based internship tracks, roadmaps, tech stacks, or eligibility. How can I help you learn and build today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom of the message container on new messages or open
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 100);
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || loading) return;

    const userMessage: Message = {
      role: 'user',
      text: trimmed,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          history: messages.map(m => ({ role: m.role, text: m.text }))
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response from assistant');
      }

      const data = await response.json();
      
      setMessages(prev => [...prev, {
        role: 'model',
        text: data.text,
        timestamp: new Date()
      }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, {
        role: 'model',
        text: "Oops! I'm having trouble connecting to my brain right now. Please try again in a few moments.",
        timestamp: new Date()
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend(input);
    }
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear your conversation?')) {
      setMessages([
        {
          role: 'model',
          text: "Hi there! 👋 I'm the Skill Set Go Assistant. Ask me anything about our 12 project-based internship tracks, roadmaps, tech stacks, or eligibility. How can I help you learn and build today?",
          timestamp: new Date()
        }
      ]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      {/* Expanded Chat Window */}
      {isOpen && (
        <div className="mb-4 flex h-[520px] w-[380px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl transition-all duration-300 ease-out sm:w-[420px]">
          {/* Header */}
          <div className="flex items-center justify-between bg-gradient-to-r from-[#0a1d37] to-[#122c52] px-4 py-3.5 text-white">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#4c7c40] text-white">
                <Sparkles size={18} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white leading-none">Skill Set Go Bot</h3>
                <span className="text-[10px] text-slate-300 font-medium flex items-center gap-1 mt-0.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                  Gemini-powered Assistant
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleClear}
                title="Clear Chat History"
                className="rounded-lg p-1.5 text-slate-300 hover:bg-slate-800/50 hover:text-white transition-colors"
              >
                <Trash2 size={16} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Minimize Assistant"
                className="rounded-lg p-1.5 text-slate-300 hover:bg-slate-800/50 hover:text-white transition-colors"
              >
                <ChevronDown size={18} />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto bg-slate-50/70 p-4 space-y-4">
            {messages.map((msg, index) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={index}
                  className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div
                    className={`flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full text-xs font-semibold ${
                      isUser ? 'bg-[#0a1d37] text-white' : 'bg-[#4c7c40]/15 text-[#4c7c40]'
                    }`}
                  >
                    {isUser ? <User size={14} /> : <Bot size={14} />}
                  </div>
                  <div className="flex flex-col max-w-[75%] space-y-1">
                    <div
                      className={`rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed shadow-sm ${
                        isUser
                          ? 'bg-[#0a1d37] text-white rounded-tr-none'
                          : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'
                      }`}
                    >
                      {/* Formatted output helper */}
                      <p className="whitespace-pre-line">{msg.text}</p>
                    </div>
                    <span className={`text-[9px] text-slate-400 ${isUser ? 'text-right mr-1' : 'text-left ml-1'}`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Simulated Typing State */}
            {loading && (
              <div className="flex items-start gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4c7c40]/15 text-[#4c7c40]">
                  <Bot size={14} />
                </div>
                <div className="rounded-2xl bg-white border border-slate-100 px-4 py-3.5 shadow-sm rounded-tl-none">
                  <div className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Starter Prompts */}
          {messages.length === 1 && (
            <div className="bg-slate-50 border-t border-slate-100 p-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2 px-1">
                Suggested Questions
              </span>
              <div className="grid grid-cols-1 gap-1.5">
                {STARTER_PROMPTS.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(prompt)}
                    className="text-left text-xs bg-white hover:bg-[#4c7c40]/5 border border-slate-200 hover:border-[#4c7c40]/30 rounded-lg py-1.5 px-3 text-slate-700 hover:text-[#4c7c40] font-medium transition-all duration-150 shadow-sm"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Panel */}
          <div className="border-t border-slate-150 p-3 bg-white">
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/50 pl-3 pr-1.5 py-1.5 focus-within:border-[#4c7c40] focus-within:ring-1 focus-within:ring-[#4c7c40] focus-within:bg-white transition-all">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type a message or question..."
                className="flex-1 border-none bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none focus:ring-0"
                disabled={loading}
              />
              <button
                onClick={() => handleSend(input)}
                disabled={!input.trim() || loading}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#4c7c40] text-white hover:bg-[#3d6333] disabled:bg-slate-200 disabled:text-slate-400 transition-colors"
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Launcher Button */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-[#0a1d37] to-[#122c52] text-white shadow-xl hover:shadow-2xl transition-transform active:scale-95 duration-200 hover:rotate-[5deg]"
        style={{
          boxShadow: '0 8px 30px rgba(10, 29, 55, 0.35)'
        }}
        aria-label="Ask Gemini Assistant"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
    </div>
  );
}
