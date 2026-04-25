import { motion } from 'framer-motion';
import { INVESTOR_METRICS } from '@/data/investor-data';
import { Linkedin, CheckCircle2 } from 'lucide-react';

export function BusinessModelSection({ t, isRTL }: any) {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.businessModel.title}</h2>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-16">
          {/* Revenue Streams */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-neutral-900 rounded-2xl p-8 border border-neutral-200 dark:border-neutral-800"
          >
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <span>💵</span>
              {t.businessModel.revenue.title}
            </h3>
            <div className="space-y-4">
              {[
                { label: t.businessModel.revenue.subscriptions, value: INVESTOR_METRICS.revenueStreams.subscriptions, color: '#4A8B8E' },
                { label: t.businessModel.revenue.commissions, value: INVESTOR_METRICS.revenueStreams.commissions, color: '#C5A572' },
                { label: t.businessModel.revenue.corporate, value: INVESTOR_METRICS.revenueStreams.corporate, color: '#10B981' },
                { label: t.businessModel.revenue.premium, value: INVESTOR_METRICS.revenueStreams.premiumAddons, color: '#8B5CF6' }
              ].map((stream, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{stream.label}</span>
                    <span className="font-bold text-lg">{stream.value}%</span>
                  </div>
                  <div className="h-3 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${stream.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: stream.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Unit Economics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#C5A572]/10 to-[#C5A572]/5 rounded-2xl p-8 border border-[#C5A572]/20"
          >
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <span>📊</span>
              {t.businessModel.unitEconomics.title}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {[
                { label: t.businessModel.unitEconomics.arpu, value: INVESTOR_METRICS.unitEconomics.arpu },
                { label: t.businessModel.unitEconomics.cac, value: INVESTOR_METRICS.unitEconomics.cac },
                { label: t.businessModel.unitEconomics.margin, value: INVESTOR_METRICS.unitEconomics.grossMargin },
                { label: t.businessModel.unitEconomics.ltv, value: INVESTOR_METRICS.unitEconomics.ltv },
                { label: t.businessModel.unitEconomics.ratio, value: INVESTOR_METRICS.unitEconomics.ltvCac, highlight: true }
              ].map((metric, index) => (
                <div key={index} className={`text-center ${metric.highlight ? 'md:col-span-1' : ''}`}>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">{metric.label}</p>
                  <p className={`text-2xl font-bold font-mono ${metric.highlight ? 'text-[#10B981]' : 'text-[#C5A572]'}`}>
                    {metric.value}
                  </p>
                  {metric.highlight && (
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">✓ {t.traction.metrics.healthy}</p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Path to Profitability */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-neutral-900 rounded-2xl p-8 border border-neutral-200 dark:border-neutral-800"
          >
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <span>🏆</span>
              {t.businessModel.profitability.title}
            </h3>
            <div className="space-y-4">
              {INVESTOR_METRICS.profitabilityPath.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg"
                >
                  <div className="flex-shrink-0 w-24 font-bold text-[#4A8B8E]">{item.quarter}</div>
                  <div className="flex-grow">{item.milestone}</div>
                  <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function TeamSection({ t, isRTL }: any) {
  return (
    <section className="py-20 bg-neutral-50 dark:bg-neutral-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.team.title}</h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            {t.team.description}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {INVESTOR_METRICS.team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-neutral-800 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-700 hover:shadow-lg transition-shadow"
            >
              {/* Placeholder for team member photo */}
              <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-[#4A8B8E] to-[#C5A572] rounded-full flex items-center justify-center text-white text-4xl font-bold">
                {member.name.charAt(0)}
              </div>
              
              <div className="text-center">
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-sm text-[#4A8B8E] font-medium mb-3">{member.title}</p>
                
                <div className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                  {member.previousCompanies.map((company, i) => (
                    <span key={i}>
                      Ex-{company}
                      {i < member.previousCompanies.length - 1 && ', '}
                    </span>
                  ))}
                </div>

                <p className="text-sm italic text-neutral-700 dark:text-neutral-300 mb-4 border-t border-neutral-200 dark:border-neutral-700 pt-4">
                  "{member.quote}"
                </p>

                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-[#0077B5] hover:underline"
                >
                  <Linkedin className="w-4 h-4" />
                  {t.team.viewLinkedIn}
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note about placeholders */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center text-sm text-neutral-500 dark:text-neutral-500"
        >
          <p>⚠️ Team information contains placeholders. Update with actual team data before publication.</p>
        </motion.div>
      </div>
    </section>
  );
}

export function InvestmentThesisSection({ t, isRTL }: any) {
  return (
    <section className="py-20 bg-gradient-to-br from-[#0F1B1C] to-[#1a2f30] text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.thesis.title}</h2>
          <p className="text-xl text-neutral-300">{t.thesis.subtitle}</p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-6">
          {INVESTOR_METRICS.investmentThesis.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-colors"
            >
              <div className="flex items-start gap-4">
                <span className="text-4xl flex-shrink-0">{point.number}</span>
                <p className="text-lg leading-relaxed pt-2">
                  {isRTL ? point.titleAr : point.titleEn}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
