'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { LogIn, UserPlus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function FloatingAuthButtons() {
  const [isVisible, setIsVisible] = useState(true);
  const pathname = usePathname();

  // Hide on auth pages
  const isAuthPage = pathname?.includes('/login') || pathname?.includes('/register');

  if (!isVisible || isAuthPage) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ duration: 0.3 }}
        className="fixed left-4 md:left-6 bottom-20 md:bottom-6 z-40 flex flex-col gap-2 md:gap-3"
        dir="rtl"
      >
        {/* Close Button */}
        <button
          onClick={() => setIsVisible(false)}
          className="self-end bg-white/90 backdrop-blur-sm text-[#5A6B6C] hover:text-[#1A2B2C] p-1.5 md:p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          aria-label="إخفاء الأزرار"
        >
          <X className="w-3 h-3 md:w-4 md:h-4" />
        </button>

        {/* Register Button */}
        <Link
          href="/ar/register"
          className="group relative bg-gradient-to-br from-[#4A8B8E] to-[#356B6E] text-white px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 flex items-center gap-2 md:gap-3"
        >
          <div className="absolute inset-0 bg-white/20 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative flex items-center gap-2 md:gap-3">
            <div className="bg-white/20 p-1.5 md:p-2 rounded-lg md:rounded-xl">
              <UserPlus className="w-4 h-4 md:w-6 md:h-6" />
            </div>
            <div className="text-right">
              <div className="text-xs md:text-sm font-bold">طلب انضمام</div>
              <div className="text-[10px] md:text-xs opacity-90 hidden md:block">سجل الآن مجاناً</div>
            </div>
          </div>
          {/* Pulse animation */}
          <span className="absolute -top-1 -right-1 flex h-2 w-2 md:h-3 md:w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 md:h-3 md:w-3 bg-white"></span>
          </span>
        </Link>

        {/* Login Button */}
        <Link
          href="/ar/login"
          className="group relative bg-white text-[#4A8B8E] px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-2 md:gap-3 border-2 border-[#4A8B8E]"
        >
          <div className="absolute inset-0 bg-[#4A8B8E]/5 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative flex items-center gap-2 md:gap-3">
            <div className="bg-[#4A8B8E]/10 p-1.5 md:p-2 rounded-lg md:rounded-xl">
              <LogIn className="w-4 h-4 md:w-6 md:h-6 text-[#4A8B8E]" />
            </div>
            <div className="text-right">
              <div className="text-xs md:text-sm font-bold">تسجيل الدخول</div>
              <div className="text-[10px] md:text-xs text-[#5A6B6C] hidden md:block">لديك حساب؟</div>
            </div>
          </div>
        </Link>

        {/* Tooltip - Hidden on mobile */}
        <div className="text-center mt-1 md:mt-2 hidden md:block">
          <p className="text-xs text-[#8A9899] bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
            وصول سريع 🚀
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
