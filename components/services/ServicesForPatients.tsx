'use client';

import { ArrowLeft } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { motion } from 'framer-motion';
import { patientsSection } from '@/lib/data/services-config';
import { NetworkMapPopover } from '@/components/shared/network-map-popover';

type Service = {
  id: string;
  icon: string;
  image: string;
  title: string;
  tagline: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
};

const services: Service[] = [
  {
    id: 'membership',
    icon: 'CreditCard',
    image: '/services/membership.jpg',
    title: 'بطاقات العضوية (بريمير و VIP)',
    tagline: 'الأكثر طلباً',
    description: 'خصومات تصل إلى 80% في مستشفى سليمان الحبيب، الموسى، السعودي الألماني، وأكثر من 2000 مركز طبي. إصدار فوري.',
    ctaLabel: 'اكتشف المزيد',
    ctaHref: '/services#membership',
  },
  {
    id: 'cashback',
    icon: 'Wallet',
    image: '/services/cashback.jpg',
    title: 'برنامج الكاش باك',
    tagline: 'CASHBACK',
    description: 'استرداد نقدي يصل إلى 15% عند شراء البطاقة أو أول استخدام في الشبكة الطبية. عوائد مالية فورية.',
    ctaLabel: 'اكتشف المزيد',
    ctaHref: '/services#cashback',
  },
  {
    id: 'points',
    icon: 'Gift',
    image: '/services/points.jpg',
    title: 'محفظة النقاط',
    tagline: 'محفظة نقاط',
    description: 'اجمع نقاط ولاء مع كل زيارة طبية أو شراء من صيدليات النهدي والدواء واستبدلها برصيد خدمات',
    ctaLabel: 'اكتشف المزيد',
    ctaHref: '/services#points',
  },
  {
    id: 'instant-booking',
    icon: 'Zap',
    image: '/services/booking.jpg',
    title: 'حجوزات واستشارات طبية فورية',
    tagline: 'فوري',
    description: 'طبيبك معك أينما كنت.. احجز موعدك دون انتظار، أو احصل على استشارتك الطبية (صوت، فيديو، محادثة) على مدار الساعة.',
    ctaLabel: 'اكتشف المزيد',
    ctaHref: '/services#instant-booking',
  },
  {
    id: 'home-care',
    icon: 'Home',
    image: '/services/home-care.jpg',
    title: 'خدمات الرعاية المنزلية',
    tagline: 'رعاية منزلية',
    description: 'رعاية طبية متكاملة تصلك إلى باب بيتك.. طاقم معتمد للزيارات الطبية، العلاج الطبيعي، وعناية خاصة بالأطفال وكبار السن.',
    ctaLabel: 'اكتشف المزيد',
    ctaHref: '/services#home-care',
  },
  {
    id: 'ask-doctor',
    icon: 'MessageCircle',
    image: '/services/ask-doctor.jpg',
    title: 'اسأل طبيب',
    tagline: 'استشارة فورية',
    description: 'استشارات طبية فورية على مدار الساعة مع نخبة من الأطباء المعتمدين. رد خلال 15 دقيقة عبر الشات، الصوت، أو الفيديو.',
    ctaLabel: 'اكتشف المزيد',
    ctaHref: '/services#ask-doctor',
  },
  {
    id: 'store',
    icon: 'ShoppingBag',
    image: '/services/store.jpg',
    title: 'متجر أمان إيفر الإلكتروني',
    tagline: 'عروض حصرية',
    description: 'منتجات طبية، مكملات غذائية، ومستحضرات تجميلية أصلية بأسعار مخفضة وعروض حصرية لأعضاء أمان.',
    ctaLabel: 'اكتشف المزيد',
    ctaHref: '/services#store',
  },
  {
    id: 'medical-network',
    icon: 'Building2',
    image: '/services/medical-network.jpg',
    title: 'استكشف الشبكة الطبية الآن',
    tagline: 'شبكة طبية',
    description: 'وصول مباشر لأكثر من 2000 مركز طبي: مستشفيات، عيادات، مختبرات البرج، صيدليات النهدي والدواء في كافة مدن المملكة.',
    ctaLabel: 'استكشف الشبكة',
    ctaHref: '#', // Will be handled by onClick
  },
  {
    id: 'health-network',
    icon: 'Dumbbell',
    image: '/services/health-network.jpg',
    title: 'استكشف الشبكة الصحية الآن',
    tagline: 'شبكة صحية',
    description: 'لأنك من عائلة أمان إيفر، فتحنا لك أبواب التوفير مع كبرى العلامات الطبية والصحية.. عروض حصرية صُممت خصيصاً لتلبي احتياجاتك.',
    ctaLabel: 'استكشف الشبكة',
    ctaHref: '#', // Will be handled by onClick
  },
];

