'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { CreditCard, MapPin, Stethoscope } from 'lucide-react';
import { useChatStore } from '@/lib/chatbot/store';
import { WHATSAPP_NUMBER, WHATSAPP_DEFAULT_MESSAGE } from '@/lib/constants/links';
import { MembershipModal } from '@/components/membership/MembershipModal';

export function FloatingAuthButtons() {
  const pathname = usePathname();
  const { isOpen, unreadCount, openChat } = useChatStore();
  const [showTooltip, setShowTooltip] = useState(false);
  const [showMembershipModal, setShowMembershipModal] = useState(false);
  const [showLocationTooltip, setShowLocationTooltip] = useState(false);
  const [showConsultationTooltip, setShowConsultationTooltip] = useState(false);

  // Hide on auth pages
  const isAuthPage = pathname?.includes('/login') || pathname?.includes('/register');

  if (isAuthPage) return null;

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE)}`;
  const urgentConsultationMessage = 'استشارة عاجلة - أحتاج للتواصل مع طبيب فوراً';
  const urgentConsultationUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(urgentConsultationMessage)}`;

  const scrollToProviders = () => {
    const providersSection = document.getElementById('nearby-providers');
    if (providersSection) {
      providersSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="fixed left-4 md:left-6 bottom-6 z-40 flex flex-col gap-3"
          >
            {/* Membership Button (Top) */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowMembershipModal(true)}
              className="relative w-12 h-12 md:w-14 md:h-14 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 bg-gradient-to-br from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 flex items-center justify-center group"
              aria-label="طلب عضوية"
              title="طلب عضوية"
            >
              <CreditCard className="w-6 h-6 md:w-7 md:h-7 text-white" />
              
              {/* Pulsing ring */}
              <span className="absolute -top-1 -right-1 flex h-3 w-3 z-10">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-300"></span>
              </span>

              {/* Tooltip */}
              <div className="absolute right-full mr-3 px-3 py-2 bg-slate-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                طلب عضوية
                <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-4 border-l-slate-900" />
              </div>
            </motion.button>

            {/* Location/Providers Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToProviders}
              onMouseEnter={() => setShowLocationTooltip(true)}
              onMouseLeave={() => setShowLocationTooltip(false)}
              className="relative w-12 h-12 md:w-14 md:h-14 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 flex items-center justify-center group"
              aria-label="مقدمي الخدمات القريبين"
              title="مقدمي الخدمات القريبين"
            >
              <MapPin className="w-6 h-6 md:w-7 md:h-7 text-white" />

              {/* Tooltip */}
              <div className="absolute right-full mr-3 px-3 py-2 bg-slate-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                مقدمي الخدمات القريبين
                <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-4 border-l-slate-900" />
              </div>
            </motion.button>

            {/* Urgent Consultation Button */}
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href={urgentConsultationUrl}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setShowConsultationTooltip(true)}
              onMouseLeave={() => setShowConsultationTooltip(false)}
              className="relative w-12 h-12 md:w-14 md:h-14 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 flex items-center justify-center group"
              aria-label="استشارة عاجلة"
              title="استشارة عاجلة"
            >
              <Stethoscope className="w-6 h-6 md:w-7 md:h-7 text-white" />
              
              {/* Pulsing ring for urgency */}
              <span className="absolute -top-1 -right-1 flex h-3 w-3 z-10">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-300"></span>
              </span>

              {/* Tooltip */}
              <div className="absolute right-full mr-3 px-3 py-2 bg-slate-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                استشارة عاجلة
                <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-4 border-l-slate-900" />
              </div>
            </motion.a>

            {/* Omniya Chatbot Button (Middle) */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={openChat}
              className="relative w-12 h-12 md:w-14 md:h-14 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden ring-2 ring-emerald-200"
              aria-label="افتح شات أمنية"
            >
              {/* Avatar Image */}
              <Image
                src="/images/omniya-avatar.jpg"
                alt="أمنية"
                fill
                sizes="56px"
                className="object-cover"
                priority
                unoptimized
              />

              {/* Pulsing green dot - top right */}
              <span className="absolute -top-1 -right-1 flex h-3 w-3 z-10">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>

              {/* Unread badge */}
              {unreadCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -bottom-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center z-10"
                >
                  {unreadCount > 9 ? "9+" : unreadCount}
                </motion.span>
              )}
            </motion.button>

            {/* WhatsApp Button (Bottom) */}
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="تواصل معنا على واتساب"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              className="relative w-12 h-12 md:w-14 md:h-14 rounded-full shadow-xl hover:shadow-2xl flex items-center justify-center transition-all duration-300 bg-[#25D366] hover:bg-[#20BA5A]"
              style={{
                animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite'
              }}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="28" 
                height="28" 
                fill="currentColor" 
                className="w-6 h-6 md:w-7 md:h-7 text-white" 
                viewBox="0 0 16 16"
              >
                <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
              </svg>
            </motion.a>

            {/* Tooltip for WhatsApp */}
            {showTooltip && (
              <div className="hidden md:block fixed start-20 bottom-8 z-30 bg-slate-900 text-white text-sm px-4 py-2 rounded-lg shadow-lg whitespace-nowrap">
                تواصل معنا على واتساب
                <div className="absolute top-1/2 -start-2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-e-8 border-e-slate-900" />
              </div>
            )}

            <style jsx>{`
              @keyframes pulse {
                0%, 100% {
                  opacity: 1;
                }
                50% {
                  opacity: 0.8;
                }
              }

              @media (prefers-reduced-motion: reduce) {
                a {
                  animation: none !important;
                }
              }
            `}</style>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Membership Modal */}
      <MembershipModal 
        isOpen={showMembershipModal} 
        onClose={() => setShowMembershipModal(false)} 
      />
    </>
  );
}
