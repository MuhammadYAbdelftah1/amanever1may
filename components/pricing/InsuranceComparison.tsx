'use client';

import { Check, X, TrendingDown } from 'lucide-react';

export function InsuranceComparison() {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-[#E5EAEB]">
      <h2 className="text-3xl font-bold text-[#1A2B2C] text-center mb-8">
        أمان VIP مقابل تأمين شامل
      </h2>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Aman VIP */}
        <div className="bg-gradient-to-br from-[#E8F1F1] to-white rounded-xl p-6 border-2 border-[#4A8B8E]">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-[#4A8B8E] mb-2">أمان VIP</h3>
            <div className="text-4xl font-bold text-[#4A8B8E]">
              6,990
              <span className="text-xl mr-2">ريال/سنة</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#4A8B8E] flex-shrink-0 mt-0.5" />
              <span className="text-sm text-[#1A2B2C]">بدون موافقات مسبقة</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#4A8B8E] flex-shrink-0 mt-0.5" />
              <span className="text-sm text-[#1A2B2C]">يشمل التجميل والأسنان</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#4A8B8E] flex-shrink-0 mt-0.5" />
              <span className="text-sm text-[#1A2B2C]">نسبة استرداد 100% للطوارئ</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#4A8B8E] flex-shrink-0 mt-0.5" />
              <span className="text-sm text-[#1A2B2C]">Cashback 10%</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#4A8B8E] flex-shrink-0 mt-0.5" />
              <span className="text-sm text-[#1A2B2C]">طبيب شخصي مخصص</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#4A8B8E] flex-shrink-0 mt-0.5" />
              <span className="text-sm text-[#1A2B2C]">تغطية حتى 4 أفراد</span>
            </div>
          </div>
        </div>

        {/* Traditional Insurance */}
        <div className="bg-[#F8FAFB] rounded-xl p-6 border border-[#E5EAEB]">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-[#5A6B6C] mb-2">تأمين شامل (Bupa Premium)</h3>
            <div className="text-4xl font-bold text-[#5A6B6C]">
              16,800
              <span className="text-xl mr-2">ريال/سنة</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-[#5A6B6C]">كل خدمة تحتاج موافقة</span>
            </div>
            <div className="flex items-start gap-3">
              <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-[#5A6B6C]">مستثناة عادة</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#4A8B8E] flex-shrink-0 mt-0.5" />
              <span className="text-sm text-[#5A6B6C]">تغطية مالية أعلى للطوارئ</span>
            </div>
            <div className="flex items-start gap-3">
              <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-[#5A6B6C]">لا يوجد</span>
            </div>
            <div className="flex items-start gap-3">
              <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-[#5A6B6C]">غير متوفر</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#4A8B8E] flex-shrink-0 mt-0.5" />
              <span className="text-sm text-[#5A6B6C]">فرد واحد فقط</span>
            </div>
          </div>
        </div>
      </div>

      {/* Best Solution */}
      <div className="bg-gradient-to-r from-[#4A8B8E] to-[#356B6E] rounded-xl p-8 text-white text-center">
        <TrendingDown className="w-12 h-12 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-4">💡 الحل الأمثل</h3>
        <p className="text-lg mb-6 leading-relaxed">
          احصل على <span className="font-bold">تأمين أساسي</span> (للطوارئ الكبيرة) + 
          <span className="font-bold"> أمان بلس</span> (للخدمات اليومية)
        </p>
        <div className="bg-white/20 rounded-xl p-6 backdrop-blur-sm">
          <div className="text-3xl font-bold mb-2">
            = توفير سنوي يتجاوز 8,000 ريال
          </div>
          <p className="text-sm opacity-90">
            مع تغطية أشمل وخدمات أفضل
          </p>
        </div>
      </div>
    </div>
  );
}
