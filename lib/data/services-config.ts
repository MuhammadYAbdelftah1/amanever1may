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
  image?: string; // Optional image path for the card
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
    'سواء كنت تدور على خدمة طبية لك ولعائلتك، أو طبيب يبغى يوصل لمزيد من المرضى، أو منشأة طبية تسعى للتوسع الرقمي — أمان إيفر تقدم المنصة اللي تناسبك.',
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
  tag: 'باقة خدماتنا',
  title: 'رعاية متكاملة.. صُممت لأجلك',
  subtitle: 'وش تحتاج اليوم؟',
  description: 'راحتك هي أولويتنا.. استكشف باقة خدماتنا الشاملة واختر ما يلبي احتياجك بضغطة زر واحدة عبر تطبيق أمان إيفر.',
  sectionSubtitle: 'حلول صحية مبتكرة صممت لضمان راحتك وسلامتك',
} as const;

export const patientServices: PatientService[] = [
  {
    id: 'doctor-booking',
    icon: 'Calendar',
    image: '/logo.jpeg', // TODO: Replace with actual service image
    title: 'حجز موعد مع طبيب',
    tagline: 'بدون موافقات مسبقة — احجز وادخل على طول',
    description:
      'تعبت من الموافقات المسبقة والانتظار أسابيع؟ احجز موعدك مع 500+ مقدم خدمة طبية في 50+ مدينة — بدون موافقات مسبقة — وادخل على طول. أكبر ميزة في السوق السعودي.',
    features: [
      { text: 'بدون موافقات مسبقة في 500+ منشأة (بوبا تقدمها في 7 فقط)', verified: true },
      { text: 'حجز أولوية لمشتركي VIP — تدخل قبل الآخرين', verified: true },
      { text: 'خصم 30-80% + تذكير SMS قبل الموعد', verified: true },
    ],
    cta: {
      text: 'احجز موعدك الحين',
      href: '/ar/doctor-booking',
    },
  },
  {
    id: 'urgent-consultation',
    icon: 'Video',
    image: '/logo.jpeg', // TODO: Replace with actual service image
    title: 'استشارة عاجلة',
    tagline: 'استشارة فيديو فورية — خصم حتى 80%',
    description:
      'حالتك ما تحتمل الانتظار؟ احجز استشارة عاجلة مع طبيب متخصص الحين — فيديو، صوت، أو محادثة نصية. مع بطاقة أمان إيفر، وفّر حتى 80% وخذ كاش باك 10%.',
    features: [
      { text: 'حجز فوري — الطبيب متاح الحين، ما تنتظر أيام', verified: true },
      { text: 'خصم يبدأ من 30% ويوصل حتى 80% مع بطاقة VIP', verified: true },
      { text: 'كاش باك 5-10% يرجع لمحفظتك + 100 نقطة ولاء', verified: true },
    ],
    cta: {
      text: 'احجز استشارتك العاجلة',
      href: '/ar/urgent-consultation',
    },
  },
  {
    id: 'ask-doctor',
    icon: 'MessageCircle',
    image: '/logo.jpeg', // TODO: Replace with actual service image
    title: 'اسأل طبيب',
    tagline: 'سؤالك الأول مجاناً — رد خلال 15 دقيقة',
    description:
      'ولدك حرارته عالية؟ عندك ألم ما تدري سببه؟ اسأل طبيب متخصص الحين واحصل على رد موثوق خلال 15 دقيقة — السؤال الأول مجاناً لكل زائر جديد.',
    features: [
      { text: 'السؤال الأول مجاناً — جرّب بدون ما تدفع ريال', verified: true },
      { text: 'رد خلال 15 دقيقة من أطباء معتمدين من SCFHS', verified: true },
      { text: 'أسئلة غير محدودة للمشتركين في باقة بريمير وVIP', verified: true },
    ],
    cta: {
      text: 'اسأل طبيبك الحين',
      href: '/ar/ask-doctor',
    },
  },
  {
    id: 'medical-network',
    icon: 'Building2',
    title: 'الشبكة الطبية',
    tagline: '500+ مستشفى وعيادة في كل مكان',
    description:
      'وصول لأفضل المستشفيات والعيادات في المملكة — سليمان الحبيب، المواساة، دلّه، السعودي الألماني، مغربي، فقيه، وأكثر من 500 مقدم خدمة طبية معتمد.',
    features: [
      { text: '500+ مستشفى وعيادة في 50+ مدينة سعودية', verified: true },
      { text: 'شراكات مع أفضل المنشآت الطبية: سليمان الحبيب، المواساة، دلّه، وغيرها', verified: true },
      { text: 'خصومات حصرية تصل لـ 80% للمشتركين في جميع المنشآت', verified: true },
    ],
    cta: {
      text: 'شوف الشبكة الطبية',
      href: '/ar/medical-network',
    },
  },
  {
    id: 'wellness-network',
    icon: 'Dumbbell',
    image: '/logo.jpeg', // TODO: Replace with actual service image
    title: 'الشبكة الصحية',
    tagline: 'جيم، سبا، صالونات تجميل، وأكثر',
    description:
      'وصول لأفضل النوادي الرياضية، مراكز السبا، صالونات التجميل، والصيدليات في المملكة — فتنس تايم، جولدز جيم، مراكز سبا فاخرة، وصالونات تجميل معتمدة. خصومات حصرية على كل شي يخص صحتك ولياقتك وجمالك.',
    features: [
      { text: 'نوادي رياضية: فتنس تايم، جولدز جيم، سبكترم، وأكثر من 100 نادي', verified: true },
      { text: 'صالونات تجميل ومراكز سبا فاخرة في كل المدن', verified: true },
      { text: 'صيدليات: النهدي، الدواء + خصومات على الاشتراكات والخدمات', verified: true },
    ],
    cta: {
      text: 'شوف الشبكة الصحية',
      href: '/ar/wellness-network',
    },
  },
  {
    id: 'home-care',
    icon: 'Home',
    image: '/logo.jpeg', // TODO: Replace with actual service image
    title: 'الرعاية المنزلية',
    tagline: 'الطبيب يجيك لين بيتك — نفس اليوم',
    description:
      'والدك كبير بالسن وصعب ينقل؟ اطلب زيارة طبيب متخصص لمنزلك — فحص شامل، وصفة طبية، تقرير مفصّل، ومتابعة مجانية. متاح نفس اليوم في 50+ مدينة.',
    features: [
      { text: 'زيارة منزلية مجانية كل شهر لمشتركي VIP (قيمة 3,360 ريال/سنة)', verified: true },
      { text: 'فحص شامل + وصفة + تقرير طبي + متابعة مجانية', verified: true },
      { text: 'متاح نفس اليوم في الرياض، جدة، الدمام، مكة، المدينة', verified: true },
    ],
    cta: {
      text: 'اطلب زيارة منزلية الحين',
      href: '/ar/home-care',
    },
  },
];

