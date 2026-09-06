"use client";

import React, { useState, useEffect, useRef } from "react";
import { tirthankaras } from "@/lib/tirthankara-data";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Volume2, VolumeX, BookOpen, Sparkles } from "lucide-react";
import { 
  motion, 
  useMotionValue, 
  useTransform, 
  useSpring, 
  useMotionTemplate 
} from "framer-motion";

// ============================================================================
// 1. HIGH-PERFORMANCE GYROSCOPIC 3D TILT CARD COMPONENT (60FPS HARDWARE ACCELERATED)
// ============================================================================
function TirthankarCard({ 
  t, 
  index, 
  lang, 
  isIndic, 
  soundEnabled 
}: { 
  t: any; 
  index: number; 
  lang: string; 
  isIndic: boolean; 
  soundEnabled: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const l = (lang === "hi" || lang === "kn") ? lang : "en";

  // Normalized coordinates (0.5 is center)
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Ultra-smooth spring physics configuration matching premium hardware-accelerated feel
  const springConfig = { stiffness: 300, damping: 25, mass: 0.5 };
  
  // Map normalized coordinates to precise 3D rotation angles (max 14 degrees for controlled depth)
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [14, -14]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-14, 14]), springConfig);
  
  // Dynamic scale for tactile spring compression on click/touch
  const scale = useSpring(1, { stiffness: 400, damping: 20 });

  // Specular glare sheen tracking
  const glareX = useTransform(mouseX, [0, 1], [0, 100]);
  const glareY = useTransform(mouseY, [0, 1], [0, 100]);
  const glareOpacity = useSpring(0, { stiffness: 200, damping: 22 });
  
  // Dynamic CSS radial gradient for specular sheen
  const glareBg = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0) 65%)`;

  // Tactile Audio Click Feedback
  const playTapSound = () => {
    if (!soundEnabled) return;
    try {
      const a = new Audio("/sounds/resources/click2.mp3");
      a.volume = 0.65;
      a.play().catch(() => {});
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(12); // Subtle haptic vibration
      }
    } catch (e) {}
  };

  // Handle Mouse/Touch Move
  const handleMove = (clientX: number, clientY: number) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (clientX - rect.left) / rect.width;
    const y = (clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  // Device Gyroscope tracking for mobile devices
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    let isGranted = false;
    
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.beta === null || e.gamma === null) return;
      // Normalize beta (tilt front/back, typical range 15 to 60) and gamma (tilt left/right, typical range -30 to 30)
      const normX = (e.gamma + 30) / 60;
      const normY = (e.beta - 15) / 45;
      mouseX.set(Math.max(0, Math.min(1, normX)));
      mouseY.set(Math.max(0, Math.min(1, normY)));
      glareOpacity.set(0.4); // Maintain a subtle glare on mobile tilt
    };

    // Request orientation permissions for iOS 13+ devices
    const requestPermission = async () => {
      const DeviceOrientationEventClass = DeviceOrientationEvent as any;
      if (
        typeof DeviceOrientationEventClass !== 'undefined' &&
        typeof DeviceOrientationEventClass.requestPermission === 'function'
      ) {
        try {
          const permissionState = await DeviceOrientationEventClass.requestPermission();
          if (permissionState === 'granted') {
            isGranted = true;
            window.addEventListener("deviceorientation", handleOrientation);
          }
        } catch (error) {
          console.warn("DeviceOrientation permission request rejected:", error);
        }
      } else {
        window.addEventListener("deviceorientation", handleOrientation);
      }
    };

    requestPermission();

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, [mouseX, mouseY, glareOpacity]);

  return (
    <Link 
      href={`/${lang}/tirthankars/${t.id}`}
      onClick={playTapSound}
      className="block outline-none focus-visible:ring-2 focus-visible:ring-rose-500 rounded-[2rem]"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={(e) => {
          handleMove(e.clientX, e.clientY);
          glareOpacity.set(1);
        }}
        onMouseLeave={() => {
          mouseX.set(0.5);
          mouseY.set(0.5);
          glareOpacity.set(0);
          scale.set(1);
        }}
        onMouseEnter={() => {
          scale.set(1.02);
          playTapSound();
        }}
        onMouseDown={() => scale.set(0.96)}
        onMouseUp={() => scale.set(1.02)}
        onTouchStart={() => {
          scale.set(0.96);
          glareOpacity.set(1);
          playTapSound();
        }}
        onTouchEnd={() => {
          scale.set(1);
          glareOpacity.set(0);
        }}
        onTouchMove={(e) => {
          if (e.touches[0]) {
            handleMove(e.touches[0].clientX, e.touches[0].clientY);
          }
        }}
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: "preserve-3d",
          perspective: 1200,
        }}
        className="group relative h-[420px] md:h-[520px] rounded-[2rem] bg-gradient-to-b from-gray-50 to-gray-100 dark:from-zinc-900/60 dark:to-zinc-950/80 overflow-hidden transition-all border border-rose-500/20 dark:border-zinc-800/80 shadow-xl hover:shadow-2xl hover:border-rose-500/50 dark:hover:border-rose-500/30 will-change-transform"
      >
        {/* Layer 1: Dynamic Specular Glare Sheen Layer (Z-Index 40) */}
        <motion.div 
          className="absolute inset-0 z-40 pointer-events-none mix-blend-overlay"
          style={{ 
            background: glareBg,
            opacity: glareOpacity,
            transform: "translateZ(80px)"
          }} 
        />

        {/* Layer 2: Dynamic Background Ambient Glow */}
        <div 
          className="absolute inset-0 transition-opacity duration-700 opacity-10 dark:opacity-15 group-hover:opacity-30 pointer-events-none"
          style={{ backgroundColor: t.colorHex }}
        />

        {/* Layer 3: Sacred Geometric Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:16px_28px] pointer-events-none" />

        {/* Layer 4: Tirthankar ID Watermark (Z-Index 10, Z-Depth 20px) */}
        <div className="absolute top-6 left-8 z-10 select-none pointer-events-none" style={{ transform: "translateZ(20px)" }}>
          <span className="text-7xl font-black text-gray-200/80 dark:text-white/5 group-hover:text-rose-500/15 dark:group-hover:text-rose-500/10 transition-colors duration-500">
            {t.id}
          </span>
        </div>

        {/* Layer 5: Card Content Container (Z-Index 20, transformStyle preserve-3d) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-6" style={{ transformStyle: "preserve-3d" }}>
          
          {/* Image Container with High Z-Depth Elevation (Z-Depth 60px) */}
          <div 
            className="relative w-full h-[55%] flex items-center justify-center transition-all duration-500 md:group-hover:-translate-y-6"
            style={{ transform: "translateZ(60px)" }}
          >
            <Image
              src={t.tirthankaraImage}
              alt={t.name[l]}
              fill
              priority={index < 4}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-contain drop-shadow-[0_25px_40px_rgba(0,0,0,0.18)] dark:drop-shadow-[0_25px_40px_rgba(255,255,255,0.06)] p-4 transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Text Info Panel with Mid Z-Depth Elevation (Z-Depth 40px) */}
          <div 
            className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-white via-white/95 to-transparent dark:from-black dark:via-black/95 dark:to-transparent flex flex-col items-start transition-all duration-500"
            style={{ transform: "translateZ(40px)" }}
          >
             <div className="flex items-center gap-2 text-rose-600 dark:text-rose-500 text-xs font-bold tracking-widest mb-1 uppercase">
               <Sparkles size={12} className="animate-pulse" />
               <span>{t.symbol[l]}</span>
             </div>
             
             <h2 className={`text-3xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight ${isIndic ? 'leading-normal' : ''}`}>
               {t.name[l]}
             </h2>
             
             <div className="h-1 w-12 bg-rose-500/30 dark:bg-rose-500/20 rounded-full mt-2 group-hover:w-24 transition-all duration-500" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

// ============================================================================
// 2. MAIN CLIENT GALLERY COMPONENT (DIGAMBAR CANONICAL WISDOM HUB)
// ============================================================================
export default function TirthankarGallery({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = React.use(params);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const l = (lang === "hi" || lang === "kn") ? lang : "en";
  const isIndic = lang === "hi" || lang === "kn";

  const translations = {
    en: {
      library: "Library",
      lineage: "THE LINEAGE",
      title: "24 Tirthankaras",
      scriptureTitle: "Digambar Canonical Wisdom",
      soundOn: "Sound On",
      soundOff: "Sound Muted"
    },
    hi: {
      library: "लाइब्रेरी",
      lineage: "पवित्र वंश",
      title: "24 तीर्थंकर",
      scriptureTitle: "दिगंबर आगम सूत्र",
      soundOn: "ध्वनि चालू",
      soundOff: "ध्वनि बंद"
    },
    kn: {
      library: "ಲೈಬ್ರರಿ",
      lineage: "ಪವಿತ್ರ ವಂಶ",
      title: "24 ತೀರ್ಥಂಕರರು",
      scriptureTitle: "ದಿಗಂಬರ ಆಗಮ ಸೂತ್ರ",
      soundOn: "ಧ್ವನಿ ಆನ್",
      soundOff: "ಧ್ವನಿ ಆಫ್"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white selection:bg-rose-500 selection:text-white p-6 md:p-12 transition-colors duration-500 relative overflow-x-hidden">
      
      {/* Subtle background ambient glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* 1. FIXED NAVIGATION */}
      <Link 
        href={`/${lang}`} 
        className="fixed top-20 left-4 md:top-24 md:left-8 z-50 flex items-center gap-2 text-gray-500 hover:text-rose-500 transition-all bg-white/80 dark:bg-black/50 px-4 py-2 rounded-full backdrop-blur-md border border-gray-200 dark:border-white/10 shadow-sm min-h-[44px]"
      >
        <ArrowLeft size={16} /> 
        <span className={`text-[10px] font-bold uppercase tracking-widest ${isIndic ? 'text-xs' : ''}`}>
          {t.library}
        </span>
      </Link>

      {/* 2. MAIN CONTENT CONTAINER */}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 pb-20">
          {tirthankaras.map((item, index) => (
            <TirthankarCard 
              key={item.id}
              t={item}
              index={index}
              lang={lang}
              isIndic={isIndic}
              soundEnabled={soundEnabled}
            />
          ))}
        </div>

        {/* 4. DIGAMBAR SCRIPTURE PANEL (Strictly Cited Canonical Wisdom) */}
        <div className="border-t border-gray-200 dark:border-zinc-800 pt-16 pb-24 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center gap-2 text-rose-600 dark:text-rose-500 mb-6">
            <BookOpen size={20} />
            <span className="text-xs font-bold tracking-[0.3em] uppercase">{t.scriptureTitle}</span>
          </div>
          
          <div className="space-y-12">
            {/* Verse 1: Tattvārtha Sūtra */}
            <div className="space-y-4">
              <p className="text-xl md:text-2xl font-serif text-gray-800 dark:text-zinc-200 italic leading-relaxed">
                "सम्यग्दर्शनज्ञानचारित्राणि मोक्षमार्गः॥"
              </p>
              <p className="text-sm text-gray-500 dark:text-zinc-400 max-w-2xl mx-auto">
                "Right faith, right knowledge, and right conduct together constitute the path to liberation (Moksha)."
              </p>
              <p className="text-xs font-semibold text-rose-600/80 dark:text-rose-500/80 tracking-wider uppercase">
                — Acharya Umāsvāmi, Tattvārtha Sūtra (Chapter 1, Sutra 1)
              </p>
            </div>

            {/* Verse 2: Samayasāra */}
            <div className="space-y-4 pt-6 border-t border-gray-100 dark:border-zinc-900">
              <p className="text-xl md:text-2xl font-serif text-gray-800 dark:text-zinc-200 italic leading-relaxed">
                "वंदित्तु सव्वसिद्धे धुवमचलमणुवमं गदिं पत्ते। वोच्छामि समयपाहुडमिणमो सुदकेवलीभणिदं॥"
              </p>
              <p className="text-sm text-gray-500 dark:text-zinc-400 max-w-2xl mx-auto">
                "Having bowed to all the Siddhas, who have attained the permanent, motionless, and incomparable state of liberation, I shall recite this Samayaprabhrita (Samayasāra)."
              </p>
              <p className="text-xs font-semibold text-rose-600/80 dark:text-rose-500/80 tracking-wider uppercase">
                — Acharya Kundakunda, Samayasāra (Gatha 1)
              </p>
            </div>

            {/* Verse 3: Ratnakaranda Shrāvakāchāra */}
            <div className="space-y-4 pt-6 border-t border-gray-100 dark:border-zinc-900">
              <p className="text-xl md:text-2xl font-serif text-gray-800 dark:text-zinc-200 italic leading-relaxed">
                "नमः श्रीवर्धमानाय निर्धूतकलिलात्मने। सालोकानां त्रिलोकानां यद्विद्या दर्पणायते॥"
              </p>
              <p className="text-sm text-gray-500 dark:text-zinc-400 max-w-2xl mx-auto">
                "I bow to Sri Vardhamāna (Mahāvīra) who has washed away all the impurities of karmas, and whose omniscience (Kevala Jnana) reflects the entire universe (loka and aloka) like a mirror."
              </p>
              <p className="text-xs font-semibold text-rose-600/80 dark:text-rose-500/80 tracking-wider uppercase">
                — Acharya Samantabhadra, Ratnakaranda Shrāvakāchāra (Mangalācharana, Verse 1)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 5. MANDATED FLOATING CONTROLS (Sound Toggle - Docked at bottom-6 right-6) */}
      <button
        onClick={() => setSoundEnabled(!soundEnabled)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-white/90 dark:bg-zinc-900/90 text-gray-700 dark:text-zinc-300 hover:text-rose-500 dark:hover:text-rose-400 px-4 py-3 rounded-full shadow-lg border border-gray-200 dark:border-zinc-800 backdrop-blur-md transition-all hover:scale-105 active:scale-95 min-h-[44px]"
        aria-label="Toggle Sound"
      >
        {soundEnabled ? (
          <>
            <Volume2 size={16} className="animate-pulse" />
            <span className="text-[10px] font-bold tracking-wider uppercase hidden sm:inline">{t.soundOn}</span>
          </>
        ) : (
          <>
            <VolumeX size={16} />
            <span className="text-[10px] font-bold tracking-wider uppercase hidden sm:inline">{t.soundOff}</span>
          </>
        )}
      </button>
    </div>
  );
}