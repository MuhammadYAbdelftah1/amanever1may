'use client';

import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER, WHATSAPP_DEFAULT_MESSAGE } from '@/lib/constants/links';
import { cn } from '@/lib/utils';

export function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);

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
          'fixed start-4 md:start-6 z-30 w-12 h-12 md:w-14 md:h-14 rounded-full shadow-xl hover:shadow-2xl flex items-center justify-center transition-all duration-300',
          'bg-[#25D366] hover:bg-[#20BA5A]',
          'bottom-6 md:bottom-8'
        )}
        style={{
          animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite'
        }}
      >
        <MessageCircle className="w-6 h-6 md:w-7 md:h-7 text-white" />
      </a>

      {/* Tooltip for desktop */}
      {showTooltip && (
        <div className="hidden md:block fixed start-20 bottom-10 z-30 bg-slate-900 text-white text-sm px-4 py-2 rounded-lg shadow-lg whitespace-nowrap">
          تواصل معنا على واتساب
          <div className="absolute top-1/2 -start-2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-e-8 border-e-slate-900" />
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
