"use client";

import React, { useState, useEffect } from "react";
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

const SCENARIOS_KIDS: Scenario[] = [
  {
    id: 1,
    situationContext: "Drawing Class & Nature",
    avatar: "🐞",
    scenarioTitle: "A Tiny Bug on Your Art Sheet",
    inquiry: "While drawing with colorful crayons, a tiny ladybug lands right on your sheet. What is the kindest thing to do?",
    options: [
      {
        text: "Squash it with a ruler so it doesn't mess up your drawing.",
        isBest: false,
        analysis: "Hurts a tiny life! In Jainism, even the smallest bug wants to live happily just like you.",
      },
      {
        text: "Gently slide a leaf or paper under it and let it safely fly outside into the garden.",
        isBest: true,
        analysis: "Pure Karuna (Compassion)! You protected a tiny life without any anger or fear.",
      },
      {
        text: "Scream loudly and run away from your desk.",
        isBest: false,
        analysis: "Creates unnecessary panic! The little bug is actually much smaller and more afraid than you.",
      },
    ],
    scienceNote: "The great Tirthankaras taught that all creatures, no matter how microscopic, experience sensations and cherish life.",
  },
  {
    id: 2,
    situationContext: "Playground & Sharing",
    avatar: "🧃",
    scenarioTitle: "Spilled Juice at Snack Time",
    inquiry: "Your friend runs past and accidentally knocks over your juice box. What is the superhero reaction?",
    options: [
      {
        text: "Shout at them, throw their sandwich, and say you will never play again.",
        isBest: false,
        analysis: "Feeds the Anger Monster (Krodha)! It only makes both of you unhappy and accumulates heavy karma.",
      },
      {
        text: "Take 3 slow deep breaths, help wipe it up together, and say 'It's okay, accidents happen!'",
        isBest: true,
        analysis: "Supreme Forgiveness (Kshama)! You conquered anger with a warm smile, just like a true little shravak.",
      },
      {
        text: "Sit in a corner and cry quietly the entire recess.",
        isBest: false,
        analysis: "Accidents happen to everyone. Talking gently and solving it together brings joy back quickly.",
      },
    ],
    scienceNote: "Acharya Kundakunda says: Anger is a fire that burns the person holding it before it burns anyone else.",
  },
  {
    id: 3,
    situationContext: "Bedtime Wonder",
    avatar: "🌙",
    scenarioTitle: "Why We Recite Navkar Mantra Before Sleeping",
    inquiry: "Your little cousin asks why you fold your hands and whisper the Navkar Mantra before closing your eyes.",
    options: [
      {
        text: "We ask God to give us video games and candy in our dreams.",
        isBest: false,
        analysis: "Navkar is completely selfless! We never ask for toys or worldly favors in the sacred Navkar.",
      },
      {
        text: "We send love to the 5 pure souls who conquered anger and fear, filling our heart with peace.",
        isBest: true,
        analysis: "Spot on! We salute detached virtues (Gunas), which protects our mind and lets us sleep fearlessly.",
      },
      {
        text: "Because our parents told us scary monsters will appear if we don't say it.",
        isBest: false,
        analysis: "There are no monsters! We pray out of pure love and inspiration, never out of superstitious fear.",
      },
    ],
    scienceNote: "The Navkar Mantra is unique worldwide: it salutes virtues (Guṇas) of supreme detachment rather than any individual persona.",
  },
];

