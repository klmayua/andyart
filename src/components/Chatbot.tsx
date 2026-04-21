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
        className="fixed bottom-24 right-4 w-14 h-14 bg-primary rounded-full shadow-large flex items-center justify-center text-surface hover:bg-text-primary transition-colors z-30"
        aria-label="Open chat"
      >
        <MessageCircle size={24} />
      </button>
    );
  }

  return (
    <>
      <button
        onClick={openChat}
        className="fixed bottom-24 right-4 w-14 h-14 bg-primary rounded-full shadow-large flex items-center justify-center text-surface hover:bg-text-primary transition-colors z-30"
        aria-label="Open chat"
      >
        <MessageCircle size={24} />
      </button>

      <div className="fixed bottom-24 right-4 w-[320px] md:w-[400px] bg-surface rounded-lg shadow-large border border-border-light overflow-hidden z-30">
        {/* Header */}
        <div className="bg-primary text-surface px-4 py-3 flex items-center justify-between">
          <h3 className="font-serif text-lg font-semibold">Andy – Gallery Assistant</h3>
          <button
            onClick={closeChat}
            className="text-surface hover:text-accent transition-colors"
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
                className={`max-w-[80%] px-4 py-2 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-primary text-surface'
                    : 'bg-background text-text-primary'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                {message.actions && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {QUICK_REPLIES.filter((r) => message.actions?.includes(r.action)).map((reply) => (
                      <button
                        key={reply.action}
                        onClick={() => handleQuickReply(reply.action)}
                        className="text-xs bg-surface text-text-primary px-3 py-1 rounded-pill border border-border-light hover:bg-accent transition-colors"
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
        <form onSubmit={handleSubmit} className="border-t border-border-light p-3 flex items-center gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-background px-4 py-2 rounded-pill text-sm focus:outline-none focus:ring-2 focus:ring-success-gold"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="w-10 h-10 bg-primary text-surface rounded-full flex items-center justify-center hover:bg-text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </>
  );
}
