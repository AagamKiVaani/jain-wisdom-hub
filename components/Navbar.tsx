"use client";

import { Moon, Sun, Languages, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react"; // Added useEffect to fix hydration mismatch

export default function Navbar({ lang }: { lang: string }) {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  
  // State to track if the dropdown is open or closed
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Wait until mounted to avoid mismatch errors
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
    setIsLangOpen(false); // Close menu after clicking
  };

  if (!mounted) {
    return null; // Prevents weird icon flickering on load
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-black/80 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        <div className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          Jain Wisdom
        </div>

        <div className="flex items-center gap-4">
          
          {/* LANGUAGE BUTTON (Click instead of Hover) */}
          <div className="relative">
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)} // Toggle open/close
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2 text-sm font-medium transition-colors"
            >
              <Languages size={18} />
              <span className="uppercase">{lang}</span>
              <ChevronDown size={14} className={`transition-transform ${isLangOpen ? "rotate-180" : ""}`} />
            </button>
            
            {/* The Menu */}
            {isLangOpen && (
              <>
                {/* Invisible backdrop to close menu when clicking outside */}
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setIsLangOpen(false)}
                />
                
                {/* The actual dropdown */}
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