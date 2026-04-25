/**
 * COMPLIANCE: PDPL + GDPR cookie consent
 */

"use client";

import { useState, useEffect } from 'react';
import { setRequestLocale } from 'next-intl/server';
import { Header } from '@/components/layout/header';
import { 
  Cookie, 
  Lock, 
  BarChart3, 
  Megaphone, 
  User,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Shield,
  ExternalLink,
  Save,
  Check,
} from 'lucide-react';
import { COOKIE_CATEGORIES } from '@/lib/data/cookie-categories';
import { useCookieConsent } from '@/hooks/useCookieConsent';

export default function CookieSettingsPage() {
  const { consent, isLoaded, hasInteracted, updateCategory, acceptAll, rejectNonEssential, saveConsent } = useCookieConsent();
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [localConsent, setLocalConsent] = useState(consent);
  const [hasChanges, setHasChanges] = useState(false);
  const [showSaved, setShowSaved] = useState(false);

  // Sync local consent with hook consent
  useEffect(() => {
    if (consent) {
      setLocalConsent(consent);
    }
  }, [consent]);

  // Check for changes
  useEffect(() => {
    if (consent && localConsent) {
      const changed = 
        consent.analytics !== localConsent.analytics ||
        consent.marketing !== localConsent.marketing ||
        consent.personalization !== localConsent.personalization;
      setHasChanges(changed);
    }
  }, [consent, localConsent]);

  const toggleCategory = (categoryId: string) => {
    if (expandedCategories.includes(categoryId)) {
      setExpandedCategories(expandedCategories.filter(id => id !== categoryId));
    } else {
      setExpandedCategories([...expandedCategories, categoryId]);
    }
  };

  const handleToggle = (categoryId: string, enabled: boolean) => {
    if (!localConsent) return;

    setLocalConsent({
      ...localConsent,
      [categoryId]: enabled,
    });
  };

  const handleSave = () => {
    if (localConsent) {
      saveConsent(localConsent);
      setShowSaved(true);
      setTimeout(() => setShowSaved(false), 3000);
    }
  };

  const handleAcceptAll = () => {
    acceptAll();
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 3000);
  };

  const handleRejectNonEssential = () => {
    rejectNonEssential();
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 3000);
  };

  const getIcon = (iconName: string) => {
    const icons: Record<string, any> = {
      lock: Lock,
      chart: BarChart3,
      megaphone: Megaphone,
      user: User,
    };
    return icons[iconName] || Cookie;
  };

  if (!isLoaded || !localConsent) {
    return (
      <>
        <Header locale="ar" />
        <main className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <Cookie className="w-12 h-12 text-[#4A8B8E] mx-auto mb-4 animate-pulse" />
            <p className="text-[#5A6B6C]">جاري التحميل...</p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header locale="ar" />
      
      <main id="main-content" className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-[#E8F1F1] to-white pt-24 pb-12 md:pt-32 md:pb-16">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-16 h-16 rounded-full bg-white border-2 border-[#4A8B8E] flex items-center justify-center mx-auto mb-6">
                <Cookie className="w-8 h-8 text-[#4A8B8E]" />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1A2B2C] mb-4">
                إعدادات ملفات تعريف الارتباط
              </h1>
              <p className="text-lg text-[#5A6B6C] mb-6 leading-relaxed">
                أنت تتحكم. اختر أنواع الكوكيز التي توافق على استخدامها على موقعنا.
              </p>
              
              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#E5EAEB] rounded-full">
                <span className="text-sm text-[#8A9899]">
                  {hasInteracted 
                    ? `آخر تحديث: ${new Date(consent.timestamp).toLocaleDateString('ar-SA')}`
                    : 'لم تحدد تفضيلاتك بعد'
                  }
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="py-6 border-b border-[#E5EAEB] sticky top-0 bg-white z-40 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleAcceptAll}
                className="w-full sm:w-auto px-6 py-3 bg-[#4A8B8E] hover:bg-[#356B6E] text-white font-semibold rounded-lg transition focus:ring-2 focus:ring-[#4A8B8E] focus:outline-none flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>قبول الكل</span>
              </button>

              <button
                onClick={handleRejectNonEssential}
                className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-[#F8FAFB] text-[#4A8B8E] border border-[#4A8B8E] font-semibold rounded-lg transition focus:ring-2 focus:ring-[#4A8B8E] focus:outline-none"
              >
                رفض غير الضروري
              </button>

              {hasChanges && (
                <button
                  onClick={handleSave}
                  className="w-full sm:w-auto px-6 py-3 bg-[#2C5F62] hover:bg-[#1A3B3D] text-white font-semibold rounded-lg transition focus:ring-2 focus:ring-[#2C5F62] focus:outline-none flex items-center justify-center gap-2 animate-pulse"
                >
                  <Save className="w-5 h-5" />
                  <span>حفظ تفضيلاتي</span>
                </button>
              )}

              {showSaved && (
                <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm font-medium">
                  <Check className="w-4 h-4" />
                  <span>تم الحفظ بنجاح</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Cookie Categories */}
        <section className="py-12 md:py-16">
          <div className="max-w-5xl mx-auto px-4 md:px-8">
            <div className="flex flex-col gap-6">
              {COOKIE_CATEGORIES.map((category) => {
                const Icon = getIcon(category.icon);
                const isExpanded = expandedCategories.includes(category.id);
                const isEnabled = localConsent[category.id as keyof typeof localConsent] as boolean;

                return (
                  <div
                    key={category.id}
                    className={`bg-white border-2 rounded-xl overflow-hidden transition-all ${
                      category.required 
                        ? 'border-[#E5EAEB] opacity-90' 
                        : isEnabled 
                          ? 'border-[#4A8B8E]' 
                          : 'border-[#E5EAEB]'
                    }`}
                  >
                    {/* Header */}
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4 flex-1">
                          {/* Icon */}
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                            category.required 
                              ? 'bg-[#E5EAEB]' 
                              : isEnabled 
                                ? 'bg-[#E8F1F1]' 
                                : 'bg-[#F8FAFB]'
                          }`}>
                            <Icon className={`w-6 h-6 ${
                              category.required 
                                ? 'text-[#8A9899]' 
                                : isEnabled 
                                  ? 'text-[#4A8B8E]' 
                                  : 'text-[#5A6B6C]'
                            }`} />
                          </div>

                          {/* Content */}
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-xl font-bold text-[#1A2B2C]">
                                {category.title}
                              </h3>
                              {category.badge && (
                                <span className="px-2 py-0.5 bg-[#E8F1F1] text-[#4A8B8E] text-xs font-medium rounded-full">
                                  {category.badge}
                                </span>
                              )}
                              {category.required && (
                                <Lock className="w-4 h-4 text-[#8A9899]" />
                              )}
                            </div>
                            <p className="text-[#5A6B6C] leading-relaxed">
                              {category.description}
                            </p>
                          </div>
                        </div>

                        {/* Toggle */}
                        <div className="flex-shrink-0">
                          <button
                            onClick={() => !category.required && handleToggle(category.id, !isEnabled)}
                            disabled={category.required}
                            className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#4A8B8E] focus:ring-offset-2 ${
                              category.required
                                ? 'bg-[#E5EAEB] cursor-not-allowed'
                                : isEnabled
                                  ? 'bg-[#4A8B8E]'
                                  : 'bg-[#E5EAEB]'
                            }`}
                            aria-label={`${isEnabled ? 'تعطيل' : 'تفعيل'} ${category.title}`}
                          >
                            <span
                              className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                                isEnabled ? 'translate-x-7' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      </div>

                      {/* Expand Button */}
                      <button
                        onClick={() => toggleCategory(category.id)}
                        className="mt-4 flex items-center gap-2 text-sm text-[#4A8B8E] hover:text-[#356B6E] font-medium transition"
                      >
                        <span>{isExpanded ? 'إخفاء التفاصيل' : 'عرض التفاصيل'}</span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {/* Expanded Details */}
                    {isExpanded && (
                      <div className="border-t border-[#E5EAEB] bg-[#F8FAFB] p-6">
                        {/* Examples */}
                        <div className="mb-6">
                          <h4 className="font-semibold text-[#1A2B2C] mb-3">
                            أمثلة على الكوكيز:
                          </h4>
                          <div className="grid gap-3">
                            {category.examples.map((example, index) => (
                              <div key={index} className="bg-white rounded-lg p-4 border border-[#E5EAEB]">
                                <div className="flex items-start justify-between gap-4 mb-2">
                                  <code className="text-sm font-mono text-[#4A8B8E] font-semibold">
                                    {example.name}
                                  </code>
                                  <span className="text-xs text-[#8A9899] whitespace-nowrap">
                                    {example.duration}
                                  </span>
                                </div>
                                <p className="text-sm text-[#5A6B6C]">
                                  {example.purpose}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Providers */}
                        <div>
                          <h4 className="font-semibold text-[#1A2B2C] mb-3">
                            مزودو الخدمة:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {category.providers.map((provider, index) => (
                              <div key={index} className="flex items-center gap-2">
                                {provider.policyUrl ? (
                                  <a
                                    href={provider.policyUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#E5EAEB] rounded-lg text-sm text-[#5A6B6C] hover:text-[#4A8B8E] hover:border-[#4A8B8E] transition"
                                  >
                                    <span>{provider.name}</span>
                                    <ExternalLink className="w-3 h-3" />
                                  </a>
                                ) : (
                                  <span className="px-3 py-1.5 bg-white border border-[#E5EAEB] rounded-lg text-sm text-[#5A6B6C]">
                                    {provider.name}
                                  </span>
                                )}
                                <span className={`px-2 py-0.5 rounded text-xs ${
                                  provider.type === 'first-party'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-blue-100 text-blue-700'
                                }`}>
                                  {provider.type === 'first-party' ? 'طرف أول' : 'طرف ثالث'}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Information Section */}
        <section className="py-16 bg-[#F8FAFB]">
          <div className="max-w-5xl mx-auto px-4 md:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* What are cookies */}
              <div className="bg-white rounded-xl p-6 border border-[#E5EAEB]">
                <h3 className="text-xl font-bold text-[#1A2B2C] mb-4 flex items-center gap-2">
                  <Cookie className="w-6 h-6 text-[#4A8B8E]" />
                  <span>ما هي ملفات تعريف الارتباط؟</span>
                </h3>
                <p className="text-[#5A6B6C] leading-relaxed mb-3">
                  ملفات تعريف الارتباط (Cookies) هي ملفات نصية صغيرة يتم تخزينها على جهازك عند زيارة المواقع الإلكترونية.
                </p>
                <p className="text-[#5A6B6C] leading-relaxed">
                  تساعد الكوكيز المواقع على تذكر تفضيلاتك، تحسين الأداء، وتوفير تجربة مخصصة لك.
                </p>
              </div>

              {/* How to delete */}
              <div className="bg-white rounded-xl p-6 border border-[#E5EAEB]">
                <h3 className="text-xl font-bold text-[#1A2B2C] mb-4 flex items-center gap-2">
                  <Shield className="w-6 h-6 text-[#4A8B8E]" />
                  <span>كيف تحذف الكوكيز؟</span>
                </h3>
                <p className="text-[#5A6B6C] leading-relaxed mb-3">
                  يمكنك حذف الكوكيز من متصفحك في أي وقت:
                </p>
                <ul className="flex flex-col gap-2">
                  {[
                    { name: 'Chrome', url: 'https://support.google.com/chrome/answer/95647' },
                    { name: 'Safari', url: 'https://support.apple.com/ar-sa/guide/safari/sfri11471/mac' },
                    { name: 'Firefox', url: 'https://support.mozilla.org/ar/kb/clear-cookies-and-site-data-firefox' },
                    { name: 'Edge', url: 'https://support.microsoft.com/ar-sa/microsoft-edge' },
                  ].map((browser) => (
                    <li key={browser.name}>
                      <a
                        href={browser.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[#4A8B8E] hover:text-[#356B6E] flex items-center gap-1"
                      >
                        <span>• {browser.name}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* What happens if you reject */}
            <div className="bg-white rounded-xl p-6 border border-[#E5EAEB] mt-8">
              <h3 className="text-xl font-bold text-[#1A2B2C] mb-4">
                ماذا يحدث إذا رفضت كل الكوكيز؟
              </h3>
              <p className="text-[#5A6B6C] leading-relaxed">
                الموقع سيعمل بشكل طبيعي، لكن بعض الميزات قد لا تعمل بشكل مثالي:
              </p>
              <ul className="mt-3 flex flex-col gap-2">
                <li className="flex items-start gap-2 text-[#5A6B6C]">
                  <span className="text-[#4A8B8E] mt-1">•</span>
                  <span>لن نتمكن من تذكر تفضيلاتك (المدينة، التخصصات المفضلة)</span>
                </li>
                <li className="flex items-start gap-2 text-[#5A6B6C]">
                  <span className="text-[#4A8B8E] mt-1">•</span>
                  <span>لن نستطيع تحسين الموقع بناءً على استخدامك</span>
                </li>
                <li className="flex items-start gap-2 text-[#5A6B6C]">
                  <span className="text-[#4A8B8E] mt-1">•</span>
                  <span>قد تشاهد إعلانات غير ذات صلة على منصات أخرى</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-b from-white to-[#E8F1F1]">
          <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
            <h2 className="text-3xl font-bold text-[#1A2B2C] mb-4">
              هل لديك سؤال عن الكوكيز؟
            </h2>
            <p className="text-lg text-[#5A6B6C] mb-8">
              راجع سياسة الخصوصية الكاملة أو تواصل مع فريقنا
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/ar/privacy-policy"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#4A8B8E] hover:bg-[#356B6E] text-white font-semibold rounded-lg transition focus:ring-2 focus:ring-[#4A8B8E] focus:outline-none"
              >
                <Shield className="w-5 h-5" />
                <span>سياسة الخصوصية</span>
              </a>
              <a
                href="/ar/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-[#F8FAFB] text-[#4A8B8E] border border-[#4A8B8E] font-semibold rounded-lg transition focus:ring-2 focus:ring-[#4A8B8E] focus:outline-none"
              >
                <span>تواصل معنا</span>
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