function ServiceCard({ service, index, locale }: { service: Service; index: number; locale?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const [showNetworkDialog, setShowNetworkDialog] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  // Dynamically get the icon component
  const IconComponent = (LucideIcons as any)[service.icon] || LucideIcons.Circle;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  // Check if this is a network card
  const isNetworkCard = service.id === 'medical-network' || service.id === 'health-network';
  const networkType = service.id === 'medical-network' ? 'medical' : 'health';

  const handleClick = (e: React.MouseEvent) => {
    if (isNetworkCard) {
      e.preventDefault();
      setShowNetworkDialog(true);
    }
  };

  const CardWrapper = isNetworkCard ? 'div' : 'a';
  const cardProps = isNetworkCard 
    ? { onClick: handleClick }
    : { href: service.ctaHref };

  return (
    <>
      <div className="relative">
        {/* Anchor point for hash navigation */}
        <div id={service.id} className="absolute -top-24" aria-hidden="true" />
        
        <CardWrapper
          {...cardProps}
          ref={ref as any}
          className={`group relative h-full rounded-2xl bg-white overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 block ${
            isVisible ? 'animate-in fade-in slide-in-from-bottom-4' : 'opacity-0'
          } ${isNetworkCard ? 'cursor-pointer' : ''}`}
          style={{
            animationDelay: `${index * 100}ms`,
            animationFillMode: 'forwards',
          }}
        >
      {/* Image Section - Takes most of the card */}
      <div className="relative w-full h-64 bg-gradient-to-br from-[#1a472a]/10 via-[#2d5a3d]/5 to-[#1a472a]/10 overflow-hidden">
        {/* Placeholder for designer's image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-6">
            <div className="text-6xl mb-3 opacity-20">
              <IconComponent className="w-16 h-16 mx-auto text-[#1a472a]" />
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 border-2 border-dashed border-gray-300">
              <p className="text-xs font-bold text-gray-700 mb-1">إشعار للمصممة</p>
              <p className="text-[10px] text-gray-600 mb-1">
                صورة الخدمة: {service.title}
              </p>
              <p className="text-[9px] text-gray-500 font-semibold">
                المقاس: 384×256 بكسل
              </p>
            </div>
          </div>
        </div>

        {/* Badge */}
        {service.tagline && (
          <div className="absolute left-4 top-4 rounded-full bg-[#1a472a] px-3 py-1 text-xs font-semibold text-white shadow-lg z-10">
            {service.tagline}
          </div>
        )}

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 transition-colors group-hover:text-[#1a472a]">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
          {service.description}
        </p>

        {/* CTA */}
        <div className="flex items-center gap-2 text-sm font-semibold text-[#1a472a] transition-all group-hover:gap-3">
          <span>{service.ctaLabel}</span>
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
        </div>
      </div>

        {/* Decorative corner */}
        <div className="absolute bottom-0 right-0 h-20 w-20 translate-x-10 translate-y-10 rounded-full bg-[#1a472a]/5 transition-transform duration-300 group-hover:translate-x-8 group-hover:translate-y-8" />
      </CardWrapper>
      </div>

      {/* Network Dialog - Controlled */}
      {isNetworkCard && (
        <NetworkMapPopover 
          locale={locale || 'ar'} 
          type={networkType}
          isOpen={showNetworkDialog}
          onOpenChange={setShowNetworkDialog}
        />
      )}
    </>
  );
}

export function ServicesForPatients({ locale = 'ar' }: { locale?: string }) {
  return (
    <section
      id="for-patients"
      className="py-20 md:py-28 bg-gradient-to-b from-white to-gray-50"
      aria-labelledby="patients-section-title"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm font-bold text-[#1a472a] uppercase tracking-wider mb-4"
          >
            {patientsSection.tag}
          </motion.p>

          <motion.h2
            id="patients-section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-6"
          >
            {patientsSection.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-700 leading-relaxed"
          >
            {patientsSection.subtitle}
          </motion.p>
        </div>

        {/* Service Cards Grid - 8 Cards in 4 columns on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}
