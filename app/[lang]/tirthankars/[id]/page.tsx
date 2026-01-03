import { tirthankaras } from "@/lib/tirthankara-data";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image"; 
import { ArrowLeft, Star } from "lucide-react";
import KalyanakTimeline from "./KalyanakTimeline"; // <--- IMPORT THE NEW COMPONENT

import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ tirthankarId: string; lang: string }> }): Promise<Metadata> {
  // 1. AWAIT the params (Crucial Fix for Next.js 15+)
  const resolvedParams = await params;
  
  const id = Number(resolvedParams.tirthankarId);
  const lang = resolvedParams.lang === "hi" || resolvedParams.lang === "kn" ? resolvedParams.lang : "en";

  // 2. Find the Tirthankar
  const tirthankar = tirthankaras.find((t) => t.id === id);

  // 3. Fallback if not found
  if (!tirthankar) {
    return {
      title: "Tirthankar Not Found",
      description: "The requested Tirthankar page could not be found.",
    };
  }

  // 4. Create Dynamic Text
  const name = tirthankar.name[lang];
  const symbol = tirthankar.symbol[lang];
  
  let title = "";
  let description = "";

  if (lang === "hi") {
    title = `भगवान ${name} - जैन तीर्थंकर | आगम की वाणी`;
    description = `भगवान ${name} (चिन्ह: ${symbol}) के जीवन, पंच कल्याणक और शिक्षाओं के बारे में जानें। निर्वाण स्थल: ${tirthankar.placeOfNirvana.hi}।`;
  } else if (lang === "kn") {
    title = `ಭಗವಾನ್ ${name} - ಜೈನ ತೀರ್ಥಂಕರ | ಆಗಮ ಕೀ ವಾಣಿ`;
    description = `ಭಗವಾನ್ ${name} (ಲಾಂಛನ: ${symbol}) ಅವರ ಜೀವನ, ಪಂಚ ಕಲ್ಯಾಣಕಗಳು ಮತ್ತು ಬೋಧನೆಗಳನ್ನು ಅನ್ವೇಷಿಸಿ. ನಿರ್ವಾಣ ಸ್ಥಳ: ${tirthankar.placeOfNirvana.kn}।`;
  } else {
    title = `Bhagwan ${name} - Jain Tirthankar | AagamKiVaani`;
    description = `Explore the life, kalyanaks, and teachings of Bhagwan ${name} (Symbol: ${symbol}). Nirvana Place: ${tirthankar.placeOfNirvana.en}.`;
  }

  // 5. Return Metadata
  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      images: [tirthankar.tirthankaraImage], 
      type: "article",
    },
  };
}

