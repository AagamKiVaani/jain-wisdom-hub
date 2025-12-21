import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ['en', 'hi', 'kn'];
const defaultLocale = 'en';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if the path already has a language
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // If missing language, redirect to default
  if (pathnameIsMissingLocale) {
    const url = new URL(`/${defaultLocale}${pathname}`, request.url);
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - sounds (your audio folder)
     * - images (if you have an images folder)
     * * OR paths ending with these extensions:
     * - .png, .jpg, .jpeg, .svg, .webp (Images)
     * - .mp3, .wav (Audio)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sounds|images|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp3|wav)$).*)',
  ],
};