'use client';

import { motion } from 'framer-motion';
import type { DoctorBenefit } from '@/lib/data/services-config';

interface BenefitTileProps {
  benefit: DoctorBenefit;
  index: number;
}

export function BenefitTile({ benefit, index }: BenefitTileProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="rounded-2xl bg-white border border-slate-200 overflow-hidden hover:shadow-lg hover:border-emerald-200 transition-all duration-300"
    >
      {/* Image Banner - Full Width at Top */}
      <div className="w-full h-32 md:h-40 overflow-hidden bg-emerald-50 relative border-b-2 border-dashed border-emerald-300">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
          <div className="text-xs md:text-sm font-bold text-emerald-700 mb-1">
            للمصممة
          </div>
          <div className="text-[10px] md:text-xs text-emerald-600 mb-2 px-2 leading-tight">
            {benefit.title}
          </div>
          <div className="text-[9px] md:text-[10px] text-gray-500 font-semibold mb-0.5">
            Desktop: Full Width × 160px
          </div>
          <div className="text-[8px] md:text-[9px] text-gray-500 mb-0.5">
            Tablet: Full Width × 160px
          </div>
          <div className="text-[8px] md:text-[9px] text-gray-500">
            Mobile: Full Width × 128px
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-lg font-bold text-slate-900 mb-2">{benefit.title}</h3>

        {/* Description */}
        <p className="text-sm text-slate-600 leading-relaxed">{benefit.description}</p>
      </div>
    </motion.div>
  );
}
