'use client';

import { NetworkMapPopover } from './network-map-popover';

/**
 * مكون تجريبي لاختبار NetworkMapPopover
 * يمكن استخدامه في صفحة تجريبية أو في Storybook
 */
export function NetworkMapDemo() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            اختبار مكون استكشاف الشبكة
          </h1>
          <p className="text-lg text-gray-600">
            اضغط على الأزرار أدناه لفتح نافذة استكشاف الشبكة الطبية أو الصحية
          </p>
        </div>

        {/* Demo Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Medical Network Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-[#5B9A9E]/20">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-[#5B9A9E]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#5B9A9E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                الشبكة الطبية
              </h2>
              <p className="text-gray-600 mb-6">
                استكشف أكثر من 500+ مقدم خدمة طبية في جميع أنحاء المملكة
              </p>
            </div>
            <div className="flex justify-center">
              <NetworkMapPopover locale="ar" type="medical" />
            </div>
          </div>

          {/* Health Network Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-[#6BA5A8]/20">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-[#6BA5A8]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#6BA5A8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                الشبكة الصحية
              </h2>
              <p className="text-gray-600 mb-6">
                اكتشف أكثر من 200+ مركز صحي ولياقة في المملكة
              </p>
            </div>
            <div className="flex justify-center">
              <NetworkMapPopover locale="ar" type="health" />
            </div>
          </div>
        </div>

        {/* Features List */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            مميزات المكون
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">خريطة تفاعلية</h4>
                <p className="text-sm text-gray-600">عرض خريطة المملكة مع المناطق الجغرافية</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">تصفية حسب المناطق</h4>
                <p className="text-sm text-gray-600">13 منطقة إدارية في المملكة</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">بحث عن المدن</h4>
                <p className="text-sm text-gray-600">أكثر من 150 مدينة سعودية</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">تحميل البيانات</h4>
                <p className="text-sm text-gray-600">تصدير بصيغة Excel أو PDF</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">تصميم متجاوب</h4>
                <p className="text-sm text-gray-600">يعمل على جميع الأجهزة</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">دعم اللغتين</h4>
                <p className="text-sm text-gray-600">العربية والإنجليزية</p>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Instructions */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            📝 كيفية الاستخدام
          </h3>
          <div className="space-y-3 text-gray-700">
            <p>1. اضغط على زر "استكشف الشبكة" لفتح النافذة</p>
            <p>2. اختر المنطقة الجغرافية (شمالية، جنوبية، شرقية، غربية، وسطى)</p>
            <p>3. حدد المنطقة الإدارية من القائمة</p>
            <p>4. ابحث عن المدينة المطلوبة</p>
            <p>5. اضغط على "تحميل Excel" أو "تحميل PDF" لتصدير البيانات</p>
          </div>
        </div>
      </div>
    </div>
  );
}
