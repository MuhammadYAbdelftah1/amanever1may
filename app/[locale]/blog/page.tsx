import { setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { BlogHero } from '@/components/blog/BlogHero';
import { BlogGrid } from '@/components/blog/BlogGrid';
import { getAllPosts, getAllCategories } from '@/data/blog-data';

export const metadata: Metadata = {
  title: 'المدونة — معلومات صحية موثوقة | أمان إيفر',
  description: 'مقالات طبية مراجعة من أطباء متخصصين. نصائح صحية، معلومات وقائية، وآخر التطورات في الرعاية الصحية الرقمية في المملكة.',
  keywords: [
    'مدونة طبية',
    'نصائح صحية',
    'معلومات طبية',
    'صحة',
    'وقاية',
    'رعاية صحية',
    'السعودية',
  ],
  openGraph: {
    title: 'المدونة — معلومات صحية موثوقة | أمان إيفر',
    description: 'مقالات طبية مراجعة من أطباء متخصصين. نصائح صحية ومعلومات وقائية.',
    type: 'website',
    locale: 'ar_SA',
    images: [
      {
        url: '/images/og-blog.jpg',
        width: 1200,
        height: 630,
        alt: 'مدونة أمان إيفر',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'المدونة — معلومات صحية موثوقة | أمان إيفر',
    description: 'مقالات طبية مراجعة من أطباء متخصصين',
    images: ['/images/og-blog.jpg'],
  },
  alternates: {
    canonical: '/ar/blog',
  },
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
      name: 'المدونة',
      item: 'https://amanever.com/ar/blog',
    },
  ],
};

// Blog Schema
const blogSchema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'مدونة أمان إيفر',
  description: 'مقالات طبية موثوقة ونصائح صحية من أطباء متخصصين',
  url: 'https://amanever.com/ar/blog',
  publisher: {
    '@type': 'Organization',
    name: 'أمان إيفر',
    logo: {
      '@type': 'ImageObject',
      url: 'https://amanever.com/images/logo.png',
    },
  },
  inLanguage: 'ar',
};

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const posts = getAllPosts();
  const categories = getAllCategories();

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      <Header locale={locale} />

      <main id="main-content" className="min-h-screen bg-white pt-20">
        <BlogHero />
        <BlogGrid posts={posts} categories={categories} />
      </main>
    </>
  );
}
