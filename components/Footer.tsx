"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, ArrowUp, Instagram, Heart, Sparkles } from "lucide-react"; 
import { siteConfig } from "@/lib/constants";

// --- TRANSLATIONS CONFIGURATION ---
const translations = {
  en: {
    brand: "Aagam Ki Vaani",
    desc: "Digitizing the sacred sound and timeless teachings of the Tirthankaras for the modern world.",
    motto: "आगम से ज्ञान, ज्ञान से दर्शन, दर्शन से आत्मकल्याण।",
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
    feedback: "Feedback / Bugs",
    
    backToTop: "Back to Top",
    rights: "All rights reserved."
  },
  hi: {
    brand: "आगम की वाणी",
    desc: "तीर्थंकरों की दिव्य देशना और प्राचीन आगमों का आधुनिक डिजिटलीकरण।",
    motto: "आगम से ज्ञान, ज्ञान से दर्शन, दर्शन से आत्मकल्याण।",
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
    feedback: "सुझाव / त्रुटि",
    
    backToTop: "ऊपर जाएं",
    rights: "सर्वाधिकार सुरक्षित।"
  },
  kn: {
    brand: "ಆಗಮ ಕೀ ವಾಣಿ",
    desc: "ತೀರ್ಥಂಕರರ ದಿವ್ಯ ದೇಶನೆ ಮತ್ತು ಪರಂಪರೆಯನ್ನು ಆಧುನಿಕ ಜಗತ್ತಿಗೆ ತಲುಪಿಸುವುದು.",
    motto: "ಆಗಮದಿಂದ ಜ್ಞಾನ, ಜ್ಞಾನದಿಂದ ದರ್ಶನ, ದರ್ಶನದಿಂದ ಆತ್ಮಕಲ್ಯಾಣ.",
    subscribe: "ಸಬ್ಸ್ ಕ್ರೈಬ್",
    explore: "ಅನ್ವೇಷಿಸಿ",
    project: "ಯೋಜನೆ",
    
    tirthankars: "ತೀರ್ಥಂಕರ ಗ್ಯಾಲರಿ",
    soul: "ಆತ್ಮ ಮತ್ತು ಕರ್ಮ",
    time: "ಕಾಲಚಕ್ರ",
    namokar: "ನಮೋಕಾರ ಮಂತ್ರ",
    
    about: "ನಮ್ಮ ಬಗ್ಗೆ",
    contact: "ಸಂಪರ್ಕಿಸಿ",
    donate: "ದೇಣಿಗೆ / ಬೆಂಬಲ",
    feedback: "ಪ್ರತಿಕ್ರಿಯೆ", // Added Label
    
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
    <footer className="relative bg-zinc-50 dark:bg-black text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-white/5 pt-20 pb-10 overflow-hidden selection:text-rose-500">
      
      {/* Decorative Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-rose-500/50 to-transparent"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-orange-500/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-start">
          
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden shadow-md">
                <Image 
                  src="/icons/navbar-logo.webp" 
                  alt="Aagam Ki Vaani Emblem" 
                  fill
                  className="object-cover"
                />
              </div>
              <h2 className={`text-2xl font-black text-gray-900 dark:text-white tracking-tight uppercase ${isIndic ? 'leading-normal' : 'leading-none'}`}>
                {t.brand}
              </h2>
            </div>
            <div className="max-w-md text-sm mb-8 space-y-2">
              <p className={isIndic ? 'leading-loose' : 'leading-relaxed'}>
                {t.desc}
              </p>
              <p className="font-serif italic font-semibold text-orange-600 dark:text-orange-400 tracking-wide text-xs sm:text-sm">
                {t.motto}
              </p>
            </div>
            
            {/* Social Pill - single line on all device sizes with authentic brand colors */}
            <div className="flex items-center gap-2 sm:gap-3 flex-nowrap overflow-x-auto no-scrollbar py-1">
               {/* YOUTUBE */}
               <a 
                 href= {siteConfig.socials.youtube} 
                 target="_blank"
                 rel="noopener noreferrer"
                 aria-label="Subscribe on YouTube"
                 className="flex items-center gap-1.5 sm:gap-2 bg-red-600 hover:bg-red-700 text-white px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full font-bold text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-widest transition-all hover:scale-105 shadow-md shadow-red-600/25 shrink-0"
               >
                 <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current shrink-0" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                 </svg>
                 <span>{t.subscribe}</span>
               </a>

               {/* INSTAGRAM */}
                <a 
                    href= {siteConfig.socials.instagram} 
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow us on Instagram"
                    className="p-2 sm:p-2.5 rounded-full bg-[#E4405F]/10 dark:bg-[#E4405F]/15 border border-[#E4405F]/30 text-[#E4405F] hover:bg-[#E4405F]/25 hover:border-[#E4405F] hover:scale-110 shadow-sm transition-all flex items-center justify-center shrink-0"
                >
                    <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>

                {/* FACEBOOK */}
                <a 
                    href= {siteConfig.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow us on Facebook"
                    className="p-2 sm:p-2.5 rounded-full bg-[#1877F2]/10 dark:bg-[#1877F2]/15 border border-[#1877F2]/30 text-[#1877F2] hover:bg-[#1877F2]/25 hover:border-[#1877F2] hover:scale-110 shadow-sm transition-all flex items-center justify-center shrink-0"
                >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036c-2.148 0-2.971.956-2.971 3.594v.376h3.428l-.532 3.667h-2.896v7.981A10.309 10.309 0 0 0 22.28 12 10.28 10.28 0 1 0 1.72 12a10.3 10.3 0 0 0 7.381 11.691z"/>
                    </svg>
                </a>

                {/* WHATSAPP (NEW) */}
                <a 
                    href={siteConfig.socials.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Join our WhatsApp Channel"
                    className="p-2 sm:p-2.5 rounded-full bg-[#25D366]/10 dark:bg-[#25D366]/15 border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/25 hover:border-[#25D366] hover:scale-110 shadow-sm transition-all flex items-center justify-center shrink-0"
                >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                </a>

               {/* EMAIL */}
               <a 
                   href= {siteConfig.email}
                   aria-label="Email Me"
                   className="p-2 sm:p-2.5 rounded-full bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400 hover:bg-amber-500/25 hover:border-amber-500 hover:scale-110 shadow-sm transition-all flex items-center justify-center shrink-0"
               >
                   <Mail className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
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
                <li><Link href={`/${lang}/coming-soon`} className="hover:text-orange-500 transition-colors">{t.namokar}</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-900 dark:text-white mb-6">{t.project}</h4>
              <ul className={`space-y-4 text-sm ${isIndic ? 'leading-loose' : ''}`}>
                {/* 🌟 Highlighted About Us */}
                <li>
                  <Link 
                    href={`/${lang}/about`} 
                    className="inline-flex items-center gap-2 font-bold text-amber-600 dark:text-amber-400 hover:text-amber-500 transition-colors group"
                  >
                    <span>{t.about}</span>
                    <span className="text-[10px] font-extrabold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-300 border border-amber-500/30 group-hover:scale-105 transition-transform">
                      Story
                    </span>
                  </Link>
                </li>
                
                <li><Link href={`/${lang}/contact`} className="hover:text-orange-500 transition-colors">{t.contact}</Link></li>
                
                {/* 🟢 FEEDBACK LINK */}
                <li><Link href={`/${lang}/feedback`} className="hover:text-orange-500 transition-colors">{t.feedback}</Link></li>

                {/* 💖 Highlighted Donate / Support */}
                <li className="pt-2">
                  <a 
                    href={siteConfig.support.razorpay}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Support Aagam Ki Vaani via Razorpay"
                    className="group relative inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-amber-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-rose-500/25 hover:shadow-xl hover:shadow-rose-500/40 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 border border-white/20 overflow-hidden"
                  >
                    {/* Subtle Shimmer Ray */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
                    
                    <Heart size={16} className="text-white fill-white animate-pulse" />
                    <span className="tracking-wide">{t.donate}</span>
                    <Sparkles size={14} className="text-yellow-200" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-500 dark:bg-white/10 mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-xs font-medium opacity-80 text-black dark:text-white">
            © {new Date().getFullYear()} {t.brand}. {t.rights}
          </div>
          
          <button 
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-rose-500 transition-colors"
          >
            {t.backToTop}
            <span className="p-2 rounded-full bg-gray-100 dark:bg-white/10 group-hover:bg-rose-500 group-hover:text-white transition-colors">
                <ArrowUp size={14} />
            </span>
          </button>
        </div>
        
      </div>
    </footer>
  );
}