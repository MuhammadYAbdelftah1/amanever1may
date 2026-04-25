'use client';

import { motion } from 'framer-motion';
import type { DoctorBenefit } from '@/lib/data/services-config';
import * as LucideIcons from 'lucide-react';

interface BenefitTileProps {
  benefit: DoctorBenefit;
  index: number;
}

export function BenefitTile({ benefit, index }: BenefitTileProps) {
  // Dynamically get the icon component
  const IconComponent = (LucideIcons as any)[benefit.icon] || LucideIcons.Circle;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="rounded-2xl bg-white border border-slate-200 p-6 hover:shadow-lg hover:border-emerald-200 transition-all duration-300"
    >
      {/* Icon */}
      <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
        <IconComponent className="w-6 h-6" aria-hidden="true" />
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-slate-900 mb-2">{benefit.title}</h3>

      {/* Description */}
      <p className="text-sm text-slate-600 leading-relaxed">{benefit.description}</p>
    </motion.div>
  );
}
