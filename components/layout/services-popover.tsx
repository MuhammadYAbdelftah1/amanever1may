'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Calendar, 
  Video, 
  MessageCircle, 
  Building2, 
  Dumbbell, 
  Home,
  ArrowLeft,
  X
} from 'lucide-react';
import { usePathname } from 'next/navigation';

interface ServicesPopoverProps {
  locale: string;
  isMobile?: boolean;
}

interface Service {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  href: string;
  badge?: string;
  image: string;
}

const services: Service[] = [
  {
    id: 'membership',
    icon: Calendar,
    title: 'بطاقات العضوية',
    description: 'خصومات تصل إلى 80% في أفضل المستشفيات',
    href: '/pricing',
    badge: 'الأكثر طلباً',
    image: '/images/services/membership.jpg'
  },
  {
    id: 'instant-booking',
    icon: Video,
    title: 'حجوزات فورية',
    description: 'احجز مع أفضل الأطباء دون انتظار',
    href: '/services#for-patients',
    image: '/images/services/booking.jpg'
  },
  {
    id: 'home-care',
    icon: Home,
    title: 'الرعاية المنزلية',
    description: 'أطباء وممرضين معتمدين للزيارات المنزلية',
    href: '/services#for-patients',
    image: '/images/services/home-care.jpg'
  },
  {
    id: 'medical-network',
    icon: Building2,
    title: 'الشبكة الطبية',
    description: '2000+ مركز طبي في كافة مدن المملكة',
    href: '/services#for-patients',
    image: '/images/services/medical-network.jpg'
  },
  {
    id: 'health-network',
    icon: Dumbbell,
    title: 'الشبكة الصحية',
    description: 'جيم، سبا، صالونات تجميل، وأكثر',
    href: '/services#for-patients',
    image: '/images/services/health-network.jpg'
  },
  {
    id: 'store',
    icon: MessageCircle,
    title: 'متجر أمان',
    description: 'منتجات طبية ومكملات غذائية بأسعار مخفضة',
    href: '/services#for-patients',
    badge: 'عروض حصرية',
    image: '/images/services/store.jpg'
  }
];

export function ServicesPopover({ locale, isMobile = false }: ServicesPopoverProps) {
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
          <span className="flex-1 text-center">{locale === 'ar' ? 'خدماتنا' : 'Services'}</span>
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
            aria-label={locale === 'ar' ? 'قائمة الخدمات' : 'Services menu'}
          >
            {/* Handle Bar */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">
                {locale === 'ar' ? 'خدماتنا الطبية' : 'Our Services'}
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label={locale === 'ar' ? 'إغلاق' : 'Close'}
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Services Grid */}
            <div className="p-4 space-y-2">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <Link
                    key={service.id}
                    href={`/${locale}${service.href}`}
                    onClick={() => setIsOpen(false)}
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 group"
                  >
                    {/* Image */}
                    <div className="flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden bg-gray-50 relative border-2 border-dashed border-gray-300">
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center">
                        <div className="text-[10px] font-semibold text-gray-700 mb-0.5">
                          للمصممة
                        </div>
                        <div className="text-[9px] text-gray-500">
                          80×80
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-gray-900 text-base">
                          {service.title}
                        </h4>
                        {service.badge && (
                          <span className="text-xs font-bold text-[#1a472a] bg-[#1a472a]/10 px-2 py-0.5 rounded-full">
                            {service.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {service.description}
                      </p>
                    </div>
                    <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-[#1a472a] group-hover:-translate-x-1 transition-all flex-shrink-0 mt-1" />
                  </Link>
                );
              })}
            </div>

            {/* View All Link */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <Link
                href={`/${locale}/services`}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-[#1a472a] text-white font-semibold rounded-xl hover:bg-[#2d5a3d] transition-colors"
              >
                <span>{locale === 'ar' ? 'عرض جميع الخدمات' : 'View All Services'}</span>
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
          pathname.includes('/services')
            ? 'text-[#4A8B8E] bg-[#4A8B8E]/10'
            : 'text-gray-700 hover:text-[#4A8B8E] hover:bg-[#4A8B8E]/5'
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {locale === 'ar' ? 'خدماتنا' : 'Services'}
        
        {/* Active indicator */}
        {pathname.includes('/services') && (
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 rounded-full bg-[#4A8B8E]" />
        )}
        
        {/* Hover effect */}
        <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#4A8B8E]/0 via-[#4A8B8E]/5 to-[#4A8B8E]/0" />
      </button>

      {/* Popover */}
      {isOpen && (
        <div
          ref={popoverRef}
          className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 animate-in fade-in slide-in-from-top-2 duration-200 z-50"
          role="dialog"
          aria-label={locale === 'ar' ? 'قائمة الخدمات' : 'Services menu'}
        >
          {/* Arrow */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-gray-200 rotate-45" />

          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">
              {locale === 'ar' ? 'خدماتنا الطبية' : 'Our Medical Services'}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {locale === 'ar' ? 'اختر الخدمة المناسبة لاحتياجك' : 'Choose the service that fits your needs'}
            </p>
          </div>

          {/* Services Grid - 2 columns */}
          <div className="grid grid-cols-2 gap-3 p-4">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.id}
                  href={`/${locale}${service.href}`}
                  onClick={() => setIsOpen(false)}
                  className="flex flex-col gap-3 p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 group relative overflow-hidden"
                >
                  {/* Badge */}
                  {service.badge && (
                    <span className="absolute top-2 right-2 text-xs font-bold text-[#1a472a] bg-[#1a472a]/10 px-2 py-1 rounded-full z-10">
                      {service.badge}
                    </span>
                  )}

                  {/* Image */}
                  <div className="w-full h-24 rounded-xl overflow-hidden bg-gray-50 relative border-2 border-dashed border-gray-300">
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center">
                      <div className="text-[11px] font-semibold text-gray-700 mb-1">
                        للمصممة
                      </div>
                      <div className="text-[10px] text-gray-500">
                        280×96 بكسل
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-[#1a472a] transition-colors">
                      {service.title}
                    </h4>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {service.description}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="flex items-center gap-1 text-xs font-medium text-[#1a472a] opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>{locale === 'ar' ? 'اكتشف المزيد' : 'Learn more'}</span>
                    <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
            <Link
              href={`/${locale}/services`}
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 text-sm font-semibold text-[#1a472a] hover:bg-[#1a472a]/10 rounded-lg transition-colors"
            >
              <span>{locale === 'ar' ? 'عرض جميع الخدمات والتفاصيل' : 'View All Services & Details'}</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
