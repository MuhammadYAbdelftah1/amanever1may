/**
 * Exclusive Discounts Section (أقوى الخصومات الحصرية)
 * Displays exclusive offers for Aman Ever subscribers
 */

'use client';

import { Tag, Clock, Percent } from 'lucide-react';

interface ExclusiveDiscountsSectionProps {
  locale: string;
}

type Discount = {
  id: number;
  provider: string;
  category: string;
  discount: string;
  description: string;
  validUntil: string;
  color: string;
};

const discounts: Discount[] = [
  {
    id: 1,
    provider: 'صيدليات النهدي',
    category: 'صيدليات',
    discount: '25%',
    description: 'خصم على جميع المنتجات الصحية والتجميلية',
    validUntil: 'ديسمبر 2026',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    id: 2,
    provider: 'مستشفى د. سليمان الحبيب',
    category: 'مستشفيات',
    discount: '30%',
    description: 'خصم على الكشف والفحوصات الطبية',
    validUntil: 'ديسمبر 2026',
    color: 'from-blue-500 to-cyan-600',
  },
  {
    id: 3,
    provider: 'مجمع المغربي للعيون',
    category: 'مراكز تخصصية',
    discount: '20%',
    description: 'خصم على فحص النظر والنظارات الطبية',
    validUntil: 'ديسمبر 2026',
    color: 'from-violet-500 to-purple-600',
  },
  {
    id: 4,
    provider: 'Fitness Time',
    category: 'رياضة وصحة',
    discount: '40%',
    description: 'خصم على الاشتراكات السنوية',
    validUntil: 'ديسمبر 2026',
    color: 'from-orange-500 to-red-600',
  },
  {
    id: 5,
    provider: 'صيدليات الدواء',
    category: 'صيدليات',
    discount: '15%',
    description: 'خصم على الأدوية والمكملات الغذائية',
    validUntil: 'ديسمبر 2026',
    color: 'from-pink-500 to-rose-600',
  },
  {
    id: 6,
    provider: 'مستشفى الموسى التخصصي',
    category: 'مستشفيات',
    discount: '35%',
    description: 'خصم على العمليات الجراحية والتحاليل',
    validUntil: 'ديسمبر 2026',
    color: 'from-indigo-500 to-blue-600',
  },
];

function DiscountCard({ discount }: { discount: Discount }) {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col">
      {/* Image - Tall like mobile mockup */}
      <div className="h-64 md:h-72 rounded-t-3xl overflow-hidden relative">
        <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
          <div className="text-center p-6">
            <div className="text-[#4d8080] font-black text-sm mb-2">إشعار للمصممة 🎨</div>
            <div className="text-gray-600 font-bold text-xs mb-3">المقاس: 350×288 بكسل</div>
            <div className="text-gray-700 font-semibold text-xs leading-relaxed">
              ⚠️ يُرجى وضع شعارات الشركاء (النهدي، فتنس تايم، سليمان الحبيب) 
              <br />
              داخل المساحة البيضاء فوق النص مباشرة أو كعلامة مائية خفيفة
              <br />
              داخل المربع الملون لإضافة الفخامة والموثوقية
            </div>
          </div>
        </div>

        {/* Gradient Overlay with Discount Badge */}
        <div className={`absolute inset-0 bg-gradient-to-t ${discount.color} opacity-90 flex items-center justify-center`}>
          <div className="text-center z-10">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Percent className="w-6 h-6 text-white/90" aria-hidden="true" />
              <span className="text-white/90 text-xs font-bold bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                {discount.category}
              </span>
            </div>
            <div className="text-white">
              <div className="text-6xl md:text-7xl font-black mb-2 drop-shadow-lg">{discount.discount}</div>
              <div className="text-white/95 text-base font-bold drop-shadow">خصم حصري</div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-black text-gray-900 mb-2 group-hover:text-[#4d8080] transition-colors leading-tight">
          {discount.provider}
        </h3>
        <p className="text-gray-600 text-sm font-medium mb-4 leading-relaxed flex-grow">
          {discount.description}
        </p>

        {/* Footer - Push to bottom */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
          <div className="flex items-center gap-2 text-gray-700 text-xs font-bold">
            <Clock className="w-3.5 h-3.5" aria-hidden="true" />
            <span>ساري حتى {discount.validUntil}</span>
          </div>
          <button className="text-[#4d8080] font-black text-sm hover:text-[#3d6666] transition-colors">
            استفد الآن ←
          </button>
        </div>
      </div>
    </div>
  );
}

export function ExclusiveDiscountsSection({ locale }: ExclusiveDiscountsSectionProps) {
  return (
    <section id="exclusive-discounts" className="py-16 md:py-20 bg-gradient-to-b from-white to-slate-50/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#4d8080]/10 text-[#4d8080] px-4 py-2 rounded-full mb-4">
            <Tag className="w-4 h-4" aria-hidden="true" />
            <span className="text-sm font-black">عالمٌ من التوفير</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-3">
            استثمر عضويتك.. وضاعف توفيرك
          </h2>
          <p className="text-gray-600 text-lg font-medium max-w-2xl mx-auto">
            لأنك من عائلة أمان إيفر، فتحنا لك أبواب التوفير مع كبرى العلامات الطبية والصحية.. عروض حصرية صُممت خصيصاً لتلبي احتياجاتك.
          </p>
        </div>

        {/* Discounts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {discounts.map((discount) => (
            <DiscountCard key={discount.id} discount={discount} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button className="bg-[#4d8080] text-white px-8 py-4 rounded-2xl font-black text-base hover:bg-[#3d6666] transition-all duration-300 shadow-lg shadow-teal-900/20 hover:shadow-xl hover:shadow-teal-900/30 hover:-translate-y-0.5">
            احصل على بطاقتك الآن.. وابدأ التوفير
          </button>
        </div>
      </div>
    </section>
  );
}
