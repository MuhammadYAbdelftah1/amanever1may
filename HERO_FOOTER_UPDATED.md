# تحديث Hero و Footer لاستخدام زر Huawei ✅

## الملفات المحدثة

### 1. Hero Section
**الملف**: `components/home/hero-section.tsx`

**التغييرات:**
- ✅ إضافة import للـ `AppDownloadButtons`
- ✅ استبدال الصورة الثابتة بالـ component الديناميكي
- ✅ استخدام layout أفقي (horizontal)

**قبل:**
```tsx
<img 
  src="/images/all-stores.png" 
  alt="Download on App Store, Google Play, and AppGallery" 
  className="h-16 md:h-20 lg:h-24 w-auto"
/>
```

**بعد:**
```tsx
<AppDownloadButtons layout="horizontal" showHuawei={true} />
```

### 2. Footer Download Section
**الملف**: `components/global/footer/footer-download.tsx`

**التغييرات:**
- ✅ إضافة import للـ `AppDownloadButtons`
- ✅ استبدال الصورة الثابتة بالـ component الديناميكي
- ✅ استخدام layout عمودي (vertical)

**قبل:**
```tsx
<a href="https://amanever.com/#download">
  <Image
    src="/images/all-stores.jpg"
    alt="حمّل أمان إيفر"
    width={400}
    height={150}
  />
</a>
```

**بعد:**
```tsx
<AppDownloadButtons layout="vertical" showHuawei={true} />
```

## الأماكن المحدثة

### 1. 🏠 **Hero Section** (الصفحة الرئيسية)
- **الموقع**: أسفل العنوان الرئيسي
- **التخطيط**: أفقي (horizontal)
- **الأزرار**: Huawei فقط حالياً
- **الرابط**: http://localhost:3000/ar

### 2. 📄 **Footer** (جميع الصفحات)
- **الموقع**: عمود "حمّل التطبيق"
- **التخطيط**: عمودي (vertical)
- **الأزرار**: Huawei فقط حالياً
- **الرابط**: أسفل أي صفحة

### 3. 📞 **Contact Page** (صفحة الاتصال)
- **الموقع**: الكارت الخامس "حمّل التطبيق"
- **التخطيط**: عمودي (vertical)
- **الأزرار**: Huawei فقط حالياً
- **الرابط**: http://localhost:3000/ar/contact

## الحالة الحالية

### الأزرار المتاحة:
- ✅ **Huawei AppGallery** (PNG)
- ⏳ **App Store** (في انتظار الملف)
- ⏳ **Google Play** (في انتظار الملف)

### الأماكن المحدثة:
- ✅ Hero Section (الصفحة الرئيسية)
- ✅ Footer (جميع الصفحات)
- ✅ Contact Page (الكارت الخامس)

## المزايا

✅ **Component واحد**: استخدام نفس الـ component في 3 أماكن
✅ **سهولة التحديث**: تحديث واحد يؤثر على جميع الأماكن
✅ **مرن**: خيارات للتخطيط (أفقي/عمودي)
✅ **متناسق**: نفس التصميم والتأثيرات في كل مكان
✅ **جاهز للتوسع**: إضافة App Store و Google Play سهلة

## الخطوات التالية

عندما تكون جاهزاً، أرسل:
1. 🍎 **App Store button** (PNG أو SVG)
2. 🤖 **Google Play button** (PNG أو SVG)

وسأضيفهم فوراً في:
- `components/shared/app-download-buttons.tsx`

وسيظهرون تلقائياً في:
- ✅ Hero Section
- ✅ Footer
- ✅ Contact Page

## البنية النهائية

```
Hero Section (أفقي)
┌─────────────────────────────────┐
│  [Huawei] [App Store] [Google] │
└─────────────────────────────────┘

Footer (عمودي)
┌─────────────┐
│  [Huawei]   │
│ [App Store] │
│  [Google]   │
└─────────────┘

Contact Card (عمودي)
┌─────────────┐
│  [Huawei]   │
│ [App Store] │
│  [Google]   │
└─────────────┘
```

## الحالة
✅ **مكتمل وجاهز**

جميع الأماكن الثلاثة تستخدم الآن نفس الـ component وتعرض زر Huawei! 🎉
