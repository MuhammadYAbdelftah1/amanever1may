/**
 * LEGAL REVIEW REQUIRED BEFORE PRODUCTION
 * This refund policy must be reviewed by a Saudi legal advisor
 */

import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Header } from '@/components/layout/header';
import Link from 'next/link';
import { 
  Shield, 
  Download, 
  CheckCircle2,
  AlertTriangle,
  Info,
  XCircle,
  Mail,
  MapPin,
  ChevronRight,
  Ban,
  CreditCard,
  Home,
  Stethoscope,
  Coins,
} from 'lucide-react';
import { REFUND_POLICY_CONTENT } from '@/lib/data/refund-content';

export const metadata: Metadata = {
  title: REFUND_POLICY_CONTENT.meta.title,
  description: REFUND_POLICY_CONTENT.meta.description,
};

interface RefundPolicyPageProps {
  params: Promise<{ locale: string }>;
}

export default async function RefundPolicyPage({ params }: RefundPolicyPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const { hero, sections, decisionTree } = REFUND_POLICY_CONTENT;

  return (
    <>
      <Header locale={locale} />
      
      <main id="main-content" className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-[#E8F1F1] to-white pt-24 pb-12 md:pt-32 md:pb-16">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1A2B2C] mb-4">
                {hero.title}
              </h1>
              <p className="text-lg text-[#5A6B6C] mb-6 leading-relaxed">
                {hero.subtitle}
              </p>
              
              {/* Badges & Info Bar */}
              <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
                {hero.badges.map((badge, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-red-300 rounded-full"
                  >
                    <Info className="w-4 h-4 text-red-500" />
                    <span className="text-sm font-medium text-red-600">{badge.label}</span>
                  </div>
                ))}
              </div>

              {/* Download PDF Button */}
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-[#4A8B8E] hover:bg-[#356B6E] text-white font-semibold rounded-lg transition focus:ring-2 focus:ring-[#4A8B8E] focus:outline-none">
                <Download className="w-5 h-5" />
                <span>تحميل نسخة PDF</span>
              </button>
            </div>
          </div>
        </section>

        {/* Decision Tree Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-[#1A2B2C] mb-3 text-center">
                {decisionTree.title}
              </h2>
              <p className="text-[#5A6B6C] mb-8 text-center">
                {decisionTree.subtitle}
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                {decisionTree.options.map((option) => {
                  const Icon = getOptionIcon(option.icon);
                  const colorClass = option.color === 'red' ? 'border-red-200 bg-red-50' : 'border-gray-200 bg-gray-50';
                  const textColor = option.color === 'red' ? 'text-red-600' : 'text-gray-600';
                  
                  return (
                    <a
                      key={option.id}
                      href={option.link}
                      className={`block p-6 rounded-xl border-2 ${colorClass} hover:shadow-lg transition`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-full ${option.color === 'red' ? 'bg-red-100' : 'bg-gray-100'} flex items-center justify-center flex-shrink-0`}>
                          <Icon className={`w-6 h-6 ${textColor}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-[#1A2B2C] mb-2">
                            {option.title}
                          </h3>
                          <p className={`text-sm font-semibold ${textColor}`}>
                            {option.result}
                          </p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-[#8A9899] flex-shrink-0" />
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 md:py-16 bg-[#F8FAFB]">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Table of Contents - Sticky on Desktop */}
              <aside className="lg:w-80 flex-shrink-0">
                <div className="lg:sticky lg:top-24">
                  <div className="bg-white border border-[#E5EAEB] rounded-xl p-6">
                    <h2 className="text-lg font-bold text-[#1A2B2C] mb-4 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-[#4A8B8E]" />
                      <span>المحتويات</span>
                    </h2>
                    <nav>
                      <ul className="flex flex-col gap-2">
                        {sections.map((section) => (
                          <li key={section.id}>
                            <a
                              href={`#${section.id}`}
                              className="flex items-start gap-2 text-sm text-[#5A6B6C] hover:text-[#4A8B8E] hover:bg-[#F8FAFB] p-2 rounded-lg transition group"
                            >
                              <span className="text-[#4A8B8E] font-semibold flex-shrink-0">
                                {section.number}.
                              </span>
                              <span className="flex-1">{section.title}</span>
                              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition flex-shrink-0" />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>
                </div>
              </aside>

              {/* Content Sections */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col gap-8">
                  {sections.map((section) => (
                    <article
                      key={section.id}
                      id={section.id}
                      className="bg-white border border-[#E5EAEB] rounded-xl p-6 md:p-8 scroll-mt-24"
                    >
                      <h2 className="text-2xl font-bold text-[#1A2B2C] mb-6 flex items-start gap-3">
                        <span className="text-[#4A8B8E]">{section.number}.</span>
                        <span>{section.title}</span>
                      </h2>

                      <div className="flex flex-col gap-4">
                        {section.content.map((block, blockIndex) => (
                          <div key={blockIndex}>
                            {/* Paragraph */}
                            {block.type === 'paragraph' && (
                              <p className="text-[#5A6B6C] leading-relaxed">
                                {block.text}
                              </p>
                            )}

                            {/* List */}
                            {block.type === 'list' && (
                              <ul className="flex flex-col gap-2">
                                {block.items?.map((item, i) => (
                                  <li key={i} className="flex items-start gap-2 text-[#5A6B6C]">
                                    <span className="text-[#4A8B8E] mt-1">•</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            )}

                            {/* Alert */}
                            {block.type === 'alert' && block.alert && (
                              <AlertBox alert={block.alert} />
                            )}
                          </div>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-b from-white to-[#E8F1F1]">
          <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
            <h2 className="text-3xl font-bold text-[#1A2B2C] mb-4">
              هل لديك استفسار؟
            </h2>
            <p className="text-lg text-[#5A6B6C] mb-8">
              تواصل معنا للحصول على المساعدة
            </p>
            
            {/* Contact Button */}
            <div className="mb-6">
              <Link
                href="/ar/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#4A8B8E] hover:bg-[#356B6E] text-white font-semibold rounded-lg transition focus:ring-2 focus:ring-[#4A8B8E] focus:outline-none"
              >
                <Mail className="w-5 h-5" />
                <span>تواصل معنا</span>
              </Link>
            </div>

            {/* Related Links */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <span className="text-sm text-[#8A9899]">اقرأ أيضاً:</span>
              <Link
                href="/ar/terms-of-use"
                className="text-sm text-[#4A8B8E] hover:text-[#356B6E] font-medium transition underline"
              >
                شروط الاستخدام
              </Link>
              <Link
                href="/ar/privacy-policy"
                className="text-sm text-[#4A8B8E] hover:text-[#356B6E] font-medium transition underline"
              >
                سياسة الخصوصية
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

// Alert Box Component
function AlertBox({ alert }: { alert: { type: string; text: string } }) {
  const config = {
    warning: {
      icon: AlertTriangle,
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-800',
      iconColor: 'text-yellow-600',
    },
    info: {
      icon: Info,
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      iconColor: 'text-blue-600',
    },
    success: {
      icon: CheckCircle2,
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      iconColor: 'text-green-600',
    },
    error: {
      icon: XCircle,
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      iconColor: 'text-red-600',
    },
  };

  const style = config[alert.type as keyof typeof config] || config.info;
  const Icon = style.icon;

  return (
    <div className={`flex items-start gap-3 p-4 rounded-lg border ${style.bg} ${style.border} mt-4`}>
      <Icon className={`w-5 h-5 ${style.iconColor} flex-shrink-0 mt-0.5`} />
      <p className={`text-sm ${style.text}`}>{alert.text}</p>
    </div>
  );
}

// Get Option Icon
function getOptionIcon(iconName: string) {
  const icons: Record<string, any> = {
    card: CreditCard,
    stethoscope: Stethoscope,
    home: Home,
    coins: Coins,
  };
  return icons[iconName] || Ban;
}