export const membershipPlans = [
  { name: 'Premier', price: '299 ريال/سنة' },
  { name: 'VIP', price: '499 ريال/سنة' },
] as const;

export const patientsCTA = {
  title: 'جاهز تبدأ رحلتك الصحية؟',
  subtitle: 'انضم لـ 50,000+ مستخدم واحصل على خصومات فورية في 500+ منشأة طبية',
  primary: {
    text: 'حمّل التطبيق الحين',
    href: '#download',
  },
  secondary: {
    text: 'اشترك في بريمير — 199 ريال/سنة',
    href: '/services#membership',
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
    'وسّع قاعدة مرضاك، قدّم الاستشارات عن بُعد، وأدر عيادتك رقمياً — كلها من منصة واحدة.',
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
    title: 'سجّل الآن',
    description: 'عبّي نموذج التسجيل مع بياناتك وشهاداتك.',
  },
  {
    number: 2,
    title: 'راح نراجع طلبك',
    description: 'التحقق من البيانات خلال 48 ساعة.',
  },
  {
    number: 3,
    title: 'ابدأ استقبال المرضى',
    description: 'بعد التفعيل، راح يبدأ ظهورك في تطبيق أمان إيفر.',
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
  metricsTitle: 'أرقام تتكلم عن شراكاتنا:',
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
      'Link APIs موثّقة ومعيارية',
      'Lock تشفير كامل — PDPL compliant',
      'Zap حجز فوري مع تأكيد آلي',
      'Handshake دعم تقني مخصص',
    ],
  },
  {
    id: 'digital-presence',
    icon: 'Globe',
    title: 'تعزيز حضورك الرقمي',
    description:
      'نساعد منشأتك على الوصول لآلاف المرضى عبر منصتنا، وتحسين تجربة الحجز الرقمي لعملائك الحاليين.',
    benefits: [
      'Smartphone ظهور في تطبيق أمان إيفر لآلاف المستخدمين',
      'Target تسويق موجّه للجمهور المناسب',
      'BarChart3 تحليلات أداء ومرئية حجوزات',
      'MessageSquare إدارة تقييمات وتواصل مع المرضى',
    ],
  },
  {
    id: 'marketing',
    icon: 'Megaphone',
    title: 'حلول تسويقية طبية متخصصة',
    description:
      'حملات تسويق رقمية مصممة خصيصاً لقطاع الرعاية الصحية، تستفيد من بيانات المستخدمين المجمّعة وسلوكهم الصحي.',
    benefits: [
      'Megaphone حملات تستهدف شرائح محددة',
      'TrendingUp تتبع ROI دقيق',
      'Palette محتوى تسويقي احترافي',
      'Trophy مواقع متقدمة في التطبيق',
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
    'انضم لبرنامج "رحلة الثراء" واحصل على عمولات سخية على كل إحالة — دخل يتكرر شهرياً طول ما العميل مشترك.',
  whyJoinTitle: 'ليش رحلة الثراء؟',
  commissionsTitle: 'نظام العمولات',
  tiersTitle: 'مستويات المسوقين',
  howItWorksTitle: 'كيف تبدأ رحلتك؟',
  eligibilityTitle: 'من يقدر ينضم؟',
  eligibilityNote:
    '✅ مفتوح للجميع: مؤثرين، مدونين، أطباء، موظفين، طلاب، وحتى المستخدمين العاديين! ما في حد أدنى للمتابعين ولا رسوم اشتراك.',
  ctaTitle: 'جاهز تبدأ رحلة الثراء؟',
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
    description: 'عبّي نموذج بسيط (3 دقائق) — لا رسوم، لا شروط معقدة.',
  },
  {
    number: 2,
    title: 'خذ رابطك الخاص',
    description: 'موافقة فورية خلال 24 ساعة + رابط إحالة فريد وكود خصم شخصي.',
  },
  {
    number: 3,
    title: 'ابدأ التسويق',
    description: 'شارك رابطك على السوشيال ميديا، المدونة، أو مع أصدقائك وعائلتك.',
  },
  {
    number: 4,
    title: 'اربح واسحب أرباحك',
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
