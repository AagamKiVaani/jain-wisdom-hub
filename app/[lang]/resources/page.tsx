import Link from "next/link";
import { Metadata } from "next";
import { Sparkles } from "lucide-react";
import NotesClient from "./components/NotesClient";
import { fetchNotes } from "@/lib/notesService";

export const metadata: Metadata = {
  title: "Resources & Notes | Jain Wisdom Hub",
  description: "Download free notes and PDFs for Jain Wisdom Hub's YouTube series including Decoding Jainism and Tatvarth Series.",
};

const translations = {
  en: {
    badge: "Free Resources",
    title: "Wisdom Library",
    subtitle: "Download detailed notes, PDFs, and reference materials for all our YouTube series.",
    backHome: "Back to Home",
    search: "Search notes, topics...",
    download: "Download PDF",
    noNotes: "No Notes Found",
    backToSeries: "Back to Series",
  },
  hi: {
    badge: "मुफ्त संसाधन",
    title: "ज्ञान पुस्तकालय",
    subtitle: "हमारी सभी YouTube श्रृंखलाओं के लिए विस्तृत नोट्स, पीडीएफ और संदर्भ सामग्री डाउनलोड करें।",
    backHome: "होम पर वापस जाएं",
    search: "नोट्स या विषय खोजें...",
    download: "पीडीएफ डाउनलोड करें",
    noNotes: "कोई नोट्स नहीं मिले",
    backToSeries: "श्रृंखला पर वापस जाएं",
  },
  kn: {
    badge: "ಉಚಿತ ಸಂಪನ್ಮೂಲಗಳು",
    title: "ಜ್ಞಾನ ಗ್ರಂಥಾಲಯ",
    subtitle: "ನಮ್ಮ ಎಲ್ಲಾ ಯೂಟ್ಯೂಬ್ ಸರಣಿಗಳಿಗೆ ವಿವರವಾದ ಟಿಪ್ಪಣಿಗಳು, ಪಿಡಿಎಫ್‌ಗಳು ಮತ್ತು ಉಲ್ಲೇಖ ಸಾಮಗ್ರಿಗಳನ್ನು ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ.",
    backHome: "ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ",
    search: "ಟಿಪ್ಪಣಿಗಳು ಅಥವಾ ವಿಷಯಗಳನ್ನು ಹುಡುಕಿ...",
    download: "ಪಿಡಿಎಫ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ",
    noNotes: "ಯಾವುದೇ ಟಿಪ್ಪಣಿಗಳು ಕಂಡುಬಂದಿಲ್ಲ",
    backToSeries: "ಸರಣಿಗೆ ಹಿಂತಿರುಗಿ",
  }
};

export default async function ResourcesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = translations[lang as keyof typeof translations] || translations.en;
  const isIndic = lang === 'hi' || lang === 'kn';
  
  // Fetch data (from Google Sheets CSV or Fallback)
  const notes = await fetchNotes();

  return (
    <div className="relative flex flex-col items-center min-h-screen pt-24 pb-24 overflow-hidden bg-white dark:bg-black selection:bg-blue-500 selection:text-white">
      
      {/* Divine Ethereal Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-blue-500/10 dark:bg-blue-900/20 blur-[80px] md:blur-[140px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-indigo-500/5 dark:bg-indigo-900/10 blur-[100px] rounded-full pointer-events-none z-0"></div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-7xl mx-auto px-4">
        
        {/* Top Navigation */}
        <div className="w-full flex justify-start mb-12 animate-in fade-in slide-in-from-left-8 duration-700">
          <Link href={`/${lang}`} className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md border border-zinc-200 dark:border-white/10 hover:border-blue-500 hover:text-blue-500 transition-all shadow-sm">
             <span className="text-sm font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-400 group-hover:text-blue-500 transition-colors">← {t.backHome}</span>
          </Link>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-top-10 duration-1000">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/10 text-blue-800 dark:text-blue-300 text-[10px] md:text-xs font-bold uppercase tracking-widest border border-blue-100 dark:border-blue-500/20 shadow-sm">
            <Sparkles size={14} className="text-blue-500" />
            {t.badge}
          </div>
          
          <h1 className={`text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 dark:from-white dark:via-blue-200 dark:to-white mb-6 uppercase tracking-tighter ${isIndic ? 'leading-tight py-2' : 'leading-none'}`}>
            {t.title}
          </h1>
          
          <p className={`text-lg md:text-xl font-serif text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed ${isIndic ? 'leading-loose' : 'leading-relaxed'}`}>
            {t.subtitle}
          </p>
        </div>

        {/* Client Component for filtering, animations, and interactivity */}
        <NotesClient initialNotes={notes} isIndic={isIndic} t={t} />

      </div>
    </div>
  );
}
