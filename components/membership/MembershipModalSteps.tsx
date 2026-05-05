// Personal Info Step
export const PersonalInfoStep = ({ 
  fullName, 
  setFullName, 
  birthDate, 
  setBirthDate, 
  idType, 
  setIdType, 
  idNumber, 
  setIdNumber,
  onSubmit 
}: any) => (
  <div className="flex flex-col items-center justify-center h-full text-center space-y-6 py-8 max-w-2xl mx-auto">
    {/* Icon */}
    <div className="relative w-24 h-24 md:w-32 md:h-32">
      <div className="absolute inset-0 bg-emerald-500 rounded-full animate-pulse opacity-20"></div>
      <div className="relative w-full h-full bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-xl">
        <svg className="w-12 h-12 md:w-16 md:h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>
    </div>

    {/* Title */}
    <div className="space-y-2">
      <h3 className="text-2xl md:text-3xl font-black text-slate-900">
        أدخل بياناتك الشخصية
      </h3>
      <p className="text-sm md:text-base text-slate-600 max-w-md">
        نحتاج بعض المعلومات لإتمام الاشتراك بشكل آمن
      </p>
    </div>

    {/* Form */}
    <div className="w-full max-w-md space-y-4">
      {/* Full Name */}
      <div className="text-right">
        <label className="block text-sm font-bold text-slate-700 mb-2">
          الاسم الكامل <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="أدخل اسمك الكامل"
          className="w-full px-4 py-3 text-base border-2 border-slate-300 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 outline-none transition-all font-semibold"
          dir="rtl"
        />
      </div>

      {/* Birth Date */}
      <div className="text-right">
        <label className="block text-sm font-bold text-slate-700 mb-2">
          تاريخ الميلاد <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="w-full px-4 py-3 text-base border-2 border-slate-300 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 outline-none transition-all font-semibold"
          dir="rtl"
        />
      </div>

      {/* ID Type */}
      <div className="text-right">
        <label className="block text-sm font-bold text-slate-700 mb-2">
          نوع الهوية <span className="text-red-500">*</span>
        </label>
        <select
          value={idType}
          onChange={(e) => setIdType(e.target.value as 'national' | 'iqama' | 'passport')}
          className="w-full px-4 py-3 text-base border-2 border-slate-300 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 outline-none transition-all bg-white font-semibold"
          dir="rtl"
        >
          <option value="national">هوية وطنية</option>
          <option value="iqama">إقامة</option>
          <option value="passport">جواز سفر (Passport)</option>
        </select>
      </div>

      {/* ID Number */}
      <div className="text-right">
        <label className="block text-sm font-bold text-slate-700 mb-2">
          رقم الهوية <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={idNumber}
          onChange={(e) => setIdNumber(e.target.value.replace(/\D/g, ''))}
          placeholder="أدخل رقم الهوية"
          maxLength={10}
          className="w-full px-4 py-3 text-base border-2 border-slate-300 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 outline-none transition-all font-semibold"
          dir="ltr"
        />
      </div>

      {/* Submit Button */}
      <button
        onClick={onSubmit}
        disabled={!fullName || !birthDate || !idNumber}
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-base md:text-lg py-6 rounded-xl font-black disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
      >
        ادفع الآن ←
      </button>

      {/* Trust Badges */}
      <div className="flex items-center justify-center gap-4 text-xs text-slate-500 pt-2">
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <span>بياناتك آمنة 100%</span>
        </div>
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>مشفرة ومحمية</span>
        </div>
      </div>
    </div>
  </div>
);

