'use client';

import { motion } from 'framer-motion';
import { ABOUT_CONFIG } from '@/lib/data/about-config';

export function AboutValues() {
  const { values } = ABOUT_CONFIG;

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-emerald-600 uppercase tracking-wide mb-4">
            {values.eyebrow}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            {values.title}
          </h2>
          <p className="text-lg text-slate-700 leading-relaxed max-w-3xl mx-auto">
            {values.intro}
          </p>
        </motion.div>

        {/* Values cards */}
        <div className="space-y-8">
          {values.items.map((value, index) => {
            const isEven = index % 2 === 0;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative rounded-3xl bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 overflow-hidden"
              >
                {/* Number watermark */}
                <div className="absolute top-8 end-8 text-7xl md:text-8xl font-black text-emerald-200 leading-none select-none" aria-hidden="true">
                  {value.number}
                </div>

                {/* Image Banner - Full Width at Top */}
                <div className="w-full h-40 md:h-48 overflow-hidden bg-emerald-600 relative border-b-4 border-dashed border-emerald-300">
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                    <div className="text-sm md:text-base font-bold text-white mb-2">
                      للمصممة
                    </div>
                    <div className="text-xs md:text-sm text-white/90 mb-3 px-4 leading-tight">
                      {value.title}
                    </div>
                    <div className="text-[10px] md:text-xs text-white/80 font-semibold mb-1">
                      Desktop: Full Width × 192px
                    </div>
                    <div className="text-[9px] md:text-[10px] text-white/70 mb-1">
                      Tablet: Full Width × 192px
                    </div>
                    <div className="text-[9px] md:text-[10px] text-white/70">
                      Mobile: Full Width × 160px
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="relative z-10 p-8 md:p-12">
                  {/* Title */}
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    {value.title}
                  </h3>

                  {/* Description */}
                  <p className="text-base md:text-lg text-slate-700 leading-relaxed max-w-2xl">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
