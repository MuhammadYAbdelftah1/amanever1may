"use client";

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FOOTER_CONFIG_NEW } from '@/lib/data/footer-config-new';

interface FooterLinksNewProps {
  section?: 'platform' | 'partners';
}

export function FooterLinksNew({ section }: FooterLinksNewProps) {
  const { platformLinks, partnerLinks } = FOOTER_CONFIG_NEW;
  
  // State for mobile accordions
  const [isOpen, setIsOpen] = useState(false);

  const links = section === 'platform' ? platformLinks : partnerLinks;
  const title = section === 'platform' ? 'المنصة' : 'للشركاء';

  return (
    <div>
      {/* Desktop: Normal display - centered */}
      <div className="hidden md:block">
        <nav aria-label={title}>
          <h3 className="text-[#1A2B2C] font-bold text-base mb-4 text-center">
            {title}
          </h3>
          <ul className="flex flex-col gap-2.5 items-center">
            {links.map((link, index) => (
              <li key={index} className="flex items-center gap-2 group">
                <span className="text-[#4A8B8E]/40 group-hover:text-[#4A8B8E] transition-colors text-xs">•</span>
                <a
                  href={link.url}
                  className="text-sm text-[#5A6B6C] hover:text-[#4A8B8E] hover:font-medium transition-colors focus:ring-2 focus:ring-[#4A8B8E] focus:outline-none rounded"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Mobile: Accordion - centered */}
      <div className="md:hidden border-b border-[#E5EAEB] pb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-center text-[#1A2B2C] font-bold text-base py-2 focus:ring-2 focus:ring-[#4A8B8E] focus:outline-none rounded gap-2"
          aria-expanded={isOpen}
          aria-controls={`${section}-links`}
        >
          <span>{title}</span>
          <ChevronDown
            className={`w-5 h-5 text-[#4A8B8E] transition-transform ${
              isOpen ? 'rotate-180' : ''
            }`}
            aria-hidden="true"
          />
        </button>
        
        {isOpen && (
          <nav
            id={`${section}-links`}
            aria-label={title}
            className="mt-3"
          >
            <ul className="flex flex-col gap-2.5 items-center">
              {links.map((link, index) => (
                <li key={index} className="flex items-center gap-2 group">
                  <span className="text-[#4A8B8E]/40 group-hover:text-[#4A8B8E] transition-colors text-xs">•</span>
                  <a
                    href={link.url}
                    className="text-sm text-[#5A6B6C] hover:text-[#4A8B8E] transition-colors focus:ring-2 focus:ring-[#4A8B8E] focus:outline-none rounded"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
}
