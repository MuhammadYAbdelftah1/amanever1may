/**
 * Refund Policy Content
 * Updated: No refunds policy
 */

// Types
export type RefundSection = {
  id: string;
  number: string;
  title: string;
  content: RefundContent[];
  exceptional?: boolean;
};

export type RefundContent = {
  type: 'paragraph' | 'list' | 'subsection' | 'alert' | 'table' | 'formula' | 'example' | 'definitions' | 'timeline' | 'cards';
  text?: string;
  description?: string;
  title?: string;
  items?: string[];
  note?: string;
  alert?: { type: 'info' | 'warning' | 'success' | 'error'; text: string };
  formula?: string;
  example?: any;
  table?: any;
  timeline?: any[];
  cards?: any[];
};

export const REFUND_POLICY_CONTENT = {
  meta: {
    title: "سياسة الإلغاء والاسترداد | أمان إيفر",
    description: "سياسة الإلغاء والاسترداد لاشتراكات وخدمات أمان إيفر",
    processingTime: "غير متاح",
  },

  hero: {
    title: "سياسة الإلغاء والاسترداد",
    subtitle: "معلومات مهمة حول سياسة الإلغاء والاسترداد لاشتراكات وخدمات أمان إيفر.",
    badges: [
      { label: "سياسة واضحة وشفافة", icon: "info" },
    ],
  },

  decisionTree: {
    title: "سياسة الاسترداد",
    subtitle: "معلومات مهمة يجب معرفتها",
    options: [
      {
        id: "subscriptions",
        title: "اشتراك بطاقة عضوية",
        icon: "card",
        result: "لا يوجد استرداد - جميع المبيعات نهائية",
        color: "red",
        link: "#subscriptions",
      },
      {
        id: "consultations",
        title: "استشارة طبية فردية",
        icon: "stethoscope",
        result: "لا يوجد استرداد - جميع المبيعات نهائية",
        color: "red",
        link: "#consultations",
      },
      {
        id: "homecare",
        title: "خدمة رعاية منزلية",
        icon: "home",
        result: "لا يوجد استرداد - جميع المبيعات نهائية",
        color: "red",
        link: "#homecare",
      },
      {
        id: "points",
        title: "نقاط / محفظة",
        icon: "coins",
        result: "غير قابلة للاسترداد النقدي",
        color: "gray",
        link: "#points",
      },
    ],
  },

  sections: [
    {
      id: "introduction",
      number: "1",
      title: "مقدمة",
      content: [
        {
          type: "paragraph",
          text: "تلتزم أمان إيفر بتوفير خدمات طبية وصحية عالية الجودة. نود إعلامك بأن جميع الاشتراكات والخدمات المقدمة عبر منصتنا هي **نهائية وغير قابلة للاسترداد**.",
        },
        {
          type: "alert",
          alert: {
            type: "warning",
            text: "⚠️ جميع المبيعات نهائية - لا يوجد استرداد للمبالغ المدفوعة",
          },
        },
        {
          type: "paragraph",
          text: "يرجى قراءة هذه السياسة بعناية قبل إتمام أي عملية شراء أو اشتراك.",
        },
      ],
    },
    {
      id: "subscriptions",
      number: "2",
      title: "اشتراكات بطاقة العضوية",
      content: [
        {
          type: "paragraph",
          text: "جميع اشتراكات بطاقة العضوية (الفردية، العائلية، الذهبية، إلخ) هي **نهائية وغير قابلة للاسترداد**.",
        },
        {
          type: "list",
          items: [
            "لا يمكن إلغاء الاشتراك واسترداد المبلغ بعد إتمام عملية الدفع.",
            "الاشتراك صالح للمدة المحددة فقط ولا يمكن تمديده أو استرداده.",
            "في حالة عدم استخدام الخدمات، لا يحق لك المطالبة باسترداد المبلغ.",
          ],
        },
        {
          type: "alert",
          alert: {
            type: "error",
            text: "❌ لا يوجد استرداد للاشتراكات تحت أي ظرف",
          },
        },
      ],
    },
    {
      id: "consultations",
      number: "3",
      title: "الاستشارات الطبية",
      content: [
        {
          type: "paragraph",
          text: "جميع الاستشارات الطبية المدفوعة (أونلاين أو حضورية) هي **نهائية وغير قابلة للاسترداد**.",
        },
        {
          type: "list",
          items: [
            "بمجرد حجز الاستشارة ودفع الرسوم، لا يمكن استرداد المبلغ.",
            "في حالة عدم الحضور أو الإلغاء، لا يحق لك استرداد المبلغ.",
            "يمكنك إعادة جدولة الموعد مرة واحدة فقط حسب توفر الطبيب.",
          ],
        },
      ],
    },
    {
      id: "homecare",
      number: "4",
      title: "خدمات الرعاية المنزلية",
      content: [
        {
          type: "paragraph",
          text: "جميع خدمات الرعاية المنزلية المدفوعة هي **نهائية وغير قابلة للاسترداد**.",
        },
        {
          type: "list",
          items: [
            "بمجرد حجز الخدمة ودفع الرسوم، لا يمكن استرداد المبلغ.",
            "في حالة الإلغاء، لا يحق لك استرداد المبلغ.",
            "يمكنك إعادة جدولة الموعد مرة واحدة فقط حسب توفر الفريق الطبي.",
          ],
        },
      ],
    },
    {
      id: "points",
      number: "5",
      title: "النقاط والمحفظة الإلكترونية",
      content: [
        {
          type: "paragraph",
          text: "النقاط والرصيد في المحفظة الإلكترونية **غير قابلة للاسترداد النقدي**.",
        },
        {
          type: "list",
          items: [
            "النقاط المُكتسبة من المعاملات غير قابلة للتحويل النقدي.",
            "يمكن استخدام النقاط فقط للحصول على خصومات على الخدمات.",
            "في حالة إغلاق الحساب، تُفقد جميع النقاط المتبقية.",
          ],
        },
      ],
    },
    {
      id: "exceptions",
      number: "6",
      title: "الحالات الاستثنائية",
      content: [
        {
          type: "paragraph",
          text: "في حالات استثنائية محدودة جداً، قد ننظر في طلبات الاسترداد:",
        },
        {
          type: "list",
          items: [
            "**خطأ تقني من المنصة**: إذا تم خصم المبلغ مرتين بسبب خطأ تقني.",
            "**عمليات احتيالية**: إذا تم استخدام بطاقتك دون إذنك (يتطلب تقرير شرطة).",
            "**انقطاع كامل للخدمة**: إذا توقفت المنصة عن العمل بشكل كامل لأكثر من 30 يوماً.",
          ],
        },
        {
          type: "alert",
          alert: {
            type: "info",
            text: "ℹ️ يتم دراسة كل حالة استثنائية على حدة وقد يستغرق الأمر 30 يوم عمل",
          },
        },
      ],
    },
    {
      id: "contact",
      number: "7",
      title: "التواصل معنا",
      content: [
        {
          type: "paragraph",
          text: "إذا كان لديك أي استفسار حول هذه السياسة، يمكنك التواصل معنا عبر:",
        },
        {
          type: "list",
          items: [
            "البريد الإلكتروني: support@amanever.com",
            "الهاتف: 966544608220+",
            "WhatsApp: 966544608220+",
          ],
        },
      ],
    },
  ],

  lastUpdated: "2026-05-04",
  effectiveDate: "2026-05-04",
};
