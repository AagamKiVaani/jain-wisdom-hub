"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Users, ArrowRight, Ghost, Clock, Sparkles, BookOpen, ShieldCheck, Volume2, VolumeX } from "lucide-react";
import DailyWisdom from "@/components/DailyWisdom";
import { getTodaysQuote } from "@/lib/quoteService";

// Translations Object
const translations = {
  en: {
    badge: "Digital Aagam • Digambar Tradition",
    title: "The Path of Wisdom",
    subtitle: "Explore the pristine, unadorned truth of the soul, karma, and cosmic cycles as realized by the Omniscient Lords.",
    c1_title: "24 Tirthankaras", c1_sub: "The Sacred Digambar Gallery",
    c2_title: "Namokar Mantra", c2_sub: "The Eternal Cosmic Salutation",
    c3_title: "Wheel of Time", c3_sub: "The Cosmic Cycle of Kalachakra",
    c4_title: "Soul & Karma", c4_sub: "The Spiritual Physics of Jiva",
    c5_title: "Resources Hub", c5_sub: "Download Shastras & Archival PDFs",
    aagam_title: "Aagam Mandir",
    aagam_sub: "Authoritative Digambar Canonical Citations"
  },
  hi: {
    badge: "डिजिटल आगम • दिगंबर परंपरा",
    title: "ज्ञान का मार्ग",
    subtitle: "सर्वज्ञ देवों द्वारा प्रतिपादित आत्मा, कर्म और कालचक्र के विशुद्ध सत्य का अन्वेषण करें।",
    c1_title: "24 तीर्थंकर", c1_sub: "परम वीतरागी दिगंबर दर्शन",
    c2_title: "णमोकार मंत्र", c2_sub: "अनादि पंचपरमेष्ठी नमस्कार",
    c3_title: "कालचक्र", c3_sub: "संसार का शाश्वत चक्र",
    c4_title: "आत्मा और कर्म", c4_sub: "जीव और पुद्गल का विज्ञान",
    c5_title: "संसाधन केंद्र", c5_sub: "शास्त्र एवं प्रामाणिक पीडीएफ",
    aagam_title: "आगम मंदिर",
    aagam_sub: "प्रामाणिक दिगंबर शास्त्र संदर्भ"
  },
  kn: {
    badge: "ಡಿಜಿಟಲ್ ಆಗಮ • ದಿಗಂಬರ ಸಂಪ್ರದಾಯ",
    title: "ಜ್ಞಾನದ ಮಾರ್ಗ",
    subtitle: "ಸರ್ವಜ್ಞ ದೇವರಿಂದ ಪ್ರತಿಪಾದಿಸಲ್ಪಟ್ಟ ಆತ್ಮ, ಕರ್ಮ ಮತ್ತು ಕಾಲಚಕ್ರದ ವಿಶುದ್ಧ ಸತ್ಯವನ್ನು ಅನ್ವೇಷಿಸಿ.",
    c1_title: "24 ತೀರ್ಥಂಕರರು", c1_sub: "ಪರಮ ವೀತರಾಗಿ ದಿಗಂಬರ ದರ್ಶನ",
    c2_title: "ನಮೋಕಾರ ಮಂತ್ರ", c2_sub: "ಅನಾದಿ ಪಂಚಪರಮೇಷ್ಟಿ ನಮಸ್ಕಾರ",
    c3_title: "ಕಾಲಚಕ್ರ", c3_sub: "ಸಂಸಾರದ ಶಾಶ್ವತ ಚಕ್ರ",
    c4_title: "ಆತ್ಮ ಮತ್ತು ಕರ್ಮ", c4_sub: "ಜೀವ ಮತ್ತು ಪುದ್ಗಲ ವಿಜ್ಞಾನ",
    c5_title: "ಸಂಪನ್ಮೂಲಗಳು", c5_sub: "ಶಾಸ್ತ್ರ ಮತ್ತು ಅಧಿಕೃತ ಪಿಡಿಎಫ್",
    aagam_title: "ಆಗಮ ಮಂದಿರ",
    aagam_sub: "ಅಧಿಕೃತ ದಿಗಂಬರ ಶಾಸ್ತ್ರ ಉಲ್ಲೇಖಗಳು"
  }
};

