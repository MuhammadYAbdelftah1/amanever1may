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
    tagline: 'صحتك أولوية.. ابدأ رحلة الرعاية بذكاء ووفر مع كل خطوة!',
    image: '/logo.jpeg',
    icon: Users,
    features: [
      '1,500 نقطة أمان: ترحيبية في محفظتك جاهزة للاستخدام الفوري',
      'كاش باك 5%: على خدماتك.. لتبدأ التوفير من اليوم الأول',
      '5 استشارات طبية مجانية: أونلاين لراحتك التامة',
      'خصومات حتى 50%: في متجر أمان حصرياً للأعضاء',
      'أولوية قصوى: وحجز فوري للمواعيد دون انتظار',
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
    tagline: 'الخيار الأذكى.. رعاية مشتركة لك ولشريك حياتك مع توفير مضاعف',
    image: '/logo.jpeg',
    icon: Heart,
    features: [
      '3,000 نقطة أمان: في محفظتكم لتغطية احتياجاتكم الصحية',
      'كاش باك 10%: عائد نقدي وتجميع نقاط أسرع بنسبة (1.5x)',
      '5 استشارات طبية مجانية: للاطمئنان المستمر على صحتكم',
      'تنظيف أسنان مرتين مجاناً: لابتسامة صحية تليق بكم',
      'خصومات حصرية: على كافة الخدمات ومراكز الرعاية الطبية',
    ],
    isPopular: true,
    badge: 'الخيار المفضل',
    badgeColor: 'bg-blue-500',
    ctaText: 'اشترك الآن',
    ctaHref: '/ar/register?plan=premium',
  },
  {
    id: 'gold',
    name: 'الباقة الذهبية',
    price: '799',
    description: 'للأفراد المميزين',
    tagline: 'رفاهية استثنائية.. باقة صُممت لتمنحك العناية الفائقة والعوائد المستمرة',
    image: '/logo.jpeg',
    icon: Crown,
    features: [
      '5,000 نقطة أمان: في محفظتك.. استثمار صحي فاخر',
      'كاش باك 15%: فوري يعزز رصيدك مع كل خدمة تستخدمها',
      'نقاط ولاء مضاعفة (2x): أسرع طريق للحصول على خدماتك المجانية',
      '5 استشارات طبية + تنظيف أسنان: مجاناً بالكامل',
      'دعم فني مخصص: لخدمتك على مدار الساعة كعميل VIP',
    ],
    badge: 'الأفضل قيمة',
    badgeColor: 'bg-amber-500',
    ctaText: 'اشترك الآن',
    ctaHref: '/ar/register?plan=gold',
  },
  {
    id: 'seniors',
    name: 'باقة كبار السن',
    price: '599',
    description: 'لرعاية كبار السن',
    tagline: 'بركة أيامنا.. خصصنا لهم رعاية فائقة تليق بقدرهم وتضمن راحتهم',
    image: '/logo.jpeg',
    icon: Star,
    features: [
      '6,000 نقطة أمان: رصيد فوري في المحفظة مخصص لكافة الفحوصات والخدمات',
      'كاش باك 20%: أعلى نسبة استرداد نقدي لدعم تكاليف الرعاية الصحية المستمرة',
      'زيارات تمريضية منزلية: متابعة دورية للعلامات الحيوية والسكر والضغط في المنزل',
      'أولوية الحجز: مع نخبة من استشاريي أمراض الشيخوخة والطب الباطني',
      'خصومات استثنائية: على الأجهزة الطبية المنزلية والمستلزمات العلاجية',
      'دعم فني "عناية": فريق مخصص لمساعدة كبار السن أو ذويهم في تنظيم المواعيد',
    ],
    badge: 'تاج الوفاء',
    badgeColor: 'bg-indigo-500',
    ctaText: 'اشترك الآن',
    ctaHref: '/ar/register?plan=seniors',
  },
  {
    id: 'family',
    name: 'الباقة العائلية',
    price: '999',
    description: 'حتى 6 أفراد',
    tagline: 'مظلة الأمان لعائلتك.. التغطية الأقوى التي تكافئك على اهتمامك بمن تحب',
    image: '/logo.jpeg',
    icon: Users,
    features: [
      '6,000 نقطة أمان: رصيد متاح للاستخدام لجميع أفراد العائلة',
      'كاش باك حصري 20%: ومضاعفة نقاط (2x).. لأنهم يستحقون الأفضل',
      '4 استشارات مجانية + تنظيف أسنان مرتين: لكل فرد في الباقة',
      'إدارة حسابات متعددة: من تطبيق واحد بكل سهولة ويسر',
      'خصومات عائلية خاصة: ومستمرة طوال العام',
    ],
    badge: 'رعاية شاملة',
    badgeColor: 'bg-emerald-600',
    ctaText: 'اشترك الآن',
    ctaHref: '/ar/register?plan=family',
  },
  {
    id: 'special-needs',
    name: 'باقة ذوي الاحتياجات الخاصة',
    price: 'مجاناً',
    description: 'دعم مجتمعي',
    tagline: 'أنتم أبطالنا.. ورعايتكم الاستثنائية شرفٌ لنا',
    image: '/logo.jpeg',
    icon: Heart,
    features: [
      '6,000 نقطة أمان مجانية: لدعم احتياجاتكم الصحية المباشرة',
      'كاش باك 10%: تقديراً لكم، يعود لمحفظتكم فوراً',
      '5 استشارات طبية + تنظيف أسنان مرتين: مجاناً بالكامل',
      'رعاية خاصة: ومتابعة دورية مستمرة لحالتكم الصحية',
    ],
    isFree: true,
    badge: 'دعم مجتمعي',
    badgeColor: 'bg-purple-500',
    ctaText: 'قدّم الآن',
    ctaHref: '/ar/register?plan=special-needs',
  },
  {
    id: 'orphans',
    name: 'باقة الأيتام وحفاظ القرآن',
    price: 'مجاناً',
    description: 'دعم مجتمعي',
    tagline: 'فخر مجتمعنا.. استثمارنا في صحتكم هو مكسبنا الحقيقي',
    image: '/logo.jpeg',
    icon: Gift,
    features: [
      '6,000 نقطة أمان مجانية: رصيد فوري للبدء في الرعاية',
      'كاش باك 10%: لتوفير دائم ومستمر في الشبكة الطبية',
      'تغطية شاملة: طبياً وصحياً في أرقى المراكز المعتمدة',
      'دعم نفسي واجتماعي: متكامل يرافقكم في كل مرحلة',
    ],
    isFree: true,
    badge: 'دعم مجتمعي',
    badgeColor: 'bg-teal-500',
    ctaText: 'قدّم الآن',
    ctaHref: '/ar/register?plan=orphans',
  },
  {
    id: 'widows',
    name: 'باقة الأرامل والمطلقات',
    price: '99',
    description: 'دعم اجتماعي',
    tagline: 'نحن سندكِ.. معكِ في كل خطوة نحو حياة مطمئنة وأفضل',
    image: '/logo.jpeg',
    icon: Sparkles,
    features: [
      '6,000 نقطة أمان: في محفظتك لاستخدامها متى شئتِ',
      'كاش باك 10%: يدعم ميزانيتك ويريح بالك',
      'تغطية طبية وصحية شاملة: بالإضافة إلى 5 استشارات مجانية',
      'دعم نفسي وبرامج تأهيل: وتدريب مستمر لتمكينكِ',
    ],
    badge: 'دعم اجتماعي',
    badgeColor: 'bg-pink-500',
    ctaText: 'اشترك الآن',
    ctaHref: '/ar/register?plan=widows',
  },
  {
    id: 'business',
    name: 'باقة الأعمال',
    price: 'حسب الاتفاق',
    description: 'للشركات والمؤسسات',
    tagline: 'صحة فريقك هي سر نجاحك.. وفرنا لك الحل المتكامل!',
    image: '/logo.jpeg',
    icon: Briefcase,
    features: [
      'برنامج مكافآت مخصص: لرفع مستوى رضا الموظفين وولائهم',
      'تغطية صحية شاملة: بأسعار تنافسية ومخفضة للمجموعات',
      'لوحة تحكم خاصة: للإدارة مع تقارير شهرية دقيقة للشركة',
      'مدير حساب مخصص: لتسهيل كافة الإجراءات والدعم الفني',
      'خطط مرنة: مفصلة بالكامل حسب احتياج وميزانية منشأتك',
    ],
    ctaText: 'تواصل معنا',
    ctaHref: '/ar/contact?type=business',
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
            باقات أمان إيفر
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
            رعاية متكاملة.. اختر ما يناسبك
          </h2>
          <p className="text-lg text-slate-700 leading-relaxed">
            9 باقات صُممت بعناية لتلبي احتياجات الجميع؛ من الأفراد والعائلات، إلى الشركات والفئات المجتمعية الخاصة.
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
