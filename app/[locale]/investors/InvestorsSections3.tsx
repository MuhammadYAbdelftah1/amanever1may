'use client';

import { motion } from 'framer-motion';
import { RoadmapTimeline, InvestorContactForm, DataRoomGate } from '@/components/investors';
import { INVESTOR_METRICS } from '@/data/investor-data';
import { Download, Calendar, Mail, Phone, MapPin, ExternalLink, Rocket, AlertTriangle, FileText, BarChart3, Award } from 'lucide-react';
import { useState } from 'react';
import { ScheduleCallModal } from '@/components/investors/ScheduleCallModal';

export function RoadmapSection({ t, isRTL }: any) {
  return (
    <section className="py-20 bg-gradient-to-br from-[#0F1B1C] to-[#1a2f30] text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.roadmap.title}</h2>
          <p className="text-xl text-neutral-300">{t.roadmap.subtitle}</p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <RoadmapTimeline items={INVESTOR_METRICS.roadmap} isRTL={isRTL} />
        </div>
      </div>
    </section>
  );
}

export function FundingRoundSection({ t, isRTL }: any) {
  const { fundingRound } = INVESTOR_METRICS;

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.funding.title}</h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400">{t.funding.subtitle}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-gradient-to-br from-[#C5A572]/10 to-[#C5A572]/5 rounded-3xl p-8 md:p-12 border-2 border-[#C5A572]/30 relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
              backgroundSize: '30px 30px'
            }} />
          </div>

          <div className="relative z-10">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-[#C5A572] text-white px-6 py-3 rounded-full font-bold text-lg mb-4">
                <Rocket className="w-5 h-5" />
                {t.funding.raising}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white dark:bg-neutral-900 rounded-xl p-6">
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">{t.funding.amount}</p>
                <p className="text-3xl font-bold text-[#C5A572]">{fundingRound.amount}</p>
                <p className="text-sm text-neutral-500">({fundingRound.amountSar})</p>
              </div>

              <div className="bg-white dark:bg-neutral-900 rounded-xl p-6">
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">{t.funding.valuation}</p>
                <p className="text-3xl font-bold text-[#4A8B8E]">{fundingRound.valuation}</p>
                <p className="text-sm text-neutral-500">Pre-money</p>
              </div>

              <div className="bg-white dark:bg-neutral-900 rounded-xl p-6">
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">{t.funding.lead}</p>
                <p className="text-xl font-bold">{fundingRound.leadInvestor}</p>
              </div>

              <div className="bg-white dark:bg-neutral-900 rounded-xl p-6">
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">{t.funding.closing}</p>
                <p className="text-xl font-bold">{fundingRound.closing}</p>
              </div>

              <div className="bg-white dark:bg-neutral-900 rounded-xl p-6">
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">{t.funding.minTicket}</p>
                <p className="text-xl font-bold">{fundingRound.minTicket}</p>
              </div>
            </div>

            {/* Use of Funds */}
            <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-bold mb-6">{t.funding.useOfFunds}</h3>
              <div className="space-y-4">
                {fundingRound.useOfFunds.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">
                        {item.category}
                        {item.description && <span className="text-sm text-neutral-500"> ({item.description})</span>}
                      </span>
                      <span className="font-bold text-lg">{item.percentage}%</span>
                    </div>
                    <div className="h-2 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className="h-full bg-[#C5A572] rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 bg-[#C5A572] hover:bg-[#b39563] text-white font-bold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2">
                <Download className="w-5 h-5" />
                {t.funding.requestDeck}
              </button>
              <button className="flex-1 bg-[#4A8B8E] hover:bg-[#3d7373] text-white font-bold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2">
                <Calendar className="w-5 h-5" />
                {t.funding.bookMeeting}
              </button>
            </div>

            {/* Warning */}
            <div className="mt-6 text-center text-xs text-neutral-600 dark:text-neutral-400 flex items-center justify-center gap-2">
              <AlertTriangle className="w-3 h-3" />
              <p>{t.disclaimer.text}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function PressSection({ t, isRTL }: any) {
  return (
    <section className="py-20 bg-neutral-50 dark:bg-neutral-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.press.title}</h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400">{t.press.subtitle}</p>
        </motion.div>

        {/* Media Inquiries Fallback */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center bg-white dark:bg-neutral-800 rounded-2xl p-8 border border-neutral-200 dark:border-neutral-700"
        >
          <div className="mb-4 flex justify-center">
            <FileText className="w-16 h-16 text-[#4A8B8E]" />
          </div>
          <h3 className="text-2xl font-bold mb-4">{t.press.mediaInquiries}</h3>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            {t.press.contact}
          </p>
          <a
            href={`mailto:${INVESTOR_METRICS.company.email}`}
            className="inline-flex items-center gap-2 text-[#4A8B8E] hover:underline font-medium"
          >
            <Mail className="w-5 h-5" />
            {INVESTOR_METRICS.company.email}
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export function ResourcesSection({ t, isRTL }: any) {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.resources.title}</h2>
        </motion.div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Data Room */}
          <DataRoomGate
            resources={INVESTOR_METRICS.resources.dataRoom}
            isRTL={isRTL}
            translations={t.resources.dataRoom}
          />

          {/* Press Releases */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-neutral-900 rounded-2xl p-8 border border-neutral-200 dark:border-neutral-800"
          >
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <FileText className="w-6 h-6 text-[#4A8B8E]" />
              {t.resources.pressReleases.title}
            </h3>
            <div className="space-y-3 mb-6">
              {INVESTOR_METRICS.resources.pressReleases.map((release, index) => (
                <motion.a
                  key={index}
                  href="#"
                  initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 text-neutral-700 dark:text-neutral-300 hover:text-[#4A8B8E] dark:hover:text-[#4A8B8E] transition-colors group"
                >
                  <ExternalLink className="w-4 h-4 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>{isRTL ? release.titleAr : release.title}</span>
                </motion.a>
              ))}
            </div>
            <button className="text-[#4A8B8E] hover:underline font-medium">
              {t.resources.pressReleases.viewAll} →
            </button>
          </motion.div>

          {/* Quarterly Reports */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-neutral-900 rounded-2xl p-8 border border-neutral-200 dark:border-neutral-800"
          >
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <BarChart3 className="w-6 h-6 text-[#C5A572]" />
              {t.resources.reports.title}
            </h3>
            <div className="space-y-3 mb-6">
              {INVESTOR_METRICS.resources.quarterlyReports.map((report, index) => (
                <motion.a
                  key={index}
                  href="#"
                  initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 text-neutral-700 dark:text-neutral-300 hover:text-[#4A8B8E] dark:hover:text-[#4A8B8E] transition-colors group"
                >
                  <ExternalLink className="w-4 h-4 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>{isRTL ? report.titleAr : report.title}</span>
                </motion.a>
              ))}
            </div>
            <button className="text-[#4A8B8E] hover:underline font-medium">
              {t.resources.reports.subscribe} →
            </button>
          </motion.div>

          {/* Events */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-neutral-900 rounded-2xl p-8 border border-neutral-200 dark:border-neutral-800"
          >
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Award className="w-6 h-6 text-[#10B981]" />
              {t.resources.events.title}
            </h3>
            <div className="space-y-3">
              {INVESTOR_METRICS.resources.events.map((event, index) => (
                <motion.a
                  key={index}
                  href="#"
                  initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 text-neutral-700 dark:text-neutral-300 hover:text-[#4A8B8E] dark:hover:text-[#4A8B8E] transition-colors group"
                >
                  <ExternalLink className="w-4 h-4 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>{isRTL ? event.titleAr : event.title}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function ContactSection({ t, isRTL }: any) {
  const { company } = INVESTOR_METRICS;
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  return (
    <>
      <section className="py-20 bg-gradient-to-br from-[#0F1B1C] to-[#1a2f30] text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t.contact.title}
              <br />
              <span className="text-[#C5A572]">{t.contact.subtitle}</span>
            </h2>
          </motion.div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold mb-6">{t.contact.irLead}</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#4A8B8E] rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-neutral-400">{t.contact.email}</p>
                      <a href={`mailto:${company.investorEmail}`} className="text-lg hover:text-[#C5A572] transition-colors">
                        {company.investorEmail}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#4A8B8E] rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-neutral-400">{t.contact.phone}</p>
                      <a href={`tel:${company.investorPhone}`} className="text-lg hover:text-[#C5A572] transition-colors">
                        {company.investorPhone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#4A8B8E] rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-lg">{company.headquarters}</p>
                      <p className="text-sm text-neutral-400">{company.phone}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-white/20">
                <button 
                  onClick={() => setIsScheduleModalOpen(true)}
                  className="w-full bg-[#C5A572] hover:bg-[#b39563] text-white font-bold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Calendar className="w-5 h-5" />
                  {t.contact.scheduleCall}
                </button>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <InvestorContactForm isRTL={isRTL} translations={t.contact.form} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Schedule Call Modal */}
      <ScheduleCallModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        isRTL={isRTL}
        title={t.contact.scheduleCall}
      />
    </>
  );
}
