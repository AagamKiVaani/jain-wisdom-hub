"use client";

import React, { useState, useRef } from "react";
import { tirthankaras } from "@/lib/tirthankara-data";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Volume2, VolumeX, Sparkles } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function TirthankarGalleryClient({ params }: { params: Promise<{ lang: string }> }) {
  const unwrappedParams = React.use(params);
  const lang = unwrappedParams.lang;
  
  // 1. Language Logic
  const l = (lang === "hi" || lang === "kn") ? lang : "en";
  const isIndic = lang === "hi" || lang === "kn";

  // 2. Audio State & Tactile Click
  const [soundEnabled, setSoundEnabled] = useState(true);

  const playTapSound = () => { 
    if (!soundEnabled) return; 
    try { 
      const a = new Audio("/sounds/resources/click2.mp3"); 
      a.volume = 0.65; 
      a.play().catch(()=>{}); 
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(12);
      }
    } catch (e) {} 
  };

  // 3. Translations for Static Text
  // Canonical reference compliance: Acharya Umāsvāmi (Tattvārtha Sūtra)
  const translations = {
    en: {
      library: "Library",
      lineage: "THE HOLY LINEAGE",
      title: "24 Tirthankaras",
      subtitle: "Omniscient Lords of the Jaina Canon — Acharya Umāsvāmi's Tattvārtha Sūtra",
      soundOn: "Sound Active",
      soundOff: "Sound Muted"
    },
    hi: {
      library: "लाइब्रेरी",
      lineage: "पवित्र वंश",
      title: "24 तीर्थंकर",
      subtitle: "सर्वज्ञ जिनेश्वर भगवान — आचार्य उमास्वामी रचित तत्त्वार्थ सूत्र",
      soundOn: "ध्वनि चालू",
      soundOff: "ध्वनि बंद"
    },
    kn: {
      library: "ಲೈಬ್ರರಿ",
      lineage: "ಪವಿತ್ರ ವಂಶ",
      title: "24 ತೀರ್ಥಂಕರರು",
      subtitle: "ಸರ್ವಜ್ಞ ಜಿನೇಶ್ವರ भगवान — ಆಚಾರ್ಯ ಉಮಾಸ್ವಾಮಿ ವಿರಚಿತ ತತ್ತ್ವಾರ್ಥ ಸೂತ್ರ",
      soundOn: "ಧ್ವನಿ ಸಕ್ರಿಯ",
      soundOff: "ಧ್ವನಿ ನಿಷ್ಕ್ರಿಯ"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white selection:bg-rose-500 selection:text-white p-6 md:p-12 transition-colors duration-500 relative overflow-x-hidden">
      
      {/* Background Divine Golden Illumination Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-amber-500/10 via-rose-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* FIXED NAVIGATION */}
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

      {/* FLOATING SOUND TOGGLE (Mandatory Positioning: fixed bottom-6 right-6 z-50) */}
      <button
        onClick={() => {
          setSoundEnabled(!soundEnabled);
          playTapSound();
        }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 px-4 py-3 rounded-full backdrop-blur-xl shadow-2xl transition-all duration-300"
        title={soundEnabled ? t.soundOn : t.soundOff}
      >
        {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
        <span className="text-xs font-semibold tracking-wider hidden md:inline">
          {soundEnabled ? t.soundOn : t.soundOff}
        </span>
      </button>

      <div className="max-w-[1800px] mx-auto pt-24 md:pt-20 relative z-10">
        <div className="mb-12 md:mb-20">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
            <h2 className="text-rose-600 dark:text-rose-500 font-bold tracking-[0.5em] text-xs md:text-base uppercase">
              {t.lineage}
            </h2>
          </div>
          
          <h1 className={`text-[12vw] md:text-9xl font-black uppercase tracking-tighter text-gray-900 dark:text-white/90 ${isIndic ? 'leading-tight' : 'leading-none'}`}>
            {t.title}
          </h1>

          <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm md:text-lg max-w-2xl font-light">
            {t.subtitle}
          </p>
        </div>

        {/* TIRTHANKAR GALLERY GRID WITH 3D TILT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 pb-20">
          {tirthankaras.map((item, index) => (
            <TiltCard 
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
      </div>
    </div>
  );
}

// =============================================================================
// GYROSCOPIC 3D TILT CARD COMPONENT WITH SPECULAR SHEEN & SPRING PHYSICS
// =============================================================================
interface TiltCardProps {
  item: typeof tirthankaras[number];
  index: number;
  lang: string;
  l: 'en' | 'hi' | 'kn';
  isIndic: boolean;
  onTap: () => void;
}

function TiltCard({ item, index, lang, l, isIndic, onTap }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Motion values for tilt rotation
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring physics configuration (stiffness: 300, damping: 25)
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 25 });

  // Transform rotation values for 3D perspective
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  // Sheen gradient offset based on mouse position mapped cleanly from -0.5..0.5 to 0%..100%
  const sheenX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const sheenY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

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

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!cardRef.current || !e.touches[0]) return;
    const rect = cardRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const width = rect.width;
    const height = rect.height;

    const touchX = touch.clientX - rect.left;
    const touchY = touch.clientY - rect.top;
    const xPct = touchX / width - 0.5;
    const yPct = touchY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  return (
    <Link 
      href={`/${lang}/tirthankars/${item.id}`} 
      onClick={onTap}
      className="block perspective-[1200px] outline-none group"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileTap={{ scale: 0.96 }}
        className="relative h-[420px] md:h-[520px] rounded-[2rem] bg-gradient-to-br from-gray-50/90 to-gray-100/90 dark:from-zinc-900/90 dark:to-zinc-950/90 overflow-hidden border border-amber-500/20 shadow-2xl shadow-rose-500/10 dark:shadow-rose-950/30 transition-shadow duration-500"
      >
        {/* Dynamic Specular Sheen Effect simulating divine golden illumination */}
        <motion.div 
          className="absolute inset-0 pointer-events-none z-30 opacity-0 group-hover:opacity-65 transition-opacity duration-700 mix-blend-screen"
          style={{
            background: useTransform(
              [sheenX, sheenY],
              ([latestX, latestY]) => 
                `radial-gradient(circle at ${latestX} ${latestY}, rgba(255,215,0,0.5) 0%, rgba(255,140,0,0.2) 35%, transparent 70%)`
            )
          }}
        />

        {/* Background Ambient Glow */}
        <div 
          className="absolute inset-0 opacity-15 dark:opacity-20 transition-opacity duration-700 group-hover:opacity-30"
          style={{ backgroundColor: item.colorHex }}
        />

        {/* Tirthankara Number Identifier (Z-Depth Layer: 30px) */}
        <div className="absolute top-6 left-8 z-10" style={{ transform: "translateZ(30px)" }}>
            <span className="text-6xl font-black text-gray-300/40 dark:text-white/10 group-hover:text-amber-500/30 transition-colors">
              {item.id}
            </span>
        </div>

        {/* Card Content & Image (Z-Depth Layer: 60px) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-6" style={{ transform: "translateZ(60px)" }}>
            <div className="relative w-full h-[60%] flex items-center justify-center transition-all duration-500 group-hover:-translate-y-8">
                <Image
                    src={item.tirthankaraImage}
                    alt={item.name[l]}
                    fill
                    priority={index < 4}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-contain drop-shadow-2xl p-4 transition-transform duration-700 group-hover:scale-105"
                />
            </div>

            {/* Text Information Panel (Z-Depth Layer: 40px) */}
            <div 
              className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-white via-white/95 to-transparent dark:from-black dark:via-black/90 dark:to-transparent flex flex-col items-start opacity-100 md:opacity-90 md:group-hover:opacity-100 transition-all duration-500"
              style={{ transform: "translateZ(40px)" }}
            >
               <div className="text-amber-600 dark:text-amber-400 text-xs font-bold tracking-widest mb-1 uppercase flex items-center gap-1">
                 <Sparkles className="w-3 h-3" />
                 {item.symbol[l]}
               </div>
               
               <h2 className={`text-3xl font-bold text-gray-900 dark:text-white mb-2 ${isIndic ? 'leading-normal' : ''}`}>
                 {item.name[l]}
               </h2>
               
               <div className="h-1 w-12 bg-amber-500/40 rounded-full mt-2 transition-all duration-500 group-hover:w-20"></div>
            </div>
        </div>
      </motion.div>
    </Link>
  );
}