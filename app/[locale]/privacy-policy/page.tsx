/**
 * LEGAL REVIEW REQUIRED BEFORE PRODUCTION
 * This privacy policy must be reviewed by a Saudi legal advisor specialized in PDPL
 */

import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Header } from '@/components/layout/header';
import { 
  Shield, 
  Download, 
  CheckCircle2, 
  Server, 
  Lock, 
  Eye, 
  AlertTriangle,
  Info,
  XCircle,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { PRIVACY_POLICY_CONTENT } from '@/lib/data/privacy-content';

export const metadata: Metadata = {
  title: PRIVACY_POLICY_CONTENT.meta.title,
  description: PRIVACY_POLICY_CONTENT.meta.description,
};

interface PrivacyPolicyPageProps {
  params: Promise<{ locale: string }>;
}

export default async function PrivacyPolicyPage({ params }: PrivacyPolicyPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const { hero, sections, cta } = PRIVACY_POLICY_CONTENT;

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
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-[#4A8B8E]/30 rounded-full"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#4A8B8E]" />
                    <span className="text-sm font-medium text-[#4A8B8E]">{badge.label}</span>
                  </div>
                ))}
                <div className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E5EAEB] rounded-full">
                  <span className="text-sm text-[#8A9899]">
                    آخر تحديث: {PRIVACY_POLICY_CONTENT.meta.lastUpdated}
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
                      className="bg-[#F8FAFB] border border-[#E5EAEB] rounded-xl p-6 md:p-8 scroll-mt-24"
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
                                {'note' in block && block.note && (
                                  <p className="mt-3 text-sm text-[#8A9899] italic">
                                    {block.note}
                                  </p>
                                )}
                                {'alert' in block && block.alert && <AlertBox alert={block.alert} />}
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

                            {/* Rights */}
                            {block.type === 'rights' && (
                              <div className="grid gap-4">
                                {block.items?.map((right, i) => (
                                  <div key={i} className="bg-white rounded-lg p-4 border border-[#E5EAEB]">
                                    <h4 className="font-semibold text-[#1A2B2C] mb-2 flex items-center gap-2">
                                      <CheckCircle2 className="w-5 h-5 text-[#4A8B8E]" />
                                      {right.title}
                                    </h4>
                                    <p className="text-sm text-[#5A6B6C] mb-2">
                                      {right.description}
                                    </p>
                                    <p className="text-xs text-[#4A8B8E] font-medium">
                                      كيفية الاستفادة: {right.action}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Security Measures */}
                            {block.type === 'security-measures' && (
                              <div className="grid md:grid-cols-2 gap-4">
                                {block.items?.map((measure, i) => {
                                  const Icon = getSecurityIcon(measure.icon);
                                  return (
                                    <div key={i} className="bg-white rounded-lg p-4 border border-[#E5EAEB]">
                                      <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-full bg-[#E8F1F1] flex items-center justify-center flex-shrink-0">
                                          <Icon className="w-5 h-5 text-[#4A8B8E]" />
                                        </div>
                                        <div className="flex-1">
                                          <h4 className="font-semibold text-[#1A2B2C] mb-1 text-sm">
                                            {measure.title}
                                          </h4>
                                          <p className="text-xs text-[#5A6B6C]">
                                            {measure.description}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            )}

                            {/* Table */}
                            {block.type === 'table' && (
                              <div className="overflow-x-auto">
                                <table className="w-full bg-white rounded-lg border border-[#E5EAEB]">
                                  <thead>
                                    <tr className="bg-[#F8FAFB]">
                                      {block.headers?.map((header, i) => (
                                        <th key={i} className="px-4 py-3 text-right text-sm font-semibold text-[#1A2B2C] border-b border-[#E5EAEB]">
                                          {header}
                                        </th>
                                      ))}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {block.rows?.map((row, i) => (
                                      <tr key={i} className="border-b border-[#E5EAEB] last:border-0">
                                        {row.map((cell, j) => (
                                          <td key={j} className="px-4 py-3 text-sm text-[#5A6B6C]">
                                            {cell}
                                          </td>
                                        ))}
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            )}

                            {/* Contact Info */}
                            {block.type === 'contact-info' && block.dpo && (
                              <div className="bg-white rounded-lg p-6 border border-[#E5EAEB]">
                                <h4 className="font-semibold text-[#1A2B2C] mb-4">
                                  {block.dpo.title}
                                </h4>
                                <div className="flex flex-col gap-3">
                                  <a href={`mailto:${block.dpo.email}`} className="flex items-center gap-3 text-[#5A6B6C] hover:text-[#4A8B8E] transition">
                                    <Mail className="w-5 h-5 text-[#4A8B8E]" />
                                    <span>{block.dpo.email}</span>
                                  </a>
                                  <a href={`tel:${block.dpo.phone}`} className="flex items-center gap-3 text-[#5A6B6C] hover:text-[#4A8B8E] transition">
                                    <Phone className="w-5 h-5 text-[#4A8B8E]" />
                                    <span>{block.dpo.phone}</span>
                                  </a>
                                  <div className="flex items-start gap-3 text-[#5A6B6C]">
                                    <MapPin className="w-5 h-5 text-[#4A8B8E] flex-shrink-0 mt-0.5" />
                                    <span>{block.dpo.address}</span>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Authority */}
                            {block.type === 'authority' && (
                              <div className="bg-white rounded-lg p-6 border border-[#E5EAEB]">
                                <h4 className="font-semibold text-[#1A2B2C] mb-3">
                                  {block.name}
                                </h4>
                                <div className="flex flex-col gap-2">
                                  <a 
                                    href={block.website} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-[#4A8B8E] hover:text-[#356B6E] transition"
                                  >
                                    <ExternalLink className="w-4 h-4" />
                                    <span>{block.website}</span>
                                  </a>
                                  <a 
                                    href={block.complaintUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#4A8B8E] hover:bg-[#356B6E] text-white text-sm font-semibold rounded-lg transition w-fit"
                                  >
                                    <span>تقديم شكوى</span>
                                    <ExternalLink className="w-4 h-4" />
                                  </a>
                                </div>
                              </div>
                            )}

                            {/* Deletion Form */}
                            {block.type === 'deletion-form' && (
                              <div className="bg-white rounded-xl p-6 border-2 border-red-200">
                                <h4 className="text-xl font-bold text-[#1A2B2C] mb-2 flex items-center gap-2">
                                  <XCircle className="w-6 h-6 text-red-500" />
                                  {block.title}
                                </h4>
                                <p className="text-sm text-[#5A6B6C] mb-6">{block.description}</p>
                                
                                <form className="flex flex-col gap-5">
                                  {block.fields?.map((field: any, i: number) => (
                                    <div key={i}>
                                      <label className="block text-sm font-semibold text-[#1A2B2C] mb-2">
                                        {field.label}
                                        {field.required && <span className="text-red-500 mr-1">*</span>}
                                      </label>
                                      
                                      {field.type === 'email' && (
                                        <input
                                          type="email"
                                          id={field.id}
                                          required={field.required}
                                          placeholder={field.placeholder}
                                          className="w-full px-4 py-3 border border-[#E5EAEB] rounded-lg focus:ring-2 focus:ring-[#4A8B8E] focus:border-transparent outline-none transition"
                                        />
                                      )}
                                      
                                      {field.type === 'tel' && (
                                        <input
                                          type="tel"
                                          id={field.id}
                                          required={field.required}
                                          placeholder={field.placeholder}
                                          className="w-full px-4 py-3 border border-[#E5EAEB] rounded-lg focus:ring-2 focus:ring-[#4A8B8E] focus:border-transparent outline-none transition"
                                        />
                                      )}
                                      
                                      {field.type === 'select' && (
                                        <select
                                          id={field.id}
                                          required={field.required}
                                          className="w-full px-4 py-3 border border-[#E5EAEB] rounded-lg focus:ring-2 focus:ring-[#4A8B8E] focus:border-transparent outline-none transition bg-white"
                                        >
                                          <option value="">اختر...</option>
                                          {field.options?.map((option: string, j: number) => (
                                            <option key={j} value={option}>{option}</option>
                                          ))}
                                        </select>
                                      )}
                                      
                                      {field.type === 'textarea' && (
                                        <textarea
                                          id={field.id}
                                          required={field.required}
                                          placeholder={field.placeholder}
                                          rows={4}
                                          className="w-full px-4 py-3 border border-[#E5EAEB] rounded-lg focus:ring-2 focus:ring-[#4A8B8E] focus:border-transparent outline-none transition resize-none"
                                        />
                                      )}
                                      
                                      {field.type === 'checkbox' && (
                                        <label className="flex items-start gap-3 cursor-pointer">
                                          <input
                                            type="checkbox"
                                            id={field.id}
                                            required={field.required}
                                            className="mt-1 w-5 h-5 text-[#4A8B8E] border-[#E5EAEB] rounded focus:ring-2 focus:ring-[#4A8B8E]"
                                          />
                                          <span className="text-sm text-[#5A6B6C]">{field.label}</span>
                                        </label>
                                      )}
                                    </div>
                                  ))}
                                  
                                  <button
                                    type="submit"
                                    className="w-full px-6 py-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition focus:ring-2 focus:ring-red-500 focus:outline-none"
                                  >
                                    {block.submitButton}
                                  </button>
                                  
                                  <p className="text-xs text-center text-[#8A9899]">
                                    {block.processingTime}
                                  </p>
                                </form>
                              </div>
                            )}

                            {/* CTA Link */}
                            {block.type === 'cta' && (
                              <a 
                                href={block.link} 
                                className="inline-flex items-center gap-2 text-[#4A8B8E] hover:text-[#356B6E] font-medium transition"
                              >
                                <span>{block.text}</span>
                                <ChevronRight className="w-4 h-4" />
                              </a>
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
              {cta.title}
            </h2>
            <p className="text-lg text-[#5A6B6C] mb-8">
              {cta.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {cta.buttons.map((button, index) => (
                <a
                  key={index}
                  href={button.href}
                  className={`inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold rounded-lg transition focus:ring-2 focus:outline-none ${
                    button.variant === 'primary'
                      ? 'bg-[#4A8B8E] hover:bg-[#356B6E] text-white focus:ring-[#4A8B8E]'
                      : 'bg-white hover:bg-[#F8FAFB] text-[#4A8B8E] border border-[#4A8B8E] focus:ring-[#4A8B8E]'
                  }`}
                >
                  {button.variant === 'primary' ? (
                    <Mail className="w-5 h-5" />
                  ) : (
                    <XCircle className="w-5 h-5" />
                  )}
                  <span>{button.label}</span>
                </a>
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

// Get Security Icon
function getSecurityIcon(iconName: string) {
  const icons: Record<string, any> = {
    shield: Shield,
    server: Server,
    lock: Lock,
    eye: Eye,
    check: CheckCircle2,
  };
  return icons[iconName] || Shield;
}
