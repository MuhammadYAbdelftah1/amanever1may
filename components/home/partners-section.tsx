import { getTranslations } from 'next-intl/server';

interface PartnersSectionProps {
  locale: string;
}

const partners = [
  { id: 1, name: 'Dr. Sulaiman Al Habib', logo: '/images/partners/habib.png' },
  { id: 2, name: 'Mouwasat Hospital', logo: '/images/partners/mouwasat.png' },
  { id: 3, name: 'Dallah Hospital', logo: '/images/partners/dallah.png' },
  { id: 4, name: 'King Faisal Specialist Hospital', logo: '/images/partners/kfsh.png' },
  { id: 5, name: 'Saudi German Hospital', logo: '/images/partners/saudi-german.png' },
  { id: 6, name: 'Al Hammadi Hospital', logo: '/images/partners/hammadi.png' },
  { id: 7, name: 'Care Hospital', logo: '/images/partners/care.png' },
  { id: 8, name: 'Al Moosa Hospital', logo: '/images/partners/moosa.png' },
];

export async function PartnersSection({ locale }: PartnersSectionProps) {
  const t = await getTranslations('home.partners');

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-background to-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t('title')}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Infinite Marquee */}
        <div className="relative overflow-hidden">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

          {/* Marquee Container */}
          <div className="partners-marquee-container">
            <div className="partners-marquee-content">
              {/* First Set of Logos */}
              {partners.map((partner) => (
                <div
                  key={`first-${partner.id}`}
                  className="partners-marquee-item group"
                >
                  <div className="relative w-40 h-24 md:w-48 md:h-28 flex items-center justify-center p-6 bg-white rounded-xl border-2 border-gray-100 transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-lg">
                    {/* Placeholder for logo - replace with actual Image component */}
                    <div className="w-full h-full flex items-center justify-center text-gray-400 group-hover:text-primary transition-colors duration-300 grayscale group-hover:grayscale-0">
                      <div className="text-center">
                        <div className="text-xs md:text-sm font-semibold line-clamp-2">
                          {partner.name}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Duplicate Set for Infinite Effect */}
              {partners.map((partner) => (
                <div
                  key={`second-${partner.id}`}
                  className="partners-marquee-item group"
                  aria-hidden="true"
                >
                  <div className="relative w-40 h-24 md:w-48 md:h-28 flex items-center justify-center p-6 bg-white rounded-xl border-2 border-gray-100 transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-lg">
                    <div className="w-full h-full flex items-center justify-center text-gray-400 group-hover:text-primary transition-colors duration-300 grayscale group-hover:grayscale-0">
                      <div className="text-center">
                        <div className="text-xs md:text-sm font-semibold line-clamp-2">
                          {partner.name}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trust Badge */}
        <div className="text-center mt-12">
          <p className="text-sm md:text-base text-muted-foreground">
            {t('trustBadge')}
          </p>
        </div>
      </div>
    </section>
  );
}
