'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Shield, 
  Globe, 
  Zap, 
  Calendar, 
  Home, 
  MessageCircle, 
  Wallet, 
  CreditCard,
  Star,
  ArrowLeft,
  X
} from 'lucide-react';
import { usePathname } from 'next/navigation';

interface FeaturesPopoverProps {
  locale: string;
  isMobile?: boolean;
}

interface Feature {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  gradient: string;
  badge?: string;
  image: string;
}

const features: Feature[] = [
  {
    id: 'inclusive',
    icon: Shield,
    title: 'رعاية تحتضن الجميع',
    description: 'خدماتنا متاحة للجميع؛ مواطنين، مقيمين، وزواراً بكل حب',
    gradient: 'from-[#4A8B8E] to-[#356B6E]',
    badge: 'للجميع',
    image: '/images/features/inclusive.jpg'
  },
  {
    id: 'coverage',
    icon: Globe,
    title: 'راحة بال.. بلا موافقات مسبقة',
    description: 'تغطية طبية واسعة فوراً دون انتظار موافقات',
    gradient: 'from-[#4A8B8E] to-[#356B6E]',
    image: '/images/features/coverage.jpg'
  },
  {
    id: 'speed',
    icon: Zap,
    title: 'بطاقتك جاهزة في ثوانٍ',
    description: 'إصدار فوري للبطاقة مع دعم على مدار الساعة',
    gradient: 'from-[#4A8B8E] to-[#356B6E]',
    badge: 'فوري',
    image: '/images/features/speed.jpg'
  },
  {
    id: 'booking',
    icon: Calendar,
    title: 'طبيبك بانتظارك دائماً',
    description: 'احجز موعدك أو احصل على استشارة فورية بضغطة زر',
    gradient: 'from-[#4A8B8E] to-[#356B6E]',
    image: '/images/features/booking.jpg'
  },
  {
    id: 'home-care',
    icon: Home,
    title: 'المستشفى.. في منزلك',
    description: 'نأتيك بالرعاية التي تستحقها إلى باب بيتك؛ طاقم طبي متخصص',
    gradient: 'from-[#4A8B8E] to-[#356B6E]',
    image: '/images/features/home-care.jpg'
  },
  {
    id: 'response',
    icon: MessageCircle,
    title: 'استجابة فورية (استشارتك الأولى علينا)',
    description: 'رد طبي موثوق خلال 15 دقيقة. استشارتك الأولى علينا بالكامل',
    gradient: 'from-[#4A8B8E] to-[#356B6E]',
    badge: 'مجاناً',
    image: '/images/features/response.jpg'
  },
  {
    id: 'financial',
    icon: Wallet,
    title: 'عالمٌ من التوفير',
    description: 'استثمر عضويتك.. وضاعف توفيرك مع كبرى العلامات الطبية',
    gradient: 'from-[#4A8B8E] to-[#356B6E]',
    badge: 'حتى 80%',
    image: '/images/features/financial.jpg'
  },
  {
    id: 'payment',
    icon: CreditCard,
    title: 'دفع مرن.. بدون ضغوط',
    description: 'دفع إلكتروني + تقسيط مريح عبر تابي وتمارا',
    gradient: 'from-[#4A8B8E] to-[#356B6E]',
    image: '/images/features/payment.jpg'
  },
  {
    id: 'transparency',
    icon: Star,
    title: 'شفافية تمنحك الثقة',
    description: 'اطلع على التقييمات الحقيقية للمراكز الطبية من عملاء سبقوك',
    gradient: 'from-[#4A8B8E] to-[#356B6E]',
    image: '/images/features/transparency.jpg'
  }
];

export function FeaturesPopover({ locale, isMobile = false }: FeaturesPopoverProps) {
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
          <span className="flex-1 text-center">{locale === 'ar' ? 'مميزاتنا' : 'Features'}</span>
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
            aria-label={locale === 'ar' ? 'قائمة المميزات' : 'Features menu'}
          >
            {/* Handle Bar */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">
                {locale === 'ar' ? 'مميزاتنا التنافسية' : 'Our Features'}
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label={locale === 'ar' ? 'إغلاق' : 'Close'}
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Features Grid */}
            <div className="p-4 space-y-2">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.id}
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 group"
                  >
                    {/* Image */}
                    <div className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden bg-gray-50 relative border-2 border-dashed border-gray-300`}>
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
                          {feature.title}
                        </h4>
                        {feature.badge && (
                          <span className={`text-xs font-bold text-white bg-gradient-to-r ${feature.gradient} px-2 py-0.5 rounded-full`}>
                            {feature.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* View All Link */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <Link
                href={`/${locale}`}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-gradient-to-r from-[#4A8B8E] to-[#356B6E] text-white font-semibold rounded-xl hover:shadow-lg transition-all"
              >
                <span>{locale === 'ar' ? 'شاهد جميع المميزات' : 'View All Features'}</span>
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
          pathname.includes('#features')
            ? 'text-[#4A8B8E] bg-[#4A8B8E]/10'
            : 'text-gray-700 hover:text-[#4A8B8E] hover:bg-[#4A8B8E]/5'
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {locale === 'ar' ? 'مميزاتنا' : 'Features'}
        
        {/* Hover effect */}
        <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#4A8B8E]/0 via-[#4A8B8E]/5 to-[#4A8B8E]/0" />
      </button>

      {/* Popover */}
      {isOpen && (
        <div
          ref={popoverRef}
          className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-[900px] max-w-[95vw] bg-white rounded-2xl shadow-2xl border border-gray-200 animate-in fade-in slide-in-from-top-2 duration-200 z-50"
          role="dialog"
          aria-label={locale === 'ar' ? 'قائمة المميزات' : 'Features menu'}
        >
          {/* Arrow */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-gray-200 rotate-45" />

          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">
              {locale === 'ar' ? 'لماذا "أمان إيفر" هي خيارك الأول؟' : 'Why "Aman Ever" is Your First Choice?'}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {locale === 'ar' ? 'مميزات صُممت خصيصاً لتمنحك رعاية شاملة' : 'Features designed specifically for comprehensive care'}
            </p>
          </div>

          {/* Features Grid - 3 columns */}
          <div className="grid grid-cols-3 gap-3 p-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.id}
                  className="flex flex-col gap-3 p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 group relative overflow-hidden"
                >
                  {/* Badge */}
                  {feature.badge && (
                    <span className={`absolute top-2 right-2 text-xs font-bold text-white bg-gradient-to-r ${feature.gradient} px-2 py-1 rounded-full z-10`}>
                      {feature.badge}
                    </span>
                  )}

                  {/* Image */}
                  <div className={`w-full h-24 rounded-xl overflow-hidden bg-gray-50 relative border-2 border-dashed border-gray-300`}>
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
                      {feature.title}
                    </h4>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
            <Link
              href={`/${locale}`}
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 text-sm font-semibold text-[#4A8B8E] hover:bg-[#4A8B8E]/10 rounded-lg transition-colors"
            >
              <span>{locale === 'ar' ? 'شاهد جميع المميزات بالتفصيل' : 'View All Features in Detail'}</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
