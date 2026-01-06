import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "../globals.css";
import { Providers } from "../provider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"
import YouTubeToast from "@/components/YouTubeToast";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import LocaleSync from "@/components/LocaleSync";
import RegisterPWA from "../RegisterPWA";

// 1. Optimize Inter (Variable font, usually handles itself well, but subsets help)
const inter = Inter({ subsets: ["latin"] });

// 2. Optimize Poppins (THE BIG FIX)
// Removed 300, 500, 600, 800. Kept only what we strictly use.
const poppins = Poppins({
  subsets: ["devanagari", "latin"],
  weight: ["400", "700", "900"], // Regular, Bold, Black (Title)
  variable: "--font-hindi",
  display: "swap", // Ensures text shows up immediately (FCP improvement)
});

export const metadata: Metadata = {
  title: "Jain Wisdom Hub",
  description: "A digital encyclopedia of Jain Principles",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: '/icons/logo.png', sizes: '32x32' },
      { url: '/icons/logo.png', sizes: '192x192' }
    ],
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
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  
  const isHindi = lang === 'hi';
  const fontClass = isHindi ? poppins.className : inter.className;

  return (
    <html lang={lang} suppressHydrationWarning>
      <body 
        className={`
          ${fontClass} 
          bg-white dark:bg-black text-gray-900 dark:text-gray-100 min-h-screen flex flex-col
          /* Optimized Line Height for Hindi */
          ${isHindi ? 'text-[125%] leading-relaxed' : ''}
        `}
      >
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