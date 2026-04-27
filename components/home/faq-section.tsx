'use client';

import { useState } from 'react';
import { FAQItem, FAQItemData } from './faq-item';
import { MessageCircle, Clock } from 'lucide-react';

// الأسئلة المتكررة العامة
const generalFAQItems: FAQItemData[] = [
  {
    id: 'faq-general-1',
    question: 'هل يجب أن أمتلك بطاقة أمان إيفر لكي أستخدم التطبيق؟',
    category: 'identity',
    answer: (
      <>
        <p>
          <strong className="text-slate-900 font-bold">لا، ليس إلزامياً.</strong>
        </p>
        <p>
          يمكنك استخدام التطبيق بدون بطاقة عضوية، لكن حاملي البطاقات يحصلون على مزايا حصرية:
        </p>
        <ul className="list-none space-y-2 ps-0">
          <li>
            <strong className="text-slate-900 font-bold">• خصومات أعلى:</strong> تصل إلى 50% (بريمير) أو 80% (VIP) على جميع الخدمات الطبية والصحية والتجميلية.
          </li>
          <li>
            <strong className="text-slate-900 font-bold">• برنامج الكاش باك:</strong> رصيد مالي فوري في محفظتك عند الاشتراك.
          </li>
          <li>
            <strong className="text-slate-900 font-bold">• محفظة نقاط أمان:</strong> اجمع نقاط مع كل استخدام واستبدلها بخدمات مجانية.
          </li>
          <li>
            <strong className="text-slate-900 font-bold">• خدمات مجانية (VIP):</strong> 5 حجوزات طبية + 5 استشارات &quot;اسأل طبيب&quot; مجاناً.
          </li>
        </ul>
        <p>
          بدون البطاقة، يمكنك الاستفادة من خدمات التطبيق الأساسية مثل حجز المواعيد والمتجر الإلكتروني، لكن بدون الخصومات والمزايا الحصرية.
        </p>
      </>
    ),
  },
  {
    id: 'faq-general-2',
    question: 'ما الفرق بين استخدام التطبيق ببطاقة عضوية أمان إيفر أو بدونها؟',
    category: 'comparison',
    answer: (
      <>
        <p>
          <strong className="text-slate-900 font-bold">بدون بطاقة عضوية:</strong>
        </p>
        <ul className="list-none space-y-2 ps-0 mb-4">
          <li>• يمكنك تصفح الخدمات والمنتجات.</li>
          <li>• حجز المواعيد الطبية بالأسعار العادية.</li>
          <li>• الشراء من المتجر الإلكتروني بدون خصومات.</li>
          <li>• لا توجد مزايا إضافية أو نقاط ولاء.</li>
        </ul>
        <p>
          <strong className="text-slate-900 font-bold">مع بطاقة عضوية (بريمير أو VIP):</strong>
        </p>
        <ul className="list-none space-y-2 ps-0">
          <li>• <strong className="text-slate-900 font-bold">خصومات فورية:</strong> 50% إلى 80% على جميع الخدمات.</li>
          <li>• <strong className="text-slate-900 font-bold">كاش باك:</strong> رصيد مالي ترحيبي في محفظتك.</li>
          <li>• <strong className="text-slate-900 font-bold">نقاط أمان:</strong> اجمع نقاط واستبدلها بخدمات مجانية.</li>
          <li>• <strong className="text-slate-900 font-bold">أسعار حصرية:</strong> في المتجر الإلكتروني والرعاية المنزلية.</li>
          <li>• <strong className="text-slate-900 font-bold">خدمات مجانية (VIP فقط):</strong> حجوزات واستشارات طبية مجانية.</li>
        </ul>
        <p className="mt-3">
          <strong className="text-slate-900 font-bold">النتيجة:</strong> البطاقة توفر لك مئات الريالات شهرياً وتسدد تكلفتها من أول استخدام.
        </p>
      </>
    ),
  },
  {
    id: 'faq-general-3',
    question: 'هل يمكنني الشراء من المتجر الإلكتروني إذا لم أكن مشتركاً في إحدى البطاقات؟',
    category: 'comparison',
    answer: (
      <>
        <p>
          <strong className="text-slate-900 font-bold">نعم، يمكنك الشراء.</strong>
        </p>
        <p>
          المتجر الإلكتروني متاح للجميع، لكن حاملي البطاقات يحصلون على:
        </p>
        <ul className="list-none space-y-2 ps-0">
          <li>
            <strong className="text-slate-900 font-bold">• أسعار حصرية:</strong> خصومات إضافية على المنتجات الطبية والصحية والتجميلية.
          </li>
          <li>
            <strong className="text-slate-900 font-bold">• نقاط أمان:</strong> تجمع نقاط مع كل عملية شراء تستبدلها بخصومات أو خدمات مجانية.
          </li>
          <li>
            <strong className="text-slate-900 font-bold">• أولوية في الشحن:</strong> توصيل أسرع لحاملي بطاقة VIP.
          </li>
        </ul>
        <p>
          بدون البطاقة، تدفع السعر العادي بدون الخصومات والمزايا الإضافية.
        </p>
      </>
    ),
  },
  {
    id: 'faq-general-4',
    question: 'أنا زائر وأحتاج لخدمة الرعاية المنزلية، هل يمكنني الطلب عبر التطبيق؟',
    category: 'coverage',
    answer: (
      <>
        <p>
          <strong className="text-slate-900 font-bold">نعم، بكل تأكيد.</strong>
        </p>
        <p>
          خدمات أمان إيفر متاحة للجميع: <strong className="text-slate-900 font-bold">مواطنين، مقيمين، وزوار</strong> (بموجب وثائق إثبات نظامية).
        </p>
        <p>
          يمكنك طلب خدمات الرعاية المنزلية عبر التطبيق مباشرة، وإذا كنت تحمل بطاقة أمان إيفر، ستحصل على:
        </p>
        <ul className="list-none space-y-2 ps-0">
          <li>• أسعار مخفضة على جميع خدمات الرعاية المنزلية.</li>
          <li>• إمكانية استخدام نقاط أمان للحصول على خصومات إضافية.</li>
          <li>• أولوية في الحجز والاستجابة السريعة.</li>
        </ul>
        <p>
          لا قيود على الجنسية أو حالة الإقامة — الخدمة متاحة للجميع.
        </p>
      </>
    ),
  },
  {
    id: 'faq-general-5',
    question: 'لماذا يفضل الكثيرون ترقية حساباتهم واقتناء بطاقة أمان إيفر؟',
    category: 'value',
    answer: (
      <>
        <p>
          <strong className="text-slate-900 font-bold">لأن البطاقة توفر لك أكثر مما تدفع بكثير:</strong>
        </p>
        <ul className="list-none space-y-2 ps-0">
          <li>
            <strong className="text-slate-900 font-bold">• توفير حقيقي:</strong> زيارة طبيب واحدة بخصم 50% توفر لك 150-300 ريال — أكثر من نصف تكلفة البطاقة السنوية.
          </li>
          <li>
            <strong className="text-slate-900 font-bold">• لا قيود:</strong> استخدم البطاقة بدون حدود — كل زيارة إضافية هي توفير صافي.
          </li>
          <li>
            <strong className="text-slate-900 font-bold">• مزايا مجانية:</strong> كاش باك، نقاط ولاء، وخدمات مجانية (VIP).
          </li>
          <li>
            <strong className="text-slate-900 font-bold">• راحة البال:</strong> تغطية شاملة لك ولعائلتك بتكلفة رمزية.
          </li>
        </ul>
        <p className="mt-3">
          <strong className="text-slate-900 font-bold">النتيجة:</strong> البطاقة تسدد تكلفتها من أول استخدام، وكل استخدام بعدها هو ربح صافي لك.
        </p>
      </>
    ),
  },
];

