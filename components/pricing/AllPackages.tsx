/**
 * All Packages Section - 8 Main Packages
 * Displays all available packages in a card format with images
 */

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Check, Gift, Heart, Users, Briefcase, Star, Crown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Package = {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  description: string;
  tagline: string;
  image: string;
  icon: any;
  features: string[];
  badge?: string;
  badgeColor?: string;
  isFree?: boolean;
  isPopular?: boolean;
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
      'حجز مواعيد واستشارات أونلاين فورية',
      'رصيد خدمات 1,500 ريال',
      'خصومات حتى 50% على المتجر',
      '5 استشارات طبية مجانية',
      'أولوية في الحجز',
    ],
    isPopular: true,
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
      '5 استشارات طبية مجاناً',
      'رصيد خدمات 3,000 ريال',
      'تنظيف أسنان مرتين مجاناً',
      'خصومات حصرية على كل الخدمات',
      'أولوية في الحجز',
    ],
    isPopular: true,
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
      '5 استشارات طبية مجاناً',
      'رصيد خدمات 5,000 ريال',
      'تنظيف أسنان مجاناً',
      'كاش باك 15% على كل الخدمات',
      'نقاط ولاء مضاعفة (x2)',
      'دعم فني مخصص 24/7',
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
      '4 استشارات مجانية لكل فرد',
      'رصيد خدمات 6,000 ريال',
      'تنظيف أسنان مرتين لكل فرد',
      'تغطية شاملة لـ 4-6 أفراد',
      'إدارة حسابات متعددة',
      'خصومات عائلية خاصة',
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
      'تغطية صحية شاملة للموظفين',
      'لوحة تحكم خاصة للإدارة',
      'أسعار خاصة للمجموعات',
      'تقارير شهرية مفصلة',
      'مدير حساب مخصص',
      'خطط مخصصة حسب الاحتياج',
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
      '5 استشارات طبية مجاناً',
      'رصيد خدمات 6,000 ريال',
      'تنظيف أسنان مرتين مجاناً',
      'رعاية خاصة ومتابعة دورية',
      'دعم فني مخصص',
      'أولوية في الحجز',
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
      '5 استشارات طبية مجاناً',
      'رصيد خدمات 6,000 ريال',
      'تغطية شاملة طبياً وصحياً',
      'متابعة دورية مجانية',
      'دعم نفسي واجتماعي',
      'برامج توعية صحية',
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
      '5 استشارات طبية مجاناً',
      'رصيد خدمات 6,000 ريال',
      'تغطية شاملة طبياً وصحياً',
      'دعم نفسي مجاني',
      'برامج تأهيل وتدريب',
      'خصومات إضافية',
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
    <div className="group relative h-full rounded-3xl bg-white border-2 border-slate-200 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
      {/* Badge */}
      {pkg.badge && (
        <div className={`absolute top-4 right-4 z-10 ${pkg.badgeColor} text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg`}>
          {pkg.badge}
        </div>
      )}

      {/* Image Section */}
      <div className="relative w-full h-48 bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
        <Image
          src={pkg.image}
          alt={pkg.name}
          width={120}
          height={120}
          className="object-contain opacity-40"
        />
        {/* Icon Overlay */}
        <div className="absolute top-4 left-4 w-14 h-14 rounded-2xl bg-white/90 backdrop-blur-sm text-emerald-600 flex items-center justify-center shadow-lg">
          <Icon className="w-7 h-7" aria-hidden="true" />
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 md:p-8">
        {/* Package Name */}
        <h3 className="text-2xl font-bold text-slate-900 mb-2">{pkg.name}</h3>

        {/* Description */}
        <p className="text-sm text-slate-600 mb-4">{pkg.description}</p>

        {/* Price */}
        <div className="mb-6">
          {pkg.isFree ? (
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-emerald-600">مجاناً</span>
              <span className="text-lg text-emerald-600 font-bold">🎁</span>
            </div>
          ) : pkg.price === 'حسب الاتفاق' ? (
            <div className="text-2xl font-bold text-slate-900">{pkg.price}</div>
          ) : (
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-emerald-600">{pkg.price}</span>
              <span className="text-lg text-slate-600">ريال/سنة</span>
            </div>
          )}
        </div>

        {/* Tagline */}
        <p className="text-base text-emerald-600 font-semibold mb-6">{pkg.tagline}</p>

        {/* Features */}
        <ul className="space-y-3 mb-8" role="list">
          {pkg.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
              <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
          <Link href={pkg.ctaHref}>
            {pkg.ctaText} ←
          </Link>
        </Button>
      </div>
    </div>
  );
}

export function AllPackages() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <p className="text-sm font-bold text-emerald-600 uppercase tracking-wider mb-4">
            كل الباقات
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
            اختر الباقة اللي تناسبك
          </h2>
          <p className="text-lg text-slate-700 leading-relaxed">
            8 باقات مصممة خصيصاً لتلبية احتياجاتك الصحية — من الأفراد للعائلات، ومن الشركات للحالات الخاصة
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-gradient-to-br from-emerald-600 to-teal-600 rounded-3xl p-12 shadow-2xl">
          <h3 className="text-3xl font-bold text-white mb-4">
            محتار أي باقة تختار؟
          </h3>
          <p className="text-emerald-50 mb-8 text-lg max-w-2xl mx-auto">
            تواصل مع فريقنا وراح نساعدك تختار الباقة المثالية لاحتياجاتك
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="bg-white text-emerald-700 hover:bg-emerald-50 font-bold shadow-lg">
              <Link href="/ar/contact">
                تواصل معنا ←
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/20 font-bold">
              <Link href="https://wa.me/966544608220" target="_blank">
                واتساب مباشر ←
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
