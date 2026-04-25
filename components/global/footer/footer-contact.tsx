import { MapPin, PhoneCall, Phone, Mail, MessageCircle } from 'lucide-react';
import { FOOTER_CONFIG } from '@/lib/data/footer-config';

export function FooterContact() {
  const { address, contact } = FOOTER_CONFIG;

  return (
    <div>
      <h3 className="text-white font-bold text-base mb-5">
        تواصل معنا
      </h3>
      <div className="flex flex-col gap-4">
        {/* Address */}
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
            <MapPin className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex-1">
            <div className="text-sm text-slate-300">{address.city}</div>
            <div className="text-xs text-slate-400 mt-1">{address.building}</div>
          </div>
        </div>

        {/* WhatsApp */}
        <a
          href={`https://wa.me/${contact.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="focus:ring-2 focus:ring-emerald-400 focus:outline-none rounded"
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex-1">
              <div className="text-xs text-slate-400 mb-1">واتساب</div>
              <div className="flex items-center gap-2">
                <div className="text-sm text-white hover:text-emerald-400 transition">
                  {contact.whatsappDisplay}
                </div>
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" title="متاح الآن" />
              </div>
            </div>
          </div>
        </a>

        {/* Horizontal Contact Info - Desktop Only */}
        <div className="hidden md:flex items-center gap-4 text-sm text-white pt-2">
          {/* خدمة العملاء */}
          <a href={`tel:${contact.hotline}`} className="flex items-center gap-2 hover:text-emerald-400 transition">
            <span className="text-slate-400">خدمة العملاء</span>
            <span className="font-semibold">{contact.hotline}</span>
          </a>
          
          <span className="text-slate-600">|</span>
          
          {/* الهاتف الثابت */}
          <a href={`tel:${contact.landline}`} className="flex items-center gap-2 hover:text-emerald-400 transition">
            <span className="text-slate-400">الهاتف الثابت</span>
            <span className="font-semibold">{contact.landline}</span>
          </a>
          
          <span className="text-slate-600">|</span>
          
          {/* Email */}
          <a href={`mailto:${contact.email}`} className="hover:text-emerald-400 transition font-semibold">
            {contact.email}
          </a>
        </div>

        {/* Mobile View - Vertical */}
        <div className="md:hidden flex flex-col gap-4">
          {/* خدمة العملاء */}
          <a href={`tel:${contact.hotline}`} className="focus:ring-2 focus:ring-emerald-400 focus:outline-none rounded">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                <PhoneCall className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="flex-1">
                <div className="text-xs text-slate-400 mb-1">خدمة العملاء</div>
                <div className="text-sm text-white hover:text-emerald-400 transition">{contact.hotline}</div>
              </div>
            </div>
          </a>

          {/* الهاتف الثابت */}
          <a href={`tel:${contact.landline}`} className="focus:ring-2 focus:ring-emerald-400 focus:outline-none rounded">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                <Phone className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="flex-1">
                <div className="text-xs text-slate-400 mb-1">الهاتف الثابت</div>
                <div className="text-sm text-white hover:text-emerald-400 transition">{contact.landline}</div>
              </div>
            </div>
          </a>

          {/* Email */}
          <a href={`mailto:${contact.email}`} className="focus:ring-2 focus:ring-emerald-400 focus:outline-none rounded">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                <Mail className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="flex-1">
                <div className="text-sm text-white hover:text-emerald-400 transition">{contact.email}</div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
