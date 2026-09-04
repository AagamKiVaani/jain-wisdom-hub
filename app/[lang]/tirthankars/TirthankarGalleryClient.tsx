"use client";

import React, { useState, useEffect, useRef } from "react";
import { tirthankaras } from "@/lib/tirthankara-data";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Volume2, VolumeX, Sparkles, Compass } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";

export default function TirthankarGallery({ params }: { params: Promise<{ lang: string }> }) {
  const unwrappedParams = React.use(params);
  const lang = unwrappedParams.lang;
  
  // 1. Language Logic
  const l = (lang === "hi" || lang === "kn") ? lang : "en";
  const isIndic = lang === "hi" || lang === "kn";

  // Audio & Sound State
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const playTapSound = () => { 
    if (!soundEnabled) return; 
    try { 
      const a = new Audio("/sounds/resources/click2.mp3"); 
      a.volume = 0.65; 
      a.play().catch(()=>{}); 
      if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(12); 
    } catch (e) {} 
  };

  // 2. Translations for Static Text
  const translations = {
    en: {
      library: "Library",
      lineage: "THE LINEAGE OF JINAS",
      title: "24 Tirthankaras",
      soundOn: "Sound On",
      soundOff: "Sound Off",
      iconographyNote: "Digambar Iconography: Unadorned, unclad, peaceful, eyes half-open in introspective meditation (Nasagra Drishti).",
      scriptureNote1: "“युगपत्सर्वपर्यायेषु केवलस्य” — Acharya Umāsvāmi, Tattvārtha Sūtra (Chapter 1, Sutra 30)",
      scriptureNote1Desc: "Kevala Jnana (Omniscience) functions simultaneously with respect to all substances and their infinite modifications across the three worlds.",
      scriptureNote2: "“जो जाणदि जुगवदट्ठे सव्वे ते लोगालोगगदे। सो केवली त्ति वुच्चदि...” — Acharya Kundkund, Pravachanasāra (Chapter 1, Gatha 16)",
      scriptureNote2Desc: "He who knows simultaneously all objects of the universe (Loka) and non-universe (Aloka) is called a Kevali."
    },
    hi: {
      library: "लाइब्रेरी",
      lineage: "जिनेन्द्र परंपरा",
      title: "24 तीर्थंकर",
      soundOn: "ध्वनि चालू",
      soundOff: "ध्वनि बंद",
      iconographyNote: "दिगंबर प्रतिमा लक्षण: पूर्ण वीतराग, निराभरण, दिगंबर मुद्रा, नासाग्र दृष्टि, परम शांत भाव।",
      scriptureNote1: "“युगपत्सर्वपर्यायेषु केवलस्य” — आचार्य उमास्वामी, तत्त्वार्थसूत्र (अध्याय १, सूत्र ३०)",
      scriptureNote1Desc: "कवलज्ञान तीन लोक के समस्त द्रव्यों और उनकी अनंत पर्यायों को एक ही समय में प्रत्यक्ष युगपत जानता है।",
      scriptureNote2: "“जो जाणदि जुगवदट्ठे सव्वे ते लोगालोगगदे। सो केवली त्ति वुच्चदि...” — आचार्य कुन्दकुन्द, प्रवचनसार (अध्याय १, गाथा १६)",
      scriptureNote2Desc: "जो लोक और अलोक में विद्यमान समस्त पदार्थों को एक साथ युगपत जानता है, उन्हें केवली भगवान कहा जाता है।"
    },
    kn: {
      library: "ಲೈಬ್ರರಿ",
      lineage: "ಜಿನೇಂದ್ರ ಪರಂಪರೆ",
      title: "24 ತೀರ್ಥಂಕರರು",
      soundOn: "ಧ್ವನಿ ಆನ್",
      soundOff: "ಧ್ವನಿ ಆಫ್",
      iconographyNote: "ದಿಗಂಬರ ಜಿನಬಿಂಬ ಲಕ್ಷಣ: ನಿರಾಭರಣ, ದಿಗಂಬರ ಮುದ್ರೆ, ನಾಸಾಗ್ರ ದೃಷ್ಟಿ, ಪರಮ ಶಾಂತ ಭಾವ.",
      scriptureNote1: "“युगपत्सर्वपर्यायेषु केवलस्य” — ಆಚಾರ್ಯ ಉಮಾಸ್ವಾಮಿ, ತತ್ವಾರ್ಥಸೂತ್ರ (ಅಧ್ಯಾಯ ೧, ಸೂತ್ರ ೩೦)",
      scriptureNote1Desc: "ಕೇವಲಜ್ಞಾನವು ಮೂರು ಲೋಕಗಳ ಸಮಸ್ತ ದ್ರವ್ಯಗಳನ್ನು ಮತ್ತು ಅವುಗಳ ಅನಂತ ಪರ್ಯಾಯಗಳನ್ನು ಏಕಕಾಲದಲ್ಲಿ ಪ್ರಕಾಶಿಸುತ್ತದೆ.",
      scriptureNote2: "“जो जाणदि जुगवदट्ठे सव्वे ते लोगालोगगदे। सो केवली त्ति वुच्चदि...” — ಆಚಾರ್ಯ ಕುಂದಕುಂದ, ಪ್ರವಚನಸಾರ (ಅಧ್ಯಾಯ ೧, ಗಾಥೆ ೧೬)",
      scriptureNote2Desc: "ಲೋಕ ಮತ್ತು ಅಲೋಕದಲ್ಲಿರುವ ಸಮಸ್ತ ಪದಾರ್ಥಗಳನ್ನು ಏಕಕಾಲದಲ್ಲಿ ತಿಳಿಯುವವರೇ ಕೇವಲಿ ಭಗವಂತರು."
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white selection:bg-rose-500 selection:text-white p-6 md:p-12 transition-colors duration-500 relative overflow-hidden">
      
      {/* 1. FIXED NAVIGATION */}
      <Link 
        href={`/${lang}`} 
        onClick={playTapSound}
        className="fixed top-20 left-4 md:top-24 md:left-8 z-50 flex items-center gap-2 text-gray-500 hover:text-rose-500 transition-all bg-white/80 dark:bg-black/50 px-4 py-2 rounded-full backdrop-blur-md border border-gray-200 dark:border-white/10 shadow-sm"
      >
        <ArrowLeft size={16} /> 
        <span className={`text-[10px] font-bold uppercase tracking-widest ${isIndic ? 'text-xs' : ''}`}>
          {t.library}
        </span>
      </Link>

      {/* FLOATING SOUND TOGGLE - MANDATORY POSITION: fixed bottom-6 right-6 z-50 */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl px-4 py-3 rounded-full border border-rose-500/30 shadow-2xl shadow-rose-500/20">
        <button
          onClick={() => {
            setSoundEnabled(!soundEnabled);
            playTapSound();
          }}
          className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400 transition-transform active:scale-95"
          aria-label="Toggle Sound"
        >
          {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          <span className="hidden md:inline">{soundEnabled ? t.soundOn : t.soundOff}</span>
        </button>
      </div>

      <div className="max-w-[1800px] mx-auto pt-24 md:pt-20">
        <div className="mb-12 md:mb-20">
          <h2 className="text-rose-600 dark:text-rose-500 font-bold tracking-[0.5em] mb-4 text-xs md:text-base uppercase flex items-center gap-2">
            <Sparkles size={16} /> {t.lineage}
          </h2>
          <h1 className={`text-[12vw] md:text-9xl font-black uppercase tracking-tighter text-gray-900 dark:text-white/90 ${isIndic ? 'leading-tight' : 'leading-none'}`}>
            {t.title}
          </h1>
          <p className="mt-4 text-xs md:text-sm text-gray-500 dark:text-zinc-400 max-w-2xl font-medium border-l-2 border-rose-500/50 pl-4">
            {t.iconographyNote}
          </p>
        </div>

        {/* 3D TILT CARD GALLERY GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 pb-20">
          {tirthankaras.map((item, index) => (
            <Tirthankar3DCard 
              key={item.id} 
              item={item} 
              index={index} 
              lang={lang} 
              l={l} 
              isIndic={isIndic} 
              onTap={playTapSound} 
            />
          ))}
        </div>

        {/* SCRIPTURAL CITATION FOOTER PANEL */}
        <div className="mt-12 mb-24 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-rose-500/10 via-amber-500/5 to-transparent border border-rose-500/20 backdrop-blur-xl max-w-5xl mx-auto shadow-2xl space-y-8">
          <div className="text-center">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-rose-600 dark:text-rose-400 bg-rose-500/10 px-4 py-1.5 rounded-full">
              Digambar Canonical Authority
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-rose-500/10">
            {/* Citation 1: Tattvartha Sutra */}
            <div className="space-y-3">
              <p className="text-base md:text-lg font-bold text-gray-900 dark:text-white font-serif leading-relaxed">
                {t.scriptureNote1}
              </p>
              <p className="text-xs md:text-sm text-gray-600 dark:text-zinc-400 leading-relaxed">
                {t.scriptureNote1Desc}
              </p>
            </div>

            {/* Citation 2: Pravachanasara */}
            <div className="space-y-3">
              <p className="text-base md:text-lg font-bold text-gray-900 dark:text-white font-serif leading-relaxed">
                {t.scriptureNote2}
              </p>
              <p className="text-xs md:text-sm text-gray-600 dark:text-zinc-400 leading-relaxed">
                {t.scriptureNote2Desc}
              </p>
            </div>
          </div>

          <div className="text-center text-[10px] text-gray-400 dark:text-zinc-500 uppercase tracking-widest pt-4 border-t border-rose-500/10">
            Sourced from Acharya Umāsvāmi&apos;s Tattvārtha Sūtra & Acharya Kundkund&apos;s Pravachanasāra
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// GYROSCOPIC 3D TILT CARD COMPONENT (SINGLE FEATURE DEEP CRAFTSMANSHIP)
// ============================================================================
interface Tirthankar3DCardProps {
  item: typeof tirthankaras[number];
  index: number;
  lang: string;
  l: 'en' | 'hi' | 'kn';
  isIndic: boolean;
  onTap: () => void;
}

function Tirthankar3DCard({ item, index, lang, l, isIndic, onTap }: Tirthankar3DCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [gyroActive, setGyroActive] = useState(false);

  // Framer Motion spring values for smooth 3D tilt tracking
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Premium spring physics for luxurious, tactile response
  const mouseXSpring = useSpring(x, { stiffness: 250, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 250, damping: 25 });

  // Map spring values to 3D rotation angles
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  // Hardware-accelerated dynamic specular glare sheen using useMotionTemplate
  const glareBg = useMotionTemplate`radial-gradient(
    circle at ${useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"])} ${useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"])},
    rgba(255, 255, 255, 0.35) 0%,
    rgba(255, 255, 255, 0.08) 40%,
    transparent 80%
  )`;

  const rawOpacityTransform = useTransform(mouseXSpring, (val: number): number => (val === 0 ? 0 : 0.85));
  const glareOpacity = useSpring(rawOpacityTransform, { stiffness: 150, damping: 20 });

  // Handle Mouse Movement (Desktop)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Mobile Device Orientation Gyroscopic Support with Low-Pass Filtering
  useEffect(() => {
    let animationFrameId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    const alpha = 0.12; // Low-pass filter coefficient to eliminate hand jitter

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.beta === null || e.gamma === null) return;
      setGyroActive(true);

      // beta: front-to-back tilt [-180, 180], gamma: left-to-right tilt [-90, 90]
      // Normalize holding angle (approx 45 degrees tilt towards face)
      const betaNormalized = (e.beta - 45) / 35;
      const gammaNormalized = e.gamma / 30;

      // Clamp values to prevent extreme rotations
      targetX = Math.min(Math.max(gammaNormalized * 0.5, -0.5), 0.5);
      targetY = Math.min(Math.max(betaNormalized * 0.5, -0.5), 0.5);
    };

    const updateSprings = () => {
      // Apply low-pass filter formula: y(t) = y(t-1) + alpha * (x(t) - y(t-1))
      currentX = currentX + alpha * (targetX - currentX);
      currentY = currentY + alpha * (targetY - currentY);

      x.set(currentX);
      y.set(currentY);

      animationFrameId = requestAnimationFrame(updateSprings);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("deviceorientation", handleOrientation);
      animationFrameId = requestAnimationFrame(updateSprings);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("deviceorientation", handleOrientation);
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [x, y]);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1200,
      }}
      whileTap={{ scale: 0.95, rotateX: 0, rotateY: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="relative w-full h-[450px] md:h-[520px] cursor-pointer select-none"
    >
      <Link 
        href={`/${lang}/tirthankars/${item.id}`} 
        onClick={onTap}
        className="absolute inset-0 block rounded-[2rem] bg-gradient-to-br from-gray-50/95 to-gray-100/90 dark:from-zinc-900/90 dark:to-zinc-950/95 overflow-hidden transition-all border border-rose-500/20 dark:border-white/10 shadow-2xl shadow-rose-500/5 dark:shadow-rose-950/20 backdrop-blur-xl group"
      >
        {/* Dynamic Specular Glare Sheen Overlay */}
        <motion.div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-30 mix-blend-overlay"
          style={{
            background: glareBg,
            opacity: glareOpacity,
          }}
        />

        {/* Background Glow corresponding to Tirthankar colorHex */}
        <div 
          className="absolute inset-0 opacity-10 dark:opacity-15 transition-all duration-700 group-hover:opacity-25 blur-3xl"
          style={{ backgroundColor: item.colorHex }}
        />

        {/* Serial ID Watermark with Z-Depth */}
        <div 
          className="absolute top-6 left-8 z-10" 
          style={{ transform: "translateZ(40px)" }}
        >
          <span className="text-7xl font-black text-gray-200/80 dark:text-white/5 group-hover:text-rose-500/20 transition-colors duration-500">
            {String(item.id).padStart(2, '0')}
          </span>
        </div>

        {/* Gyroscope Active Indicator (Mobile Only) */}
        {gyroActive && (
          <div className="absolute top-6 right-8 z-30 md:hidden text-rose-500/40 animate-pulse">
            <Compass size={16} />
          </div>
        )}

        {/* Card Content with Multi-Plane Z-Depth */}
        <div className="absolute inset-0 flex flex-col items-center justify-between z-20 p-8">
          
          {/* Top Metadata */}
          <div className="w-full flex justify-end items-center" style={{ transform: "translateZ(30px)" }}>
            <span className="text-[10px] font-bold tracking-[0.2em] text-rose-600/80 dark:text-rose-400/80 bg-rose-500/10 px-3 py-1 rounded-full uppercase">
              {item.symbol[l]}
            </span>
          </div>

          {/* Image Container with 3D translation */}
          <div 
            className="relative w-full h-[55%] flex items-center justify-center transition-all duration-500 group-hover:-translate-y-6"
            style={{ transform: "translateZ(70px)" }}
          >
            <Image
              src={item.tirthankaraImage}
              alt={item.name[l]}
              fill
              priority={index < 4}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.35)] p-4 transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Text Info Overlay with Z-Depth */}
          <div 
            className="w-full flex flex-col items-start"
            style={{ transform: "translateZ(50px)" }}
          >
            <div className="text-[10px] font-bold tracking-[0.3em] text-rose-600 dark:text-rose-400 uppercase mb-1">
              {lang === "en" ? "VĪTARĀGA JINA" : "वीतराग जिन"}
            </div>
            
            <h2 className={`text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight ${isIndic ? 'leading-normal' : ''}`}>
              {item.name[l]}
            </h2>
            
            <div className="h-1 w-12 bg-rose-500/40 rounded-full mt-3 group-hover:w-24 transition-all duration-500 ease-out"></div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}