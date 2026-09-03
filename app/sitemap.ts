import { MetadataRoute } from 'next';
import { tirthankaras } from '@/lib/tirthankara-data';
import { jainTopics } from '@/lib/namokar-data';

function getBaseUrl(): string {
  let url = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_BASE_URL || 'https://aagamkivaani.vercel.app';
  
  // In production builds, avoid emitting localhost
  if (process.env.NODE_ENV === 'production' && url.includes('localhost')) {
    url = 'https://aagamkivaani.vercel.app';
  }
  
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = `https://${url}`;
  }
  return url.replace(/\/$/, '');
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  const languages = ['en', 'hi', 'kn'];
  
  // 1. Core Primary & Static Routes across all 3 languages
  const staticRoutes = [
    { path: '', priority: 1.0, changeFrequency: 'daily' as const },
    { path: '/resources', priority: 0.95, changeFrequency: 'weekly' as const },
    { path: '/tirthankars', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/learn/kalchakra', priority: 0.85, changeFrequency: 'monthly' as const },
    { path: '/learn/soul-karma', priority: 0.85, changeFrequency: 'monthly' as const },
    { path: '/learn/namokar-mantra', priority: 0.85, changeFrequency: 'monthly' as const },
    { path: '/about', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/contact', priority: 0.5, changeFrequency: 'monthly' as const },
    { path: '/feedback', priority: 0.5, changeFrequency: 'monthly' as const },
  ];

  // 2. Generate Localized Static Route Entries
  const staticEntries = staticRoutes.flatMap((route) => 
    languages.map((lang) => ({
      url: `${baseUrl}/${lang}${route.path}`,
      lastModified: new Date(),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    }))
  );

  // 3. Dynamic Learn Topic Entries (e.g., from jainTopics)
  const additionalTopics = Object.keys(jainTopics).filter(k => k !== 'namokar-mantra');
  const topicEntries = additionalTopics.flatMap((topicKey) =>
    languages.map((lang) => ({
      url: `${baseUrl}/${lang}/learn/${topicKey}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    }))
  );

  // 4. Dynamic Tirthankar Deep-Dive Routes (All 24 Tirthankaras across English, Hindi, Kannada)
  const tirthankarEntries = tirthankaras.flatMap((tirthankar) => 
    languages.map((lang) => ({
      url: `${baseUrl}/${lang}/tirthankars/${tirthankar.id}`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.8,
    }))
  );

  return [...staticEntries, ...topicEntries, ...tirthankarEntries];
}