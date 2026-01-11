// KalyanakTimeline.tsx
"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Tirthankara } from "@/lib/tirthankara-data"; 
import { MapPin, Calendar, Star } from "lucide-react";

type Props = {
  kalyanakData: Tirthankara['kalyanaks'];
  lang: string;
};

const STEPS = ["garbha", "janma", "diksha", "kevalgyan", "moksha"] as const;

export default function KalyanakTimeline({ kalyanakData, lang }: Props) {
  const l = (lang === "hi" || lang === "kn") ? lang : "en";

  // --- FLATTENER LOGIC ---
  const slides = useMemo(() => {
    let allSlides: any[] = [];

    STEPS.forEach((key, kalyanakIndex) => {
      const data = kalyanakData[key];
      if (!data) return;

      const textParts = data.description[l]?.split("\n\n") || [""];
      const imageCount = Math.max(data.imageMobile?.length || 0, data.imageDesktop?.length || 0);
      const slideCount = Math.max(imageCount, textParts.length, 1);

      for (let i = 0; i < slideCount; i++) {
        const mobileImage = data.imageMobile && data.imageMobile[i] ? data.imageMobile[i] : null;
        const desktopImage = data.imageDesktop && data.imageDesktop[i] ? data.imageDesktop[i] : null;
        const placeholderImage = `/images/tirthankar/kalyanak/placeholders/${key}-placeholder.avif`;

        let text = textParts[i] || "";
        if (slideCount === 1 && text === "") text = data.description[l];
        if (text === "" && i > 0) text = textParts[textParts.length - 1];

        allSlides.push({
          id: `${key}-${i}`,
          kalyanakKey: key,
          stepIndex: kalyanakIndex,
          subIndex: i,
          title: getTitle(key, l),
          tithi: i === 0 ? data.tithi[l] : null,
          location: i === 0 && data.location ? data.location[l] : null,
          extraInfo: i === 0 && (data.extraInfo || data.nakshatra) ? (data.extraInfo ? data.extraInfo[l] : data.nakshatra) : null,
          text: text,
          primarySrcMobile: mobileImage,
          primarySrcDesktop: desktopImage,
          placeholderSrc: placeholderImage
        });
      }
    });
    return allSlides;
  }, [kalyanakData, l]);

  const [activeSlideId, setActiveSlideId] = useState<string>(slides[0]?.id || "");

  useEffect(() => {
    if (slides.length > 0) setActiveSlideId(slides[0].id);
  }, [slides]);

  return (
    <div className="relative bg-white dark:bg-black transition-colors duration-500">
      
      {/* ======================= */}
      {/* DESKTOP LAYOUT (Grid)   */}
      {/* ======================= */}
      {/* 🔴 REMOVED 'items-start'. Defaults to 'stretch', which makes Right Col as tall as Left Col. */}
      <div className="hidden md:grid grid-cols-[45%_55%] w-full max-w-[1600px] mx-auto relative">
        
        {/* LEFT COLUMN (Text - Drives the height) */}
        <div className="relative z-10 pl-12 pr-6 pb-40 pt-20">
            <div className="absolute left-[39px] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-rose-300 dark:via-rose-800 to-transparent opacity-50"></div>
            {slides.map((slide) => (
                <motion.div 
                    key={slide.id}
                    onViewportEnter={() => setActiveSlideId(slide.id)}
                    viewport={{ amount: 0.5 }}
                    className="min-h-[60vh] flex flex-col justify-center py-12 pl-16 relative"
                >
                    <div className={`absolute left-[-5px] top-20 w-3 h-3 rounded-full border-2 transition-all duration-500 ${slide.subIndex === 0 ? (activeSlideId.startsWith(slide.kalyanakKey) ? 'bg-rose-500 border-rose-500 scale-150' : 'bg-white dark:bg-black border-gray-400') : 'bg-transparent border-transparent'}`}></div>
                    {slide.subIndex === 0 && (
                        <div className="mb-6">
                            <span className="text-rose-500 font-bold tracking-[0.3em] text-xs uppercase opacity-70">Step 0{slide.stepIndex + 1}</span>
                            <h2 className="text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tight leading-none mt-2">{slide.title}</h2>
                        </div>
                    )}
                    {(slide.tithi || slide.location || slide.extraInfo) && (
                         <div className="grid grid-cols-1 gap-3 mb-6 bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm">
                            {slide.tithi && (<div className="flex items-start gap-3"><Calendar className="w-4 h-4 text-rose-500 mt-1" /><div><span className="text-[10px] uppercase font-bold opacity-50 block">Time</span><span className="text-gray-900 dark:text-gray-100 font-medium">{slide.tithi}</span></div></div>)}
                            {slide.location && (<div className="flex items-start gap-3"><MapPin className="w-4 h-4 text-rose-500 mt-1" /><div><span className="text-[10px] uppercase font-bold opacity-50 block">Place</span><span className="text-gray-900 dark:text-gray-100 font-medium">{slide.location}</span></div></div>)}
                            {slide.extraInfo && (<div className="flex items-start gap-3 text-rose-700 dark:text-rose-300 bg-rose-100/50 dark:bg-rose-900/20 p-2 rounded-lg -ml-2 w-fit"><Star className="w-4 h-4 mt-1" /><div><span className="text-[10px] uppercase font-bold opacity-50 block">Key Detail</span><span className="font-bold">{slide.extraInfo}</span></div></div>)}
                         </div>
                    )}
                    <p className={`text-xl leading-relaxed font-serif text-gray-600 dark:text-gray-300 ${slide.subIndex > 0 ? 'border-l-4 border-rose-500/20 pl-6' : ''}`}>{slide.text}</p>
                </motion.div>
            ))}
        </div>

        {/* RIGHT COLUMN (Sticky Track) */}
        {/* The column itself is purely a container that stretches full height */}
        <div className="relative">
             {/* 🟢 CHANGED: top-24 (avoids header overlap) and h-screen (for full stickiness) */}
             <div className="sticky top-24 h-[calc(100vh-6rem)] flex items-center justify-center p-8 overflow-hidden">
                  <div className="relative w-full h-[70vh] max-h-[600px] rounded-[2rem] overflow-hidden shadow-2xl z-10 bg-zinc-800 border-4 border-white dark:border-zinc-800 ring-1 ring-black/10">
                     <AnimatePresence mode="popLayout">
                         {slides.map((slide) => {
                             if (slide.id !== activeSlideId) return null;
                             return (
                                 <motion.div
                                     key={slide.id}
                                     initial={{ opacity: 0, scale: 1.05 }}
                                     animate={{ opacity: 1, scale: 1 }}
                                     exit={{ opacity: 0 }}
                                     transition={{ duration: 0.5 }}
                                     className="absolute inset-0"
                                 >
                                     <RobustImage primarySrc={slide.primarySrcDesktop} placeholderSrc={slide.placeholderSrc} alt={slide.title} />
                                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
                                 </motion.div>
                             );
                         })}
                     </AnimatePresence>
                  </div>
             </div>
        </div>
      </div>

      {/* ================================== */}
      {/* MOBILE LAYOUT (Unchanged)        */}
      {/* ================================== */}
      <div className="md:hidden bg-zinc-100 dark:bg-black pb-20 pt-10 px-4 relative overflow-hidden">
        <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-transparent via-rose-400 to-transparent opacity-50 z-0"></div>

        <div className="mb-12 relative z-10 text-center">
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-rose-500 mb-2">The Journey</h3>
            <h2 className="text-4xl font-black text-gray-900 dark:text-white leading-none">Witness the <br/>Divine Path</h2>
        </div>

        <div className="relative z-10 flex flex-col gap-16">
            {slides.map((slide, index) => (
               <MobileTimelineCard key={slide.id} slide={slide} index={index} />
            ))}
        </div>
      </div>

    </div>
  );
}

