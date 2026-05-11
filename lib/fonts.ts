import localFont from 'next/font/local';

// Self-hosted IBM Plex Sans Arabic (no Google Fonts dependency)
export const ibmPlexArabic = localFont({
  src: [
    {
      path: '../public/fonts/ibm-plex-sans-arabic-v15-arabic-300.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/ibm-plex-sans-arabic-v15-arabic-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/ibm-plex-sans-arabic-v15-arabic-500.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/ibm-plex-sans-arabic-v15-arabic-600.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/ibm-plex-sans-arabic-v15-arabic-700.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-arabic',
  display: 'swap',
});

// System fonts for Latin (similar to Roboto)
// Using CSS variable with fallback fonts
export const roboto = {
  variable: '--font-latin',
  style: {
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
};

/* Original Google Fonts configuration (replaced with self-hosted):
import { IBM_Plex_Sans_Arabic, Roboto } from 'next/font/google';

export const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-arabic',
  display: 'swap',
});

export const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-latin',
  display: 'swap',
});
*/

