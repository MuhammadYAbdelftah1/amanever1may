/**
 * Knowledge Base - Single Source of Truth
 * All organization data, contact info, and configuration
 */

export const knowledge = {
  organization: {
    brandName: "أمان إيفر",
    brandNameEn: "Aman Ever",
    tagline: "رعاية صحية شاملة لك ولعائلتك",
    description:
      "منصة رعاية صحية رقمية توفر استشارات طبية، حجوزات، وخدمات صحية متكاملة في السعودية",
    
    address: {
      ar: "جدة، المملكة العربية السعودية",
      en: "Jeddah, Saudi Arabia",
      full: "شارع الأمير سلطان، حي الزهراء، جدة 23425",
    },
    
    officeHours: {
      weekdays: "الأحد - الخميس: 9:00 ص - 6:00 م",
      weekend: "الجمعة - السبت: مغلق",
      emergency: "خط الطوارئ الطبية: متاح 24/7",
    },
    
    contact: {
      hotline: "920018041",
      landline: "0126142206",
      whatsapp: {
        number: "0544608220",
        url: "https://wa.me/966544608220",
      },
      email: "info@amanever.com",
      partnershipsEmail: "partnerships@amanever.com",
      affiliatesEmail: "affiliates@amanever.com",
      supportEmail: "support@amanever.com",
    },
    
    social: {
      facebook: "https://facebook.com/amanever",
      instagram: "https://instagram.com/amanever",
      twitter: "https://twitter.com/amanever",
      linkedin: "https://linkedin.com/company/amanever",
      youtube: "https://youtube.com/@amanever",
      snapchat: "https://snapchat.com/add/amanever",
      tiktok: "https://tiktok.com/@amanever",
    },
    
    emergency: {
      medical: "997",
      international: "911",
      message: "في حالات الطوارئ الطبية، اتصل فوراً على 997 أو 911",
    },
  },
  
  network: {
    cities: [
      { id: "riyadh", ar: "الرياض", en: "Riyadh" },
      { id: "jeddah", ar: "جدة", en: "Jeddah" },
      { id: "makkah", ar: "مكة المكرمة", en: "Makkah" },
      { id: "madinah", ar: "المدينة المنورة", en: "Madinah" },
      { id: "dammam", ar: "الدمام", en: "Dammam" },
      { id: "khobar", ar: "الخبر", en: "Khobar" },
      { id: "dhahran", ar: "الظهران", en: "Dhahran" },
      { id: "taif", ar: "الطائف", en: "Taif" },
      { id: "tabuk", ar: "تبوك", en: "Tabuk" },
      { id: "buraidah", ar: "بريدة", en: "Buraidah" },
      { id: "khamis", ar: "خميس مشيط", en: "Khamis Mushait" },
      { id: "hail", ar: "حائل", en: "Hail" },
      { id: "najran", ar: "نجران", en: "Najran" },
      { id: "jazan", ar: "جازان", en: "Jazan" },
      { id: "yanbu", ar: "ينبع", en: "Yanbu" },
      { id: "jubail", ar: "الجبيل", en: "Jubail" },
      { id: "abha", ar: "أبها", en: "Abha" },
      { id: "arar", ar: "عرعر", en: "Arar" },
      { id: "sakaka", ar: "سكاكا", en: "Sakaka" },
      { id: "qatif", ar: "القطيف", en: "Qatif" },
    ],
    
    stats: {
      doctors: "500+",
      facilities: "200+",
      cities: "20+",
      patients: "50,000+",
    },
  },
  
  faq: {
    general: [
      {
        id: "what-is-amanever",
        question: "ما هي أمان إيفر؟",
        answer:
          "أمان إيفر منصة رعاية صحية رقمية توفر استشارات طبية عن بُعد، حجوزات في العيادات والمستشفيات، وخدمات صحية متكاملة لك ولعائلتك في جميع أنحاء المملكة.",
      },
      {
        id: "how-to-book",
        question: "كيف أحجز استشارة طبية؟",
        answer:
          "حمّل تطبيق أمان إيفر من App Store أو Google Play، سجّل حساب، واختر الطبيب والوقت المناسب. يمكنك أيضاً الحجز عبر الخط الساخن 920018041.",
      },
      {
        id: "payment-methods",
        question: "ما هي طرق الدفع المتاحة؟",
        answer:
          "نقبل جميع بطاقات الائتمان (Visa, Mastercard, Mada)، Apple Pay، والدفع عند الزيارة في بعض المرافق الشريكة.",
      },
      {
        id: "insurance",
        question: "هل تقبلون التأمين الطبي؟",
        answer:
          "نعم، نتعاون مع أكثر من 30 شركة تأمين. تحقق من قائمة الشركات المتعاونة في التطبيق أو اتصل بنا للتأكد.",
      },
      {
        id: "cancel-appointment",
        question: "كيف ألغي أو أعيد جدولة موعد؟",
        answer:
          "يمكنك الإلغاء أو إعادة الجدولة من التطبيق حتى 4 ساعات قبل الموعد بدون رسوم. بعد ذلك قد تُطبّق رسوم إلغاء.",
      },
    ],
  },
} as const;
