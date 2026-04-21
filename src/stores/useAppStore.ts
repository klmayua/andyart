import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  actions?: string[];
}

interface AppState {
  // Cart state
  cart: Array<{
    artworkId: string;
    quantity: number;
  }>;
  addToCart: (artworkId: string, quantity?: number) => void;
  removeFromCart: (artworkId: string) => void;
  clearCart: () => void;

  // Wishlist state
  wishlist: string[];
  addToWishlist: (artworkId: string) => void;
  removeFromWishlist: (artworkId: string) => void;
  isInWishlist: (artworkId: string) => boolean;

  // Chatbot state
  isChatOpen: boolean;
  chatMessages: ChatMessage[];
  chatSessionId: string | null;
  openChat: () => void;
  closeChat: () => void;
  addMessage: (message: ChatMessage) => void;
  setChatSessionId: (sessionId: string) => void;
  clearChat: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Cart
      cart: [],
      addToCart: (artworkId, quantity = 1) =>
        set((state) => {
          const existing = state.cart.find((item) => item.artworkId === artworkId);
          if (existing) {
            return {
              cart: state.cart.map((item) =>
                item.artworkId === artworkId
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          return { cart: [...state.cart, { artworkId, quantity }] };
        }),
      removeFromCart: (artworkId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.artworkId !== artworkId),
        })),
      clearCart: () => set({ cart: [] }),

      // Wishlist
      wishlist: [],
      addToWishlist: (artworkId) =>
        set((state) => ({
          wishlist: [...state.wishlist, artworkId],
        })),
      removeFromWishlist: (artworkId) =>
        set((state) => ({
          wishlist: state.wishlist.filter((id) => id !== artworkId),
        })),
      isInWishlist: (artworkId) => get().wishlist.includes(artworkId),

      // Chatbot
      isChatOpen: false,
      chatMessages: [],
      chatSessionId: null,
      openChat: () => set({ isChatOpen: true }),
      closeChat: () => set({ isChatOpen: false }),
      addMessage: (message) =>
        set((state) => ({
          chatMessages: [...state.chatMessages, message],
        })),
      setChatSessionId: (sessionId) => set({ chatSessionId: sessionId }),
      clearChat: () => set({ chatMessages: [], chatSessionId: null }),
    }),
    {
      name: 'andyart-storage',
      partialize: (state) => ({
        wishlist: state.wishlist,
        cart: state.cart,
        chatSessionId: state.chatSessionId,
      }),
    }
  )
);
