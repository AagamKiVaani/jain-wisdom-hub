"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ArrowLeft, Play, Pause, Info, BookOpen, Quote, Sparkles, ChevronDown } from "lucide-react";
import Link from "next/link";
import { Topic } from "@/lib/namokar-data";

export default function TopicClient({ data, lang, l }: { data: Topic, lang: string, l: "en" | "hi" | "kn" }) {
  const [expandedLine, setExpandedLine] = useState<string | null>(null);
  const [playingAudioUrl, setPlayingAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleAudio = (url: string | undefined) => {
    if (!url) return;
    
    if (playingAudioUrl === url) {
      audioRef.current?.pause();
      setPlayingAudioUrl(null);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      audioRef.current = new Audio(url);
      audioRef.current.play();
      setPlayingAudioUrl(url);
      audioRef.current.onended = () => {
        setPlayingAudioUrl(null);
      };
    }
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  // Animation variants
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black pb-32 overflow-hidden selection:bg-orange-500 selection:text-white">
      
      {/* 1. FIXED NAVIGATION */}
      <Link 
        href={`/${lang}`} 
        className="fixed top-6 left-4 md:top-8 md:left-8 z-[100] flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-orange-600 dark:hover:text-orange-400 transition-all bg-white/80 dark:bg-black/60 px-5 py-2.5 rounded-full backdrop-blur-xl border border-zinc-200 dark:border-white/10 shadow-lg group"
      >
         <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
         <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.25em]">LIBRARY</span>
      </Link>

      {/* HERO SECTION - Divine & Ethereal */}
      <div className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 flex flex-col items-center justify-center text-center">
        {/* Animated Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[600px] bg-orange-500/20 dark:bg-orange-600/10 blur-[100px] md:blur-[150px] rounded-full pointer-events-none z-0"></div>
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-amber-400/20 dark:bg-amber-500/10 blur-[100px] rounded-full pointer-events-none z-0 animate-pulse"></div>

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 max-w-5xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 text-xs font-black uppercase tracking-widest border border-orange-200 dark:border-orange-500/20 shadow-xl shadow-orange-500/10">
            <Sparkles size={16} className="text-orange-500" />
            Sacred Mantra
          </motion.div>
          
          <motion.div variants={fadeInUp}>
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-500 mb-6 tracking-tighter leading-tight drop-shadow-sm">
              {data.title[l]}
            </h1>
          </motion.div>
          
          <motion.div variants={fadeInUp}>
            <p className="text-xl md:text-3xl text-orange-600 dark:text-orange-400 font-serif italic tracking-wide max-w-3xl mx-auto">
              "{data.subtitle[l]}"
            </p>
          </motion.div>
        </motion.div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 space-y-32 md:space-y-48 relative z-10">
        {data.chapters.map((chapter, cIdx) => (
          <motion.div 
            key={chapter.chapterNumber}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="relative"
          >
            {/* Chapter Header with Parallax-style number */}
            <motion.div variants={fadeInUp} className="relative flex items-center gap-6 mb-16 md:mb-24">
              <span className="absolute -top-16 md:-top-24 left-0 text-[120px] md:text-[200px] font-black text-zinc-100 dark:text-zinc-900/50 leading-none -z-10 select-none">
                0{chapter.chapterNumber}
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-white border-l-8 border-orange-500 pl-6 uppercase tracking-tight">
                {chapter.chapterTitle[l]}
              </h2>
            </motion.div>

            <div className="space-y-16 md:space-y-24">
                {chapter.sections.map((section, sIdx) => (
                    <motion.div key={sIdx} variants={fadeInUp} className="relative">
                    
                    <h3 className="text-xs md:text-sm font-black text-orange-600/50 dark:text-orange-400/50 uppercase tracking-[0.4em] mb-8 flex items-center gap-6">
                        <span className="h-[2px] bg-gradient-to-r from-transparent to-orange-500/30 grow"></span>
                        {section.heading[l]}
                        <span className="h-[2px] bg-gradient-to-l from-transparent to-orange-500/30 grow"></span>
                    </h3>

                    {/* 1. Sacred Text Card (Obsidian Tablet) */}
                    {section.type === "sacred-card" && (
                        <div className="relative group">
                          <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 rounded-[2.5rem] md:rounded-[3.5rem] blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-1000"></div>
                          <div className="relative bg-zinc-950 p-10 md:p-24 rounded-[2rem] md:rounded-[3rem] text-center shadow-2xl border border-white/10 overflow-hidden">
                            {/* Subtle noise texture overlay */}
                            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }}></div>
                            
                            {section.audioUrl && (
                                <button 
                                    onClick={() => toggleAudio(section.audioUrl)}
                                    className="absolute top-6 right-6 md:top-10 md:right-10 bg-gradient-to-br from-orange-400 to-orange-600 p-4 md:p-5 rounded-full text-white hover:scale-110 active:scale-95 transition-all shadow-[0_0_40px_rgba(249,115,22,0.4)] group/btn z-20"
                                >
                                    {playingAudioUrl === section.audioUrl ? (
                                        <Pause fill="white" size={24} className="ml-1" />
                                    ) : (
                                        <Play fill="white" size={24} className="ml-1" />
                                    )}
                                    <div className={`absolute inset-0 rounded-full border-2 border-orange-400 scale-100 opacity-20 ${playingAudioUrl === section.audioUrl ? 'animate-ping' : 'group-hover/btn:animate-ping'}`}></div>
                                </button>
                            )}

                            <div className="text-2xl md:text-4xl lg:text-5xl font-serif italic text-transparent bg-clip-text bg-gradient-to-b from-amber-100 to-amber-500 whitespace-pre leading-relaxed md:leading-[1.8] mb-8 drop-shadow-lg relative z-10 mx-auto w-fit text-left">
                                {section.content?.[l]}
                            </div>
                            
                            <div className="inline-flex items-center gap-2 text-xs md:text-sm text-amber-500/60 tracking-[0.2em] font-bold uppercase border border-amber-500/20 px-6 py-2 rounded-full bg-amber-500/5">
                              <Sparkles size={14} /> Click to Hear Pronunciation
                            </div>
                          </div>
                        </div>
                    )}

                    {/* 2. Line by Line Meaning (Interactive Accordion/Hover) */}
                    {section.type === "line-meaning" && (
                        <div className="space-y-4">
                        {section.lines?.map((line, li) => {
                            const isExpanded = expandedLine === `${cIdx}-${sIdx}-${li}`;
                            return (
                              <button 
                                key={li} 
                                onClick={() => setExpandedLine(isExpanded ? null : `${cIdx}-${sIdx}-${li}`)}
                                className={`w-full text-left bg-white dark:bg-zinc-900/60 p-6 md:p-8 rounded-3xl border transition-all duration-500 ${isExpanded ? 'border-orange-500 shadow-2xl shadow-orange-500/10' : 'border-zinc-200 dark:border-white/10 hover:border-orange-500/50 hover:shadow-xl'}`}
                              >
                                <div className="flex items-center justify-between gap-4">
                                  <span className={`font-serif font-bold text-xl md:text-3xl transition-colors duration-500 ${isExpanded ? 'text-orange-600 dark:text-orange-400' : 'text-zinc-800 dark:text-zinc-200'}`}>
                                    {line.original}
                                  </span>
                                  <ChevronDown size={24} className={`text-orange-500 transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''}`} />
                                </div>
                                <AnimatePresence>
                                  {isExpanded && (
                                    <motion.div 
                                      initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                      animate={{ height: "auto", opacity: 1, marginTop: 24 }}
                                      exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                      className="overflow-hidden"
                                    >
                                      <p className="text-zinc-600 dark:text-zinc-400 italic text-lg md:text-xl leading-relaxed pl-4 border-l-4 border-orange-500/30">
                                        {line.meaning[l]}
                                      </p>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </button>
                            );
                        })}
                        </div>
                    )}

                    {/* 3. Deep Essay / Philosophy */}
                    {(section.type === "deep-essay" || section.type === "text") && (
                        <div className="bg-white/80 dark:bg-zinc-900/40 backdrop-blur-xl p-8 md:p-12 rounded-3xl md:rounded-[2.5rem] border border-zinc-200 dark:border-white/10 shadow-xl shadow-zinc-200/20 dark:shadow-none">
                          <div className="text-lg md:text-2xl leading-[1.8] md:leading-[2] text-zinc-700 dark:text-zinc-300 whitespace-pre-line font-serif">
                              {section.content?.[l]}
                          </div>
                        </div>
                    )}

                    {/* 4. Science Breakdown */}
                    {section.type === "science-breakdown" && (
                        <div className="relative group">
                          <div className="absolute inset-0 bg-blue-500/5 rounded-3xl md:rounded-[2.5rem] transform group-hover:scale-105 transition-transform duration-700 -z-10"></div>
                          <div className="bg-white/90 dark:bg-blue-950/40 backdrop-blur-md p-8 md:p-12 rounded-3xl md:rounded-[2.5rem] border border-blue-200 dark:border-blue-500/20 shadow-2xl shadow-blue-500/5">
                            <div className="text-lg md:text-2xl leading-[1.8] text-blue-900 dark:text-blue-200 whitespace-pre-line font-mono">
                                {section.content?.[l]}
                            </div>
                          </div>
                        </div>
                    )}

                    {/* 5. Story Mode (Sacred Book Feel) */}
                    {section.type === "story-mode" && (
                        <div className="relative group perspective-1000">
                          <div className="absolute -inset-4 bg-gradient-to-r from-amber-200 to-orange-300 dark:from-orange-900/30 dark:to-red-900/30 rounded-[3rem] blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-1000"></div>
                          <div className="relative bg-[#faf7f2] dark:bg-zinc-900 p-10 md:p-16 rounded-[2rem] md:rounded-[3rem] border border-orange-900/10 dark:border-orange-500/20 shadow-2xl transform transition-transform duration-700 hover:-translate-y-2">
                              <Quote className="absolute top-8 left-8 text-orange-500/20 w-24 h-24 -z-10 rotate-180" />
                              <div className="text-xl md:text-3xl leading-[1.8] md:leading-[2] text-zinc-800 dark:text-zinc-200 font-serif relative z-10 first-letter:text-7xl first-letter:font-black first-letter:text-orange-600 first-letter:float-left first-letter:mr-4 first-letter:mt-2">
                                {section.content?.[l]}
                              </div>
                          </div>
                        </div>
                    )}

                    {/* 6. Paramesthi Grid (Glassmorphism Tall Cards) */}
                    {section.type === "paramesthi-grid" && (
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                        {section.items?.map((item, i) => {
                            // Define gradient based on color string
                            let gradient = "";
                            let shadow = "";
                            if (item.color.includes("white")) { gradient = "from-zinc-100 to-zinc-300"; shadow = "group-hover:shadow-white/20"; }
                            if (item.color.includes("red")) { gradient = "from-red-400 to-red-600"; shadow = "group-hover:shadow-red-500/40"; }
                            if (item.color.includes("yellow")) { gradient = "from-yellow-300 to-yellow-500"; shadow = "group-hover:shadow-yellow-500/40"; }
                            if (item.color.includes("green")) { gradient = "from-emerald-400 to-emerald-600"; shadow = "group-hover:shadow-emerald-500/40"; }
                            if (item.color.includes("blue")) { gradient = "from-blue-500 to-blue-700"; shadow = "group-hover:shadow-blue-500/40"; }

                            return (
                              <div key={i} className={`group relative bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-200 dark:border-white/10 hover:-translate-y-4 transition-all duration-500 hover:shadow-2xl ${shadow}`}>
                                  <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-br ${gradient} shadow-inner flex items-center justify-center mb-8 border border-white/20 transform group-hover:scale-110 transition-transform duration-500`}></div>
                                  <div className="text-center">
                                    <h4 className="font-black text-2xl text-zinc-900 dark:text-white uppercase tracking-wider mb-3">{item.name[l]}</h4>
                                    <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base font-serif italic">{item.desc[l]}</p>
                                  </div>
                              </div>
                            );
                        })}
                        </div>
                    )}
                    </motion.div>
                ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
