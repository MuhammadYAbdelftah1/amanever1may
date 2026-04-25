'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  change?: string;
  benchmark?: string;
  animated?: boolean;
  delay?: number;
}

export function MetricCard({
  icon,
  label,
  value,
  change,
  benchmark,
  animated = true,
  delay = 0
}: MetricCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState(animated ? '0' : value);

  useEffect(() => {
    if (!animated || !isInView) return;

    // Extract number from value string
    const numMatch = value.match(/[\d,]+/);
    if (!numMatch) {
      setDisplayValue(value);
      return;
    }

    const targetNum = parseInt(numMatch[0].replace(/,/g, ''));
    const suffix = value.replace(numMatch[0], '');
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = targetNum / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current += increment;
      
      if (step >= steps) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        const formattedNum = Math.floor(current).toLocaleString();
        setDisplayValue(formattedNum + suffix);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, value, animated]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white dark:bg-neutral-900 rounded-lg p-6 border border-neutral-200 dark:border-neutral-800 hover:shadow-lg transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="text-[#4A8B8E]">{icon}</div>
        {change && (
          <span className="text-sm font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            {change}
          </span>
        )}
      </div>
      
      <div className="space-y-1">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">{label}</p>
        <p className="text-3xl font-bold text-[#C5A572] font-mono">
          {displayValue}
        </p>
        {benchmark && (
          <p className="text-xs text-neutral-500 dark:text-neutral-500">
            {benchmark}
          </p>
        )}
      </div>
    </motion.div>
  );
}
