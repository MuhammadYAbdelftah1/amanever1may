import { getTranslations } from 'next-intl/server';
import { services } from '@/lib/constants';
import { ServiceCard } from '@/components/shared/service-card';

interface ServicesSectionProps {
  locale: string;
}

export async function ServicesSection({ locale }: ServicesSectionProps) {
  const t = await getTranslations();

  return (
    <section className="py-8 md:py-10 bg-background" aria-labelledby="services-section-heading">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 id="services-section-heading" className="text-3xl md:text-4xl font-bold mb-2">
            {t('home.services.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('home.services.subtitle')}
          </p>
        </div>

        {/* Horizontal Scrollable Container */}
        <div className="relative w-full overflow-hidden">
          <div 
            className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide scroll-smooth py-4 justify-start px-[calc(50vw-160px)] md:px-[calc(50vw-180px)]"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {services.map((service, index) => (
              <ServiceCard
                key={service.id}
                icon={service.icon}
                title={t(service.titleKey)}
                description={t(service.descriptionKey)}
                href={`/${locale}${service.href}`}
                delay={index * 0.1}
              />
            ))}
          </div>
          
          {/* Scroll Indicator */}
          <div className="text-center mt-4">
            <p className="text-sm text-muted-foreground">
              {locale === 'ar' ? '← مرر لرؤية المزيد →' : locale === 'ur' ? '← مزید دیکھنے کے لیے سکرول کریں →' : '← Scroll to see more →'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
