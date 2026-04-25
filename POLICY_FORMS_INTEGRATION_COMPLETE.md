# تكامل نماذج السياسات - تقرير إنجاز

## ✅ المهمة المنجزة
تم دمج صفحتين مستقلتين في صفحات السياسات الموجودة:

### 1. نموذج حذف الحساب → سياسة الخصوصية
**المسار القديم**: `/ar/account-deletion` (لم يكن موجوداً)  
**المسار الجديد**: `/ar/privacy-policy#account-deletion`

#### التغييرات المنفذة:

**في `lib/data/privacy-content.ts`:**
- ✅ إضافة قسم جديد (Section 13): "حذف الحساب والبيانات"
- ✅ تحديث رابط CTA من `/ar/account-deletion` إلى `#account-deletion`

**محتوى القسم الجديد:**
- **13.1** ما الذي سيتم حذفه؟
- **13.2** ما الذي سيتم الاحتفاظ به؟ (متطلبات قانونية)
- **13.3** الحالات التي لا يمكن فيها حذف الحساب فوراً
- **13.4** ماذا يحدث بعد تقديم الطلب؟
- **13.5** بدائل حذف الحساب

**نموذج تفاعلي يتضمن:**
- البريد الإلكتروني المسجل (مطلوب)
- رقم الهاتف المسجل (مطلوب)
- سبب حذف الحساب (اختياري - قائمة منسدلة)
- ملاحظات إضافية (اختياري)
- تأكيد الفهم (checkbox مطلوب)
- زر "تقديم طلب الحذف" (أحمر)
- وقت المعالجة: 7-14 يوم عمل

**في `app/[locale]/privacy-policy/page.tsx`:**
- ✅ إضافة معالج لنوع المحتوى `deletion-form`
- ✅ تصميم النموذج بحدود حمراء وأيقونة XCircle
- ✅ دعم جميع أنواع الحقول: email, tel, select, textarea, checkbox

---

### 2. نموذج طلب استرداد → سياسة الاسترداد
**المسار القديم**: `/ar/account/refunds/new` (لم يكن موجوداً)  
**المسار الجديد**: `/ar/refund-policy#refund-request`

#### التغييرات المنفذة:

**في `lib/data/refund-content.ts`:**
- ✅ إضافة قسم جديد (Section 12): "نموذج طلب استرداد"
- ✅ تحديث رابط CTA من `/ar/account/refunds/new` إلى `#refund-request`

**محتوى القسم الجديد:**
- **12.1** ماذا يحدث بعد تقديم الطلب؟
- **12.2** نصائح لتسريع معالجة طلبك

**نموذج تفاعلي شامل يتضمن:**
- البريد الإلكتروني المسجل (مطلوب)
- رقم الهاتف المسجل (مطلوب)
- رقم العملية أو الفاتورة (مطلوب)
- نوع الخدمة (قائمة منسدلة - مطلوب)
- سبب طلب الاسترداد (قائمة منسدلة - مطلوب)
- تفاصيل الطلب (textarea - مطلوب)
- تاريخ العملية (date - مطلوب)
- المبلغ المدفوع (number - مطلوب)
- وسيلة الدفع المستخدمة (قائمة منسدلة - مطلوب)
- مستندات داعمة (file upload - اختياري، متعدد)
- رقم الآيبان (text - اختياري، للتحويل البنكي)
- موافقة على الشروط (checkbox - مطلوب)
- زر "تقديم طلب الاسترداد" (أخضر/teal)
- وقت المعالجة: 24-48 ساعة

**في `app/[locale]/refund-policy/page.tsx`:**
- ✅ إضافة معالج لنوع المحتوى `refund-form`
- ✅ تصميم النموذج بحدود teal وأيقونة CheckCircle2
- ✅ دعم جميع أنواع الحقول: email, tel, text, number, date, select, textarea, file, checkbox
- ✅ نصوص مساعدة (helpText) لكل حقل
- ✅ تصميم زر رفع الملفات مخصص

---

## 🎨 التصميم والتجربة

### نموذج حذف الحساب (Privacy Policy)
- **اللون الأساسي**: أحمر (red-500) - يعكس خطورة الإجراء
- **الحدود**: `border-2 border-red-200`
- **الأيقونة**: XCircle باللون الأحمر
- **تحذيرات**: 3 تحذيرات (warning, info, success)
- **التركيز**: على عدم القابلية للتراجع

