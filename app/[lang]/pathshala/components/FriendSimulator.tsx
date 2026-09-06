"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, HelpCircle, ArrowRight, Award, Sparkles, BookOpen } from "lucide-react";

interface Scenario {
  id: number;
  situationContext: string;
  avatar: string;
  scenarioTitle: string;
  inquiry: string;
  options: {
    text: string;
    isBest: boolean;
    analysis: string;
  }[];
  scienceNote: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: 1,
    situationContext: "Dining & Social Gatherings",
    avatar: "🥗",
    scenarioTitle: "Declining Root Vegetables (Potatoes, Onions, Garlic)",
    inquiry: "Why do you avoid potatoes and root vegetables when eating with classmates or colleagues?",
    options: [
      {
        text: "My family strictly forbids it because of our religious tradition.",
        isBest: false,
        analysis: "Passive & incomplete. It makes a scientifically rooted practice seem like an arbitrary rule without logical reason.",
      },
      {
        text: "Root bulbs house infinite interconnected lives, whereas fruits cause zero plant destruction.",
        isBest: true,
        analysis: "Accurate & poised! Clear biological distinction between single-life (Pratyeka) and infinite-life host plants (Anant-kaya).",
      },
      {
        text: "I simply dislike the taste and culinary texture of subterranean roots.",
        isBest: false,
        analysis: "Deflective. While easy, it misses the opportunity to express mindful non-violence and botanical ethics.",
      },
    ],
    scienceNote: "Jain shastras mapped root vegetables as multi-cellular host organisms (Anant-kaya) centuries before cellular microbiology.",
  },
  {
    id: 2,
    situationContext: "Circadian Rhythm & Daily Routine",
    avatar: "🌅",
    scenarioTitle: "Eating Meals Before Sunset (Chauvihar)",
    inquiry: "What is the primary rationale behind finishing your evening dinner before the sun sets?",
    options: [
      {
        text: "Human metabolic digestion slows down at sunset as nocturnal bacteria blooms rapidly.",
        isBest: true,
        analysis: "Scientifically accurate! Perfectly integrates circadian endocrinology and nocturnal microbiology with Ahimsa.",
      },
      {
        text: "A supreme deity watches us and punishes anyone who eats in the dark.",
        isBest: false,
        analysis: "Philosophically incorrect. In Jainism, Jinendra Bhagwan is detached (Veetaragi) and never punishes or rewards anyone.",
      },
      {
        text: "It is an ancient habit from centuries ago before people invented electricity and light bulbs.",
        isBest: false,
        analysis: "Superficial. Even under 1,000 electric lamps, human digestive enzymes drop at night and nocturnal micro-organisms multiply.",
      },
    ],
    scienceNote: "Modern chronobiology confirms that eating in sync with daylight maximizes insulin sensitivity and digestive enzyme secretion.",
  },
  {
    id: 3,
    situationContext: "Science & Philosophy Discussions",
    avatar: "🌌",
    scenarioTitle: "The Nature of the Universe & God",
    inquiry: "If Jainism does not believe in a creator God, how did the universe originate?",
    options: [
      {
        text: "Matter and conscious energy are uncreated and eternal, operating by natural cosmic laws.",
        isBest: true,
        analysis: "Brilliant! Directly aligns canonical Jain ontology (Anadi-Nidhan Shad Dravya) with the universal conservation of energy.",
      },
      {
        text: "Jainism does not have any philosophical explanation for how the world exists.",
        isBest: false,
        analysis: "Completely inaccurate. Jainism provides one of the world's most rigorous, mathematical, and logical cosmological ontologies.",
      },
      {
        text: "A celestial being formed the cosmos out of nothing and controls our daily destiny.",
        isBest: false,
        analysis: "Contradicts Jain doctrine. Acharya Umāsvāmi proves in Tattvārtha Sūtra that existence (Sat) has neither beginning nor end.",
      },
    ],
    scienceNote: "Tattvārtha Sūtra 5.29: 'Utpada-vyaya-dhrauvya yuktam sat' — reality consists of substance undergoing continuous transformation, never creation from nothing.",
  },
];

