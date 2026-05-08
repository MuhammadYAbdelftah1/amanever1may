'use client';

import { motion } from 'framer-motion';
import { getAboutConfig } from '@/lib/data/about-config-localized';
import { useParams } from 'next/navigation';

export function AboutVisionServices() {
  const params = useParams();
  const locale = (params?.locale as string) || 'ar';
  const { vision } = getAboutConfig(locale);

  return (
    <section className="bg-slate-50 py-20 md:py-28">
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
            {vision.eyebrow}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            {vision.title}
          </h2>
          <p className="text-lg md:text-xl text-slate-700 leading-relaxed max-w-4xl mx-auto">
            {vision.paragraph}
          </p>
        </motion.div>

        {/* Services heading */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl font-bold text-slate-900 mt-16 mb-10 text-center"
        >
          {vision.servicesHeading}
        </motion.h3>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {vision.services.map((service, index) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="rounded-2xl bg-white border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Image Banner - Full Width at Top */}
                <div className="w-full h-32 md:h-40 overflow-hidden bg-emerald-50 relative border-b-2 border-dashed border-emerald-300">
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-3">
                    <div className="text-xs md:text-sm font-bold text-emerald-700 mb-1">
                      للمصممة
                    </div>
                    <div className="text-[10px] md:text-xs text-emerald-600 mb-2 px-2 leading-tight">
                      {service.title}
                    </div>
                    <div className="text-[9px] md:text-[10px] text-gray-500 font-semibold mb-0.5">
                      Desktop: Full Width × 160px
                    </div>
                    <div className="text-[8px] md:text-[9px] text-gray-500 mb-0.5">
                      Tablet: Full Width × 160px
                    </div>
                    <div className="text-[8px] md:text-[9px] text-gray-500">
                      Mobile: Full Width × 128px
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <h4 className="text-lg font-bold text-slate-900 mb-2">
                    {service.title}
                  </h4>
                  <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                    {service.description}
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
