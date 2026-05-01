'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Building2,
  Target,
  Eye,
  Heart,
  ArrowLeft,
  X
} from 'lucide-react';
import { usePathname } from 'next/navigation';

interface AboutPopoverProps {
  locale: string;
  isMobile?: boolean;
}

interface AboutSection {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  gradient: string;
}

const aboutSections: AboutSection[] = [
  {
    id: 'who-we-are',
    icon: Building2,
    title: 'من نحن',
    description: 'شريككم الذكي في رحلة الرعاية الطبية - منصة تقنية سعودية رائدة متخصصة في الوساطة التقنية والتسويقية',
    gradient: 'from-[#4A8B8E] to-[#2d5a5d]',
  },
  {
    id: 'mission',
    icon: Target,
    title: 'رسالتنا',
    description: 'نسعى لأن نكون جسراً آمناً يربط المجتمع بالخدمات الطبية والتجميلية بأعلى معايير الجودة والتقنية',
    gradient: 'from-[#4A8B8E] to-[#2d5a5d]',
  },
  {
    id: 'vision',
    icon: Eye,
    title: 'رؤيتنا',
    description: 'أن نكون المنصة الرائدة في التسويق الطبي والرعاية الصحية الرقمية في المملكة والمنطقة العربية',
    gradient: 'from-[#4A8B8E] to-[#2d5a5d]',
  },
  {
    id: 'values',
    icon: Heart,
    title: 'قيمنا',
    description: 'نضع صحة الإنسان أولاً، نلتزم بالشفافية والاحترام، ونؤمن بالابتكار المبسّط والشراكة في الخدمة',
    gradient: 'from-[#4A8B8E] to-[#2d5a5d]',
  },
];

export function AboutPopover({ locale, isMobile = false }: AboutPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        popoverRef.current &&
        triggerRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  // Close popover on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // Mobile: Bottom Sheet
  if (isMobile) {
    return (
      <>
        <button
          ref={triggerRef}
          onClick={handleToggle}
          className="flex items-center gap-3 text-lg font-medium transition-all duration-300 rounded-lg px-4 py-3 text-[#4A8B8E]/80 hover:text-[#4A8B8E] hover:bg-[#4A8B8E]/5 w-full"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          {/* Image Placeholder */}
          <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-gray-50 relative border-2 border-dashed border-gray-300">
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <div className="text-[9px] font-semibold text-gray-700">للمصممة</div>
              <div className="text-[8px] text-gray-500">48×48</div>
            </div>
          </div>
          <span className="flex-1 text-center">{locale === 'ar' ? 'من نحن' : 'About Us'}</span>
        </button>

        {/* Bottom Sheet Overlay */}
        {isOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-[100] animate-in fade-in duration-200"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Bottom Sheet */}
        {isOpen && (
          <div
            ref={popoverRef}
            className="fixed bottom-0 left-0 right-0 z-[101] bg-white rounded-t-3xl shadow-2xl animate-in slide-in-from-bottom duration-300 max-h-[85vh] overflow-y-auto"
            role="dialog"
            aria-label={locale === 'ar' ? 'من نحن' : 'About Us'}
          >
            {/* Handle Bar */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">
                {locale === 'ar' ? 'من نحن' : 'About Us'}
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label={locale === 'ar' ? 'إغلاق' : 'Close'}
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Sections */}
            <div className="p-4 space-y-3">
              {aboutSections.map((section) => {
                return (
                  <div
                    key={section.id}
                    className="p-4 rounded-xl border border-gray-200 hover:border-[#4A8B8E]/30 hover:bg-gray-50 transition-all duration-200"
                  >
                    <div className="flex items-start gap-3 mb-2">
                      {/* Image Placeholder instead of Icon */}
                      <div className="w-10 h-10 rounded-xl overflow-hidden bg-gray-50 relative border-2 border-dashed border-gray-300 flex-shrink-0">
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                          <div className="text-[8px] font-semibold text-gray-700">للمصممة</div>
                          <div className="text-[7px] text-gray-500">40×40</div>
                        </div>
                      </div>
                      <h4 className="font-bold text-gray-900 text-base mt-1">
                        {section.title}
                      </h4>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {section.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* View Full Page Link */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <Link
                href={`/${locale}/about`}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-gradient-to-r from-[#4A8B8E] to-[#2d5a5d] text-white font-semibold rounded-xl hover:shadow-lg transition-all"
              >
                <span>{locale === 'ar' ? 'اعرف المزيد عنا' : 'Learn More About Us'}</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </>
    );
  }

  // Desktop: Popover
  return (
    <div className="relative">
      <button
        ref={triggerRef}
        onClick={handleToggle}
        className={`relative text-sm font-medium transition-all duration-300 rounded-lg px-4 py-2 group ${
          pathname.includes('/about')
            ? 'text-[#4A8B8E] bg-[#4A8B8E]/10'
            : 'text-gray-700 hover:text-[#4A8B8E] hover:bg-[#4A8B8E]/5'
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {locale === 'ar' ? 'من نحن' : 'About Us'}
        
        {/* Active indicator */}
        {pathname.includes('/about') && (
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 rounded-full bg-[#4A8B8E]" />
        )}
        
        {/* Hover effect */}
        <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#4A8B8E]/0 via-[#4A8B8E]/5 to-[#4A8B8E]/0" />
      </button>

      {/* Popover */}
      {isOpen && (
        <div
          ref={popoverRef}
          className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 animate-in fade-in slide-in-from-top-2 duration-200 z-50"
          role="dialog"
          aria-label={locale === 'ar' ? 'من نحن' : 'About Us'}
        >
          {/* Arrow */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-gray-200 rotate-45" />

          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">
              {locale === 'ar' ? 'من نحن' : 'About Us'}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {locale === 'ar' ? 'شريككم الذكي في رحلة الرعاية الطبية' : 'Your Smart Partner in Healthcare Journey'}
            </p>
          </div>

          {/* Sections */}
          <div className="p-4 space-y-3 max-h-[400px] overflow-y-auto">
            {aboutSections.map((section) => {
              return (
                <div
                  key={section.id}
                  className="p-3 rounded-xl border border-gray-200 hover:border-[#4A8B8E]/30 hover:bg-gray-50 transition-all duration-200"
                >
                  <div className="flex items-start gap-3 mb-2">
                    {/* Image Placeholder instead of Icon */}
                    <div className="w-9 h-9 rounded-lg overflow-hidden bg-gray-50 relative border-2 border-dashed border-gray-300 flex-shrink-0">
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <div className="text-[7px] font-semibold text-gray-700">للمصممة</div>
                        <div className="text-[6px] text-gray-500">36×36</div>
                      </div>
                    </div>
                    <h4 className="font-bold text-gray-900 text-sm mt-1">
                      {section.title}
                    </h4>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {section.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
            <Link
              href={`/${locale}/about`}
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 text-sm font-semibold text-[#4A8B8E] hover:bg-[#4A8B8E]/10 rounded-lg transition-colors"
            >
              <span>{locale === 'ar' ? 'اعرف المزيد عن قصتنا ورؤيتنا' : 'Learn More About Our Story'}</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
