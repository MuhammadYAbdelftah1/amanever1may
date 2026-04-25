'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface AboutSectionProps {
  locale: string;
}

const stats = [
  { id: 'partners', value: 500, suffix: '+', labelKey: 'partners' },
  { id: 'users', value: 10000, suffix: '+', labelKey: 'users' },
  { id: 'cities', value: 50, suffix: '+', labelKey: 'cities' },
  { id: 'discount', value: 80, suffix: '%', labelKey: 'discount' },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-bold text-primary">
      {count.toLocaleString()}
      {suffix}
    </div>
  );
}

export function AboutSection({ locale }: AboutSectionProps) {
  const t = useTranslations('home.about');

  const highlights = [
    { key: 'vision2030', icon: Check },
    { key: 'partners', icon: Check },
    { key: 'technology', icon: Check },
  ];

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t('title')}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Main Content - Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16 max-w-6xl mx-auto">
          {/* Left: Image/Video */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5 aspect-[4/3] lg:aspect-auto lg:min-h-[400px] group">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Placeholder - Replace with actual image */}
              <div className="relative w-full h-full">
                <Image
                  src="/images/logo.png"
                  alt={t('title')}
                  fill
                  className="object-contain p-12 transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </div>
            {/* Decorative Elements */}
            <div className="absolute top-4 right-4 w-20 h-20 bg-primary/20 rounded-full blur-2xl" />
            <div className="absolute bottom-4 left-4 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
          </div>

          {/* Right: Content */}
          <div className="flex flex-col justify-center">
            <p className="text-lg md:text-xl text-foreground leading-relaxed mb-6">
              {t('description')}
            </p>

            {/* Highlights */}
            <div className="space-y-4">
              {highlights.map((highlight) => {
                const Icon = highlight.icon;
                return (
                  <div
                    key={highlight.key}
                    className="flex items-start gap-3 group"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 group-hover:bg-primary/20 transition-colors duration-300">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-base md:text-lg text-foreground">
                      {t(`highlights.${highlight.key}`)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto mb-12">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="text-center p-6 rounded-2xl bg-white border-2 border-gray-100 hover:border-primary/30 hover:shadow-lg transition-all duration-300 group"
            >
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <p className="text-sm md:text-base text-muted-foreground mt-2 group-hover:text-foreground transition-colors duration-300">
                {t(`stats.${stat.labelKey}`)}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            asChild
            size="lg"
            className="text-base md:text-lg px-8 py-6 rounded-xl hover:scale-105 transition-transform duration-300"
          >
            <Link href={`/${locale}/about`}>
              {t('cta')}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
