'use client';

import { motion } from 'framer-motion';
import { heroContent } from '@/lib/data/services-config';

export function ServicesHero() {
  return (
    <section
      className="relative bg-gradient-to-b from-emerald-50 to-white py-20 md:py-28"
      aria-labelledby="services-hero-title"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto text-center">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm font-bold text-emerald-600 uppercase tracking-wider mb-4"
          >
            {heroContent.eyebrow}
          </motion.p>

          {/* Title */}
          <motion.h1
            id="services-hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight mb-6"
          >
            {heroContent.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-700 max-w-3xl mx-auto leading-relaxed"
          >
            {heroContent.subtitle}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
