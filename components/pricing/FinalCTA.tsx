'use client';

import { Download, Phone, CreditCard } from 'lucide-react';

export function FinalCTA() {
  return (
    <div className="text-center text-white">
      <h2 className="text-4xl md:text-5xl font-bold mb-4">
        ابدأ توفيرك الصحي اليوم
      </h2>
      
      <div className="w-24 h-1 bg-white/30 mx-auto mb-6"></div>
      
      <p className="text-xl mb-8 text-white/90">
        جرّب أمان إيفر 14 يوم — بضمان استرداد كامل
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
        <a
          href="#download"
          className="inline-flex items-center gap-2 bg-white text-[#4A8B8E] px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#E8F1F1] transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto"
        >
          <Download className="w-5 h-5" />
          <span>حمّل التطبيق واشترك</span>
        </a>
        
        <a
          href="tel:+966920000000"
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white border-2 border-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-300 w-full sm:w-auto"
        >
          <Phone className="w-5 h-5" />
          <span>تحدث مع مستشار</span>
        </a>
      </div>

      {/* Payment Methods */}
      <div className="flex flex-wrap items-center justify-center gap-6 text-white/80">
        <div className="flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          <span className="text-sm">طرق الدفع:</span>
        </div>
        <span className="text-sm">مدى</span>
        <span className="text-sm">·</span>
        <span className="text-sm">فيزا</span>
        <span className="text-sm">·</span>
        <span className="text-sm">Apple Pay</span>
        <span className="text-sm">·</span>
        <span className="text-sm">تابي</span>
        <span className="text-sm">·</span>
        <span className="text-sm">تمارا</span>
      </div>
    </div>
  );
}
