import Image from 'next/image';
import { FileText, Flag } from 'lucide-react';
import { FOOTER_CONFIG_NEW } from '@/lib/data/footer-config-new';
import { FooterSocial } from './footer-social';

export function FooterBrandNew() {
  const { brand, newsletter } = FOOTER_CONFIG_NEW;

  return (
    <div className="md:col-span-2">
      {/* Logo */}
      <div className="mb-4">
        <Image
          src={brand.logoSrc}
          alt="أمان إيفر"
          width={120}
          height={48}
          className="h-10 md:h-12 w-auto"
        />
      </div>

      {/* Brand Names */}
      <h3 className="text-lg font-bold text-white mb-1">
        {brand.nameAr}
      </h3>
      <p className="text-sm text-slate-400 -mt-1 mb-4">
        {brand.nameEn}
      </p>

      {/* Tagline - Shortened */}
      <p className="text-sm text-slate-300 leading-relaxed max-w-md mb-6">
        {brand.tagline}
      </p>

      {/* Newsletter Signup */}
      {newsletter.enabled && (
        <div className="mb-6 p-4 bg-white/5 rounded-lg border border-white/10">
          <p className="text-sm text-slate-300 mb-3 font-medium">
            {newsletter.title}
          </p>
          <form action={newsletter.action} method="POST" className="flex gap-2">
            <input
              type="email"
              name="email"
              placeholder={newsletter.placeholder}
              required
              className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
              aria-label={newsletter.placeholder}
            />
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg transition focus:ring-2 focus:ring-emerald-400 focus:outline-none"
            >
              {newsletter.buttonText}
            </button>
          </form>
        </div>
      )}

      {/* CR Number */}
      <div className="flex items-center gap-2 text-xs text-slate-400 pt-4 border-t border-white/10 mb-4">
        <FileText className="w-4 h-4" aria-hidden="true" />
        <span>سجل تجاري: {brand.cr}</span>
      </div>

      {/* Made in Saudi Badge */}
      {brand.madeinSaudi && (
        <div className="flex items-center gap-2 text-xs text-emerald-400 mb-4">
          <Flag className="w-4 h-4" aria-hidden="true" />
          <span className="font-medium">🇸🇦 صنع في السعودية</span>
        </div>
      )}

      {/* Social Icons */}
      <FooterSocial />
    </div>
  );
}
