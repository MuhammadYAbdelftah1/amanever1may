import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import { LazyAnimatedCard } from '@/components/shared/lazy-animated-card';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { coreValues } from '@/lib/constants';
import { Eye, Lightbulb, Shield, Handshake, LucideIcon } from 'lucide-react';

interface ValuesPageProps {
  params: Promise<{ locale: string }>;
}

// Map icon names to actual icon components
const iconMap: Record<string, LucideIcon> = {
  Eye,
  Lightbulb,
  Shield,
  Handshake,
};

export default async function ValuesPage({ params }: ValuesPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('values');

  return (
    <>
      <Header locale={locale} />
      <main id="main-content" className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-primary-50 to-white py-16 md:py-24" aria-labelledby="values-heading">
          <div className="container mx-auto px-4">
            <LazyAnimatedCard>
              <div className="text-center max-w-4xl mx-auto">
                <div className="inline-block mb-6" aria-hidden="true">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
                    <Shield className="w-8 h-8 text-primary-600" aria-hidden="true" />
                  </div>
                </div>
                <h1 id="values-heading" className="text-3xl md:text-4xl font-bold text-primary-800 mb-4">
                  {t('title')}
                </h1>
                <p className="text-lg md:text-xl text-primary-600 leading-arabic">
                  {t('subtitle')}
                </p>
                <p className="text-base md:text-lg text-neutral-700 leading-arabic mt-4">
                  {t('intro')}
                </p>
              </div>
            </LazyAnimatedCard>
          </div>
        </section>

        {/* Core Values Grid Section */}
        <section className="py-12 md:py-16" aria-label={locale === 'ar' ? 'قيمنا الأساسية' : locale === 'ur' ? 'ہماری بنیادی اقدار' : 'Our core values'}>
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {coreValues.map((value, index) => {
                  const IconComponent = iconMap[value.icon];
                  return (
                    <LazyAnimatedCard key={value.id} delay={index * 0.1}>
                      <Card className="h-full hover:shadow-lg transition-shadow">
                        <CardHeader className="text-center">
                          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                            <IconComponent className="w-8 h-8 text-primary-600" aria-hidden="true" />
                          </div>
                          <CardTitle className="text-xl font-bold text-primary-800">
                            {t(`${value.id}.title`)}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="text-center text-neutral-700 leading-arabic">
                            {t(`${value.id}.description`)}
                          </CardDescription>
                        </CardContent>
                      </Card>
                    </LazyAnimatedCard>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
