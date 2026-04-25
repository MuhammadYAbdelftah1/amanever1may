import Image from 'next/image';
import { FileText, Flag } from 'lucide-react';
import { FOOTER_CONFIG_NEW } from '@/lib/data/footer-config-new';
import { FooterSocial } from './footer-social';

export function FooterBrandNew() {
  const { brand, newsletter } = FOOTER_CONFIG_NEW;

  return (
    <div className="md:col-span-2">
      {/* Logo */}
      <div className="mb-4 flex justify-center md:justify-start">
        <Image
          src={brand.logoSrc}
          alt="أمان إيفر"
          width={120}
          height={48}
          className="h-10 md:h-12 w-auto"
        />
      </div>

      {/* Brand Names */}
      <h3 className="text-lg font-bold text-[#1A2B2C] mb-3 text-center md:text-start">
        {brand.nameAr}
      </h3>

      {/* Tagline - Shortened */}
      <p className="text-sm text-[#5A6B6C] leading-relaxed max-w-md mb-6 text-center md:text-start mx-auto md:mx-0">
        {brand.tagline}
      </p>

      {/* Newsletter Signup */}
      {newsletter.enabled && (
        <div className="mb-6 p-3.5 bg-[#E8F1F1] rounded-lg border border-[#E5EAEB]">
          <p className="text-sm text-[#1A2B2C] mb-3 font-medium">
            {newsletter.title}
          </p>
          <form action={newsletter.action} method="POST" className="flex gap-2">
            <input
              type="email"
              name="email"
              placeholder={newsletter.placeholder}
              required
              className="flex-1 px-3 py-2 bg-white border border-[#E5EAEB] rounded-lg text-sm text-[#1A2B2C] placeholder:text-[#8A9899] focus:ring-2 focus:ring-[#4A8B8E] focus:outline-none"
              aria-label={newsletter.placeholder}
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#4A8B8E] hover:bg-[#356B6E] text-white text-sm font-semibold rounded-lg transition focus:ring-2 focus:ring-[#4A8B8E] focus:outline-none"
            >
              {newsletter.buttonText}
            </button>
          </form>
        </div>
      )}

      {/* CR Number */}
      <div className="text-xs text-[#8A9899] pt-4 border-t border-[#E5EAEB] mb-3 text-center md:text-start">
        <span>سجل تجاري: {brand.cr}</span>
      </div>

      {/* Made in Saudi Badge */}
      {brand.madeinSaudi && (
        <div className="mb-4 flex justify-center md:justify-start">
          <span className="inline-flex items-center gap-1.5 bg-[#E8F1F1] text-[#356B6E] px-3 py-1 rounded-full text-xs font-medium">
            <Flag className="w-3.5 h-3.5" aria-hidden="true" />
            🇸🇦 صُنعت بكل حب في المملكة العربية السعودية
          </span>
        </div>
      )}

      {/* Social Icons */}
      <div className="flex justify-center md:justify-start">
        <FooterSocial />
      </div>
    </div>
  );
}
