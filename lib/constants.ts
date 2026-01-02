export const siteConfig = {
  // Base URL
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://jain-wisdom-hub.vercel.app',

  // Socials
  socials: {
    youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL || 'https://www.youtube.com/@AagamKiVani',
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://www.instagram.com/aagamkivaani',
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || 'https://www.facebook.com/profile.php?id=61581831506049',
    // twitter: process.env.NEXT_PUBLIC_TWITTER_URL || '#',
  },

  // Support
  support: {
    buyMeCoffee: process.env.NEXT_PUBLIC_BUY_ME_COFFEE_URL || 'https://buymeacoffee.com/aagamkivaani',
    // patreon: process.env.NEXT_PUBLIC_PATREON_URL || '#',
  },

  // Contact
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'mailto:aagamkivaani@gmail.com',
};