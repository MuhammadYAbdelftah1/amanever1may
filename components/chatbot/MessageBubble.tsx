"use client";

import type { Message } from "@/lib/chatbot/types";
import { OmniyaAvatar } from "./OmniyaAvatar";
import { BlocksRenderer } from "./BlocksRenderer";
import { QuickReplies } from "./QuickReplies";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

interface MessageBubbleProps {
  message: Message;
  onQuickReply?: (reply: { label: string; value: string }) => void;
  showQuickReplies?: boolean;
}

export function MessageBubble({
  message,
  onQuickReply,
  showQuickReplies = false,
}: MessageBubbleProps) {
  const isBot = message.role === "bot";
  const isSystem = message.role === "system";

  if (isSystem) {
    return (
      <div className="flex justify-center py-2">
        <span className="text-xs text-slate-400 px-3 py-1 bg-slate-50 rounded-full">
          {message.blocks[0]?.type === "text" && message.blocks[0].text}
        </span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-2 ${isBot ? "justify-start" : "justify-end"}`}
    >
      {/* Bot avatar */}
      {isBot && (
        <div className="flex-shrink-0">
          <OmniyaAvatar size="sm" />
        </div>
      )}

      <div className={`flex flex-col gap-1 max-w-[80%] ${isBot ? "items-start" : "items-end"}`}>
        {/* Message bubble */}
        <div
          className={`px-4 py-3 ${
            isBot
              ? "bg-slate-50 text-slate-900 rounded-2xl rounded-es-sm"
              : "bg-emerald-600 text-white rounded-2xl rounded-ee-sm"
          }`}
        >
          <BlocksRenderer blocks={message.blocks} />
        </div>

        {/* Quick replies (only for bot messages and if enabled) */}
        {isBot && showQuickReplies && message.quickReplies && onQuickReply && (
          <QuickReplies
            replies={message.quickReplies}
            onSelect={(reply) => onQuickReply(reply)}
          />
        )}

        {/* Timestamp */}
        <span className="text-[10px] text-slate-400 px-2">
          {format(message.createdAt, "HH:mm", { locale: ar })}
        </span>
      </div>
    </motion.div>
  );
}
