"use client";

import React, { useState, useEffect, useRef } from "react";
import { tirthankaras } from "@/lib/tirthankara-data";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Volume2, VolumeX, Sparkles, Compass } from "lucide-react";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";

// --- SOUND CONTROLLER ---
const playTapSound = (soundEnabled: boolean) => {
  if (!soundEnabled) return;
  try {
    const a = new Audio("/sounds/resources/click2.mp3");
    a.volume = 0.65;
    a.play().catch(() => {});
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(12);
    }
  } catch (e) {}
};

// --- 3D TILT CARD COMPONENT ---
function TirthankaraTiltCard({
  t,
  index,
  lang,
  isIndic,
  soundEnabled,
}: {
  t: any;
  index: number;
  lang: string;
  isIndic: boolean;
  soundEnabled: boolean;
}) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const l = lang === "hi" || lang === "kn" ? lang : "en";

  // Motion values for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Refined Framer Motion spring physics (stiffness: 300, damping: 25)
  const springConfig = { stiffness: 300, damping: 25 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), springConfig);
  
  // Specular sheen tracking
  const sheenX = useSpring(useTransform(x, [-0.5, 0.5], [0, 100]), springConfig);
  const sheenY = useSpring(useTransform(y, [-0.5, 0.5], [0, 100]), springConfig);
  const sheenOpacity = useSpring(useTransform(x, [-0.5, 0.5], [0.4, 0]), springConfig);

  // Scale compression on click
  const scale = useSpring(1, { stiffness: 300, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    scale.set(1);
  };

  const handleMouseDown = () => {
    scale.set(0.96);
  };

  const handleMouseUp = () => {
    scale.set(1.02);
    playTapSound(soundEnabled);
  };

  return (
    <Link href={`/${lang}/tirthankars/${t.id}`} passHref legacyBehavior>
      <motion.a
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: "preserve-3d",
          perspective: 1000,
        }}
        className="group relative h-[420px] md:h-[520px] rounded-[2.5rem] bg-gradient-to-b from-gray-50 to-gray-100 dark:from-zinc-900/80 dark:to-zinc-950/90 overflow-hidden transition-all border border-gray-200/80 dark:border-zinc-800/80 hover:border-rose-500/50 dark:hover:border-rose-500/50 shadow-lg hover:shadow-2xl hover:shadow-rose-500/10 dark:hover:shadow-rose-950/30 flex flex-col justify-between p-8 cursor-pointer touch-manipulation min-h-[44px]"
      >
        {/* Specular Glare Sheen Overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-30 bg-gradient-to-tr from-transparent via-white/20 to-transparent dark:via-white/10"
          style={{
            backgroundPosition: useTransform(
              [sheenX, sheenY],
              ([sx, sy]) => `${sx}% ${sy}%`
            ),
            opacity: sheenOpacity,
          }}
        />

        {/* Dynamic Background Glow */}
        <div
          className="absolute inset-0 transition-opacity duration-700 opacity-5 dark:opacity-10 group-hover:opacity-20 pointer-events-none"
          style={{ backgroundColor: t.colorHex }}
        />

        {/* Top Row: ID & Symbol Icon */}
        <div className="flex justify-between items-start z-20" style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}>
          <span className="text-6xl font-black text-gray-200/80 dark:text-white/5 group-hover:text-rose-500/20 transition-colors duration-500">
            {t.id}
          </span>
          <div className="px-4 py-1.5 rounded-full bg-white/80 dark:bg-zinc-800/80 backdrop-blur-md border border-gray-200/50 dark:border-zinc-700/50 shadow-sm min-h-[32px] flex items-center">
            <span className="text-rose-600 dark:text-rose-400 text-[10px] font-bold tracking-widest uppercase">
              {t.symbol[l]}
            </span>
          </div>
        </div>

        {/* Middle Row: Sacred Iconography Image */}
        <div 
          className="relative w-full h-[55%] flex items-center justify-center transition-all duration-500 group-hover:-translate-y-4"
          style={{ transform: "translateZ(60px)", transformStyle: "preserve-3d" }}
        >
          <Image
            src={t.tirthankaraImage}
            alt={t.name[l]}
            fill
            priority={index < 4}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_20px_35px_rgba(255,255,255,0.05)] p-4 transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Bottom Row: Name & Visual Cue */}
        <div 
          className="w-full flex flex-col items-start z-20"
          style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }}
        >
          <h2 className={`text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors duration-300 ${isIndic ? "leading-normal" : ""}`}>
            {t.name[l]}
          </h2>
          <div className="h-1 w-12 bg-gray-300 dark:bg-zinc-700 group-hover:bg-rose-500 dark:group-hover:bg-rose-500 rounded-full mt-3 transition-all duration-500 group-hover:w-20" />
        </div>
      </motion.a>
    </Link>
  );
}

