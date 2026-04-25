/**
 * Social Proof Section (Section 6)
 * CRITICAL: This section must contain ONLY verified, real claims.
 * No fake testimonials, no inflated numbers, no unverified certifications.
 * 
 * Verify with legal/product team before publishing:
 * - Partner logo permissions
 * - Stat accuracy
 * - CR and compliance claims
 * 
 * Placement: After <WhyAmanEver />, before other sections
 */

'use client';

import { ShieldCheck, Lock, BadgeCheck, Headset, CreditCard, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { LucideIcon } from 'lucide-react';

interface SocialProofSectionProps {
  locale: string;
}

type Partner = {
  id: string;
  nameAr: string;
  nameEn: string;
  logoSrc?: string;
};

type Stat = {
  value: number;
  suffix?: string;
  label: string;
  trending?: boolean;
};

type Credential = {
  icon: LucideIcon;
  label: string;
  subText: string;
};

const content = {
  eyebrow: 'الثقة تُبنى بالأرقام والشراكات',
  title: 'مش مجرد كلام — شوف اللي ورا أمان إيفر',
  subtitle: 'منصة مرخصة في المملكة العربية السعودية، بشراكات حقيقية مع نخبة المستشفيات والصيدليات، وأرقام نشر تتحدث عن نفسها.',
  partners: {
    heading: 'شركاؤنا في الرعاية الصحية',
    subCopy: 'نعمل مع أكبر مقدمي الخدمات الطبية في المملكة لضمان وصولك لأفضل رعاية.',
    list: [
      { id: 'habib', nameAr: 'مستشفى الدكتور سليمان الحبيب', nameEn: 'Dr. Sulaiman Al Habib' },
      { id: 'mouwasat', nameAr: 'مستشفى المواساة', nameEn: 'Mouwasat Hospital' },
      { id: 'dallah', nameAr: 'مستشفى دله', nameEn: 'Dallah Hospital' },
      { id: 'saudi-german', nameAr: 'السعودي الألماني الصحية', nameEn: 'Saudi German Health' },
      { id: 'magrabi', nameAr: 'مستشفيات مغربي', nameEn: 'Magrabi Hospitals' },
      { id: 'fakeeh', nameAr: 'مجموعة فقيه الرعاية الصحية', nameEn: 'Fakeeh Care' },
      { id: 'nahdi', nameAr: 'صيدليات النهدي', nameEn: 'Nahdi Pharmacy' },
      { id: 'aldawaa', nameAr: 'صيدليات الدواء', nameEn: 'Al-Dawaa Pharmacy' },
      { id: 'fitness-time', nameAr: 'فتنس تايم', nameEn: 'Fitness Time' },
      { id: 'bupa', nameAr: 'بوبا العربية', nameEn: 'Bupa Arabia' },
    ] as Partner[],
  },
  stats: {
    heading: 'أرقام أمان إيفر',
    list: [
      { value: 500, suffix: '+', label: 'شريك طبي موثوق', trending: true },
      { value: 50, suffix: '+', label: 'مدينة داخل المملكة' },
      { value: 80, suffix: '%', label: 'أقصى خصم مباشر' },
      { value: 15, label: 'دقيقة متوسط رد الطبيب' },
    ] as Stat[],
  },
  credentials: {
    heading: 'معتمدون ومرخصون',
    subCopy: 'أمان إيفر شركة مسجلة رسمياً في المملكة، وبياناتك الطبية محمية وفق أحدث المعايير التنظيمية.',
    list: [
      {
        icon: ShieldCheck,
        label: 'سجل تجاري سعودي',
        subText: 'CR: 7038166471',
      },
      {
        icon: Lock,
        label: 'PDPL / SDAIA متوافق',
        subText: 'حماية البيانات الشخصية',
      },
      {
        icon: BadgeCheck,
        label: 'منصة مرخصة',
        subText: 'وفق أنظمة وزارة الصحة',
      },
      {
        icon: Headset,
        label: 'دعم 24/7',
        subText: '920018041',
      },
      {
        icon: CreditCard,
        label: 'مدفوعات آمنة',
        subText: 'معتمد من البنوك المحلية',
      },
    ] as Credential[],
  },
  footer: {
    text: 'جزء من مهمتنا: بناء ثقة حقيقية في الرعاية الصحية الرقمية السعودية.',
    link: { label: 'اعرف أكتر عن الشركة', href: '/about' },
  },
};

// TODO: Replace text placeholders with actual SVG logos of partners.
// Coordinate with design team to obtain approved logo files.

function PartnerLogoRow() {
  return (
    <div className="relative overflow-hidden">
      {/* Gradient Overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      {/* Marquee Container */}
      <div className="partners-marquee-container">
        <div className="partners-marquee-content">
          {/* First Set */}
          {content.partners.list.map((partner) => (
            <div key={`first-${partner.id}`} className="partners-marquee-item group">
              <div className="relative w-40 h-24 md:w-48 md:h-28 flex items-center justify-center p-6 bg-white rounded-xl border-2 border-gray-100 transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-lg">
                <div className="w-full h-full flex items-center justify-center text-gray-400 group-hover:text-primary transition-colors duration-300 grayscale group-hover:grayscale-0">
                  <div className="text-center">
                    <div className="text-xs md:text-sm font-semibold line-clamp-2">
                      {partner.nameAr}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Duplicate Set for Infinite Effect */}
          {content.partners.list.map((partner) => (
            <div key={`second-${partner.id}`} className="partners-marquee-item group" aria-hidden="true">
              <div className="relative w-40 h-24 md:w-48 md:h-28 flex items-center justify-center p-6 bg-white rounded-xl border-2 border-gray-100 transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-lg">
                <div className="w-full h-full flex items-center justify-center text-gray-400 group-hover:text-primary transition-colors duration-300 grayscale group-hover:grayscale-0">
                  <div className="text-center">
                    <div className="text-xs md:text-sm font-semibold line-clamp-2">
                      {partner.nameAr}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AnimatedStat({ stat }: { stat: Stat }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      setCount(stat.value);
      return;
    }

    const duration = 2000;
    const steps = 60;
    const increment = stat.value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= stat.value) {
        setCount(stat.value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, stat.value]);

  return (
    <div ref={ref} className="text-center">
      <dt className="text-5xl md:text-6xl lg:text-7xl font-black text-primary mb-2">
        {count.toLocaleString()}
        {stat.suffix}
        {stat.trending && (
          <TrendingUp className="inline-block w-8 h-8 md:w-10 md:h-10 text-primary ms-2" aria-hidden="true" />
        )}
      </dt>
      <dd className="text-sm md:text-base text-slate-600 mt-2">{stat.label}</dd>
    </div>
  );
}

function StatsGrid() {
  return (
    <div className="bg-primary/5 rounded-3xl p-8 md:p-12">
      <dl className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {content.stats.list.map((stat) => (
          <AnimatedStat key={stat.label} stat={stat} />
        ))}
      </dl>
    </div>
  );
}

function CredentialBadges() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {content.credentials.list.map((credential, index) => {
        const Icon = credential.icon;
        return (
          <div
            key={credential.label}
            className="bg-white border border-slate-200 rounded-2xl p-4 md:p-6 text-center hover:border-primary/30 hover:shadow-lg transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
            style={{
              animationDelay: `${index * 100}ms`,
              animationFillMode: 'forwards',
            }}
            aria-label={`${credential.label}: ${credential.subText}`}
          >
            <Icon className="w-6 h-6 text-primary mx-auto mb-3" aria-hidden="true" />
            <div className="font-bold text-sm text-slate-900 mb-1">{credential.label}</div>
            <div className="text-xs text-slate-600">{credential.subText}</div>
          </div>
        );
      })}
    </div>
  );
}

export function SocialProofSection({ locale }: SocialProofSectionProps) {
  return (
    <section className="py-20 md:py-28 bg-white" aria-labelledby="social-proof-heading">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20 max-w-4xl mx-auto">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            {content.eyebrow}
          </p>
          <h2
            id="social-proof-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4"
          >
            {content.title}
          </h2>
          <p className="text-lg md:text-xl text-slate-600">{content.subtitle}</p>
        </div>

        {/* Block 1: Partner Logos */}
        <div className="mb-16 lg:mb-20">
          <div className="text-center mb-8">
            <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-2">
              {content.partners.heading}
            </h3>
            <p className="text-base text-slate-600 max-w-2xl mx-auto">
              {content.partners.subCopy}
            </p>
          </div>
          <PartnerLogoRow />
        </div>

        <hr className="border-slate-100 mb-16 lg:mb-20" />

        {/* Block 2: Stats */}
        <div className="mb-16 lg:mb-20">
          <div className="text-center mb-8">
            <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-2">
              {content.stats.heading}
            </h3>
          </div>
          <StatsGrid />
        </div>

        <hr className="border-slate-100 mb-16 lg:mb-20" />

        {/* Block 3: Credentials */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-2">
              {content.credentials.heading}
            </h3>
            <p className="text-base text-slate-600 max-w-2xl mx-auto">
              {content.credentials.subCopy}
            </p>
          </div>
          <CredentialBadges />
        </div>

        {/* Footer */}
        <div className="text-center mt-16 pt-12 border-t border-slate-100">
          <p className="text-base md:text-lg text-slate-600 mb-4">{content.footer.text}</p>
          <Link
            href={`/${locale}${content.footer.link.href}`}
            className="text-primary font-semibold hover:text-primary/80 inline-flex items-center gap-1.5 transition-colors duration-200"
          >
            {content.footer.link.label} ←
          </Link>
        </div>
      </div>

      {/* CSS for Marquee Animation - Uses same animation as PartnersSection */}
      <style jsx global>{`
        .partners-marquee-container {
          display: flex;
          overflow: hidden;
        }

        .partners-marquee-content {
          display: flex;
          gap: 1.5rem;
          animation: partners-scroll 40s linear infinite;
        }

        .partners-marquee-item {
          flex-shrink: 0;
        }

        .partners-marquee-content:hover {
          animation-play-state: paused;
        }

        @keyframes partners-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .partners-marquee-content {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
