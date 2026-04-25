import { MapPin, PhoneCall, Phone, Mail, MessageCircle, Clock } from 'lucide-react';
import Link from 'next/link';
import { FOOTER_CONFIG_NEW } from '@/lib/data/footer-config-new';

const languageLabels: Record<string, string> = {
  ar: 'عربي',
  en: 'English',
  ur: 'اردو',
  tl: 'Tagalog',
};

export function FooterContactNew() {
  const { address, contact } = FOOTER_CONFIG_NEW;

  return (
    <div>
      <h3 className="text-[#1A2B2C] font-bold text-base mb-4 text-center md:text-start">
        تواصل معنا
      </h3>
      
      <div className="flex flex-col gap-2.5 max-w-sm mx-auto md:max-w-none md:mx-0">
        {/* Address */}
        <div className="flex items-start gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#F8FAFB] flex items-center justify-center flex-shrink-0">
            <MapPin className="w-3.5 h-3.5 text-[#4A8B8E]" aria-hidden="true" />
          </div>
          <div className="flex-1">
            <div className="text-sm text-[#5A6B6C]">
              {address.city}
            </div>
            <div className="text-xs text-[#8A9899] mt-0.5">
              {address.building}
            </div>
          </div>
        </div>

        {/* Working Hours */}
        <div className="flex items-start gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#F8FAFB] flex items-center justify-center flex-shrink-0">
            <Clock className="w-3.5 h-3.5 text-[#4A8B8E]" aria-hidden="true" />
          </div>
          <div className="flex-1">
            <div className="text-xs text-[#8A9899] mb-0.5">
              ساعات العمل
            </div>
            <div className="text-sm text-[#5A6B6C]">
              {contact.workingHours.ar}
            </div>
          </div>
        </div>

        {/* Hotline & Landline in 2 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <a
            href={`tel:${contact.hotline}`}
            className="flex items-start gap-2 focus:ring-2 focus:ring-[#4A8B8E] focus:outline-none rounded p-1.5"
          >
            <div className="w-7 h-7 rounded-lg bg-[#F8FAFB] flex items-center justify-center flex-shrink-0">
              <PhoneCall className="w-3.5 h-3.5 text-[#4A8B8E]" aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-[#8A9899] mb-0.5 truncate">
                خدمة العملاء
              </div>
              <div className="text-sm text-[#1A2B2C] hover:text-[#4A8B8E] transition font-medium">
                {contact.hotline}
              </div>
            </div>
          </a>

          <a
            href={`tel:${contact.landline}`}
            className="flex items-start gap-2 focus:ring-2 focus:ring-[#4A8B8E] focus:outline-none rounded p-1.5"
          >
            <div className="w-7 h-7 rounded-lg bg-[#F8FAFB] flex items-center justify-center flex-shrink-0">
              <Phone className="w-3.5 h-3.5 text-[#4A8B8E]" aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-[#8A9899] mb-0.5 truncate">
                الهاتف الثابت
              </div>
              <div className="text-sm text-[#1A2B2C] hover:text-[#4A8B8E] transition font-medium">
                {contact.landline}
              </div>
            </div>
          </a>
        </div>

        {/* WhatsApp - Enhanced */}
        <a
          href={`https://wa.me/${contact.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-start gap-2.5 p-2.5 bg-[#25D366]/8 border border-[#25D366]/30 rounded-lg hover:bg-[#25D366]/15 transition focus:ring-2 focus:ring-[#4A8B8E] focus:outline-none"
        >
          <div className="w-7 h-7 rounded-lg bg-[#25D366]/20 flex items-center justify-center flex-shrink-0">
            <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" aria-hidden="true" />
          </div>
          <div className="flex-1">
            <div className="text-xs text-[#8A9899] mb-0.5">
              واتساب
            </div>
            <div className="flex items-center gap-2">
              <div className="text-sm text-[#1A2B2C] font-medium">
                ابدأ محادثة
              </div>
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" title="متاح الآن" />
            </div>
          </div>
        </a>

        {/* Email */}
        <a
          href={`mailto:${contact.email}`}
          className="flex items-start gap-2.5 focus:ring-2 focus:ring-[#4A8B8E] focus:outline-none rounded"
        >
          <div className="w-7 h-7 rounded-lg bg-[#F8FAFB] flex items-center justify-center flex-shrink-0">
            <Mail className="w-3.5 h-3.5 text-[#4A8B8E]" aria-hidden="true" />
          </div>
          <div className="flex-1">
            <div className="text-sm text-[#1A2B2C] hover:text-[#4A8B8E] transition break-all">
              {contact.email}
            </div>
          </div>
        </a>

        {/* Contact Form Link */}
        <Link
          href="/ar/contact"
          className="text-sm text-[#4A8B8E] hover:text-[#356B6E] transition underline focus:ring-2 focus:ring-[#4A8B8E] focus:outline-none rounded text-center md:text-start"
        >
          تواصل عبر النموذج ←
        </Link>

        {/* Languages - Compact pills */}
        <div className="flex flex-wrap justify-center md:justify-start gap-1.5 pt-2.5 border-t border-[#E5EAEB]">
          {contact.languages.map((lang) => (
            <span
              key={lang}
              className="px-2 py-0.5 bg-[#F8FAFB] border border-[#E5EAEB] rounded text-xs text-[#5A6B6C]"
            >
              {languageLabels[lang]}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
