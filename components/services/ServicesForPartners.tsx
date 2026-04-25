'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import {
  partnersSection,
  b2bServices,
  partnerMetrics,
  partnerCTAs,
} from '@/lib/data/services-config';
import { B2BServiceRow } from './shared/B2BServiceRow';

export function ServicesForPartners() {
  return (
    <section
      id="for-partners"
      className="py-20 md:py-28 bg-white"
      aria-labelledby="partners-section-title"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm font-bold text-emerald-600 uppercase tracking-wider mb-4"
          >
            {partnersSection.tag}
          </motion.p>

          <motion.h2
            id="partners-section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-6"
          >
            {partnersSection.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-700 leading-relaxed"
          >
            {partnersSection.subtitle}
          </motion.p>
        </div>

        {/* B2B Services */}
        <div className="max-w-6xl mx-auto space-y-20 mb-20">
          {b2bServices.map((service, index) => (
            <B2BServiceRow key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Success Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto mb-16"
        >
          <div className="rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 p-8 md:p-12">
            <h3 className="text-2xl font-bold text-slate-900 text-center mb-10">
              {partnersSection.metricsTitle}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {partnerMetrics.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <p className="text-5xl md:text-6xl font-black text-emerald-600 mb-3">
                    {metric.value}
                  </p>
                  <p className="text-lg font-semibold text-slate-700">{metric.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="rounded-2xl bg-white border border-slate-200 p-8 md:p-12 text-center shadow-lg">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
              {partnersSection.ctaTitle}
            </h3>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* Primary CTA */}
              <a
                href={partnerCTAs.primary.href}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-colors shadow-lg hover:shadow-xl w-full sm:w-auto"
              >
                <span>{partnerCTAs.primary.text}</span>
                <ArrowLeft className="w-5 h-5" aria-hidden="true" />
              </a>

              {/* Secondary CTA */}
              <Link
                href={partnerCTAs.secondary.href}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white border-2 border-emerald-600 text-emerald-600 font-bold hover:bg-emerald-50 transition-colors w-full sm:w-auto"
              >
                <span>{partnerCTAs.secondary.text}</span>
                <ArrowLeft className="w-5 h-5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
