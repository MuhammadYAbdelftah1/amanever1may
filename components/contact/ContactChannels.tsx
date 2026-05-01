"use client";

import Link from "next/link";
import { Phone, MessageCircle, PhoneCall, Mail } from "lucide-react";
import { knowledge } from "@/lib/knowledge";

const channels = [
  {
    Icon: Phone,
    title: "خدمة العملاء",
    description: "للاستفسارات العامة وحجز الاستشارات",
    value: "+966 92 000 18041",
    href: "tel:+966920018041",
    bgColor: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    Icon: PhoneCall,
    title: "الهاتف الأرضي",
    description: "رقم الهاتف برمز الدولة",
    value: "+966 12 614 2206",
    href: "tel:+966126142206",
    bgColor: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    Icon: MessageCircle,
    title: "واتساب",
    description: "الأسرع للرد، 7 أيام في الأسبوع",
    value: "9200",
    href: "https://wa.me/9200",
    bgColor: "bg-[#25D366]/10",
    iconColor: "text-[#25D366]",
  },
  {
    Icon: Mail,
    title: "البريد الإلكتروني",
    description: "للاستفسارات الرسمية والمراسلات",
    value: "info@amanever.com",
    href: "mailto:info@amanever.com",
    bgColor: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
];

export function ContactChannels() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {channels.map((channel) => {
          const { Icon } = channel;
          return (
            <Link
              key={channel.value}
              href={channel.href}
              className="group rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm transition-all hover:shadow-md"
            >
              {/* Image Banner - Full Width at Top */}
              <div className="w-full h-32 md:h-40 overflow-hidden bg-emerald-50 relative border-b-2 border-dashed border-emerald-300">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-3">
                  <div className="text-xs md:text-sm font-bold text-emerald-700 mb-1">
                    للمصممة
                  </div>
                  <div className="text-[10px] md:text-xs text-emerald-600 mb-2 px-2 leading-tight">
                    {channel.title}
                  </div>
                  <div className="text-[9px] md:text-[10px] text-gray-500 font-semibold mb-0.5">
                    Desktop: Full Width × 160px
                  </div>
                  <div className="text-[8px] md:text-[9px] text-gray-500 mb-0.5">
                    Tablet: Full Width × 160px
                  </div>
                  <div className="text-[8px] md:text-[9px] text-gray-500">
                    Mobile: Full Width × 128px
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                {/* Title */}
                <h3 className="mb-2 text-lg font-semibold text-slate-900">
                  {channel.title}
                </h3>

                {/* Description */}
                <p className="mb-3 text-sm text-slate-600">
                  {channel.description}
                </p>

                {/* Value */}
                <p className="font-medium text-slate-900">
                  <bdi>{channel.value}</bdi>
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
