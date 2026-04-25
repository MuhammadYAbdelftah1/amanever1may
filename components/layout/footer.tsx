import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Logo } from '@/components/shared/logo';

interface FooterProps {
  locale: string;
}

export function Footer({ locale }: FooterProps) {
  const t = useTranslations('common');
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/about`, label: t('about') },
    { href: `/${locale}/services`, label: t('services') },
    { href: `/${locale}/vision`, label: t('vision') },
    { href: `/${locale}/values`, label: t('values') },
  ];

  return (
    <footer className="border-t bg-background">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Logo size="medium" />
            <p className="text-sm text-muted-foreground text-start">
              {t('siteName')}
            </p>
          </div>

          {/* Quick Links */}
          <nav aria-label={locale === 'ar' ? 'روابط سريعة' : locale === 'ur' ? 'فوری لنکس' : 'Quick links'}>
            <h3 className="font-semibold mb-4 text-start">روابط سريعة</h3>
            <div className="flex flex-col gap-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors text-start focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4 text-start">{t('contact')}</h3>
            <address className="text-sm text-muted-foreground space-y-2 text-start not-italic">
              <p>المملكة العربية السعودية</p>
            </address>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {currentYear} {t('siteName')}. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}
