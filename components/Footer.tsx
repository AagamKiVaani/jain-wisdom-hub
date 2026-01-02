"use client";

import Link from "next/link";
import { Mail, ArrowUp, Instagram } from "lucide-react"; 
import { siteConfig } from "@/lib/constants";

// --- TRANSLATIONS CONFIGURATION ---
const translations = {
  en: {
    brand: "Jain Wisdom",
    desc: "Digitizing the ancient legacy of the Tirthankaras for the modern world. A visual journey through time, philosophy, and divinity.",
    subscribe: "Subscribe",
    explore: "Explore",
    project: "Project",
    
    // Links
    tirthankars: "Tirthankar Gallery",
    soul: "Soul & Karma",
    time: "Wheel of Time",
    namokar: "Namokar Mantra",
    
    about: "About Us",
    contact: "Contact",
    donate: "Donate / Support",
    
    backToTop: "Back to Top",
    rights: "All rights reserved."
  },
  hi: {
    brand: "जैन ज्ञान", // Jain Wisdom
    desc: "आधुनिक दुनिया के लिए तीर्थंकरों की प्राचीन विरासत का डिजिटलीकरण। समय, दर्शन और देवत्व के माध्यम से एक दृश्य यात्रा।",
    subscribe: "सब्सक्राइब",
    explore: "अन्वेषण",
    project: "प्रोजेक्ट",
    
    tirthankars: "तीर्थंकर गैलरी",
    soul: "आत्मा और कर्म",
    time: "कालचक्र",
    namokar: "णमोकार मंत्र",
    
    about: "हमारे बारे में",
    contact: "संपर्क",
    donate: "दान / सहयोग",
    
    backToTop: "ऊपर जाएं",
    rights: "सर्वाधिकार सुरक्षित।"
  },
  kn: {
    brand: "ಜೈನ ಜ್ಞಾನ", // Jain Wisdom
    desc: "ಆಧುನಿಕ ಜಗತ್ತಿಗಾಗಿ ತೀರ್ಥಂಕರರ ಪ್ರಾಚೀನ ಪರಂಪರೆಯನ್ನು ಡಿಜಿಟಲೀಕರಣಗೊಳಿಸುವುದು. ಸಮಯ, ತತ್ವಶಾಸ್ತ್ರ ಮತ್ತು ದೈವತ್ವದ ದೃಶ್ಯ ಪ್ರಯಾಣ.",
    subscribe: "ಚಂದಾದಾರರಾಗಿ",
    explore: "ಅನ್ವೇಷಿಸಿ",
    project: "ಯೋಜನೆ",
    
    tirthankars: "ತೀರ್ಥಂಕರ ಗ್ಯಾಲರಿ",
    soul: "ಆತ್ಮ ಮತ್ತು ಕರ್ಮ",
    time: "ಕಾಲಚಕ್ರ",
    namokar: "ನಮೋಕಾರ ಮಂತ್ರ",
    
    about: "ನಮ್ಮ ಬಗ್ಗೆ",
    contact: "ಸಂಪರ್ಕಿಸಿ",
    donate: "ದೇಣಿಗೆ / ಬೆಂಬಲ",
    
    backToTop: "ಮೇಲಕ್ಕೆ ಹಿಂತಿರುಗಿ",
    rights: "ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ."
  }
};

