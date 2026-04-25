/**
 * COMPLIANCE: PDPL + GDPR cookie consent
 */

"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Cookie, X, Settings } from 'lucide-react';
import { useCookieConsent } from '@/hooks/useCookieConsent';

export function CookieBanner() {
  const { hasInteracted, acceptAll, rejectNonEssential, isLoaded } = useCookieConsent();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show banner only if user hasn't interacted and after a short delay
    if (isLoaded && !hasInteracted) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isLoaded, hasInteracted]);

  if (!isVisible || hasInteracted) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
      <div className="bg-white border-t-2 border-[#4A8B8E] shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 py-4 md:py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            {/* Icon & Message */}
            <div className="flex items-start gap-3 flex-1">
              <div className="w-10 h-10 rounded-full bg-[#E8F1F1] flex items-center justify-center flex-shrink-0">
                <Cookie className="w-5 h-5 text-[#4A8B8E]" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-[#1A2B2C] mb-1">
                  نستخدم ملفات تعريف الارتباط (Cookies)
                </h3>
                <p className="text-sm text-[#5A6B6C] leading-relaxed">
                  نستخدم الكوكيز لتحسين تجربتك على موقعنا، وتحليل الأداء، وعرض محتوى مخصص. 
                  يمكنك اختيار أنواع الكوكيز التي توافق عليها.
                  {' '}
                  <Link 
                    href="/ar/privacy-policy" 
                    className="text-[#4A8B8E] hover:text-[#356B6E] underline font-medium"
                  >
                    اقرأ سياسة الخصوصية
                  </Link>
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              {/* Accept All */}
              <button
                onClick={acceptAll}
                className="px-6 py-2.5 bg-[#4A8B8E] hover:bg-[#356B6E] text-white font-semibold rounded-lg transition focus:ring-2 focus:ring-[#4A8B8E] focus:outline-none whitespace-nowrap"
              >
                قبول الكل
              </button>

              {/* Manage Preferences */}
              <Link
                href="/ar/cookie-settings"
                className="px-6 py-2.5 bg-white hover:bg-[#F8FAFB] text-[#4A8B8E] border border-[#4A8B8E] font-semibold rounded-lg transition focus:ring-2 focus:ring-[#4A8B8E] focus:outline-none flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <Settings className="w-4 h-4" />
                <span>إدارة التفضيلات</span>
              </Link>

              {/* Reject Non-Essential */}
              <button
                onClick={rejectNonEssential}
                className="text-sm text-[#8A9899] hover:text-[#5A6B6C] underline transition whitespace-nowrap text-center"
              >
                رفض غير الضروري
              </button>
            </div>

            {/* Close Button (Mobile) */}
            <button
              onClick={rejectNonEssential}
              className="absolute top-2 left-2 md:hidden p-2 text-[#8A9899] hover:text-[#5A6B6C] transition"
              aria-label="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
