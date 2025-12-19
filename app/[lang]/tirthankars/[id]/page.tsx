import { tirthankaras } from "@/lib/tirthankara-data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Star, Sparkles, MapPin, ArrowRight } from "lucide-react";

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

  const stats = [
    { label: { en: "Father", hi: "पिता", kn: "ತಂದೆ" }, value: t.father[l] },
    { label: { en: "Mother", hi: "माता", kn: "ತಾಯಿ" }, value: t.mother[l] },
    { label: { en: "Dynasty", hi: "वंश", kn: "ವಂಶ" }, value: `${t.dynasty[l]} (${t.caste[l]})` },
    { label: { en: "Kevala Tree", hi: "केवल वृक्ष", kn: "ಕೇವಲ ವೃಕ್ಷ" }, value: t.kevalaVriksha[l] },
    { label: { en: "Birthplace", hi: "जन्मस्थान", kn: "ಜನ್ಮಸ್ಥಳ" }, value: t.birthPlace[l] },
    { label: { en: "Lifespan", hi: "आयु", kn: "ಆಯಸ್ಸು" }, value: t.lifespan[l] },
    { label: { en: "Height", hi: "ऊंचाई", kn: "ಎತ್ತರ" }, value: t.height[l] },
    { label: { en: "Nirvana", hi: "निर्वाण क्षेत्र", kn: "ನಿರ್ವಾಣ ಕ್ಷೇತ್ರ" }, value: t.placeOfNirvana[l] },
  ];

  const kalyanaks = [
    { title: { en: "Garbha", hi: "गर्भ", kn: "ಗರ್ಭ" }, desc: { en: "The divine descent from heaven into the mother's womb.", hi: "प्राणत स्वर्ग से माता के गर्भ में मंगल अवतरण।", kn: "ಸ್ವರ್ಗದಿಂದ ತಾಯಿಯ ಗರ್ಭಕ್ಕೆ ಆಗಮನ." } },
    { title: { en: "Janma", hi: "जन्म", kn: "ಜನ್ಮ" }, desc: { en: "The auspicious birth celebrated by the 100 Indras.", hi: "मेरु पर्वत पर १०० इन्द्रों द्वारा मनाया गया जन्माभिषेक।", kn: "ಇಂದ್ರನಿಂದ ಆಚರಿಸಲ್ಪಟ್ಟ ಜನ್ಮ ಮಹೋತ್ಸವ." } },
    { title: { en: "Diksha", hi: "दीक्षा", kn: "ದೀಕ್ಷೆ" }, desc: { en: "Renouncing worldly pleasures to seek the eternal truth.", hi: "लौकांतिक देवों की स्तुति के साथ वैराग्य और दीक्षा ग्रहण।", kn: "ಸಂಸಾರ ತ್ಯಜಿಸಿ ದೀಕ್ಷೆ ಸ್ವೀಕಾರ." } },
    { title: { en: "Kevala Jnana", hi: "केवल ज्ञान", kn: "ಕೇವಲ ಜ್ಞಾನ" }, desc: { en: "Destruction of Ghati Karmas and attainment of Omniscience.", hi: "चार घातिया कर्मों का क्षय और अनंत ज्ञान का प्रकाश।", kn: "ಅನಂತ ಜ್ಞಾನದ ಪ್ರಾಪ್ತಿ." } },
    { title: { en: "Moksha", hi: "मोक्ष", kn: "ಮೋಕ್ಷ" }, desc: { en: "Final liberation and the soul's ascent to Siddhashila.", hi: "अघाती कर्मों का नाश और निर्वाण की प्राप्ति।", kn: "ಸಂಸಾರ ಚಕ್ರದಿಂದ ಮುಕ್ತಿ." } },
  ];

  return (
    // CHANGE: Removed bg-black and text-white to support mode switching
    <div className="bg-white dark:bg-black text-gray-900 dark:text-white min-h-screen selection:bg-orange-500 selection:text-white">
      
      {/* 1. HERO SECTION */}
      <div className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-20 overflow-hidden">
        
        {/* Navigation - Changed from 'absolute' to 'fixed' */}
        {/* Navigation - Pushed down to clear Global Navbar */}
        <Link 
            href={`/${lang}/tirthankars`} 
            className="fixed top-24 left-6 md:left-12 z-[100] flex items-center gap-2 text-gray-500 hover:text-orange-500 transition-all bg-white/90 dark:bg-black/60 px-5 py-2.5 rounded-full backdrop-blur-2xl border border-gray-200 dark:border-white/10 shadow-xl shadow-black/5 group"
            >
            <ArrowLeft className="group-hover:-translate-x-1 transition-transform" size={18} /> 
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Back to Gallery</span>
        </Link>
        
        {/* Breathing Aura Background */}
        <div 
          className="absolute w-[400px] md:w-[700px] h-[400px] md:h-[700px] rounded-full opacity-20 dark:opacity-30 blur-[120px] -z-10 animate-pulse"
          style={{ backgroundColor: t.colorHex }}
        ></div>

        {/* Large Faded Watermark ID */}
        <span className="absolute top-20 text-[15rem] md:text-[25rem] font-black text-gray-100 dark:text-white/[0.03] select-none -z-10">
          {t.id}
        </span>

        {/* 3D FLOATING TIRTHANKAR IMAGE (Using our new custom CSS class) */}
        <div className="relative mb-12">
            <img 
              src={t.tirthankaraImage} 
              alt={t.name[l]} 
              className="w-72 md:w-[500px] h-auto object-contain drop-shadow-2xl animate-subtle-float"
            />
        </div>

        <div className="text-center max-w-5xl z-10">
            <div className="text-orange-500 text-xs font-black tracking-[0.8em] mb-4 uppercase">
                The {getOrdinal(t.id)} Tirthankar
            </div>
            <h1 className="text-6xl md:text-9xl font-black mb-16 tracking-tighter uppercase leading-none">
                {t.name[l]}
            </h1>

            {/* SACRED STATS GRID (Colors adjust for Light/Dark mode) */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-left">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 p-5 rounded-[1.5rem] backdrop-blur-md hover:border-orange-500/50 transition-colors group">
                        <div className="text-[10px] uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-2 font-bold group-hover:text-orange-500 transition-colors">
                            {stat.label[l]}
                        </div>
                        <div className="text-sm md:text-base font-bold text-gray-800 dark:text-gray-100 italic">
                            {stat.value}
                        </div>
                    </div>
                ))}
            </div>
        </div>
        
        <div className="mt-20 flex flex-col items-center gap-4 opacity-40">
           <span className="text-[10px] tracking-[0.3em] uppercase text-gray-400 dark:text-gray-500 font-bold">Scroll the Life</span>
           <div className="w-px h-16 bg-gradient-to-b from-orange-500 to-transparent"></div>
        </div>
      </div>

      {/* 2. THE 5 KALYANAK TIMELINE */}
      <div className="relative z-10 bg-gray-50/50 dark:bg-black/80 backdrop-blur-xl border-t border-gray-100 dark:border-white/5">
        {kalyanaks.map((k, index) => (
          <div key={index} className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
            <div className="absolute left-10 text-[12vw] font-black text-gray-200/20 dark:text-white/[0.02] whitespace-nowrap select-none">
              {k.title[l]}
            </div>

            <div className="max-w-4xl relative z-20">
              <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
                <div className="h-16 w-16 rounded-2xl bg-orange-600 flex items-center justify-center text-white text-2xl font-black rotate-3 shadow-xl shadow-orange-600/20">
                  0{index + 1}
                </div>
                <h2 className="text-5xl md:text-8xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {k.title[l]} <span className="text-orange-600">Kalyanak</span>
                </h2>
              </div>
              <p className="text-2xl md:text-4xl text-gray-600 dark:text-gray-300 leading-relaxed font-light font-serif">
                {k.desc[l]}
              </p>
            </div>
          </div>
        ))}

        {/* 3. FINAL NIRVANA / FOOTER */}
        <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center border-t border-gray-100 dark:border-white/5">
           <div className="relative mb-10">
              <div 
                className="absolute inset-0 blur-[100px] opacity-20 dark:opacity-30"
                style={{ backgroundColor: t.colorHex }}
              ></div>
              <Star className="relative mx-auto text-orange-500 w-24 h-24" fill="currentColor" />
           </div>
           
           <h2 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter uppercase text-gray-900 dark:text-white">Nirvana Sthal</h2>
           <p className="text-3xl md:text-5xl font-serif italic text-orange-600 dark:text-orange-400 mb-20">{t.placeOfNirvana[l]}</p>
           
           <Link 
              href={`/${lang}/tirthankars`} 
              className="group flex items-center gap-4 px-12 py-5 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full font-bold text-lg hover:scale-105 transition-all active:scale-95"
           >
              BACK TO GALLERY
              <ArrowRight className="rotate-180 group-hover:translate-x-2 transition-transform" />
           </Link>
        </div>
      </div>
    </div>
  );
}