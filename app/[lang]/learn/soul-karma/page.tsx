import type { Metadata } from 'next';
import SoulKarmaClient from './SoulKarmaClient';

// 1. FIX: Set the Base URL dynamically or hardcode safe fallback
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL 
  ? `https://${process.env.NEXT_PUBLIC_BASE_URL}` 
  : 'https://jain-wisdom-hub.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl), 

  // 2. FIX: Optimized Title with keywords
  title: 'Soul & Karma: The Jiva\'s Journey | Jain Philosophy & Simulation',

  // 3. FIX: Richer Description
  description: 'Explore the nature of the Soul (Jiva) and how Karma attaches to it. An interactive 3D simulation of Leshya colors, Yoga (Vibration), and Kashaya (Passions).',

  // 4. NEW: Keywords help Google understand the topic
  keywords: ['Jainism', 'Soul', 'Jiva', 'Karma', 'Leshya', 'Yoga', 'Kashaya', 'Pudgal', 'Jain Philosophy', 'Metaphysics', 'Rebirth'],

  // 5. NEW: Authorship
  authors: [{ name: 'AagamKiVaani' }],

  openGraph: {
    title: 'Soul & Karma: The Jiva\'s Journey',
    description: 'Interactive 3D simulation of Jiva, Karma particles, and Leshya colors.',
    url: '/learn/soul-karma',
    siteName: 'Jain Wisdom Hub',
    images: [
      {
        url: '/images/metadata/soul-karma-preview.avif', // Ensure this image exists!
        width: 1200,
        height: 630,
        alt: 'Soul and Karma 3D Simulation',
      },
    ],
    locale: 'en_US',
    type: 'article', // 'article' fits educational content better
  },

  // 6. NEW: Twitter Card (Critical for sharing on X/Twitter)
  twitter: {
    card: 'summary_large_image',
    title: 'Soul & Karma: The Jiva\'s Journey',
    description: 'Experience how Karma sticks to the Soul in 3D.',
    images: ['/images/metadata/soul-karma-preview.png'],
  },

  // 7. CRITICAL: Language Alternates (SEO for Multilingual sites)
  alternates: {
    canonical: '/en/learn/soul-karma',
    languages: {
      'en': '/en/learn/soul-karma',
      'hi': '/hi/learn/soul-karma',
      'kn': '/kn/learn/soul-karma',
    },
  },
};

export default function Page({ params }: { params: Promise<{ lang: string }> }) {
  return <SoulKarmaClient params={params} />;
}