export default function FriendSimulator({
  soundEnabled = true,
}: {
  soundEnabled?: boolean;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const scenario = SCENARIOS[currentIndex];

  const playTap = (isCorrect: boolean) => {
    if (!soundEnabled) return;
    try {
      const a = new Audio("/sounds/resources/click2.mp3");
      a.volume = isCorrect ? 0.6 : 0.35;
      a.play().catch(() => {});
    } catch (e) {}
  };

  const handleSelect = (index: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);
    const isBest = scenario.options[index].isBest;
    playTap(isBest);
    if (isBest) {
      setScore((prev) => prev + 100);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setCurrentIndex((prev) => (prev + 1) % SCENARIOS.length);
  };

  return (
    <div className="relative w-full rounded-3xl border border-amber-500/25 bg-gradient-to-b from-gray-950 via-black to-gray-950 p-6 md:p-8 backdrop-blur-2xl shadow-2xl overflow-hidden">
      {/* Glow orb */}
      <div className="pointer-events-none absolute -top-12 -right-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />

      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/15 border border-amber-500/30 text-xl">
            {scenario.avatar}
          </div>
          <div>
            <div className="text-[11px] font-mono text-amber-400 font-bold uppercase tracking-wider">
              Scenario {currentIndex + 1} of {SCENARIOS.length} • {scenario.situationContext}
            </div>
            <h4 className="text-base md:text-lg font-bold text-white font-serif">
              {scenario.scenarioTitle}
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-3.5 py-1.5 rounded-full text-xs font-mono text-amber-300">
          <Award className="w-4 h-4 text-amber-400" />
          <span>{score} Practice Pts</span>
        </div>
      </div>

      {/* The Inquiry Prompt Box */}
      <div className="my-5 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
        <div className="text-[11px] font-mono text-gray-400 uppercase tracking-wider mb-1">
          Practical Everyday Situation:
        </div>
        <p className="text-sm md:text-base text-gray-100 font-medium leading-relaxed italic">
          "{scenario.inquiry}"
        </p>
      </div>

      {/* Answer Options: Balanced One-Liners */}
      <div className="space-y-3">
        {scenario.options.map((option, idx) => {
          const isChosen = selectedOption === idx;
          const isSubmitted = selectedOption !== null;

          let cardStyle = "bg-white/[0.02] border-white/10 text-gray-200 hover:bg-white/[0.05] hover:border-amber-400/30";
          if (isSubmitted) {
            if (option.isBest) {
              cardStyle = "bg-emerald-950/30 border-emerald-500/50 text-emerald-100 shadow-lg shadow-emerald-500/10";
            } else if (isChosen) {
              cardStyle = "bg-red-950/30 border-red-500/50 text-red-200";
            } else {
              cardStyle = "bg-white/[0.01] border-white/10 text-gray-400";
            }
          }

          return (
            <div
              key={idx}
              onClick={() => handleSelect(idx)}
              className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${cardStyle}`}
            >
              {/* Top Row: Option Letter & One-Liner Text */}
              <div className="flex items-center gap-3">
                <div className="shrink-0">
                  {isSubmitted && option.isBest && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  )}
                  {isSubmitted && isChosen && !option.isBest && (
                    <XCircle className="w-5 h-5 text-red-400" />
                  )}
                  {(!isSubmitted || (!option.isBest && !isChosen)) && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full border border-current text-xs font-mono opacity-70">
                      {String.fromCharCode(65 + idx)}
                    </span>
                  )}
                </div>

                <span className="text-xs md:text-sm font-medium flex-1">
                  {option.text}
                </span>

                {!isSubmitted && (
                  <span className="text-[10px] font-mono text-gray-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                    Select
                  </span>
                )}
              </div>

              {/* EXPANDED EXPLANATION: Appears for ALL options once an answer is chosen */}
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-3 pt-3 border-t border-white/10 text-xs leading-relaxed"
                >
                  <div className="flex items-center gap-1.5 font-semibold mb-1 font-mono">
                    {option.isBest ? (
                      <span className="text-emerald-400">✓ Recommended Logical Response:</span>
                    ) : (
                      <span className="text-amber-400">⚠ Why this is sub-optimal:</span>
                    )}
                  </div>
                  <p className="text-gray-300">{option.analysis}</p>
                </motion.div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Canonical Note & Next Button */}
      {selectedOption !== null && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div className="text-[11px] p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200/90 font-mono flex-1">
            📜 <strong>Canonical Scripture Note:</strong> {scenario.scienceNote}
          </div>

          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs transition-all shadow-lg shadow-amber-500/20 cursor-pointer shrink-0"
          >
            <span>Next Scenario</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </div>
  );
}
