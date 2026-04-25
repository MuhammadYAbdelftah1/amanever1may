/**
 * LEGAL REVIEW REQUIRED BEFORE PRODUCTION
 * This terms of use must be reviewed by a Saudi legal advisor specialized in:
 * - Saudi E-Commerce Law
 * - Anti-Financial Fraud Law
 * - Ministry of Health regulations for digital health services
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
  Scale,
  AlertCircle,
  Ban,
} from 'lucide-react';
import { TERMS_OF_USE_CONTENT } from '@/lib/data/terms-content';

export const metadata: Metadata = {
  title: TERMS_OF_USE_CONTENT.meta.title,
  description: TERMS_OF_USE_CONTENT.meta.description,
};

interface TermsOfUsePageProps {
  params: Promise<{ locale: string }>;
}

export default async function TermsOfUsePage({ params }: TermsOfUsePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const { hero, sections, cta } = TERMS_OF_USE_CONTENT;

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
              
              {/* Info Bar */}
              <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
                <div className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E5EAEB] rounded-full">
                  <span className="text-sm text-[#8A9899]">
                    آخر تحديث: {TERMS_OF_USE_CONTENT.meta.lastUpdated}
                  </span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E5EAEB] rounded-full">
                  <span className="text-sm text-[#8A9899]">
                    الإصدار: {TERMS_OF_USE_CONTENT.meta.version}
                  </span>
                </div>
              </div>

              {/* Download PDF Button */}
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-[#4A8B8E] hover:bg-[#356B6E] text-white font-semibold rounded-lg transition focus:ring-2 focus:ring-[#4A8B8E] focus:outline-none">
                <Download className="w-5 h-5" />
                <span>تحميل نسخة PDF</span>
              </button>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Table of Contents - Sticky on Desktop */}
              <aside className="lg:w-80 flex-shrink-0">
                <div className="lg:sticky lg:top-24">
                  <div className="bg-white border border-[#E5EAEB] rounded-xl p-6">
                    <h2 className="text-lg font-bold text-[#1A2B2C] mb-4 flex items-center gap-2">
                      <Scale className="w-5 h-5 text-[#4A8B8E]" />
                      <span>المحتويات</span>
                    </h2>
                    <nav>
                      <ul className="flex flex-col gap-2">
                        {sections.map((section) => (
                          <li key={section.id}>
                            <a
                              href={`#${section.id}`}
                              className={`flex items-start gap-2 text-sm p-2 rounded-lg transition group ${
                                section.critical
                                  ? 'text-[#F59E0B] hover:bg-[#FEF3C7] font-medium'
                                  : 'text-[#5A6B6C] hover:text-[#4A8B8E] hover:bg-[#F8FAFB]'
                              }`}
                            >
                              <span className={`font-semibold flex-shrink-0 ${
                                section.critical ? 'text-[#F59E0B]' : 'text-[#4A8B8E]'
                              }`}>
                                {section.number}.
                              </span>
                              <span className="flex-1">{section.title}</span>
                              {section.critical && (
                                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                              )}
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
                      className={`border rounded-xl p-6 md:p-8 scroll-mt-24 ${
                        section.critical
                          ? 'bg-[#FEF3C7] border-[#F59E0B]/30'
                          : 'bg-[#F8FAFB] border-[#E5EAEB]'
                      }`}
                    >
                      <h2 className="text-2xl font-bold text-[#1A2B2C] mb-6 flex items-start gap-3">
                        <span className={section.critical ? 'text-[#F59E0B]' : 'text-[#4A8B8E]'}>
                          {section.number}.
                        </span>
                        <span className="flex-1">{section.title}</span>
                        {section.critical && (
                          <AlertTriangle className="w-6 h-6 text-[#F59E0B] flex-shrink-0" />
                        )}
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

                            {/* Important Box */}
                            {block.type === 'important-box' && (
                              <div className="bg-white rounded-lg p-5 border-2 border-[#4A8B8E]">
                                <h4 className="font-semibold text-[#1A2B2C] mb-3 flex items-center gap-2">
                                  <AlertCircle className="w-5 h-5 text-[#4A8B8E]" />
                                  {block.title}
                                </h4>
                                <ul className="flex flex-col gap-2">
                                  {block.items?.map((item, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-[#5A6B6C]">
                                      <span className="text-[#4A8B8E] mt-1">•</span>
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* Critical Notice */}
                            {block.type === 'critical-notice' && (
                              <div className="bg-white rounded-lg p-6 border-2 border-[#F59E0B]">
                                <h4 className="font-bold text-[#1A2B2C] mb-4 flex items-center gap-2 text-lg">
                                  <AlertTriangle className="w-6 h-6 text-[#F59E0B]" />
                                  {block.title}
                                </h4>
                                <ul className="flex flex-col gap-3">
                                  {block.items?.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-[#5A6B6C]">
                                      <span className="text-[#F59E0B] mt-1 text-lg">•</span>
                                      <span dangerouslySetInnerHTML={{ __html: item }} />
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* Definitions */}
                            {block.type === 'definitions' && (
                              <dl className="grid gap-4">
                                {block.items?.map((item, i) => (
                                  <div key={i} className="bg-white rounded-lg p-4 border border-[#E5EAEB]">
                                    <dt className="font-semibold text-[#1A2B2C] mb-1">
                                      {item.term}
                                    </dt>
                                    <dd className="text-sm text-[#5A6B6C]">
                                      {item.definition}
                                    </dd>
                                  </div>
                                ))}
                              </dl>
                            )}

                            {/* Subsection */}
                            {block.type === 'subsection' && (
                              <div className="mt-4">
                                <h3 className="text-lg font-semibold text-[#1A2B2C] mb-3">
                                  {block.title}
                                </h3>
                                <ul className="flex flex-col gap-2">
                                  {block.items?.map((item, i) => (
                                    <li key={i} className="flex items-start gap-2 text-[#5A6B6C]">
                                      <span className="text-[#4A8B8E] mt-1">•</span>
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                                {block.note && (
                                  <p className="mt-3 text-sm text-[#8A9899] italic">
                                    💡 {block.note}
                                  </p>
                                )}
                              </div>
                            )}

                            {/* List */}
                            {block.type === 'list' && (
                              <ul className="flex flex-col gap-2">
                                {block.items?.map((item, i) => (
                                  <li key={i} className="flex items-start gap-2 text-[#5A6B6C]">
                                    <span className="text-[#4A8B8E] mt-1">•</span>
                                    <span dangerouslySetInnerHTML={{ __html: item }} />
                                  </li>
                                ))}
                              </ul>
                            )}

                            {/* Prohibited List */}
                            {block.type === 'prohibited-list' && (
                              <div className="grid gap-4">
                                {block.items?.map((item, i) => (
                                  <div key={i} className="bg-white rounded-lg p-4 border border-red-200">
                                    <h4 className="font-semibold text-[#1A2B2C] mb-2 flex items-center gap-2">
                                      <Ban className="w-5 h-5 text-red-500" />
                                      {item.title}
                                    </h4>
                                    <p className="text-sm text-[#5A6B6C]">
                                      {item.description}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Liability List */}
                            {block.type === 'liability-list' && (
                              <div className="grid gap-4">
                                {block.items?.map((item, i) => (
                                  <div key={i} className="bg-white rounded-lg p-4 border border-[#E5EAEB]">
                                    <h4 className="font-semibold text-[#1A2B2C] mb-2 flex items-center gap-2">
                                      <Scale className="w-5 h-5 text-[#4A8B8E]" />
                                      {item.title}
                                    </h4>
                                    <p className="text-sm text-[#5A6B6C]">
                                      {item.description}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Contact Info */}
                            {block.type === 'contact-info' && block.legal && (
                              <div className="bg-white rounded-lg p-6 border border-[#E5EAEB]">
                                <h4 className="font-semibold text-[#1A2B2C] mb-4">
                                  {block.legal.title}
                                </h4>
                                <div className="flex flex-col gap-3">
                                  <a href={`mailto:${block.legal.email}`} className="flex items-center gap-3 text-[#5A6B6C] hover:text-[#4A8B8E] transition">
                                    <Mail className="w-5 h-5 text-[#4A8B8E]" />
                                    <span>{block.legal.email}</span>
                                  </a>
                                  <div className="flex items-start gap-3 text-[#5A6B6C]">
                                    <MapPin className="w-5 h-5 text-[#4A8B8E] flex-shrink-0 mt-0.5" />
                                    <div>
                                      <p>{block.legal.address}</p>
                                      <p className="text-sm text-[#8A9899] mt-1">
                                        سجل تجاري: {block.legal.cr}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Alert */}
                            {block.alert && <AlertBox alert={block.alert} />}
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
              {cta.title}
            </h2>
            <p className="text-lg text-[#5A6B6C] mb-8">
              {cta.subtitle}
            </p>
            
            {/* Primary Button */}
            <div className="mb-6">
              {cta.buttons.map((button, index) => (
                <a
                  key={index}
                  href={button.href}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#4A8B8E] hover:bg-[#356B6E] text-white font-semibold rounded-lg transition focus:ring-2 focus:ring-[#4A8B8E] focus:outline-none"
                >
                  <Mail className="w-5 h-5" />
                  <span>{button.label}</span>
                </a>
              ))}
            </div>

            {/* Related Links */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <span className="text-sm text-[#8A9899]">اقرأ أيضاً:</span>
              {cta.links.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-sm text-[#4A8B8E] hover:text-[#356B6E] font-medium transition underline"
                >
                  {link.label}
                </Link>
              ))}
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
