'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Bell, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { AppDownloadButtons } from '@/components/shared/app-download-buttons';
import Link from 'next/link';
import { PersonalInfoStep, PaymentStep } from './MembershipModalSteps';
import { SuccessStep } from './SuccessStep';

// Card tier type (Premier, VIP, Business)
type CardTier = {
  id: 'premier' | 'vip' | 'business';
  name: string;
  tagline: string;
  priceYearly: number | string;
  priceMonthly: number | string;
  features: string[];
  isRecommended?: boolean;
  ctaLabel: string;
  ctaHref: string;
  headerBg: string;
  headerTextColor: string;
};

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
  features?: string[];
};

// Card tiers data (Premier, VIP, Business)
const cardTiers: CardTier[] = [
  {
    id: 'premier' as const,
    name: 'Premier',
    tagline: 'بطاقتك الأساسية للرعاية اليومية',
    priceYearly: 299,
    priceMonthly: 24.9,
    features: [
      'خصم حتى ٦٠٪ على الشبكة الطبية',
      'حجوزات فورية مع الأطباء',
      'استشارة "اسأل طبيب" مجاناً',
      'كاش باك ٥٪ على كل فاتورة',
      'نقاط ولاء قابلة للاستبدال',
      'دعم عملاء ٢٤/٧',
    ],
    ctaLabel: 'اشترك في Premier',
    ctaHref: '/register',
    headerBg: 'bg-emerald-50',
    headerTextColor: 'text-slate-900',
  },
  {
    id: 'vip' as const,
    name: 'VIP',
    tagline: 'للعائلات والأشخاص الأعلى استخداماً',
    priceYearly: 499,
    priceMonthly: 41.5,
    isRecommended: true,
    features: [
      'خصم حتى ٨٠٪ (بدلاً من ٦٠٪)',
      'تغطية لـ ٤ أفراد من العائلة',
      'زيارة طبيب منزلية مجانية (شهرياً)',
      'فحص شامل سنوي مجاني',
      'أولوية في الحجوزات + أطباء VIP',
      'كاش باك ١٠٪ (بدلاً من ٥٪)',
      'مدير حساب شخصي عبر WhatsApp',
    ],
    ctaLabel: 'اشترك مباشرة عبر WhatsApp',
    ctaHref: 'https://wa.me/966500000000?text=مرحباً، أريد الاشتراك في باقة VIP',
    headerBg: 'bg-gradient-to-br from-slate-900 to-emerald-900',
    headerTextColor: 'text-white',
  },
  {
    id: 'business' as const,
    name: 'Business',
    tagline: 'حلول صحية متكاملة للشركات والمؤسسات',
    priceYearly: 'حسب الاتفاق',
    priceMonthly: 'حسب الاتفاق',
    features: [
      'تغطية شاملة لجميع الموظفين',
      'خصومات مخصصة حسب عدد الموظفين',
      'لوحة تحكم خاصة للإدارة',
      'تقارير صحية دورية للموظفين',
      'مدير حساب مخصص ٢٤/٧',
      'فواتير موحدة وتسهيلات دفع',
    ],
    ctaLabel: 'تواصل معنا',
    ctaHref: '/contact?type=business',
    headerBg: 'bg-gradient-to-br from-emerald-700 to-teal-700',
    headerTextColor: 'text-white',
  },
];

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
    features: [
      'خصومات حتى 50% في +2000 مركز',
      'رصيد خدمات 1,500 ريال',
      'حجز فوري مع أفضل الأطباء',
      '5 استشارات أونلاين مجانية',
    ],
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
    features: [
      'تغطية لشخصين (زوج وزوجة)',
      'خصومات حتى 60%',
      'رصيد خدمات 3,000 ريال',
      '10 استشارات أونلاين مجانية',
    ],
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
    features: [
      'خصومات حتى 70%',
      'رصيد خدمات 5,000 ريال',
      'استشارات أونلاين غير محدودة',
      'فحص شامل سنوي مجاني',
    ],
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
    features: [
      'تغطية حتى 6 أفراد',
      'خصومات حتى 80%',
      'رصيد خدمات 10,000 ريال',
      'زيارة طبيب منزلية مجانية شهرياً',
    ],
  },
  {
    id: 'elderly',
    name: 'باقة كبار السن',
    price: '199',
    description: 'رعاية خاصة لكبار السن',
    image: '/logo.jpeg',
    badge: 'رعاية متميزة',
    badgeColor: 'bg-indigo-500',
    ctaText: 'اشترك الآن',
    ctaHref: '/ar/register?plan=elderly',
    notification: 'متابعة دورية مجانية',
    features: [
      'خصومات حتى 70% على الخدمات الطبية',
      'رصيد خدمات 3,000 ريال',
      'متابعة صحية دورية مجانية',
      'أولوية في المواعيد والحجوزات',
    ],
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
    features: [
      'خدمات طبية مجانية بالكامل',
      'رعاية صحية متخصصة',
      'دعم نفسي واجتماعي',
      'أولوية في المواعيد',
    ],
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
    features: [
      'خدمات طبية مجانية',
      'فحوصات دورية مجانية',
      'دعم تعليمي وصحي',
      'متابعة صحية مستمرة',
    ],
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
    features: [
      'خصومات حتى 40%',
      'دعم نفسي مجاني',
      'استشارات عائلية',
      'رصيد خدمات 1,000 ريال',
    ],
  },
];

