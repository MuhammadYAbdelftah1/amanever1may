'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { audienceTabs } from '@/lib/data/services-config';
import type { AudienceTab } from '@/lib/data/services-config';
import * as LucideIcons from 'lucide-react';

export function AudienceTabs() {
  const [activeTab, setActiveTab] = useState<AudienceTab['id']>('patients');
  const [isSticky, setIsSticky] = useState(false);

  // Handle scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100; // Account for sticky header
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  // Intersection Observer to update active tab based on scroll position
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          const tab = audienceTabs.find((t) => t.sectionId === sectionId);
          if (tab) {
            setActiveTab(tab.id);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    audienceTabs.forEach((tab) => {
      const element = document.getElementById(tab.sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  // Detect when tabs should become sticky
  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.querySelector('[aria-labelledby="services-hero-title"]');
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        setIsSticky(heroBottom < 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Main Tabs (Below Hero) */}
      <section
        className="py-12 bg-white border-b border-slate-100"
        aria-label="اختر الفئة المناسبة لك"
      >
        <div className="container mx-auto px-4">
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto"
            role="tablist"
            aria-label="فئات الخدمات"
          >
            {audienceTabs.map((tab, index) => {
              const IconComponent = (LucideIcons as any)[tab.icon] || LucideIcons.Circle;
              const isActive = activeTab === tab.id;

              return (
                <motion.button
                  key={tab.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => {
                    setActiveTab(tab.id);
                    scrollToSection(tab.sectionId);
                  }}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={tab.sectionId}
                  className={`rounded-2xl border-2 bg-white p-6 cursor-pointer transition-all duration-300 text-start ${
                    isActive
                      ? 'border-emerald-500 bg-emerald-50 shadow-lg'
                      : 'border-slate-200 hover:border-emerald-500 hover:shadow-lg'
                  }`}
                >
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                      isActive
                        ? 'bg-emerald-100 text-emerald-600'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <IconComponent className="w-6 h-6" aria-hidden="true" />
                  </div>

                  {/* Label */}
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{tab.label}</h3>

                  {/* Description */}
                  <p className="text-sm text-slate-600">{tab.description}</p>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sticky Compact Tabs (Desktop Only) */}
      {isSticky && (
        <div className="hidden md:block sticky top-0 bg-white/95 backdrop-blur-sm border-b border-slate-200 z-20 py-3 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-4">
              {audienceTabs.map((tab) => {
                const IconComponent = (LucideIcons as any)[tab.icon] || LucideIcons.Circle;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={`sticky-${tab.id}`}
                    onClick={() => {
                      setActiveTab(tab.id);
                      scrollToSection(tab.sectionId);
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all ${
                      isActive
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-600'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" aria-hidden="true" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
