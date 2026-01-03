"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react"; 
import { useParams } from "next/navigation"; // <--- 1. Import this to get the language
import { siteConfig } from "@/lib/constants";

export default function YouTubeToast() {
  const [isVisible, setIsVisible] = useState(false);

  // 2. Get Language
  const params = useParams();
  // Safe check: default to 'en' if params is undefined
  const lang = (params?.lang as string) || "en";

  // 3. Translation Data
  const translations = {
    en: {
      title: "Watch the Stories",
      desc: "Deep dive into Jain wisdom on our official channel.",
      button: "SUBSCRIBE"
    },
    hi: {
      title: "कहानियां देखें",
      desc: "हमारे चैनल पर जैन ज्ञान की गहराई में उतरें।",
      button: "सब्सक्राइब"
    },
    kn: {
      title: "ಕಥೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ", // Kathegaḷannu Vīkṣisi
      desc: "ನಮ್ಮ ಅಧಿಕೃತ ಚಾನೆಲ್‌ನಲ್ಲಿ ಜೈನ ಜ್ಞಾನವನ್ನು ತಿಳಿಯಿರಿ.", // Namma adhikṛta cānelnalli...
      button: "ಸಬ್ಸ್ ಕ್ರೈಬ್" // Chandadārarāgi
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  useEffect(() => {
    const hasSeenToast = sessionStorage.getItem("has-seen-youtube-toast");
    
    if (!hasSeenToast) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        
        // --- SOUND EFFECT LOGIC ---
        const audio = new Audio("/sounds/notification/ding.mp3"); 
        audio.volume = 0.9; 
        
        audio.play().catch((error) => {
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
                {t.title}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-tight mb-2">
                {t.desc}
              </p>
              
              <a 
                href= {siteConfig.socials.youtube}
                target="_blank" 
                rel="noopener noreferrer"
                onClick={handleClose}
                aria-label="Subscribe on YouTube"
                className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-full transition-colors shadow-md"
              >
                {t.button} <ExternalLink size={10} />
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