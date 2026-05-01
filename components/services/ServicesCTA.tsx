'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { finalCTASection, ctaPaths } from '@/lib/data/services-config';

export function ServicesCTA() {
  return (
    <section
      className="py-24 md:py-32 bg-gradient-to-br from-slate-900 to-emerald-900"
      aria-labelledby="services-cta-title"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm font-bold text-emerald-300 uppercase tracking-wider mb-4"
          >
            {finalCTASection.eyebrow}
          </motion.p>

          <motion.h2
            id="services-cta-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-white leading-tight"
          >
            {finalCTASection.title}
          </motion.h2>
        </div>

        {/* CTA Paths */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {ctaPaths.map((path, index) => {
            return (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl overflow-hidden hover:bg-white/20 transition-all duration-300"
              >
                {/* Image Banner - Full Width at Top */}
                <div className="w-full h-32 md:h-40 overflow-hidden bg-white/20 relative border-b-2 border-dashed border-white/40">
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-3">
                    <div className="text-xs md:text-sm font-bold text-white mb-1">
                      للمصممة
                    </div>
                    <div className="text-[10px] md:text-xs text-white/90 mb-2 px-2 leading-tight">
                      {path.audience}
                    </div>
                    <div className="text-[9px] text-white/80 font-semibold mb-0.5">
                      Desktop: Full Width × 160px
                    </div>
                    <div className="text-[8px] text-white/70">
                      Mobile: Full Width × 128px
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 text-center">
                  {/* Audience Label */}
                  <p className="text-sm font-bold text-emerald-300 uppercase tracking-wider mb-4">
                    {path.audience}
                  </p>

                  {/* Subtitle */}
                  <p className="text-sm text-emerald-50 leading-relaxed mb-6">{path.subtitle}</p>

                  {/* CTA Button */}
                  <Link
                    href={path.ctaHref || '#'}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-emerald-700 font-bold hover:bg-emerald-50 transition-colors w-full"
                  >
                    <span>{path.ctaText}</span>
                    <ArrowLeft className="w-5 h-5" aria-hidden="true" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
