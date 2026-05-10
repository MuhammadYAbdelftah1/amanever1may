'use client';

import { motion } from 'framer-motion';
import { AppDownloadButtons } from '@/components/shared/app-download-buttons';

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
            استثمر في صحتك
          </p>

          {/* H2 */}
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            ابدأ رحلة العناية بصحتك.. بذكاء وتوفير
          </h2>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-emerald-50 leading-relaxed max-w-3xl mx-auto">
            انضم إلى عائلة «أمان إيفر»، وكن واحداً من آلاف المستفيدين الذين يحولون نفقاتهم الطبية إلى أرباح فورية مع برنامج مكافآت ذكي. اجعل فواتيرك تعمل لصالحك واستمتع بخصومات تصل إلى 80% في أكثر من +2000 مستشفى وعيادة وصيدلية!
          </p>
        </motion.div>

        {/* App Download Buttons - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-8">
            حمّل التطبيق الآن.. وابدأ التوفير
          </h3>

          {/* App Download Buttons */}
          <div className="flex flex-col items-center gap-4">
            <AppDownloadButtons layout="horizontal" showHuawei={true} />
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
            <span>💳</span>
            <span>طرق الدفع: مدى · فيزا · ماستركارد · Apple Pay · تابي · تمارا</span>
          </p>
          <p className="text-sm text-emerald-100 flex items-center justify-center gap-2 flex-wrap">
            <span>🔒</span>
            <span>دفع آمن 100% · بدون تجديد تلقائي · تفعيل فوري للاشتراك</span>
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
