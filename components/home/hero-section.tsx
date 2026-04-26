'use client';

import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/shared/logo';
import { AppDownloadButtons } from '@/components/shared/app-download-buttons';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface HeroSectionProps {
  locale: string;
  translations: {
    title: string;
  };
}

export function HeroSection({ locale, translations }: HeroSectionProps) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Load video after initial page load (after 1 second)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVideoLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-[600px] md:min-h-[700px] lg:min-h-[92vh] xl:min-h-[95vh] flex items-center justify-center overflow-hidden rounded-3xl md:rounded-[3rem] lg:rounded-[4rem] mx-4 md:mx-6 lg:mx-8 mt-24 md:mt-28 lg:mt-32 mb-4 md:mb-6 lg:mb-8" aria-labelledby="hero-heading">
      {/* Background - Video or Fallback */}
      <div className="absolute inset-0 w-full h-full">
        {!isVideoLoaded ? (
          // Fallback: YouTube thumbnail while video loads
          <>
            <Image
              src="https://img.youtube.com/vi/W5Dm2WCk8jg/maxresdefault.jpg"
              alt="Hero background"
              fill
              className="object-cover"
              priority
              quality={90}
            />
          </>
        ) : (
          // YouTube Video Background - Lazy loaded
          <iframe
            className="absolute top-1/2 left-1/2 w-[300%] h-[300%] pointer-events-none"
            style={{
              minWidth: '100vw',
              minHeight: '100vh',
              transform: 'translate(-50%, -50%) translateY(0)',
            }}
            src="https://www.youtube.com/embed/W5Dm2WCk8jg?autoplay=1&mute=1&loop=1&playlist=W5Dm2WCk8jg&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&vq=hd720"
            title="Hero background video"
            allow="autoplay; encrypted-media"
            loading="lazy"
          />
        )}
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="container px-4 relative z-10 h-full flex flex-col justify-end min-h-[600px] md:min-h-[700px] lg:min-h-[92vh] xl:min-h-[95vh]">
        
        {/* Bottom Section - Content at the very bottom */}
        <div className="pb-8 md:pb-12 lg:pb-16 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-3 md:mb-4 text-white drop-shadow-lg leading-tight mt-14" style={{ transform: 'perspective(500px) rotateX(10deg)', transformOrigin: 'bottom' }}>
            أمان إيفر
          </h1>
          
          <h2 id="hero-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 md:mb-10 max-w-4xl mx-auto text-white drop-shadow-lg leading-relaxed" style={{ transform: 'perspective(500px) rotateX(10deg)', transformOrigin: 'bottom' }}>
            {translations.title}
          </h2>
          
          <div className="flex justify-center items-center">
            <AppDownloadButtons layout="horizontal" showHuawei={true} />
          </div>
        </div>
      </div>
    </section>
  );
}
