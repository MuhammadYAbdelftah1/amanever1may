'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Smartphone } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { SUBSCRIBE_URL, DOWNLOAD_URL } from '@/lib/constants/links';

export function StickyDownloadBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Check if user dismissed the bar this session
    const dismissed = sessionStorage.getItem('stickyBarDismissed') === 'true';
    setIsDismissed(dismissed);

    // Don't show on subscribe or download pages
    if (pathname?.includes('/subscribe') || pathname?.includes('/download')) {
      return;
    }

    // Show bar after scrolling past 80% of hero section
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.8;
      const scrolled = window.scrollY > heroHeight;
      setIsVisible(scrolled && !dismissed);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
    sessionStorage.setItem('stickyBarDismissed', 'true');
  };

  // Don't show on subscribe/download pages or if dismissed
  if (pathname?.includes('/subscribe') || pathname?.includes('/download') || isDismissed) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-white border-t border-slate-200 shadow-2xl"
          style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
        >
          <div className="px-4 py-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <Smartphone className="w-5 h-5 text-emerald-600" />
              <span className="text-sm font-semibold text-slate-900 truncate">
                حمّل أمان إيفر
              </span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="https://amanever.com/#download"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs font-bold px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition whitespace-nowrap"
              >
                <span>حمّل الآن</span>
              </a>
            </div>

            <button
              onClick={handleDismiss}
              aria-label="إغلاق شريط التحميل"
              className="text-slate-400 hover:text-slate-600 transition p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
