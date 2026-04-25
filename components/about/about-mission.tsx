'use client';

import { motion } from 'framer-motion';
import { Target, Infinity, Sparkles } from 'lucide-react';
import { ABOUT_CONFIG } from '@/lib/data/about-config';

const ICON_MAP = {
  Target,
  Infinity,
  Sparkles,
} as const;

export function AboutMission() {
  const { mission } = ABOUT_CONFIG;

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
            const Icon = ICON_MAP[pillar.icon as keyof typeof ICON_MAP];
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="rounded-2xl border border-slate-200 p-6 hover:shadow-lg transition"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {pillar.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
