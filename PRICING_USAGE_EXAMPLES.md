# أمثلة الاستخدام - صفحة التسعير

## 📚 دليل الأمثلة العملية

---

## 1️⃣ استخدام المكونات

### استيراد جميع المكونات
```typescript
import {
  PricingHero,
  QuickComparison,
  PricingPlans,
  SavingsCalculator,
  ComparisonTable,
  InsuranceComparison,
  PricingTestimonials,
  B2BSection,
  PricingFAQ,
  FinalCTA,
} from '@/components/pricing';
```

### استخدام في صفحة
```typescript
export default function PricingPage() {
  return (
    <main>
      <PricingHero />
      <QuickComparison />
      <PricingPlans />
      <SavingsCalculator />
      <ComparisonTable />
      <InsuranceComparison />
      <PricingTestimonials />
      <B2BSection />
      <PricingFAQ />
      <FinalCTA />
    </main>
  );
}
```

---

## 2️⃣ استخدام البيانات

### قراءة الباقات
```typescript
import { PRICING_TIERS } from '@/data/pricing-data';

// الحصول على جميع الباقات
const allTiers = PRICING_TIERS;

// الحصول على باقة محددة
const plusTier = PRICING_TIERS.find(tier => tier.id === 'plus');

// عرض الأسعار
console.log(plusTier?.price.monthly); // 349
console.log(plusTier?.price.yearly);  // 3490
```

### قراءة الميزات
```typescript
import { COMPARISON_FEATURES } from '@/data/pricing-data';

// الحصول على جميع الميزات
const features = COMPARISON_FEATURES;

// عرض ميزة محددة
features.forEach(feature => {
  console.log(feature.name);
  console.log('Basic:', feature.basic);
  console.log('Plus:', feature.plus);
  console.log('VIP:', feature.vip);
});
```

### قراءة FAQ
```typescript
import { PRICING_FAQ } from '@/data/pricing-data';

// الحصول على جميع الأسئلة
const faqs = PRICING_FAQ;

// البحث عن سؤال محدد
const question = PRICING_FAQ.find(faq => 
  faq.question.includes('تأمين')
);
```

---

## 3️⃣ استخدام الدوال المساعدة

### حساب التوفير
```typescript
import { calculateSavings } from '@/lib/pricing-utils';

const inputs = {
  doctorVisits: 6,
  dentalVisits: 2,
  monthlyMedicine: 500,
  homeCare: false,
};

const results = calculateSavings(inputs);

console.log('Total without Aman:', results.totalWithoutAman);
console.log('With Plus plan:', results.withPlus);
console.log('Savings:', results.savingsPlus);
console.log('Best plan:', results.bestPlan);
console.log('Savings %:', results.savingsPercentage);
```

### تنسيق العملة
```typescript
import { formatCurrency } from '@/lib/pricing-utils';

const price = 1990;
const formatted = formatCurrency(price);
console.log(formatted); // "١٬٩٩٠ ر.س."
```

### الحصول على توصية
```typescript
import { getRecommendedPlan } from '@/lib/pricing-utils';

const inputs = {
  doctorVisits: 12,
  dentalVisits: 3,
  monthlyMedicine: 800,
  homeCare: true,
};

const recommendation = getRecommendedPlan(inputs);
console.log('Recommended:', recommendation.planId);
console.log('Reason:', recommendation.reason);
```

### التحقق من المدخلات
```typescript
import { validateCalculatorInputs } from '@/lib/pricing-utils';

const inputs = {
  doctorVisits: 30, // خطأ: أكثر من 24
  dentalVisits: 2,
  monthlyMedicine: 500,
  homeCare: false,
};

const validation = validateCalculatorInputs(inputs);
if (!validation.valid) {
  console.log('Errors:', validation.errors);
}
```

---

## 4️⃣ استخدام التكوينات

### قراءة معلومات الاتصال
```typescript
import { PRICING_CONFIG } from '@/data/pricing-config';

const phone = PRICING_CONFIG.contact.phone;
const email = PRICING_CONFIG.contact.email;
const whatsapp = PRICING_CONFIG.contact.whatsapp;
```

### قراءة الروابط
```typescript
import { PRICING_CONFIG } from '@/data/pricing-config';

const appDownloadUrl = PRICING_CONFIG.urls.appDownload;
const businessPageUrl = PRICING_CONFIG.urls.businessPage;
```

