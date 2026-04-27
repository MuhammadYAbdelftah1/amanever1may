'use client';

import { Download, Phone, CreditCard, Shield } from 'lucide-react';
import Link from 'next/link';

export function FinalCTA() {
  return (
    <div className="text-center text-white">
      <h2 className="text-4xl md:text-5xl font-bold mb-4">
        جرّب أمان إيفر 14 يوم — بدون مخاطرة
      </h2>
      
      <div className="w-24 h-1 bg-white/30 mx-auto mb-6"></div>
      
      <p className="text-xl mb-4 text-white/90 max-w-3xl mx-auto leading-relaxed">
        ما تحتاج تقرر الحين. اشترك، استخدم البطاقة، وشوف التوفير بنفسك.
      </p>
      
      <p className="text-lg mb-8 text-white/80 max-w-2xl mx-auto">
        لو ما عجبتك خلال 14 يوم، نرجع لك فلوسك كاملة — بدون أسئلة، بدون تعقيدات.
      </p>

      {/* Trust Stats */}
      <div className="flex flex-wrap items-center justify-center gap-6 mb-8 text-white/90">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          <span className="text-sm">50,000+ عائلة سعودية</span>
        </div>
        <span className="text-white/50">·</span>
        <div className="flex items-center gap-2">
          <span className="text-sm">تقييم 4.8/5</span>
        </div>
        <span className="text-white/50">·</span>
        <div className="flex items-center gap-2">
          <span className="text-sm">500+ منشأة طبية</span>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
        <Link
          href="/ar/register"
          className="inline-flex items-center gap-2 bg-white text-[#4A8B8E] px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#E8F1F1] transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto"
        >
          <Download className="w-5 h-5" />
          <span>ابدأ مجاناً — أول استشارة هدية</span>
        </Link>
        
        <a
          href="tel:+966920000000"
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white border-2 border-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-300 w-full sm:w-auto"
        >
          <Phone className="w-5 h-5" />
          <span>تحدث مع مستشار</span>
        </a>
      </div>

      {/* Microcopy */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-white/80 mb-8">
        <span>✓ بدون التزام</span>
        <span>·</span>
        <span>✓ إلغاء فوري</span>
        <span>·</span>
        <span>✓ استرداد خلال 14 يوم</span>
      </div>

      {/* Payment Methods */}
      <div className="border-t border-white/20 pt-6">
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
    </div>
  );
}
