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
              {/* Badge */}
              <span
                className={`absolute start-4 top-4 rounded-full border px-3 py-1 text-xs font-medium ${
                  badgeColors[audience.badgeColor]
                }`}
              >
                {audience.badge}
              </span>

              {/* Icon */}
              <div className="mb-4 mt-8">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                  <Icon className="h-6 w-6 text-slate-700" aria-hidden="true" />
                </div>
              </div>

              {/* Title */}
              <h3 className="mb-2 text-lg font-semibold text-slate-900">
                {audience.title}
              </h3>

              {/* Description */}
              <p className="mb-6 text-sm text-slate-600">
                {audience.description}
              </p>

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
