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
  ShieldCheck,
  GraduationCap,
  Sparkle,
  Sun,
  Eye,
} from "lucide-react";
import SoulVisualizerPreview from "./components/SoulVisualizerPreview";
import FriendSimulator from "./components/FriendSimulator";
import Card3DContainer, { Card3DItem } from "@/components/Card3D";

interface LessonMilestone {
  number: number;
  title: string;
  subtitle: string;
  duration: string;
  category: string;
  keyConcepts: string[];
  icon: string;
  badge: string;
}

const LESSONS_VOLUME_1: LessonMilestone[] = [
  {
    number: 1,
    title: "The Secret Compass: Navkar Mantra Decoded",
    subtitle: "Why we salute supreme virtues, not people, and how the 5 Parameshthis guide our daily thoughts.",
    duration: "6 mins",
    category: "Dev-Shastra-Guru",
    keyConcepts: ["Arihant vs Siddha", "5 Supreme Beings", "Pure Intentions (Bhaav)"],
    icon: "🧭",
    badge: "Compass of Virtues",
  },
  {
    number: 2,
    title: "The Car and the Driver: Jīva vs. Ajīva",
    subtitle: "Discover the real 'You'. The body is like a luxury car, but the conscious soul is the driver inside.",
    duration: "7 mins",
    category: "Core Philosophy",
    keyConcepts: ["Consciousness (Chetana)", "Body as Instrument", "Eternal Immortality"],
    icon: "💎",
    badge: "Master of Identity",
  },
  {
    number: 3,
    title: "The Ultimate Boomerang: Karma Physics",
    subtitle: "Nobody in the sky is judging or punishing you. Learn how subtle karma particles bind and shed.",
    duration: "8 mins",
    category: "Karma Theory",
    keyConcepts: ["Action & Reaction", "Kashaya (Emotions)", "Nirjara (Cleansing)"],
    icon: "🪃",
    badge: "Karma Scientist",
  },
  {
    number: 4,
    title: "The Microscopic Universe: 6 Kinds of Living Beings",
    subtitle: "Earth, water, fire, air, plant, and animal life. How ancient Jainism mapped microbiology centuries ago.",
    duration: "7 mins",
    category: "Ahimsa Science",
    keyConcepts: ["Shad-Jeeva Nikaya", "One-Sensed Souls", "Universal Empathy"],
    icon: "🔬",
    badge: "Microbe Protector",
  },
  {
    number: 5,
    title: "Why Sunset Matters: Circadian Biology & Digestion",
    subtitle: "The real biological, microbial, and spiritual reasons behind eating before the sun sets.",
    duration: "6 mins",
    category: "Daily Sadachar",
    keyConcepts: ["Ratri Bhojan Tyag", "Gut Health", "Nocturnal Bacteria"],
    icon: "🌅",
    badge: "Sunlight Champion",
  },
  {
    number: 6,
    title: "Roots, Bulbs & Compassion: Why No Kandmool?",
    subtitle: "Understanding 'Anant-kaya'—why potatoes and carrots house millions of lives, and fruits do not.",
    duration: "7 mins",
    category: "Daily Sadachar",
    keyConcepts: ["Single vs Infinite Lives", "Botanical Ethics", "Playground Explanation"],
    icon: "🌱",
    badge: "Ahimsa Botanist",
  },
  {
    number: 7,
    title: "Ahimsa in the School Playground: Beyond Food",
    subtitle: "Non-violence in your words and chats. Standing up to bullying, teasing, and online cruelty with grace.",
    duration: "6 mins",
    category: "Practical Ethics",
    keyConcepts: ["Vachan Gupti (Kind Words)", "Anti-Bullying", "Digital Ahimsa"],
    icon: "🛡️",
    badge: "Peace Guardian",
  },
  {
    number: 8,
    title: "The 4 Roads of the Soul: The Chaar Gati Journey",
    subtitle: "Where do living beings come from and go? Why being born a human is the ultimate golden opportunity.",
    duration: "8 mins",
    category: "Cosmology",
    keyConcepts: ["Narak, Tiriyanch, Manushya, Deva", "Rare Human Birth", "Path to Moksha"],
    icon: "🎡",
    badge: "Cosmic Explorer",
  },
  {
    number: 9,
    title: "Role Models of Real Courage: Inspiring Digambar Tales",
    subtitle: "How Queen Chandanbala's pure mindset and King Shrenik's awakening proved that character conquers destiny.",
    duration: "7 mins",
    category: "Scripture Stories",
    keyConcepts: ["Chandanbala's Faith", "King Shrenik's Samyak Darshan", "Inner Strength"],
    icon: "👑",
    badge: "Valor of Truth",
  },
  {
    number: 10,
    title: "The School Defense Masterclass: Ask Me Anything",
    subtitle: "Practical 30-second cheat codes to answer any friend's question with calm logic, humor, and pride.",
    duration: "9 mins",
    category: "Peer Defense",
    keyConcepts: ["Confidence & Wit", "No Apologies", "Friendship & Respect"],
    icon: "🎓",
    badge: "Graduated Young Shravak",
  },
];

