"use client";

import { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { knowledge } from "@/lib/knowledge";

export function ContactFAQTeaser() {
  const [openId, setOpenId] = useState<string | null>(null);
  
  // Show first 4 FAQs
  const faqItems = knowledge.faq.general.slice(0, 4);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="container mx-auto px-4 py-16">
      {/* Heading */}
      <div className="mb-12 text-center">
        <div className="mb-4 flex items-center justify-center gap-2">
          <HelpCircle className="h-6 w-6 text-emerald-600" aria-hidden="true" />
          <h2 className="text-3xl font-bold text-slate-900">أسئلة شائعة</h2>
        </div>
        <p className="text-lg text-slate-600">
          إجابات سريعة على أكثر الأسئلة تكراراً — وفّر وقتك.
        </p>
      </div>

      {/* FAQ Items */}
      <div className="mx-auto max-w-3xl space-y-4">
        {faqItems.map((item) => {
          const isOpen = openId === item.id;
          
          return (
            <div
              key={item.id}
              className="overflow-hidden rounded-xl border border-slate-200 bg-white transition-all"
            >
              {/* Question Button */}
              <button
                onClick={() => toggleFAQ(item.id)}
                className="flex w-full items-center justify-between gap-4 p-5 text-start transition-colors hover:bg-slate-50"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${item.id}`}
              >
                <span className="font-semibold text-slate-900">
                  {item.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 flex-shrink-0 text-slate-600 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>

              {/* Answer */}
              {isOpen && (
                <div
                  id={`faq-answer-${item.id}`}
                  className="border-t border-slate-100 bg-slate-50 p-5"
                >
                  <p className="text-slate-700">{item.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* View All Button */}
      <div className="mt-8 text-center">
        <Button asChild variant="outline" size="lg">
          <Link href="/ar/faq">
            عرض جميع الأسئلة
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
