/**
 * Services Page Configuration
 * Single source of truth for all Aman Ever services
 */

import type { LucideIcon } from 'lucide-react';

// ============================================================================
// TYPES
// ============================================================================

export interface AudienceTab {
  id: 'patients' | 'doctors' | 'partners' | 'affiliates';
  icon: string;
  label: string;
  description: string;
  sectionId: string;
}

export interface ServiceFeature {
  text: string;
  verified: boolean; // TODO: Verify with product team before launch
}

export interface PatientService {
  id: string;
  icon: string;
  title: string;
  tagline: string;
  description: string;
  features: ServiceFeature[];
  cta: {
    text: string;
    href: string;
  };
}

export interface FinancialSolution {
  id: string;
  icon: string;
  headline: string;
  description: string;
  keyStat: string;
}

export interface DoctorBenefit {
  icon: string;
  title: string;
  description: string;
}

export interface DoctorStep {
  number: number;
  title: string;
  description: string;
}

export interface B2BService {
  id: string;
  icon: string;
  title: string;
  description: string;
  benefits: string[];
}

export interface CTAPath {
  id: string;
  icon: string;
  audience: string;
  ctaText: string;
  ctaHref?: string;
  subtitle: string;
  showAppBadges?: boolean;
}

export interface AffiliateTier {
  id: string;
  name: string;
  icon: string;
  minReferrals: number;
  maxReferrals: number | null;
  bonus: string;
  benefits: string[];
}

export interface AffiliateCommission {
  plan: string;
  price: string;
  initialCommission: string;
  recurringCommission: string;
  amount: string;
  recurringAmount: string;
}

export interface AffiliateBenefit {
  icon: string;
  title: string;
  description: string;
}

export interface AffiliateStep {
  number: number;
  title: string;
  description: string;
}

// ============================================================================
// HERO CONTENT
// ============================================================================

export const heroContent = {
  eyebrow: 'خدماتنا',
  title: 'منظومة رقمية متكاملة لكل احتياجاتك الصحية',
  subtitle:
    'سواء كنت تبحث عن خدمة طبية لك ولعائلتك، أو طبيباً يريد الوصول لمزيد من المرضى، أو منشأة طبية تسعى للتوسع الرقمي — أمان إيفر تقدم المنصة التي تناسبك.',
} as const;

// ============================================================================
// AUDIENCE TABS
// ============================================================================

export const audienceTabs: AudienceTab[] = [
  {
    id: 'patients',
    icon: 'User',
    label: 'للمستفيدين',
    description: 'خدمات طبية للأفراد والعائلات',
    sectionId: 'for-patients',
  },
  {
    id: 'doctors',
    icon: 'Stethoscope',
    label: 'للأطباء',
    description: 'منصة احترافية للأطباء ومقدمي الخدمة',
    sectionId: 'for-doctors',
  },
  {
    id: 'partners',
    icon: 'Building2',
    label: 'للشركاء والمنشآت',
    description: 'حلول B2B للمستشفيات والعيادات',
    sectionId: 'for-partners',
  },
  {
    id: 'affiliates',
    icon: 'TrendingUp',
    label: 'رحلة الثراء',
    description: 'برنامج التسويق بالعمولة — اربح دخل متكرر',
    sectionId: 'for-affiliates',
  },
];

// ============================================================================
// SECTION 2: SERVICES FOR PATIENTS (B2C)
// ============================================================================

export const patientsSection = {
  tag: 'للمستفيدين',
  title: 'خدمات صحية متكاملة — من طلب الاستشارة إلى وصول الدواء',
  subtitle: 'كل ما تحتاجه لرعايتك الصحية اليومية، في تطبيق واحد.',
} as const;

