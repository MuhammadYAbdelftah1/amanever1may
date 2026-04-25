"use client";

import { Shield, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

interface ConsentCardProps {
  onAccept: () => void;
}

export function ConsentCard({ onAccept }: ConsentCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center gap-4 p-6 bg-white rounded-2xl border-2 border-emerald-200 shadow-lg"
    >
      {/* Icon */}
      <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center">
        <Shield className="w-8 h-8 text-emerald-600" />
      </div>

      {/* Heading */}
      <h3 className="text-lg font-bold text-slate-900 text-center">
        موافقتك على معالجة البيانات
      </h3>

      {/* Body */}
      <p className="text-sm text-slate-600 text-center leading-relaxed">
        نحفظ محادثتك لتحسين الخدمة. لا نشارك بياناتك مع طرف ثالث. بياناتك محمية وفق{" "}
        <strong>نظام حماية البيانات الشخصية السعودي (PDPL)</strong>.
      </p>

      {/* Buttons */}
      <div className="flex flex-col gap-2 w-full">
        <button
          onClick={onAccept}
          className="w-full px-6 py-3 bg-emerald-600 text-white rounded-full font-semibold hover:bg-emerald-700 active:scale-95 transition-all"
        >
          موافق
        </button>

        <a
          href="/ar/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full px-6 py-3 border border-slate-300 text-slate-700 rounded-full font-medium hover:bg-slate-50 active:scale-95 transition-all"
        >
          التفاصيل
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  );
}
