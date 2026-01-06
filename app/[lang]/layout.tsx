import type { Metadata } from "next";
// 1. Import Poppins (The best match for Inter) instead of Noto Sans
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

// 2. Configure Inter (English/Kannada)
const inter = Inter({ subsets: ["latin"] });

// 3. Configure Poppins (Specifically for Hindi)
const poppins = Poppins({
  subsets: ["devanagari", "latin"],
  // We MUST load '900' to match the 'font-black' of the title
  weight: ["300", "400", "500", "600", "700", "800", "900"], 
  variable: "--font-hindi",
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
  
  // 4. Identify Hindi
  const isHindi = lang === 'hi';

  // 5. Select Font
  // If Hindi -> Use Poppins. Else -> Use Inter.
  const fontClass = isHindi ? poppins.className : inter.className;

  return (
    <html lang={lang} suppressHydrationWarning>
      <body 
        className={`
          ${fontClass} 
          bg-white dark:bg-black text-gray-900 dark:text-gray-100 min-h-screen flex flex-col
          /* 6. THE MAGIC FIX: */
          /* If Hindi, scale EVERYTHING up by 125% and relax the line height */
          /* This makes the Hindi text match the English "Visual Weight" perfectly */
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