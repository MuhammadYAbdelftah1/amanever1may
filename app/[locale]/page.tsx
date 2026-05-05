import { setRequestLocale, getTranslations } from 'next-intl/server';
import { HeroSection } from '@/components/home/hero-section';
import { WhyBestSection } from '@/components/home/why-best-section';
import { MembershipPricingSection } from '@/components/home/membership-pricing-section';
import { CoreServicesSection } from '@/components/home/core-services-section';
import { PackagesCarouselSection } from '@/components/home/packages-carousel-section';
import { AmanNetworkSection } from '@/components/home/aman-network-section';
import { PartnersSection } from '@/components/home/partners-section';
import { AvailableDoctorsSection } from '@/components/home/available-doctors-section';
import { TopProvidersSection } from '@/components/home/top-providers-section';
import { ExclusiveDiscountsSection } from '@/components/home/exclusive-discounts-section';
import { PersonalizedResultsSection } from '@/components/home/personalized-results-section';
import { NearbyProvidersSection } from '@/components/home/nearby-providers-section';
import { BlogPreviewSection } from '@/components/home/blog-preview-section';
import { FAQSection } from '@/components/home/faq-section';
import { FinalCTASection } from '@/components/home/final-cta-section';
import { Header } from '@/components/layout/header';
import { AppDownloadButtons } from '@/components/shared/app-download-buttons';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Enable static rendering
  setRequestLocale(locale);

  // Get translations for hero
  const t = await getTranslations('home.hero');

  return (
    <>
      <Header locale={locale} />
      <main id="main-content" className="min-h-screen">
        <HeroSection 
          locale={locale} 
          translations={{ 
            title: t('title'),
            subtitle: t('subtitle'),
            cta: t('cta')
          }} 
        />
        
        {/* Core Services Section - بعد الهيرو مباشرة */}
        <CoreServicesSection locale={locale} />
        
        {/* Mobile App Download Buttons - Only visible on mobile */}
        <div className="md:hidden py-6 px-4 bg-gradient-to-b from-slate-50 to-white">
          <div className="container mx-auto text-center">
            <p className="text-sm text-slate-600 mb-4 font-medium">حمّل التطبيق الحين</p>
            <AppDownloadButtons layout="horizontal" showHuawei={true} />
          </div>
        </div>
        
        {/* Why Best Section - المميزات */}
        <WhyBestSection locale={locale} />
        
        {/* Aman Network Section - شبكة أمان الواسعة */}
        <AmanNetworkSection locale={locale} />
        
        {/* Membership Pricing Section - البطاقات Premier & VIP */}
        <MembershipPricingSection locale={locale} />
        
        <PartnersSection locale={locale} />
        <AvailableDoctorsSection locale={locale} />
        <NearbyProvidersSection locale={locale} />
        <ExclusiveDiscountsSection locale={locale} />
        <TopProvidersSection locale={locale} />
        <PersonalizedResultsSection locale={locale} />
        <BlogPreviewSection locale={locale} />
        <FAQSection />
        <FinalCTASection />
      </main>
    </>
  );
}
