// This file will be imported into InvestorsPageContent.tsx
// Contains remaining sections to keep the main file manageable

import { motion } from 'framer-motion';
import { MetricCard, RoadmapTimeline, InvestorContactForm, DataRoomGate } from '@/components/investors';
import { INVESTOR_METRICS, MARKET_COMPARISON, CHART_DATA } from '@/data/investor-data';
import { TrendingUp, Users, DollarSign, Building2, Target, Rocket, Award, FileText, Phone, Mail, MapPin, Linkedin, ExternalLink, CheckCircle2, Globe, Building, BarChart3, Cpu, HeartPulse, Flag, Star } from 'lucide-react';

// Icon mapping for vision2030
const iconMap: Record<string, React.ReactNode> = {
  'flag': <Flag className="w-8 h-8" />,
  'building-2': <Building2 className="w-8 h-8" />,
  'trending-up': <TrendingUp className="w-8 h-8" />,
  'cpu': <Cpu className="w-8 h-8" />,
  'heart-pulse': <HeartPulse className="w-8 h-8" />,
};

export function OpportunitySection({ t, isRTL }: any) {
  return (
    <section className="py-20 bg-neutral-50 dark:bg-neutral-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.opportunity.title}</h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400">{t.opportunity.subtitle}</p>
        </motion.div>

        {/* TAM/SAM/SOM */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {/* TAM */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-neutral-800 rounded-2xl p-8 border-2 border-[#4A8B8E]/20"
          >
            <div className="mb-4">
              <Globe className="w-12 h-12 text-[#4A8B8E]" />
            </div>
            <h3 className="text-2xl font-bold mb-2">{t.opportunity.tam.title}</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">{t.opportunity.tam.subtitle}</p>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">{t.opportunity.tam.market}</p>
                <p className="text-3xl font-bold text-[#4A8B8E]">{INVESTOR_METRICS.tam.marketSize}</p>
                <p className="text-xs text-neutral-500">({INVESTOR_METRICS.tam.year})</p>
              </div>
              <div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">{t.opportunity.tam.digital}</p>
                <p className="text-xl font-bold">
                  {INVESTOR_METRICS.tam.digitalMarketCurrent} <span className="text-sm text-neutral-500">(2026)</span>
                  {' → '}
                  {INVESTOR_METRICS.tam.digitalMarketFuture} <span className="text-sm text-neutral-500">(2032)</span>
                </p>
              </div>
              <div className="pt-3 border-t border-neutral-200 dark:border-neutral-700">
                <p className="text-sm font-bold text-[#10B981]">{t.opportunity.tam.growth} {INVESTOR_METRICS.tam.cagr} CAGR</p>
              </div>
            </div>
          </motion.div>

          {/* SAM */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-neutral-800 rounded-2xl p-8 border-2 border-[#C5A572]/20"
          >
            <div className="mb-4">
              <Target className="w-12 h-12 text-[#C5A572]" />
            </div>
            <h3 className="text-2xl font-bold mb-2">{t.opportunity.sam.title}</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">{t.opportunity.sam.subtitle}</p>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">{t.opportunity.sam.population}</p>
                <p className="text-3xl font-bold text-[#C5A572]">{INVESTOR_METRICS.sam.targetPopulation}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">{t.opportunity.sam.spending}</p>
                <p className="text-xl font-bold">{INVESTOR_METRICS.sam.annualSpendPerPerson}</p>
              </div>
              <div className="pt-3 border-t border-neutral-200 dark:border-neutral-700">
                <p className="text-sm text-neutral-600 dark:text-neutral-400">{t.opportunity.sam.market}</p>
                <p className="text-2xl font-bold text-[#C5A572]">{INVESTOR_METRICS.sam.marketSize}</p>
              </div>
            </div>
          </motion.div>

          {/* SOM */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-[#10B981]/10 to-[#10B981]/5 dark:from-[#10B981]/20 dark:to-[#10B981]/10 rounded-2xl p-8 border-2 border-[#10B981]/30"
          >
            <div className="mb-4">
              <Rocket className="w-12 h-12 text-[#10B981]" />
            </div>
            <h3 className="text-2xl font-bold mb-2">{t.opportunity.som.title}</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">{t.opportunity.som.subtitle}</p>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">{t.opportunity.som.target}</p>
                <p className="text-3xl font-bold text-[#10B981]">{INVESTOR_METRICS.som.targetMembers}</p>
                <p className="text-xs text-neutral-500">{t.opportunity.som.members}</p>
              </div>
              <div className="pt-3 border-t border-neutral-200 dark:border-neutral-700">
                <p className="text-sm text-neutral-600 dark:text-neutral-400">{t.opportunity.som.arr}</p>
                <p className="text-4xl font-bold text-[#10B981]">{INVESTOR_METRICS.som.projectedArr}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Vision 2030 Tailwinds */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-center mb-12">{t.opportunity.vision2030.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {INVESTOR_METRICS.vision2030.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-neutral-800 rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="mb-3 flex justify-center text-[#4A8B8E]">
                  {iconMap[item.icon]}
                </div>
                <h4 className="font-bold mb-2">{isRTL ? item.title : item.titleEn}</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {isRTL ? item.description : item.descriptionEn}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Market Gap Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-center mb-4">{t.opportunity.marketGap.title}</h3>
          <p className="text-center text-neutral-600 dark:text-neutral-400 mb-12">{t.opportunity.marketGap.subtitle}</p>
          
          <div className="overflow-x-auto">
            <table className="w-full bg-white dark:bg-neutral-800 rounded-xl overflow-hidden">
              <thead className="bg-neutral-100 dark:bg-neutral-900">
                <tr>
                  <th className="px-6 py-4 text-left font-bold">{t.opportunity.marketGap.model}</th>
                  <th className="px-6 py-4 text-left font-bold">{t.opportunity.marketGap.players}</th>
                  <th className="px-6 py-4 text-left font-bold">{t.opportunity.marketGap.problem}</th>
                </tr>
              </thead>
              <tbody>
                {MARKET_COMPARISON.map((row, index) => (
                  <tr
                    key={index}
                    className={`border-t border-neutral-200 dark:border-neutral-700 ${
                      row.highlight ? 'bg-[#4A8B8E]/10 font-bold' : ''
                    }`}
                  >
                    <td className="px-6 py-4">{isRTL ? row.model : row.modelEn}</td>
                    <td className="px-6 py-4">{isRTL && row.playersEn ? row.playersEn : row.players}</td>
                    <td className="px-6 py-4">{isRTL ? row.problem : row.problemEn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function SolutionSection({ t, isRTL }: any) {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.solution.title}</h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400">{t.solution.subtitle}</p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* App */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#4A8B8E]/10 to-[#4A8B8E]/5 rounded-2xl p-8 border border-[#4A8B8E]/20"
          >
            <div className="mb-4">
              <Users className="w-12 h-12 text-[#4A8B8E]" />
            </div>
            <h3 className="text-2xl font-bold mb-4">{t.solution.app.title}</h3>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-[#4A8B8E]">{INVESTOR_METRICS.activeMembers}</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">{t.solution.app.users}</p>
              <div className="flex items-center gap-2">
                <p className="text-xl font-bold">4.8</p>
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">{t.solution.app.rating}</p>
            </div>
          </motion.div>

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-[#C5A572]/10 to-[#C5A572]/5 rounded-2xl p-8 border border-[#C5A572]/20"
          >
            <div className="mb-4">
              <Award className="w-12 h-12 text-[#C5A572]" />
            </div>
            <h3 className="text-2xl font-bold mb-4">{t.solution.card.title}</h3>
            <p className="text-lg text-neutral-700 dark:text-neutral-300">{t.solution.card.instant}</p>
          </motion.div>

          {/* Network */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-[#10B981]/10 to-[#10B981]/5 rounded-2xl p-8 border border-[#10B981]/20"
          >
            <div className="mb-4">
              <Building2 className="w-12 h-12 text-[#10B981]" />
            </div>
            <h3 className="text-2xl font-bold mb-4">{t.solution.network.title}</h3>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-[#10B981]">{INVESTOR_METRICS.partners}</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">{t.solution.network.facilities}</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">{t.solution.network.cities}</p>
            </div>
          </motion.div>

          {/* Cashback */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-[#C5A572]/10 to-[#C5A572]/5 rounded-2xl p-8 border border-[#C5A572]/20"
          >
            <div className="mb-4">
              <DollarSign className="w-12 h-12 text-[#C5A572]" />
            </div>
            <h3 className="text-2xl font-bold mb-4">{t.solution.cashback.title}</h3>
            <div className="space-y-2">
              <p className="text-sm text-neutral-600 dark:text-neutral-400">{t.solution.cashback.model}</p>
              <p className="text-2xl font-bold text-[#C5A572]">{t.solution.cashback.return}</p>
            </div>
          </motion.div>

          {/* AI Concierge - Full Width */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="md:col-span-2 bg-gradient-to-br from-[#4A8B8E]/10 to-[#4A8B8E]/5 rounded-2xl p-8 border border-[#4A8B8E]/20"
          >
            <div className="mb-4">
              <Cpu className="w-12 h-12 text-[#4A8B8E]" />
            </div>
            <h3 className="text-2xl font-bold mb-4">{t.solution.ai.title}</h3>
            <p className="text-lg text-neutral-700 dark:text-neutral-300">{t.solution.ai.description}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function TractionSection({ t, isRTL }: any) {
  return (
    <section className="py-20 bg-neutral-50 dark:bg-neutral-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.traction.title}</h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400">
            {t.traction.subtitle} {t.traction.period}
          </p>
        </motion.div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <MetricCard
            icon={<Users className="w-8 h-8" />}
            label={t.traction.metrics.members}
            value={INVESTOR_METRICS.activeMembers}
            change={`↑ ${INVESTOR_METRICS.yoyGrowth}`}
            delay={0}
          />
          <MetricCard
            icon={<DollarSign className="w-8 h-8" />}
            label={t.traction.metrics.arr}
            value={INVESTOR_METRICS.arr}
            change={`↑ ${INVESTOR_METRICS.arrGrowth}`}
            delay={0.1}
          />
          <MetricCard
            icon={<BarChart3 className="w-8 h-8" />}
            label={t.traction.metrics.transactions}
            value={INVESTOR_METRICS.monthlyTransactions}
            change="↑ 95%"
            delay={0.2}
          />
          <MetricCard
            icon={<TrendingUp className="w-8 h-8" />}
            label={t.traction.metrics.retention}
            value={INVESTOR_METRICS.retentionRate}
            benchmark={`${t.traction.metrics.industry}: ${INVESTOR_METRICS.industryRetention}`}
            delay={0.3}
          />
          <MetricCard
            icon={<Award className="w-8 h-8" />}
            label={t.traction.metrics.nps}
            value={INVESTOR_METRICS.npsScore}
            benchmark={`${t.traction.metrics.bestInClass}: ${INVESTOR_METRICS.npsTarget}`}
            delay={0.4}
          />
          <MetricCard
            icon={<DollarSign className="w-8 h-8" />}
            label={t.traction.metrics.ltvCac}
            value={INVESTOR_METRICS.ltvCacRatio}
            benchmark={`${t.traction.metrics.healthy}: ${INVESTOR_METRICS.healthyLtvCac}`}
            delay={0.5}
          />
          <MetricCard
            icon={<TrendingUp className="w-8 h-8" />}
            label={t.traction.metrics.payback}
            value={INVESTOR_METRICS.paybackPeriod}
            benchmark={`${t.traction.metrics.healthy}: ${INVESTOR_METRICS.healthyPayback}`}
            delay={0.6}
          />
        </div>
      </div>
    </section>
  );
}

// Note: Additional sections are in InvestorsSections2.tsx and InvestorsSections3.tsx
