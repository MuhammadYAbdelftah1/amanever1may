import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['ar', 'en', 'ur'],
  defaultLocale: 'ar',
  localePrefix: 'always',
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);

export const locales = routing.locales;
export type Locale = (typeof locales)[number];
