'use client';

import { motion } from 'framer-motion';
import { financialSection, financialSolutions } from '@/lib/data/services-config';
import { FinancialCard } from './shared/FinancialCard';

export function FinancialSolutions() {
  return (
    <section
      id="financial-solutions"
      className="py-20 md:py-28 bg-gradient-to-br from-emerald-600 to-teal-700"
      aria-labelledby="financial-section-title"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm font-bold text-emerald-100 uppercase tracking-wider mb-4"
          >
            {financialSection.tag}
          </motion.p>

          <motion.h2
            id="financial-section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6"
          >
            {financialSection.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-emerald-50 leading-relaxed"
          >
            {financialSection.subtitle}
          </motion.p>
        </div>

        {/* Financial Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto mb-12">
          {financialSolutions.map((solution, index) => (
            <FinancialCard key={solution.id} solution={solution} index={index} />
          ))}
        </div>

        {/* Compliance Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6 text-center">
            <p className="text-sm text-emerald-50 leading-relaxed">
              {financialSection.complianceNote}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
