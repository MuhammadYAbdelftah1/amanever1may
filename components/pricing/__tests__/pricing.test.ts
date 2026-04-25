/**
 * Unit Tests for Pricing Calculator
 * Tests the savings calculation logic
 */

import { CALCULATOR_COSTS, CALCULATOR_DISCOUNTS, PRICING_TIERS } from '@/data/pricing-data';

describe('Pricing Calculator', () => {
  describe('Cost Calculations', () => {
    it('should calculate doctor visit costs correctly', () => {
      const visits = 6;
      const expectedCost = visits * CALCULATOR_COSTS.avgDoctorVisit;
      expect(expectedCost).toBe(1800);
    });

    it('should calculate dental visit costs correctly', () => {
      const visits = 2;
      const expectedCost = visits * CALCULATOR_COSTS.avgDentalVisit;
      expect(expectedCost).toBe(1600);
    });

    it('should calculate yearly medicine costs correctly', () => {
      const monthlyBudget = 500;
      const expectedCost = monthlyBudget * 12;
      expect(expectedCost).toBe(6000);
    });

    it('should calculate home care costs correctly', () => {
      const expectedCost = CALCULATOR_COSTS.avgHomeCareVisit * CALCULATOR_COSTS.homeCareVisitsPerYear;
      expect(expectedCost).toBe(7200);
    });
  });

  describe('Discount Calculations', () => {
    it('should apply basic plan discount correctly', () => {
      const totalCost = 10000;
      const discountedCost = totalCost * (1 - CALCULATOR_DISCOUNTS.basic);
      expect(discountedCost).toBe(5000);
    });

    it('should apply plus plan discount correctly', () => {
      const totalCost = 10000;
      const discountedCost = totalCost * (1 - CALCULATOR_DISCOUNTS.plus);
      expect(discountedCost).toBe(3000);
    });

    it('should apply VIP plan discount correctly', () => {
      const totalCost = 10000;
      const discountedCost = totalCost * (1 - CALCULATOR_DISCOUNTS.vip);
      expect(discountedCost).toBe(2000);
    });
  });

  describe('Total Savings Calculations', () => {
    it('should calculate total savings with Plus plan correctly', () => {
      const doctorVisits = 6;
      const dentalVisits = 2;
      const monthlyMedicine = 500;
      const homeCare = false;

      const doctorCost = doctorVisits * CALCULATOR_COSTS.avgDoctorVisit;
      const dentalCost = dentalVisits * CALCULATOR_COSTS.avgDentalVisit;
      const medicineCost = monthlyMedicine * 12;
      const homeCareCost = homeCare ? CALCULATOR_COSTS.avgHomeCareVisit * CALCULATOR_COSTS.homeCareVisitsPerYear : 0;

      const totalWithoutAman = doctorCost + dentalCost + medicineCost + homeCareCost;
      const withPlus = totalWithoutAman * (1 - CALCULATOR_DISCOUNTS.plus) + PRICING_TIERS[1].price.yearly;
      const savings = totalWithoutAman - withPlus;

      expect(totalWithoutAman).toBe(9400);
      expect(withPlus).toBe(6310);
      expect(savings).toBe(3090);
    });

    it('should include home care in calculations when enabled', () => {
      const doctorVisits = 6;
      const dentalVisits = 2;
      const monthlyMedicine = 500;
      const homeCare = true;

      const doctorCost = doctorVisits * CALCULATOR_COSTS.avgDoctorVisit;
      const dentalCost = dentalVisits * CALCULATOR_COSTS.avgDentalVisit;
      const medicineCost = monthlyMedicine * 12;
      const homeCareCost = homeCare ? CALCULATOR_COSTS.avgHomeCareVisit * CALCULATOR_COSTS.homeCareVisitsPerYear : 0;

      const totalWithoutAman = doctorCost + dentalCost + medicineCost + homeCareCost;

      expect(totalWithoutAman).toBe(16600);
      expect(homeCareCost).toBe(7200);
    });
  });

  describe('Plan Pricing', () => {
    it('should have correct monthly prices', () => {
      expect(PRICING_TIERS[0].price.monthly).toBe(199);
      expect(PRICING_TIERS[1].price.monthly).toBe(349);
      expect(PRICING_TIERS[2].price.monthly).toBe(699);
    });

    it('should have correct yearly prices', () => {
      expect(PRICING_TIERS[0].price.yearly).toBe(1990);
      expect(PRICING_TIERS[1].price.yearly).toBe(3490);
      expect(PRICING_TIERS[2].price.yearly).toBe(6990);
    });

    it('should calculate yearly savings correctly', () => {
      const basicSavings = PRICING_TIERS[0].price.monthly * 12 - PRICING_TIERS[0].price.yearly;
      const plusSavings = PRICING_TIERS[1].price.monthly * 12 - PRICING_TIERS[1].price.yearly;
      const vipSavings = PRICING_TIERS[2].price.monthly * 12 - PRICING_TIERS[2].price.yearly;

      expect(basicSavings).toBe(398); // Save 2 months
      expect(plusSavings).toBe(698); // Save 2 months
      expect(vipSavings).toBe(1398); // Save 2 months
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero visits correctly', () => {
      const doctorVisits = 0;
      const dentalVisits = 0;
      const monthlyMedicine = 0;
      const homeCare = false;

      const totalWithoutAman = 0;
      const withPlus = totalWithoutAman * (1 - CALCULATOR_DISCOUNTS.plus) + PRICING_TIERS[1].price.yearly;
      const savings = totalWithoutAman - withPlus;

      expect(savings).toBe(-3490); // Negative savings means plan costs more than usage
    });

    it('should handle maximum visits correctly', () => {
      const doctorVisits = 24;
      const dentalVisits = 6;
      const monthlyMedicine = 2000;
      const homeCare = true;

      const doctorCost = doctorVisits * CALCULATOR_COSTS.avgDoctorVisit;
      const dentalCost = dentalVisits * CALCULATOR_COSTS.avgDentalVisit;
      const medicineCost = monthlyMedicine * 12;
      const homeCareCost = CALCULATOR_COSTS.avgHomeCareVisit * CALCULATOR_COSTS.homeCareVisitsPerYear;

      const totalWithoutAman = doctorCost + dentalCost + medicineCost + homeCareCost;

      expect(totalWithoutAman).toBe(43200);
    });
  });
});
