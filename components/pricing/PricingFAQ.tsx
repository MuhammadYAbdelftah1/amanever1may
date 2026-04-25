'use client';

import { useState } from 'react';
import { PRICING_FAQ } from '@/data/pricing-data';
import { ChevronDown } from 'lucide-react';

export function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Generate FAQ Schema for SEO
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: PRICING_FAQ.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="space-y-4">
        {PRICING_FAQ.map((faq, index) => (
          <div
            key={index}
            className="bg-white rounded-xl border border-[#E5EAEB] overflow-hidden transition-all duration-300 hover:shadow-lg"
          >
            <button
              onClick={() => toggleQuestion(index)}
              className="w-full p-6 text-right flex items-center justify-between gap-4 hover:bg-[#F8FAFB] transition-colors duration-200"
              aria-expanded={openIndex === index}
            >
              <span className="font-bold text-[#1A2B2C] text-lg">{faq.question}</span>
              <ChevronDown
                className={`w-6 h-6 text-[#4A8B8E] flex-shrink-0 transition-transform duration-300 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'max-h-96' : 'max-h-0'
              }`}
            >
              <div className="p-6 pt-0 text-[#5A6B6C] leading-relaxed">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