export const patientServices: PatientService[] = [
  {
    id: 'telemedicine',
    icon: 'Video',
    title: 'الرعاية الطبية عن بُعد',
    tagline: 'استشارة طبية في 15 دقيقة، بدون موعد',
    description:
      'احجز استشارة فورية مع أطباء متخصصين عبر مكالمة فيديو آمنة. اطرح أسئلتك، احصل على وصفة طبية إلكترونية، وتابع حالتك الصحية — كل ذلك من منزلك.',
    features: [
      { text: 'أطباء متخصصون في 20+ تخصص طبي', verified: false }, // TODO: Verify specialty count
      { text: 'رد خلال 15 دقيقة، 24/7', verified: false },
      { text: 'وصفة طبية إلكترونية معتمدة', verified: true },
      { text: 'أول استشارة مجانية للأعضاء', verified: false },
    ],
    cta: {
      text: 'ابدأ استشارتك الآن',
      href: '/ar/telemedicine', // TODO: Create this route
    },
  },
  {
    id: 'home-care',
    icon: 'Home',
    title: 'الرعاية المنزلية',
    tagline: 'خدمات طبية في مقر إقامتك',
    description:
      'لا حاجة للانتقال إلى المستشفى. طاقمنا الطبي المؤهل يصلك لتقديم خدمات تمريض، فحوصات، وحقن وريدي في منزلك — بنفس جودة المنشآت الطبية.',
    features: [
      { text: 'تمريض منزلي متخصص', verified: true },
      { text: 'فحوصات مخبرية وعينات دم', verified: true },
      { text: 'حقن وريدي ومحاليل', verified: true },
      { text: 'متابعة ما بعد العمليات', verified: true },
      { text: 'رعاية كبار السن والأطفال', verified: true },
    ],
    cta: {
      text: 'احجز خدمة منزلية',
      href: '/ar/home-care', // TODO: Create this route
    },
  },
  {
    id: 'store',
    icon: 'ShoppingBag',
    title: 'متجر أمان الإلكتروني',
    tagline: 'منتجات وخدمات طبية بأسعار مخفضة',
    description:
      'منصة مدمجة لشراء الأدوية، المكملات الغذائية، المستلزمات الطبية، والخدمات الصحية — بخصومات حصرية لأعضاء أمان إيفر.',
    features: [
      { text: 'أدوية ومكملات معتمدة', verified: true },
      { text: 'مستلزمات طبية وأجهزة منزلية', verified: true },
      { text: 'توصيل سريع لجميع مدن المملكة', verified: true },
      { text: 'خصومات تصل إلى 40% للأعضاء', verified: false }, // TODO: Verify discount percentage
    ],
    cta: {
      text: 'تصفح المتجر',
      href: '/ar/store', // TODO: Create this route
    },
  },
  {
    id: 'membership',
    icon: 'CreditCard',
    title: 'باقات وبطاقات أمان إيفر',
    tagline: 'اشترك مرة، وفّر طوال السنة',
    description:
      'عضوية سنوية تمنحك خصومات تصل إلى 80% على الخدمات الطبية في شبكة من 500+ مستشفى، عيادة، وصيدلية في جميع أنحاء المملكة.',
    features: [
      { text: 'خصومات تصل إلى 80%', verified: true },
      { text: '500+ مقدم خدمة طبية', verified: true },
      { text: 'استرداد كامل خلال 14 يوم', verified: false }, // TODO: Verify refund policy
      { text: 'مفتوحة للجميع — بدون شروط صحية', verified: true },
    ],
    cta: {
      text: 'اختار باقتك',
      href: '/ar/membership', // TODO: Create this route or use existing
    },
  },
];

export const membershipPlans = [
  { name: 'Premier', price: '199 ريال/سنة' },
  { name: 'VIP', price: '499 ريال/سنة' },
] as const;

export const patientsCTA = {
  title: 'جاهز للبدء؟',
  subtitle: 'انضم لآلاف المستفيدين واحصل على خصومات فورية',
  primary: {
    text: 'حمّل التطبيق الآن',
    href: '#download',
  },
  secondary: {
    text: 'اشترك في العضوية',
    href: '/ar/membership',
  },
} as const;