// Web Audio API Micro-Haptic Synthesizer
const playHapticClick = (volume: boolean) => {
  if (typeof window === "undefined" || !volume) return;
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = "sine";
    // Crisp, sub-millisecond mechanical soft click
    osc.frequency.setValueAtTime(1400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.03);
    
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.03);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.03);

    // Mobile tactile vibration
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }
  } catch (e) {
    // AudioContext blocked or unsupported
  }
};

// Celestial Stardust Canvas Atmosphere
const StardustCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      alpha: number;
      decay: number;
    }> = [];

    const createParticle = () => {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.15,
        speedY: -Math.random() * 0.2 - 0.05,
        alpha: Math.random() * 0.5 + 0.2,
        decay: Math.random() * 0.002 + 0.001,
      };
    };

    for (let i = 0; i < 60; i++) {
      particles.push(createParticle());
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p, index) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.alpha -= p.decay;

        if (p.alpha <= 0 || p.y < 0) {
          particles[index] = createParticle();
          particles[index].y = height;
        }

        ctx.fillStyle = `rgba(244, 63, 94, ${p.alpha})`; // Rose-gold stardust
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />;
};

// Archival Parchment Noise Overlay
const ParchmentNoise = () => (
  <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.015] dark:opacity-[0.03] mix-blend-overlay z-0">
    <filter id="parchmentNoise">
      <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" />
    </filter>
    <rect width="100%" height="100%" filter="url(#parchmentNoise)" />
  </svg>
);

