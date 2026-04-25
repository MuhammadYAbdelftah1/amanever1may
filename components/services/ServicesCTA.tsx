'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { finalCTASection, ctaPaths } from '@/lib/data/services-config';
import * as LucideIcons from 'lucide-react';

export function ServicesCTA() {
  return (
    <section
      className="py-24 md:py-32 bg-gradient-to-br from-slate-900 to-emerald-900"
      aria-labelledby="services-cta-title"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm font-bold text-emerald-300 uppercase tracking-wider mb-4"
          >
            {finalCTASection.eyebrow}
          </motion.p>

          <motion.h2
            id="services-cta-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-white leading-tight"
          >
            {finalCTASection.title}
          </motion.h2>
        </div>

        {/* CTA Paths */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {ctaPaths.map((path, index) => {
            const IconComponent = (LucideIcons as any)[path.icon] || LucideIcons.Circle;

            return (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 text-center hover:bg-white/20 transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-white/20 text-white flex items-center justify-center">
                  <IconComponent className="w-8 h-8" aria-hidden="true" />
                </div>

                {/* Audience Label */}
                <p className="text-sm font-bold text-emerald-300 uppercase tracking-wider mb-4">
                  {path.audience}
                </p>

                {/* Subtitle */}
                <p className="text-sm text-emerald-50 leading-relaxed mb-6">{path.subtitle}</p>

                {/* CTA Button or App Badges */}
                {path.showAppBadges ? (
                  <div className="space-y-4">
                    <p className="text-lg font-bold text-white mb-4">{path.ctaText}</p>
                    <div className="flex justify-center">
                      <Image
                        src="/images/all-stores.jpg"
                        alt="حمّل التطبيق من App Store أو Google Play أو AppGallery"
                        width={300}
                        height={100}
                        className="rounded-xl"
                      />
                    </div>
                  </div>
                ) : (
                  <Link
                    href={path.ctaHref || '#'}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-emerald-700 font-bold hover:bg-emerald-50 transition-colors w-full"
                  >
                    <span>{path.ctaText}</span>
                    <ArrowLeft className="w-5 h-5" aria-hidden="true" />
                  </Link>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
