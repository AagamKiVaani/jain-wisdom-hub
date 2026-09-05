"use client";

import React, { useRef, useState, useEffect } from "react";
import { tirthankaras } from "@/lib/tirthankara-data";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Volume2, VolumeX, Sparkles, Info } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// Next.js 15/16 App Router dynamic params type
interface PageProps {
  params: React.Usable<{ lang: string }>;
}

// 3D Tilt Card Component with Gyroscopic & Mouse Tracking
function TirthankarCard({
  t,
  index,
  lang,
  isIndic,
  soundEnabled,
}: {
  t: typeof tirthankaras[0];
  index: number;
  lang: string;
  isIndic: boolean;
  soundEnabled: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  // Motion values for tracking relative position (-0.5 to 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // High-performance spring physics (stiffness: 300, damping: 25)
  const springConfig = { stiffness: 300, damping: 25, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), springConfig);

  // Tactile spring compression on click
  const scale = useSpring(1, { stiffness: 400, damping: 15 });

  // Gyroscopic tracking for mobile devices
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.beta === null || e.gamma === null) return;

      // Normalize beta (pitch) and gamma (roll) to a [-0.5, 0.5] range
      // Centered around a natural 45-degree holding angle for pitch
      const pitch = (e.beta - 45) / 30;
      const roll = e.gamma / 30;

      const clampedPitch = Math.max(-0.5, Math.min(0.5, pitch));
      const clampedRoll = Math.max(-0.5, Math.min(0.5, roll));

      x.set(clampedRoll);
      y.set(clampedPitch);

      // Update specular glare sheen position based on gyro
      const glareEl = glareRef.current;
      if (glareEl) {
        const px = (clampedRoll + 0.5) * 100;
        const py = (clampedPitch + 0.5) * 100;
        glareEl.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 60%)`;
        glareEl.style.opacity = "1";
      }
    };

    // Listen to device orientation if supported
    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", handleOrientation, true);
    }

    return () => {
      if (window.DeviceOrientationEvent) {
        window.removeEventListener("deviceorientation", handleOrientation, true);
      }
    };
  }, [x, y]);

  // Play tactile click sound
  const playTapSound = () => {
    if (!soundEnabled) return;
    try {
      const audio = new Audio("/sounds/resources/click2.mp3");
      audio.volume = 0.65;
      audio.play().catch(() => {});
      if (typeof navigator !== "undefined" && navigator.vibrate) {
        navigator.vibrate(12);
      }
    } catch (e) {
      console.error("Audio playback failed", e);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate normalized coordinates (-0.5 to 0.5)
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;

    x.set(mouseX);
    y.set(mouseY);

    // Update specular glare sheen position
    const glareEl = glareRef.current;
    if (glareEl) {
      const px = ((e.clientX - rect.left) / width) * 100;
      const py = ((e.clientY - rect.top) / height) * 100;
      glareEl.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 60%)`;
      glareEl.style.opacity = "1";
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    scale.set(1);

    const glareEl = glareRef.current;
    if (glareEl) {
      glareEl.style.opacity = "0";
    }
  };

  const handleMouseDown = () => {
    scale.set(0.96);
    playTapSound();
  };

  const handleMouseUp = () => {
    scale.set(1);
  };

  // Touch support for mobile devices
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el || e.touches.length === 0) return;

    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const touch = e.touches[0];
    const touchX = (touch.clientX - rect.left) / width - 0.5;
    const touchY = (touch.clientY - rect.top) / height - 0.5;

    // Constrain touch coordinates to card boundaries
    if (touchX >= -0.5 && touchX <= 0.5 && touchY >= -0.5 && touchY <= 0.5) {
      x.set(touchX);
      y.set(touchY);

      const glareEl = glareRef.current;
      if (glareEl) {
        const px = ((touch.clientX - rect.left) / width) * 100;
        const py = ((touch.clientY - rect.top) / height) * 100;
        glareEl.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 60%)`;
        glareEl.style.opacity = "1";
      }
    }
  };

  const l = lang === "hi" || lang === "kn" ? lang : "en";

  return (
    <Link href={`/${lang}/tirthankars/${t.id}`} className="block outline-none min-h-[44px]">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: "preserve-3d",
          perspective: 1000,
        }}
        className="group relative h-[400px] md:h-[500px] rounded-[2rem] bg-gray-50 dark:bg-zinc-900/40 overflow-hidden transition-all duration-300 border border-gray-200/80 dark:border-white/5 hover:border-rose-500/40 dark:hover:border-rose-500/30 shadow-lg hover:shadow-2xl hover:shadow-rose-500/10 dark:hover:shadow-rose-900/20 cursor-pointer will-change-transform"
      >
        {/* Specular Glare Sheen Overlay */}
        <div
          ref={glareRef}
          className="absolute inset-0 z-30 pointer-events-none transition-opacity duration-300 opacity-0 mix-blend-color-dodge"
        />

        {/* Dynamic Color Ambient Glow */}
        <div
          className="absolute inset-0 transition-opacity duration-700 opacity-5 dark:opacity-10 group-hover:opacity-15 dark:group-hover:opacity-20"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${t.colorHex} 0%, transparent 70%)`,
          }}
        />

        {/* Tirthankar ID Number (Preserved with 3D Depth) */}
        <div className="absolute top-6 left-8 z-10" style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }}>
          <span className="text-6xl font-black text-gray-200/80 dark:text-white/5 group-hover:text-rose-500/20 dark:group-hover:text-white/10 transition-colors duration-500 block">
            {t.id}
          </span>
        </div>

        {/* Card Content Container */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-6" style={{ transformStyle: "preserve-3d" }}>
          {/* Image Container with 3D Depth */}
          <div
            className="relative w-full h-[60%] flex items-center justify-center transition-all duration-500 group-hover:-translate-y-8"
            style={{ transform: "translateZ(80px)", transformStyle: "preserve-3d" }}
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

          {/* Text Info Panel */}
          <div
            className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-white via-white/95 to-transparent dark:from-black dark:via-black/90 dark:to-transparent flex flex-col items-start opacity-100 md:opacity-90 md:group-hover:opacity-100 md:translate-y-2 md:group-hover:translate-y-0 transition-all duration-500"
            style={{ transform: "translateZ(50px)" }}
          >
            <div className="text-rose-600 dark:text-rose-500 text-xs font-bold tracking-widest mb-1 uppercase flex items-center gap-1.5">
              <Sparkles size={10} className="animate-pulse" />
              {t.symbol[l]}
            </div>

            {/* Name with Line-Height Fix */}
            <h2
              className={`text-3xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight ${
                isIndic ? "leading-normal" : ""
              }`}
            >
              {t.name[l]}
            </h2>

            {/* Visual cue */}
            <div className="h-1 w-12 bg-rose-500/30 dark:bg-white/20 rounded-full mt-2 group-hover:w-20 transition-all duration-500" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default function TirthankarGallery({ params }: PageProps) {
  const { lang } = React.use(params);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Language Logic
  const l = lang === "hi" || lang === "kn" ? lang : "en";
  const isIndic = lang === "hi" || lang === "kn";

  // Translations for Static Text
  const translations = {
    en: {
      library: "Library",
      lineage: "THE LINEAGE",
      title: "24 Tirthankaras",
      soundOn: "Sound On",
      soundOff: "Sound Muted",
      iconographyTitle: "Digambar Iconographical Standard",
      iconographyDesc: "In accordance with Digambar Jain Shastras, all Kevalis (Arihants) are depicted unclad (Digambaratva), unadorned, in absolute meditative equanimity (Vitaraga) with eyes half-open in Nasagra Drishti. Mallinath Bhagwan is revered strictly as a male Tirthankar who attained omniscience and moksha through complete renunciation.",
    },
    hi: {
      library: "लाइब्रेरी",
      lineage: "पवित्र वंश",
      title: "24 तीर्थंकर",
      soundOn: "ध्वनि चालू",
      soundOff: "ध्वनि बंद",
      iconographyTitle: "दिगंबर प्रतिमा लक्षण मानक",
      iconographyDesc: "दिगंबर जैन शास्त्रों के अनुसार, सभी केवली (अरिहंत) दिगंबर (निर्वस्त्र), आभूषणरहित, नासाग्र दृष्टि और पूर्ण वीतराग मुद्रा में विराजमान होते हैं। मल्लिनाथ भगवान को केवल पुरुष तीर्थंकर के रूप में स्वीकार किया गया है जिन्होंने पूर्ण दिगंबर दीक्षा धारण कर केवलज्ञान और मोक्ष प्राप्त किया।",
    },
    kn: {
      library: "ಲೈಬ್ರರಿ",
      lineage: "ಪವಿತ್ರ ವಂಶ",
      title: "24 ತೀರ್ಥಂಕರರು",
      soundOn: "ಧ್ವನಿ ಆನ್",
      soundOff: "ಧ್ವನಿ ಆಫ್",
      iconographyTitle: "ದಿಗಂಬರ ಜಿನ ಬಿಂಬ ಲಕ್ಷಣ",
      iconographyDesc: "ದಿಗಂಬರ ಜೈನ ಶಾಸ್ತ್ರಗಳ ಪ್ರಕಾರ, ಎಲ್ಲಾ ಕೇವಲಿಗಳು (ಅರಿಹಂತರು) ದಿಗಂಬರರಾಗಿ, ಆಭರಣರಹಿತರಾಗಿ, ನಾಸಾಗ್ರ ದೃಷ್ಟಿಯೊಂದಿಗೆ ವೀತರಾಗ ಮುದ್ರೆಯಲ್ಲಿರುತ್ತಾರೆ. ಮಲ್ಲಿನಾಥ ಭಗವಾನರನ್ನು ಕೇವಲ ಪುರುಷ ತೀರ್ಥಂಕರರೆಂದು ಪೂಜಿಸಲಾಗುತ್ತದೆ, ಅವರು ಪೂರ್ಣ ದಿಗಂಬರ ದೀಕ್ಷೆಯಿಂದ ಕೇವಲಜ್ಞಾನ ಮತ್ತು ಮೋಕ್ಷವನ್ನು ಪಡೆದರು.",
    },
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white selection:bg-rose-500 selection:text-white p-6 md:p-12 transition-colors duration-500 overflow-x-hidden">
      {/* 1. FIXED NAVIGATION */}
      <Link
        href={`/${lang}`}
        className="fixed top-20 left-4 md:top-24 md:left-8 z-50 flex items-center gap-2 text-gray-500 hover:text-rose-500 transition-all bg-white/80 dark:bg-black/50 px-4 py-2 rounded-full backdrop-blur-md border border-gray-200 dark:border-white/10 shadow-sm min-h-[44px]"
      >
        <ArrowLeft size={16} />
        <span className={`text-[10px] font-bold uppercase tracking-widest ${isIndic ? "text-xs" : ""}`}>
          {t.library}
        </span>
      </Link>

      {/* 2. FLOATING CONTROLS (Positioned strictly at bottom-6 right-6 to avoid navbar collision) */}
      <button
        onClick={() => setSoundEnabled(!soundEnabled)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-white/90 dark:bg-zinc-900/90 text-gray-700 dark:text-gray-200 hover:text-rose-500 dark:hover:text-rose-400 px-4 py-3 rounded-full shadow-lg hover:shadow-xl border border-gray-200/80 dark:border-white/10 backdrop-blur-md transition-all duration-300 min-h-[44px]"
        aria-label="Toggle Sound Feedback"
      >
        {soundEnabled ? (
          <>
            <Volume2 size={16} className="text-rose-500 animate-bounce" />
            <span className="text-xs font-semibold tracking-wider hidden sm:inline">{t.soundOn}</span>
          </>
        ) : (
          <>
            <VolumeX size={16} className="text-gray-400" />
            <span className="text-xs font-semibold tracking-wider hidden sm:inline text-gray-400">{t.soundOff}</span>
          </>
        )}
      </button>

      <div className="max-w-[1800px] mx-auto pt-24 md:pt-20">
        <div className="mb-12 md:mb-16">
          {/* TRANSLATED SUBTITLE */}
          <h2 className="text-rose-600 dark:text-rose-500 font-bold tracking-[0.5em] mb-4 text-xs md:text-base uppercase">
            {t.lineage}
          </h2>
          {/* TRANSLATED MAIN TITLE with Line-Height Fix */}
          <h1
            className={`text-[12vw] md:text-9xl font-black uppercase tracking-tighter text-gray-900 dark:text-white/90 ${
              isIndic ? "leading-tight" : "leading-none"
            }`}
          >
            {t.title}
          </h1>
        </div>

        {/* DIGAMBAR ICONOGRAPHY SCHOLARLY BANNER */}
        <div className="mb-12 p-6 rounded-3xl bg-rose-500/5 border border-rose-500/10 dark:border-rose-500/20 flex flex-col md:flex-row gap-4 items-start max-w-6xl">
          <div className="p-3 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-500 shrink-0">
            <Info size={24} />
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400 mb-1">
              {t.iconographyTitle}
            </h3>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {t.iconographyDesc}
            </p>
          </div>
        </div>

        {/* 3. 3D TILT CARD GRID (Preserving all 24 Tirthankaras) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 pb-20">
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

        {/* 4. REVERENT DIGAMBAR SCRIPTURAL QUOTE PANEL (Underneath the cards grid) */}
        <div className="border-t border-gray-200 dark:border-zinc-800 pt-16 pb-12 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-rose-500/10 text-rose-500 mb-6">
            <Sparkles size={20} />
          </div>
          
          {/* Quote 1: Samayasāra */}
          <div className="mb-12">
            <p className="text-lg md:text-xl font-serif italic text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              &ldquo;वंदित्तु सव्वसिद्धे धुवमचलमणुवमं गदिं पत्ते।<br />
              वोच्छामि समयपाहुडमिणमो सुदकेवलीभणिदं॥&rdquo;
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-4">
              &ldquo;Having bowed to all the Siddhas, who have attained the permanent, motionless, and incomparable state of liberation, I shall recite this Samayaprabhrita, as expounded by the omniscient scriptures.&rdquo;
            </p>
            <div className="text-xs uppercase tracking-[0.2em] text-rose-600 dark:text-rose-500 font-bold">
              — Acharya Kundakunda, Samayasāra, Gatha 1
            </div>
          </div>

          {/* Quote 2: Tattvārtha Sūtra */}
          <div className="mt-12 pt-8 border-t border-gray-100 dark:border-zinc-900">
            <p className="text-base md:text-lg font-serif text-gray-700 dark:text-gray-300 mb-2">
              &ldquo;सम्यग्दर्शनज्ञानचारित्राणि मोक्षमार्गः।&rdquo;
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-4">
              &ldquo;Right belief, right knowledge, and right conduct together constitute the path to liberation.&rdquo;
            </p>
            <div className="text-xs uppercase tracking-[0.2em] text-rose-600 dark:text-rose-500 font-bold">
              — Acharya Umāsvāmi, Tattvārtha Sūtra, Chapter 1, Sutra 1
            </div>
          </div>

          {/* Quote 3: Niyamasāra */}
          <div className="mt-12 pt-8 border-t border-gray-100 dark:border-zinc-900">
            <p className="text-base md:text-lg font-serif text-gray-700 dark:text-gray-300 mb-2">
              &ldquo;णमिऊण जिणं वीरं अणंतवरणाणदंसणसहावं।<br />
              वोच्छामि णियमसारं केवलिणिदं सुदधरेहिं॥&rdquo;
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-4">
              &ldquo;Having bowed to Lord Mahavira (Vira), whose nature is infinite supreme knowledge and perception, I shall declare the Niyamasara (the essence of the path), as expounded by the Kevalis and held by the Shruta-kevalis.&rdquo;
            </p>
            <div className="text-xs uppercase tracking-[0.2em] text-rose-600 dark:text-rose-500 font-bold">
              — Acharya Kundakunda, Niyamasāra, Gatha 2
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}