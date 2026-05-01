'use client';

import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { ABOUT_CONFIG } from '@/lib/data/about-config';

export function AboutCTA() {
  const { cta } = ABOUT_CONFIG;

  return (
    <section className="relative bg-gradient-to-br from-emerald-600 to-teal-700 py-24 md:py-32 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold text-emerald-200 uppercase tracking-wide mb-4">
            {cta.eyebrow}
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            {cta.title}
          </h2>
          <p className="text-lg md:text-xl text-emerald-50 max-w-3xl mx-auto leading-relaxed">
            {cta.sub}
          </p>
        </motion.div>

        {/* CTA cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cta.paths.map((path, index) => {
            const isExternal = path.url.startsWith('http') || path.url.startsWith('mailto');
            
            const content = (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 overflow-hidden hover:bg-white/20 transition group cursor-pointer"
              >
                {/* Image Banner - Full Width at Top */}
                <div className="w-full h-32 md:h-40 overflow-hidden bg-white/20 relative border-b-2 border-dashed border-white/40">
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-3">
                    <div className="text-xs md:text-sm font-bold text-white mb-1">
                      للمصممة
                    </div>
                    <div className="text-[10px] md:text-xs text-white/90 mb-2 px-2 leading-tight">
                      {path.forWhom}
                    </div>
                    <div className="text-[9px] text-white/80 font-semibold mb-0.5">
                      Desktop: Full Width × 160px
                    </div>
                    <div className="text-[8px] text-white/70">
                      Mobile: Full Width × 128px
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 text-center">
                  <p className="text-sm font-semibold text-emerald-200 uppercase mb-2">
                    {path.forWhom}
                  </p>
                  <p className="text-xl font-bold text-white mb-4 flex items-center justify-center gap-2">
                    <span>{path.label}</span>
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
                  </p>
                </div>
              </motion.div>
            );

            if (isExternal) {
              return (
                <a
                  key={index}
                  href={path.url}
                  target={path.url.startsWith('http') ? '_blank' : undefined}
                  rel={path.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="focus:ring-2 focus:ring-emerald-400 focus:outline-none rounded-2xl"
                >
                  {content}
                </a>
              );
            }

            return (
              <Link
                key={index}
                href={path.url}
                className="focus:ring-2 focus:ring-emerald-400 focus:outline-none rounded-2xl"
              >
                {content}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
