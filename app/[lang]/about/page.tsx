import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "About | Jain Wisdom",
  description: "The mission behind digitizing Jain history.",
};

// --- TRANSLATIONS ---
const translations = {
  en: {
    back: "Back to Home",
    preTitle: "The Mission",
    title1: "BRIDGING DHARMA",
    title2: "With Technology.",
    quote: "Our ancient texts hold eternal wisdom, but complex philosophy and language barriers often keep the younger generation away. I wanted to build a bridge.",
    
    p1_start: "", 
    p1_bold: "AagamKiVaani",
    p1_end: " is a solo project with a massive vision: to carry forward the legacy of the Tirthankaras through modern technology.",
    
    p2_start: "This website is not just a biography of the 24 Tirthankaras. It is a visual attempt to explain the profound topics of Jainism—from the ",
    p2_bold1: "Mathematics of Karma",
    p2_middle: " to the ",
    p2_bold2: "Geography of the Universe (Teen Lok)",
    p2_end: ".",

    p3: "I use Next.js for the web, AI for scripting, and cinematic tools to turn static text into immersive experiences. The goal is to make the Agamas (scriptures) feel as engaging as a movie, without losing their sanctity.",
    
    roadmapTitle: "The Roadmap",
    roadmapText: "Starting with Lord Adinath, this digital archive will grow to include interactive 3D maps of the Universe, visual breakdowns of Soul Theory, and the life stories of all 24 Tirthankaras.",
    
    thanks: "Thank you for being part of this journey.",
    creator: "Creator & Developer"
  },
  hi: {
    back: "मुख्य पृष्ठ पर जाएं",
    preTitle: "हमारा लक्ष्य",
    title1: "धर्म और तकनीक",
    title2: "का अनूठा संगम।",
    quote: "हमारे प्राचीन ग्रंथों में शाश्वत ज्ञान है, लेकिन कठिन दर्शन और भाषा की बाधाएं अक्सर युवा पीढ़ी को दूर रखती हैं। मैं एक सेतु बनाना चाहता था।",
    
    p1_start: "",
    p1_bold: "आगम की वाणी (AagamKiVaani)",
    p1_end: " एक विशाल दृष्टिकोण वाली एकल परियोजना है: आधुनिक तकनीक के माध्यम से तीर्थंकरों की विरासत को आगे बढ़ाना।",

    p2_start: "यह वेबसाइट केवल 24 तीर्थंकरों की जीवनी नहीं है। यह जैन धर्म के गहन विषयों को समझाने का एक दृश्य प्रयास है—",
    p2_bold1: "कर्म के गणित",
    p2_middle: " से लेकर ",
    p2_bold2: "ब्रह्मांड के भूगोल (तीन लोक)",
    p2_end: " तक।",

    p3: "मैं वेब के लिए Next.js, स्क्रिप्टिंग के लिए AI और स्थिर पाठ को गहरे अनुभवों में बदलने के लिए सिनेमाई उपकरणों का उपयोग करता हूं। लक्ष्य आगमों (शास्त्रों) को एक फिल्म की तरह आकर्षक बनाना है, बिना उनकी पवित्रता खोए।",

    roadmapTitle: "भविष्य की योजना",
    roadmapText: "भगवान आदिनाथ के साथ शुरू करते हुए, यह डिजिटल संग्रह ब्रह्मांड के इंटरैक्टिव 3D मानचित्र, आत्म-सिद्धांत के दृश्य विश्लेषण और सभी 24 तीर्थंकरों की जीवन कहानियों को शामिल करने के लिए बढ़ेगा।",

    thanks: "इस यात्रा का हिस्सा बनने के लिए धन्यवाद।",
    creator: "निर्माता और डेवलपर"
  },
  kn: {
    back: "ಮನೆಗೆ ಹಿಂತಿರುಗಿ",
    preTitle: "ನಮ್ಮ ಧ್ಯೇಯ",
    title1: "ಧರ್ಮ ಮತ್ತು ತಂತ್ರಜ್ಞಾನದ",
    title2: "ಬೆಸುಗೆ.",
    quote: "ನಮ್ಮ ಪ್ರಾಚೀನ ಗ್ರಂಥಗಳು ಶಾಶ್ವತ ಜ್ಞಾನವನ್ನು ಹೊಂದಿವೆ, ಆದರೆ ಸಂಕೀರ್ಣ ತತ್ವಶಾಸ್ತ್ರ ಮತ್ತು ಭಾಷೆಯ ಅಡೆತಡೆಗಳು ಸಾಮಾನ್ಯವಾಗಿ ಯುವ ಪೀಳಿಗೆಯನ್ನು ದೂರವಿಡುತ್ತವೆ. ನಾನು ಸೇತುವೆಯನ್ನು ನಿರ್ಮಿಸಲು ಬಯಸಿದ್ದೆ.",
    
    p1_start: "",
    p1_bold: "ಆಗಮ ಕೀ ವಾಣಿ (AagamKiVaani)",
    p1_end: " ಒಂದು ದೊಡ್ಡ ದೃಷ್ಟಿಕೋನವನ್ನು ಹೊಂದಿರುವ ಏಕವ್ಯಕ್ತಿ ಯೋಜನೆಯಾಗಿದೆ: ಆಧುನಿಕ ತಂತ್ರಜ್ಞಾನದ ಮೂಲಕ ತೀರ್ಥಂಕರರ ಪರಂಪರೆಯನ್ನು ಮುಂದುವರಿಸುವುದು.",

    p2_start: "ಈ ವೆಬ್‌ಸೈಟ್ ಕೇವಲ 24 ತೀರ್ಥಂಕರರ ಜೀವನಚರಿತ್ರೆಯಲ್ಲ. ಇದು ಜೈನ ಧರ್ಮದ ಆಳವಾದ ವಿಷಯಗಳನ್ನು ವಿವರಿಸುವ ದೃಶ್ಯ ಪ್ರಯತ್ನವಾಗಿದೆ—",
    p2_bold1: "ಕರ್ಮ ಸಿದ್ಧಾಂತದ ಗಣಿತ",
    p2_middle: " ದಿಂದ ",
    p2_bold2: "ವಿಶ್ವದ ಭೂಗೋಳ (ಮೂರು ಲೋಕ)",
    p2_end: " ದವರೆಗೆ.",

    p3: "ನಾನು ವೆಬ್‌ಗಾಗಿ Next.js, ಸ್ಕ್ರಿಪ್ಟಿಂಗ್‌ಗಾಗಿ AI ಮತ್ತು ಸ್ಥಿರ ಪಠ್ಯವನ್ನು ಆಳವಾದ ಅನುಭವಗಳಾಗಿ ಪರಿವರ್ತಿಸಲು ಸಿನಿಮೀಯ ಪರಿಕರಗಳನ್ನು ಬಳಸುತ್ತೇನೆ. ಆಗಮಗಳನ್ನು (ಶಾಸ್ತ್ರಗಳನ್ನು) ಚಲನಚಿತ್ರದಂತೆ ಆಕರ್ಷಕವಾಗಿ ಮಾಡುವುದು ಗುರಿಯಾಗಿದೆ, ಆದರೆ ಅವುಗಳ ಪಾವಿತ್ರ್ಯತೆಯನ್ನು ಕಳೆದುಕೊಳ್ಳದಂತೆ.",

    roadmapTitle: "ಮುಂದಿನ ಹಾದಿ",
    roadmapText: "ಭಗವಾನ್ ಆದಿನಾಥರೊಂದಿಗೆ ಪ್ರಾರಂಭಿಸಿ, ಈ ಡಿಜಿಟಲ್ ಆರ್ಕೈವ್ ಬ್ರಹ್ಮಾಂಡದ ಸಂವಾದಾತ್ಮಕ 3D ನಕ್ಷೆಗಳು, ಆತ್ಮ ಸಿದ್ಧಾಂತದ ದೃಶ್ಯ ವಿಭಜನೆಗಳು ಮತ್ತು ಎಲ್ಲಾ 24 ತೀರ್ಥಂಕರರ ಜೀವನ ಕಥೆಗಳನ್ನು ಒಳಗೊಂಡಿರುತ್ತದೆ.",

    thanks: "ಈ ಪ್ರಯಾಣದ ಭಾಗವಾಗಿದ್ದಕ್ಕಾಗಿ ಧನ್ಯವಾದಗಳು.",
    creator: "ಸೃಷ್ಟಿಕರ್ತ ಮತ್ತು ಡೆವಲಪರ್"
  }
};

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = translations[lang as keyof typeof translations] || translations.en;
  const isIndic = lang === 'hi' || lang === 'kn';

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-white dark:bg-black text-gray-900 dark:text-gray-100 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      {/* --- BACK BUTTON (Updated to match Contact Page) --- */}
      {/* Moved OUTSIDE the max-w-3xl container so it positions absolute relative to the screen on desktop */}
      <div className="w-full max-w-3xl mx-auto flex justify-start mb-8 md:mb-0 md:absolute md:top-24 md:left-20 z-20">
         <Link 
            href={`/${lang}`} 
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity hover:text-orange-500"
        >
            <ArrowLeft size={16} /> {t.back}
        </Link>
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        
        {/* Header */}
        <span className="text-orange-500 font-bold tracking-[0.3em] text-xs uppercase mb-4 block">
          {t.preTitle}
        </span>
        <h1 className={`text-5xl md:text-7xl font-black uppercase tracking-tight mb-12 text-gray-900 dark:text-white ${isIndic ? 'leading-tight' : 'leading-none'}`}>
          {t.title1} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500 leading-normal pb-2 inline-block">
             {t.title2}
          </span>
        </h1>

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert prose-orange opacity-90">
          
          {/* Quote */}
          <p className={`text-xl md:text-2xl font-serif text-gray-600 dark:text-gray-300 mb-8 border-l-4 border-orange-500 pl-6 italic ${isIndic ? 'leading-loose' : 'leading-relaxed'}`}>
            "{t.quote}"
          </p>

          {/* Paragraph 1 */}
          <p className={`${isIndic ? 'leading-loose' : 'leading-relaxed'}`}>
            {t.p1_start}<strong>{t.p1_bold}</strong>{t.p1_end}
          </p>

          {/* Paragraph 2 */}
          <p className={`${isIndic ? 'leading-loose' : 'leading-relaxed'}`}>
            {t.p2_start}<strong>{t.p2_bold1}</strong>{t.p2_middle}<strong>{t.p2_bold2}</strong>{t.p2_end}
          </p>
          
          {/* Paragraph 3 */}
          <p className={`${isIndic ? 'leading-loose' : 'leading-relaxed'}`}>
            {t.p3}
          </p>

          <h3 className="uppercase tracking-widest font-bold text-sm mt-12 mb-4 text-orange-500">
            {t.roadmapTitle}
          </h3>
          <p className={`${isIndic ? 'leading-loose' : 'leading-relaxed'}`}>
            {t.roadmapText}
          </p>
          
          <p className={`${isIndic ? 'leading-loose' : 'leading-relaxed'}`}>
            {t.thanks}
          </p>

          {/* Signature */}
          <div className="mt-12 pt-12 border-t border-gray-200 dark:border-white/10 flex items-center gap-4">
             <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-900 border border-white/10 rounded-full flex items-center justify-center font-bold text-xl text-orange-500">
                A
             </div>
             <div>
                <div className="font-bold text-lg">AagamKiVaani</div>
                <div className="text-sm opacity-60">{t.creator}</div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}