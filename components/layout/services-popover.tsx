'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  CreditCard,
  Wallet,
  Gift,
  Zap,
  Home,
  MessageCircle,
  ShoppingBag,
  Building2, 
  Dumbbell,
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
  features?: string[];
}

const services: Service[] = [
  {
    id: 'membership',
    icon: CreditCard,
    title: 'عضوية أمان إيفر',
    description: 'بطاقة واحدة.. توفّر لك حتى 80% من نفقاتك الصحية! اختر التغطية الأنسب لك، وأصدر بطاقتك إلكترونياً خلال 60 ثانية فقط. بلا موافقات مسبقة، وبدون أي قيود للعمر.',
    href: '/services#membership',
    badge: 'الأكثر طلباً',
    image: '/services/membership.jpg',
    features: [
      'خصم يصل إلى 60% على الشبكة الطبية (Premier)',
      'خصم حصري يصل إلى 80% (VIP)',
      'إصدار فوري للبطاقة خلال 60 ثانية',
      'صالحة في 2000+ مركز طبي',
      'بدون موافقات مسبقة',
      'تغطية شاملة للعائلة (VIP)'
    ]
  },
  {
    id: 'cashback',
    icon: Wallet,
    title: 'برنامج الكاش باك',
    description: 'استرداد نقدي يصل إلى 15% عند شراء البطاقة أو أول استخدام في الشبكة الطبية. عوائد مالية فورية.',
    href: '/services#cashback',
    badge: 'CASHBACK',
    image: '/services/cashback.jpg',
    features: [
      'استرداد نقدي يصل إلى 15%',
      'مكافأة ترحيبية عند الاشتراك',
      'كاش باك على كل فاتورة طبية',
      'مكافآت إضافية على المشتريات',
      'إمكانية سحب الرصيد أو استخدامه',
      'لا حد أقصى للاسترداد النقدي'
    ]
  },
  {
    id: 'points',
    icon: Gift,
    title: 'محفظة النقاط',
    description: 'اجمع نقاط ولاء مع كل زيارة طبية أو شراء من صيدليات النهدي والدواء واستبدلها برصيد خدمات',
    href: '/services#points',
    badge: 'محفظة نقاط',
    image: '/services/points.jpg',
    features: [
      'نقاط على كل زيارة طبية',
      'نقاط على المشتريات من الصيدليات',
      'استبدال النقاط برصيد خدمات',
      'عروض حصرية لأصحاب النقاط',
      'نقاط لا تنتهي صلاحيتها'
    ]
  },
  {
    id: 'instant-booking',
    icon: Zap,
    title: 'حجوزات واستشارات طبية فورية',
    description: 'طبيبك معك أينما كنت.. احجز موعدك دون انتظار، أو احصل على استشارتك الطبية (صوت، فيديو، محادثة) على مدار الساعة.',
    href: '/services#instant-booking',
    badge: 'فوري',
    image: '/services/booking.jpg',
    features: [
      'حجز فوري بدون انتظار',
      'استشارات صوت وفيديو ومحادثة',
      'متاح 24/7 على مدار الساعة',
      'أطباء معتمدين من الهيئة',
      'تقارير طبية فورية'
    ]
  },
  {
    id: 'home-care',
    icon: Home,
    title: 'خدمات الرعاية المنزلية',
    description: 'رعاية طبية متكاملة تصلك إلى باب بيتك.. طاقم معتمد للزيارات الطبية، العلاج الطبيعي، وعناية خاصة بالأطفال وكبار السن.',
    href: '/services#home-care',
    badge: 'رعاية منزلية',
    image: '/services/home-care.jpg',
    features: [
      'زيارات منزلية من أطباء معتمدين',
      'علاج طبيعي في المنزل',
      'رعاية خاصة لكبار السن',
      'رعاية الأطفال المنزلية',
      'خدمة متاحة نفس اليوم'
    ]
  },
  {
    id: 'ask-doctor',
    icon: MessageCircle,
    title: 'اسأل طبيب',
    description: 'استشارات طبية فورية على مدار الساعة مع نخبة من الأطباء المعتمدين. رد خلال 15 دقيقة عبر الشات، الصوت، أو الفيديو.',
    href: '/services#ask-doctor',
    badge: 'استشارة فورية',
    image: '/services/ask-doctor.jpg',
    features: [
      'رد خلال 15 دقيقة',
      'أطباء معتمدين من SCFHS',
      'استشارات غير محدودة للمشتركين',
      'السؤال الأول مجاناً',
      'خصوصية تامة ومحادثات مشفرة'
    ]
  },
  {
    id: 'store',
    icon: ShoppingBag,
    title: 'متجر أمان إيفر الإلكتروني',
    description: 'منتجات طبية، مكملات غذائية، ومستحضرات تجميلية أصلية بأسعار مخفضة وعروض حصرية لأعضاء أمان.',
    href: '/services#store',
    badge: 'عروض حصرية',
    image: '/services/store.jpg',
    features: [
      'منتجات أصلية 100%',
      'أسعار مخفضة للأعضاء',
      'توصيل سريع للمنزل',
      'عروض حصرية أسبوعية',
      'ضمان الجودة والاسترجاع'
    ]
  },
  {
    id: 'medical-network',
    icon: Building2,
    title: 'استكشف الشبكة الطبية الآن',
    description: 'وصول مباشر لأكثر من 2000 مركز طبي: مستشفيات، عيادات، مختبرات البرج، صيدليات النهدي والدواء في كافة مدن المملكة.',
    href: '#',
    badge: 'شبكة طبية',
    image: '/services/medical-network.jpg',
    features: [
      '2000+ مركز طبي معتمد',
      'مستشفيات رائدة في المملكة',
      'مختبرات البرج المعتمدة',
      'صيدليات النهدي والدواء',
      'تغطية في 50+ مدينة'
    ]
  },
  {
    id: 'health-network',
    icon: Dumbbell,
    title: 'استكشف الشبكة الصحية الآن',
    description: 'لأنك من عائلة أمان إيفر، فتحنا لك أبواب التوفير مع كبرى العلامات الطبية والصحية.. عروض حصرية صُممت خصيصاً لتلبي احتياجاتك.',
    href: '#',
    badge: 'شبكة صحية',
    image: '/services/health-network.jpg',
    features: [
      'نوادي رياضية: فتنس تايم، جولدز جيم',
      'مراكز سبا وتجميل فاخرة',
      'عيادات تغذية متخصصة',
      'مراكز بصريات معتمدة',
      'عروض حصرية للأعضاء'
    ]
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
          <span className="flex-1 text-center">
            {locale === 'ar' ? 'خدماتنا' : locale === 'ur' ? 'ہماری خدمات' : 'Services'}
          </span>
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
            aria-label={locale === 'ar' ? 'قائمة الخدمات' : locale === 'ur' ? 'خدمات کی فہرست' : 'Services menu'}
          >
            {/* Handle Bar */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
            </div>

            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">
                {locale === 'ar' ? 'رعاية متكاملة.. صُممت لأجلك' : locale === 'ur' ? 'مکمل دیکھ بھال.. آپ کے لیے ڈیزائن کیا گیا' : 'Comprehensive Care.. Designed for You'}
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label={locale === 'ar' ? 'إغلاق' : locale === 'ur' ? 'بند کریں' : 'Close'}
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Services Grid */}
            <div className="p-4 space-y-3">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <Link
                    key={service.id}
                    href={`/${locale}${service.href}`}
                    onClick={() => setIsOpen(false)}
                    className="flex flex-col gap-3 p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 group border border-gray-100"
                  >
                    {/* Header with Image and Title */}
                    <div className="flex items-center gap-3">
                      {/* Image */}
                      <div className="flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden bg-gray-50 relative border-2 border-dashed border-gray-300">
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center">
                          <div className="text-[9px] font-semibold text-gray-700 mb-0.5">
                            للمصممة
                          </div>
                          <div className="text-[8px] text-gray-500">
                            64×64
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex-1">
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
                    </div>

                    {/* Features - Centered */}
                    {service.features && service.features.length > 0 && (
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs font-semibold text-[#1a472a] mb-2 text-center">المميزات الرئيسية</p>
                        <ul className="space-y-1.5">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="text-xs text-gray-600 flex items-center justify-center gap-2">
                              <span className="text-[#1a472a] font-bold">✓</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Arrow */}
                    <div className="flex items-center justify-center gap-2 text-sm font-medium text-[#1a472a]">
                      <span>اكتشف المزيد</span>
                      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-all" />
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <Link
                href={`/${locale}/services`}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-[#1a472a] text-white font-semibold rounded-xl hover:bg-[#2d5a3d] transition-colors"
              >
                <span>
                  {locale === 'ar' 
                    ? 'عرض جميع الخدمات' 
                    : locale === 'ur'
                    ? 'تمام خدمات دیکھیں'
                    : 'View All Services'}
                </span>
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
        {locale === 'ar' ? 'خدماتنا' : locale === 'ur' ? 'ہماری خدمات' : 'Services'}
        
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
          aria-label={locale === 'ar' ? 'قائمة الخدمات' : locale === 'ur' ? 'خدمات کی فہرست' : 'Services menu'}
        >
          {/* Arrow */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-gray-200 rotate-45" />

          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">
              {locale === 'ar' ? 'رعاية متكاملة.. صُممت لأجلك' : locale === 'ur' ? 'مکمل دیکھ بھال.. آپ کے لیے ڈیزائن کیا گیا' : 'Comprehensive Care.. Designed for You'}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {locale === 'ar' 
                ? 'راحتك هي أولويتنا.. استكشف باقة خدماتنا الشاملة واختر ما يلبي احتياجك بضغطة زر واحدة عبر تطبيق أمان إيفر.' 
                : locale === 'ur'
                ? 'آپ کا آرام ہماری ترجیح ہے.. ہماری جامع خدمات دریافت کریں اور Aman Ever ایپ کے ذریعے ایک کلک سے اپنی ضروریات کو پورا کریں۔'
                : 'Your comfort is our priority.. Explore our comprehensive services and choose what meets your needs with one click via Aman Ever app.'}
            </p>
          </div>

          {/* Services Grid - 2 columns */}
          <div 
            className="grid grid-cols-2 gap-3 p-4 overflow-y-scroll services-scrollbar"
            style={{ 
              maxHeight: '500px'
            }}
          >
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
                  <div className="text-center">
                    <h4 className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-[#1a472a] transition-colors">
                      {service.title}
                    </h4>
                    <p className="text-xs text-gray-600 line-clamp-2 mb-3">
                      {service.description}
                    </p>
                    {service.features && service.features.length > 0 && (
                      <div className="bg-gray-50 rounded-lg p-2">
                        <p className="text-[10px] font-semibold text-[#1a472a] mb-1.5">المميزات الرئيسية</p>
                        <ul className="space-y-1">
                          {service.features.slice(0, 4).map((feature, idx) => (
                            <li key={idx} className="text-[10px] text-gray-600 flex items-center justify-center gap-1">
                              <span className="text-[#1a472a] font-bold text-xs">✓</span>
                              <span className="line-clamp-1">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Arrow */}
                  <div className="flex items-center justify-center gap-1 text-xs font-medium text-[#1a472a] opacity-0 group-hover:opacity-100 transition-opacity">
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
              <span>
                {locale === 'ar' 
                  ? 'عرض جميع الخدمات والتفاصيل' 
                  : locale === 'ur'
                  ? 'تمام خدمات اور تفصیلات دیکھیں'
                  : 'View All Services & Details'}
              </span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}


// Add custom scrollbar styles
if (typeof window !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    .services-scrollbar::-webkit-scrollbar {
      width: 8px;
    }
    
    .services-scrollbar::-webkit-scrollbar-track {
      background: #f1f5f9;
      border-radius: 10px;
    }
    
    .services-scrollbar::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 10px;
    }
    
    .services-scrollbar::-webkit-scrollbar-thumb:hover {
      background: #94a3b8;
    }
    
    .services-scrollbar {
      scrollbar-width: thin;
      scrollbar-color: #cbd5e1 #f1f5f9;
    }
  `;
  
  if (!document.head.querySelector('style[data-services-scrollbar]')) {
    style.setAttribute('data-services-scrollbar', 'true');
    document.head.appendChild(style);
  }
}
