import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ibmPlexArabic, roboto } from '@/lib/fonts';
import { routing } from '@/routing';
import { Header } from '@/components/layout/header';
import { FooterNew } from '@/components/global/footer-new';
import { ChatLauncher } from '@/components/chatbot/ChatLauncher';
import { FloatingAuthButtons } from '@/components/global/floating-auth-buttons';
import { NetworkStatus } from '@/components/global/network-status';
import '../globals.css';
import '../chunk-error-handler';

export const metadata: Metadata = {
  title: 'أمان إيفر | Aman Ever',
  description: 'شريككم الذكي في رحلة الرعاية الطبية - Your Smart Partner in Healthcare Journey',
  icons: {
    icon: [
      { url: '/images/logo.jpeg', sizes: '32x32', type: 'image/jpeg' },
      { url: '/images/logo.jpeg', sizes: '16x16', type: 'image/jpeg' },
    ],
    apple: [
      { url: '/images/logo.jpeg', sizes: '180x180', type: 'image/jpeg' },
    ],
  },
  manifest: '/manifest.json',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Get messages for the locale
  const messages = await getMessages();

  // Determine if RTL
  const isRTL = locale === 'ar' || locale === 'ur';
  const dir = isRTL ? 'rtl' : 'ltr';

  // Select font based on locale
  const fontClass = isRTL ? ibmPlexArabic.variable : roboto.variable;
  const fontFamily = isRTL ? 'font-arabic' : 'font-latin';

  return (
    <html lang={locale} dir={dir} className={fontClass}>
      <body className={fontFamily}>
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          {locale === 'ar' ? 'انتقل إلى المحتوى الرئيسي' : locale === 'ur' ? 'مرکزی مواد پر جائیں' : 'Skip to main content'}
        </a>
        <NextIntlClientProvider messages={messages}>
          <NetworkStatus />
          <Header locale={locale} />
          {children}
          <FloatingAuthButtons />
          <ChatLauncher />
          <FooterNew />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
