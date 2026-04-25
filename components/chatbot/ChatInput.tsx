"use client";

import { useState, useRef, KeyboardEvent } from "react";
import { Send, Mic } from "lucide-react";
import { motion } from "framer-motion";

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({
  onSend,
  disabled = false,
  placeholder = "اكتب رسالتك...",
}: ChatInputProps) {
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed || disabled) return;

    onSend(trimmed);
    setText("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-center gap-2 p-3 border-t border-slate-200 bg-white">
      {/* Voice note placeholder (future feature) */}
      <button
        type="button"
        disabled
        className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center opacity-50 cursor-not-allowed"
        aria-label="تسجيل صوتي (قريباً)"
      >
        <Mic className="w-5 h-5" />
      </button>

      {/* Text input */}
      <label htmlFor="chat-input" className="sr-only">
        اكتب رسالتك
      </label>
      <input
        ref={inputRef}
        id="chat-input"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder={placeholder}
        className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
        dir="auto"
      />

      {/* Send button */}
      <motion.button
        type="button"
        onClick={handleSend}
        disabled={!text.trim() || disabled}
        whileTap={{ scale: 0.95 }}
        className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="إرسال"
      >
        <Send className="w-5 h-5" />
      </motion.button>
    </div>
  );
}
