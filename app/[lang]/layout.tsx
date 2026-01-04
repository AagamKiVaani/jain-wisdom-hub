import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css"; // Go up one level to find globals.css
import { Providers } from "../provider"; // Import the provider we made
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"
import YouTubeToast from "@/components/YouTubeToast";

import { Analytics } from "@vercel/analytics/react";

import { SpeedInsights } from "@vercel/speed-insights/next";

import LocaleSync from "@/components/LocaleSync";

import RegisterPWA from "../RegisterPWA";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Jain Wisdom Hub",
  description: "A digital encyclopedia of Jain Principles",
  manifest: "/manifest.json",

  icons: {
    icon: [
      // Browser Tab (Standard)
      { url: '/icons/logo.png', sizes: '32x32' }, 
      // High Res Tab (Optional but good for Retina screens)
      { url: '/icons/logo.png', sizes: '192x192' } 
    ],
    // iOS Home Screen Icon (Apple devices are picky)
    apple: [
      { url: '/icons/logo.png', sizes: '180x180' },
    ],
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>; // <--- Changed this type
}) {
  const { lang } = await params; // <--- Added await here

  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={`${inter.className} bg-white dark:bg-black text-gray-900 dark:text-gray-100 min-h-screen flex flex-col`}>
        <Providers>
          <RegisterPWA />
          <LocaleSync lang={lang} />
          <Navbar lang={lang} />
          <main className="grow">
            {children}
          </main>

          <Footer lang={lang} />

          <Analytics />
          <SpeedInsights />

          <YouTubeToast />
        </Providers>
      </body>
    </html>
  );
}