"use client";

import type { QuickReply } from "@/lib/chatbot/types";
import { motion } from "framer-motion";
import {
  HeartPulse,
  Stethoscope,
  Building2,
  Wallet,
  Calendar,
  CreditCard,
  MapPin,
  Ticket,
  MessageCircle,
  Baby,
  User,
  Sparkles,
  Brain,
  FileText,
  ArrowLeft,
  type LucideIcon,
} from "lucide-react";

// Map icon names to Lucide components
const iconMap: Record<string, LucideIcon> = {
  "heart-pulse": HeartPulse,
  stethoscope: Stethoscope,
  "building-2": Building2,
  wallet: Wallet,
  calendar: Calendar,
  "credit-card": CreditCard,
  "map-pin": MapPin,
  ticket: Ticket,
  "message-circle": MessageCircle,
  baby: Baby,
  user: User,
  sparkles: Sparkles,
  brain: Brain,
  "file-text": FileText,
  "arrow-left": ArrowLeft,
};

interface QuickRepliesProps {
  replies: QuickReply[];
  onSelect: (reply: QuickReply) => void;
}

export function QuickReplies({ replies, onSelect }: QuickRepliesProps) {
  if (!replies.length) return null;

  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide py-2 px-1">
      {replies.map((reply, index) => {
        const IconComponent = reply.icon ? iconMap[reply.icon] : null;
        
        return (
          <motion.button
            key={reply.value}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onSelect(reply)}
            className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-300 bg-white text-emerald-700 text-sm font-medium hover:bg-emerald-50 active:scale-95 transition-all whitespace-nowrap"
          >
            {IconComponent && <IconComponent className="w-4 h-4" />}
            {reply.label}
          </motion.button>
        );
      })}
    </div>
  );
}
