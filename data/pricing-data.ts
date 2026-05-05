/**
 * Pricing Data Configuration
 * ⚠️ IMPORTANT: Review all prices with business team before production deployment
 */

export interface PricingTier {
  id: 'basic' | 'plus' | 'vip';
  name: string;
  nameEn: string;
  price: {
    monthly: number;
    yearly: number;
    yearlyMonthly: number; // yearly price divided by 12
  };
  badge?: string;
  recommended?: boolean;
  description: string;
  targetAudience: string;
  features: PricingFeature[];
  cta: string;
}

export interface PricingFeature {
  name: string;
  value: string | boolean;
  highlight?: boolean;
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'basic',
    name: 'أمان',
    nameEn: 'Aman',
    price: {
      monthly: 199,
      yearly: 1990,
      yearlyMonthly: 166,
    },
    description: 'الباقة الأساسية',
    targetAudience: 'مناسب للأفراد الذين يدفعون من جيبهم أو لديهم تأمين أساسي',
    features: [
      { name: 'الشبكة الطبية', value: '200+ منشأة' },
      { name: 'نسبة الخصم القصوى', value: 'حتى 50%', highlight: true },
      { name: 'استشارات عن بُعد', value: '5 شهرياً' },
      { name: 'رعاية منزلية', value: '2 زيارة شهرياً' },
      { name: 'محفظة نقاط Cashback', value: '5%' },
      { name: 'دعم 24/7', value: true },
      { name: 'الأسنان والتجميل', value: false },
      { name: 'طبيب شخصي مخصص', value: false },
      { name: 'تغطية العائلة', value: 'فرد واحد' },
      { name: 'مدة استجابة الطبيب', value: '30 دقيقة' },
      { name: 'فحص سنوي مجاني', value: false },
    ],
    cta: 'اختر أمان',
  },
  {
    id: 'plus',
    name: 'أمان بلس',
    nameEn: 'Aman Plus',
    price: {
      monthly: 349,
      yearly: 3490,
      yearlyMonthly: 291,
    },
    badge: '⭐ الأكثر اختياراً',
    recommended: true,
    description: 'الباقة الموصى بها',
    targetAudience: 'مناسب للعائلات والمقيمين الباحثين عن وصول أوسع',
    features: [
      { name: 'الشبكة الطبية', value: '500+ منشأة' },
      { name: 'نسبة الخصم القصوى', value: 'حتى 70%', highlight: true },
      { name: 'استشارات عن بُعد', value: 'غير محدود' },
      { name: 'رعاية منزلية', value: '5 زيارات شهرياً' },
      { name: 'محفظة نقاط Cashback', value: '7%' },
      { name: 'دعم 24/7', value: true },
      { name: 'الأسنان والتجميل', value: true },
      { name: 'طبيب شخصي مخصص', value: false },
      { name: 'تغطية العائلة', value: 'حتى 2 أفراد' },
      { name: 'مدة استجابة الطبيب', value: '15 دقيقة' },
      { name: 'فحص سنوي مجاني', value: 'فحص أساسي' },
      { name: 'أولوية الحجز', value: true },
      { name: 'نقاط مضاعفة', value: true },
    ],
    cta: 'اختر بلس',
  },
  {
    id: 'vip',
    name: 'أمان VIP',
    nameEn: 'Aman VIP',
    price: {
      monthly: 699,
      yearly: 6990,
      yearlyMonthly: 583,
    },
    description: 'الباقة المميزة',
    targetAudience: 'مناسب للمهنيين وكبار السن والراغبين في الراحة الكاملة',
    features: [
      { name: 'الشبكة الطبية', value: 'كامل الشبكة' },
      { name: 'نسبة الخصم القصوى', value: 'حتى 80%', highlight: true },
      { name: 'استشارات عن بُعد', value: 'غير محدود' },
      { name: 'رعاية منزلية', value: 'غير محدود' },
      { name: 'محفظة نقاط Cashback', value: '10%' },
      { name: 'دعم 24/7', value: true },
      { name: 'الأسنان والتجميل', value: true },
      { name: 'طبيب شخصي مخصص', value: true },
      { name: 'تغطية العائلة', value: 'حتى 4 أفراد' },
      { name: 'مدة استجابة الطبيب', value: '5 دقائق (مضمون)' },
      { name: 'فحص سنوي مجاني', value: 'فحص شامل + تقارير تفصيلية' },
      { name: 'أولوية الحجز', value: true },
      { name: 'نقاط ثلاثية', value: true },
      { name: 'مدير علاقات مخصص', value: true },
    ],
    cta: 'اختر VIP',
  },
];

export interface ComparisonFeature {
  name: string;
  basic: string | boolean;
  plus: string | boolean;
  vip: string | boolean;
}

