'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Building2, User, Phone, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BusinessContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BusinessContactModal({ isOpen, onClose }: BusinessContactModalProps) {
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+966');
  const [employeeCount, setEmployeeCount] = useState('');

  const employeeRanges = [
    { value: '10-50', label: '10-50 موظف' },
    { value: '51-100', label: '51-100 موظف' },
    { value: '101-200', label: '101-200 موظف' },
    { value: '201-500', label: '201-500 موظف' },
    { value: '500+', label: 'أكثر من 500 موظف' },
  ];

  const handleSubmit = () => {
    // Validate
    if (!companyName || !contactName || phoneNumber.length < 9 || !employeeCount) {
      alert('الرجاء ملء جميع الحقول');
      return;
    }

    // Create WhatsApp message
    const message = `مرحباً، أنا ${contactName} من شركة ${companyName}

أريد الاستفسار عن باقة الأعمال لموظفينا

📊 عدد الموظفين: ${employeeRanges.find(r => r.value === employeeCount)?.label}
📱 رقم التواصل: ${countryCode}${phoneNumber}

متى يمكنكم التواصل معي؟`;

    // Open WhatsApp
    const whatsappUrl = `https://wa.me/966500000000?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    // Close modal
    onClose();
  };

  const isFormValid = companyName && contactName && phoneNumber.length >= 9 && employeeCount;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="pointer-events-auto w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="relative bg-gradient-to-br from-[#4A8B8E] to-[#356B6E] p-6 text-white">
                <button
                  onClick={onClose}
                  className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                  aria-label="إغلاق"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="text-center pt-2">
                  {/* Banner Image Placeholder */}
                  <div className="inline-flex items-center justify-center w-full h-32 rounded-xl bg-white/10 backdrop-blur-sm mb-3 overflow-hidden">
                    <div className="text-center p-4">
                      <div className="text-white/80 font-black text-sm mb-2">إشعار للمصممة 🎨</div>
                      <div className="text-white/60 font-bold text-xs">المقاس: 400×128 بكسل</div>
                      <div className="text-white/50 text-[10px] mt-1">(بانر باقة الأعمال)</div>
                    </div>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black mb-2">باقة الأعمال</h2>
                  <p className="text-sm text-white/90">استثمر في صحة فريقك.. لنجاح مستدام</p>
                </div>
              </div>

              {/* Form */}
              <div className="p-6 space-y-4">
                {/* Company Name */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                    <Building2 className="w-4 h-4 text-[#4A8B8E]" />
                    اسم الشركة
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="مثال: شركة التقنية المتقدمة"
                    className="w-full px-4 py-3 text-base border-2 border-slate-200 rounded-xl focus:border-[#4A8B8E] focus:ring-4 focus:ring-[#4A8B8E]/20 outline-none transition-all"
                  />
                </div>

                {/* Contact Name */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                    <User className="w-4 h-4 text-[#4A8B8E]" />
                    اسم ممثل الشركة/المؤسسة
                  </label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="مثال: أحمد محمد"
                    className="w-full px-4 py-3 text-base border-2 border-slate-200 rounded-xl focus:border-[#4A8B8E] focus:ring-4 focus:ring-[#4A8B8E]/20 outline-none transition-all"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                    <Phone className="w-4 h-4 text-[#4A8B8E]" />
                    رقم الجوال
                  </label>
                  <div className="flex gap-2" dir="ltr">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="w-24 px-3 py-3 text-base border-2 border-slate-200 rounded-xl focus:border-[#4A8B8E] focus:ring-4 focus:ring-[#4A8B8E]/20 outline-none transition-all bg-white font-semibold"
                    >
                      <option value="+966">🇸🇦 +966</option>
                      <option value="+971">🇦🇪 +971</option>
                      <option value="+965">🇰🇼 +965</option>
                      <option value="+973">🇧🇭 +973</option>
                      <option value="+974">🇶🇦 +974</option>
                      <option value="+968">🇴🇲 +968</option>
                    </select>

                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                      placeholder="5xxxxxxxx"
                      maxLength={9}
                      className="flex-1 px-4 py-3 text-base border-2 border-slate-200 rounded-xl focus:border-[#4A8B8E] focus:ring-4 focus:ring-[#4A8B8E]/20 outline-none transition-all font-semibold"
                      dir="ltr"
                    />
                  </div>
                </div>

                {/* Employee Count */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                    <Users className="w-4 h-4 text-[#4A8B8E]" />
                    عدد الموظفين
                  </label>
                  <select
                    value={employeeCount}
                    onChange={(e) => setEmployeeCount(e.target.value)}
                    className="w-full px-4 py-3 text-base border-2 border-slate-200 rounded-xl focus:border-[#4A8B8E] focus:ring-4 focus:ring-[#4A8B8E]/20 outline-none transition-all bg-white font-semibold"
                  >
                    <option value="">اختر عدد الموظفين</option>
                    {employeeRanges.map((range) => (
                      <option key={range.value} value={range.value}>
                        {range.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Submit Button */}
                <Button
                  onClick={handleSubmit}
                  disabled={!isFormValid}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold text-base py-6 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  تواصل عبر WhatsApp ←
                </Button>

                {/* Description Text */}
                <p className="text-center text-xs text-slate-600 pt-2">
                  لإرسال العرض الخاص لشركتك أو لمؤسستك
                </p>

                {/* Trust Badge */}
                <div className="flex items-center justify-center gap-2 text-xs text-slate-500 pt-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <span className="font-semibold">بياناتك آمنة - سنتواصل معك خلال ساعة</span>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
