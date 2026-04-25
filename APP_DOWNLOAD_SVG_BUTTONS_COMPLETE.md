# استخدام أزرار SVG الاحترافية لتحميل التطبيق ✅

## الملفات المضافة

### 1. ملفات SVG الأصلية
تم نقل 3 ملفات SVG احترافية إلى `public/images/`:

- ✅ `IOS App-01.svg` - زر App Store بالعربي
- ✅ `Google Play Arabic.svg` - زر Google Play بالعربي
- ✅ `Huawei App Gallery-01.svg` - زر Huawei AppGallery بالعربي

### 2. Component جديد
**الملف**: `components/shared/app-download-buttons.tsx`

Component قابل لإعادة الاستخدام يعرض أزرار تحميل التطبيق:

```typescript
interface AppDownloadButtonsProps {
  layout?: "horizontal" | "vertical";  // التخطيط: أفقي أو عمودي
  showHuawei?: boolean;                 // إظهار/إخفاء زر Huawei
}
```

**المزايا:**
- ✅ يدعم تخطيطين: أفقي (horizontal) وعمودي (vertical)
- ✅ خيار إظهار/إخفاء زر Huawei AppGallery
- ✅ استخدام Next.js Image للأداء الأمثل
- ✅ تأثيرات Hover و Active سلسة
- ✅ روابط خارجية مع `target="_blank"` و `rel="noopener noreferrer"`
- ✅ ARIA labels للوصولية

## التحديثات على ContactByAudience

### الكارت الخامس "حمّل التطبيق"
تم تحديث الكارت ليستخدام الأزرار الاحترافية بدلاً من الأزرار العادية:

**قبل:**
```typescript
<Button>App Store</Button>
<Button>Google Play</Button>
```

**بعد:**
```typescript
<AppDownloadButtons layout="vertical" showHuawei={true} />
```

### النتيجة:
- ✅ 3 أزرار SVG احترافية (App Store, Google Play, Huawei)
- ✅ تصميم عمودي يناسب الكارت
- ✅ تأثيرات hover سلسة (scale-105)
- ✅ تأثيرات active (scale-95)

## الاستخدام

### في أي مكان في الموقع:

```typescript
import { AppDownloadButtons } from "@/components/shared/app-download-buttons";

// تخطيط أفقي مع Huawei
<AppDownloadButtons layout="horizontal" showHuawei={true} />

// تخطيط عمودي بدون Huawei
<AppDownloadButtons layout="vertical" showHuawei={false} />

// افتراضي (أفقي مع Huawei)
<AppDownloadButtons />
```

## الأزرار الثلاثة

### 1. App Store 🍎
- **الملف**: `/images/IOS App-01.svg`
- **الرابط**: `https://apps.apple.com/sa/app/amanever`
- **النص البديل**: "حمّل من App Store"

### 2. Google Play 🤖
- **الملف**: `/images/Google Play Arabic.svg`
- **الرابط**: `https://play.google.com/store/apps/details?id=com.amanever`
- **النص البديل**: "حمّل من Google Play"

### 3. Huawei AppGallery 📱
- **الملف**: `/images/Huawei App Gallery-01.svg`
- **الرابط**: `https://appgallery.huawei.com/app/amanever`
- **النص البديل**: "حمّل من Huawei AppGallery"

## المواصفات التقنية

### الأبعاد:
- **العرض**: 160px
- **الارتفاع**: 48px
- **النسبة**: تلقائية (w-auto h-12)

### التأثيرات:
```css
hover:scale-105    /* تكبير 5% عند التمرير */
active:scale-95    /* تصغير 5% عند الضغط */
transition-transform /* انتقال سلس */
```

### الوصولية:
- ✅ `aria-label` لكل زر
- ✅ `alt` text للصور
- ✅ روابط خارجية آمنة

## البنية النهائية

```
components/
├── shared/
│   └── app-download-buttons.tsx  ✅ جديد
└── contact/
    └── ContactByAudience.tsx     ✅ محدث

public/
└── images/
    ├── IOS App-01.svg            ✅ جديد
    ├── Google Play Arabic.svg    ✅ جديد
    └── Huawei App Gallery-01.svg ✅ جديد
```

## الكارت الخامس - النتيجة النهائية

```
┌──────────────────────────────┐
│ حمّل التطبيق 🩵              │
├──────────────────────────────┤
│ 📱 Smartphone Icon           │
│                              │
│ احصل على تطبيق أمان إيفر    │
│ حمّل التطبيق الآن واستمتع   │
│ بجميع الخدمات في مكان واحد  │
│                              │
│ ┌──────────────────────────┐ │
│ │  [App Store SVG]        │ │
│ └──────────────────────────┘ │
│ ┌──────────────────────────┐ │
│ │  [Google Play SVG]      │ │
│ └──────────────────────────┘ │
│ ┌──────────────────────────┐ │
│ │  [Huawei AppGallery SVG]│ │
│ └──────────────────────────┘ │
└──────────────────────────────┘
```

## الفوائد

✅ **تصميم احترافي**: أزرار SVG عالية الجودة بالعربي
✅ **أداء ممتاز**: استخدام Next.js Image optimization
✅ **قابل لإعادة الاستخدام**: Component واحد يمكن استخدامه في أي مكان
✅ **مرن**: خيارات للتخطيط وإظهار/إخفاء Huawei
✅ **متجاوب**: يعمل على جميع الشاشات
✅ **تأثيرات سلسة**: Hover و Active animations
✅ **آمن**: روابط خارجية مع security attributes

## ملاحظات مهمة

### تحديث الروابط:
يجب تحديث الروابط بالروابط الفعلية للتطبيق عند نشره:

```typescript
// في app-download-buttons.tsx
href="https://apps.apple.com/sa/app/amanever"  // ← تحديث
href="https://play.google.com/store/apps/details?id=com.amanever"  // ← تحديث
href="https://appgallery.huawei.com/app/amanever"  // ← تحديث
```

### استخدام في أماكن أخرى:
يمكن استخدام الـ Component في:
- Footer
- Hero Section
- Landing Pages
- Modal/Popup
- Sidebar

## الموقع
🔗 http://localhost:3000/ar/contact
📍 قسم "تواصل حسب احتياجك" → الكارت الخامس

## الحالة
✅ **مكتمل وجاهز للاستخدام**

السيرفر يعمل والأزرار الاحترافية تظهر بشكل مثالي! 🎉
