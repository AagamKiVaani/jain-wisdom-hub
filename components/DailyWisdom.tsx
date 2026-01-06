// components/DailyWisdom.tsx
import { Sparkles } from "lucide-react";

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
  // 1. Determine Language
  const currentLang = (lang === 'hi' || lang === 'kn') ? lang : 'en';
  const t = translations[currentLang];
  
  // 2. Hindi Specific Check
  const isHindi = currentLang === 'hi';

  const text = quote.text[currentLang as keyof QuoteText] || quote.text.en;
  const author = quote.author[currentLang as keyof QuoteText] || quote.author.en;

  return (
    <div className="relative w-full max-w-4xl mx-auto mt-6 mb-8 px-4 animate-in fade-in slide-in-from-top-4 duration-1000">
      
      {/* Glow Effect */}
      <div className="relative p-[1px] rounded-2xl overflow-hidden bg-gradient-to-r from-orange-200 via-orange-400 to-orange-200 dark:from-orange-900 dark:via-orange-600 dark:to-orange-900 bg-[length:200%_auto] animate-shimmer">
        
        {/* Glass Bar */}
        <div className="relative bg-white/95 dark:bg-black/95 backdrop-blur-md rounded-2xl py-3 px-5 md:px-8 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 text-center shadow-sm">
          
          {/* Label */}
          <h2 className="flex items-center gap-2 shrink-0 mb-1 md:mb-0">
             <Sparkles className="w-3 h-3 text-orange-500" />
             {/* CONDITIONAL STYLING FOR TITLE */}
             <span className={`
               text-orange-500 uppercase whitespace-nowrap
               ${isHindi 
                 ? 'text-sm font-bold tracking-normal' // Hindi: Bigger, Normal Spacing
                 : 'text-[10px] font-bold tracking-[0.2em]' // English: Small, Wide Spacing
               }
             `}>
               {t.quoteTitle}
             </span>
          </h2>

          <div className="hidden md:block w-[1px] h-4 bg-zinc-200 dark:bg-zinc-800 shrink-0"></div>

          {/* Quote Text */}
          <p className={`
             font-serif text-zinc-800 dark:text-zinc-200 max-w-xl
             ${isHindi 
               ? 'text-base md:text-xl leading-loose font-medium' // Hindi: Larger & Airy
               : 'text-sm md:text-base leading-snug' // English: Compact
             }
          `}>
            "{text}"
          </p>

          <div className="hidden md:block w-[1px] h-4 bg-zinc-200 dark:bg-zinc-800 shrink-0"></div>

          {/* Author - CONDITIONAL STYLING */}
          <cite className={`
            font-bold text-zinc-400 dark:text-zinc-500 uppercase not-italic shrink-0
            ${isHindi 
               ? 'text-xs md:text-sm tracking-wide' // Hindi: Bigger
               : 'text-[10px] md:text-xs tracking-widest' // English: Small
            }
          `}>
            {author}
          </cite>
          
        </div>
      </div>
    </div>
  );
}