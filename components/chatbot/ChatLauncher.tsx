"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useChatStore } from "@/lib/chatbot/store";
import { ChatWindow } from "./ChatWindow";

export function ChatLauncher() {
  const { isOpen, unreadCount, openChat } = useChatStore();

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

  return (
    <>
      {/* Launcher button with text */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed z-40"
            style={{
              bottom: "1.5rem",
              insetInlineStart: "1.5rem",
            }}
          >
            {/* Text bubble above avatar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-full mb-3 start-0 bg-white rounded-2xl shadow-lg px-4 py-2.5 whitespace-nowrap"
              style={{ minWidth: "200px" }}
            >
              <div className="flex items-center gap-2.5">
                {/* Pulsing green dot */}
                <div className="relative flex-shrink-0">
                  <span className="absolute inline-flex h-3 w-3 rounded-full bg-green-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
                </div>
                <div className="flex flex-col">
                  <p className="text-xs font-semibold text-green-600">
                    متاحة الآن
                  </p>
                  <p className="text-sm font-medium text-gray-800">
                    تحدث مع أمنية
                  </p>
                </div>
              </div>
              {/* Arrow pointing down */}
              <div className="absolute top-full start-6 -mt-1">
                <div className="w-3 h-3 bg-white transform rotate-45 shadow-sm" />
              </div>
            </motion.div>

            {/* Avatar button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openChat}
              className="w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-shadow overflow-hidden ring-2 ring-emerald-200 relative"
              aria-label="افتح شات أمنية"
            >
              {/* Avatar Image */}
              <Image
                src="/images/omniya-avatar.jpg"
                alt="أمنية"
                fill
                sizes="56px"
                className="object-cover"
                priority
                unoptimized
              />

              {/* Pulse dot */}
              <span className="absolute -top-1 -end-1 w-3 h-3 bg-green-400 rounded-full animate-pulse z-10" />

              {/* Unread badge */}
              {unreadCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -end-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center z-10"
                >
                  {unreadCount > 9 ? "9+" : unreadCount}
                </motion.span>
              )}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <ChatWindow />
    </>
  );
}
