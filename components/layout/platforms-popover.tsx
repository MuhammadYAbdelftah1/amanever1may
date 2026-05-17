'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  Store,
  Stethoscope,
  TrendingUp,
  LogIn,
  UserPlus,
  X,
  Eye,
  EyeOff,
  Mail,
  Smartphone
} from 'lucide-react';
import { usePathname } from 'next/navigation';

interface PlatformsPopoverProps {
  locale: string;
  isMobile?: boolean;
  type: 'merchants' | 'doctors' | 'affiliates';
}

const platformsConfig = {
  merchants: {
    id: 'merchants',
    icon: Store,
    title: 'منصة دخول التاجر',
    titleEn: 'Merchant Login Platform',
    description: 'انضم لشبكة التجار واحصل على عمولات وفرص تجارية',
    gradient: 'from-[#4A8B8E] to-[#356B6E]',
    identifierLabel: 'رقم السجل التجاري / الجوال / البريد',
    identifierPlaceholder: 'رقم السجل التجاري أو الجوال أو البريد',
    registerFields: [
      { id: 'commercialRegister', label: 'رقم السجل التجاري', type: 'text', required: true },
      { id: 'businessType', label: 'نوع النشاط', type: 'select', required: true, options: ['صيدلية', 'عيادة', 'مستشفى', 'مختبر', 'أخرى'] },
    ],
  },
  doctors: {
    id: 'doctors',
    icon: Stethoscope,
    title: 'منصة دخول الأطباء',
    titleEn: 'Doctors Login Platform',
    description: 'انضم لمنصة الأطباء ووسّع قاعدة مرضاك',
    gradient: 'from-[#4A8B8E] to-[#356B6E]',
    identifierLabel: 'رقم الترخيص الطبي / الجوال / البريد',
    identifierPlaceholder: 'رقم الترخيص أو الجوال أو البريد',
    registerFields: [
      { id: 'licenseNumber', label: 'رقم الترخيص الطبي', type: 'text', required: true },
      { id: 'specialization', label: 'التخصص', type: 'text', required: true },
    ],
  },
  affiliates: {
    id: 'affiliates',
    icon: TrendingUp,
    title: 'رحلة الثراء',
    titleEn: 'Wealth Journey',
    description: 'برنامج التسويق بالعمولة - اربح دخل متكرر',
    gradient: 'from-[#4A8B8E] to-[#356B6E]',
    identifierLabel: 'رقم الجوال / البريد الإلكتروني',
    identifierPlaceholder: 'رقم الجوال أو البريد الإلكتروني',
    registerFields: [
      { id: 'bankName', label: 'اسم البنك', type: 'text', required: true },
      { id: 'iban', label: 'رقم الآيبان (IBAN)', type: 'text', required: true },
    ],
  },
};

