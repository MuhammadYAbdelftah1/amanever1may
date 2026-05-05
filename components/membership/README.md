# Membership Modal Flow

## 📋 نظرة عامة
هذا المجلد يحتوي على مكونات Modal الاشتراك في العضوية مع flow متعدد المراحل.

## 🔄 Flow الاشتراك

### المرحلة 1: اختيار نوع البطاقة
- **Premier** (299 ريال/سنة) → ينتقل للمرحلة 2
- **VIP** (499 ريال/سنة) → يفتح WhatsApp مباشرة
- **Business** (حسب الاتفاق) → يغلق Modal

### المرحلة 2: اختيار الباقة (Premier فقط)
8 باقات متاحة:
- الباقة الفردية (299 ريال)
- الباقة المتميزة (399 ريال)
- الباقة الذهبية (799 ريال)
- الباقة العائلية (999 ريال)
- باقة كبار السن (199 ريال)
- باقة ذوي الاحتياجات الخاصة (مجاناً)
- باقة الأيتام وحفّاظ القرآن (مجاناً)
- باقة الأرامل والمطلقات (99 ريال)

### المرحلة 3: إدخال رقم الجوال
- اختيار كود الدولة (افتراضي: +966)
- إدخال رقم الجوال (9 أرقام)

### المرحلة 4: إدخال البيانات الشخصية 🆕
- الاسم الكامل
- تاريخ الميلاد
- نوع الهوية (هوية وطنية / إقامة / جواز سفر)
- رقم الهوية

### المرحلة 5: اختيار طريقة الدفع 🆕
طرق الدفع المتاحة:
- **STC Pay** - محفظة رقمية
- **Mada** - بطاقة مدى
- **Visa** - بطاقة فيزا
- **Mastercard** - بطاقة ماستركارد
- **Apple Pay** - محفظة آبل
- **Google Pay** - محفظة جوجل
- **Tabby** - تقسيط على 4 دفعات
- **Tamara** - تقسيط على 3 أو 4 دفعات

### المرحلة 6: شاشة النجاح 🆕
تعرض:
- ✅ رسالة نجاح الدفع
- 🎴 UI للبطاقة المستخرجة (مع تصميم مخصص حسب نوع البطاقة)
- 📋 ملخص البيانات والدفع
- 📱 أزرار تحميل التطبيق (iOS, Android, Huawei)

## 📁 الملفات

### `MembershipModal.tsx`
الملف الرئيسي الذي يحتوي على:
- State management لجميع المراحل
- Navigation بين المراحل
- عرض Cards و Packages

### `MembershipModalSteps.tsx`
يحتوي على:
- `PersonalInfoStep` - مرحلة إدخال البيانات الشخصية
- `PaymentStep` - مرحلة اختيار طريقة الدفع

### `SuccessStep.tsx`
- شاشة النجاح النهائية
- عرض البطاقة المستخرجة
- ملخص الاشتراك
- أزرار تحميل التطبيق

## 🎨 الصور المستخدمة

### صور طرق الدفع
- `/images/STC-pay-01.png` - STC Pay
- `/images/MAD_default.png` - Mada
- `/images/Tabby-01.png` - Tabby
- `/images/Tamara.png` - Tamara

### الأيقونات المدمجة (SVG)
- Visa
- Mastercard
- Apple Pay
- Google Pay

## 🔧 التخصيص

### إضافة طريقة دفع جديدة
في `MembershipModalSteps.tsx`:
```typescript
const paymentMethods = [
  // ... existing methods
  { 
    id: 'new-method', 
    name: 'اسم الطريقة', 
    logo: '/images/logo.png', 
    type: 'wallet',
    subtitle: 'وصف اختياري' 
  },
];
```

### تعديل تصميم البطاقة
في `SuccessStep.tsx`، قسم "Card UI Preview":
- تعديل الألوان حسب `selectedCard?.id`
- تخصيص المحتوى والتخطيط

## 🔐 الأمان
- جميع البيانات يتم حفظها في console.log حالياً
- يجب ربطها بـ Backend API للحفظ الفعلي
- جميع المدخلات مُحققة (validated)
- رسائل خطأ واضحة للمستخدم

## 📱 Responsive Design
- Desktop: Modal في المنتصف
- Mobile: Bottom sheet من الأسفل
- جميع المراحل responsive بالكامل

## ✅ TODO
- [ ] ربط بـ Backend API
- [ ] إضافة Payment Gateway Integration
- [ ] إضافة Email Verification
- [ ] إضافة SMS OTP
- [ ] حفظ البيانات في Database
- [ ] إرسال تفاصيل الاشتراك عبر WhatsApp
- [ ] إضافة Analytics Tracking
