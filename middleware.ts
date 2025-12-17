import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define your supported languages
const locales = ['en', 'hi', 'kn'];
const defaultLocale = 'en';

export function middleware(request: NextRequest) {
  // 1. Get the path the user is trying to visit (e.g., "/" or "/about")
  const pathname = request.nextUrl.pathname;

  // 2. Check if the path already has a language (e.g., "/en/about")
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // 3. If missing language, redirect to the default one (English)
  if (pathnameIsMissingLocale) {
    const url = new URL(`/${defaultLocale}${pathname}`, request.url);
    return NextResponse.redirect(url);
  }
}

export const config = {
  // This tells the middleware to run on ALL paths EXCEPT:
  // - api routes
  // - static files like images, fonts, favicon
  // - standard Next.js internal files (_next)
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)'],
};