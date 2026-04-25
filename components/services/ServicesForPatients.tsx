'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { patientsSection, patientServices, membershipPlans, patientsCTA } from '@/lib/data/services-config';
import { ServiceDetailCard } from './shared/ServiceDetailCard';

export function ServicesForPatients() {
  return (
    <section
      id="for-patients"
      className="py-20 md:py-28 bg-white"
      aria-labelledby="patients-section-title"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm font-bold text-emerald-600 uppercase tracking-wider mb-4"
          >
            {patientsSection.tag}
          </motion.p>

          <motion.h2
            id="patients-section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-6"
          >
            {patientsSection.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-700 leading-relaxed"
          >
            {patientsSection.subtitle}
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-7xl mx-auto">
          {patientServices.map((service, index) => (
            <ServiceDetailCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Membership Plans Highlight (for the membership card) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 max-w-7xl mx-auto"
        >
          <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 p-6 md:p-8">
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
              <div className="text-center">
                <p className="text-sm font-semibold text-emerald-700 mb-1">باقة بريمير</p>
                <p className="text-2xl font-black text-slate-900">{membershipPlans[0].price}</p>
              </div>
              <div className="hidden md:block w-px h-12 bg-emerald-300" aria-hidden="true" />
              <div className="text-center">
                <p className="text-sm font-semibold text-emerald-700 mb-1">باقة VIP</p>
                <p className="text-2xl font-black text-slate-900">{membershipPlans[1].price}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA for Patients */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-600 p-8 md:p-12 text-center shadow-2xl">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {patientsCTA.title}
            </h3>
            <p className="text-emerald-50 mb-8 text-lg">
              {patientsCTA.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={patientsCTA.primary.href}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-emerald-700 font-bold hover:bg-emerald-50 transition-colors shadow-lg hover:shadow-xl w-full sm:w-auto"
              >
                <span>{patientsCTA.primary.text}</span>
                <ArrowLeft className="w-5 h-5" aria-hidden="true" />
              </Link>

              <Link
                href={patientsCTA.secondary.href}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-transparent border-2 border-white text-white font-bold hover:bg-white/20 transition-colors w-full sm:w-auto"
              >
                <span>{patientsCTA.secondary.text}</span>
                <ArrowLeft className="w-5 h-5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
