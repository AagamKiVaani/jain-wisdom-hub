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
     * - images (your images folder)
     * - models (your 3D models folder)  <-- ADDED THIS
     *
     * OR paths ending with these extensions:
     * - .png, .jpg, .jpeg, .svg, .webp (Images)
     * - .mp3, .wav (Audio)
     * - .glb, .gltf (3D Models)         <-- ADDED THIS
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sounds|images|models|google.*\\.html|admin|sitemap.xml|robots.txt|manifest.json|sw.js|custom-sw.js|workbox-|worker-|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp3|wav|glb|gltf)$).*)',
  ],
};