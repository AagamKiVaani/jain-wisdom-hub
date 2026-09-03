export const siteConfig = {
  // Base URL
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://aagamkivaani.vercel.app',

  // Socials
  socials: {
    youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL || 'https://www.youtube.com/@aagamkivaani',
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://www.instagram.com/aagam_ki_vaani',
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || 'https://www.facebook.com/aagamkivaani',
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_URL || 'https://whatsapp.com/channel/0029Vb6orXyCXC3TTIu0n43j',
  },

  // Support
  support: {
    // buyMeCoffee: process.env.NEXT_PUBLIC_BUY_ME_COFFEE_URL || 'https://buymeacoffee.com/aagamkivaani',
    // patreon: process.env.NEXT_PUBLIC_PATREON_URL || '#',
    razorpay : process.env.NEXT_PUBLIC_RAZORPAY || 'https://razorpay.me/@jainwisdomhub'
  },

  // Contact
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'mailto:aagamkivaani@gmail.com',
};