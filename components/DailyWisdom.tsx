// components/DailyWisdom.tsx
'use client';

import { useState, useRef } from "react";
import { Sparkles, Share2 } from "lucide-react";
import { toPng } from 'html-to-image';
import download from 'downloadjs';

interface QuoteText {
  en: string;
  hi: string;
  kn: string;
}

interface Quote {
  text: QuoteText;
  author: QuoteText;
}

interface DailyWisdomProps {
  lang: string;
  quote: Quote;
}

const translations = {
  en: { quoteTitle: "Quote of the day" },
  hi: { quoteTitle: "आज का सूत्र" },
  kn: { quoteTitle: "ಇಂದಿನ ಬೋಧನೆ" }
};

export default function DailyWisdom({ lang, quote }: DailyWisdomProps) {
  const [isSharing, setIsSharing] = useState(false);
  const hiddenCardRef = useRef<HTMLDivElement>(null);

  const currentLang = (lang === 'hi' || lang === 'kn') ? lang : 'en';
  const t = translations[currentLang];
  const isHindi = currentLang === 'hi';

  const text = quote.text[currentLang as keyof QuoteText] || quote.text.en;
  const author = quote.author[currentLang as keyof QuoteText] || quote.author.en;

  const handleShare = async () => {
    if (!hiddenCardRef.current) return;
    setIsSharing(true);

    try {
      const dataUrl = await toPng(hiddenCardRef.current, { 
        cacheBust: true, 
        pixelRatio: 3, 
        // Using natural CSS background (Rose or Black)
      });
      
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], 'jain-wisdom-quote.png', { type: 'image/png' });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Jain Wisdom Daily',
          text: `Today's Wisdom 🌿\n\nRead more at Jain Wisdom App`,
        });
      } else {
        download(dataUrl, 'jain-wisdom-quote.png');
      }
    } catch (err) {
      console.error('Share failed:', err);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <>
      {/* ==================== 1. VISIBLE BAR (Unchanged) ==================== */}
      <div className="relative w-full max-w-4xl mx-auto mt-6 mb-8 px-4 animate-in fade-in slide-in-from-top-4 duration-1000">
        <div className="relative p-[1px] rounded-2xl overflow-hidden bg-gradient-to-r from-orange-200 via-orange-400 to-orange-200 dark:from-orange-900 dark:via-orange-600 dark:to-orange-900 bg-[length:200%_auto] animate-shimmer">
          <div className="relative bg-white/95 dark:bg-black/95 backdrop-blur-md rounded-2xl py-3 px-5 md:px-8 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 text-center shadow-sm">
            
            <div className="flex items-center gap-2 shrink-0 mb-1 md:mb-0">
               <Sparkles className="w-3 h-3 text-orange-500" />
               <span className={`text-orange-500 uppercase whitespace-nowrap ${isHindi ? 'text-sm font-bold tracking-normal' : 'text-[10px] font-bold tracking-[0.2em]'}`}>
                 {t.quoteTitle}
               </span>
            </div>

            <div className="hidden md:block w-[1px] h-4 bg-zinc-200 dark:bg-zinc-800 shrink-0"></div>

            <p className={`font-serif text-zinc-800 dark:text-zinc-200 max-w-xl ${isHindi ? 'text-base md:text-xl leading-loose font-medium' : 'text-sm md:text-base leading-snug'}`}>
              "{text}"
            </p>

            <div className="hidden md:block w-[1px] h-4 bg-zinc-200 dark:bg-zinc-800 shrink-0"></div>

            <cite className={`font-bold text-zinc-800 dark:text-zinc-200 uppercase not-italic shrink-0 ${isHindi ? 'text-xs md:text-sm tracking-wide' : 'text-[10px] md:text-xs tracking-widest'}`}>
              {author}
            </cite>
            
            <div className="hidden md:block w-[1px] h-4 bg-zinc-200 dark:bg-zinc-800 shrink-0"></div>
            
            <button 
              onClick={handleShare}
              disabled={isSharing}
              className="p-2 -ml-2 md:ml-0 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-orange-500 transition-colors"
              title="Share Quote"
            >
              {isSharing ? <Sparkles className="w-4 h-4 animate-spin" /> : <Share2 className="w-4 h-4" />}
            </button>

          </div>
        </div>
      </div>

      {/* ==================== 2. HIDDEN TWIN (Rose for Light / Orange for Dark) ==================== */}
      <div className="absolute top-0 left-0 w-full pointer-events-none opacity-0 overflow-hidden h-0">
        <div 
          ref={hiddenCardRef}
          // 👇 Light Mode: Rose-50 background. Dark Mode: Zinc-950 background.
          className="w-[1080px] h-[1080px] flex flex-col items-center justify-center p-16 text-center relative
                     bg-rose-50 text-zinc-900 
                     dark:bg-zinc-950 dark:text-zinc-100"
          style={{ fontFamily: 'serif' }}
        >
            {/* Background Borders (Rose in Light, Orange in Dark) */}
            <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-r from-rose-200 via-rose-500 to-rose-200 dark:from-orange-900 dark:via-orange-600 dark:to-orange-900"></div>
            <div className="absolute bottom-0 left-0 w-full h-4 bg-gradient-to-r from-rose-200 via-rose-500 to-rose-200 dark:from-orange-900 dark:via-orange-600 dark:to-orange-900"></div>

            {/* Glow (Rose in Light, Orange in Dark) */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[100px]
                            bg-rose-200/60 dark:bg-orange-600/20"></div>

            {/* Icon (Rose in Light, Orange in Dark) */}
            <Sparkles className="w-16 h-16 text-rose-500 dark:text-orange-500 mb-10 relative z-10" />
            
            {/* Title (Rose in Light, Orange in Dark) */}
            <p className="text-rose-600 dark:text-orange-500 uppercase tracking-[0.3em] text-2xl font-bold mb-16 relative z-10">
               {t.quoteTitle}
            </p>

            {/* Main Text */}
            <p className={`relative z-10 max-w-5xl leading-relaxed mb-16 
                           text-zinc-800 dark:text-zinc-100
                           ${isHindi ? 'text-7xl font-medium' : 'text-6xl'}`}>
               "{text}"
            </p>

            {/* Separator Line (Rose in Light, Orange in Dark) */}
            <div className="w-32 h-1 bg-rose-400 dark:bg-orange-600 mb-10 relative z-10"></div>
            
            {/* Author Text */}
            <p className="text-3xl font-bold uppercase tracking-widest relative z-10
                          text-zinc-600 dark:text-zinc-400">
               {author}
            </p>

            {/* Footer Branding */}
            <div className="absolute bottom-20 text-lg flex items-center gap-2
                            text-zinc-500 dark:text-zinc-500">
               <span>Jain Wisdom App</span>
            </div>
            <div className="absolute bottom-10 text-lg flex items-center gap-2
                            text-zinc-500 dark:text-zinc-500">
               <span>AagamKiVaani YouTube</span>
            </div>
        </div>
      </div>
    </>
  );
}