export default async function TirthankaraDetail({ params }: { params: Promise<{ lang: string, id: string }> }) {
  const { lang, id } = await params;
  const t = tirthankaras.find(item => item.id === parseInt(id));

  if (!t) return notFound();
  const l = (lang === "hi" || lang === "kn") ? lang : "en";

  const getOrdinal = (n: number) => {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  // ... (Keep your getAuraColor and stats logic exactly as it was) ...
  const getAuraColor = (id: number) => {
    if ([6, 12].includes(id)) return "#ef4444"; 
    if ([7, 23].includes(id)) return "#22c55e"; 
    if ([8, 9].includes(id)) return "#ffffff";  
    if ([20, 22].includes(id)) return "#3b82f6"; 
    return "#eab308"; 
  };
  const auraColorHex = getAuraColor(t.id);

  const stats = [
    { label: { en: "Father", hi: "पिता", kn: "ತಂದೆ" }, value: t.father[l] },
    { label: { en: "Mother", hi: "माता", kn: "तಾಯಿ" }, value: t.mother[l] },
    { label: { en: "Dynasty", hi: "वंश", kn: "ವಂಶ" }, value: `${t.dynasty[l]} (${t.caste[l]})` },
    { label: { en: "Gotra", hi: "गोत्र", kn: "ಗೋತ್ರ" }, value: t.gotra[l] },
    { label: { en: "Symbol", hi: "चिह्न", kn: "ಲಾಂಛನ" }, value: t.symbol[l] },
    { label: { en: "Kevala Tree", hi: "केवल वृक्ष", kn: "ಕೇವಲ ವೃಕ್ಷ" }, value: t.kevalaVriksha[l] },
    { label: { en: "Birthplace", hi: "जन्मस्थान", kn: "ಜನ್ಮಸ್ಥಳ" }, value: t.birthPlace[l] },
    { label: { en: "Lifespan", hi: "आयु", kn: "ಆಯಸ್ಸು" }, value: t.lifespan[l] },
    { label: { en: "Height", hi: "ऊंचाई", kn: "ಎತ್ತರ" }, value: t.height[l] },
    { label: { en: "Nirvana", hi: "निर्वाण क्षेत्र", kn: "ನಿರ್ವಾಣ ಕ್ಷೇತ್ರ" }, value: t.placeOfNirvana[l] },
  ];

  const prevT = tirthankaras.find(item => item.id === t.id - 1);
  const nextT = tirthankaras.find(item => item.id === t.id + 1);

  // Keep Data here (Server Side)
  const kalyanaks = [
    { title: { en: "Garbha", hi: "गर्भ", kn: "ಗರ್ಭ" }, desc: { en: "The divine descent from heaven into the mother's womb.", hi: "प्राणत स्वर्ग से माता के गर्भ में मंगल अवतरण।", kn: "ಸ್ವರ್ಗದಿಂದ ತಾಯಿಯ ಗರ್ಭಕ್ಕೆ ಆಗಮನ." } },
    { title: { en: "Janma", hi: "जन्म", kn: "ಜನ್ಮ" }, desc: { en: "The auspicious birth celebrated by the 100 Indras on Mount Meru.", hi: "मेरु पर्वत पर १०० इन्द्रों द्वारा मनाया गया जन्माभिषेक।", kn: "ಇಂದ್ರನಿಂದ ಆಚರಿಸಲ್ಪಟ್ಟ ಜನ್ಮ ಮಹೋತ್ಸವ." } },
    { title: { en: "Diksha", hi: "दीक्षा", kn: "ದೀಕ್ಷೆ" }, desc: { en: "Renouncing worldly pleasures to seek the eternal truth.", hi: "लौकांतिक देवों की स्तुति के साथ वैराग्य और दीक्षा ग्रहण।", kn: "ಸಂಸಾರ ತ್ಯಜಿಸಿ ದೀಕ್ಷೆ ಸ್ವೀಕಾರ." } },
    { title: { en: "Kevala Jnana", hi: "केवल ज्ञान", kn: "ಕೇವಲ ಜ್ಞಾನ" }, desc: { en: "Destruction of Ghati Karmas and attainment of Omniscience.", hi: "चार घातिया कर्मों का क्षय और अनंत ज्ञान का प्रकाश।", kn: "ಅನಂತ ಜ್ಞಾನದ ಪ್ರಾಪ್ತಿ." } },
    { title: { en: "Moksha", hi: "मोक्ष", kn: "ಮೋಕ್ಷ" }, desc: { en: "Final liberation and the soul's ascent to Siddhashila.", hi: "अघाती कर्मों का नाश और निर्वाण की प्राप्ति।", kn: "ಸಂಸಾರ ಚಕ್ರದಿಂದ ಮುಕ್ತಿ." } },
  ];

  return (
    <div className="bg-white dark:bg-black text-gray-900 dark:text-white min-h-screen selection:bg-rose-500 selection:text-white transition-colors duration-500">
      
      {/* 1. FIXED NAVIGATION (Unchanged) */}
      <Link 
        href={`/${lang}/tirthankars`} 
        className="fixed top-20 left-4 md:top-24 md:left-8 z-40 flex items-center gap-2 text-gray-500 hover:text-rose-500 transition-all bg-white/80 dark:bg-black/40 px-4 py-2 rounded-full backdrop-blur-md border border-gray-200 dark:border-white/10 shadow-sm"
      >
        <ArrowLeft className="group-hover:-translate-x-1 transition-transform" size={16} /> 
        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Gallery</span>
      </Link>

      {/* 2. HERO SECTION (Unchanged - Keeps existing visuals) */}
      <div className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-6 pt-24 md:pt-32 pb-20 overflow-hidden">
        
        {/* Atmosphere Background */}
        <div 
          className="absolute w-[300px] md:w-[800px] h-[300px] md:h-[800px] rounded-full opacity-20 dark:opacity-30 blur-[100px] md:blur-[150px] -z-20 animate-pulse"
          style={{ backgroundColor: t.colorHex }}
        ></div>

        {/* --- ARHAT & AURA CONTAINER --- */}
        <div className="relative mb-8 md:mb-16 z-10 w-full flex justify-center h-[40vh] md:h-[50vh]">
            <div 
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full blur-[80px] md:blur-[100px] opacity-70 dark:opacity-60 animate-pulse -z-10"
               style={{ backgroundColor: auraColorHex }}
            ></div>
            <div className="relative w-full h-full">
                <Image 
                  src={t.tirthankaraImage} 
                  alt={t.name[l]} 
                  fill
                  className="object-contain drop-shadow-2xl animate-subtle-float"
                  priority 
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
            </div>
        </div>

        {/* Text Container & Stats (Unchanged) */}
        <div className="text-center w-full max-w-5xl z-20 px-2 flex flex-col items-center">
            <div className="mb-6 relative group cursor-pointer">
                <div className="absolute inset-0 bg-rose-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative w-24 h-24 md:w-32 md:h-32">
                    <Image src={t.symbol.imagePath} alt={t.symbol.en} fill className="object-contain opacity-100 group-hover:scale-110 transition-all duration-500 drop-shadow-lg" />
                </div>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-rose-500 bg-white/90 dark:bg-black/90 px-2 py-1 rounded-full border border-rose-500/20">{t.symbol[l]}</span>
                </div>
            </div>
            <div className="text-rose-500 text-[10px] md:text-xs font-black tracking-[0.5em] md:tracking-[0.8em] mb-2 md:mb-4 uppercase">The {getOrdinal(t.id)} Arhat</div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-10 tracking-tighter uppercase leading-none whitespace-nowrap w-full">{t.name[l]}</h1>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 text-left w-full">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white/40 dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 p-3 md:p-5 rounded-2xl md:rounded-[1.5rem] backdrop-blur-md hover:border-rose-500/50 transition-colors group">
                        <div className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-gray-500 dark:text-gray-500 mb-1 font-bold group-hover:text-rose-500 transition-colors">{stat.label[l]}</div>
                        <div className="text-xs md:text-base font-bold text-gray-800 dark:text-gray-100 italic break-words">{stat.value}</div>
                    </div>
                ))}
            </div>
        </div>
        
        <div className="mt-16 md:mt-24 flex flex-col items-center gap-4 opacity-100">
           <span className="text-[10px] tracking-[0.3em] uppercase text-gray-400 dark:text-gray-500 font-bold">Scroll the Life</span>
           <div className="w-px h-20 md:h-36 bg-gradient-to-b from-rose-500 to-transparent"></div>
        </div>
      </div>

      {/* 3. KALYANAK TIMELINE (REPLACED WITH NEW COMPONENT) */}
      <KalyanakTimeline kalyanakData={t.kalyanaks} lang={lang} />

      {/* 4. FOOTER NAVIGATION (Unchanged) */}
      <div className="min-h-[50vh] flex flex-col items-center justify-center px-6 text-center border-t border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-gradient-to-b dark:from-black dark:to-zinc-950 transition-colors duration-500 pb-32 pt-20">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl mb-20">
              {prevT && (
                <Link href={`/${lang}/tirthankars/${prevT.id}`} 
                  className="group p-8 rounded-[2.5rem] bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/5 hover:border-rose-500/30 transition-all text-left flex items-center gap-6 shadow-sm">
                  <div className="h-12 w-12 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center group-hover:bg-rose-500 group-hover:text-white transition-all text-gray-400">
                    <ArrowLeft size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500 mb-1 font-bold">Previous</div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-rose-500 transition-colors">{prevT.name[l]}</div>
                  </div>
                </Link>
              )}
              {nextT && (
                <Link href={`/${lang}/tirthankars/${nextT.id}`} 
                  className="group p-8 rounded-[2.5rem] bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/5 hover:border-rose-500/30 transition-all text-right flex items-center justify-end gap-6 shadow-sm">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500 mb-1 font-bold">Next</div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-rose-500 transition-colors">{nextT.name[l]}</div>
                  </div>
                  <div className="h-12 w-12 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center group-hover:bg-rose-500 group-hover:text-white transition-all text-gray-400">
                    <ArrowLeft size={20} className="rotate-180" />
                  </div>
                </Link>
              )}
           </div>
           
           <div className="relative mb-10">
              <div className="absolute inset-0 blur-[100px] opacity-20" style={{ backgroundColor: auraColorHex }}></div>
              <Star className="relative mx-auto text-rose-500 w-16 h-16" fill="currentColor" />
           </div>
           
           <Link href={`/${lang}/tirthankars`} className="group flex items-center gap-4 px-12 py-5 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full font-bold text-xs tracking-[0.2em] hover:scale-105 transition-all shadow-lg active:scale-95">
              EXPLORE ENTIRE GALLERY
           </Link>
        </div>
    </div>
  );
}