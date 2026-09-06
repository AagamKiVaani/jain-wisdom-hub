"use client";

import React, { useState, useEffect, useRef } from "react";
import { tirthankaras } from "@/lib/tirthankara-data";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Volume2, VolumeX, Sparkles, Compass } from "lucide-react";
import { 
  motion, 
  useMotionValue, 
  useSpring, 
  useTransform, 
  useMotionTemplate,
  AnimatePresence 
} from "framer-motion";

// =============================================================================
// 3D TILT CARD COMPONENT (ZERO RE-RENDER PERFORMANCE OPTIMIZED)
// =============================================================================
function TirthankarCard({
  t,
  lang,
  index,
  soundEnabled,
  playTapSound,
}: {
  t: typeof tirthankaras[0];
  lang: string;
  index: number;
  soundEnabled: boolean;
  playTapSound: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isIndic = lang === "hi" || lang === "kn";
  const l = (lang === "hi" || lang === "kn") ? lang : "en";

  // Motion values for normalized mouse coordinates (-0.5 to 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // High-performance spring physics configuration (stiffness: 300, damping: 25)
  const springConfig = { stiffness: 300, damping: 25 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), springConfig);
  
  // Spring for tactile scale compression on click/touch
  const scale = useSpring(1, { stiffness: 400, damping: 18 });

  // Motion values for Glare position (0% to 100%) and Opacity to prevent React re-renders
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareOpacity = useSpring(0, { stiffness: 150, damping: 20 });

  // Dynamic CSS background template for specular glare sheen
  const glareBg = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, ${glareOpacity}) 0%, rgba(255, 255, 255, 0) 65%)`;

  // Dynamic 3D Shadow translation to enhance floating illusion
  const shadowX = useTransform(x, [-0.5, 0.5], [20, -20]);
  const shadowY = useTransform(y, [-0.5, 0.5], [20, -20]);
  const shadowBlur = useTransform(scale, [0.94, 1], [15, 35]);
  const shadowTemplate = useMotionTemplate`rgba(244, 63, 94, 0.08) ${shadowX}px ${shadowY}px ${shadowBlur}px`;

  // Handle mouse move with precise coordinate normalization
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXVal = e.clientX - rect.left;
    const mouseYVal = e.clientY - rect.top;

    // Normalize coordinates to range [-0.5, 0.5]
    const normX = (mouseXVal / width) - 0.5;
    const normY = (mouseYVal / height) - 0.5;

    x.set(normX);
    y.set(normY);

    // Update glare coordinates directly (bypassing React state)
    glareX.set((mouseXVal / width) * 100);
    glareY.set((mouseYVal / height) * 100);
    glareOpacity.set(0.35);
  };

  // Reset card physics on mouse leave
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    scale.set(1);
    glareOpacity.set(0);
  };

  // Handle pointer down (tactile compression & haptic trigger)
  const handlePointerDown = () => {
    scale.set(0.94);
    playTapSound();
  };

  // Handle pointer up
  const handlePointerUp = () => {
    scale.set(1);
  };

  // Gyroscopic orientation tracking for mobile devices (gentle fallback)
  useEffect(() => {
    let handleOrientation: (e: DeviceOrientationEvent) => void;

    if (typeof window !== "undefined") {
      handleOrientation = (e: DeviceOrientationEvent) => {
        // Apply only in portrait mode to prevent orientation confusion
        if (window.innerHeight > window.innerWidth) {
          const beta = e.beta || 0;   // Front/back tilt (-180 to 180)
          const gamma = e.gamma || 0; // Left/right tilt (-90 to 90)

          // Clamp and normalize values for a smooth, subtle tilt
          const normX = Math.max(-1, Math.min(1, gamma / 25)) * 0.5;
          const normY = Math.max(-1, Math.min(1, (beta - 45) / 25)) * 0.5; // Assumes 45-degree viewing angle

          x.set(normX);
          y.set(normY);

          // Update glare based on device tilt
          glareX.set((normX + 0.5) * 100);
          glareY.set((normY + 0.5) * 100);
          glareOpacity.set(0.2);
        }
      };

      window.addEventListener("deviceorientation", handleOrientation);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("deviceorientation", handleOrientation);
      }
    };
  }, [x, y, glareX, glareY, glareOpacity]);

  return (
    <Link href={`/${lang}/tirthankars/${t.id}`} className="block outline-none select-none">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        style={{
          rotateX,
          rotateY,
          scale,
          boxShadow: shadowTemplate,
          transformStyle: "preserve-3d",
          perspective: "1200px",
        }}
        className="group relative h-[420px] md:h-[520px] rounded-[2.5rem] bg-gray-50 dark:bg-zinc-900/40 overflow-hidden transition-all border border-rose-500/10 dark:border-zinc-800/80 md:border-gray-200/80 md:dark:border-white/5 md:hover:border-rose-500/40 md:hover:shadow-rose-500/10 md:dark:hover:shadow-rose-950/30 cursor-pointer"
      >
        {/* Specular Glare Sheen Layer */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-30 mix-blend-overlay"
          style={{ background: glareBg }}
        />

        {/* Ambient Aura Glow */}
        <div
          className="absolute inset-0 transition-opacity duration-700 opacity-10 dark:opacity-15 md:opacity-0 md:group-hover:opacity-20"
          style={{ backgroundColor: t.colorHex }}
        />

        {/* Large Background ID Number with 3D Depth (Z-Plane: 30px) */}
        <div 
          className="absolute top-6 left-8 z-10 select-none pointer-events-none"
          style={{ transform: "translateZ(30px)" }}
        >
          <span className="text-7xl md:text-8xl font-black text-gray-200/80 dark:text-white/5 group-hover:text-rose-500/20 dark:group-hover:text-rose-500/10 transition-colors duration-500">
            {t.id}
          </span>
        </div>

        {/* Card Content Wrapper */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-6">
          
          {/* Image Container with High 3D Depth (Z-Plane: 80px) */}
          <div 
            className="relative w-full h-[55%] flex items-center justify-center transition-all duration-500 md:group-hover:-translate-y-8 pointer-events-none"
            style={{ transform: "translateZ(80px)" }}
          >
            <Image
              src={t.tirthankaraImage}
              alt={t.name[l]}
              fill
              priority={index < 4}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-contain drop-shadow-[0_35px_35px_rgba(244,63,94,0.15)] p-4 transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Text Info with 3D Depth (Z-Plane: 50px) */}
          <div 
            className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-white via-white/95 to-transparent dark:from-black dark:via-black/90 dark:to-transparent flex flex-col items-start opacity-100 md:opacity-0 md:group-hover:opacity-100 md:translate-y-4 md:group-hover:translate-y-0 transition-all duration-500"
            style={{ transform: "translateZ(50px)" }}
          >
            <div className="text-rose-600 dark:text-rose-500 text-xs font-bold tracking-widest mb-1 uppercase">
              {t.symbol[l]}
            </div>
            
            <h2 className={`text-3xl font-bold text-gray-900 dark:text-white mb-2 ${isIndic ? 'leading-normal' : ''}`}>
              {t.name[l]}
            </h2>
            
            <div className="h-1 w-12 bg-rose-500/50 dark:bg-rose-500/30 rounded-full mt-2"></div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

// =============================================================================
// MAIN GALLERY CLIENT COMPONENT
// =============================================================================
export default function TirthankarGallery({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = React.use(params);
  
  // 1. Language Logic
  const l = (lang === "hi" || lang === "kn") ? lang : "en";
  const isIndic = lang === "hi" || lang === "kn";

  // 2. Sound State Management
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("tirthankar-gallery-sound");
    if (stored !== null) {
      setSoundEnabled(stored === "true");
    }
  }, []);

  const toggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    localStorage.setItem("tirthankar-gallery-sound", String(nextState));
    
    if (nextState) {
      try {
        const a = new Audio("/sounds/resources/click2.mp3");
        a.volume = 0.4;
        a.play().catch(() => {});
      } catch (e) {}
    }
  };

  // Audio Tactile Click Handler (0.65 Volume Mandate)
  const playTapSound = () => {
    if (!soundEnabled) return;
    try {
      const a = new Audio("/sounds/resources/click2.mp3");
      a.volume = 0.65;
      a.play().catch(() => {});
      if (typeof navigator !== "undefined" && navigator.vibrate) {
        navigator.vibrate(12); // Gentle haptic feedback
      }
    } catch (e) {}
  };

  // 3. Translations for Static Text (Strict Digambar Canonical Citations)
  const translations = {
    en: {
      library: "Library",
      lineage: "THE LINEAGE",
      title: "24 Tirthankaras",
      soundOn: "Sound On",
      soundOff: "Sound Off",
      scriptureTitle: "Digambar Canonical Epistemology",
      scriptureQuote: "सम्यग्दर्शनज्ञानचारित्राणि मोक्षमार्गः॥",
      scriptureTranslation: "Right faith, right knowledge, and right conduct together constitute the path to liberation (Moksha).",
      scriptureSource: "Acharya Umāsvāmi, Tattvārtha Sūtra (Chapter 1, Sutra 1)",
      secondaryQuote: "अहमेक्को खलु सुद्धो दंसणणाणमइओ सदारुवी। णवि अत्थि मज्झ किंचि वि अण्णं परमाणुमेत्तं पि॥",
      secondaryTranslation: "I am indeed alone, pure, full of knowledge and perception, and always formless. There is not even an atom of anything else that belongs to me.",
      secondarySource: "Acharya Kundakunda, Samayasāra (Gāthā 38)",
      iconographyNote: "In accordance with the Digambar Jain canon (Acharya Pūjyapāda’s Sarvārthasiddhi, Chapter 2, and Acharya Jinasena’s Mahāpurāna), all 24 Tirthankaras are depicted in their pure, unclad (Digambaratva), and unadorned state, reflecting absolute detachment (Vītarāgatā) and supreme introspection (Nāsāgra-dṛṣṭi). Mallinātha Bhagwān is revered strictly as a male Tirthankar who attained Kevala Jñāna through total renunciation. Kevalis (Arihants) are free from hunger (Kavalahāra), thirst, disease, and physical fatigue, abiding in infinite bliss."
    },
    hi: {
      library: "लाइब्रेरी",
      lineage: "पवित्र वंश",
      title: "24 तीर्थंकर",
      soundOn: "ध्वनि चालू",
      soundOff: "ध्वनि बंद",
      scriptureTitle: "दिगंबर आगम प्रमाण",
      scriptureQuote: "सम्यग्दर्शनज्ञानचारित्राणि मोक्षमार्गः॥",
      scriptureTranslation: "सम्यक् दर्शन, सम्यक् ज्ञान और सम्यक् चारित्र ही मोक्ष का मार्ग हैं।",
      scriptureSource: "आचार्य उमास्वामी, तत्त्वार्थ सूत्र (अध्याय १, सूत्र १)",
      secondaryQuote: "अहमेक्को खलु सुद्धो दंसणणाणमइओ सदारुवी। णवि अत्थि मज्झ किंचि वि अण्णं परमाणुमेत्तं पि॥",
      secondaryTranslation: "मैं वास्तव में अकेला हूँ, शुद्ध हूँ, ज्ञान और दर्शन से युक्त हूँ, और सदा अरूपी हूँ। परमाणु मात्र भी अन्य कोई पदार्थ मेरा नहीं है।",
      secondarySource: "आचार्य कुन्दकुन्द, समयसार (गाथा ३८)",
      iconographyNote: "दिगंबर जैन आगम (आचार्य पूज्यपाद रचित सर्वार्थसिद्धि, अध्याय २, एवं आचार्य जिनसेन रचित महापुराण) के अनुसार, सभी २४ तीर्थंकर अपनी शुद्ध, नग्न (दिगंबरत्व) और आभूषणरहित अवस्था में दर्शाए गए हैं, जो पूर्ण वीतरागता और नासाग्र दृष्टि को दर्शाते हैं। मल्लिनाथ भगवान को केवल पुरुष तीर्थंकर के रूप में पूजा जाता है जिन्होंने पूर्ण दिगंबर दीक्षा धारण कर केवलज्ञान प्राप्त किया। केवलज्ञानी (अरिहंत) क्षुधा (कवलाहार), तृषा, रोग और शारीरिक थकावट से सर्वथा रहित होते हैं।"
    },
    kn: {
      library: "ಲೈಬ್ರರಿ",
      lineage: "ಪವित्र ವಂಶ",
      title: "24 ತೀರ್ಥಂಕರರು",
      soundOn: "ಧ್ವನಿ ಆನ್",
      soundOff: "ಧ್ವನಿ ಆಫ್",
      scriptureTitle: "ದಿಗಂಬರ ಆಗಮ ಪ್ರಮಾಣ",
      scriptureQuote: "सम्यग्दर्शनज्ञानचारित्राणि मोक्षमार्गः॥",
      scriptureTranslation: "ಸಮ್ಯಕ್ ದರ್ಶನ, ಸಮ್ಯಕ್ ಜ್ಞಾನ ಮತ್ತು ಸಮ್ಯಕ್ ಚಾರಿತ್ರ್ಯಗಳು ಒಟ್ಟಾಗಿ ಮೋಕ್ಷದ ಮಾರ್ಗವಾಗಿದೆ.",
      scriptureSource: "ಆಚಾರ್ಯ ಉಮಾಸ್ವಾಮಿ, ತತ್ವಾರ್ಥ ಸೂತ್ರ (ಅಧ್ಯಾಯ ೧, ಸೂತ್ರ ೧)",
      secondaryQuote: "अहमेक्को खलु सुद्धो दंसणणाणमइओ सदारुवी। णवि अत्थि मज्झ किंचि वि अण्णं परमाणुमेत्तं पि॥",
      secondaryTranslation: "ನಾನು ನಿಜವಾಗಿಯೂ ಏಕನಾಗಿದ್ದೇನೆ, ಶುದ್ಧನಾಗಿದ್ದೇನೆ, ಜ್ಞಾನ ಮತ್ತು ದರ್ಶನಮಯನಾಗಿದ್ದೇನೆ. ಪರಮಾಣು ಮಾತ್ರವೂ ನನ್ನದಲ್ಲ.",
      secondarySource: "ಆಚಾರ್ಯ ಕುಂದಕುಂದ, ಸಮಯಸಾರ (ಗಾಥಾ ೩೮)",
      iconographyNote: "ದಿಗಂಬರ ಜೈನ ಸಂಪ್ರದಾಯದ ಪ್ರಕಾರ (ಆಚಾರ್ಯ ಪೂಜ್ಯಪಾದರ ಸರ್ವಾರ್ಥಸಿದ್ಧಿ ಮತ್ತು ಆಚಾರ್ಯ ಜಿನಸೇನರ ಮಹಾಪುರಾಣ), ಎಲ್ಲಾ ೨೪ ತೀರ್ಥಂಕರರನ್ನು ಅವರ ಶುದ್ಧ, ದಿಗಂಬರ ಮತ್ತು ನಿರಾಭರಣ ಸ್ಥಿತಿಯಲ್ಲಿ ಚಿತ್ರಿಸಲಾಗಿದೆ, ಇದು ಸಂಪೂರ್ಣ ವೀತರಾಗತೆ ಮತ್ತು ನಾಸಾಗ್ರ ದೃಷ್ಟಿಯನ್ನು ಪ್ರತಿಬಿಂಬಿಸುತ್ತದೆ. ಮಲ್ಲಿನಾಥ ಭಗವಾನರನ್ನು ಕೇವಲ ಪುರುಷ ತೀರ್ಥಂಕರರೆಂದು ಪೂಜಿಸಲಾಗುತ್ತದೆ."
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white selection:bg-rose-500 selection:text-white p-6 md:p-12 transition-colors duration-500 overflow-x-hidden">
      
      {/* 1. FIXED NAVIGATION (Touch Target >= 44px) */}
      <Link 
        href={`/${lang}`} 
        onClick={playTapSound}
        className="fixed top-20 left-4 md:top-24 md:left-8 z-50 flex items-center gap-2 text-gray-500 hover:text-rose-500 transition-all bg-white/90 dark:bg-black/60 px-5 py-3 rounded-full backdrop-blur-md border border-gray-200 dark:border-white/10 shadow-md"
      >
        <ArrowLeft size={16} /> 
        <span className={`text-[11px] font-bold uppercase tracking-widest ${isIndic ? 'text-xs' : ''}`}>
          {t.library}
        </span>
      </Link>

      {/* 2. MAIN GALLERY CONTAINER */}
      <div className="max-w-[1800px] mx-auto pt-24 md:pt-20">
        <div className="mb-12 md:mb-20">
          <h2 className="text-rose-600 dark:text-rose-500 font-bold tracking-[0.5em] mb-4 text-xs md:text-base uppercase">
            {t.lineage}
          </h2>
          <h1 className={`text-[12vw] md:text-9xl font-black uppercase tracking-tighter text-gray-900 dark:text-white/90 ${isIndic ? 'leading-tight' : 'leading-none'}`}>
            {t.title}
          </h1>
        </div>

        {/* 3. 3D TILT CARD GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 pb-20">
          {tirthankaras.map((item, index) => (
            <TirthankarCard
              key={item.id}
              t={item}
              lang={lang}
              index={index}
              soundEnabled={soundEnabled}
              playTapSound={playTapSound}
            />
          ))}
        </div>

        {/* 4. REVERENT DIGAMBAR SCRIPTURAL PANEL */}
        <div className="border-t border-gray-200 dark:border-zinc-800/80 pt-16 pb-24 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/5 border border-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-semibold tracking-widest uppercase mb-8">
            <Sparkles size={12} />
            {t.scriptureTitle}
          </div>
          
          {/* Primary Citation: Tattvārtha Sūtra */}
          <div className="mb-12">
            <blockquote className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white/90 mb-6 leading-relaxed font-serif">
              “{t.scriptureQuote}”
            </blockquote>
            <p className="text-base md:text-lg text-gray-600 dark:text-zinc-400 max-w-2xl mx-auto mb-4 leading-relaxed">
              {t.scriptureTranslation}
            </p>
            <cite className="block text-xs md:text-sm font-bold text-rose-600 dark:text-rose-500 uppercase tracking-widest not-italic">
              — {t.scriptureSource}
            </cite>
          </div>

          {/* Secondary Citation: Samayasāra */}
          <div className="mb-16 border-t border-gray-100 dark:border-zinc-900 pt-12">
            <blockquote className="text-xl md:text-2xl font-bold text-gray-800 dark:text-zinc-200 mb-6 leading-relaxed font-serif">
              “{t.secondaryQuote}”
            </blockquote>
            <p className="text-base text-gray-600 dark:text-zinc-400 max-w-2xl mx-auto mb-4 leading-relaxed">
              {t.secondaryTranslation}
            </p>
            <cite className="block text-xs md:text-sm font-bold text-rose-600 dark:text-rose-500 uppercase tracking-widest not-italic">
              — {t.secondarySource}
            </cite>
          </div>

          {/* Canonical Iconography Note */}
          <div className="p-6 md:p-8 rounded-3xl bg-gray-50 dark:bg-zinc-900/30 border border-gray-100 dark:border-zinc-800/50 text-left">
            <p className="text-xs md:text-sm text-gray-500 dark:text-zinc-500 leading-relaxed text-center italic">
              {t.iconographyNote}
            </p>
          </div>
        </div>
      </div>

      {/* 5. FLOATING CONTROLS (SOUND TOGGLE - DOCKED AT bottom-6 right-6) */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={toggleSound}
          className="flex items-center gap-2 px-5 py-3.5 rounded-full bg-white/90 dark:bg-zinc-900/90 text-gray-700 dark:text-zinc-300 hover:text-rose-500 dark:hover:text-rose-400 transition-all border border-gray-200 dark:border-zinc-800 shadow-lg backdrop-blur-md min-h-[44px] min-w-[44px]"
          aria-label="Toggle Sound"
        >
          {soundEnabled ? (
            <>
              <Volume2 size={16} className="text-rose-500 animate-pulse" />
              <span className="text-xs font-bold tracking-wider uppercase hidden md:inline">{t.soundOn}</span>
            </>
          ) : (
            <>
              <VolumeX size={16} className="text-gray-400" />
              <span className="text-xs font-bold tracking-wider uppercase hidden md:inline">{t.soundOff}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}