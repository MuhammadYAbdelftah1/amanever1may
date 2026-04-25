/**
 * Blog Preview Section (Section 8)
 * Shows the 3 most recent blog posts on the homepage.
 * 
 * TODO before launch:
 * - Connect to real CMS (Strapi / Sanity / Contentful / custom).
 * - Replace placeholder articles with actual published content.
 * - Verify author names and credentials.
 * - Ensure cover images are licensed for commercial use.
 * - Add Arabic slug handling for SEO-friendly URLs.
 * 
 * Placement: After <MedicalNetwork />, before <FAQ />
 */

/**
 * Editorial Rules for Aman Ever Blog (applies to content team, not the component):
 * - Every medical article must be reviewed by a licensed practitioner.
 * - Cite authoritative sources (WHO, MOH Saudi Arabia, peer-reviewed journals).
 * - Titles must be factual, not clickbait. Avoid "This one trick will..." patterns.
 * - Keep excerpts under 160 characters.
 * - Never diagnose or prescribe — always include "consult a doctor" language.
 * - Publish in Arabic first, translate to English as needed.
 */

'use client';

import { ArrowLeft, Clock, User } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface BlogPreviewSectionProps {
  locale: string;
  posts?: BlogPost[];
}

type BlogAuthor = {
  name: string;
  avatar?: string;
  title?: string;
};

type BlogPost = {
  id: string;
  slug: string;
  coverImage: string;
  category: string;
  publishedDate: string;
  title: string;
  excerpt: string;
  author: BlogAuthor;
  readTimeMinutes: number;
};

// TODO: Replace placeholder articles with real posts from the CMS/API.
// Do not publish with placeholder article data.
// Verify all medical claims with editorial team before publishing.
const placeholderPosts: BlogPost[] = [
  {
    id: '1',
    slug: '/blog/periodic-checkups-guide',
    coverImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
    category: 'صحة عامة',
    publishedDate: '2026-04-20',
    title: 'أهمية الفحوصات الدورية: دليلك للكشف المبكر عن الأمراض',
    excerpt: 'تعرف على الفحوصات الأساسية الموصى بها حسب العمر والجنس، وكيف يمكن للكشف المبكر أن ينقذ حياتك من أمراض خطيرة.',
    author: {
      name: 'د. خالد السقاف',
      title: 'استشاري أمراض القلب',
    },
    readTimeMinutes: 5,
  },
  {
    id: '2',
    slug: '/blog/digital-health-vision-2030',
    coverImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
    category: 'تقنية صحية',
    publishedDate: '2026-04-15',
    title: 'التحول الرقمي الصحي في المملكة 2030: أين نحن الآن؟',
    excerpt: 'كيف تساهم التقنيات الحديثة ومنصات مثل أمان إيفر في تحقيق أهداف رؤية 2030 في قطاع الرعاية الصحية.',
    author: {
      name: 'فريق أمان إيفر',
    },
    readTimeMinutes: 7,
  },
  {
    id: '3',
    slug: '/blog/5-heart-healthy-habits',
    coverImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
    category: 'نصائح وقائية',
    publishedDate: '2026-04-10',
    title: '5 عادات يومية تحمي قلبك من أمراض الأوعية الدموية',
    excerpt: 'عادات بسيطة وعلمية موصى بها من جمعية القلب الأمريكية، يمكنك تطبيقها اليوم لحماية صحة قلبك على المدى الطويل.',
    author: {
      name: 'د. هند الغامدي',
    },
    readTimeMinutes: 4,
  },
];

const content = {
  eyebrow: 'مدونة أمان',
  title: 'معلومات صحية موثوقة من خبراء المجال',
  subtitle: 'محتوى طبي مبسّط، نصائح من أطباء متخصصين، وآخر التطورات في الرعاية الصحية الرقمية في المملكة.',
  seeAll: 'شوف كل المقالات',
  readMore: 'اقرأ المقال',
};

function formatArabicDate(isoDate: string): string {
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

function BlogCard({ post, index, locale }: { post: BlogPost; index: number; locale: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const [formattedDate, setFormattedDate] = useState('');
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  // Format date on client side to avoid hydration mismatch
  useEffect(() => {
    setFormattedDate(formatArabicDate(post.publishedDate));
  }, [post.publishedDate]);

  // Get initials for avatar fallback
  const initials = post.author.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <article
      ref={ref}
      className={`group rounded-2xl overflow-hidden bg-white border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${
        isVisible ? 'animate-in fade-in slide-in-from-bottom-4' : 'opacity-0'
      }`}
      style={{
        animationDelay: `${index * 150}ms`,
        animationFillMode: 'forwards',
      }}
    >
      <Link href={`/${locale}${post.slug}`} className="block">
        {/* Cover Image */}
        <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="p-5 md:p-6">
          {/* Category & Date */}
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
              {post.category}
            </span>
            <span className="text-xs text-slate-500">·</span>
            <time dateTime={post.publishedDate} className="text-xs text-slate-500" suppressHydrationWarning>
              {formattedDate || post.publishedDate}
            </time>
          </div>

          {/* Title */}
          <h3 className="text-lg md:text-xl font-bold text-slate-900 leading-snug mb-2 line-clamp-2">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm md:text-base text-slate-600 leading-relaxed mb-4 line-clamp-2">
            {post.excerpt}
          </p>

          {/* Author & Read Time */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2">
              {/* Avatar */}
              {post.author.avatar ? (
                <div className="relative w-8 h-8 rounded-full overflow-hidden">
                  <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                  {initials}
                </div>
              )}
              <div className="flex flex-col">
                <span className="text-xs font-medium text-slate-700">{post.author.name}</span>
                {post.author.title && (
                  <span className="text-xs text-slate-500">{post.author.title}</span>
                )}
              </div>
            </div>

            {/* Read Time */}
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <Clock className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{post.readTimeMinutes} دقائق</span>
            </div>
          </div>

          {/* Read More Link */}
          <div className="mt-4">
            <span className="text-primary font-semibold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
              {content.readMore}
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export function BlogPreviewSection({ locale, posts }: BlogPreviewSectionProps) {
  const displayPosts = posts || placeholderPosts;

  return (
    <section className="py-20 md:py-28 bg-slate-50" aria-labelledby="blog-preview-heading">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12 md:mb-16">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              {content.eyebrow}
            </p>
            <h2
              id="blog-preview-heading"
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
            >
              {content.title}
            </h2>
            <p className="text-lg text-slate-600">{content.subtitle}</p>
          </div>

          {/* See All Link */}
          <Link
            href={`/${locale}/blog`}
            className="text-primary font-semibold hover:text-primary/80 inline-flex items-center gap-1.5 transition-colors duration-200 whitespace-nowrap"
          >
            {content.seeAll}
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {displayPosts.slice(0, 3).map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}