// الأسئلة المتكررة لحاملي بطاقات أمان إيفر
const cardholderFAQItems: FAQItemData[] = [
  {
    id: 'faq-card-1',
    question: 'ما الفرق بين بطاقة أمان إيفر بريمير (Premier) وبطاقة في آي بي (VIP)؟',
    category: 'comparison',
    answer: (
      <>
        <p>
          <strong className="text-slate-900 font-bold">بطاقة بريمير (199 ريال سنوياً):</strong>
        </p>
        <ul className="list-none space-y-2 ps-0 mb-4">
          <li>• خصومات تصل إلى <strong className="text-slate-900 font-bold">50%</strong> على جميع الخدمات الطبية والصحية والتجميلية.</li>
          <li>• برنامج كاش باك ومحفظة نقاط أمان.</li>
          <li>• حجز مواعيد واستشارات طبية عبر الفيديو بأسعار مخفضة.</li>
          <li>• الشراء من المتجر الإلكتروني بأسعار حصرية.</li>
        </ul>
        <p>
          <strong className="text-slate-900 font-bold">بطاقة VIP (499 ريال سنوياً) — الفئة النخبوية:</strong>
        </p>
        <ul className="list-none space-y-2 ps-0">
          <li>• خصومات تصل إلى <strong className="text-slate-900 font-bold">80%</strong> (أعلى خصم متاح).</li>
          <li>• <strong className="text-slate-900 font-bold">5 حجوزات طبية مجانية</strong> + <strong className="text-slate-900 font-bold">5 استشارات &quot;اسأل طبيب&quot; مجانية</strong>.</li>
          <li>• كاش باك أقوى ونقاط ذهبية (ضعف نقاط البريمير).</li>
          <li>• موافقة فورية ومسبقة من الشركة — لا انتظار.</li>
          <li>• أسعار VIP حصرية في المتجر الإلكتروني والرعاية المنزلية.</li>
        </ul>
        <p className="mt-3">
          <strong className="text-slate-900 font-bold">النتيجة:</strong> بريمير مثالية للاستخدام العادي، VIP للعائلات أو من يحتاج رعاية طبية متكررة.
        </p>
      </>
    ),
  },
  {
    id: 'faq-card-2',
    question: 'ما هي الخدمات المشمولة في بطاقة أمان إيفر؟',
    category: 'value',
    answer: (
      <>
        <p>
          <strong className="text-slate-900 font-bold">تغطية شاملة لجميع احتياجاتك الطبية والصحية والتجميلية:</strong>
        </p>
        <ul className="list-none space-y-2 ps-0">
          <li>
            <strong className="text-slate-900 font-bold">• الخدمات الطبية:</strong> الكشوفات، التحاليل المخبرية، والأشعة.
          </li>
          <li>
            <strong className="text-slate-900 font-bold">• طب الأسنان:</strong> كافة معالجات وتجميل الأسنان.
          </li>
          <li>
            <strong className="text-slate-900 font-bold">• العمليات الجراحية:</strong> العمليات الكبرى، المتوسطة، والصغرى.
          </li>
          <li>
            <strong className="text-slate-900 font-bold">• الأمومة والطفل:</strong> حالات الولادة الطبيعية والقيصرية.
          </li>
          <li>
            <strong className="text-slate-900 font-bold">• عالم التجميل:</strong> جميع خدمات التجميل والليزر والعناية بالبشرة.
          </li>
          <li>
            <strong className="text-slate-900 font-bold">• الأدوية والمنتجات:</strong> خصومات على الأدوية والمنتجات الطبية والصحية.
          </li>
        </ul>
        <p className="mt-3">
          <strong className="text-slate-900 font-bold">الخصومات:</strong> تصل إلى 50% (بريمير) أو 80% (VIP) على جميع الخدمات بلا استثناء.
        </p>
        <p>
          <strong className="text-slate-900 font-bold">لا قيود:</strong> لا حدود على عدد الزيارات، لا موافقات مسبقة، لا استثناءات.
        </p>
      </>
    ),
  },
  {
    id: 'faq-card-3',
    question: 'هل راح تشتغل في المستشفى أو العيادة اللي أروح لها؟',
    category: 'coverage',
    answer: (
      <>
        <p>شبكتنا تضم 500+ مقدم خدمة في أكثر من 50 مدينة، بما فيهم:</p>
        <ul className="list-none space-y-2 ps-0">
          <li>
            <strong className="text-slate-900 font-bold">المستشفيات الكبرى:</strong> سليمان الحبيب، المواساة، دله، السعودي الألماني، الحمادي، الحبيب التخصصي، مغربي.
          </li>
          <li>
            <strong className="text-slate-900 font-bold">سلاسل الصيدليات:</strong> النهدي، الدواء، وسلاسل محلية.
          </li>
          <li>
            <strong className="text-slate-900 font-bold">عيادات التخصصات:</strong> أسنان، جلدية، عيون، وأكثر.
          </li>
        </ul>
        <p>
          <strong className="text-slate-900 font-bold">قبل ما تشترك</strong>، استخدم{' '}
          <a href="#medical-network" className="text-emerald-600 underline underline-offset-4 hover:text-emerald-700">
            مستكشف الشبكة الطبية
          </a>{' '}
          فوق وشوف المستشفيات المتوفرة في مدينتك.
        </p>
        <p>
          لو مقدم الخدمة المفضل لك مو ضمن الشبكة، تواصل معنا — نوسّع الشبكة باستمرار بناءً على طلبات العملاء.
        </p>
      </>
    ),
  },
  {
    id: 'faq-card-4',
    question: 'إذا اشتركت وما استفدت، هل أقدر أسترد فلوسي؟',
    category: 'refund',
    answer: (
      <>
        <p>
          <strong className="text-slate-900 font-bold">نعم.</strong> سياسة الاسترداد واضحة:
        </p>
        <ul className="list-none space-y-2 ps-0">
          <li>
            <strong className="text-slate-900 font-bold">خلال أول 14 يوم من الاشتراك:</strong> استرداد كامل 100% بدون أي شروط.
          </li>
          <li>
            <strong className="text-slate-900 font-bold">بعد 14 يوم:</strong> استرداد جزئي محسوب على الفترة المتبقية (ما عدا قيمة الخدمات المُستخدمة).
          </li>
        </ul>
        <p>
          بدون أسئلة، بدون رسوم خفية. استرداد مباشر على نفس وسيلة الدفع خلال <strong className="text-slate-900 font-bold">5-7 أيام عمل</strong>.
        </p>
        <p>
          <strong className="text-slate-900 font-bold">نحن واثقون بقيمة الخدمة</strong> — والضمان هذا مجرد تأكيد على ثقتنا.
        </p>
      </>
    ),
  },
  {
    id: 'faq-card-5',
    question: 'بياناتي الطبية والشخصية آمنة؟',
    category: 'privacy',
    answer: (
      <>
        <p>
          <strong className="text-slate-900 font-bold">نعم، وبجدية كاملة.</strong>
        </p>
        <ul className="list-none space-y-2 ps-0">
          <li>
            <strong className="text-slate-900 font-bold">متوافقون مع قانون حماية البيانات الشخصية السعودي (PDPL)</strong> تحت إشراف هيئة البيانات والذكاء الاصطناعي (سدايا).
          </li>
          <li>
            <strong className="text-slate-900 font-bold">تشفير كامل</strong> لجميع البيانات أثناء النقل والتخزين (TLS 1.3 + AES-256).
          </li>
          <li>
            <strong className="text-slate-900 font-bold">لا نبيع أو نشارك بياناتك</strong> مع أطراف ثالثة لأغراض تسويقية — أبداً.
          </li>
          <li>
            مشاركة البيانات مع مقدم الخدمة الطبية تتم <strong className="text-slate-900 font-bold">بموافقتك الصريحة</strong> ولغرض الحجز فقط.
          </li>
          <li>
            بتقدر تطلب <strong className="text-slate-900 font-bold">حذف حسابك وبياناتك</strong> في أي وقت من إعدادات الحساب.
          </li>
        </ul>
        <p>
          مرجعنا الرسمي: رقم السجل التجاري <strong className="text-slate-900 font-bold">7038166471</strong>، ومرخّصون من وزارة الصحة للعمل كمنصة خدمات صحية في المملكة.
        </p>
      </>
    ),
  },
  {
    id: 'faq-card-6',
    question: 'إذا واجهت مشكلة، من المسؤول؟ وكيف أوصل له؟',
    category: 'support',
    answer: (
      <>
        <p>
          عندك 3 قنوات مباشرة، ومتوسط الرد <strong className="text-slate-900 font-bold">15 دقيقة</strong>:
        </p>
        <ul className="list-none space-y-2 ps-0">
          <li>
            <strong className="text-slate-900 font-bold">واتساب:</strong> 0544608220 (الأسرع — متاح 24/7).
          </li>
          <li>
            <strong className="text-slate-900 font-bold">الاتصال الموحّد:</strong> 920018041.
          </li>
          <li>
            <strong className="text-slate-900 font-bold">البريد الإلكتروني:</strong> info@amanever.com.
          </li>
        </ul>
        <p>
          <strong className="text-slate-900 font-bold">وعد الخدمة:</strong>
        </p>
        <ul className="list-none space-y-2 ps-0">
          <li>رد على واتساب خلال 15 دقيقة في أوقات الذروة.</li>
          <li>حل المشكلات البسيطة خلال ساعة.</li>
          <li>تصعيد للمشكلات المعقدة خلال 24 ساعة.</li>
        </ul>
        <p>
          مكتبنا في <strong className="text-slate-900 font-bold">جدة — البغدادية الشرقية</strong>، ومتاح للزيارة بموعد مسبق.
        </p>
      </>
    ),
  },
  {
    id: 'faq-card-7',
    question: 'تمام، كيف أبدأ؟',
    category: 'action',
    answer: (
      <>
        <p>
          3 خطوات، <strong className="text-slate-900 font-bold">5 دقائق</strong>:
        </p>
        <ol className="list-decimal list-inside space-y-2 ps-0">
          <li>
            <strong className="text-slate-900 font-bold">حمّل تطبيق أمان إيفر</strong> من{' '}
            <a href="#" className="text-emerald-600 underline underline-offset-4 hover:text-emerald-700">
              App Store
            </a>{' '}
            أو{' '}
            <a href="#" className="text-emerald-600 underline underline-offset-4 hover:text-emerald-700">
              Google Play
            </a>
            .
          </li>
          <li>
            <strong className="text-slate-900 font-bold">اختار باقتك</strong> (Premier 199 ريال / VIP 499 ريال).
          </li>
          <li>
            <strong className="text-slate-900 font-bold">ابدأ استخدام الخصومات</strong> فوراً — ما في فترة انتظار.
          </li>
        </ol>
        <p className="mt-4">
          <a href="#download" className="text-emerald-600 underline underline-offset-4 hover:text-emerald-700 font-bold">
            حمّل التطبيق وابدأ الحين ←
          </a>
        </p>
      </>
    ),
  },
];

