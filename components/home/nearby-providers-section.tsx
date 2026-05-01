/**
 * Nearby Providers Section (مقدمي خدمات بالقرب منك)
 * Location-based providers with category filtering
 */

'use client';

import { useState } from 'react';
import { MapPin, Star, Navigation2, Building2, Stethoscope, Pill, Sparkles } from 'lucide-react';

interface NearbyProvidersSectionProps {
  locale: string;
}

type Provider = {
  id: number;
  name: string;
  category: 'hospital' | 'clinic' | 'pharmacy' | 'beauty';
  specialty: string;
  distance: string;
  rating: number;
  reviews: number;
  address: string;
  city: string;
};

const providers: Provider[] = [
  // Hospitals
  {
    id: 1,
    name: 'مستشفى د. سليمان الحبيب',
    category: 'hospital',
    specialty: 'مستشفى متعدد التخصصات',
    distance: '2.3 كم',
    rating: 4.8,
    reviews: 1250,
    address: 'طريق العروبة، حي العليا',
    city: 'الرياض',
  },
  {
    id: 2,
    name: 'مستشفى الموسى التخصصي',
    category: 'hospital',
    specialty: 'مستشفى تخصصي',
    distance: '3.5 كم',
    rating: 4.9,
    reviews: 1580,
    address: 'شارع الأمير سلطان',
    city: 'جدة',
  },
  {
    id: 3,
    name: 'مستشفى السعودي الألماني',
    category: 'hospital',
    specialty: 'مستشفى عام',
    distance: '4.2 كم',
    rating: 4.7,
    reviews: 1120,
    address: 'طريق الملك فهد',
    city: 'الدمام',
  },
  // Clinics
  {
    id: 4,
    name: 'عيادات النخبة الطبية',
    category: 'clinic',
    specialty: 'عيادات متعددة التخصصات',
    distance: '1.2 كم',
    rating: 4.6,
    reviews: 580,
    address: 'شارع التحلية',
    city: 'الرياض',
  },
  {
    id: 5,
    name: 'مجمع المغربي للعيون',
    category: 'clinic',
    specialty: 'طب وجراحة العيون',
    distance: '1.9 كم',
    rating: 4.8,
    reviews: 920,
    address: 'طريق المدينة',
    city: 'جدة',
  },
  {
    id: 6,
    name: 'عيادات الأسنان المتقدمة',
    category: 'clinic',
    specialty: 'طب وتجميل الأسنان',
    distance: '0.9 كم',
    rating: 4.7,
    reviews: 650,
    address: 'حي الملقا',
    city: 'الرياض',
  },
  // Pharmacies
  {
    id: 7,
    name: 'صيدليات النهدي',
    category: 'pharmacy',
    specialty: 'صيدلية شاملة',
    distance: '0.5 كم',
    rating: 4.6,
    reviews: 890,
    address: 'شارع الأمير سلطان',
    city: 'الرياض',
  },
  {
    id: 8,
    name: 'صيدليات الدواء',
    category: 'pharmacy',
    specialty: 'صيدلية ومستحضرات تجميل',
    distance: '0.8 km',
    rating: 4.5,
    reviews: 740,
    address: 'شارع فلسطين',
    city: 'جدة',
  },
  {
    id: 9,
    name: 'صيدلية رعاية',
    category: 'pharmacy',
    specialty: 'صيدلية متكاملة',
    distance: '1.1 كم',
    rating: 4.4,
    reviews: 520,
    address: 'طريق الخليج',
    city: 'الدمام',
  },
  // Beauty Centers
  {
    id: 10,
    name: 'مركز إشراقة للتجميل',
    category: 'beauty',
    specialty: 'عناية بالبشرة والليزر',
    distance: '1.8 كم',
    rating: 4.7,
    reviews: 680,
    address: 'حي العليا',
    city: 'الرياض',
  },
  {
    id: 11,
    name: 'عيادات نضارة التجميلية',
    category: 'beauty',
    specialty: 'تجميل وعناية بالبشرة',
    distance: '2.1 كم',
    rating: 4.8,
    reviews: 790,
    address: 'شارع التحلية',
    city: 'جدة',
  },
  {
    id: 12,
    name: 'مركز الجمال الطبي',
    category: 'beauty',
    specialty: 'تجميل وعلاج البشرة',
    distance: '1.5 كم',
    rating: 4.6,
    reviews: 540,
    address: 'حي الفيصلية',
    city: 'الدمام',
  },
];

