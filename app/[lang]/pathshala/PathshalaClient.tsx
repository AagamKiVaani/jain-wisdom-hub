"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  BookOpen,
  Volume2,
  VolumeX,
  Play,
  CheckCircle,
  FileText,
  Trophy,
  Users,
  Compass,
  ArrowRight,
  Flame,
  Clock,
  Layers,
  GraduationCap,
  Sparkle,
  Sun,
  Eye,
  X,
  Radio,
  Zap,
  ShieldAlert,
  Award,
  Maximize2,
  Rotate3d,
} from "lucide-react";
import SacredSoul3DCanvas from "./components/SacredSoul3DCanvas";
import FriendSimulator from "./components/FriendSimulator";

interface LessonMilestone {
  number: number;
  title: string;
  subtitle: string;
  duration: string;
  category: "Dev-Shastra-Guru" | "Philosophy" | "Sadachar" | "Cosmology" | "Defense";
  categoryLabel: string;
  keyConcepts: string[];
  icon: string;
  badge: string;
  cheatSheetSummary: string;
  sampleQuestion: {
    q: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

const LESSONS_VOLUME_1: LessonMilestone[] = [
  {
    number: 1,
    title: "The Secret Compass: Navkar Mantra Decoded",
    subtitle: "Why we salute supreme virtues, not people, and how the 5 Parameshthis guide our daily thoughts.",
    duration: "6 mins",
    category: "Dev-Shastra-Guru",
    categoryLabel: "Dev-Shastra-Guru",
    keyConcepts: ["Arihant vs Siddha", "5 Supreme Beings", "Pure Intentions (Bhaav)"],
    icon: "🧭",
    badge: "Compass of Virtues",
    cheatSheetSummary: "Saluting detached qualities (Veetaragata) rather than historical individuals. Arihants teach; Siddhas guide from Moksha.",
    sampleQuestion: {
      q: "Who does the Namokar Mantra worship?",
      options: [
        "A specific historical person who demands praise",
        "The supreme virtues of pure, liberated souls (Veetaragata)",
        "A celestial king who grants worldly wishes",
      ],
      correctIndex: 1,
      explanation: "Namokar Mantra is purely non-sectarian. It bows to virtues and spiritual victory, never individual personalities.",
    },
  },
  {
    number: 2,
    title: "The Car and the Driver: Jīva vs. Ajīva",
    subtitle: "Discover the real 'You'. The body is like a luxury car, but the conscious soul is the eternal driver inside.",
    duration: "7 mins",
    category: "Philosophy",
    categoryLabel: "Core Philosophy",
    keyConcepts: ["Consciousness (Chetana)", "Body as Instrument", "Eternal Immortality"],
    icon: "💎",
    badge: "Master of Identity",
    cheatSheetSummary: "You are not your clothes, your phone, or your skin. You are the knowing, feeling consciousness (Jīva) operating the body.",
    sampleQuestion: {
      q: "In the car and driver analogy, what is the 'Driver'?",
      options: [
        "The brain cells and muscles",
        "The conscious, living soul (Jīva)",
        "The clothes we wear",
      ],
      correctIndex: 1,
      explanation: "The body changes and sheds like an old car, but the conscious soul (Jīva) is eternal and indestructible.",
    },
  },
  {
    number: 3,
    title: "The Ultimate Boomerang: Karma Physics",
    subtitle: "Nobody in the sky is judging or punishing you. Learn how subtle karma particles bind and shed like dust on a magnet.",
    duration: "8 mins",
    category: "Philosophy",
    categoryLabel: "Core Philosophy",
    keyConcepts: ["Action & Reaction", "Kashaya (Emotions)", "Nirjara (Cleansing)"],
    icon: "🪃",
    badge: "Karma Scientist",
    cheatSheetSummary: "Karma is not supernatural fate—it is subtle matter (Vargana) drawn to the soul by emotions like anger, pride, deceit, and greed.",
    sampleQuestion: {
      q: "Why do karma particles attach to the soul?",
      options: [
        "An angry deity attaches them to punish us",
        "Intense passions (Kashayas) like anger and greed create a magnetic pull",
        "It happens randomly by pure luck",
      ],
      correctIndex: 1,
      explanation: "Our own thoughts and emotional charge act like oil on clothes or a magnet attracting iron dust.",
    },
  },
  {
    number: 4,
    title: "The Microscopic Universe: 6 Kinds of Living Beings",
    subtitle: "Earth, water, fire, air, plant, and animal life. How ancient Jainism mapped microbiology centuries before microscopes.",
    duration: "7 mins",
    category: "Sadachar",
    categoryLabel: "Ahimsa Science",
    keyConcepts: ["Shad-Jeeva Nikaya", "One-Sensed Souls", "Universal Empathy"],
    icon: "🔬",
    badge: "Microbe Protector",
    cheatSheetSummary: "Jain Tirthankaras mapped 1-sensed life (Ekendriya) in drops of water, soil, and plants thousands of years before Antonie van Leeuwenhoek.",
    sampleQuestion: {
      q: "How many types of living beings does Jain biology recognize in the basic classification?",
      options: [
        "Only humans and animals",
        "6 classes (Shad-Jeeva Nikaya: Earth, Water, Fire, Air, Flora, Mobile)",
        "Only things visible to the naked eye",
      ],
      correctIndex: 1,
      explanation: "Jainism identifies life down to the single-celled and elemental level, teaching compassion for every life-form.",
    },
  },
  {
    number: 5,
    title: "Why Sunset Matters: Circadian Biology & Digestion",
    subtitle: "The real biological, microbial, and spiritual reasons behind eating before the sun sets.",
    duration: "6 mins",
    category: "Sadachar",
    categoryLabel: "Sadachar Science",
    keyConcepts: ["Ratri Bhojan Tyag", "Gut Health", "Nocturnal Bacteria"],
    icon: "🌅",
    badge: "Sunlight Champion",
    cheatSheetSummary: "Sunlight sterilizes the atmosphere and triggers digestive bile. At night, bacterial reproduction surges and gut motility falls asleep.",
    sampleQuestion: {
      q: "Why do Jains practice eating before sunset?",
      options: [
        "Because God gets mad if we eat in darkness",
        "Circadian biology, nocturnal bacterial surges, and metabolic rest",
        "It's just an old tradition from before lightbulbs",
      ],
      correctIndex: 1,
      explanation: "Even with modern LED lights, our circadian metabolic enzymes shut down at night and nocturnal micro-organisms multiply.",
    },
  },
  {
    number: 6,
    title: "Roots, Bulbs & Compassion: Why No Kandmool?",
    subtitle: "Understanding 'Anant-kaya'—why potatoes and carrots house millions of lives, and fruits do not.",
    duration: "7 mins",
    category: "Sadachar",
    categoryLabel: "Sadachar Science",
    keyConcepts: ["Single vs Infinite Lives", "Botanical Ethics", "Playground Explanation"],
    icon: "🌱",
    badge: "Ahimsa Botanist",
    cheatSheetSummary: "An apple can be plucked without killing the tree (Pratyeka-shareera). A single potato tuber is Anant-kaya housing infinite developing life centers.",
    sampleQuestion: {
      q: "What makes root vegetables different from fruits according to Jain science?",
      options: [
        "Roots taste worse",
        "Roots are 'Anant-kaya', containing infinite interconnected lives in a single bulb",
        "There is no difference, it's just arbitrary",
      ],
      correctIndex: 1,
      explanation: "Pulling a root destroys the entire plant and infinite micro-embryos, while fruits drop naturally with zero harm to the mother tree.",
    },
  },
  {
    number: 7,
    title: "Ahimsa in the School Playground: Beyond Food",
    subtitle: "Non-violence in your words, games, and chats. Standing up to bullying and teasing with poise and quiet strength.",
    duration: "6 mins",
    category: "Defense",
    categoryLabel: "Practical Ethics",
    keyConcepts: ["Vachan Gupti (Kind Words)", "Anti-Bullying", "Digital Ahimsa"],
    icon: "🛡️",
    badge: "Peace Guardian",
    cheatSheetSummary: "Ahimsa is not weakness. It is the immense inner courage to refuse cruelty in speech, online messages, and school interactions.",
    sampleQuestion: {
      q: "What is the highest form of Ahimsa in daily school life?",
      options: [
        "Staying completely quiet and letting people bully you",
        "Speaking truth with calm courage and refusing to engage in hurtful gossip",
        "Insulting others when they tease you",
      ],
      correctIndex: 1,
      explanation: "Vachan-Gupti and Ahimsa require supreme bravery: being kind, truthful, and calm even under playground pressure.",
    },
  },
  {
    number: 8,
    title: "The 4 Roads of the Soul: The Chaar Gati Journey",
    subtitle: "Where do living beings come from and go? Why being born a human is the ultimate golden opportunity.",
    duration: "8 mins",
    category: "Cosmology",
    categoryLabel: "Cosmology",
    keyConcepts: ["Narak, Tiriyanch, Manushya, Deva", "Rare Human Birth", "Path to Moksha"],
    icon: "🎡",
    badge: "Cosmic Explorer",
    cheatSheetSummary: "Souls journey through 4 realms (Gatis). Only in a human body can one exercise rational restraint and attain Moksha.",
    sampleQuestion: {
      q: "Which realm allows a soul to achieve liberation (Moksha)?",
      options: [
        "Heavenly realm (Deva Gati) because of luxuries",
        "Human realm (Manushya Gati) through disciplined effort and self-realization",
        "All realms equally without any discipline",
      ],
      correctIndex: 1,
      explanation: "Even heavenly beings must be born as humans to practice the Three Jewels (Ratnatraya) and achieve final liberation.",
    },
  },
  {
    number: 9,
    title: "Role Models of Real Courage: Inspiring Digambar Tales",
    subtitle: "How Queen Chandanbala's pure mindset and King Shrenik's awakening proved that character conquers destiny.",
    duration: "7 mins",
    category: "Dev-Shastra-Guru",
    categoryLabel: "Scripture Stories",
    keyConcepts: ["Chandanbala's Faith", "King Shrenik's Samyak Darshan", "Inner Strength"],
    icon: "👑",
    badge: "Valor of Truth",
    cheatSheetSummary: "True heroes are not those who conquer outer kingdoms with armies, but those who conquer their own inner anger, pride, and greed.",
    sampleQuestion: {
      q: "Who is called a 'Jina' (Conqueror) in Jain philosophy?",
      options: [
        "A military general who wins wars",
        "One who conquers their own inner passions and desires",
        "A person who accumulates the most wealth",
      ],
      correctIndex: 1,
      explanation: "Jina literally means conqueror of the inner enemies: anger, ego, deception, and greed.",
    },
  },
  {
    number: 10,
    title: "The School Defense Masterclass: Ask Me Anything",
    subtitle: "Practical 30-second cheat codes to answer any friend's question with calm logic, humor, and unshakeable pride.",
    duration: "9 mins",
    category: "Defense",
    categoryLabel: "Peer Defense",
    keyConcepts: ["Confidence & Wit", "No Apologies", "Friendship & Respect"],
    icon: "🎓",
    badge: "Graduated Young Shravak",
    cheatSheetSummary: "Never feel embarrassed or apologetic. Explain your choices with scientific clarity, smile, and invite friends to see the beauty of compassion.",
    sampleQuestion: {
      q: "When a friend asks why you don't eat meat or night meals, what is the best mindset?",
      options: [
        "Feel ashamed and hide your food in your backpack",
        "Explain with joyful confidence, scientific logic, and pride in kindness",
        "Get defensive and yell at them",
      ],
      correctIndex: 1,
      explanation: "Kindness and scientific discipline are superpowers. True friends admire clarity and principle.",
    },
  },
];

export default function PathshalaClient({ lang }: { lang: string }) {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [activeTier, setActiveTier] = useState<"kids" | "core" | "teens">("core");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [selectedLesson, setSelectedLesson] = useState<LessonMilestone | null>(null);
  const [lessonLanguage, setLessonLanguage] = useState<"en" | "hi">("en");
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showQuizResult, setShowQuizResult] = useState(false);

  // Sibling Profile / Gamification State
  const [activeProfile, setActiveProfile] = useState<"aarav" | "ananya">("aarav");
  const [aaravXp, setAaravXp] = useState(620);
  const [ananyaXp, setAnanyaXp] = useState(1240);
  const [floatingXp, setFloatingXp] = useState<string | null>(null);

  const playSound = (soundType: "click" | "success" | "toggle" = "click") => {
    if (!soundEnabled) return;
    try {
      const a = new Audio("/sounds/resources/click2.mp3");
      a.volume = 0.55;
      a.play().catch(() => {});
    } catch (e) {}
  };

  const handleTierChange = (tier: "kids" | "core" | "teens") => {
    playSound("toggle");
    setActiveTier(tier);
  };

  const handleAddXp = () => {
    playSound("success");
    const bonus = 50;
    if (activeProfile === "aarav") {
      setAaravXp((prev) => prev + bonus);
    } else {
      setAnanyaXp((prev) => prev + bonus);
    }
    setFloatingXp(`+${bonus} Atman XP`);
    setTimeout(() => setFloatingXp(null), 1800);
  };

  const filteredLessons = LESSONS_VOLUME_1.filter((l) => {
    if (categoryFilter === "all") return true;
    return l.category === categoryFilter;
  });

  return (
    <div className="relative min-h-screen bg-[#040407] text-white selection:bg-amber-400 selection:text-black overflow-x-hidden">
      {/* 3D Dynamic Ambient Starry Background */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-amber-500/15 via-orange-600/5 to-transparent blur-[160px] rounded-full" />
        <div className="absolute top-[35%] right-[-12%] w-[600px] h-[600px] bg-amber-600/10 blur-[180px] rounded-full" />
        <div className="absolute top-[70%] left-[-15%] w-[700px] h-[700px] bg-yellow-500/10 blur-[200px] rounded-full" />

        {/* Holographic Matrix Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:32px_32px]"
          aria-hidden="true"
        />
      </div>

      {/* Floating Sound Toggle */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => {
            const next = !soundEnabled;
            setSoundEnabled(next);
            if (next) playSound();
          }}
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-amber-500/40 bg-black/85 backdrop-blur-2xl shadow-2xl shadow-amber-500/20 text-xs font-mono text-amber-300 hover:border-amber-400 transition-all cursor-pointer"
        >
          {soundEnabled ? (
            <>
              <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />
              <span className="font-semibold tracking-wide">3D Audio ON</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-gray-400" />
              <span className="text-gray-400">Audio Muted</span>
            </>
          )}
        </motion.button>
      </div>

      {/* ========================================================================= */}
      {/* 1. CINEMATIC 3D HERO STAGE: THE LIVING SOUL CRYSTAL (CENTERPIECE) */}
      {/* ========================================================================= */}
      <section className="relative z-10 pt-8 pb-16 md:pt-14 md:pb-24 px-4 max-w-7xl mx-auto">
        {/* Top Sacred Pill */}
        <div className="flex justify-center mb-6">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-amber-500/40 bg-gradient-to-r from-amber-500/15 via-amber-400/25 to-amber-500/15 backdrop-blur-2xl shadow-xl shadow-amber-500/15"
          >
            <Sparkle className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: "10s" }} />
            <span className="text-xs md:text-sm font-bold text-amber-200 tracking-wider font-mono uppercase">
              Aagam Ki Vaani • 3D Digital Pathshala
            </span>
            <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-ping" />
          </motion.div>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.08] mb-6 font-serif"
          >
            Ancient Jain Science. <br />
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(245,158,11,0.35)]">
              Real-Time 3D Mastery.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto font-light"
          >
            An immersive academy built for young minds aged <strong>8–12</strong>. Master the biology, karma physics, and unshakable logic to live and proudly explain Jainism anywhere in the world.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#holo-curriculum"
              onClick={() => playSound()}
              className="px-8 py-3.5 rounded-2xl font-bold text-sm md:text-base bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-black shadow-xl shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Explore 10 3D Holo-Lessons</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#school-defense-simulator"
              onClick={() => playSound()}
              className="px-6 py-3.5 rounded-2xl font-semibold text-sm md:text-base border border-amber-500/30 bg-amber-500/5 hover:bg-amber-500/15 hover:border-amber-400 text-amber-200 hover:text-white transition-all flex items-center gap-2 backdrop-blur-xl cursor-pointer"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Play Friend Simulator</span>
            </a>
          </motion.div>
        </div>

        {/* ========================================================================= */}
        {/* TRUE 3D WEBGL CENTERPIECE: THE SACRED SOUL 3D STAGE */}
        {/* ========================================================================= */}
        <div className="max-w-6xl mx-auto mt-6">
          <div className="relative rounded-3xl p-1 bg-gradient-to-b from-amber-500/50 via-amber-500/20 to-transparent shadow-[0_0_60px_rgba(245,158,11,0.2)]">
            <div className="relative rounded-[22px] bg-black/90 border border-amber-500/30 overflow-hidden backdrop-blur-2xl">
              {/* HUD Header Bar */}
              <div className="px-6 py-3.5 bg-gradient-to-r from-amber-950/40 via-black to-amber-950/40 border-b border-amber-500/25 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="font-bold text-amber-300 uppercase tracking-wider">WebGL 3D Engine: Active</span>
                  </div>
                  <span className="text-gray-500 hidden sm:inline">|</span>
                  <span className="text-gray-400 hidden sm:inline">Three.js Physical Shaders</span>
                </div>

                <div className="flex items-center gap-4 text-[11px] text-amber-200/80">
                  <span className="bg-white/5 px-2.5 py-1 rounded-md border border-white/10">Ratnatraya Orbit: 3 Rings</span>
                  <span className="bg-white/5 px-2.5 py-1 rounded-md border border-white/10 hidden md:inline">500 Golden Stardust Particles</span>
                </div>
              </div>

              {/* Main 3D Canvas Viewport */}
              <div className="w-full h-[480px] md:h-[560px]">
                <SacredSoul3DCanvas soundEnabled={soundEnabled} />
              </div>

              {/* 3D Features Footer Banner */}
              <div className="px-6 py-4 bg-gradient-to-t from-amber-950/40 via-black/80 to-transparent border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="p-2">
                  <div className="text-amber-400 text-lg md:text-xl font-bold font-mono">60-120 FPS</div>
                  <div className="text-[11px] text-gray-400">Zero-Lag WebGL Physics</div>
                </div>
                <div className="p-2">
                  <div className="text-amber-400 text-lg md:text-xl font-bold font-mono">360° Drag Orbit</div>
                  <div className="text-[11px] text-gray-400">Tactile Touch & Mouse</div>
                </div>
                <div className="p-2">
                  <div className="text-amber-400 text-lg md:text-xl font-bold font-mono">Krodha vs Kshama</div>
                  <div className="text-[11px] text-gray-400">Real Karma Particle Flow</div>
                </div>
                <div className="p-2">
                  <div className="text-amber-400 text-lg md:text-xl font-bold font-mono">Pure Atman</div>
                  <div className="text-[11px] text-gray-400">Faceted Refractive Gem</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. ADAPTIVE AGE HORIZONS (5-7, 8-12, 13+) */}
      {/* ========================================================================= */}
      <section className="relative z-10 py-16 px-4 max-w-7xl mx-auto border-t border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-xs font-mono text-amber-300 uppercase tracking-widest mb-3">
            Adaptive Pedagogy
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif mb-3">
            One Timeless Wisdom. <br />
            <span className="text-amber-400">Scaled for Every Age.</span>
          </h2>
          <p className="text-sm md:text-base text-gray-300">
            Canonical concepts curated so young toddlers learn through animal compassion, kids master peer defense and biology, and teens debate cosmology and quantum physics.
          </p>

          {/* Interactive Tier Switcher */}
          <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-white/5 border border-amber-500/30 backdrop-blur-xl shadow-lg">
            <button
              onClick={() => handleTierChange("kids")}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTier === "kids"
                  ? "bg-amber-500 text-black shadow-lg shadow-amber-500/30 scale-[1.02]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              🧒 Ages 5 – 7 (Little Seekers)
            </button>

            <button
              onClick={() => handleTierChange("core")}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTier === "core"
                  ? "bg-amber-500 text-black shadow-lg shadow-amber-500/30 scale-[1.02]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              🚀 Ages 8 – 12 (Young Shravaks)
            </button>

            <button
              onClick={() => handleTierChange("teens")}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTier === "teens"
                  ? "bg-amber-500 text-black shadow-lg shadow-amber-500/30 scale-[1.02]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              🧠 Ages 13+ (Jain Thinkers)
            </button>
          </div>
        </div>

        {/* Tier Cards with Glowing 3D Borders */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTier === "kids" && (
              <motion.div
                key="kids"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="p-6 md:p-8 rounded-3xl border border-amber-500/30 bg-gradient-to-b from-amber-950/20 via-black/80 to-black backdrop-blur-2xl shadow-2xl"
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30">🧒</span>
                  <div>
                    <h3 className="text-2xl font-bold text-white font-serif">Tier 1: Little Seekers (Ages 5–7)</h3>
                    <p className="text-xs text-amber-300 font-mono tracking-wide">Foundation of Kindness, Stories & Good Habits</p>
                  </div>
                </div>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed mb-6">
                  Fosters natural empathy for pets, insects, and birds. Simple morning and bedtime Navkar recitations, Mandir darshan joy, and vibrant illustrated storytelling (Parshwanath and the Serpent, Chandanbala's gentle spirit).
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-gray-300">
                    🐾 <strong>Animal Empathy:</strong> Realizing every tiny creature feels joy and pain just like us.
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-gray-300">
                    🪔 <strong>Mandir Darshan:</strong> Experiencing peace, purity, and singing stutis with reverence.
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-gray-300">
                    🎨 <strong>Visual Adventures:</strong> Colorful illustrated rhymes and engaging puzzle games.
                  </div>
                </div>
              </motion.div>
            )}

            {activeTier === "core" && (
              <motion.div
                key="core"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="p-6 md:p-8 rounded-3xl border-2 border-amber-500/50 bg-gradient-to-b from-amber-900/25 via-black/90 to-black backdrop-blur-2xl shadow-[0_0_50px_rgba(245,158,11,0.2)]"
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl p-3 rounded-2xl bg-amber-500/20 border border-amber-500/40">🚀</span>
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-[11px] font-mono text-amber-300 uppercase tracking-wider mb-1">
                      ⭐ Flagship Core Academy
                    </div>
                    <h3 className="text-2xl font-bold text-white font-serif">Tier 2: Young Shravaks (Ages 8–12)</h3>
                  </div>
                </div>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed mb-6">
                  The primary comprehensive pathshala. Equips kids with unbreakable logical confidence: Soul vs Body, Karma Magnetism, the microbiology of avoiding root vegetables & sunset meals, and quick-witted playground defense.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-xs text-amber-100">
                    🔬 <strong>Microbiology of Ahimsa:</strong> Circadian enzymes and infinite life centers in roots.
                  </div>
                  <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-xs text-amber-100">
                    💎 <strong>Jīva & Karma Magnetics:</strong> Who am I? Understanding the driver vs the body car.
                  </div>
                  <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-xs text-amber-100">
                    🏆 <strong>School Defense Mastery:</strong> Answering friends with calm pride, humor, and science.
                  </div>
                </div>
              </motion.div>
            )}

            {activeTier === "teens" && (
              <motion.div
                key="teens"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="p-6 md:p-8 rounded-3xl border border-amber-500/30 bg-gradient-to-b from-amber-950/20 via-black/80 to-black backdrop-blur-2xl shadow-2xl"
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30">🧠</span>
                  <div>
                    <h3 className="text-2xl font-bold text-white font-serif">Tier 3: Jain Thinkers (Ages 13+)</h3>
                    <p className="text-xs text-amber-300 font-mono tracking-wide">Ontology, Cosmology, Quantum Physics & Debate</p>
                  </div>
                </div>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed mb-6">
                  Deepens into canonical Tattvārtha Sūtra and Samayasāra. Unpacking the 6 Eternal Realities (Shad Dravya), Anekantavada (multi-faceted epistemology), and contrasting Jain uncreated cosmos with energy conservation laws.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-gray-300">
                    🌌 <strong>Uncreated Cosmos:</strong> 6 eternal dravyas operating by perpetual natural laws.
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-gray-300">
                    ⚖️ <strong>Anekantavada:</strong> The intellectual antidote to dogmatism and ideological bias.
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-gray-300">
                    📜 <strong>Canonical Shastras:</strong> Direct readings of Acharya Umāsvāmi & Kundkund texts.
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. THE 4 SUPERPOWERS QUADRANT */}
      {/* ========================================================================= */}
      <section className="relative z-10 py-16 px-4 max-w-7xl mx-auto border-t border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-xs font-mono text-amber-300 uppercase tracking-widest mb-3">
            Pedagogical Quad
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif">
            The 4 Superpowers in Every Lesson
          </h2>
          <p className="text-sm md:text-base text-gray-400 mt-2">
            No dry walls of text. Every single concept is absorbed through four synchronized visual and interactive channels.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Quad 1: Remotion 4K Videos */}
          <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-b from-amber-950/20 via-black/80 to-black p-7 backdrop-blur-2xl hover:border-amber-400 transition-all shadow-xl group">
            <div className="flex items-center justify-between mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/20 border border-amber-500/30 text-2xl">
                🎬
              </div>
              <span className="text-xs font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
                Multilingual Audio
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 font-serif">1. 5-Min Remotion AI 4K Videos</h3>
            <p className="text-sm text-gray-300 leading-relaxed mb-5 font-light">
              Crisp animated code-rendered videos. Visualizing soul luminosity, microscopic organism clusters, and karma physics with crystal clarity.
            </p>
            <div className="relative h-36 rounded-2xl bg-black/80 border border-white/10 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-amber-500/10" />
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-amber-500 text-black flex items-center justify-center shadow-lg shadow-amber-500/30 group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-white">English Visuals • Dual Audio (EN / HI)</div>
                  <div className="text-[11px] font-mono text-amber-300">Fast 5-Minute Lessons</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quad 2: Real-time 3D WebGL Labs */}
          <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-b from-amber-950/20 via-black/80 to-black p-7 backdrop-blur-2xl hover:border-amber-400 transition-all shadow-xl group">
            <div className="flex items-center justify-between mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/20 border border-amber-500/30 text-2xl">
                🔮
              </div>
              <span className="text-xs font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
                Interactive WebGL
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 font-serif">2. Live Interactive Concept Visualizers</h3>
            <p className="text-sm text-gray-300 leading-relaxed mb-5 font-light">
              Kids understand when they can touch and rotate variables. Manipulate 3D soul crystals, trigger karmic dust inflows, and see nirjara shockwaves live.
            </p>
            <div className="h-36 rounded-2xl bg-black/80 border border-white/10 p-4 flex flex-col justify-center items-center text-center">
              <Rotate3d className="w-7 h-7 text-amber-400 animate-spin" style={{ animationDuration: "14s" }} />
              <div className="text-xs font-bold text-amber-200 mt-2">Zero-Lag Real-Time 3D Physics</div>
              <div className="text-[11px] font-mono text-gray-400">Manipulate and observe cause & effect instantly</div>
            </div>
          </div>

          {/* Quad 3: 1-Page Summary Cheat Sheets */}
          <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-b from-amber-950/20 via-black/80 to-black p-7 backdrop-blur-2xl hover:border-amber-400 transition-all shadow-xl group">
            <div className="flex items-center justify-between mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/20 border border-amber-500/30 text-2xl">
                📄
              </div>
              <span className="text-xs font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
                Printable PDF
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 font-serif">3. 1-Page Summary Infographic Sheets</h3>
            <p className="text-sm text-gray-300 leading-relaxed mb-5 font-light">
              Ultra-high density 1-page summaries. Pin them to study desks, lockers, or refrigerators for a 60-second glance that recalls the whole lesson.
            </p>
            <div className="h-36 rounded-2xl bg-black/80 border border-white/10 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-amber-400" />
                <div className="text-left">
                  <div className="text-xs font-bold text-white">Lesson_CheatSheets_Vol1.pdf</div>
                  <div className="text-[11px] text-gray-400">10 High-Resolution Visual Guides</div>
                </div>
              </div>
              <span className="text-xs font-mono text-amber-300 bg-amber-500/10 border border-amber-500/25 px-3 py-1.5 rounded-xl">
                Free Download
              </span>
            </div>
          </div>

          {/* Quad 4: Peer Defense Mastery Quizzes */}
          <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-b from-amber-950/20 via-black/80 to-black p-7 backdrop-blur-2xl hover:border-amber-400 transition-all shadow-xl group">
            <div className="flex items-center justify-between mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/20 border border-amber-500/30 text-2xl">
                🏆
              </div>
              <span className="text-xs font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
                Gamified Mastery
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 font-serif">4. Peer Defense Mastery Quizzes</h3>
            <p className="text-sm text-gray-300 leading-relaxed mb-5 font-light">
              Zero boring rote tests. Real-life scenarios where children practice witty, kind, and scientifically accurate answers to school friend inquiries.
            </p>
            <div className="h-36 rounded-2xl bg-black/80 border border-white/10 p-4 flex items-center justify-around text-center">
              <div>
                <div className="text-2xl font-bold text-amber-400 font-mono">10</div>
                <div className="text-[11px] text-gray-400">Badges to Unlock</div>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div>
                <div className="text-2xl font-bold text-amber-400 font-mono">100%</div>
                <div className="text-[11px] text-gray-400">Confidence at School</div>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div>
                <div className="text-2xl font-bold text-amber-400 font-mono">0 Stress</div>
                <div className="text-[11px] text-gray-400">Pure Joy of Learning</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. "ANSWER YOUR FRIEND" INTERACTIVE SCHOOL DEFENSE SIMULATOR */}
      {/* ========================================================================= */}
      <section id="school-defense-simulator" className="relative z-10 py-16 px-4 max-w-7xl mx-auto border-t border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-xs font-mono text-amber-300 uppercase tracking-widest mb-3">
            Real-Life School Simulator
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif mb-3">
            How Do You Answer Your Friends?
          </h2>
          <p className="text-sm md:text-base text-gray-400">
            Try this interactive school simulator! Tap a scenario below and choose the most confident, scientifically accurate response.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <FriendSimulator soundEnabled={soundEnabled} />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. 3D HOLO-DECK CURRICULUM: 10 INTERACTIVE LESSON MODULES */}
      {/* ========================================================================= */}
      <section id="holo-curriculum" className="relative z-10 py-16 px-4 max-w-7xl mx-auto border-t border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-xs font-mono text-amber-300 uppercase tracking-widest mb-3">
            Volume 1 Holo-Deck
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif mb-3">
            The 10-Lesson Learning Constellation
          </h2>
          <p className="text-sm md:text-base text-gray-400">
            Click any lesson card below to open its holographic study inspector, launch the interactive quiz, or preview the video summary.
          </p>

          {/* Category Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {[
              { id: "all", label: "All 10 Lessons" },
              { id: "Dev-Shastra-Guru", label: "Dev-Shastra-Guru" },
              { id: "Philosophy", label: "Core Philosophy" },
              { id: "Sadachar", label: "Sadachar Science" },
              { id: "Cosmology", label: "Cosmology" },
              { id: "Defense", label: "Peer Defense" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  playSound();
                  setCategoryFilter(tab.id);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                  categoryFilter === tab.id
                    ? "bg-amber-500 text-black font-bold shadow-lg shadow-amber-500/25"
                    : "bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-amber-400/40"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Holo-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {filteredLessons.map((lesson) => (
            <motion.div
              key={lesson.number}
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              onClick={() => {
                playSound();
                setSelectedLesson(lesson);
                setSelectedAnswer(null);
                setShowQuizResult(false);
              }}
              className="relative rounded-3xl border border-amber-500/25 bg-gradient-to-b from-amber-950/15 via-black/80 to-black p-6 backdrop-blur-xl hover:border-amber-400 hover:shadow-[0_0_30px_rgba(245,158,11,0.25)] transition-all cursor-pointer group flex flex-col justify-between"
            >
              {/* Card Header */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/30 text-2xl group-hover:scale-110 transition-transform">
                      {lesson.icon}
                    </span>
                    <div>
                      <div className="text-[11px] font-mono text-amber-400 font-bold uppercase tracking-wider">
                        Lesson #{lesson.number} • {lesson.categoryLabel}
                      </div>
                      <div className="text-[11px] text-gray-400 font-mono">{lesson.duration} 4K Video</div>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-[11px] font-semibold text-amber-300">
                    <Trophy className="w-3 h-3 text-amber-400" />
                    <span>{lesson.badge}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors font-serif mb-1.5">
                  {lesson.title}
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed font-light mb-4">
                  {lesson.subtitle}
                </p>
              </div>

              {/* Card Footer: Concept Tags & Click Hint */}
              <div className="border-t border-white/10 pt-3 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {lesson.keyConcepts.map((kc, i) => (
                    <span
                      key={i}
                      className="text-[10px] text-amber-200/80 bg-amber-500/5 border border-amber-500/20 px-2 py-0.5 rounded-md font-mono"
                    >
                      {kc}
                    </span>
                  ))}
                </div>

                <div className="text-xs font-mono text-amber-400 flex items-center gap-1 shrink-0 ml-2 group-hover:translate-x-1 transition-transform">
                  <span>Inspect</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. LESSON INSPECTOR MODAL (HOLOGRAM DRAWER) */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedLesson && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              className="relative w-full max-w-3xl rounded-3xl border-2 border-amber-500/50 bg-gradient-to-b from-amber-950/40 via-black/95 to-black p-6 md:p-8 shadow-[0_0_80px_rgba(245,158,11,0.3)] overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedLesson(null)}
                className="absolute top-5 right-5 h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Top Header */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl p-2 rounded-2xl bg-amber-500/20 border border-amber-500/30">
                  {selectedLesson.icon}
                </span>
                <div>
                  <div className="text-xs font-mono text-amber-400 uppercase tracking-widest font-bold">
                    Lesson #{selectedLesson.number} • {selectedLesson.categoryLabel}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white font-serif">
                    {selectedLesson.title}
                  </h2>
                </div>
              </div>

              {/* Video Player Preview Box */}
              <div className="relative rounded-2xl bg-black border border-amber-500/30 p-5 mb-6 overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping" />
                    <span className="text-xs font-mono text-amber-300">Remotion 4K Animation Preview</span>
                  </div>

                  {/* Language Audio Selector */}
                  <div className="flex items-center p-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono">
                    <button
                      onClick={() => {
                        playSound();
                        setLessonLanguage("en");
                      }}
                      className={`px-3 py-1 rounded ${
                        lessonLanguage === "en"
                          ? "bg-amber-500 text-black font-bold"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      English Audio
                    </button>
                    <button
                      onClick={() => {
                        playSound();
                        setLessonLanguage("hi");
                      }}
                      className={`px-3 py-1 rounded ${
                        lessonLanguage === "hi"
                          ? "bg-amber-500 text-black font-bold"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      हिन्दी ऑडियो
                    </button>
                  </div>
                </div>

                <div className="relative h-44 rounded-xl bg-gradient-to-t from-black via-black/70 to-amber-950/30 border border-white/10 flex flex-col items-center justify-center">
                  <div className="h-14 w-14 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 text-black flex items-center justify-center shadow-lg shadow-amber-500/40 cursor-pointer hover:scale-105 transition-transform">
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </div>
                  <span className="text-xs font-mono text-gray-300 mt-3">
                    {lessonLanguage === "en"
                      ? "Play 5-Minute Animation with English Voiceover"
                      : "हिन्दी ऑडियो एवं अंग्रेज़ी दृश्यों के साथ पाठ चलाएं"}
                  </span>
                </div>
              </div>

              {/* 1-Page Summary Cheat Sheet Preview */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-6">
                <div className="flex items-center gap-2 mb-2 text-xs font-mono text-amber-400 font-bold uppercase">
                  <FileText className="w-4 h-4" />
                  <span>1-Page Cheat Sheet Key Takeaway</span>
                </div>
                <p className="text-sm text-gray-200 leading-relaxed font-light">
                  {selectedLesson.cheatSheetSummary}
                </p>
              </div>

              {/* Interactive Quick Quiz */}
              <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-amber-300 font-bold uppercase">
                    <Trophy className="w-4 h-4 text-amber-400" />
                    <span>Quick Concept Check</span>
                  </div>
                  <span className="text-[11px] font-mono text-gray-400">Unlock: {selectedLesson.badge}</span>
                </div>

                <p className="text-sm font-semibold text-white mb-3">
                  {selectedLesson.sampleQuestion.q}
                </p>

                <div className="space-y-2 mb-4">
                  {selectedLesson.sampleQuestion.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        playSound();
                        setSelectedAnswer(i);
                        setShowQuizResult(true);
                      }}
                      className={`w-full text-left p-3 rounded-xl text-xs md:text-sm transition-all cursor-pointer ${
                        selectedAnswer === i
                          ? i === selectedLesson.sampleQuestion.correctIndex
                            ? "bg-emerald-500/20 border-2 border-emerald-400 text-emerald-100"
                            : "bg-red-500/20 border-2 border-red-400 text-red-100"
                          : "bg-black/60 border border-white/10 text-gray-300 hover:border-amber-400/50 hover:bg-black/80"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-xs text-amber-400 font-bold">[{i + 1}]</span>
                        <span>{opt}</span>
                      </div>
                    </button>
                  ))}
                </div>

                {showQuizResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-xl bg-black/60 border border-white/10 text-xs font-mono text-amber-200"
                  >
                    {selectedAnswer === selectedLesson.sampleQuestion.correctIndex ? (
                      <span className="text-emerald-400 font-bold">✨ Correct! {selectedLesson.sampleQuestion.explanation}</span>
                    ) : (
                      <span className="text-amber-300">💡 Tip: {selectedLesson.sampleQuestion.explanation}</span>
                    )}
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 7. FAMILY GUILD & SPIRIT LEVEL SYSTEM (NO LEGAL FLUFF) */}
      {/* ========================================================================= */}
      <section className="relative z-10 py-16 px-4 max-w-7xl mx-auto border-t border-white/10">
        <div className="max-w-4xl mx-auto rounded-3xl border-2 border-amber-500/40 bg-gradient-to-b from-amber-950/20 via-black to-black p-8 md:p-12 backdrop-blur-2xl shadow-[0_0_50px_rgba(245,158,11,0.15)] relative overflow-hidden">
          {/* Floating XP Notification */}
          <AnimatePresence>
            {floatingXp && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-6 right-6 z-20 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-mono font-bold text-xs shadow-xl shadow-amber-500/40"
              >
                ✨ {floatingXp}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-xs font-mono text-amber-300 mb-4">
              <Users className="w-3.5 h-3.5" />
              <span>Family Guild & Soul Level System</span>
            </div>

            <h3 className="text-3xl md:text-4xl font-bold font-serif text-white mb-3">
              One Family Hub. Infinite Growth.
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed font-light">
              Track progress together across all siblings. Log daily sadachar habits, practice school defense answers, and unlock badges on a single shared family hub.
            </p>
          </div>

          {/* Sibling Profile Switcher */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto mb-8">
            {/* Aarav Card */}
            <div
              onClick={() => {
                playSound();
                setActiveProfile("aarav");
              }}
              className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                activeProfile === "aarav"
                  ? "bg-amber-500/15 border-2 border-amber-400 shadow-xl shadow-amber-500/20"
                  : "bg-white/[0.03] border-white/10 hover:border-amber-500/30"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl p-2 rounded-xl bg-amber-500/20">🦁</span>
                  <div>
                    <div className="text-base font-bold text-white font-serif">Aarav (Age 9)</div>
                    <div className="text-[11px] text-amber-400 font-mono">Young Shravak • Level 2</div>
                  </div>
                </div>
                <div className="text-xs font-mono text-amber-300 font-bold">{aaravXp} XP</div>
              </div>

              <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden mb-2">
                <div
                  className="bg-gradient-to-r from-amber-500 to-yellow-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (aaravXp / 1000) * 100)}%` }}
                />
              </div>

              <div className="flex justify-between text-[11px] font-mono text-gray-400">
                <span>Progress: 4/10 Lessons</span>
                <span className="text-amber-300">🔥 7-Day Ahimsa Streak</span>
              </div>
            </div>

            {/* Ananya Card */}
            <div
              onClick={() => {
                playSound();
                setActiveProfile("ananya");
              }}
              className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                activeProfile === "ananya"
                  ? "bg-amber-500/15 border-2 border-amber-400 shadow-xl shadow-amber-500/20"
                  : "bg-white/[0.03] border-white/10 hover:border-amber-500/30"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl p-2 rounded-xl bg-amber-500/20">🦚</span>
                  <div>
                    <div className="text-base font-bold text-white font-serif">Ananya (Age 12)</div>
                    <div className="text-[11px] text-amber-400 font-mono">Young Shravak • Level 3</div>
                  </div>
                </div>
                <div className="text-xs font-mono text-amber-300 font-bold">{ananyaXp} XP</div>
              </div>

              <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden mb-2">
                <div
                  className="bg-gradient-to-r from-amber-500 to-yellow-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (ananyaXp / 1500) * 100)}%` }}
                />
              </div>

              <div className="flex justify-between text-[11px] font-mono text-gray-400">
                <span>Progress: 7/10 Lessons</span>
                <span className="text-amber-300">🔥 12-Day Ahimsa Streak</span>
              </div>
            </div>
          </div>

          {/* Interactive XP Power-Up Button */}
          <div className="text-center">
            <button
              onClick={handleAddXp}
              className="px-6 py-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-200 font-mono text-xs font-bold hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-lg shadow-amber-500/10"
            >
              ⚡ Complete Daily Sadachar Challenge (+50 XP)
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. FOOTER */}
      {/* ========================================================================= */}
      <footer className="relative z-10 py-12 px-4 max-w-7xl mx-auto border-t border-white/10 text-center">
        <p className="text-xs md:text-sm text-gray-400 leading-relaxed max-w-xl mx-auto">
          Dedicated to the timeless Digambar Jain canonical tradition of Acharya Kundkund and Acharya Umāsvāmi.
        </p>
        <div className="mt-4 flex items-center justify-center gap-4 text-xs font-mono text-amber-400">
          <Link href={`/${lang}`} className="hover:underline">
            Home
          </Link>
          <span>•</span>
          <Link href={`/${lang}/resources`} className="hover:underline">
            Wisdom Library
          </Link>
          <span>•</span>
          <Link href={`/${lang}/about`} className="hover:underline">
            About Aagam Ki Vaani
          </Link>
        </div>
      </footer>
    </div>
  );
}
