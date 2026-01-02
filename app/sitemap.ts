import { MetadataRoute } from 'next';

// 1. Define your base URL (Use your Vercel link for now)
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL 
  ? `https://${process.env.NEXT_PUBLIC_BASE_URL}` 
  : 'https://jain-wisdom-hub.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = ['en', 'hi', 'kn'];
  
  // 2. Define your generic routes
  const routes = [
    '', // Home page
    '/learn/kalchakra',
    '/learn/soul-karma',
    '/tirthankars',
    '/learn/namokar-mantra',
    '/about',
    '/contact' // Add your other pages here
  ];

  // 3. Generate a URL for every route + language combo
  // This creates: /en, /hi, /kn, /en/learn/kalchakra, /hi/learn/kalchakra...
  const sitemapEntries = routes.flatMap((route) => 
    languages.map((lang) => ({
      url: `${baseUrl}/${lang}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1 : 0.8, // Homepage = 1.0, Others = 0.8
    }))
  );

  return sitemapEntries;
}