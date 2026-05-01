/**
 * Partners Section (شركاء النجاح)
 * Displays partner logos/names in an infinite scrolling marquee
 */

'use client';

import { useRef, useEffect } from 'react';

interface PartnersSectionProps {
  locale: string;
}

const partners = [
  { id: 1, name: 'مستشفى د. سليمان الحبيب', nameEn: 'Dr. Sulaiman Al Habib' },
  { id: 2, name: 'مستشفى المواساة', nameEn: 'Mouwasat Hospital' },
  { id: 3, name: 'مستشفى دله', nameEn: 'Dallah Hospital' },
  { id: 4, name: 'السعودي الألماني الصحية', nameEn: 'Saudi German Health' },
  { id: 5, name: 'صيدليات النهدي', nameEn: 'Nahdi Pharmacy' },
  { id: 6, name: 'صيدليات الدواء', nameEn: 'Al-Dawaa Pharmacy' },
  { id: 7, name: 'فتنس تايم', nameEn: 'Fitness Time' },
  { id: 8, name: 'بوبا العربية', nameEn: 'Bupa Arabia' },
  { id: 9, name: 'مستشفيات مغربي', nameEn: 'Magrabi Hospitals' },
  { id: 10, name: 'فقيه كير', nameEn: 'Fakeeh Care' },
];

export function PartnersSection({ locale }: PartnersSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollPos = 0;
    let animationId: number;
    let isPaused = false;

    const scroll = () => {
      if (!isPaused && scrollContainer) {
        scrollPos += 0.8;
        scrollContainer.scrollLeft = scrollPos;

        // When we reach the middle, reset to start (seamless because content is duplicated)
        const maxScroll = scrollContainer.scrollWidth / 2;
        if (scrollPos >= maxScroll) {
          scrollPos = 0;
          scrollContainer.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    const handleMouseEnter = () => { isPaused = true; };
    const handleMouseLeave = () => { isPaused = false; };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Duplicate partners for seamless loop
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="py-16 md:py-24 bg-slate-50/50 overflow-hidden border-y border-gray-100">
      <div className="container mx-auto px-4 mb-12 md:mb-16">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl md:text-5xl font-black text-[#4d8080] mb-4 tracking-tight">
            شركاء النجاح
          </h2>
          <div className="w-24 h-1.5 bg-[#4d8080] rounded-full mb-6" />
          <p className="text-[#4d8080]/80 font-bold text-lg md:text-xl max-w-3xl">
            نفخر بشراكتنا مع نخبة من أكبر المستشفيات والمراكز الطبية والصحية والتجميلية في المملكة
          </p>
        </div>
      </div>

      {/* Infinite Scrolling Partners */}
      <div className="relative">
        {/* Gradient overlays */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

        <div
          ref={scrollRef}
          className="flex gap-16 md:gap-32 items-center whitespace-nowrap py-8 overflow-x-scroll scrollbar-hide"
          style={{ scrollBehavior: 'auto' }}
        >
          {duplicatedPartners.map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500 opacity-40 hover:opacity-100 px-4"
            >
              <span className="text-[#4d8080] font-black text-2xl md:text-3xl">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Hide Scrollbar */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