export default function Footer({ lang }: { lang: string }) {
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 1. Select Language
  const t = translations[lang as keyof typeof translations] || translations.en;
  
  // 2. Check for Indic scripts to fix line-height spacing
  const isIndic = lang === 'hi' || lang === 'kn';

  return (
    <footer className="relative bg-zinc-50 dark:bg-black text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-white/5 pt-20 pb-10 overflow-hidden">
      
      {/* Decorative Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-orange-500/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-start">
          
          {/* Brand Info */}
          <div>
            <h2 className={`text-2xl font-black text-gray-900 dark:text-white tracking-tight uppercase mb-4 ${isIndic ? 'leading-normal' : 'leading-none'}`}>
              {t.brand}
            </h2>
            <p className={`max-w-md text-sm mb-8 ${isIndic ? 'leading-loose' : 'leading-relaxed'}`}>
              {t.desc}
            </p>
            
            {/* Social Pill */}
            <div className="flex items-center gap-3 flex-wrap">
               {/* YOUTUBE */}
               <a 
                 href= {siteConfig.socials.youtube} 
                 target="_blank"
                 rel="noopener noreferrer"
                 className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-widest transition-all hover:scale-105 shadow-lg shadow-red-600/20"
               >
                 <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                 </svg>
                 {t.subscribe}
               </a>

               {/* INSTAGRAM */}
                <a 
                    href= {siteConfig.socials.instagram} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-pink-500 hover:text-pink-500 transition-colors flex items-center justify-center"
                >
                    <Instagram size={20} />
                </a>

                {/* FACEBOOK */}
                <a 
                    href= {siteConfig.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-blue-600 hover:text-blue-600 transition-colors flex items-center justify-center"
                >
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036c-2.148 0-2.971.956-2.971 3.594v.376h3.428l-.532 3.667h-2.896v7.981A10.309 10.309 0 0 0 22.28 12 10.28 10.28 0 1 0 1.72 12a10.3 10.3 0 0 0 7.381 11.691z"/>
                    </svg>
                </a>

                {/* EMAIL */}
                <a 
                    href= {siteConfig.email}
                    className="p-2.5 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-orange-500 hover:text-orange-500 transition-colors flex items-center justify-center"
                >
                    <Mail size={18} />
                </a>
            </div>
          </div>

          {/* Quick Links Grid - COLOR CODED */}
          <div className="grid grid-cols-2 gap-8 md:pl-20">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-900 dark:text-white mb-6">{t.explore}</h4>
              <ul className={`space-y-4 text-sm ${isIndic ? 'leading-loose' : ''}`}>
                
                {/* Rose for Tirthankars */}
                <li><Link href={`/${lang}/tirthankars`} className="hover:text-rose-500 transition-colors">{t.tirthankars}</Link></li>
                
                {/* Purple for Soul/Karma */}
                <li><Link href={`/${lang}/learn/soul-karma`} className="hover:text-purple-500 transition-colors">{t.soul}</Link></li>
                
                {/* Green for Wheel of Time */}
                <li><Link href={`/${lang}/learn/kalchakra`} className="hover:text-green-500 transition-colors">{t.time}</Link></li>
                
                {/* Orange for Namokar */}
                <li><Link href={`/${lang}/learn/namokar-mantra`} className="hover:text-orange-500 transition-colors">{t.namokar}</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-900 dark:text-white mb-6">{t.project}</h4>
              <ul className={`space-y-4 text-sm ${isIndic ? 'leading-loose' : ''}`}>
                <li><Link href={`/${lang}/about`} className="hover:text-orange-500 transition-colors">{t.about}</Link></li>
                <li><Link href={`/${lang}/contact`} className="hover:text-orange-500 transition-colors">{t.contact}</Link></li>
                <li>
                    <a 
                    href= {siteConfig.support.buyMeCoffee}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 hover:text-yellow-500 transition-colors font-semibold"
                    >
                        <svg 
                        viewBox="0 0 24 24" 
                        className="w-4 h-4 text-gray-400 group-hover:text-yellow-500 transition-colors fill-current" 
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <path d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 5h-2V5h2v3zM4 19h16v2H4z"/>
                        </svg>
                        
                        <span>{t.donate}</span>
                    </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-200 dark:bg-white/10 mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-xs font-medium opacity-60">
            © {new Date().getFullYear()} {t.brand}. {t.rights}
          </div>
          
          <button 
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-orange-500 transition-colors"
          >
            {t.backToTop}
            <span className="p-2 rounded-full bg-gray-100 dark:bg-white/10 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                <ArrowUp size={14} />
            </span>
          </button>
        </div>
        
      </div>
    </footer>
  );
}