export default function PathshalaClient({ lang }: { lang: string }) {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [activeTier, setActiveTier] = useState<"kids" | "core" | "teens">("core");
  const [previewLanguage, setPreviewLanguage] = useState<"en" | "hi">("en");

  const playSound = () => {
    if (!soundEnabled) return;
    try {
      const a = new Audio("/sounds/resources/click2.mp3");
      a.volume = 0.5;
      a.play().catch(() => {});
    } catch (e) {}
  };

  const handleTierChange = (tier: "kids" | "core" | "teens") => {
    playSound();
    setActiveTier(tier);
  };

  return (
    <div className="relative min-h-screen bg-[#050508] text-white selection:bg-amber-500 selection:text-black overflow-x-hidden">
      {/* Dynamic Ambient Celestial Auroras */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[500px] bg-gradient-to-b from-amber-500/15 via-orange-600/5 to-transparent blur-[140px] rounded-full" />
        <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-amber-600/10 blur-[160px] rounded-full" />
        <div className="absolute top-[75%] left-[-10%] w-[600px] h-[600px] bg-yellow-500/10 blur-[180px] rounded-full" />
      </div>

      {/* Floating Sound Controller */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            const next = !soundEnabled;
            setSoundEnabled(next);
            if (next) playSound();
          }}
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-full border border-amber-500/30 bg-black/80 backdrop-blur-xl shadow-xl shadow-amber-500/10 text-xs font-mono text-amber-300 hover:border-amber-400 transition-all"
        >
          {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4 text-gray-400" />}
          <span>{soundEnabled ? "Sounds Active" : "Sounds Muted"}</span>
        </motion.button>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: 3D HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative z-10 pt-10 pb-20 md:pt-16 md:pb-28 px-4 max-w-7xl mx-auto">
        {/* Top Sacred Pill */}
        <div className="flex justify-center mb-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-amber-500/20 to-amber-500/10 backdrop-blur-xl shadow-lg shadow-amber-500/10"
          >
            <Sparkle className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: "8s" }} />
            <span className="text-xs md:text-sm font-semibold text-amber-300 tracking-wide font-mono uppercase">
              Aagam Ki Vaani • Digital Pathshala
            </span>
          </motion.div>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 font-serif"
          >
            Ancient Jain Wisdom. <br />
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent drop-shadow-sm">
              Modern Young Minds.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto font-light"
          >
            The world-class interactive academy teaching kids aged <strong>8–12</strong> the logic, microbiology, and unshakeable pride to understand, live, and confidently explain Jainism to their friends.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#curriculum"
              onClick={playSound}
              className="px-7 py-3.5 rounded-xl font-bold text-sm md:text-base bg-gradient-to-r from-amber-500 to-amber-400 text-black shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
            >
              <span>Explore 10-Lesson Syllabus</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#lab"
              onClick={playSound}
              className="px-6 py-3.5 rounded-xl font-semibold text-sm md:text-base border border-white/15 bg-white/5 hover:bg-white/10 hover:border-amber-400/40 text-gray-200 hover:text-white transition-all flex items-center gap-2 backdrop-blur-md"
            >
              <Eye className="w-4 h-4 text-amber-400" />
              <span>Try Live Interactive Lab</span>
            </a>
          </motion.div>
        </div>

        {/* 3D Holographic Stage Showcase */}
        <div className="max-w-5xl mx-auto">
          <Card3DContainer className="w-full">
            <div className="relative w-full rounded-3xl border border-amber-500/30 bg-gradient-to-b from-amber-950/20 via-black/80 to-black/95 p-6 md:p-10 backdrop-blur-2xl shadow-2xl overflow-hidden group">
              {/* Radial sheen */}
              <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl group-hover:bg-amber-500/20 transition-all duration-700" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left side: Feature Showcase */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-xs font-mono text-amber-300">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Next-Gen Digambar Curriculum</span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight font-serif">
                    Zero Fluff. Pure Logic & Compassion.
                  </h3>

                  <p className="text-sm md:text-base text-gray-300 leading-relaxed font-light">
                    No dry lectures or boring rote memorization. Each lesson combines <strong>5-minute Remotion AI videos</strong>, <strong>interactive real-time physics visualizers</strong>, <strong>1-page printable cheat sheets</strong>, and <strong>peer defense mastery quizzes</strong>.
                  </p>

                  {/* 4 Feature Badges */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/20 text-amber-300 text-xs">🎬</div>
                      <div className="text-xs font-medium text-gray-200">Remotion 4K Videos</div>
                    </div>

                    <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/20 text-amber-300 text-xs">🔮</div>
                      <div className="text-xs font-medium text-gray-200">Interactive 3D Web Labs</div>
                    </div>

                    <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/20 text-amber-300 text-xs">📄</div>
                      <div className="text-xs font-medium text-gray-200">1-Page Study Sheets</div>
                    </div>

                    <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/20 text-amber-300 text-xs">🏆</div>
                      <div className="text-xs font-medium text-gray-200">Friend Q&A Quizzes</div>
                    </div>
                  </div>
                </div>

                {/* Right side: Interactive Mini-Canvas Preview */}
                <div className="lg:col-span-5 w-full">
                  <Card3DItem translateZ={30} className="w-full">
                    <SoulVisualizerPreview soundEnabled={soundEnabled} />
                  </Card3DItem>
                </div>
              </div>
            </div>
          </Card3DContainer>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: ADAPTIVE AGE-TIER HORIZONS */}
      {/* ========================================================================= */}
      <section className="relative z-10 py-16 px-4 max-w-7xl mx-auto border-t border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif mb-3">
            One Foundation. Scaled for Every Age.
          </h2>
          <p className="text-sm md:text-base text-gray-400">
            We handpick canonical concepts and scale the depth so younger siblings learn through stories and habits, while older kids debate science and philosophy.
          </p>

          {/* Age Tier Selector Pills */}
          <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <button
              onClick={() => handleTierChange("kids")}
              className={`px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTier === "kids"
                  ? "bg-amber-500 text-black shadow-lg shadow-amber-500/25"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              🧒 Ages 5 – 7 (Little Seekers)
            </button>

            <button
              onClick={() => handleTierChange("core")}
              className={`px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTier === "core"
                  ? "bg-amber-500 text-black shadow-lg shadow-amber-500/25"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              🚀 Ages 8 – 12 (Young Shravaks)
            </button>

            <button
              onClick={() => handleTierChange("teens")}
              className={`px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTier === "teens"
                  ? "bg-amber-500 text-black shadow-lg shadow-amber-500/25"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              🧠 Ages 13+ (Jain Thinkers)
            </button>
          </div>
        </div>

        {/* Tier Cards Display */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTier === "kids" && (
              <motion.div
                key="kids"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="p-6 md:p-8 rounded-3xl border border-amber-500/25 bg-gradient-to-b from-amber-950/15 via-black/60 to-black p-6 backdrop-blur-xl"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl p-2 rounded-2xl bg-amber-500/10 border border-amber-500/20">🧒</span>
                  <div>
                    <h3 className="text-xl font-bold text-white font-serif">Level 1: Little Seekers (Ages 5–7)</h3>
                    <p className="text-xs text-amber-300 font-mono">Foundations of Compassion & Good Habits</p>
                  </div>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed mb-6">
                  Focuses on emotional bonding, kindness to birds and animals, simple morning & night Navkar mantra recitations, and illustrated storytelling (The Elephant of Parshwanath, Chandana's smile).
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300">
                    🐾 <strong>Animal Kindness:</strong> Feeling empathy for the smallest ant or bird.
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300">
                    🪔 <strong>Mandir Etiquette:</strong> What to do when visiting Jinendra Bhagwan.
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300">
                    🎨 <strong>Coloring & Games:</strong> Interactive picture matching and songs.
                  </div>
                </div>
              </motion.div>
            )}

            {activeTier === "core" && (
              <motion.div
                key="core"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="p-6 md:p-8 rounded-3xl border border-amber-500/40 bg-gradient-to-b from-amber-900/20 via-black/80 to-black p-6 backdrop-blur-xl shadow-2xl shadow-amber-500/10"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl p-2 rounded-2xl bg-amber-500/20 border border-amber-500/30">🚀</span>
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-[10px] font-mono text-amber-300 uppercase tracking-wider mb-1">
                      Flagship Core Course
                    </div>
                    <h3 className="text-xl font-bold text-white font-serif">Level 2: Young Shravaks (Ages 8–12)</h3>
                  </div>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed mb-6">
                  The primary comprehensive curriculum. Equips children with crystal-clear cause and effect: soul vs body, karma magnetism, the microbiology of eating before sunset and avoiding roots, and confidence answering friends at school.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300">
                    🔬 <strong>Science of Sadachar:</strong> Sunset biology and microscopic root life.
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300">
                    💎 <strong>Jīva & Karma:</strong> Who am I? The car vs the driver analogy.
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300">
                    🎯 <strong>Peer Q&A Mastery:</strong> Answering friends with calm wit and logic.
                  </div>
                </div>
              </motion.div>
            )}

            {activeTier === "teens" && (
              <motion.div
                key="teens"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="p-6 md:p-8 rounded-3xl border border-amber-500/25 bg-gradient-to-b from-amber-950/15 via-black/60 to-black p-6 backdrop-blur-xl"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl p-2 rounded-2xl bg-amber-500/10 border border-amber-500/20">🧠</span>
                  <div>
                    <h3 className="text-xl font-bold text-white font-serif">Level 3: Jain Thinkers (Ages 13+)</h3>
                    <p className="text-xs text-amber-300 font-mono">Philosophy, Cosmology & Modern Debates</p>
                  </div>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed mb-6">
                  Deepens into Tattvārtha Sūtra, Samayasāra basics, the 6 Eternal Realities (Shad Dravya), Anekantavada (multi-perspective intellect), and comparing Jain ontology with quantum physics and conservation of energy.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300">
                    🌌 <strong>Cosmology & 6 Dravyas:</strong> Eternal universe without a creator deity.
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300">
                    ⚖️ <strong>Anekantavada:</strong> The intellectual foundation of open-minded truth.
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300">
                    📜 <strong>Shastra Deep-Dive:</strong> Authentic Acharya Umāsvāmi & Kundkund texts.
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: THE 4 SUPERPOWERS BENTO GRID */}
      {/* ========================================================================= */}
      <section className="relative z-10 py-16 px-4 max-w-7xl mx-auto border-t border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-500/20 bg-amber-500/10 text-xs font-mono text-amber-300 uppercase tracking-widest mb-3">
            The Learning Quad
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif">
            How Every Single Lesson is Delivered
          </h2>
          <p className="text-sm md:text-base text-gray-400 mt-2">
            No endless paragraphs. A four-quadrant learning framework designed for real comprehension and long-term memory.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Card 1: 🎬 Remotion 4K Video */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl hover:border-amber-500/30 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-300 font-bold">
                  🎬
                </div>
                {/* Language switcher pills */}
                <div className="flex items-center p-1 rounded-lg bg-black/60 border border-white/10 text-xs font-mono">
                  <button
                    onClick={() => {
                      playSound();
                      setPreviewLanguage("en");
                    }}
                    className={`px-2.5 py-1 rounded ${previewLanguage === "en" ? "bg-amber-500 text-black font-semibold" : "text-gray-400 hover:text-white"}`}
                  >
                    EN Audio
                  </button>
                  <button
                    onClick={() => {
                      playSound();
                      setPreviewLanguage("hi");
                    }}
                    className={`px-2.5 py-1 rounded ${previewLanguage === "hi" ? "bg-amber-500 text-black font-semibold" : "text-gray-400 hover:text-white"}`}
                  >
                    HI Audio
                  </button>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-2 font-serif">
                1. 5-Minute Remotion AI Videos
              </h3>
              <p className="text-xs md:text-sm text-gray-300 leading-relaxed mb-4">
                Punchy, dynamic animations built with code & AI imagery. Explaining complex concepts like karma and multi-sensed life in crisp, engaging visual metaphors.
              </p>
            </div>

            {/* Simulated Video Player Box */}
            <div className="relative h-44 rounded-2xl bg-black/80 border border-white/10 flex flex-col items-center justify-center overflow-hidden group/vid">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="relative z-10 flex flex-col items-center">
                <div className="h-12 w-12 rounded-full bg-amber-500 text-black flex items-center justify-center shadow-lg shadow-amber-500/30 group-hover/vid:scale-110 transition-transform">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>
                <span className="text-[11px] font-mono text-gray-300 mt-2">
                  {previewLanguage === "en" ? "Preview Lesson 1 (English Audio)" : "पाठ १ पूर्वावलोकन (हिन्दी ऑडियो)"}
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: 🔮 Interactive 3D Web Lab */}
          <div id="lab" className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl hover:border-amber-500/30 transition-all flex flex-col justify-between">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-300 font-bold mb-4">
                🔮
              </div>
              <h3 className="text-xl font-bold text-white mb-2 font-serif">
                2. Real-Time Concept Visualizers
              </h3>
              <p className="text-xs md:text-sm text-gray-300 leading-relaxed mb-4">
                Kids learn by touching and doing. Each lesson contains a live simulation canvas (like our Soul vs Karma lab) where children manipulate the variables themselves.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/60 p-3 text-center text-xs text-amber-200/90 font-mono">
              ✨ 100% Client-Side WebGL & Canvas • 60 FPS Physics • Zero Load Delay
            </div>
          </div>

          {/* Card 3: 📄 1-Page Summary Cheat Sheets */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl hover:border-amber-500/30 transition-all flex flex-col justify-between">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-300 font-bold mb-4">
                📄
              </div>
              <h3 className="text-xl font-bold text-white mb-2 font-serif">
                3. 1-Page Summary Cheat Sheets
              </h3>
              <p className="text-xs md:text-sm text-gray-300 leading-relaxed mb-4">
                Printable, beautiful visual summary sheets. Perfect for a 60-second glance before school, or to pin on the refrigerator or study desk for instant recall.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-black/60 border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-amber-400" />
                <div className="text-left">
                  <div className="text-xs font-semibold text-white">Lesson_01_CheatSheet.pdf</div>
                  <div className="text-[10px] text-gray-400">High-Res Infographic • 1 Page</div>
                </div>
              </div>
              <span className="text-[11px] font-mono text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-lg">
                Ready to Print
              </span>
            </div>
          </div>

          {/* Card 4: 🏆 Mastery Quizzes & Streaks */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl hover:border-amber-500/30 transition-all flex flex-col justify-between">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-300 font-bold mb-4">
                🏆
              </div>
              <h3 className="text-xl font-bold text-white mb-2 font-serif">
                4. Peer Defense Mastery Quizzes
              </h3>
              <p className="text-xs md:text-sm text-gray-300 leading-relaxed mb-4">
                Not stressful school exams! Gamified scenario challenges where kids earn stars, unlock digital milestone badges, and practice real-life school conversations.
              </p>
            </div>

            <div className="flex items-center justify-around p-3 rounded-2xl bg-black/60 border border-white/10">
              <div className="text-center">
                <div className="text-xl font-bold text-amber-400 font-mono">100%</div>
                <div className="text-[10px] text-gray-400 font-mono">Pass Mastery</div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="text-center">
                <div className="text-xl font-bold text-amber-400 font-mono">10</div>
                <div className="text-[10px] text-gray-400 font-mono">Badges to Collect</div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="text-center">
                <div className="text-xl font-bold text-amber-400 font-mono">0 Stress</div>
                <div className="text-[10px] text-gray-400 font-mono">Fun & Rewarding</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: "ANSWER YOUR FRIEND" INTERACTIVE SIMULATOR */}
      {/* ========================================================================= */}
      <section className="relative z-10 py-16 px-4 max-w-7xl mx-auto border-t border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-500/20 bg-amber-500/10 text-xs font-mono text-amber-300 uppercase tracking-widest mb-3">
            Interactive Live Demonstration
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif">
            Try the "Answer Your Friend" Simulator
          </h2>
          <p className="text-sm md:text-base text-gray-400 mt-2">
            See how our course trains children to respond to tricky school questions with scientific clarity, compassion, and poise. Tap an option below to play!
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <FriendSimulator soundEnabled={soundEnabled} />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: 10-LESSON CURRICULUM TIMELINE */}
      {/* ========================================================================= */}
      <section id="curriculum" className="relative z-10 py-16 px-4 max-w-7xl mx-auto border-t border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-500/20 bg-amber-500/10 text-xs font-mono text-amber-300 uppercase tracking-widest mb-3">
            Volume 1 Foundation
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif">
            The 10-Lesson Learning Roadmap
          </h2>
          <p className="text-sm md:text-base text-gray-400 mt-2">
            A carefully curated pedagogical journey taking young minds from foundational concepts to advanced peer confidence.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {LESSONS_VOLUME_1.map((lesson) => (
            <motion.div
              key={lesson.number}
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="p-5 md:p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-amber-500/40 hover:bg-white/[0.04] transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              {/* Left Column: Number & Title */}
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/25 text-2xl">
                  {lesson.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-amber-400 font-semibold uppercase tracking-wider">
                      Lesson #{lesson.number} • {lesson.category}
                    </span>
                    <span className="text-[10px] text-gray-400 bg-white/5 px-2 py-0.5 rounded-full border border-white/10 font-mono">
                      {lesson.duration}
                    </span>
                  </div>
                  <h4 className="text-base md:text-lg font-bold text-white font-serif">
                    {lesson.title}
                  </h4>
                  <p className="text-xs md:text-sm text-gray-400 mt-1 leading-relaxed">
                    {lesson.subtitle}
                  </p>

                  {/* Concept Pills */}
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {lesson.keyConcepts.map((c, i) => (
                      <span
                        key={i}
                        className="text-[10px] text-amber-200/80 bg-amber-500/5 border border-amber-500/15 px-2 py-0.5 rounded-md font-mono"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Unlock Badge */}
              <div className="shrink-0 flex items-center md:flex-col items-end gap-2 text-right w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-white/5">
                <div className="text-[11px] font-mono text-gray-400">Badge Earned:</div>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-300 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full whitespace-nowrap">
                  <Trophy className="w-3 h-3 text-amber-400" />
                  <span>{lesson.badge}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: PARENT & FAMILY ACCOUNT ARCHITECTURE */}
      {/* ========================================================================= */}
      <section className="relative z-10 py-16 px-4 max-w-7xl mx-auto border-t border-white/10">
        <div className="max-w-4xl mx-auto rounded-3xl border border-amber-500/20 bg-gradient-to-b from-amber-950/10 via-black to-black p-8 md:p-12 text-center backdrop-blur-xl relative overflow-hidden">
          <div className="pointer-events-none absolute -bottom-24 -right-24 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl" />

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-xs font-mono text-amber-300 mb-4">
            <Users className="w-3.5 h-3.5" />
            <span>Family Learning Experience</span>
          </div>

          <h3 className="text-2xl md:text-4xl font-bold font-serif text-white mb-4">
            One Parent Account. Multiple Child Profiles.
          </h3>

          <p className="text-sm md:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed mb-8">
            Children under 13 never enter emails or passwords. Parents sign up once with their email, and easily add separate profiles for their children. Each child keeps their own progress, streak, and badges synchronized in the cloud.
          </p>

          {/* Sibling Profile Mock Display */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto mb-8 text-left">
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl p-1.5 rounded-xl bg-amber-500/20">🦁</span>
                <div>
                  <div className="text-sm font-bold text-white">Aarav (Age 9)</div>
                  <div className="text-[11px] text-amber-400 font-mono">Young Shravak • Level 2</div>
                </div>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden mt-3">
                <div className="bg-amber-500 h-full rounded-full w-[40%]" />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-gray-400 mt-1.5">
                <span>Progress: 4/10 Lessons</span>
                <span className="text-amber-300">3 Badges</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl p-1.5 rounded-xl bg-amber-500/20">🦚</span>
                <div>
                  <div className="text-sm font-bold text-white">Ananya (Age 12)</div>
                  <div className="text-[11px] text-amber-400 font-mono">Young Shravak • Level 2</div>
                </div>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden mt-3">
                <div className="bg-amber-500 h-full rounded-full w-[70%]" />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-gray-400 mt-1.5">
                <span>Progress: 7/10 Lessons</span>
                <span className="text-amber-300">6 Badges</span>
              </div>
            </div>
          </div>

          <div className="text-xs text-gray-400 font-mono">
            🔒 100% COPPA & GDPR-K Compliant • No Ads • No Trackers • Pure Shastra Wisdom
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7: FOOTER CTA */}
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
