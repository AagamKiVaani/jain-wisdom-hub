//page.tsx
import Link from "next/link";
import { Users, ArrowRight, Ghost, Clock, Sparkles } from "lucide-react";
import DailyWisdom from "@/components/DailyWisdom";
import { getTodaysQuote } from "@/lib/quoteService";

// ... (Translations Object stays the same) ...
const translations = {
  en: {
    badge: "Digital Aagam Alpha 1.0",
    title: "The Path of Wisdom",
    subtitle: "Explore the ancient Jain principles of non-violence, truth, and karma.",
    c1_title: "24 Tirthankaras", c1_sub: "The Sacred Gallery",
    c2_title: "Namokar Mantra", c2_sub: "The Eternal Prayer",
    c3_title: "Wheel of Time", c3_sub: "The Cosmic Cycle",
    c4_title: "Soul & Karma", c4_sub: "The Physics of Soul",
  },
  hi: {
    badge: "डिजिटल आगम अल्फा 1.0",
    title: "ज्ञान का मार्ग",
    subtitle: "अहिंसा, सत्य और कर्म के प्राचीन जैन सिद्धांतों का अन्वेषण करें।",
    c1_title: "24 तीर्थंकर", c1_sub: "तीर्थंकर दर्शन",
    c2_title: "णमोकार मंत्र", c2_sub: "अनादि मंत्र",
    c3_title: "कालचक्र", c3_sub: "समय का चक्र",
    c4_title: "आत्मा और कर्म", c4_sub: "कर्म सिद्धांत",
  },
  kn: {
    badge: "ಡಿಜಿಟಲ್ ಆಗಮ ಆಲ್ಫಾ 1.0",
    title: "ಜ್ಞಾನದ ಮಾರ್ಗ",
    subtitle: "ಅಹಿಂಸೆ, ಸತ್ಯ ಮತ್ತು ಕರ್ಮದ ಪ್ರಾಚೀನ ಜೈನ ತತ್ವಗಳನ್ನು ಅನ್ವೇಷಿಸಿ.",
    c1_title: "24 ತೀರ್ಥಂಕರರು", c1_sub: "ಪವಿತ್ರ ದರ್ಶನ",
    c2_title: "ನಮೋಕಾರ ಮಂತ್ರ", c2_sub: "ಶಾಶ್ವತ ಪ್ರಾರ್ಥನೆ",
    c3_title: "ಕಾಲಚಕ್ರ", c3_sub: "ವಿಶ್ವದ ಚಕ್ರ",
    c4_title: "ಆತ್ಮ ಮತ್ತು ಕರ್ಮ", c4_sub: "ಆತ್ಮದ ವಿಜ್ಞಾನ",
  }
};

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const todaysQuote = getTodaysQuote();
  const t = translations[lang as keyof typeof translations] || translations.en;
  const isIndic = lang === 'hi' || lang === 'kn';

  return (
    <div className="relative flex flex-col items-center min-h-screen px-4 pt-0 pb-24 overflow-hidden bg-white dark:bg-black selection:bg-rose-500 selection:text-white">

      {/* Optimized Background for Mobile (Blur 60px) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-rose-500/10 dark:bg-rose-900/15 blur-[60px] md:blur-[120px] rounded-full pointer-events-none z-0"></div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-7xl mx-auto">
          
          <DailyWisdom lang={lang} quote={todaysQuote} />
          
          {/* Badge */}
          <div className="mb-6 px-4 py-1.5 rounded-full bg-orange-50 dark:bg-orange-900/10 text-orange-800 dark:text-orange-300 text-[10px] md:text-xs font-bold uppercase tracking-widest border border-orange-100 dark:border-orange-500/20 shadow-sm">
            {t.badge}
          </div>

          {/* H1 Title */}
          <h1 className={`text-5xl md:text-8xl font-black text-center text-gray-900 dark:text-white mb-6 uppercase tracking-tighter ${isIndic ? 'leading-tight py-2' : 'leading-none'}`}>
            {t.title}
          </h1>
          
          <p className={`text-lg md:text-xl font-serif text-gray-600 dark:text-gray-400 max-w-2xl text-center mb-16 ${isIndic ? 'leading-loose' : 'leading-relaxed'}`}>
            {t.subtitle}
          </p>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-4xl">
            
            <Link 
              href={`/${lang}/tirthankars`}
              className="group flex flex-col p-8 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/10 rounded-3xl hover:border-rose-500 dark:hover:border-rose-500 transition-all hover:shadow-2xl hover:shadow-rose-500/10 backdrop-blur-sm"
            >
              <div className="flex items-start justify-between mb-6">
                  <div className="h-14 w-14 rounded-2xl bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Users size={28} />
                  </div>
                  <ArrowRight size={20} className="text-gray-300 dark:text-gray-700 group-hover:text-rose-500 -rotate-45 group-hover:rotate-0 transition-all duration-300" />
              </div>
              <div>
                {/* CHANGED h3 -> h2 for Accessibility Hierarchy */}
                <h2 className={`text-xl font-bold text-gray-900 dark:text-white uppercase tracking-tight mb-1 ${isIndic ? 'leading-normal' : ''}`}>{t.c1_title}</h2>
                <p className="text-sm text-gray-500 font-medium">{t.c1_sub}</p>
              </div>
            </Link>

            <Link 
              href={`/${lang}/learn/soul-karma`}
              className="group flex flex-col p-8 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/10 rounded-3xl hover:border-purple-500 dark:hover:border-purple-500 transition-all hover:shadow-2xl hover:shadow-purple-500/10 backdrop-blur-sm"
            >
              <div className="flex items-start justify-between mb-6">
                  <div className="h-14 w-14 rounded-2xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Ghost size={28} />
                  </div>
                  <ArrowRight size={20} className="text-gray-300 dark:text-gray-700 group-hover:text-purple-500 -rotate-45 group-hover:rotate-0 transition-all duration-300" />
              </div>
              <div>
                {/* CHANGED h3 -> h2 */}
                <h2 className={`text-xl font-bold text-gray-900 dark:text-white uppercase tracking-tight mb-1 ${isIndic ? 'leading-normal' : ''}`}>{t.c4_title}</h2>
                <p className="text-sm text-gray-500 font-medium">{t.c4_sub}</p>
              </div>
            </Link>

            <Link 
              // href={`/${lang}/learn/namokar-mantra`}
              href={`/${lang}/coming-soon`}
              className="group flex flex-col p-8 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/10 rounded-3xl hover:border-orange-500 dark:hover:border-orange-500 transition-all hover:shadow-2xl hover:shadow-orange-500/10 backdrop-blur-sm"
            >
              <div className="flex items-start justify-between mb-6">
                  <div className="h-14 w-14 rounded-2xl bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Sparkles size={28} />
                  </div>
                  <ArrowRight size={20} className="text-gray-300 dark:text-gray-700 group-hover:text-orange-500 -rotate-45 group-hover:rotate-0 transition-all duration-300" />
              </div>
              <div>
                {/* CHANGED h3 -> h2 */}
                <h2 className={`text-xl font-bold text-gray-900 dark:text-white uppercase tracking-tight mb-1 ${isIndic ? 'leading-normal' : ''}`}>{t.c2_title}</h2>
                <p className="text-sm text-gray-500 font-medium">{t.c2_sub}</p>
              </div>
            </Link>

            <Link 
              // href={`/${lang}/learn/kalchakra`}
              href={`/${lang}/coming-soon`}
              className="group flex flex-col p-8 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/10 rounded-3xl hover:border-green-500 dark:hover:border-green-500 transition-all hover:shadow-2xl hover:shadow-green-500/10 backdrop-blur-sm"
            >
              <div className="flex items-start justify-between mb-6">
                  <div className="h-14 w-14 rounded-2xl bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Clock size={28} />
                  </div>
                  <ArrowRight size={20} className="text-gray-300 dark:text-gray-700 group-hover:text-green-500 -rotate-45 group-hover:rotate-0 transition-all duration-300" />
              </div>
              <div>
                {/* CHANGED h3 -> h2 */}
                <h2 className={`text-xl font-bold text-gray-900 dark:text-white uppercase tracking-tight mb-1 ${isIndic ? 'leading-normal' : ''}`}>{t.c3_title}</h2>
                <p className="text-sm text-gray-500 font-medium">{t.c3_sub}</p>
              </div>
            </Link>

          </div>
      </div>
    </div>
  );
}