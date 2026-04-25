'use client';

// TODO: Replace with actual pricing from business team.
// Current values are placeholder. Confirm with product owner before launch.

import { CheckCircle2, XCircle, Calculator, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

interface MembershipPricingSectionProps {
  locale: string;
}

type Tier = {
  id: 'premier' | 'vip';
  name: string;
  tagline: string;
  priceYearly: number;
  priceMonthly: number;
  features: string[];
  isRecommended?: boolean;
  ctaLabel: string;
  ctaHref: string;
  headerBg: string;
  headerTextColor: string;
};

const content = {
  eyebrow: 'عضويتك الطبية الذكية',
  title: 'بطاقة واحدة… وفر يوصل لـ 80% على كل احتياجاتك الصحية',
  subtitle: 'اختار الباقة المناسبة ليك، واصدرها إلكترونياً في 60 ثانية. بدون تأمين، بدون موافقات، وبدون حد أدنى للعمر.',
  calculator: {
    body: 'متوسط العائلة في السعودية بتصرف ~4,800 ريال سنوياً على الخدمات الطبية والتجميلية. مع بطاقة أمان إيفر، متوسط التوفير يوصل لـ 2,400-3,200 ريال/سنة — أكتر من 10 أضعاف سعر البطاقة نفسها.',
    cta: 'احسب توفيرك بالتفصيل ←',
  },
  tiers: [
    {
      id: 'premier' as const,
      name: 'Premier',
      tagline: 'بطاقتك الأساسية للرعاية اليومية',
      priceYearly: 199,
      priceMonthly: 16.5,
      features: [
        'خصم حتى 60% على الشبكة الطبية',
        'حجوزات فورية مع الأطباء',
        'استشارة "اسأل طبيب" مجاناً',
        'كاش باك 5% على كل فاتورة',
        'نقاط ولاء قابلة للاستبدال',
        'دعم عملاء 24/7',
      ],
      ctaLabel: 'اشترك في Premier',
      ctaHref: '/services#membership',
      headerBg: 'bg-emerald-50',
      headerTextColor: 'text-slate-900',
    },
    {
      id: 'vip' as const,
      name: 'VIP',
      tagline: 'للعائلات والأشخاص الأعلى استخداماً',
      priceYearly: 499,
      priceMonthly: 41.5,
      isRecommended: true,
      features: [
        'خصم حتى 80% (بدلاً من 60%)',
        'تغطية لـ 4 أفراد من العائلة',
        'زيارة طبيب منزلية مجانية (شهرياً)',
        'فحص شامل سنوي مجاني',
        'أولوية في الحجوزات + أطباء VIP',
        'كاش باك 10% (بدلاً من 5%)',
      ],
      ctaLabel: 'اشترك في VIP',
      ctaHref: '/services#membership',
      headerBg: 'bg-gradient-to-br from-slate-900 to-emerald-900',
      headerTextColor: 'text-white',
    },
  ],
  paymentNote: 'متاح بالتقسيط عبر تابي / تمارا',
  vipIntro: 'كل مزايا Premier، بالإضافة إلى:',
  recommendedBadge: 'الأكثر توفيراً',
  comparisonToggle: {
    show: 'شوف المقارنة الكاملة ↓',
    hide: 'إخفاء المقارنة ↑',
  },
  trustStrip: [
    'بيانات آمنة (PDPL/SDAIA)',
    'استرداد خلال 14 يوم',
    'إصدار فوري إلكتروني',
    'معتمد في السعودية',
  ],
  finalCta: {
    body: 'مش متأكد أي باقة تناسبك؟ جرّب التطبيق مجاناً — أول استشارة "اسأل طبيب" مجانية بالكامل وبدون الاشتراك.',
    primaryButton: 'ابدأ مجاناً',
    secondaryButton: 'قارن الباقات بالتفصيل',
  },
};

function PricingCard({ tier, index, locale }: { tier: Tier; index: number; locale: string }) {
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

  return (
    <article
      ref={ref}
      className={`relative rounded-3xl p-8 lg:p-10 border-2 bg-white hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 ${
        tier.isRecommended
          ? 'border-primary shadow-2xl scale-100 md:scale-105 lg:scale-110'
          : 'border-slate-200'
      } ${isVisible ? 'animate-in fade-in slide-in-from-bottom-4' : 'opacity-0'}`}
      style={{
        animationDelay: `${index * 150}ms`,
        animationFillMode: 'forwards',
      }}
    >
      {/* Recommended Badge */}
      {tier.isRecommended && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-lg whitespace-nowrap">
          {content.recommendedBadge}
        </div>
      )}

      {/* Header */}
      <div className={`${tier.headerBg} ${tier.headerTextColor} rounded-2xl p-6 mb-6`}>
        <h3 className="text-3xl font-bold mb-2">{tier.name}</h3>
        <p className="text-sm opacity-90">{tier.tagline}</p>
      </div>

      {/* Price */}
      <div className="mb-6">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900">
            {tier.priceYearly}
          </span>
          <span className="text-2xl font-semibold text-slate-700">ر.س</span>
          <span className="text-base text-slate-500">/سنوياً</span>
        </div>
        <p className="text-sm text-slate-500">(~ {tier.priceMonthly} ريال/شهر)</p>
      </div>

      {/* VIP Intro */}
      {tier.isRecommended && (
        <p className="text-sm font-semibold text-slate-700 mb-4">{content.vipIntro}</p>
      )}

      {/* Features */}
      <ul className="space-y-3 mb-8">
        {tier.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
            <span className="text-base leading-relaxed text-slate-700">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Button
        asChild
        size="lg"
        className={`w-full text-base font-semibold py-6 rounded-xl transition-transform duration-300 hover:scale-105 ${
          tier.isRecommended ? 'bg-primary hover:bg-primary/90' : ''
        }`}
      >
        <Link href={`/${locale}${tier.ctaHref}`}>{tier.ctaLabel}</Link>
      </Button>

      {/* Payment Note */}
      <p className="text-xs text-slate-500 text-center mt-4">{content.paymentNote}</p>
    </article>
  );
}

function ComparisonTable() {
  const [isOpen, setIsOpen] = useState(false);

  const comparisonData = [
    { feature: 'السعر السنوي', premier: '199 ر.س', vip: '499 ر.س' },
    { feature: 'الخصم الأقصى', premier: 'حتى 60%', vip: 'حتى 80%' },
    { feature: 'عدد أفراد العائلة', premier: '1', vip: '4' },
    { feature: 'كاش باك', premier: '5%', vip: '10%' },
    { feature: 'استشارة "اسأل طبيب"', premier: '✓', vip: '✓' },
    { feature: 'زيارة طبيب منزلية', premier: '✗', vip: 'مجانية شهرياً' },
    { feature: 'فحص شامل سنوي', premier: '✗', vip: 'مجاني' },
    { feature: 'أولوية في الحجوزات', premier: '✗', vip: '✓' },
    { feature: 'دعم العملاء', premier: '24/7', vip: '24/7 + مدير حساب' },
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
  return (
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
                  <Link href={`/${locale}/savings-calculator`}>{content.calculator.cta}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto mb-8">
          {content.tiers.map((tier, index) => (
            <PricingCard key={tier.id} tier={tier} index={index} locale={locale} />
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
          <div className="flex justify-center mb-4">
            <Gift className="w-12 h-12 text-primary" aria-hidden="true" />
          </div>
          <p className="text-lg md:text-xl text-slate-700 leading-relaxed mb-6">
            {content.finalCta.body}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="text-base md:text-lg px-8 py-6 rounded-xl hover:scale-105 transition-transform duration-300 w-full sm:w-auto"
            >
              <Link href={`/${locale}/download`}>{content.finalCta.primaryButton}</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-base md:text-lg px-8 py-6 rounded-xl hover:scale-105 transition-transform duration-300 w-full sm:w-auto"
            >
              <Link href={`/${locale}/pricing`}>{content.finalCta.secondaryButton}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
