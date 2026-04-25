'use client';

import { Star, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  plan: string;
  savings: string;
  rating: number;
  comment: string;
  avatar: string;
}

// TODO: Replace with real testimonials from PLACEHOLDER_DPO_EMAIL
const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'أحمد المالكي',
    location: 'الرياض',
    plan: 'أمان VIP',
    savings: '12,000 ريال',
    rating: 5,
    comment: 'وفّرت أكثر من 12,000 ريال في علاج أسنان عائلتي. الخدمة ممتازة والخصومات حقيقية. أنصح الجميع بأمان إيفر.',
    avatar: 'PLACEHOLDER_DPO_EMAIL',
  },
  {
    id: 2,
    name: 'فاطمة العتيبي',
    location: 'جدة',
    plan: 'أمان بلس',
    savings: '8,500 ريال',
    rating: 5,
    comment: 'كنت أدفع مبالغ كبيرة للاستشارات الطبية. مع أمان بلس، الاستشارات عن بُعد غير محدودة والخصومات رائعة.',
    avatar: 'PLACEHOLDER_DPO_EMAIL',
  },
  {
    id: 3,
    name: 'محمد الشهري',
    location: 'الدمام',
    plan: 'أمان',
    savings: '5,200 ريال',
    rating: 5,
    comment: 'حتى الباقة الأساسية وفّرت لي الكثير. استخدمها بجانب تأميني وأحصل على خصومات إضافية على كل شيء.',
    avatar: 'PLACEHOLDER_DPO_EMAIL',
  },
  {
    id: 4,
    name: 'نورة القحطاني',
    location: 'مكة المكرمة',
    plan: 'أمان بلس',
    savings: '9,800 ريال',
    rating: 5,
    comment: 'الرعاية المنزلية كانت مكلفة جداً. الآن مع أمان بلس، أحصل على 5 زيارات شهرياً بأسعار مخفضة. خدمة رائعة!',
    avatar: 'PLACEHOLDER_DPO_EMAIL',
  },
];

export function PricingTestimonials() {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {TESTIMONIALS.map((testimonial) => (
        <div
          key={testimonial.id}
          className="bg-white rounded-xl p-6 shadow-lg border border-[#E5EAEB] hover:shadow-xl transition-all duration-300"
        >
          {/* Quote Icon */}
          <Quote className="w-10 h-10 text-[#4A8B8E]/20 mb-4" />

          {/* Rating */}
          <div className="flex items-center gap-1 mb-4">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-[#FFB800] fill-[#FFB800]" />
            ))}
          </div>

          {/* Comment */}
          <p className="text-[#1A2B2C] leading-relaxed mb-6">
            &ldquo;{testimonial.comment}&rdquo;
          </p>

          {/* User Info */}
          <div className="flex items-center justify-between pt-4 border-t border-[#E5EAEB]">
            <div>
              <div className="font-bold text-[#1A2B2C]">{testimonial.name}</div>
              <div className="text-sm text-[#5A6B6C]">{testimonial.location}</div>
            </div>
            <div className="text-left">
              <div className="text-sm text-[#5A6B6C]">{testimonial.plan}</div>
              <div className="font-bold text-[#4A8B8E]">وفّر {testimonial.savings}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
