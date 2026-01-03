import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Instagram, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact | Jain Wisdom",
  description: "Get in touch with the creator.",
};

// --- TRANSLATIONS ---
const translations = {
  en: {
    back: "Back to Home",
    preTitle: "Get In Touch",
    titleStart: "Let's",
    titleHighlight: "Connect",
    desc: "Have a suggestion, found a bug, or just want to say Jai Jinendra? I read every message personally.",
    emailBtn: "Send me an Email",
    youtube: "YouTube",
    insta: "Instagram",
    support: "Support",
  },
  hi: {
    back: "मुख्य पृष्ठ पर जाएं",
    preTitle: "संपर्क करें",
    titleStart: "चलो",
    titleHighlight: "जुड़ते हैं",
    desc: "कोई सुझाव है, कोई त्रुटि मिली, या बस 'जय जिनेन्द्र' कहना चाहते हैं? मैं हर संदेश व्यक्तिगत रूप से पढ़ता हूं।",
    emailBtn: "ईमेल भेजें",
    youtube: "यूट्यूब",
    insta: "इंस्टाग्राम",
    support: "सहयोग करें",
  },
  kn: {
    back: "ಮನೆಗೆ ಹಿಂತಿರುಗಿ",
    preTitle: "ಸಂಪರ್ಕಿಸಿ",
    titleStart: "ಬನ್ನಿ",
    titleHighlight: "ಸಂಪರ್ಕಿಸೋಣ",
    desc: "ಯಾವುದೇ ಸಲಹೆಗಳಿವೆಯೇ, ದೋಷ ಕಂಡುಬಂದಿದೆಯೇ ಅಥವಾ 'ಜೈ ಜಿನೇಂದ್ರ' ಎಂದು ಹೇಳಲು ಬಯಸುವಿರಾ? ನಾನು ಪ್ರತಿ ಸಂದೇಶವನ್ನು ಓದುತ್ತೇನೆ.",
    emailBtn: "ಇಮೇಲ್ ಕಳುಹಿಸಿ",
    youtube: "ಯೂಟ್ಯೂಬ್",
    insta: "ಇನ್ಸ್ಟಾಗ್ರಾಮ್",
    support: "ಬೆಂಬಲಿಸಿ",
  },
};

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  
  const t = translations[lang as keyof typeof translations] || translations.en;
  const isIndic = lang === 'hi' || lang === 'kn';

  return (
    <div className="min-h-screen flex flex-col justify-center px-6 bg-zinc-50 dark:bg-black relative overflow-hidden pt-24 md:pt-0">
      
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      {/* --- BACK BUTTON FIX --- 
          1. w-full max-w-2xl mx-auto: Aligns it with the text on mobile
          2. mb-8: Adds space below button on mobile
          3. md:absolute md:mb-0: Switches to floating style ONLY on desktop
      */}
      <div className="w-full max-w-2xl mx-auto flex justify-start mb-8 md:mb-0 md:absolute md:top-24 md:left-20 z-20">
         <Link 
            href={`/${lang}`} 
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity hover:text-orange-500 text-gray-900 dark:text-white"
        >
            <ArrowLeft size={16} /> {t.back}
        </Link>
      </div>

      <div className="max-w-2xl mx-auto relative z-10 text-center">
        
        <span className="text-orange-500 font-bold tracking-[0.3em] text-xs uppercase mb-4 block">
          {t.preTitle}
        </span>
        
        <h1 className={`text-5xl md:text-7xl font-black uppercase tracking-tight text-gray-900 dark:text-white mb-8 ${isIndic ? 'leading-normal py-2' : 'leading-none'}`}>
          {t.titleStart} <span className="underline decoration-orange-500 underline-offset-8">{t.titleHighlight}</span>
        </h1>
        
        <p className={`text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-lg mx-auto ${isIndic ? 'leading-loose font-medium' : 'leading-relaxed'}`}>
           {t.desc}
        </p>

        {/* Main Action: Email */}
        <div className="mb-12">
            <a 
                href="mailto:aagamkivaani@gmail.com" 
                aria-label="Mail me"
                className="inline-flex items-center gap-3 bg-gray-900 dark:bg-white text-white dark:text-black px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-xl"
            >
                <Mail className="w-5 h-5" />
                {t.emailBtn}
            </a>
        </div>

        {/* Social Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-lg mx-auto">
            {/* YOUTUBE */}
            <a 
                href="https://www.youtube.com/@AagamKiVani" 
                target="_blank"
                aria-label="Subscribe on YouTube"
                className="flex flex-col items-center justify-center p-6 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/10 rounded-2xl hover:border-red-500 hover:shadow-[0_0_20px_rgba(239,68,68,0.2)] transition-all group"
            >
                <div className="w-10 h-10 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-red-600 dark:text-red-500 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </div>
                <span className="font-bold text-sm text-gray-900 dark:text-white">{t.youtube}</span>
            </a>

            {/* INSTAGRAM */}
            <a 
                href="https://www.instagram.com/aagamkivaani/" 
                target="_blank"
                aria-label="Follow us on Instagram"
                className="flex flex-col items-center justify-center p-6 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/10 rounded-2xl hover:border-pink-500 hover:shadow-[0_0_20px_rgba(236,72,153,0.2)] transition-all group"
            >
                <div className="w-10 h-10 rounded-full bg-pink-50 dark:bg-pink-900/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                     <svg viewBox="0 0 24 24" className="w-5 h-5 text-pink-600 dark:text-pink-500 fill-none stroke-current stroke-2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                     </svg>
                </div>
                <span className="font-bold text-sm text-gray-900 dark:text-white">{t.insta}</span>
            </a>

            {/* BUY ME A COFFEE */}
            <a 
                href="https://buymeacoffee.com/aagamkivaani" 
                target="_blank"
                aria-label="Donate Money"
                className="flex flex-col items-center justify-center p-6 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/10 rounded-2xl hover:border-yellow-500 hover:shadow-[0_0_20px_rgba(234,179,8,0.2)] transition-all group"
            >
                <div className="w-10 h-10 rounded-full bg-yellow-50 dark:bg-yellow-900/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-yellow-600 dark:text-yellow-500 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 5h-2V5h2v3zM4 19h16v2H4z"/></svg>
                </div>
                <span className="font-bold text-sm text-gray-900 dark:text-white">{t.support}</span>
            </a>
        </div>

      </div>
    </div>
  );
}