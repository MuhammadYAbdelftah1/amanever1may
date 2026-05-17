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
          <strong className="text-slate-900 font-bold">أبَداً!</strong> تطبيق أمان إيفر هو منصة صحية مفتوحة للجميع. يمكنك تحميل التطبيق والاستفادة من كافة خدماته الرقمية مثل حجز المواعيد، استشارات الفيديو مع الأطباء، طلب الرعاية المنزلية، والتسوق من المتجر الإلكتروني الطبي، حتى بدون امتلاك بطاقة عضوية.
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
          <strong className="text-slate-900 font-bold">التطبيق يوفر لك الوصول والراحة، أما البطاقة فهي توفر لك المال.</strong>
        </p>
        <p>
          بدون البطاقة، ستحصل على الخدمات والمنتجات بأسعارها العادية. أما عند امتلاكك لبطاقة (بريمير أو VIP)، فإنك تفتح بوابة من الخصومات الكبرى التي تصل إلى 80%، بالإضافة إلى استعادة النقود (Cash Back) ونظام النقاط والمزايا المجانية.
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
          <strong className="text-slate-900 font-bold">نعم</strong>، المتجر متاح لجميع مستخدمي التطبيق لتسوق أرقى المنتجات الطبية والتجميلية.
        </p>
        <p>
          ولكن، يحصل حاملوا بطاقات أمان إيفر على <strong className="text-slate-900 font-bold">"أسعار خاصة وحصرية"</strong> وعروض كاش باك لا تظهر للمستخدم العادي، مما يجعل تجربة التسوق مع البطاقة أكثر ذكاءً وتوفيراً.
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
          <strong className="text-slate-900 font-bold">بكل تأكيد</strong>، خدماتنا الرقمية (رعاية منزلية، حجز موعد، استشارة فيديو) متاحة لكل مستخدمي التطبيق من مواطنين ومقيمين وزوار.
        </p>
        <p>
          والبطاقة هي خيار إضافي متاح لك إذا كنت ترغب في الحصول على هذه الخدمات بأسعار مخفضة جداً بدلاً من السعر الكامل.
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
          لأن البطاقة تحول <strong className="text-slate-900 font-bold">"مصاريفك الصحية" إلى "استثمار"</strong>.
        </p>
        <p>
          فبينما يستمتع الجميع بسهولة الاستخدام عبر التطبيق، ينفرد حاملو البطاقات باسترداد مالي (Cash Back) ونقاط ولاء تتحول لخدمات مجانية، فضلاً عن الخصومات المباشرة التي تجعل تكلفة الرعاية الصحية والتجميلية في متناول اليد دائماً.
        </p>
      </>
    ),
  },
  {
    id: 'faq-general-6',
    question: 'أين يمكنني استخدام بطاقة أمان إيفر؟ وهل تقتصر على مدينة محددة؟',
    category: 'coverage',
    answer: (
      <>
        <p>
          <strong className="text-slate-900 font-bold">أمان إيفر صُممت لتكون معك أينما كنت!</strong>
        </p>
        <p>
          يمكنك استخدام البطاقة في شبكة واسعة ومتنامية من المستشفيات، المجمعات الطبية، مراكز التجميل، والمختبرات المعتمدة في مختلف المدن. كما أن خدماتنا الرقمية (استشارات الفيديو والمتجر) تخدمك في أي مكان وفي أي وقت عبر التطبيق.
        </p>
      </>
    ),
  },
  {
    id: 'faq-general-7',
    question: 'ما هي مدة صلاحية بطاقة أمان إيفر؟ وكيف يمكنني تجديدها؟',
    category: 'value',
    answer: (
      <>
        <p>
          تمنحك بطاقة أمان إيفر (بريمير أو VIP) <strong className="text-slate-900 font-bold">عاماً كاملاً (12 شهراً)</strong> من التوفير اللامحدود والرعاية المميزة من تاريخ إصدارها.
        </p>
        <p>
          وقبل انتهاء اشتراكك، سنقوم بتذكيرك عبر التطبيق لتجديد عضويتك بسهولة وبضغطة زر واحدة لضمان استمرار تمتعك بالخصومات والمزايا.
        </p>
      </>
    ),
  },
  {
    id: 'faq-general-8',
    question: 'هل هناك حد أقصى لعدد مرات استخدام البطاقة خلال العام؟',
    category: 'value',
    answer: (
      <>
        <p>
          <strong className="text-slate-900 font-bold">لا يوجد حدود لطموحنا في رعايتك!</strong>
        </p>
        <p>
          يمكنك استخدام بطاقة أمان إيفر لعدد غير محدود من المرات طوال فترة صلاحية الاشتراك. سواء احتجت لزيارة الطبيب مرة واحدة أو عشرات المرات، فإن خصوماتك ثابتة ومستمرة في كل زيارة.
        </p>
      </>
    ),
  },
  {
    id: 'faq-general-9',
    question: 'قمت بشراء البطاقة عبر الموقع، كيف أبدأ باستخدامها؟',
    category: 'support',
    answer: (
      <>
        <p>
          تفعيل بطاقة "أمان إيفر" عملية بسيطة وتتم خلال دقائق:
        </p>
        <ol className="list-decimal list-inside space-y-2 ps-0">
          <li><strong className="text-slate-900 font-bold">تحميل التطبيق:</strong> قم بتحميل تطبيق أمان إيفر من متجر التطبيقات (iOS أو Android).</li>
          <li><strong className="text-slate-900 font-bold">تسجيل الدخول:</strong> استخدم رقم الجوال الذي استخدمته عند الشراء.</li>
          <li><strong className="text-slate-900 font-bold">تفعيل العضوية:</strong> ستجد بطاقتك الرقمية بانتظارك في ملفك الشخصي، ومن هنا يمكنك البدء بحجز المواعيد واستخدام رصيد "الكاش باك" الترحيبي فوراً.</li>
        </ol>
      </>
    ),
  },
  {
    id: 'faq-general-10',
    question: 'هل بياناتي الطبية وتاريخ استشاراتي في التطبيق آمنة؟',
    category: 'privacy',
    answer: (
      <>
        <p>
          <strong className="text-slate-900 font-bold">خصوصيتك هي أولويتنا القصوى.</strong>
        </p>
        <p>
          تطبيق "أمان إيفر" يستخدم أعلى معايير التشفير والأمان لضمان سرية بياناتك الطبية، ولا يمكن لأي جهة الاطلاع على استشاراتك أو تاريخك المرضي إلا الأطباء المختصين الذين تختار التواصل معهم.
        </p>
      </>
    ),
  },
];

