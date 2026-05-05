/**
 * Partners Configuration
 * مركز إدارة بيانات الشركاء
 * 
 * هذا الملف يحتوي على جميع معلومات الشركاء بشكل مركزي
 * لتسهيل الإضافة والتعديل والصيانة
 */

export interface Partner {
  id: number;
  name: string;
  nameEn: string;
  logo: string;
  website?: string;
  social?: string;
  category: 'hospital' | 'pharmacy' | 'fitness' | 'insurance' | 'clinic';
  description?: string;
  descriptionEn?: string;
}

/**
 * قائمة الشركاء الرسميين
 * Official Partners List
 */
export const partners: Partner[] = [
  {
    id: 1,
    name: 'مستشفى د. سليمان الحبيب',
    nameEn: 'Dr. Sulaiman Al Habib Hospital',
    logo: '/partners/sulaiman-alhabib.png',
    website: 'https://www.hmg.com',
    category: 'hospital',
    description: 'مجموعة د. سليمان الحبيب الطبية - رائدة في الرعاية الصحية',
    descriptionEn: 'Dr. Sulaiman Al Habib Medical Group - Healthcare Leader',
  },
  {
    id: 2,
    name: 'مستشفى المواساة',
    nameEn: 'Mouwasat Hospital',
    logo: '/partners/mouwasat.png',
    website: 'https://www.mouwasat.com',
    category: 'hospital',
    description: 'مستشفى المواساة - خدمات طبية متميزة',
    descriptionEn: 'Mouwasat Hospital - Distinguished Medical Services',
  },
  {
    id: 3,
    name: 'مستشفى دله',
    nameEn: 'Dallah Hospital',
    logo: '/partners/dallah.png',
    website: 'https://www.dallah-hospital.com',
    category: 'hospital',
    description: 'مستشفى دله - رعاية صحية شاملة',
    descriptionEn: 'Dallah Hospital - Comprehensive Healthcare',
  },
  {
    id: 4,
    name: 'السعودي الألماني الصحية',
    nameEn: 'Saudi German Health',
    logo: '/partners/saudi-german.png',
    website: 'https://www.sghgroup.sa',
    category: 'hospital',
    description: 'مجموعة السعودي الألماني الصحية',
    descriptionEn: 'Saudi German Health Group',
  },
  {
    id: 5,
    name: 'صيدليات النهدي',
    nameEn: 'Nahdi Pharmacy',
    logo: '/partners/nahdi.png',
    website: 'https://www.nahdionline.com',
    category: 'pharmacy',
    description: 'صيدليات النهدي - شريكك الصحي',
    descriptionEn: 'Nahdi Pharmacy - Your Health Partner',
  },
  {
    id: 6,
    name: 'صيدليات الدواء',
    nameEn: 'Al-Dawaa Pharmacy',
    logo: '/partners/aldawaa.png',
    website: 'https://www.aldawaa.com',
    category: 'pharmacy',
    description: 'صيدليات الدواء - صحتك تهمنا',
    descriptionEn: 'Al-Dawaa Pharmacy - Your Health Matters',
  },
  {
    id: 7,
    name: 'فتنس تايم',
    nameEn: 'Fitness Time',
    logo: '/partners/fitness-time.png',
    website: 'https://www.fitnesstime.com.sa',
    category: 'fitness',
    description: 'فتنس تايم - نمط حياة صحي',
    descriptionEn: 'Fitness Time - Healthy Lifestyle',
  },
  {
    id: 8,
    name: 'بوبا العربية',
    nameEn: 'Bupa Arabia',
    logo: '/partners/bupa.png',
    website: 'https://www.bupa.com.sa',
    category: 'insurance',
    description: 'بوبا العربية للتأمين التعاوني',
    descriptionEn: 'Bupa Arabia for Cooperative Insurance',
  },
  {
    id: 9,
    name: 'مستشفيات مغربي',
    nameEn: 'Magrabi Hospitals',
    logo: '/partners/magrabi.png',
    website: 'https://www.magrabi.com.sa',
    category: 'hospital',
    description: 'مستشفيات مغربي - رعاية العيون',
    descriptionEn: 'Magrabi Hospitals - Eye Care',
  },
  {
    id: 10,
    name: 'فقيه كير',
    nameEn: 'Fakeeh Care',
    logo: '/partners/fakeeh.png',
    website: 'https://www.fakeeh.care',
    category: 'hospital',
    description: 'فقيه كير - رعاية صحية متكاملة',
    descriptionEn: 'Fakeeh Care - Integrated Healthcare',
  },
];

