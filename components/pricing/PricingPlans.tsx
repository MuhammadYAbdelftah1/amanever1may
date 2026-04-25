'use client';

import { useState } from 'react';
import { PRICING_TIERS } from '@/data/pricing-data';
import { PricingCard } from './PricingCard';
import { Users, User, Building } from 'lucide-react';

type PlanType = 'individual' | 'family' | 'business';
type BillingCycle = 'monthly' | 'yearly';

export function PricingPlans() {
  const [planType, setPlanType] = useState<PlanType>('individual');
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('yearly');

  const handleSelectPlan = (tierId: string) => {
    // TODO: Integrate with actual subscription flow
    console.log('Selected plan:', tierId, 'Type:', planType, 'Billing:', billingCycle);
    // Redirect to app download or signup
    window.location.href = '#download';
  };

  return (
    <div>
      {/* Plan Type Toggle */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex bg-[#F8FAFB] rounded-xl p-2 gap-2">
          <button
            onClick={() => setPlanType('individual')}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all duration-300
              ${planType === 'individual'
                ? 'bg-[#4A8B8E] text-white shadow-lg'
                : 'text-[#5A6B6C] hover:text-[#4A8B8E]'
              }
            `}
          >
            <User className="w-5 h-5" />
            <span>فردي</span>
          </button>
          <button
            onClick={() => setPlanType('family')}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all duration-300
              ${planType === 'family'
                ? 'bg-[#4A8B8E] text-white shadow-lg'
                : 'text-[#5A6B6C] hover:text-[#4A8B8E]'
              }
            `}
          >
            <Users className="w-5 h-5" />
            <span>عائلة</span>
          </button>
          <button
            onClick={() => setPlanType('business')}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all duration-300
              ${planType === 'business'
                ? 'bg-[#4A8B8E] text-white shadow-lg'
                : 'text-[#5A6B6C] hover:text-[#4A8B8E]'
              }
            `}
          >
            <Building className="w-5 h-5" />
            <span>شركات</span>
          </button>
        </div>
      </div>

      {/* Billing Cycle Toggle */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex items-center bg-[#F8FAFB] rounded-xl p-2 gap-2">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`
              px-6 py-2 rounded-lg font-bold transition-all duration-300
              ${billingCycle === 'monthly'
                ? 'bg-white text-[#4A8B8E] shadow-md'
                : 'text-[#5A6B6C]'
              }
            `}
          >
            شهري
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`
              px-6 py-2 rounded-lg font-bold transition-all duration-300
              ${billingCycle === 'yearly'
                ? 'bg-white text-[#4A8B8E] shadow-md'
                : 'text-[#5A6B6C]'
              }
            `}
          >
            سنوي
          </button>
          {billingCycle === 'yearly' && (
            <span className="bg-[#4A8B8E] text-white px-3 py-1 rounded-full text-sm font-bold mr-2">
              وفّر شهرين 🎉
            </span>
          )}
        </div>
      </div>

      {/* Pricing Cards */}
      {planType === 'business' ? (
        <div className="text-center py-12">
          <p className="text-xl text-[#5A6B6C] mb-6">
            خطط الشركات متاحة في القسم أدناه
          </p>
          <a
            href="#b2b"
            className="inline-block bg-[#4A8B8E] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#356B6E] transition-all duration-300"
          >
            اطلع على خطط الشركات
          </a>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {PRICING_TIERS.map((tier) => (
            <PricingCard
              key={tier.id}
              tier={tier}
              billingCycle={billingCycle}
              onSelect={handleSelectPlan}
            />
          ))}
        </div>
      )}

      {/* Additional Info */}
      <div className="text-center mt-12">
        <p className="text-sm text-[#5A6B6C] mb-4">
          جميع الباقات تشمل ضمان استرداد كامل خلال 14 يوم
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#5A6B6C]">
          <span>💳 مدى · فيزا · Apple Pay</span>
          <span>📱 تابي · تمارا (تقسيط بدون فوائد)</span>
        </div>
      </div>
    </div>
  );
}
