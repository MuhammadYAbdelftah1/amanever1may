'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { LanguageSwitcher } from './language-switcher';
import { Logo } from '@/components/shared/logo';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface HeaderProps {
  locale: string;
}

export function Header({ locale }: HeaderProps) {
  const t = useTranslations('common');
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Check if we're on the home page
  const isHomePage = pathname === `/${locale}` || pathname === `/${locale}/`;

  const navLinks = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/about`, label: t('about') },
    { href: `/${locale}/services`, label: t('services') },
    { href: `/${locale}/blog`, label: locale === 'ar' ? 'المدونة' : locale === 'ur' ? 'بلاگ' : 'Blog' },
    { href: `/${locale}/contact`, label: t('contact') },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Change header style after scrolling 50px
      setIsScrolled(currentScrollY > 50);
      
      // Keep header always visible (sticky)
      setIsVisible(true);
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const isActive = (href: string) => pathname === href;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out rounded-3xl md:rounded-[3rem] lg:rounded-[4rem] mx-4 md:mx-6 lg:mx-8 mt-4 md:mt-6 lg:mt-8 bg-white border border-gray-200 shadow-lg ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${
        isScrolled ? 'h-14' : 'h-16 md:h-20'
      }`}
    >
      <div className="container mx-auto flex h-full items-center justify-between px-4 md:px-6 transition-all duration-300">
        {/* Logo with scale animation */}
        <Link 
          href={`/${locale}`} 
          className={`flex items-center focus:outline-none focus:ring-2 focus:ring-[#4A8B8E]/50 focus:ring-offset-2 rounded-lg transition-all duration-300 hover:scale-105 ${
            isScrolled ? 'scale-90' : 'scale-100'
          }`}
          aria-label={t('home')}
        >
          <Logo size="small" />
        </Link>

        {/* Desktop Navigation with modern styling */}
        <nav className="hidden md:flex items-center gap-2" aria-label={locale === 'ar' ? 'التنقل الرئيسي' : locale === 'ur' ? 'مرکزی نیویگیشن' : 'Main navigation'}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative text-sm font-medium transition-all duration-300 rounded-lg px-4 py-2 group ${
                isActive(link.href)
                  ? 'text-[#4A8B8E] bg-[#4A8B8E]/10'
                  : 'text-gray-700 hover:text-[#4A8B8E] hover:bg-[#4A8B8E]/5'
              }`}
            >
              {link.label}
              {/* Active indicator */}
              {isActive(link.href) && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 rounded-full bg-[#4A8B8E]" />
              )}
              {/* Hover effect */}
              <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#4A8B8E]/0 via-[#4A8B8E]/5 to-[#4A8B8E]/0" />
            </Link>
          ))}
        </nav>

        {/* Desktop Action Buttons & Language Switcher */}
        <div className="hidden md:flex items-center gap-3">
          <Button 
            asChild
            variant="ghost"
            className="font-semibold rounded-lg px-4 py-2 transition-all duration-300 text-[#4A8B8E] hover:bg-[#4A8B8E]/10"
          >
            <Link href={`/${locale}/login`}>
              {locale === 'ar' ? 'تسجيل الدخول' : locale === 'ur' ? 'لاگ ان' : 'Login'}
            </Link>
          </Button>
          <Button 
            asChild
            className="font-semibold rounded-lg px-5 py-2 transition-all duration-300 shadow-lg hover:shadow-xl bg-[#4A8B8E] text-white hover:bg-[#356B6E]"
          >
            <Link href={`/${locale}/register`}>
              {locale === 'ar' ? 'اشترك الآن' : locale === 'ur' ? 'شامل ہوں' : 'Sign Up'}
            </Link>
          </Button>
          <div className={`transition-all duration-300 ${isScrolled ? 'scale-90' : 'scale-100'}`}>
            <LanguageSwitcher currentLocale={locale} />
          </div>
        </div>

        {/* Mobile: Language Switcher & Menu */}
        <div className="flex md:hidden items-center gap-3">
          <div className={`transition-all duration-300 ${isScrolled ? 'scale-90' : 'scale-100'}`}>
            <LanguageSwitcher currentLocale={locale} />
          </div>

          {/* Mobile Menu with animation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button 
                variant="ghost" 
                size="icon"
                className="transition-all duration-300 hover:scale-110 text-[#4A8B8E] hover:bg-[#4A8B8E]/10"
                aria-label={locale === 'ar' ? 'فتح القائمة' : locale === 'ur' ? 'مینو کھولیں' : 'Open menu'}
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">{locale === 'ar' ? 'فتح القائمة' : locale === 'ur' ? 'مینو کھولیں' : 'Toggle menu'}</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="end" className="bg-[#5e8f8f] border-white/20 flex flex-col rounded-r-2xl">
              <SheetTitle className="sr-only">
                {locale === 'ar' ? 'قائمة التنقل' : locale === 'ur' ? 'نیویگیشن مینو' : 'Navigation Menu'}
              </SheetTitle>
              
              {/* Navigation Links - Centered */}
              <nav 
                className="flex flex-col gap-2 mt-8 flex-1 justify-center"
                aria-label={locale === 'ar' ? 'قائمة الجوال' : locale === 'ur' ? 'موبائل مینو' : 'Mobile menu'}
              >
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-lg font-medium transition-all duration-300 text-center rounded-lg px-4 py-3 ${
                      isActive(link.href)
                        ? 'text-white bg-white/20'
                        : 'text-white/90 hover:text-white hover:bg-white/15'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 pb-6 border-t border-white/20 pt-6">
                <Button 
                  asChild
                  variant="ghost"
                  className="w-full text-white hover:bg-white/20 font-semibold rounded-lg border border-white/30"
                >
                  <Link href={`/${locale}/login`}>
                    {locale === 'ar' ? 'تسجيل الدخول' : locale === 'ur' ? 'لاگ ان' : 'Login'}
                  </Link>
                </Button>
                <Button 
                  asChild
                  className="w-full bg-white text-emerald-600 hover:bg-white/90 font-semibold rounded-lg shadow-lg"
                >
                  <Link href={`/${locale}/register`}>
                    {locale === 'ar' ? 'اشترك الآن' : locale === 'ur' ? 'شامل ہوں' : 'Sign Up'}
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
