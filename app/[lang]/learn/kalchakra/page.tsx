"use client";

import { aras } from "@/lib/kalchakra-data";
import { ArrowLeft, Clock, Ruler, Heart, Bone, RefreshCw, BookOpen, Volume2, VolumeX, X, Crown, Scroll, Mountain, MousePointer2, Headphones } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- 1. EXTENDED "WIKI" DATA ---
const extendedAraDetails: Record<number, { 
    title: string; 
    lifestyle: string; 
    food: string; 
    keyFigures: string[]; 
    events: string; 
}> = {
  1: {
    title: "The Era of Absolute Bliss",
    lifestyle: "Beings are like gods. No work, no art, no kings. All needs are met instantly by Wish-Fulfilling Trees (Kalpavrikshas).",
    food: "A tiny morsel every 3 days is enough. The body produces no waste.",
    keyFigures: ["Yugalik Humans (Born in pairs)", "No Tirthankaras exist yet"],
    events: "The earth is made of sweet clay. Dust settles instantly. There is no concept of 'mine' or 'yours'."
  },
  2: {
    title: "The Era of Bliss",
    lifestyle: "Similar to the first era, but slightly less intense. The light of the Kalpavrikshas begins to dim slightly.",
    food: "Eating occurs every 2 days.",
    keyFigures: ["Yugalik Humans"],
    events: "The sun and moon become visible for the first time as the natural radiance of earth and bodies decreases."
  },
  3: {
    title: "The Era of Sorrow & Bliss",
    lifestyle: "The Kalpavrikshas vanish. Society begins. People learn arts, farming, and cooking for the first time.",
    food: "People eat once a day. Agriculture begins.",
    keyFigures: ["Bhagwan Rishabhdev (1st Tirthankara)", "Bharat Chakravarti (First Emperor)"],
    events: "Bhagwan Rishabhdev teaches the 'Six Arts' (Asi, Masi, Krishi, Vidya, Vanijya, Shilp) to organize civilization."
  },
  4: {
    title: "The Era of Action (Dukhama Sushama)",
    lifestyle: "The era of great heroes and great wars. Religion and Karma are at their peak intensity.",
    food: "Normal eating habits. Physical strength is immense.",
    keyFigures: ["23 Tirthankaras (Ajitnath to Mahavir)", "Ram & Sita", "The Pandavas", "Krishna"],
    events: "Moksha (Salvation) is possible. The Ramayana and Mahabharata take place in this era."
  },
  5: {
    title: "The Era of Sorrow (Current Era)",
    lifestyle: "Religion declines. Height and lifespan reduce drastically. Disease and conflict increase.",
    food: "Food provides less nutrition. Greed increases.",
    keyFigures: ["Acahryas (Kundkund, Shantisagar)", "No Tirthankaras born here"],
    events: "Moksha is not possible directly from this body. We must practice Dharma to be born in Videha Kshetra or Heaven."
  },
  6: {
    title: "The Era of Extreme Sorrow",
    lifestyle: "Humans live in caves (bills). Extreme heat by day, extreme cold by night. No society, no family.",
    food: "People eat raw fish and turtles. No fire exists.",
    keyFigures: ["None"],
    events: "At the end of this era, the Pralaya (Great Destruction) occurs, followed by the restart of the Utsarpini cycle."
  }
};

