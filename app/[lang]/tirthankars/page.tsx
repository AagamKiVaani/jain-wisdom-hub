import type { Metadata } from 'next';
import TirthankarGalleryClient from './TirthankarGalleryClient';

// 1. FIX: Set the Base URL so images work
export const metadata: Metadata = {
  metadataBase: new URL('https://jain-wisdom-hub.vercel.app'), 

  // 2. FIX: Longer, optimized Title (50-60 chars)
  title: '24 Tirthankaras: The Divine Lineage | Jain History & Symbols',

  // 3. FIX: Longer, descriptive Description (110-160 chars)
  description: 'Discover the holy lineage of the 24 Tirthankaras of Jainism. Explore their symbols (Lanchanas), history, and the path to liberation in this immersive gallery.',

  openGraph: {
    title: '24 Tirthankaras: The Divine Lineage | Jain History',
    description: 'Discover the holy lineage of the 24 Tirthankaras of Jainism. Explore their symbols, history, and the path to liberation.',
    // This looks for public/images/tirthankar-preview.png (Make sure to create this image!)
    images: [
      {
        url: '/images/tirthankar-preview.png',
        width: 1200,
        height: 630,
        alt: '24 Tirthankaras Gallery Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function Page({ params }: { params: Promise<{ lang: string }> }) {
  return <TirthankarGalleryClient params={params} />;
}