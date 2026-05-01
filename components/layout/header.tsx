'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Menu, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { LanguageSwitcher } from './language-switcher';
import { Logo } from '@/components/shared/logo';
import { AppDownloadModal } from '@/components/shared/app-download-modal';
import { ServicesPopover } from './services-popover';
import { FeaturesPopover } from './features-popover';
import { PlatformsPopover } from './platforms-popover';
import { AboutPopover } from './about-popover';
import { BlogPopover } from './blog-popover';
import { ContactPopover } from './contact-popover';
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
  const [isAppModalOpen, setIsAppModalOpen] = useState(false);

  // Check if we're on the home page
  const isHomePage = pathname === `/${locale}` || pathname === `/${locale}/`;

  const navLinks = [
    { href: `/${locale}`, label: t('home') },
    // Services, Features, Platforms, About, Blog, and Contact are handled by Popovers
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
          {/* Home */}
          <Link
            href={`/${locale}`}
            className={`relative text-sm font-medium transition-all duration-300 rounded-lg px-4 py-2 group ${
              isActive(`/${locale}`)
                ? 'text-[#4A8B8E] bg-[#4A8B8E]/10'
                : 'text-gray-700 hover:text-[#4A8B8E] hover:bg-[#4A8B8E]/5'
            }`}
          >
            {t('home')}
            {isActive(`/${locale}`) && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 rounded-full bg-[#4A8B8E]" />
            )}
            <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#4A8B8E]/0 via-[#4A8B8E]/5 to-[#4A8B8E]/0" />
          </Link>
          
          {/* Services Popover */}
          <ServicesPopover locale={locale} />
          
          {/* Features Popover */}
          <FeaturesPopover locale={locale} />
          
          {/* Platforms Popovers */}
          <PlatformsPopover locale={locale} type="merchants" />
          <PlatformsPopover locale={locale} type="doctors" />
          <PlatformsPopover locale={locale} type="affiliates" />
          
          {/* About Popover */}
          <AboutPopover locale={locale} />
          
          {/* Blog Popover */}
          <BlogPopover locale={locale} />
          
          {/* Contact Popover */}
          <ContactPopover locale={locale} />
          
          {/* Rest of links */}
          {navLinks.slice(1).map((link) => (
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
              {isActive(link.href) && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 rounded-full bg-[#4A8B8E]" />
              )}
              <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#4A8B8E]/0 via-[#4A8B8E]/5 to-[#4A8B8E]/0" />
            </Link>
          ))}
        </nav>

        {/* Desktop Action Buttons & Language Switcher */}
        <div className="hidden md:flex items-center gap-3">
          {/* App Download Button for Visitors/Subscribers */}
          <Button 
            onClick={() => setIsAppModalOpen(true)}
            variant="outline"
            className="font-semibold rounded-lg px-4 py-2 transition-all duration-300 border-2 border-[#4A8B8E] text-[#4A8B8E] hover:bg-[#4A8B8E] hover:text-white flex items-center gap-2"
          >
            <Smartphone className="w-4 h-4" />
            {locale === 'ar' ? 'زائر / مشترك' : locale === 'ur' ? 'وزیٹر / سبسکرائبر' : 'Visitor / Subscriber'}
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
            <SheetContent side="end" className="bg-white border-gray-200 flex flex-col rounded-r-2xl">
              <SheetTitle className="sr-only">
                {locale === 'ar' ? 'قائمة التنقل' : locale === 'ur' ? 'نیویگیشن مینو' : 'Navigation Menu'}
              </SheetTitle>
              
              {/* Logo at the top */}
              <div className="flex justify-center pt-6 pb-4 border-b border-gray-200">
                <Link 
                  href={`/${locale}`}
                  className="focus:outline-none focus:ring-2 focus:ring-[#4A8B8E]/50 focus:ring-offset-2 rounded-lg transition-all duration-300 hover:scale-105"
                  aria-label={t('home')}
                >
                  <Logo size="medium" />
                </Link>
              </div>
              
              {/* Navigation Links - Centered */}
              <nav 
                className="flex flex-col gap-2 mt-4 flex-1 justify-center"
                aria-label={locale === 'ar' ? 'قائمة الجوال' : locale === 'ur' ? 'موبائل مینو' : 'Mobile menu'}
              >
                {/* Home */}
                <Link
                  href={`/${locale}`}
                  className={`flex items-center gap-3 text-lg font-medium transition-all duration-300 rounded-lg px-4 py-3 ${
                    isActive(`/${locale}`)
                      ? 'text-[#4A8B8E] bg-[#4A8B8E]/10'
                      : 'text-[#4A8B8E]/80 hover:text-[#4A8B8E] hover:bg-[#4A8B8E]/5'
                  }`}
                >
                  {/* Image Placeholder */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-gray-50 relative border-2 border-dashed border-gray-300">
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <div className="text-[9px] font-semibold text-gray-700">للمصممة</div>
                      <div className="text-[8px] text-gray-500">48×48</div>
                    </div>
                  </div>
                  <span className="flex-1 text-center">{t('home')}</span>
                </Link>
                
                {/* Services Popover */}
                <ServicesPopover locale={locale} isMobile />
                
                {/* Features Popover */}
                <FeaturesPopover locale={locale} isMobile />
                
                {/* Platforms Popovers */}
                <PlatformsPopover locale={locale} type="merchants" isMobile />
                <PlatformsPopover locale={locale} type="doctors" isMobile />
                <PlatformsPopover locale={locale} type="affiliates" isMobile />
                
                {/* About Popover */}
                <AboutPopover locale={locale} isMobile />
                
                {/* Blog Popover */}
                <BlogPopover locale={locale} isMobile />
                
                {/* Contact Popover */}
                <ContactPopover locale={locale} isMobile />
                
                {/* Rest of links */}
                {navLinks.slice(1).map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-3 text-lg font-medium transition-all duration-300 rounded-lg px-4 py-3 ${
                      isActive(link.href)
                        ? 'text-[#4A8B8E] bg-[#4A8B8E]/10'
                        : 'text-[#4A8B8E]/80 hover:text-[#4A8B8E] hover:bg-[#4A8B8E]/5'
                    }`}
                  >
                    {/* Image Placeholder */}
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-gray-50 relative border-2 border-dashed border-gray-300">
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <div className="text-[9px] font-semibold text-gray-700">للمصممة</div>
                        <div className="text-[8px] text-gray-500">48×48</div>
                      </div>
                    </div>
                    <span className="flex-1 text-center">{link.label}</span>
                  </Link>
                ))}
              </nav>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 pb-6 border-t border-gray-200 pt-6">
                {/* App Download Button for Mobile */}
                <Button 
                  onClick={() => setIsAppModalOpen(true)}
                  variant="ghost"
                  className="w-full text-[#4A8B8E] hover:bg-[#4A8B8E]/10 font-semibold rounded-lg border-2 border-[#4A8B8E] flex items-center justify-center gap-2"
                >
                  <Smartphone className="w-4 h-4" />
                  {locale === 'ar' ? 'زائر / مشترك' : locale === 'ur' ? 'وزیٹر / سبسکرائبر' : 'Visitor / Subscriber'}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* App Download Modal */}
      <AppDownloadModal 
        isOpen={isAppModalOpen} 
        onClose={() => setIsAppModalOpen(false)} 
        locale={locale}
      />
    </header>
  );
}
