"use client";

import { aras } from "@/lib/kalchakra-data";
import { ArrowLeft, Clock, Ruler, Heart, Bone, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function KalchakraPage({ params }: { params: Promise<{ lang: string }> }) {
  const [lang, setLang] = useState("en"); 
  useEffect(() => { params.then(p => setLang(p.lang)); }, [params]);
  const l = (lang === "hi" || lang === "kn") ? lang : "en";
  
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);

  const [selectedAra, setSelectedAra] = useState<number | null>(null);
  const [activeWheelIndex, setActiveWheelIndex] = useState(4); 

  const visualHeights = ["h-full", "h-[66%]", "h-[33%]", "h-[8%]", "h-[2%]", "h-[0.5%]"];
  const startHeights = { 1: "6000 Dhanush", 2: "4000 Dhanush", 3: "2000 Dhanush", 4: "500 Dhanush", 5: "7 Hath", 6: "3 Hath" };

  // --- DATA PREP ---
  const wheelData = [
    ...aras.map(a => ({ ...a, cycle: "Avasarpini" })), 
    ...[...aras].reverse().map((a, i) => ({ ...a, id: i + 7, cycle: "Utsarpini" }))
  ];
  const activeWheelAra = wheelData[activeWheelIndex];

  // --- SVG MATH ---
  const halfCycleWeights = [14, 11, 9, 9, 3.5, 3.5]; 
  const totalSlices = [...halfCycleWeights, ...[...halfCycleWeights].reverse()]; 
  let cumulativePercent = 0;

  const getCoordinatesForPercent = (percent: number) => {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  };

  // --- EXACT ARROW MATH ---
  const radius = 1.55;
  const gapAngle = 10 * (Math.PI / 180); 

  // Right Arrow (Avasarpini)
  const startAngleRight = gapAngle; 
  const endAngleRight = Math.PI - gapAngle;
  const rightPath = [
    `M ${Math.cos(startAngleRight) * radius} ${Math.sin(startAngleRight) * radius}`, 
    `A ${radius} ${radius} 0 0 1 ${Math.cos(endAngleRight) * radius} ${Math.sin(endAngleRight) * radius}` 
  ].join(" ");

  // Left Arrow (Utsarpini)
  const startAngleLeft = Math.PI + gapAngle; 
  const endAngleLeft = (2 * Math.PI) - gapAngle;
  const leftPath = [
    `M ${Math.cos(startAngleLeft) * radius} ${Math.sin(startAngleLeft) * radius}`, 
    `A ${radius} ${radius} 0 0 1 ${Math.cos(endAngleLeft) * radius} ${Math.sin(endAngleLeft) * radius}` 
  ].join(" ");


  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-white overflow-hidden font-sans selection:bg-orange-500 selection:text-white">
      
      {/* Navbar */}
      <Link href={`/${lang}`} className="fixed top-24 left-6 z-40 flex items-center gap-2 text-zinc-500 hover:text-orange-500 transition-all bg-white/80 dark:bg-zinc-900/80 px-4 py-2 rounded-full backdrop-blur-md border border-zinc-200 dark:border-white/10 shadow-sm">
         <ArrowLeft size={16} /> <span className="text-[10px] font-bold uppercase tracking-widest">Library</span>
      </Link>

      <div className="max-w-5xl mx-auto px-6 py-24">
        
        <header className="mb-20 mt-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/20 text-orange-600 text-xs font-bold mb-6 tracking-widest uppercase">
             <Clock size={14} /> The Wheel of Time
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter uppercase">6 COSMIC ERAS</h1>
          <p className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl leading-relaxed">
            The descending arc of the cosmic cycle (Avasarpini). Below, explore the full cycle.
          </p>
        </header>

        {/* LIST SECTION */}
        <div className="relative border-l-2 border-zinc-200 dark:border-zinc-800 ml-4 md:ml-0 space-y-12 mb-32">
          {aras.map((ara, index) => (
            <motion.div key={ara.id} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="relative pl-12 md:pl-24 group">
              <div className={`absolute left-[-9px] top-0 w-5 h-5 rounded-full border-4 border-white dark:border-black ${ara.barColor} transition-all duration-300 group-hover:scale-150 shadow-sm`}></div>
              <div onClick={() => setSelectedAra(selectedAra === ara.id ? null : ara.id)} className={`cursor-pointer rounded-3xl p-8 border transition-all duration-500 ${selectedAra === ara.id ? "bg-zinc-900 text-white dark:bg-white dark:text-black scale-105 shadow-2xl z-10" : "bg-white dark:bg-zinc-900/50 border-zinc-100 dark:border-white/5 hover:border-orange-500/30 hover:shadow-lg"}`}>
                <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-2">
                  <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight">{ara.name[l]}</h2>
                  <div className="text-xs font-bold tracking-widest opacity-60 uppercase">{ara.duration[l]}</div>
                </div>
                <div className="text-xs uppercase tracking-widest font-bold mb-4 opacity-50">{ara.meaning[l]}</div>
                <div className="text-base md:text-lg opacity-80 mb-6 font-serif leading-relaxed">{ara.description[l]}</div>
                <AnimatePresence>
                  {selectedAra === ara.id && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-white/10 dark:border-black/10 pt-6 mt-6">
                      <div className="bg-white/5 dark:bg-black/5 p-4 rounded-xl flex items-center gap-4">
                        <div className="p-3 bg-blue-500/20 text-blue-500 rounded-full"><Ruler size={16} /></div>
                        <div><div className="text-[9px] uppercase tracking-widest opacity-60 font-bold">Height</div><div className="text-sm md:text-base font-bold">{ara.height[l]}</div></div>
                      </div>
                      <div className="bg-white/5 dark:bg-black/5 p-4 rounded-xl flex items-center gap-4">
                        <div className="p-3 bg-red-500/20 text-red-500 rounded-full"><Heart size={16} /></div>
                        <div><div className="text-[9px] uppercase tracking-widest opacity-60 font-bold">Lifespan</div><div className="text-sm md:text-base font-bold">{ara.lifespan[l]}</div></div>
                      </div>
                      <div className="bg-white/5 dark:bg-black/5 p-4 rounded-xl flex items-center gap-4">
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

        {/* ================= SECTION 2: THE WHEEL OF TIME ================= */}
        <div className="py-24 border-t border-zinc-200 dark:border-zinc-800">
           <div className="text-center mb-24">
              <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">The Eternal Cycle</h2>
              <p className="text-zinc-500 max-w-lg mx-auto">Explore the 12-part cosmic wheel. Notice the flow of time rising and falling.</p>
           </div>

           {/* WHEEL CONTAINER */}
           <div className="relative w-[340px] h-[340px] md:w-[600px] md:h-[600px] mx-auto mb-16">
               
               {isMounted ? (
                 <svg viewBox="-1.8 -1.8 3.6 3.6" className="w-full h-full -rotate-90">
                   <defs>
                     <marker id="arrowhead-down" markerWidth="4" markerHeight="4" refX="0" refY="2" orient="auto">
                       <polygon points="0 0, 4 2, 0 4" fill="#f97316" />
                     </marker>
                     <marker id="arrowhead-up" markerWidth="4" markerHeight="4" refX="0" refY="2" orient="auto">
                       <polygon points="0 0, 4 2, 0 4" fill="#10b981" />
                     </marker>
                   </defs>

                   {/* VERTICAL DIVIDER LINE */}
                   <line x1="-1.75" y1="0" x2="1.75" y2="0" className="stroke-zinc-400 dark:stroke-zinc-600" strokeWidth="0.025" strokeDasharray="0.05 0.05" strokeLinecap="round" />

                   {/* --- RIGHT SIDE: AVASARPINI --- */}
                   <path id="avasarpiniArc" d={rightPath} fill="none" stroke="#f97316" strokeWidth="0.03" strokeDasharray="0.1 0.05" opacity="0.6" markerEnd="url(#arrowhead-down)" />
                   
                   {/* Title (Outside the arrow) */}
                   <text fontSize="0.11" fontWeight="bold" fill="#f97316" dy="-0.06" letterSpacing="0.02">
                       <textPath href="#avasarpiniArc" startOffset="50%" textAnchor="middle">AVASARPINI (DECLINE)</textPath>
                   </text>
                   
                   {/* Duration (Inside the arrow) */}
                   <text fontSize="0.07" fontWeight="bold" fill="#f97316" dy="0.12" letterSpacing="0.05" opacity="0.8">
                       <textPath href="#avasarpiniArc" startOffset="50%" textAnchor="middle">10 KODAKODI SAGAROPAM</textPath>
                   </text>


                   {/* --- LEFT SIDE: UTSARPINI --- */}
                   <path id="utsarpiniArc" d={leftPath} fill="none" stroke="#10b981" strokeWidth="0.03" strokeDasharray="0.1 0.05" opacity="0.6" markerEnd="url(#arrowhead-up)" />
                   
                   {/* Title (Outside the arrow) */}
                   <text fontSize="0.11" fontWeight="bold" fill="#10b981" dy="-0.06" letterSpacing="0.02">
                       <textPath href="#utsarpiniArc" startOffset="50%" textAnchor="middle">UTSARPINI (RISE)</textPath>
                   </text>
                   
                   {/* Duration (Inside the arrow) */}
                   <text fontSize="0.07" fontWeight="bold" fill="#10b981" dy="0.12" letterSpacing="0.05" opacity="0.8">
                       <textPath href="#utsarpiniArc" startOffset="50%" textAnchor="middle">10 KODAKODI SAGAROPAM</textPath>
                   </text>

                   {/* INNER SLICES LAYER */}
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
                         <g key={index} onClick={() => setActiveWheelIndex(index)} className="cursor-pointer group">
                              <path d={pathData} fill="currentColor" stroke="#09090b" strokeWidth="0.015"
                                 className={`transition-all duration-300 ${isActive ? 'scale-105 z-10 brightness-110' : 'hover:brightness-110'} ${wheelData[index].wheelColor}`}
                                 style={{ transformOrigin: "0 0" }}
                              />
                              <text x={labelX} y={labelY} fontSize="0.12" fontWeight="900" fill="currentColor" textAnchor="middle" dominantBaseline="central"
                                 className="pointer-events-none text-black/40 dark:text-black/60 select-none"
                                 transform={`rotate(90, ${labelX}, ${labelY})`}>
                                 {wheelData[index].id > 6 ? wheelData[index].id - 6 : wheelData[index].id}
                              </text>
                         </g>
                       );
                   })}
                   <circle cx="0" cy="0" r="0.45" className="fill-zinc-50 dark:fill-zinc-950 stroke-zinc-200 dark:stroke-zinc-800 stroke-[0.01]" />
                 </svg>
               ) : (
                 <div className="w-full h-full rounded-full bg-zinc-100 dark:bg-zinc-800 animate-pulse"></div>
               )}

               <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <RefreshCw className="w-8 h-8 text-zinc-300 dark:text-zinc-700 animate-spin-slow" />
               </div>
           </div>

           {/* DETAILS CARD */}
           <AnimatePresence mode="wait">
              <motion.div 
                key={activeWheelIndex} 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -20 }} 
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 md:p-8 max-w-3xl mx-auto shadow-xl"
              >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                      <div className="flex items-center gap-4">
                          <div className={`w-4 h-4 rounded-full ${activeWheelAra.barColor} border border-black/10 shrink-0`}></div>
                          <div>
                            <div className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest">{activeWheelAra.cycle}</div>
                            <h3 className="text-2xl md:text-3xl font-black uppercase">{activeWheelAra.name[l]}</h3>
                          </div>
                      </div>
                      <div className="flex items-center md:block gap-2 md:gap-0 text-left md:text-right">
                        <div className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest">Duration</div>
                        <div className="font-bold text-sm md:text-base ml-auto md:ml-0">{activeWheelAra.duration[l]}</div>
                      </div>
                  </div>
                  
                  <p className="text-zinc-600 dark:text-zinc-300 mb-8 font-serif leading-relaxed text-base md:text-lg">{activeWheelAra.description[l]}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                      <div className="p-4 bg-zinc-50 dark:bg-black rounded-xl text-center flex flex-row sm:flex-col items-center sm:justify-center justify-between gap-2">
                         <div className="text-[10px] uppercase font-bold text-zinc-400 sm:mb-1">Height</div>
                         <div className="font-bold text-sm">{activeWheelAra.height[l]}</div>
                      </div>
                      <div className="p-4 bg-zinc-50 dark:bg-black rounded-xl text-center flex flex-row sm:flex-col items-center sm:justify-center justify-between gap-2">
                         <div className="text-[10px] uppercase font-bold text-zinc-400 sm:mb-1">Lifespan</div>
                         <div className="font-bold text-sm">{activeWheelAra.lifespan[l]}</div>
                      </div>
                      <div className="p-4 bg-zinc-50 dark:bg-black rounded-xl text-center flex flex-row sm:flex-col items-center sm:justify-center justify-between gap-2">
                         <div className="text-[10px] uppercase font-bold text-zinc-400 sm:mb-1">State</div>
                         <div className="font-bold text-sm">{activeWheelAra.meaning[l]}</div>
                      </div>
                  </div>
              </motion.div>
           </AnimatePresence>
        </div>

        {/* COMPARISON FOOTER */}
        <div className="mt-32 p-8 bg-zinc-100 dark:bg-zinc-900 rounded-3xl text-center mb-24 relative overflow-hidden border border-zinc-200 dark:border-zinc-800">
            <h3 className="text-zinc-900 dark:text-white text-sm font-bold tracking-widest uppercase mb-12">The Collapse of Stature</h3>
            <div className="flex items-end justify-center gap-2 md:gap-4 lg:gap-8 h-80 border-b border-zinc-300 dark:border-zinc-700 pb-4">
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
  );
}