export default function KalchakraPage({ params }: { params: Promise<{ lang: string }> }) {
  const [lang, setLang] = useState("en"); 
  useEffect(() => { params.then(p => setLang(p.lang)); }, [params]);
  const l = (lang === "hi" || lang === "kn") ? lang : "en";
  
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);

  const [selectedAra, setSelectedAra] = useState<number | null>(null);
  const [activeWheelIndex, setActiveWheelIndex] = useState(4); 
  const [isMuted, setIsMuted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isWheelInView, setIsWheelInView] = useState(false);
  
  // NEW: Entrance State
  const [hasEntered, setHasEntered] = useState(false);

  // --- REFS ---
  const clickAudioRef = useRef<HTMLAudioElement | null>(null);
  const hoverAudioRef = useRef<HTMLAudioElement | null>(null);
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const wheelSectionRef = useRef<HTMLDivElement>(null);

  // --- 1. INITIALIZE AUDIO ---
  useEffect(() => {
    bgMusicRef.current = new Audio();
    bgMusicRef.current.loop = true;
    bgMusicRef.current.volume = 0; // Silent start
    
    clickAudioRef.current = new Audio("/sounds/click.mp3");
    hoverAudioRef.current = new Audio("/sounds/click2.mp3");
  }, []);

  // --- 2. ENTRANCE HANDLER (The "Magic" Interaction) ---
  const handleEnterExperience = () => {
    // A. Play a click sound immediately for feedback
    if (clickAudioRef.current) {
        clickAudioRef.current.volume = 0.5;
        clickAudioRef.current.play().catch(() => {});
    }

    // B. "Bless" the Background Music Player
    // We play it for a millisecond and then pause it. 
    // This tells the mobile browser: "The user allowed this audio."
    if (bgMusicRef.current) {
        bgMusicRef.current.play().then(() => {
            // Once promise resolves, we can safely pause and reset
            bgMusicRef.current!.pause(); 
            bgMusicRef.current!.currentTime = 0;
        }).catch((e) => console.log("Audio unlock failed", e));
    }

    // C. Unlock the UI
    setHasEntered(true);
  };

  // --- 3. SCROLL DETECTION ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsWheelInView(entry.isIntersecting);
      },
      { threshold: 0.25 }
    );

    if (wheelSectionRef.current) {
      observer.observe(wheelSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // --- 4. DATA PREP ---
  const wheelData = [
    ...aras.map(a => ({ ...a, cycle: "Avasarpini" })), 
    ...[...aras].reverse().map((a, i) => ({ ...a, id: i + 7, cycle: "Utsarpini" }))
  ];
  const activeWheelAra = wheelData[activeWheelIndex];

  const getNormalizedId = (id: number) => (id > 6 ? 13 - id : id);
  const normalizedId = getNormalizedId(activeWheelAra.id);

  // --- 5. BACKGROUND MUSIC ENGINE ---
  useEffect(() => {
    if (!bgMusicRef.current) return;
    const player = bgMusicRef.current;
    
    const shouldPlay = isWheelInView && !isMuted && hasEntered; // Added hasEntered check
    const targetVolume = shouldPlay ? 0.3 : 0;
    const targetSrc = `/sounds/ara${normalizedId}.mp3`;

    // Ensure source is set
    const currentSrcPath = player.getAttribute('src') || "";
    if (!currentSrcPath.includes(targetSrc)) {
        player.src = targetSrc;
    }

    // Play Logic
    if (shouldPlay) {
        if (player.paused) {
            player.play().catch(() => {});
        }
    }

    // Smooth Fader
    const fadeInterval = setInterval(() => {
        if (shouldPlay && player.volume < targetVolume) {
            player.volume = Math.min(player.volume + 0.02, targetVolume);
        } else if (!shouldPlay && player.volume > 0) {
            player.volume = Math.max(player.volume - 0.02, 0);
        }
        
        if (player.volume === 0 && !shouldPlay) {
            player.pause();
        }
    }, 100);

    return () => clearInterval(fadeInterval);
  }, [activeWheelIndex, isWheelInView, isMuted, normalizedId, hasEntered]);


  // --- 6. UI SOUNDS ---
  const playSound = (type: 'click' | 'hover') => {
      if (isMuted || !isMounted) return;
      const audio = type === 'click' ? clickAudioRef.current : hoverAudioRef.current;
      if (audio) {
          audio.currentTime = 0;
          audio.volume = 0.6;
          audio.play().catch(() => {});
      }
  };

  const visualHeights = ["h-full", "h-[66%]", "h-[33%]", "h-[8%]", "h-[2%]", "h-[0.5%]"];
  const startHeights = { 1: "6000 Dhanush", 2: "4000 Dhanush", 3: "2000 Dhanush", 4: "500 Dhanush", 5: "7 Hath", 6: "3 Hath" };

  // --- HELPER: COLORS ---
  const getAraTheme = (id: number) => {
    const nId = getNormalizedId(id);
    switch (nId) {
        case 1: return "bg-gradient-to-br from-zinc-50 via-white to-zinc-100"; 
        case 2: return "bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50"; 
        case 3: return "bg-gradient-to-br from-orange-100 via-orange-200 to-amber-200"; 
        case 4: return "bg-gradient-to-br from-emerald-100 via-green-100 to-teal-100"; 
        case 5: return "bg-gradient-to-br from-zinc-300 via-zinc-400 to-zinc-500"; 
        case 6: return "bg-gradient-to-br from-zinc-700 via-zinc-800 to-black"; 
        default: return "bg-zinc-100";
    }
  };

  const currentTheme = getAraTheme(activeWheelAra.id);
  const currentDetails = extendedAraDetails[normalizedId] || extendedAraDetails[1];

  // --- SVG MATH ---
  const halfCycleWeights = [14, 11, 9, 9, 3.5, 3.5]; 
  const totalSlices = [...halfCycleWeights, ...[...halfCycleWeights].reverse()]; 
  let cumulativePercent = 0;

  const getCoordinatesForPercent = (percent: number) => {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  };

  const radius = 1.55;
  const gapAngle = 10 * (Math.PI / 180); 
  const startAngleRight = gapAngle; 
  const endAngleRight = Math.PI - gapAngle;
  const rightPath = [
    `M ${Math.cos(startAngleRight) * radius} ${Math.sin(startAngleRight) * radius}`, 
    `A ${radius} ${radius} 0 0 1 ${Math.cos(endAngleRight) * radius} ${Math.sin(endAngleRight) * radius}` 
  ].join(" ");
  const startAngleLeft = Math.PI + gapAngle; 
  const endAngleLeft = (2 * Math.PI) - gapAngle;
  const leftPath = [
    `M ${Math.cos(startAngleLeft) * radius} ${Math.sin(startAngleLeft) * radius}`, 
    `A ${radius} ${radius} 0 0 1 ${Math.cos(endAngleLeft) * radius} ${Math.sin(endAngleLeft) * radius}` 
  ].join(" ");

  return (
    <div className={`min-h-screen text-zinc-900 dark:text-white overflow-hidden font-sans selection:bg-orange-500 selection:text-white relative ${!hasEntered ? 'h-screen overflow-hidden' : ''}`}>
      
      {/* --- 0. ENTRANCE GATE (The Audio Unlocker) --- */}
      <AnimatePresence>
        {!hasEntered && (
            <motion.div 
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
                className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-zinc-950 text-white px-6 text-center"
            >
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="space-y-8"
                >
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center animate-spin-slow">
                            <Clock className="w-8 h-8 text-orange-500" />
                        </div>
                    </div>
                    
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter bg-gradient-to-b from-white to-zinc-600 bg-clip-text text-transparent">
                        The Eternal Cycle
                    </h1>
                    
                    <p className="text-zinc-400 max-w-md mx-auto text-sm md:text-base leading-relaxed">
                        Journey through the rising and falling eras of time. Experience the atmosphere of the Kalchakra.
                    </p>

                    <div className="pt-8">
                        <button 
                            onClick={handleEnterExperience}
                            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform duration-300"
                        >
                            <span>Enter The Cycle</span>
                            <ArrowLeft className="rotate-180 transition-transform group-hover:translate-x-1" size={18} />
                        </button>
                    </div>

                    <div className="flex justify-center items-center gap-2 text-zinc-600 text-xs font-medium pt-8 animate-pulse">
                        <Headphones size={14} />
                        <span>Best Experienced with Audio</span>
                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>


      {/* --- 1. IMMERSIVE BACKGROUND LAYER --- */}
      <div className="fixed inset-0 z-0">
         <AnimatePresence mode="popLayout">
            <motion.div 
               key={activeWheelIndex} 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 0.8, ease: "easeInOut" }} 
               className={`absolute inset-0 ${currentTheme}`}
            />
         </AnimatePresence>
         <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>

      {/* --- CONTENT LAYER (z-10) --- */}
      <div className="relative z-10">

        {/* Navbar */}
        <nav className="fixed top-24 left-6 z-40 flex items-center gap-4">
            <Link href={`/${lang}`} className="flex items-center gap-2 text-zinc-500 hover:text-orange-600 transition-all bg-white/80 dark:bg-zinc-900/80 px-4 py-2 rounded-full backdrop-blur-md border border-zinc-200/50 shadow-sm">
                <ArrowLeft size={16} /> <span className="text-[10px] font-bold uppercase tracking-widest">Library</span>
            </Link>
            <button onClick={() => setIsMuted(!isMuted)} className="p-2 rounded-full bg-white/80 text-zinc-400 hover:text-zinc-800 transition-all backdrop-blur-md">
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
        </nav>

        <div className="max-w-5xl mx-auto px-6 py-24">
          
          <header className="mb-20 mt-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/60 dark:bg-black/20 border border-white/20 text-orange-700 dark:text-orange-400 text-xs font-bold mb-6 tracking-widest uppercase backdrop-blur-md shadow-sm">
               <Clock size={14} /> The Wheel of Time
            </div>
            <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter uppercase drop-shadow-sm">6 COSMIC ERAS</h1>
            <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-300 max-w-2xl leading-relaxed font-medium">
              The descending arc of the cosmic cycle (Avasarpini). Below, explore the full cycle.
            </p>
          </header>

          {/* LIST SECTION */}
          <div className="relative border-l-2 border-black/10 dark:border-white/10 ml-4 md:ml-0 space-y-12 mb-32">
            {aras.map((ara, index) => (
              <motion.div key={ara.id} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="relative pl-12 md:pl-24 group">
                <div className={`absolute left-[-9px] top-0 w-5 h-5 rounded-full border-4 border-white/50 dark:border-black/50 ${ara.barColor} transition-all duration-300 group-hover:scale-150 shadow-sm`}></div>
                <div 
                  onClick={() => { setSelectedAra(selectedAra === ara.id ? null : ara.id); playSound('click'); }} 
                  className={`cursor-pointer rounded-3xl p-8 border transition-all duration-500 backdrop-blur-md ${selectedAra === ara.id ? "bg-black/80 text-white dark:bg-white/90 dark:text-black scale-105 shadow-2xl z-10" : "bg-white/40 dark:bg-black/40 border-white/40 dark:border-white/5 hover:bg-white/60 hover:shadow-lg"}`}
                >
                  <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-2">
                    <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight">{ara.name[l]}</h2>
                    <div className="text-xs font-bold tracking-widest opacity-60 uppercase">{ara.duration[l]}</div>
                  </div>
                  <div className="text-xs uppercase tracking-widest font-bold mb-4 opacity-50">{ara.meaning[l]}</div>
                  <div className="text-base md:text-lg opacity-90 mb-6 font-serif leading-relaxed">{ara.description[l]}</div>
                  <AnimatePresence>
                    {selectedAra === ara.id && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-white/10 dark:border-black/10 pt-6 mt-6">
                        <div className="bg-white/20 dark:bg-black/20 p-4 rounded-xl flex items-center gap-4">
                          <div className="p-3 bg-blue-500/20 text-blue-500 rounded-full"><Ruler size={16} /></div>
                          <div><div className="text-[9px] uppercase tracking-widest opacity-60 font-bold">Height</div><div className="text-sm md:text-base font-bold">{ara.height[l]}</div></div>
                        </div>
                        <div className="bg-white/20 dark:bg-black/20 p-4 rounded-xl flex items-center gap-4">
                          <div className="p-3 bg-red-500/20 text-red-500 rounded-full"><Heart size={16} /></div>
                          <div><div className="text-[9px] uppercase tracking-widest opacity-60 font-bold">Lifespan</div><div className="text-sm md:text-base font-bold">{ara.lifespan[l]}</div></div>
                        </div>
                        <div className="bg-white/20 dark:bg-black/20 p-4 rounded-xl flex items-center gap-4">
                          <div className="p-3 bg-zinc-500/20 text-zinc-500 rounded-full"><Bone size={16} /></div>
                          <div><div className="text-[9px] uppercase tracking-widest opacity-60 font-bold">Ribs</div><div className="text-sm md:text-base font-bold">{ara.ribs[l]}</div></div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ================= SECTION 2: THE WHEEL OF TIME (Music Trigger) ================= */}
          <div ref={wheelSectionRef} className="py-24 border-t border-black/10 dark:border-white/10">
             <div className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-black uppercase mb-4 drop-shadow-sm">The Eternal Cycle</h2>
                <p className="text-zinc-600 dark:text-zinc-400 max-w-lg mx-auto font-medium">Explore the 12-part cosmic wheel. Notice the flow of time rising and falling.</p>
             </div>

             {/* INTERACTION HINT */}
             <div className="flex justify-center mb-8">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-black/50 backdrop-blur-md rounded-full border border-black/5 dark:border-white/10 shadow-sm animate-pulse">
                    <MousePointer2 size={14} className="text-orange-600 dark:text-orange-400" />
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-80 text-zinc-800 dark:text-zinc-200">Tap Any Slice To Travel</span>
                </div>
             </div>

             {/* WHEEL CONTAINER */}
             <div className="relative w-[340px] h-[340px] md:w-[600px] md:h-[600px] mx-auto mb-16">
                 {isMounted ? (
                   <svg viewBox="-1.8 -1.8 3.6 3.6" className="w-full h-full -rotate-90 drop-shadow-2xl">
                     <defs>
                       <marker id="arrowhead-down" markerWidth="4" markerHeight="4" refX="0" refY="2" orient="auto"><polygon points="0 0, 4 2, 0 4" fill="#f97316" /></marker>
                       <marker id="arrowhead-up" markerWidth="4" markerHeight="4" refX="0" refY="2" orient="auto"><polygon points="0 0, 4 2, 0 4" fill="#10b981" /></marker>
                     </defs>
                     <line x1="-1.75" y1="0" x2="1.75" y2="0" className="stroke-zinc-400 dark:stroke-zinc-600" strokeWidth="0.025" strokeDasharray="0.05 0.05" strokeLinecap="round" />
                     <path id="avasarpiniArc" d={rightPath} fill="none" stroke="#f97316" strokeWidth="0.03" strokeDasharray="0.1 0.05" opacity="0.8" markerEnd="url(#arrowhead-down)" />
                     <text fontSize="0.11" fontWeight="bold" fill="#f97316" dy="-0.06" letterSpacing="0.02"><textPath href="#avasarpiniArc" startOffset="50%" textAnchor="middle">AVASARPINI (DECLINE)</textPath></text>
                     <text fontSize="0.07" fontWeight="bold" fill="#f97316" dy="0.12" letterSpacing="0.05" opacity="0.8"><textPath href="#avasarpiniArc" startOffset="50%" textAnchor="middle">10 KODAKODI SAGAROPAM</textPath></text>
                     <path id="utsarpiniArc" d={leftPath} fill="none" stroke="#10b981" strokeWidth="0.03" strokeDasharray="0.1 0.05" opacity="0.8" markerEnd="url(#arrowhead-up)" />
                     <text fontSize="0.11" fontWeight="bold" fill="#10b981" dy="-0.06" letterSpacing="0.02"><textPath href="#utsarpiniArc" startOffset="50%" textAnchor="middle">UTSARPINI (RISE)</textPath></text>
                     <text fontSize="0.07" fontWeight="bold" fill="#10b981" dy="0.12" letterSpacing="0.05" opacity="0.8"><textPath href="#utsarpiniArc" startOffset="50%" textAnchor="middle">10 KODAKODI SAGAROPAM</textPath></text>
                     {totalSlices.map((slicePercent, index) => {
                         const startPercent = cumulativePercent;
                         cumulativePercent += slicePercent / 100;
                         const endPercent = cumulativePercent;
                         const midPercent = startPercent + (slicePercent / 100) / 2;
                         const [startX, startY] = getCoordinatesForPercent(startPercent);
                         const [endX, endY] = getCoordinatesForPercent(endPercent);
                         const labelX = (Math.cos(2 * Math.PI * midPercent) * 0.75);
                         const labelY = (Math.sin(2 * Math.PI * midPercent) * 0.75);
                         const pathData = `M 0 0 L ${startX.toFixed(5)} ${startY.toFixed(5)} A 1 1 0 0 1 ${endX.toFixed(5)} ${endY.toFixed(5)} Z`;
                         const isActive = index === activeWheelIndex;
                         return (
                           <g key={index} onClick={() => { setActiveWheelIndex(index); playSound('click'); }} className="cursor-pointer group">
                                <path d={pathData} fill="currentColor" stroke="#09090b" strokeWidth="0.015" className={`transition-all duration-300 ${isActive ? 'scale-105 z-10 brightness-110 drop-shadow-md' : 'hover:brightness-110'} ${wheelData[index].wheelColor}`} style={{ transformOrigin: "0 0" }} />
                                <text x={labelX} y={labelY} fontSize="0.12" fontWeight="900" fill="currentColor" textAnchor="middle" dominantBaseline="central" className="pointer-events-none text-black/40 dark:text-black/60 select-none" transform={`rotate(90, ${labelX}, ${labelY})`}>{wheelData[index].id > 6 ? wheelData[index].id - 6 : wheelData[index].id}</text>
                           </g>
                         );
                     })}
                     <circle cx="0" cy="0" r="0.45" className="fill-white/80 dark:fill-black/80 stroke-zinc-200 dark:stroke-zinc-800 stroke-[0.01]" />
                   </svg>
                 ) : (
                   <div className="w-full h-full rounded-full bg-zinc-100 dark:bg-zinc-800 animate-pulse"></div>
                 )}
                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none"><RefreshCw className="w-8 h-8 text-zinc-300 dark:text-zinc-700 animate-spin-slow" /></div>
             </div>

             {/* DETAILS CARD */}
             <AnimatePresence mode="wait">
                <motion.div 
                  key={activeWheelIndex} 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -20 }} 
                  className="bg-white/80 dark:bg-black/60 border border-white/20 dark:border-white/10 rounded-3xl p-6 md:p-8 max-w-3xl mx-auto shadow-2xl backdrop-blur-xl"
                >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-4">
                            <div className={`w-4 h-4 rounded-full ${activeWheelAra.barColor} border border-black/10 shrink-0`}></div>
                            <div>
                              <div className="text-[10px] uppercase font-bold text-zinc-500 dark:text-zinc-400 tracking-widest">{activeWheelAra.cycle}</div>
                              <h3 className="text-2xl md:text-3xl font-black uppercase">{activeWheelAra.name[l]}</h3>
                            </div>
                        </div>
                        <div className="flex items-center md:block gap-2 md:gap-0 text-left md:text-right">
                          <div className="text-[10px] uppercase font-bold text-zinc-500 dark:text-zinc-400 tracking-widest">Duration</div>
                          <div className="font-bold text-sm md:text-base ml-auto md:ml-0">{activeWheelAra.duration[l]}</div>
                        </div>
                    </div>
                    <p className="text-zinc-700 dark:text-zinc-200 mb-8 font-serif leading-relaxed text-base md:text-lg">{activeWheelAra.description[l]}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-8">
                        <div className="p-4 bg-white/50 dark:bg-black/40 rounded-xl text-center flex flex-row sm:flex-col items-center sm:justify-center justify-between gap-2 border border-black/5">
                           <div className="text-[10px] uppercase font-bold text-zinc-400 sm:mb-1">Height</div>
                           <div className="font-bold text-sm">{activeWheelAra.height[l]}</div>
                        </div>
                        <div className="p-4 bg-white/50 dark:bg-black/40 rounded-xl text-center flex flex-row sm:flex-col items-center sm:justify-center justify-between gap-2 border border-black/5">
                           <div className="text-[10px] uppercase font-bold text-zinc-400 sm:mb-1">Lifespan</div>
                           <div className="font-bold text-sm">{activeWheelAra.lifespan[l]}</div>
                        </div>
                        <div className="p-4 bg-white/50 dark:bg-black/40 rounded-xl text-center flex flex-row sm:flex-col items-center sm:justify-center justify-between gap-2 border border-black/5">
                           <div className="text-[10px] uppercase font-bold text-zinc-400 sm:mb-1">State</div>
                           <div className="font-bold text-sm">{activeWheelAra.meaning[l]}</div>
                        </div>
                    </div>
                    <div className="flex justify-center">
                      <button onClick={() => { setShowModal(true); playSound('click'); }} className="flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-black font-bold text-sm hover:scale-105 transition-transform shadow-lg">
                        <BookOpen size={16} /> Read Full Chronicle
                      </button>
                    </div>
                </motion.div>
             </AnimatePresence>
          </div>

          {/* COMPARISON FOOTER */}
          <div className="mt-32 p-8 bg-white/60 dark:bg-black/60 rounded-3xl text-center mb-24 relative overflow-hidden border border-white/20 dark:border-white/5 backdrop-blur-md shadow-lg">
              <h3 className="text-zinc-900 dark:text-white text-sm font-bold tracking-widest uppercase mb-12">The Collapse of Stature</h3>
              <div className="flex items-end justify-center gap-2 md:gap-4 lg:gap-8 h-80 border-b border-black/10 dark:border-white/10 pb-4">
                 {aras.map((ara, i) => (
                    <div key={i} className={`w-8 md:w-16 lg:w-24 ${ara.barColor} ${visualHeights[i]} rounded-t-lg relative group transition-all duration-500 hover:opacity-80 shadow-sm border border-black/5`}>
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-white text-[10px] md:text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 px-2 py-1 rounded z-20 pointer-events-none">{startHeights[ara.id as keyof typeof startHeights]}</div>
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-black/50 text-[10px] font-bold">{ara.id}</div>
                    </div>
                 ))}
              </div>
              <p className="text-zinc-500 text-xs mt-6 max-w-lg mx-auto leading-relaxed">*Visual approximation.</p>
          </div>

        </div>
      </div>

      {/* --- DETAILED MODAL --- */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800"
            >
              <div className={`h-32 w-full ${currentTheme} relative`}>
                <div className="absolute top-4 right-4 z-50">
                  <button onClick={() => setShowModal(false)} className="p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-md transition-colors">
                    <X size={20} />
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="text-xs font-bold text-white/80 uppercase tracking-widest mb-1">{activeWheelAra.name[l]}</div>
                  <h2 className="text-2xl font-black text-white">{currentDetails.title}</h2>
                </div>
              </div>
              <div className="p-6 md:p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <div className="flex items-center gap-2 text-orange-600 font-bold uppercase text-xs tracking-widest"><Mountain size={14} /> Lifestyle</div>
                      <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">{currentDetails.lifestyle}</p>
                   </div>
                   <div className="space-y-2">
                      <div className="flex items-center gap-2 text-green-600 font-bold uppercase text-xs tracking-widest"><Scroll size={14} /> Sustenance</div>
                      <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">{currentDetails.food}</p>
                   </div>
                </div>
                <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-black/40 border border-zinc-100 dark:border-zinc-800">
                    <div className="flex items-center gap-2 text-blue-600 font-bold uppercase text-xs tracking-widest mb-4"><Crown size={14} /> Key Figures</div>
                    <div className="flex flex-wrap gap-2">
                      {currentDetails.keyFigures.map((fig, i) => (
                        <span key={i} className="px-3 py-1 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-full text-xs font-bold shadow-sm">{fig}</span>
                      ))}
                    </div>
                </div>
                <div>
                   <h3 className="font-bold text-lg mb-2">History & Evolution</h3>
                   <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{currentDetails.events}</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}