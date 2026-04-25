/**
 * Medical Network Explorer (Section 7)
 * CRITICAL DESIGN RULE: This section replaces the 4x-duplicated network
 * listing in the old version. Do NOT duplicate category data anywhere.
 * 
 * TODO before launch:
 * - Replace placeholder partner data with real CMS/API data.
 * - Obtain logo permissions for all displayed partners.
 * - Verify partner counts per category are accurate.
 * - Confirm discount percentages with partnership team.
 * - Link bookingHref to actual booking flow routes.
 * 
 * Placement: After <SocialProof />, before other sections
 */

'use client';

import { useState, useRef } from 'react';
import { Building2, Stethoscope, Pill, Eye, Smile, FlaskConical, ChevronLeft, ChevronRight, MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';

interface MedicalNetworkSectionProps {
  locale: string;
}

type Partner = {
  id: string;
  nameAr: string;
  nameEn: string;
  logoSrc?: string;
  city: string;
  neighborhood?: string;
  rating?: { value: number; count: number };
  discountPercent: number;
  bookingHref: string;
};

type NetworkCategory = {
  id: 'hospitals' | 'clinics' | 'pharmacies' | 'eye' | 'dental-cosmetic' | 'labs';
  nameAr: string;
  icon: LucideIcon;
  count: string;
  partners: Partner[];
};

type City = {
  id: string;
  nameAr: string;
};

const cities: City[] = [
  { id: 'all', nameAr: 'كل المدن' },
  { id: 'riyadh', nameAr: 'الرياض' },
  { id: 'jeddah', nameAr: 'جدة' },
  { id: 'makkah', nameAr: 'مكة المكرمة' },
  { id: 'madinah', nameAr: 'المدينة المنورة' },
  { id: 'dammam', nameAr: 'الدمام' },
  { id: 'khobar', nameAr: 'الخبر' },
  { id: 'ahsa', nameAr: 'الأحساء' },
  { id: 'taif', nameAr: 'الطائف' },
  { id: 'abha', nameAr: 'أبها' },
];

// TODO: Replace with real API/CMS data
const categories: NetworkCategory[] = [
  {
    id: 'hospitals',
    nameAr: 'مستشفيات كبرى',
    icon: Building2,
    count: '120+',
    partners: [
      { id: '1', nameAr: 'مستشفى الدكتور سليمان الحبيب', nameEn: 'Dr. Sulaiman Al Habib', city: 'riyadh', neighborhood: 'العليا', rating: { value: 4.8, count: 1250 }, discountPercent: 60, bookingHref: '/services#instant-booking' },
      { id: '2', nameAr: 'مستشفى المواساة', nameEn: 'Mouwasat Hospital', city: 'dammam', neighborhood: 'الفيصلية', rating: { value: 4.7, count: 980 }, discountPercent: 55, bookingHref: '/services#instant-booking' },
      { id: '3', nameAr: 'مستشفى دله', nameEn: 'Dallah Hospital', city: 'riyadh', neighborhood: 'النخيل', rating: { value: 4.6, count: 850 }, discountPercent: 50, bookingHref: '/services#instant-booking' },
      { id: '4', nameAr: 'السعودي الألماني', nameEn: 'Saudi German Health', city: 'jeddah', neighborhood: 'حي السلامة', rating: { value: 4.7, count: 1100 }, discountPercent: 55, bookingHref: '/services#instant-booking' },
      { id: '5', nameAr: 'مستشفى الحمادي', nameEn: 'Al Hammadi Hospital', city: 'riyadh', neighborhood: 'الملقا', rating: { value: 4.5, count: 720 }, discountPercent: 50, bookingHref: '/services#instant-booking' },
      { id: '6', nameAr: 'مستشفى الحبيب التخصصي', nameEn: 'Al Habib Specialist', city: 'riyadh', neighborhood: 'الغدير', rating: { value: 4.8, count: 950 }, discountPercent: 60, bookingHref: '/services#instant-booking' },
      { id: '7', nameAr: 'مستشفى الملك فيصل التخصصي', nameEn: 'King Faisal Specialist', city: 'riyadh', neighborhood: 'الشميسي', rating: { value: 4.9, count: 1500 }, discountPercent: 65, bookingHref: '/services#instant-booking' },
      { id: '8', nameAr: 'مستشفيات مغربي', nameEn: 'Magrabi Hospitals', city: 'jeddah', neighborhood: 'الروضة', rating: { value: 4.7, count: 1050 }, discountPercent: 55, bookingHref: '/services#instant-booking' },
    ],
  },
  {
    id: 'clinics',
    nameAr: 'عيادات ومجمعات تخصصية',
    icon: Stethoscope,
    count: '180+',
    partners: [
      { id: 'c1', nameAr: 'عيادات الموسى', nameEn: 'Al Moosa Clinics', city: 'riyadh', discountPercent: 50, bookingHref: '/services#instant-booking' },
      { id: 'c2', nameAr: 'مجمع عيادات الرعاية', nameEn: 'Care Clinics Complex', city: 'jeddah', discountPercent: 45, bookingHref: '/services#instant-booking' },
    ],
  },
  {
    id: 'pharmacies',
    nameAr: 'صيدليات',
    icon: Pill,
    count: '80+',
    partners: [
      { id: 'p1', nameAr: 'صيدليات النهدي', nameEn: 'Nahdi Pharmacy', city: 'riyadh', discountPercent: 30, bookingHref: '/services#store' },
      { id: 'p2', nameAr: 'صيدليات الدواء', nameEn: 'Al-Dawaa Pharmacy', city: 'jeddah', discountPercent: 25, bookingHref: '/services#store' },
      { id: 'p3', nameAr: 'صيدليات صدلية', nameEn: 'Saydalia', city: 'dammam', discountPercent: 28, bookingHref: '/services#store' },
      { id: 'p4', nameAr: 'صيدليات سين', nameEn: 'Seen Pharmacy', city: 'riyadh', discountPercent: 30, bookingHref: '/services#store' },
      { id: 'p5', nameAr: 'صيدلية تمر', nameEn: 'Tamer Pharmacy', city: 'jeddah', discountPercent: 25, bookingHref: '/services#store' },
    ],
  },
  {
    id: 'eye',
    nameAr: 'العيون والليزر',
    icon: Eye,
    count: '35+',
    partners: [
      { id: 'e1', nameAr: 'مستشفيات مغربي للعيون', nameEn: 'Magrabi Eye Hospitals', city: 'riyadh', discountPercent: 55, bookingHref: '/services#instant-booking' },
      { id: 'e2', nameAr: 'مركز ابن رشد للعيون', nameEn: 'Ibn Rushd Eye Center', city: 'jeddah', discountPercent: 50, bookingHref: '/services#instant-booking' },
    ],
  },
  {
    id: 'dental-cosmetic',
    nameAr: 'الأسنان والجلدية والتجميل',
    icon: Smile,
    count: '60+',
    partners: [
      { id: 'd1', nameAr: 'عيادات الأسنان المتقدمة', nameEn: 'Advanced Dental Clinics', city: 'riyadh', discountPercent: 45, bookingHref: '/services#instant-booking' },
      { id: 'd2', nameAr: 'مركز التجميل الطبي', nameEn: 'Medical Beauty Center', city: 'jeddah', discountPercent: 50, bookingHref: '/services#instant-booking' },
    ],
  },
  {
    id: 'labs',
    nameAr: 'المختبرات والأشعة',
    icon: FlaskConical,
    count: '45+',
    partners: [
      { id: 'l1', nameAr: 'مختبرات البرج', nameEn: 'Al Borg Laboratories', city: 'riyadh', discountPercent: 40, bookingHref: '/services#instant-booking' },
      { id: 'l2', nameAr: 'مختبرات المختبر', nameEn: 'Al Mokhtabar Labs', city: 'jeddah', discountPercent: 38, bookingHref: '/services#instant-booking' },
    ],
  },
];

const content = {
  eyebrow: 'شبكة أمان الطبية',
  title: '500+ مستشفى وعيادة وصيدلية… في متناول يدك',
  subtitle: 'استكشف شبكتنا الطبية في جميع أنحاء المملكة. اختار التخصص، اختار المدينة، واحجز مباشرة عبر التطبيق.',
  counterPrefix: 'معروض الآن:',
  counterSuffix: 'مقدم خدمة في',
  counterCity: 'بمدينة',
  cta: {
    question: 'ما لقيت اللي بتدور عليه؟',
    primary: 'تصفح الشبكة كاملة',
    secondary: 'اقترح إضافة مقدم خدمة',
  },
};

function PartnerCard({ partner, locale }: { partner: Partner; locale: string }) {
  return (
    <Link
      href={`/${locale}${partner.bookingHref}`}
      className="block w-72 md:w-80 flex-shrink-0 rounded-2xl border border-slate-200 bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-4 md:p-5"
    >
      {/* Logo/Image Area */}
      <div className="rounded-xl bg-slate-100 h-32 flex items-center justify-center overflow-hidden mb-4">
        {partner.logoSrc ? (
          <img src={partner.logoSrc} alt={partner.nameAr} className="w-full h-full object-contain" />
        ) : (
          <span className="text-lg font-bold text-slate-400 text-center px-4">{partner.nameAr}</span>
        )}
      </div>

      {/* Partner Info */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-1">{partner.nameAr}</h3>
        <p className="text-sm text-slate-500 mb-3">{partner.nameEn}</p>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-sm text-slate-600 mb-2">
          <MapPin className="w-4 h-4" aria-hidden="true" />
          <span>
            {cities.find((c) => c.id === partner.city)?.nameAr}
            {partner.neighborhood && ` · ${partner.neighborhood}`}
          </span>
        </div>

        {/* Rating */}
        {partner.rating && (
          <div className="flex items-center gap-1.5 text-sm text-slate-700 mb-3">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
            <span>
              {partner.rating.value} ({partner.rating.count.toLocaleString()} تقييم)
            </span>
          </div>
        )}

        {/* Discount Badge */}
        <div className="mb-4">
          <span className="inline-block bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded-full">
            🏷️ خصم حتى {partner.discountPercent}%
          </span>
        </div>

        {/* CTA Button */}
        <Button size="sm" className="w-full">
          احجز الآن
        </Button>
      </div>
    </Link>
  );
}

export function MedicalNetworkSection({ locale }: MedicalNetworkSectionProps) {
  const [activeTab, setActiveTab] = useState<NetworkCategory['id']>('hospitals');
  const [activeCity, setActiveCity] = useState('all');
  const carouselRef = useRef<HTMLDivElement>(null);

  const activeCategory = categories.find((cat) => cat.id === activeTab)!;
  const filteredPartners =
    activeCity === 'all'
      ? activeCategory.partners
      : activeCategory.partners.filter((p) => p.city === activeCity);

  const activeCityName = cities.find((c) => c.id === activeCity)?.nameAr || 'كل المدن';

  const scrollCarousel = (direction: 'prev' | 'next') => {
    if (!carouselRef.current) return;
    const scrollAmount = 320; // card width + gap
    const newScroll =
      direction === 'next'
        ? carouselRef.current.scrollLeft + scrollAmount
        : carouselRef.current.scrollLeft - scrollAmount;
    carouselRef.current.scrollTo({ left: newScroll, behavior: 'smooth' });
  };

  return (
    <section className="py-20 md:py-28 bg-slate-50" aria-labelledby="medical-network-heading">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            {content.eyebrow}
          </p>
          <h2
            id="medical-network-heading"
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
          >
            {content.title}
          </h2>
          <p className="text-lg md:text-xl text-slate-600">{content.subtitle}</p>
        </div>

        {/* Counter Strip */}
        <div className="text-center mb-6">
          <p className="text-sm text-slate-600">
            <span className="font-semibold">{content.counterPrefix}</span>{' '}
            <span className="text-primary font-bold">{filteredPartners.length}+</span>{' '}
            {content.counterSuffix} &quot;{activeCategory.nameAr}&quot; {content.counterCity} &quot;
            {activeCityName}&quot;
          </p>
        </div>

        {/* Category Tabs */}
        <div
          className="flex gap-2 md:gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth mb-4 pb-2"
          role="tablist"
          aria-label="فئات الشبكة الطبية"
        >
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = activeTab === category.id;
            return (
              <button
                key={category.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${category.id}`}
                onClick={() => setActiveTab(category.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm md:text-base whitespace-nowrap transition-all duration-200 snap-center flex-shrink-0 ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Icon className="w-5 h-5" aria-hidden="true" />
                <span>{category.nameAr}</span>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {category.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* City Filter */}
        <div
          className="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth mb-8 pb-2"
          role="radiogroup"
          aria-label="تصفية حسب المدينة"
        >
          {cities.map((city) => {
            const isActive = activeCity === city.id;
            return (
              <button
                key={city.id}
                role="radio"
                aria-checked={isActive}
                onClick={() => setActiveCity(city.id)}
                className={`px-4 py-1.5 text-sm rounded-full border transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                  isActive
                    ? 'bg-primary/10 text-primary border-primary/30'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                }`}
              >
                {city.nameAr}
              </button>
            );
          })}
        </div>

        {/* Partners Carousel */}
        <div className="relative" role="tabpanel" id={`panel-${activeTab}`}>
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

          {/* Carousel Container */}
          <div
            ref={carouselRef}
            className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide pb-4"
          >
            {filteredPartners.map((partner) => (
              <PartnerCard key={partner.id} partner={partner} locale={locale} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12 pt-8 border-t border-slate-200">
          <p className="text-base md:text-lg text-slate-600 mb-4">{content.cta.question}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href={`/${locale}/medical-network`}>{content.cta.primary} ←</Link>
            </Button>
            <Link
              href={`/${locale}/suggest-partner`}
              className="text-primary font-semibold hover:text-primary/80 transition-colors duration-200"
            >
              {content.cta.secondary} ←
            </Link>
          </div>
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
