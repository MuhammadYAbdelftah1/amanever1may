import Image from 'next/image';
import { FOOTER_CONFIG_NEW } from '@/lib/data/footer-config-new';

export function FooterBottomBarNew() {
  const { copyright, legalLinks, complianceBadges } = FOOTER_CONFIG_NEW;

  // Filter enabled compliance badges
  const enabledBadges = Object.entries(complianceBadges)
    .filter(([_, badge]) => badge.enabled)
    .map(([key, badge]) => ({ key, ...badge }));

  return (
    <div className="border-t border-white/10 py-6 mt-12">
      {/* Legal Links Bar */}
      <div className="flex flex-wrap items-center justify-center gap-2 text-xs mb-6">
        {legalLinks.map((link, index) => (
          <span key={index} className="flex items-center gap-2">
            <a
              href={link.url}
              className="text-slate-400 hover:text-white transition focus:ring-2 focus:ring-emerald-400 focus:outline-none rounded px-2 py-1"
            >
              {link.label}
            </a>
            {index < legalLinks.length - 1 && (
              <span className="text-slate-600">·</span>
            )}
          </span>
        ))}
      </div>

      {/* Main Bottom Bar */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
        {/* Copyright */}
        <p className="text-xs text-slate-500 text-center md:text-start">
          {copyright}
        </p>

        {/* Compliance Badges */}
        {enabledBadges.length > 0 && (
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-4">
            {enabledBadges.map((badge) => (
              <div
                key={badge.key}
                className="flex items-center"
                title={badge.label}
              >
                <Image
                  src={badge.logo}
                  alt={badge.label}
                  width={80}
                  height={32}
                  className="h-8 w-auto opacity-80 hover:opacity-100 transition"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* TODO: Uncomment when compliance badges are confirmed and images are added */}
      {/* 
      Vision 2030 Badge:
      {complianceBadges.vision2030.enabled && (
        <Image
          src={complianceBadges.vision2030.logo}
          alt={complianceBadges.vision2030.label}
          width={80}
          height={32}
        />
      )}
      
      SDAIA Badge:
      {complianceBadges.sdaia.enabled && (
        <Image
          src={complianceBadges.sdaia.logo}
          alt={complianceBadges.sdaia.label}
          width={80}
          height={32}
        />
      )}
      
      ZATCA Badge:
      {complianceBadges.zatca.enabled && (
        <Image
          src={complianceBadges.zatca.logo}
          alt={complianceBadges.zatca.label}
          width={80}
          height={32}
        />
      )}
      */}
    </div>
  );
}
