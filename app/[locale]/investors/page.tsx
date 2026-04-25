import { Metadata } from 'next';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { InvestorsPageContent } from './InvestorsPageContent';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'investors' });

  const title = locale === 'ar' 
    ? 'علاقات المستثمرين | أمان إيفر — منصة العضوية الصحية الرائدة في السعودية'
    : 'Investor Relations | Aman Ever — Saudi Arabia\'s Leading Healthtech Membership Platform';
  
  const description = locale === 'ar'
    ? 'أمان إيفر تعيد تعريف الوصول للرعاية الصحية في السوق السعودي البالغ 67 مليار دولار. نجمع حالياً جولة Series A. اطلع على عرضنا، نمونا، وخارطة طريقنا نحو Unicorn.'
    : 'Aman Ever is redefining healthcare access in Saudi Arabia\'s $67B market. Currently raising Series A. View our deck, traction, and roadmap to unicorn.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
      images: [
        {
          url: `/og-investors-${locale}.png`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`/og-investors-${locale}.png`],
    },
    alternates: {
      canonical: `/${locale}/investors`,
      languages: {
        'ar': '/ar/investors',
        'en': '/en/investors',
      },
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function InvestorsPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  
  return <InvestorsPageContent locale={locale} />;
}
