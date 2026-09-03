//layout.tsx
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

import NotificationFAB from "@/components/NotificationFab";

import InstallPrompt from "@/components/InstallPrompt";

import MusicOrb from "@/components/MusicOrb";

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

const siteUrl = 'https://jain-wisdom-hub.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Aagam Ki Vaani | Pure Digambar Jain Philosophy & Scriptures",
    template: "%s | Aagam Ki Vaani"
  },
  description: "A digital sanctuary for authentic Digambar Jain philosophy, the 24 Tirthankaras, Namokar Mantra, Kalchakra, Soul & Karma, and downloadable study notes. आगम से ज्ञान, ज्ञान से दर्शन, दर्शन से आत्मकल्याण।",
  keywords: [
    "Aagam Ki Vaani",
    "AagamKiVaani",
    "आगम की वाणी",
    "ಆಗಮ ಕೀ ವಾಣಿ",
    "Jainism",
    "Digambar Jain",
    "Tirthankara",
    "Namokar Mantra",
    "Tattvartha Sutra",
    "Acharya Umaswami",
    "Kundakunda Acharya",
    "Samayasara",
    "Kalchakra",
    "Soul and Karma",
    "Jain Philosophy",
    "Jain Notes PDF",
    "Aagam"
  ],
  authors: [{ name: "Aagam Ki Vaani", url: "https://www.youtube.com/@AagamKiVani" }],
  creator: "Aagam Ki Vaani",
  publisher: "Aagam Ki Vaani",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: '/icons/favicon-32x32.png', sizes: '32x32' },
      { url: '/icons/icon-192x192.png', sizes: '192x192' },
      { url: '/icons/icon-512x512.png', sizes: '512x512' }
    ],
    apple: [
      { url: '/icons/apple-touch-icon.png', sizes: '180x180' },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["hi_IN", "kn_IN"],
    url: siteUrl,
    siteName: "Aagam Ki Vaani",
    title: "Aagam Ki Vaani | Authentic Digambar Jain Wisdom",
    description: "Explore the 24 Tirthankaras, Namokar Mantra, Kalchakra, and authentic Digambar Jain scripture digitized for the modern seeker.",
    images: [
      {
        url: "/icons/logo.png",
        width: 512,
        height: 512,
        alt: "Aagam Ki Vaani Sacred Master Emblem"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Aagam Ki Vaani",
    description: "Digitizing the sacred sound of the Tirthankaras for the modern world. आगम से ज्ञान, ज्ञान से दर्शन, दर्शन से आत्मकल्याण।",
    images: ["/icons/logo.png"],
  },
  alternates: {
    canonical: "/",
    languages: {
      "en": "/en",
      "hi": "/hi",
      "kn": "/kn",
    },
  },
  verification: {
    google: "googlef82a704e5ae057a8",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        "url": siteUrl,
        "name": "Aagam Ki Vaani",
        "alternateName": ["आगम की वाणी", "ಆಗಮ ಕೀ ವಾಣಿ", "AagamKiVaani"],
        "description": "Authentic Digambar Jain philosophy, Tirthankaras, scriptures, and sacred knowledge.",
        "inLanguage": ["en", "hi", "kn"]
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        "name": "Aagam Ki Vaani",
        "url": siteUrl,
        "logo": `${siteUrl}/icons/logo.png`,
        "sameAs": [
          "https://www.youtube.com/@AagamKiVani",
          "https://www.instagram.com/aagam_ki_vaani",
          "https://www.facebook.com/share/18FUyhp5Pd/"
        ]
      }
    ]
  };

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body 
        suppressHydrationWarning
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
          <MusicOrb />
          <main className="grow">
            {children}
          </main>
          <InstallPrompt />
          <NotificationFAB />
          <Footer lang={lang} />
          <Analytics />
          <SpeedInsights />
          <YouTubeToast />
        </Providers>
      </body>
    </html>
  );
}