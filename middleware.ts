import createMiddleware from 'next-intl/middleware';
import { routing } from './routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the pathname is missing a locale
  const pathnameIsMissingLocale = routing.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // If accessing root or any path without locale, redirect to Arabic
  if (pathnameIsMissingLocale) {
    const locale = 'ar'; // Force Arabic as default
    return NextResponse.redirect(
      new URL(`/${locale}${pathname}`, request.url)
    );
  }

  return intlMiddleware(request);
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(ar|en|ur)/:path*', '/((?!_next|_vercel|.*\\..*).*)'],
};
