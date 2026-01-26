// app/sitemap.ts
import { MetadataRoute } from 'next';
import { tirthankaras } from '@/lib/tirthankara-data'; // Ensure this path is correct

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL 
  ? `https://${process.env.NEXT_PUBLIC_BASE_URL}` 
  : 'https://jain-wisdom-hub.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = ['en', 'hi', 'kn'];
  
  // 1. Static Routes
  const staticRoutes = [
    '', // Home
    '/learn/kalchakra',
    '/learn/soul-karma',
    '/tirthankars',
    '/learn/namokar-mantra',
    '/about',
    '/contact',
    '/feedback'
  ];

  // 2. Generate Static Route Entries
  const staticEntries = staticRoutes.flatMap((route) => 
    languages.map((lang) => ({
      url: `${baseUrl}/${lang}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1 : 0.8,
    }))
  );

  // 3. Generate Dynamic Tirthankar Routes (CRITICAL FOR SEO)
  // Creates: /en/tirthankars/adinath, /hi/tirthankars/mahavir, etc.
  const tirthankarEntries = tirthankaras.flatMap((tirthankar) => 
    languages.map((lang) => ({
      url: `${baseUrl}/${lang}/tirthankars/${tirthankar.id}`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const, // These don't change often
      priority: 0.9, // High priority
    }))
  );

  return [...staticEntries, ...tirthankarEntries];
}