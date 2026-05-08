/**
 * Why Aman Ever? (Section 5)
 * The persuasion climax. EXACTLY 3 differentiators.
 * Placement: After <CoreServices />, before <Testimonials />
 * DO NOT add more than 3 blocks — this is a strict design rule.
 */

'use client';

// TODO: Replace with real, signed testimonials from actual users.
// Current quotes are illustrative placeholders.

import { CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

interface WhyAmanEverSectionProps {
  locale: string;
}

type Differentiator = {
  id: 'no-insurance' | 'fast-response' | 'open-to-all';
  number: '01' | '02' | '03';
  image: string; // Changed from icon to image
  eyebrow: string;
  title: string;
  description: string;
  proofPoints: [string, string, string];
  testimonial?: {
    quote: string;
    author: string;
  };
  imagePosition: 'right' | 'left'; // Changed from iconPosition
};

const content = {
  eyebrow: 'لماذا أمان إيفر؟',
  title: 'الجيل الجديد من الرعاية الصحية الذكية',
  subtitle: 'مو بس خصومات. أمان إيفر بُنيت على نموذج مختلف من الأساس — بدون موافقات مسبقة، بدون انتظار، وبدون قيود على الفئات.',
  differentiators: [
    {
      id: 'no-insurance' as const,
      number: '01' as const,
      image: '/logo.jpeg', // TODO: Replace with actual feature image
      eyebrow: 'خدمة فورية بدون تعقيدات',
      title: 'بطاقتك تفتح لك الخدمة مباشرة — بدون موافقات',
      description: 'النموذج التقليدي يخليك تنتظر أيام للموافقة على الخدمة. في أمان إيفر، ما أحد يحتاج يوافق لك — بطاقتك تفتح لك الخدمة مباشرة في أي منشأة من شبكتنا (500+ منشأة). تسدد، تاخذ الخصم، وتخلص.',
      proofPoints: ['خصم فوري عند الدفع', 'بدون انتظار موافقات', 'بدون أوراق إضافية'] as [string, string, string],
      testimonial: {
        quote: 'أول مرة أسوي أشعة رنين مغناطيسي بنفس اليوم اللي طلبها الدكتور — بدون موافقات ولا انتظار. وفّرت عليّ 800 ريال.',
        author: 'أحمد العتيبي، مهندس، الرياض',
      },
      imagePosition: 'right' as const,
    },
    {
      id: 'fast-response' as const,
      number: '02' as const,
      image: '/logo.jpeg', // TODO: Replace with actual feature image
      eyebrow: 'طمأنينة على مدار الساعة',
      title: 'رد طبيب متخصص خلال 15 دقيقة — الاستشارة الأولى علينا',
      description: 'في خدمة "اسأل طبيب"، نضمن لك وقت استجابة ≤15 دقيقة — على مدار 24/7. والأهم: استشارتك الأولى علينا بالكامل، حتى لو ما اشتركت بعد. لأن صحتك ما تنتظر.',
      proofPoints: ['⏱️ ضمان الرد خلال 15 دقيقة', '🆓 الاستشارة الأولى علينا', '🌙 متاح 24/7 بدون توقف'] as [string, string, string],
      testimonial: {
        quote: 'ولدي حرارته طلعت بالليل. كتبت السؤال في التطبيق، والدكتور رد عليّ في 8 دقائق. ريّحني مرة.',
        author: 'سارة الغامدي، معلمة، جدة',
      },
      imagePosition: 'left' as const,
    },
    {
      id: 'open-to-all' as const,
      number: '03' as const,
      image: '/logo.jpeg', // TODO: Replace with actual feature image
      eyebrow: 'رعاية صحية للجميع بدون استثناءات',
      title: 'مفتوحة لكل الفئات… لكل الأعمار… لكل الحالات',
      description: 'ما يشترط تكون مواطن. ما يشترط تكون صغير أو صحتك ممتازة. بطاقة أمان إيفر متاحة لكل مواطن، مقيم، وزائر في المملكة — من حديثي الولادة لكبار السن. وحتى لو عندك حالة مزمنة، الخدمة متاحة لك.',
      proofPoints: ['🇸🇦 مواطنين ومقيمين وزوار', '👶 من حديثي الولادة لكبار السن', '❤️ تشمل الحالات المزمنة'] as [string, string, string],
      testimonial: {
        quote: 'كنت أدور على تغطية لأمي المقيمة وعندها سكري. لقيت أمان إيفر قبلتها من أول يوم بدون تعقيدات.',
        author: 'محمد الشهري، صاحب أعمال، الدمام',
      },
      imagePosition: 'right' as const,
    },
  ],
  comparison: {
    title: 'قارن بنفسك',
    headers: ['', 'النموذج التقليدي', 'أمان إيفر'],
    rows: [
      { label: 'موافقات مسبقة', traditional: '✅ مطلوبة', amanEver: '❌ غير مطلوبة' },
      { label: 'وقت رد الطبيب', traditional: 'أيام', amanEver: '≤15 دقيقة' },
      { label: 'تغطية المقيمين', traditional: 'محدودة', amanEver: 'كاملة' },
      { label: 'الاشتراك السنوي', traditional: '2,000-5,000+ ر.س', amanEver: 'من 199 ر.س' },
      { label: 'كاش باك', traditional: 'غير متوفر', amanEver: 'حتى 10% كاش باك' },
      { label: 'التقسيط', traditional: 'غير متاح', amanEver: 'تابي وتمارا' },
      { label: 'الحالات المزمنة', traditional: 'مستثناة غالباً', amanEver: 'مشمولة' },
      { label: 'خدمة العملاء', traditional: 'ساعات محدودة', amanEver: '24/7 واتساب' },
    ],
  },
  closingCta: {
    text: 'جاهز تجرب الفرق؟',
    links: [
      { label: 'اختر باقتك', href: '/services#membership' },
      { label: 'جرّب "اسأل طبيب" الآن', href: '/services#instant-booking' },
    ],
  },
};

function DifferentiatorBlock({
  differentiator,
  index,
  locale,
}: {
  differentiator: Differentiator;
  index: number;
  locale: string;
}) {
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

  const isImageRight = differentiator.imagePosition === 'right';

  return (
    <article
      ref={ref}
      className={`relative ${isVisible ? 'animate-in fade-in slide-in-from-bottom-4' : 'opacity-0'}`}
      style={{
        animationDelay: `${index * 100}ms`,
        animationFillMode: 'forwards',
      }}
    >
      <div
        className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
          isImageRight ? '' : 'lg:flex-row-reverse'
        }`}
      >
        {/* Image Side */}
        <div
          className={`lg:col-span-4 flex justify-center ${
            isImageRight ? 'lg:order-2' : 'lg:order-1'
          }`}
        >
          <div className="relative w-full max-w-sm aspect-square rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src={differentiator.image}
              alt={differentiator.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        </div>

        {/* Text Side */}
        <div className={`lg:col-span-8 relative ${isImageRight ? 'lg:order-1' : 'lg:order-2'}`}>
          {/* Background Number */}
          <div
            className="absolute -top-8 -right-4 text-[80px] md:text-[120px] lg:text-[180px] font-black text-slate-100 leading-none select-none pointer-events-none"
            aria-hidden="true"
          >
            {differentiator.number}
          </div>

          {/* Content */}
          <div className="relative">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              {differentiator.eyebrow}
            </p>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-4">
              {differentiator.title}
            </h3>
            <p className="text-lg text-slate-700 leading-relaxed max-w-prose mb-6">
              {differentiator.description}
            </p>

            {/* Proof Points */}
            <div className="flex flex-wrap gap-x-6 gap-y-3 mb-6">
              {differentiator.proofPoints.map((point, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-800">
                  {point}
                </span>
              ))}
            </div>

            {/* Testimonial */}
            {differentiator.testimonial && (
              <blockquote className="mt-6 ps-4 border-s-4 border-primary/30 italic text-slate-600">
                <p className="mb-2">&quot;{differentiator.testimonial.quote}&quot;</p>
                <cite className="text-sm not-italic font-medium text-slate-700">
                  — {differentiator.testimonial.author}
                </cite>
              </blockquote>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function ComparisonTable() {
  return (
    <div className="max-w-4xl mx-auto">
      <h3 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-8">
        {content.comparison.title}
      </h3>
      <div className="bg-white rounded-2xl border-2 border-slate-200 overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-100">
                <th className="text-right px-4 md:px-6 py-4 font-bold text-slate-900 w-1/3">
                  {content.comparison.headers[0]}
                </th>
                <th className="text-center px-4 md:px-6 py-4 font-bold text-slate-700 w-1/3">
                  {content.comparison.headers[1]}
                </th>
                <th className="text-center px-4 md:px-6 py-4 font-bold text-primary bg-primary/5 w-1/3">
                  {content.comparison.headers[2]}
                </th>
              </tr>
            </thead>
            <tbody>
              {content.comparison.rows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                  <td className="text-right px-4 md:px-6 py-4 font-medium text-slate-700">
                    {row.label}
                  </td>
                  <td className="text-center px-4 md:px-6 py-4 text-slate-600 text-sm md:text-base">
                    {row.traditional}
                  </td>
                  <td className="text-center px-4 md:px-6 py-4 text-slate-900 font-semibold bg-primary/5 text-sm md:text-base">
                    {row.amanEver}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function WhyAmanEverSection({ locale }: WhyAmanEverSectionProps) {
  return (
    <section
      id="why-aman-ever"
      className="py-20 md:py-28 lg:py-32 bg-gradient-to-b from-white via-slate-50 to-white"
      aria-labelledby="why-aman-ever-heading"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20 max-w-4xl mx-auto">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            {content.eyebrow}
          </p>
          <h2
            id="why-aman-ever-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4"
          >
            {content.title}
          </h2>
          <p className="text-lg md:text-xl text-slate-600">{content.subtitle}</p>
        </div>

        {/* Differentiators */}
        <div className="space-y-20 lg:space-y-28 max-w-7xl mx-auto mb-20 md:mb-28">
          {content.differentiators.map((diff, index) => (
            <DifferentiatorBlock key={diff.id} differentiator={diff} index={index} locale={locale} />
          ))}
        </div>

        {/* Comparison Table */}
        <div className="mb-12">
          <ComparisonTable />
        </div>

        {/* Closing CTA */}
        <div className="text-center">
          <p className="text-base md:text-lg text-slate-600 inline-flex flex-wrap items-center justify-center gap-2">
            <span>{content.closingCta.text}</span>
            {content.closingCta.links.map((link, i) => (
              <span key={link.href} className="inline-flex items-center gap-2">
                {i > 0 && <span className="text-slate-400">·</span>}
                <Link
                  href={link.href.startsWith('#') ? link.href : `/${locale}${link.href}`}
                  className="text-primary font-semibold hover:text-primary/80 transition-colors duration-200"
                >
                  {link.label} ←
                </Link>
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
