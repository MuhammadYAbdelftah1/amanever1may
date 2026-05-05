/**
 * Partners Section (شركاء "أمان".. شركاء الثقة)
 * Displays partner logos with links in an infinite scrolling marquee
 */

'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { partners } from '@/lib/data/partners-config';

interface PartnersSectionProps {
  locale: string;
}

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
            شركاء &quot;أمان&quot;.. شركاء الثقة
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
          className="flex gap-12 md:gap-20 items-center py-8 overflow-x-scroll scrollbar-hide"
          style={{ scrollBehavior: 'auto' }}
        >
          {duplicatedPartners.map((partner, index) => (
            <a
              key={`${partner.id}-${index}`}
              href={partner.website || partner.social || '#'}
              target={partner.website || partner.social ? '_blank' : '_self'}
              rel={partner.website || partner.social ? 'noopener noreferrer' : undefined}
              className="flex flex-col items-center justify-center gap-4 group cursor-pointer flex-shrink-0 px-4"
              aria-label={`زيارة موقع ${partner.name}`}
            >
              {/* Partner Logo */}
              <div className="relative w-32 h-32 md:w-40 md:h-40 grayscale group-hover:grayscale-0 transition-all duration-500 opacity-60 group-hover:opacity-100">
                <Image
                  src={partner.logo}
                  alt={`شعار ${partner.name}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 128px, 160px"
                />
              </div>
              
              {/* Partner Name */}
              <p className="text-[#4d8080] font-bold text-sm md:text-base text-center whitespace-normal max-w-[160px] group-hover:text-[#3d6a6a] transition-colors">
                {locale === 'ar' ? partner.name : partner.nameEn}
              </p>
            </a>
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
