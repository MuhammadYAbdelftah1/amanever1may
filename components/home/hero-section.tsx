'use client';

import { AppDownloadButtons } from '@/components/shared/app-download-buttons';

interface HeroSectionProps {
  locale: string;
  translations: {
    title: string;
  };
}

export function HeroSection({ locale, translations }: HeroSectionProps) {
  return (
    <section className="relative min-h-[600px] md:min-h-[700px] lg:min-h-[92vh] xl:min-h-[95vh] flex items-center justify-center overflow-hidden rounded-3xl md:rounded-[3rem] lg:rounded-[4rem] mx-4 md:mx-6 lg:mx-8 mt-24 md:mt-28 lg:mt-32 mb-4 md:mb-6 lg:mb-8" aria-labelledby="hero-heading">
      {/* Placeholder Banner - Needs Video */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-8">
          {/* Designer Notice */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12 max-w-2xl text-center border-4 border-amber-400">
            <div className="flex items-center justify-center gap-3 mb-4">
              <svg className="w-8 h-8 md:w-10 md:h-10 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">إشعار للمصممة</h2>
            </div>
            <p className="text-xl md:text-2xl font-semibold text-gray-700 mb-2">
              نحتاج هنا فيديو
            </p>
            <p className="text-sm md:text-base text-gray-600">
              يرجى استبدال هذا البانر بفيديو الهيرو المناسب
            </p>
          </div>
          
          {/* Video Icon Placeholder */}
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-8">
            <svg className="w-20 h-20 md:w-24 md:h-24 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
            </svg>
          </div>
        </div>
      </div>

      {/* App Download Buttons */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <AppDownloadButtons layout="horizontal" showHuawei={true} />
      </div>


    </section>
  );
}
