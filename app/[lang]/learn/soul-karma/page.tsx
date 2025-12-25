import type { Metadata } from 'next';
import SoulKarmaClient from './SoulKarmaClient';

// 1. FIX: Set the Base URL so images work
export const metadata: Metadata = {
  metadataBase: new URL('https://jain-wisdom-hub.vercel.app'), 

  // 2. FIX: Longer, optimized Title (50-60 chars)
  title: 'Soul & Karma: The Jiva\'s Journey | Jain Philosophy 3D',

  // 3. FIX: Longer, descriptive Description (110-160 chars)
  description: 'Learn Jainism and Visualise. Interactive 3D simulation of Jiva, Karma particles, and Leshya colors. Discover how Karma sticks to the Soul based on your actions (Yoga & Kashaya).',

  openGraph: {
    title: 'Soul & Karma: The Jiva\'s Journey | Jain Philosophy',
    description: 'Interactive 3D simulation of Jiva, Karma particles, and Leshya colors.',
    // This looks for public/images/soul-karma-preview.png (Make sure to add this image later!)
    images: [
      {
        url: '/images/soul-karma-preview.png',
        width: 1200,
        height: 630,
        alt: 'Soul and Karma 3D Simulation',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function Page({ params }: { params: Promise<{ lang: string }> }) {
  return <SoulKarmaClient params={params} />;
}