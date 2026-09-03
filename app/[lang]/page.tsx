"use client";

import React, { use, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring, useTransform, useMotionValue } from "framer-motion";
import { Users, ArrowRight, Ghost, Clock, Sparkles, BookOpen, Scroll, ShieldCheck } from "lucide-react";
import DailyWisdom from "@/components/DailyWisdom";
import { getTodaysQuote } from "@/lib/quoteService";

// Translations Object
const translations = {
  en: {
    badge: "Digital Aagam Alpha 1.0",
    title: "The Path of Wisdom",
    subtitle: "Explore the ancient, unadorned truth of the soul, karma, and cosmic cycles through pure Digambar Jain canon.",
    c1_title: "24 Tirthankaras", c1_sub: "The Sacred Gallery",
    c2_title: "Namokar Mantra", c2_sub: "The Eternal Prayer",
    c3_title: "Wheel of Time", c3_sub: "The Cosmic Cycle",
    c4_title: "Soul & Karma", c4_sub: "The Physics of Soul",
    c5_title: "Resources Hub", c5_sub: "Download Notes & PDFs",
    timeline_title: "The Chronology of Divine Sound",
    timeline_sub: "Trace the unbroken lineage of Digambar Aagam from the Divya Dhwani of the Omniscient Kevali to the written Shastras."
  },
  hi: {
    badge: "डिजिटल आगम अल्फा 1.0",
    title: "ज्ञान का मार्ग",
    subtitle: "शुद्ध दिगंबर जैन आगम के माध्यम से आत्मा, कर्म और कालचक्र के अनादि सत्य का अन्वेषण करें।",
    c1_title: "24 तीर्थंकर", c1_sub: "तीर्थंकर दर्शन",
    c2_title: "णमोकार मंत्र", c2_sub: "अनादि मंत्र",
    c3_title: "कालचक्र", c3_sub: "समय का चक्र",
    c4_title: "आत्मा और कर्म", c4_sub: "कर्म सिद्धांत",
    c5_title: "संसाधन केंद्र", c5_sub: "नोट्स डाउनलोड करें",
    timeline_title: "दिव्य ध्वनि का कालक्रम",
    timeline_sub: "सर्वज्ञ केवली की दिव्यध्वनि से लेकर लिखित शास्त्रों तक दिगंबर आगम की अटूट परंपरा का अनुकरण करें।"
  },
  kn: {
    badge: "ಡಿಜಿಟಲ್ ಆಗಮ ಆಲ್ಫಾ 1.0",
    title: "ಜ್ಞಾನದ ಮಾರ್ಗ",
    subtitle: "ಶುದ್ಧ ದಿಗಂಬರ ಜೈನ ಆಗಮದ ಮೂಲಕ ಆತ್ಮ, ಕರ್ಮ ಮತ್ತು ಕಾಲಚಕ್ರದ ಶಾಶ್ವತ ಸತ್ಯವನ್ನು ಅನ್ವೇಷಿಸಿ.",
    c1_title: "24 ತೀರ್ಥಂಕರರು", c1_sub: "ಪವಿತ್ರ ದರ್ಶನ",
    c2_title: "ನಮೋಕಾರ ಮಂತ್ರ", c2_sub: "ಶಾಶ್ವತ ಪ್ರಾರ್ಥನೆ",
    c3_title: "ಕಾಲಚಕ್ರ", c3_sub: "ವಿಶ್ವದ ಚಕ್ರ",
    c4_title: "ಆತ್ಮ ಮತ್ತು ಕರ್ಮ", c4_sub: "ಆತ್ಮದ ವಿಜ್ಞಾನ",
    c5_title: "ಸಂಪನ್ಮೂಲಗಳು", c5_sub: "ಟಿಪ್ಪಣಿಗಳನ್ನು ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ",
    timeline_title: "ದಿವ್ಯ ಧ್ವನಿಯ ಕಾಲಾನುಕ್ರಮ",
    timeline_sub: "ಸರ್ವಜ್ಞ ಕೇವಲಿಯ ದಿವ್ಯ ಧ್ವನಿಯಿಂದ ಲಿಖಿತ ಶಾಸ್ತ್ರಗಳವರೆಗೆ ದಿಗಂಬರ ಆಗಮದ ಅವಿಚ್ಛಿನ್ನ ಪರಂಪರೆಯನ್ನು ಅನುಸರಿಸಿ."
  }
};

