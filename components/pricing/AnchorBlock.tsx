'use client';

import { TrendingDown, AlertCircle, ArrowRight } from 'lucide-react';

export function AnchorBlock() {
  return (
    <div className="bg-gradient-to-br from-[#FFF5F5] to-[#FFE8E8] border-2 border-[#FF6B6B]/20 rounded-2xl p-8 md:p-12 shadow-lg">
      <div className="flex items-start gap-4 mb-6">
        <div className="bg-[#FF6B6B] rounded-full p-3 flex-shrink-0">
          <AlertCircle className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-[#1A2B2C] mb-4">
            كم تخسر كل سنة بدون بطاقة أمان إيفر؟
          </h3>
          <div className="space-y-4 text-lg text-[#5A6B6C]">
            <p>
              العائلة السعودية تصرف في المتوسط{' '}
              <span className="font-bold text-[#FF6B6B] text-2xl">4,800 ريال سنوياً</span>{' '}
              على الخدمات الطبية والتجميلية.
            </p>
            <div className="bg-white/80 rounded-xl p-6 border-r-4 border-[#FF6B6B]">
              <p className="font-bold text-[#1A2B2C] mb-2 flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-[#FF6B6B]" />
                بدون بطاقة أمان إيفر:
              </p>
              <p className="text-[#5A6B6C]">
                أنت تخسر{' '}
                <span className="font-bold text-[#FF6B6B] text-xl">2,400-3,200 ريال</span>{' '}
                كل سنة — فلوس كان ممكن ترجع جيبك.
              </p>
            </div>
            <div className="bg-[#E8F1F1] rounded-xl p-6 border-r-4 border-[#4A8B8E]">
              <p className="font-bold text-[#1A2B2C] mb-2">
                💰 مع أمان إيفر:
              </p>
              <p className="text-[#5A6B6C]">
                كل 1,000 ريال تصرفها على الطب ={' '}
                <span className="font-bold text-[#4A8B8E] text-xl">50-100 ريال كاش باك</span>{' '}
                ترجع لك مباشرة.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center mt-8">
        <a
          href="#calculator"
          className="inline-flex items-center gap-2 bg-[#4A8B8E] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#356B6E] transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <span>احسب كم تخسر بدون البطاقة</span>
          <ArrowRight className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
}
