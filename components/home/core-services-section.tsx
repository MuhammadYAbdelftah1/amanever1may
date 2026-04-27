/**
 * Core Services Section (Section 4)
 * Displays the 6 primary services of Aman Ever.
 * Placement: After Hero, before other sections.
 * Updated with new service cards matching services page.
 */

'use client';

import { CheckCircle2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import * as LucideIcons from 'lucide-react';

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
  bullets: string[];
  ctaLabel: string;
  ctaHref: string;
};

const content = {
  eyebrow: 'خدماتنا الطبية',
  title: 'وش تحتاج اليوم؟',
  subtitle: 'سجّلت في أمان إيفر؟ تمام. الحين اختر الخدمة اللي تناسب احتياجك — كلها متاحة لك بضغطة وحدة من التطبيق.',
  services: [
    {
      id: 'doctor-booking',
      icon: 'Calendar',
      image: '/logo.jpeg',
      title: 'موعدك جاهز خلال 30 ثانية',
      tagline: 'الأكثر استخداماً 🔥',
      description: 'احجز مع طبيبك المفضل في أي عيادة من شبكتنا (500+ منشأة في 50+ مدينة)، أو ابدأ استشارة مباشرة عبر الفيديو أو الصوت — بدون تعقيد ولا تأخير.',
      bullets: [
        'حجز فوري في ≤30 ثانية مع تأكيد تلقائي',
        'استشارات أونلاين (فيديو / صوت / شات) مع أطباء مرخصين',
        'متابعة ما بعد الزيارة وتذكير بالمواعيد القادمة',
      ],
      ctaLabel: 'احجز موعدك الحين',
      ctaHref: '/services#doctor-booking',
    },
    {
      id: 'urgent-consultation',
      icon: 'Video',
      image: '/logo.jpeg',
      title: 'استشارة طبية فورية — بدون انتظار',
      tagline: 'متاح 24/7 ⚡',
      description: 'ما تقدر تنتظر؟ احجز استشارة عاجلة مع طبيب متخصص الحين — فيديو، صوت، أو شات. خصومات حصرية للمشتركين.',
      bullets: [
        'رد فوري من أطباء متخصصين — ما تنتظر أيام',
        'خصومات تصل لـ 80% مع بطاقة أمان إيفر',
        'وصفة طبية إلكترونية معتمدة',
      ],
      ctaLabel: 'ابدأ استشارتك الحين',
      ctaHref: '/services#urgent-consultation',
    },
    {
      id: 'ask-doctor',
      icon: 'MessageCircle',
      image: '/logo.jpeg',
      title: 'سؤال طبي؟ رد متخصص خلال 15 دقيقة',
      tagline: 'سؤالك الأول مجاناً 🆓',
      description: 'عندك استفسار صحي ما يحتاج زيارة كاملة؟ اكتب سؤالك في التطبيق وراح يوصلك رد من طبيب متخصص — سريع، موثوق، ومحمي.',
      bullets: [
        'متاح 24/7 بدون مواعيد مسبقة',
        'خصوصية محمية وفق PDPL ومعتمد من SDAIA',
        'ضمان وقت الاستجابة: ≤15 دقيقة',
      ],
      ctaLabel: 'اسأل سؤالك المجاني',
      ctaHref: '/services#ask-doctor',
    },
    {
      id: 'medical-network',
      icon: 'Building2',
      image: '/logo.jpeg',
      title: 'شبكة طبية في كل مكان',
      tagline: '500+ منشأة طبية 🏥',
      description: 'وصول لأفضل المستشفيات والعيادات في المملكة — سليمان الحبيب، المواساة، دلّه، السعودي الألماني، وأكثر من 500 مقدم خدمة.',
      bullets: [
        '500+ مستشفى وعيادة في 50+ مدينة',
        'شراكات مع أفضل المنشآت الطبية في السعودية',
        'خصومات حصرية تصل لـ 80% للمشتركين',
      ],
      ctaLabel: 'شوف الشبكة الطبية',
      ctaHref: '/medical-network',
    },
    {
      id: 'wellness-network',
      icon: 'Dumbbell',
      image: '/logo.jpeg',
      title: 'الشبكة الصحية',
      tagline: 'جيم، سبا، صالونات، وأكثر 💪',
      description: 'وصول لأفضل النوادي الرياضية، مراكز السبا، صالونات التجميل، والصيدليات في المملكة — خصومات حصرية على كل شي يخص صحتك ولياقتك.',
      bullets: [
        'نوادي رياضية: فتنس تايم، جولدز جيم، وأكثر',
        'صالونات تجميل ومراكز سبا في كل المدن',
        'خصومات حصرية على الاشتراكات والخدمات',
      ],
      ctaLabel: 'شوف الشبكة الصحية',
      ctaHref: '/wellness-network',
    },
    {
      id: 'home-care',
      icon: 'Home',
      image: '/logo.jpeg',
      title: 'الطبيب يجيك — راحة بيتك بدون تنقّل',
      tagline: 'مثالية للعائلات وكبار السن 👨‍👩‍👧',
      description: 'خدمات طبية متكاملة توصل لباب بيتك: طبيب زيارة، تمريض منزلي، فحوصات مخبرية، علاج طبيعي — كل شيء بإشراف ممارسين مرخصين.',
      bullets: [
        'تمريض متخصص ورعاية كبار السن في المنزل',
        'فحوصات مخبرية شاملة بدون زحمة المختبرات',
        'علاج طبيعي وخدمات صحية متنوعة',
      ],
      ctaLabel: 'اطلب زيارة منزلية',
      ctaHref: '/services#home-care',
    },
  ],
  bottomCTA: {
    title: 'جاهز تبدأ؟',
    subtitle: 'حمّل التطبيق الحين واحصل على خصومات فورية',
    primaryLabel: 'حمّل التطبيق',
    primaryHref: '#download',
    secondaryLabel: 'شوف كل الخدمات',
    secondaryHref: '/services',
  },
};

