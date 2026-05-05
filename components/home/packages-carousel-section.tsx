/**
 * Packages Carousel Section
 * Displays all 8 packages in a horizontal scrollable carousel
 */

'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { Check, Gift, Heart, Users, Briefcase, Star, Crown, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PackagesCarouselSectionProps {
  locale: string;
}

type Package = {
  id: string;
  name: string;
  price: string;
  description: string;
  tagline: string;
  image: string;
  icon: any;
  features: string[];
  badge?: string;
  badgeColor?: string;
  isFree?: boolean;
  ctaText: string;
  ctaHref: string;
};

const packages: Package[] = [
  {
    id: 'individual',
    name: 'الباقة الفردية',
    price: '299',
    description: 'مثالية للأفراد',
    tagline: 'ابدأ رحلتك الصحية بأقل تكلفة',
    image: '/logo.jpeg',
    icon: Users,
    features: [
      'خصومات حتى 50% في +2000 مركز',
      'رصيد خدمات 1,500 ريال',
      'حجز فوري مع أفضل الأطباء',
      '5 استشارات أونلاين مجانية',
    ],
    badge: 'الأكثر شعبية',
    badgeColor: 'bg-emerald-500',
    ctaText: 'اشترك الآن',
    ctaHref: '/ar/register?plan=individual',
  },
  {
    id: 'premium',
    name: 'الباقة المتميزة',
    price: '399',
    description: 'للزوج والزوجة',
    tagline: 'رعاية صحية مشتركة بأفضل قيمة',
    image: '/logo.jpeg',
    icon: Heart,
    features: [
      'خصومات حتى 60% للزوجين',
      'رصيد خدمات 3,000 ريال',
      'تنظيف أسنان مجاني مرتين سنوياً',
      '10 استشارات أونلاين مجانية',
    ],
    badge: 'الأكثر طلباً',
    badgeColor: 'bg-blue-500',
    ctaText: 'اشترك الآن',
    ctaHref: '/ar/register?plan=premium',
  },
  {
    id: 'gold',
    name: 'الباقة الذهبية',
    price: '799',
    description: 'للأفراد المميزين',
    tagline: 'أفضل قيمة مع مميزات حصرية',
    image: '/logo.jpeg',
    icon: Crown,
    features: [
      'خصومات حتى 80% في كل الشبكة',
      'رصيد خدمات 5,000 ريال',
      'كاش باك 15% على كل زيارة',
      'نقاط ولاء مضاعفة + دعم VIP',
    ],
    badge: 'الأفضل قيمة',
    badgeColor: 'bg-amber-500',
    ctaText: 'اشترك الآن',
    ctaHref: '/ar/register?plan=gold',
  },
  {
    id: 'family',
    name: 'الباقة العائلية',
    price: '999',
    description: 'حتى 6 أفراد',
    tagline: 'رعاية شاملة لكل العائلة',
    image: '/logo.jpeg',
    icon: Users,
    features: [
      'تغطية 4-6 أفراد من العائلة',
      'رصيد خدمات 6,000 ريال',
      '4 استشارات مجانية لكل فرد',
      'خصومات عائلية في كل الشبكة',
    ],
    ctaText: 'اشترك الآن',
    ctaHref: '/ar/register?plan=family',
  },
  {
    id: 'business',
    name: 'باقة الأعمال',
    price: 'حسب الاتفاق',
    description: 'للشركات والمؤسسات',
    tagline: 'استثمر في صحة فريقك.. لنجاح مستدام',
    image: '/logo.jpeg',
    icon: Briefcase,
    features: [
      'تغطية شاملة لكل الموظفين',
      'لوحة تحكم خاصة للإدارة',
      'أسعار تنافسية حسب العدد',
      'مدير حساب مخصص 24/7',
    ],
    ctaText: 'تواصل معنا',
    ctaHref: '/ar/contact?type=business',
  },
  {
    id: 'special-needs',
    name: 'باقة ذوي الاحتياجات الخاصة',
    price: 'مجاناً',
    description: 'كلنا معكم',
    tagline: 'رعاية خاصة ومتابعة دورية',
    image: '/logo.jpeg',
    icon: Heart,
    features: [
      'رصيد خدمات 6,000 ريال مجاناً',
      '5 استشارات طبية مجانية',
      'رعاية خاصة ومتابعة دورية',
      'دعم فني مخصص على مدار الساعة',
    ],
    isFree: true,
    badge: 'باقة مجتمعية',
    badgeColor: 'bg-purple-500',
    ctaText: 'قدّم الآن',
    ctaHref: '/ar/register?plan=special-needs',
  },
  {
    id: 'orphans',
    name: 'باقة الأيتام وحفّاظ القرآن',
    price: 'مجاناً',
    description: 'دعم الأيتام وحفظة القرآن',
    tagline: 'استثمار في صحة حفظة كتاب الله',
    image: '/logo.jpeg',
    icon: Gift,
    features: [
      'رصيد خدمات 6,000 ريال مجاناً',
      'تغطية طبية شاملة ومتابعة',
      'فحوصات دورية مجانية',
      'دعم نفسي واجتماعي متكامل',
    ],
    isFree: true,
    badge: 'باقة مجتمعية',
    badgeColor: 'bg-teal-500',
    ctaText: 'قدّم الآن',
    ctaHref: '/ar/register?plan=orphans',
  },
  {
    id: 'widows',
    name: 'باقة الأرامل والمطلقات',
    price: '99',
    description: 'دعم اجتماعي',
    tagline: 'معكم في كل خطوة نحو حياة أفضل',
    image: '/logo.jpeg',
    icon: Sparkles,
    features: [
      'رصيد خدمات 6,000 ريال',
      '5 استشارات طبية مجانية',
      'دعم نفسي واستشارات مجانية',
      'برامج تأهيل وتدريب مهني',
    ],
    badge: 'دعم اجتماعي',
    badgeColor: 'bg-pink-500',
    ctaText: 'اشترك الآن',
    ctaHref: '/ar/register?plan=widows',
  },
];

