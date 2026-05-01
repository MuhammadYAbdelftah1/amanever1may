'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  BookOpen,
  ArrowLeft,
  X,
  Clock
} from 'lucide-react';
import { usePathname } from 'next/navigation';

interface BlogPopoverProps {
  locale: string;
  isMobile?: boolean;
}

interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: number;
  image: string;
}

// آخر 3 مقالات
const recentArticles: BlogArticle[] = [
  {
    id: '1',
    slug: 'periodic-checkups-guide',
    title: 'أهمية الفحوصات الدورية: دليلك للكشف المبكر',
    excerpt: 'تعرف على الفحوصات الأساسية الموصى بها حسب العمر',
    category: 'صحة عامة',
    readTime: 5,
    image: '/images/blog/periodic-checkups.jpg'
  },
  {
    id: '2',
    slug: 'digital-health-vision-2030',
    title: 'التحول الرقمي الصحي في المملكة 2030',
    excerpt: 'كيف تساهم التقنيات الحديثة في تحقيق رؤية 2030',
    category: 'تقنية صحية',
    readTime: 6,
    image: '/images/blog/digital-health.jpg'
  },
  {
    id: '3',
    slug: '5-heart-healthy-habits',
    title: '5 عادات يومية لقلب صحي',
    excerpt: 'نصائح بسيطة وفعالة للحفاظ على صحة قلبك',
    category: 'نصائح وقائية',
    readTime: 4,
    image: '/images/blog/heart-health.jpg'
  }
];

export function BlogPopover({ locale, isMobile = false }: BlogPopoverProps) {
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
          <span className="flex-1 text-center">{locale === 'ar' ? 'المدونة' : 'Blog'}</span>
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
            aria-label={locale === 'ar' ? 'المدونة' : 'Blog'}
          >
            {/* Handle Bar */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">
                {locale === 'ar' ? 'آخر المقالات' : 'Latest Articles'}
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label={locale === 'ar' ? 'إغلاق' : 'Close'}
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Articles */}
            <div className="p-4 space-y-3">
              {recentArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/${locale}/blog/${article.slug}`}
                  onClick={() => setIsOpen(false)}
                  className="flex gap-4 p-4 rounded-xl border border-gray-200 hover:border-[#4A8B8E]/30 hover:bg-gray-50 transition-all duration-200"
                >
                  {/* Image Placeholder */}
                  <div className="flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden bg-gray-50 relative border-2 border-dashed border-gray-300">
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <div className="text-[9px] font-semibold text-gray-700">للمصممة</div>
                      <div className="text-[8px] text-gray-500">80×80</div>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-[#4A8B8E] bg-[#4A8B8E]/10 px-2 py-0.5 rounded-full">
                        {article.category}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {article.readTime} دقائق
                      </span>
                    </div>
                    <h4 className="font-bold text-gray-900 text-sm mb-1 line-clamp-2">
                      {article.title}
                    </h4>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {article.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {/* View All Link */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <Link
                href={`/${locale}/blog`}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-gradient-to-r from-[#4A8B8E] to-[#2d5a5d] text-white font-semibold rounded-xl hover:shadow-lg transition-all"
              >
                <span>{locale === 'ar' ? 'اقرأ المزيد من المقالات' : 'Read More Articles'}</span>
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
          pathname.includes('/blog')
            ? 'text-[#4A8B8E] bg-[#4A8B8E]/10'
            : 'text-gray-700 hover:text-[#4A8B8E] hover:bg-[#4A8B8E]/5'
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {locale === 'ar' ? 'المدونة' : 'Blog'}
        
        {/* Active indicator */}
        {pathname.includes('/blog') && (
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
          aria-label={locale === 'ar' ? 'المدونة' : 'Blog'}
        >
          {/* Arrow */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-gray-200 rotate-45" />

          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">
              {locale === 'ar' ? 'آخر المقالات الطبية' : 'Latest Medical Articles'}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {locale === 'ar' ? 'مقالات موثوقة من أطباء متخصصين' : 'Trusted articles from specialized doctors'}
            </p>
          </div>

          {/* Articles */}
          <div className="p-4 space-y-3 max-h-[400px] overflow-y-auto">
            {recentArticles.map((article) => (
              <Link
                key={article.id}
                href={`/${locale}/blog/${article.slug}`}
                onClick={() => setIsOpen(false)}
                className="flex gap-3 p-3 rounded-xl border border-gray-200 hover:border-[#4A8B8E]/30 hover:bg-gray-50 transition-all duration-200"
              >
                {/* Image Placeholder */}
                <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-gray-50 relative border-2 border-dashed border-gray-300">
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <div className="text-[8px] font-semibold text-gray-700">للمصممة</div>
                    <div className="text-[7px] text-gray-500">64×64</div>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-[#4A8B8E] bg-[#4A8B8E]/10 px-2 py-0.5 rounded-full">
                      {article.category}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime} دقائق
                    </span>
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1 line-clamp-2">
                    {article.title}
                  </h4>
                  <p className="text-xs text-gray-600 line-clamp-1">
                    {article.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
            <Link
              href={`/${locale}/blog`}
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 text-sm font-semibold text-[#4A8B8E] hover:bg-[#4A8B8E]/10 rounded-lg transition-colors"
            >
              <span>{locale === 'ar' ? 'اقرأ المزيد من المقالات الطبية' : 'Read More Medical Articles'}</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
