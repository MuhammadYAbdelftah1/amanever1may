/**
 * Core Services Section (Section 4)
 * Displays the 6 primary services of Aman Ever.
 * Placement: After Hero, before other sections.
 * Updated with new service cards matching services page.
 */

'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { NetworkMapPopover } from '@/components/shared/network-map-popover';
import { ServiceDetailsModal } from '@/components/shared/service-details-modal';

interface CoreServicesSectionProps {
  locale: string;
}

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

const content = {
  eyebrow: 'باقة خدماتنا',
  title: 'رعاية متكاملة.. صُممت لأجلك',
  subtitle: 'وش تحتاج اليوم؟',
  description: 'راحتك هي أولويتنا.. استكشف باقة خدماتنا الشاملة واختر ما يلبي احتياجك بضغطة زر واحدة عبر تطبيق أمان إيفر.',
  sectionSubtitle: 'حلول صحية مبتكرة صممت لضمان راحتك وسلامتك',
  mostPopular: 'الأكثر طلباً',
  services: [
    {
      id: 'membership',
      icon: 'CreditCard',
      image: '/services/membership.jpg',
      title: 'بطاقات العضوية (بريمير و VIP)',
      tagline: 'الأكثر طلباً',
      description: 'استثمارك في صحتك.. يعود إليك كأرباح فورية! برنامج مكافآت ذكي يحول نفقاتك الطبية إلى قيمة مضافة حقيقية مع خصومات تصل إلى 80%',
      ctaLabel: 'اكتشف المزيد',
      ctaHref: '/services#membership',
    },
    {
      id: 'cashback',
      icon: 'Wallet',
      image: '/services/cashback.jpg',
      title: 'برنامج الكاش باك من أمان إيفر',
      tagline: 'استثمارك في صحتك.. يعود إليك كأرباح فورية!',
      description: 'لأننا نقدر حرصك على عافيتك، صممنا لك برنامج مكافآت ذكي يحول نفقاتك الطبية والصحية والتجميلية إلى قيمة مضافة. بمجرد اشتراكك في إحدى بطاقاتنا أو باقاتنا، ستحصل على رصيد خدمات فوري يُودع في محفظتك الإلكترونية بدون أي تعقيدات.',
      features: [
        'عضوية "أمان إيفر بريمير" (Premier): انضم إلى الفئة النخبوية واستمتع بأعلى نسب الكاش باك المتاحة حصرياً لمشتركي "بريمير".',
        'عضوية الـ VIP: احصل على النسبة الأعلى من الكاش باك والمميزات الحصرية عند اشتراكك في فئة الـ VIP.',
        'رصيد خدمات مباشر: احصل على رصيدك فور الاشتراك دون شروط معقدة أو فترات انتظار.',
        'توفير من اللحظة الأولى: رصيدك متاح للاستخدام الفوري عند تنفيذ أول عملية شراء لخدماتك الطبية أو الصحية أو التجميلية.',
        'شبكة واسعة: استخدم الكاش باك لتغطية تكاليف فحوصاتك وعلاجاتك لدى أكبر مجموعة من مقدمي الرعاية الصحية.'
      ],
      ctaLabel: 'ابدأ رحلة التوفير الآن',
      secondaryCtaLabel: 'اشترك في بطاقات أمان إيفر',
      ctaHref: '/services#cashback',
    },
    {
      id: 'points',
      icon: 'Gift',
      image: '/services/points.jpg',
      title: 'محفظة نقاط أمان إيفر',
      tagline: 'ولاءٌ يُقدّر اهتمامك بصحتك',
      description: 'بصفتك حاملاً لإحدى بطاقاتنا الحصرية أو مشتركاً في إحدى باقاتنا المميزة، نحن لا نقدم لك الرعاية الطبية فحسب، بل نكافئك عليها. اجعل من رحلتك العلاجية استثماراً ذكياً، حيث تتحول كل عملية شراء أو طلب خدمة إلى نقاط تُضاف تلقائياً إلى محفظتك.',
      ctaLabel: 'اكتشف المزيد',
      ctaHref: '/services#points',
    },
    {
      id: 'instant-booking',
      icon: 'Zap',
      image: '/services/booking.jpg',
      title: 'حجوزات واستشارات طبية فورية (صوتية ومرئية)',
      tagline: 'فوري',
      description: 'طبيبك معك أينما كنت.. احجز موعدك دون انتظار، أو احصل على استشارتك الطبية (صوت، فيديو، محادثة) على مدار الساعة مع نخبة من الأطباء.',
      ctaLabel: 'احجز الآن',
      ctaHref: '/services#instant-booking',
    },
    {
      id: 'home-care',
      icon: 'Home',
      image: '/services/home-care.jpg',
      title: 'خدمات الرعاية المنزلية',
      tagline: 'رعاية طبية متكاملة تصلك إلى باب بيتك',
      description: 'نقدم لكم طاقماً معتمداً للزيارات الطبية يضم نخبة من الأطباء والاستشاريين والممرضين والممرضات المؤهلين لتقديم أعلى مستويات الرعاية. نوفر لك الراحة والأمان بتلقي العلاج في منزلك دون الحاجة للتنقل، مع عناية خاصة بالأطفال وكبار السن.',
      features: [
        'رعاية شاملة لكل العائلة: تمريض وعناية طبية متخصصة تغطي جميع أفراد أسرتك (من الأطفال وحتى كبار السن) تحت إشراف أطباء مختصين.',
        'عيادة متكاملة في غرفتك: إجراء الفحوصات المخبرية، جلسات العلاج الطبيعي، التأهيل، الحجامة، والعديد من خدمات الرعاية المنزلية دون الحاجة لمغادرة منزلك.',
        'عناية متخصصة ومستمرة: متابعة دقيقة لأصحاب الأمراض المزمنة، ورعاية فائقة واحترافية لما بعد العمليات الجراحية يقدمها ممرضون وممرضات ذوي خبرة.',
        'راحة بالك هي الأهم: تجربة علاجية آمنة وموثوقة، توفر عليك الجهد وتمنحك الطمأنينة في بيتك وبين عائلتك.'
      ],
      ctaLabel: 'اطلب الخدمة الآن',
      secondaryCtaLabel: 'اشترك في احدى بطاقاتنا او باقاتنا',
      ctaHref: '/services#home-care',
    },
    {
      id: 'ask-doctor',
      icon: 'MessageCircle',
      image: '/services/ask-doctor.jpg',
      title: 'اسأل طبيب',
      tagline: 'استشارة فورية',
      description: 'استشارات طبية فورية (صوتية ومرئية) على مدار الساعة مع نخبة من الأطباء المعتمدين. رد خلال 15 دقيقة عبر الشات، الصوت، أو الفيديو.',
      ctaLabel: 'اكتشف المزيد',
      ctaHref: '/services#ask-doctor',
    },
    {
      id: 'store',
      icon: 'ShoppingBag',
      image: '/services/store.jpg',
      title: 'متجر أمان الإلكتروني',
      tagline: 'بوابتك المتكاملة للصحة والجمال بضغطة زر',
      description: 'استمتع بتجربة تسوق ذكية وفريدة تجمع لك كل ما تحتاجه من منتجات وخدمات طبية، صحية، وتجميلية في مكان واحد. مع بطاقات أمان إيفر وباقاتها الخاصة، نمنحك قوة توفير إضافية ومزايا حصرية تجعل من العناية بصحتك وجمالك تجربة سلسة ومجزية.',
      features: [
        'تنوع بلا حدود: خيارات واسعة وشاملة من المنتجات والخدمات التي تلبي كافة احتياجاتك اليومية واحتياجات عائلتك.',
        'عروض حصرية لمشتركي الباقات: استفد من خصومات وتخفيضات مستمرة ومخصصة حصرياً لحاملي بطاقات أمان إيفر، لضمان حصولك على أفضل قيمة.',
        'توصيل سريع وآمن: طلباتك تصلك إلى باب منزلك بأقصى سرعة، مع تغليف احترافي يضمن أعلى معايير الأمان والجودة.',
        'دفع مرن وميسر: تجربة تسوق مريحة بالكامل مع خيارات دفع متعددة ومتنوعة تتناسب مع ميزانيتك.'
      ],
      ctaLabel: 'تصفح المتجر الآن',
      secondaryCtaLabel: 'واشترك الان في إحدى بطاقات وباقات أمان إيفر',
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
      ctaHref: '#',
    },
    {
      id: 'health-network',
      icon: 'Dumbbell',
      image: '/services/health-network.jpg',
      title: 'استكشف الشبكة الصحية الآن',
      tagline: 'شبكة صحية',
      description: 'خصومات على فتنس تايم، جولدز جيم، عيادات التغذية، مراكز البصريات، والسبا لنمط حياة صحي متكامل.',
      ctaLabel: 'استكشف الشبكة',
      ctaHref: '#',
    },
  ],
};

