'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Menu, Smartphone, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { LanguageSwitcher } from './language-switcher';
import { Logo } from '@/components/shared/logo';
import { AppDownloadModal } from '@/components/shared/app-download-modal';
import { AppDownloadButtons } from '@/components/shared/app-download-buttons';
import { ServicesPopover } from './services-popover';
import { FeaturesPopover } from './features-popover';
import { PlatformsPopover } from './platforms-popover';
import { SpecialOffersPopover } from './special-offers-popover';
import { AboutPopover } from './about-popover';
import { BlogPopover } from './blog-popover';
import { ContactPopover } from './contact-popover';
import { NetworkMapPopover } from '@/components/shared/network-map-popover';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Network selection states (same as aman-network-section)
  const [showRegionSelector, setShowRegionSelector] = useState(false);
  const [showNetworkMap, setShowNetworkMap] = useState(false);
  const [selectedNetworkType, setSelectedNetworkType] = useState<'medical' | 'health'>('medical');
  const [selectedZoneId, setSelectedZoneId] = useState('');
  const [selectedCityName, setSelectedCityName] = useState('');
  const [mapRegionId, setMapRegionId] = useState('');
  const [mapCityName, setMapCityName] = useState('');

  // Check if we're on the home page
  const isHomePage = pathname === `/${locale}` || pathname === `/${locale}/`;

  // Regions data (same as aman-network-section)
  const regions = [
    {
      id: 'central',
      regionId: 'riyadh',
      name: 'المنطقة الوسطى',
      cities: ['الرياض', 'الخرج', 'الدوادمي', 'الزلفي', 'المجمعة', 'شقراء', 'الأفلاج', 'وادي الدواسر', 'السليل', 'عفيف']
    },
    {
      id: 'western',
      regionId: 'makkah',
      name: 'المنطقة الغربية',
      cities: ['مكة', 'جدة', 'المدينة المنورة', 'الطائف', 'ينبع', 'رابغ', 'القنفذة', 'الليث', 'بدر', 'خليص']
    },
    {
      id: 'eastern',
      regionId: 'eastern',
      name: 'المنطقة الشرقية',
      cities: ['الدمام', 'الخبر', 'الظهران', 'الأحساء (الهفوف)', 'الأحساء (المبرز)', 'الجبيل', 'القطيف', 'الخفجي', 'رأس تنورة', 'بقيق', 'النعيرية', 'حفر الباطن']
    },
    {
      id: 'northern',
      regionId: 'tabuk',
      name: 'المنطقة الشمالية',
      cities: ['تبوك', 'عرعر', 'سكاكا', 'دومة الجندل', 'القريات', 'رفحاء', 'طريف']
    },
    {
      id: 'southern',
      regionId: 'asir',
      name: 'المنطقة الجنوبية',
      cities: ['أبها', 'خميس مشيط', 'نجران', 'جازان', 'الباحة', 'صبيا', 'بيش', 'محايل عسير', 'أحد رفيدة', 'شرورة', 'بلجرشي', 'المخواة']
    },
    {
      id: 'qassim',
      regionId: 'qassim',
      name: 'منطقة القصيم',
      cities: ['بريدة', 'عنيزة', 'الرس', 'البكيرية', 'البدائع', 'رياض الخبراء', 'عيون الجواء']
    }
  ];

  const handleNetworkButtonClick = (networkType: 'medical' | 'health') => {
    setSelectedNetworkType(networkType);
    setSelectedZoneId('');
    setSelectedCityName('');
    setMapRegionId('');
    setMapCityName('');
    setIsMobileMenuOpen(false); // Close mobile menu
    setShowRegionSelector(true);
  };

  const handleContinue = () => {
    if (selectedZoneId && selectedCityName) {
      const regionData = regions.find(r => r.id === selectedZoneId);
      if (regionData) {
        setMapRegionId(regionData.regionId);
        setMapCityName(selectedCityName);
        setShowRegionSelector(false);
        setShowNetworkMap(true);
      }
    }
  };

  const selectedRegionData = regions.find(r => r.id === selectedZoneId);

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
      <div className="w-full flex h-full items-center justify-between px-4 md:px-6 lg:px-8 transition-all duration-300">
        {/* Logo with scale animation */}
        <Link 
          href={`/${locale}`} 
          className={`flex items-center gap-2 md:gap-3 focus:outline-none focus:ring-2 focus:ring-[#4A8B8E]/50 focus:ring-offset-2 rounded-lg transition-all duration-300 hover:scale-105 ${
            isScrolled ? 'scale-90' : 'scale-100'
          }`}
          aria-label={t('home')}
        >
          <Logo size="small" />
          <div className="flex flex-col gap-[2px]">
            <h1 className="text-[#4A8B8E] font-extrabold text-base md:text-lg lg:text-xl">
              أمان إيفر
            </h1>
            <p className="text-[#4A8B8E]/80 font-extrabold text-[10px] md:text-xs">
              والرعاية الشاملة للخدمات الطبية
            </p>
            <p className="text-[#4A8B8E]/70 font-extrabold text-[9px] md:text-[10px]">
              AmanEver - Comprehensive Medical Services
            </p>
          </div>
        </Link>

        {/* Desktop Navigation with modern styling */}
        <nav className="hidden md:flex items-center gap-1 flex-1 justify-center mx-4" aria-label={locale === 'ar' ? 'التنقل الرئيسي' : locale === 'ur' ? 'مرکزی نیویگیشن' : 'Main navigation'}>
          {/* Home */}
          <Link
            href={`/${locale}`}
            className={`relative text-sm font-medium transition-all duration-300 rounded-lg px-4 py-2.5 group whitespace-nowrap ${
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
          
          {/* About Popover - من نحن */}
          <AboutPopover locale={locale} />
          
          {/* Services Popover */}
          <ServicesPopover locale={locale} />
          
          {/* Features Popover */}
          <FeaturesPopover locale={locale} />
          
          {/* Platforms Popovers */}
          <PlatformsPopover locale={locale} type="merchants" />
          <PlatformsPopover locale={locale} type="doctors" />
          
          {/* Medical Network - الشبكة الطبية */}
          <button
            onClick={() => handleNetworkButtonClick('medical')}
            className="relative text-sm font-medium transition-all duration-300 rounded-lg px-4 py-2.5 group whitespace-nowrap text-gray-700 hover:text-[#4A8B8E] hover:bg-[#4A8B8E]/5"
          >
            {t('medicalNetwork')}
            <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#4A8B8E]/0 via-[#4A8B8E]/5 to-[#4A8B8E]/0" />
          </button>
          
          {/* Health Network - الشبكة الصحية */}
          <button
            onClick={() => handleNetworkButtonClick('health')}
            className="relative text-sm font-medium transition-all duration-300 rounded-lg px-4 py-2.5 group whitespace-nowrap text-gray-700 hover:text-[#4A8B8E] hover:bg-[#4A8B8E]/5"
          >
            {t('healthNetwork')}
            <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#4A8B8E]/0 via-[#4A8B8E]/5 to-[#4A8B8E]/0" />
          </button>
          
          {/* Special Offers Popover - العروض الخاصة */}
          <SpecialOffersPopover locale={locale} />
          
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
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
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
              <div className="flex flex-col items-center pt-3 pb-2 border-b border-gray-200 gap-2">
                <Link 
                  href={`/${locale}`}
                  className="focus:outline-none focus:ring-2 focus:ring-[#4A8B8E]/50 focus:ring-offset-2 rounded-lg transition-all duration-300 hover:scale-105"
                  aria-label={t('home')}
                >
                  <Logo size="small" />
                </Link>
                
                {/* Company Text */}
                <div className="flex flex-col items-center gap-0.5 text-center">
                  <h2 className="text-[#4A8B8E] font-extrabold text-base">
                    أمان إيفر
                  </h2>
                  <p className="text-[#4A8B8E]/80 font-extrabold text-[10px]">
                    والرعاية الشاملة للخدمات الطبية
                  </p>
                  <p className="text-[#4A8B8E]/70 font-extrabold text-[9px]">
                    AmanEver - Comprehensive Medical Services
                  </p>
                </div>
              </div>
              
              {/* Navigation Links - Scrollable */}
              <nav 
                className="flex flex-col gap-1 mt-2 flex-1 overflow-y-auto px-2"
                aria-label={locale === 'ar' ? 'قائمة الجوال' : locale === 'ur' ? 'موبائل مینو' : 'Mobile menu'}
              >
                {/* Home */}
                <Link
                  href={`/${locale}`}
                  className={`flex items-center gap-3 text-base font-medium transition-all duration-300 rounded-lg px-4 py-2.5 ${
                    isActive(`/${locale}`)
                      ? 'text-[#4A8B8E] bg-[#4A8B8E]/10'
                      : 'text-[#4A8B8E]/80 hover:text-[#4A8B8E] hover:bg-[#4A8B8E]/5'
                  }`}
                >
                  {/* Image Placeholder */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg overflow-hidden bg-gray-50 relative border-2 border-dashed border-gray-300">
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <div className="text-[8px] font-semibold text-gray-700">للمصممة</div>
                      <div className="text-[7px] text-gray-500">40×40</div>
                    </div>
                  </div>
                  <span className="flex-1 text-center">{t('home')}</span>
                </Link>
                
                {/* About Popover - من نحن */}
                <AboutPopover locale={locale} isMobile />
                
                {/* Services Popover */}
                <ServicesPopover locale={locale} isMobile />
                
                {/* Features Popover */}
                <FeaturesPopover locale={locale} isMobile />
                
                {/* Platforms Popovers */}
                <PlatformsPopover locale={locale} type="merchants" isMobile />
                <PlatformsPopover locale={locale} type="doctors" isMobile />
                
                {/* Medical Network - الشبكة الطبية */}
                <button
                  onClick={() => handleNetworkButtonClick('medical')}
                  className="flex items-center gap-3 text-base font-medium transition-all duration-300 rounded-lg px-4 py-2.5 text-[#4A8B8E]/80 hover:text-[#4A8B8E] hover:bg-[#4A8B8E]/5 w-full"
                >
                  {/* Image Placeholder */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg overflow-hidden bg-gray-50 relative border-2 border-dashed border-gray-300">
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <div className="text-[8px] font-semibold text-gray-700">للمصممة</div>
                      <div className="text-[7px] text-gray-500">40×40</div>
                    </div>
                  </div>
                  <span className="flex-1 text-center">{t('medicalNetwork')}</span>
                </button>
                
                {/* Health Network - الشبكة الصحية */}
                <button
                  onClick={() => handleNetworkButtonClick('health')}
                  className="flex items-center gap-3 text-base font-medium transition-all duration-300 rounded-lg px-4 py-2.5 text-[#4A8B8E]/80 hover:text-[#4A8B8E] hover:bg-[#4A8B8E]/5 w-full"
                >
                  {/* Image Placeholder */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg overflow-hidden bg-gray-50 relative border-2 border-dashed border-gray-300">
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <div className="text-[8px] font-semibold text-gray-700">للمصممة</div>
                      <div className="text-[7px] text-gray-500">40×40</div>
                    </div>
                  </div>
                  <span className="flex-1 text-center">{t('healthNetwork')}</span>
                </button>
                
                {/* Special Offers Popover - العروض الخاصة */}
                <SpecialOffersPopover locale={locale} isMobile />
                
                {/* Blog Popover */}
                <BlogPopover locale={locale} isMobile />
                
                {/* Contact Popover */}
                <ContactPopover locale={locale} isMobile />
                
                {/* Rest of links */}
                {navLinks.slice(1).map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-3 text-base font-medium transition-all duration-300 rounded-lg px-4 py-2.5 ${
                      isActive(link.href)
                        ? 'text-[#4A8B8E] bg-[#4A8B8E]/10'
                        : 'text-[#4A8B8E]/80 hover:text-[#4A8B8E] hover:bg-[#4A8B8E]/5'
                    }`}
                  >
                    {/* Image Placeholder */}
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg overflow-hidden bg-gray-50 relative border-2 border-dashed border-gray-300">
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <div className="text-[8px] font-semibold text-gray-700">للمصممة</div>
                        <div className="text-[7px] text-gray-500">40×40</div>
                      </div>
                    </div>
                    <span className="flex-1 text-center">{link.label}</span>
                  </Link>
                ))}
              </nav>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 pb-3 border-t border-gray-200 pt-3">
                {/* App Download Buttons */}
                <div className="text-center">
                  <p className="text-xs text-slate-600 mb-2 font-medium">حمّل التطبيق الآن</p>
                  <div className="flex items-center justify-center gap-2">
                    {/* App Store */}
                    <Link
                      href="https://apps.apple.com/sa/app/amanever"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-transform hover:scale-105 active:scale-95"
                      aria-label="حمّل من App Store"
                    >
                      <Image
                        src="/images/app-store-ar.png"
                        alt="حمّل من App Store"
                        width={100}
                        height={30}
                        className="h-8 w-auto"
                      />
                    </Link>

                    {/* Google Play */}
                    <Link
                      href="https://play.google.com/store/apps/details?id=com.amanever"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-transform hover:scale-105 active:scale-95"
                      aria-label="حمّل من Google Play"
                    >
                      <Image
                        src="/images/google-play-ar.png"
                        alt="حمّل من Google Play"
                        width={100}
                        height={30}
                        className="h-8 w-auto"
                      />
                    </Link>

                    {/* Huawei AppGallery */}
                    <Link
                      href="https://appgallery.huawei.com/app/amanever"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-transform hover:scale-105 active:scale-95"
                      aria-label="حمّل من Huawei AppGallery"
                    >
                      <Image
                        src="/images/huawei-appgallery-ar.png"
                        alt="حمّل من Huawei AppGallery"
                        width={100}
                        height={30}
                        className="h-8 w-auto"
                      />
                    </Link>
                  </div>
                </div>
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

      {/* Region Selector Dialog - Same as aman-network-section */}
      {showRegionSelector && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 pt-24 md:pt-32">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto my-auto">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#5B9A9E] to-[#6BA5A8] px-8 py-6 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white">اختر منطقتك ومدينتك</h3>
                  <p className="text-white/90 text-sm mt-1">
                    {selectedNetworkType === 'medical' ? 'الشبكة الطبية' : 'الشبكة الصحية'}
                  </p>
                </div>
                <button
                  onClick={() => setShowRegionSelector(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>

            {/* Content - Simple Form */}
            <div className="p-8 space-y-6">
              {/* Step 1: Select Region */}
              <div>
                <label className="block text-lg font-bold text-gray-900 mb-3">
                  1️⃣ اختر المنطقة
                </label>
                <select
                  value={selectedZoneId}
                  onChange={(e) => {
                    setSelectedZoneId(e.target.value);
                    setSelectedCityName('');
                  }}
                  className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-2xl focus:border-[#5B9A9E] focus:ring-4 focus:ring-[#5B9A9E]/20 outline-none transition-all bg-white cursor-pointer"
                >
                  <option value="">-- اختر المنطقة --</option>
                  {regions.map((region) => (
                    <option key={region.id} value={region.id}>
                      {region.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Step 2: Select City */}
              {selectedZoneId && selectedRegionData && (
                <div className="animate-in fade-in slide-in-from-top-4 duration-300">
                  <label className="block text-lg font-bold text-gray-900 mb-3">
                    2️⃣ اختر المدينة
                  </label>
                  <select
                    value={selectedCityName}
                    onChange={(e) => setSelectedCityName(e.target.value)}
                    className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-2xl focus:border-[#5B9A9E] focus:ring-4 focus:ring-[#5B9A9E]/20 outline-none transition-all bg-white cursor-pointer"
                  >
                    <option value="">-- اختر المدينة --</option>
                    {selectedRegionData.cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Continue Button */}
              <button
                onClick={handleContinue}
                disabled={!selectedZoneId || !selectedCityName}
                className={`w-full py-5 rounded-2xl font-bold text-xl transition-all duration-300 ${
                  selectedZoneId && selectedCityName
                    ? 'bg-gradient-to-r from-[#5B9A9E] to-[#6BA5A8] text-white shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {selectedZoneId && selectedCityName ? '✅ استكشف الشبكة الآن' : '⬆️ اختر المنطقة والمدينة أولاً'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Network Map Dialog */}
      <NetworkMapPopover 
        locale={locale} 
        type={selectedNetworkType}
        isOpen={showNetworkMap}
        onOpenChange={setShowNetworkMap}
        preSelectedRegion={mapRegionId}
        preSelectedCity={mapCityName}
      />
    </header>
  );
}