function ServiceCard({ service, index, locale }: { service: Service; index: number; locale: string }) {
  const [isVisible, setIsVisible] = useState(false);
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

  return (
    <article
      ref={ref}
      className={`group relative h-full rounded-3xl bg-white border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${
        isVisible ? 'animate-in fade-in slide-in-from-bottom-4' : 'opacity-0'
      }`}
      style={{
        animationDelay: `${index * 100}ms`,
        animationFillMode: 'forwards',
      }}
    >
      {/* Image Section */}
      <div className="relative w-full h-48 bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
        <Image
          src={service.image}
          alt={service.title}
          width={120}
          height={120}
          className="object-contain opacity-40"
          priority={index < 3}
        />
        {/* Icon Overlay */}
        <div className="absolute top-4 right-4 w-12 h-12 rounded-xl bg-white/90 backdrop-blur-sm text-emerald-600 flex items-center justify-center shadow-lg">
          <IconComponent className="w-6 h-6" aria-hidden="true" />
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 md:p-8">
        {/* Title */}
        <h3 className="text-2xl font-bold text-slate-900 mb-2">{service.title}</h3>

        {/* Tagline */}
        <p className="text-sm font-semibold text-emerald-600 mb-4">{service.tagline}</p>

        {/* Description */}
        <p className="text-base text-slate-700 leading-relaxed mb-5">{service.description}</p>

        {/* Bullets */}
        <ul className="space-y-2 mb-6" role="list">
          {service.bullets.map((bullet, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        {/* CTA Link */}
        <Link
          href={`/${locale}${service.ctaHref}`}
          className="inline-flex items-center gap-2 text-emerald-600 font-bold hover:text-emerald-700 transition-colors group/link"
        >
          <span>{service.ctaLabel}</span>
          <ArrowLeft className="w-5 h-5 group-hover/link:-translate-x-1 transition-transform" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

export function CoreServicesSection({ locale }: CoreServicesSectionProps) {
  return (
    <section className="pt-20 md:pt-28 pb-16 md:pb-24 bg-white" aria-labelledby="core-services-heading">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 max-w-4xl mx-auto">
          <p className="text-sm font-bold text-emerald-600 uppercase tracking-wider mb-4">
            {content.eyebrow}
          </p>
          <h2
            id="core-services-heading"
            className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-6"
          >
            {content.title}
          </h2>
          <p className="text-lg text-slate-700 leading-relaxed">{content.subtitle}</p>
        </div>

        {/* Service Cards Grid - 6 Cards in 3 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto mb-16">
          {content.services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} locale={locale} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="max-w-4xl mx-auto">
          <div className="rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-600 p-8 md:p-12 text-center shadow-2xl">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {content.bottomCTA.title}
            </h3>
            <p className="text-emerald-50 mb-8 text-lg">
              {content.bottomCTA.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={content.bottomCTA.primaryHref}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-emerald-700 font-bold hover:bg-emerald-50 transition-colors shadow-lg hover:shadow-xl w-full sm:w-auto"
              >
                <span>{content.bottomCTA.primaryLabel}</span>
                <ArrowLeft className="w-5 h-5" aria-hidden="true" />
              </Link>

              <Link
                href={`/${locale}${content.bottomCTA.secondaryHref}`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-transparent border-2 border-white text-white font-bold hover:bg-white/20 transition-colors w-full sm:w-auto"
              >
                <span>{content.bottomCTA.secondaryLabel}</span>
                <ArrowLeft className="w-5 h-5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
