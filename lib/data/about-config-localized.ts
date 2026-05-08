// Localized About page configuration
import { ABOUT_CONFIG } from './about-config';
import { ABOUT_CONFIG_EN } from './about-config-en';
import { ABOUT_CONFIG_UR } from './about-config-ur';

export function getAboutConfig(locale: string) {
  switch (locale) {
    case 'en':
      return ABOUT_CONFIG_EN;
    case 'ur':
      return ABOUT_CONFIG_UR;
    case 'ar':
    default:
      return ABOUT_CONFIG;
  }
}

export type AboutConfig = typeof ABOUT_CONFIG;
