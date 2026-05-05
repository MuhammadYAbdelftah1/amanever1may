'use client';

// TODO: Replace with actual pricing from business team.
// Current values are placeholder. Confirm with product owner before launch.

import { CheckCircle2, XCircle, Calculator, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { MembershipModal } from '@/components/membership/MembershipModal';
import { BusinessContactModal } from '@/components/membership/BusinessContactModal';
import Image from 'next/image';

interface MembershipPricingSectionProps {
  locale: string;
}

type Tier = {
  id: 'premier' | 'vip' | 'business';
  name: string;
  tagline: string;
  priceYearly: number | string;
  priceMonthly: number | string;
  features: string[];
  isRecommended?: boolean;
  ctaLabel: string;
  ctaHref: string;
  headerBg: string;
  headerTextColor: string;
};

const content = {
  eyebrow: 'باقات أمان إيفر',
  title: 'رعاية متكاملة.. اختر ما يناسبك',
  subtitle: '8 باقات صُممت بعناية لتلبي احتياجات الجميع؛ من الأفراد والعائلات، إلى الشركات والفئات المجتمعية الخاصة.',
  calculator: {
    body: 'تشير الإحصائيات إلى أن متوسط إنفاق العائلة في السعودية يبلغ ٤٬٨٠٠ ريال سنوياً على الخدمات الطبية والتجميلية. مع أمان إيفر، يصل توفيرك إلى ٣٬٤٠٠ ريال سنوياً (ما يعادل ١٠ أضعاف قيمة اشتراكك!).',
    cta: 'احسب توفيرك الآن',
  },
  tiers: [
    {
      id: 'premier' as const,
      name: 'Premier',
      tagline: 'رعايتك الصحية اليومية.. بذكاء وتوفير',
      priceYearly: 299,
      priceMonthly: 24.9,
      features: [
        'خصم يصل إلى ٦٠٪ على الشبكة الطبية',
        'حجوزات فورية مع أفضل الأطباء',
        'استشارة "اسأل طبيب" مجاناً',
        'كاش باك ٥٪ على كل فاتورة',
        'نقاط ولاء قابلة للاستبدال الفوري',
        'دعم عملاء يرافقك ٢٤/٧',
      ],
      ctaLabel: 'اشترك في Premier',
      ctaHref: '/register',
      headerBg: 'bg-emerald-50',
      headerTextColor: 'text-slate-900',
    },
    {
      id: 'vip' as const,
      name: 'VIP',
      tagline: 'الخيار الأمثل للعائلات والباحثين عن الرفاهية',
      priceYearly: 499,
      priceMonthly: 41.5,
      isRecommended: true,
      features: [
        'كل مزايا Premier، بالإضافة إلى:',
        'خصم حصري يصل إلى ٨٠٪',
        'تغطية عائلية تشمل ٤ أفراد',
        'زيارة طبيب منزلية (مجانية شهرياً)',
        'فحص طبي شامل (سنوي مجاني)',
        'أولوية قصوى في الحجوزات لدى أطباء VIP',
        'كاش باك مضاعف ١٠٪',
        'مدير حساب شخصي عبر WhatsApp لخدمتك',
      ],
      ctaLabel: 'اشترك مباشرة عبر WhatsApp',
      ctaHref: 'https://wa.me/966500000000?text=مرحباً، أريد الاشتراك في باقة VIP',
      headerBg: 'bg-gradient-to-br from-slate-900 to-emerald-900',
      headerTextColor: 'text-white',
    },
    {
      id: 'business' as const,
      name: 'Business',
      tagline: 'استثمر في صحة فريقك.. لنجاح مستدام',
      priceYearly: 'حسب الاتفاق',
      priceMonthly: 'حسب الاتفاق',
      features: [
        'تغطية شاملة لجميع الموظفين',
        'خصومات مخصصة حسب حجم المنشأة',
        'لوحة تحكم ذكية خاصة للإدارة',
        'تقارير صحية دورية ودقيقة',
        'مدير حساب مخصص على مدار الساعة',
        'فواتير موحدة وتسهيلات في الدفع',
      ],
      ctaLabel: 'تواصل معنا',
      ctaHref: '/contact?type=business',
      headerBg: 'bg-gradient-to-br from-emerald-700 to-teal-700',
      headerTextColor: 'text-white',
    },
  ],
  paymentNote: 'متاح بالتقسيط عبر تابي / تمارا',
  vipIntro: 'كل مزايا Premier، بالإضافة إلى:',
  recommendedBadge: 'الأكثر توفيراً',
  comparisonToggle: {
    show: 'شوف المقارنة الكاملة',
    hide: 'إخفاء المقارنة',
  },
  trustStrip: [
    '✓ بيانات آمنة (PDPL/SDAIA)',
    '✓ إصدار فوري إلكتروني',
    '✓ معتمد في السعودية',
  ],
  finalCta: {
    title: 'متردد في اختيار الباقة الأنسب؟',
    body: 'فريقنا متواجد الآن لمساعدتك في اختيار التغطية المثالية التي تلبي احتياجاتك بكل دقة.',
    primaryButton: 'تحدث معنا الآن',
    secondaryButton: 'قارن الباقات بالتفصيل',
  },
};

function PricingCard({ tier, index, locale, onPremierClick, onBusinessClick }: { tier: Tier; index: number; locale: string; onPremierClick?: () => void; onBusinessClick?: () => void }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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

  // Handle CTA click
  const handleCtaClick = (e: React.MouseEvent) => {
    // If it's Premier tier and we have the callback, open modal instead
    if (tier.id === 'premier' && onPremierClick) {
      e.preventDefault();
      onPremierClick();
    }
    // If it's Business tier and we have the callback, open business modal
    else if (tier.id === 'business' && onBusinessClick) {
      e.preventDefault();
      onBusinessClick();
    }
    // Otherwise, let the Link handle navigation for VIP
  };

  return (
    <article
      ref={ref}
      className={`relative rounded-3xl overflow-hidden bg-white hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 flex flex-col h-full ${
        tier.isRecommended
          ? 'border-2 border-primary shadow-2xl scale-100 md:scale-105 lg:scale-110'
          : 'border-2 border-slate-200'
      } ${isVisible ? 'animate-in fade-in slide-in-from-bottom-4' : 'opacity-0'}`}
      style={{
        animationDelay: `${index * 150}ms`,
        animationFillMode: 'forwards',
      }}
    >
      {/* Recommended Badge */}
      {tier.isRecommended && (
        <div className="absolute top-4 left-4 bg-primary text-white text-xs font-black px-3 py-1.5 rounded-full shadow-lg z-20">
          {content.recommendedBadge}
        </div>
      )}

      {/* Header with Name - Above Image */}
      <div className={`${tier.headerBg} ${tier.headerTextColor} p-6 pb-4 relative z-10`}>
        <h3 className="text-3xl md:text-4xl font-black mb-1">{tier.name}</h3>
        <p className="text-sm font-medium opacity-90">{tier.tagline}</p>
      </div>

      {/* Image - Card Visual (Credit Card Aspect Ratio) */}
      <div className="h-56 md:h-64 relative overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
          <div className="text-center p-6">
            <div className="text-[#4d8080] font-black text-sm mb-2">إشعار للمصممة 🎨</div>
            <div className="text-gray-600 font-bold text-xs">المقاس: 450×284 بكسل</div>
            <div className="text-gray-500 text-[10px] mt-1">(نسبة كرت البنك القياسية 1.586:1)</div>
          </div>
        </div>
        
        {/* Decorative Overlay */}
        <div className={`absolute inset-0 ${tier.isRecommended ? 'bg-gradient-to-t from-slate-900/10 to-transparent' : 'bg-gradient-to-t from-slate-50/50 to-transparent'}`} />
      </div>

      {/* Content Section */}
      <div className="p-6 lg:p-8 flex-1 flex flex-col">
        {/* Price */}
        <div className="mb-6 pb-6 border-b border-slate-100">
          {typeof tier.priceYearly === 'number' ? (
            <>
              <div className="flex items-baseline gap-2 mb-1 justify-center" dir="rtl">
                <span className="text-5xl md:text-6xl font-black tracking-tight text-slate-900">
                  {tier.priceYearly.toLocaleString('ar-SA')}
                </span>
                <Image 
                  src="/images/riyal-symbol.png" 
                  alt="ريال سعودي" 
                  width={32} 
                  height={32} 
                  className="object-contain"
                />
              </div>
              <p className="text-sm text-slate-500 font-medium text-center">
                سنوياً (~ {typeof tier.priceMonthly === 'number' ? tier.priceMonthly.toLocaleString('ar-SA') : tier.priceMonthly} ريال/شهر)
              </p>
            </>
          ) : (
            <div className="text-center">
              <span className="text-3xl md:text-4xl font-black text-slate-900">
                {tier.priceYearly}
              </span>
              <p className="text-sm text-slate-500 font-medium mt-2">
                أسعار تنافسية حسب عدد الموظفين
              </p>
            </div>
          )}
        </div>

        {/* Intro Text - For all tiers */}
        <p className="text-sm font-bold text-slate-700 mb-4 bg-slate-50 px-3 py-2 rounded-lg">
          {tier.isRecommended ? 'كل مزايا Premier، بالإضافة إلى:' : tier.id === 'business' ? 'استثمر في صحة فريقك.. لنجاح مستدام' : 'رعايتك الصحية اليومية.. بذكاء وتوفير'}
        </p>

        {/* Features */}
        <ul className="space-y-3 mb-8 flex-1">
          {tier.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
              <span className="text-sm leading-relaxed text-slate-700 font-medium">{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Button
          asChild={tier.id !== 'premier' && tier.id !== 'business'}
          size="lg"
          onClick={(tier.id === 'premier' || tier.id === 'business') ? handleCtaClick : undefined}
          className={`w-full text-base font-black py-6 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg ${
            tier.isRecommended 
              ? 'bg-primary hover:bg-primary/90 shadow-primary/20 text-white' 
              : tier.id === 'business'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-emerald-900/20'
              : 'bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/20'
          }`}
        >
          {tier.id === 'premier' || tier.id === 'business' ? (
            <span>{tier.ctaLabel}</span>
          ) : (
            <Link 
              href={tier.id === 'vip' ? tier.ctaHref : `/${locale}${tier.ctaHref}`}
              target={tier.id === 'vip' ? '_blank' : undefined}
              rel={tier.id === 'vip' ? 'noopener noreferrer' : undefined}
            >
              {tier.ctaLabel}
            </Link>
          )}
        </Button>

        {/* Payment Note */}
        <div className="flex items-center justify-center gap-2 mt-4">
          <p className="text-xs text-slate-500 font-medium">متاح بالتقسيط عبر</p>
          <div className="flex items-center gap-2">
            <img 
              src="/images/Tabby-01.png" 
              alt="Tabby" 
              className="h-5 object-contain"
            />
            <span className="text-slate-300">/</span>
            <img 
              src="/images/Tamara.png" 
              alt="Tamara" 
              className="h-5 object-contain"
            />
          </div>
        </div>
      </div>
    </article>
  );
}

function ComparisonTable() {
  const [isOpen, setIsOpen] = useState(false);

  const comparisonData = [
    { feature: 'السعر السنوي', premier: '٢٩٩ ر.س', vip: '٤٩٩ ر.س' },
    { feature: 'الخصم الأقصى', premier: 'حتى ٦٠٪', vip: 'حتى ٨٠٪' },
    { feature: 'عدد أفراد العائلة', premier: '١', vip: '٤' },
    { feature: 'كاش باك', premier: '٥٪', vip: '١٠٪' },
    { feature: 'استشارة "اسأل طبيب"', premier: '✓', vip: '✓' },
    { feature: 'زيارة طبيب منزلية', premier: '✗', vip: 'مجانية شهرياً' },
    { feature: 'فحص شامل سنوي', premier: '✗', vip: 'مجاني' },
    { feature: 'أولوية في الحجوزات', premier: '✗', vip: '✓' },
    { feature: 'دعم العملاء', premier: '٢٤/٧', vip: '٢٤/٧ + مدير حساب' },
  ];

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full bg-white border-2 border-slate-200 rounded-xl px-6 py-4 text-center font-semibold text-slate-700 hover:border-primary hover:text-primary transition-colors duration-200"
      >
        {isOpen ? content.comparisonToggle.hide : content.comparisonToggle.show}
      </button>

      {isOpen && (
        <div className="mt-4 bg-white border-2 border-slate-200 rounded-2xl overflow-hidden animate-in fade-in slide-in-from-top-4">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-100">
                  <th className="text-right px-6 py-4 font-bold text-slate-900">الميزة</th>
                  <th className="text-center px-6 py-4 font-bold text-slate-900">Premier</th>
                  <th className="text-center px-6 py-4 font-bold text-primary">VIP</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="text-right px-6 py-4 font-medium text-slate-700">
                      {row.feature}
                    </td>
                    <td className="text-center px-6 py-4 text-slate-600">{row.premier}</td>
                    <td className="text-center px-6 py-4 text-slate-900 font-semibold">
                      {row.vip}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export function MembershipPricingSection({ locale }: MembershipPricingSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBusinessModalOpen, setIsBusinessModalOpen] = useState(false);

  const handlePremierClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleBusinessClick = () => {
    setIsBusinessModalOpen(true);
  };

  const handleCloseBusinessModal = () => {
    setIsBusinessModalOpen(false);
  };

  return (
    <>
      <section className="py-16 md:py-24 bg-white" aria-labelledby="membership-pricing-heading">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16 max-w-4xl mx-auto">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              {content.eyebrow}
            </p>
            <h2
              id="membership-pricing-heading"
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4"
            >
              {content.title}
            </h2>
            <p className="text-lg md:text-xl text-slate-600">{content.subtitle}</p>
          </div>

          {/* Savings Calculator Strip */}
          <div className="max-w-5xl mx-auto mb-12">
            <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6 md:p-8">
              <div className="flex items-start gap-4">
                <Calculator className="w-8 h-8 text-amber-600 flex-shrink-0 mt-1" aria-hidden="true" />
                <div className="flex-1">
                  <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-4">
                    {content.calculator.body}
                  </p>
                  <Button asChild variant="outline" className="border-amber-600 text-amber-700 hover:bg-amber-100">
                    <Link href={`/${locale}/services#membership`}>{content.calculator.cta}</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto mb-8">
            {content.tiers.map((tier, index) => (
              <PricingCard 
                key={tier.id} 
                tier={tier} 
                index={index} 
                locale={locale}
                onPremierClick={tier.id === 'premier' ? handlePremierClick : undefined}
                onBusinessClick={tier.id === 'business' ? handleBusinessClick : undefined}
              />
            ))}
          </div>

          {/* Comparison Table */}
          <ComparisonTable />

          {/* Trust Strip */}
          <div className="max-w-5xl mx-auto mt-12 mb-12">
            <div className="bg-slate-50 rounded-2xl p-6">
              <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 text-sm text-slate-600">
                {content.trustStrip.map((item, i) => (
                  <span key={i} className="whitespace-nowrap">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Final CTA Band */}
          <div className="max-w-4xl mx-auto bg-emerald-50 rounded-2xl p-8 md:p-10 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              {content.finalCta.title}
            </h3>
            <p className="text-lg md:text-xl text-slate-700 leading-relaxed mb-6">
              {content.finalCta.body}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                asChild
                size="lg"
                className="text-base md:text-lg px-8 py-6 rounded-xl hover:scale-105 transition-transform duration-300 w-full sm:w-auto"
              >
                <Link href={`/${locale}/contact`}>{content.finalCta.primaryButton}</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-base md:text-lg px-8 py-6 rounded-xl hover:scale-105 transition-transform duration-300 w-full sm:w-auto"
              >
                <Link href={`/${locale}/services#membership`}>{content.finalCta.secondaryButton}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Modal */}
      <MembershipModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        onOpenBusinessModal={handleBusinessClick}
      />
      
      {/* Business Contact Modal */}
      <BusinessContactModal isOpen={isBusinessModalOpen} onClose={handleCloseBusinessModal} />
    </>
  );
}
