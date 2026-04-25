// Intent detection for user messages
import type { IntentType } from "./types";

const EMERGENCY =
  /\b(ألم\s*في\s*الصدر|صعوبة\s*تنفس|نزيف|إغماء|سكتة|جلطة|طوارئ|طارئ|إسعاف|911|997|emergency)\b/iu;
const BOOKING = /\b(حجز|موعد|استشارة|كشف|أحجز|بحجز)\b/iu;
const MEMBERSHIP = /\b(باقة|اشتراك|عضوية|VIP|بريميير|Premier)\b/iu;
const NETWORK = /\b(مستشفى|عيادة|صيدلية|شبكة|مقدم\s*خدمة)\b/iu;
const REFUND = /\b(استرداد|استرجاع|فلوسي|فاتورة|مبلغ)\b/iu;

export function detectIntent(text: string): IntentType {
  if (EMERGENCY.test(text)) return "emergency";
  if (BOOKING.test(text)) return "booking";
  if (MEMBERSHIP.test(text)) return "membership";
  if (NETWORK.test(text)) return "network";
  if (REFUND.test(text)) return "refund";
  return "unknown";
}

// Emergency keywords for highlighting in UI
export const EMERGENCY_KEYWORDS = [
  "ألم في الصدر",
  "صعوبة تنفس",
  "نزيف",
  "إغماء",
  "سكتة",
  "جلطة",
  "طوارئ",
  "إسعاف",
];
