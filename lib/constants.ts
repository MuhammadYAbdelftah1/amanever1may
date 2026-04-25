import { Locale } from '@/routing';

export interface Service {
  id: string;
  icon: string;
  titleKey: string;
  descriptionKey: string;
  href: string;
}

export const services: Service[] = [
  {
    id: 'membership',
    icon: 'CreditCard',
    titleKey: 'home.services.membership.title',
    descriptionKey: 'home.services.membership.description',
    href: '/services#membership',
  },
  {
    id: 'cashback',
    icon: 'DollarSign',
    titleKey: 'home.services.cashback.title',
    descriptionKey: 'home.services.cashback.description',
    href: '/services#cashback',
  },
  {
    id: 'points',
    icon: 'Award',
    titleKey: 'home.services.points.title',
    descriptionKey: 'home.services.points.description',
    href: '/services#points',
  },
  {
    id: 'instant-booking',
    icon: 'Zap',
    titleKey: 'home.services.instantBooking.title',
    descriptionKey: 'home.services.instantBooking.description',
    href: '/services#instant-booking',
  },
  {
    id: 'home-care',
    icon: 'Home',
    titleKey: 'home.services.homeCare.title',
    descriptionKey: 'home.services.homeCare.description',
    href: '/services#home-care',
  },
  {
    id: 'store',
    icon: 'ShoppingBag',
    titleKey: 'home.services.store.title',
    descriptionKey: 'home.services.store.description',
    href: '/services#store',
  },
  {
    id: 'medical-network',
    icon: 'Hospital',
    titleKey: 'home.services.medicalNetwork.title',
    descriptionKey: 'home.services.medicalNetwork.description',
    href: '/services#medical-network',
  },
  {
    id: 'health-network',
    icon: 'Dumbbell',
    titleKey: 'home.services.healthNetwork.title',
    descriptionKey: 'home.services.healthNetwork.description',
    href: '/services#health-network',
  },
];

export interface CoreValue {
  id: string;
  icon: string;
  titleKey: string;
  descriptionKey: string;
}

export const coreValues: CoreValue[] = [
  {
    id: 'clarity',
    icon: 'Eye',
    titleKey: 'values.clarity.title',
    descriptionKey: 'values.clarity.description',
  },
  {
    id: 'innovation',
    icon: 'Lightbulb',
    titleKey: 'values.innovation.title',
    descriptionKey: 'values.innovation.description',
  },
  {
    id: 'safety',
    icon: 'Shield',
    titleKey: 'values.safety.title',
    descriptionKey: 'values.safety.description',
  },
  {
    id: 'partnership',
    icon: 'Handshake',
    titleKey: 'values.partnership.title',
    descriptionKey: 'values.partnership.description',
  },
];

export interface LocaleConfig {
  code: Locale;
  name: string;
  nativeName: string;
  dir: 'rtl' | 'ltr';
  font: string;
  flag: string;
}

export const localeConfigs: Record<Locale, LocaleConfig> = {
  ar: {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    dir: 'rtl',
    font: 'IBM Plex Sans Arabic',
    flag: '🇸🇦',
  },
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    dir: 'ltr',
    font: 'Roboto',
    flag: '🇺🇸',
  },
  ur: {
    code: 'ur',
    name: 'Urdu',
    nativeName: 'اردو',
    dir: 'rtl',
    font: 'IBM Plex Sans Arabic',
    flag: '🇵🇰',
  },
};

export function isValidLocale(locale: string): locale is Locale {
  return ['ar', 'en', 'ur'].includes(locale);
}
