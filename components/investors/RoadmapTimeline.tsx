'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { TrendingUp, Sparkles } from 'lucide-react';

interface RoadmapItem {
  quarter: string;
  milestone: string;
}

interface RoadmapTimelineProps {
  items: RoadmapItem[];
  isRTL?: boolean;
}

export function RoadmapTimeline({ items, isRTL = false }: RoadmapTimelineProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="relative py-12">
      {/* Vertical Line */}
      <motion.div
        initial={{ height: 0 }}
        animate={isInView ? { height: '100%' } : { height: 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className={`absolute top-0 ${isRTL ? 'right-4 md:right-1/2' : 'left-4 md:left-1/2'} w-0.5 bg-gradient-to-b from-[#4A8B8E] via-[#C5A572] to-[#10B981]`}
      />

      <div className="space-y-12">
        {items.map((item, index) => {
          const isUnicorn = item.milestone.includes('🦄') || item.milestone.toLowerCase().includes('unicorn');
          const isIPO = item.milestone.includes('IPO');
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isRTL ? 50 : -50 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex items-center ${isRTL ? 'md:flex-row-reverse' : ''} ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline Dot */}
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                className={`absolute ${isRTL ? 'right-2.5 md:right-[calc(50%-8px)]' : 'left-2.5 md:left-[calc(50%-8px)]'} w-4 h-4 rounded-full ${
                  isUnicorn || isIPO
                    ? 'bg-[#C5A572] ring-4 ring-[#C5A572]/20'
                    : 'bg-[#4A8B8E] ring-4 ring-[#4A8B8E]/20'
                }`}
              />

              {/* Content Card */}
              <div className={`${isRTL ? 'mr-12 md:mr-0' : 'ml-12 md:ml-0'} w-full md:w-[calc(50%-2rem)] ${
                index % 2 === 0 ? (isRTL ? 'md:ml-auto md:mr-8' : 'md:mr-auto md:ml-8') : (isRTL ? 'md:mr-auto md:ml-8' : 'md:ml-auto md:mr-8')
              }`}>
                <div className={`p-6 rounded-lg border-2 transition-all hover:shadow-lg ${
                  isUnicorn || isIPO
                    ? 'bg-gradient-to-br from-[#C5A572]/10 to-[#C5A572]/5 border-[#C5A572]/30'
                    : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800'
                }`}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                      isUnicorn || isIPO
                        ? 'bg-[#C5A572] text-white'
                        : 'bg-[#4A8B8E] text-white'
                    }`}>
                      {item.quarter}
                    </span>
                    {(isUnicorn || isIPO) && (
                      <span className="flex items-center">
                        {isUnicorn ? (
                          <Sparkles className="w-6 h-6 text-[#C5A572]" />
                        ) : (
                          <TrendingUp className="w-6 h-6 text-[#10B981]" />
                        )}
                      </span>
                    )}
                  </div>
                  <p className={`${isUnicorn || isIPO ? 'text-lg font-bold text-[#4A8B8E]' : 'text-base text-[#4A8B8E]'} ${
                    isRTL ? 'text-right' : 'text-left'
                  }`}>
                    {item.milestone.replace('🦄', '')}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