// 3D Spatial Perspective Tilt Card Component
const InteractiveCard = ({
  href,
  children,
  borderColor,
  soundEnabled,
}: {
  href: string;
  children: React.ReactNode;
  borderColor: string;
  soundEnabled: boolean;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
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
  };

  return (
    <Link href={href} className="block group">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => playHapticClick(soundEnabled)}
        onClick={() => playHapticClick(soundEnabled)}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={`relative flex flex-col p-8 bg-stone-50/80 dark:bg-zinc-900/40 border border-stone-200/60 dark:border-zinc-800/60 rounded-3xl transition-all duration-300 hover:${borderColor} dark:hover:${borderColor} hover:shadow-2xl hover:shadow-rose-500/5 backdrop-blur-md overflow-hidden`}
      >
        {/* Inner Archival Parchment Glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-stone-100/10 to-orange-100/5 dark:from-zinc-950/10 dark:to-orange-950/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <div style={{ transform: "translateZ(30px)" }} className="relative z-10 h-full flex flex-col justify-between">
          {children}
        </div>
      </motion.div>
    </Link>
  );
};

export default function Home({ params }: { params: React.Usable<{ lang: string }> }) {
  const { lang } = React.use(params);
  const todaysQuote = getTodaysQuote();
  const t = translations[lang as keyof typeof translations] || translations.en;
  const isIndic = lang === "hi" || lang === "kn";

  const [soundEnabled, setSoundEnabled] = useState(true);

  return (
    <div className="relative flex flex-col items-center min-h-screen px-4 pt-0 pb-24 overflow-hidden bg-stone-100/40 dark:bg-black selection:bg-rose-500 selection:text-white">
      {/* Background Atmosphere */}
      <StardustCanvas />
      <ParchmentNoise />

      {/* Ambient Light Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-rose-500/5 dark:bg-rose-950/10 blur-[100px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-[40%] right-10 w-72 h-72 bg-amber-500/5 dark:bg-amber-950/5 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* Sound Toggle Floating Control */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => {
            setSoundEnabled(!soundEnabled);
            playHapticClick(!soundEnabled);
          }}
          className="flex items-center justify-center p-3 rounded-full bg-stone-50/90 dark:bg-zinc-900/90 border border-stone-200 dark:border-zinc-800 shadow-lg backdrop-blur-md text-stone-600 dark:text-stone-300 hover:text-rose-500 dark:hover:text-rose-400 transition-colors"
          aria-label="Toggle Sound Effects"
        >
          {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </button>
      </div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-7xl mx-auto pt-8">
        {/* Daily Wisdom Banner */}
        <DailyWisdom lang={lang} quote={todaysQuote} />

        {/* Badge */}
        <div className="mb-6 px-4 py-1.5 rounded-full bg-amber-50/80 dark:bg-amber-950/10 text-amber-800 dark:text-amber-300 text-[10px] md:text-xs font-bold uppercase tracking-widest border border-amber-100 dark:border-amber-500/20 shadow-sm backdrop-blur-sm">
          {t.badge}
        </div>

        {/* H1 Title */}
        <h1
          className={`text-5xl md:text-8xl font-black text-center text-stone-900 dark:text-white mb-6 uppercase tracking-tighter ${
            isIndic ? "leading-tight py-2" : "leading-none"
          }`}
        >
          {t.title}
        </h1>

        <p
          className={`text-lg md:text-xl font-serif text-stone-600 dark:text-stone-400 max-w-2xl text-center mb-16 ${
            isIndic ? "leading-loose" : "leading-relaxed"
          }`}
        >
          {t.subtitle}
        </p>

        {/* Interactive 3D Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mb-20">
          <InteractiveCard href={`/${lang}/tirthankars`} borderColor="border-rose-500" soundEnabled={soundEnabled}>
            <div className="flex items-start justify-between mb-8">
              <div className="h-14 w-14 rounded-2xl bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Users size={28} />
              </div>
              <ArrowRight
                size={20}
                className="text-stone-400 dark:text-zinc-600 group-hover:text-rose-500 -rotate-45 group-hover:rotate-0 transition-all duration-300"
              />
            </div>
            <div>
              <h2 className={`text-xl font-bold text-stone-900 dark:text-white uppercase tracking-tight mb-1 ${isIndic ? "leading-normal" : ""}`}>
                {t.c1_title}
              </h2>
              <p className="text-sm text-stone-500 dark:text-zinc-400 font-medium">{t.c1_sub}</p>
            </div>
          </InteractiveCard>

          <InteractiveCard href={`/${lang}/learn/soul-karma`} borderColor="border-purple-500" soundEnabled={soundEnabled}>
            <div className="flex items-start justify-between mb-8">
              <div className="h-14 w-14 rounded-2xl bg-purple-50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Ghost size={28} />
              </div>
              <ArrowRight
                size={20}
                className="text-stone-400 dark:text-zinc-600 group-hover:text-purple-500 -rotate-45 group-hover:rotate-0 transition-all duration-300"
              />
            </div>
            <div>
              <h2 className={`text-xl font-bold text-stone-900 dark:text-white uppercase tracking-tight mb-1 ${isIndic ? "leading-normal" : ""}`}>
                {t.c4_title}
              </h2>
              <p className="text-sm text-stone-500 dark:text-zinc-400 font-medium">{t.c4_sub}</p>
            </div>
          </InteractiveCard>

          <InteractiveCard href={`/${lang}/learn/namokar-mantra`} borderColor="border-orange-500" soundEnabled={soundEnabled}>
            <div className="flex items-start justify-between mb-8">
              <div className="h-14 w-14 rounded-2xl bg-orange-50 dark:bg-orange-950/20 text-orange-600 dark:text-orange-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Sparkles size={28} />
              </div>
              <ArrowRight
                size={20}
                className="text-stone-400 dark:text-zinc-600 group-hover:text-orange-500 -rotate-45 group-hover:rotate-0 transition-all duration-300"
              />
            </div>
            <div>
              <h2 className={`text-xl font-bold text-stone-900 dark:text-white uppercase tracking-tight mb-1 ${isIndic ? "leading-normal" : ""}`}>
                {t.c2_title}
              </h2>
              <p className="text-sm text-stone-500 dark:text-zinc-400 font-medium">{t.c2_sub}</p>
            </div>
          </InteractiveCard>

          <InteractiveCard href={`/${lang}/learn/kalchakra`} borderColor="border-emerald-500" soundEnabled={soundEnabled}>
            <div className="flex items-start justify-between mb-8">
              <div className="h-14 w-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Clock size={28} />
              </div>
              <ArrowRight
                size={20}
                className="text-stone-400 dark:text-zinc-600 group-hover:text-emerald-500 -rotate-45 group-hover:rotate-0 transition-all duration-300"
              />
            </div>
            <div>
              <h2 className={`text-xl font-bold text-stone-900 dark:text-white uppercase tracking-tight mb-1 ${isIndic ? "leading-normal" : ""}`}>
                {t.c3_title}
              </h2>
              <p className="text-sm text-stone-500 dark:text-zinc-400 font-medium">{t.c3_sub}</p>
            </div>
          </InteractiveCard>

          <div className="md:col-span-2">
            <InteractiveCard href={`/${lang}/resources`} borderColor="border-blue-500" soundEnabled={soundEnabled}>
              <div className="flex items-start justify-between mb-8">
                <div className="h-14 w-14 rounded-2xl bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <BookOpen size={28} />
                </div>
                <ArrowRight
                  size={20}
                  className="text-stone-400 dark:text-zinc-600 group-hover:text-blue-500 -rotate-45 group-hover:rotate-0 transition-all duration-300"
                />
              </div>
              <div>
                <h2 className={`text-xl font-bold text-stone-900 dark:text-white uppercase tracking-tight mb-1 ${isIndic ? "leading-normal" : ""}`}>
                  {t.c5_title}
                </h2>
                <p className="text-sm text-stone-500 dark:text-zinc-400 font-medium">{t.c5_sub}</p>
              </div>
            </InteractiveCard>
          </div>
        </div>

        {/* Digambar Aagam Mandir - Scriptural Sanctuary */}
        <div className="w-full max-w-4xl p-8 rounded-3xl bg-stone-50/60 dark:bg-zinc-900/20 border border-stone-200/50 dark:border-zinc-800/50 backdrop-blur-md">
          <div className="flex items-center gap-3 mb-6">
            <ShieldCheck className="text-amber-600 dark:text-amber-400" size={24} />
            <div>
              <h2 className="text-lg font-bold text-stone-900 dark:text-white uppercase tracking-wider">{t.aagam_title}</h2>
              <p className="text-xs text-stone-500 dark:text-zinc-400">{t.aagam_sub}</p>
            </div>
          </div>

          <div className="space-y-8">
            {/* Samayasara Citation */}
            <div className="border-l-2 border-amber-500/40 pl-4">
              <p className="text-sm font-serif italic text-stone-700 dark:text-stone-300 leading-relaxed">
                &ldquo;अहमेको खलु सुद्धो दंसणणाणमइओ सयारूवी। णवि अत्थि मज्झ किंचि वि अण्णं परमाणुमेत्तं पि॥&rdquo;
              </p>
              <p className="text-xs text-stone-500 dark:text-zinc-400 mt-2 font-mono">
                — Acharya Kundakunda, <span className="italic">Samayasāra</span>, Gāthā 38
              </p>
              <p className="text-xs text-stone-400 dark:text-zinc-500 mt-1">
                Translation: &ldquo;I am indeed alone, pure, full of knowledge and perception, and ever formless. There is not even an atom of anything else that belongs to me.&rdquo;
              </p>
            </div>

            {/* Tattvartha Sutra Citation */}
            <div className="border-l-2 border-amber-500/40 pl-4">
              <p className="text-sm font-serif italic text-stone-700 dark:text-stone-300 leading-relaxed">
                &ldquo;सम्यग्दर्शनज्ञानचारित्राणि मोक्षमार्गः।&rdquo;
              </p>
              <p className="text-xs text-stone-500 dark:text-zinc-400 mt-2 font-mono">
                — Acharya Umasvati, <span className="italic">Tattvārtha Sūtra</span>, Ch. 1, Sutra 1
              </p>
              <p className="text-xs text-stone-400 dark:text-zinc-500 mt-1">
                Translation: &ldquo;Right belief, right knowledge, and right conduct together constitute the path to liberation.&rdquo;
              </p>
            </div>

            {/* Kevali Kavalahara Refutation & Digambaratva */}
            <div className="border-l-2 border-amber-500/40 pl-4">
              <p className="text-sm font-serif italic text-stone-700 dark:text-stone-300 leading-relaxed">
                &ldquo;क्षुत्पिपासाजरातङ्कजन्मान्तकभयस्मयाः। न यस्य लोमहर्षाद्याः स देवो वीतरागकृत्॥&rdquo;
              </p>
              <p className="text-xs text-stone-500 dark:text-zinc-400 mt-2 font-mono">
                — Acharya Samantabhadra, <span className="italic">Āptamīmāṁsā</span>, Gāthā 4
              </p>
              <p className="text-xs text-stone-400 dark:text-zinc-500 mt-1">
                Doctrine: Kevalis (Arihants) are free from hunger (Kavalahāra), thirst, disease, sleep, and physical fatigue. Absolute renunciation (Digambaratva) is mandatory for attaining Kevala Jñāna and Moksha in the same birth. Mallinātha Bhagwān is strictly a male Tirthankar who renounced the kingdom to attain liberation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}