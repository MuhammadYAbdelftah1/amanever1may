import Image from 'next/image';
import { FOOTER_CONFIG_NEW } from '@/lib/data/footer-config-new';

export function FooterBottomBarNew() {
  const { copyright, legalLinks, complianceBadges } = FOOTER_CONFIG_NEW;

  // Filter enabled compliance badges
  const enabledBadges = Object.entries(complianceBadges)
    .filter(([_, badge]) => badge.enabled)
    .map(([key, badge]) => ({ key, ...badge }));

  return (
    <div className="border-t border-[#E5EAEB] py-4 mt-6">
      {/* Single row with legal links and badges */}
      <div className="flex flex-col gap-4">
        {/* Legal Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs">
          {legalLinks.map((link, index) => (
            <span key={index} className="flex items-center gap-2">
              <a
                href={link.url}
                className="text-[#8A9899] hover:text-[#4A8B8E] transition focus:ring-2 focus:ring-[#4A8B8E] focus:outline-none rounded px-1"
              >
                {link.label}
              </a>
              {index < legalLinks.length - 1 && (
                <span className="text-[#E5EAEB]">·</span>
              )}
            </span>
          ))}
        </div>

        {/* Compliance Badges */}
        {enabledBadges.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-3">
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
                  height={24}
                  className="h-6 w-auto opacity-80 hover:opacity-100 transition"
                />
              </div>
            ))}
          </div>
        )}

        {/* Copyright */}
        <p className="text-xs text-[#8A9899] text-center">
          {copyright}
        </p>
      </div>
    </div>
  );
}
