"use client";

import { useEffect, useRef } from "react";
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";
import { OmniyaAvatar } from "./OmniyaAvatar";
import type { Message } from "@/lib/chatbot/types";
import { AnimatePresence } from "framer-motion";

interface ChatBodyProps {
  messages: Message[];
  isTyping: boolean;
  onQuickReply?: (reply: { label: string; value: string }) => void;
}

export function ChatBody({ messages, isTyping, onQuickReply }: ChatBodyProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
      style={{ display: "flex", flexDirection: "column-reverse" }}
    >
      {/* Scroll anchor */}
      <div ref={bottomRef} />

      {/* Typing indicator */}
      {isTyping && (
        <div className="flex gap-2 items-start">
          <OmniyaAvatar size="sm" isTyping />
          <TypingIndicator />
        </div>
      )}

      {/* Messages (reversed for flex-col-reverse) */}
      <AnimatePresence initial={false}>
        {[...messages].reverse().map((message, index) => {
          const isLastBotMessage =
            message.role === "bot" &&
            index === 0 &&
            !isTyping;

          return (
            <MessageBubble
              key={message.id}
              message={message}
              onQuickReply={onQuickReply}
              showQuickReplies={isLastBotMessage}
            />
          );
        })}
      </AnimatePresence>

      {/* Empty state */}
      {messages.length === 0 && !isTyping && (
        <div className="flex flex-col items-center justify-center h-full text-center px-6 py-12">
          <OmniyaAvatar size="lg" className="mb-4" />
          <h3 className="text-lg font-bold text-slate-900 mb-2">
            مرحباً بك! 👋
          </h3>
          <p className="text-sm text-slate-600">
            أنا أمنية، مساعدتك الذكية في أمان إيفر
          </p>
        </div>
      )}
    </div>
  );
}
