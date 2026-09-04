'use client';

import { useState, useRef, useEffect } from "react";
import { Sparkles, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { toPng } from 'html-to-image';
import download from 'downloadjs';

// 👇 1. UPDATE THIS TO YOUR GITHUB URL
// Example: "https://raw.githubusercontent.com/username/repo/main/images"
// or "https://username.github.io/repo-name/images"
const ASSET_BASE_URL = "https://pratham-1127.github.io/jain-wisdom-assets/images"; 

interface QuoteText {
  en: string;
  hi: string;
  kn: string;
}

interface Quote {
  text: QuoteText;
  author: QuoteText;
  image?: string; // 👈 2. Added optional image field
}

interface DailyWisdomProps {
  lang: string;
  quote: Quote;
}

const translations = {
  en: { quoteTitle: "Quote of the day", share: "Share", sharing: "Sharing..." },
  hi: { quoteTitle: "आज का सूत्र", share: "शेयर करें", sharing: "साझा हो रहा है..." },
  kn: { quoteTitle: "ಇಂದಿನ ಬೋಧನೆ", share: "ಹಂಚಿಕೊಳ್ಳಿ", sharing: "ಹಂಚಲಾಗುತ್ತಿದೆ..." }
};

export default function DailyWisdom({ lang, quote }: DailyWisdomProps) {
  const [isSharing, setIsSharing] = useState(false);
  const [bgImage, setBgImage] = useState<string | null>(null); // State for the fetched image
  const hiddenCardRef = useRef<HTMLDivElement>(null);

  const currentLang = (lang === 'hi' || lang === 'kn') ? lang : 'en';
  const t = translations[currentLang];
  const isHindi = currentLang === 'hi';

  const text = quote.text[currentLang as keyof QuoteText] || quote.text.en;
  const author = quote.author[currentLang as keyof QuoteText] || quote.author.en;

  // ---------------------------------------------------------
  // 🖼️ IMAGE PRE-LOADER LOGIC (Handles CORS & Fallback)
  // ---------------------------------------------------------
  useEffect(() => {
    // Reset image when quote changes
    setBgImage(null);

    if (!quote.image) return; // If no image specified, keep it null (fallback)

    const fetchImage = async () => {
      try {
        const fullUrl = `${ASSET_BASE_URL}/${quote.image}`;
        const response = await fetch(fullUrl);
        
        if (!response.ok) throw new Error("Image download failed");

        // Convert to Blob -> Object URL to bypass CORS in html-to-image
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        setBgImage(objectUrl);
      } catch (error) {
        console.warn("⚠️ Background image failed to load, falling back to gradient.", error);
        setBgImage(null); // Ensures fallback renders
      }
    };

    fetchImage();

    // Cleanup memory
    return () => {
      if (bgImage) URL.revokeObjectURL(bgImage);
    };
  }, [quote.image]);

  // ---------------------------------------------------------
  // 📤 SHARE LOGIC
  // ---------------------------------------------------------
  const handleShare = async () => {
    if (!hiddenCardRef.current) return;
    setIsSharing(true);

    try {
      // Tactile audio feedback & haptics
      try {
        const a = new Audio("/sounds/resources/click2.mp3");
        a.volume = 0.65;
        a.play().catch(() => {});
        if (typeof navigator !== "undefined" && navigator.vibrate) {
          navigator.vibrate(12);
        }
      } catch (e) {}

      // Small delay to ensure render engine catches the image if it just loaded
      await new Promise(resolve => setTimeout(resolve, 100));

      const dataUrl = await toPng(hiddenCardRef.current, { 
        // cacheBust: true, 
        pixelRatio: 3, 
      });
      
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], 'aagam-ki-vaani-quote.png', { type: 'image/png' });

      const shareUrl = "https://aagamkivaani.vercel.app";
      const youtubeUrl = "https://youtube.com/@aagamkivaani";

      const shareText = `✨ *Aagam Ki Vaani | आज का सूत्र* ✨\n\n"${text}"\n— *${author}*\n\n📲 *Explore Scriptures & Download Notes:*\n${shareUrl}\n\n🎥 *Watch on YouTube:*\n${youtubeUrl}`;

      const shareData = {
        files: [file],
        title: 'Aagam Ki Vaani — Daily Wisdom',
        text: shareText,
      };

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
            await navigator.clipboard.writeText(shareText);
        } catch (clipboardErr) {
            console.log("Clipboard failed", clipboardErr);
        }

        await navigator.share(shareData);
      } else {
        download(dataUrl, 'aagam-ki-vaani-quote.png');
      }
    } catch (err) {
      console.error('Share failed:', err);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <>
      {/* ==================== 1. VISIBLE BAR ==================== */}
      <div className="relative w-full max-w-6xl mx-auto mt-6 mb-8 px-4 animate-in fade-in slide-in-from-top-4 duration-1000">
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
            
            {/* VIBRANT BREATHING POPPING SHARE BUTTON */}
            <motion.button 
              onClick={handleShare}
              disabled={isSharing}
              animate={isSharing ? {} : {
                scale: [1, 1.04, 1],
                boxShadow: [
                  "0 0 0 0 rgba(249, 115, 22, 0)",
                  "0 0 14px 3px rgba(249, 115, 22, 0.45)",
                  "0 0 0 0 rgba(249, 115, 22, 0)"
                ]
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              className="relative group flex items-center gap-2 px-4 py-1.5 rounded-full 
                         bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 
                         hover:from-amber-400 hover:via-orange-400 hover:to-amber-500
                         text-white font-bold shadow-lg shadow-orange-500/30 dark:shadow-orange-950/50
                         border border-amber-300/50 cursor-pointer overflow-hidden transition-all duration-300 shrink-0"
              title="Share Quote"
            > 
              {/* Light sweep gleam effect on hover */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none" />

              <span className="text-[11px] font-extrabold uppercase tracking-widest text-white drop-shadow-sm">
                {isSharing ? t.sharing : t.share}
              </span>
              {isSharing ? (
                <Sparkles className="w-3.5 h-3.5 text-white animate-spin" /> 
              ) : (
                <Share2 className="w-3.5 h-3.5 text-white group-hover:rotate-12 transition-transform drop-shadow-sm" />
              )}
            </motion.button>

          </div>
        </div>
      </div>

      {/* ==================== 2. HIDDEN TWIN (Smart Background) ==================== */}
      <div className="absolute top-0 left-0 w-full pointer-events-none opacity-0 overflow-hidden h-0">
        <div 
          ref={hiddenCardRef}
          className="w-[1080px] h-[1080px] flex flex-col items-center justify-center p-16 text-center relative overflow-hidden"
          style={{ fontFamily: 'serif' }}
        >
            {/* Layer 1: BACKGROUND LOGIC 
               If bgImage exists -> Render Image + Overlay
               If bgImage is null -> Render Gradient Fallback
            */}
            {bgImage ? (
                <>
                    {/* The Image */}
                    <img 
                        src={bgImage} 
                        alt="Background" 
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    {/* The Overlay (Crucial for text readability) */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
                    
                    {/* Border still looks nice on top of image */}
                    <div className="absolute top-0 left-0 w-full h-4 bg-orange-600/80 z-20"></div>
                    <div className="absolute bottom-0 left-0 w-full h-4 bg-orange-600/80 z-20"></div>
                </>
            ) : (
                // FALLBACK: The Original Theme Logic
                <>
                    <div className="absolute inset-0 bg-rose-50 dark:bg-zinc-950"></div>
                    <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-r from-rose-200 via-rose-500 to-rose-200 dark:from-orange-900 dark:via-orange-600 dark:to-orange-900"></div>
                    <div className="absolute bottom-0 left-0 w-full h-4 bg-gradient-to-r from-rose-200 via-rose-500 to-rose-200 dark:from-orange-900 dark:via-orange-600 dark:to-orange-900"></div>
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[100px] bg-rose-200/60 dark:bg-orange-600/20"></div>
                </>
            )}

            {/* Layer 2: CONTENT 
               Note: We force text color to White/Zinc-100 if image exists, 
               otherwise we use the theme colors.
            */}
            
            {/* Icon */}
            <Sparkles className={`w-16 h-16 mb-10 relative z-10 ${bgImage ? 'text-orange-400' : 'text-rose-500 dark:text-orange-500'}`} />
            
            {/* Title */}
            <p className={`uppercase tracking-[0.3em] text-2xl font-bold mb-16 relative z-10 ${bgImage ? 'text-orange-300' : 'text-rose-600 dark:text-orange-500'}`}>
               {t.quoteTitle}
            </p>

            {/* Main Text */}
            <p className={`relative z-10 max-w-5xl leading-relaxed mb-16 
                          ${isHindi ? 'text-7xl font-medium' : 'text-6xl'}
                          ${bgImage ? 'text-white drop-shadow-lg' : 'text-zinc-800 dark:text-zinc-100'}`}>
               "{text}"
            </p>

            {/* Separator */}
            <div className={`w-32 h-1 mb-10 relative z-10 ${bgImage ? 'bg-orange-500' : 'bg-rose-400 dark:bg-orange-600'}`}></div>
            
            {/* Author */}
            <p className={`text-3xl font-bold uppercase tracking-widest relative z-10 ${bgImage ? 'text-zinc-300' : 'text-zinc-600 dark:text-zinc-400'}`}>
               {author}
            </p>

            {/* Footer Branding */}
            <div className="absolute bottom-16 text-xl flex items-center gap-3 text-white/80 z-20 font-sans tracking-wide">
               <span>🌐 aagamkivaani.vercel.app</span>
               <span>•</span>
               <span>🎥 YouTube: @aagamkivaani</span>
            </div>
            <div className="absolute bottom-8 text-sm text-white/50 z-20 font-sans tracking-widest uppercase">
               आगम से ज्ञान, ज्ञान से दर्शन, दर्शन से आत्मकल्याण
            </div>
        </div>
      </div>
    </>
  );
}