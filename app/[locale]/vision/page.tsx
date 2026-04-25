import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import { LazyAnimatedCard } from '@/components/shared/lazy-animated-card';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Target, Lightbulb, TrendingUp, Heart } from 'lucide-react';

interface VisionPageProps {
  params: Promise<{ locale: string }>;
}

export default async function VisionPage({ params }: VisionPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('vision');

  return (
    <>
      <Header locale={locale} />
      <main id="main-content" className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-primary-50 to-white py-16 md:py-24" aria-labelledby="vision-main-heading">
          <div className="container mx-auto px-4">
            <LazyAnimatedCard>
              <div className="text-center max-w-4xl mx-auto">
                <div className="inline-block mb-6" aria-hidden="true">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
                    <Target className="w-8 h-8 text-primary-600" aria-hidden="true" />
                  </div>
                </div>
                <h1 id="vision-main-heading" className="text-3xl md:text-4xl font-bold text-primary-800 mb-4">
                  {t('title')}
                </h1>
                <p className="text-lg md:text-xl text-primary-600 leading-arabic">
                  {locale === 'ar' 
                    ? 'نحو مستقبل صحي رقمي متكامل'
                    : locale === 'ur'
                    ? 'ایک مربوط ڈیجیٹل صحت کے مستقبل کی طرف'
                    : 'Towards a Comprehensive Digital Health Future'
                  }
                </p>
              </div>
            </LazyAnimatedCard>
          </div>
        </section>

        {/* Vision Statement Section */}
        <section className="py-12 md:py-16" aria-labelledby="vision-statement-heading">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <LazyAnimatedCard delay={0.1}>
                <article className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg p-8 md:p-12">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0" aria-hidden="true">
                      <Lightbulb className="w-6 h-6 text-primary-600" aria-hidden="true" />
                    </div>
                    <h2 id="vision-statement-heading" className="text-2xl md:text-3xl font-bold text-primary-800">
                      {t('visionTitle')}
                    </h2>
                  </div>
                  <p className="text-neutral-800 leading-arabic text-lg mb-6 text-start">
                    {t('visionDescription')}
                  </p>
                  <div className="bg-white/60 rounded-lg p-6 mt-6">
                    <p className="text-neutral-700 leading-arabic text-start">
                      {t('visionGoal')}
                    </p>
                  </div>
                </article>
              </LazyAnimatedCard>
            </div>
          </div>
        </section>

        {/* Mission Statement Section */}
        <section className="py-12 md:py-16 bg-neutral-50" aria-labelledby="mission-statement-heading">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <LazyAnimatedCard delay={0.1}>
                <article className="bg-white rounded-lg p-8 md:p-12 shadow-sm">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0" aria-hidden="true">
                      <Heart className="w-6 h-6 text-primary-600" aria-hidden="true" />
                    </div>
                    <h2 id="mission-statement-heading" className="text-2xl md:text-3xl font-bold text-primary-800">
                      {t('missionTitle')}
                    </h2>
                  </div>
                  <p className="text-neutral-700 leading-arabic text-lg text-start">
                    {t('missionDescription')}
                  </p>
                </article>
              </LazyAnimatedCard>
            </div>
          </div>
        </section>

        {/* Saudi Vision 2030 Commitment Section */}
        <section className="py-12 md:py-16 bg-primary-800 text-white" aria-labelledby="saudi-vision-heading">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <LazyAnimatedCard delay={0.1}>
                <div className="text-center mb-12">
                  <div className="inline-block mb-6" aria-hidden="true">
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto">
                      <TrendingUp className="w-8 h-8 text-white" aria-hidden="true" />
                    </div>
                  </div>
                  <h2 id="saudi-vision-heading" className="text-2xl md:text-3xl font-bold mb-4">
                    {locale === 'ar' 
                      ? 'التزامنا برؤية السعودية 2030'
                      : locale === 'ur'
                      ? 'سعودی ویژن 2030 کے ساتھ ہماری وابستگی'
                      : 'Our Commitment to Saudi Vision 2030'
                    }
                  </h2>
                  <p className="text-lg leading-arabic text-white/90 max-w-3xl mx-auto">
                    {locale === 'ar' 
                      ? 'نفخر بمساهمتنا الفاعلة في تحقيق مستهدفات رؤية المملكة 2030 في التحول الصحي والتقني'
                      : locale === 'ur'
                      ? 'ہم صحت اور تکنیکی تبدیلی میں سعودی ویژن 2030 کے اہداف کے حصول میں اپنے فعال تعاون پر فخر محسوس کرتے ہیں'
                      : 'We are proud to actively contribute to achieving Saudi Vision 2030 targets in health and technical transformation'
                    }
                  </p>
                </div>
              </LazyAnimatedCard>

              <div className="grid md:grid-cols-3 gap-6 mt-12">
                <LazyAnimatedCard delay={0.2}>
                  <article className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold mb-2">
                      {locale === 'ar' 
                        ? 'التحول الصحي'
                        : locale === 'ur'
                        ? 'صحت کی تبدیلی'
                        : 'Health Transformation'
                      }
                    </h3>
                    <p className="text-sm text-white/80 leading-arabic text-center">
                      {locale === 'ar' 
                        ? 'تحويل تجربة الرعاية الصحية إلى نظام رقمي شامل'
                        : locale === 'ur'
                        ? 'صحت کی دیکھ بھال کے تجربے کو ایک جامع ڈیجیٹل نظام میں تبدیل کرنا'
                        : 'Transforming healthcare experience into a comprehensive digital system'
                      }
                    </p>
                  </article>
                </LazyAnimatedCard>

                <LazyAnimatedCard delay={0.3}>
                  <article className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold mb-2">
                      {locale === 'ar' 
                        ? 'التحول التقني'
                        : locale === 'ur'
                        ? 'تکنیکی تبدیلی'
                        : 'Technical Transformation'
                      }
                    </h3>
                    <p className="text-sm text-white/80 leading-arabic text-center">
                      {locale === 'ar' 
                        ? 'استغلال أحدث التقنيات لتحسين الخدمات الصحية'
                        : locale === 'ur'
                        ? 'صحت کی خدمات کو بہتر بنانے کے لیے جدید ترین ٹیکنالوجیز کا استعمال'
                        : 'Leveraging latest technologies to improve healthcare services'
                      }
                    </p>
                  </article>
                </LazyAnimatedCard>

                <LazyAnimatedCard delay={0.4}>
                  <article className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold mb-2">
                      {locale === 'ar' 
                        ? 'خدمة المجتمع'
                        : locale === 'ur'
                        ? 'کمیونٹی کی خدمت'
                        : 'Community Service'
                      }
                    </h3>
                    <p className="text-sm text-white/80 leading-arabic text-center">
                      {locale === 'ar' 
                        ? 'ربط المجتمع بأفضل الخدمات الطبية والصحية'
                        : locale === 'ur'
                        ? 'کمیونٹی کو بہترین طبی اور صحت کی خدمات سے جوڑنا'
                        : 'Connecting community with the best medical and healthcare services'
                      }
                    </p>
                  </article>
                </LazyAnimatedCard>
              </div>
            </div>
          </div>
        </section>

        {/* Inspirational Image Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <LazyAnimatedCard delay={0.1}>
                <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
                  <Image
                    src="/images/about/vision.jpg"
                    alt={locale === 'ar' 
                      ? 'رؤيتنا للمستقبل'
                      : locale === 'ur'
                      ? 'مستقبل کے لیے ہماری ویژن'
                      : 'Our Vision for the Future'
                    }
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1200px"
                    loading="lazy"
                    quality={85}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-8 text-white text-start">
                      <h3 className="text-2xl md:text-3xl font-bold mb-2">
                        {locale === 'ar' 
                          ? 'معاً نحو مستقبل صحي أفضل'
                          : locale === 'ur'
                          ? 'مل کر ایک بہتر صحت مند مستقبل کی طرف'
                          : 'Together Towards a Better Healthy Future'
                        }
                      </h3>
                      <p className="text-lg leading-arabic">
                        {locale === 'ar' 
                          ? 'نبني جسراً رقمياً يربط المجتمع بأفضل الخدمات الطبية'
                          : locale === 'ur'
                          ? 'ہم ایک ڈیجیٹل پل بنا رہے ہیں جو کمیونٹی کو بہترین طبی خدمات سے جوڑتا ہے'
                          : 'Building a digital bridge connecting the community with the best medical services'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </LazyAnimatedCard>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
