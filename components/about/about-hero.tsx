'use client';

import { motion } from 'framer-motion';
import { ABOUT_CONFIG } from '@/lib/data/about-config';

export function AboutHero() {
  const { hero } = ABOUT_CONFIG;

  return (
    <section className="relative bg-gradient-to-b from-emerald-50 via-white to-white py-24 md:py-32 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
          backgroundSize: '40px 40px',
          color: '#10b981'
        }} />
      </div>

      <div className="relative max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-start"
        >
          {/* Eyebrow */}
          <p className="text-sm font-semibold text-emerald-600 uppercase tracking-wide mb-4">
            {hero.eyebrow}
          </p>

          {/* H1 */}
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight mb-6">
            {hero.title}
          </h1>

          {/* Opening paragraph */}
          <p className="text-lg md:text-xl text-slate-700 leading-relaxed max-w-4xl">
            {hero.paragraph}
          </p>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-slate-200 pt-8"
        >
          {hero.stats.map((stat, index) => (
            <div key={index} className="text-center md:text-start">
              <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-slate-600">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
