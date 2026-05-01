'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { AppDownloadButtons } from './app-download-buttons';
import { Smartphone, CheckCircle, Zap, Shield, Heart } from 'lucide-react';
import Image from 'next/image';

interface AppDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  locale: string;
}

export function AppDownloadModal({ isOpen, onClose, locale }: AppDownloadModalProps) {
  const isArabic = locale === 'ar';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-white via-[#F8FAFB] to-[#E8F1F1]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl md:text-3xl font-bold text-[#1A2B2C] mb-2">
            {isArabic ? 'حمّل تطبيق أمان إيفر' : 'Download Aman Ever App'}
          </DialogTitle>
          <DialogDescription className="text-center text-base text-[#5A6B6C]">
            {isArabic 
              ? 'احصل على أفضل تجربة للرعاية الصحية الرقمية من خلال تطبيقنا' 
              : 'Get the best digital healthcare experience through our app'}
          </DialogDescription>
        </DialogHeader>

        {/* Hero Section with Phone Mockup */}
        <div className="relative py-6 flex justify-center">
          <div className="relative">
            {/* Decorative circles */}
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-[#4A8B8E]/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-emerald-400/10 rounded-full blur-2xl" />
            
            {/* Phone Icon with gradient */}
            <div className="relative bg-gradient-to-br from-[#4A8B8E] to-[#356B6E] p-8 rounded-3xl shadow-2xl">
              <Smartphone className="w-20 h-20 text-white" strokeWidth={1.5} />
              {/* Pulse animation */}
              <span className="absolute -top-2 -right-2 flex h-6 w-6">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-6 w-6 bg-emerald-500"></span>
              </span>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="space-y-3 mb-6">
          <h3 className="text-lg font-bold text-[#1A2B2C] text-center mb-4">
            {isArabic ? 'لماذا تحميل التطبيق؟' : 'Why Download the App?'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Benefit 1 */}
            <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h4 className="font-bold text-[#1A2B2C] text-sm mb-1">
                  {isArabic ? 'وصول سريع وسهل' : 'Quick & Easy Access'}
                </h4>
                <p className="text-xs text-[#5A6B6C]">
                  {isArabic 
                    ? 'ادخل لحسابك بلمسة واحدة واحصل على خدماتك فوراً' 
                    : 'Access your account with one tap and get services instantly'}
                </p>
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-bold text-[#1A2B2C] text-sm mb-1">
                  {isArabic ? 'أمان وخصوصية' : 'Security & Privacy'}
                </h4>
                <p className="text-xs text-[#5A6B6C]">
                  {isArabic 
                    ? 'بياناتك محمية بأعلى معايير الأمان والتشفير' 
                    : 'Your data is protected with highest security standards'}
                </p>
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h4 className="font-bold text-[#1A2B2C] text-sm mb-1">
                  {isArabic ? 'خصومات حصرية' : 'Exclusive Discounts'}
                </h4>
                <p className="text-xs text-[#5A6B6C]">
                  {isArabic 
                    ? 'احصل على خصومات تصل إلى 80% على الخدمات الطبية' 
                    : 'Get up to 80% discounts on medical services'}
                </p>
              </div>
            </div>

            {/* Benefit 4 */}
            <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex-shrink-0 w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-pink-600" />
              </div>
              <div>
                <h4 className="font-bold text-[#1A2B2C] text-sm mb-1">
                  {isArabic ? 'استشارات فورية' : 'Instant Consultations'}
                </h4>
                <p className="text-xs text-[#5A6B6C]">
                  {isArabic 
                    ? 'تواصل مع الأطباء على مدار الساعة من أي مكان' 
                    : 'Connect with doctors 24/7 from anywhere'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Download Buttons */}
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-sm font-semibold text-[#1A2B2C] mb-3">
              {isArabic ? 'حمّل التطبيق الآن:' : 'Download the app now:'}
            </p>
            <AppDownloadButtons layout="horizontal" showHuawei={true} />
          </div>

          {/* QR Code Section (Optional) */}
          <div className="flex items-center justify-center gap-4 p-4 bg-white rounded-xl border-2 border-dashed border-[#4A8B8E]/30">
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center mb-2">
                {/* Placeholder for QR Code */}
                <div className="text-xs text-gray-500">QR Code</div>
              </div>
              <p className="text-xs text-[#5A6B6C]">
                {isArabic ? 'امسح للتحميل' : 'Scan to download'}
              </p>
            </div>
            <div className="flex-1 max-w-xs">
              <p className="text-sm text-[#5A6B6C]">
                {isArabic 
                  ? 'امسح رمز QR بكاميرا هاتفك للانتقال مباشرة إلى صفحة التحميل' 
                  : 'Scan the QR code with your phone camera to go directly to the download page'}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-6 p-4 bg-[#FFF9E6] border-r-4 border-yellow-500 rounded-lg">
          <p className="text-xs text-[#5A6B6C] flex items-start gap-2">
            <span className="text-yellow-600 mt-0.5">💡</span>
            <span>
              {isArabic 
                ? 'هذه الصفحة مخصصة للتجار والأطباء والمسوقين. إذا كنت مشتركاً أو مستخدماً عادياً، يرجى تحميل التطبيق للوصول إلى حسابك.' 
                : 'This page is for merchants, doctors, and affiliates. If you are a subscriber or regular user, please download the app to access your account.'}
            </span>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