interface MembershipModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBusinessModal?: () => void; // NEW: Callback to open business modal
}

export function MembershipModal({ isOpen, onClose, onOpenBusinessModal }: MembershipModalProps) {
  const [selectedCard, setSelectedCard] = useState<CardTier | null>(null); // NEW: Track selected card
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [showDownload, setShowDownload] = useState(false);
  const [showPhoneInput, setShowPhoneInput] = useState(false);
  const [showPackages, setShowPackages] = useState(false); // NEW: Show packages after card selection
  const [showPersonalInfo, setShowPersonalInfo] = useState(false); // NEW: Personal info step
  const [showPayment, setShowPayment] = useState(false); // NEW: Payment step
  const [showSuccess, setShowSuccess] = useState(false); // NEW: Success step
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+966'); // Saudi Arabia default
  const [isMobile, setIsMobile] = useState(false);
  
  // Personal Info State
  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [idType, setIdType] = useState<'national' | 'iqama' | 'passport'>('national');
  const [idNumber, setIdNumber] = useState('');
  
  // Payment State
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);

  // Detect mobile on mount
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCardSelect = (card: CardTier) => {
    setSelectedCard(card);
    if (card.id === 'premier') {
      // Show packages for Premier
      setShowPackages(true);
    } else if (card.id === 'vip') {
      // VIP goes to WhatsApp directly
      window.open(card.ctaHref, '_blank');
      onClose();
    } else if (card.id === 'business') {
      // Business opens business modal
      onClose();
      if (onOpenBusinessModal) {
        onOpenBusinessModal();
      }
    }
  };

  const handlePhoneSubmit = () => {
    // Validate phone number
    if (phoneNumber.length >= 9) {
      // Save phone number (you can send to backend here)
      console.log('Phone captured:', countryCode + phoneNumber);
      
      // Move to personal info screen
      setShowPhoneInput(false);
      setShowPersonalInfo(true);
    } else {
      alert('الرجاء إدخال رقم جوال صحيح');
    }
  };

  const handlePersonalInfoSubmit = () => {
    // Validate personal info
    if (!fullName || !birthDate || !idNumber) {
      alert('الرجاء إدخال جميع البيانات المطلوبة');
      return;
    }
    
    console.log('Personal Info:', { fullName, birthDate, idType, idNumber });
    
    // Move to payment screen
    setShowPersonalInfo(false);
    setShowPayment(true);
  };

  const handlePaymentSubmit = () => {
    if (!selectedPaymentMethod) {
      alert('الرجاء اختيار طريقة الدفع');
      return;
    }
    
    console.log('Payment Method:', selectedPaymentMethod);
    
    // Move to success screen
    setShowPayment(false);
    setShowSuccess(true);
  };

  const handleSelectPackage = (pkg: Package) => {
    setSelectedPackage(pkg);
    // Show phone input after selecting package
    setShowPhoneInput(true);
  };

  const handleBack = () => {
    if (showSuccess) {
      // Close modal on success screen
      onClose();
    } else if (showPayment) {
      setShowPayment(false);
      setShowPersonalInfo(true);
    } else if (showPersonalInfo) {
      setShowPersonalInfo(false);
      setShowPhoneInput(true);
    } else if (showPhoneInput) {
      // Go back to packages
      setShowPhoneInput(false);
      setSelectedPackage(null);
    } else if (showPackages) {
      // Go back to cards
      setShowPackages(false);
      setSelectedCard(null);
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
                {/* Back Button - Show on packages, phone input, personal info, payment and success screens */}
                {(showPackages || showPhoneInput || showPersonalInfo || showPayment || showSuccess) && (
                  <button
                    onClick={handleBack}
                    className="flex items-center gap-1 text-sm md:text-base text-slate-600 hover:text-emerald-600 transition-colors font-semibold"
                  >
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span>{showSuccess ? 'إغلاق' : 'رجوع'}</span>
                  </button>
                )}
                
                <div className="flex-1 text-center">
                  <h2 className="text-xl md:text-3xl font-bold text-slate-900">
                    {showSuccess 
                      ? 'تم الاشتراك بنجاح! 🎉' 
                      : showPayment 
                      ? 'اختر طريقة الدفع' 
                      : showPersonalInfo 
                      ? 'أدخل بياناتك الشخصية' 
                      : showPhoneInput 
                      ? 'أدخل رقم جوالك' 
                      : showPackages 
                      ? 'اختر الباقة المناسبة لك' 
                      : 'اختر البطاقة المناسبة لك'}
                  </h2>
                  {showPhoneInput && (
                    <p className="text-xs md:text-sm text-slate-600 mt-1">
                      سنرسل لك تفاصيل الباقة عبر WhatsApp
                    </p>
                  )}
                  {showPersonalInfo && (
                    <p className="text-xs md:text-sm text-slate-600 mt-1">
                      نحتاج بعض المعلومات لإتمام الاشتراك
                    </p>
                  )}
                  {showPayment && (
                    <p className="text-xs md:text-sm text-slate-600 mt-1">
                      جميع طرق الدفع آمنة ومشفرة 100%
                    </p>
                  )}
                  {showSuccess && (
                    <p className="text-xs md:text-sm text-slate-600 mt-1">
                      حمّل التطبيق الآن وابدأ رحلتك الصحية
                    </p>
                  )}
                  {showPackages && (
                    <p className="text-xs md:text-sm text-slate-600 mt-1">
                      اختر الباقة وابدأ رحلة الرعاية الصحية
                    </p>
                  )}
                  {!showPackages && !showPhoneInput && !showPersonalInfo && !showPayment && !showSuccess && (
                    <p className="text-xs md:text-sm text-slate-600 mt-1">
                      بطاقة واحدة — وفّر حتى ٨٠٪ على احتياجاتك الصحية
                    </p>
                  )}
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
                {!showPackages && !showPhoneInput && !showPersonalInfo && !showPayment && !showSuccess ? (
                  /* Cards Screen (Premier, VIP, Business) */
                  <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
                    {cardTiers.map((tier, index) => (
                      <article
                        key={tier.id}
                        className={`relative rounded-3xl overflow-hidden bg-white hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 flex flex-col ${
                          tier.isRecommended
                            ? 'border-2 border-primary shadow-2xl'
                            : 'border-2 border-slate-200'
                        }`}
                      >
                        {/* Recommended Badge */}
                        {tier.isRecommended && (
                          <div className="absolute top-4 left-4 bg-primary text-white text-xs font-black px-3 py-1.5 rounded-full shadow-lg z-20">
                            الأكثر توفيراً
                          </div>
                        )}

                        {/* Header with Name */}
                        <div className={`${tier.headerBg} ${tier.headerTextColor} p-6 pb-4 relative z-10`}>
                          <h3 className="text-3xl md:text-4xl font-black mb-1">{tier.name}</h3>
                          <p className="text-sm font-medium opacity-90">{tier.tagline}</p>
                        </div>

                        {/* Image Placeholder */}
                        <div className="h-56 md:h-64 relative overflow-hidden">
                          <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                            <div className="text-center p-6">
                              <div className="text-[#4d8080] font-black text-sm mb-2">إشعار للمصممة 🎨</div>
                              <div className="text-gray-600 font-bold text-xs">المقاس: 450×284 بكسل</div>
                              <div className="text-gray-500 text-[10px] mt-1">(نسبة كرت البنك القياسية 1.586:1)</div>
                            </div>
                          </div>
                          <div className={`absolute inset-0 ${tier.isRecommended ? 'bg-gradient-to-t from-slate-900/10 to-transparent' : 'bg-gradient-to-t from-slate-50/50 to-transparent'}`} />
                        </div>

                        {/* Content Section */}
                        <div className="p-6 lg:p-8 flex-1 flex flex-col">
                          {/* Price */}
                          <div className="mb-6 pb-6 border-b border-slate-100">
                            {typeof tier.priceYearly === 'number' ? (
                              <>
                                <div className="flex items-baseline gap-2 mb-1 justify-center" dir="rtl">
                                  <span className="text-5xl md:text-6xl font-black tracking-tight text-slate-900">
                                    {tier.priceYearly.toLocaleString('ar-SA')}
                                  </span>
                                  <Image 
                                    src="/images/riyal-symbol.png" 
                                    alt="ريال سعودي" 
                                    width={32} 
                                    height={32} 
                                    className="object-contain"
                                  />
                                </div>
                                <p className="text-sm text-slate-500 font-medium text-center">
                                  سنوياً (~ {typeof tier.priceMonthly === 'number' ? tier.priceMonthly.toLocaleString('ar-SA') : tier.priceMonthly} ريال/شهر)
                                </p>
                              </>
                            ) : (
                              <div className="text-center">
                                <span className="text-3xl md:text-4xl font-black text-slate-900">
                                  {tier.priceYearly}
                                </span>
                                <p className="text-sm text-slate-500 font-medium mt-2">
                                  أسعار تنافسية حسب عدد الموظفين
                                </p>
                              </div>
                            )}
                          </div>

                          {/* Intro Text */}
                          <p className="text-sm font-bold text-slate-700 mb-4 bg-slate-50 px-3 py-2 rounded-lg">
                            {tier.isRecommended ? 'كل مزايا Premier، بالإضافة إلى:' : tier.id === 'business' ? 'حلول صحية متكاملة لموظفيك' : 'بطاقتك الأساسية للرعاية اليومية'}
                          </p>

                          {/* Features */}
                          <ul className="space-y-3 mb-8 flex-1">
                            {tier.features.map((feature, i) => (
                              <li key={i} className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                                <span className="text-sm leading-relaxed text-slate-700 font-medium">{feature}</span>
                              </li>
                            ))}
                          </ul>

                          {/* CTA */}
                          <Button
                            onClick={() => handleCardSelect(tier)}
                            size="lg"
                            className={`w-full text-base font-black py-6 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg ${
                              tier.isRecommended 
                                ? 'bg-primary hover:bg-primary/90 shadow-primary/20 text-white' 
                                : tier.id === 'business'
                                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-emerald-900/20'
                                : 'bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/20'
                            }`}
                          >
                            {tier.ctaLabel}
                          </Button>

                          {/* Payment Note */}
                          <div className="flex items-center justify-center gap-2 mt-4">
                            <p className="text-xs text-slate-500 font-medium">متاح بالتقسيط عبر</p>
                            <div className="flex items-center gap-2">
                              <img 
                                src="/images/Tabby-01.png" 
                                alt="Tabby" 
                                className="h-5 object-contain"
                              />
                              <span className="text-slate-300">/</span>
                              <img 
                                src="/images/Tamara.png" 
                                alt="Tamara" 
                                className="h-5 object-contain"
                              />
                            </div>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : showPhoneInput ? (
                  /* Phone Input Screen */
                  <div className="flex flex-col items-center justify-center h-full text-center space-y-6 py-8">
                    {/* Icon */}
                    <div className="relative w-24 h-24 md:w-32 md:h-32">
                      <div className="absolute inset-0 bg-emerald-500 rounded-full animate-pulse opacity-20"></div>
                      <div className="relative w-full h-full bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-xl">
                        <svg className="w-12 h-12 md:w-16 md:h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>

                    {/* Title */}
                    <div className="space-y-2">
                      <h3 className="text-2xl md:text-3xl font-black text-slate-900">
                        أدخل رقم جوالك
                      </h3>
                      <p className="text-sm md:text-base text-slate-600 max-w-md">
                        سنرسل لك تفاصيل باقة <span className="font-bold text-emerald-600">{selectedPackage?.name}</span> عبر WhatsApp
                      </p>
                    </div>

                    {/* Phone Input */}
                    <div className="w-full max-w-md space-y-4">
                      <div className="flex gap-2" dir="ltr">
                        {/* Country Code */}
                        <select
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          className="w-24 px-3 py-3 text-base border-2 border-slate-300 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 outline-none transition-all bg-white font-semibold"
                        >
                          <option value="+966">🇸🇦 +966</option>
                          <option value="+971">🇦🇪 +971</option>
                          <option value="+965">🇰🇼 +965</option>
                          <option value="+973">🇧🇭 +973</option>
                          <option value="+974">🇶🇦 +974</option>
                          <option value="+968">🇴🇲 +968</option>
                        </select>

                        {/* Phone Number */}
                        <input
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                          placeholder="5xxxxxxxx"
                          maxLength={9}
                          className="flex-1 px-4 py-3 text-base border-2 border-slate-300 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 outline-none transition-all font-semibold"
                          dir="ltr"
                        />
                      </div>

                      {/* Submit Button */}
                      <Button
                        onClick={handlePhoneSubmit}
                        disabled={phoneNumber.length < 9}
                        size="lg"
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-base md:text-lg py-6 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        متابعة ← حمّل التطبيق
                      </Button>

                      {/* Trust Badges */}
                      <div className="flex items-center justify-center gap-4 text-xs text-slate-500 pt-2">
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                          </svg>
                          <span>آمن 100%</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                          <span>بدون إزعاج</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : showPersonalInfo ? (
                  /* Personal Info Screen */
                  <PersonalInfoStep
                    fullName={fullName}
                    setFullName={setFullName}
                    birthDate={birthDate}
                    setBirthDate={setBirthDate}
                    idType={idType}
                    setIdType={setIdType}
                    idNumber={idNumber}
                    setIdNumber={setIdNumber}
                    onSubmit={handlePersonalInfoSubmit}
                  />
                ) : showPayment ? (
                  /* Payment Screen */
                  <PaymentStep
                    selectedPaymentMethod={selectedPaymentMethod}
                    setSelectedPaymentMethod={setSelectedPaymentMethod}
                    onSubmit={handlePaymentSubmit}
                    packagePrice={selectedPackage?.price}
                  />
                ) : showSuccess ? (
                  /* Success Screen */
                  <SuccessStep
                    selectedPackage={selectedPackage}
                    fullName={fullName}
                    phoneNumber={phoneNumber}
                    countryCode={countryCode}
                    idType={idType}
                    idNumber={idNumber}
                    selectedCard={selectedCard}
                  />
                ) : showPackages ? (
                  /* Packages Grid */
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    {packages.map((pkg) => {
                      const isSelected = selectedPackage?.id === pkg.id;

                      return (
                        <motion.div
                          key={pkg.id}
                          whileHover={{ y: -4 }}
                          whileTap={{ scale: 0.98 }}
                          className={`relative rounded-2xl border-2 p-4 transition-all ${
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
                              <div className="absolute bottom-2 left-2 right-2 bg-white/95 backdrop-blur-sm rounded-lg px-2 py-1.5 flex items-center justify-center gap-1.5 shadow-md">
                                <Bell className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                                <span className="text-[10px] md:text-xs text-slate-700 font-medium text-center">
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

                            {/* Features */}
                            {pkg.features && pkg.features.length > 0 && (
                              <ul className="text-center space-y-1.5 mb-3 px-2">
                                {pkg.features.map((feature, idx) => (
                                  <li key={idx} className="flex items-center justify-center gap-1.5 text-[10px] md:text-xs text-slate-700">
                                    <svg className="w-3 h-3 md:w-3.5 md:h-3.5 text-emerald-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="leading-tight">{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            )}

                            {/* Subscribe Button */}
                            <button
                              onClick={() => handleSelectPackage(pkg)}
                              className="w-full py-2 md:py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-xs md:text-sm rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                            >
                              اشترك الآن
                            </button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
