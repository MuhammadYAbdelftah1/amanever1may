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
    <footer role="contentinfo" className="bg-slate-900 pt-16 md:pt-20 pb-6">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Zone 1: Main Grid (5 columns on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-8 lg:gap-12">
          {/* Column 1-2: Brand + Newsletter (spans 2 columns) */}
          <FooterBrandNew />

          {/* Column 3-4: Links - المنصة + للشركاء (spans 2 columns) */}
          <FooterLinksNew />

          {/* Column 5: Contact */}
          <FooterContactNew />

          {/* Column 6: Download (wraps to new row on smaller screens) */}
          <div className="md:col-start-1 md:col-span-1 lg:col-start-auto">
            <FooterDownloadNew />
          </div>
        </div>

        {/* Zone 2: Middle Strip (Trust Badges) */}
        <div className="border-t border-white/10 py-6 mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-400">
            {/* Left side */}
            <div className="flex flex-wrap items-center gap-4">
              {trustBadges.slice(0, 2).map((badge, index) => {
                const Icon = badge.icon === 'shield' ? Shield : Building2;
                return (
                  <div key={index} className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                    <span>{badge.label}</span>
                  </div>
                );
              })}
            </div>

            {/* Right side */}
            <div className="flex flex-wrap items-center gap-4 md:justify-end">
              {trustBadges.slice(2).map((badge, index) => {
                const Icon = badge.icon === 'credit-card' ? CreditCard : Lock;
                return (
                  <div key={index} className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                    <span>{badge.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Zone 3: Bottom Bar (Legal Links + Copyright + Compliance Badges) */}
        <FooterBottomBarNew />
      </div>
    </footer>
  );
}