const categories = [
  { id: 'all', label: 'الكل', icon: Building2 },
  { id: 'hospital', label: 'مستشفيات', icon: Building2 },
  { id: 'clinic', label: 'عيادات', icon: Stethoscope },
  { id: 'pharmacy', label: 'صيدليات', icon: Pill },
  { id: 'beauty', label: 'مراكز تجميل', icon: Sparkles },
];

function ProviderCard({ provider }: { provider: Provider }) {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col">
      {/* Image - Tall like mobile mockup */}
      <div className="h-64 md:h-72 rounded-t-3xl overflow-hidden relative">
        <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
          <div className="text-center p-6">
            <div className="text-[#4d8080] font-black text-sm mb-2">إشعار للمصممة 🎨</div>
            <div className="text-gray-600 font-bold text-xs">المقاس: 350×288 بكسل</div>
          </div>
        </div>

        {/* Distance Badge */}
        <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-[#4d8080] text-white text-xs font-black px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
          <MapPin className="w-3 h-3" aria-hidden="true" />
          {provider.distance}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Header */}
        <div className="mb-3">
          <h3 className="text-lg font-black text-gray-900 group-hover:text-[#4d8080] transition-colors mb-1 leading-tight">
            {provider.name}
          </h3>
          <p className="text-gray-500 text-xs font-medium">{provider.specialty}</p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" aria-hidden="true" />
          <span className="text-sm font-black text-gray-900">{provider.rating}</span>
          <span className="text-xs text-gray-400">({provider.reviews} تقييم)</span>
        </div>

        {/* Address */}
        <p className="text-gray-500 text-xs mb-4 line-clamp-2 leading-relaxed flex-grow">
          {provider.address}، {provider.city}
        </p>

        {/* Actions - Push to bottom */}
        <div className="flex gap-2 mt-auto">
          <button className="flex-1 bg-[#4d8080] text-white py-3 px-4 rounded-xl font-black text-sm hover:bg-[#3d6666] transition-colors shadow-md shadow-teal-900/10">
            عرض التفاصيل
          </button>
          <button className="bg-slate-50 text-gray-600 py-3 px-4 rounded-xl font-bold text-sm hover:bg-slate-100 transition-colors">
            <Navigation2 className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function NearbyProvidersSection({ locale }: NearbyProvidersSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredProviders =
    selectedCategory === 'all'
      ? providers
      : providers.filter((p) => p.category === selectedCategory);

  return (
    <section id="nearby-providers" className="py-16 md:py-20 bg-gradient-to-b from-slate-50/30 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-3">
            مقدمي خدمات بالقرب منك
          </h2>
          <p className="text-gray-600 text-lg font-medium max-w-2xl mx-auto">
            اكتشف أفضل الخدمات الطبية والصحية والتجميلية القريبة من موقعك
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-black text-sm transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-[#4d8080] text-white shadow-lg shadow-teal-900/20'
                    : 'bg-white text-gray-600 hover:bg-slate-50 border border-slate-100'
                }`}
              >
                <Icon className="w-4 h-4" aria-hidden="true" />
                {category.label}
              </button>
            );
          })}
        </div>

        {/* Results Count */}
        <div className="text-center mb-6">
          <p className="text-gray-500 text-sm font-medium">
            تم العثور على <span className="font-black text-[#4d8080]">{filteredProviders.length}</span> مقدم خدمة
          </p>
        </div>

        {/* Providers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto">
          {filteredProviders.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>

        {/* Empty State */}
        {filteredProviders.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg font-medium">
              لا توجد نتائج في هذه الفئة
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
