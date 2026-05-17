/**
 * Personalized Results Section (نتائج مقترحة لك)
 * AI-powered location-based recommendations for nearby services and discounts
 */

'use client';

import { useState } from 'react';
import { MapPin, Navigation, Star, Clock, TrendingUp, Sparkles } from 'lucide-react';

interface PersonalizedResultsSectionProps {
  locale: string;
}

type Result = {
  id: number;
  name: string;
  type: string;
  category: string;
  distance: string;
  rating: number;
  reviews: number;
  discount: string;
  address: string;
  openNow: boolean;
  trending: boolean;
  image: string;
};

// Simulated location-based results (في 2026 هيكون من API حقيقي)
const resultsData: { [key: string]: Result[] } = {
  'الرياض': [
    {
      id: 1,
      name: 'مستشفى د. سليمان الحبيب - العليا',
      type: 'مستشفى',
      category: 'رعاية صحية',
      distance: '2.3 كم',
      rating: 4.8,
      reviews: 1250,
      discount: '30%',
      address: 'طريق العروبة، حي العليا',
      openNow: true,
      trending: true,
      image: '/images/hospital-placeholder.jpg',
    },
    {
      id: 2,
      name: 'صيدليات النهدي - النخيل',
      type: 'صيدلية',
      category: 'صيدليات',
      distance: '0.8 كم',
      rating: 4.6,
      reviews: 890,
      discount: '25%',
      address: 'شارع الأمير سلطان، حي النخيل',
      openNow: true,
      trending: false,
      image: '/images/pharmacy-placeholder.jpg',
    },
    {
      id: 3,
      name: 'Fitness Time - الملقا',
      type: 'نادي رياضي',
      category: 'رياضة وصحة',
      distance: '1.5 كم',
      rating: 4.7,
      reviews: 650,
      discount: '40%',
      address: 'طريق الملك فهد، حي الملقا',
      openNow: true,
      trending: true,
      image: '/images/gym-placeholder.jpg',
    },
  ],
  'جدة': [
    {
      id: 4,
      name: 'مستشفى الموسى التخصصي',
      type: 'مستشفى',
      category: 'رعاية صحية',
      distance: '3.1 كم',
      rating: 4.9,
      reviews: 1580,
      discount: '35%',
      address: 'شارع الأمير سلطان، الزهراء',
      openNow: true,
      trending: true,
      image: '/images/hospital-placeholder.jpg',
    },
    {
      id: 5,
      name: 'مجمع المغربي للعيون',
      type: 'مركز تخصصي',
      category: 'رعاية صحية',
      distance: '1.9 كم',
      rating: 4.8,
      reviews: 920,
      discount: '20%',
      address: 'طريق المدينة، حي الروضة',
      openNow: true,
      trending: false,
      image: '/images/clinic-placeholder.jpg',
    },
    {
      id: 6,
      name: 'صيدليات الدواء - الحمراء',
      type: 'صيدلية',
      category: 'صيدليات',
      distance: '0.5 كم',
      rating: 4.5,
      reviews: 740,
      discount: '15%',
      address: 'شارع فلسطين، حي الحمراء',
      openNow: true,
      trending: false,
      image: '/images/pharmacy-placeholder.jpg',
    },
  ],
  'الدمام': [
    {
      id: 7,
      name: 'مستشفى السعودي الألماني',
      type: 'مستشفى',
      category: 'رعاية صحية',
      distance: '2.7 كم',
      rating: 4.7,
      reviews: 1120,
      discount: '28%',
      address: 'طريق الملك فهد، الفيصلية',
      openNow: true,
      trending: true,
      image: '/images/hospital-placeholder.jpg',
    },
    {
      id: 8,
      name: 'عيادات النخبة الطبية',
      type: 'عيادة',
      category: 'رعاية صحية',
      distance: '1.2 كم',
      rating: 4.6,
      reviews: 580,
      discount: '22%',
      address: 'شارع الخليج، الشاطئ',
      openNow: true,
      trending: false,
      image: '/images/clinic-placeholder.jpg',
    },
  ],
};

