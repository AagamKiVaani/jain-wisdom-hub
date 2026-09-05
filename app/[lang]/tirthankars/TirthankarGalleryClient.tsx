"use client";

import React, { useState, useEffect, useRef } from "react";
import { tirthankaras } from "@/lib/tirthankara-data";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Volume2, VolumeX, BookOpen, ShieldCheck } from "lucide-react";
import { motion, useMotionValue, useTransform, useSpring, useMotionTemplate } from "framer-motion";

// ==========================================
// INDIVIDUAL 3D TILT CARD COMPONENT
// ==========================================
function TirthankarCard({
  t,
  index,
  lang,
  isIndic,
  soundEnabled
}: {
  t: typeof tirthankaras[number];
  index: number;
  lang: string;
  isIndic: boolean;
  soundEnabled: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Normalized motion values tracking cursor/touch position (0 to 1)
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  // High-performance Framer Motion spring physics (stiffness: 300, damping: 25)
  const springConfig = { stiffness: 300, damping: 25 };
  const rotateX = useSpring(useTransform(y, [0, 1], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(x, [0, 1], [-15, 15]), springConfig);
  const scale = useSpring(1, { stiffness: 400, damping: 18 });

  // Multi-plane Z-depth translations for parallax layers
  const translateZ_BgNum = useSpring(useTransform(y, [0, 1], [20, 40]), springConfig);
  const translateZ_Img = useSpring(useTransform(y, [0, 1], [60, 90]), springConfig);
  const translateZ_Text = useSpring(useTransform(y, [0, 1], [40, 60]), springConfig);

  // Dynamic Specular Glare Sheen tracking
  const sheenX = useTransform(x, [0, 1], ["0%", "100%"]);
  const sheenY = useTransform(y, [0, 1], ["0%", "100%"]);
  const sheenBg = useMotionTemplate`radial-gradient(circle at ${sheenX} ${sheenY}, rgba(251, 191, 36, 0.22) 0%, rgba(244, 63, 94, 0.06) 35%, transparent 70%)`;

  // Dynamic Shadow translation to simulate physical depth
  const shadowX = useTransform(x, [0, 1], [12, -12]);
  const shadowY = useTransform(y, [0, 1], [20, -20]);
  const shadowStyle = useMotionTemplate`${shadowX}px ${shadowY}px 30px rgba(0, 0, 0, 0.15)`;

  // Tactile audio click feedback
  const playTapSound = () => {
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

  // Mouse move handler with client bounding rect calculations
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  // Touch move handler for mobile devices
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!cardRef.current || e.touches.length === 0) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const touchX = e.touches[0].clientX - rect.left;
    const touchY = e.touches[0].clientY - rect.top;
    x.set(Math.max(0, Math.min(1, touchX / width)));
    y.set(Math.max(0, Math.min(1, touchY / height)));
  };

  // Reset card rotation on leave
  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
    scale.set(1);
  };

  // Gyroscopic tilt support for mobile devices with permission handling
  useEffect(() => {
    let isMounted = true;
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (!isMounted || !e.beta || !e.gamma) return;
      // Map beta (front/back tilt, typical holding angle ~45 deg) and gamma (left/right tilt)
      const beta = Math.max(-30, Math.min(30, e.beta - 45));
      const gamma = Math.max(-30, Math.min(30, e.gamma));
      const normX = (gamma + 30) / 60;
      const normY = (beta + 30) / 60;
      x.set(Math.max(0, Math.min(1, normX)));
      y.set(Math.max(0, Math.min(1, normY)));
    };

    const requestGyroPermission = async () => {
      if (
        typeof window !== "undefined" &&
        typeof (DeviceOrientationEvent as any).requestPermission === "function"
      ) {
        try {
          const permissionState = await (DeviceOrientationEvent as any).requestPermission();
          if (permissionState === "granted") {
            window.addEventListener("deviceorientation", handleOrientation);
          }
        } catch (error) {
          console.warn("DeviceOrientation permission request rejected:", error);
        }
      } else {
        window.addEventListener("deviceorientation", handleOrientation);
      }
    };

    // Trigger permission request on first touch/interaction
    const triggerPermission = () => {
      requestGyroPermission();
      window.removeEventListener("touchstart", triggerPermission);
    };
    window.addEventListener("touchstart", triggerPermission);

    return () => {
      isMounted = false;
      window.removeEventListener("deviceorientation", handleOrientation);
      window.removeEventListener("touchstart", triggerPermission);
    };
  }, [x, y]);

  return (
    <Link href={`/${lang}/tirthankars/${t.id}`} onClick={playTapSound}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseLeave}
        onMouseDown={() => scale.set(0.95)}
        onMouseUp={() => scale.set(1)}
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: "preserve-3d",
          perspective: 1200,
          boxShadow: shadowStyle,
        }}
        className="group relative h-[420px] md:h-[520px] rounded-[2.5rem] bg-white dark:bg-zinc-950 overflow-hidden transition-all border border-gray-200/80 dark:border-zinc-800/50 hover:border-amber-500/40 dark:hover:border-amber-500/30 will-change-transform"
      >
        {/* Dynamic Specular Glare Sheen Overlay */}
        <motion.div
          className="absolute inset-0 z-30 pointer-events-none mix-blend-screen"
          style={{ background: sheenBg }}
        />

        {/* Background Glow */}
        <div
          className="absolute inset-0 transition-opacity duration-700 opacity-5 dark:opacity-10 md:opacity-0 md:group-hover:opacity-15"
          style={{ backgroundColor: t.colorHex }}
        />

        {/* Subtle Grid Texture Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        {/* 3D Layer: Background ID Number */}
        <motion.div
          className="absolute top-8 left-8 z-10 select-none"
          style={{ translateZ: translateZ_BgNum }}
        >
          <span className="text-7xl font-black text-gray-100 dark:text-zinc-900 group-hover:text-amber-500/10 dark:group-hover:text-amber-500/10 transition-colors duration-500">
            {String(t.id).padStart(2, "0")}
          </span>
        </motion.div>

        {/* Card Content Container */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-6" style={{ transformStyle: "preserve-3d" }}>
          
          {/* 3D Layer: Image Container */}
          <motion.div
            className="relative w-full h-[60%] flex items-center justify-center transition-all duration-500 md:group-hover:-translate-y-6"
            style={{ translateZ: translateZ_Img, transformStyle: "preserve-3d" }}
          >
            <Image
              src={t.tirthankaraImage}
              alt={t.name[lang as "en" | "hi" | "kn"] || t.name.en}
              fill
              priority={index < 4}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-contain drop-shadow-[0_25px_55px_rgba(0,0,0,0.12)] dark:drop-shadow-[0_25px_55px_rgba(251,191,36,0.08)] p-4 transition-transform duration-500 group-hover:scale-105"
            />
          </motion.div>

          {/* 3D Layer: Text Info */}
          <motion.div
            className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-white via-white/95 to-transparent dark:from-zinc-950 dark:via-zinc-950/90 dark:to-transparent flex flex-col items-start opacity-100 md:opacity-0 md:group-hover:opacity-100 md:translate-y-4 md:group-hover:translate-y-0 transition-all duration-500"
            style={{ translateZ: translateZ_Text }}
          >
            <div className="text-amber-600 dark:text-amber-500 text-[10px] font-bold tracking-[0.25em] mb-1.5 uppercase">
              {t.symbol[lang as "en" | "hi" | "kn"] || t.symbol.en}
            </div>

            <h2 className={`text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-2 tracking-tight ${isIndic ? "leading-normal" : ""}`}>
              {t.name[lang as "en" | "hi" | "kn"] || t.name.en}
            </h2>

            <div className="h-1 w-12 bg-amber-500/50 dark:bg-amber-500/30 rounded-full mt-1" />
          </motion.div>
        </div>
      </motion.div>
    </Link>
  );
}

