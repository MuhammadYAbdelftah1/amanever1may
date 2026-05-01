'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  ArrowLeft,
  X
} from 'lucide-react';
import { usePathname } from 'next/navigation';

interface ContactPopoverProps {
  locale: string;
  isMobile?: boolean;
}

interface ContactMethod {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  value: string;
  href: string;
  image: string;
}

const contactMethods: ContactMethod[] = [
  {
    id: 'customer-service',
    icon: Phone,
    title: 'خدمة العملاء',
    description: 'للاستفسارات العامة وحجز الاستشارات',
    value: '+966 92 000 18041',
    href: 'tel:+966920018041',
    image: '/images/contact/customer-service.jpg'
  },
  {
    id: 'landline',
    icon: Phone,
    title: 'الهاتف الأرضي',
    description: 'رقم الهاتف برمز الدولة',
    value: '+966 12 123 4567',
    href: 'tel:+966121234567',
    image: '/images/contact/landline.jpg'
  },
  {
    id: 'whatsapp',
    icon: MessageCircle,
    title: 'واتساب',
    description: 'الأسرع للرد، 7 أيام في الأسبوع',
    value: '9200',
    href: 'https://wa.me/9200',
    image: '/images/contact/whatsapp.jpg'
  },
  {
    id: 'email',
    icon: Mail,
    title: 'البريد الإلكتروني',
    description: 'للاستفسارات الرسمية والمراسلات',
    value: 'info@amanever.com',
    href: 'mailto:info@amanever.com',
    image: '/images/contact/email.jpg'
  },
  {
    id: 'location',
    icon: MapPin,
    title: 'موقعنا',
    description: 'جدة، المملكة العربية السعودية',
    value: 'زيارة المقر',
    href: '/ar/contact#location',
    image: '/images/contact/location.jpg'
  }
];

export function ContactPopover({ locale, isMobile = false }: ContactPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        popoverRef.current &&
        triggerRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  // Close popover on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // Mobile: Bottom Sheet
  if (isMobile) {
    return (
      <>
        <button
          ref={triggerRef}
          onClick={handleToggle}
          className="flex items-center gap-3 text-lg font-medium transition-all duration-300 rounded-lg px-4 py-3 text-[#4A8B8E]/80 hover:text-[#4A8B8E] hover:bg-[#4A8B8E]/5 w-full"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          {/* Image Placeholder */}
          <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-gray-50 relative border-2 border-dashed border-gray-300">
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <div className="text-[9px] font-semibold text-gray-700">للمصممة</div>
              <div className="text-[8px] text-gray-500">48×48</div>
            </div>
          </div>
          <span className="flex-1 text-center">{locale === 'ar' ? 'تواصل معنا' : 'Contact Us'}</span>
        </button>

        {/* Bottom Sheet Overlay */}
        {isOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-[100] animate-in fade-in duration-200"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Bottom Sheet */}
        {isOpen && (
          <div
            ref={popoverRef}
            className="fixed bottom-0 left-0 right-0 z-[101] bg-white rounded-t-3xl shadow-2xl animate-in slide-in-from-bottom duration-300 max-h-[85vh] overflow-y-auto"
            role="dialog"
            aria-label={locale === 'ar' ? 'تواصل معنا' : 'Contact Us'}
          >
            {/* Handle Bar */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">
                {locale === 'ar' ? 'تواصل معنا' : 'Contact Us'}
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label={locale === 'ar' ? 'إغلاق' : 'Close'}
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Contact Methods */}
            <div className="p-4 space-y-3">
              {contactMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <a
                    key={method.id}
                    href={method.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-start gap-4 p-4 rounded-xl border border-gray-200 hover:border-[#4A8B8E]/30 hover:bg-gray-50 transition-all duration-200"
                  >
                    {/* Image Placeholder */}
                    <div className="flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden bg-gray-50 relative border-2 border-dashed border-gray-300">
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <div className="text-[9px] font-semibold text-gray-700">للمصممة</div>
                        <div className="text-[8px] text-gray-500">64×64</div>
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 text-base mb-1">
                        {method.title}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        {method.description}
                      </p>
                      <p className="text-sm font-semibold text-[#4A8B8E]" dir="ltr">
                        {method.value}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* View Full Page Link */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <Link
                href={`/${locale}/contact`}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-gradient-to-r from-[#4A8B8E] to-[#2d5a5d] text-white font-semibold rounded-xl hover:shadow-lg transition-all"
              >
                <span>{locale === 'ar' ? 'صفحة التواصل الكاملة' : 'Full Contact Page'}</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </>
    );
  }

  // Desktop: Popover
  return (
    <div className="relative">
      <button
        ref={triggerRef}
        onClick={handleToggle}
        className={`relative text-sm font-medium transition-all duration-300 rounded-lg px-4 py-2 group ${
          pathname.includes('/contact')
            ? 'text-[#4A8B8E] bg-[#4A8B8E]/10'
            : 'text-gray-700 hover:text-[#4A8B8E] hover:bg-[#4A8B8E]/5'
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {locale === 'ar' ? 'تواصل معنا' : 'Contact Us'}
        
        {/* Active indicator */}
        {pathname.includes('/contact') && (
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 rounded-full bg-[#4A8B8E]" />
        )}
        
        {/* Hover effect */}
        <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#4A8B8E]/0 via-[#4A8B8E]/5 to-[#4A8B8E]/0" />
      </button>

      {/* Popover */}
      {isOpen && (
        <div
          ref={popoverRef}
          className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-[400px] bg-white rounded-2xl shadow-2xl border border-gray-200 animate-in fade-in slide-in-from-top-2 duration-200 z-50"
          role="dialog"
          aria-label={locale === 'ar' ? 'تواصل معنا' : 'Contact Us'}
        >
          {/* Arrow */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-gray-200 rotate-45" />

          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">
              {locale === 'ar' ? 'تواصل معنا' : 'Contact Us'}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {locale === 'ar' ? 'نحن هنا لخدمتك في أي وقت' : 'We are here to serve you anytime'}
            </p>
          </div>

          {/* Contact Methods */}
          <div className="p-4 space-y-2">
            {contactMethods.map((method) => {
              const Icon = method.icon;
              return (
                <a
                  key={method.id}
                  href={method.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-start gap-3 p-3 rounded-xl border border-gray-200 hover:border-[#4A8B8E]/30 hover:bg-gray-50 transition-all duration-200"
                >
                  {/* Image Placeholder */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-gray-50 relative border-2 border-dashed border-gray-300">
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <div className="text-[8px] font-semibold text-gray-700">للمصممة</div>
                      <div className="text-[7px] text-gray-500">48×48</div>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 text-sm mb-0.5">
                      {method.title}
                    </h4>
                    <p className="text-xs text-gray-600 mb-1">
                      {method.description}
                    </p>
                    <p className="text-xs font-semibold text-[#4A8B8E]" dir="ltr">
                      {method.value}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
            <Link
              href={`/${locale}/contact`}
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 text-sm font-semibold text-[#4A8B8E] hover:bg-[#4A8B8E]/10 rounded-lg transition-colors"
            >
              <span>{locale === 'ar' ? 'صفحة التواصل الكاملة' : 'Full Contact Page'}</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
