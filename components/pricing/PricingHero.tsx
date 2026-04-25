'use client';

import { Star, Building2, Shield } from 'lucide-react';

export function PricingHero() {
  return (
    <div className="bg-gradient-to-b from-[#E8F1F1] to-white py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A2B2C] mb-6 leading-tight">
            اختر بطاقتك. ابدأ بخصومات تصل 80% من اليوم الأول.
          </h1>
          
          {/* Subheading */}
          <p className="text-xl md:text-2xl text-[#5A6B6C] mb-8 leading-relaxed max-w-4xl mx-auto">
            بطاقة عضوية واحدة تفتح لك شبكة من 500+ مستشفى ومركز وصيدلية. 
            <span className="font-bold text-[#4A8B8E]"> بدون تأمين، بدون موافقات مسبقة.</span>
          </p>

          {/* Trust Bar */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 mb-8">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-[#FFB800] fill-[#FFB800]" />
              <span className="text-sm md:text-base font-bold text-[#1A2B2C]">4.8/5</span>
              <span className="text-sm text-[#5A6B6C]">(1,250+ تقييم)</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#4A8B8E]" />
              <span className="text-sm md:text-base text-[#5A6B6C]">
                شراكة مع المواساة، سليمان الحبيب، دله
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#4A8B8E]" />
              <span className="text-sm md:text-base text-[#5A6B6C]">
                🇸🇦 معتمد من PDPL/SDAIA
              </span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#plans"
              className="bg-[#4A8B8E] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#356B6E] transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto"
            >
              اختر باقتك الآن
            </a>
            <a
              href="#calculator"
              className="bg-white text-[#4A8B8E] border-2 border-[#4A8B8E] px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#E8F1F1] transition-all duration-300 w-full sm:w-auto"
            >
              احسب توفيرك
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