// Helper function to extract plain text from ReactNode for schema
function plainTextAnswer(answer: React.ReactNode): string {
  if (typeof answer === 'string') return answer;
  // For complex ReactNode, we'll provide a simplified version
  // In production, you'd want a more robust solution
  return '';
}

export function FAQSection() {
  const [activeTab, setActiveTab] = useState<'general' | 'cardholders'>('general');
  const [openId, setOpenId] = useState<string | null>('faq-general-1');

  const handleToggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const handleTabChange = (tab: 'general' | 'cardholders') => {
    setActiveTab(tab);
    // Open first question of the selected tab
    setOpenId(tab === 'general' ? 'faq-general-1' : 'faq-card-1');
  };

  const currentFAQItems = activeTab === 'general' ? generalFAQItems : cardholderFAQItems;

  // Generate FAQ Schema for SEO (combine both tabs)
  const allFAQItems = [...generalFAQItems, ...cardholderFAQItems];
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allFAQItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.question, // Simplified - in production, extract actual text from ReactNode
      },
    })),
  };

  return (
    <>
      {/* FAQ Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <section id="faq-section" className="bg-white py-20 md:py-28" aria-labelledby="faq-heading">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="text-center md:text-center mb-12">
            <p className="text-sm font-semibold text-emerald-600 uppercase tracking-wide mb-3">
              الأسئلة الشائعة
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              كل اللي تحتاج تعرفه قبل ما تشترك
            </h2>
            <p className="text-base md:text-lg text-slate-600 leading-relaxed">
              إجابات مباشرة للأسئلة اللي توصلنا كل يوم. إذا سؤالك مو هنا، تواصل معنا مباشرة على واتساب.
            </p>
            <div className="text-sm text-slate-500 mt-4 flex items-center justify-center gap-4 flex-wrap">
              <span className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4" />
                <span>متوسط وقت الرد: 15 دقيقة</span>
              </span>
              <span className="hidden sm:inline">·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>الخدمة متاحة 24/7</span>
              </span>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-slate-100 rounded-lg p-1">
              <button
                onClick={() => handleTabChange('general')}
                className={`px-6 py-3 rounded-md font-semibold transition-all ${
                  activeTab === 'general'
                    ? 'bg-white text-emerald-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                الأسئلة العامة
              </button>
              <button
                onClick={() => handleTabChange('cardholders')}
                className={`px-6 py-3 rounded-md font-semibold transition-all ${
                  activeTab === 'cardholders'
                    ? 'bg-white text-emerald-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                أسئلة حاملي البطاقات
              </button>
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-0">
            {currentFAQItems.map((item) => (
              <FAQItem
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onToggle={() => handleToggle(item.id)}
              />
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="bg-emerald-50 rounded-2xl p-8 text-center mt-12">
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
              لسه عندك أسئلة؟
            </h3>
            <p className="text-base text-slate-600 mb-6">
              تواصل معنا مباشرة، وراح نرد عليك خلال 15 دقيقة.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/966544608220"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span>تواصل على واتساب</span>
              </a>
              <a
                href="tel:920018041"
                className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
              >
                اتصل بنا 920018041
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
