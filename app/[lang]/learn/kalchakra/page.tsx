import type { Metadata } from 'next';
import KalchakraClient from './KalchakraClient'; // Importing your big file

// 1. THIS IS THE METADATA (The "ID Card")
export const metadata: Metadata = {
  title: 'Kalchakra: The Eternal Wheel of Time',
  description: 'An interactive 3D journey through the 6 cosmic eras (Aras) of Jain Cosmology.',
  openGraph: {
    title: 'Kalchakra: The Eternal Wheel of Time',
    description: 'Explore the rise and fall of civilization in this interactive 3D experience.',
    images: ['/images/kalchakra-preview.jpg'], // Make sure this image exists in public/images/
  },
};

// 2. THIS LOADS YOUR INTERACTIVE PAGE
export default function Page({ params }: { params: Promise<{ lang: string }> }) {
  return <KalchakraClient params={params} />;
}