function ResultCard({ result }: { result: Result }) {
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
        
        {/* Badges on Image */}
        <div className="absolute top-4 right-4 left-4 flex items-start justify-between z-10">
          {result.trending && (
            <span className="flex items-center gap-1 bg-orange-500 text-white text-[10px] font-black px-2.5 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
              <TrendingUp className="w-3 h-3" aria-hidden="true" />
              رائج
            </span>
          )}
          <div className="bg-gradient-to-br from-[#4d8080] to-[#3d6666] text-white px-3 py-1.5 rounded-xl font-black text-sm shadow-lg backdrop-blur-sm mr-auto">
            {result.discount}
          </div>
        </div>

        {/* Open Now Badge */}
        {result.openNow && (
          <div className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-green-500 text-white text-xs font-black px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            مفتوح الآن
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Header */}
        <div className="mb-3">
          <h3 className="text-lg font-black text-gray-900 group-hover:text-[#4d8080] transition-colors mb-1 leading-tight">
            {result.name}
          </h3>
          <p className="text-gray-500 text-xs font-medium">{result.type}</p>
        </div>

        {/* Rating & Distance */}
        <div className="flex items-center gap-3 mb-3 flex-wrap">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" aria-hidden="true" />
            <span className="text-sm font-black text-gray-900">{result.rating}</span>
            <span className="text-xs text-gray-400">({result.reviews})</span>
          </div>
          <div className="flex items-center gap-1 text-[#4d8080]">
            <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="text-xs font-bold">{result.distance}</span>
          </div>
        </div>

        {/* Address */}
        <p className="text-gray-500 text-xs mb-4 line-clamp-2 leading-relaxed">{result.address}</p>

        {/* Actions - Push to bottom */}
        <div className="flex gap-2 mt-auto">
          <button className="flex-1 bg-[#4d8080] text-white py-3 px-4 rounded-xl font-black text-sm hover:bg-[#3d6666] transition-colors shadow-md shadow-teal-900/10">
            احجز الآن
          </button>
          <button className="bg-slate-50 text-gray-600 py-3 px-4 rounded-xl font-bold text-sm hover:bg-slate-100 transition-colors">
            <Navigation className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function PersonalizedResultsSection({ locale }: PersonalizedResultsSectionProps) {
  const [selectedCity, setSelectedCity] = useState<string>('الرياض');
  const cities = ['الرياض', 'جدة', 'الدمام'];
  
  const results = resultsData[selectedCity] || [];

  return (
    <section id="personalized-results" className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4d8080]/10 to-[#6BA5A8]/10 text-[#4d8080] px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4" aria-hidden="true" />
            <span className="text-sm font-black">مخصص لك بذكاء اصطناعي</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-3">
            نتائج مقترحة لك
          </h2>
          <p className="text-gray-600 text-lg font-medium max-w-2xl mx-auto">
            اكتشف أفضل العروض والخدمات القريبة منك
          </p>
        </div>

        {/* City Selector - Hidden */}
        {/* <div className="flex items-center justify-center gap-3 mb-10">
          <MapPin className="w-5 h-5 text-[#4d8080]" aria-hidden="true" />
          <div className="flex gap-2">
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-6 py-2.5 rounded-xl font-black text-sm transition-all duration-300 ${
                  selectedCity === city
                    ? 'bg-[#4d8080] text-white shadow-lg shadow-teal-900/20'
                    : 'bg-slate-50 text-gray-600 hover:bg-slate-100'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div> */}

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto mb-8">
          {results.map((result) => (
            <ResultCard key={result.id} result={result} />
          ))}
        </div>

        {/* Info Note */}
        <div className="text-center">
          <p className="text-gray-400 text-sm font-medium">
            💡 النتائج مبنية على موقعك الحالي وتفضيلاتك السابقة
          </p>
        </div>
      </div>
    </section>
  );
}
