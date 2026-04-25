'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { LogIn, UserPlus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useChatStore } from '@/lib/chatbot/store';

export function FloatingAuthButtons() {
  const pathname = usePathname();
  const { isOpen, unreadCount, openChat } = useChatStore();

  // Hide on auth pages
  const isAuthPage = pathname?.includes('/login') || pathname?.includes('/register');

  if (isAuthPage) return null;

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
          className="fixed left-4 md:left-6 bottom-6 z-40 flex flex-col gap-3"
        >
          {/* Chatbot Button - Icon Only (Top) */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={openChat}
            className="relative w-12 h-12 md:w-14 md:h-14 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden ring-2 ring-emerald-200"
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

            {/* Pulsing green dot - top right */}
            <span className="absolute -top-1 -right-1 flex h-3 w-3 z-10">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>

            {/* Unread badge */}
            {unreadCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -bottom-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center z-10"
              >
                {unreadCount > 9 ? "9+" : unreadCount}
              </motion.span>
            )}
          </motion.button>

          {/* Login Button - Icon Only (Middle) */}
          <Link
            href="/ar/login"
            className="group relative bg-white text-[#4A8B8E] p-3 md:p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 border-2 border-[#4A8B8E]"
            aria-label="تسجيل الدخول"
          >
            <div className="absolute inset-0 bg-[#4A8B8E]/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <LogIn className="w-5 h-5 md:w-6 md:h-6 text-[#4A8B8E] relative z-10" />
          </Link>

          {/* Register Button - Icon Only (Bottom) */}
          <Link
            href="/ar/register"
            className="group relative bg-gradient-to-br from-[#4A8B8E] to-[#356B6E] text-white p-3 md:p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110"
            aria-label="طلب انضمام"
          >
            <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <UserPlus className="w-5 h-5 md:w-6 md:h-6 relative z-10" />
            {/* Pulse animation */}
            <span className="absolute -top-1 -right-1 flex h-2 w-2 md:h-3 md:w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 md:h-3 md:w-3 bg-white"></span>
            </span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
