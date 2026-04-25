import { MapPin, PhoneCall, Phone, Mail, MessageCircle, Clock, Globe } from 'lucide-react';
import Link from 'next/link';
import { FOOTER_CONFIG_NEW } from '@/lib/data/footer-config-new';

export function FooterContactNew() {
  const { address, contact } = FOOTER_CONFIG_NEW;

  const languageLabels: Record<string, string> = {
    ar: 'عربي',
    en: 'English',
    ur: 'اردو',
    tl: 'Tagalog',
  };

  return (
    <div>
      <h3 className="text-white font-bold text-base mb-5">
        تواصل معنا
      </h3>
      
      <div className="flex flex-col gap-4">
        {/* Address */}
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
            <MapPin className="w-4 h-4 text-emerald-400" aria-hidden="true" />
          </div>
          <div className="flex-1">
            <div className="text-sm text-slate-300">
              {address.city}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              {address.building}
            </div>
          </div>
        </div>

        {/* Working Hours */}
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
            <Clock className="w-4 h-4 text-emerald-400" aria-hidden="true" />
          </div>
          <div className="flex-1">
            <div className="text-xs text-slate-400 mb-1">
              ساعات العمل
            </div>
            <div className="text-sm text-slate-300">
              {contact.workingHours.ar}
            </div>
            <div className="text-xs text-emerald-400 mt-1">
              {contact.workingHours.note}
            </div>
          </div>
        </div>

        {/* Hotline */}
        <a
          href={`tel:${contact.hotline}`}
          className="flex items-start gap-3 focus:ring-2 focus:ring-emerald-400 focus:outline-none rounded"
        >
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
            <PhoneCall className="w-4 h-4 text-emerald-400" aria-hidden="true" />
          </div>
          <div className="flex-1">
            <div className="text-xs text-slate-400 mb-1">
              خدمة العملاء
            </div>
            <div className="text-sm text-white hover:text-emerald-400 transition">
              {contact.hotline}
            </div>
          </div>
        </a>

        {/* WhatsApp - Enhanced with button */}
        <a
          href={`https://wa.me/${contact.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-start gap-3 p-3 bg-[#25D366]/10 border border-[#25D366]/20 rounded-lg hover:bg-[#25D366]/20 transition focus:ring-2 focus:ring-emerald-400 focus:outline-none"
        >
          <div className="w-8 h-8 rounded-lg bg-[#25D366]/20 flex items-center justify-center flex-shrink-0">
            <MessageCircle className="w-4 h-4 text-[#25D366]" aria-hidden="true" />
          </div>
          <div className="flex-1">
            <div className="text-xs text-slate-400 mb-1">
              واتساب
            </div>
            <div className="flex items-center gap-2">
              <div className="text-sm text-white font-medium">
                ابدأ محادثة
              </div>
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" title="متاح الآن" />
            </div>
          </div>
        </a>

        {/* Landline */}
        <a
          href={`tel:${contact.landline}`}
          className="flex items-start gap-3 focus:ring-2 focus:ring-emerald-400 focus:outline-none rounded"
        >
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
            <Phone className="w-4 h-4 text-emerald-400" aria-hidden="true" />
          </div>
          <div className="flex-1">
            <div className="text-xs text-slate-400 mb-1">
              الهاتف الثابت
            </div>
            <div className="text-sm text-white hover:text-emerald-400 transition">
              {contact.landline}
            </div>
          </div>
        </a>

        {/* Email */}
        <a
          href={`mailto:${contact.email}`}
          className="flex items-start gap-3 focus:ring-2 focus:ring-emerald-400 focus:outline-none rounded"
        >
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
            <Mail className="w-4 h-4 text-emerald-400" aria-hidden="true" />
          </div>
          <div className="flex-1">
            <div className="text-sm text-white hover:text-emerald-400 transition break-all">
              {contact.email}
            </div>
          </div>
        </a>

        {/* Contact Form Link */}
        <Link
          href="/ar/contact"
          className="text-sm text-emerald-400 hover:text-emerald-300 transition underline focus:ring-2 focus:ring-emerald-400 focus:outline-none rounded"
        >
          تواصل عبر النموذج ←
        </Link>

        {/* Languages Available */}
        <div className="flex items-start gap-3 pt-4 border-t border-white/10">
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
            <Globe className="w-4 h-4 text-emerald-400" aria-hidden="true" />
          </div>
          <div className="flex-1">
            <div className="text-xs text-slate-400 mb-2">
              خدمة عملاء بأي لغة
            </div>
            <div className="flex flex-wrap gap-2">
              {contact.languages.map((lang) => (
                <span
                  key={lang}
                  className="px-2 py-1 bg-white/10 rounded text-xs text-slate-300"
                >
                  {languageLabels[lang]}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
