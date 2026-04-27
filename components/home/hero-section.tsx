'use client';

import { AppDownloadButtons } from '@/components/shared/app-download-buttons';
import Image from 'next/image';
import Link from 'next/link';

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
          {/* Main Headline */}
          <h1 id="hero-heading" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 md:mb-6 max-w-5xl mx-auto text-white drop-shadow-2xl leading-tight" style={{ transform: 'perspective(500px) rotateX(10deg)', transformOrigin: 'bottom' }}>
            خصم حتى <span className="text-emerald-400">٨٠٪</span> على زياراتك الطبية
            <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-2">بدون تأمين</span>
          </h1>
          
          {/* Subheading */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-3 md:mb-6 max-w-3xl mx-auto text-white/95 drop-shadow-lg leading-relaxed">
            بطاقة عضوية سنوية — خصومات فورية في <strong className="text-emerald-300">٥٠٠+</strong> مستشفى وعيادة.
            <br className="hidden sm:block" />
            <span className="hidden sm:inline">ما فيه موافقات مسبقة، ما فيه انتظار.</span>
          </p>
          
          {/* Price Hook */}
          <p className="text-sm sm:text-base md:text-lg mb-4 md:mb-8 text-white/90 drop-shadow-lg">
            من <span className="font-bold text-emerald-300 text-lg sm:text-xl md:text-2xl">١٩٩ ر.س/سنة</span>
            <span className="hidden sm:inline"> — قسّطها عبر <strong>تابي</strong> أو <strong>تمارا</strong></span>
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center mb-4 md:mb-8">
            <Link 
              href="/ar/register" 
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-base md:text-lg px-6 md:px-8 py-3 md:py-4 rounded-xl shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105 w-full sm:w-auto"
            >
              احصل على بطاقتك الحين
            </Link>
            <Link 
              href="/ar/pricing" 
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold text-base md:text-lg px-6 md:px-8 py-3 md:py-4 rounded-xl border-2 border-white/30 hover:border-white/50 transition-all duration-300 w-full sm:w-auto"
            >
              احسب وفّرتك
            </Link>
          </div>
          
          {/* Trust Bar - Horizontal on all screens */}
          <div className="flex flex-row flex-wrap justify-center items-center gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm md:text-base text-white/90 mb-4 md:mb-8">
            <span className="flex items-center gap-1 sm:gap-2">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              وزارة الصحة
            </span>
            <span className="flex items-center gap-1 sm:gap-2">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              PDPL
            </span>
          </div>
          
          {/* App Download Buttons - Hidden on mobile, shown on tablet+ */}
          <div className="hidden md:flex justify-center items-center">
            <AppDownloadButtons layout="horizontal" showHuawei={true} />
          </div>
        </div>
      </div>
    </section>
  );
}
