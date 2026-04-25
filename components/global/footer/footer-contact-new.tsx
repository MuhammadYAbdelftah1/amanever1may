import { MapPin, PhoneCall, Phone, Mail, MessageCircle, Clock, Globe } from 'lucide-react';
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
      <h3 className="text-[#1A2B2C] font-bold text-base mb-4 text-center">
        تواصل معنا
      </h3>
      
      <div className="flex flex-col gap-3 max-w-sm mx-auto">
        {/* Address */}
        <div className="flex flex-col items-center text-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#E8F1F1] flex items-center justify-center">
            <MapPin className="w-4 h-4 text-[#4A8B8E]" aria-hidden="true" />
          </div>
          <div>
            <div className="text-sm text-[#1A2B2C] font-medium">
              {address.city}
            </div>
            <div className="text-xs text-[#8A9899] mt-0.5">
              {address.building}
            </div>
          </div>
        </div>

        {/* Working Hours */}
        <div className="flex flex-col items-center text-center gap-2 pt-3 border-t border-[#E5EAEB]">
          <div className="w-8 h-8 rounded-full bg-[#E8F1F1] flex items-center justify-center">
            <Clock className="w-4 h-4 text-[#4A8B8E]" aria-hidden="true" />
          </div>
          <div>
            <div className="text-xs text-[#8A9899] mb-1">
              ساعات العمل
            </div>
            <div className="text-sm text-[#1A2B2C] font-medium">
              {contact.workingHours.ar}
            </div>
          </div>
        </div>

        {/* Phone Numbers Grid */}
        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#E5EAEB]">
          {/* Customer Service */}
          <a
            href={`tel:${contact.hotline}`}
            className="flex flex-col items-center text-center gap-2 p-2.5 rounded-lg hover:bg-[#F8FAFB] transition focus:ring-2 focus:ring-[#4A8B8E] focus:outline-none"
          >
            <div className="w-8 h-8 rounded-full bg-[#E8F1F1] flex items-center justify-center">
              <PhoneCall className="w-4 h-4 text-[#4A8B8E]" aria-hidden="true" />
            </div>
            <div>
              <div className="text-xs text-[#8A9899] mb-1">
                خدمة العملاء
              </div>
              <div className="text-sm text-[#1A2B2C] hover:text-[#4A8B8E] transition font-medium">
                {contact.hotline}
              </div>
            </div>
          </a>

          {/* Landline */}
          <a
            href={`tel:${contact.landline}`}
            className="flex flex-col items-center text-center gap-2 p-2.5 rounded-lg hover:bg-[#F8FAFB] transition focus:ring-2 focus:ring-[#4A8B8E] focus:outline-none"
          >
            <div className="w-8 h-8 rounded-full bg-[#E8F1F1] flex items-center justify-center">
              <Phone className="w-4 h-4 text-[#4A8B8E]" aria-hidden="true" />
            </div>
            <div>
              <div className="text-xs text-[#8A9899] mb-1">
                الهاتف الثابت
              </div>
              <div className="text-sm text-[#1A2B2C] hover:text-[#4A8B8E] transition font-medium">
                {contact.landline}
              </div>
            </div>
          </a>
        </div>

        {/* WhatsApp - Prominent */}
        <a
          href={`https://wa.me/${contact.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center text-center gap-2 p-3 bg-[#25D366]/10 border border-[#25D366]/30 rounded-lg hover:bg-[#25D366]/20 transition focus:ring-2 focus:ring-[#25D366] focus:outline-none mt-1"
        >
          <div className="w-8 h-8 rounded-full bg-[#25D366]/20 flex items-center justify-center">
            <MessageCircle className="w-4 h-4 text-[#25D366]" aria-hidden="true" />
          </div>
          <div>
            <div className="text-xs text-[#8A9899] mb-1">
              واتساب
            </div>
            <div className="flex items-center gap-2 justify-center">
              <div className="text-sm text-[#1A2B2C] font-semibold">
                ابدأ محادثة
              </div>
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" title="متاح الآن" />
            </div>
          </div>
        </a>

        {/* Email */}
        <a
          href={`mailto:${contact.email}`}
          className="flex flex-col items-center text-center gap-2 pt-3 border-t border-[#E5EAEB] focus:ring-2 focus:ring-[#4A8B8E] focus:outline-none rounded"
        >
          <div className="w-8 h-8 rounded-full bg-[#E8F1F1] flex items-center justify-center">
            <Mail className="w-4 h-4 text-[#4A8B8E]" aria-hidden="true" />
          </div>
          <div className="text-sm text-[#1A2B2C] hover:text-[#4A8B8E] transition font-medium break-all">
            {contact.email}
          </div>
        </a>

        {/* Contact Form Link */}
        <Link
          href="/ar/contact"
          className="text-sm text-[#4A8B8E] hover:text-[#356B6E] transition font-medium text-center focus:ring-2 focus:ring-[#4A8B8E] focus:outline-none rounded py-1"
        >
          تواصل عبر النموذج ←
        </Link>

        {/* Languages - Active pills with brand colors */}
        <div className="pt-3 border-t border-[#E5EAEB]">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Globe className="w-3.5 h-3.5 text-[#8A9899]" aria-hidden="true" />
            <p className="text-xs text-[#8A9899]">
              خدمة عملاء بأي لغة
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-1.5">
            {contact.languages.map((lang) => (
              <span
                key={lang}
                className="px-2.5 py-1 bg-[#4A8B8E]/10 border border-[#4A8B8E]/30 rounded-full text-xs text-[#4A8B8E] font-medium hover:bg-[#4A8B8E] hover:text-white transition-colors cursor-default"
              >
                {languageLabels[lang]}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
