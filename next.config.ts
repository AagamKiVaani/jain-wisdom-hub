import type { NextConfig } from "next";
// @ts-expect-error next-pwa does not have types
import withPWAInit from "next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  
  // Custom Aggressive Caching Rule for i18n
  runtimeCaching: [
    {
      // 👇 FIXED: Added type definition for 'request'
      urlPattern: ({ request }: { request: Request }) => request.mode === 'navigate',
      handler: 'NetworkFirst',
      options: {
        cacheName: 'pages-cache',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
    {
      // 2. Match static assets (images, fonts, scripts)
      urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|js|css|woff|woff2)$/,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'assets-cache',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        },
      },
    },
    {
      // 3. Catch-all for Next.js internal data
      urlPattern: /^https?.*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'others-cache',
        expiration: { maxEntries: 200, maxAgeSeconds: 24 * 60 * 60 },
      },
    },
  ],
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    qualities: [75, 100], 
  },
};

export default withPWA(nextConfig);