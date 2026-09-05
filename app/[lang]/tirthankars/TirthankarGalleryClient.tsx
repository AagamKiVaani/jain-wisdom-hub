"use client";

import React, { useState, useEffect, useRef } from "react";
import { tirthankaras } from "@/lib/tirthankara-data";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Volume2, VolumeX, Compass, Sparkles } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";

// ==========================================
// 3D TILT CARD COMPONENT (HIGH PERFORMANCE)
// ==========================================
function TiltCard({ 
  t, 
  index, 
  lang, 
  isIndic, 
  soundEnabled, 
  playTapSound 
}: { 
  t: any; 
  index: number; 
  lang: string; 
  isIndic: boolean; 
  soundEnabled: boolean; 
  playTapSound: () => void; 
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for tracking normalized coordinates (-0.5 to 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // High-fidelity spring configuration (stiffness: 300, damping: 25)
  const springConfig = { stiffness: 300, damping: 25, mass: 0.5 };

  // Smooth springs for rotation and translation
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), springConfig);
  
  // Specular glare position tracking
  const glareX = useSpring(useTransform(x, [-0.5, 0.5], [0, 100]), springConfig);
  const glareY = useSpring(useTransform(y, [-0.5, 0.5], [0, 100]), springConfig);

  // Spring-loaded compression scale
  const scale = useSpring(1, springConfig);

  // Multi-plane Z-depth layers driven by springs for smooth parallax transitions
  const imgZ = useSpring(isHovered ? 80 : 20, springConfig);
  const textZ = useSpring(isHovered ? 50 : 10, springConfig);
  const bgNumberZ = useSpring(isHovered ? 30 : 5, springConfig);

  // Dynamic specular glare background gradient using useMotionTemplate for hardware acceleration
  const glareBg = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 60%)`;

  // Dynamic shadow translation to simulate realistic physical elevation
  const shadowX = useTransform(x, [-0.5, 0.5], [15, -15]);
  const shadowY = useTransform(y, [-0.5, 0.5], [15, -15]);
  const shadowBlur = useTransform(scale, [0.96, 1, 1.05], [10, 20, 40]);
  const shadowOpacity = useTransform(scale, [0.96, 1, 1.05], [0.1, 0.15, 0.25]);
  const cardShadow = useMotionTemplate`${shadowX}px ${shadowY}px ${shadowBlur}px rgba(0, 0, 0, ${shadowOpacity})`;

  // Handle Mouse Movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Normalize coordinates to range [-0.5, 0.5]
    x.set((mouseX / width) - 0.5);
    y.set((mouseY / height) - 0.5);
  };

  // Reset on Mouse Leave
  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
    scale.set(1);
  };

  // Mouse Enter
  const handleMouseEnter = () => {
    setIsHovered(true);
    scale.set(1.02);
  };

  // Mouse Down (Tactile Compression)
  const handleMouseDown = () => {
    scale.set(0.96);
    playTapSound();
  };

  // Mouse Up
  const handleMouseUp = () => {
    scale.set(1.02);
  };

  // Device Orientation (Gyroscopic Tilt for Mobile)
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (isHovered) return; // Prioritize mouse hover if active
      if (e.beta === null || e.gamma === null) return;

      // Map beta (front/back tilt) and gamma (left/right tilt) to normalized range
      const betaNormalized = Math.max(-25, Math.min(25, e.beta - 45)) / 25; // Offset for natural holding angle
      const gammaNormalized = Math.max(-25, Math.min(25, e.gamma)) / 25;

      x.set(gammaNormalized * 0.4);
      y.set(betaNormalized * 0.4);
    };

    window.addEventListener("deviceorientation", handleOrientation);
    return () => window.removeEventListener("deviceorientation", handleOrientation);
  }, [isHovered, x, y]);

  const l = (lang === "hi" || lang === "kn") ? lang : "en";

  return (
    <Link href={`/${lang}/tirthankars/${t.id}`} className="block outline-none">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        style={{
          transformStyle: "preserve-3d",
          transform: "perspective(1200px)",
          rotateX,
          rotateY,
          scale,
          boxShadow: cardShadow,
        }}
        className="group relative h-[400px] md:h-[500px] rounded-[2rem] bg-gray-50 dark:bg-zinc-900/40 overflow-hidden transition-all border border-gray-200 dark:border-white/5 hover:border-amber-500/40 dark:hover:border-amber-500/30 will-change-transform"
      >
        {/* Specular Glare Overlay */}
        <motion.div 
          className="absolute inset-0 z-30 pointer-events-none mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: glareBg }}
        />

        {/* Dynamic Background Glow */}
        <div 
          className="absolute inset-0 transition-opacity duration-700 opacity-5 dark:opacity-10 group-hover:opacity-15 dark:group-hover:opacity-20"
          style={{ backgroundColor: t.colorHex || "#f59e0b" }}
        />

        {/* Subtle Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />

        {/* Tirthankara ID (Large Background Number with Parallax) */}
        <motion.div 
          style={{ transformStyle: "preserve-3d", translateZ: bgNumberZ }}
          className="absolute top-6 left-8 z-10 select-none pointer-events-none"
        >
          <span className="text-7xl font-black text-gray-200/60 dark:text-white/5 group-hover:text-amber-500/10 dark:group-hover:text-amber-500/10 transition-colors duration-500">
            {t.id}
          </span>
        </motion.div>

        {/* Card Content Wrapper with 3D Depth */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-6" style={{ transformStyle: "preserve-3d" }}>
          
          {/* Image Container with Parallax translateZ */}
          <motion.div 
            className="relative w-full h-[60%] flex items-center justify-center transition-all duration-500 group-hover:-translate-y-6"
            style={{ transformStyle: "preserve-3d", translateZ: imgZ }}
          >
            <Image
              src={t.tirthankaraImage}
              alt={t.name[l]}
              fill
              priority={index < 4}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_20px_50px_rgba(245,158,11,0.1)] p-4 transition-transform duration-500 group-hover:scale-105"
            />
          </motion.div>

          {/* Text Info Panel with Parallax translateZ */}
          <motion.div 
            className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-white via-white/95 to-transparent dark:from-black dark:via-black/95 dark:to-transparent flex flex-col items-start transition-all duration-500"
            style={{ translateZ: textZ }}
          >
            {/* Symbol / Lanchhana */}
            <div className="text-amber-600 dark:text-amber-500 text-xs font-bold tracking-widest mb-1 uppercase flex items-center gap-1.5">
              <Sparkles size={12} className="animate-pulse" />
              <span>{t.symbol[l]}</span>
            </div>
            
            {/* Name */}
            <h2 className={`text-3xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight ${isIndic ? 'leading-normal' : ''}`}>
              {t.name[l]}
            </h2>
            
            {/* Visual Cue Indicator */}
            <div className="h-1 w-12 bg-amber-500/30 dark:bg-amber-500/20 rounded-full mt-2 group-hover:w-20 transition-all duration-500" />
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
  const [gyroActive, setGyroActive] = useState(false);

  // Language Logic
  const l = (lang === "hi" || lang === "kn") ? lang : "en";
  const isIndic = lang === "hi" || lang === "kn";

  // Translations for Static Text
  const translations = {
    en: {
      library: "Library",
      lineage: "THE HOLY LINEAGE",
      title: "24 Tirthankaras",
      soundOn: "Sound On",
      soundOff: "Sound Muted",
      gyroActive: "Gyro Active",
      gyroInactive: "Gyro Ready",
      scriptureTitle: "Digambar Aagam Archival Testimony",
      scriptureSub: "Authorized Scriptural Citations on Omniscience & Liberation"
    },
    hi: {
      library: "लाइब्रेरी",
      lineage: "पवित्र वंश परंपरा",
      title: "24 तीर्थंकर",
      soundOn: "ध्वनि चालू",
      soundOff: "ध्वनि बंद",
      gyroActive: "जायरो सक्रिय",
      gyroInactive: "जायरो तैयार",
      scriptureTitle: "दिगंबर आगम प्रमाण",
      scriptureSub: "केवलज्ञान एवं मोक्ष मार्ग पर प्रामाणिक शास्त्र वचन"
    },
    kn: {
      library: "ಲೈಬ್ರರಿ",
      lineage: "ಪವತ್ರ ವಂಶ",
      title: "24 ತೀರ್ಥಂಕರರು",
      soundOn: "ಧ್ವನಿ ಆನ್",
      soundOff: "ಧ್ವನಿ ಆಫ್",
      gyroActive: "ಗೈರೊ ಸಕ್ರಿಯ",
      gyroInactive: "ಗೈರೊ ಸಿದ್ಧ",
      scriptureTitle: "ದಿಗಂಬರ ಆಗಮ ಪ್ರಮಾಣ",
      scriptureSub: "ಕೇವಲಜ್ಞಾನ ಮತ್ತು ಮೋಕ್ಷ ಮಾರ್ಗದ ಮೇಲಿನ ಅಧಿಕೃತ ಶಾಸ್ತ್ರ ವಾಕ್ಯಗಳು"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  // Sound Player
  const playTapSound = () => {
    if (!soundEnabled) return;
    try {
      const audio = new Audio("/sounds/resources/click2.mp3");
      audio.volume = 0.65;
      audio.play().catch(() => {});
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(12);
      }
    } catch (e) {}
  };

  // Request Gyroscope Permission (iOS 13+ & Android compatibility)
  const requestGyroPermission = async () => {
    if (
      typeof window !== "undefined" &&
      typeof (DeviceOrientationEvent as any).requestPermission === "function"
    ) {
      try {
        const permissionState = await (DeviceOrientationEvent as any).requestPermission();
        if (permissionState === "granted") {
          setGyroActive(true);
          playTapSound();
        } else {
          setGyroActive(false);
        }
      } catch (error) {
        console.error("DeviceOrientation permission request failed:", error);
      }
    } else if (typeof window !== "undefined" && "ondeviceorientation" in window) {
      setGyroActive(true);
      playTapSound();
    }
  };

  // Check for Device Orientation Support on Mount
  useEffect(() => {
    if (typeof window !== "undefined" && window.DeviceOrientationEvent) {
      // If permission API is not required, set active immediately
      if (typeof (DeviceOrientationEvent as any).requestPermission !== "function") {
        setGyroActive(true);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white selection:bg-amber-500 selection:text-black p-6 md:p-12 transition-colors duration-500">
      
      {/* 1. FIXED NAVIGATION */}
      <Link 
        href={`/${lang}`} 
        onClick={playTapSound}
        className="fixed top-20 left-4 md:top-24 md:left-8 z-50 flex items-center gap-2 text-gray-500 hover:text-amber-600 dark:hover:text-amber-500 transition-all bg-white/80 dark:bg-black/50 px-4 py-2 rounded-full backdrop-blur-md border border-gray-200 dark:border-white/10 shadow-sm min-h-[44px] min-w-[44px]"
      >
        <ArrowLeft size={16} /> 
        <span className={`text-[10px] font-bold uppercase tracking-widest ${isIndic ? 'text-xs' : ''}`}>
          {t.library}
        </span>
      </Link>

      {/* 2. MAIN GALLERY CONTAINER */}
      <div className="max-w-[1800px] mx-auto pt-24 md:pt-20">
        <div className="mb-12 md:mb-20">
          {/* Subtitle */}
          <h2 className="text-amber-600 dark:text-amber-500 font-bold tracking-[0.5em] mb-4 text-xs md:text-base uppercase">
            {t.lineage}
          </h2>
          {/* Main Title */}
          <h1 className={`text-[12vw] md:text-9xl font-black uppercase tracking-tighter text-gray-900 dark:text-white/90 ${isIndic ? 'leading-tight' : 'leading-none'}`}>
            {t.title}
          </h1>
        </div>

        {/* 3. INTERACTIVE 3D GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 pb-20">
          {tirthankaras.map((item, index) => (
            <TiltCard 
              key={item.id}
              t={item}
              index={index}
              lang={lang}
              isIndic={isIndic}
              soundEnabled={soundEnabled}
              playTapSound={playTapSound}
            />
          ))}
        </div>

        {/* 4. REVERENT DIGAMBAR SCRIPTURAL PANEL */}
        <div className="mt-12 mb-24 p-8 md:p-12 rounded-[2.5rem] bg-amber-500/[0.02] dark:bg-amber-500/[0.01] border border-amber-500/10 dark:border-amber-500/5 max-w-5xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col items-center text-center space-y-6 relative z-10">
            <div className="p-3 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-500">
              <Sparkles size={24} />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xs font-bold tracking-[0.3em] text-amber-600 dark:text-amber-500 uppercase">
                {t.scriptureTitle}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                {t.scriptureSub}
              </p>
            </div>

            <div className="h-[1px] w-24 bg-amber-500/20" />

            {/* Verse 1: Tattvārtha Sūtra */}
            <div className="space-y-3 max-w-3xl">
              <p className="text-xl md:text-2xl font-serif text-amber-900 dark:text-amber-100/90 leading-relaxed font-semibold">
                “सम्यग्दर्शनज्ञानचारित्राणि मोक्षमार्गः॥”
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                “Right faith, right knowledge, and right conduct together constitute the path to liberation (Moksha).”
              </p>
              <p className="text-xs font-bold tracking-wider text-amber-600/80 dark:text-amber-500/80 uppercase">
                — Acharya Umāsvāmi, Tattvārtha Sūtra (Chapter 1, Sutra 1)
              </p>
            </div>

            <div className="h-[1px] w-12 bg-amber-500/10 my-4" />

            {/* Verse 2: Pravachanasāra */}
            <div className="space-y-3 max-w-3xl">
              <p className="text-xl md:text-2xl font-serif text-amber-900 dark:text-amber-100/90 leading-relaxed font-semibold">
                “मग्गो मग्गफलं ति य दुविहं जिणसासणे समक्खादं।<br />
                मग्गो मोक्खउवाओ तस्स फलं चेव णिव्वाणं॥”
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                “The path and the fruit of the path are two aspects declared in the Jina's teaching. The path is the means to liberation (total renunciation/Digambaratva), and its fruit is Nirvana.”
              </p>
              <p className="text-xs font-bold tracking-wider text-amber-600/80 dark:text-amber-500/80 uppercase">
                — Acharya Kundkund, Pravachanasāra (Gatha 7)
              </p>
            </div>

            <div className="h-[1px] w-12 bg-amber-500/10 my-4" />

            {/* Theological Note on Digambar Iconography */}
            <div className="max-w-2xl text-xs text-gray-400 dark:text-zinc-500 leading-relaxed text-justify md:text-center">
              <span className="font-semibold text-amber-600/80 dark:text-amber-500/80">Iconographical Mandate:</span> In accordance with the sacred Digambar tradition, all 24 Tirthankaras (including Mallinath Bhagwan, who renounced his kingdom as a male king to attain Omniscience) are depicted strictly unclad, unadorned, and in deep introspective meditation (Nasagra drishti). Having attained Kevala Jnana, they are completely free from physical hunger (Kavalahara), thirst, sleep, and fatigue.
            </div>
          </div>
        </div>
      </div>

      {/* 5. FLOATING CONTROLS (MANDATED POSITIONING: fixed bottom-6 right-6 z-50) */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-white/90 dark:bg-zinc-950/90 p-2 rounded-full border border-gray-200 dark:border-white/10 shadow-xl backdrop-blur-md">
        {/* Gyroscope Status Indicator / Activation Button */}
        <button
          onClick={requestGyroPermission}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-zinc-900 text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-zinc-400 hover:bg-gray-200 dark:hover:bg-zinc-800 transition-colors min-h-[44px]"
          aria-label="Request Gyroscope Access"
        >
          <Compass size={12} className={gyroActive ? "animate-spin text-amber-500" : "text-gray-400"} style={{ animationDuration: '6s' }} />
          <span className="hidden sm:inline">{gyroActive ? t.gyroActive : t.gyroInactive}</span>
        </button>

        {/* Sound Toggle Button */}
        <button
          onClick={() => {
            setSoundEnabled(!soundEnabled);
            if (!soundEnabled) {
              try {
                const audio = new Audio("/sounds/resources/click2.mp3");
                audio.volume = 0.65;
                audio.play().catch(() => {});
              } catch (e) {}
            }
          }}
          className="p-2.5 rounded-full bg-amber-500 text-black hover:bg-amber-400 transition-colors shadow-md flex items-center justify-center min-h-[44px] min-w-[44px]"
          aria-label="Toggle Sound"
        >
          {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </button>
      </div>
    </div>
  );
}