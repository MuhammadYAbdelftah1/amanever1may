'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Bell } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { AppDownloadButtons } from '@/components/shared/app-download-buttons';

// Package type matching the project structure
type Package = {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
  badge?: string;
  badgeColor?: string;
  isFree?: boolean;
  ctaText: string;
  ctaHref: string;
  notification?: string;
};

// Simplified packages with images
const packages: Package[] = [
  {
    id: 'individual',
    name: 'الباقة الفردية',
    price: '299',
    description: 'مثالية للأفراد',
    image: '/logo.jpeg',
    badge: 'الأكثر شعبية',
    badgeColor: 'bg-emerald-500',
    ctaText: 'اشترك الآن',
    ctaHref: '/ar/register?plan=individual',
    notification: 'خصم 20% لأول 100 مشترك',
  },
  {
    id: 'premium',
    name: 'الباقة المتميزة',
    price: '399',
    description: 'للزوج والزوجة',
    image: '/logo.jpeg',
    badge: 'الأكثر طلباً',
    badgeColor: 'bg-blue-500',
    ctaText: 'اشترك الآن',
    ctaHref: '/ar/register?plan=premium',
    notification: 'عرض خاص للعائلات',
  },
  {
    id: 'gold',
    name: 'الباقة الذهبية',
    price: '799',
    description: 'للأفراد المميزين',
    image: '/logo.jpeg',
    badge: 'الأفضل قيمة',
    badgeColor: 'bg-amber-500',
    ctaText: 'اشترك الآن',
    ctaHref: '/ar/register?plan=gold',
    notification: 'كاش باك 15%',
  },
  {
    id: 'family',
    name: 'الباقة العائلية',
    price: '999',
    description: 'حتى 6 أفراد',
    image: '/logo.jpeg',
    ctaText: 'اشترك الآن',
    ctaHref: '/ar/register?plan=family',
    notification: 'تغطية شاملة للعائلة',
  },
  {
    id: 'business',
    name: 'باقة الأعمال',
    price: 'حسب الاتفاق',
    description: 'للشركات والمؤسسات',
    image: '/logo.jpeg',
    ctaText: 'تواصل معنا',
    ctaHref: '/ar/contact?type=business',
    notification: 'أسعار خاصة للشركات',
  },
  {
    id: 'special-needs',
    name: 'باقة ذوي الاحتياجات الخاصة',
    price: 'مجاناً',
    description: 'كلنا معكم',
    image: '/logo.jpeg',
    isFree: true,
    badge: 'باقة مجتمعية',
    badgeColor: 'bg-purple-500',
    ctaText: 'قدّم الآن',
    ctaHref: '/ar/register?plan=special-needs',
    notification: 'دعم مجاني كامل',
  },
  {
    id: 'orphans',
    name: 'باقة الأيتام وحفّاظ القرآن',
    price: 'مجاناً',
    description: 'دعم الأيتام وحفظة القرآن',
    image: '/logo.jpeg',
    isFree: true,
    badge: 'باقة مجتمعية',
    badgeColor: 'bg-teal-500',
    ctaText: 'قدّم الآن',
    ctaHref: '/ar/register?plan=orphans',
    notification: 'رعاية خاصة',
  },
  {
    id: 'widows',
    name: 'باقة الأرامل والمطلقات',
    price: '99',
    description: 'دعم اجتماعي',
    image: '/logo.jpeg',
    badge: 'دعم اجتماعي',
    badgeColor: 'bg-pink-500',
    ctaText: 'اشترك الآن',
    ctaHref: '/ar/register?plan=widows',
    notification: 'دعم نفسي مجاني',
  },
];

interface MembershipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MembershipModal({ isOpen, onClose }: MembershipModalProps) {
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [showDownload, setShowDownload] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile on mount
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSelectPackage = (pkg: Package) => {
    setSelectedPackage(pkg);
  };

  const handleCheckout = () => {
    // Show download screen instead of redirecting
    setShowDownload(true);
  };

