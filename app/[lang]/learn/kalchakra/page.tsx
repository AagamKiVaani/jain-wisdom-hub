import type { Metadata } from 'next';
import KalchakraClient from './KalchakraClient';

// 1. FIX: Set the Base URL dynamically or hardcode safe fallback
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL 
  ? `https://${process.env.NEXT_PUBLIC_BASE_URL}` 
  : 'https://jain-wisdom-hub.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl), 

  // 2. FIX: Optimized Title with keywords
  title: 'Kalchakra: The Eternal Cycle of Time | Jain Cosmology & History',

  // 3. FIX: Richer Description
  description: 'Explore the rise and fall of humanity through the 6 cosmic eras (Aras) of Jainism. An immersive, interactive 3D experience of the Avasarpini time cycle.',

  // 4. NEW: Keywords help Google understand the topic
  keywords: ['Jainism', 'Kalchakra', 'Time Cycle', 'Avasarpini', 'Utsarpini', 'Jain History', 'Cosmology', '6 Aras', 'Tirthankaras'],

  // 5. NEW: Authorship
  authors: [{ name: 'AagamKiVaani' }],

  openGraph: {
    title: 'Kalchakra: The Eternal Cycle of Time',
    description: 'Explore the rise and fall of humanity through the 6 cosmic eras (Aras).',
    url: '/learn/kalchakra',
    siteName: 'Jain Wisdom Hub',
    images: [
      {
        url: '/images/metadata/kalchakra-preview.avif', // Ensure this image exists!
        width: 1200,
        height: 630,
        alt: 'Kalchakra Time Wheel Preview',
      },
    ],
    locale: 'en_US',
    type: 'article', // 'article' fits better for educational content than 'website'
  },

  // 6. NEW: Twitter Card (Critical for sharing on X/Twitter)
  twitter: {
    card: 'summary_large_image',
    title: 'Kalchakra: The Jain Time Cycle',
    description: 'Interactive journey through the 6 Eras of Time.',
    images: ['/images/metadata/kalchakra-preview.png'],
  },

  // 7. CRITICAL: Language Alternates (SEO for Multilingual sites)
  // This tells Google: "This page exists in English, Hindi, and Kannada"
  alternates: {
    canonical: '/en/learn/kalchakra',
    languages: {
      'en': '/en/learn/kalchakra',
      'hi': '/hi/learn/kalchakra',
      'kn': '/kn/learn/kalchakra',
    },
  },
};

export default function Page({ params }: { params: Promise<{ lang: string }> }) {
  return <KalchakraClient params={params} />;
}