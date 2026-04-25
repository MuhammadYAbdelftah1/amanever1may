import { MapPin, PhoneCall, Phone, Mail, Clock } from 'lucide-react';
import { FOOTER_CONFIG_NEW } from '@/lib/data/footer-config-new';

export function FooterContactNew() {
  const { address, contact } = FOOTER_CONFIG_NEW;

  return (
    <div>
      <h3 className="text-[#1A2B2C] font-bold text-base mb-4 text-center">
        تواصل معنا
      </h3>
      
      {/* Mobile: Vertical layout */}
      <div className="flex flex-col gap-3 max-w-sm mx-auto md:hidden">
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
      </div>

      {/* Desktop & Tablet: Horizontal centered layout */}
      <div className="hidden md:block">
        {/* Address & Working Hours - Stacked vertically */}
        <div className="flex flex-col gap-2.5 max-w-xs mx-auto mb-3">
          {/* Address */}
          <div className="flex flex-col items-center text-center gap-1.5 p-2 bg-[#F8FAFB] rounded-lg">
            <div className="w-7 h-7 rounded-full bg-[#E8F1F1] flex items-center justify-center">
              <MapPin className="w-3.5 h-3.5 text-[#4A8B8E]" aria-hidden="true" />
            </div>
            <div>
              <div className="text-xs text-[#1A2B2C] font-medium">
                {address.city}
              </div>
              <div className="text-xs text-[#8A9899] mt-0.5">
                {address.building}
              </div>
            </div>
          </div>

          {/* Working Hours */}
          <div className="flex flex-col items-center text-center gap-1.5 p-2 bg-[#F8FAFB] rounded-lg">
            <div className="w-7 h-7 rounded-full bg-[#E8F1F1] flex items-center justify-center">
              <Clock className="w-3.5 h-3.5 text-[#4A8B8E]" aria-hidden="true" />
            </div>
            <div>
              <div className="text-xs text-[#8A9899] mb-0.5">
                ساعات العمل
              </div>
              <div className="text-xs text-[#1A2B2C] font-medium">
                {contact.workingHours.ar}
              </div>
            </div>
          </div>
        </div>

        {/* Phone Numbers & Email - Horizontal centered (always horizontal on desktop) */}
        <div className="flex items-center justify-center gap-3 ml-[640px]">
          {/* Email - First */}
          <a
            href={`mailto:${contact.email}`}
            className="flex flex-col items-center text-center gap-1.5 p-2 rounded-lg hover:bg-[#F8FAFB] transition focus:ring-2 focus:ring-[#4A8B8E] focus:outline-none min-w-[140px]"
          >
            <div className="w-7 h-7 rounded-full bg-[#E8F1F1] flex items-center justify-center">
              <Mail className="w-3.5 h-3.5 text-[#4A8B8E]" aria-hidden="true" />
            </div>
            <div>
              <div className="text-xs text-[#8A9899] mb-0.5">
                البريد الإلكتروني
              </div>
              <div className="text-xs text-[#1A2B2C] hover:text-[#4A8B8E] transition font-medium break-all">
                {contact.email}
              </div>
            </div>
          </a>

          {/* Customer Service - Middle */}
          <a
            href={`tel:${contact.hotline}`}
            className="flex flex-col items-center text-center gap-1.5 p-2 rounded-lg hover:bg-[#F8FAFB] transition focus:ring-2 focus:ring-[#4A8B8E] focus:outline-none min-w-[140px]"
          >
            <div className="w-7 h-7 rounded-full bg-[#E8F1F1] flex items-center justify-center">
              <PhoneCall className="w-3.5 h-3.5 text-[#4A8B8E]" aria-hidden="true" />
            </div>
            <div>
              <div className="text-xs text-[#8A9899] mb-0.5">
                خدمة العملاء
              </div>
              <div className="text-xs text-[#1A2B2C] hover:text-[#4A8B8E] transition font-medium">
                {contact.hotline}
              </div>
            </div>
          </a>

          {/* Landline - Last */}
          <a
            href={`tel:${contact.landline}`}
            className="flex flex-col items-center text-center gap-1.5 p-2 rounded-lg hover:bg-[#F8FAFB] transition focus:ring-2 focus:ring-[#4A8B8E] focus:outline-none min-w-[140px]"
          >
            <div className="w-7 h-7 rounded-full bg-[#E8F1F1] flex items-center justify-center">
              <Phone className="w-3.5 h-3.5 text-[#4A8B8E]" aria-hidden="true" />
            </div>
            <div>
              <div className="text-xs text-[#8A9899] mb-0.5">
                الهاتف الثابت
              </div>
              <div className="text-xs text-[#1A2B2C] hover:text-[#4A8B8E] transition font-medium">
                {contact.landline}
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