// ============================================================================
// SECTION 3: FINANCIAL SOLUTIONS
// ============================================================================

export const financialSection = {
  tag: 'ميزة حصرية',
  title: 'الحلول المالية الذكية — قيمة مضافة تتجاوز الخصومات',
  subtitle: 'نحن لا نقدم خصومات فقط — نبني منظومة مالية تكافئك على كل استخدام.',
  complianceNote:
    '📜 جميع الحلول المالية الذكية تعمل ضمن إطار تنظيمي معتمد من الجهات الرقابية في المملكة العربية السعودية.',
} as const;

export const financialSolutions: FinancialSolution[] = [
  {
    id: 'discounts',
    icon: 'Percent',
    headline: 'خصومات حصرية تصل إلى 80%',
    description:
      'خصومات تفاوضية ثابتة مع شركاء أمان إيفر — تسري من اليوم الأول لاشتراكك.',
    keyStat: '+500 شريك طبي',
  },
  {
    id: 'cashback',
    icon: 'RefreshCcw',
    headline: 'استرداد نقدي على كل استخدام',
    description:
      'احصل على نسبة استرداد نقدي مباشرة إلى محفظتك على الخدمات المختارة، ضمن إطار تنظيمي معتمد.',
    keyStat: 'حتى 10% كاش باك', // TODO: Verify cashback percentage
  },
  {
    id: 'points',
    icon: 'Wallet',
    headline: 'اكسب نقاطاً. استبدلها بخدمات.',
    description:
      'كل استخدام يكسبك نقاطاً يمكنك استبدالها بخدمات طبية، منتجات المتجر، أو تمديد عضويتك.',
    keyStat: 'تحوّل النقاط إلى قيمة حقيقية',
  },
];

// ============================================================================
// SECTION 4: SERVICES FOR DOCTORS
// ============================================================================

export const doctorsSection = {
  tag: 'للأطباء ومقدمي الخدمة',
  title: 'انضم لمنصة الأطباء في أمان إيفر',
  subtitle:
    'وسّع قاعدة مرضاك، قدّم الاستشارات عن بُعد، وإدارة عيادتك رقمياً — كلها من منصة واحدة.',
  howToJoinTitle: 'كيف تنضم كطبيب؟',
  eligibilityNote:
    '📋 يشترط: ترخيص ساري من الهيئة السعودية للتخصصات الصحية (SCFHS) + هوية وطنية أو إقامة سارية.', // TODO: Verify eligibility requirements
  ctaTitle: 'جاهز تنضم؟',
} as const;

export const doctorBenefits: DoctorBenefit[] = [
  {
    icon: 'Users',
    title: 'وصول لآلاف المرضى',
    description: 'مرضى يبحثون عن خدمتك في 50+ مدينة حول المملكة.',
  },
  {
    icon: 'Calendar',
    title: 'إدارة مواعيد ذكية',
    description: 'جدولة المواعيد، الاستشارات عن بُعد، والمتابعة — كلها في مكان واحد.',
  },
  {
    icon: 'FileText',
    title: 'وصفات طبية إلكترونية',
    description: 'أصدر وصفات معتمدة إلكترونياً، وتابع حالة المرضى رقمياً.',
  },
  {
    icon: 'TrendingUp',
    title: 'تحليلات وتقارير',
    description: 'لوحة تحكم شاملة بأداء عيادتك، دخلك، ورضا المرضى.',
  },
];

export const doctorSteps: DoctorStep[] = [
  {
    number: 1,
    title: 'قدّم طلبك',
    description: 'املأ نموذج التسجيل مع بياناتك وشهاداتك.',
  },
  {
    number: 2,
    title: 'راجع الفريق طلبك',
    description: 'التحقق من البيانات خلال 48 ساعة.',
  },
  {
    number: 3,
    title: 'ابدأ استقبال المرضى',
    description: 'بعد التفعيل، يبدأ ظهورك في تطبيق أمان إيفر.',
  },
];

