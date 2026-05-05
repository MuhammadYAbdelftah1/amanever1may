'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

interface HowItWorksSectionProps {
  locale: string;
}

const content = {
  eyebrow: 'بدون تأمين · بدون موافقات · بدون انتظار',
  title: 'رعاية صحية كاملة في جيبك — تبدأ من الحين',
  subtitle: '٥٠,٠٠٠+ عميل وفّروا آلاف الريالات على الرعاية الصحية. الحين دورك — ابدأ في أقل من دقيقتين.',
  steps: [
    {
      id: '01',
      arabicNumber: '٠١',
      image: '/logo.jpeg', // TODO: Replace with actual step image
      title: 'بطاقتك جاهزة في ٦٠ ثانية',
      description: 'ما تحتاج تنتظر موافقات ولا تعبّي نماذج طويلة. اختر باقتك (Premier بـ ٢٩٩ ريال أو VIP بـ ٤٩٩ ريال)، ادفع بأمان، وقسّطها على ٤ دفعات عبر تابي أو تمارا — حتى على الخدمات الطبية نفسها.',
      trustChips: ['✓ دفع آمن ومرخّص', '✓ تقسيط بدون فوائد'],
      cta: { text: 'حمّل التطبيق الحين', href: '/register' },
      microCopy: 'أول استشارة "اسأل طبيب" مجاناً — بدون بطاقة ائتمان',
    },
    {
      id: '02',
      arabicNumber: '٠٢',
      image: '/logo.jpeg', // TODO: Replace with actual step image
      title: 'طبيبك يردّ عليك خلال ١٥ دقيقة',
      description: 'سواء تبي استشارة أونلاين، حجز موعد في مستشفى (سليمان الحبيب، المواساة، دلّه)، أو زيارة منزلية — كل شيء من تطبيق واحد. أكثر من ٥٠٠ مقدم خدمة في ٥٠+ مدينة سعودية ينتظرونك.',
      trustChips: ['⚡ رد خلال ١٥ دقيقة', '🏥 ٥٠٠+ مستشفى وعيادة'],
      cta: { text: 'شوف الخدمات المتاحة', href: '/services' },
      microCopy: 'تقييم ٤.٨/٥ من أكثر من ٥٠,٠٠٠ عميل',
    },
    {
      id: '03',
      arabicNumber: '٠٣',
      image: '/logo.jpeg', // TODO: Replace with actual step image
      title: 'وفّر حتى ٨٠٪ + كاش باك يرجع لك',
      description: 'خصم مباشر على الاستشارات، التحاليل، الأدوية، وحتى الجيم (فتنس تايم). كل ريال تصرفه يرجع لك كاش باك (٥٪ Premier، ١٠٪ VIP) + نقاط تتحول رصيد. ما فيه موافقات مسبقة — الخصم يطبّق فوراً.',
      trustChips: ['💰 كاش باك فوري', '🚫 بدون موافقات مسبقة'],
      cta: { text: 'احسب كم بتوفّر', href: '/services#membership' },
      microCopy: 'عائلة من ٤ أفراد توفّر في المتوسط ٣,٥٠٠ ريال سنوياً',
    },
  ],
  ctaBand: {
    text: 'جاهز تبدأ؟ أول استشارة مجاناً — بدون التزام',
    primaryButton: 'حمّل التطبيق وابدأ الحين',
    primaryMicroCopy: 'متاح على iOS وAndroid · بدون بطاقة ائتمان للتجربة',
    secondaryButton: 'شوف الباقات والأسعار',
  },
};

function StepCard({ step, index, locale }: { step: typeof content.steps[0]; index: number; locale: string }) {
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
    <div
      ref={ref}
      className={`group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 md:p-8 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ${
        isVisible ? 'animate-in fade-in slide-in-from-bottom-4' : 'opacity-0'
      }`}
      style={{
        animationDelay: `${index * 150}ms`,
        animationFillMode: 'forwards',
      }}
    >
      {/* Background Step Number */}
      <div className="absolute top-0 left-0 text-[120px] font-extrabold text-slate-900 opacity-[0.08] leading-none select-none pointer-events-none">
        {step.arabicNumber}
      </div>

      {/* Image */}
      <div className="relative mb-6">
        <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden group-hover:scale-110 transition-transform duration-300 shadow-lg">
          <Image
            src={step.image}
            alt={step.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative">
        <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
          {step.title}
        </h3>
        <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-4">
          {step.description}
        </p>

        {/* Trust Chips */}
        <div className="flex flex-wrap gap-2 mb-4">
          {step.trustChips.map((chip, i) => (
            <span
              key={i}
              className="bg-slate-100 text-slate-700 text-xs px-3 py-1.5 rounded-full font-medium"
            >
              {chip}
            </span>
          ))}
        </div>

        {/* Inline CTA */}
        <div className="space-y-2">
          <Link
            href={`/${locale}${step.cta.href}`}
            className="inline-flex items-center text-primary font-semibold hover:text-primary/80 transition-colors duration-200"
          >
            {step.cta.text}
          </Link>
          
          {/* Micro-copy under CTA */}
          {step.microCopy && (
            <p className="text-xs text-slate-500 leading-relaxed">
              {step.microCopy}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export function HowItWorksSection({ locale }: HowItWorksSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-slate-50" aria-labelledby="how-it-works-heading">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            {content.eyebrow}
          </p>
          <h2
            id="how-it-works-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4"
          >
            {content.title}
          </h2>
          <p className="text-lg md:text-xl text-slate-600">
            {content.subtitle}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="relative max-w-7xl mx-auto mb-12">
          {/* Desktop Connector Lines */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5">
            <div className="flex justify-between items-center h-full px-[16.666%]">
              <svg className="w-full h-2" preserveAspectRatio="none">
                <line
                  x1="0"
                  y1="4"
                  x2="100%"
                  y2="4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="8 8"
                  className="text-slate-300"
                />
              </svg>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {content.steps.map((step, index) => (
              <StepCard key={step.id} step={step} index={index} locale={locale} />
            ))}
          </div>

          {/* Mobile Timeline */}
          <div className="md:hidden absolute top-0 right-4 bottom-0 w-0.5 bg-slate-200">
            {content.steps.map((_, index) => (
              <div
                key={index}
                className="absolute w-3 h-3 bg-primary rounded-full -right-[5px]"
                style={{ top: `${index * 33.33 + 10}%` }}
              />
            ))}
          </div>
        </div>

        {/* CTA Band */}
        <div className="max-w-4xl mx-auto bg-primary/5 rounded-2xl p-8 md:p-10 text-center">
          <p className="text-lg md:text-xl font-semibold text-slate-900 mb-6">
            {content.ctaBand.text}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex flex-col items-center gap-2 w-full sm:w-auto">
              <Button
                asChild
                size="lg"
                className="text-base md:text-lg px-8 py-6 rounded-xl hover:scale-105 transition-transform duration-300 w-full sm:w-auto"
              >
                <Link href={`/${locale}/register`}>
                  {content.ctaBand.primaryButton}
                </Link>
              </Button>
              <p className="text-xs text-slate-500 text-center max-w-xs">
                {content.ctaBand.primaryMicroCopy}
              </p>
            </div>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-base md:text-lg px-8 py-6 rounded-xl hover:scale-105 transition-transform duration-300 w-full sm:w-auto"
            >
              <Link href={`/${locale}/services#membership`}>
                {content.ctaBand.secondaryButton}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