export function PlatformsPopover({ locale, isMobile = false, type }: PlatformsPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  const config = platformsConfig[type];
  const Icon = config.icon;

  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
    confirmPassword: '',
    mobile: '',
    email: '',
    commercialRegister: '',
    businessType: '',
    licenseNumber: '',
    specialization: '',
    bankName: '',
    iban: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Form submitted! Mode:', mode, 'Type:', type);
    
    // Show notification for registration
    if (mode === 'register') {
      console.log('Register mode detected!');
      if (formData.password !== formData.confirmPassword) {
        alert('كلمة المرور غير متطابقة');
        return;
      }
      console.log('Showing alert...');
      alert('جاري الاتصال بصفحة تسجيل التجار قريباً يا دكتور أبو تالين حاضر لا تقلق :)');
      return;
    }
    
    // Handle login (original behavior)
    console.log(`${mode} for ${type}:`, formData);
    // TODO: Handle actual submission
  };

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        popoverRef.current &&
        triggerRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  // Close popover on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // Mobile: Bottom Sheet
  if (isMobile) {
    return (
      <>
        <button
          ref={triggerRef}
          onClick={handleToggle}
          className="flex items-center gap-3 text-lg font-medium transition-all duration-300 rounded-lg px-4 py-3 text-[#4A8B8E]/80 hover:text-[#4A8B8E] hover:bg-[#4A8B8E]/5 w-full"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          {/* Image Placeholder */}
          <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-gray-50 relative border-2 border-dashed border-gray-300">
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <div className="text-[9px] font-semibold text-gray-700">للمصممة</div>
              <div className="text-[8px] text-gray-500">48×48</div>
            </div>
          </div>
          <span className="flex-1 text-center">{locale === 'ar' ? config.title : config.titleEn}</span>
        </button>

        {/* Bottom Sheet Overlay */}
        {isOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-[100] animate-in fade-in duration-200"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Bottom Sheet */}
        {isOpen && (
          <div
            ref={popoverRef}
            className="fixed bottom-0 left-0 right-0 z-[101] bg-white rounded-t-3xl shadow-2xl animate-in slide-in-from-bottom duration-300"
            role="dialog"
            aria-label={locale === 'ar' ? config.title : config.titleEn}
          >
            {/* Handle Bar */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
            </div>

            {/* Header with Image */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                {/* Image Placeholder instead of Icon */}
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-50 relative border-2 border-dashed border-gray-300 flex-shrink-0">
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <div className="text-[9px] font-semibold text-gray-700">للمصممة</div>
                    <div className="text-[8px] text-gray-500">48×48</div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {locale === 'ar' ? config.title : config.titleEn}
                </h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label={locale === 'ar' ? 'إغلاق' : 'Close'}
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Toggle Mode */}
              <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-xl">
                <button
                  onClick={() => setMode('login')}
                  className={`flex-1 py-2.5 rounded-lg font-semibold transition-all ${
                    mode === 'login'
                      ? `bg-gradient-to-r ${config.gradient} text-white shadow-md`
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  تسجيل الدخول
                </button>
                <button
                  onClick={() => setMode('register')}
                  className={`flex-1 py-2.5 rounded-lg font-semibold transition-all ${
                    mode === 'register'
                      ? `bg-gradient-to-r ${config.gradient} text-white shadow-md`
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  إنشاء حساب
                </button>
              </div>

              {/* Form or Message */}
              {mode === 'login' ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Login: Identifier */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {config.identifierLabel}
                    </label>
                    <input
                      type="text"
                      value={formData.identifier}
                      onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
                      placeholder={config.identifierPlaceholder}
                      className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-[#4A8B8E] focus:outline-none text-sm"
                      required
                      dir="ltr"
                    />
                  </div>

                  {/* Login: Password */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      كلمة المرور
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="أدخل كلمة المرور"
                        className="w-full px-4 py-2.5 pr-12 border-2 border-gray-200 rounded-xl focus:border-[#4A8B8E] focus:outline-none text-sm"
                        required
                        dir="ltr"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className={`w-full py-3 px-4 bg-gradient-to-r ${config.gradient} text-white font-bold rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-6`}
                  >
                    <LogIn className="w-5 h-5" />
                    <span>دخول</span>
                  </button>
                </form>
              ) : (
                /* Registration Message */
                <div className="py-12 px-4 text-center">
                  <div className="mb-6 text-6xl">😊</div>
                  <p className="text-xl font-bold text-gray-800 leading-relaxed">
                    جاري الاتصال بصفحة تسجيل التجار قريباً<br />
                    يا دكتور أبو تالين حاضر لا تقلق :)
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </>
    );
  }

  // Desktop: Popover
  return (
    <div className="relative">
      <button
        ref={triggerRef}
        onClick={handleToggle}
        className={`relative text-sm font-medium transition-all duration-300 rounded-lg px-4 py-2 group ${
          pathname.includes(`/${type}`)
            ? 'text-[#4A8B8E] bg-[#4A8B8E]/10'
            : 'text-gray-700 hover:text-[#4A8B8E] hover:bg-[#4A8B8E]/5'
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {locale === 'ar' ? config.title : config.titleEn}
        
        {/* Hover effect */}
        <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#4A8B8E]/0 via-[#4A8B8E]/5 to-[#4A8B8E]/0" />
      </button>

      {/* Popover */}
      {isOpen && (
        <div
          ref={popoverRef}
          className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-[320px] bg-white rounded-2xl shadow-2xl border border-gray-200 animate-in fade-in slide-in-from-top-2 duration-200 z-50"
          role="dialog"
          aria-label={locale === 'ar' ? config.title : config.titleEn}
        >
          {/* Header with Image */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              {/* Image Placeholder instead of Icon */}
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-gray-50 relative border-2 border-dashed border-gray-300 flex-shrink-0">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <div className="text-[8px] font-semibold text-gray-700">للمصممة</div>
                  <div className="text-[7px] text-gray-500">40×40</div>
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                {locale === 'ar' ? config.title : config.titleEn}
              </h3>
            </div>
            <p className="text-sm text-gray-600">
              {config.description}
            </p>
          </div>

          {/* Content - Desktop Form */}
          <div className="p-4">
            {/* Toggle Mode */}
            <div className="flex gap-2 mb-4 bg-gray-100 p-1 rounded-xl">
              <button
                onClick={() => setMode('login')}
                className={`flex-1 py-2 rounded-lg font-semibold transition-all text-sm ${
                  mode === 'login'
                    ? `bg-gradient-to-r ${config.gradient} text-white shadow-md`
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                دخول
              </button>
              <button
                onClick={() => setMode('register')}
                className={`flex-1 py-2 rounded-lg font-semibold transition-all text-sm ${
                  mode === 'register'
                    ? `bg-gradient-to-r ${config.gradient} text-white shadow-md`
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                اشتراك
              </button>
            </div>

            {/* Form or Message */}
            {mode === 'login' ? (
              <form onSubmit={handleSubmit} className="space-y-3">
                {/* Login: Identifier */}
                <div>
                  <input
                    type="text"
                    value={formData.identifier}
                    onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
                    placeholder={config.identifierPlaceholder}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-[#4A8B8E] focus:outline-none text-sm"
                    required
                    dir="ltr"
                  />
                </div>

                {/* Login: Password */}
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="كلمة المرور"
                    className="w-full px-3 py-2 pr-10 border-2 border-gray-200 rounded-lg focus:border-[#4A8B8E] focus:outline-none text-sm"
                    required
                    dir="ltr"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className={`w-full py-2.5 px-4 bg-gradient-to-r ${config.gradient} text-white font-bold rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm mt-4`}
                >
                  <LogIn className="w-4 h-4" />
                  <span>دخول</span>
                </button>
              </form>
            ) : (
              /* Registration Message */
              <div className="py-8 px-4 text-center">
                <div className="mb-4 text-5xl">😊</div>
                <p className="text-lg font-bold text-gray-800 leading-relaxed">
                  جاري الاتصال بصفحة تسجيل التجار قريباً<br />
                  يا دكتور أبو تالين حاضر لا تقلق :)
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