export const doctorCTAs = {
  primary: {
    text: 'سجّل كطبيب',
    href: '/ar/doctor-platform', // TODO: Create this route
  },
  secondary: {
    text: 'تواصل مع فريق الأطباء',
    href: 'https://wa.me/966500000000', // TODO: Replace with actual WhatsApp number
  },
} as const;

// ============================================================================
// SECTION 5: SERVICES FOR PARTNERS (B2B)
// ============================================================================

export const partnersSection = {
  tag: 'للشركاء والمنشآت',
  title: 'حلول تقنية للمستشفيات والعيادات والصيدليات',
  subtitle:
    'أمان إيفر تساعد المنشآت الطبية على التوسع الرقمي، زيادة المرضى، وتحسين تجربة المستفيد.',
  metricsTitle: 'أرقام تتحدث عن شراكاتنا:',
  ctaTitle: 'مستعد للشراكة؟',
} as const;

export const b2bServices: B2BService[] = [
  {
    id: 'integration',
    icon: 'Network',
    title: 'الربط التقني مع المنظومة الرقمية',
    description:
      'نوفّر APIs ومنصة تكامل سلسة مع أنظمة إدارة المرضى (HIS) والأنظمة التشغيلية الخاصة بمنشأتك، لضمان تدفق البيانات الآمن والحجز الفوري.',
    benefits: [
      '🔗 APIs موثّقة ومعيارية',
      '🔒 تشفير كامل — PDPL compliant', // TODO: Verify PDPL compliance claims
      '⚡ حجز فوري مع تأكيد آلي',
      '🤝 دعم تقني مخصص',
    ],
  },
  {
    id: 'digital-presence',
    icon: 'Globe',
    title: 'تعزيز حضورك الرقمي',
    description:
      'نساعد منشأتك على الوصول لآلاف المرضى عبر منصتنا، وتحسين تجربة الحجز الرقمي لعملائك الحاليين.',
    benefits: [
      '📱 ظهور في تطبيق أمان إيفر لآلاف المستخدمين',
      '🎯 تسويق موجّه للجمهور المناسب',
      '📊 تحليلات أداء ومرئية حجوزات',
      '💬 إدارة تقييمات وتواصل مع المرضى',
    ],
  },
  {
    id: 'marketing',
    icon: 'Megaphone',
    title: 'حلول تسويقية طبية متخصصة',
    description:
      'حملات تسويق رقمية مصممة خصيصاً لقطاع الرعاية الصحية، تستفيد من بيانات المستخدمين المجمّعة وسلوكهم الصحي.',
    benefits: [
      '📢 حملات تستهدف شرائح محددة',
      '📈 تتبع ROI دقيق',
      '🎨 محتوى تسويقي احترافي',
      '🏆 مواقع متقدمة في التطبيق',
    ],
  },
];

export const partnerMetrics = [
  { label: 'شريك طبي فعّال', value: '500+' },
  { label: 'مدينة سعودية', value: '50+' },
  // TODO: Add real booking metrics if available
  // { label: 'حجز شهرياً', value: 'X+' },
] as const;

export const partnerCTAs = {
  primary: {
    text: 'تواصل مع فريق الشراكات',
    href: 'mailto:partnerships@amanever.com', // TODO: Verify or create this email
  },
  secondary: {
    text: 'احجز عرضاً توضيحياً',
    href: '/ar/partner-demo', // TODO: Create this route
  },
} as const;

// ============================================================================
// SECTION 6: AFFILIATE PROGRAM (WEALTH JOURNEY)
// ============================================================================

