/**
 * LEGAL REVIEW REQUIRED BEFORE PRODUCTION
 * This refund policy must be reviewed by a Saudi legal advisor specialized in:
 * - Saudi E-Commerce Law
 * - Consumer Protection Law
 */

import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Header } from '@/components/layout/header';
import Link from 'next/link';
import { 
  Shield, 
  Clock,
  CheckCircle2,
  AlertTriangle,
  Info,
  XCircle,
  ChevronRight,
  Ban,
  ExternalLink,
  Mail,
  AlertCircle,
} from 'lucide-react';
import { REFUND_POLICY_CONTENT } from '@/lib/data/refund-content';
import { RefundDecisionTree } from '@/components/refund/RefundDecisionTree';

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

  const { hero, decisionTree, sections, cta } = REFUND_POLICY_CONTENT;

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
              
              {/* Badges */}
              <div className="flex flex-wrap items-center justify-center gap-4">
                {hero.badges.map((badge, index) => {
                  const Icon = badge.icon === 'clock' ? Clock : Shield;
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-4 py-2 bg-white border border-[#4A8B8E]/30 rounded-full"
                    >
                      <Icon className="w-4 h-4 text-[#4A8B8E]" />
                      <span className="text-sm font-medium text-[#4A8B8E]">{badge.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Decision Tree Section */}
        <section className="py-8 md:py-12">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <RefundDecisionTree
              title={decisionTree.title}
              subtitle={decisionTree.subtitle}
              options={decisionTree.options}
            />
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
                              className={`flex items-start gap-2 text-sm p-2 rounded-lg transition group ${
                                section.exceptional
                                  ? 'text-[#F59E0B] hover:bg-[#FEF3C7]/40 font-medium'
                                  : 'text-[#5A6B6C] hover:text-[#4A8B8E] hover:bg-[#F8FAFB]'
                              }`}
                            >
                              <span className={`font-semibold flex-shrink-0 ${
                                section.exceptional ? 'text-[#F59E0B]' : 'text-[#4A8B8E]'
                              }`}>
                                {section.number}.
                              </span>
                              <span className="flex-1">{section.title}</span>
                              {section.exceptional && (
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
                        section.exceptional
                          ? 'bg-[#FEF3C7]/40 border-[#F59E0B]/20'
                          : 'bg-[#F8FAFB] border-[#E5EAEB]'
                      }`}
                    >
                      <h2 className="text-2xl font-bold text-[#1A2B2C] mb-6 flex items-start gap-3">
                        <span className={section.exceptional ? 'text-[#F59E0B]' : 'text-[#4A8B8E]'}>
                          {section.number}.
                        </span>
                        <span className="flex-1">{section.title}</span>
                        {section.exceptional && (
                          <AlertTriangle className="w-6 h-6 text-[#F59E0B] flex-shrink-0" />
                        )}
                      </h2>

                      <div className="flex flex-col gap-4">
                        {section.content.map((block, blockIndex) => (
                          <ContentBlock key={blockIndex} block={block} />
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
                <Link
                  key={index}
                  href={button.href}
                  className={`inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold rounded-lg transition focus:ring-2 focus:outline-none ${
                    button.variant === 'primary'
                      ? 'bg-[#4A8B8E] hover:bg-[#356B6E] text-white focus:ring-[#4A8B8E]'
                      : 'bg-white hover:bg-[#F8FAFB] text-[#4A8B8E] border border-[#4A8B8E] focus:ring-[#4A8B8E]'
                  }`}
                >
                  <span>{button.label}</span>
                  <ChevronRight className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

// Content Block Component
function ContentBlock({ block }: { block: any }) {
  return (
    <>
      {/* Paragraph */}
      {block.type === 'paragraph' && (
        <p className="text-[#5A6B6C] leading-relaxed" dangerouslySetInnerHTML={{ __html: block.text }} />
      )}

      {/* Highlight Box */}
      {block.type === 'highlight-box' && (
        <div className="bg-white rounded-lg p-5 border-2 border-[#4A8B8E]">
          <h4 className="font-semibold text-[#1A2B2C] mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#4A8B8E]" />
            {block.title}
          </h4>
          <ul className="flex flex-col gap-2">
            {block.items?.map((item: string, i: number) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[#5A6B6C]">
                <span className="text-[#4A8B8E] mt-1">•</span>
                <span dangerouslySetInnerHTML={{ __html: item }} />
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Subsection */}
      {block.type === 'subsection' && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-[#1A2B2C] mb-2">
            {block.title}
          </h3>
          {block.description && (
            <p className="text-[#5A6B6C] mb-3">{block.description}</p>
          )}
          {block.items && (
            <ul className="flex flex-col gap-2">
              {block.items.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-[#5A6B6C]">
                  <span className="text-[#4A8B8E] mt-1">•</span>
                  <span dangerouslySetInnerHTML={{ __html: item }} />
                </li>
              ))}
            </ul>
          )}
          {block.formula && (
            <div className="bg-white rounded-lg p-4 border border-[#E5EAEB] mt-3">
              <p className="text-sm font-mono text-[#1A2B2C]">{block.formula}</p>
            </div>
          )}
          {block.example && (
            <div className="bg-[#E8F1F1] rounded-lg p-4 mt-3">
              <p className="font-semibold text-[#1A2B2C] mb-2">{block.example.title}</p>
              <p className="text-sm text-[#5A6B6C] whitespace-pre-line">{block.example.text}</p>
            </div>
          )}
          {block.alert && <AlertBox alert={block.alert} />}
        </div>
      )}

      {/* Refund Timeline */}
      {block.type === 'refund-timeline' && (
        <div className="grid gap-4">
          {block.items?.map((item: any, i: number) => {
            const colorClasses = {
              green: 'bg-green-50 border-green-200',
              red: 'bg-red-50 border-red-200',
            };
            return (
              <div key={i} className={`rounded-lg p-4 border ${colorClasses[item.color as keyof typeof colorClasses]}`}>
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h4 className="font-semibold text-[#1A2B2C]">{item.stage}</h4>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                    item.color === 'green' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                  }`}>
                    {item.refund}
                  </span>
                </div>
                <p className="text-sm text-[#5A6B6C]">{item.condition}</p>
              </div>
            );
          })}
        </div>
      )}

      {/* Cancellation Table */}
      {block.type === 'cancellation-table' && (
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg border border-[#E5EAEB]">
            <thead>
              <tr className="bg-[#F8FAFB]">
                <th className="px-4 py-3 text-right text-sm font-semibold text-[#1A2B2C] border-b border-[#E5EAEB]">
                  وقت الإلغاء
                </th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-[#1A2B2C] border-b border-[#E5EAEB]">
                  نسبة الاسترداد
                </th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-[#1A2B2C] border-b border-[#E5EAEB]">
                  الرسوم
                </th>
              </tr>
            </thead>
            <tbody>
              {block.rows?.map((row: any, i: number) => (
                <tr key={i} className="border-b border-[#E5EAEB] last:border-0 hover:bg-[#F8FAFB]">
                  <td className="px-4 py-3 text-sm text-[#5A6B6C]">{row.timing}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                      row.color === 'green' ? 'bg-green-100 text-green-700' :
                      row.color === 'yellow' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {row.refund}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-[#5A6B6C]">{row.fee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Exceptional List */}
      {block.type === 'exceptional-list' && (
        <div className="grid gap-4">
          {block.items?.map((item: any, i: number) => (
            <div key={i} className="bg-white rounded-lg p-5 border-2 border-[#F59E0B]/30">
              <h4 className="font-semibold text-[#1A2B2C] mb-2 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-[#F59E0B]" />
                {item.title}
              </h4>
              <p className="text-sm text-[#5A6B6C] mb-2">{item.description}</p>
              <p className="text-xs text-[#4A8B8E] font-medium">
                الإجراء: {item.action}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Steps */}
      {block.type === 'steps' && (
        <div className="grid gap-4">
          {block.items?.map((step: any, i: number) => (
            <div key={i} className="flex gap-4 bg-white rounded-lg p-4 border border-[#E5EAEB]">
              <div className="w-10 h-10 rounded-full bg-[#4A8B8E] text-white flex items-center justify-center font-bold flex-shrink-0">
                {step.number}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-[#1A2B2C] mb-1">{step.title}</h4>
                <p className="text-sm text-[#5A6B6C]">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Payment Table */}
      {block.type === 'payment-table' && (
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg border border-[#E5EAEB]">
            <thead>
              <tr className="bg-[#F8FAFB]">
                {block.headers?.map((header: string, i: number) => (
                  <th key={i} className="px-4 py-3 text-right text-sm font-semibold text-[#1A2B2C] border-b border-[#E5EAEB]">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows?.map((row: string[], i: number) => (
                <tr key={i} className="border-b border-[#E5EAEB] last:border-0 hover:bg-[#F8FAFB]">
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

      {/* Non-Refundable List */}
      {block.type === 'non-refundable-list' && (
        <div className="grid gap-4">
          {block.items?.map((item: any, i: number) => (
            <div key={i} className="bg-white rounded-lg p-4 border border-red-200">
              <h4 className="font-semibold text-[#1A2B2C] mb-2 flex items-center gap-2">
                <Ban className="w-5 h-5 text-red-500" />
                {item.title}
              </h4>
              <p className="text-sm text-[#5A6B6C]">{item.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Complaint Options */}
      {block.type === 'complaint-options' && (
        <div className="grid gap-4">
          {block.items?.map((item: any, i: number) => (
            <div key={i} className="bg-white rounded-lg p-5 border border-[#E5EAEB]">
              <h4 className="font-semibold text-[#1A2B2C] mb-3">{item.title}</h4>
              {item.email && (
                <a href={`mailto:${item.email}`} className="flex items-center gap-2 text-[#4A8B8E] hover:text-[#356B6E] transition mb-2">
                  <Mail className="w-5 h-5" />
                  <span>{item.email}</span>
                </a>
              )}
              {item.authority && (
                <p className="text-sm text-[#5A6B6C] mb-2">
                  <strong>{item.authority}</strong>
                </p>
              )}
              <p className="text-sm text-[#5A6B6C] mb-3">{item.description}</p>
              {item.url && (
                <a 
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-[#4A8B8E] hover:text-[#356B6E] font-medium"
                >
                  <span>زيارة الموقع</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Refund Form */}
      {block.type === 'refund-form' && (
        <div className="bg-white rounded-xl p-6 md:p-8 border-2 border-[#4A8B8E]">
          <h4 className="text-xl font-bold text-[#1A2B2C] mb-2 flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-[#4A8B8E]" />
            {block.title}
          </h4>
          <p className="text-sm text-[#5A6B6C] mb-6">{block.description}</p>
          
          <form className="flex flex-col gap-5">
            {block.fields?.map((field: any, i: number) => (
              <div key={i}>
                {field.type !== 'checkbox' && (
                  <label className="block text-sm font-semibold text-[#1A2B2C] mb-2">
                    {field.label}
                    {field.required && <span className="text-red-500 mr-1">*</span>}
                  </label>
                )}
                
                {field.type === 'email' && (
                  <>
                    <input
                      type="email"
                      id={field.id}
                      required={field.required}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3 border border-[#E5EAEB] rounded-lg focus:ring-2 focus:ring-[#4A8B8E] focus:border-transparent outline-none transition"
                    />
                    {field.helpText && (
                      <p className="text-xs text-[#8A9899] mt-1">{field.helpText}</p>
                    )}
                  </>
                )}
                
                {field.type === 'tel' && (
                  <>
                    <input
                      type="tel"
                      id={field.id}
                      required={field.required}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3 border border-[#E5EAEB] rounded-lg focus:ring-2 focus:ring-[#4A8B8E] focus:border-transparent outline-none transition"
                    />
                    {field.helpText && (
                      <p className="text-xs text-[#8A9899] mt-1">{field.helpText}</p>
                    )}
                  </>
                )}
                
                {field.type === 'text' && (
                  <>
                    <input
                      type="text"
                      id={field.id}
                      required={field.required}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3 border border-[#E5EAEB] rounded-lg focus:ring-2 focus:ring-[#4A8B8E] focus:border-transparent outline-none transition"
                    />
                    {field.helpText && (
                      <p className="text-xs text-[#8A9899] mt-1">{field.helpText}</p>
                    )}
                  </>
                )}
                
                {field.type === 'number' && (
                  <>
                    <input
                      type="number"
                      id={field.id}
                      required={field.required}
                      placeholder={field.placeholder}
                      step="0.01"
                      min="0"
                      className="w-full px-4 py-3 border border-[#E5EAEB] rounded-lg focus:ring-2 focus:ring-[#4A8B8E] focus:border-transparent outline-none transition"
                    />
                    {field.helpText && (
                      <p className="text-xs text-[#8A9899] mt-1">{field.helpText}</p>
                    )}
                  </>
                )}
                
                {field.type === 'date' && (
                  <>
                    <input
                      type="date"
                      id={field.id}
                      required={field.required}
                      className="w-full px-4 py-3 border border-[#E5EAEB] rounded-lg focus:ring-2 focus:ring-[#4A8B8E] focus:border-transparent outline-none transition"
                    />
                    {field.helpText && (
                      <p className="text-xs text-[#8A9899] mt-1">{field.helpText}</p>
                    )}
                  </>
                )}
                
                {field.type === 'select' && (
                  <>
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
                    {field.helpText && (
                      <p className="text-xs text-[#8A9899] mt-1">{field.helpText}</p>
                    )}
                  </>
                )}
                
                {field.type === 'textarea' && (
                  <>
                    <textarea
                      id={field.id}
                      required={field.required}
                      placeholder={field.placeholder}
                      rows={4}
                      className="w-full px-4 py-3 border border-[#E5EAEB] rounded-lg focus:ring-2 focus:ring-[#4A8B8E] focus:border-transparent outline-none transition resize-none"
                    />
                    {field.helpText && (
                      <p className="text-xs text-[#8A9899] mt-1">{field.helpText}</p>
                    )}
                  </>
                )}
                
                {field.type === 'file' && (
                  <>
                    <input
                      type="file"
                      id={field.id}
                      required={field.required}
                      accept={field.accept}
                      multiple
                      className="w-full px-4 py-3 border border-[#E5EAEB] rounded-lg focus:ring-2 focus:ring-[#4A8B8E] focus:border-transparent outline-none transition file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#E8F1F1] file:text-[#4A8B8E] hover:file:bg-[#4A8B8E] hover:file:text-white"
                    />
                    {field.helpText && (
                      <p className="text-xs text-[#8A9899] mt-1">{field.helpText}</p>
                    )}
                  </>
                )}
                
                {field.type === 'checkbox' && (
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      id={field.id}
                      required={field.required}
                      className="mt-1 w-5 h-5 text-[#4A8B8E] border-[#E5EAEB] rounded focus:ring-2 focus:ring-[#4A8B8E]"
                    />
                    <span className="text-sm text-[#5A6B6C]">
                      {field.label}
                      {field.required && <span className="text-red-500 mr-1">*</span>}
                    </span>
                  </label>
                )}
              </div>
            ))}
            
            <button
              type="submit"
              className="w-full px-6 py-4 bg-[#4A8B8E] hover:bg-[#356B6E] text-white font-bold rounded-lg transition focus:ring-2 focus:ring-[#4A8B8E] focus:outline-none"
            >
              {block.submitButton}
            </button>
            
            <p className="text-xs text-center text-[#8A9899]">
              {block.processingTime}
            </p>
          </form>
        </div>
      )}

      {/* Alert */}
      {block.alert && <AlertBox alert={block.alert} />}
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
