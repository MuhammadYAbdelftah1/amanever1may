import Image from 'next/image';
import { FileText } from 'lucide-react';
import { FOOTER_CONFIG } from '@/lib/data/footer-config';
import { FooterSocial } from './footer-social';

export function FooterBrand() {
  const { brand } = FOOTER_CONFIG;

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

      {/* Tagline */}
      <p className="text-sm text-slate-300 leading-relaxed max-w-md mb-4">
        {brand.tagline}
      </p>

      {/* CR Number */}
      <div className="flex items-center gap-2 text-xs text-slate-400 pt-4 border-t border-white/10">
        <FileText className="w-4 h-4" />
        <span>سجل تجاري: {brand.cr}</span>
      </div>

      {/* Social Icons */}
      <FooterSocial />
    </div>
  );
}
