'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Check } from 'lucide-react';
import {
  affiliatesSection,
  affiliateBenefits,
  affiliateTiers,
  affiliateSteps,
  affiliateCTAs,
} from '@/lib/data/services-config';

export function ServicesForAffiliates() {
  return (
    <section
      id="for-affiliates"
      className="py-20 md:py-28 bg-gradient-to-br from-emerald-900 via-teal-800 to-emerald-900"
      aria-labelledby="affiliates-section-title"
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
            {affiliatesSection.tag}
          </motion.p>

          <motion.h2
            id="affiliates-section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6"
          >
            {affiliatesSection.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-emerald-50 leading-relaxed"
          >
            {affiliatesSection.subtitle}
          </motion.p>
        </div>

        {/* Benefits Grid */}
        <div className="max-w-7xl mx-auto mb-20">
          <h3 className="text-2xl font-bold text-white text-center mb-10">
            {affiliatesSection.whyJoinTitle}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {affiliateBenefits.map((benefit, index) => {
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden hover:bg-white/15 transition-all duration-300"
                >
                  {/* Image Banner - Full Width at Top */}
                  <div className="w-full h-32 md:h-40 overflow-hidden bg-emerald-500/20 relative border-b-2 border-dashed border-emerald-400">
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-3">
                      <div className="text-xs md:text-sm font-bold text-emerald-300 mb-1">
                        للمصممة
                      </div>
                      <div className="text-[10px] md:text-xs text-emerald-200 mb-2 px-2 leading-tight">
                        {benefit.title}
                      </div>
                      <div className="text-[9px] text-emerald-100 font-semibold mb-0.5">
                        Desktop: Full Width × 160px
                      </div>
                      <div className="text-[8px] text-emerald-100">
                        Mobile: Full Width × 128px
                      </div>
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className="p-6">
                    <h4 className="text-lg font-bold text-white mb-2">{benefit.title}</h4>
                    <p className="text-sm text-emerald-100 leading-relaxed">{benefit.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Tiers */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto mb-20"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-10">
            {affiliatesSection.tiersTitle}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {affiliateTiers.map((tier, index) => {
              return (
                <motion.div
                  key={tier.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden hover:bg-white/15 transition-all duration-300"
                >
                  {/* Image Banner - Full Width at Top */}
                  <div className="w-full h-32 overflow-hidden bg-gradient-to-br from-emerald-400 to-teal-500 relative border-b-2 border-dashed border-white">
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-3">
                      <div className="text-xs font-bold text-white mb-1">
                        للمصممة
                      </div>
                      <div className="text-[10px] text-white/90 mb-2">
                        {tier.name}
                      </div>
                      <div className="text-[9px] text-white/80 font-semibold mb-0.5">
                        Desktop: Full Width × 128px
                      </div>
                      <div className="text-[8px] text-white/70">
                        Mobile: Full Width × 128px
                      </div>
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className="p-6 text-center">
                    <h4 className="text-xl font-bold text-white mb-2">{tier.name}</h4>
                    <p className="text-sm text-emerald-200 mb-4">
                      {tier.minReferrals}
                      {tier.maxReferrals ? `-${tier.maxReferrals}` : '+'} إحالة/شهر
                    </p>
                    <div className="bg-emerald-500/20 rounded-lg px-3 py-2 mb-4">
                      <p className="text-emerald-300 font-bold text-sm">{tier.bonus}</p>
                    </div>
                    <ul className="space-y-2 text-start">
                      {tier.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-emerald-100">
                          <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto mb-16"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-10">
            {affiliatesSection.howItWorksTitle}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {/* Connecting Line */}
            <div
              className="hidden md:block absolute top-12 start-0 end-0 h-0.5 bg-gradient-to-e from-emerald-400 via-teal-400 to-emerald-400"
              style={{ width: 'calc(100% - 8rem)', marginInlineStart: '4rem' }}
              aria-hidden="true"
            />

            {affiliateSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative text-center"
              >
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-white flex items-center justify-center text-3xl font-black shadow-lg relative z-10">
                  {step.number}
                </div>
                <h4 className="text-lg font-bold text-white mb-3">{step.title}</h4>
                <p className="text-sm text-emerald-100 leading-relaxed">{step.description}</p>
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
          <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6 text-center">
            <h4 className="text-xl font-bold text-white mb-3">
              {affiliatesSection.eligibilityTitle}
            </h4>
            <p className="text-emerald-100 leading-relaxed">{affiliatesSection.eligibilityNote}</p>
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
          <div className="rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">
              {affiliatesSection.ctaTitle}
            </h3>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={affiliateCTAs.primary.href}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-emerald-700 font-bold hover:bg-emerald-50 transition-colors shadow-lg hover:shadow-xl w-full sm:w-auto"
              >
                <span>{affiliateCTAs.primary.text}</span>
                <ArrowLeft className="w-5 h-5" aria-hidden="true" />
              </Link>

              <Link
                href={affiliateCTAs.secondary.href}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-transparent border-2 border-white text-white font-bold hover:bg-white/10 transition-colors w-full sm:w-auto"
              >
                <span>{affiliateCTAs.secondary.text}</span>
                <ArrowLeft className="w-5 h-5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
