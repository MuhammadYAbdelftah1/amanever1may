/**
 * Packages Carousel Section
 * Displays all 8 packages in a horizontal scrollable carousel
 */

'use client';

import Image from 'next/image';
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
      'حجز مواعيد واستشارات أونلاين',
      'رصيد خدمات 1,500 ريال',
      'خصومات حتى 50%',
      '5 استشارات مجانية',
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
      '5 استشارات مجاناً',
      'رصيد خدمات 3,000 ريال',
      'تنظيف أسنان مرتين',
      'خصومات حصرية',
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
      'رصيد خدمات 5,000 ريال',
      'كاش باك 15%',
      'نقاط ولاء مضاعفة',
      'دعم فني مخصص',
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
      'تغطية 4-6 أفراد',
      'رصيد خدمات 6,000 ريال',
      '4 استشارات لكل فرد',
      'خصومات عائلية',
    ],
    ctaText: 'اشترك الآن',
    ctaHref: '/ar/register?plan=family',
  },
  {
    id: 'business',
    name: 'باقة الأعمال',
    price: 'حسب الاتفاق',
    description: 'للشركات والمؤسسات',
    tagline: 'حلول صحية متكاملة لموظفيك',
    image: '/logo.jpeg',
    icon: Briefcase,
    features: [
      'تغطية شاملة للموظفين',
      'لوحة تحكم خاصة',
      'أسعار خاصة',
      'مدير حساب مخصص',
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
      'رصيد خدمات 6,000 ريال',
      '5 استشارات مجاناً',
      'رعاية خاصة',
      'دعم فني مخصص',
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
      'رصيد خدمات 6,000 ريال',
      'تغطية شاملة',
      'متابعة دورية',
      'دعم نفسي واجتماعي',
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
      '5 استشارات مجاناً',
      'دعم نفسي مجاني',
      'برامج تأهيل وتدريب',
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
    <div className="w-80 md:w-96 flex-shrink-0 snap-center">
      <div className="group relative h-full rounded-3xl bg-white border-2 border-slate-200 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
        {/* Badge */}
        {pkg.badge && (
          <div className={`absolute top-4 right-4 z-10 ${pkg.badgeColor} text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg`}>
            {pkg.badge}
          </div>
        )}

        {/* Image Section */}
        <div className="relative w-full h-40 bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
          <Image
            src={pkg.image}
            alt={pkg.name}
            width={100}
            height={100}
            className="object-contain opacity-40"
          />
          {/* Icon Overlay */}
          <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-white/90 backdrop-blur-sm text-emerald-600 flex items-center justify-center shadow-lg">
            <Icon className="w-6 h-6" aria-hidden="true" />
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          {/* Package Name */}
          <h3 className="text-xl font-bold text-slate-900 mb-2">{pkg.name}</h3>

          {/* Description */}
          <p className="text-sm text-slate-600 mb-3">{pkg.description}</p>

          {/* Price */}
          <div className="mb-4">
            {pkg.isFree ? (
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-emerald-600">مجاناً</span>
                <span className="text-lg">🎁</span>
              </div>
            ) : pkg.price === 'حسب الاتفاق' ? (
              <div className="text-xl font-bold text-slate-900">{pkg.price}</div>
            ) : (
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-emerald-600">{pkg.price}</span>
                <span className="text-sm text-slate-600">ريال/سنة</span>
              </div>
            )}
          </div>

          {/* Tagline */}
          <p className="text-sm text-emerald-600 font-semibold mb-4">{pkg.tagline}</p>

          {/* Features */}
          <ul className="space-y-2 mb-6" role="list">
            {pkg.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl">
            <Link href={pkg.ctaHref}>
              {pkg.ctaText} ←
            </Link>
          </Button>
        </div>
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
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white" aria-labelledby="packages-heading">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <p className="text-sm font-bold text-emerald-600 uppercase tracking-wider mb-4">
            كل الباقات
          </p>
          <h2
            id="packages-heading"
            className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-6"
          >
            اختر الباقة اللي تناسبك
          </h2>
          <p className="text-lg text-slate-700 leading-relaxed">
            8 باقات مصممة خصيصاً لتلبية احتياجاتك الصحية — من الأفراد للعائلات، ومن الشركات للحالات الخاصة
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={() => scrollCarousel('prev')}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 items-center justify-center bg-white rounded-full shadow-lg border border-slate-200 hover:bg-slate-50 transition-colors duration-200"
            aria-label="السابق"
          >
            <ChevronRight className="w-6 h-6 text-slate-700" />
          </button>
          <button
            onClick={() => scrollCarousel('next')}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 items-center justify-center bg-white rounded-full shadow-lg border border-slate-200 hover:bg-slate-50 transition-colors duration-200"
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
            href={`/${locale}/pricing`}
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
