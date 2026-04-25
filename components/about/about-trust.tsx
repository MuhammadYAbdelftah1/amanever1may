'use client';

import { motion } from 'framer-motion';
import { FileCheck, ShieldCheck, BadgeCheck, Flag } from 'lucide-react';
import { ABOUT_CONFIG } from '@/lib/data/about-config';

const ICON_MAP = {
  FileCheck,
  ShieldCheck,
  BadgeCheck,
  Flag,
} as const;

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
            const Icon = ICON_MAP[item.icon as keyof typeof ICON_MAP];
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm p-6 hover:bg-white/10 transition"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wide mb-2">
                  {item.title}
                </h3>
                <p className="text-base text-white leading-relaxed">
                  {item.content}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
