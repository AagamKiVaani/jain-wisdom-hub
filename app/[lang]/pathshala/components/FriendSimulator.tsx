"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, HelpCircle, ArrowRight, Award, Sparkles, Volume2 } from "lucide-react";

interface Scenario {
  id: number;
  friendName: string;
  avatar: string;
  question: string;
  options: {
    text: string;
    isBest: boolean;
    feedback: string;
    scienceNote: string;
  }[];
}

const SCENARIOS: Scenario[] = [
  {
    id: 1,
    friendName: "Rohan",
    avatar: "🎒",
    question: "Hey! Why didn't you eat the French fries or garlic bread at the birthday party? They're just vegetables!",
    options: [
      {
        text: "Because my parents said it is bad karma, so I'm not allowed.",
        isBest: false,
        feedback: "A bit too passive! When we just say 'my parents said so', friends think it's an arbitrary rule without reason.",
        scienceNote: "Try explaining the botanical biology and compassionate reasons behind it!",
      },
      {
        text: "Potatoes and root vegetables are 'Anant-kaya'—a single bulb contains infinite microscopic living organisms. An apple can be eaten without killing the tree, but pulling a root destroys the whole plant and millions of micro-lives. We choose maximum kindness!",
        isBest: true,
        feedback: "Spot on! Brilliant and scientifically accurate!",
        scienceNote: "Jain scriptures categorized root vegetables as multi-cellular host organisms (Anant-kaya) thousands of years before microbiology confirmed it!",
      },
      {
        text: "I don't know, Jain rules are just really complicated.",
        isBest: false,
        feedback: "Never feel unequipped! Jainism is pure science and logic once you understand the 'Why'.",
        scienceNote: "Jain practices are based on Ahimsa (non-violence) and microscopic awareness.",
      },
    ],
  },
  {
    id: 2,
    friendName: "Sarah",
    avatar: "⚽",
    question: "Why do you have to finish dinner before sunset? Does God get angry if you eat at night?",
    options: [
      {
        text: "No, God doesn't get angry! Sunlight naturally inhibits nocturnal bacteria. After sunset, microbial activity multiplies rapidly, and our digestive enzymes slow down with circadian rhythm. Eating by daylight is pure microbiology and health!",
        isBest: true,
        feedback: "Masterful explanation! Logical, calm, and scientifically impressive.",
        scienceNote: "Modern chronobiology confirms that eating with natural daylight dramatically improves gut health, circadian rhythm, and metabolic digestion.",
      },
      {
        text: "Yes, our God watches us and punishes anyone who eats after dark.",
        isBest: false,
        feedback: "Careful! In Jainism, Jinendra Bhagwan is a victorious, detached soul (Veetaragi). God never punishes or rewards anyone.",
        scienceNote: "Our own thoughts and actions (Karma) create our results—no external judge is punishing you.",
      },
      {
        text: "It's just an old tradition from when people had no electricity.",
        isBest: false,
        feedback: "Incomplete! While fire safety was one aspect, the primary spiritual reason is nocturnal microbiology and digestive health.",
        scienceNote: "Even with 1000 lightbulbs, nocturnal bacteria blooms and human digestive hormones drop at night.",
      },
    ],
  },
  {
    id: 3,
    friendName: "Alex",
    avatar: "🔭",
    question: "Do you Jains believe in God? Who created the universe if not God?",
    options: [
      {
        text: "We believe the universe was never created by anyone—it is eternal (Anadi-Nidhan). Matter and Soul can neither be created nor destroyed (like the law of conservation of energy!). God is any soul who reaches 100% infinite knowledge and bliss.",
        isBest: true,
        feedback: "Genius answer! You just aligned 2500-year-old Jain physics with modern science!",
        scienceNote: "Acharya Umāsvāmi taught in Tattvārtha Sūtra: 'Utpada-vyaya-dhrauvya yuktam sat'—existence is uncreated and eternal.",
      },
      {
        text: "We don't believe in anything, we are just peaceful.",
        isBest: false,
        feedback: "Not quite! Jainism has one of the deepest and most profound scientific philosophies in world history.",
        scienceNote: "Jainism recognizes 6 eternal realities (Shad Dravyas) governed by natural laws, not a creator deity.",
      },
      {
        text: "I think Brahma created it, but I'm not sure.",
        isBest: false,
        feedback: "That's from other traditions! In authentic Jain philosophy, nature operates by eternal cosmic laws without a creator.",
        scienceNote: "Jainism teaches that every soul has the potential to become God (Paramatman) through its own pure efforts.",
      },
    ],
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
      a.volume = isCorrect ? 0.65 : 0.35;
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
    <div className="relative w-full rounded-2xl border border-amber-500/20 bg-gradient-to-b from-gray-950 via-black to-gray-950 p-5 md:p-6 backdrop-blur-xl shadow-2xl overflow-hidden">
      {/* Glow orb */}
      <div className="pointer-events-none absolute -top-12 -right-12 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl" />

      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-300">
            <HelpCircle className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white tracking-wide">
              "Answer Your Friend" Simulator
            </h4>
            <p className="text-xs text-gray-400">
              Scenario {currentIndex + 1} of {SCENARIOS.length} • Real-Life School Defense
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/25 px-3 py-1 rounded-full text-xs font-mono text-amber-300">
          <Award className="w-3.5 h-3.5" />
          <span>{score} Wisdom Pts</span>
        </div>
      </div>

      {/* The Friend Scenario Speech Box */}
      <div className="my-5 p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-3.5">
        <div className="text-3xl p-1 bg-white/5 rounded-xl border border-white/10 shrink-0">
          {scenario.avatar}
        </div>
        <div>
          <div className="text-xs font-semibold text-amber-400/90 font-mono uppercase tracking-wider mb-1">
            {scenario.friendName} asks at school:
          </div>
          <p className="text-sm md:text-base text-gray-200 font-medium leading-relaxed italic">
            "{scenario.question}"
          </p>
        </div>
      </div>

      {/* Answer Options */}
      <div className="space-y-2.5">
        {scenario.options.map((option, idx) => {
          const isChosen = selectedOption === idx;
          const isSubmitted = selectedOption !== null;

          let btnStyles = "bg-white/[0.02] border-white/10 text-gray-300 hover:bg-white/[0.06] hover:text-white";
          if (isSubmitted) {
            if (option.isBest) {
              btnStyles = "bg-emerald-500/15 border-emerald-500/50 text-emerald-200 shadow-lg shadow-emerald-500/10";
            } else if (isChosen) {
              btnStyles = "bg-red-500/15 border-red-500/40 text-red-300";
            } else {
              btnStyles = "opacity-40 border-white/5 text-gray-500";
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={isSubmitted}
              className={`w-full text-left p-3.5 rounded-xl border text-xs md:text-sm leading-relaxed transition-all duration-200 flex items-start gap-3 ${btnStyles}`}
            >
              <div className="mt-0.5 shrink-0">
                {isSubmitted && option.isBest && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                )}
                {isSubmitted && isChosen && !option.isBest && (
                  <XCircle className="w-4 h-4 text-red-400" />
                )}
                {(!isSubmitted || (!option.isBest && !isChosen)) && (
                  <span className="flex h-4 w-4 items-center justify-center rounded-full border border-current text-[10px] font-mono opacity-60">
                    {String.fromCharCode(65 + idx)}
                  </span>
                )}
              </div>
              <span className="flex-1">{option.text}</span>
            </button>
          );
        })}
      </div>

      {/* Reveal Feedback Box */}
      <AnimatePresence>
        {selectedOption !== null && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className={`mt-4 p-4 rounded-xl border text-xs md:text-sm ${
              scenario.options[selectedOption].isBest
                ? "bg-emerald-950/30 border-emerald-500/30 text-emerald-100"
                : "bg-amber-950/30 border-amber-500/30 text-amber-100"
            }`}
          >
            <div className="flex items-center gap-2 font-semibold mb-1">
              {scenario.options[selectedOption].isBest ? (
                <>
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300">Perfect Answer (+100 Points)</span>
                </>
              ) : (
                <>
                  <HelpCircle className="w-4 h-4 text-amber-400" />
                  <span className="text-amber-300">Coach's Tip</span>
                </>
              )}
            </div>

            <p className="text-xs text-gray-300 leading-relaxed mb-2">
              {scenario.options[selectedOption].feedback}
            </p>

            <div className="text-[11px] p-2 rounded-lg bg-black/40 border border-white/5 text-amber-200/90 font-mono">
              🔬 <strong>Digambar Science Insight:</strong> {scenario.options[selectedOption].scienceNote}
            </div>

            {/* Next button */}
            <div className="mt-3 flex justify-end">
              <button
                onClick={handleNext}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs transition-all shadow-md hover:shadow-amber-500/20"
              >
                <span>Try Next Scenario</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
