"use client";

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FOOTER_CONFIG_NEW } from '@/lib/data/footer-config-new';

export function FooterLinksNew() {
  const { platformLinks, partnerLinks } = FOOTER_CONFIG_NEW;
  
  // State for mobile accordions
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const sections = [
    {
      id: 'platform',
      title: 'المنصة',
      links: platformLinks,
    },
    {
      id: 'partners',
      title: 'للشركاء',
      links: partnerLinks,
    },
  ];

  return (
    <div className="md:col-span-2">
      {/* Desktop: Side by side columns */}
      <div className="hidden md:grid md:grid-cols-2 gap-8">
        {sections.map((section) => (
          <nav key={section.id} aria-label={section.title}>
            <h3 className="text-white font-bold text-base mb-5">
              {section.title}
            </h3>
            <ul className="flex flex-col gap-3">
              {section.links.map((link, index) => (
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
          </nav>
        ))}
      </div>

      {/* Mobile: Accordions */}
      <div className="md:hidden space-y-4">
        {sections.map((section) => {
          const isOpen = openSection === section.id;
          
          return (
            <div key={section.id} className="border-b border-white/10 pb-4">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between text-white font-bold text-base py-2 focus:ring-2 focus:ring-emerald-400 focus:outline-none rounded"
                aria-expanded={isOpen}
                aria-controls={`${section.id}-links`}
              >
                <span>{section.title}</span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>
              
              {isOpen && (
                <nav
                  id={`${section.id}-links`}
                  aria-label={section.title}
                  className="mt-3"
                >
                  <ul className="flex flex-col gap-3">
                    {section.links.map((link, index) => (
                      <li key={index}>
                        <a
                          href={link.url}
                          className="text-sm text-slate-300 hover:text-white transition inline-block focus:ring-2 focus:ring-emerald-400 focus:outline-none rounded"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
