/**
 * Footer Configuration - New Structure
 * Single source of truth for all footer data
 * 
 * PLACEHOLDERS TO FILL:
 * - APP_RATING: Replace with actual app rating (e.g., "4.8")
 * - DOWNLOAD_COUNT: Replace with actual download count (e.g., "50,000+")
 * - Newsletter endpoint: Add to form action when backend is ready
 * - Compliance badges: Confirm which ones are actually available
 */

export const FOOTER_CONFIG_NEW = {
  brand: {
    nameAr: "أمان إيفر والرعاية الشاملة للخدمات الطبية",
    nameEn: "AMAN EVER COMPANY & COMPREHENSIVE CARE OF MEDICAL SERVICES",
    tagline: "شريككم الموثوق في الرعاية الصحية — خدمات طبية متكاملة بلمسة واحدة.",
    cr: "7038166471",
    logoSrc: "/images/logo.png",
    madeinSaudi: true, // Show "صنع في السعودية" badge
  },

  address: {
    city: "جدة، البغدادية الشرقية",
    building: "مبنى البغدادية بلازا",
    country: "SA",
  },

  contact: {
    hotline: "920018041",
    whatsapp: "966544608220",
    whatsappDisplay: "0544608220",
    landline: "0126142206",
    email: "info@amanever.com",
    workingHours: {
      ar: "الأحد - الخميس: 9 صباحاً - 6 مساءً",
      note: "خط الطوارئ الطبية متاح 24/7",
    },
    languages: ["ar", "en", "ur"], // Arabic, English, Urdu
  },

  social: [
    { platform: "facebook", url: "#", label: "تابعنا على فيسبوك" },
    { platform: "instagram", url: "#", label: "تابعنا على إنستغرام" },
    { platform: "snapchat", url: "#", label: "أضفنا على سناب شات" },
    { platform: "tiktok", url: "#", label: "تابعنا على تيك توك" },
    { platform: "x", url: "#", label: "تابعنا على إكس" },
    { platform: "linkedin", url: "#", label: "تواصل معنا عبر لينكد إن" },
    { platform: "youtube", url: "#", label: "اشترك في قناتنا على يوتيوب" },
  ],

  // Section A: المنصة
  platformLinks: [
    { label: "البطاقات والباقات", url: "/ar/pricing" }, // ✅ Updated to dedicated pricing page
    { label: "الشبكة الطبية والصحية", url: "/ar#medical-network-heading" },
    { label: "خدماتنا الطبية", url: "/ar/services" },
    { label: "خدمات الرعاية المنزلية", url: "/ar#core-services-heading" },
    { label: "المدونة", url: "/ar/blog" }, // ✅ Updated to dedicated blog page
    { label: "الأسئلة الشائعة", url: "/ar#faq-section" },
  ],

  // Section B: للشركاء
  partnerLinks: [
    { label: "منصة دخول الأطباء", url: "#" }, // TODO: Create /ar/doctors/login
    { label: "منصة دخول التاجر", url: "#" }, // TODO: Create /ar/merchants/login
    { label: "منصة المسوق بالعمولة", url: "#" }, // TODO: Create /ar/affiliates
    { label: "فرص وظيفية", url: "#" }, // TODO: Create /ar/careers
    { label: "للمستثمرين", url: "#" }, // TODO: Create /ar/investors (optional)
  ],

  // Section C: قانوني (Bottom bar)
  legalLinks: [
    { label: "سياسة الخصوصية والبيانات (PDPL)", url: "/ar/privacy-policy" },
    { label: "شروط الاستخدام", url: "/ar/terms-of-use" },
    { label: "سياسة الاسترداد", url: "/ar/refund-policy" },
    { label: "إعدادات ملفات تعريف الارتباط", url: "/ar/cookie-settings" },
  ],

  // App download section
  app: {
    rating: "4.8",
    downloads: "50,000+",
    qrCode: "/images/app-qr-code.png", // Temporary QR code component
    stores: [
      { 
        name: "App Store",
        url: "https://apps.apple.com/sa/app/amanever",
        badge: "/images/app-store-ar.png"
      },
      { 
        name: "Google Play",
        url: "https://play.google.com/store/apps/details?id=com.amanever",
        badge: "/images/google-play-ar.png"
      },
      { 
        name: "Huawei AppGallery",
        url: "https://appgallery.huawei.com/app/amanever",
        badge: "/images/huawei-appgallery-ar.png"
      },
    ],
  },

  // Newsletter
  newsletter: {
    enabled: true,
    title: "اشترك في نصائح صحية أسبوعية",
    placeholder: "بريدك الإلكتروني",
    buttonText: "اشتراك",
    action: "#", // TODO: Add /api/newsletter/subscribe endpoint
  },

  // Trust badges (middle strip)
  trustBadges: [
    { icon: "shield", label: "متوافق مع PDPL", verified: true },
    { icon: "building", label: "مرخّص من وزارة الصحة", verified: true },
    { icon: "credit-card", label: "طرق الدفع: مدى · فيزا · ماستركارد · Apple Pay · تابي · تمارا", verified: true },
    { icon: "lock", label: "موقع آمن — SSL 256-bit", verified: true },
  ],

  // Compliance badges (bottom bar)
  complianceBadges: {
    // Confirmed and enabled
    vision2030: {
      enabled: true,
      logo: "/images/badges/vision-2030.png",
      label: "متوافق مع رؤية 2030",
    },
    sdaia: {
      enabled: true,
      logo: "/images/badges/sdaia.png",
      label: "معتمد من SDAIA",
    },
    zatca: {
      enabled: true,
      logo: "/images/badges/zatca.png",
      label: "متوافق مع ZATCA",
    },
  },

  copyright: "© 2026 أمان إيفر والرعاية الشاملة للخدمات الطبية. جميع الحقوق محفوظة.",
} as const;

export type FooterConfigNew = typeof FOOTER_CONFIG_NEW;
