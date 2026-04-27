import { setRequestLocale, getTranslations } from 'next-intl/server';
import { HeroSection } from '@/components/home/hero-section';
import { HowItWorksSection } from '@/components/home/how-it-works-section';
import { MembershipPricingSection } from '@/components/home/membership-pricing-section';
import { CoreServicesSection } from '@/components/home/core-services-section';
import { WhyAmanEverSection } from '@/components/home/why-aman-ever-section';
import { MedicalNetworkSection } from '@/components/home/medical-network-section';
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
        <HeroSection locale={locale} translations={{ title: t('title') }} />
        
        {/* Mobile App Download Buttons - Only visible on mobile */}
        <div className="md:hidden py-6 px-4 bg-gradient-to-b from-slate-50 to-white">
          <div className="container mx-auto text-center">
            <p className="text-sm text-slate-600 mb-4 font-medium">حمّل التطبيق الحين</p>
            <AppDownloadButtons layout="horizontal" showHuawei={true} />
          </div>
        </div>
        
        <CoreServicesSection locale={locale} />
        <WhyAmanEverSection locale={locale} />
        <HowItWorksSection locale={locale} />
        <MembershipPricingSection locale={locale} />
        <MedicalNetworkSection locale={locale} />
        <BlogPreviewSection locale={locale} />
        <FAQSection />
        <FinalCTASection />
      </main>
    </>
  );
}
