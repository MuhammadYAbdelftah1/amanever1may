'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Globe, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { localeConfigs } from '@/lib/constants';
import { locales } from '@/routing';
import { useState, useRef, useEffect } from 'react';

interface LanguageSwitcherProps {
  currentLocale: string;
}

export function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const switchLocale = (newLocale: string) => {
    // Remove current locale from pathname
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '');
    
    // Build new path with new locale
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    
    // Set cookie for persistence
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
    
    // Close dropdown
    setIsOpen(false);
    
    // Navigate to new locale
    router.push(newPath);
    router.refresh();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="text-[#4A8B8E] hover:text-[#356B6E] hover:bg-[#4A8B8E]/10 transition-all duration-300 hover:scale-110 relative"
        aria-label={currentLocale === 'ar' ? 'تبديل اللغة' : currentLocale === 'ur' ? 'زبان تبدیل کریں' : 'Switch language'}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Globe className="h-5 w-5" aria-hidden="true" />
        {/* Active indicator dot */}
        <span className="absolute top-1 right-1 w-2 h-2 bg-[#4A8B8E] rounded-full animate-pulse" />
      </Button>

      {/* Simple Dropdown */}
      {isOpen && (
        <div 
          className="absolute top-full right-0 mt-2 bg-white border border-neutral-200 rounded-lg shadow-xl p-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
          role="menu"
          aria-label={currentLocale === 'ar' ? 'قائمة اللغات' : currentLocale === 'ur' ? 'زبان کی فہرست' : 'Language menu'}
        >
          <div className="flex flex-col gap-0.5">
            {locales.map((locale) => (
              <button
                key={locale}
                onClick={() => switchLocale(locale)}
                className={`flex items-center gap-1.5 px-2 py-1 rounded transition-all duration-200 ${
                  currentLocale === locale
                    ? 'bg-[#4A8B8E]/20 text-[#4A8B8E]'
                    : 'text-neutral-700 hover:text-[#4A8B8E] hover:bg-[#4A8B8E]/10'
                }`}
                role="menuitem"
                aria-current={currentLocale === locale ? 'true' : undefined}
              >
                <span className="text-sm">{localeConfigs[locale].flag}</span>
                <span className="font-medium text-xs">
                  {locale === 'ar' ? 'ع' : locale === 'en' ? 'E' : 'ا'}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
