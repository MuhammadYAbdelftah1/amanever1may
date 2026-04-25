'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Users, Clock, ArrowLeft, Smartphone, Target, CreditCard, Lock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { SUBSCRIBE_URL } from '@/lib/constants/links';

export function FinalCTASection() {
  return (
    <section className="relative bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 py-24 md:py-32 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          {/* Eyebrow */}
          <p className="text-sm font-semibold text-emerald-200 uppercase tracking-wide mb-4">
            وقت البداية
          </p>

          {/* H2 */}
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            ابدأ رحلتك الصحية بتكلفة أقل اليوم
          </h2>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-emerald-50 leading-relaxed max-w-3xl mx-auto">
            انضم لآلاف المستخدمين اللي بيوفّروا لحد 80% على خدماتهم الطبية في 500+ مستشفى وعيادة وصيدلية. الاشتراك يبدأ من 199 ريال فقط، والتوفير بيبدأ من أول زيارة.
          </p>
        </motion.div>

        {/* Trust Reinforcement Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-sm text-emerald-50 mb-12"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-200" />
            <span>ضمان استرداد 14 يوم</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-200" />
            <span>500+ شريك طبي موثوق</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-200" />
            <span>رد خلال 15 دقيقة 24/7</span>
          </div>
        </motion.div>

        {/* CTA Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20"
        >
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Path 1 - Download App (Primary) */}
            <div className="text-center md:text-start">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center justify-center md:justify-start gap-2">
                <Smartphone className="w-6 h-6" />
                <span>حمّل التطبيق الآن</span>
              </h3>

              {/* Unified App Stores Image */}
              <div className="mb-6">
                <a
                  href="https://amanever.com/#download"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transition-transform hover:scale-105 focus:ring-2 focus:ring-emerald-400 focus:outline-none rounded-lg overflow-hidden"
                >
                  <Image
                    src="/images/all-stores.jpg"
                    alt="حمّل أمان إيفر من App Store و Google Play و AppGallery"
                    width={400}
                    height={150}
                    className="w-full h-auto rounded-lg"
                  />
                </a>
              </div>

              {/* QR Code */}
              <div className="flex flex-col items-center md:items-start">
                <p className="text-sm text-emerald-100 mb-3">
                  أو امسح الكود بكاميرا الموبايل:
                </p>
                <div className="bg-white rounded-xl p-3 w-36 h-36 flex items-center justify-center">
                  {/* TODO: Replace with actual QR code component */}
                  <div className="w-full h-full bg-slate-200 rounded flex items-center justify-center text-xs text-slate-500 text-center">
                    QR Code
                    <br />
                    (Generate at build)
                  </div>
                </div>
              </div>
            </div>

            {/* Path 2 - Subscribe Directly (Secondary) */}
            <div className="flex flex-col items-center justify-center text-center border-t md:border-t-0 md:border-s border-white/20 pt-8 md:pt-0 md:ps-12">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Target className="w-6 h-6" />
                <span>عاوز تشترك مباشرة من الموقع؟</span>
              </h3>

              <Link
                href={SUBSCRIBE_URL}
                className="inline-flex items-center justify-center gap-2 bg-white text-emerald-700 hover:bg-emerald-50 px-8 py-4 rounded-xl text-lg font-bold shadow-lg hover:shadow-xl transition-all group"
              >
                <span>اشترك الآن من 199 ريال</span>
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              </Link>

              <p className="text-sm text-emerald-100 mt-4">
                بدون تجديد تلقائي · إلغاء في أي وقت
              </p>
            </div>
          </div>
        </motion.div>

        {/* Final Reassurance */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-8 space-y-3"
        >
          <p className="text-sm text-emerald-100 flex items-center justify-center gap-2 flex-wrap">
            <CreditCard className="w-4 h-4" />
            <span>طرق الدفع: مدى · فيزا · ماستركارد · Apple Pay · تابي · تمارا</span>
          </p>
          <p className="text-sm text-emerald-100 flex items-center justify-center gap-2 flex-wrap">
            <Lock className="w-4 h-4" />
            <span>دفع آمن 100% · بدون تجديد تلقائي · ضمان استرداد خلال 14 يوم</span>
          </p>
        </motion.div>

        {/* Optional: Social Proof Counter */}
        {/* TODO: Only enable if real user count is available */}
        {/* 
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
        >
          <p className="text-3xl font-bold text-white mb-2">+X,XXX مستخدم نشط يوفّر معنا</p>
          <p className="text-emerald-100">شهرياً في جميع أنحاء المملكة</p>
        </motion.div>
        */}
      </div>
    </section>
  );
}
