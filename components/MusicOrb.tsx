'use client';

import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipForward, SkipBack, Music2, X, Volume2, VolumeX, Sparkles, Maximize2, Minimize2, Eye, Infinity, RotateCcw, Moon } from "lucide-react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import Image from "next/image";

// 🎵 PLAYLIST DATA (Unchanged)
const TRACKS = [
  {
    id: 1,
    title: "Namokar Mantra Jaap",
    artist: "Universal Prayer (Male)",
    src: "/audio/namokar-mantra-male.mp3", 
    image: "/images/tirthankar/arhats/ajitnath.avif",
    color: "from-rose-500 to-orange-500",
    lyrics: "Ṇamō Arihantāṇaṁ \n Ṇamō Siddhāṇaṁ..."
  },
  {
    id: 2,
    title: "Namokar Mantra Jaap",
    artist: "Universal Prayer (Female)",
    src: "/audio/namokar-mantra-female.mp3", 
    image: "/images/tirthankar/arhats/ajitnath.avif",
    color: "from-rose-500 to-orange-500",
    lyrics: "Ṇamō Arihantāṇaṁ \n Ṇamō Siddhāṇaṁ..."
  },
];

export default function MusicOrb() {
  const [isOpen, setIsOpen] = useState(false); 
  const [isPlaying, setIsPlaying] = useState(false);
  const [isImmersive, setIsImmersive] = useState(false); 
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  
  // Audio State
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // 📿 MALA & HAPTIC STATE
  const [isMalaMode, setIsMalaMode] = useState(false); 
  const [malaCount, setMalaCount] = useState(0); 

  // 🌙 ZEN TIMER STATE
  const [sleepTimer, setSleepTimer] = useState<number | null>(null); 
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 🔊 REFS
  const audioRef = useRef<HTMLAudioElement>(null);
  const bellRef = useRef<HTMLAudioElement>(null); 
  const track = TRACKS[currentTrackIndex];

  // 💾 LOAD STATE
  useEffect(() => {
    const savedCount = localStorage.getItem("jain-mala-count");
    const savedVolume = localStorage.getItem("jain-player-volume");
    const savedTrack = localStorage.getItem("jain-last-track");

    if (savedCount) setMalaCount(parseInt(savedCount));
    if (savedVolume) {
        const vol = parseFloat(savedVolume);
        setVolume(vol);
        setIsMuted(vol === 0);
    }
    if (savedTrack) {
        const trackIndex = parseInt(savedTrack);
        if (trackIndex >= 0 && trackIndex < TRACKS.length) setCurrentTrackIndex(trackIndex);
    }
  }, []);

  // 💾 SAVE STATE
  useEffect(() => { localStorage.setItem("jain-mala-count", malaCount.toString()); }, [malaCount]);
  useEffect(() => { localStorage.setItem("jain-player-volume", volume.toString()); }, [volume]);
  useEffect(() => { localStorage.setItem("jain-last-track", currentTrackIndex.toString()); }, [currentTrackIndex]);

  // 🔒 SCROLL LOCK
  useEffect(() => {
    if (isOpen || isImmersive) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => { 
      document.body.style.overflow = ""; 
      document.documentElement.style.overflow = "";
    };
  }, [isOpen, isImmersive]);

  // ⌨️ KEYBOARD SHORTCUTS
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.code === 'Space') { e.preventDefault(); togglePlay(); }
        if (e.code === 'ArrowRight') changeTrack('next');
        if (e.code === 'ArrowLeft') changeTrack('prev');
        if (e.code === 'KeyM') { setIsMuted(prev => !prev); if(audioRef.current) audioRef.current.muted = !audioRef.current.muted; }
        if (e.code === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isPlaying, currentTrackIndex]);

  // 🌙 ZEN TIMER LOGIC
  const cycleSleepTimer = () => {
      const options = [null, 15, 30, 60];
      const currentIndex = options.indexOf(sleepTimer);
      const nextTimer = options[(currentIndex + 1) % options.length];
      
      setSleepTimer(nextTimer);
      if (timerRef.current) clearTimeout(timerRef.current);

      if (nextTimer) {
          timerRef.current = setTimeout(() => {
              if(audioRef.current) audioRef.current.pause();
              setIsPlaying(false);
              setSleepTimer(null); 
          }, nextTimer * 60 * 1000);
      }
  };

  // 🎵 AUDIO HANDLERS
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const changeTrack = (direction: 'next' | 'prev') => {
    let newIndex = direction === 'next' ? currentTrackIndex + 1 : currentTrackIndex - 1;
    if (newIndex >= TRACKS.length) newIndex = 0;
    if (newIndex < 0) newIndex = TRACKS.length - 1;
    
    setCurrentTime(0);
    setDuration(0); 
    
    setCurrentTrackIndex(newIndex);
    setIsPlaying(true); 
  };

  const handleTrackEnd = () => {
    if (isMalaMode) {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
        }
        
        const newCount = malaCount + 1;
        setMalaCount(newCount);

        // 🔔 108 COUNT LOGIC
        if (newCount % 108 === 0) {
            if (bellRef.current) {
                bellRef.current.currentTime = 0;
                bellRef.current.play().catch(e => console.log("Audio play blocked", e));
            }
            if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
        } else {
            if (navigator.vibrate) navigator.vibrate(50);
        }

    } else {
        changeTrack('next');
    }
  };

  const resetMalaCount = () => {
      setMalaCount(0);
      if (navigator.vibrate) navigator.vibrate(50); 
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) audioRef.current.currentTime = time;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (audioRef.current) {
        audioRef.current.volume = newVol;
        setIsMuted(newVol === 0);
    }
  };

  const handleSwipe = (_: any, info: PanInfo) => {
      if (info.offset.x > 50) {
          changeTrack('prev');
      } else if (info.offset.x < -50) {
          changeTrack('next');
      }
  };

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  useEffect(() => {
    if (audioRef.current && isPlaying) {
        audioRef.current.pause();
        audioRef.current.load();
        audioRef.current.play();
        audioRef.current.volume = volume;
    }
  }, [currentTrackIndex]);

  const particles = Array.from({ length: 20 }); 

  return (
    <>
      {/* 1. FLOATING ORB (Unchanged) */}
      {!isImmersive && (
        <div className="fixed bottom-6 left-6 z-[90] group">
            <div className={`absolute -inset-4 rounded-full blur-2xl transition-all duration-1000 opacity-0 pointer-events-none
                ${isPlaying ? "bg-rose-500/40 opacity-100 animate-pulse-slower" : "bg-indigo-500/0"}`}></div>

            <motion.button
            onClick={() => setIsOpen(true)}
            whileHover={{ scale: 1.05, rotate: 9 }}
            whileTap={{ scale: 0.95 }}
            className={`relative w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.25)] border-2 backdrop-blur-xl transition-all duration-500 ease-out
                ${isPlaying 
                ? "border-rose-300/50 shadow-rose-500/30" 
                : "border-indigo-300/30 hover:border-indigo-300/60 shadow-indigo-900/20"}`}
            >
            <div className={`absolute inset-0 bg-gradient-to-br transition-all duration-1000 ease-in-out opacity-90
                ${isPlaying 
                    ? "from-rose-500 via-amber-500 to-orange-600 rotate-180" 
                    : "from-indigo-600 via-purple-600 to-violet-800"}`}></div>
            <div className="relative z-10 text-white drop-shadow-md">
                {isPlaying ? (
                    <div className="relative">
                    <Music2 size={20} className="animate-[spin_4s_linear_infinite] md:w-7 md:h-7" />
                    <Sparkles size={10} className="absolute -top-1 -right-2 text-yellow-200 animate-pulse" />
                    </div>
                ) : (
                    <Music2 size={22} className="animate-float md:w-8 md:h-8 opacity-90 group-hover:opacity-100 transition-opacity" />
                )}
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-full" style={{ maskImage: 'linear-gradient(black, transparent)' }}></div>
            </motion.button>
        </div>
      )}

      {/* 2. MAIN PLAYER */}
      <AnimatePresence>
        {(isOpen || isImmersive) && (
          <div className={`fixed inset-0 z-[100] flex ${isImmersive ? "items-center justify-center" : "items-end md:items-center justify-center"}`}>
            
            {/* A. BACKGROUND */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => !isImmersive && setIsOpen(false)}
              className={`absolute inset-0 transition-all duration-1000 touch-none
                 ${isImmersive ? "bg-black" : "bg-black/60 backdrop-blur-sm"}`}
            >
                {isImmersive && particles.map((_, i) => (
                    <div key={i} className="absolute rounded-full bg-amber-400 blur-[1px] animate-float-particle"
                         style={{
                             width: Math.random() * 4 + 1 + 'px',
                             height: Math.random() * 4 + 1 + 'px',
                             left: Math.random() * 100 + 'vw',
                             top: Math.random() * 100 + 'vh',
                             opacity: Math.random() * 0.5 + 0.2,
                             animationDuration: Math.random() * 10 + 10 + 's',
                             animationDelay: Math.random() * 5 + 's'
                         }}
                    />
                ))}
            </motion.div>

            {/* B. PLAYER CARD */}
            <motion.div 
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`relative flex flex-col items-center text-center overflow-hidden transition-all duration-700 z-10
                 ${isImmersive 
                    ? "w-full h-full justify-center p-4 bg-transparent" 
                    : "w-full md:max-w-sm bg-white dark:bg-zinc-900 rounded-t-[2rem] md:rounded-[2rem] shadow-[0_-10px_40px_rgba(0,0,0,0.3)] border-t md:border border-white/10 p-6 md:p-8 pb-10 md:pb-8"}`}
            >
                {!isImmersive && (
                    <div className={`absolute inset-0 bg-gradient-to-br opacity-5 dark:opacity-10 pointer-events-none ${track.color}`}></div>
                )}
                
                {/* 1. HEADER */}
                <div className={`w-full max-w-lg mx-auto flex justify-between items-center z-30 ${isImmersive ? "absolute top-8 w-full px-8 left-1/2 -translate-x-1/2" : "mb-4 md:mb-6"}`}>
                    
                    {/* 🌙 ZEN TIMER (Left) */}
                    <div className="flex items-center gap-2">
                        <button 
                            onClick={(e) => { e.stopPropagation(); cycleSleepTimer(); }}
                            className={`p-2 rounded-full transition-all duration-300 flex items-center gap-2
                                ${isImmersive 
                                    ? "text-white/60 hover:text-white bg-white/10" 
                                    : "text-zinc-400 hover:text-zinc-800 dark:hover:text-white bg-zinc-100 dark:bg-white/5"}`}
                            title="Sleep Timer"
                        >
                            <Moon size={16} className={sleepTimer ? "fill-current" : ""} />
                            {sleepTimer && <span className="text-xs font-bold">{sleepTimer}m</span>}
                        </button>
                    </div>

                    {!isImmersive && <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Now Playing</span>}

                    {/* Window Controls (Right) */}
                    <div className="flex gap-3 ml-auto">
                        <button 
                            onClick={(e) => { e.stopPropagation(); setIsImmersive(!isImmersive); }}
                            className={`p-2 rounded-full transition-all duration-300 ${isImmersive ? "bg-white/10 text-white hover:bg-white/20" : "bg-zinc-100 dark:bg-white/5 text-zinc-500 dark:text-zinc-400 hover:text-rose-500"}`}
                        >
                            {isImmersive ? <Minimize2 size={isImmersive ? 24 : 18} /> : <Maximize2 size={18} />}
                        </button>
                        {!isImmersive && (
                            <button onClick={() => setIsOpen(false)} className="p-2 bg-zinc-100 dark:bg-white/5 rounded-full text-zinc-500 dark:text-zinc-400 hover:bg-rose-500 hover:text-white transition-colors">
                                <X size={18} />
                            </button>
                        )}
                    </div>
                </div>

                {/* 2. MAIN CONTENT */}
                <div className="w-full max-w-lg mx-auto flex flex-col items-center relative">
                    
                    {/* 🔊 VERTICAL VOLUME (Right) */}
                    <div className={`absolute right-4 md:right-0 top-[60%] md:top-1/2 -translate-y-1/2 h-32 w-8 flex flex-col items-center justify-center gap-2 z-30 transition-opacity duration-300
                         ${isImmersive ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
                         <button onClick={() => { setIsMuted(!isMuted); if(audioRef.current) audioRef.current.muted = !isMuted; }} 
                            className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-rose-500 mb-2 transition-colors">
                             {isMuted || volume === 0 ? <VolumeX size={14} /> : <Volume2 size={14} />}
                         </button>
                         <div className="h-20 w-1 bg-zinc-200 dark:bg-white/5 rounded-full relative group cursor-pointer">
                             <input 
                                 type="range" min="0" max="1" step="0.01"
                                 value={isMuted ? 0 : volume}
                                 onChange={handleVolumeChange}
                                 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-4 -rotate-90 opacity-0 cursor-pointer z-20"
                             />
                             <div className="absolute bottom-0 left-0 w-full bg-rose-500 rounded-full transition-all duration-150 pointer-events-none" 
                                  style={{ height: `${(isMuted ? 0 : volume) * 100}%` }}></div>
                         </div>
                    </div>

                    {/* 📿 MALA MODE TOGGLE & RESET (Left) */}
                    <div className={`absolute left-4 md:left-0 top-[60%] md:top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 z-30 transition-opacity duration-300`}>
                        <button 
                            onClick={() => { setIsMalaMode(!isMalaMode); }}
                            className={`p-3 rounded-full border transition-all duration-300 relative
                            ${isMalaMode 
                                ? "border-rose-500 bg-rose-500/10 text-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.3)]" 
                                : "border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5"}`}
                            title="Jap Mala Mode (Repeat & Count)"
                        >
                             {/* 🛠️ FIX: Increased size to 28 for both mobile & desktop */}
                             <Infinity size={28} />
                             {isMalaMode && <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                             </span>}
                        </button>
                        
                        <div className={`flex flex-col items-center text-[9px] font-bold uppercase tracking-widest transition-all duration-500 gap-1
                             ${isMalaMode ? "opacity-100 translate-y-0 text-rose-500" : "opacity-0 -translate-y-2 text-zinc-500"}`}>
                             <span>Count</span>
                             <span className="text-lg font-black leading-none">{malaCount}</span>
                             {malaCount > 0 && (
                                <button 
                                    onClick={resetMalaCount} 
                                    className="p-1 mt-1 rounded-full text-zinc-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                                    title="Reset Mala Count"
                                >
                                    <RotateCcw size={12} />
                                </button>
                             )}
                        </div>
                    </div>

                    {/* ALBUM ART + SWIPE DRAG */}
                    <div className={`relative transition-all duration-700 mx-auto cursor-grab active:cursor-grabbing touch-pan-y
                        ${isImmersive 
                            ? "w-64 h-64 md:w-80 md:h-80 mb-12 shadow-[0_0_100px_rgba(244,63,94,0.3)]" 
                            : `w-32 h-32 md:w-48 md:h-48 mb-4`}`} 
                    >
                         <svg className="absolute inset-0 w-full h-full -rotate-90 z-20 pointer-events-none overflow-visible" viewBox="0 0 100 100">
                            {Array.from({ length: 108 }).map((_, i) => {
                                const angle = (i / 108) * 360;
                                const radius = 48;
                                const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
                                const y = 50 + radius * Math.sin((angle * Math.PI) / 180);
                                let isActive = false;
                                let isCurrentHead = false;
                                if (duration > 0) {
                                    if (isMalaMode) {
                                        const count = malaCount % 108; 
                                        isActive = i < count; 
                                        isCurrentHead = i === count;
                                    } else {
                                        const progressIndex = Math.floor((currentTime / duration) * 108);
                                        isActive = i < progressIndex;
                                        isCurrentHead = i === progressIndex;
                                    }
                                }
                                return (
                                    <circle
                                        key={i}
                                        cx={x}
                                        cy={y}
                                        r={isCurrentHead ? "1.8" : "0.8"} 
                                        className={`transition-all duration-500 
                                            ${isActive 
                                                ? "fill-rose-500 drop-shadow-[0_0_8px_rgba(244,63,94,1)]" 
                                                : (isImmersive 
                                                    ? "fill-white/20" 
                                                    : "fill-zinc-300 dark:fill-zinc-700") 
                                            }`}
                                    />
                                );
                            })}
                         </svg>

                         <motion.div 
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.2}
                            onDragEnd={handleSwipe}
                            className={`relative w-full h-full rounded-full overflow-hidden border-4 border-black/20 z-10
                            ${isImmersive ? "animate-breathe" : (isPlaying ? "animate-spin-slower" : "")}`}
                         >
                             <Image src={track.image} alt={track.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover pointer-events-none" />
                         </motion.div>

                         {isPlaying && <div className={`absolute inset-0 rounded-full blur-3xl -z-10 mix-blend-screen opacity-50 
                            ${track.color} animate-audio-pulse`}></div>}
                    </div>

                    {/* TEXT INFO */}
                    <div className="relative z-10 w-full px-8 text-center">
                        <h3 className={`font-black leading-tight text-wrap line-clamp-2
                            ${isImmersive 
                                ? "text-3xl md:text-4xl text-white mb-2 drop-shadow-lg" 
                                : "text-lg md:text-2xl text-zinc-800 dark:text-white mb-1"}`}>
                            {track.title}
                        </h3>
                        <p className={`font-bold uppercase tracking-widest mb-6 ${isImmersive ? "text-white/60 text-sm" : "text-zinc-500 dark:text-zinc-400 text-[10px]"}`}>
                            {track.artist}
                        </p>
                        {isImmersive && (
                            <p className="hidden md:block max-w-xl mx-auto text-lg md:text-xl font-serif text-rose-200/90 italic leading-relaxed animate-pulse-slow">
                                &ldquo;{track.lyrics}&rdquo;
                            </p>
                        )}
                    </div>

                    {/* PLAYBACK CONTROLS */}
                    <div className={`flex items-center justify-center gap-6 ${isImmersive ? "mt-12 scale-125" : "mt-2 mb-6"}`}>
                            <button onClick={() => changeTrack('prev')} className={`p-3 transition-colors ${isImmersive ? "text-white/50 hover:text-white" : "text-zinc-400 hover:text-zinc-800 dark:hover:text-white"}`}>
                                <SkipBack size={24} fill="currentColor" />
                            </button>
                            <button 
                                onClick={togglePlay}
                                className={`rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-transform active:scale-95
                                    ${isImmersive ? "w-20 h-20 bg-white text-rose-600 shadow-white/20" : "w-14 h-14 bg-rose-500 text-white shadow-rose-500/40"}`}
                            >
                                {isPlaying ? <Pause size={isImmersive ? 32 : 24} fill="currentColor" /> : <Play size={isImmersive ? 32 : 24} fill="currentColor" className="ml-1" />}
                            </button>
                            <button onClick={() => changeTrack('next')} className={`p-3 transition-colors ${isImmersive ? "text-white/50 hover:text-white" : "text-zinc-400 hover:text-zinc-800 dark:hover:text-white"}`}>
                                <SkipForward size={24} fill="currentColor" />
                            </button>
                    </div>
                </div>

                {/* 3. DURATION SLIDER (Only in Normal Mode) */}
                {!isImmersive && (
                    <div className="w-full flex items-center gap-3 px-6 mt-4">
                        <span className="text-[10px] font-medium text-zinc-400 w-8 text-right tabular-nums">
                            {formatTime(currentTime)}
                        </span>

                        <div className="relative flex-1 h-8 flex items-center group">
                            <input 
                                type="range" 
                                min="0" 
                                max={duration || 100} 
                                value={currentTime}
                                onChange={handleSeek}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                                disabled={!duration} 
                            />
                            <div className="w-full h-1 bg-zinc-200 dark:bg-white/10 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-zinc-800 dark:bg-white transition-all duration-100" 
                                    style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                                ></div>
                            </div>
                        </div>

                        <span className="text-[10px] font-medium text-zinc-400 w-8 text-left tabular-nums">
                            {formatTime(duration)}
                        </span>
                    </div>
                )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <audio 
        ref={audioRef} 
        src={track.src} 
        onEnded={handleTrackEnd}
        onTimeUpdate={(e) => {
            const audio = e.currentTarget;
            setCurrentTime(audio.currentTime);
            if (duration === 0 && audio.duration > 0 && isFinite(audio.duration)) {
                setDuration(audio.duration);
            }
        }}
        onLoadedMetadata={(e) => {
            if (e.currentTarget.duration > 0 && isFinite(e.currentTarget.duration)) {
                setDuration(e.currentTarget.duration);
            }
        }}
      />
      
      <audio ref={bellRef} src="/audio/bell.mp3" preload="auto" />

      <style jsx global>{`
        @keyframes float-particle {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          50% { opacity: 0.8; }
          100% { transform: translateY(-100vh) translateX(20px); opacity: 0; }
        }
        @keyframes breathe {
          0%, 100% { transform: scale(1); filter: brightness(1); }
          50% { transform: scale(1.05); filter: brightness(1.2); }
        }
        @keyframes audio-pulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.3); opacity: 0.6; }
        }
        .animate-float-particle { animation-name: float-particle; animation-timing-function: linear; animation-iteration-count: infinite; }
        .animate-breathe { animation: breathe 6s ease-in-out infinite; }
        .animate-audio-pulse { animation: audio-pulse 1s ease-in-out infinite; }
      `}</style>
    </>
  );
}