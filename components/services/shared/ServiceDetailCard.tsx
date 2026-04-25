'use client';

import { ArrowLeft, Check } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { PatientService } from '@/lib/data/services-config';
import * as LucideIcons from 'lucide-react';

interface ServiceDetailCardProps {
  service: PatientService;
  index: number;
}

export function ServiceDetailCard({ service, index }: ServiceDetailCardProps) {
  // Dynamically get the icon component
  const IconComponent = (LucideIcons as any)[service.icon] || LucideIcons.Circle;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group rounded-3xl bg-white border border-slate-200 p-6 md:p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      {/* Icon */}
      <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5">
        <IconComponent className="w-7 h-7" aria-hidden="true" />
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold text-slate-900 mb-2">{service.title}</h3>

      {/* Tagline */}
      <p className="text-sm font-semibold text-emerald-600 mb-4">{service.tagline}</p>

      {/* Description */}
      <p className="text-base text-slate-700 leading-relaxed mb-5">{service.description}</p>

      {/* Features List */}
      <ul className="space-y-2 mb-6" role="list">
        {service.features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
            <Check
              className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <span>{feature.text}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        href={service.cta.href}
        className="inline-flex items-center gap-2 text-emerald-600 font-bold hover:text-emerald-700 transition-colors group/link"
      >
        <span>{service.cta.text}</span>
        <ArrowLeft
          className="w-5 h-5 group-hover/link:-translate-x-1 transition-transform"
          aria-hidden="true"
        />
      </Link>
    </motion.article>
  );
}