export const affiliatesSection = {
  tag: 'رحلة الثراء',
  title: 'اربح دخلاً متكرراً من التسويق بالعمولة',
  subtitle:
    'انضم لبرنامج "رحلة الثراء" واحصل على عمولات سخية على كل إحالة — دخل يتكرر شهرياً طالما العميل مشترك.',
  whyJoinTitle: 'لماذا رحلة الثراء؟',
  commissionsTitle: 'نظام العمولات',
  tiersTitle: 'مستويات المسوقين',
  howItWorksTitle: 'كيف تبدأ رحلتك؟',
  eligibilityTitle: 'من يمكنه الانضمام؟',
  eligibilityNote:
    '✅ مفتوح للجميع: مؤثرين، مدونين، أطباء، موظفين، طلاب، وحتى المستخدمين العاديين! لا يوجد حد أدنى للمتابعين ولا رسوم اشتراك.',
  ctaTitle: 'جاهز لبدء رحلة الثراء؟',
  calculatorTitle: 'احسب دخلك المتوقع',
  calculatorSubtitle: 'مثال واقعي: مسوق يحقق 20 إحالة شهرياً',
} as const;

export const affiliateBenefits: AffiliateBenefit[] = [
  {
    icon: 'RefreshCcw',
    title: 'عمولات متكررة مدى الحياة',
    description: 'احصل على عمولة كل شهر طالما العميل مشترك — دخل سلبي حقيقي.',
  },
  {
    icon: 'TrendingUp',
    title: 'نسب عمولة تنافسية',
    description: 'من 30% إلى 35% عمولة أولية، و15-20% عمولة متكررة على التجديدات.',
  },
  {
    icon: 'Award',
    title: 'مكافآت ومستويات',
    description: 'نظام مستويات (برونزي → ماسي) مع بونصات تصل إلى 15% إضافية.',
  },
  {
    icon: 'BarChart3',
    title: 'لوحة تحكم احترافية',
    description: 'تتبع إحالاتك، عمولاتك، ومعدل التحويل في الوقت الفعلي.',
  },
  {
    icon: 'Package',
    title: 'مواد تسويقية جاهزة',
    description: '20+ بنر، 5 فيديوهات، 15 بوست جاهز، وصفحات هبوط مخصصة.',
  },
  {
    icon: 'Wallet',
    title: 'دفع سريع وموثوق',
    description: 'دفع شهري (كل 15) بحد أدنى 100 ريال عبر تحويل بنكي أو محفظة رقمية.',
  },
];

export const affiliateCommissions: AffiliateCommission[] = [
  {
    plan: 'Premier',
    price: '199 ريال/سنة',
    initialCommission: '30%',
    recurringCommission: '15%',
    amount: '≈ 60 ريال',
    recurringAmount: '≈ 30 ريال/سنة',
  },
  {
    plan: 'VIP',
    price: '499 ريال/سنة',
    initialCommission: '35%',
    recurringCommission: '20%',
    amount: '≈ 175 ريال',
    recurringAmount: '≈ 100 ريال/سنة',
  },
];

export const affiliateTiers: AffiliateTier[] = [
  {
    id: 'bronze',
    name: 'البرونزي',
    icon: 'Medal',
    minReferrals: 0,
    maxReferrals: 10,
    bonus: 'العمولة الأساسية',
    benefits: ['رابط إحالة فريد', 'لوحة تحكم أساسية', 'مواد تسويقية'],
  },
  {
    id: 'silver',
    name: 'الفضي',
    icon: 'Award',
    minReferrals: 11,
    maxReferrals: 30,
    bonus: '+5% بونص',
    benefits: ['كل مزايا البرونزي', 'أولوية في الدعم', 'تقارير متقدمة', 'بونص 500 ريال عند 10 إحالات'],
  },
  {
    id: 'gold',
    name: 'الذهبي',
    icon: 'Crown',
    minReferrals: 31,
    maxReferrals: 50,
    bonus: '+10% بونص',
    benefits: [
      'كل مزايا الفضي',
      'مدير حساب مخصص',
      'مواد تسويقية حصرية',
      'بونص 1,500 ريال عند 25 إحالة',
    ],
  },
  {
    id: 'diamond',
    name: 'الماسي',
    icon: 'Gem',
    minReferrals: 51,
    maxReferrals: null,
    bonus: '+15% بونص',
    benefits: [
      'كل مزايا الذهبي',
      'دعوات لفعاليات حصرية',
      'مكافآت ربع سنوية',
      'بونص 10,000 ريال عند 100 إحالة',
    ],
  },
];

