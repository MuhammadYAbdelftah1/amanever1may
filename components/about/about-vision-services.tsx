'use client';

import { motion } from 'framer-motion';
import { Video, Home, ShoppingBag, Wallet, Network, Building2 } from 'lucide-react';
import { ABOUT_CONFIG } from '@/lib/data/about-config';

const ICON_MAP = {
  Video,
  Home,
  ShoppingBag,
  Wallet,
  Network,
  Building2,
} as const;

export function AboutVisionServices() {
  const { vision } = ABOUT_CONFIG;

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
            const Icon = ICON_MAP[service.icon as keyof typeof ICON_MAP];
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="rounded-2xl bg-white border border-slate-200 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5">
                  <Icon className="w-7 h-7" aria-hidden="true" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">
                  {service.title}
                </h4>
                <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
