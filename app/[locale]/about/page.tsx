/**
 * About Us Page — /ar/about
 * Establishes credibility, mission, vision, values for Aman Ever.
 * Not a sales page — trust-building primary, conversion secondary.
 * 
 * TODO before launch:
 * [ ] Verify founding year in Hero stats bar (currently placeholder "2026").
 * [ ] Verify all 6 service descriptions match actual product offerings.
 * [ ] Confirm "partner count" in stats bar (500+) matches Social Proof section.
 * [ ] Confirm PDPL compliance is actually certified (not just claimed).
 * [ ] Confirm MOH licensing language with legal team.
 * [ ] Create OG image at /og/about.jpg (1200x630).
 * [ ] Add real social media URLs in Organization schema sameAs array.
 * [ ] Create /ar/doctor-platform and /ar/download routes before linking from CTA.
 */

import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { AboutHero } from '@/components/about/about-hero';
import { AboutMission } from '@/components/about/about-mission';
import { AboutVisionServices } from '@/components/about/about-vision-services';
import { AboutValues } from '@/components/about/about-values';
import { AboutTrust } from '@/components/about/about-trust';
import { AboutCTA } from '@/components/about/about-cta';
import { Header } from '@/components/layout/header';

export const metadata: Metadata = {
  title: 'من نحن | أمان إيفر — شريككم الذكي في رحلة الرعاية الطبية',
  description: 'تعرف على أمان إيفر، منصة تقنية سعودية رائدة في الرعاية الصحية الرقمية، متوافقة مع رؤية المملكة 2030. اكتشف رسالتنا، رؤيتنا، وقيمنا.',
  openGraph: {
    title: 'من نحن | أمان إيفر',
    description: 'منصة تقنية سعودية رائدة في الرعاية الصحية الرقمية',
    type: 'website',
    locale: 'ar_SA',
    images: [
      {
        url: '/og/about.jpg', // TODO: Create OG image
        width: 1200,
        height: 630,
      },
    ],
  },
  alternates: {
    canonical: '/ar/about',
    languages: {
      'ar-SA': '/ar/about',
      // 'en-SA': '/en/about', // TODO: Add when English version exists
    },
  },
};

// Organization Schema for SEO
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'أمان إيفر والرعاية الشاملة للخدمات الطبية',
  alternateName: 'Aman Ever',
  legalName: 'AMAN EVER COMPANY & COMPREHENSIVE CARE OF MEDICAL SERVICES',
  url: 'https://amanever.com',
  logo: 'https://amanever.com/images/logo.png',
  description: 'منصة تقنية سعودية رائدة في الرعاية الصحية الرقمية',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'جدة',
    addressRegion: 'مكة المكرمة',
    addressCountry: 'SA',
    streetAddress: 'البغدادية الشرقية، مبنى البغدادية بلازا',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+966920018041',
      contactType: 'customer service',
      availableLanguage: ['Arabic', 'English'],
    },
  ],
  sameAs: [
    // TODO: Add real social media URLs
    // 'https://facebook.com/amanever',
    // 'https://instagram.com/amanever',
    // 'https://twitter.com/amanever',
  ],
  taxID: '7038166471',
};

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Enable static rendering
  setRequestLocale(locale);

  return (
    <>
      {/* Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />

      <Header locale={locale} />
      <main id="main-content">
        <AboutHero />
        <AboutMission />
        <AboutVisionServices />
        <AboutValues />
        <AboutTrust />
        <AboutCTA />
      </main>
    </>
  );
}
