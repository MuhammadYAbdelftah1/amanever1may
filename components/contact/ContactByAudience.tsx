"use client";

import Link from "next/link";
import {
  Heart,
  Stethoscope,
  Building2,
  TrendingUp,
  Smartphone,
  MessageCircle,
  Download,
  Mail,
  FileText,
  BarChart3,
  ClipboardList,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppDownloadButtons } from "@/components/shared/app-download-buttons";

type AudienceCard = {
  Icon: LucideIcon;
  badge: string;
  badgeColor: "emerald" | "blue" | "amber" | "violet" | "teal";
  title: string;
  description: string;
  primaryAction: { Icon: LucideIcon; label: string; href: string };
  secondaryAction?: { Icon: LucideIcon; label: string; href: string };
  downloadAction?: { Icon: LucideIcon; label: string; href: string };
};

const audiences: AudienceCard[] = [
  {
    Icon: Heart,
    badge: "للمستفيدين",
    badgeColor: "emerald",
    title: "مستفيد أو فرد من العائلة",
    description:
      "احجز استشارة، اعرف عن الباقات، أو حلّ مشكلة في التطبيق.",
    primaryAction: {
      Icon: MessageCircle,
      label: "واتساب",
      href: "https://wa.me/966544608220",
    },
    secondaryAction: {
      Icon: Download,
      label: "حمّل التطبيق",
      href: "#download",
    },
  },
  {
    Icon: Stethoscope,
    badge: "للأطباء",
    badgeColor: "blue",
    title: "طبيب يبغى ينضم",
    description: "انضم لشبكة أطبائنا — يجب توفر ترخيص SCFHS ساري.",
    primaryAction: {
      Icon: Mail,
      label: "سجّل كطبيب",
      href: "mailto:partnerships@amanever.com?subject=طلب%20انضمام%20كطبيب",
    },
    secondaryAction: {
      Icon: FileText,
      label: "شروط الانضمام",
      href: "/ar/doctor-platform",
    },
    downloadAction: {
      Icon: Download,
      label: "حمّل التطبيق",
      href: "#download",
    },
  },
  {
    Icon: Building2,
    badge: "للشركاء",
    badgeColor: "amber",
    title: "شريك أو منشأة",
    description: "للمستشفيات والصيدليات وشركات التأمين والتقنية.",
    primaryAction: {
      Icon: Mail,
      label: "partnerships@amanever.com",
      href: "mailto:partnerships@amanever.com",
    },
    secondaryAction: {
      Icon: BarChart3,
      label: "اطلب ديمو",
      href: "/ar/services#tech",
    },
    downloadAction: {
      Icon: Download,
      label: "حمّل التطبيق",
      href: "#download",
    },
  },
  {
    Icon: TrendingUp,
    badge: "للمسوّقين",
    badgeColor: "violet",
    title: "مسوّق بالعمولة",
    description: "اربح عمولة عن كل مشترك جديد عبر منصاتك الاجتماعية.",
    primaryAction: {
      Icon: Mail,
      label: "affiliates@amanever.com",
      href: "mailto:affiliates@amanever.com",
    },
    secondaryAction: {
      Icon: ClipboardList,
      label: "اعرف عن البرنامج",
      href: "/ar/affiliates",
    },
    downloadAction: {
      Icon: Download,
      label: "حمّل التطبيق",
      href: "#download",
    },
  },
  {
    Icon: Smartphone,
    badge: "حمّل التطبيق",
    badgeColor: "teal",
    title: "احصل على تطبيق أمان إيفر",
    description: "حمّل التطبيق الآن واستمتع بجميع الخدمات في مكان واحد.",
    primaryAction: {
      Icon: Download,
      label: "App Store",
      href: "https://apps.apple.com/sa/app/amanever",
    },
    secondaryAction: {
      Icon: Download,
      label: "Google Play",
      href: "https://play.google.com/store/apps/details?id=com.amanever",
    },
  },
];

const badgeColors = {
  emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
  blue: "bg-blue-50 text-blue-700 border-blue-200",
  amber: "bg-amber-50 text-amber-700 border-amber-200",
  violet: "bg-violet-50 text-violet-700 border-violet-200",
  teal: "bg-teal-50 text-teal-700 border-teal-200",
};

export function ContactByAudience() {
  return (
    <section className="container mx-auto px-4 py-16">
      {/* Heading */}
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
          تواصل حسب احتياجك
        </h2>
        <p className="text-lg text-slate-600">
          وفّرنا قنوات مخصصة لكل جمهور — اختر اللي يناسبك.
        </p>
      </div>

      {/* Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {audiences.map((audience) => {
          const { Icon } = audience;
          const PrimaryIcon = audience.primaryAction.Icon;
          const SecondaryIcon = audience.secondaryAction?.Icon;
          const DownloadIcon = audience.downloadAction?.Icon;

          return (
            <div
              key={audience.badge}
              className="group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Image Banner - Full Width at Top */}
              <div className="absolute inset-x-0 top-0 h-32 md:h-40 overflow-hidden bg-emerald-50 relative border-b-2 border-dashed border-emerald-300 rounded-t-2xl">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-3">
                  <div className="text-xs md:text-sm font-bold text-emerald-700 mb-1">
                    للمصممة
                  </div>
                  <div className="text-[10px] md:text-xs text-emerald-600 mb-2 px-2 leading-tight">
                    {audience.title}
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

              {/* Badge */}
              <span
                className={`absolute start-4 top-36 md:top-44 z-10 rounded-full border px-3 py-1 text-xs font-medium ${
                  badgeColors[audience.badgeColor]
                }`}
              >
                {audience.badge}
              </span>

              {/* Content Section */}
              <div className="mt-32 md:mt-40">
                {/* Title */}
                <h3 className="mb-2 text-lg font-semibold text-slate-900">
                  {audience.title}
                </h3>

                {/* Description */}
                <p className="mb-6 text-sm text-slate-600">
                  {audience.description}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2">
                {/* Special handling for app download card */}
                {audience.badge === "حمّل التطبيق" ? (
                  <div className="flex flex-col gap-3">
                    <AppDownloadButtons layout="vertical" showHuawei={true} />
                  </div>
                ) : (
                  <>
                    <Button
                      asChild
                      className="w-full bg-emerald-600 text-white hover:bg-emerald-700"
                    >
                      <Link href={audience.primaryAction.href}>
                        <PrimaryIcon className="h-4 w-4" aria-hidden="true" />
                        {audience.primaryAction.label}
                      </Link>
                    </Button>

                    {audience.secondaryAction && SecondaryIcon && (
                      <Button asChild variant="outline" className="w-full">
                        <Link href={audience.secondaryAction.href}>
                          <SecondaryIcon className="h-4 w-4" aria-hidden="true" />
                          {audience.secondaryAction.label}
                        </Link>
                      </Button>
                    )}

                    {audience.downloadAction && DownloadIcon && (
                      <Button 
                        asChild 
                        variant="outline" 
                        className="w-full border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                      >
                        <Link href={audience.downloadAction.href}>
                          <DownloadIcon className="h-4 w-4" aria-hidden="true" />
                          {audience.downloadAction.label}
                        </Link>
                      </Button>
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
