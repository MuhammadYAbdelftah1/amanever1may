'use client';

import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

// Lazy load AnimatedSection component
const AnimatedSection = dynamic(
  () => import('./animated-section').then((mod) => ({ default: mod.AnimatedSection })),
  {
    ssr: false,
    loading: () => <div className="opacity-0" />,
  }
);

interface LazyAnimatedSectionProps {
  children: ReactNode;
  stagger?: boolean;
  staggerDelay?: number;
  className?: string;
}

export function LazyAnimatedSection({
  children,
  stagger = false,
  staggerDelay = 0.1,
  className,
}: LazyAnimatedSectionProps) {
  return (
    <AnimatedSection stagger={stagger} staggerDelay={staggerDelay} className={className}>
      {children}
    </AnimatedSection>
  );
}
