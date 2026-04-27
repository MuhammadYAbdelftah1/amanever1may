'use client';

import { COMPARISON_FEATURES } from '@/data/pricing-data';
import { Check, X, TrendingDown } from 'lucide-react';

export function ComparisonTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[#4A8B8E] text-white">
            <th className="p-4 text-right font-bold rounded-tr-xl">الميزة</th>
            <th className="p-4 text-center font-bold bg-[#FF6B6B]/90">
              <div className="flex flex-col items-center gap-1">
                <TrendingDown className="w-5 h-5" />
                <span>بدون أمان إيفر</span>
              </div>
            </th>
            <th className="p-4 text-center font-bold">أمان</th>
            <th className="p-4 text-center font-bold bg-[#356B6E]">أمان بلس</th>
            <th className="p-4 text-center font-bold rounded-tl-xl">أمان VIP</th>
          </tr>
        </thead>
        <tbody>
          {/* Price Row */}
          <tr className="border-b border-[#E5EAEB] bg-white">
            <td className="p-4 font-bold text-[#1A2B2C]">السعر السنوي</td>
            <td className="p-4 text-center bg-[#FFF5F5]">
              <span className="text-[#FF6B6B] font-bold">0 ر.س</span>
            </td>
            <td className="p-4 text-center">
              <span className="text-[#4A8B8E] font-bold">199 ر.س</span>
            </td>
            <td className="p-4 text-center bg-[#E8F1F1]/30">
              <span className="text-[#4A8B8E] font-bold">349 ر.س</span>
            </td>
            <td className="p-4 text-center">
              <span className="text-[#4A8B8E] font-bold">699 ر.س</span>
            </td>
          </tr>

          {/* Discount Row */}
          <tr className="border-b border-[#E5EAEB] bg-[#F8FAFB]">
            <td className="p-4 font-bold text-[#1A2B2C]">الخصم على الخدمات</td>
            <td className="p-4 text-center bg-[#FFF5F5]">
              <span className="text-[#FF6B6B] font-bold">0%</span>
            </td>
            <td className="p-4 text-center">
              <span className="text-[#4A8B8E] font-bold">حتى 60%</span>
            </td>
            <td className="p-4 text-center bg-[#E8F1F1]/30">
              <span className="text-[#4A8B8E] font-bold">حتى 70%</span>
            </td>
            <td className="p-4 text-center">
              <span className="text-[#4A8B8E] font-bold">حتى 80%</span>
            </td>
          </tr>

          {/* Cashback Row */}
          <tr className="border-b border-[#E5EAEB] bg-white">
            <td className="p-4 font-bold text-[#1A2B2C]">كاش باك</td>
            <td className="p-4 text-center bg-[#FFF5F5]">
              <span className="text-[#FF6B6B] font-bold">0%</span>
            </td>
            <td className="p-4 text-center">
              <span className="text-[#4A8B8E] font-bold">5%</span>
            </td>
            <td className="p-4 text-center bg-[#E8F1F1]/30">
              <span className="text-[#4A8B8E] font-bold">7%</span>
            </td>
            <td className="p-4 text-center">
              <span className="text-[#4A8B8E] font-bold">10%</span>
            </td>
          </tr>

          {/* Family Coverage */}
          <tr className="border-b border-[#E5EAEB] bg-[#F8FAFB]">
            <td className="p-4 font-bold text-[#1A2B2C]">عدد أفراد العائلة</td>
            <td className="p-4 text-center bg-[#FFF5F5]">
              <X className="w-6 h-6 text-[#FF6B6B] mx-auto" />
            </td>
            <td className="p-4 text-center">
              <span className="text-[#1A2B2C] font-medium">1</span>
            </td>
            <td className="p-4 text-center bg-[#E8F1F1]/30">
              <span className="text-[#1A2B2C] font-medium">حتى 2</span>
            </td>
            <td className="p-4 text-center">
              <span className="text-[#1A2B2C] font-medium">حتى 4</span>
            </td>
          </tr>

          {/* Teleconsultation */}
          <tr className="border-b border-[#E5EAEB] bg-white">
            <td className="p-4 font-bold text-[#1A2B2C]">استشارات طبية عن بُعد</td>
            <td className="p-4 text-center bg-[#FFF5F5]">
              <span className="text-[#FF6B6B] text-sm">150 ر.س/استشارة</span>
            </td>
            <td className="p-4 text-center">
              <span className="text-[#1A2B2C] font-medium">5/شهر</span>
            </td>
            <td className="p-4 text-center bg-[#E8F1F1]/30">
              <span className="text-[#4A8B8E] font-bold">غير محدود</span>
            </td>
            <td className="p-4 text-center">
              <span className="text-[#4A8B8E] font-bold">غير محدود</span>
            </td>
          </tr>

          {/* Home Care */}
          <tr className="border-b border-[#E5EAEB] bg-[#F8FAFB]">
            <td className="p-4 font-bold text-[#1A2B2C]">زيارة طبيب منزلية</td>
            <td className="p-4 text-center bg-[#FFF5F5]">
              <span className="text-[#FF6B6B] text-sm">600 ر.س/زيارة</span>
            </td>
            <td className="p-4 text-center">
              <span className="text-[#1A2B2C] font-medium">2/شهر</span>
            </td>
            <td className="p-4 text-center bg-[#E8F1F1]/30">
              <span className="text-[#1A2B2C] font-medium">5/شهر</span>
            </td>
            <td className="p-4 text-center">
              <span className="text-[#4A8B8E] font-bold">مجانية شهرياً</span>
            </td>
          </tr>

          {/* Annual Checkup */}
          <tr className="border-b border-[#E5EAEB] bg-white">
            <td className="p-4 font-bold text-[#1A2B2C]">فحص شامل سنوي</td>
            <td className="p-4 text-center bg-[#FFF5F5]">
              <span className="text-[#FF6B6B] text-sm">800-1,200 ر.س</span>
            </td>
            <td className="p-4 text-center">
              <X className="w-6 h-6 text-[#E5EAEB] mx-auto" />
            </td>
            <td className="p-4 text-center bg-[#E8F1F1]/30">
              <span className="text-[#1A2B2C] font-medium">فحص أساسي</span>
            </td>
            <td className="p-4 text-center">
              <span className="text-[#4A8B8E] font-bold">مجاني</span>
            </td>
          </tr>

          {/* Priority Booking */}
          <tr className="border-b border-[#E5EAEB] bg-[#F8FAFB]">
            <td className="p-4 font-bold text-[#1A2B2C]">أولوية في الحجوزات</td>
            <td className="p-4 text-center bg-[#FFF5F5]">
              <X className="w-6 h-6 text-[#FF6B6B] mx-auto" />
            </td>
            <td className="p-4 text-center">
              <X className="w-6 h-6 text-[#E5EAEB] mx-auto" />
            </td>
            <td className="p-4 text-center bg-[#E8F1F1]/30">
              <Check className="w-6 h-6 text-[#4A8B8E] mx-auto" />
            </td>
            <td className="p-4 text-center">
              <Check className="w-6 h-6 text-[#4A8B8E] mx-auto" />
            </td>
          </tr>

          {/* Response Time */}
          <tr className="border-b border-[#E5EAEB] bg-white">
            <td className="p-4 font-bold text-[#1A2B2C]">مدة استجابة الطبيب</td>
            <td className="p-4 text-center bg-[#FFF5F5]">
              <X className="w-6 h-6 text-[#FF6B6B] mx-auto" />
            </td>
            <td className="p-4 text-center">
              <span className="text-[#1A2B2C] font-medium">30 دقيقة</span>
            </td>
            <td className="p-4 text-center bg-[#E8F1F1]/30">
              <span className="text-[#1A2B2C] font-medium">15 دقيقة</span>
            </td>
            <td className="p-4 text-center">
              <span className="text-[#4A8B8E] font-bold">5 دقائق</span>
            </td>
          </tr>

          {/* Support */}
          <tr className="border-b border-[#E5EAEB] bg-[#F8FAFB]">
            <td className="p-4 font-bold text-[#1A2B2C]">دعم العملاء</td>
            <td className="p-4 text-center bg-[#FFF5F5]">
              <X className="w-6 h-6 text-[#FF6B6B] mx-auto" />
            </td>
            <td className="p-4 text-center">
              <span className="text-[#1A2B2C] font-medium text-sm">24/7</span>
            </td>
            <td className="p-4 text-center bg-[#E8F1F1]/30">
              <span className="text-[#1A2B2C] font-medium text-sm">24/7</span>
            </td>
            <td className="p-4 text-center">
              <span className="text-[#4A8B8E] font-bold text-sm">24/7 + مدير حساب</span>
            </td>
          </tr>

          {/* Dental & Beauty */}
          <tr className="border-b border-[#E5EAEB] bg-white">
            <td className="p-4 font-bold text-[#1A2B2C]">الأسنان والتجميل</td>
            <td className="p-4 text-center bg-[#FFF5F5]">
              <span className="text-[#FF6B6B] text-sm">السعر الكامل</span>
            </td>
            <td className="p-4 text-center">
              <span className="text-[#1A2B2C] font-medium">خصم 40%</span>
            </td>
            <td className="p-4 text-center bg-[#E8F1F1]/30">
              <span className="text-[#4A8B8E] font-bold">خصم 60%</span>
            </td>
            <td className="p-4 text-center">
              <span className="text-[#4A8B8E] font-bold">خصم 70%</span>
            </td>
          </tr>

          {/* Pre-approvals */}
          <tr className="border-b border-[#E5EAEB] bg-[#F8FAFB]">
            <td className="p-4 font-bold text-[#1A2B2C]">موافقات مسبقة</td>
            <td className="p-4 text-center bg-[#FFF5F5]">
              <X className="w-6 h-6 text-[#FF6B6B] mx-auto" />
            </td>
            <td className="p-4 text-center">
              <span className="text-[#4A8B8E] font-bold text-sm">✗ لا تحتاج</span>
            </td>
            <td className="p-4 text-center bg-[#E8F1F1]/30">
              <span className="text-[#4A8B8E] font-bold text-sm">✗ لا تحتاج</span>
            </td>
            <td className="p-4 text-center">
              <span className="text-[#4A8B8E] font-bold text-sm">✗ لا تحتاج</span>
            </td>
          </tr>

          {/* Waiting Period */}
          <tr className="border-b border-[#E5EAEB] bg-white">
            <td className="p-4 font-bold text-[#1A2B2C]">فترة انتظار</td>
            <td className="p-4 text-center bg-[#FFF5F5]">
              <X className="w-6 h-6 text-[#FF6B6B] mx-auto" />
            </td>
            <td className="p-4 text-center">
              <span className="text-[#4A8B8E] font-bold text-sm">✗ صفر</span>
            </td>
            <td className="p-4 text-center bg-[#E8F1F1]/30">
              <span className="text-[#4A8B8E] font-bold text-sm">✗ صفر</span>
            </td>
            <td className="p-4 text-center">
              <span className="text-[#4A8B8E] font-bold text-sm">✗ صفر</span>
            </td>
          </tr>

          {/* Total Savings - Highlighted Row */}
          <tr className="bg-gradient-to-r from-[#E8F1F1] to-[#F8FAFB] border-t-2 border-[#4A8B8E]">
            <td className="p-4 font-bold text-[#1A2B2C] text-lg">التوفير السنوي المتوقع</td>
            <td className="p-4 text-center bg-[#FFF5F5]">
              <span className="text-[#FF6B6B] font-bold text-xl">-4,800 ر.س</span>
            </td>
            <td className="p-4 text-center">
              <span className="text-[#4A8B8E] font-bold text-xl">+1,100 ر.س</span>
            </td>
            <td className="p-4 text-center bg-[#E8F1F1]/50">
              <span className="text-[#4A8B8E] font-bold text-xl">+3,500 ر.س</span>
            </td>
            <td className="p-4 text-center">
              <span className="text-[#4A8B8E] font-bold text-xl">+13,000 ر.س</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function renderFeatureValue(value: string | boolean) {
  if (typeof value === 'boolean') {
    return value ? (
      <Check className="w-6 h-6 text-[#4A8B8E] mx-auto" />
    ) : (
      <X className="w-6 h-6 text-[#E5EAEB] mx-auto" />
    );
  }
  return <span className="text-[#1A2B2C] font-medium">{value}</span>;
}
