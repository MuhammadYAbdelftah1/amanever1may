import type { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { ServicesHero } from '@/components/services/ServicesHero';
import { AudienceTabs } from '@/components/services/AudienceTabs';
import { ServicesForPatients } from '@/components/services/ServicesForPatients';
import { ServicesForDoctors } from '@/components/services/ServicesForDoctors';
import { ServicesForPartners } from '@/components/services/ServicesForPartners';
import { ServicesForAffiliates } from '@/components/services/ServicesForAffiliates';
import { ServicesCTA } from '@/components/services/ServicesCTA';

// ============================================================================
// METADATA
// ============================================================================

export const metadata: Metadata = {
  title: 'خدماتنا | أمان إيفر — منظومة رقمية متكاملة للرعاية الصحية',
  description:
    'اكتشف خدمات أمان إيفر: الرعاية الطبية عن بُعد، الخدمات المنزلية، المتجر الإلكتروني، باقات العضوية، منصة الأطباء، وحلول B2B للمنشآت الطبية.',
  openGraph: {
    title: 'خدماتنا | أمان إيفر — منظومة رقمية متكاملة للرعاية الصحية',
    description:
      'اكتشف خدمات أمان إيفر: الرعاية الطبية عن بُعد، الخدمات المنزلية، المتجر الإلكتروني، باقات العضوية، منصة الأطباء، وحلول B2B للمنشآت الطبية.',
    type: 'website',
    locale: 'ar_SA',
  },
  alternates: {
    canonical: '/ar/services',
  },
};

// ============================================================================
// SCHEMA.ORG JSON-LD
// ============================================================================

const servicesSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      name: 'الرعاية الطبية عن بُعد',
      provider: {
        '@type': 'Organization',
        name: 'أمان إيفر',
      },
      serviceType: 'Telemedicine',
      areaServed: {
        '@type': 'Country',
        name: 'Saudi Arabia',
      },
      description: 'استشارة طبية فورية مع أطباء متخصصين عبر مكالمة فيديو آمنة',
    },
    {
      '@type': 'Service',
      name: 'الرعاية المنزلية',
      provider: {
        '@type': 'Organization',
        name: 'أمان إيفر',
      },
      serviceType: 'Home Healthcare',
      areaServed: {
        '@type': 'Country',
        name: 'Saudi Arabia',
      },
      description: 'خدمات طبية متخصصة في مقر إقامتك',
    },
    {
      '@type': 'Service',
      name: 'متجر أمان الإلكتروني',
      provider: {
        '@type': 'Organization',
        name: 'أمان إيفر',
      },
      serviceType: 'E-commerce',
      areaServed: {
        '@type': 'Country',
        name: 'Saudi Arabia',
      },
      description: 'منتجات وخدمات طبية بأسعار مخفضة',
    },
    {
      '@type': 'Service',
      name: 'باقات وبطاقات أمان إيفر',
      provider: {
        '@type': 'Organization',
        name: 'أمان إيفر',
      },
      serviceType: 'Membership',
      areaServed: {
        '@type': 'Country',
        name: 'Saudi Arabia',
      },
      description: 'عضوية سنوية تمنحك خصومات تصل إلى 80% على الخدمات الطبية',
    },
  ],
};

// ============================================================================
// PAGE COMPONENT
// ============================================================================

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />

      <Header locale={locale} />

      <main id="main-content" className="min-h-screen">
        {/* Section 1: Hero */}
        <ServicesHero />

        {/* Audience Tabs (with sticky behavior) */}
        <AudienceTabs />

        {/* Section 2: Services for Patients (B2C) */}
        <ServicesForPatients />

        {/* Section 4: Services for Doctors */}
        <ServicesForDoctors />

        {/* Section 5: Services for Partners (B2B) */}
        <ServicesForPartners />

        {/* Section 6: Affiliate Program (Wealth Journey) */}
        <ServicesForAffiliates />

        {/* Section 7: Final CTA */}
        <ServicesCTA />
      </main>
    </>
  );
}

// Force static generation
export const dynamic = 'force-static';
