'use client';

import { motion } from 'framer-motion';
import { getAboutConfig } from '@/lib/data/about-config-localized';
import { useParams } from 'next/navigation';

export function AboutMission() {
  const params = useParams();
  const locale = (params?.locale as string) || 'ar';
  const { mission } = getAboutConfig(locale);

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold text-emerald-600 uppercase tracking-wide mb-4">
            {mission.eyebrow}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
            {mission.title}
          </h2>

          {/* Quote */}
          <blockquote className="text-2xl md:text-3xl text-slate-800 leading-relaxed border-s-4 border-emerald-500 ps-6 md:ps-8 text-start max-w-4xl mx-auto">
            {mission.quote}
          </blockquote>
        </motion.div>

        {/* Pillar cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {mission.pillars.map((pillar, index) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition"
              >
                {/* Image Banner - Full Width at Top */}
                <div className="w-full h-28 md:h-32 overflow-hidden bg-emerald-50 relative border-b-2 border-dashed border-emerald-300">
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
                    <div className="text-xs font-bold text-emerald-700 mb-1">
                      للمصممة
                    </div>
                    <div className="text-[10px] text-emerald-600 mb-1 px-2 leading-tight">
                      {pillar.title}
                    </div>
                    <div className="text-[9px] text-gray-500 font-semibold mb-0.5">
                      Desktop: Full Width × 128px
                    </div>
                    <div className="text-[8px] text-gray-500">
                      Mobile: Full Width × 112px
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {pillar.description}
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
