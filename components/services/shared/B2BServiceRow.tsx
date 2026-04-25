'use client';

import { motion } from 'framer-motion';
import type { B2BService } from '@/lib/data/services-config';
import * as LucideIcons from 'lucide-react';

interface B2BServiceRowProps {
  service: B2BService;
  index: number;
}

export function B2BServiceRow({ service, index }: B2BServiceRowProps) {
  // Dynamically get the icon component
  const IconComponent = (LucideIcons as any)[service.icon] || LucideIcons.Circle;
  
  // Alternate layout: even indices have icon on right, odd on left
  const isReversed = index % 2 === 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center ${
        isReversed ? 'md:flex-row-reverse' : ''
      }`}
    >
      {/* Icon Side */}
      <div
        className={`flex items-center justify-center ${isReversed ? 'md:order-2' : 'md:order-1'}`}
      >
        <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-600 flex items-center justify-center">
          <IconComponent className="w-16 h-16" aria-hidden="true" />
        </div>
      </div>

      {/* Content Side */}
      <div className={isReversed ? 'md:order-1' : 'md:order-2'}>
        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">{service.title}</h3>

        {/* Description */}
        <p className="text-base text-slate-700 leading-relaxed mb-6">{service.description}</p>

        {/* Benefits */}
        <ul className="space-y-3" role="list">
          {service.benefits.map((benefit, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
              <span className="text-lg flex-shrink-0" aria-hidden="true">
                {benefit.split(' ')[0]}
              </span>
              <span>{benefit.substring(benefit.indexOf(' ') + 1)}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}
