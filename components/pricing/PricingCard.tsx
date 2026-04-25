'use client';

import { PricingTier } from '@/data/pricing-data';
import { Check, X } from 'lucide-react';
import { useState } from 'react';

interface PricingCardProps {
  tier: PricingTier;
  billingCycle: 'monthly' | 'yearly';
  onSelect: (tierId: string) => void;
}

export function PricingCard({ tier, billingCycle, onSelect }: PricingCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const price = billingCycle === 'monthly' ? tier.price.monthly : tier.price.yearlyMonthly;
  const totalYearly = tier.price.yearly;
  const savings = billingCycle === 'yearly' ? (tier.price.monthly * 12 - tier.price.yearly) : 0;

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
            <span className="text-5xl font-bold text-[#4A8B8E]">{price}</span>
            <span className="text-xl text-[#5A6B6C]">ريال</span>
          </div>
          <div className="text-sm text-[#5A6B6C] mt-1">
            {billingCycle === 'monthly' ? 'شهرياً' : 'شهرياً (فوترة سنوية)'}
          </div>
          
          {billingCycle === 'yearly' && (
            <div className="mt-3 space-y-1">
              <div className="text-sm text-[#5A6B6C]">
                المجموع السنوي: <span className="font-bold text-[#1A2B2C]">{totalYearly} ريال</span>
              </div>
              <div className="inline-block bg-[#E8F1F1] text-[#4A8B8E] px-3 py-1 rounded-full text-sm font-bold">
                وفّر {savings} ريال
              </div>
            </div>
          )}
        </div>

        {/* Target Audience */}
        <p className="text-sm text-[#5A6B6C] leading-relaxed">{tier.targetAudience}</p>
      </div>

      {/* Features */}
      <div className="space-y-3 mb-8">
        {tier.features.map((feature, index) => (
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
    </div>
  );
}
