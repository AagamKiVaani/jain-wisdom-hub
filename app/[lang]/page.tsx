"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  ArrowRight, 
  Ghost, 
  Clock, 
  Sparkles, 
  BookOpen, 
  Volume2, 
  VolumeX, 
  Compass,
  BookOpenCheck
} from "lucide-react";
import DailyWisdom from "@/components/DailyWisdom";
import { getTodaysQuote } from "@/lib/quoteService";

const translations = {
  en: {
    badge: "Digital Aagam Alpha 1.0",
    title: "The Path of Wisdom",
    subtitle: "Explore the ancient Jain principles of non-violence, truth, and karma.",
    c1_title: "24 Tirthankaras", c1_sub: "The Sacred Gallery",
    c2_title: "Namokar Mantra", c2_sub: "The Eternal Prayer",
    c3_title: "Wheel of Time", c3_sub: "The Cosmic Cycle",
    c4_title: "Soul & Karma", c4_sub: "The Physics of Soul",
    c5_title: "Resources Hub", c5_sub: "Download Notes & PDFs",
    soundOn: "Sound Enabled",
    soundOff: "Sound Muted",
    shastraTitle: "Archival Digambar Inscription",
    shastraSource: "Tattvārtha Sūtra — Acharya Umāsvāmi (Ch. 1, Sutra 1-2)",
    shastraVerse: "सम्यग्दर्शनज्ञानचारित्राणि मोक्षमार्गः॥ १ ॥\nतत्त्वार्थश्रद्धानं सम्यग्दर्शनम्॥ २ ॥",
    shastraTranslation: "Right belief, right knowledge, and right conduct together constitute the path to liberation (Moksha). Belief in substances (tattvas) ascertained as they are, is right belief.",
    iconographyNote: "Digambar Iconography: All Tirthankaras, including Mallināth Bhagwān (the 19th male Tirthankar), are depicted strictly unclad (Digambaratva), peaceful, with eyes half-closed in introspective meditation (Nāsāgra Drishti), free from hunger (Kavalahāra), thirst, disease, sleep, and physical fatigue."
  },
  hi: {
    badge: "डिजिटल आगम अल्फा 1.0",
    title: "ज्ञान का मार्ग",
    subtitle: "अहिंसा, सत्य और कर्म के प्राचीन जैन सिद्धांतों का अन्वेषण करें।",
    c1_title: "24 तीर्थंकर", c1_sub: "तीर्थंकर दर्शन",
    c2_title: "णमोकार मंत्र", c2_sub: "अनादि मंत्र",
    c3_title: "कालचक्र", c3_sub: "समय का चक्र",
    c4_title: "आत्मा और कर्म", c4_sub: "कर्म सिद्धांत",
    c5_title: "संसाधन केंद्र", c5_sub: "नोट्स डाउनलोड करें",
    soundOn: "ध्वनि सक्रिय",
    soundOff: "ध्वनि म्यूट",
    shastraTitle: "प्रामाणिक दिगंबर शिलालेख",
    shastraSource: "तत्त्वार्थ सूत्र — आचार्य उमास्वामी (अध्याय १, सूत्र १-२)",
    shastraVerse: "सम्यग्दर्शनज्ञानचारित्राणि मोक्षमार्गः॥ १ ॥\nतत्त्वार्थश्रद्धानं सम्यग्दर्शनम्॥ २ ॥",
    shastraTranslation: "सम्यक दर्शन, सम्यक ज्ञान और सम्यक चरित्र मिलकर मोक्ष का मार्ग हैं। यथार्थ रूप में जीवादि तत्वों का श्रद्धान करना ही सम्यक दर्शन है।",
    iconographyNote: "दिगंबर प्रतिमा विज्ञान: १९वें तीर्थंकर मल्लिनाथ भगवान (पुरुष राजा जिन्होंने दिगंबर दीक्षा धारण की) सहित सभी २४ तीर्थंकर पूर्णतः अपरिग्रह (नग्न), शांत मुद्रा और नासाग्र दृष्टि में विराजमान हैं, एवं वे क्षुधा (कवलाहार), तृषा, रोग, निद्रा और शारीरिक थकान से सर्वथा रहित हैं।"
  },
  kn: {
    badge: "ಡಿಜಿಟಲ್ ಆಗಮ ಆಲ್ಫಾ 1.0",
    title: "ಜ್ಞಾನದ ಮಾರ್ಗ",
    subtitle: "ಅಹಿಂಸೆ, ಸತ್ಯ ಮತ್ತು ಕರ್ಮದ ಪ್ರಾಚೀನ ಜೈನ ತತ್ವಗಳನ್ನು ಅನ್ವೇಷಿಸಿ.",
    c1_title: "24 ತೀರ್ಥಂಕರರು", c1_sub: "ಪವಿತ್ರ ದರ್ಶನ",
    c2_title: "ನಮೋಕಾರ ಮಂತ್ರ", c2_sub: "ಶಾಶ್ವತ ಪ್ರಾರ್ಥನೆ",
    c3_title: "ಕಾಲಚಕ್ರ", c3_sub: "ವಿಶ್ವದ ಚಕ್ರ",
    c4_title: "ಆತ್ಮ ಮತ್ತು ಕರ್ಮ", c4_sub: "ಆತ್ಮದ ವಿಜ್ಞಾನ",
    c5_title: "ಸಂಪನ್ಮೂಲಗಳು", c5_sub: "ಟಿಪ್ಪಣಿಗಳನ್ನು ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ",
    soundOn: "ಧ್ವನಿ ಸಕ್ರಿಯ",
    soundOff: "ಧ್ವನಿ ಮೌನ",
    shastraTitle: "ದಿನದ ಶಾಸ್ತ್ರ ಶಾಸನ",
    shastraSource: "ತತ್ತ್ವಾರ್ಥ ಸೂತ್ರ — ಆಚಾರ್ಯ ಉಮಾಸ್ವಾಮಿ (ಅಧ್ಯಾಯ ೧, ಸೂತ್ರ ೧-೨)",
    shastraVerse: "सम्यग्दर्शनज्ञानचारित्राणि मोक्षमार्गः॥ १ ॥\nतत्त्वार्थश्रद्धानं सम्यग्दर्शनम्॥ २ ॥",
    shastraTranslation: "ಸಮ್ಯಗ್ದರ್ಶನ, ಸಮ್ಯಗ್ಜ್ಞಾನ ಮತ್ತು ಸಮ್ಯಕ್ಚಾರಿತ್ರ್ಯಗಳು ಒಟ್ಟಾಗಿ ಮೋಕ್ಷದ ಮಾರ್ಗವಾಗಿದೆ. ಯಥಾರ್ಥವಾದ ತತ್ವಗಳ ಶ್ರದ್ಧಾನವೇ ಸಮ್ಯಗ್ದರ್ಶನವು.",
    iconographyNote: "ದಿಗಂಬರ ಸಂಪ್ರದಾಯ: ೧೯ನೇ ತೀರ್ಥಂಕರ ಮಲ್ಲಿನಾಥ ಭಗವಾನ್ ಸೇರಿದಂತೆ ಎಲ್ಲಾ ತೀರ್ಥಂಕರರು ದಿಗಂಬರ (ಅಚೇಲಕ), ಪ್ರಶಾಂತ ಮುದ್ರೆ ಮತ್ತು ನಾಸಾಗ್ರ ದೃಷ್ಟಿಯಲ್ಲಿ ವಿರಾಜಮಾನರಾಗಿದ್ದಾರೆ, ಹಾಗೂ ಅವರು ಹಸಿವು (ಕವಲಾಹಾರ), ಬಾಯಾರಿಕೆ, ರೋಗ, ನಿದ್ರೆ ಮತ್ತು ದೈಹಿಕ ಆಯಾಸದಿಂದ ಮುಕ್ತರಾಗಿದ್ದಾರೆ."
  }
};

