"use client";

import { X, MoreVertical, Trash2 } from "lucide-react";
import { OmniyaAvatar } from "./OmniyaAvatar";
import { OMNIYA_NAME_AR, OMNIYA_STATUS_AR } from "@/lib/chatbot/constants";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ChatHeaderProps {
  onClose: () => void;
  onClearConversation: () => void;
  isTyping?: boolean;
}

export function ChatHeader({
  onClose,
  onClearConversation,
  isTyping = false,
}: ChatHeaderProps) {
  const [showMenu, setShowMenu] = useState(false);

  const handleClear = () => {
    if (confirm("هل تريد مسح المحادثة؟")) {
      onClearConversation();
      setShowMenu(false);
    }
  };

  return (
    <div className="relative flex items-center gap-3 px-4 py-3 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-t-3xl">
      {/* Avatar */}
      <OmniyaAvatar size="md" isTyping={isTyping} />

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h2 className="font-bold text-base">{OMNIYA_NAME_AR}</h2>
        <div className="flex items-center gap-2">
          {/* Status dot */}
          <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse" />
          <span className="text-xs text-emerald-50">{OMNIYA_STATUS_AR}</span>
        </div>
      </div>

      {/* Menu button */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex-shrink-0 w-8 h-8 rounded-full hover:bg-emerald-600/50 flex items-center justify-center transition-colors"
        aria-label="القائمة"
      >
        <MoreVertical className="w-5 h-5" />
      </button>

      {/* Close button */}
      <button
        onClick={onClose}
        className="flex-shrink-0 w-8 h-8 rounded-full hover:bg-emerald-600/50 flex items-center justify-center transition-colors"
        aria-label="إغلاق"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Dropdown menu */}
      <AnimatePresence>
        {showMenu && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setShowMenu(false)}
            />

            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="absolute top-full end-4 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden z-50"
            >
              <button
                onClick={handleClear}
                className="flex items-center gap-3 w-full px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <Trash2 className="w-4 h-4 text-red-500" />
                <span>مسح المحادثة</span>
              </button>

              <a
                href="/ar/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 w-full px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors border-t border-slate-100"
              >
                <span>سياسة الخصوصية</span>
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
