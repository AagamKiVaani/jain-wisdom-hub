// app/[lang]/not-found.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass } from 'lucide-react';

const translations = {
  en: {
    title: "404",
    subtitle: "The Path is Lost",
    desc: "Even the soul wanders in the cycle of Samsara before finding the right path. This page does not exist.",
    button: "Return Home"
  },
  hi: {
    title: "404",
    subtitle: "मार्ग खो गया है",
    desc: "सही मार्ग पाने से पहले आत्मा भी संसार चक्र में भटकती है। यह पृष्ठ मौजूद नहीं है।",
    button: "मुख्य पृष्ठ पर जाएं"
  },
  kn: {
    title: "404",
    subtitle: "ದಾರಿ ತಪ್ಪಿದೆ",
    desc: "ಸರಿಯಾದ ಮಾರ್ಗವನ್ನು ಕಂಡುಕೊಳ್ಳುವ ಮೊದಲು ಆತ್ಮವೂ ಸಂಸಾರ ಚಕ್ರದಲ್ಲಿ ಅಲೆದಾಡುತ್ತದೆ. ಈ ಪುಟ ಅಸ್ತಿತ್ವದಲ್ಲಿಲ್ಲ.",
    button: "ಮನೆಗೆ ಹಿಂತಿರುಗಿ"
  }
};

export default function NotFound() {
  const pathname = usePathname();
  
  // 1. Extract Language from URL (e.g. "/hi/bad-link" -> "hi")
  // If undefined or invalid, default to "en"
  const currentLang = pathname?.split('/')[1] as 'en' | 'hi' | 'kn';
  const lang = ['en', 'hi', 'kn'].includes(currentLang) ? currentLang : 'en';

  const t = translations[lang];

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/10 dark:bg-purple-900/20 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Icon */}
      <div className="mb-6 animate-pulse relative z-10">
        <Compass size={64} className="text-purple-600 dark:text-purple-400 opacity-80" />
      </div>

      <h1 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-gray-900 to-gray-500 dark:from-white dark:to-white/20 mb-2 relative z-10">
        {t.title}
      </h1>

      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 relative z-10">
        {t.subtitle}
      </h2>

      <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8 text-base leading-relaxed relative z-10">
        {t.desc}
      </p>

      {/* 2. Link back to the CORRECT language homepage */}
      <Link 
        href={`/${lang}`}
        className="relative z-10 flex items-center gap-2 px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full font-bold tracking-widest uppercase hover:scale-105 transition-transform shadow-lg"
      >
        <Home size={16} /> {t.button}
      </Link>
    </div>
  );
}