// Authoritative Digambar Timeline Data
const timelineEvents = [
  {
    era: "569 BCE – 527 BCE",
    title: "Divya Dhwani of Bhagwan Mahavira",
    description: "The divine, non-vocal resonance (Divya Dhwani) flows from the unclad, omniscient Lord Mahavira in the Samavasarana. He is free from hunger (Kavalahara), thirst, and sleep, gazing with peaceful Nasagra Drishti.",
    source: "Pravachanasāra (Acharya Kundakunda, Gatha 1.20)",
    sanskrit: "न विणा विहदि विहारी ण य भुंजदि कवलहारमप्पाणं।",
    translation: "The Kevali does not take physical morsels of food (Kavalahara), yet possesses infinite energy."
  },
  {
    era: "1st Century CE",
    title: "Shatkhandāgama Compilation",
    description: "Acharya Dharasena, possessing the last remnants of oral Purva knowledge, initiates Acharya Pushpadanta and Acharya Bhutabali, who write the first written Digambar scripture on palm leaves.",
    source: "Shatkhandāgama (Book 1, Mangalacharan)",
    sanskrit: "णमो अरिहंताणं णमो सिद्धाणं...",
    translation: "The eternal salutation to the five supreme souls, establishing the written foundation of Digambar canon."
  },
  {
    era: "2nd Century CE",
    title: "Samayasāra & Pravachanasāra",
    description: "Acharya Kundakunda, the light of the Mula Sangha, writes the ultimate spiritual treatises on the pure, unattached nature of the soul (Shuddhatma) and absolute renunciation (Digambaratva).",
    source: "Samayasāra (Acharya Kundakunda, Gatha 1)",
    sanskrit: "वंदितु सव्वसिद्धे धुवमचलमणुवमं गदिं पत्ते।",
    translation: "I bow to all the Siddhas, who have attained the changeless, motionless, and incomparable state of liberation."
  },
  {
    era: "2nd Century CE",
    title: "Tattvārtha Sūtra",
    description: "Acharya Umāsvāmi compiles the entire Jain philosophy in precise Sanskrit aphorisms, defining the path to liberation as the unified trinity of right belief, knowledge, and conduct.",
    source: "Tattvārtha Sūtra (Acharya Umāsvāmi, 1.1)",
    sanskrit: "सम्यग्दर्शनज्ञानचारित्राणि मोक्षमार्गः।",
    translation: "Right belief, right knowledge, and right conduct together constitute the path to liberation."
  }
];

// Programmatic Temple Bell Synthesizer for Audio Haptics (Tactile Feedback)
const playTempleBell = () => {
  if (typeof window === "undefined") return;
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const overtone = ctx.createOscillator();
    const overtoneGain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1200, ctx.currentTime);

    osc.type = "sine";
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5 note (pure temple tone)

    overtone.type = "sine";
    overtone.frequency.setValueAtTime(1174.66, ctx.currentTime); // D6 octave overtone

    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.008);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.2);

    overtoneGain.gain.setValueAtTime(0, ctx.currentTime);
    overtoneGain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.008);
    overtoneGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);

    osc.connect(gainNode);
    overtone.connect(overtoneGain);
    gainNode.connect(filter);
    overtoneGain.connect(filter);
    filter.connect(ctx.destination);

    osc.start();
    overtone.start();
    osc.stop(ctx.currentTime + 2.3);
    overtone.stop(ctx.currentTime + 1.3);
  } catch (e) {
    console.warn("Audio Context failed to initialize:", e);
  }
};

