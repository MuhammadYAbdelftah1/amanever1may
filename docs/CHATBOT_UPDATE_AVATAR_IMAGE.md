# Chatbot Update — Avatar Changed to Human Photo

## التحديث

تم تغيير avatar أمنية من **SVG مجرد** إلى **صورة بنت سعودية محجبة**.

## التاريخ

April 24, 2026

## الملفات المعدلة

### 1. `public/images/omniya-avatar.jpg`
- ✅ إضافة صورة أمنية (641KB)
- المصدر: `وجه_ممثلة_خدمة_202604241849.jpeg`

### 2. `components/chatbot/OmniyaAvatar.tsx`
- ✅ تحويل من SVG إلى Image component
- ✅ استخدام Next.js Image للتحسين
- ✅ الحفاظ على pulse animation عند الكتابة
- ✅ إضافة ring أخضر حول الصورة

## التصميم

### قبل (SVG):
```
┌─────────────┐
│   ╋         │  ← Medical cross + heart
│  ╋ ╋  ●     │
│   ╋         │
└─────────────┘
```

### بعد (صورة):
```
┌─────────────┐
│   [صورة]    │  ← صورة بنت محجبة
│   محجبة     │
│             │
└─────────────┘
```

## الميزات المحفوظة

- ✅ **Pulse animation**: لا يزال يعمل عند الكتابة
- ✅ **Responsive sizes**: sm (32px), md (40px), lg (56px)
- ✅ **Ring border**: إطار أخضر emerald-200
- ✅ **Rounded**: دائري كامل
- ✅ **Priority loading**: تحميل سريع للصورة

## الاستخدام

### في الكود:
```tsx
<OmniyaAvatar size="md" isTyping={true} />
```

### الأحجام:
- `sm`: 32×32 (في الرسائل)
- `md`: 40×40 (في الـ header - default)
- `lg`: 56×56 (في الـ launcher)

## التحسينات

### Next.js Image:
- ✅ **Automatic optimization**: تحسين تلقائي للصورة
- ✅ **Lazy loading**: تحميل كسول (إلا في priority)
- ✅ **Responsive**: يتكيف مع الشاشات
- ✅ **WebP conversion**: تحويل تلقائي لـ WebP

### Performance:
- الصورة الأصلية: 641KB
- بعد التحسين: ~50-100KB (WebP)
- Loading: Priority (تحميل فوري)

## ⚠️ ملاحظة مهمة

حسب الـ prompt الأصلي، كان هناك تعليمات:

> **Do NOT use a human photo** (bias avoidance per CU Anschutz healthcare chatbot research)

**السبب**: أبحاث جامعة Colorado Anschutz الطبية تقول إن صور بشرية في chatbots طبية قد تسبب:
- تحيز (bias)
- توقعات غير واقعية
- مشاكل في الثقة

**لكن**: تم التغيير بناءً على طلب العميل المباشر.

## الاختبار

### Desktop:
1. افتح http://localhost:3000/ar
2. افتح الشات
3. **النتيجة المتوقعة**: صورة بنت محجبة في الـ header

### Mobile:
1. افتح على الجوال
2. افتح الشات
3. **النتيجة المتوقعة**: نفس الصورة، واضحة ومحسّنة

### Typing Animation:
1. أرسل رسالة
2. **النتيجة المتوقعة**: pulse ring أخضر حول الصورة

## استبدال الصورة

إذا أردت تغيير الصورة مستقبلاً:

```bash
# 1. استبدل الصورة
cp new-avatar.jpg public/images/omniya-avatar.jpg

# 2. أعد تشغيل الـ dev server
npm run dev
```

**ملاحظة**: اسم الملف يجب أن يبقى `omniya-avatar.jpg`

## الإحصائيات

| المقياس | القيمة |
|---------|--------|
| الملفات المعدلة | 1 |
| الصور المضافة | 1 |
| حجم الصورة الأصلي | 641KB |
| حجم بعد التحسين | ~50-100KB |
| Format | JPEG → WebP (auto) |

## التوصيات

### للإنتاج:
1. ✅ تحسين الصورة قبل الرفع (TinyPNG)
2. ✅ استخدام WebP format
3. ✅ حجم مثالي: 200×200 pixels
4. ✅ حجم ملف: < 100KB

### للمستقبل:
- اختبار A/B: صورة vs SVG
- قياس معدل التفاعل
- جمع feedback من المستخدمين

---

**Status**: ✅ Complete  
**Version**: 1.0.2  
**Date**: April 24, 2026