// ==========================================
// MAIN GALLERY CLIENT COMPONENT
// ==========================================
export default function TirthankarGallery({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = React.use(params);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Language Logic
  const l = lang === "hi" || lang === "kn" ? lang : "en";
  const isIndic = lang === "hi" || lang === "kn";

  // Persistent Sound Settings
  useEffect(() => {
    const stored = localStorage.getItem("tirthankara-sound-enabled");
    if (stored !== null) {
      setSoundEnabled(stored === "true");
    }
  }, []);

  const toggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    localStorage.setItem("tirthankara-sound-enabled", String(nextState));
    if (nextState) {
      try {
        const a = new Audio("/sounds/resources/click2.mp3");
        a.volume = 0.65;
        a.play().catch(() => {});
      } catch (e) {}
    }
  };

  // Translations for Static Text with Strict Digambar Citations
  const translations = {
    en: {
      library: "Library",
      lineage: "THE LINEAGE",
      title: "24 Tirthankaras",
      scriptureTitle: "Digambar Scriptural Authority",
      scriptureQuote: "सम्यग्दर्शनज्ञानचारित्राणि मोक्षमार्गः।",
      scriptureTranslation: "Right faith, right knowledge, and right conduct together constitute the path to liberation.",
      scriptureSource: "— Acharya Umāsvāmi, Tattvārtha Sūtra (Chapter 1, Sutra 1)",
      scriptureDetail: "In accordance with pure Digambar tradition (as codified in Acharya Kundakunda's Pravachanasāra, Gatha 20-22, and Acharya Pūjyapāda's Sarvārthasiddhi, Chapter 2, Sutra 9), the 24 Tirthankaras are unclad, unadorned, and depicted in deep introspective meditation (Nasagra drishti). Kevalis (Arihants) are entirely free from physical hunger (Kavalahara), thirst, disease, sleep, and bodily fatigue. The 19th Tirthankar, Mallinath Bhagwan, was a male king who attained absolute omniscience (Kevala Jnana) and Moksha strictly through total renunciation (Digambaratva), as documented in Acharya Jinasena's Mahāpurāna."
    },
    hi: {
      library: "लाइब्रेरी",
      lineage: "पवित्र वंश",
      title: "24 तीर्थंकर",
      scriptureTitle: "दिगंबर आगम प्रमाण",
      scriptureQuote: "सम्यग्दर्शनज्ञानचारित्राणि मोक्षमार्गः।",
      scriptureTranslation: "सम्यक् दर्शन, सम्यक् ज्ञान और सम्यक् चरित्र ही मोक्ष का मार्ग हैं।",
      scriptureSource: "— आचार्य उमास्वामी, तत्त्वार्थ सूत्र (अध्याय १, सूत्र १)",
      scriptureDetail: "शुद्ध दिगंबर परंपरा (आचार्य कुन्दकुन्द देव कृत प्रवचनसार, गाथा २०-२२ एवं आचार्य पूज्यपाद स्वामी विरचित सर्वार्थसिद्धि, अध्याय २, सूत्र ९) के अनुसार, सभी २४ तीर्थंकर पूर्णतः वीतरागी, दिगंबर (unclad) और नासाग्र दृष्टि ध्यान मुद्रा में विराजमान हैं। केवलज्ञानी अरिहंत देव क्षुधा (कवलाहार), तृषा, निद्रा आदि १८ दोषों से सर्वथा रहित होते हैं। १९वें तीर्थंकर मल्लिनाथ भगवान एक पुरुष राजा थे जिन्होंने पूर्ण दिगंबरत्व धारण कर केवलज्ञान और मोक्ष प्राप्त किया, जैसा कि आचार्य जिनसेन कृत महापुराण में वर्णित है।"
    },
    kn: {
      library: "ಲೈಬ್ರರಿ",
      lineage: "ಪವಿತ್ರ ವಂಶ",
      title: "24 ತೀರ್ಥಂಕರರು",
      scriptureTitle: "ದಿಗಂಬರ ಆಗಮ ಪ್ರಮಾಣ",
      scriptureQuote: "सम्यग्दर्शनज्ञानचारित्राणि मोक्षमार्गः।",
      scriptureTranslation: "ಸಮ್ಯಗ್ದರ್ಶನ, ಸಮ್ಯಗ್ಜ್ಞಾನ ಮತ್ತು ಸಮ್ಯಕ್ಚಾರಿತ್ರ್ಯಗಳೇ ಮೋಕ್ಷದ ಮಾರ್ಗವಾಗಿದೆ.",
      scriptureSource: "— ಆಚಾರ್ಯ ಉಮಾಸ್ವಾಮಿ, ತತ್ತ್ವಾರ್ಥ ಸೂತ್ರ (ಅಧ್ಯಾಯ ೧, ಸೂತ್ರ ೧)",
      scriptureDetail: "ಶುದ್ಧ ದಿಗಂಬರ ಸಂಪ್ರದಾಯದ ಪ್ರಕಾರ (ಆಚಾರ್ಯ ಕುಂದಕುಂದರ ಪ್ರವಚನಸಾರ, ಗಾಥಾ ೨೦-೨೨ ಮತ್ತು ಆಚಾರ್ಯ ಪೂಜ್ಯಪಾದರ ಸರ್ವಾರ್ಥಸಿದ್ಧಿ, ಅಧ್ಯಾಯ ೨, ಸೂತ್ರ ೯), ೨೪ ತೀರ್ಥಂಕರರು ದಿಗಂಬರರಾಗಿದ್ದು, ನಾಸಾಗ್ರ ದೃಷ್ಟಿ ಧ್ಯಾನ ಮುದ್ರೆಯಲ್ಲಿ ವಿರಾಜಮಾನರಾಗಿದ್ದಾರೆ. ಕೇವಲಜ್ಞಾನಿ ಅರಿಹಂತರು ಹಸಿವು (ಕವಲಾಹಾರ), ಬಾಯಾರಿಕೆ ಮುಂತಾದ ೧೮ ದೋಷಗಳಿಂದ ಮುಕ್ತರಾಗಿದ್ದಾರೆ. ೧೯ನೇ ತೀರ್ಥಂಕರರಾದ ಮಲ್ಲಿನಾಥ ಭಗವಾನರು ಪುರುಷ ರಾಜರಾಗಿದ್ದು, ದಿಗಂಬರತ್ವದ ಮೂಲಕ ಕೇವಲಜ್ಞಾನ ಮತ್ತು ಮೋಕ್ಷವನ್ನು ಪಡೆದರು ಎಂದು ಆಚಾರ್ಯ ಜಿನಸೇನರ ಮಹಾಪುರಾಣದಲ್ಲಿ ಉಲ್ಲೇಖಿಸಲಾಗಿದೆ."
    }
  };

  const t = translations[l as keyof typeof translations] || translations.en;

  return (
    <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-white selection:bg-amber-500 selection:text-black p-6 md:p-12 transition-colors duration-500 overflow-x-hidden">
      
      {/* 1. FIXED NAVIGATION */}
      <Link 
        href={`/${lang}`} 
        className="fixed top-20 left-4 md:top-24 md:left-8 z-50 flex items-center gap-2 text-zinc-500 hover:text-amber-500 transition-all bg-white/90 dark:bg-black/60 px-4 py-2.5 rounded-full backdrop-blur-md border border-gray-200 dark:border-zinc-800/80 shadow-sm hover:shadow-md active:scale-95"
      >
        <ArrowLeft size={16} /> 
        <span className={`text-[10px] font-bold uppercase tracking-widest ${isIndic ? "text-xs" : ""}`}>
          {t.library}
        </span>
      </Link>

      {/* 2. FLOATING SOUND TOGGLE (Mandated Position: fixed bottom-6 right-6 z-50) */}
      <button
        onClick={toggleSound}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-white/90 dark:bg-zinc-900/90 border border-gray-200 dark:border-zinc-800/80 shadow-xl backdrop-blur-md text-zinc-700 dark:text-zinc-300 hover:text-amber-500 dark:hover:text-amber-500 transition-all active:scale-90 min-w-[44px] min-h-[44px]"
        aria-label="Toggle Sound"
      >
        {soundEnabled ? <Volume2 size={20} className="animate-pulse" /> : <VolumeX size={20} />}
      </button>

      {/* MAIN CONTAINER */}
      <div className="max-w-[1800px] mx-auto pt-24 md:pt-20">
        
        {/* HERO HEADER */}
        <div className="mb-12 md:mb-20">
          <h2 className="text-amber-600 dark:text-amber-500 font-bold tracking-[0.5em] mb-4 text-xs md:text-base uppercase">
            {t.lineage}
          </h2>
          <h1 className={`text-[12vw] md:text-9xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white/90 ${isIndic ? "leading-tight" : "leading-none"}`}>
            {t.title}
          </h1>
        </div>

        {/* 3D TILT GALLERY GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 pb-20">
          {tirthankaras.map((item, index) => (
            <TirthankarCard
              key={item.id}
              t={item}
              index={index}
              lang={l}
              isIndic={isIndic}
              soundEnabled={soundEnabled}
            />
          ))}
        </div>

        {/* ARCHIVAL SCRIPTURE QUOTE PANEL */}
        <div className="mt-12 mb-20 p-8 md:p-12 rounded-[2.5rem] bg-amber-500/[0.02] dark:bg-amber-500/[0.01] border border-amber-500/10 dark:border-amber-500/5 max-w-4xl mx-auto backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-6 text-amber-600 dark:text-amber-500">
            <BookOpen size={22} />
            <span className="text-xs font-bold tracking-widest uppercase">{t.scriptureTitle}</span>
          </div>
          
          <blockquote className="space-y-4">
            <p className="text-2xl md:text-3xl font-serif text-amber-700 dark:text-amber-400 leading-relaxed">
              {t.scriptureQuote}
            </p>
            <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-300 italic">
              &ldquo;{t.scriptureTranslation}&rdquo;
            </p>
            <cite className="block text-xs font-bold tracking-wider text-zinc-400 dark:text-zinc-500 uppercase not-italic">
              {t.scriptureSource}
            </cite>
          </blockquote>

          <div className="mt-8 pt-6 border-t border-amber-500/10 dark:border-amber-500/5 flex flex-col gap-4">
            <div className="flex items-start gap-2.5 text-amber-600 dark:text-amber-500">
              <ShieldCheck size={18} className="mt-0.5 shrink-0" />
              <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {t.scriptureDetail}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}