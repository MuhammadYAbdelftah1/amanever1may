'use client';

import { motion } from 'framer-motion';
import { ABOUT_CONFIG } from '@/lib/data/about-config';

export function AboutTrust() {
  const { trust } = ABOUT_CONFIG;

  return (
    <section className="bg-slate-900 py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold text-emerald-400 uppercase tracking-wide mb-4">
            {trust.eyebrow}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {trust.title}
          </h2>
          <p className="text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
            {trust.sub}
          </p>
        </motion.div>

        {/* Trust cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trust.items.map((item, index) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm overflow-hidden hover:bg-white/10 transition"
              >
                {/* Image Banner - Full Width at Top */}
                <div className="w-full h-24 md:h-28 overflow-hidden bg-emerald-500/20 relative border-b-2 border-dashed border-emerald-400">
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
                    <div className="text-xs font-bold text-emerald-400 mb-1">
                      للمصممة
                    </div>
                    <div className="text-[9px] text-emerald-300 mb-1 px-1 leading-tight">
                      {item.title}
                    </div>
                    <div className="text-[8px] text-emerald-200 font-semibold mb-0.5">
                      Desktop: Full Width × 112px
                    </div>
                    <div className="text-[7px] text-emerald-100">
                      Mobile: Full Width × 96px
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wide mb-2">
                    {item.title}
                  </h3>
                  <p className="text-base text-white leading-relaxed">
                    {item.content}
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
