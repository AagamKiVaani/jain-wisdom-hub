"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react"; 

export default function YouTubeToast() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenToast = sessionStorage.getItem("has-seen-youtube-toast");
    
    if (!hasSeenToast) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        
        // --- SOUND EFFECT LOGIC ---
        // 1. Create audio object
        const audio = new Audio("/sounds/notification/ding.mp3"); 
        
        // 2. Lower volume so it's not startling (0.4 = 40%)
        audio.volume = 0.9; 
        
        // 3. Play safely (catch errors if browser blocks autoplay)
        audio.play().catch((error) => {
           // This usually happens if the user hasn't clicked anywhere on the page yet.
           // We silently ignore it so the console stays clean.
           console.log("Toast sound blocked by browser policy (no interaction yet).");
        });

      }, 15000); // 15 seconds

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem("has-seen-youtube-toast", "true");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-6 right-6 z-50 w-[90%] md:w-auto md:max-w-sm"
        >
          <div className="relative bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl p-4 flex items-center gap-4 pr-10">
            
            {/* Custom YouTube Icon Box */}
            <div className="shrink-0 w-12 h-12 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center">
               <svg 
                 viewBox="0 0 24 24" 
                 className="w-6 h-6 text-red-600 dark:text-red-500 fill-current"
                 xmlns="http://www.w3.org/2000/svg"
               >
                 <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
               </svg>
            </div>

            {/* Text Content */}
            <div className="flex-1">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-0.5">
                Watch the Stories
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-tight mb-2">
                Deep dive into Jain wisdom on our official channel.
              </p>
              
              <a 
                href="https://www.youtube.com/@AagamKiVani"
                target="_blank" 
                rel="noopener noreferrer"
                onClick={handleClose}
                className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-full transition-colors shadow-md"
              >
                Subscribe <ExternalLink size={10} />
              </a>
            </div>

            {/* Close Button */}
            <button 
              onClick={handleClose}
              className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors"
              aria-label="Close"
            >
              <X size={16} />
            </button>

            {/* Pulse */}
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}