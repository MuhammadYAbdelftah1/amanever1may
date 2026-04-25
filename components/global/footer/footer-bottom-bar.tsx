import { FOOTER_CONFIG } from '@/lib/data/footer-config';

export function FooterBottomBar() {
  const { copyright, legalLinks } = FOOTER_CONFIG;

  return (
    <div className="border-t border-white/10 py-6 mt-12">
      <div className="flex flex-col md:flex-row md:justify-between items-center gap-4">
        {/* Copyright */}
        <p className="text-xs text-slate-500 text-center md:text-start">
          {copyright}
        </p>

        {/* Legal Links */}
        <div className="flex items-center gap-2 text-xs">
          {legalLinks.map((link, index) => (
            <span key={index} className="flex items-center gap-2">
              <a
                href={link.url}
                className="text-slate-400 hover:text-white transition focus:ring-2 focus:ring-emerald-400 focus:outline-none rounded"
              >
                {link.label}
              </a>
              {index < legalLinks.length - 1 && (
                <span className="text-slate-600">·</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
