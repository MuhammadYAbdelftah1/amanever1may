'use client';

import { motion } from 'framer-motion';
import { Heart, Eye, Lightbulb, ShieldCheck, Handshake } from 'lucide-react';
import { ABOUT_CONFIG } from '@/lib/data/about-config';

const ICON_MAP = {
  Heart,
  Eye,
  Lightbulb,
  ShieldCheck,
  Handshake,
} as const;

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
            const Icon = ICON_MAP[value.icon as keyof typeof ICON_MAP];
            const isEven = index % 2 === 0;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative rounded-3xl bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 p-8 md:p-12"
              >
                {/* Number watermark */}
                <div className="absolute top-8 end-8 text-7xl md:text-8xl font-black text-emerald-200 leading-none select-none" aria-hidden="true">
                  {value.number}
                </div>

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7" aria-hidden="true" />
                  </div>

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
