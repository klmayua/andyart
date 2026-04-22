'use client';

import { useState, useRef, useEffect } from 'react';
import { useAppStore } from '@/stores/useAppStore';
import { X, Send, MessageCircle } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  actions?: string[];
}

const QUICK_REPLIES = [
  { text: '🖼️ Buy art', action: 'show_art_categories' },
  { text: '🎨 Paint & sip event', action: 'show_upcoming_events' },
  { text: '🏢 Corporate / interior decor', action: 'show_partnership_form' },
  { text: '📅 Book a consultation', action: 'open_calendar' },
  { text: '📞 Talk to a human', action: 'show_human_contact_form' },
];

const INITIAL_MESSAGE: ChatMessage = {
  id: '1',
  role: 'assistant',
  content: "Hi, I'm Andy. Looking to acquire art, book a service, or partner with us?",
  timestamp: new Date(),
  actions: QUICK_REPLIES.map((r) => r.action),
};

export default function Chatbot() {
  const store = useAppStore();
  // Safely access store methods with defaults
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
        content: "I apologize, I'm having trouble connecting. Please try again or contact us at hello@andyart.gallery",
        timestamp: new Date(),
      };
      addMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const getActionResponse = (action: string): string => {
    const responses: Record<string, string> = {
      show_art_categories: "Great! We offer paintings, sculptures, digital art, and mixed media. What style are you interested in? You can browse our full gallery at /gallery",
      show_upcoming_events: "We have exciting paint & sip events coming up! Check out our Events page to see dates and RSVP. Would you like me to share the link?",
      show_partnership_form: "Wonderful! We partner with interior designers, corporations, and venues. Please visit /partners/apply to submit your application.",
      open_calendar: "Perfect! You can book a consultation directly through our calendar. Visit /consult to see available times.",
      show_human_contact_form: "Of course! You can reach us at hello@andyart.gallery or call us directly. Would you like to leave a message?",
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
        className="fixed bottom-[150px] right-4 w-14 h-14 bg-white/90 backdrop-blur-xl rounded-full shadow-lg border border-white/30 flex items-center justify-center hover:scale-105 transition-all z-30"
        aria-label="Open chat"
      >
        <MessageCircle size={24} className="text-primary" />
      </button>
    );
  }

  return (
    <>
      <button
        onClick={openChat}
        className="fixed bottom-[150px] right-4 w-14 h-14 bg-white/90 backdrop-blur-xl rounded-full shadow-lg border border-white/30 flex items-center justify-center hover:scale-105 transition-all z-30"
        aria-label="Open chat"
      >
        <MessageCircle size={24} className="text-primary" />
      </button>

      <div className="fixed bottom-[150px] right-4 w-[300px] md:w-[380px] bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 overflow-hidden z-30">
        {/* Header */}
        <div className="bg-white/90 backdrop-blur-xl border-b border-white/20 px-4 py-3 flex items-center justify-between">
          <h3 className="font-serif text-lg font-semibold text-primary">Andy – Gallery Assistant</h3>
          <button
            onClick={closeChat}
            className="text-text-secondary hover:text-primary transition-colors"
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
                className={`max-w-[80%] px-4 py-2.5 rounded-2xl backdrop-blur-sm ${
                  message.role === 'user'
                    ? 'bg-primary text-white'
                    : 'bg-accent text-primary border border-white/20'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                {message.actions && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {QUICK_REPLIES.filter((r) => message.actions?.includes(r.action)).map((reply) => (
                      <button
                        key={reply.action}
                        onClick={() => handleQuickReply(reply.action)}
                        className="text-xs bg-white text-primary px-3 py-1.5 rounded-full border border-white/30 hover:bg-accent transition-colors"
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
              <div className="bg-background px-4 py-2 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="border-t border-white/20 p-3 flex items-center gap-2 bg-white/50 backdrop-blur-xl">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-accent px-4 py-2.5 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 border border-white/30"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={18} className="text-white" />
          </button>
        </form>
      </div>
    </>
  );
}