const SCENARIOS_CORE: Scenario[] = [
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

const SCENARIOS_TEENS: Scenario[] = [
  {
    id: 1,
    situationContext: "Ethical Consumerism & Campus Life",
    avatar: "🌱",
    scenarioTitle: "Choosing Cruelty-Free & Plant-Based Choices",
    inquiry: "Friends ask why you check labels so strictly for gelatin, animal rennet, and avoid leather accessories.",
    options: [
      {
        text: "I follow it blindly because older relatives at home would be angry if I didn't.",
        isBest: false,
        analysis: "Abdication of personal agency. Mindful Ahimsa is a conscious ethical conviction, not passive compliance.",
      },
      {
        text: "Every consumption choice sends an economic signal; avoiding exploitation minimizes industrial suffering.",
        isBest: true,
        analysis: "Compelling & modern! Directly links classical Ahimsa to modern supply-chain bioethics and ethical consumerism.",
      },
      {
        text: "I want to prove that my lifestyle makes me morally superior to everyone else.",
        isBest: false,
        analysis: "Infested with Ego (Māna)! Jain conduct aims at self-purification and humility, never judgmental arrogance.",
      },
    ],
    scienceNote: "Acharya Amritchandra in Purushartha Siddhyupaya: Ahimsa is not merely abstinence from killing, but the active prevention of violence across all supply chains.",
  },
  {
    id: 2,
    situationContext: "Ideological Debates & Social Media",
    avatar: "⚖️",
    scenarioTitle: "Two Friends Locked in an Aggressive Online Argument",
    inquiry: "In a group discussion, two peers are fiercely clashing over politics, each asserting absolute moral certainty. How do you apply Anekāntavāda?",
    options: [
      {
        text: "Choose the louder person's side to quickly end the awkward tension in the group.",
        isBest: false,
        analysis: "Avoidance. It reinforces polarization rather than providing intellectual perspective.",
      },
      {
        text: "Explain that complex reality has multiple valid perspectives (Nayas); both hold partial truths from their reference frames.",
        isBest: true,
        analysis: "The pinnacle of Anekāntavāda! You dismantle dogmatism by showing that reality is multifaceted and relative (Syādvāda).",
      },
      {
        text: "Tell both friends that truth does not exist at all and that everyone's opinion is meaningless.",
        isBest: false,
        analysis: "Nihilism. Jainism is not nihilistic; it teaches that objective truth exists, but mortal viewpoints grasp only partial facets.",
      },
    ],
    scienceNote: "The famous Jain doctrine of Syādvāda states: Every proposition is true under a conditional standpoint (Kathañcit), destroying absolute dogmatism.",
  },
  {
    id: 3,
    situationContext: "Social Events & Peer Pressure",
    avatar: "🍸",
    scenarioTitle: "Handling Alcohol Culture & Social Evenings",
    inquiry: "At a university or work gathering, peers repeatedly urge you to 'just take one drink to fit in'. How do you hold your ground poised?",
    options: [
      {
        text: "Make up a fake medical allergy so people don't ask you uncomfortable questions.",
        isBest: false,
        analysis: "Uses untruth (Asatya). True self-respect comes from unapologetic, calm ownership of your ethical boundaries.",
      },
      {
        text: "Politely decline with a confident smile: 'I prefer staying 100% conscious and clear-headed; cheers with my sparkling lime!'",
        isBest: true,
        analysis: "Effortless poise! Confident, friendly, and completely non-preachy. It commands immediate respect from peers.",
      },
      {
        text: "Give a harsh lecture on why everyone drinking around you is committing a major sin.",
        isBest: false,
        analysis: "Aggressive & counterproductive. True Jain poise inspires through personal conduct, not patronizing lectures.",
      },
    ],
    scienceNote: "The 8 Mula Gunas (Foundational Virtues) in Digambar shastras highlight complete avoidance of intoxicants (Madya) to safeguard mental clarity (Pramāda-tyāga).",
  },
];

export default function FriendSimulator({
  activeTier = "core",
  soundEnabled = true,
}: {
  activeTier?: "kids" | "core" | "teens";
  soundEnabled?: boolean;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  // Pick dataset based on active age tier
  const scenarios =
    activeTier === "kids"
      ? SCENARIOS_KIDS
      : activeTier === "teens"
      ? SCENARIOS_TEENS
      : SCENARIOS_CORE;

  // Reset scenario on tier switch
  useEffect(() => {
    setCurrentIndex(0);
    setSelectedOption(null);
  }, [activeTier]);

  const scenario = scenarios[currentIndex] || scenarios[0];

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
    setCurrentIndex((prev) => (prev + 1) % scenarios.length);
  };

  return (
    <div className="relative w-full rounded-3xl border border-amber-500/25 bg-white/95 dark:bg-gradient-to-b dark:from-gray-950 dark:via-black dark:to-gray-950 p-6 md:p-8 backdrop-blur-2xl shadow-xl dark:shadow-2xl overflow-hidden transition-colors duration-300">
      {/* Ambient Glow Orb */}
      <div className="pointer-events-none absolute -top-12 -right-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />

      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-white/10">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/15 border border-amber-500/30 text-xl shadow-sm">
            {scenario.avatar}
          </div>
          <div>
            <div className="text-[11px] font-mono text-amber-700 dark:text-amber-400 font-bold uppercase tracking-wider">
              Scenario {currentIndex + 1} of {scenarios.length} • {scenario.situationContext}
            </div>
            <h4 className="text-base md:text-lg font-bold text-gray-900 dark:text-white font-serif">
              {scenario.scenarioTitle}
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-3.5 py-1.5 rounded-full text-xs font-mono text-amber-700 dark:text-amber-300 font-semibold">
          <Award className="w-4 h-4 text-amber-500 dark:text-amber-400" />
          <span>{score} Practice Pts</span>
        </div>
      </div>

      {/* The Inquiry Prompt Box */}
      <div className="my-5 p-4 rounded-2xl bg-amber-50/70 dark:bg-white/[0.03] border border-amber-200/60 dark:border-white/10">
        <div className="text-[11px] font-mono text-amber-800 dark:text-gray-400 font-bold uppercase tracking-wider mb-1">
          {activeTier === "kids" ? "Wonder Question:" : "Practical Everyday Situation:"}
        </div>
        <p className="text-sm md:text-base text-gray-800 dark:text-gray-100 font-medium leading-relaxed italic">
          "{scenario.inquiry}"
        </p>
      </div>

      {/* Answer Options: Balanced One-Liners */}
      <div className="space-y-3">
        {scenario.options.map((option, idx) => {
          const isChosen = selectedOption === idx;
          const isSubmitted = selectedOption !== null;

          let cardStyle =
            "bg-stone-50/80 dark:bg-white/[0.02] border-gray-200 dark:border-white/10 text-gray-800 dark:text-gray-200 hover:bg-amber-50/60 dark:hover:bg-white/[0.05] hover:border-amber-400/40";
          if (isSubmitted) {
            if (option.isBest) {
              cardStyle =
                "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500 text-emerald-950 dark:text-emerald-100 shadow-md shadow-emerald-500/10";
            } else if (isChosen) {
              cardStyle = "bg-red-50 dark:bg-red-950/30 border-red-500 text-red-950 dark:text-red-200";
            } else {
              cardStyle = "bg-stone-50/40 dark:bg-white/[0.01] border-gray-200/60 dark:border-white/10 text-gray-500 dark:text-gray-400";
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
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  )}
                  {isSubmitted && isChosen && !option.isBest && (
                    <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
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
                  <span className="text-[10px] font-mono text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-white/5 px-2 py-0.5 rounded border border-gray-200 dark:border-white/10">
                    Select
                  </span>
                )}
              </div>

              {/* EXPANDED EXPLANATION: Appears for ALL options once an answer is chosen */}
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-3 pt-3 border-t border-gray-200 dark:border-white/10 text-xs leading-relaxed"
                >
                  <div className="flex items-center gap-1.5 font-semibold mb-1 font-mono">
                    {option.isBest ? (
                      <span className="text-emerald-700 dark:text-emerald-400">✓ Recommended Logical Response:</span>
                    ) : (
                      <span className="text-amber-700 dark:text-amber-400">⚠ Why this is sub-optimal:</span>
                    )}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{option.analysis}</p>
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
          className="mt-5 pt-4 border-t border-gray-200 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div className="text-[11px] p-2.5 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-amber-900 dark:text-amber-200/90 font-mono flex-1">
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
