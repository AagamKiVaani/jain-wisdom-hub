import type { Metadata } from 'next';
import KalchakraClient from './KalchakraClient';

// 1. FIX: Set the Base URL so images work
// Change this if you buy a custom domain later, but this works for Vercel
export const metadata: Metadata = {
  metadataBase: new URL('https://jain-wisdom-hub.vercel.app'), 

  // 2. FIX: Longer, optimized Title (50-60 chars)
  title: 'Kalchakra: The Eternal Cycle of Time | Jain Cosmology & History',

  // 3. FIX: Longer, descriptive Description (110-160 chars)
  description: 'Explore the rise and fall of humanity through the 6 cosmic eras (Aras) of Jainism. An immersive, interactive 3D experience of the Avasarpini time cycle.',

  openGraph: {
    title: 'Kalchakra: The Eternal Cycle of Time | Jain Cosmology',
    description: 'Explore the rise and fall of humanity through the 6 cosmic eras (Aras) of Jainism. An immersive 3D experience.',
    // This looks for public/images/kalchakra-preview.jpg
    images: [
      {
        url: '/images/kalchakra-preview.jpg',
        width: 1200,
        height: 630,
        alt: 'Kalchakra Time Wheel Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function Page({ params }: { params: Promise<{ lang: string }> }) {
  return <KalchakraClient params={params} />;
}