'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import {
  doctorsSection,
  doctorBenefits,
  doctorSteps,
  doctorCTAs,
} from '@/lib/data/services-config';
import { BenefitTile } from './shared/BenefitTile';

export function ServicesForDoctors() {
  return (
    <section
      id="for-doctors"
      className="py-20 md:py-28 bg-slate-50"
      aria-labelledby="doctors-section-title"
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
            {doctorsSection.tag}
          </motion.p>

          <motion.h2
            id="doctors-section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-6"
          >
            {doctorsSection.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-700 leading-relaxed"
          >
            {doctorsSection.subtitle}
          </motion.p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-16">
          {doctorBenefits.map((benefit, index) => (
            <BenefitTile key={index} benefit={benefit} index={index} />
          ))}
        </div>

        {/* How to Join Steps */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto mb-12"
        >
          <h3 className="text-2xl font-bold text-slate-900 text-center mb-10">
            {doctorsSection.howToJoinTitle}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div
              className="hidden md:block absolute top-12 start-0 end-0 h-0.5 bg-gradient-to-e from-emerald-200 via-emerald-400 to-emerald-200"
              style={{ width: 'calc(100% - 8rem)', marginInlineStart: '4rem' }}
              aria-hidden="true"
            />

            {doctorSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative text-center"
              >
                {/* Step Number */}
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center text-3xl font-black shadow-lg relative z-10">
                  {step.number}
                </div>

                {/* Step Title */}
                <h4 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h4>

                {/* Step Description */}
                <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Eligibility Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="rounded-2xl bg-amber-50 border border-amber-200 p-6 text-center">
            <p className="text-sm text-slate-700 leading-relaxed">
              {doctorsSection.eligibilityNote}
            </p>
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
              {doctorsSection.ctaTitle}
            </h3>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* Primary CTA */}
              <Link
                href={doctorCTAs.primary.href}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-colors shadow-lg hover:shadow-xl w-full sm:w-auto"
              >
                <span>{doctorCTAs.primary.text}</span>
                <ArrowLeft className="w-5 h-5" aria-hidden="true" />
              </Link>

              {/* Secondary CTA */}
              <a
                href={doctorCTAs.secondary.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white border-2 border-emerald-600 text-emerald-600 font-bold hover:bg-emerald-50 transition-colors w-full sm:w-auto"
              >
                <span>{doctorCTAs.secondary.text}</span>
                <ArrowLeft className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
