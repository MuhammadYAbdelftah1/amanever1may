/**
 * Pricing Utilities
 * Helper functions for pricing calculations and formatting
 */

import { CALCULATOR_COSTS, CALCULATOR_DISCOUNTS, PRICING_TIERS } from '@/data/pricing-data';

export interface CalculatorInputs {
  doctorVisits: number;
  dentalVisits: number;
  monthlyMedicine: number;
  homeCare: boolean;
}

export interface CalculatorResults {
  totalWithoutAman: number;
  withBasic: number;
  withPlus: number;
  withVIP: number;
  savingsBasic: number;
  savingsPlus: number;
  savingsVIP: number;
  bestPlan: 'basic' | 'plus' | 'vip';
  savingsPercentage: number;
}

/**
 * Calculate total costs and savings for all plans
 */
export function calculateSavings(inputs: CalculatorInputs): CalculatorResults {
  const { doctorVisits, dentalVisits, monthlyMedicine, homeCare } = inputs;

  // Calculate individual costs
  const doctorCost = doctorVisits * CALCULATOR_COSTS.avgDoctorVisit;
  const dentalCost = dentalVisits * CALCULATOR_COSTS.avgDentalVisit;
  const medicineCost = monthlyMedicine * 12;
  const homeCareCost = homeCare
    ? CALCULATOR_COSTS.avgHomeCareVisit * CALCULATOR_COSTS.homeCareVisitsPerYear
    : 0;

  // Total cost without Aman Ever
  const totalWithoutAman = doctorCost + dentalCost + medicineCost + homeCareCost;

  // Calculate costs with each plan (discounted services + plan price)
  const withBasic =
    totalWithoutAman * (1 - CALCULATOR_DISCOUNTS.basic) + PRICING_TIERS[0].price.yearly;
  const withPlus =
    totalWithoutAman * (1 - CALCULATOR_DISCOUNTS.plus) + PRICING_TIERS[1].price.yearly;
  const withVIP =
    totalWithoutAman * (1 - CALCULATOR_DISCOUNTS.vip) + PRICING_TIERS[2].price.yearly;

  // Calculate savings
  const savingsBasic = totalWithoutAman - withBasic;
  const savingsPlus = totalWithoutAman - withPlus;
  const savingsVIP = totalWithoutAman - withVIP;

  // Determine best plan (highest savings)
  let bestPlan: 'basic' | 'plus' | 'vip' = 'plus';
  let maxSavings = savingsPlus;

  if (savingsBasic > maxSavings) {
    bestPlan = 'basic';
    maxSavings = savingsBasic;
  }
  if (savingsVIP > maxSavings) {
    bestPlan = 'vip';
    maxSavings = savingsVIP;
  }

  // Calculate savings percentage
  const savingsPercentage =
    totalWithoutAman > 0 ? (maxSavings / totalWithoutAman) * 100 : 0;

  return {
    totalWithoutAman,
    withBasic,
    withPlus,
    withVIP,
    savingsBasic,
    savingsPlus,
    savingsVIP,
    bestPlan,
    savingsPercentage,
  };
}

/**
 * Format currency in SAR
 */
export function formatCurrency(amount: number, locale: string = 'ar-SA'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'SAR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format number with Arabic locale
 */
export function formatNumber(num: number, locale: string = 'ar-SA'): string {
  return new Intl.NumberFormat(locale).format(num);
}

/**
 * Calculate yearly savings when choosing yearly billing
 */
export function calculateYearlySavings(monthlyPrice: number, yearlyPrice: number): number {
  return monthlyPrice * 12 - yearlyPrice;
}

/**
 * Calculate percentage discount
 */
export function calculateDiscountPercentage(original: number, discounted: number): number {
  if (original === 0) return 0;
  return Math.round(((original - discounted) / original) * 100);
}

/**
 * Validate calculator inputs
 */
export function validateCalculatorInputs(inputs: CalculatorInputs): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (inputs.doctorVisits < 0 || inputs.doctorVisits > 24) {
    errors.push('عدد زيارات الطبيب يجب أن يكون بين 0 و 24');
  }

  if (inputs.dentalVisits < 0 || inputs.dentalVisits > 6) {
    errors.push('عدد زيارات الأسنان يجب أن يكون بين 0 و 6');
  }

  if (inputs.monthlyMedicine < 0) {
    errors.push('ميزانية الأدوية يجب أن تكون رقماً موجباً');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Get plan recommendation based on usage
 */
export function getRecommendedPlan(inputs: CalculatorInputs): {
  planId: 'basic' | 'plus' | 'vip';
  reason: string;
} {
  const { doctorVisits, dentalVisits, homeCare } = inputs;

  // High usage → VIP
  if (doctorVisits > 12 || dentalVisits > 3 || homeCare) {
    return {
      planId: 'vip',
      reason: 'استخدامك العالي يجعل باقة VIP الأنسب لك',
    };
  }

  // Medium usage → Plus
  if (doctorVisits > 6 || dentalVisits > 1) {
    return {
      planId: 'plus',
      reason: 'باقة بلس توفر لك أفضل قيمة مقابل استخدامك',
    };
  }

  // Low usage → Basic
  return {
    planId: 'basic',
    reason: 'الباقة الأساسية كافية لاحتياجاتك',
  };
}

/**
 * Generate shareable URL with calculator results
 */
export function generateShareableUrl(inputs: CalculatorInputs): string {
  const params = new URLSearchParams({
    doctor: inputs.doctorVisits.toString(),
    dental: inputs.dentalVisits.toString(),
    medicine: inputs.monthlyMedicine.toString(),
    homecare: inputs.homeCare ? '1' : '0',
  });

  return `${window.location.origin}/ar/pricing?${params.toString()}#calculator`;
}

/**
 * Parse calculator inputs from URL
 */
export function parseCalculatorFromUrl(searchParams: URLSearchParams): CalculatorInputs | null {
  const doctor = searchParams.get('doctor');
  const dental = searchParams.get('dental');
  const medicine = searchParams.get('medicine');
  const homecare = searchParams.get('homecare');

  if (!doctor || !dental || !medicine) {
    return null;
  }

  return {
    doctorVisits: parseInt(doctor, 10),
    dentalVisits: parseInt(dental, 10),
    monthlyMedicine: parseInt(medicine, 10),
    homeCare: homecare === '1',
  };
}