### قراءة Trust Indicators
```typescript
import { PRICING_CONFIG } from '@/data/pricing-config';

const rating = PRICING_CONFIG.trust.rating;
const reviewCount = PRICING_CONFIG.trust.reviewCount;
const networkSize = PRICING_CONFIG.trust.networkSize;
const partners = PRICING_CONFIG.trust.partners;
```

---

## 5️⃣ تتبع الأحداث (Analytics)

### تتبع عرض الصفحة
```typescript
import { trackPricingEvent } from '@/data/pricing-config';

useEffect(() => {
  trackPricingEvent('pricing_page_viewed', {
    locale: 'ar',
    timestamp: Date.now(),
  });
}, []);
```

### تتبع اختيار الباقة
```typescript
import { trackPricingEvent } from '@/data/pricing-config';

const handleSelectPlan = (planId: string) => {
  trackPricingEvent('plan_cta_clicked', {
    plan: planId,
    billing: billingCycle,
    price: selectedTier.price[billingCycle],
  });
  
  // Redirect to signup
  window.location.href = '/signup';
};
```

### تتبع استخدام الحاسبة
```typescript
import { trackPricingEvent } from '@/data/pricing-config';

const handleCalculate = () => {
  const results = calculateSavings(inputs);
  
  trackPricingEvent('savings_calculator_used', {
    doctorVisits: inputs.doctorVisits,
    dentalVisits: inputs.dentalVisits,
    monthlyMedicine: inputs.monthlyMedicine,
    homeCare: inputs.homeCare,
    totalSavings: results.savingsPlus,
    recommendedPlan: results.bestPlan,
  });
  
  setShowResults(true);
};
```

### تتبع توسيع FAQ
```typescript
import { trackPricingEvent } from '@/data/pricing-config';

const toggleQuestion = (index: number) => {
  trackPricingEvent('faq_expanded', {
    question: PRICING_FAQ[index].question,
    index: index,
  });
  
  setOpenIndex(openIndex === index ? null : index);
};
```

---

## 6️⃣ إنشاء Metadata ديناميكي

### للصفحة العربية
```typescript
import { generatePricingMetadata } from '@/lib/pricing-metadata';

export const metadata = generatePricingMetadata('ar');
```

### للصفحة الإنجليزية
```typescript
import { generatePricingMetadata } from '@/lib/pricing-metadata';

export const metadata = generatePricingMetadata('en');
```

### إضافة Structured Data
```typescript
import { generatePricingStructuredData } from '@/lib/pricing-metadata';

export default function PricingPage() {
  const structuredData = generatePricingStructuredData();
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* Page content */}
    </>
  );
}
```

---

## 7️⃣ مشاركة نتائج الحاسبة

### إنشاء رابط قابل للمشاركة
```typescript
import { generateShareableUrl } from '@/lib/pricing-utils';

const inputs = {
  doctorVisits: 6,
  dentalVisits: 2,
  monthlyMedicine: 500,
  homeCare: false,
};

const shareUrl = generateShareableUrl(inputs);
console.log(shareUrl);
// https://amanever.com/ar/pricing?doctor=6&dental=2&medicine=500&homecare=0#calculator
```

### قراءة المدخلات من URL
```typescript
import { parseCalculatorFromUrl } from '@/lib/pricing-utils';

const searchParams = new URLSearchParams(window.location.search);
const inputs = parseCalculatorFromUrl(searchParams);

if (inputs) {
  // استخدم المدخلات لملء الحاسبة
  setDoctorVisits(inputs.doctorVisits);
  setDentalVisits(inputs.dentalVisits);
  setMonthlyMedicine(inputs.monthlyMedicine);
  setHomeCare(inputs.homeCare);
}
```

---

## 8️⃣ تخصيص المكونات

### تخصيص PricingCard
```typescript
import { PricingCard } from '@/components/pricing/PricingCard';
import { PRICING_TIERS } from '@/data/pricing-data';

export function CustomPricingDisplay() {
  const handleSelect = (tierId: string) => {
    console.log('Selected:', tierId);
    // Custom logic
  };

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {PRICING_TIERS.map(tier => (
        <PricingCard
          key={tier.id}
          tier={tier}
          billingCycle="yearly"
          onSelect={handleSelect}
        />
      ))}
    </div>
  );
}
```

### تخصيص SavingsCalculator
```typescript
import { SavingsCalculator } from '@/components/pricing/SavingsCalculator';

export function CustomCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">احسب توفيرك</h1>
      <SavingsCalculator />
    </div>
  );
}
```

