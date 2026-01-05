"use client";
import { useState, useEffect } from "react";
import { quotes } from "@/lib/quotes";
import { Sparkles } from "lucide-react"; // Make sure to import this

const translations = {
  en: { quoteTitle: "Quote of the day" },
  hi: { quoteTitle: "आज का सूत्र" },
  kn: { quoteTitle: "ಇಂದಿನ ಬೋಧನೆ" }
};

interface DailyWisdomProps {
  lang: string;
}

type Lang = "en" | "hi" | "kn";

export default function DailyWisdom({ lang }: { lang: string }) {
  const [todaysQuote, setTodaysQuote] = useState(quotes[0]);
  const [isClient, setIsClient] = useState(false);

   const currentLang = (lang === 'hi' || lang === 'kn') ? lang : 'en';
   const t = translations[currentLang];

  useEffect(() => {
    setIsClient(true);
    const startDate = new Date("2026-01-01").getTime();
    const today = new Date().getTime();
    const msPerDay = 24 * 60 * 60 * 1000;
    const daysPassed = Math.floor((today - startDate) / msPerDay);

    // --- OLD LOGIC (Sequential - Boring) ---
    // const index = daysPassed % quotes.length;

    // --- NEW LOGIC (The Prime Jump - Exciting!) ---
    // We multiply daysPassed by a Prime Number (like 53)
    // This makes it jump around the list wildly, breaking the "batches".
    const primeJump = 53; 
    const offset = 17; // Just a random start point so we don't start at 0

    const index = ((daysPassed * primeJump) + offset) % quotes.length;
    
    const safeIndex = index < 0 ? 0 : index;
    setTodaysQuote(quotes[safeIndex]);
  }, []);

  if (!isClient) return null;

  return (
    // Container: Fits content width, centered
    <div className="relative w-auto max-w-6xl mx-auto mt-6 mb-8 px-4 animate-in fade-in slide-in-from-top-4 duration-1000">
      
      {/* --- THE GLOWING BORDER --- */}
      {/* We use a gradient background with padding to create a 'border' effect */}
      <div className="relative p-[1px] rounded-2xl overflow-hidden bg-gradient-to-r from-orange-200 via-orange-400 to-orange-200 dark:from-orange-900 dark:via-orange-600 dark:to-orange-900 bg-[length:200%_auto] animate-shimmer">
        
        {/* --- MAIN GLASS BAR --- */}
        <div className="relative bg-white/95 dark:bg-black/95 backdrop-blur-md rounded-2xl py-3 px-6 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 text-center shadow-sm">
          
          <div className="flex items-center gap-2 mb-1 md:mb-0">
             <Sparkles className="w-4 h-4 text-orange-500" />
             <span className="text-[10px] font-bold uppercase tracking-widest text-orange-500">{t.quoteTitle}</span>
          </div>

          {/* Quote Text */}
          <p className="font-serif text-sm md:text-base text-zinc-800 dark:text-zinc-200 leading-snug max-w-xl">
            "{todaysQuote.text[currentLang]}"
          </p>

          {/* Divider (Mobile: Hidden, Desktop: Vertical Line) */}
          <div className="hidden md:block w-[1px] h-4 bg-zinc-200 dark:bg-zinc-800 shrink-0"></div>

          {/* Author Name */}
          <cite className="text-[10px] md:text-xs font-bold tracking-widest text-orange-600 dark:text-orange-500 uppercase not-italic shrink-0">
            {todaysQuote.author[currentLang]}
          </cite>
          
        </div>
      </div>
    </div>
  );
}