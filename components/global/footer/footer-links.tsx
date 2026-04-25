import { FOOTER_CONFIG } from '@/lib/data/footer-config';

export function FooterLinks() {
  const { quickLinks } = FOOTER_CONFIG;

  return (
    <div>
      <h3 className="text-white font-bold text-base mb-5">
        روابط تهمّك
      </h3>
      <ul className="flex flex-col gap-3">
        {quickLinks.map((link, index) => (
          <li key={index}>
            <a
              href={link.url}
              className="text-sm text-slate-300 hover:text-white hover:translate-x-1 transition-all inline-block focus:ring-2 focus:ring-emerald-400 focus:outline-none rounded"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
