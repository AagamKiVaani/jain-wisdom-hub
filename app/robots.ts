import { MetadataRoute } from 'next';

function getBaseUrl(): string {
  let url = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_BASE_URL || 'https://aagamkivaani.vercel.app';
  if (process.env.NODE_ENV === 'production' && url.includes('localhost')) {
    url = 'https://aagamkivaani.vercel.app';
  }
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = `https://${url}`;
  }
  return url.replace(/\/$/, '');
}

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl();

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/api/', '/admin/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}