// ... (Sub-components: MobileTimelineCard, RobustImage, getTitle remain exactly the same)
function MobileTimelineCard({ slide, index }: { slide: any, index: number }) {
    return (
        <motion.div 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-10%" }} // Smooth entry
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative w-full"
        >
            {/* 2. THE CONNECTOR KNOT */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-rose-500 border-[3px] border-white dark:border-zinc-900 shadow-md z-10"></div>
                <div className="w-[2px] h-6 bg-rose-300/50"></div>
            </div>

            {/* CARD CONTENT */}
            <div className="relative w-full bg-white dark:bg-zinc-900 rounded-[2rem] overflow-hidden shadow-xl border border-white/50 dark:border-white/10 flex flex-col">
                <div className="relative w-full aspect-video bg-black flex-shrink-0">
                    <RobustImage 
                        primarySrc={slide.primarySrcMobile}
                        placeholderSrc={slide.placeholderSrc}
                        alt={slide.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="bg-rose-600/90 backdrop-blur-md px-2 py-1 rounded text-[9px] font-bold uppercase tracking-widest border border-white/20">
                                Step 0{slide.stepIndex + 1}
                            </span>
                            {slide.subIndex > 0 && <span className="text-[9px] font-bold opacity-80 uppercase tracking-widest bg-black/40 px-2 py-1 rounded border border-white/10">Part {slide.subIndex + 1}</span>}
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-white dark:bg-zinc-900">
                    {slide.subIndex === 0 && (
                        <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase leading-none mb-4 text-center">
                            {slide.title}
                        </h2>
                    )}
                    {slide.subIndex === 0 && (slide.tithi || slide.location) && (
                        <div className="grid grid-cols-2 gap-4 mb-6 pb-4 border-b border-gray-100 dark:border-white/5 text-center">
                            {slide.tithi && (
                                <div>
                                    <span className="text-[9px] font-bold uppercase text-rose-500 block mb-1">Time</span>
                                    <span className="text-xs font-bold text-gray-700 dark:text-gray-300 block leading-tight">{slide.tithi}</span>
                                </div>
                            )}
                            {slide.location && (
                                <div>
                                    <span className="text-[9px] font-bold uppercase text-rose-500 block mb-1">Place</span>
                                    <span className="text-xs font-bold text-gray-700 dark:text-gray-300 block leading-tight">{slide.location}</span>
                                </div>
                            )}
                        </div>
                    )}
                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-serif leading-relaxed text-center">
                        {slide.text}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

// --- SAFE IMAGE COMPONENT ---
function RobustImage({ primarySrc, placeholderSrc, alt }: { primarySrc: string | null, placeholderSrc: string, alt: string }) {
    const initialSrc = (primarySrc && primarySrc.length > 1) ? primarySrc : placeholderSrc;
    const [currentSrc, setCurrentSrc] = useState<string>(initialSrc);
    return (
        <Image 
            src={currentSrc} 
            alt={alt}
            fill
            className="object-cover transition-opacity duration-500"
            sizes="(max-width: 768px) 100vw, 50vw" 
            priority={false}
            onError={() => { if (currentSrc !== placeholderSrc) setCurrentSrc(placeholderSrc); }}
        />
    );
}

function getTitle(key: string, l: string) {
    const titles: Record<string, { en: string; hi: string; kn: string }> = {
      garbha: { en: "Garbha", hi: "गर्भ", kn: "ಗರ್ಭ" },
      janma: { en: "Janma", hi: "जन्म", kn: "ಜನ್ಮ" },
      diksha: { en: "Diksha", hi: "दीक्षा", kn: "ದೀಕ್ಷೆ" },
      kevalgyan: { en: "Keval Gnan", hi: "केवल ज्ञान", kn: "ಕೇವಲ ಜ್ಞಾನ" },
      moksha: { en: "Moksha", hi: "मोक्ष", kn: "ಮೋಕ್ಷ" },
    };
    return titles[key][l as "en" | "hi" | "kn"] || titles[key]["en"];
}