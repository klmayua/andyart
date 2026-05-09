'use client';

import { useState, useRef, useEffect } from 'react';
import { useAppStore } from '@/stores/useAppStore';
import { X, Send, MessageCircle, Phone } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  actions?: string[];
}

const QUICK_REPLIES = [
  { text: 'Collect Art', action: 'show_art_categories' },
  { text: 'Book Experience', action: 'show_upcoming_events' },
  { text: 'Commission Work', action: 'show_commission_form' },
  { text: 'Private Viewing', action: 'open_calendar' },
  { text: 'Talk to Concierge', action: 'show_human_contact_form' },
];

const INITIAL_MESSAGE: ChatMessage = {
  id: '1',
  role: 'assistant',
  content: "Welcome to AndyArt Circle. I'm your collector concierge. How may I assist you today?",
  timestamp: new Date(),
  actions: QUICK_REPLIES.map((r) => r.action),
};

export default function Chatbot() {
  const store = useAppStore();
  const isChatOpen = store?.isChatOpen ?? false;
  const closeChat = store?.closeChat ?? (() => {});
  const chatMessages = store?.chatMessages ?? [];
  const addMessage = store?.addMessage ?? (() => {});
  const chatSessionId = store?.chatSessionId ?? null;
  const setChatSessionId = store?.setChatSessionId ?? (() => {});
  const openChat = store?.openChat ?? (() => {});

  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isChatOpen && chatMessages.length === 0) {
      addMessage(INITIAL_MESSAGE);
    }
  }, [isChatOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleQuickReply = async (action: string) => {
    const reply = QUICK_REPLIES.find((r) => r.action === action);
    if (!reply) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: reply.text,
      timestamp: new Date(),
    };

    addMessage(userMessage);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: chatSessionId || Date.now().toString(),
          message: reply.text,
          action,
        }),
      });

      const data = await response.json();

      if (!chatSessionId) {
        setChatSessionId(data.sessionId || Date.now().toString());
      }

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.reply || getActionResponse(action),
        timestamp: new Date(),
        actions: data.suggestedActions,
      };

      addMessage(assistantMessage);
    } catch (error) {
      console.error('Chatbot error:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I apologize, I'm having trouble connecting. Please reach us at hello@andyart.gallery or via WhatsApp.",
        timestamp: new Date(),
      };
      addMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const getActionResponse = (action: string): string => {
    const responses: Record<string, string> = {
      show_art_categories: "We curate paintings, sculptures, digital art, and mixed media from exceptional African artists. Browse our collection at /gallery or I can connect you with a specialist.",
      show_upcoming_events: "Our upcoming experiences include Collector Salons, Artist Conversations, and Private Dinners. Visit /events to see availability.",
      show_commission_form: "Bespoke commissions are one of our specialties. Visit /consult to schedule a consultation with our curation team.",
      open_calendar: "Private viewings are available by appointment. Visit /consult to reserve your exclusive session.",
      show_human_contact_form: "Our concierge team is available Monday–Saturday, 10am–6pm. Reach us at hello@andyart.gallery or request a callback.",
    };
    return responses[action] || "Thank you for your message. How can I help you today?";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    addMessage(userMessage);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: chatSessionId || Date.now().toString(),
          message: inputValue.trim(),
        }),
      });

      const data = await response.json();

      if (!chatSessionId) {
        setChatSessionId(data.sessionId || Date.now().toString());
      }

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.reply || "Thank you for your message. How can I help you further?",
        timestamp: new Date(),
        actions: data.suggestedActions,
      };

      addMessage(assistantMessage);
    } catch (error) {
      console.error('Chatbot error:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I apologize, I'm having trouble connecting. Please try again.",
        timestamp: new Date(),
      };
      addMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isChatOpen) {
    return (
      <button
        onClick={openChat}
        className="w-14 h-14 bg-andy-black/90 backdrop-blur-xl rounded-full shadow-premium border border-andy-gold/20 flex items-center justify-center hover:scale-105 transition-all"
        aria-label="Open Circle concierge chat"
      >
        <MessageCircle size={24} className="text-andy-gold" />
      </button>
    );
  }

  return (
    <>
      <button
        onClick={openChat}
        className="w-14 h-14 bg-andy-black/90 backdrop-blur-xl rounded-full shadow-premium border border-andy-gold/20 flex items-center justify-center hover:scale-105 transition-all"
        aria-label="Open Circle concierge chat"
      >
        <MessageCircle size={24} className="text-andy-gold" />
      </button>

      <div className="fixed bottom-[96px] right-6 w-[300px] md:w-[380px] bg-andy-ivory/98 backdrop-blur-xl rounded-2xl shadow-premium border border-andy-stone/30 overflow-hidden z-[10000]">
        {/* Header */}
        <div className="bg-andy-black px-4 py-3 flex items-center justify-between">
          <div>
            <h3 className="font-serif text-lg font-semibold text-andy-gold">Circle Concierge</h3>
            <p className="text-[10px] text-andy-ivory/60 uppercase tracking-wider">Premium Support</p>
          </div>
          <button
            onClick={closeChat}
            className="text-andy-ivory/60 hover:text-andy-ivory transition-colors"
            aria-label="Close chat"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="h-[400px] overflow-y-auto p-4 space-y-4">
          {chatMessages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] px-4 py-2.5 rounded-2xl ${
                  message.role === 'user'
                    ? 'bg-andy-black text-andy-ivory'
                    : 'bg-andy-stone/40 text-andy-black border border-andy-stone/30'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                {message.actions && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {QUICK_REPLIES.filter((r) => message.actions?.includes(r.action)).map((reply) => (
                      <button
                        key={reply.action}
                        onClick={() => handleQuickReply(reply.action)}
                        className="text-xs bg-white text-andy-black px-3 py-1.5 rounded-full border border-andy-stone/30 hover:bg-andy-gold hover:text-white transition-colors"
                      >
                        {reply.text}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-andy-stone/30 px-4 py-2 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-andy-bronze rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-andy-bronze rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-andy-bronze rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="border-t border-andy-stone/20 p-3 flex items-center gap-2 bg-white/50 backdrop-blur-xl">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-andy-stone/20 px-4 py-2.5 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-andy-gold/30 border border-andy-stone/20 text-andy-black placeholder:text-andy-bronze/60"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="w-10 h-10 bg-andy-black text-andy-gold rounded-full flex items-center justify-center hover:bg-andy-black/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </>
  );
}
