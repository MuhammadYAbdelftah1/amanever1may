'use client';

import { useState, useEffect } from 'react';
import { PRICING_TIERS, CALCULATOR_COSTS, CALCULATOR_DISCOUNTS, CALCULATOR_DEFAULTS } from '@/data/pricing-data';
import { Calculator, TrendingDown } from 'lucide-react';

export function SavingsCalculator() {
  const [doctorVisits, setDoctorVisits] = useState(CALCULATOR_DEFAULTS.doctorVisits);
  const [dentalVisits, setDentalVisits] = useState(CALCULATOR_DEFAULTS.dentalVisits);
  const [monthlyMedicine, setMonthlyMedicine] = useState(CALCULATOR_DEFAULTS.monthlyMedicine);
  const [homeCare, setHomeCare] = useState(CALCULATOR_DEFAULTS.homeCare);
  const [showResults, setShowResults] = useState(false);
  const [animatedSavings, setAnimatedSavings] = useState(0);

  // Add ID for anchor linking
  useEffect(() => {
    const element = document.getElementById('calculator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Calculate costs
  const calculateCosts = () => {
    const doctorCost = doctorVisits * CALCULATOR_COSTS.avgDoctorVisit;
    const dentalCost = dentalVisits * CALCULATOR_COSTS.avgDentalVisit;
    const medicineCost = monthlyMedicine * 12;
    const homeCareCost = homeCare ? CALCULATOR_COSTS.avgHomeCareVisit * CALCULATOR_COSTS.homeCareVisitsPerYear : 0;
    
    const totalWithoutAman = doctorCost + dentalCost + medicineCost + homeCareCost;
    
    // Calculate with each plan
    const withBasic = totalWithoutAman * (1 - CALCULATOR_DISCOUNTS.basic) + PRICING_TIERS[0].price.yearly;
    const withPlus = totalWithoutAman * (1 - CALCULATOR_DISCOUNTS.plus) + PRICING_TIERS[1].price.yearly;
    const withVIP = totalWithoutAman * (1 - CALCULATOR_DISCOUNTS.vip) + PRICING_TIERS[2].price.yearly;
    
    return {
      totalWithoutAman,
      withBasic,
      withPlus,
      withVIP,
      savingsBasic: totalWithoutAman - withBasic,
      savingsPlus: totalWithoutAman - withPlus,
      savingsVIP: totalWithoutAman - withVIP,
    };
  };

  const handleCalculate = () => {
    setShowResults(true);
    setAnimatedSavings(0);
    
    // Animate the savings number
    const results = calculateCosts();
    const targetSavings = Math.round(results.savingsPlus);
    const duration = 1000;
    const steps = 50;
    const increment = targetSavings / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= targetSavings) {
        setAnimatedSavings(targetSavings);
        clearInterval(timer);
      } else {
        setAnimatedSavings(Math.round(current));
      }
    }, duration / steps);
  };

  const results = calculateCosts();
  const bestPlan = results.savingsPlus >= results.savingsBasic && results.savingsPlus >= results.savingsVIP 
    ? 'plus' 
    : results.savingsVIP > results.savingsBasic 
    ? 'vip' 
    : 'basic';

  return (
    <div id="calculator" className="bg-gradient-to-br from-[#E8F1F1] to-white rounded-2xl p-8 shadow-xl">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-[#4A8B8E] rounded-full mb-4">
          <Calculator className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-[#1A2B2C] mb-2">كم ستوفر مع أمان إيفر؟</h2>
        <p className="text-[#5A6B6C]">احسب توفيرك السنوي المتوقع بناءً على احتياجاتك الطبية</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Left Column - Inputs */}
        <div className="space-y-6">
          {/* Doctor Visits */}
          <div>
            <label className="block text-sm font-bold text-[#1A2B2C] mb-3">
              🏥 كم مرة تزور الطبيب سنوياً؟
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="1"
                max="24"
                value={doctorVisits}
                onChange={(e) => setDoctorVisits(Number(e.target.value))}
                className="flex-1 h-2 bg-[#E5EAEB] rounded-lg appearance-none cursor-pointer accent-[#4A8B8E]"
              />
              <span className="text-2xl font-bold text-[#4A8B8E] w-12 text-center">{doctorVisits}</span>
            </div>
          </div>

          {/* Dental Visits */}
          <div>
            <label className="block text-sm font-bold text-[#1A2B2C] mb-3">
              🦷 كم زيارة أسنان سنوياً؟
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="0"
                max="6"
                value={dentalVisits}
                onChange={(e) => setDentalVisits(Number(e.target.value))}
                className="flex-1 h-2 bg-[#E5EAEB] rounded-lg appearance-none cursor-pointer accent-[#4A8B8E]"
              />
              <span className="text-2xl font-bold text-[#4A8B8E] w-12 text-center">{dentalVisits}</span>
            </div>
          </div>

          {/* Medicine Budget */}
          <div>
            <label className="block text-sm font-bold text-[#1A2B2C] mb-3">
              💊 ميزانية الأدوية الشهرية؟
            </label>
            <div className="relative">
              <input
                type="number"
                min="0"
                step="100"
                value={monthlyMedicine}
                onChange={(e) => setMonthlyMedicine(Number(e.target.value))}
                className="w-full px-4 py-3 border-2 border-[#E5EAEB] rounded-xl text-lg font-bold text-[#1A2B2C] focus:border-[#4A8B8E] focus:outline-none"
                placeholder="500"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5A6B6C]">ريال</span>
            </div>
          </div>

          {/* Home Care */}
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={homeCare}
                onChange={(e) => setHomeCare(e.target.checked)}
                className="w-6 h-6 rounded border-2 border-[#E5EAEB] text-[#4A8B8E] focus:ring-[#4A8B8E] cursor-pointer"
              />
              <span className="text-sm font-bold text-[#1A2B2C]">
                🏠 هل تحتاج رعاية منزلية؟
              </span>
            </label>
          </div>

          {/* Calculate Button */}
          <button
            onClick={handleCalculate}
            className="w-full bg-[#4A8B8E] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#356B6E] transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            احسب التوفير
          </button>
        </div>

        {/* Right Column - Results */}
        <div className={`transition-all duration-500 ${showResults ? 'opacity-100' : 'opacity-0'}`}>
          {showResults && (
            <div className="bg-white rounded-xl p-6 shadow-lg h-full flex flex-col justify-center">
              <div className="space-y-6">
                {/* Without Aman */}
                <div>
                  <div className="text-sm text-[#5A6B6C] mb-1">بدون أمان إيفر:</div>
                  <div className="text-2xl font-bold text-[#1A2B2C]">
                    {results.totalWithoutAman.toLocaleString('ar-SA')} ريال/سنة
                  </div>
                </div>

                {/* With Aman Plus */}
                <div>
                  <div className="text-sm text-[#5A6B6C] mb-1">مع أمان بلس:</div>
                  <div className="text-2xl font-bold text-[#4A8B8E]">
                    {Math.round(results.withPlus).toLocaleString('ar-SA')} ريال/سنة
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t-2 border-[#E5EAEB]"></div>

                {/* Total Savings */}
                <div className="bg-gradient-to-br from-[#E8F1F1] to-[#4A8B8E]/10 rounded-xl p-6 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <TrendingDown className="w-6 h-6 text-[#4A8B8E]" />
                    <div className="text-sm font-bold text-[#5A6B6C]">توفيرك السنوي:</div>
                  </div>
                  <div className="text-5xl font-bold text-[#4A8B8E] mb-4">
                    {animatedSavings.toLocaleString('ar-SA')}
                    <span className="text-2xl mr-2">ريال</span>
                  </div>
                  <div className="text-sm text-[#5A6B6C] mb-4">
                    هذا يعادل توفير {Math.round((results.savingsPlus / results.totalWithoutAman) * 100)}% من تكاليفك الطبية
                  </div>
                  <a
                    href="#plans"
                    className="inline-block bg-[#4A8B8E] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#356B6E] transition-all duration-300"
                  >
                    اشترك في أمان {bestPlan === 'plus' ? 'بلس' : bestPlan === 'vip' ? 'VIP' : ''} الآن
                  </a>
                </div>

                {/* Comparison with other plans */}
                <div className="text-xs text-[#5A6B6C] space-y-1">
                  <div>• مع أمان الأساسي: وفّر {Math.round(results.savingsBasic).toLocaleString('ar-SA')} ريال</div>
                  <div>• مع أمان VIP: وفّر {Math.round(results.savingsVIP).toLocaleString('ar-SA')} ريال</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-[#5A6B6C] text-center">
        * الأرقام تقديرية مبنية على متوسطات السوق. التوفير الفعلي يختلف حسب الاستخدام والمنشأة الطبية.
      </p>
    </div>
  );
}
