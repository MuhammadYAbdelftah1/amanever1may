'use client';

import { COMPARISON_FEATURES } from '@/data/pricing-data';
import { Check, X } from 'lucide-react';

export function ComparisonTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[#4A8B8E] text-white">
            <th className="p-4 text-right font-bold rounded-tr-xl">الميزة</th>
            <th className="p-4 text-center font-bold">أمان</th>
            <th className="p-4 text-center font-bold bg-[#356B6E]">أمان بلس</th>
            <th className="p-4 text-center font-bold rounded-tl-xl">أمان VIP</th>
          </tr>
        </thead>
        <tbody>
          {COMPARISON_FEATURES.map((feature, index) => (
            <tr
              key={index}
              className={`border-b border-[#E5EAEB] ${
                index % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFB]'
              }`}
            >
              <td className="p-4 font-bold text-[#1A2B2C]">{feature.name}</td>
              <td className="p-4 text-center">
                {renderFeatureValue(feature.basic)}
              </td>
              <td className="p-4 text-center bg-[#E8F1F1]/30">
                {renderFeatureValue(feature.plus)}
              </td>
              <td className="p-4 text-center">
                {renderFeatureValue(feature.vip)}
              </td>
            </tr>
          ))}
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
