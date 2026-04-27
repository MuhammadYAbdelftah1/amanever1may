'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

export function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 50% of hero section (approximately 400px)
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden animate-slide-up">
      <div className="bg-gradient-to-r from-[#4A8B8E] to-[#356B6E] text-white px-4 py-3 shadow-2xl">
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1">
            <div className="text-sm font-bold">وفّر 2,400 ر.س سنوياً</div>
            <div className="text-xs opacity-90">بدون التزام · إلغاء فوري</div>
          </div>
          <a
            href="#plans"
            className="bg-white text-[#4A8B8E] px-6 py-3 rounded-lg font-bold text-sm hover:bg-[#E8F1F1] transition-all duration-300 shadow-lg flex items-center gap-2 whitespace-nowrap"
          >
            <span>اشترك الحين</span>
            <ArrowLeft className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