export const affiliateSteps: AffiliateStep[] = [
  {
    number: 1,
    title: 'سجّل مجاناً',
    description: 'املأ نموذج بسيط (3 دقائق) — لا رسوم، لا شروط معقدة.',
  },
  {
    number: 2,
    title: 'احصل على رابطك',
    description: 'موافقة فورية خلال 24 ساعة + رابط إحالة فريد وكود خصم شخصي.',
  },
  {
    number: 3,
    title: 'ابدأ التسويق',
    description: 'شارك رابطك على السوشيال ميديا، المدونة، أو مع أصدقائك وعائلتك.',
  },
  {
    number: 4,
    title: 'اربح واسحب',
    description: 'تتبع عمولاتك في لوحة التحكم واسحب أرباحك كل 15 من الشهر.',
  },
];

export const affiliateCalculator = {
  scenario: 'مسوق يحقق 20 إحالة شهرياً',
  breakdown: [
    { label: '15 × Premier (60 ريال)', value: '900 ريال' },
    { label: '5 × VIP (175 ريال)', value: '875 ريال' },
  ],
  monthlyTotal: '1,775 ريال',
  yearlyRecurring: '≈ 6,000 ريال',
  yearlyTotal: '27,300 ريال',
  note: 'هذا مثال تقديري. الدخل الفعلي يعتمد على عدد الإحالات ومعدل التحويل.',
} as const;

export const affiliateCTAs = {
  primary: {
    text: 'ابدأ رحلة الثراء الآن',
    href: '/ar/affiliate-signup', // TODO: Create this route
  },
  secondary: {
    text: 'تعرف على المزيد',
    href: '/ar/affiliate', // TODO: Create detailed affiliate page
  },
} as const;

// ============================================================================
// SECTION 7: FINAL CTA
// ============================================================================

export const finalCTASection = {
  eyebrow: 'ابدأ الآن',
  title: 'اختار المسار المناسب لك',
} as const;

export const ctaPaths: CTAPath[] = [
  {
    id: 'patients-cta',
    icon: 'User',
    audience: 'للمستفيدين',
    ctaText: 'حمّل التطبيق مجاناً',
    subtitle: 'ابدأ الاستفادة من الخصومات والخدمات في أقل من 5 دقائق.',
    showAppBadges: true,
  },
  {
    id: 'doctors-cta',
    icon: 'Stethoscope',
    audience: 'للأطباء',
    ctaText: 'سجّل كطبيب في أمان إيفر',
    ctaHref: '/ar/doctor-platform',
    subtitle: 'انضم لشبكتنا الطبية ووسّع قاعدة مرضاك.',
  },
  {
    id: 'partners-cta',
    icon: 'Building2',
    audience: 'للشركاء والمنشآت',
    ctaText: 'تواصل مع فريق الشراكات',
    ctaHref: 'mailto:partnerships@amanever.com',
    subtitle: 'احجز عرضاً توضيحياً لنوضّح لك كيف نساعد منشأتك.',
  },
  {
    id: 'affiliates-cta',
    icon: 'TrendingUp',
    audience: 'رحلة الثراء',
    ctaText: 'ابدأ رحلة الثراء',
    ctaHref: '/ar/affiliate-signup',
    subtitle: 'انضم لبرنامج التسويق بالعمولة واربح دخلاً متكرراً.',
  },
];
