'use client';

import { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER, WHATSAPP_DEFAULT_MESSAGE } from '@/lib/constants/links';
import { cn } from '@/lib/utils';

export function WhatsAppButton() {
  const [stickyBarVisible, setStickyBarVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Check if sticky bar is visible to adjust position
    const checkStickyBar = () => {
      const dismissed = sessionStorage.getItem('stickyBarDismissed') === 'true';
      const scrolled = window.scrollY > window.innerHeight * 0.8;
      setStickyBarVisible(scrolled && !dismissed && window.innerWidth < 768);
    };

    window.addEventListener('scroll', checkStickyBar);
    window.addEventListener('resize', checkStickyBar);
    checkStickyBar();

    return () => {
      window.removeEventListener('scroll', checkStickyBar);
      window.removeEventListener('resize', checkStickyBar);
    };
  }, []);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE)}`;

  return (
    <div className="relative">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="تواصل معنا على واتساب"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={cn(
          'fixed end-6 z-30 w-14 h-14 md:w-16 md:h-16 rounded-full shadow-xl hover:shadow-2xl flex items-center justify-center transition-all duration-300',
          'bg-[#25D366] hover:bg-[#20BA5A]',
          stickyBarVisible ? 'bottom-24' : 'bottom-6',
          'md:bottom-8 md:end-8'
        )}
        style={{
          animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite'
        }}
      >
        <MessageCircle className="w-7 h-7 md:w-8 md:h-8 text-white" />
      </a>

      {/* Tooltip for desktop */}
      {showTooltip && (
        <div className="hidden md:block fixed end-24 bottom-12 z-30 bg-slate-900 text-white text-sm px-4 py-2 rounded-lg shadow-lg whitespace-nowrap">
          تواصل معنا على واتساب
          <div className="absolute top-1/2 -end-2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-s-8 border-s-slate-900" />
        </div>
      )}

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          a {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
