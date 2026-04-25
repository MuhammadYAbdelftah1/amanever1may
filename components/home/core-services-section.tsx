/**
 * Core Services Section (Section 4)
 * Displays the 4 primary services of Aman Ever.
 * Placement: After <MembershipPricing />, before other sections.
 * Strictly 4 services — do not add more.
 */

'use client';

import { CalendarCheck, MessageCircleHeart, Home, ShoppingBag, CheckCircle2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { LucideIcon } from 'lucide-react';

interface CoreServicesSectionProps {
  locale: string;
}

type Service = {
  id: 'booking' | 'ask-doctor' | 'home-care' | 'store';
  icon: LucideIcon;
  tag: string;
  tagEmoji: string;
  title: string;
  description: string;
  bullets: [string, string, string];
  ctaLabel: string;
  ctaHref: string;
};

const content = {
  eyebrow: 'خدماتنا الأساسية',
  title: 'كل احتياجاتك الطبية في تطبيق واحد',
  subtitle: 'من حجز موعد عادي لاستشارة أونلاين أو طبيب يزورك في البيت — تجربة رعاية صحية كاملة بخطوة واحدة.',
  services: [
    {
      id: 'booking' as const,
      icon: CalendarCheck,
      tag: 'الأكثر استخداماً',
      tagEmoji: '🔥',
      title: 'حجوزات واستشارات فورية',
      description: 'احجز موعدك مع نخبة من الأطباء بدون انتظار. أو ابدأ استشارة أونلاين مباشرة عبر الفيديو أو الصوت.',
      bullets: ['حجز في أقل من 30 ثانية', 'استشارات فيديو / صوت / شات', 'متابعة ما بعد الاستشارة'] as [string, string, string],
      ctaLabel: 'احجز موعدك الآن',
      ctaHref: '/services#instant-booking',
    },
    {
      id: 'ask-doctor' as const,
      icon: MessageCircleHeart,
      tag: 'سؤالك الأول مجاناً',
      tagEmoji: '🆓',
      title: 'اسأل طبيب — رد خلال 15 دقيقة',
      description: 'استشارة فورية عبر الشات مع طبيب متخصص. اكتب سؤالك بأي وقت، وهيوصلك الرد خلال 15 دقيقة كحد أقصى.',
      bullets: ['متاح 24 ساعة / 7 أيام', 'سرية تامة لبياناتك الطبية', 'ضمان وقت الاستجابة'] as [string, string, string],
      ctaLabel: 'جرّب مجاناً',
      ctaHref: '/services#instant-booking',
    },
    {
      id: 'home-care' as const,
      icon: Home,
      tag: 'لكبار السن والعائلات',
      tagEmoji: '👨‍👩‍👧',
      title: 'رعاية منزلية متكاملة',
      description: 'نوفرلك طبيب، ممرض، وفني مختبر يزوروك في بيتك. بدون عناء التنقل ولا انتظار في المستشفيات.',
      bullets: ['تمريض متخصص وكبار السن', 'فحوصات مخبرية منزلية', 'علاج طبيعي وحجامة'] as [string, string, string],
      ctaLabel: 'اطلب الخدمة',
      ctaHref: '/services#home-care',
    },
    {
      id: 'store' as const,
      icon: ShoppingBag,
      tag: 'خصومات تصل 80%',
      tagEmoji: '💰',
      title: 'متجر أمان + عروض حصرية',
      description: 'متجر إلكتروني يجمع منتجات وخدمات طبية وتجميلية بأسعار مخفضة، مع عروض حصرية لمشتركي أمان إيفر فقط.',
      bullets: ['منتجات طبية وتجميلية أصلية', 'توصيل لكل أنحاء المملكة', 'دفع بالتقسيط عبر تابي / تمارا'] as [string, string, string],
      ctaLabel: 'تسوّق الآن',
      ctaHref: '/services#store',
    },
  ],
  bottomLinks: {
    text: 'تبحث عن خدمة معينة؟',
    links: [
      { label: 'شوف كل الخدمات', href: '/services' },
      { label: 'تصفح الشبكة الطبية', href: '/medical-network' },
      { label: 'تواصل مع خدمة العملاء', href: '/contact' },
    ],
  },
};

function ServiceCard({ service, index, locale }: { service: Service; index: number; locale: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const Icon = service.icon;

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
      className={`group relative h-full rounded-2xl p-6 lg:p-7 border border-slate-200 bg-white hover:-translate-y-1 hover:shadow-xl hover:border-primary/30 transition-all duration-300 ${
        isVisible ? 'animate-in fade-in slide-in-from-bottom-4' : 'opacity-0'
      }`}
      style={{
        animationDelay: `${index * 100}ms`,
        animationFillMode: 'forwards',
      }}
    >
      {/* Top Row: Icon and Tag */}
      <div className="flex items-start justify-between mb-4">
        {/* Icon */}
        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-7 h-7 text-primary" strokeWidth={2} aria-hidden="true" />
        </div>

        {/* Tag Pill */}
        <span className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
          {service.tagEmoji} {service.tag}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>

      {/* Description */}
      <p className="text-sm md:text-base text-slate-600 leading-relaxed mb-4">
        {service.description}
      </p>

      {/* Bullets */}
      <ul className="space-y-2 mb-6">
        {service.bullets.map((bullet, i) => (
          <li key={i} className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
            <span className="text-sm text-slate-700">{bullet}</span>
          </li>
        ))}
      </ul>

      {/* CTA Link */}
      <Link
        href={`/${locale}${service.ctaHref}`}
        className="text-primary font-semibold hover:text-primary/80 inline-flex items-center gap-1.5 transition-colors duration-200"
      >
        {service.ctaLabel}
        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
      </Link>
    </article>
  );
}

export function CoreServicesSection({ locale }: CoreServicesSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-slate-50" aria-labelledby="core-services-heading">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
          <p className="text-sm font-semibold text-primary tracking-wider mb-3">
            {content.eyebrow}
          </p>
          <h2
            id="core-services-heading"
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
          >
            {content.title}
          </h2>
          <p className="text-lg text-slate-600">{content.subtitle}</p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 max-w-7xl mx-auto mb-12">
          {content.services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} locale={locale} />
          ))}
        </div>

        {/* Bottom Link Strip */}
        <div className="text-center">
          <p className="text-sm md:text-base text-slate-600 inline-flex flex-wrap items-center justify-center gap-2">
            <span>{content.bottomLinks.text}</span>
            {content.bottomLinks.links.map((link, i) => (
              <span key={link.href} className="inline-flex items-center gap-2">
                {i > 0 && <span className="text-slate-400">·</span>}
                <Link
                  href={`/${locale}${link.href}`}
                  className="text-primary font-semibold hover:text-primary/80 inline-flex items-center gap-1 transition-colors duration-200"
                >
                  {link.label}
                  <ArrowLeft className="w-3 h-3" aria-hidden="true" />
                </Link>
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
