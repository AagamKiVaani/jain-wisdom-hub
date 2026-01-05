"use client";

import Link from "next/link";
import Image from "next/image"; // <--- Added Image import
import { Moon, Sun, Languages, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { siteConfig } from "@/lib/constants";

export default function Navbar({ lang }: { lang: string }) {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const switchLanguage = (newLang: string) => {
    if (!pathname) return;
    const segments = pathname.split("/");
    if (segments.length > 1) {
      segments[1] = newLang;
      router.push(segments.join("/"));
    } else {
      router.push(`/${newLang}`);
    }
    setIsLangOpen(false);
  };

  if (!mounted) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-black/80 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* --- LOGO + TEXT --- */}
        <Link 
            href={`/${lang}`} 
            className="flex items-center gap-3 group" // Added flex container
        >
          {/* Logo Image */}
          <div className="relative w-8 h-8 md:w-9 md:h-9">
            <Image 
              src="/icons/logo.png" 
              alt="Jain Wisdom Logo" 
              fill
              className="object-contain"
              priority // Loads instantly
              quality={100}
              sizes="40px"
            />
          </div>

          {/* Text */}
          <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-500 transition-colors">
            Jain Wisdom
          </span>
        </Link>

        <div className="flex items-center gap-2 md:gap-4">
          
          {/* --- YOUTUBE LINK --- */}
          <a
            href={siteConfig.socials.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 p-2 rounded-md hover:bg-red-50 dark:hover:bg-red-900/10 transition-all"
            aria-label="Subscribe on YouTube"
          >
            <svg 
              viewBox="0 0 24 24" 
              className="w-5 h-5 text-red-600 dark:text-red-600 group-hover:text-red-700 dark:group-hover:text-red-500 transition-colors fill-current"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            <span className="hidden md:block text-sm font-bold text-red-600 dark:text-gray-300 group-hover:text-red-700 dark:group-hover:text-red-500 transition-colors">
              YouTube
            </span>
          </a>

          {/* LANGUAGE BUTTON */}
          <div className="relative">
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2 text-sm font-medium transition-colors"
            >
              <Languages size={18} />
              <span className="uppercase">{lang}</span>
              <ChevronDown size={14} className={`transition-transform ${isLangOpen ? "rotate-180" : ""}`} />
            </button>
            
            {isLangOpen && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setIsLangOpen(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-32 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-20 overflow-hidden">
                  <button onClick={() => switchLanguage('en')} className="block w-full text-left px-4 py-3 hover:bg-orange-50 dark:hover:bg-gray-800 text-sm transition-colors">English</button>
                  <button onClick={() => switchLanguage('hi')} className="block w-full text-left px-4 py-3 hover:bg-orange-50 dark:hover:bg-gray-800 text-sm transition-colors">Hindi</button>
                  <button onClick={() => switchLanguage('kn')} className="block w-full text-left px-4 py-3 hover:bg-orange-50 dark:hover:bg-gray-800 text-sm transition-colors">Kannada</button>
                </div>
              </>
            )}
          </div>

          {/* THEME BUTTON */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 relative transition-colors"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? (
               <Moon className="h-5 w-5 text-gray-100" />
            ) : (
               <Sun className="h-5 w-5 text-orange-500" />
            )}
          </button>
          
        </div>
      </div>
    </nav>
  );
}