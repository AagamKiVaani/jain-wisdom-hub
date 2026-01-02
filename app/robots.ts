import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL 
    ? `https://${process.env.NEXT_PUBLIC_BASE_URL}` 
    : 'https://jain-wisdom-hub.vercel.app';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/api/'], // Blocks bots from internal API routes
    },
    sitemap: `${baseUrl}/sitemap.xml`, // <--- The most important line
  };
}