  const handleBack = () => {
    if (showDownload) {
      setShowDownload(false);
    } else {
      setSelectedPackage(null);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal - Desktop: Centered popup, Mobile: Bottom popover */}
          <div className="fixed inset-0 z-50 flex items-end md:items-center md:justify-center pointer-events-none">
            <motion.div
              initial={{ 
                opacity: 0, 
                y: isMobile ? '100%' : 20,
                scale: 0.95 
              }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                scale: 1 
              }}
              exit={{ 
                opacity: 0, 
                y: isMobile ? '100%' : 20, 
                scale: 0.95 
              }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="
                pointer-events-auto
                w-full max-h-[85vh]
                md:w-[50vw] md:max-w-3xl md:max-h-[90vh]
                bg-white 
                rounded-t-3xl md:rounded-3xl 
                shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 md:p-6 border-b border-slate-200 bg-gradient-to-r from-emerald-50 to-teal-50 flex-shrink-0">
                <div>
                  <h2 className="text-xl md:text-3xl font-bold text-slate-900">
                    {showDownload ? 'حمّل التطبيق الآن' : 'للزوار فقط'}
                  </h2>
                  <p className="text-xs md:text-sm text-slate-600 mt-1">
                    {showDownload ? 'اشترك من خلال التطبيق' : 'اختر الباقة المناسبة لك'}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white hover:bg-slate-100 flex items-center justify-center transition-colors flex-shrink-0"
                  aria-label="إغلاق"
                >
                  <X className="w-4 h-4 md:w-5 md:h-5 text-slate-600" />
                </button>
              </div>

              {/* Content - Scrollable */}
              <div className="flex-1 overflow-y-auto p-4 md:p-6">
                {showDownload ? (
                  /* Download Screen */
                  <div className="flex flex-col items-center justify-center h-full text-center space-y-6 py-8">
                    {/* Success Notification Card */}
                    <div className="relative w-full max-w-sm">
                      <div className="relative bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 rounded-3xl p-8 shadow-2xl border border-emerald-100">
                        {/* Success Icon */}
                        <div className="relative mx-auto w-32 h-32 mb-6">
                          <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-20"></div>
                          <div className="relative w-full h-full bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-xl">
                            <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          {/* Decorative rings */}
                          <div className="absolute -inset-2 border-4 border-emerald-200 rounded-full opacity-50"></div>
                          <div className="absolute -inset-4 border-2 border-emerald-100 rounded-full opacity-30"></div>
                        </div>

                        {/* Success Message */}
                        <div className="space-y-2 mb-6">
                          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md">
                            <Bell className="w-4 h-4 text-emerald-600" />
                            <span className="text-sm font-bold text-emerald-700">تم اختيار الباقة بنجاح!</span>
                          </div>
                          <h3 className="text-2xl md:text-3xl font-black text-slate-900">
                            {selectedPackage?.name}
                          </h3>
                          <div className="inline-block px-6 py-2 bg-white rounded-full shadow-md">
                            <p className="text-xl md:text-2xl text-emerald-600 font-black">
                              {selectedPackage?.price === 'مجاناً' || selectedPackage?.price === 'حسب الاتفاق' 
                                ? selectedPackage?.price 
                                : `${selectedPackage?.price} ريال/سنة`}
                            </p>
                          </div>
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute top-4 right-4 w-20 h-20 bg-emerald-200 rounded-full opacity-20 blur-2xl"></div>
                        <div className="absolute bottom-4 left-4 w-16 h-16 bg-teal-200 rounded-full opacity-20 blur-2xl"></div>
                      </div>
                    </div>
                    
                    <div className="space-y-3 px-4">
                      <p className="text-slate-700 text-sm md:text-base max-w-md mx-auto font-medium">
                        حمّل تطبيق أمان إيفر الآن واشترك في الباقة بكل سهولة وأمان
                      </p>
                      <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        <span>آمن ومشفر 100%</span>
                      </div>
                    </div>

                    <div className="w-full max-w-xs space-y-3">
                      <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">حمّل التطبيق من</p>
                      <AppDownloadButtons layout="vertical" showHuawei={true} />
                    </div>

                    <Button
                      onClick={handleBack}
                      variant="outline"
                      size="lg"
                      className="mt-4 border-2 hover:bg-slate-50"
                    >
                      ← رجوع للباقات
                    </Button>
                  </div>
                ) : (
                  /* Packages Grid */
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    {packages.map((pkg) => {
                      const isSelected = selectedPackage?.id === pkg.id;

                      return (
                        <motion.div
                          key={pkg.id}
                          whileHover={{ y: -4 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleSelectPackage(pkg)}
                          className={`relative rounded-2xl border-2 p-4 cursor-pointer transition-all ${
                            isSelected
                              ? 'border-emerald-500 bg-emerald-50 shadow-lg ring-2 ring-emerald-200'
                              : 'border-slate-200 hover:border-emerald-300 hover:shadow-md'
                          }`}
                        >
                          {/* Badge */}
                          {pkg.badge && (
                            <div className={`absolute -top-2 left-1/2 -translate-x-1/2 ${pkg.badgeColor} text-white text-[10px] md:text-xs font-bold px-2 md:px-3 py-1 rounded-full whitespace-nowrap z-10`}>
                              {pkg.badge}
                            </div>
                          )}

                          {/* Package Image */}
                          <div className="relative w-full h-32 md:h-40 mb-3 rounded-xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 border-2 border-dashed border-slate-300">
                            {/* Placeholder for Designer */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                              <Bell className="w-8 h-8 md:w-10 md:h-10 text-slate-400 mb-2" />
                              <p className="text-xs md:text-sm font-bold text-slate-600 mb-1">
                                إشعار للمصممة
                              </p>
                              <p className="text-[10px] md:text-xs text-slate-500">
                                المقاسات المطلوبة:
                              </p>
                              <p className="text-xs md:text-sm font-mono font-bold text-slate-700">
                                400×320 بكسل
                              </p>
                              <p className="text-[10px] text-slate-400 mt-1">
                                (نسبة 5:4)
                              </p>
                            </div>
                            
                            {/* Notification Badge */}
                            {pkg.notification && (
                              <div className="absolute bottom-2 left-2 right-2 bg-white/95 backdrop-blur-sm rounded-lg px-2 py-1.5 flex items-center gap-1.5 shadow-md">
                                <Bell className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                                <span className="text-[10px] md:text-xs text-slate-700 font-medium line-clamp-1">
                                  {pkg.notification}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Package Info */}
                          <div className="text-center">
                            <h3 className="text-base md:text-lg font-bold text-slate-900 mb-1">
                              {pkg.name}
                            </h3>
                            <p className="text-[10px] md:text-xs text-slate-600 mb-2">
                              {pkg.description}
                            </p>
                            
                            {/* Price */}
                            <div className="mb-3">
                              {pkg.isFree ? (
                                <div className="flex items-baseline justify-center gap-1">
                                  <span className="text-2xl md:text-3xl font-black text-emerald-600">مجاناً</span>
                                  <span className="text-base md:text-lg">🎁</span>
                                </div>
                              ) : pkg.price === 'حسب الاتفاق' ? (
                                <div className="text-sm md:text-base font-bold text-slate-900">{pkg.price}</div>
                              ) : (
                                <div className="flex items-baseline justify-center gap-1">
                                  <span className="text-2xl md:text-3xl font-black text-emerald-600">{pkg.price}</span>
                                  <span className="text-[10px] md:text-xs text-slate-600">ريال/سنة</span>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Select Indicator */}
                          {isSelected && (
                            <div className="absolute top-2 right-2 w-6 h-6 md:w-7 md:h-7 rounded-full bg-emerald-600 flex items-center justify-center">
                              <Check className="w-3 h-3 md:w-4 md:h-4 text-white" />
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Footer - Fixed at bottom */}
              {selectedPackage && !showDownload && (
                <motion.div
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="border-t border-slate-200 p-4 md:p-6 bg-white flex-shrink-0"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-xs md:text-sm text-slate-600">الباقة المختارة</p>
                      <p className="text-base md:text-lg font-bold text-slate-900">{selectedPackage.name}</p>
                    </div>
                    <Button
                      onClick={handleCheckout}
                      size="lg"
                      className="bg-emerald-600 hover:bg-emerald-700 text-sm md:text-base px-6 md:px-8"
                    >
                      {selectedPackage.ctaText} ←
                    </Button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
