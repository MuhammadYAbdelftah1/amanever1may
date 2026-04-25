"use client";

import { AlertTriangle, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { EMERGENCY_NUMBERS, WHATSAPP_BASE_URL } from "@/lib/chatbot/constants";

interface EmergencyCardProps {
  onDismiss?: () => void;
}

export function EmergencyCard({ onDismiss }: EmergencyCardProps) {
  const handleCall = (number: string) => {
    window.location.href = `tel:${number}`;
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      "حالة طارئة — أحتاج للتواصل مع طبيب فوراً"
    );
    window.open(`${WHATSAPP_BASE_URL}?text=${message}`, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      role="alert"
      aria-live="assertive"
      className="flex flex-col gap-4 p-6 bg-red-50 border-s-4 border-red-600 rounded-2xl"
    >
      {/* Icon + Title */}
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
          <AlertTriangle className="w-6 h-6 text-red-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-red-900">
            هذه حالة طارئة — لا ننصح بالانتظار
          </h3>
          <p className="text-sm text-red-700 mt-1">
            اتصل بالإسعاف فوراً
          </p>
        </div>
      </div>

      {/* Emergency buttons */}
      <div className="flex flex-col gap-2">
        <button
          onClick={() => handleCall(EMERGENCY_NUMBERS.ambulance)}
          className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-red-600 text-white rounded-xl font-bold text-lg hover:bg-red-700 active:scale-95 transition-all"
        >
          <Phone className="w-5 h-5" />
          اتصل بـ 997 (الهلال الأحمر)
        </button>

        <button
          onClick={() => handleCall(EMERGENCY_NUMBERS.emergency)}
          className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-red-600 text-white rounded-xl font-bold text-lg hover:bg-red-700 active:scale-95 transition-all"
        >
          <Phone className="w-5 h-5" />
          اتصل بـ 911 (الطوارئ)
        </button>
      </div>

      {/* Alternative: WhatsApp */}
      <div className="pt-2 border-t border-red-200">
        <button
          onClick={handleWhatsApp}
          className="w-full px-4 py-3 text-sm text-red-700 hover:text-red-900 font-medium hover:bg-red-100 rounded-lg transition-colors"
        >
          أو تواصل مع طبيب في أمان إيفر الآن
        </button>
      </div>

      {/* Dismiss */}
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="text-xs text-red-600 hover:text-red-800 font-medium mt-2"
        >
          فهمت
        </button>
      )}
    </motion.div>
  );
}