// --- MAIN CLIENT COMPONENT ---
export default function TirthankarGallery({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = React.use(params);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedSound = localStorage.getItem("sound_enabled");
    if (savedSound !== null) {
      setSoundEnabled(savedSound === "true");
    }
  }, []);

  const toggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    localStorage.setItem("sound_enabled", String(nextState));
    if (nextState) {
      try {
        const a = new Audio("/sounds/resources/click2.mp3");
        a.volume = 0.65;
        a.play().catch(() => {});
      } catch (e) {}
    }
  };

  const l = lang === "hi" || lang === "kn" ? lang : "en";
  const isIndic = lang === "hi" || lang === "kn";

  const translations = {
    en: {
      library: "Library",
      lineage: "THE LINEAGE",
      title: "24 Tirthankaras",
      soundOn: "Sound On",
      soundOff: "Sound Off",
      scriptureTitle: "Digambar Canonical Epigraphy",
      scriptureSub: "Authorized verses on the nature of the Arihant & Tirthankara",
      philosophicalNote: "In accordance with the Digambar Jain tradition, all twenty-four Tirthankaras (including Bhagwan Mallinath) are strictly male monarchs who renounced all possessions, clothes, and internal attachments to attain absolute Kevala Jnana (Omniscience) and Moksha. They remain eternally unclad, unadorned, and absorbed in deep introspection (Nasagra Drishti), completely free from hunger (Kavalahara), thirst, sleep, and physical fatigue.",
    },
    hi: {
      library: "लाइब्रेरी",
      lineage: "पवित्र वंश",
      title: "24 तीर्थंकर",
      soundOn: "ध्वनि चालू",
      soundOff: "ध्वनि बंद",
      scriptureTitle: "दिगंबर आगम प्रमाण",
      scriptureSub: "अरिहंत और तीर्थंकर देव के वीतराग स्वरूप का निरूपण",
      philosophicalNote: "दिगंबर जैन आगम परंपरा के अनुसार, भगवान मल्लिनाथ सहित सभी २४ तीर्थंकर परम दिगंबर दीक्षा धारण कर, पूर्ण वीतराग भाव से केवलज्ञान और मोक्ष प्राप्त करने वाले पुरुष तीर्थंकर हैं। वे पूर्णतः दिगंबर (अपरिग्रह), नासाग्र-दृष्टि युक्त, और क्षुधा (कवलाहार), तृषा, निद्रा आदि अठारह दोषों से सर्वथा रहित होते हैं।",
    },
    kn: {
      library: "ಲೈಬ್ರರಿ",
      lineage: "ಪವಿತ್ರ ವಂಶ",
      title: "24 ತೀರ್ಥಂಕರರು",
      soundOn: "ಧ್ವನಿ ಆನ್",
      soundOff: "ಧ್ವನಿ ಆಫ್",
      scriptureTitle: "ದಿಗಂಬರ ಆಗಮ ಪ್ರಮಾಣ",
      scriptureSub: "ಅರಿಹಂತ ಮತ್ತು ತೀರ್ಥಂಕರ ದೇವರ ವೀತರಾಗ ಸ್ವರೂಪ",
      philosophicalNote: "ದಿಗಂಬರ ಜೈನ ಸಂಪ್ರದಾಯದ ಪ್ರಕಾರ, ಭಗವಾನ್ ಮಲ್ಲಿನಾಥ ಸೇರಿದಂತೆ ಎಲ್ಲಾ ೨೪ ತೀರ್ಥಂಕರರು ಸಂಪೂರ್ಣ ದಿಗಂಬರ ದೀಕ್ಷೆಯನ್ನು ಧರಿಸಿ, ಕೇವಲಜ್ಞಾನ ಮತ್ತು ಮೋಕ್ಷವನ್ನು ಪಡೆದ ಪುರುಷ ತೀರ್ಥಂಕರರಾಗಿದ್ದಾರೆ. ಅವರು ಹಸಿವು (ಕವಲಾಹಾರ), ಬಾಯಾರಿಕೆ, ನಿದ್ರೆ ಮುಂತಾದ ದೋಷಗಳಿಂದ ಮುಕ್ತರಾಗಿದ್ದಾರೆ.",
    },
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white selection:bg-rose-500 selection:text-white p-6 md:p-12 transition-colors duration-500 relative overflow-hidden">
      
      {/* Celestial Particle Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40 dark:opacity-60">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-rose-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-amber-500/10 blur-[120px]" />
      </div>

      {/* 1. FIXED NAVIGATION */}
      <Link
        href={`/${lang}`}
        onClick={() => playTapSound(soundEnabled)}
        className="fixed top-20 left-4 md:top-24 md:left-8 z-50 flex items-center gap-2 text-gray-500 hover:text-rose-500 transition-all bg-white/80 dark:bg-black/50 px-4 py-2 rounded-full backdrop-blur-md border border-gray-200 dark:border-white/10 shadow-sm hover:scale-105 active:scale-95 min-h-[44px]"
      >
        <ArrowLeft size={16} />
        <span className={`text-[10px] font-bold uppercase tracking-widest ${isIndic ? "text-xs" : ""}`}>
          {t.library}
        </span>
      </Link>

      {/* 2. FLOATING CONTROLS (Strictly positioned at bottom-6 right-6 z-50 to avoid Navbar collision) */}
      {mounted && (
        <button
          onClick={toggleSound}
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center p-4 rounded-full bg-white/90 dark:bg-zinc-900/90 text-gray-800 dark:text-white shadow-xl border border-gray-200 dark:border-zinc-800 hover:border-rose-500/50 dark:hover:border-rose-500/50 transition-all hover:scale-110 active:scale-90 backdrop-blur-md group min-w-[44px] min-h-[44px]"
          aria-label="Toggle Sound"
        >
          {soundEnabled ? (
            <Volume2 className="w-5 h-5 text-rose-500 animate-pulse" />
          ) : (
            <VolumeX className="w-5 h-5 text-gray-400" />
          )}
          <span className="absolute right-14 bg-zinc-900 text-white text-xs px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none border border-zinc-800">
            {soundEnabled ? t.soundOn : t.soundOff}
          </span>
        </button>
      )}

      <div className="max-w-[1800px] mx-auto pt-24 md:pt-20 relative z-10">
        
        {/* Hero Section */}
        <div className="mb-12 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-2 mb-4"
          >
            <Compass className="w-5 h-5 text-rose-500 animate-spin-slow" />
            <h2 className="text-rose-600 dark:text-rose-500 font-bold tracking-[0.5em] text-xs md:text-base uppercase">
              {t.lineage}
            </h2>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className={`text-[10vw] md:text-9xl font-black uppercase tracking-tighter text-gray-900 dark:text-white/90 ${
              isIndic ? "leading-tight" : "leading-none"
            }`}
          >
            {t.title}
          </motion.h1>

          {/* Canonical Digambar Philosophical Context */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 max-w-4xl text-sm md:text-base text-gray-600 dark:text-zinc-400 leading-relaxed border-l-2 border-rose-500/30 pl-4"
          >
            {t.philosophicalNote}
          </motion.p>
        </div>

        {/* 3D Interactive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 pb-20">
          {tirthankaras.map((t, index) => (
            <TirthankaraTiltCard
              key={t.id}
              t={t}
              index={index}
              lang={lang}
              isIndic={isIndic}
              soundEnabled={soundEnabled}
            />
          ))}
        </div>

        {/* 3. AUTHORITATIVE DIGAMBAR SCRIPTURAL CITATIONS PANEL */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-12 mb-20 p-8 md:p-12 rounded-[2.5rem] bg-gradient-to-br from-amber-500/[0.03] to-rose-500/[0.03] dark:from-amber-500/[0.02] dark:to-rose-500/[0.02] border border-amber-500/20 dark:border-amber-500/10 backdrop-blur-xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <Sparkles className="w-24 h-24 text-amber-500" />
          </div>

          <div className="max-w-4xl">
            <span className="text-xs font-bold tracking-[0.3em] text-amber-600 dark:text-amber-500 uppercase block mb-2">
              {t.scriptureTitle}
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              {t.scriptureSub}
            </h3>

            {/* Verse 1: Ratnakaranda Shravakachara */}
            <div className="mb-8 border-l-2 border-amber-500/40 pl-6">
              <p className="text-lg md:text-xl font-serif text-amber-800 dark:text-amber-400 italic mb-3">
                "आप्तेनोच्छिन्नदोषेण सर्वज्ञेनागमेशिना।<br />
                भवितव्यं नियोगेन नान्यथा ह्याप्तता भवेत्॥"
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 leading-relaxed">
                <strong>Translation:</strong> The true deity (Apta / Tirthankara) must be absolutely free from all eighteen defects (including hunger, thirst, fear, and attachment), must possess infinite omniscience (Kevala Jnana), and must reveal the pure path of liberation. No other state can define true divinity.
              </p>
              <span className="text-xs font-semibold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
                — Acharya Samantabhadra, Ratnakaranda Shrāvakāchāra, Shloka 4
              </span>
            </div>

            {/* Verse 2: Tattvartha Sutra */}
            <div className="mb-8 border-l-2 border-rose-500/40 pl-6">
              <p className="text-lg md:text-xl font-serif text-rose-800 dark:text-rose-400 italic mb-3">
                "सम्यग्दर्शनज्ञानचारित्राणि मोक्षमार्गः॥"
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 leading-relaxed">
                <strong>Translation:</strong> Right Faith (Samyak-Darshana), Right Knowledge (Samyak-Jnana), and Right Conduct (Samyak-Charitra) together constitute the true path to liberation (Moksha).
              </p>
              <span className="text-xs font-semibold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
                — Acharya Umāsvāmi, Tattvārtha Sūtra, Chapter 1, Sutra 1
              </span>
            </div>

            {/* Verse 3: Pravachanasara (On Kevali's Freedom from Kavalahara) */}
            <div className="border-l-2 border-amber-500/40 pl-6">
              <p className="text-lg md:text-xl font-serif text-amber-800 dark:text-amber-400 italic mb-3">
                "ण हि कवलविहारो अत्थि अणंतचदुक्कस्स..."
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 leading-relaxed">
                <strong>Translation:</strong> There is absolutely no physical intake of food (Kavalahara) for the Omniscient Lord (Arihant Kevali), who is established in the infinite quaternary (Ananta Chatushtaya: Infinite Knowledge, Perception, Bliss, and Power).
              </p>
              <span className="text-xs font-semibold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
                — Acharya Kundakunda, Pravachanasāra, Gatha 22
              </span>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}