'use client';

import { AppDownloadButtons } from '@/components/shared/app-download-buttons';

interface HeroSectionProps {
  locale: string;
  translations: {
    title: string;
    subtitle: string;
    cta: string;
  };
}

export function HeroSection({ locale, translations }: HeroSectionProps) {
  return (
    <section className="relative min-h-[600px] md:min-h-[700px] lg:min-h-[92vh] xl:min-h-[95vh] flex items-center justify-center overflow-hidden rounded-3xl md:rounded-[3rem] lg:rounded-[4rem] mx-4 md:mx-6 lg:mx-8 mt-24 md:mt-28 lg:mt-32 mb-4 md:mb-6 lg:mb-8" aria-labelledby="hero-heading">
      {/* Video Background - Placeholder */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600">
        {/* Designer Notice - Remove this when video is added */}
        <div className="absolute top-4 right-4 bg-amber-400/90 backdrop-blur-sm rounded-lg px-4 py-2 text-sm font-semibold text-gray-800 shadow-lg z-30">
          ⚠️ يرجى إضافة الفيديو هنا
        </div>
        
        {/* Video Icon Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <svg className="w-32 h-32 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
          </svg>
        </div>
      </div>

      {/* Dark Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>

      {/* Hero Content */}
      <div className="relative z-20 text-center px-4 md:px-8 lg:px-12 max-w-5xl mx-auto">
        {/* Main Title */}
        <h1 
          id="hero-heading"
          className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 md:mb-8 leading-tight drop-shadow-2xl"
          style={{
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.5), 0 2px 10px rgba(0, 0, 0, 0.3)'
          }}
        >
          {translations.title}
        </h1>

        {/* Subtitle */}
        <p 
          className="text-lg md:text-xl lg:text-2xl text-white/95 mb-8 md:mb-12 leading-relaxed max-w-4xl mx-auto drop-shadow-lg"
          style={{
            textShadow: '0 2px 15px rgba(0, 0, 0, 0.5), 0 1px 8px rgba(0, 0, 0, 0.3)'
          }}
        >
          {translations.subtitle}
        </p>

        {/* CTA Button */}
        <button
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-lg md:text-xl px-8 md:px-12 py-4 md:py-5 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-emerald-500/50 mb-12 md:mb-16"
          aria-label={translations.cta}
        >
          {translations.cta}
        </button>
      </div>

      {/* App Download Buttons */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <AppDownloadButtons layout="horizontal" showHuawei={true} />
      </div>
    </section>
  );
}
