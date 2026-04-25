import { FOOTER_CONFIG } from '@/lib/data/footer-config';
import { SOCIAL_ICONS } from '@/components/icons/social-icons';

export function FooterSocial() {
  const { social } = FOOTER_CONFIG;

  return (
    <div className="flex items-center gap-3 mt-6">
      {social.map((item) => {
        const Icon = SOCIAL_ICONS[item.platform as keyof typeof SOCIAL_ICONS];
        
        return (
          <a
            key={item.platform}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-emerald-600 transition-colors flex items-center justify-center focus:ring-2 focus:ring-emerald-400 focus:outline-none"
          >
            <Icon className="w-5 h-5 text-white" />
          </a>
        );
      })}
    </div>
  );
}
