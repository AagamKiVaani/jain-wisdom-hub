// app/[lang]/coming-soon/page.tsx
'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Bell, Sparkles, Lock, Clock } from 'lucide-react';
import { siteConfig } from '@/lib/constants'; 

const translations = {
  en: {
    back: "Return to Library",
    title: "Unlocking Soon",
    subtitle: "Digital Aagam Update 1.1",
    desc: "We are currently rendering the 3D assets and translating the ancient scriptures for this section. Stay tuned.",
    notify: "Get Notified on YouTube",
    footer: "EXPECTED RELEASE: NEXT UPDATE"
  },
  hi: {
    back: "वापस जाएं",
    title: "शीघ्र आ रहा है",
    subtitle: "डिजिटल आगम अपडेट 1.1",
    desc: "हम इस अध्याय के लिए 3D दृश्य और प्राचीन शास्त्रों का अनुवाद तैयार कर रहे हैं।",
    notify: "यूट्यूब पर सूचना पाएं",
    footer: "अपेक्षित रिलीज़: अगला अपडेट"
  },
  kn: {
    back: "ಗ್ರಂಥಾಲಯಕ್ಕೆ ಹಿಂತಿರುಗಿ",
    title: "ಶೀಘ್ರದಲ್ಲೇ ತೆರೆಯಲಿದೆ",
    subtitle: "ಡಿಜಿಟಲ್ ಆಗಮ ಅಪ್‌ಡೇಟ್ 1.1",
    desc: "ನಾವು ಈ ಅಧ್ಯಾಯಕ್ಕಾಗಿ 3D ದೃಶ್ಯಗಳನ್ನು ಮತ್ತು ಪ್ರಾಚೀನ ಗ್ರಂಥಗಳ ಅನುವಾದವನ್ನು ಸಿದ್ಧಪಡಿಸುತ್ತಿದ್ದೇವೆ.",
    notify: "YouTube ನಲ್ಲಿ ತಿಳಿಯಿರಿ",
    footer: "ನಿರೀಕ್ಷಿತ ಬಿಡುಗಡೆ: ಮುಂದಿನ ಅಪ್‌ಡೇಟ್"
  }
};

export default function ComingSoonPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = use(params);
  
  const t = translations[lang as keyof typeof translations] || translations.en;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-black text-zinc-900 dark:text-white px-4 relative overflow-hidden pt-5 pb-24">
      
      {/* Cinematic Background (Grain + Glow) */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/10 dark:bg-orange-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>

      {/* Floating Elements (Atmosphere) */}
      <div className="absolute top-1/4 left-1/4 text-orange-500/40 animate-bounce duration-[3000ms]">
          <Sparkles size={32} />
      </div>
      <div className="absolute bottom-1/3 right-1/4 text-purple-500/40 animate-pulse duration-[4000ms]">
          <Clock size={24} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl">
        
        {/* Lock Icon Container - Mystic Style */}
        <div className="mb-8 p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl relative group">
            <div className="absolute inset-0 bg-orange-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Lock size={48} className="text-orange-500 relative z-10" />
        </div>

        {/* Badge */}
        <div className="mb-6 px-4 py-1.5 rounded-full bg-orange-100 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-500/20 text-orange-600 dark:text-orange-400 text-[10px] font-bold uppercase tracking-[0.2em]">
            {t.subtitle}
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-zinc-900 to-zinc-500 dark:from-white dark:to-white/40 mb-6 uppercase tracking-tighter">
            {t.title}
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-zinc-600 dark:text-gray-400 font-serif leading-relaxed mb-10 max-w-lg">
            {t.desc}
        </p>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4 w-full justify-center">
            {/* Notify Button -> Redirects to YouTube */}
            <a 
                href={siteConfig.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-full font-bold tracking-widest uppercase hover:scale-105 transition-transform shadow-xl hover:shadow-orange-500/20"
            >
                <Bell size={18} className="group-hover:rotate-12 transition-transform" /> 
                {t.notify}
            </a>

            {/* Back Button */}
            <Link 
                href={`/${lang}`}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-zinc-300 dark:border-white/10 text-zinc-900 dark:text-white rounded-full font-bold tracking-widest uppercase hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors"
            >
                <ArrowLeft size={18} /> {t.back}
            </Link>
        </div>

      </div>

      {/* 🟢 UPDATED: Vibrant Footer Capsule */}
      <div className="absolute bottom-10 z-20">
        <div className="px-6 py-2 rounded-full bg-white/80 dark:bg-zinc-900/80 border-2 border-orange-500/50 shadow-[0_0_20px_rgba(249,115,22,0.3)] backdrop-blur-md animate-pulse">
            <p className="text-xs font-black font-mono text-orange-600 dark:text-orange-400 uppercase tracking-widest drop-shadow-sm">
                {t.footer}
            </p>
        </div>
      </div>

    </div>
  );
}