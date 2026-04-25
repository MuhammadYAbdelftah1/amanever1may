'use client';

import { BookOpen } from 'lucide-react';

export function BlogHero() {
  return (
    <section className="bg-gradient-to-b from-[#E8F1F1] to-white py-16 md:py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#4A8B8E] rounded-full mb-6">
            <BookOpen className="w-8 h-8 text-white" />
          </div>

          {/* Eyebrow */}
          <p className="text-[#4A8B8E] font-bold text-sm md:text-base mb-3 uppercase tracking-wide">
            مدونة أمان إيفر
          </p>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A2B2C] mb-6 leading-tight">
            معلومات صحية موثوقة من خبراء المجال
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-[#5A6B6C] max-w-3xl mx-auto leading-relaxed">
            محتوى طبي مبسّط، نصائح من أطباء متخصصين، وآخر التطورات في الرعاية الصحية الرقمية في المملكة.
          </p>

          {/* Trust Badge */}
          <div className="mt-8 inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-[#5A6B6C]">
              جميع المقالات مراجعة من أطباء معتمدين
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
