'use client';

import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

// Lazy load AnimatedCard component
const AnimatedCard = dynamic(
  () => import('./animated-card').then((mod) => ({ default: mod.AnimatedCard })),
  {
    ssr: false,
    loading: () => <div className="opacity-0" />,
  }
);

interface LazyAnimatedCardProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function LazyAnimatedCard({ children, delay = 0, className }: LazyAnimatedCardProps) {
  return (
    <AnimatedCard delay={delay} className={className}>
      {children}
    </AnimatedCard>
  );
}
