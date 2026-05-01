/**
 * Top Providers Section (أفضل مقدمي الخدمات)
 * Displays healthcare providers with search and filter functionality
 */

'use client';

import { useState } from 'react';
import { Search, MapPin, Star, ArrowLeft, Building2, Stethoscope, Heart } from 'lucide-react';
import Image from 'next/image';

interface TopProvidersSectionProps {
  locale: string;
}

type Provider = {
  id: number;
  name: string;
  nameEn: string;
  type: 'hospital' | 'clinic' | 'center';
  specialty: string;
  city: string;
  rating: number;
  reviews: number;
  image: string;
  discount: string;
};

const providers: Provider[] = [
  {
    id: 1,
    name: 'مستشفى د. سليمان الحبيب',
    nameEn: 'Dr. Sulaiman Al Habib Hospital',
    type: 'hospital',
    specialty: 'متعدد التخصصات',
    city: 'الرياض',
    rating: 4.8,
    reviews: 2500,
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600',
    discount: 'خصم 70%',
  },
  {
    id: 2,
    name: 'مستشفى الموسى التخصصي',
    nameEn: 'Al Moosa Specialist Hospital',
    type: 'hospital',
    specialty: 'متعدد التخصصات',
    city: 'الأحساء',
    rating: 4.7,
    reviews: 1800,
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=600',
    discount: 'خصم 65%',
  },
  {
    id: 3,
    name: 'مستشفيات مغربي',
    nameEn: 'Magrabi Hospitals',
    type: 'hospital',
    specialty: 'العيون والليزر',
    city: 'جدة',
    rating: 4.9,
    reviews: 3200,
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=600',
    discount: 'خصم 80%',
  },
  {
    id: 4,
    name: 'السعودي الألماني الصحية',
    nameEn: 'Saudi German Health',
    type: 'hospital',
    specialty: 'متعدد التخصصات',
    city: 'الرياض',
    rating: 4.6,
    reviews: 2100,
    image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80&w=600',
    discount: 'خصم 60%',
  },
  {
    id: 5,
    name: 'مجمع عيادات النخبة',
    nameEn: 'Elite Medical Complex',
    type: 'clinic',
    specialty: 'الأسنان والتجميل',
    city: 'الدمام',
    rating: 4.5,
    reviews: 950,
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=600',
    discount: 'خصم 75%',
  },
  {
    id: 6,
    name: 'مركز آي سي للعيون',
    nameEn: 'Eye See Center',
    type: 'center',
    specialty: 'العيون والليزر',
    city: 'الرياض',
    rating: 4.8,
    reviews: 1500,
    image: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&q=80&w=600',
    discount: 'خصم 70%',
  },
];

const cities = ['الكل', 'الرياض', 'جدة', 'الدمام', 'الأحساء'];
const types = [
  { value: 'all', label: 'الكل', icon: Building2 },
  { value: 'hospital', label: 'مستشفيات', icon: Building2 },
  { value: 'clinic', label: 'عيادات', icon: Stethoscope },
  { value: 'center', label: 'مراكز', icon: Heart },
];

function ProviderCard({ provider }: { provider: Provider }) {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-slate-100 hover:border-[#4d8080] hover:shadow-2xl transition-all duration-500 flex flex-col">
      {/* Image Placeholder with Designer Notice - Taller */}
      <div className="relative h-72 md:h-80 overflow-hidden bg-gradient-to-br from-[#4d8080]/10 via-slate-50 to-[#4d8080]/10">
        {/* Designer Notice */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-6">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border-2 border-dashed border-[#4d8080]/30 shadow-xl">
              <p className="text-lg font-bold text-gray-800 mb-3">إشعار للمصممة 🎨</p>
              <p className="text-sm font-black text-[#4d8080]">
                المقاس: 350×320 بكسل
              </p>
            </div>
          </div>
        </div>

        {/* Discount Badge */}
        <div className="absolute top-4 right-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-black px-4 py-2 rounded-full shadow-lg z-10">
          {provider.discount}
        </div>
        {/* Type Badge */}
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm text-[#4d8080] text-xs font-bold px-3 py-1.5 rounded-full z-10">
          {types.find(t => t.value === provider.type)?.label}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Name */}
        <h3 className="text-xl font-black text-gray-900 mb-2 group-hover:text-[#4d8080] transition-colors">
          {provider.name}
        </h3>

        {/* Specialty */}
        <p className="text-sm text-gray-600 font-semibold mb-4">
          {provider.specialty}
        </p>

        {/* Location & Rating */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-1.5 text-gray-500 text-sm">
            <MapPin className="w-4 h-4" />
            <span>{provider.city}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-bold text-gray-900">{provider.rating}</span>
            <span className="text-xs text-gray-500">({provider.reviews})</span>
          </div>
        </div>

        {/* CTA Button - Push to bottom */}
        <button className="w-full py-3 px-4 bg-gradient-to-r from-[#4d8080] to-[#3d6666] text-white rounded-2xl font-black text-sm hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 mt-auto">
          احجز الآن
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export function TopProvidersSection({ locale }: TopProvidersSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('الكل');
  const [selectedType, setSelectedType] = useState('all');

  // Filter providers
  const filteredProviders = providers.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         provider.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = selectedCity === 'الكل' || provider.city === selectedCity;
    const matchesType = selectedType === 'all' || provider.type === selectedType;
    
    return matchesSearch && matchesCity && matchesType;
  });

  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black text-[#003d3d] mb-4">
            أفضل مقدمي الخدمات
          </h2>
          <div className="h-1.5 w-24 bg-[#4d8080] mx-auto rounded-full mb-6" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            اكتشف أفضل المستشفيات والمراكز الطبية المعتمدة في شبكتنا
          </p>
        </div>

        {/* Search & Filters */}
        <div className="mb-12">
          {/* Search Bar - Full Width */}
          <div className="relative mb-8 max-w-4xl mx-auto">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="ابحث عن مستشفى، عيادة، أو تخصص..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-12 pl-6 py-4 rounded-2xl border-2 border-slate-200 focus:border-[#4d8080] focus:outline-none text-lg transition-colors"
            />
          </div>

          {/* Filters Row - Distributed */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-7xl mx-auto">
            {/* Type Filter - Left Side */}
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              {types.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.value}
                    onClick={() => setSelectedType(type.value)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                      selectedType === type.value
                        ? 'bg-[#4d8080] text-white shadow-lg scale-105'
                        : 'bg-white text-gray-700 border-2 border-slate-200 hover:border-[#4d8080]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {type.label}
                  </button>
                );
              })}
            </div>

            {/* City Filter - Right Side */}
            <div className="flex flex-wrap gap-3 justify-center md:justify-end">
              {cities.map((city) => (
                <button
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${
                    selectedCity === city
                      ? 'bg-gradient-to-r from-[#4d8080] to-[#3d6666] text-white shadow-md'
                      : 'bg-slate-100 text-gray-700 hover:bg-slate-200'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-center mb-8">
          <p className="text-gray-600 font-semibold">
            عرض <span className="text-[#4d8080] font-black">{filteredProviders.length}</span> من مقدمي الخدمات
          </p>
        </div>

        {/* Providers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredProviders.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>

        {/* No Results */}
        {filteredProviders.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">لا توجد نتائج</h3>
            <p className="text-gray-600">جرب تغيير معايير البحث أو الفلتر</p>
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-[#4d8080] text-[#4d8080] rounded-2xl font-black text-lg hover:bg-[#4d8080] hover:text-white transition-all duration-300 shadow-md hover:shadow-xl">
            عرض كل مقدمي الخدمات
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