function ServiceCard({ service, index, locale }: { service: Service; index: number; locale: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const [showNetworkDialog, setShowNetworkDialog] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
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
    e.preventDefault();
    if (isNetworkCard) {
      setShowNetworkDialog(true);
    } else {
      setShowServiceModal(true);
    }
  };

  const CardWrapper = 'div';
  const cardProps = { onClick: handleClick };

  return (
    <>
      <CardWrapper
        {...cardProps}
        ref={ref as any}
        className={`group relative h-full rounded-2xl bg-white overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 block cursor-pointer ${
          isVisible ? 'animate-in fade-in slide-in-from-bottom-4' : 'opacity-0'
        }`}
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

    {/* Network Dialog - Controlled */}
    {isNetworkCard && (
      <NetworkMapPopover 
        locale={locale} 
        type={networkType}
        isOpen={showNetworkDialog}
        onOpenChange={setShowNetworkDialog}
      />
    )}
    
    {/* Service Details Modal */}
    {!isNetworkCard && (
      <ServiceDetailsModal
        isOpen={showServiceModal}
        onClose={() => setShowServiceModal(false)}
        serviceId={service.id}
        locale={locale}
      />
    )}
  </>
  );
}

export function CoreServicesSection({ locale }: CoreServicesSectionProps) {
  return (
    <section className="pt-8 md:pt-12 pb-16 md:pb-24 bg-gradient-to-b from-white to-gray-50" aria-labelledby="core-services-heading">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 md:mb-10 max-w-4xl mx-auto">
          <p className="text-sm font-bold text-[#1a472a] uppercase tracking-wider mb-2">
            {content.eyebrow}
          </p>
          <h2
            id="core-services-heading"
            className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-2"
          >
            {content.title}
          </h2>
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">
            {content.subtitle}
          </h3>
          <p className="text-lg text-gray-600 leading-relaxed mb-1">{content.description}</p>
          <p className="text-base text-gray-500 italic">{content.sectionSubtitle}</p>
        </div>

        {/* Most Popular Badge */}
        <div className="text-center mb-8">
          <span className="inline-block px-6 py-2 bg-[#1a472a] text-white font-bold rounded-full text-sm shadow-lg">
            {content.mostPopular}
          </span>
        </div>

        {/* Service Cards Grid - 8 Cards in 4 columns on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {content.services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}
