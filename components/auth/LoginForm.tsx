'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, LogIn, Smartphone, Stethoscope, Store, TrendingUp } from 'lucide-react';
import { Logo } from '@/components/shared/logo';

type UserType = 'merchant' | 'doctor' | 'affiliate';

interface LoginFormProps {
  initialTab?: UserType;
}

const USER_TYPES = [
  { id: 'merchant', label: 'تاجر', icon: Store, description: 'لوحة تحكم التجار والمنشآت الطبية' },
  { id: 'doctor', label: 'طبيب', icon: Stethoscope, description: 'لوحة تحكم الأطباء والممارسين الصحيين' },
  { id: 'affiliate', label: 'مسوق', icon: TrendingUp, description: 'لوحة تحكم المسوقين بالعمولة' },
] as const;

export function LoginForm({ initialTab = 'merchant' }: LoginFormProps) {
  const [activeTab, setActiveTab] = useState<UserType>(initialTab);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle login logic
    console.log('Login:', { ...formData, userType: activeTab, rememberMe });
  };

  const handleOTPLogin = () => {
    // TODO: Handle OTP login
    console.log('OTP Login for:', activeTab);
  };

  const getPlaceholder = () => {
    if (activeTab === 'merchant') {
      return 'رقم السجل التجاري / رقم الجوال / البريد الإلكتروني';
    }
    if (activeTab === 'doctor') {
      return 'رقم الترخيص الطبي / رقم الجوال / البريد الإلكتروني';
    }
    return 'رقم الجوال / البريد الإلكتروني';
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      {/* Logo & Title */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <Logo size="medium" />
        </div>
        <h1 className="text-3xl font-bold text-[#1A2B2C] mb-2">أمان إيفر</h1>
        <p className="text-[#5A6B6C]">تسجيل الدخول</p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {USER_TYPES.map((type) => {
          const Icon = type.icon;
          return (
            <button
              key={type.id}
              onClick={() => setActiveTab(type.id as UserType)}
              className={`
                relative py-4 px-3 rounded-xl text-center transition-all duration-300
                ${
                  activeTab === type.id
                    ? 'bg-[#4A8B8E] text-white shadow-lg scale-105'
                    : 'bg-[#F8FAFB] text-[#5A6B6C] hover:bg-[#E8F1F1]'
                }
              `}
              title={type.description}
            >
              <Icon className="w-7 h-7 mx-auto mb-2" />
              <div className="text-sm font-bold">{type.label}</div>
            </button>
          );
        })}
      </div>

      {/* Active Tab Description */}
      <div className="text-center mb-6 p-3 bg-[#F8FAFB] rounded-lg">
        <p className="text-sm text-[#5A6B6C]">
          {USER_TYPES.find((t) => t.id === activeTab)?.description}
        </p>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Identifier Input */}
        <div>
          <label htmlFor="identifier" className="block text-sm font-bold text-[#1A2B2C] mb-2">
            {activeTab === 'merchant' 
              ? 'رقم السجل التجاري أو بيانات الدخول' 
              : activeTab === 'doctor' 
                ? 'رقم الترخيص الطبي أو بيانات الدخول' 
                : 'بيانات الدخول'
            }
          </label>
          <input
            type="text"
            id="identifier"
            value={formData.identifier}
            onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
            placeholder={getPlaceholder()}
            className="w-full px-4 py-3 border-2 border-[#E5EAEB] rounded-xl focus:border-[#4A8B8E] focus:outline-none transition-colors text-[#1A2B2C] placeholder:text-[#8A9899]"
            required
            dir="ltr"
          />
          <p className="text-xs text-[#8A9899] mt-1">
            {activeTab === 'merchant'
              ? 'أدخل رقم السجل التجاري، رقم الجوال، أو البريد الإلكتروني'
              : activeTab === 'doctor' 
                ? 'أدخل رقم الترخيص الطبي، رقم الجوال، أو البريد الإلكتروني'
                : 'أدخل رقم الجوال أو البريد الإلكتروني'
            }
          </p>
        </div>

        {/* Password Input */}
        <div>
          <label htmlFor="password" className="block text-sm font-bold text-[#1A2B2C] mb-2">
            كلمة المرور
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
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 text-[#4A8B8E] border-[#E5EAEB] rounded focus:ring-[#4A8B8E]"
            />
            <span className="text-sm text-[#5A6B6C]">تذكرني</span>
          </label>
          <Link
            href="/ar/forgot-password"
            className="text-sm text-[#4A8B8E] hover:text-[#356B6E] font-bold transition-colors"
          >
            نسيت كلمة المرور؟
          </Link>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-[#4A8B8E] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#356B6E] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
        >
          <LogIn className="w-5 h-5" />
          تسجيل الدخول
        </button>

        {/* Register Link */}
        <p className="text-center text-sm text-[#5A6B6C]">
          ليس لديك حساب تاجر أو طبيب أو مسوق؟{' '}
          <Link
            href="/ar/register"
            className="text-[#4A8B8E] hover:text-[#356B6E] font-bold transition-colors"
          >
            سجل الآن
          </Link>
        </p>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#E5EAEB]"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-[#8A9899]">أو</span>
          </div>
        </div>

        {/* OTP Login Button */}
        <button
          type="button"
          onClick={handleOTPLogin}
          className="w-full bg-white border-2 border-[#4A8B8E] text-[#4A8B8E] py-4 rounded-xl font-bold text-lg hover:bg-[#F8FAFB] transition-all duration-300 flex items-center justify-center gap-2"
        >
          <Smartphone className="w-5 h-5" />
          دخول سريع بـ OTP
        </button>
      </form>

      {/* Security Note */}
      <div className="mt-6 p-4 bg-[#FFF9E6] border-r-4 border-yellow-500 rounded-lg">
        <p className="text-xs text-[#5A6B6C] flex items-start gap-2">
          <span className="text-yellow-600 mt-0.5">🔒</span>
          <span><strong>أمان معلوماتك مهم لنا.</strong> جميع البيانات محمية بتشفير عالي المستوى.</span>
        </p>
      </div>
    </div>
  );
}
