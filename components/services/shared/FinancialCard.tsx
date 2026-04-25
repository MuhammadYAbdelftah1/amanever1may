'use client';

import { motion } from 'framer-motion';
import type { FinancialSolution } from '@/lib/data/services-config';
import * as LucideIcons from 'lucide-react';

interface FinancialCardProps {
  solution: FinancialSolution;
  index: number;
}

export function FinancialCard({ solution, index }: FinancialCardProps) {
  // Dynamically get the icon component
  const IconComponent = (LucideIcons as any)[solution.icon] || LucideIcons.Circle;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300"
    >
      {/* Icon */}
      <div className="w-14 h-14 rounded-xl bg-white/20 text-white flex items-center justify-center mb-5">
        <IconComponent className="w-7 h-7" aria-hidden="true" />
      </div>

      {/* Headline */}
      <h3 className="text-xl font-bold text-white mb-3">{solution.headline}</h3>

      {/* Description */}
      <p className="text-emerald-50 mb-4 leading-relaxed">{solution.description}</p>

      {/* Key Stat */}
      <p className="text-2xl font-black text-white">{solution.keyStat}</p>
    </motion.div>
  );
}
