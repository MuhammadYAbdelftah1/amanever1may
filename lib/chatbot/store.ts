// Zustand store for chatbot state with localStorage persistence
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ChatState, Message, UserProfile, Audience } from "./types";
import { STORAGE_KEYS, CONVERSATION_EXPIRY_DAYS } from "./constants";

interface ChatActions {
  // Messages
  addMessage: (message: Message) => void;
  clearMessages: () => void;

  // Navigation
  setCurrentNode: (nodeId: string | null) => void;

  // User profile
  updateProfile: (updates: Partial<UserProfile>) => void;
  setConsent: (consent: boolean) => void;
  setAudience: (audience: Audience) => void;

  // UI state
  openChat: () => void;
  closeChat: () => void;
  setTyping: (isTyping: boolean) => void;
  markAsRead: () => void;
  incrementUnread: () => void;

  // Lifecycle
  resetConversation: () => void;
  checkExpiry: () => void;
}

const initialState: ChatState = {
  messages: [],
  currentNodeId: null,
  userProfile: {
    consent: false,
  },
  isOpen: false,
  isTyping: false,
  unreadCount: 0,
  conversationStartedAt: null,
};

export const useChatStore = create<ChatState & ChatActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      // Messages
      addMessage: (message) =>
        set((state) => {
          const newMessages = [...state.messages, message];
          const conversationStartedAt =
            state.conversationStartedAt || Date.now();

          // Increment unread if chat is closed and message is from bot
          const shouldIncrementUnread =
            !state.isOpen && message.role === "bot";

          return {
            messages: newMessages,
            conversationStartedAt,
            unreadCount: shouldIncrementUnread
              ? state.unreadCount + 1
              : state.unreadCount,
          };
        }),

      clearMessages: () =>
        set({
          messages: [],
          currentNodeId: null,
          conversationStartedAt: null,
        }),

      // Navigation
      setCurrentNode: (nodeId) => set({ currentNodeId: nodeId }),

      // User profile
      updateProfile: (updates) =>
        set((state) => ({
          userProfile: { ...state.userProfile, ...updates },
        })),

      setConsent: (consent) =>
        set((state) => ({
          userProfile: { ...state.userProfile, consent },
        })),

      setAudience: (audience) =>
        set((state) => ({
          userProfile: { ...state.userProfile, audience },
        })),

      // UI state
      openChat: () =>
        set({
          isOpen: true,
          unreadCount: 0,
        }),

      closeChat: () => set({ isOpen: false }),

      setTyping: (isTyping) => set({ isTyping }),

      markAsRead: () => set({ unreadCount: 0 }),

      incrementUnread: () =>
        set((state) => ({ unreadCount: state.unreadCount + 1 })),

      // Lifecycle
      resetConversation: () => {
        set({
          ...initialState,
          userProfile: {
            consent: get().userProfile.consent, // Keep consent
          },
        });
      },

      checkExpiry: () => {
        const state = get();
        if (!state.conversationStartedAt) return;

        const now = Date.now();
        const expiryMs = CONVERSATION_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
        const isExpired = now - state.conversationStartedAt > expiryMs;

        if (isExpired) {
          get().resetConversation();
        }
      },
    }),
    {
      name: STORAGE_KEYS.state,
      partialize: (state) => ({
        messages: state.messages,
        currentNodeId: state.currentNodeId,
        userProfile: state.userProfile,
        conversationStartedAt: state.conversationStartedAt,
        // Don't persist UI state (isOpen, isTyping, unreadCount)
      }),
    }
  )
);
