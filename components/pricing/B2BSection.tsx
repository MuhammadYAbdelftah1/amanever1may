'use client';

import { Building2, Users, BarChart3, FileText, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export function B2BSection() {
  return (
    <div id="b2b" className="bg-gradient-to-br from-[#1A2B2C] to-[#2D4242] rounded-2xl p-8 md:p-12 text-white shadow-2xl">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Left Column - Content */}
        <div>
          <div className="inline-flex items-center gap-2 bg-[#4A8B8E] px-4 py-2 rounded-full mb-6">
            <Building2 className="w-5 h-5" />
            <span className="font-bold">للشركات والمؤسسات</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            لشركتك أو فريقك؟
          </h2>
          
          <p className="text-lg text-white/90 mb-6 leading-relaxed">
            خطط جماعية مخصصة لـ 10+ موظف بأسعار تنافسية وميزات إضافية
          </p>

          {/* Features */}
          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3">
              <div className="bg-[#4A8B8E] rounded-full p-2">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold mb-1">وفّر حتى 40% على المقاييس الفردية</div>
                <div className="text-sm text-white/80">خصومات جماعية تزيد مع عدد الموظفين</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-[#4A8B8E] rounded-full p-2">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold mb-1">Dashboard إداري لمتابعة الاستخدام</div>
                <div className="text-sm text-white/80">تقارير تفصيلية وإحصائيات شاملة</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-[#4A8B8E] rounded-full p-2">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold mb-1">سعودة الباقات حسب الحاجة</div>
                <div className="text-sm text-white/80">فواتير متوافقة مع ZATCA</div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <Link
            href="/ar/for-business"
            className="inline-flex items-center gap-2 bg-[#4A8B8E] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#356B6E] transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <span>احصل على عرض سعر مخصص</span>
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>

        {/* Right Column - Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
            <div className="text-4xl font-bold text-[#4A8B8E] mb-2">500+</div>
            <div className="text-sm text-white/80">شركة تثق بنا</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
            <div className="text-4xl font-bold text-[#4A8B8E] mb-2">15K+</div>
            <div className="text-sm text-white/80">موظف مشترك</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
            <div className="text-4xl font-bold text-[#4A8B8E] mb-2">40%</div>
            <div className="text-sm text-white/80">متوسط التوفير</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
            <div className="text-4xl font-bold text-[#4A8B8E] mb-2">4.9/5</div>
            <div className="text-sm text-white/80">تقييم الشركات</div>
          </div>
        </div>
      </div>
    </div>
  );
}
