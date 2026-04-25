import { getTranslations } from 'next-intl/server';
import { 
  Shield, 
  Globe, 
  Zap, 
  Calendar, 
  Home, 
  MessageCircle, 
  Wallet, 
  CreditCard,
  Star
} from 'lucide-react';

interface WhyUsSectionProps {
  locale: string;
}

const features = [
  {
    id: 'inclusive',
    icon: Shield,
    gradient: 'from-blue-500 to-cyan-500',
    size: 'large' as const,
  },
  {
    id: 'coverage',
    icon: Globe,
    gradient: 'from-purple-500 to-pink-500',
    size: 'medium' as const,
  },
  {
    id: 'speed',
    icon: Zap,
    gradient: 'from-yellow-500 to-orange-500',
    size: 'medium' as const,
  },
  {
    id: 'booking',
    icon: Calendar,
    gradient: 'from-green-500 to-emerald-500',
    size: 'small' as const,
  },
  {
    id: 'home-care',
    icon: Home,
    gradient: 'from-indigo-500 to-blue-500',
    size: 'small' as const,
  },
  {
    id: 'response',
    icon: MessageCircle,
    gradient: 'from-pink-500 to-rose-500',
    size: 'medium' as const,
  },
  {
    id: 'financial',
    icon: Wallet,
    gradient: 'from-teal-500 to-cyan-500',
    size: 'small' as const,
  },
  {
    id: 'payment',
    icon: CreditCard,
    gradient: 'from-violet-500 to-purple-500',
    size: 'small' as const,
  },
  {
    id: 'transparency',
    icon: Star,
    gradient: 'from-amber-500 to-yellow-500',
    size: 'medium' as const,
  },
];

export async function WhyUsSection({ locale }: WhyUsSectionProps) {
  const t = await getTranslations('home.whyUs');

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            {t('title')}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const sizeClasses = {
              large: 'md:col-span-2 md:row-span-2',
              medium: 'md:col-span-2',
              small: 'md:col-span-1',
            };

            return (
              <div
                key={feature.id}
                className={`group relative overflow-hidden rounded-2xl md:rounded-3xl bg-white border-2 border-gray-100 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] ${sizeClasses[feature.size]}`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                {/* Content */}
                <div className={`relative p-6 md:p-8 h-full flex flex-col ${feature.size === 'large' ? 'justify-center' : 'justify-start'}`}>
                  {/* Icon */}
                  <div className={`mb-4 md:mb-6 ${feature.size === 'large' ? 'flex justify-center' : ''}`}>
                    <div className={`relative ${feature.size === 'large' ? 'w-20 h-20 md:w-24 md:h-24' : 'w-14 h-14 md:w-16 md:h-16'}`}>
                      <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl opacity-10 group-hover:opacity-20 transition-opacity duration-500 group-hover:scale-110 group-hover:rotate-6`} />
                      <div className={`relative w-full h-full flex items-center justify-center bg-gradient-to-br ${feature.gradient} rounded-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                        <Icon className="w-1/2 h-1/2 text-white" strokeWidth={2} />
                      </div>
                    </div>
                  </div>

                  {/* Text */}
                  <div className={feature.size === 'large' ? 'text-center' : ''}>
                    <h3 className={`font-bold mb-2 md:mb-3 group-hover:text-primary transition-colors duration-300 ${feature.size === 'large' ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'}`}>
                      {t(`features.${feature.id}.title`)}
                    </h3>
                    <p className={`text-muted-foreground leading-relaxed ${feature.size === 'large' ? 'text-base md:text-lg max-w-2xl mx-auto' : 'text-sm md:text-base'}`}>
                      {t(`features.${feature.id}.description`)}
                    </p>
                  </div>

                  {/* Decorative Element */}
                  <div className={`absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br ${feature.gradient} rounded-full opacity-0 group-hover:opacity-10 blur-2xl transition-all duration-500 group-hover:scale-150`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
