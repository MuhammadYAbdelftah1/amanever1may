/**
 * Footer (Global)
 * Appears on every page. Must be mounted in root layout.
 * 
 * TODO before launch:
 * [ ] Replace all social platform URLs with real profile links.
 * [ ] Add real App Store and Google Play badge URLs (currently only AppGallery).
 * [ ] Convert hash anchors (#about, #features, etc.) to real routes
 *     when target pages exist (e.g., /ar/about, /ar/features).
 * [ ] Verify CR number (7038166471) is current and correct.
 * [ ] Create /ar/privacy, /ar/terms, /ar/contact pages before linking.
 * [ ] If newsletter block is enabled, wire /api/newsletter/subscribe endpoint.
 * [ ] Verify all trust badge claims (PDPL, MOH licensing) with legal team.
 * [ ] Test all tel: and mailto: links on real iOS and Android devices.
 * [ ] Run accessibility audit — verify WCAG AA color contrast.
 */

import { Shield, CreditCard, Building2, Lock } from 'lucide-react';
import { FooterBrand } from './footer/footer-brand';
import { FooterLinks } from './footer/footer-links';
import { FooterContact } from './footer/footer-contact';
import { FooterDownload } from './footer/footer-download';
import { FooterBottomBar } from './footer/footer-bottom-bar';

export function Footer() {
  return (
    <footer role="contentinfo" className="bg-slate-900 pt-16 md:pt-20 pb-6">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Zone 1: Main Grid (4 columns) */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-12">
          {/* Column 1: Brand (spans 2 columns on desktop) */}
          <FooterBrand />

          {/* Column 2: Quick Links */}
          <FooterLinks />

          {/* Column 3: Contact */}
          <FooterContact />

          {/* Column 4: Download */}
          <FooterDownload />
        </div>

        {/* Zone 2: Middle Strip (Trust Badges) */}
        <div className="border-t border-white/10 py-6 mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-400">
            {/* Left side */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>متوافق مع PDPL</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-emerald-400" />
                <span>مرخّص من وزارة الصحة</span>
              </div>
            </div>

            {/* Right side */}
            <div className="flex flex-wrap items-center gap-4 md:justify-end">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-emerald-400" />
                <span>طرق الدفع: مدى · فيزا · ماستركارد · Apple Pay · تابي · تمارا</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-400" />
                <span>موقع آمن — SSL 256-bit</span>
              </div>
            </div>
          </div>
        </div>

        {/* Zone 3: Bottom Bar (Copyright) */}
        <FooterBottomBar />
      </div>
    </footer>
  );
}
