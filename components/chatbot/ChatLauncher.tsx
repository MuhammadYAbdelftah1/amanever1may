"use client";

import { useEffect } from "react";
import { useChatStore } from "@/lib/chatbot/store";
import { ChatWindow } from "./ChatWindow";

export function ChatLauncher() {
  const { isOpen } = useChatStore();

  // Keyboard shortcut: Esc to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        useChatStore.getState().closeChat();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return <ChatWindow />;
}
