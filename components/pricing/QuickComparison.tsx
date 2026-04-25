'use client';

import { Check, X, Lightbulb } from 'lucide-react';

export function QuickComparison() {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-[#4A8B8E]/20">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-[#1A2B2C] mb-3">
          أمان إيفر مش تأمين. أمان إيفر بطاقة عضوية.
        </h2>
        <p className="text-[#5A6B6C]">
          فهم الفرق يساعدك تختار الأنسب لاحتياجاتك
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Traditional Insurance */}
        <div className="bg-[#F8FAFB] rounded-xl p-6">
          <h3 className="text-xl font-bold text-[#1A2B2C] mb-4 text-center">
            تأمين تقليدي
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#4A8B8E] flex-shrink-0 mt-0.5" />
              <span className="text-sm text-[#1A2B2C]">يغطي حالات الطوارئ</span>
            </div>
            <div className="flex items-start gap-3">
              <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-[#1A2B2C]">موافقات مسبقة مطلوبة</span>
            </div>
            <div className="flex items-start gap-3">
              <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-[#1A2B2C]">شبكة محدودة</span>
            </div>
            <div className="flex items-start gap-3">
              <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-[#1A2B2C]">يستثني التجميل والأسنان</span>
            </div>
          </div>
        </div>

        {/* Aman Ever */}
        <div className="bg-gradient-to-br from-[#E8F1F1] to-white rounded-xl p-6 border-2 border-[#4A8B8E]">
          <h3 className="text-xl font-bold text-[#4A8B8E] mb-4 text-center">
            أمان إيفر
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#4A8B8E] flex-shrink-0 mt-0.5" />
              <span className="text-sm text-[#1A2B2C] font-bold">خصومات فورية على كل خدمة</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#4A8B8E] flex-shrink-0 mt-0.5" />
              <span className="text-sm text-[#1A2B2C] font-bold">بدون موافقات</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#4A8B8E] flex-shrink-0 mt-0.5" />
              <span className="text-sm text-[#1A2B2C] font-bold">500+ منشأة</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#4A8B8E] flex-shrink-0 mt-0.5" />
              <span className="text-sm text-[#1A2B2C] font-bold">يشمل كل الخدمات</span>
            </div>
          </div>
        </div>
      </div>

      {/* Best Solution */}
      <div className="bg-gradient-to-r from-[#4A8B8E]/10 to-[#E8F1F1] rounded-xl p-6 border-r-4 border-[#4A8B8E]">
        <div className="flex items-start gap-4">
          <Lightbulb className="w-6 h-6 text-[#4A8B8E] flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-bold text-[#1A2B2C] mb-2">💡 الأفضل:</h4>
            <p className="text-[#5A6B6C] leading-relaxed">
              استخدم أمان إيفر <span className="font-bold text-[#4A8B8E]">بجانب تأمينك</span> = توفير مضاعف. 
              استخدم التأمين للطوارئ الكبيرة، واستخدم أمان إيفر للخدمات اليومية والمستثناة من التأمين.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