export const COMPARISON_FEATURES: ComparisonFeature[] = [
  {
    name: 'الشبكة الطبية',
    basic: '200+ منشأة',
    plus: '500+ منشأة',
    vip: 'كامل الشبكة',
  },
  {
    name: 'نسبة الخصم القصوى',
    basic: '50%',
    plus: '70%',
    vip: '80%',
  },
  {
    name: 'استشارات عن بُعد',
    basic: '5/شهر',
    plus: 'غير محدود',
    vip: 'غير محدود',
  },
  {
    name: 'رعاية منزلية',
    basic: '2/شهر',
    plus: '5/شهر',
    vip: 'غير محدود',
  },
  {
    name: 'Cashback',
    basic: '5%',
    plus: '7%',
    vip: '10%',
  },
  {
    name: 'الأسنان والتجميل',
    basic: false,
    plus: true,
    vip: true,
  },
  {
    name: 'طبيب شخصي مخصص',
    basic: false,
    plus: false,
    vip: true,
  },
  {
    name: 'تغطية العائلة',
    basic: 'فرد واحد',
    plus: 'حتى 2',
    vip: 'حتى 4',
  },
  {
    name: 'مدة استجابة الطبيب',
    basic: '30 دقيقة',
    plus: '15 دقيقة',
    vip: '5 دقائق',
  },
  {
    name: 'فحص سنوي مجاني',
    basic: false,
    plus: 'أساسي',
    vip: 'شامل',
  },
  {
    name: 'دعم العملاء',
    basic: 'تطبيق فقط',
    plus: 'تطبيق + هاتف',
    vip: 'مدير علاقات مخصص',
  },
];

export interface FAQItem {
  question: string;
  answer: string;
}

export const PRICING_FAQ: FAQItem[] = [
  {
    question: 'هل أمان إيفر بديل للتأمين الصحي؟',
    answer: 'لا، أمان إيفر ليس تأميناً صحياً. هو بطاقة عضوية للحصول على خصومات فورية على الخدمات الطبية. يمكنك استخدامه بجانب تأمينك الحالي أو بدونه للحصول على توفير إضافي.',
  },
  {
    question: 'هل البطاقة تغني عن التأمين الإلزامي للمقيمين؟',
    answer: 'لا. التأمين الصحي الإلزامي للمقيمين في المملكة لا يزال مطلوباً قانونياً. أمان إيفر يكمّل تأمينك الحالي ويوفر لك خصومات إضافية وخدمات غير مشمولة في التأمين التقليدي.',
  },
  {
    question: 'هل يوجد فترة انتظار قبل بدء الخصومات؟',
    answer: 'لا، على الإطلاق. الخصومات تبدأ من اليوم الأول لاشتراكك. يمكنك استخدام البطاقة فوراً بعد التفعيل.',
  },
  {
    question: 'هل يوجد موافقات مسبقة للخدمات؟',
    answer: 'لا. جميع الخدمات المشمولة في باقتك متاحة بدون موافقات مسبقة. فقط أظهر بطاقتك الرقمية عبر التطبيق واحصل على الخصم مباشرة.',
  },
  {
    question: 'هل يمكنني إلغاء الاشتراك في أي وقت؟',
    answer: 'نعم. يمكنك إلغاء اشتراكك في أي وقت. للمزيد من التفاصيل، راجع سياسة الإلغاء.',
  },
  {
    question: 'كيف أستخدم البطاقة؟',
    answer: 'استخدام البطاقة سهل جداً. حمّل تطبيق أمان إيفر، وعند زيارة أي منشأة طبية من شبكتنا، أظهر رمز QR الخاص بك من التطبيق. سيتم تطبيق الخصم تلقائياً.',
  },
  {
    question: 'هل التغطية تشمل الأمراض المزمنة؟',
    answer: 'نعم. جميع الخدمات الطبية مشمولة بدون استثناء للأمراض المزمنة أو الحالات الموجودة مسبقاً. هذا على عكس معظم التأمينات التقليدية.',
  },
  {
    question: 'ما الفرق بين الباقات الثلاث؟',
    answer: 'الفرق الرئيسي يكمن في نسبة الخصم (50% - 70% - 80%)، حجم الشبكة الطبية، عدد الاستشارات عن بُعد، وعدد أفراد العائلة المشمولين. راجع جدول المقارنة أعلاه للتفاصيل الكاملة.',
  },
  {
    question: 'هل يمكن ترقية أو تخفيض الباقة؟',
    answer: 'نعم، يمكنك تغيير باقتك في أي وقت. التغيير يسري في دورة الفوترة التالية. تواصل مع فريق الدعم عبر التطبيق لإجراء التغيير.',
  },
  {
    question: 'هل الدفع بالتقسيط متاح؟',
    answer: 'نعم. نوفر خيارات الدفع بالتقسيط عبر تابي وتمارا من 3 إلى 12 شهراً بدون فوائد.',
  },
  {
    question: 'هل الباقة تغطي المستشفيات الحكومية؟',
    answer: 'نعم، بعض الخدمات الإضافية في المستشفيات الحكومية مشمولة. راجع قائمة الشبكة الطبية في التطبيق للتفاصيل.',
  },
  {
    question: 'ماذا لو سافرت خارج السعودية؟',
    answer: 'الخدمات الرقمية مثل الاستشارات الطبية عن بُعد متاحة عالمياً. أما الخصومات على الخدمات الطبية فهي متاحة داخل المملكة فقط.',
  },
];

// Calculator default values and multipliers
export const CALCULATOR_DEFAULTS = {
  doctorVisits: 6,
  dentalVisits: 2,
  monthlyMedicine: 500,
  homeCare: false,
};

export const CALCULATOR_COSTS = {
  avgDoctorVisit: 300,
  avgDentalVisit: 800,
  avgHomeCareVisit: 600,
  homeCareVisitsPerYear: 12,
};

export const CALCULATOR_DISCOUNTS = {
  basic: 0.5,
  plus: 0.7,
  vip: 0.8,
};