// Payment Step
export const PaymentStep = ({ selectedPaymentMethod, setSelectedPaymentMethod, onSubmit, packagePrice }: any) => {
  const paymentMethods = [
    { id: 'stc', name: 'STC Pay', logo: '/images/STC-pay-01.png', type: 'wallet' },
    { id: 'mada', name: 'مدى', logo: '/images/MAD_default.png', type: 'card' },
    { id: 'visa', name: 'Visa', icon: 'visa', type: 'card' },
    { id: 'mastercard', name: 'Mastercard', icon: 'mastercard', type: 'card' },
    { id: 'applepay', name: 'Apple Pay', icon: 'apple', type: 'wallet' },
    { id: 'googlepay', name: 'Google Pay', icon: 'google', type: 'wallet' },
    { id: 'tabby', name: 'Tabby', logo: '/images/Tabby-01.png', type: 'bnpl', subtitle: 'قسّمها على 4 دفعات' },
    { id: 'tamara', name: 'Tamara', logo: '/images/Tamara.png', type: 'bnpl', subtitle: 'قسّمها على 3 أو 4 دفعات' },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-6 py-8 max-w-3xl mx-auto">
      {/* Icon */}
      <div className="relative w-24 h-24 md:w-32 md:h-32">
        <div className="absolute inset-0 bg-emerald-500 rounded-full animate-pulse opacity-20"></div>
        <div className="relative w-full h-full bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-xl">
          <svg className="w-12 h-12 md:w-16 md:h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        </div>
      </div>

      {/* Title */}
      <div className="space-y-2">
        <h3 className="text-2xl md:text-3xl font-black text-slate-900">
          اختر طريقة الدفع
        </h3>
        <p className="text-sm md:text-base text-slate-600 max-w-md">
          جميع طرق الدفع آمنة ومشفرة 100%
        </p>
        <div className="inline-block px-6 py-2 bg-emerald-50 rounded-full">
          <p className="text-xl md:text-2xl text-emerald-600 font-black">
            {packagePrice === 'مجاناً' || packagePrice === 'حسب الاتفاق' 
              ? packagePrice 
              : `${packagePrice} ريال`}
          </p>
        </div>
      </div>

      {/* Payment Methods Grid */}
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {paymentMethods.map((method) => (
          <button
            key={method.id}
            onClick={() => setSelectedPaymentMethod(method.id)}
            className={`relative p-4 md:p-6 rounded-2xl border-2 transition-all duration-200 ${
              selectedPaymentMethod === method.id
                ? 'border-emerald-500 bg-emerald-50 shadow-lg ring-2 ring-emerald-200'
                : 'border-slate-200 hover:border-emerald-300 hover:shadow-md bg-white'
            }`}
          >
            {/* Logo or Icon */}
            <div className="flex items-center justify-center h-12 md:h-16 mb-2">
              {method.logo ? (
                <img 
                  src={method.logo} 
                  alt={method.name} 
                  className="h-full w-auto object-contain"
                />
              ) : method.icon === 'visa' ? (
                <svg className="h-8 md:h-10" viewBox="0 0 48 32" fill="none">
                  <rect width="48" height="32" rx="4" fill="#1434CB"/>
                  <path d="M20.5 11h-3.2l-2 12h2l2-12zm7.3 7.7l1.1-3 .6 3h-1.7zm2.4 4.3h1.8l-1.6-12h-1.7c-.4 0-.7.2-.8.6l-2.9 11.4h2.1l.4-1.1h2.5l.2 1.1zm-5.1-3.9c0-3.2-4.4-3.4-4.4-4.8 0-.4.4-.9 1.3-.9.7 0 1.3.1 1.9.4l.3-1.6c-.5-.2-1.1-.3-1.9-.3-2 0-3.4 1.1-3.4 2.6 0 1.1 1 1.8 1.8 2.1.8.4 1.1.6 1.1 1 0 .5-.6.8-1.2.8-.9 0-1.5-.1-2.2-.5l-.3 1.6c.5.2 1.4.4 2.4.4 2.1.1 3.6-1 3.6-2.8zm-10.8-8.1l-3.3 12h-2.1l-1.6-6.2c-.1-.4-.2-.5-.5-.7-.5-.3-1.4-.6-2.1-.8l.1-.3h3.6c.5 0 .9.3 1 .8l.9 4.9 2.2-5.7h2.1-.3z" fill="white"/>
                </svg>
              ) : method.icon === 'mastercard' ? (
                <svg className="h-8 md:h-10" viewBox="0 0 48 32" fill="none">
                  <rect width="48" height="32" rx="4" fill="#EB001B"/>
                  <circle cx="18" cy="16" r="10" fill="#FF5F00"/>
                  <circle cx="30" cy="16" r="10" fill="#F79E1B"/>
                  <path d="M24 8.5c-1.9 1.7-3 4.1-3 6.5s1.1 4.8 3 6.5c1.9-1.7 3-4.1 3-6.5s-1.1-4.8-3-6.5z" fill="#FF5F00"/>
                </svg>
              ) : method.icon === 'apple' ? (
                <svg className="h-8 md:h-10" viewBox="0 0 48 32" fill="none">
                  <rect width="48" height="32" rx="4" fill="#000"/>
                  <path d="M18.5 10.5c.8-1 1.3-2.4 1.2-3.8-1.1.1-2.5.8-3.3 1.7-.7.8-1.4 2.2-1.2 3.5 1.3.1 2.6-.6 3.3-1.4zm.5 1.2c-1.8-.1-3.3 1-4.2 1-.9 0-2.3-1-3.8-1-2 0-3.8 1.1-4.8 2.9-2.1 3.6-.5 8.9 1.5 11.8 1 1.4 2.2 3 3.7 2.9 1.5-.1 2-.9 3.8-.9 1.8 0 2.3.9 3.8.9 1.6 0 2.6-1.4 3.6-2.8.7-1 1.2-2 1.5-3.1-3.3-1.3-3.8-6.2-.5-7.9-.9-1.3-2.3-2.1-3.6-2.2z" fill="white"/>
                  <text x="28" y="20" fill="white" fontSize="8" fontWeight="600">Pay</text>
                </svg>
              ) : method.icon === 'google' ? (
                <svg className="h-8 md:h-10" viewBox="0 0 48 32" fill="none">
                  <rect width="48" height="32" rx="4" fill="#fff" stroke="#dadce0"/>
                  <path d="M16.5 16c0-.7.1-1.3.3-1.9h-3.3v3.6h4.7c-.2 1-.8 1.8-1.7 2.4v2h2.7c1.6-1.5 2.5-3.7 2.5-6.1 0-.6-.1-1.2-.2-1.7h-5z" fill="#4285F4"/>
                  <path d="M13.5 21.5c2.3 0 4.2-.8 5.6-2.1l-2.7-2c-.8.5-1.7.8-2.9.8-2.2 0-4.1-1.5-4.8-3.5h-2.8v2.1c1.4 2.8 4.3 4.7 7.6 4.7z" fill="#34A853"/>
                  <path d="M8.7 14.7c-.2-.5-.3-1.1-.3-1.7s.1-1.2.3-1.7v-2.1h-2.8c-.6 1.2-.9 2.5-.9 3.8s.3 2.6.9 3.8l2.8-2.1z" fill="#FBBC05"/>
                  <path d="M13.5 9.5c1.2 0 2.3.4 3.2 1.2l2.4-2.4c-1.5-1.4-3.4-2.3-5.6-2.3-3.3 0-6.2 1.9-7.6 4.7l2.8 2.1c.7-2 2.6-3.5 4.8-3.5z" fill="#EA4335"/>
                  <text x="22" y="20" fill="#5f6368" fontSize="7" fontWeight="500">Pay</text>
                </svg>
              ) : null}
            </div>

            {/* Name */}
            <div className="text-center">
              <p className="text-xs md:text-sm font-bold text-slate-900">{method.name}</p>
              {method.subtitle && (
                <p className="text-[10px] text-slate-500 mt-1">{method.subtitle}</p>
              )}
            </div>

            {/* Selected Indicator */}
            {selectedPaymentMethod === method.id && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Submit Button */}
      <button
        onClick={onSubmit}
        disabled={!selectedPaymentMethod}
        className="w-full max-w-md bg-emerald-600 hover:bg-emerald-700 text-white text-base md:text-lg py-6 rounded-xl font-black disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
      >
        تأكيد الدفع ←
      </button>

      {/* Trust Badges */}
      <div className="flex items-center justify-center gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <span>دفع آمن ومشفر</span>
        </div>
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>محمي بأعلى معايير الأمان</span>
        </div>
      </div>
    </div>
  );
};
