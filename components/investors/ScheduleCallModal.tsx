'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { CalScheduler } from './CalScheduler';

interface ScheduleCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  isRTL?: boolean;
  title?: string;
}

export function ScheduleCallModal({ 
  isOpen, 
  onClose, 
  isRTL = false,
  title = 'Schedule a Call'
}: ScheduleCallModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-800">
          <h2 className="text-2xl font-bold text-[#1A2B2C] dark:text-white">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6 text-neutral-600 dark:text-neutral-400" />
          </button>
        </div>

        {/* Cal.com Embed */}
        <div className="p-6">
          <CalScheduler isRTL={isRTL} />
        </div>
      </div>
    </div>
  );
}
