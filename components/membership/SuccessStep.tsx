import Image from 'next/image';
import { Bell } from 'lucide-react';
import { AppDownloadButtons } from '@/components/shared/app-download-buttons';

interface SuccessStepProps {
  selectedPackage: any;
  fullName: string;
  phoneNumber: string;
  countryCode: string;
  idType: 'national' | 'iqama' | 'passport';
  idNumber: string;
  selectedCard: any;
}

export const SuccessStep = ({ 
  selectedPackage, 
  fullName, 
  phoneNumber, 
  countryCode, 
  idType, 
  idNumber,
  selectedCard 
}: SuccessStepProps) => {
  const idTypeLabels = {
    national: 'هوية وطنية',
    iqama: 'إقامة',
    passport: 'جواز سفر'
  };

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-6 py-8 max-w-4xl mx-auto">
      {/* Success Icon */}
      <div className="relative w-24 h-24 md:w-32 md:h-32">
        <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-20"></div>
        <div className="relative w-full h-full bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-xl">
          <svg className="w-12 h-12 md:w-16 md:h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="absolute -inset-2 border-4 border-emerald-200 rounded-full opacity-50"></div>
        <div className="absolute -inset-4 border-2 border-emerald-100 rounded-full opacity-30"></div>
      </div>

      {/* Success Message */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full">
          <Bell className="w-4 h-4 text-emerald-600" />
          <span className="text-sm font-bold text-emerald-700">تم الاشتراك بنجاح!</span>
        </div>
        <h3 className="text-2xl md:text-3xl font-black text-slate-900">
          مبروك يا {fullName.split(' ')[0]}! 🎉
        </h3>
        <p className="text-sm md:text-base text-slate-600 max-w-md mx-auto">
          تم تفعيل اشتراكك في <span className="font-bold text-emerald-600">{selectedPackage?.name}</span>
        </p>
      </div>

      {/* Card UI Preview */}
      <div className="w-full max-w-md">
        <div className="relative aspect-[1.586/1] rounded-2xl overflow-hidden shadow-2xl">
          {/* Card Background based on tier */}
          <div className={`absolute inset-0 ${
            selectedCard?.id === 'vip' 
              ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900' 
              : selectedCard?.id === 'business'
              ? 'bg-gradient-to-br from-emerald-700 to-teal-700'
              : 'bg-gradient-to-br from-emerald-500 to-teal-600'
          }`}>
            {/* Decorative Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-32 translate-x-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-24 -translate-x-24"></div>
            </div>
          </div>

          {/* Card Content */}
          <div className="relative h-full p-6 md:p-8 flex flex-col justify-between text-white">
            {/* Top Section */}
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs md:text-sm opacity-90 mb-1">بطاقة أمان إيفر</p>
                <p className="text-lg md:text-2xl font-black">{selectedCard?.name || 'Premier'}</p>
              </div>
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            {/* Middle Section - Card Number (Masked) */}
            <div className="space-y-2">
              <p className="text-xs opacity-75">رقم البطاقة</p>
              <p className="text-lg md:text-xl font-mono tracking-wider">
                •••• •••• •••• {idNumber.slice(-4)}
              </p>
            </div>

            {/* Bottom Section */}
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs opacity-75 mb-1">حامل البطاقة</p>
                <p className="text-sm md:text-base font-bold">{fullName}</p>
              </div>
              <div className="text-right">
                <p className="text-xs opacity-75 mb-1">صالحة حتى</p>
                <p className="text-sm md:text-base font-bold">
                  {new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString('ar-SA', { month: '2-digit', year: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Summary */}
      <div className="w-full max-w-md bg-slate-50 rounded-2xl p-6 space-y-4">
        <h4 className="text-lg font-black text-slate-900 text-right">ملخص الاشتراك</h4>
        
        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-slate-600">الباقة</span>
            <span className="font-bold text-slate-900">{selectedPackage?.name}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-slate-600">المبلغ المدفوع</span>
            <span className="font-bold text-emerald-600 text-lg">
              {selectedPackage?.price === 'مجاناً' || selectedPackage?.price === 'حسب الاتفاق' 
                ? selectedPackage?.price 
                : `${selectedPackage?.price} ريال`}
            </span>
          </div>

          <div className="border-t border-slate-200 pt-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-600">رقم الجوال</span>
              <span className="font-bold text-slate-900" dir="ltr">{countryCode} {phoneNumber}</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-slate-600">نوع الهوية</span>
            <span className="font-bold text-slate-900">{idTypeLabels[idType]}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-slate-600">رقم الهوية</span>
            <span className="font-bold text-slate-900" dir="ltr">
              {idNumber.slice(0, 2)}••••••{idNumber.slice(-2)}
            </span>
          </div>
        </div>
      </div>

      {/* Download App Section */}
      <div className="w-full max-w-md space-y-4 pt-4">
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 space-y-3">
          <div className="flex items-center justify-center gap-2">
            <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <h4 className="text-lg font-black text-slate-900">حمّل التطبيق الآن</h4>
          </div>
          <p className="text-sm text-slate-600">
            ابدأ رحلتك الصحية من خلال تطبيق أمان إيفر
          </p>
        </div>

        <AppDownloadButtons layout="vertical" showHuawei={true} />
      </div>

      {/* Trust Badges */}
      <div className="flex items-center justify-center gap-4 text-xs text-slate-500 pt-4">
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <span>بياناتك محمية</span>
        </div>
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
          <span>تم إرسال التفاصيل عبر WhatsApp</span>
        </div>
      </div>
    </div>
  );
};
