import { MapPin, PhoneCall, Phone, Mail, MessageCircle } from 'lucide-react';
import { FOOTER_CONFIG } from '@/lib/data/footer-config';

export function FooterContact() {
  const { address, contact } = FOOTER_CONFIG;

  const contactItems = [
    {
      icon: MapPin,
      label: null,
      value: address.city,
      subValue: address.building,
      href: null,
    },
    {
      icon: PhoneCall,
      label: 'خدمة العملاء',
      value: contact.hotline,
      subValue: null,
      href: `tel:${contact.hotline}`,
    },
    {
      icon: MessageCircle,
      label: 'واتساب',
      value: contact.whatsappDisplay,
      subValue: null,
      href: `https://wa.me/${contact.whatsapp}`,
      badge: true,
    },
    {
      icon: Phone,
      label: 'الهاتف الثابت',
      value: contact.landline,
      subValue: null,
      href: `tel:${contact.landline}`,
    },
    {
      icon: Mail,
      label: null,
      value: contact.email,
      subValue: null,
      href: `mailto:${contact.email}`,
    },
  ];

  return (
    <div>
      <h3 className="text-white font-bold text-base mb-5">
        تواصل معنا
      </h3>
      <div className="flex flex-col gap-4">
        {contactItems.map((item, index) => {
          const Icon = item.icon;
          const content = (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="flex-1">
                {item.label && (
                  <div className="text-xs text-slate-400 mb-1">
                    {item.label}
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <div className={`text-sm ${item.href ? 'text-white hover:text-emerald-400' : 'text-slate-300'} transition`}>
                    {item.value}
                  </div>
                  {item.badge && (
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" title="متاح الآن" />
                  )}
                </div>
                {item.subValue && (
                  <div className="text-xs text-slate-400 mt-1">
                    {item.subValue}
                  </div>
                )}
              </div>
            </div>
          );

          if (item.href) {
            return (
              <a
                key={index}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="focus:ring-2 focus:ring-emerald-400 focus:outline-none rounded"
              >
                {content}
              </a>
            );
          }

          return <div key={index}>{content}</div>;
        })}
      </div>
    </div>
  );
}
