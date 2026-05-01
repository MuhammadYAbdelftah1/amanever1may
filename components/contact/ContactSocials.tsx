"use client";

import { Share2 } from "lucide-react";
import { knowledge } from "@/lib/knowledge";
import { SOCIAL_ICONS } from "@/components/icons/social-icons";

const socialPlatforms = [
  {
    name: "فيسبوك",
    nameEn: "Facebook",
    Icon: SOCIAL_ICONS.facebook,
    url: knowledge.organization.social.facebook,
    color: "hover:bg-[#1877F2]/10 hover:text-[#1877F2]",
  },
  {
    name: "إنستغرام",
    nameEn: "Instagram",
    Icon: SOCIAL_ICONS.instagram,
    url: knowledge.organization.social.instagram,
    color: "hover:bg-[#E4405F]/10 hover:text-[#E4405F]",
  },
  {
    name: "إكس (تويتر)",
    nameEn: "X (Twitter)",
    Icon: SOCIAL_ICONS.x,
    url: knowledge.organization.social.twitter,
    color: "hover:bg-slate-900/10 hover:text-slate-900",
  },
  {
    name: "لينكد إن",
    nameEn: "LinkedIn",
    Icon: SOCIAL_ICONS.linkedin,
    url: knowledge.organization.social.linkedin,
    color: "hover:bg-[#0A66C2]/10 hover:text-[#0A66C2]",
  },
  {
    name: "يوتيوب",
    nameEn: "YouTube",
    Icon: SOCIAL_ICONS.youtube,
    url: knowledge.organization.social.youtube,
    color: "hover:bg-[#FF0000]/10 hover:text-[#FF0000]",
  },
  {
    name: "سناب شات",
    nameEn: "Snapchat",
    Icon: SOCIAL_ICONS.snapchat,
    url: knowledge.organization.social.snapchat,
    color: "hover:bg-[#FFFC00]/20 hover:text-slate-900",
  },
  {
    name: "تيك توك",
    nameEn: "TikTok",
    Icon: SOCIAL_ICONS.tiktok,
    url: knowledge.organization.social.tiktok,
    color: "hover:bg-slate-900/10 hover:text-slate-900",
  },
];

export function ContactSocials() {
  return (
    <section className="bg-slate-50 py-16">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="mb-12 text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <Share2 className="h-6 w-6 text-emerald-600" aria-hidden="true" />
            <h2 className="text-3xl font-bold text-slate-900">تابعنا على السوشيال ميديا</h2>
          </div>
          <p className="text-lg text-slate-600">
            آخر الأخبار، النصائح الصحية، والعروض الحصرية — كل يوم على منصاتنا.
          </p>
        </div>

        {/* Social Icons Grid */}
        <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {socialPlatforms.map((platform) => {
            const { Icon } = platform;
            return (
              <a
                key={platform.nameEn}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group rounded-xl border border-slate-200 bg-white overflow-hidden transition-all hover:-translate-y-1 hover:shadow-md ${platform.color}`}
                aria-label={`تابعنا على ${platform.name}`}
              >
                {/* Image Banner */}
                <div className="w-full h-20 md:h-24 overflow-hidden bg-emerald-50 relative border-b-2 border-dashed border-emerald-300">
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
                    <div className="text-[10px] font-bold text-emerald-700 mb-0.5">
                      للمصممة
                    </div>
                    <div className="text-[9px] text-emerald-600 mb-1 px-1 leading-tight">
                      {platform.name}
                    </div>
                    <div className="text-[8px] text-gray-500 font-semibold mb-0.5">
                      Desktop: Full Width × 96px
                    </div>
                    <div className="text-[7px] text-gray-500">
                      Mobile: Full Width × 80px
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-4">
                  <p className="truncate font-medium text-slate-900">
                    {platform.name}
                  </p>
                  <p className="truncate text-xs text-slate-600" dir="ltr">
                    {platform.nameEn}
                  </p>
                </div>
              </a>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <p className="text-sm text-slate-600">
            شارك تجربتك معنا واستخدم الهاشتاق{" "}
            <span className="font-medium text-emerald-600" dir="ltr">
              #أمان_إيفر
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