function PackageCard({ pkg }: { pkg: Package }) {
  const Icon = pkg.icon;

  return (
    <div className="w-[22rem] md:w-[26rem] flex-shrink-0 snap-center">
      <div className="group relative h-full rounded-2xl bg-white overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100">
        {/* Badge */}
        {pkg.badge && (
          <div className={`absolute top-5 right-5 z-20 ${pkg.badgeColor} text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg`}>
            {pkg.badge}
          </div>
        )}

        {/* Image Section - Larger height */}
        <div className="relative w-full h-72 bg-gradient-to-br from-[#5B9A9E] via-[#6BA5A8] to-[#5B9A9E] overflow-hidden">
          {/* Designer Notice - Simple Text Only */}
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="text-center px-8">
              <p className="text-white text-2xl font-bold leading-relaxed drop-shadow-lg">
                إشعار للمصممة:<br />
                ضعي صورة تصميم للباقة<br />
                <span className="text-3xl font-black">{pkg.name}</span><br />
                <span className="text-lg font-semibold mt-2 inline-block">المقاس: 416×288 بكسل</span>
              </p>
            </div>
          </div>

          {/* Decorative Pattern - Light and modern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id={`pattern-${pkg.id}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="20" cy="20" r="2" fill="white" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#pattern-${pkg.id})`} />
            </svg>
          </div>

          {/* Decorative Circles - Brand style */}
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-white/10 blur-2xl" />

          {/* Pulse effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Small icon badge in corner */}
          <div className="absolute bottom-5 left-5 w-12 h-12 rounded-lg bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-lg z-10">
            <Icon className="w-6 h-6 text-[#5B9A9E]" aria-hidden="true" />
          </div>
        </div>

        {/* Content Section - Larger padding */}
        <div className="p-6">
          {/* Package Name */}
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#5B9A9E] transition-colors">
            {pkg.name}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-3">{pkg.description}</p>

          {/* Price */}
          <div className="mb-4">
            {pkg.isFree ? (
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-[#5B9A9E]">مجاناً</span>
                <span className="text-lg">🎁</span>
              </div>
            ) : pkg.price === 'حسب الاتفاق' ? (
              <div className="text-xl font-bold text-gray-900">{pkg.price}</div>
            ) : (
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-[#5B9A9E]">{pkg.price}</span>
                <span className="text-sm text-gray-600">ريال/سنة</span>
              </div>
            )}
          </div>

          {/* Tagline */}
          <p className="text-sm text-[#6BA5A8] font-semibold mb-4">{pkg.tagline}</p>

          {/* Features */}
          <ul className="space-y-2 mb-5" role="list">
            {pkg.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <Check className="w-4 h-4 text-[#5B9A9E] flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <Button asChild className="w-full bg-gradient-to-r from-[#5B9A9E] to-[#6BA5A8] hover:from-[#6BA5A8] hover:to-[#5B9A9E] text-white font-bold rounded-xl text-base h-11 shadow-md hover:shadow-lg transition-all">
            <Link href={pkg.ctaHref}>
              {pkg.ctaText} ←
            </Link>
          </Button>
        </div>

        {/* Decorative corner accent */}
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br from-[#5B9A9E]/10 to-transparent rounded-tl-full" />
      </div>
    </div>
  );
}

export function PackagesCarouselSection({ locale }: PackagesCarouselSectionProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (direction: 'prev' | 'next') => {
    if (!carouselRef.current) return;
    const scrollAmount = 400;
    const newScroll =
      direction === 'next'
        ? carouselRef.current.scrollLeft + scrollAmount
        : carouselRef.current.scrollLeft - scrollAmount;
    carouselRef.current.scrollTo({ left: newScroll, behavior: 'smooth' });
  };

  return (
    <section className="py-4 md:py-8 bg-gradient-to-b from-slate-50 to-white" aria-labelledby="packages-heading">
      <div className="container mx-auto px-4 max-w-[1600px]">
        {/* Header */}
        <div className="text-center mb-6 max-w-4xl mx-auto">
          <p className="text-sm font-bold text-emerald-600 uppercase tracking-wider mb-2">
            كل الباقات
          </p>
          <h2
            id="packages-heading"
            className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-2"
          >
            اختر الباقة اللي تناسبك
          </h2>
          <p className="text-lg text-slate-700 leading-relaxed">
            8 باقات مصممة خصيصاً لتلبية احتياجاتك الصحية — من الأفراد للعائلات، ومن الشركات للحالات الخاصة
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative px-16">
          {/* Navigation Arrows - Outside the carousel */}
          <button
            onClick={() => scrollCarousel('prev')}
            className="hidden md:flex absolute -right-16 top-1/2 -translate-y-1/2 z-10 w-12 h-12 items-center justify-center bg-white rounded-full shadow-lg border border-slate-200 hover:bg-slate-50 transition-colors duration-200"
            aria-label="السابق"
          >
            <ChevronRight className="w-6 h-6 text-slate-700" />
          </button>
          <button
            onClick={() => scrollCarousel('next')}
            className="hidden md:flex absolute -left-16 top-1/2 -translate-y-1/2 z-10 w-12 h-12 items-center justify-center bg-white rounded-full shadow-lg border border-slate-200 hover:bg-slate-50 transition-colors duration-200"
            aria-label="التالي"
          >
            <ChevronLeft className="w-6 h-6 text-slate-700" />
          </button>

          {/* Carousel */}
          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide pb-4"
          >
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Link
            href={`/${locale}/services#membership`}
            className="inline-flex items-center gap-2 text-emerald-600 font-bold hover:text-emerald-700 transition-colors text-lg"
          >
            شوف كل الباقات بالتفصيل ←
          </Link>
        </div>
      </div>

      {/* Hide Scrollbar */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