### نموذج طلب الاسترداد (Refund Policy)
- **اللون الأساسي**: Teal (#4A8B8E) - يعكس الثقة والاحترافية
- **الحدود**: `border-2 border-[#4A8B8E]`
- **الأيقونة**: CheckCircle2 باللون Teal
- **تحذيرات**: 3 تحذيرات (info, warning, success)
- **التركيز**: على الشفافية والعدالة

---

## 📋 الميزات المشتركة

### كلا النموذجين يتضمنان:
1. ✅ **Validation**: حقول مطلوبة مع علامة نجمة حمراء
2. ✅ **Accessibility**: labels واضحة، focus states، keyboard navigation
3. ✅ **Help Text**: نصوص توضيحية تحت الحقول المهمة
4. ✅ **Responsive**: تصميم متجاوب على جميع الشاشات
5. ✅ **RTL Support**: دعم كامل للعربية
6. ✅ **Processing Time**: وقت معالجة واضح أسفل كل نموذج
7. ✅ **Alert Boxes**: تحذيرات ملونة حسب النوع (warning, info, success, error)

---

## 🔗 الروابط المحدثة

### في سياسة الخصوصية:
```typescript
// قبل
href: "/ar/account-deletion"

// بعد
href: "#account-deletion"
```

### في سياسة الاسترداد:
```typescript
// قبل
href: "/ar/account/refunds/new"

// بعد
href: "#refund-request"
```

---

## 📊 جدول المحتويات (TOC)

### سياسة الخصوصية - تحديث TOC:
- القسم 12: التواصل وضابط حماية البيانات
- **القسم 13 (جديد)**: حذف الحساب والبيانات ← يظهر في TOC

### سياسة الاسترداد - تحديث TOC:
- القسم 11: حقك في الشكوى
- **القسم 12 (جديد)**: نموذج طلب استرداد ← يظهر في TOC

---

## ⚠️ ملاحظات مهمة

### 1. Backend Integration Required
النماذج حالياً **frontend-only**. يجب ربطها بـ API endpoints:

**لنموذج حذف الحساب:**
```typescript
POST /api/account/deletion-request
Body: {
  email: string,
  phone: string,
  reason?: string,
  feedback?: string,
  confirmation: boolean
}
```

**لنموذج طلب الاسترداد:**
```typescript
POST /api/refunds/request
Body: {
  email: string,
  phone: string,
  transactionId: string,
  serviceType: string,
  refundReason: string,
  refundDetails: string,
  transactionDate: string,
  amount: number,
  paymentMethod: string,
  attachments?: File[],
  bankIban?: string,
  consent: boolean
}
```

### 2. File Upload Handling
نموذج الاسترداد يدعم رفع ملفات متعددة:
- **الحد الأقصى**: 5 ملفات
- **الحجم**: 10MB لكل ملف
- **الأنواع المقبولة**: صور (image/*) و PDF (application/pdf)
- يجب إضافة validation على الـ frontend والـ backend

### 3. Email Notifications
يجب إرسال رسائل تأكيد:
- **حذف الحساب**: رسالة تأكيد + رابط إلغاء (48 ساعة)
- **طلب استرداد**: رسالة تأكيد برقم مرجعي

### 4. Legal Compliance
- ✅ متوافق مع PDPL (حذف الحساب)
- ✅ متوافق مع نظام التجارة الإلكترونية (الاسترداد)
- ⚠️ يجب مراجعة قانونية قبل الإنتاج

---

## 🧪 الاختبار المطلوب

### اختبارات وظيفية:
- [ ] تعبئة النماذج بالكامل
- [ ] Validation للحقول المطلوبة
- [ ] رفع الملفات (نموذج الاسترداد)
- [ ] Scroll إلى القسم عند الضغط على CTA
- [ ] Scroll إلى القسم من TOC

### اختبارات التصميم:
- [ ] Responsive على Mobile/Tablet/Desktop
- [ ] RTL layout صحيح
- [ ] Focus states واضحة
- [ ] Alert boxes تظهر بشكل صحيح
- [ ] الألوان متسقة مع brand guidelines

### اختبارات الوصول (Accessibility):
- [ ] Keyboard navigation
- [ ] Screen reader compatibility
- [ ] ARIA labels
- [ ] Color contrast (WCAG AA)

---

## 📁 الملفات المعدلة

### 1. `lib/data/privacy-content.ts`
- إضافة Section 13
- تحديث CTA button href

### 2. `lib/data/refund-content.ts`
- إضافة Section 12
- تحديث CTA button href

### 3. `app/[locale]/privacy-policy/page.tsx`
- إضافة معالج `deletion-form`
- تصميم نموذج حذف الحساب

### 4. `app/[locale]/refund-policy/page.tsx`
- إضافة معالج `refund-form`
- تصميم نموذج طلب الاسترداد

---

## ✨ الخطوات التالية

### مرحلة 1: Backend Integration
1. إنشاء API endpoints للنماذج
2. إضافة validation على الـ server
3. معالجة رفع الملفات
4. إرسال رسائل التأكيد

### مرحلة 2: Database Schema
1. جدول `account_deletion_requests`
2. جدول `refund_requests`
3. جدول `refund_attachments`

### مرحلة 3: Admin Dashboard
1. صفحة مراجعة طلبات حذف الحساب
2. صفحة مراجعة طلبات الاسترداد
3. نظام الموافقة/الرفض
4. إرسال إشعارات للمستخدمين

### مرحلة 4: Automation
1. حذف تلقائي للحسابات بعد الموافقة
2. استرداد تلقائي للمبالغ
3. إشعارات تلقائية في كل مرحلة

---

## 🎯 الخلاصة

تم بنجاح دمج نموذجين تفاعليين في صفحات السياسات:

1. ✅ **نموذج حذف الحساب** في سياسة الخصوصية (Section 13)
2. ✅ **نموذج طلب استرداد** في سياسة الاسترداد (Section 12)

النماذج جاهزة للاستخدام من ناحية الـ UI/UX، وتحتاج فقط إلى:
- ربط بـ backend APIs
- معالجة البيانات المرسلة
- إرسال رسائل التأكيد
- مراجعة قانونية نهائية

---

**تاريخ الإنجاز**: 2026-04-25  
**الحالة**: ✅ مكتمل (Frontend) | ⏳ قيد الانتظار (Backend Integration)