---

## 9️⃣ إضافة باقة جديدة

### في pricing-data.ts
```typescript
export const PRICING_TIERS: PricingTier[] = [
  // ... existing tiers
  {
    id: 'premium',
    name: 'أمان بريميوم',
    nameEn: 'Aman Premium',
    price: {
      monthly: 999,
      yearly: 9990,
      yearlyMonthly: 833,
    },
    description: 'الباقة الفاخرة',
    targetAudience: 'للعائلات الكبيرة والمهنيين',
    features: [
      { name: 'الشبكة الطبية', value: 'كامل الشبكة + دولي' },
      { name: 'نسبة الخصم القصوى', value: 'حتى 90%', highlight: true },
      // ... more features
    ],
    cta: 'اختر بريميوم',
  },
];
```

---

## 🔟 إضافة ميزة جديدة للمقارنة

### في pricing-data.ts
```typescript
export const COMPARISON_FEATURES: ComparisonFeature[] = [
  // ... existing features
  {
    name: 'تطبيق الهاتف المحمول',
    basic: true,
    plus: true,
    vip: true,
  },
  {
    name: 'خدمة الكونسيرج الطبي',
    basic: false,
    plus: false,
    vip: true,
  },
];
```

---

## 1️⃣1️⃣ إضافة سؤال FAQ جديد

### في pricing-data.ts
```typescript
export const PRICING_FAQ: FAQItem[] = [
  // ... existing FAQs
  {
    question: 'هل يمكنني استخدام البطاقة في أكثر من منشأة؟',
    answer: 'نعم، يمكنك استخدام بطاقة أمان إيفر في جميع المنشآت الطبية المشمولة في شبكتنا والتي تضم أكثر من 500 منشأة في جميع أنحاء المملكة.',
  },
];
```

---

## 1️⃣2️⃣ تخصيص الألوان

### في tailwind.config.ts
```typescript
colors: {
  primary: {
    DEFAULT: '#4A8B8E',  // ← غيّر هنا
    hover: '#356B6E',    // ← غيّر هنا
    light: '#E8F1F1',    // ← غيّر هنا
  }
}
```

### استخدام في المكونات
```typescript
<div className="bg-primary text-white hover:bg-primary-hover">
  {/* Content */}
</div>
```

---

## 1️⃣3️⃣ إضافة لغة جديدة

### 1. إضافة الترجمات
```json
// messages/en.json
{
  "pricing": {
    "title": "Plans & Pricing",
    "subtitle": "Choose your plan",
    // ... more translations
  }
}
```

### 2. استخدام الترجمات
```typescript
import { useTranslations } from 'next-intl';

export function PricingHero() {
  const t = useTranslations('pricing');
  
  return (
    <h1>{t('title')}</h1>
  );
}
```

---

## 1️⃣4️⃣ اختبار مخصص

### إضافة اختبار جديد
```typescript
// components/pricing/__tests__/custom.test.ts
import { calculateSavings } from '@/lib/pricing-utils';

describe('Custom Pricing Tests', () => {
  it('should calculate correctly for high usage', () => {
    const inputs = {
      doctorVisits: 20,
      dentalVisits: 5,
      monthlyMedicine: 2000,
      homeCare: true,
    };
    
    const results = calculateSavings(inputs);
    expect(results.bestPlan).toBe('vip');
  });
});
```

---

## 📝 ملاحظات مهمة

### عند تعديل البيانات
- ✅ عدّل فقط في `data/pricing-data.ts`
- ✅ لا تعدّل المكونات مباشرة
- ✅ اختبر التغييرات قبل النشر

### عند إضافة ميزات جديدة
- ✅ أضف الميزة في `pricing-data.ts`
- ✅ أضف اختبارات في `__tests__/`
- ✅ حدّث التوثيق

### عند تخصيص التصميم
- ✅ استخدم Tailwind classes
- ✅ حافظ على الـ responsive design
- ✅ اختبر على جميع الأجهزة

---

**هذه الأمثلة تغطي معظم حالات الاستخدام الشائعة!** 🚀

للمزيد من التفاصيل، راجع:
- `PRICING_TECHNICAL_DOCS.md` - للتوثيق الفني
- `components/pricing/README.md` - لتوثيق المكونات
- `__tests__/pricing.test.ts` - لأمثلة الاختبارات
