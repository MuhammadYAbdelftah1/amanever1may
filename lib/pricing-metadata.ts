/**
 * Pricing Page Metadata Generator
 * Generates dynamic metadata for pricing page
 */

import { Metadata } from 'next';

export function generatePricingMetadata(locale: string = 'ar'): Metadata {
  const isArabic = locale === 'ar';

  const title = isArabic
    ? 'البطاقات والباقات — أسعار العضوية الصحية في السعودية | أمان إيفر'
    : 'Plans & Pricing — Healthcare Membership Prices in Saudi Arabia | Aman Ever';

  const description = isArabic
    ? 'اكتشف باقات أمان إيفر — بطاقة عضوية صحية بخصومات تصل 80% بدون موافقات مسبقة. ابتداءً من 199 ريال/شهر. شبكة 500+ منشأة طبية في السعودية.'
    : 'Discover Aman Ever plans — healthcare membership card with up to 80% discounts without prior approvals. Starting from 199 SAR/month. Network of 500+ medical facilities in Saudi Arabia.';

  const keywords = isArabic
    ? [
        'أسعار التأمين الصحي السعودية',
        'بطاقة عضوية صحية',
        'خصومات طبية السعودية',
        'بديل التأمين الصحي',
        'رعاية منزلية بأسعار مخفضة',
        'أمان إيفر باقات',
        'تأمين صحي رخيص',
        'خصومات المستشفيات السعودية',
        'بطاقة خصومات طبية',
        'رعاية صحية ميسرة',
      ]
    : [
        'health insurance prices saudi arabia',
        'healthcare membership card',
        'medical discounts saudi arabia',
        'health insurance alternative',
        'affordable home care',
        'aman ever plans',
        'cheap health insurance',
        'hospital discounts saudi arabia',
        'medical discount card',
        'affordable healthcare',
      ];

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: isArabic ? 'ar_SA' : 'en_US',
      url: `https://amanever.com/${locale}/pricing`,
      siteName: 'Aman Ever',
      images: [
        {
          url: '/images/og-pricing.jpg',
          width: 1200,
          height: 630,
          alt: isArabic
            ? 'باقات أمان إيفر - ابتداءً من 199 ريال'
            : 'Aman Ever Plans - Starting from 199 SAR',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/og-pricing.jpg'],
      creator: '@amanever',
      site: '@amanever',
    },
    alternates: {
      canonical: `https://amanever.com/${locale}/pricing`,
      languages: {
        ar: 'https://amanever.com/ar/pricing',
        en: 'https://amanever.com/en/pricing',
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

/**
 * Generate JSON-LD structured data for pricing page
 */
export function generatePricingStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      // Organization
      {
        '@type': 'Organization',
        '@id': 'https://amanever.com/#organization',
        name: 'Aman Ever',
        url: 'https://amanever.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://amanever.com/images/logo.png',
        },
        sameAs: [
          'https://twitter.com/amanever',
          'https://facebook.com/amanever',
          'https://instagram.com/amanever',
          'https://linkedin.com/company/amanever',
        ],
      },
      // WebPage
      {
        '@type': 'WebPage',
        '@id': 'https://amanever.com/ar/pricing#webpage',
        url: 'https://amanever.com/ar/pricing',
        name: 'البطاقات والباقات — أسعار العضوية الصحية في السعودية',
        description:
          'اكتشف باقات أمان إيفر — بطاقة عضوية صحية بخصومات تصل 80% بدون موافقات مسبقة.',
        inLanguage: 'ar',
        isPartOf: {
          '@id': 'https://amanever.com/#website',
        },
      },
      // BreadcrumbList
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://amanever.com/ar/pricing#breadcrumb',
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
      },
      // Products
      {
        '@type': 'ItemList',
        '@id': 'https://amanever.com/ar/pricing#products',
        itemListElement: [
          {
            '@type': 'Product',
            position: 1,
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
              url: 'https://amanever.com/ar/pricing#basic',
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.8',
              reviewCount: '1250',
              bestRating: '5',
              worstRating: '1',
            },
          },
          {
            '@type': 'Product',
            position: 2,
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
              url: 'https://amanever.com/ar/pricing#plus',
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.8',
              reviewCount: '1250',
              bestRating: '5',
              worstRating: '1',
            },
          },
          {
            '@type': 'Product',
            position: 3,
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
              url: 'https://amanever.com/ar/pricing#vip',
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.8',
              reviewCount: '1250',
              bestRating: '5',
              worstRating: '1',
            },
          },
        ],
      },
    ],
  };
}
