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
    description: 'استثمر عضويتك.. وضاعف توفيرك',
    discount: '30%',
    gradient: 'from-emerald-500 to-teal-600',
    link: '/ar/register?offer=new-member',
  },
  {
    id: 'family-package',
    icon: Sparkles,
    title: 'عرض العائلة',
    description: 'عروض حصرية صُممت خصيصاً لتلبي احتياجاتك',
    discount: '40%',
    gradient: 'from-blue-500 to-indigo-600',
    link: '/services#membership',
  },
  {
    id: 'seasonal',
    icon: Percent,
    title: 'عالمٌ من التوفير',
    description: 'أبواب التوفير مع كبرى العلامات الطبية والصحية',
    discount: '50%',
    gradient: 'from-purple-500 to-pink-600',
    link: '/services#membership',
  },
  {
    id: 'cashback-bonus',
    icon: Tag,
    title: 'مكافأة الكاش باك',
    description: 'استرداد نقدي مضاعف هذا الشهر',
    discount: '2X',
    gradient: 'from-amber-500 to-orange-600',
    link: '/services#cashback',
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

  // Mobile version - Minimalist Popover
  if (isMobile) {
    return (
      <div className="relative w-full">
        <button
          ref={triggerRef}
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-3 text-base font-medium transition-all duration-300 rounded-lg px-4 py-2.5 w-full ${
            isOpen
              ? 'text-[#4A8B8E] bg-[#4A8B8E]/10'
              : 'text-[#4A8B8E]/80 hover:text-[#4A8B8E] hover:bg-[#4A8B8E]/5'
          }`}
        >
          {/* Image Placeholder */}
          <div className="flex-shrink-0 w-10 h-10 rounded-lg overflow-hidden bg-gray-50 relative border-2 border-dashed border-gray-300">
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <div className="text-[8px] font-semibold text-gray-700">للمصممة</div>
              <div className="text-[7px] text-gray-500">40×40</div>
            </div>
          </div>
          <span className="flex-1 text-center">العروض الخاصة</span>
        </button>

        {/* Mobile Minimalist Popover */}
        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-[90] bg-black/20 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Popover */}
            <div
              ref={popoverRef}
              className="fixed left-4 right-4 top-24 z-[100] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200 max-h-[70vh] flex flex-col"
            >
              {/* Minimalist Header */}
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#5B9A9E] to-[#4A8B8E] flex items-center justify-center shadow-sm">
                    <Tag className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">العروض الخاصة</h3>
                    <p className="text-xs text-gray-500">عروض حصرية لفترة محدودة</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="إغلاق"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Offers List - Minimalist Cards */}
              <div className="p-4 space-y-3 overflow-y-auto">
                {offers.map((offer) => {
                  const OfferIcon = offer.icon;
                  return (
                    <Link
                      key={offer.id}
                      href={offer.link}
                      onClick={() => setIsOpen(false)}
                      className="block group"
                    >
                      <div className="relative overflow-hidden rounded-xl bg-white border-2 border-gray-100 p-4 hover:border-[#5B9A9E] hover:shadow-md transition-all duration-300">
                        <div className="flex items-start gap-3">
                          {/* Icon */}
                          <div className={`flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br ${offer.gradient} flex items-center justify-center shadow-sm`}>
                            <OfferIcon className="w-6 h-6 text-white" />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h4 className="text-base font-bold text-gray-900 leading-tight">{offer.title}</h4>
                              {/* Discount Badge */}
                              <div className="flex-shrink-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg px-2 py-1 shadow-sm">
                                <span className="text-xs font-black text-white">{offer.discount}</span>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 leading-snug line-clamp-2">{offer.description}</p>
                          </div>
                        </div>

                        {/* Arrow indicator */}
                        <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <ArrowLeft className="w-4 h-4 text-[#5B9A9E]" />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
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
          <div 
            className="p-4 grid grid-cols-2 gap-4 overflow-y-scroll"
            style={{ 
              maxHeight: '400px',
              scrollbarWidth: 'thin',
              scrollbarColor: '#cbd5e0 #f1f1f1'
            }}
          >
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

// Add custom scrollbar styles
const styles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 8px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #cbd5e0;
    border-radius: 10px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #a0aec0;
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  if (!document.head.querySelector('style[data-special-offers-scrollbar]')) {
    styleSheet.setAttribute('data-special-offers-scrollbar', 'true');
    document.head.appendChild(styleSheet);
  }
}