const springTransition = {
  type: "spring" as const,
  stiffness: 300,
  damping: 25
};

export default function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = React.use(params);
  const todaysQuote = getTodaysQuote();
  const t = translations[lang as keyof typeof translations] || translations.en;
  const isIndic = lang === 'hi' || lang === 'kn';

  const [soundEnabled, setSoundEnabled] = React.useState(true);
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const audioCtxRef = React.useRef<AudioContext | null>(null);

  // Initialize Audio Context on demand to satisfy browser autoplay policies
  const getAudioContext = (): AudioContext | null => {
    if (typeof window === "undefined") return null;
    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        audioCtxRef.current = new AudioContextClass();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  // High-performance real audio click using /sounds/resources/click2.mp3
  const playTapSound = () => {
    if (!soundEnabled) return;
    try {
      const audio = new Audio("/sounds/resources/click2.mp3");
      audio.volume = 0.65;
      audio.play().catch(() => {});
      if (typeof navigator !== "undefined" && navigator.vibrate) {
        navigator.vibrate(12);
      }
    } catch (e) {}
  };

  const handleInteraction = (_type?: string, _strength?: string) => {
    playTapSound();
  };

  // High-DPI Optimized Celestial Golden Stardust Particle System
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{ x: number; y: number; radius: number; speedY: number; speedX: number; alpha: number; decay: number }> = [];

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const createParticle = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      return {
        x: Math.random() * width,
        y: height + 10,
        radius: Math.random() * 1.2 + 0.4,
        speedY: -(Math.random() * 0.4 + 0.15),
        speedX: (Math.random() - 0.5) * 0.2,
        alpha: Math.random() * 0.4 + 0.15,
        decay: Math.random() * 0.0015 + 0.0005
      };
    };

    // Initialize particles
    for (let i = 0; i < 35; i++) {
      particles.push({
        ...createParticle(),
        y: Math.random() * window.innerHeight
      });
    }

    const animate = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      ctx.clearRect(0, 0, width, height);
      
      particles.forEach((p, index) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.alpha -= p.decay;

        if (p.alpha <= 0 || p.y < -10) {
          particles[index] = createParticle();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(212, 175, 55, ${p.alpha})`; // Divine Gold
          ctx.shadowBlur = 3;
          ctx.shadowColor = "rgba(212, 175, 55, 0.4)";
          ctx.fill();
        }
      });

      ctx.shadowBlur = 0;
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center min-h-screen px-4 pt-0 pb-24 overflow-x-hidden bg-white dark:bg-black selection:bg-amber-500 selection:text-black">
      
      {/* HTML5 Canvas for Celestial Golden Stardust */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 pointer-events-none z-0 opacity-50 dark:opacity-70"
      />

      {/* Optimized Background Gradient Blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-amber-500/5 dark:bg-amber-950/10 blur-[100px] md:blur-[160px] rounded-full pointer-events-none z-0" />

      {/* Persistent Audio/Haptic Control Panel - Cleanly docked at bottom-right away from Navbar */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={springTransition}
          onClick={() => {
            setSoundEnabled(!soundEnabled);
            playTapSound();
          }}
          className="flex items-center gap-2 min-h-[44px] px-4 py-2.5 rounded-full bg-white/95 dark:bg-zinc-900/95 border border-amber-500/30 dark:border-amber-500/20 backdrop-blur-md shadow-lg hover:shadow-xl text-zinc-800 dark:text-zinc-200 text-xs font-semibold transition-all"
          aria-label="Toggle Sound Feedback"
        >
          {soundEnabled ? (
            <>
              <Volume2 size={15} className="text-amber-600 dark:text-amber-400 animate-pulse" />
              <span>{t.soundOn}</span>
            </>
          ) : (
            <>
              <VolumeX size={15} className="text-zinc-400" />
              <span>{t.soundOff}</span>
            </>
          )}
        </motion.button>
      </div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-7xl mx-auto pt-8">
          
          <DailyWisdom lang={lang} quote={todaysQuote} />
          
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={springTransition}
            className="mb-6 px-4 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/20 text-amber-800 dark:text-amber-300 text-[10px] md:text-xs font-bold uppercase tracking-widest border border-amber-100 dark:border-amber-500/20 shadow-sm flex items-center gap-1.5"
          >
            <Compass size={12} className="animate-spin-slow text-amber-600 dark:text-amber-400" />
            {t.badge}
          </motion.div>

          {/* H1 Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springTransition, delay: 0.05 }}
            className={`text-4xl sm:text-6xl md:text-8xl font-black text-center text-gray-900 dark:text-white mb-6 uppercase tracking-tighter ${isIndic ? 'leading-tight py-2' : 'leading-none'}`}
          >
            {t.title}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springTransition, delay: 0.1 }}
            className={`text-base sm:text-lg md:text-xl font-serif text-gray-600 dark:text-gray-400 max-w-2xl text-center mb-10 px-4 ${isIndic ? 'leading-loose' : 'leading-relaxed'}`}
          >
            {t.subtitle}
          </motion.p>

          {/* Grid - Directly underneath the Hero header */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-4xl px-2 mb-16">
            
            <Link 
              href={`/${lang}/tirthankars`}
              onClick={() => handleInteraction("mechanical", "light")}
              className="group flex flex-col justify-between min-h-[160px] p-6 sm:p-8 bg-white/80 dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl hover:border-amber-500 dark:hover:border-amber-500 transition-all hover:shadow-2xl hover:shadow-amber-500/5 backdrop-blur-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
            >
              <div className="flex items-start justify-between mb-6">
                  <div className="h-12 w-12 rounded-2xl bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Users size={24} />
                  </div>
                  <ArrowRight size={18} className="text-gray-300 dark:text-gray-700 group-hover:text-amber-500 -rotate-45 group-hover:rotate-0 transition-all duration-300" />
              </div>
              <div>
                <h2 className={`text-lg sm:text-xl font-bold text-gray-900 dark:text-white uppercase tracking-tight mb-1 ${isIndic ? 'leading-normal' : ''}`}>{t.c1_title}</h2>
                <p className="text-xs sm:text-sm text-gray-500 font-medium">{t.c1_sub}</p>
              </div>
            </Link>

            <Link 
              href={`/${lang}/learn/soul-karma`}
              onClick={() => handleInteraction("mechanical", "light")}
              className="group flex flex-col justify-between min-h-[160px] p-6 sm:p-8 bg-white/80 dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl hover:border-purple-500 dark:hover:border-purple-500 transition-all hover:shadow-2xl hover:shadow-purple-500/5 backdrop-blur-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
            >
              <div className="flex items-start justify-between mb-6">
                  <div className="h-12 w-12 rounded-2xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Ghost size={24} />
                  </div>
                  <ArrowRight size={18} className="text-gray-300 dark:text-gray-700 group-hover:text-purple-500 -rotate-45 group-hover:rotate-0 transition-all duration-300" />
              </div>
              <div>
                <h2 className={`text-lg sm:text-xl font-bold text-gray-900 dark:text-white uppercase tracking-tight mb-1 ${isIndic ? 'leading-normal' : ''}`}>{t.c4_title}</h2>
                <p className="text-xs sm:text-sm text-gray-500 font-medium">{t.c4_sub}</p>
              </div>
            </Link>

            <Link 
              href={`/${lang}/learn/namokar-mantra`}
              onClick={() => handleInteraction("mechanical", "light")}
              className="group flex flex-col justify-between min-h-[160px] p-6 sm:p-8 bg-white/80 dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl hover:border-orange-500 dark:hover:border-orange-500 transition-all hover:shadow-2xl hover:shadow-orange-500/5 backdrop-blur-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
            >
              <div className="flex items-start justify-between mb-6">
                  <div className="h-12 w-12 rounded-2xl bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Sparkles size={24} />
                  </div>
                  <ArrowRight size={18} className="text-gray-300 dark:text-gray-700 group-hover:text-orange-500 -rotate-45 group-hover:rotate-0 transition-all duration-300" />
              </div>
              <div>
                <h2 className={`text-lg sm:text-xl font-bold text-gray-900 dark:text-white uppercase tracking-tight mb-1 ${isIndic ? 'leading-normal' : ''}`}>{t.c2_title}</h2>
                <p className="text-xs sm:text-sm text-gray-500 font-medium">{t.c2_sub}</p>
              </div>
            </Link>

            <Link 
              href={`/${lang}/learn/kalchakra`}
              onClick={() => handleInteraction("mechanical", "light")}
              className="group flex flex-col justify-between min-h-[160px] p-6 sm:p-8 bg-white/80 dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl hover:border-green-500 dark:hover:border-green-500 transition-all hover:shadow-2xl hover:shadow-green-500/5 backdrop-blur-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
            >
              <div className="flex items-start justify-between mb-6">
                  <div className="h-12 w-12 rounded-2xl bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Clock size={24} />
                  </div>
                  <ArrowRight size={18} className="text-gray-300 dark:text-gray-700 group-hover:text-green-500 -rotate-45 group-hover:rotate-0 transition-all duration-300" />
              </div>
              <div>
                <h2 className={`text-lg sm:text-xl font-bold text-gray-900 dark:text-white uppercase tracking-tight mb-1 ${isIndic ? 'leading-normal' : ''}`}>{t.c3_title}</h2>
                <p className="text-xs sm:text-sm text-gray-500 font-medium">{t.c3_sub}</p>
              </div>
            </Link>

            <Link 
              href={`/${lang}/resources`}
              onClick={() => handleInteraction("mechanical", "medium")}
              className="group flex flex-col justify-between min-h-[160px] p-6 sm:p-8 bg-white/80 dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl hover:border-blue-500 dark:hover:border-blue-500 transition-all hover:shadow-2xl hover:shadow-blue-500/5 backdrop-blur-sm sm:col-span-2 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
            >
              <div className="flex items-start justify-between mb-6">
                  <div className="h-12 w-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <BookOpen size={24} />
                  </div>
                  <ArrowRight size={18} className="text-gray-300 dark:text-gray-700 group-hover:text-blue-500 -rotate-45 group-hover:rotate-0 transition-all duration-300" />
              </div>
              <div>
                <h2 className={`text-lg sm:text-xl font-bold text-gray-900 dark:text-white uppercase tracking-tight mb-1 ${isIndic ? 'leading-normal' : ''}`}>{t.c5_title}</h2>
                <p className="text-xs sm:text-sm text-gray-500 font-medium">{t.c5_sub}</p>
              </div>
            </Link>

          </div>

          {/* Archival Manuscript Noise Glassmorphism Panel (Digambar Shastra Inscription) - Gracefully positioned below main navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springTransition, delay: 0.2 }}
            className="relative w-full max-w-4xl p-6 sm:p-8 md:p-10 my-8 rounded-3xl border border-amber-500/20 dark:border-amber-500/10 bg-stone-50/90 dark:bg-stone-950/40 backdrop-blur-md shadow-xl overflow-hidden"
          >
            {/* Specular Highlight Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-white/10 dark:to-white/5" />
            {/* Archival Noise Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] mix-blend-overlay" />
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="flex items-center gap-2 mb-4 text-amber-700 dark:text-amber-400">
                <BookOpenCheck size={20} />
                <span className="text-xs font-bold uppercase tracking-widest">{t.shastraTitle}</span>
              </div>

              <blockquote className="text-lg sm:text-xl md:text-2xl font-bold text-amber-900 dark:text-amber-100 mb-4 whitespace-pre-line font-serif tracking-wide leading-relaxed">
                {t.shastraVerse}
              </blockquote>

              <p className="text-xs sm:text-sm md:text-base text-stone-700 dark:text-stone-300 max-w-3xl mb-4 font-serif italic leading-relaxed">
                &ldquo;{t.shastraTranslation}&rdquo;
              </p>

              <div className="text-[10px] sm:text-xs font-semibold text-amber-800 dark:text-amber-500 uppercase tracking-wider border-t border-amber-500/20 pt-4 w-full max-w-md">
                {t.shastraSource}
              </div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-16 p-6 max-w-4xl rounded-2xl bg-stone-100/50 dark:bg-zinc-900/20 border border-stone-200/60 dark:border-zinc-800/60 text-center mx-4"
          >
            <p className="text-[11px] sm:text-xs font-serif text-stone-500 dark:text-zinc-400 leading-relaxed">
              {t.iconographyNote}
            </p>
          </motion.div>
      </div>
    </div>
  );
}