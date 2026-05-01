'use client';

import { motion } from 'framer-motion';
import type { B2BService } from '@/lib/data/services-config';
import * as LucideIcons from 'lucide-react';

interface B2BServiceRowProps {
  service: B2BService;
  index: number;
}

export function B2BServiceRow({ service, index }: B2BServiceRowProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="rounded-3xl bg-white border border-slate-200 overflow-hidden hover:shadow-xl hover:border-emerald-200 transition-all duration-300"
    >
      {/* Image Banner - Full Width at Top */}
      <div className="w-full h-48 md:h-64 overflow-hidden bg-gradient-to-br from-emerald-50 to-emerald-100 relative border-b-4 border-dashed border-emerald-300">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
          <div className="text-sm md:text-base font-bold text-emerald-700 mb-2">
            للمصممة
          </div>
          <div className="text-xs md:text-sm text-emerald-600 mb-3 px-4 leading-tight">
            {service.title}
          </div>
          <div className="text-[10px] md:text-xs text-gray-600 font-semibold mb-1">
            Desktop: Full Width × 256px
          </div>
          <div className="text-[9px] md:text-[10px] text-gray-500 mb-1">
            Tablet: Full Width × 256px
          </div>
          <div className="text-[9px] md:text-[10px] text-gray-500">
            Mobile: Full Width × 192px
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-8 md:p-10">
        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">{service.title}</h3>

        {/* Description */}
        <p className="text-base text-slate-700 leading-relaxed mb-6">{service.description}</p>

        {/* Benefits */}
        <ul className="space-y-3" role="list">
          {service.benefits.map((benefit, idx) => {
            // Extract icon name from benefit string (first word)
            const iconName = benefit.split(' ')[0];
            const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.Check;
            const benefitText = benefit.substring(benefit.indexOf(' ') + 1);
            
            return (
              <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                <IconComponent className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span>{benefitText}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </motion.article>
  );
}
