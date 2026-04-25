'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { ReactNode } from 'react';

export interface FAQItemData {
  id: string;
  question: string;
  answer: ReactNode;
  category?: 'identity' | 'comparison' | 'value' | 'coverage' | 'refund' | 'privacy' | 'support' | 'action';
}

interface FAQItemProps {
  item: FAQItemData;
  isOpen: boolean;
  onToggle: () => void;
}

export function FAQItem({ item, isOpen, onToggle }: FAQItemProps) {
  return (
    <div id={item.id} className="border-b border-slate-200 last:border-b-0">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`${item.id}-answer`}
        className="flex items-center justify-between w-full py-5 md:py-6 text-right cursor-pointer group"
      >
        <ChevronDown
          className={`w-6 h-6 text-emerald-600 transition-transform duration-300 flex-shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        />
        <span className="text-lg md:text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition ps-4">
          {item.question}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`${item.id}-answer`}
            role="region"
            aria-labelledby={item.id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="pb-6 text-base text-slate-700 leading-relaxed space-y-3">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
