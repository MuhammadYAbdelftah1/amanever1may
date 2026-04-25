/**
 * Footer (Global) - New Structure
 * 
 * CHANGES FROM OLD FOOTER:
 * 1. Removed "حجوزاتي واستشاراتي الطبية" (app function, not website page)
 * 2. Reorganized links into 3 clear sections: المنصة / للشركاء / قانوني
 * 3. Added new links: المدونة, FAQ, Careers, للمستثمرين, كن شريكاً
 * 4. Enhanced contact section: working hours, "ابدأ محادثة" button, languages, form link
 * 5. Enhanced download section: QR code, rating & download count
 * 6. Added newsletter signup in brand section
 * 7. Added "صنع في السعودية" badge
 * 8. Updated copyright to "2024 - 2026"
 * 9. Moved legal links to bottom bar
 * 10. Added placeholders for Vision 2030, SDAIA, ZATCA badges
 * 11. Mobile: Accordions for link sections
 * 
 * TODO BEFORE LAUNCH:
 * [ ] Replace APP_RATING and DOWNLOAD_COUNT placeholders in config
 * [ ] Generate QR code image for app download
 * [ ] Add newsletter backend endpoint
 * [ ] Create all new route pages (blog, faq, careers, etc.)
 * [ ] Confirm and add compliance badge images (Vision 2030, SDAIA, ZATCA)
 * [ ] Update all social media URLs
 * [ ] Test mobile accordions on real devices
 * [ ] Run Lighthouse accessibility audit (target ≥ 95)
 */

import { Shield, CreditCard, Building2, Lock } from 'lucide-react';
import { FooterBrandNew } from './footer/footer-brand-new';
import { FooterLinksNew } from './footer/footer-links-new';
import { FooterContactNew } from './footer/footer-contact-new';
import { FooterDownloadNew } from './footer/footer-download-new';
import { FooterBottomBarNew } from './footer/footer-bottom-bar-new';
import { FOOTER_CONFIG_NEW } from '@/lib/data/footer-config-new';

export function FooterNew() {
  const { trustBadges } = FOOTER_CONFIG_NEW;

  return (
    <footer role="contentinfo" className="bg-white border-t border-[#E5EAEB] pt-10 md:pt-12 pb-4">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Zone 1: Main Grid - Stack on mobile, 12 cols on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 lg:gap-8">
          {/* Column 1-4: Brand + Newsletter + Social (spans 4 columns) */}
          <div className="md:col-span-4">
            <FooterBrandNew />
          </div>

          {/* Column 5-6: المنصة (spans 2 columns) */}
          <div className="md:col-span-2">
            <FooterLinksNew section="platform" />
          </div>

          {/* Column 7-8: للشركاء (spans 2 columns) */}
          <div className="md:col-span-2">
            <FooterLinksNew section="partners" />
          </div>

          {/* Column 9-10: Contact (spans 2 columns) */}
          <div className="md:col-span-2">
            <FooterContactNew />
          </div>

          {/* Column 11-12: Download (spans 2 columns) */}
          <div className="md:col-span-2">
            <FooterDownloadNew />
          </div>
        </div>

        {/* Zone 2: Trust Badges Strip */}
        <div className="bg-[#F8FAFB] border-t border-[#E5EAEB] py-4 mt-6 -mx-4 md:-mx-8 px-4 md:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-4 md:gap-x-6 gap-y-2 text-xs text-[#5A6B6C]">
            {/* All badges in one row */}
            {trustBadges.map((badge, index) => {
              let Icon;
              if (badge.icon === 'shield') Icon = Shield;
              else if (badge.icon === 'building') Icon = Building2;
              else if (badge.icon === 'credit-card') Icon = CreditCard;
              else Icon = Lock;
              
              return (
                <div key={index} className="flex items-center gap-1.5">
                  <Icon className="w-4 h-4 text-[#4A8B8E]" aria-hidden="true" />
                  <span>{badge.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Zone 3: Bottom Bar (Legal Links + Copyright + Compliance Badges) */}
        <FooterBottomBarNew />
      </div>
    </footer>
  );
}
