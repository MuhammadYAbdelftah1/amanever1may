'use client';

import { PricingTier } from '@/data/pricing-data';
import { Check, X, TrendingUp, HelpCircle } from 'lucide-react';
import { useState } from 'react';

interface PricingCardProps {
  tier: PricingTier;
  billingCycle: 'monthly' | 'yearly';
  onSelect: (tierId: string) => void;
}

export function PricingCard({ tier, billingCycle, onSelect }: PricingCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);
  
  const price = billingCycle === 'monthly' ? tier.price.monthly : tier.price.yearlyMonthly;
  const totalYearly = tier.price.yearly;
  const savings = billingCycle === 'yearly' ? (tier.price.monthly * 12 - tier.price.yearly) : 0;

  // ROI Calculation
  const getROI = () => {
    if (tier.id === 'basic') {
      return { savings: '1,100+', roi: '5.7×', description: 'أقل من وجبة واحدة بالشهر' };
    } else if (tier.id === 'plus') {
      return { savings: '3,500+', roi: '10×', description: 'أقل من تعبئة بنزين بالشهر' };
    } else {
      return { savings: '13,000+', roi: '26×', description: 'الزيارات المنزلية وحدها تغطي السعر 14 مرة' };
    }
  };

  const roiData = getROI();

  // FAQ per card
  const getFAQ = () => {
    if (tier.id === 'basic') {
      return {
        question: 'هل يمكن إلغاء الاشتراك؟',
        answer: 'نعم، في أي وقت. وعندك ضمان استرداد كامل خلال 14 يوم.'
      };
    } else if (tier.id === 'plus') {
      return {
        question: 'هل التقسيط بدون فوائد؟',
        answer: 'نعم، 100%. قسّط على 3-12 شهر عبر تابي أو تمارا بدون أي فوائد.'
      };
    } else {
      return {
        question: 'هل الزيارات المنزلية فعلاً مجانية؟',
        answer: 'نعم، زيارة واحدة مجانية كل شهر. الزيارات الإضافية بخصم 80%.'
      };
    }
  };

  const faq = getFAQ();

  return (
    <div
      className={`
        relative rounded-2xl p-8 transition-all duration-300
        ${tier.recommended 
          ? 'border-2 border-[#4A8B8E] bg-gradient-to-b from-white to-[#E8F1F1] shadow-xl scale-105' 
          : 'border border-[#E5EAEB] bg-white shadow-lg hover:shadow-xl'
        }
        ${isHovered && !tier.recommended ? 'scale-105' : ''}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badge */}
      {tier.badge && (
        <div className="absolute -top-4 right-1/2 translate-x-1/2 bg-[#4A8B8E] text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg whitespace-nowrap">
          {tier.badge}
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-[#1A2B2C] mb-2">{tier.name}</h3>
        <p className="text-sm text-[#5A6B6C] mb-4">{tier.description}</p>
        
        {/* Price */}
        <div className="mb-4">
          <div className="flex items-baseline justify-center gap-2">
            <span className="text-5xl font-bold text-[#4A8B8E]">{totalYearly}</span>
            <span className="text-xl text-[#5A6B6C]">ر.س/سنوياً</span>
          </div>
          <div className="text-sm text-[#5A6B6C] mt-1">
            يعني {price} ريال بالشهر — {roiData.description}
          </div>
          
          {billingCycle === 'yearly' && savings > 0 && (
            <div className="mt-3">
              <div className="inline-block bg-[#E8F1F1] text-[#4A8B8E] px-3 py-1 rounded-full text-sm font-bold">
                وفّر {savings} ريال
              </div>
            </div>
          )}
        </div>

        {/* ROI Badge */}
        <div className="bg-gradient-to-r from-[#4A8B8E] to-[#356B6E] text-white rounded-xl p-4 mb-4">
          <div className="flex items-center justify-center gap-2 mb-1">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm font-medium">التوفير السنوي المتوقع</span>
          </div>
          <div className="text-3xl font-bold">{roiData.savings} ر.س</div>
          <div className="text-sm opacity-90 mt-1">عائد {roiData.roi} على الاستثمار</div>
        </div>

        {/* Target Audience */}
        <div className="bg-[#F8FAFB] rounded-lg p-3 text-right">
          <p className="text-sm font-bold text-[#1A2B2C] mb-1">✓ مناسبة لك إذا:</p>
          <p className="text-sm text-[#5A6B6C] leading-relaxed">{tier.targetAudience}</p>
        </div>
      </div>

      {/* Features */}
      <div className="space-y-3 mb-6">
        {tier.features.slice(0, 8).map((feature, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className={`flex-shrink-0 mt-0.5 ${
              typeof feature.value === 'boolean' && !feature.value 
                ? 'text-[#E5EAEB]' 
                : 'text-[#4A8B8E]'
            }`}>
              {typeof feature.value === 'boolean' ? (
                feature.value ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />
              ) : (
                <Check className="w-5 h-5" />
              )}
            </div>
            <div className="flex-1">
              <div className="text-sm text-[#1A2B2C]">{feature.name}</div>
              {typeof feature.value !== 'boolean' && (
                <div className={`text-sm font-bold ${
                  feature.highlight ? 'text-[#4A8B8E]' : 'text-[#5A6B6C]'
                }`}>
                  {feature.value}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* FAQ Toggle */}
      <button
        onClick={() => setShowFAQ(!showFAQ)}
        className="w-full flex items-center justify-between bg-[#F8FAFB] hover:bg-[#E8F1F1] rounded-lg p-3 mb-4 transition-colors"
      >
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-[#4A8B8E]" />
          <span className="text-sm font-medium text-[#1A2B2C]">{faq.question}</span>
        </div>
        <span className="text-[#4A8B8E] text-sm">{showFAQ ? '−' : '+'}</span>
      </button>
      
      {showFAQ && (
        <div className="bg-[#E8F1F1] rounded-lg p-3 mb-4 text-sm text-[#5A6B6C]">
          {faq.answer}
        </div>
      )}

      {/* CTA Button */}
      <button
        onClick={() => onSelect(tier.id)}
        className={`
          w-full py-4 rounded-xl font-bold text-lg transition-all duration-300
          ${tier.recommended
            ? 'bg-[#4A8B8E] text-white hover:bg-[#356B6E] shadow-lg hover:shadow-xl'
            : 'bg-white text-[#4A8B8E] border-2 border-[#4A8B8E] hover:bg-[#E8F1F1]'
          }
        `}
      >
        {tier.cta}
      </button>

      {/* Payment Methods */}
      <div className="text-center mt-4">
        <p className="text-xs text-[#5A6B6C] mb-2">متاح بالتقسيط</p>
        <div className="flex items-center justify-center gap-2 text-xs text-[#5A6B6C]">
          <span>تابي</span>
          <span>·</span>
          <span>تمارا</span>
          <span className="text-[#4A8B8E] font-bold">(بدون فوائد)</span>
        </div>
      </div>
    </div>
  );
}
