// Brand tokens and constants for Omniya chatbot

export const brand = {
  primary: "emerald-600",
  primaryDark: "emerald-700",
  primaryLight: "emerald-50",
  surface: "white",
  text: "slate-900",
  muted: "slate-500",
  danger: "red-600",
  whatsapp: "#25D366",
  radius: {
    bubble: "1rem",
    window: "1.5rem",
    chip: "9999px",
  },
  font: "IBM Plex Sans Arabic, Noto Sans Arabic, system-ui, sans-serif",
} as const;

export const WHATSAPP_NUMBER = "966544608220";
export const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export const CUSTOMER_SERVICE_NUMBER = "966544608220"; // رقم خدمة العملاء

export const EMERGENCY_NUMBERS = {
  ambulance: "997",
  emergency: "911",
} as const;

export const STORAGE_KEYS = {
  consent: "amanever:chat:consent:v1",
  state: "amanever:chat:state:v1",
  history: "amanever:chat:history:v1",
} as const;

export const CONVERSATION_EXPIRY_DAYS = 90;

export const TYPING_DELAY_MS = 900;
export const BLOCK_STAGGER_MS = 300;

export const OMNIYA_NAME_AR = "أمنية";
export const OMNIYA_NAME_EN = "Omniya";
export const OMNIYA_ROLE_AR = "المساعدة الذكية لأمان إيفر";
export const OMNIYA_STATUS_AR = "تردّ خلال ثواني";
