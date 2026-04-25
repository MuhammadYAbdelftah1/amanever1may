"use client";

import Link from "next/link";
import { Phone, MessageCircle, PhoneCall, Mail } from "lucide-react";
import { knowledge } from "@/lib/knowledge";

const channels = [
  {
    Icon: Phone,
    title: "الخط الساخن",
    description: "للاستفسارات العامة وحجز الاستشارات",
    value: "920018041",
    href: "tel:920018041",
    bgColor: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    Icon: MessageCircle,
    title: "واتساب",
    description: "الأسرع للرد، 7 أيام في الأسبوع",
    value: "0544608220",
    href: "https://wa.me/966544608220",
    bgColor: "bg-[#25D366]/10",
    iconColor: "text-[#25D366]",
  },
  {
    Icon: PhoneCall,
    title: "الهاتف الأرضي",
    description: "للتواصل من داخل جدة",
    value: "0126142206",
    href: "tel:0126142206",
    bgColor: "bg-emerald-50",
    iconColor: "text-emerald-600",
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
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
            >
              {/* Icon */}
              <div className="mb-4">
                <div
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-full ${channel.bgColor}`}
                >
                  <Icon
                    className={`h-6 w-6 ${channel.iconColor}`}
                    aria-hidden="true"
                  />
                </div>
              </div>

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
            </Link>
          );
        })}
      </div>
    </section>
  );
}
