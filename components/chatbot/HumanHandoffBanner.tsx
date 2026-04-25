"use client";

import { MessageCircle, Phone } from "lucide-react";
import { WHATSAPP_BASE_URL, CUSTOMER_SERVICE_NUMBER } from "@/lib/chatbot/constants";
import { track } from "@/lib/chatbot/analytics";

export function HumanHandoffBanner() {
  const handleWhatsApp = () => {
    const message = encodeURIComponent("مرحبا، جاني من شات أمنية");
    track({ event: "chat_handoff_whatsapp_clicked", topic: "general" });
    window.open(`${WHATSAPP_BASE_URL}?text=${message}`, "_blank");
  };

  const handleCall = () => {
    track({ event: "chat_handoff_call_clicked", topic: "general" });
    window.location.href = `tel:${CUSTOMER_SERVICE_NUMBER}`;
  };

  return (
    <div className="border-t border-emerald-200 bg-emerald-50">
      <div className="px-4 py-2 text-center">
        <p className="text-xs text-emerald-700 font-medium mb-2">
          تبي تكلم موظف؟
        </p>
        <div className="flex gap-2">
          <button
            onClick={handleWhatsApp}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white hover:bg-emerald-100 border border-emerald-300 rounded-lg text-sm text-emerald-700 font-medium transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>واتساب</span>
          </button>
          <button
            onClick={handleCall}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg text-sm text-white font-medium transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>اتصال</span>
          </button>
        </div>
      </div>
    </div>
  );
}
