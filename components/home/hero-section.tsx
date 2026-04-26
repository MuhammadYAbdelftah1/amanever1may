'use client';

import { AppDownloadButtons } from '@/components/shared/app-download-buttons';
import Image from 'next/image';

interface HeroSectionProps {
  locale: string;
  translations: {
    title: string;
  };
}

export function HeroSection({ locale, translations }: HeroSectionProps) {
  return (
    <section className="relative min-h-[600px] md:min-h-[700px] lg:min-h-[92vh] xl:min-h-[95vh] flex items-center justify-center overflow-hidden rounded-3xl md:rounded-[3rem] lg:rounded-[4rem] mx-4 md:mx-6 lg:mx-8 mt-24 md:mt-28 lg:mt-32 mb-4 md:mb-6 lg:mb-8" aria-labelledby="hero-heading">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="https://img.youtube.com/vi/W5Dm2WCk8jg/maxresdefault.jpg"
          alt="Hero background"
          fill
          className="object-cover"
          priority
          quality={90}
        />
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
