// Footer configuration - Single source of truth for all footer data
// TODO: Update social URLs and app store links before launch

export const FOOTER_CONFIG = {
  brand: {
    nameAr: "أمان إيفر والرعاية الشاملة للخدمات الطبية",
    nameEn: "AMAN EVER COMPANY & COMPREHENSIVE CARE OF MEDICAL SERVICES",
    tagline: "شريككم الموثوق في الرعاية الصحية. نوفّر لك ولعائلتك أفضل الخدمات الطبية بلمسة واحدة عبر تطبيقنا المبتكر.",
    cr: "7038166471",
    logoSrc: "/images/logo.png",
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
  },
  social: [
    { platform: "facebook", url: "#", label: "تابعنا على فيسبوك" }, // TODO: Add real URL
    { platform: "instagram", url: "#", label: "تابعنا على إنستغرام" }, // TODO: Add real URL
    { platform: "snapchat", url: "#", label: "أضفنا على سناب شات" }, // TODO: Add real URL
    { platform: "tiktok", url: "#", label: "تابعنا على تيك توك" }, // TODO: Add real URL
    { platform: "x", url: "#", label: "تابعنا على إكس" }, // TODO: Add real URL
    { platform: "linkedin", url: "#", label: "تواصل معنا عبر لينكد إن" }, // TODO: Add real URL
    { platform: "youtube", url: "#", label: "اشترك في قناتنا على يوتيوب" }, // TODO: Add real URL
  ],
  quickLinks: [
    { label: "عن أمان إيفر", url: "https://amanever.com/#about" }, // TODO: Convert to /ar/about
    { label: "مميزاتنا", url: "https://amanever.com/#features" }, // TODO: Convert to /ar/features
    { label: "حجوزاتي واستشاراتي الطبية", url: "https://amanever.com/#my-bookings" },
    { label: "خدماتنا الطبية", url: "https://amanever.com/#services-package" },
    { label: "خدمات الرعاية المنزلية", url: "https://amanever.com/#service-homeCare" },
    { label: "عن بطاقات وباقات أمان إيفر", url: "https://amanever.com/#service-membership" },
    { label: "الشبكة الطبية والصحية", url: "https://amanever.com/#network" },
    { label: "منصة دخول الأطباء", url: "https://amanever.com/#doctor-platform" },
    { label: "منصة دخول التاجر", url: "https://amanever.com/#merchant-platform" },
    { label: "الخصوصية وسياسة البيانات", url: "https://amanever.com/#privacy" },
  ],
  downloadLinks: [
    { 
      store: "appgallery", 
      url: "https://amanever.com/#", // TODO: Add real AppGallery URL
      badge: "/images/appgallery-badge-ar.svg" 
    },
    // TODO: Add App Store and Google Play when ready
    // { store: "appstore", url: "#", badge: "/images/app-store-badge-ar.svg" },
    // { store: "googleplay", url: "#", badge: "/images/google-play-badge-ar.svg" },
  ],
  legalLinks: [
    { label: "سياسة الخصوصية", url: "/ar/privacy" }, // TODO: Create page
    { label: "الشروط والأحكام", url: "/ar/terms" }, // TODO: Create page
    { label: "اتصل بنا", url: "/ar/contact" }, // TODO: Create page
  ],
  copyright: "© 2026 أمان إيفر والرعاية الشاملة للخدمات الطبية. جميع الحقوق محفوظة.",
} as const;

export type FooterConfig = typeof FOOTER_CONFIG;