// الأسئلة المتكررة لحاملي بطاقات أمان إيفر
const cardholderFAQItems: FAQItemData[] = [
  {
    id: 'faq-card-1',
    question: 'من هم الفئات الذين يمكنهم الاستفادة من بطاقات أمان إيفر؟',
    category: 'identity',
    answer: (
      <>
        <p>
          بطاقاتنا مصممة للجميع؛ تشمل <strong className="text-slate-900 font-bold">المواطن، المقيم، والزائر</strong>. كل ما تحتاجه هو وجود إثبات هوية أو وثائق نظامية سارية لتستمتع بكافة الخصومات والمزايا.
        </p>
      </>
    ),
  },
  {
    id: 'faq-card-2',
    question: 'هل هناك قيود تتعلق بالعمر أو الحالة الصحية قبل الاشتراك؟',
    category: 'identity',
    answer: (
      <>
        <p>
          <strong className="text-slate-900 font-bold">أبداً</strong>، بطاقات أمان إيفر تتميز بأنها غير مقيدة بعمر معين أو حالة صحية محددة. كما أنها لا تتطلب فحصاً طبياً قبل الاشتراك أو موافقات مسبقة من الشركة، فالموافقة تعتبر موجودة مسبقاً لكل حاملي البطاقة.
        </p>
      </>
    ),
  },
  {
    id: 'faq-card-3',
    question: 'ما هو الفرق الجوهري بين بطاقة "بريمير" وبطاقة "VIP"؟',
    category: 'comparison',
    answer: (
      <>
        <p>
          الفرق يكمن في سقف التوفير والمزايا المجانية:
        </p>
        <ul className="list-none space-y-2 ps-0">
          <li>
            <strong className="text-slate-900 font-bold">• بطاقة بريمير:</strong> تمنحك خصومات تصل من 20% إلى 50%
          </li>
          <li>
            <strong className="text-slate-900 font-bold">• بطاقة VIP:</strong> تمنحك خصومات هائلة تصل من 30% إلى 80%، بالإضافة إلى خدمات مجانية تشمل 5 حجوزات طبية و5 استشارات "اسأل طبيب" مجانية تماماً في تطبيقنا الرقمي.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'faq-card-4',
    question: 'هل تشمل البطاقة العمليات الجراحية الكبيرة والولادة؟',
    category: 'coverage',
    answer: (
      <>
        <p>
          <strong className="text-slate-900 font-bold">نعم</strong>، تغطي البطاقات كافة المستويات الطبية بدءاً من الكشوفات والمختبرات، وصولاً إلى العمليات الجراحية (الكبرى، المتوسطة، والصغرى) وحالات الولادة الطبيعية والقيصرية بخصومات مباشرة.
        </p>
      </>
    ),
  },
  {
    id: 'faq-card-5',
    question: 'هل يمكنني استخدام البطاقة في مراكز التجميل والليزر؟',
    category: 'coverage',
    answer: (
      <>
        <p>
          <strong className="text-slate-900 font-bold">بالتأكيد</strong>، خصومات أمان إيفر تشمل كافة الخدمات التجميلية، إجراءات الليزر، والعناية بالبشرة في المراكز المعتمدة لدينا.
        </p>
      </>
    ),
  },
  {
    id: 'faq-card-6',
    question: 'كيف أستفيد من ميزة "الكاش باك" (Cash Back) عند الاشتراك؟',
    category: 'value',
    answer: (
      <>
        <p>
          عند تفعيل عضويتك، تحصل على رصيد مالي ترحيبي في محفظتك الإلكترونية. يمكنك استخدام هذا الرصيد كخصم مالي عند قيامك بأول عملية شرائية لخدماتنا، مما يعني <strong className="text-slate-900 font-bold">توفيراً فورياً من اللحظة الأولى</strong>.
        </p>
      </>
    ),
  },
  {
    id: 'faq-card-7',
    question: 'ما هو نظام "نقاط أمان" وكيف يتم استبداله؟',
    category: 'value',
    answer: (
      <>
        <p>
          هو نظام مكافآت يمنحك نقاطاً مقابل كل عملية شرائية تقوم بها. هذه النقاط تُجمع في محفظتك داخل التطبيق، ويمكنك تحويلها إلى رصيد خدمات مالي لاستخدامه في الحصول على خدمات طبية أو صحية لدى نفس المنشأة.
        </p>
      </>
    ),
  },
  {
    id: 'faq-card-8',
    question: 'ما هي الخدمات التي يوفرها تطبيق "أمان إيفر" لحاملي البطاقات؟',
    category: 'value',
    answer: (
      <>
        <p>
          يوفر التطبيق تجربة رعاية ذكية تشمل:
        </p>
        <ul className="list-none space-y-2 ps-0">
          <li>• حجز موعد مع طبيب</li>
          <li>• استشارة طبية "فيديو" عن بُعد</li>
          <li>• طلب خدمات الرعاية المنزلية</li>
          <li>• التسوق من المتجر الإلكتروني الطبي المتكامل</li>
        </ul>
        <p className="mt-2">
          <strong className="text-slate-900 font-bold">وكل هذا بأسعار مخفضة لحاملي بطاقات أمان إيفر</strong>
        </p>
      </>
    ),
  },
  {
    id: 'faq-card-9',
    question: 'هل يمكنني شراء منتجات طبية عبر التطبيق بالبطاقة؟',
    category: 'value',
    answer: (
      <>
        <p>
          <strong className="text-slate-900 font-bold">نعم</strong>، يضم التطبيق متجراً إلكترونياً يحتوي على منتجات طبية، صحية، وتجميلية متنوعة، ويحصل حاملو البطاقات (خاصة VIP) على أسعار حصرية ومخفضة عند الطلب من خلاله.
        </p>
      </>
    ),
  },
  {
    id: 'faq-card-10',
    question: 'كيف أحصل على الموافقة عند التوجه للمستشفى أو المركز الطبي؟',
    category: 'support',
    answer: (
      <>
        <p>
          مع أمان إيفر، <strong className="text-slate-900 font-bold">لا داعي للانتظار!</strong> بطاقتك تحمل موافقة مسبقة وفورية، بمجرد إبراز البطاقة أو الهوية في المنشأة الصحية المشتركة، يتم تفعيل الخصم الخاص بك مباشرة دون أي تعقيدات إدارية.
        </p>
        <p className="mt-3">
          <strong className="text-slate-900 font-bold">للتواصل:</strong> واتساب 920018041
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
                <span>متوسط وقت الرد: ثوانٍ</span>
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
                الأسئلة المتكررة لحاملي بطاقات أمان إيفر
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
              هل لديك المزيد من الأسئلة؟
            </h3>
            <p className="text-base text-slate-600 mb-6">
              تواصل معنا مباشرة، وسنرد عليك خلال ثوانٍ.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/966544608220"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span>تواصل عبر واتساب</span>
              </a>
              <a
                href="tel:920018041"
                className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
              >
                اتصل بنا على 920018041
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