// 3D Card Tilt Hook with Refined Spring Physics
function use3DTilt<T extends HTMLElement = HTMLElement>() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-100, 100], [8, -8]);
  const rotateY = useTransform(x, [-100, 100], [-8, 8]);

  function handleMouseMove(event: React.MouseEvent<T, MouseEvent>) {
    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left - width / 2;
    const mouseY = event.clientY - rect.top - height / 2;
    x.set(mouseX);
    y.set(mouseY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return { rotateX, rotateY, handleMouseMove, handleMouseLeave };
}

export default function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = use(params);
  const todaysQuote = getTodaysQuote();
  const t = translations[lang as keyof typeof translations] || translations.en;
  const isIndic = lang === 'hi' || lang === 'kn';

  // Scroll tracking for Aceternity Sacred Tracing Beam
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001
  });

  // Celestial Stardust Canvas Effect
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{ x: number; y: number; size: number; speedX: number; speedY: number; alpha: number }> = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.4,
        speedX: (Math.random() - 0.5) * 0.15,
        speedY: -Math.random() * 0.3 - 0.08,
        alpha: Math.random() * 0.4 + 0.15
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 158, 11, ${p.alpha})`;
        ctx.fill();

        p.x += p.speedX;
        p.y += p.speedY;
        
        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < 0 || p.x > canvas.width) {
          p.x = Math.random() * canvas.width;
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const card1 = use3DTilt<HTMLAnchorElement>();
  const card2 = use3DTilt<HTMLAnchorElement>();
  const card3 = use3DTilt<HTMLAnchorElement>();
  const card4 = use3DTilt<HTMLAnchorElement>();
  const card5 = use3DTilt<HTMLAnchorElement>();

  return (
    <div className="relative flex flex-col items-center min-h-screen px-4 sm:px-6 pt-0 pb-24 overflow-x-hidden bg-stone-50 dark:bg-stone-950 selection:bg-amber-500 selection:text-stone-950">
      
      {/* Celestial Stardust Canvas Atmosphere */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0 opacity-50 dark:opacity-30" />

      {/* Archival Parchment Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.015] dark:opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* Ambient Golden Light Source */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] sm:h-[600px] bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-transparent blur-[100px] sm:blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="relative z-10 flex flex-col items-center w-full max-w-7xl mx-auto">
          
          <DailyWisdom lang={lang} quote={todaysQuote} />
          
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 300, damping: 25 }}
            className="mb-6 px-4 py-1.5 rounded-full bg-amber-100/50 dark:bg-amber-950/20 text-amber-800 dark:text-amber-300 text-[10px] md:text-xs font-bold uppercase tracking-widest border border-amber-200/30 dark:border-amber-500/20 shadow-sm backdrop-blur-md"
          >
            {t.badge}
          </motion.div>

          {/* H1 Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, type: "spring", stiffness: 300, damping: 25 }}
            className={`text-4xl sm:text-6xl md:text-8xl font-black text-center text-stone-900 dark:text-stone-100 mb-6 uppercase tracking-tighter ${isIndic ? 'leading-tight py-2' : 'leading-none'}`}
          >
            {t.title}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 300, damping: 25 }}
            className={`text-base sm:text-lg md:text-xl font-serif text-stone-600 dark:text-stone-400 max-w-2xl text-center px-4 mb-16 ${isIndic ? 'leading-loose' : 'leading-relaxed'}`}
          >
            {t.subtitle}
          </motion.p>

          {/* Grid of 3D Tilt Cards with Audio Haptics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mb-24">
            
            {/* Card 1: Tirthankaras */}
            <Link href={`/${lang}/tirthankars`} passHref legacyBehavior>
              <motion.a
                style={{ rotateX: card1.rotateX, rotateY: card1.rotateY, transformStyle: "preserve-3d" }}
                onMouseMove={card1.handleMouseMove}
                onMouseLeave={card1.handleMouseLeave}
                onMouseEnter={playTempleBell}
                onClick={playTempleBell}
                className="group relative flex flex-col p-6 sm:p-8 bg-stone-100/80 dark:bg-stone-900/40 border border-stone-200/60 dark:border-stone-800/60 rounded-3xl hover:border-amber-500/50 dark:hover:border-amber-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/5 backdrop-blur-md cursor-pointer min-h-[44px]"
              >
                <div className="flex items-start justify-between mb-6" style={{ transform: "translateZ(30px)" }}>
                    <div className="h-14 w-14 rounded-2xl bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Users size={28} />
                    </div>
                    <ArrowRight size={20} className="text-stone-400 dark:text-stone-600 group-hover:text-amber-500 -rotate-45 group-hover:rotate-0 transition-all duration-300" />
                </div>
                <div style={{ transform: "translateZ(20px)" }}>
                  <h2 className={`text-xl font-bold text-stone-900 dark:text-stone-100 uppercase tracking-tight mb-1 ${isIndic ? 'leading-normal' : ''}`}>{t.c1_title}</h2>
                  <p className="text-sm text-stone-500 dark:text-stone-400 font-medium">{t.c1_sub}</p>
                </div>
              </motion.a>
            </Link>

            {/* Card 2: Soul & Karma */}
            <Link href={`/${lang}/learn/soul-karma`} passHref legacyBehavior>
              <motion.a
                style={{ rotateX: card2.rotateX, rotateY: card2.rotateY, transformStyle: "preserve-3d" }}
                onMouseMove={card2.handleMouseMove}
                onMouseLeave={card2.handleMouseLeave}
                onMouseEnter={playTempleBell}
                onClick={playTempleBell}
                className="group relative flex flex-col p-6 sm:p-8 bg-stone-100/80 dark:bg-stone-900/40 border border-stone-200/60 dark:border-stone-800/60 rounded-3xl hover:border-amber-500/50 dark:hover:border-amber-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/5 backdrop-blur-md cursor-pointer min-h-[44px]"
              >
                <div className="flex items-start justify-between mb-6" style={{ transform: "translateZ(30px)" }}>
                    <div className="h-14 w-14 rounded-2xl bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Ghost size={28} />
                    </div>
                    <ArrowRight size={20} className="text-stone-400 dark:text-stone-600 group-hover:text-amber-500 -rotate-45 group-hover:rotate-0 transition-all duration-300" />
                </div>
                <div style={{ transform: "translateZ(20px)" }}>
                  <h2 className={`text-xl font-bold text-stone-900 dark:text-stone-100 uppercase tracking-tight mb-1 ${isIndic ? 'leading-normal' : ''}`}>{t.c4_title}</h2>
                  <p className="text-sm text-stone-500 dark:text-stone-400 font-medium">{t.c4_sub}</p>
                </div>
              </motion.a>
            </Link>

            {/* Card 3: Namokar Mantra */}
            <Link href={`/${lang}/learn/namokar-mantra`} passHref legacyBehavior>
              <motion.a
                style={{ rotateX: card3.rotateX, rotateY: card3.rotateY, transformStyle: "preserve-3d" }}
                onMouseMove={card3.handleMouseMove}
                onMouseLeave={card3.handleMouseLeave}
                onMouseEnter={playTempleBell}
                onClick={playTempleBell}
                className="group relative flex flex-col p-6 sm:p-8 bg-stone-100/80 dark:bg-stone-900/40 border border-stone-200/60 dark:border-stone-800/60 rounded-3xl hover:border-amber-500/50 dark:hover:border-amber-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/5 backdrop-blur-md cursor-pointer min-h-[44px]"
              >
                <div className="flex items-start justify-between mb-6" style={{ transform: "translateZ(30px)" }}>
                    <div className="h-14 w-14 rounded-2xl bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Sparkles size={28} />
                    </div>
                    <ArrowRight size={20} className="text-stone-400 dark:text-stone-600 group-hover:text-amber-500 -rotate-45 group-hover:rotate-0 transition-all duration-300" />
                </div>
                <div style={{ transform: "translateZ(20px)" }}>
                  <h2 className={`text-xl font-bold text-stone-900 dark:text-stone-100 uppercase tracking-tight mb-1 ${isIndic ? 'leading-normal' : ''}`}>{t.c2_title}</h2>
                  <p className="text-sm text-stone-500 dark:text-stone-400 font-medium">{t.c2_sub}</p>
                </div>
              </motion.a>
            </Link>

            {/* Card 4: Wheel of Time */}
            <Link href={`/${lang}/learn/kalchakra`} passHref legacyBehavior>
              <motion.a
                style={{ rotateX: card4.rotateX, rotateY: card4.rotateY, transformStyle: "preserve-3d" }}
                onMouseMove={card4.handleMouseMove}
                onMouseLeave={card4.handleMouseLeave}
                onMouseEnter={playTempleBell}
                onClick={playTempleBell}
                className="group relative flex flex-col p-6 sm:p-8 bg-stone-100/80 dark:bg-stone-900/40 border border-stone-200/60 dark:border-stone-800/60 rounded-3xl hover:border-amber-500/50 dark:hover:border-amber-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/5 backdrop-blur-md cursor-pointer min-h-[44px]"
              >
                <div className="flex items-start justify-between mb-6" style={{ transform: "translateZ(30px)" }}>
                    <div className="h-14 w-14 rounded-2xl bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Clock size={28} />
                    </div>
                    <ArrowRight size={20} className="text-stone-400 dark:text-stone-600 group-hover:text-amber-500 -rotate-45 group-hover:rotate-0 transition-all duration-300" />
                </div>
                <div style={{ transform: "translateZ(20px)" }}>
                  <h2 className={`text-xl font-bold text-stone-900 dark:text-stone-100 uppercase tracking-tight mb-1 ${isIndic ? 'leading-normal' : ''}`}>{t.c3_title}</h2>
                  <p className="text-sm text-stone-500 dark:text-stone-400 font-medium">{t.c3_sub}</p>
                </div>
              </motion.a>
            </Link>

            {/* Card 5: Resources Hub (Full Width) */}
            <Link href={`/${lang}/resources`} passHref legacyBehavior>
              <motion.a
                style={{ rotateX: card5.rotateX, rotateY: card5.rotateY, transformStyle: "preserve-3d" }}
                onMouseMove={card5.handleMouseMove}
                onMouseLeave={card5.handleMouseLeave}
                onMouseEnter={playTempleBell}
                onClick={playTempleBell}
                className="group relative flex flex-col p-6 sm:p-8 bg-stone-100/80 dark:bg-stone-900/40 border border-stone-200/60 dark:border-stone-800/60 rounded-3xl hover:border-amber-500/50 dark:hover:border-amber-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/5 backdrop-blur-md md:col-span-2 cursor-pointer min-h-[44px]"
              >
                <div className="flex items-start justify-between mb-6" style={{ transform: "translateZ(30px)" }}>
                    <div className="h-14 w-14 rounded-2xl bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <BookOpen size={28} />
                    </div>
                    <ArrowRight size={20} className="text-stone-400 dark:text-stone-600 group-hover:text-amber-500 -rotate-45 group-hover:rotate-0 transition-all duration-300" />
                </div>
                <div style={{ transform: "translateZ(20px)" }}>
                  <h2 className={`text-xl font-bold text-stone-900 dark:text-stone-100 uppercase tracking-tight mb-1 ${isIndic ? 'leading-normal' : ''}`}>{t.c5_title}</h2>
                  <p className="text-sm text-stone-500 dark:text-stone-400 font-medium">{t.c5_sub}</p>
                </div>
              </motion.a>
            </Link>

          </div>

          {/* Aceternity Sacred Tracing Beam & Chronological Scripture Timeline */}
          <div ref={containerRef} className="relative w-full max-w-4xl px-4 py-16 border-t border-stone-200/40 dark:border-stone-800/40">
            
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
                <Scroll size={14} />
                Aagam Paramparā
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 dark:text-stone-100 mb-4">
                {t.timeline_title}
              </h2>
              <p className="text-stone-600 dark:text-stone-400 max-w-2xl mx-auto text-sm md:text-base">
                {t.timeline_sub}
              </p>
            </div>

            {/* Timeline Spine & Tracing Beam */}
            <div className="relative">
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-stone-200 dark:bg-stone-800 -translate-x-1/2" />
              
              <motion.div 
                style={{ scaleY }}
                className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-amber-400 via-yellow-500 to-amber-600 origin-top -translate-x-1/2 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
              />

              {/* Timeline Events */}
              <div className="space-y-12">
                {timelineEvents.map((event, idx) => {
                  const isEven = idx % 2 === 0;
                  return (
                    <div key={idx} className={`relative flex flex-col md:flex-row items-start ${isEven ? "md:flex-row-reverse" : ""}`}>
                      
                      {/* Timeline Node Dot */}
                      <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-stone-100 dark:bg-stone-900 border-2 border-amber-500 -translate-x-1/2 z-20 flex items-center justify-center shadow-[0_0_8px_rgba(245,158,11,0.3)]">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      </div>

                      {/* Content Card */}
                      <div className={`w-full md:w-[45%] pl-10 md:pl-0 ${isEven ? "md:pr-8" : "md:pl-8"}`}>
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ duration: 0.6, delay: idx * 0.1, type: "spring", stiffness: 300, damping: 25 }}
                          onMouseEnter={playTempleBell}
                          className="p-6 rounded-2xl bg-amber-50/40 dark:bg-stone-900/30 border border-amber-200/20 dark:border-amber-900/20 backdrop-blur-md shadow-sm hover:border-amber-500/30 dark:hover:border-amber-500/30 transition-colors duration-300"
                        >
                          <span className="text-xs font-bold text-amber-600 dark:text-amber-400 tracking-wider uppercase block mb-1">
                            {event.era}
                          </span>
                          <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 mb-2">
                            {event.title}
                          </h3>
                          <p className="text-sm text-stone-600 dark:text-stone-400 mb-4 leading-relaxed">
                            {event.description}
                          </p>

                          {/* Sanskrit Verse & Citation */}
                          <div className="p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/10">
                            <p className="text-xs font-semibold text-amber-800 dark:text-amber-300 font-serif mb-1 italic">
                              {event.sanskrit}
                            </p>
                            <p className="text-[11px] text-stone-500 dark:text-stone-400 mb-2 italic">
                              &ldquo;{event.translation}&rdquo;
                            </p>
                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                              <ShieldCheck size={12} />
                              {event.source}
                            </div>
                          </div>
                        </motion.div>
                      </div>

                      <div className="hidden md:block w-[10%]" />
                    </div>
                  );
                })}
              </div>

            </div>
          </div>

      </div>
    </div>
  );
}