/**
 * الحصول على الشركاء حسب الفئة
 * Get partners by category
 */
export function getPartnersByCategory(category: Partner['category']): Partner[] {
  return partners.filter((partner) => partner.category === category);
}

/**
 * الحصول على شريك بواسطة ID
 * Get partner by ID
 */
export function getPartnerById(id: number): Partner | undefined {
  return partners.find((partner) => partner.id === id);
}

/**
 * الحصول على عدد الشركاء
 * Get partners count
 */
export function getPartnersCount(): number {
  return partners.length;
}

/**
 * الحصول على عدد الشركاء حسب الفئة
 * Get partners count by category
 */
export function getPartnersCategoryCount(): Record<Partner['category'], number> {
  return {
    hospital: getPartnersByCategory('hospital').length,
    pharmacy: getPartnersByCategory('pharmacy').length,
    fitness: getPartnersByCategory('fitness').length,
    insurance: getPartnersByCategory('insurance').length,
    clinic: getPartnersByCategory('clinic').length,
  };
}

/**
 * التحقق من وجود شريك
 * Check if partner exists
 */
export function partnerExists(id: number): boolean {
  return partners.some((partner) => partner.id === id);
}

/**
 * البحث عن شركاء
 * Search partners
 */
export function searchPartners(query: string, locale: 'ar' | 'en' = 'ar'): Partner[] {
  const searchTerm = query.toLowerCase();
  return partners.filter((partner) => {
    const name = locale === 'ar' ? partner.name : partner.nameEn;
    const description = locale === 'ar' ? partner.description : partner.descriptionEn;
    
    return (
      name.toLowerCase().includes(searchTerm) ||
      description?.toLowerCase().includes(searchTerm)
    );
  });
}

/**
 * إحصائيات الشركاء
 * Partners Statistics
 */
export const partnersStats = {
  total: partners.length,
  hospitals: getPartnersByCategory('hospital').length,
  pharmacies: getPartnersByCategory('pharmacy').length,
  fitness: getPartnersByCategory('fitness').length,
  insurance: getPartnersByCategory('insurance').length,
  clinics: getPartnersByCategory('clinic').length,
};

/**
 * تصدير الشركاء كـ JSON
 * Export partners as JSON
 */
export function exportPartnersJSON(): string {
  return JSON.stringify(partners, null, 2);
}

/**
 * ملاحظات للمطورين:
 * Developer Notes:
 * 
 * 1. لإضافة شريك جديد، أضف كائن جديد في مصفوفة partners
 * 2. تأكد من إضافة الشعار في مجلد public/partners/
 * 3. استخدم الأسماء الصحيحة للملفات (lowercase مع dashes)
 * 4. تحقق من صحة الروابط قبل الإضافة
 * 5. أضف وصف مختصر للشريك
 * 
 * مثال لإضافة شريك جديد:
 * {
 *   id: 11,
 *   name: 'اسم الشريك بالعربية',
 *   nameEn: 'Partner Name in English',
 *   logo: '/partners/partner-logo.png',
 *   website: 'https://www.partner.com',
 *   category: 'hospital',
 *   description: 'وصف مختصر بالعربية',
 *   descriptionEn: 'Short description in English',
 * }
 */
