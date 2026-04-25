# Pricing Components

مكونات صفحة التسعير لأمان إيفر.

## 📁 البنية

```
components/pricing/
├── index.ts                    # Central export file
├── PricingHero.tsx            # Hero section with trust bar
├── QuickComparison.tsx        # Quick comparison (Aman vs Insurance)
├── PricingPlans.tsx           # Plans display with toggles
├── PricingCard.tsx            # Individual plan card
├── SavingsCalculator.tsx      # Interactive savings calculator
├── ComparisonTable.tsx        # Detailed comparison table
├── InsuranceComparison.tsx    # Comparison with traditional insurance
├── PricingTestimonials.tsx    # Customer testimonials
├── B2BSection.tsx             # Business plans section
├── PricingFAQ.tsx             # FAQ with Schema.org
├── FinalCTA.tsx               # Final call-to-action
└── __tests__/
    └── pricing.test.ts        # Unit tests
```

## 🚀 الاستخدام

### استيراد جميع المكونات

```typescript
import {
  PricingHero,
  QuickComparison,
  PricingPlans,
  // ... other components
} from '@/components/pricing';
```

### استيراد مكون واحد

```typescript
import { PricingCard } from '@/components/pricing/PricingCard';
```

## 🎨 المكونات

### PricingHero
Hero section مع العنوان الرئيسي و trust indicators.

```tsx
<PricingHero />
```

### QuickComparison
مقارنة سريعة بين أمان إيفر والتأمين التقليدي.

```tsx
<QuickComparison />
```

### PricingPlans
عرض الباقات الثلاث مع toggles للتبديل بين الأنواع.

```tsx
<PricingPlans />
```

### PricingCard
كارت باقة واحدة (يُستخدم داخل PricingPlans).

```tsx
<PricingCard
  tier={tier}
  billingCycle="yearly"
  onSelect={(id) => console.log(id)}
/>
```

### SavingsCalculator
حاسبة تفاعلية لحساب التوفير المتوقع.

```tsx
<SavingsCalculator />
```

### ComparisonTable
جدول مقارنة تفصيلي بين الباقات.

```tsx
<ComparisonTable />
```

### InsuranceComparison
مقارنة مع التأمين الشامل (Bupa Premium).

```tsx
<InsuranceComparison />
```

### PricingTestimonials
شهادات العملاء مع التوفير الفعلي.

```tsx
<PricingTestimonials />
```

### B2BSection
قسم خطط الشركات.

```tsx
<B2BSection />
```

### PricingFAQ
الأسئلة الشائعة مع Schema.org markup.

```tsx
<PricingFAQ />
```

### FinalCTA
دعوة نهائية للاشتراك.

```tsx
<FinalCTA />
```

## 📊 البيانات

جميع البيانات موجودة في:
- `data/pricing-data.ts` - الباقات، الميزات، FAQ
- `data/pricing-config.ts` - التكوينات العامة

## 🛠️ Utilities

دوال مساعدة في `lib/pricing-utils.ts`:

```typescript
import {
  calculateSavings,
  formatCurrency,
  getRecommendedPlan,
} from '@/lib/pricing-utils';

// حساب التوفير
const results = calculateSavings({
  doctorVisits: 6,
  dentalVisits: 2,
  monthlyMedicine: 500,
  homeCare: false,
});

// تنسيق العملة
const formatted = formatCurrency(1990); // "١٬٩٩٠ ر.س."

// الحصول على الباقة الموصى بها
const recommendation = getRecommendedPlan(inputs);
```

## 🧪 الاختبارات

```bash
npm test components/pricing/__tests__/pricing.test.ts
```

## 🎨 التخصيص

### الألوان

الألوان معرّفة في `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    DEFAULT: '#5e8f8f',
    // ...
  }
}
```

استخدم الألوان المخصصة:
- `#4A8B8E` - Brand teal
- `#356B6E` - Brand teal hover
- `#E8F1F1` - Light teal background
- `#1A2B2C` - Text primary
- `#5A6B6C` - Text secondary

### الأسعار

لتعديل الأسعار، عدّل `data/pricing-data.ts`:

```typescript
export const PRICING_TIERS = [
  {
    price: {
      monthly: 199,  // ← عدّل هنا
      yearly: 1990,  // ← عدّل هنا
    }
  }
]
```

## 📱 Responsive

جميع المكونات responsive:
- Desktop: ≥1024px
- Tablet: 768px - 1023px
- Mobile: <768px

## ♿ Accessibility

- جميع المكونات تدعم screen readers
- Keyboard navigation
- ARIA labels
- Semantic HTML

## 🔍 SEO

- Schema.org markup في FAQ
- Product schema في الصفحة الرئيسية
- Open Graph tags
- Twitter Cards

## 📝 ملاحظات

1. **الأسعار**: راجع الأسعار مع الفريق قبل النشر
2. **الشهادات**: استبدل placeholders بشهادات حقيقية
3. **Analytics**: أضف tracking للأحداث
4. **الصور**: أنشئ صورة OG للصفحة
