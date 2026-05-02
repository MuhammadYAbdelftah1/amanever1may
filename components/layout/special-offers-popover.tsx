'use client';

import { useState, useEffect, useRef } from 'react';
import { Tag, Gift, Percent, Sparkles, ArrowLeft, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface SpecialOffersPopoverProps {
  locale: string;
  isMobile?: boolean;
}

const offers = [
  {
    id: 'new-member',
    icon: Gift,
    title: 'عرض الأعضاء الجدد',
    description: 'خصم 30% على أول اشتراك',
    discount: '30%',
    gradient: 'from-emerald-500 to-teal-600',
    link: '/ar/register?offer=new-member',
  },
  {
    id: 'family-package',
    icon: Sparkles,
    title: 'عرض العائلة',
    description: 'وفّر 40% عند إضافة 4 أفراد أو أكثر',
    discount: '40%',
    gradient: 'from-blue-500 to-indigo-600',
    link: '/ar/pricing?offer=family',
  },
  {
    id: 'seasonal',
    icon: Percent,
    title: 'عرض الموسم',
    description: 'خصومات حصرية لفترة محدودة',
    discount: '50%',
    gradient: 'from-purple-500 to-pink-600',
    link: '/ar/pricing?offer=seasonal',
  },
  {
    id: 'cashback-bonus',
    icon: Tag,
    title: 'مكافأة الكاش باك',
    description: 'استرداد نقدي مضاعف هذا الشهر',
    discount: '2X',
    gradient: 'from-amber-500 to-orange-600',
    link: '/ar/cashback?offer=bonus',
  },
];

export function SpecialOffersPopover({ locale, isMobile = false }: SpecialOffersPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
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
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close popover on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Mobile version - Full page dialog
  if (isMobile) {
    return (
      <>
        <button
          ref={triggerRef}
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-3 text-lg font-medium transition-all duration-300 rounded-lg px-4 py-3 text-[#4A8B8E]/80 hover:text-[#4A8B8E] hover:bg-[#4A8B8E]/5 w-full"
        >
          {/* Image Placeholder */}
          <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-gray-50 relative border-2 border-dashed border-gray-300">
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <div className="text-[9px] font-semibold text-gray-700">للمصممة</div>
              <div className="text-[8px] text-gray-500">48×48</div>
            </div>
          </div>
          <span className="flex-1 text-center">العروض الخاصة</span>
        </button>

        {/* Mobile Full Screen Dialog */}
        {isOpen && (
          <div className="fixed inset-0 z-[100] bg-white">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">العروض الخاصة</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="إغلاق"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4 overflow-y-auto h-[calc(100vh-73px)]">
              {offers.map((offer) => {
                const OfferIcon = offer.icon;
                return (
                  <Link
                    key={offer.id}
                    href={offer.link}
                    onClick={() => setIsOpen(false)}
                    className="block group"
                  >
                    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${offer.gradient} p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
                      {/* Discount Badge */}
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-md">
                        <span className="text-sm font-bold text-gray-900">{offer.discount}</span>
                      </div>

                      {/* Icon */}
                      <div className="mb-4">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                          <OfferIcon className="w-6 h-6 text-white" />
                        </div>
                      </div>

                      {/* Content */}
                      <h3 className="text-xl font-bold text-white mb-2">{offer.title}</h3>
                      <p className="text-white/90 text-sm mb-4">{offer.description}</p>

                      {/* CTA */}
                      <div className="flex items-center gap-2 text-white font-semibold">
                        <span>اعرف المزيد</span>
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </>
    );
  }

  // Desktop version - Popover
  return (
    <div className="relative">
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`relative text-sm font-medium transition-all duration-300 rounded-lg px-4 py-2 group ${
          isOpen
            ? 'text-[#4A8B8E] bg-[#4A8B8E]/10'
            : 'text-gray-700 hover:text-[#4A8B8E] hover:bg-[#4A8B8E]/5'
        }`}
      >
        العروض الخاصة
        {isOpen && (
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 rounded-full bg-[#4A8B8E]" />
        )}
        <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#4A8B8E]/0 via-[#4A8B8E]/5 to-[#4A8B8E]/0" />
      </button>

      {/* Popover Content */}
      {isOpen && (
        <div
          ref={popoverRef}
          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#4A8B8E] to-[#356B6E] px-6 py-4">
            <h3 className="text-xl font-bold text-white">العروض الخاصة</h3>
            <p className="text-white/90 text-sm mt-1">عروض حصرية لفترة محدودة</p>
          </div>

          {/* Offers Grid */}
          <div className="p-4 grid grid-cols-2 gap-4 max-h-[500px] overflow-y-auto">
            {offers.map((offer) => {
              const OfferIcon = offer.icon;
              return (
                <Link
                  key={offer.id}
                  href={offer.link}
                  onClick={() => setIsOpen(false)}
                  className="block group"
                >
                  <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${offer.gradient} p-4 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}>
                    {/* Discount Badge */}
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 shadow-md">
                      <span className="text-xs font-bold text-gray-900">{offer.discount}</span>
                    </div>

                    {/* Icon */}
                    <div className="mb-3">
                      <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                        <OfferIcon className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <h4 className="text-base font-bold text-white mb-1">{offer.title}</h4>
                    <p className="text-white/90 text-xs mb-3 line-clamp-2">{offer.description}</p>

                    {/* CTA */}
                    <div className="flex items-center gap-1 text-white text-xs font-semibold">
                      <span>اعرف المزيد</span>
                      <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
