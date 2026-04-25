import { FOOTER_CONFIG_NEW } from '@/lib/data/footer-config-new';
import { SOCIAL_ICONS } from '@/components/icons/social-icons';

export function FooterSocial() {
  const { social } = FOOTER_CONFIG_NEW;

  return (
    <div className="flex items-center justify-center md:justify-start gap-2 mt-6">
      {social.map((item) => {
        const Icon = SOCIAL_ICONS[item.platform as keyof typeof SOCIAL_ICONS];
        
        return (
          <a
            key={item.platform}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
            className="w-9 h-9 rounded-full bg-[#F8FAFB] hover:bg-[#4A8B8E] border border-[#E5EAEB] transition-colors flex items-center justify-center focus:ring-2 focus:ring-[#4A8B8E] focus:outline-none group"
          >
            <Icon className="w-5 h-5 text-[#5A6B6C] group-hover:text-white transition-colors" />
          </a>
        );
      })}
    </div>
  );
}
