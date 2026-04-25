/**
 * Contact Form Topics - Success Messages and Routing Logic
 */

export function getSuccessMessageByTopic(topicId: string): string {
  const messages: Record<string, string> = {
    general:
      "شكراً لتواصلك معنا! سيرد عليك فريق الدعم خلال 15 دقيقة في ساعات العمل.",
    booking:
      "استلمنا طلب حجزك. سيتواصل معك منسق المواعيد خلال 15 دقيقة لتأكيد الموعد.",
    membership:
      "شكراً لاهتمامك بباقاتنا! سيتواصل معك مستشار العضويات خلال ساعة لمساعدتك في اختيار الباقة المناسبة.",
    billing:
      "استلمنا استفسارك المالي. سيراجع فريق المحاسبة طلبك ويرد عليك خلال 24 ساعة.",
    doctor:
      "شكراً لاهتمامك بالانضمام لشبكة أطبائنا! سيتواصل معك فريق الشراكات خلال 48 ساعة لمناقشة التفاصيل.",
    partner:
      "استلمنا طلب الشراكة. سيتواصل معك مدير تطوير الأعمال خلال 48 ساعة لمناقشة فرص التعاون.",
    affiliate:
      "شكراً لاهتمامك ببرنامج التسويق بالعمولة! سيرسل لك فريق الأفلييت تفاصيل البرنامج خلال 24 ساعة.",
    tech:
      "عذراً على الإزعاج. استلم فريق الدعم التقني بلاغك وسيعمل على حل المشكلة خلال 4 ساعات.",
    media:
      "شكراً لاهتمامك الإعلامي. سيتواصل معك فريق العلاقات العامة خلال 24 ساعة.",
    other:
      "شكراً لتواصلك معنا! سنراجع رسالتك ونرد عليك في أقرب وقت ممكن.",
  };

  return (
    messages[topicId] ||
    "شكراً لتواصلك معنا! سنرد عليك في أقرب وقت ممكن."
  );
}

/**
 * Get routing email based on topic
 */
export function getRoutingEmailByTopic(topicId: string): string {
  const routing: Record<string, string> = {
    general: "info@amanever.com",
    booking: "info@amanever.com",
    membership: "info@amanever.com",
    billing: "info@amanever.com",
    doctor: "partnerships@amanever.com",
    partner: "partnerships@amanever.com",
    affiliate: "affiliates@amanever.com",
    tech: "support@amanever.com",
    media: "info@amanever.com",
    other: "info@amanever.com",
  };

  return routing[topicId] || "info@amanever.com";
}

/**
 * Get expected response time based on topic
 */
export function getResponseTimeByTopic(topicId: string): string {
  const times: Record<string, string> = {
    general: "15 دقيقة",
    booking: "15 دقيقة",
    membership: "ساعة واحدة",
    billing: "24 ساعة",
    doctor: "48 ساعة",
    partner: "48 ساعة",
    affiliate: "24 ساعة",
    tech: "4 ساعات",
    media: "24 ساعة",
    other: "24 ساعة",
  };

  return times[topicId] || "24 ساعة";
}
