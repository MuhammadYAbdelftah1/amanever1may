/**
 * Cookie Categories Configuration
 * 
 * ⚠️ COMPLIANCE: PDPL + GDPR cookie consent
 * 
 * This file defines all cookie categories used on the platform.
 * Modify this file to add/remove cookie categories without changing component code.
 */

export interface CookieExample {
  name: string;
  duration: string;
  purpose: string;
}

export interface CookieCategory {
  id: string;
  title: string;
  description: string;
  required: boolean;
  defaultEnabled: boolean;
  badge?: string;
  icon: string;
  examples: CookieExample[];
  providers: Array<{
    name: string;
    type: 'first-party' | 'third-party';
    policyUrl?: string;
  }>;
}

export const COOKIE_CATEGORIES: CookieCategory[] = [
  {
    id: 'essential',
    title: 'الكوكيز الضرورية',
    description: 'تحفظ جلسة دخولك، عربة الخدمات، اللغة، وإعدادات الأمان. هذه الكوكيز ضرورية لعمل الموقع ولا يمكن تعطيلها.',
    required: true,
    defaultEnabled: true,
    badge: 'إلزامية لعمل الموقع',
    icon: 'lock',
    examples: [
      {
        name: 'session_id',
        duration: 'مدة الجلسة',
        purpose: 'تحديد جلسة المستخدم النشطة',
      },
      {
        name: 'auth_token',
        duration: '30 يوم',
        purpose: 'الحفاظ على تسجيل الدخول',
      },
      {
        name: 'lang_preference',
        duration: 'سنة واحدة',
        purpose: 'حفظ اللغة المفضلة',
      },
      {
        name: 'csrf_token',
        duration: 'الجلسة فقط',
        purpose: 'الحماية من هجمات CSRF',
      },
      {
        name: 'cookie_consent',
        duration: 'سنة واحدة',
        purpose: 'حفظ تفضيلات الكوكيز',
      },
    ],
    providers: [
      {
        name: 'أمان إيفر',
        type: 'first-party',
      },
    ],
  },
  {
    id: 'analytics',
    title: 'كوكيز الأداء والتحليلات',
    description: 'تساعدنا في فهم كيف تستخدم الموقع لنحسّن التجربة. البيانات مجهولة الهوية ولا تُستخدم لتحديد هويتك.',
    required: false,
    defaultEnabled: false,
    icon: 'chart',
    examples: [
      {
        name: '_ga',
        duration: '26 شهر',
        purpose: 'Google Analytics - تمييز المستخدمين',
      },
      {
        name: '_ga_*',
        duration: '26 شهر',
        purpose: 'Google Analytics 4 - حالة الجلسة',
      },
      {
        name: '_hjid',
        duration: '12 شهر',
        purpose: 'Hotjar - تحليل سلوك المستخدم',
      },
      {
        name: '_clck',
        duration: '12 شهر',
        purpose: 'Microsoft Clarity - تحليل الأداء',
      },
    ],
    providers: [
      {
        name: 'Google Analytics',
        type: 'third-party',
        policyUrl: 'https://policies.google.com/privacy',
      },
      {
        name: 'Hotjar',
        type: 'third-party',
        policyUrl: 'https://www.hotjar.com/legal/policies/privacy/',
      },
      {
        name: 'Microsoft Clarity',
        type: 'third-party',
        policyUrl: 'https://privacy.microsoft.com/privacystatement',
      },
    ],
  },
  {
    id: 'marketing',
    title: 'كوكيز التسويق',
    description: 'تستخدم لعرض إعلانات أمان إيفر على منصات أخرى (فيسبوك، إنستغرام، تيك توك) وقياس فعالية الحملات الإعلانية.',
    required: false,
    defaultEnabled: false,
    icon: 'megaphone',
    examples: [
      {
        name: '_fbp',
        duration: '3 أشهر',
        purpose: 'Meta Pixel - تتبع الإعلانات على فيسبوك وإنستغرام',
      },
      {
        name: '_ttp',
        duration: '13 شهر',
        purpose: 'TikTok Pixel - قياس أداء الإعلانات',
      },
      {
        name: '_scid',
        duration: '13 شهر',
        purpose: 'Snapchat Pixel - تتبع التحويلات',
      },
      {
        name: '_gcl_au',
        duration: '3 أشهر',
        purpose: 'Google Ads - قياس التحويلات',
      },
    ],
    providers: [
      {
        name: 'Meta (Facebook/Instagram)',
        type: 'third-party',
        policyUrl: 'https://www.facebook.com/privacy/policy/',
      },
      {
        name: 'TikTok',
        type: 'third-party',
        policyUrl: 'https://www.tiktok.com/legal/privacy-policy',
      },
      {
        name: 'Snapchat',
        type: 'third-party',
        policyUrl: 'https://www.snap.com/privacy/privacy-policy',
      },
      {
        name: 'Google Ads',
        type: 'third-party',
        policyUrl: 'https://policies.google.com/privacy',
      },
    ],
  },
  {
    id: 'personalization',
    title: 'كوكيز التخصيص',
    description: 'تذكّر تفضيلاتك (التخصصات الطبية المفضلة، المدينة، الأطباء المحفوظين) لتوفير تجربة مخصصة لك.',
    required: false,
    defaultEnabled: false,
    icon: 'user',
    examples: [
      {
        name: 'preferred_specialties',
        duration: '6 أشهر',
        purpose: 'حفظ التخصصات الطبية المفضلة',
      },
      {
        name: 'saved_doctors',
        duration: '6 أشهر',
        purpose: 'قائمة الأطباء المحفوظين',
      },
      {
        name: 'last_city',
        duration: '3 أشهر',
        purpose: 'آخر مدينة بحثت فيها',
      },
      {
        name: 'ui_preferences',
        duration: 'سنة واحدة',
        purpose: 'تفضيلات واجهة المستخدم',
      },
    ],
    providers: [
      {
        name: 'أمان إيفر',
        type: 'first-party',
      },
    ],
  },
];

export const COOKIE_CONSENT_VERSION = '1.0';
export const COOKIE_CONSENT_KEY = 'aman_cookie_consent_v1';

export interface CookieConsent {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  personalization: boolean;
  timestamp: string;
  version: string;
}

export const DEFAULT_COOKIE_CONSENT: CookieConsent = {
  essential: true,
  analytics: false,
  marketing: false,
  personalization: false,
  timestamp: new Date().toISOString(),
  version: COOKIE_CONSENT_VERSION,
};
