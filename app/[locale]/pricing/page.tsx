import { setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { PricingHero } from '@/components/pricing/PricingHero';
import { AnchorBlock } from '@/components/pricing/AnchorBlock';
import { QuickComparison } from '@/components/pricing/QuickComparison';
import { PricingPlans } from '@/components/pricing/PricingPlans';
import { SavingsCalculator } from '@/components/pricing/SavingsCalculator';
import { ComparisonTable } from '@/components/pricing/ComparisonTable';
import { InsuranceComparison } from '@/components/pricing/InsuranceComparison';
import { PricingTestimonials } from '@/components/pricing/PricingTestimonials';
import { B2BSection } from '@/components/pricing/B2BSection';
import { PricingFAQ } from '@/components/pricing/PricingFAQ';
import { FinalCTA } from '@/components/pricing/FinalCTA';
import { StickyCTA } from '@/components/pricing/StickyCTA';

export const metadata: Metadata = {
  title: 'البطاقات والباقات — أسعار العضوية الصحية في السعودية | أمان إيفر',
  description: 'اكتشف باقات أمان إيفر — بطاقة عضوية صحية بخصومات تصل 80% بدون موافقات مسبقة. ابتداءً من 199 ريال/شهر. شبكة 500+ منشأة طبية في السعودية.',
  keywords: [
    'أسعار التأمين الصحي السعودية',
    'بطاقة عضوية صحية',
    'خصومات طبية السعودية',
    'بديل التأمين الصحي',
    'رعاية منزلية بأسعار مخفضة',
    'أمان إيفر باقات',
  ],
  openGraph: {
    title: 'البطاقات والباقات — أسعار العضوية الصحية في السعودية | أمان إيفر',
    description: 'اكتشف باقات أمان إيفر — بطاقة عضوية صحية بخصومات تصل 80% بدون موافقات مسبقة. ابتداءً من 199 ريال/شهر.',
    type: 'website',
    locale: 'ar_SA',
    images: [
      {
        url: '/images/og-pricing.jpg',
        width: 1200,
        height: 630,
        alt: 'باقات أمان إيفر - ابتداءً من 199 ريال',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'البطاقات والباقات — أسعار العضوية الصحية في السعودية | أمان إيفر',
    description: 'اكتشف باقات أمان إيفر — بطاقة عضوية صحية بخصومات تصل 80% بدون موافقات مسبقة.',
    images: ['/images/og-pricing.jpg'],
  },
};

// Generate Product Schema for each plan
const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: [
    {
      '@type': 'Product',
      name: 'أمان - الباقة الأساسية',
      description: 'بطاقة عضوية صحية بخصومات حتى 50% على 200+ منشأة طبية',
      brand: {
        '@type': 'Brand',
        name: 'أمان إيفر',
      },
      offers: {
        '@type': 'Offer',
        price: '199',
        priceCurrency: 'SAR',
        availability: 'https://schema.org/InStock',
        priceValidUntil: '2026-12-31',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '1250',
      },
    },
    {
      '@type': 'Product',
      name: 'أمان بلس - الباقة الموصى بها',
      description: 'بطاقة عضوية صحية بخصومات حتى 70% على 500+ منشأة طبية',
      brand: {
        '@type': 'Brand',
        name: 'أمان إيفر',
      },
      offers: {
        '@type': 'Offer',
        price: '349',
        priceCurrency: 'SAR',
        availability: 'https://schema.org/InStock',
        priceValidUntil: '2026-12-31',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '1250',
      },
    },
    {
      '@type': 'Product',
      name: 'أمان VIP - الباقة المميزة',
      description: 'بطاقة عضوية صحية بخصومات حتى 80% على كامل الشبكة الطبية',
      brand: {
        '@type': 'Brand',
        name: 'أمان إيفر',
      },
      offers: {
        '@type': 'Offer',
        price: '699',
        priceCurrency: 'SAR',
        availability: 'https://schema.org/InStock',
        priceValidUntil: '2026-12-31',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '1250',
      },
    },
  ],
};

// Breadcrumb Schema
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'الرئيسية',
      item: 'https://amanever.com/ar',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'البطاقات والباقات',
      item: 'https://amanever.com/ar/pricing',
    },
  ],
};

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Header locale={locale} />
      
      {/* Sticky CTA for Mobile */}
      <StickyCTA />
      
      <main id="main-content" className="min-h-screen bg-white">
        {/* Hero Section */}
        <PricingHero />

        {/* Anchor Block - Loss Aversion */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <AnchorBlock />
          </div>
        </section>

        {/* Quick Comparison - Above the fold */}
        <section className="py-12 bg-[#F8FAFB]">
          <div className="container mx-auto px-4 max-w-6xl">
            <QuickComparison />
          </div>
        </section>

        {/* Pricing Plans */}
        <section id="plans" className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <PricingPlans />
          </div>
        </section>

        {/* Savings Calculator */}
        <section className="py-16 bg-[#F8FAFB]">
          <div className="container mx-auto px-4 max-w-6xl">
            <SavingsCalculator />
          </div>
        </section>

        {/* Detailed Comparison Table */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#1A2B2C] mb-4">
                قارن بالتفصيل: كم تخسر بدون البطاقة؟
              </h2>
              <p className="text-lg text-[#5A6B6C] max-w-3xl mx-auto">
                شوف الفرق الواضح بين الاستمرار بدون بطاقة والاشتراك في أمان إيفر
              </p>
            </div>
            <ComparisonTable />
          </div>
        </section>

        {/* Insurance Comparison */}
        <section className="py-16 bg-[#F8FAFB]">
          <div className="container mx-auto px-4 max-w-6xl">
            <InsuranceComparison />
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-[#1A2B2C] text-center mb-12">
              ماذا يقول عملاؤنا
            </h2>
            <PricingTestimonials />
          </div>
        </section>

        {/* B2B Section */}
        <section className="py-16 bg-[#F8FAFB]">
          <div className="container mx-auto px-4 max-w-6xl">
            <B2BSection />
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-[#1A2B2C] text-center mb-12">
              الأسئلة الشائعة
            </h2>
            <PricingFAQ />
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-gradient-to-br from-[#4A8B8E] to-[#356B6E]">
          <div className="container mx-auto px-4 max-w-6xl">
            <FinalCTA />
          </div>
        </section>

        {/* Legal Disclaimer */}
        <section className="py-8 bg-[#F8FAFB]">
          <div className="container mx-auto px-4 max-w-6xl">
            <p className="text-xs text-[#5A6B6C] text-center leading-relaxed">
              أمان إيفر بطاقة عضوية للحصول على خصومات. ليست بديلاً عن التأمين الصحي الإلزامي. 
              الأرقام التوضيحية مبنية على متوسطات السوق. النتائج الفعلية تختلف حسب الاستخدام.
              مرخص من وزارة الصحة · مسجل تجارياً 7038166471 · متوافق مع PDPL/SDAIA.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
