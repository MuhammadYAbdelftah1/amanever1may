'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, UserPlus, Smartphone, Mail, Stethoscope, Store, TrendingUp } from 'lucide-react';
import { Logo } from '@/components/shared/logo';

type UserType = 'merchant' | 'doctor' | 'affiliate';

const USER_TYPES = [
  { id: 'merchant', label: 'تاجر', icon: Store, description: 'للصيدليات والمراكز الطبية والمنشآت الصحية' },
  { id: 'doctor', label: 'طبيب', icon: Stethoscope, description: 'للأطباء والممارسين الصحيين' },
  { id: 'affiliate', label: 'مسوق', icon: TrendingUp, description: 'للمسوقين بالعمولة' },
] as const;

export function RegisterForm() {
  const [userType, setUserType] = useState<UserType>('merchant');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [formData, setFormData] = useState({
    // Common fields
    mobile: '',
    email: '',
    password: '',
    confirmPassword: '',
    // Doctor fields
    licenseNumber: '',
    specialization: '',
    // Merchant fields
    commercialRegister: '',
    businessType: '',
    // Affiliate fields
    bankName: '',
    iban: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (formData.password !== formData.confirmPassword) {
      alert('كلمة المرور غير متطابقة');
      return;
    }

    if (!acceptTerms) {
      alert('يجب الموافقة على الشروط والأحكام');
      return;
    }

    // TODO: Handle registration logic
    console.log('Register:', { ...formData, userType });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      {/* Logo & Title */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <Logo size="medium" />
        </div>
        <h1 className="text-3xl font-bold text-[#1A2B2C] mb-2">أمان إيفر</h1>
        <p className="text-[#5A6B6C]">إنشاء حساب جديد</p>
      </div>

      {/* User Type Tabs */}
      <div className="mb-6">
        <p className="text-sm font-bold text-[#1A2B2C] mb-3 text-center">اختر نوع الحساب:</p>
        <div className="grid grid-cols-3 gap-3">
          {USER_TYPES.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => setUserType(type.id as UserType)}
                className={`
                  py-4 px-3 rounded-xl text-center transition-all duration-300 flex flex-col items-center gap-2
                  ${
                    userType === type.id
                      ? 'bg-[#4A8B8E] text-white shadow-lg scale-105'
                      : 'bg-[#F8FAFB] text-[#5A6B6C] hover:bg-[#E8F1F1]'
                  }
                `}
                title={type.description}
              >
                <Icon className="w-7 h-7" />
                <span className="text-sm font-bold">{type.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Type Description */}
      <div className="text-center mb-6 p-3 bg-[#F8FAFB] rounded-lg">
        <p className="text-sm text-[#5A6B6C]">
          {USER_TYPES.find((t) => t.id === userType)?.description}
        </p>
      </div>

      {/* Register Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Mobile Input (Always shown, required) */}
        <div>
          <label htmlFor="mobile" className="block text-sm font-bold text-[#1A2B2C] mb-2">
            رقم الجوال <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Smartphone className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8A9899]" />
            <input
              type="tel"
              id="mobile"
              value={formData.mobile}
              onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              placeholder="مثال: 0512345678"
              className="w-full px-4 py-3 pr-12 border-2 border-[#E5EAEB] rounded-xl focus:border-[#4A8B8E] focus:outline-none transition-colors text-[#1A2B2C] placeholder:text-[#8A9899]"
              required
              dir="ltr"
              pattern="^05[0-9]{8}$"
              title="يجب أن يبدأ الرقم بـ 05 ويتكون من 10 أرقام"
            />
          </div>
          <p className="text-xs text-[#8A9899] mt-1">سيتم إرسال رمز التحقق إلى هذا الرقم</p>
        </div>

        {/* Email Input (Required for all) */}
        <div>
          <label htmlFor="email" className="block text-sm font-bold text-[#1A2B2C] mb-2">
            البريد الإلكتروني <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8A9899]" />
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="example@email.com"
              className="w-full px-4 py-3 pr-12 border-2 border-[#E5EAEB] rounded-xl focus:border-[#4A8B8E] focus:outline-none transition-colors text-[#1A2B2C] placeholder:text-[#8A9899]"
              required
              dir="ltr"
            />
          </div>
        </div>

        {/* Doctor-specific fields */}
        {userType === 'doctor' && (
          <>
            <div>
              <label htmlFor="licenseNumber" className="block text-sm font-bold text-[#1A2B2C] mb-2">
                رقم الترخيص الطبي <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="licenseNumber"
                value={formData.licenseNumber}
                onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                placeholder="أدخل رقم الترخيص"
                className="w-full px-4 py-3 border-2 border-[#E5EAEB] rounded-xl focus:border-[#4A8B8E] focus:outline-none transition-colors text-[#1A2B2C] placeholder:text-[#8A9899]"
                required
                dir="ltr"
              />
            </div>
            <div>
              <label htmlFor="specialization" className="block text-sm font-bold text-[#1A2B2C] mb-2">
                التخصص <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="specialization"
                value={formData.specialization}
                onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                placeholder="مثال: طب عام، أطفال، جراحة"
                className="w-full px-4 py-3 border-2 border-[#E5EAEB] rounded-xl focus:border-[#4A8B8E] focus:outline-none transition-colors text-[#1A2B2C] placeholder:text-[#8A9899]"
                required
              />
            </div>
          </>
        )}

        {/* Merchant-specific fields */}
        {userType === 'merchant' && (
          <>
            <div>
              <label htmlFor="commercialRegister" className="block text-sm font-bold text-[#1A2B2C] mb-2">
                رقم السجل التجاري <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="commercialRegister"
                value={formData.commercialRegister}
                onChange={(e) => setFormData({ ...formData, commercialRegister: e.target.value })}
                placeholder="أدخل رقم السجل التجاري"
                className="w-full px-4 py-3 border-2 border-[#E5EAEB] rounded-xl focus:border-[#4A8B8E] focus:outline-none transition-colors text-[#1A2B2C] placeholder:text-[#8A9899]"
                required
                dir="ltr"
              />
            </div>
            <div>
              <label htmlFor="businessType" className="block text-sm font-bold text-[#1A2B2C] mb-2">
                نوع النشاط <span className="text-red-500">*</span>
              </label>
              <select
                id="businessType"
                value={formData.businessType}
                onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                className="w-full px-4 py-3 border-2 border-[#E5EAEB] rounded-xl focus:border-[#4A8B8E] focus:outline-none transition-colors text-[#1A2B2C]"
                required
              >
                <option value="">اختر نوع النشاط</option>
                <option value="pharmacy">صيدلية</option>
                <option value="clinic">عيادة</option>
                <option value="hospital">مستشفى</option>
                <option value="lab">مختبر</option>
                <option value="other">أخرى</option>
              </select>
            </div>
          </>
        )}

        {/* Affiliate-specific fields */}
        {userType === 'affiliate' && (
          <>
            <div>
              <label htmlFor="bankName" className="block text-sm font-bold text-[#1A2B2C] mb-2">
                اسم البنك <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="bankName"
                value={formData.bankName}
                onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                placeholder="مثال: البنك الأهلي"
                className="w-full px-4 py-3 border-2 border-[#E5EAEB] rounded-xl focus:border-[#4A8B8E] focus:outline-none transition-colors text-[#1A2B2C] placeholder:text-[#8A9899]"
                required
              />
            </div>
            <div>
              <label htmlFor="iban" className="block text-sm font-bold text-[#1A2B2C] mb-2">
                رقم الآيبان (IBAN) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="iban"
                value={formData.iban}
                onChange={(e) => setFormData({ ...formData, iban: e.target.value })}
                placeholder="SA00 0000 0000 0000 0000 0000"
                className="w-full px-4 py-3 border-2 border-[#E5EAEB] rounded-xl focus:border-[#4A8B8E] focus:outline-none transition-colors text-[#1A2B2C] placeholder:text-[#8A9899]"
                required
                dir="ltr"
                pattern="^SA[0-9]{22}$"
                title="يجب أن يبدأ بـ SA ويتكون من 24 حرف"
              />
            </div>
          </>
        )}

        {/* Password Input */}
        <div>
          <label htmlFor="password" className="block text-sm font-bold text-[#1A2B2C] mb-2">
            كلمة المرور <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="أدخل كلمة المرور"
              className="w-full px-4 py-3 border-2 border-[#E5EAEB] rounded-xl focus:border-[#4A8B8E] focus:outline-none transition-colors text-[#1A2B2C] placeholder:text-[#8A9899] pr-12"
              required
              minLength={8}
              dir="ltr"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A9899] hover:text-[#4A8B8E] transition-colors"
              aria-label={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          <p className="text-xs text-[#8A9899] mt-1">يجب أن تتكون من 8 أحرف على الأقل</p>
        </div>

        {/* Confirm Password Input */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-bold text-[#1A2B2C] mb-2">
            تأكيد كلمة المرور <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              placeholder="أعد إدخال كلمة المرور"
              className="w-full px-4 py-3 border-2 border-[#E5EAEB] rounded-xl focus:border-[#4A8B8E] focus:outline-none transition-colors text-[#1A2B2C] placeholder:text-[#8A9899] pr-12"
              required
              dir="ltr"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A9899] hover:text-[#4A8B8E] transition-colors"
              aria-label={showConfirmPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="flex items-start gap-3 p-4 bg-[#F8FAFB] rounded-xl">
          <input
            type="checkbox"
            id="terms"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            className="w-5 h-5 text-[#4A8B8E] border-[#E5EAEB] rounded focus:ring-[#4A8B8E] mt-0.5"
            required
          />
          <label htmlFor="terms" className="text-sm text-[#5A6B6C] cursor-pointer">
            أوافق على{' '}
            <Link href="/ar/terms-of-use" className="text-[#4A8B8E] hover:text-[#356B6E] font-bold">
              الشروط والأحكام
            </Link>{' '}
            و{' '}
            <Link href="/ar/privacy-policy" className="text-[#4A8B8E] hover:text-[#356B6E] font-bold">
              سياسة الخصوصية
            </Link>
          </label>
        </div>

        {/* Register Button */}
        <button
          type="submit"
          className="w-full bg-[#4A8B8E] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#356B6E] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
        >
          <UserPlus className="w-5 h-5" />
          إنشاء الحساب
        </button>

        {/* Login Link */}
        <p className="text-center text-sm text-[#5A6B6C]">
          لديك حساب؟{' '}
          <Link
            href="/ar/login"
            className="text-[#4A8B8E] hover:text-[#356B6E] font-bold transition-colors"
          >
            سجل الدخول
          </Link>
        </p>
      </form>

      {/* Benefits */}
      <div className="mt-6 p-4 bg-[#E8F1F1] rounded-lg">
        <p className="text-xs font-bold text-[#1A2B2C] mb-2 flex items-center gap-2">
          <span className="text-[#4A8B8E]">✨</span>
          {userType === 'merchant' && 'مميزات الانضمام للتجار:'}
          {userType === 'doctor' && 'مميزات الانضمام للأطباء:'}
          {userType === 'affiliate' && 'مميزات الانضمام للمسوقين:'}
        </p>
        <ul className="text-xs text-[#5A6B6C] space-y-1">
          {userType === 'merchant' && (
            <>
              <li className="flex items-start gap-2">
                <span className="text-[#4A8B8E] mt-0.5">✓</span>
                <span>زيادة عدد العملاء من خلال شبكة أمان إيفر</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#4A8B8E] mt-0.5">✓</span>
                <span>نظام دفع آمن ومضمون</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#4A8B8E] mt-0.5">✓</span>
                <span>تقارير مفصلة عن المبيعات والعمليات</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#4A8B8E] mt-0.5">✓</span>
                <span>دعم فني متخصص على مدار الساعة</span>
              </li>
            </>
          )}
          {userType === 'doctor' && (
            <>
              <li className="flex items-start gap-2">
                <span className="text-[#4A8B8E] mt-0.5">✓</span>
                <span>انضم لشبكة أطباء أمان إيفر</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#4A8B8E] mt-0.5">✓</span>
                <span>احصل على مرضى جدد من خلال المنصة</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#4A8B8E] mt-0.5">✓</span>
                <span>إدارة مواعيدك وحجوزاتك بسهولة</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#4A8B8E] mt-0.5">✓</span>
                <span>نظام سجلات طبية إلكتروني متكامل</span>
              </li>
            </>
          )}
          {userType === 'affiliate' && (
            <>
              <li className="flex items-start gap-2">
                <span className="text-[#4A8B8E] mt-0.5">✓</span>
                <span>عمولات تنافسية على كل عملية بيع</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#4A8B8E] mt-0.5">✓</span>
                <span>أدوات تسويقية احترافية جاهزة</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#4A8B8E] mt-0.5">✓</span>
                <span>تتبع دقيق للعمولات والأرباح</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#4A8B8E] mt-0.5">✓</span>
                <span>دفعات شهرية منتظمة ومضمونة</span>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
