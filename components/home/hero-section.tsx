import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/shared/logo';
import { AppDownloadButtons } from '@/components/shared/app-download-buttons';
import Link from 'next/link';

interface HeroSectionProps {
  locale: string;
}

export async function HeroSection({ locale }: HeroSectionProps) {
  const t = await getTranslations('home.hero');

  return (
    <section className="relative min-h-[600px] md:min-h-[700px] lg:min-h-[92vh] xl:min-h-[95vh] flex items-center justify-center overflow-hidden rounded-3xl md:rounded-[3rem] lg:rounded-[4rem] mx-4 md:mx-6 lg:mx-8 my-4 md:my-6 lg:my-8" aria-labelledby="hero-heading">
      {/* YouTube Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <iframe
          className="absolute top-1/2 left-1/2 w-[300%] h-[300%] pointer-events-none"
          style={{
            minWidth: '100vw',
            minHeight: '100vh',
            transform: 'translate(-50%, -30%)', // Changed from -40% to -30% to move video down more
          }}
          src="https://www.youtube.com/embed/W5Dm2WCk8jg?autoplay=1&mute=1&loop=1&playlist=W5Dm2WCk8jg&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&vq=hd720"
          title="Hero background video"
          allow="autoplay; encrypted-media"
        />
        {/* Dark overlay for better text readability - reduced from 60% to 40% */}
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
            {t('title')}
          </h2>
          
          <div className="flex justify-center items-center">
            <AppDownloadButtons layout="horizontal" showHuawei={true} />
          </div>
        </div>
      </div>
    </section>
  );
}
