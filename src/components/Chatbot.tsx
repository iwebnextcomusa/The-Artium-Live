import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Sparkles, Loader2 } from "lucide-react";
import { ChatMessage } from "../types";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasNewResponse, setHasNewResponse] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initial greeting
  useEffect(() => {
    setMessages([
      {
        id: "msg-initial",
        role: "model",
        text: "Warmest welcome to The Atrium Live. I am Aura, your virtual concierge. May I assist you with event spacing outlines, private tours, or scheduling availability today?",
        timestamp: new Date()
      }
    ]);
  }, []);

  // Scroll to bottom when messages array modifies
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setHasNewResponse(false);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = inputValue.trim();
    if (!cleanInput) return;

    // Add user message
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      role: "user",
      text: cleanInput,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    try {
      // Prepare history payload for server-side stateless prompt matching
      // Filter out high-frequency chunks to save bandwidth
      const recentHistory = messages
        .filter(m => m.id !== "msg-initial")
        .slice(-6)
        .map((m) => ({
          role: m.role,
          text: m.text,
        }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: cleanInput,
          history: recentHistory,
        }),
      });

      const data = await res.json();
      
      const botMsg: ChatMessage = {
        id: `msg-${Date.now()}-model`,
        role: "model",
        text: data.text || "Pardon me, but I suffered a minor connection drop. Could you please check with Terry at 678-409-9635?",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMsg]);

      // If chat is closed, notify the user with a subtle pulsing ping
      if (!isOpen) {
        setHasNewResponse(true);
      }
    } catch (err) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: `msg-${Date.now()}-model`,
        role: "model",
        text: "I do apologize. Something interrupted our chat connection. Please call us directly at 678-409-9635 for immediate event details.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div id="ai-con-widget" className="fixed bottom-6 right-6 z-[9999] font-sans">
      
      {/* Floating Toggle Icon Button */}
      <button
        id="chatbot-toggle-btn"
        onClick={handleToggle}
        className={`relative w-14 h-14 rounded-none flex items-center justify-center cursor-pointer transition-all duration-300 shadow-2xl border ${
          isOpen
            ? "bg-[#0c0c0c] border-white/30 text-white rotate-90"
            : "bg-[#C5A059] border-[#C5A059] text-black hover:bg-black hover:text-[#C5A059]"
        }`}
        aria-label="Toggle Aura Assistant Chatbox"
      >
        {isOpen ? <X className="w-6 h-6 border-none" /> : <MessageSquare className="w-6 h-6" />}
        
        {/* Subtle glowing badge notification for unread robot messages */}
        {hasNewResponse && !isOpen && (
          <span className="absolute top-0 right-0 flex h-4 w-4 rounded-none">
            <span className="animate-ping absolute inline-flex h-full w-full bg-rose-500 opacity-75 rounded-none" />
            <span className="relative inline-flex h-4 w-4 bg-rose-600 text-[9px] text-white font-bold items-center justify-center rounded-none">1</span>
          </span>
        )}
      </button>

      {/* Floating Chat Portal Portal Window */}
      {isOpen && (
        <div
          id="chat-window-panel"
          className="absolute bottom-18 right-0 w-[320px] sm:w-[380px] h-[480px] max-h-[calc(100vh-180px)] rounded-none glass-panel-heavy border-white/20 flex flex-col justify-between overflow-hidden shadow-2xl bg-black"
        >
          {/* Window Banner Header */}
          <div className="px-5 py-4 border-b border-white/10 bg-[#0c0c0c] flex justify-between items-center text-left">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-none bg-[#C5A059] p-[1px]">
                <div className="w-full h-full bg-black rounded-none flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                </div>
                <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-none border border-black" />
              </div>
              <div>
                <h4 className="text-xs font-serif font-bold text-white tracking-wider uppercase">Aura Concierge</h4>
                <p className="text-[9px] text-[#C5A059] font-mono tracking-widest uppercase">The Atrium Expert</p>
              </div>
            </div>
            <button
              onClick={handleToggle}
              className="text-[#C5A059] hover:text-white transition-colors cursor-pointer"
              aria-label="Minimise chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Conversation stream dialog panel */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-4 py-5 flex flex-col gap-4 bg-black/40 text-left scrollbar-none"
          >
            {messages.map((m) => {
              const isUser = m.role === "user";
              return (
                <div
                  key={m.id}
                  className={`flex ${isUser ? "justify-end" : "justify-start"} animate-fade-in`}
                >
                  <div
                    className={`max-w-[85%] rounded-none px-4 py-3 text-xs leading-relaxed ${
                      isUser
                        ? "bg-[#C5A059] text-black font-medium shadow-md text-right border border-[#C5A059]"
                        : "bg-[#0c0c0c] border border-white/10 text-white/90 text-left"
                    }`}
                  >
                    <p>{m.text}</p>
                    <span className={`text-[8px] mt-1.5 block font-mono ${isUser ? "text-black/60" : "text-stone-500"}`}>
                      {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Pulsing Loading Indicators representing typing logic */}
            {isTyping && (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-[#0c0c0c] border border-white/10 text-gold-100 rounded-none px-4 py-3 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#C5A059] rounded-none animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-[#C5A059] rounded-none animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-[#C5A059] rounded-none animate-bounce" />
                </div>
              </div>
            )}
          </div>

          {/* Input text send forms */}
          <form
            onSubmit={handleSend}
            className="p-3 border-t border-white/10 bg-[#0c0c0c] flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message here..."
              disabled={isTyping}
              className="flex-1 bg-black border border-white/10 rounded-none px-4 py-2.5 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-[#C5A059] disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="w-9 h-9 rounded-none bg-[#C5A059] text-black flex items-center justify-center cursor-pointer transition-transform active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed shrink-0 border border-[#C5A059]"
              aria-label="Send message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
