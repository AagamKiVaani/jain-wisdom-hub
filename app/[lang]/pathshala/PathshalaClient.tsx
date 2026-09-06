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
  Radio,
  Zap,
  ShieldCheck,
  Award,
} from "lucide-react";
import SacredSoul3DCanvas from "./components/SacredSoul3DCanvas";
import FriendSimulator from "./components/FriendSimulator";

interface LessonShowcase {
  number: string;
  title: string;
  subtitle: string;
  duration: string;
  category: string;
}

const LESSON_SHOWCASE: LessonShowcase[] = [
  {
    number: "01",
    title: "The Secret Compass: Navkar Mantra Decoded",
    subtitle: "Saluting supreme virtues and detached qualities rather than individual personalities.",
    duration: "6 mins",
    category: "Dev-Shastra-Guru",
  },
  {
    number: "02",
    title: "The Car and the Driver: Jīva vs. Ajīva",
    subtitle: "Understanding true identity: the physical body is the instrument, the conscious soul is the eternal driver.",
    duration: "7 mins",
    category: "Core Philosophy",
  },
  {
    number: "03",
    title: "The Ultimate Boomerang: Karma Physics",
    subtitle: "How emotional passions (Kashayas) attract subtle karma dust, and how forgiveness cleanses the soul.",
    duration: "8 mins",
    category: "Core Philosophy",
  },
  {
    number: "04",
    title: "The Microscopic Universe: 6 Classes of Living Beings",
    subtitle: "Discovering Shad-Jeeva Nikaya: how ancient Jain science mapped microbiology long before microscopes.",
    duration: "7 mins",
    category: "Ahimsa Science",
  },
  {
    number: "05",
    title: "Why Sunset Matters: Circadian Biology & Digestion",
    subtitle: "The biological, digestive, and microbial reasons behind finishing evening meals before the sun sets.",
    duration: "6 mins",
    category: "Daily Sadachar",
  },
  {
    number: "06",
    title: "Roots, Bulbs & Compassion: Why No Kandmool?",
    subtitle: "The science of Anant-kaya: why subterranean roots house infinite lives, while fruits cause zero harm to trees.",
    duration: "7 mins",
    category: "Daily Sadachar",
  },
  {
    number: "07",
    title: "Ahimsa in Everyday Life: Beyond Food",
    subtitle: "Practicing non-violence in speech, digital chats, and handling bullying with quiet inner strength.",
    duration: "6 mins",
    category: "Practical Ethics",
  },
  {
    number: "08",
    title: "The 4 Roads of the Soul: The Chaar Gati Journey",
    subtitle: "The cycle of transmigration and why a human birth is the rarest opportunity to practice the Three Jewels.",
    duration: "8 mins",
    category: "Cosmology",
  },
  {
    number: "09",
    title: "Role Models of Real Courage: Inspiring Digambar Tales",
    subtitle: "How historical heroes conquered inner anger, ego, and greed to attain victory over karma.",
    duration: "7 mins",
    category: "Scripture Stories",
  },
  {
    number: "10",
    title: "Practical Social Mastery: Poised & Confident",
    subtitle: "Clear, logical explanations to navigate dining, social gatherings, and everyday discussions with pride.",
    duration: "9 mins",
    category: "Life Application",
  },
];

export default function PathshalaClient({ lang }: { lang: string }) {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [activeTier, setActiveTier] = useState<"kids" | "core" | "teens">("core");

  // Family Guild State
  const [activeProfile, setActiveProfile] = useState<"aarav" | "ananya">("aarav");
  const [aaravXp, setAaravXp] = useState(620);
  const [ananyaXp, setAnanyaXp] = useState(1240);
  const [floatingXp, setFloatingXp] = useState<string | null>(null);

  const playSound = (soundType: "click" | "success" | "toggle" = "click") => {
    if (!soundEnabled) return;
    try {
      const a = new Audio("/sounds/resources/click2.mp3");
      a.volume = 0.5;
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

  return (
    <div className="relative min-h-screen bg-[#040407] text-white selection:bg-amber-400 selection:text-black overflow-x-hidden">
      {/* Dynamic Ambient Background Glows */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-amber-500/10 via-orange-600/5 to-transparent blur-[160px] rounded-full" />
        <div className="absolute top-[35%] right-[-12%] w-[600px] h-[600px] bg-amber-600/10 blur-[180px] rounded-full" />
        <div className="absolute top-[70%] left-[-15%] w-[700px] h-[700px] bg-yellow-500/10 blur-[200px] rounded-full" />

        {/* Subtle geometric dot matrix */}
        <div
          className="absolute inset-0 opacity-[0.025] bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:32px_32px]"
          aria-hidden="true"
        />
      </div>

      {/* Floating Audio Controller */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => {
            const next = !soundEnabled;
            setSoundEnabled(next);
            if (next) playSound();
          }}
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-amber-500/30 bg-black/85 backdrop-blur-2xl shadow-xl text-xs font-mono text-amber-300 hover:border-amber-400 transition-all cursor-pointer"
        >
          {soundEnabled ? (
            <>
              <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />
              <span className="font-semibold tracking-wide">Audio Active</span>
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
      {/* 1. HERO SECTION & 3D CONSCIOUSNESS LAB */}
      {/* ========================================================================= */}
      <section className="relative z-10 pt-8 pb-16 md:pt-14 md:pb-24 px-4 max-w-7xl mx-auto">
        {/* Top Sacred Pill */}
        <div className="flex justify-center mb-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-amber-500/35 bg-gradient-to-r from-amber-500/15 via-amber-400/20 to-amber-500/15 backdrop-blur-2xl shadow-lg"
          >
            <Sparkle className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: "12s" }} />
            <span className="text-xs md:text-sm font-bold text-amber-200 tracking-wider font-mono uppercase">
              Aagam Ki Vaani • Digital Pathshala
            </span>
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
            Ancient Jain Wisdom. <br />
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(245,158,11,0.25)]">
              Modern Young Minds.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto font-light"
          >
            An interactive learning academy for young shravaks aged <strong>8–12</strong>. Master the science of Ahimsa, karma physics, and the logical confidence to live and proudly explain Jainism anywhere.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#curriculum-showcase"
              onClick={() => playSound()}
              className="px-8 py-3.5 rounded-2xl font-bold text-sm md:text-base bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-black shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Explore 10-Lesson Structure</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#practical-scenarios"
              onClick={() => playSound()}
              className="px-6 py-3.5 rounded-2xl font-semibold text-sm md:text-base border border-amber-500/30 bg-amber-500/5 hover:bg-amber-500/15 hover:border-amber-400 text-amber-200 hover:text-white transition-all flex items-center gap-2 backdrop-blur-xl cursor-pointer"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Try Practical Situations</span>
            </a>
          </motion.div>
        </div>

        {/* 3D CONSCIOUSNESS CENTERPIECE */}
        <div className="max-w-6xl mx-auto mt-6">
          <div className="relative rounded-3xl p-1 bg-gradient-to-b from-amber-500/40 via-amber-500/15 to-transparent shadow-[0_0_50px_rgba(245,158,11,0.15)]">
            <div className="relative rounded-[22px] bg-black/90 border border-amber-500/30 overflow-hidden backdrop-blur-2xl">
              {/* Spiritual Header Bar */}
              <div className="px-6 py-3.5 bg-gradient-to-r from-amber-950/40 via-black to-amber-950/40 border-b border-amber-500/25 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                <div className="flex items-center gap-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="font-bold text-amber-300 uppercase tracking-wider">
                    Consciousness Study: The Living Atman
                  </span>
                </div>

                <div className="text-[11px] text-amber-200/80 bg-white/5 px-3 py-1 rounded-md border border-white/10">
                  Formless (Aroopi) Energy • Ashta Karma Dynamics
                </div>
              </div>

              {/* Main 3D Canvas Viewport */}
              <div className="w-full h-[480px] md:h-[540px]">
                <SacredSoul3DCanvas soundEnabled={soundEnabled} />
              </div>

              {/* Philosophical Pillar Annotations */}
              <div className="px-6 py-4 bg-gradient-to-t from-amber-950/30 via-black/80 to-transparent border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="p-2">
                  <div className="text-white text-base md:text-lg font-bold font-serif">Living Formless Energy</div>
                  <div className="text-[11px] text-gray-400">Undulating fluid consciousness</div>
                </div>
                <div className="p-2">
                  <div className="text-white text-base md:text-lg font-bold font-serif">100% Pure Radiance</div>
                  <div className="text-[11px] text-gray-400">Mukta Atman free of matter</div>
                </div>
                <div className="p-2">
                  <div className="text-white text-base md:text-lg font-bold font-serif">8 Karmic Shackles</div>
                  <div className="text-[11px] text-gray-400">Ashta Karma binding the soul</div>
                </div>
                <div className="p-2">
                  <div className="text-white text-base md:text-lg font-bold font-serif">Supreme Forgiveness</div>
                  <div className="text-[11px] text-gray-400">Dissolves bonds through Kshama</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. ADAPTIVE AGE HORIZONS (LITTLE SEEKERS, YOUNG SHRAVAKS, TRUTH SEEKERS) */}
      {/* ========================================================================= */}
      <section className="relative z-10 py-16 px-4 max-w-7xl mx-auto border-t border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-xs font-mono text-amber-300 uppercase tracking-widest mb-3">
            Scaled Horizons
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif mb-3">
            One Timeless Wisdom. <br />
            <span className="text-amber-400">Tailored for Every Stage.</span>
          </h2>
          <p className="text-sm md:text-base text-gray-300">
            Handpicked canonical concepts scaled so young toddlers build gentle compassion, kids master daily biology, and older seekers explore uncreated cosmology.
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
              ✨ Ages 13+ (Truth Seekers)
            </button>
          </div>
        </div>

        {/* Tier Details Display */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTier === "kids" && (
              <motion.div
                key="kids"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                className="p-6 md:p-8 rounded-3xl border border-amber-500/30 bg-gradient-to-b from-amber-950/20 via-black/80 to-black backdrop-blur-2xl shadow-2xl"
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30">🧒</span>
                  <div>
                    <h3 className="text-2xl font-bold text-white font-serif">Tier 1: Little Seekers (Ages 5–7)</h3>
                    <p className="text-xs text-amber-300 font-mono tracking-wide">Foundation of Kindness, Stories & Gentle Habits</p>
                  </div>
                </div>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed mb-6">
                  Nurtures natural empathy for birds and small creatures. Morning and bedtime Navkar recitations, joy in Mandir darshan, and colorful illustrated storytelling (The Elephant of Parshwanath, Chandanbala's pure spirit).
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-gray-300">
                    🐾 <strong>Animal Empathy:</strong> Understanding that every tiny insect feels joy and pain just like us.
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-gray-300">
                    🪔 <strong>Mandir Etiquette:</strong> Purity of thoughts, singing stutis, and bowing with reverence.
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-gray-300">
                    🎨 <strong>Visual Rhymes:</strong> Vibrant picture songs and easy memory rhymes.
                  </div>
                </div>
              </motion.div>
            )}

            {activeTier === "core" && (
              <motion.div
                key="core"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
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
                  The primary comprehensive pathshala. Equips children with crystal-clear logic: Soul vs Body, Karma Magnetism, the microbiology of root vegetables & sunset meals, and calm confidence in social situations.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-xs text-amber-100">
                    🔬 <strong>Microbiology of Ahimsa:</strong> Circadian enzymes and infinite life centers in roots.
                  </div>
                  <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-xs text-amber-100">
                    💎 <strong>Jīva & Karma Magnetics:</strong> Who am I? Understanding the driver vs the body car.
                  </div>
                  <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-xs text-amber-100">
                    🏆 <strong>Social Poise:</strong> Clear, respectful explanations of Jain habits in daily life.
                  </div>
                </div>
              </motion.div>
            )}

            {activeTier === "teens" && (
              <motion.div
                key="teens"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                className="p-6 md:p-8 rounded-3xl border border-amber-500/30 bg-gradient-to-b from-amber-950/20 via-black/80 to-black backdrop-blur-2xl shadow-2xl"
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30">✨</span>
                  <div>
                    <h3 className="text-2xl font-bold text-white font-serif">Tier 3: Truth Seekers (Ages 13+)</h3>
                    <p className="text-xs text-amber-300 font-mono tracking-wide">Ontology, Cosmology, Quantum Physics & Universal Truth</p>
                  </div>
                </div>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed mb-6">
                  Deepens into canonical Tattvārtha Sūtra and Samayasāra. Unpacking the 6 Eternal Realities (Shad Dravya), Anekantavada (multi-perspective intellect), and the timeless law of energy conservation.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-gray-300">
                    🌌 <strong>Uncreated Cosmos:</strong> 6 eternal realities operating by perpetual natural laws.
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-gray-300">
                    ⚖️ <strong>Anekantavada:</strong> The intellectual foundation of open-minded truth.
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-gray-300">
                    📜 <strong>Canonical Shastras:</strong> Authentic Acharya Umāsvāmi & Kundkund texts.
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. THE 4 LEARNING SUPERPOWERS (NO REMOTION MENTION) */}
      {/* ========================================================================= */}
      <section className="relative z-10 py-16 px-4 max-w-7xl mx-auto border-t border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-xs font-mono text-amber-300 uppercase tracking-widest mb-3">
            Learning Framework
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif">
            The 4 Pillars in Every Lesson
          </h2>
          <p className="text-sm md:text-base text-gray-400 mt-2">
            No dry walls of text. Every concept is learned through four synchronized visual and practical channels.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Pillar 1: Animated 4K Video Lessons */}
          <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-b from-amber-950/20 via-black/80 to-black p-7 backdrop-blur-2xl hover:border-amber-400 transition-all shadow-xl group">
            <div className="flex items-center justify-between mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/20 border border-amber-500/30 text-2xl">
                🎬
              </div>
              <span className="text-xs font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
                English & Hindi Audio
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 font-serif">1. 5-Minute Animated 4K Lessons</h3>
            <p className="text-sm text-gray-300 leading-relaxed mb-5 font-light">
              Crisp visual storytelling with high-resolution animations. Visualizing soul radiance, microscopic organism clusters, and karma physics with crystal clarity.
            </p>
            <div className="h-28 rounded-2xl bg-black/80 border border-white/10 p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-amber-500 text-black flex items-center justify-center shadow-lg shadow-amber-500/30 shrink-0">
                <Play className="w-4 h-4 fill-current ml-0.5" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white">Punchy, Fast-Paced Episodes</div>
                <div className="text-[11px] font-mono text-amber-300">Made for modern attention spans</div>
              </div>
            </div>
          </div>

          {/* Pillar 2: Interactive Concept Visualizers */}
          <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-b from-amber-950/20 via-black/80 to-black p-7 backdrop-blur-2xl hover:border-amber-400 transition-all shadow-xl group">
            <div className="flex items-center justify-between mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/20 border border-amber-500/30 text-2xl">
                🔮
              </div>
              <span className="text-xs font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
                Real-Time 3D
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 font-serif">2. Interactive Concept Visualizers</h3>
            <p className="text-sm text-gray-300 leading-relaxed mb-5 font-light">
              Children learn best when they can touch and rotate variables. Manipulate formless soul models, trigger karmic dust inflows, and observe nirjara cleansing live.
            </p>
            <div className="h-28 rounded-2xl bg-black/80 border border-white/10 p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/40 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white">Real-Time Scientific Simulations</div>
                <div className="text-[11px] font-mono text-amber-300">Hands-on visual understanding</div>
              </div>
            </div>
          </div>

          {/* Pillar 3: 1-Page Summary Sheets */}
          <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-b from-amber-950/20 via-black/80 to-black p-7 backdrop-blur-2xl hover:border-amber-400 transition-all shadow-xl group">
            <div className="flex items-center justify-between mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/20 border border-amber-500/30 text-2xl">
                📄
              </div>
              <span className="text-xs font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
                Printable PDF
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 font-serif">3. 1-Page Visual Summary Sheets</h3>
            <p className="text-sm text-gray-300 leading-relaxed mb-5 font-light">
              Ultra-high density infographic summaries. Pin them to study desks, lockers, or refrigerators for a 60-second glance that recalls the whole lesson.
            </p>
            <div className="h-28 rounded-2xl bg-black/80 border border-white/10 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-7 h-7 text-amber-400 shrink-0" />
                <div className="text-left">
                  <div className="text-xs font-bold text-white">Curriculum Infographics</div>
                  <div className="text-[11px] text-gray-400">1-Page High-Res Quick Summaries</div>
                </div>
              </div>
              <span className="text-xs font-mono text-amber-300 bg-amber-500/10 border border-amber-500/25 px-3 py-1.5 rounded-xl">
                Ready
              </span>
            </div>
          </div>

          {/* Pillar 4: Practical Mastery Quizzes */}
          <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-b from-amber-950/20 via-black/80 to-black p-7 backdrop-blur-2xl hover:border-amber-400 transition-all shadow-xl group">
            <div className="flex items-center justify-between mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/20 border border-amber-500/30 text-2xl">
                🏆
              </div>
              <span className="text-xs font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
                Scenario Mastery
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 font-serif">4. Practical Mastery Scenarios</h3>
            <p className="text-sm text-gray-300 leading-relaxed mb-5 font-light">
              Zero stressful exams. Real-life scenarios where children practice witty, kind, and scientifically accurate answers to everyday questions.
            </p>
            <div className="h-28 rounded-2xl bg-black/80 border border-white/10 p-4 flex items-center justify-around text-center">
              <div>
                <div className="text-xl font-bold text-amber-400 font-mono">10</div>
                <div className="text-[11px] text-gray-400">Milestone Badges</div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div>
                <div className="text-xl font-bold text-amber-400 font-mono">100%</div>
                <div className="text-[11px] text-gray-400">Social Poise</div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div>
                <div className="text-xl font-bold text-amber-400 font-mono">0 Stress</div>
                <div className="text-[11px] text-gray-400">Pure Learning</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. PRACTICAL LIFE SCENARIOS SIMULATOR */}
      {/* ========================================================================= */}
      <section id="practical-scenarios" className="relative z-10 py-16 px-4 max-w-7xl mx-auto border-t border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-xs font-mono text-amber-300 uppercase tracking-widest mb-3">
            Everyday Practical Situations
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif mb-3">
            Everyday Situations & Practical Understanding
          </h2>
          <p className="text-sm md:text-base text-gray-400">
            Explore how young shravaks navigate dining, social gatherings, and everyday discussions with confidence, calm logic, and scientific clarity.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <FriendSimulator soundEnabled={soundEnabled} />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. SEQUENTIAL 10-LESSON SHOWCASE (CLEAN, ELEGANT LIST) */}
      {/* ========================================================================= */}
      <section id="curriculum-showcase" className="relative z-10 py-16 px-4 max-w-7xl mx-auto border-t border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-xs font-mono text-amber-300 uppercase tracking-widest mb-3">
            Curriculum Structure
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif mb-3">
            The 10-Lesson Learning Roadmap
          </h2>
          <p className="text-sm md:text-base text-gray-400">
            A sequential overview of the upcoming digital course modules. The full interactive journey page will launch alongside the video series.
          </p>
        </div>

        {/* Clean Sequential List Showcase */}
        <div className="max-w-4xl mx-auto space-y-3">
          {LESSON_SHOWCASE.map((lesson) => (
            <motion.div
              key={lesson.number}
              whileHover={{ x: 4 }}
              className="p-4 md:p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-amber-500/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
            >
              {/* Number and Info */}
              <div className="flex items-start sm:items-center gap-4">
                <span className="text-lg md:text-xl font-mono font-bold text-amber-400/80 bg-amber-500/10 border border-amber-500/20 h-11 w-11 rounded-xl flex items-center justify-center shrink-0 group-hover:border-amber-400 group-hover:text-amber-300 transition-colors">
                  {lesson.number}
                </span>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono text-amber-300 uppercase tracking-wider bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      {lesson.category}
                    </span>
                    <span className="text-[10px] font-mono text-gray-400">
                      {lesson.duration}
                    </span>
                  </div>
                  <h4 className="text-sm md:text-base font-bold text-white font-serif group-hover:text-amber-200 transition-colors">
                    {lesson.title}
                  </h4>
                  <p className="text-xs text-gray-400 mt-0.5 leading-relaxed font-light">
                    {lesson.subtitle}
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              <div className="shrink-0 sm:text-right pl-15 sm:pl-0">
                <span className="text-[11px] font-mono text-gray-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                  Volume 1 Module
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. FAMILY GUILD & SPIRIT LEVEL SYSTEM */}
      {/* ========================================================================= */}
      <section className="relative z-10 py-16 px-4 max-w-7xl mx-auto border-t border-white/10">
        <div className="max-w-4xl mx-auto rounded-3xl border-2 border-amber-500/30 bg-gradient-to-b from-amber-950/20 via-black to-black p-8 md:p-12 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
          {/* Floating XP Notification */}
          <AnimatePresence>
            {floatingXp && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-6 right-6 z-20 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-mono font-bold text-xs shadow-xl"
              >
                ✨ {floatingXp}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-xs font-mono text-amber-300 mb-4">
              <Users className="w-3.5 h-3.5" />
              <span>Family Team Hub</span>
            </div>

            <h3 className="text-3xl md:text-4xl font-bold font-serif text-white mb-3">
              One Family Hub. Infinite Growth.
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed font-light">
              Track progress together across all siblings. Log daily sadachar habits, practice scenarios, and unlock badges on a single shared family hub.
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
              className="px-6 py-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-200 font-mono text-xs font-bold hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-lg"
            >
              ⚡ Complete Daily Sadachar Challenge (+50 XP)
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. FOOTER */}
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
