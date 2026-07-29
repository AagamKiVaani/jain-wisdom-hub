"use client";

import { useState, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Download, PlayCircle, BookOpen, X, ArrowLeft, ArrowRight, Maximize2, Layers } from "lucide-react";

export interface Note {
  id: string;
  series: string;
  section?: string;
  title: string;
  youtubeLink: string;
  driveFileId: string;
  description?: string;
}

const getThemeColors = (series: string, section?: string) => {
  let themeName = 'blue'; 
  
  if (series.toLowerCase().includes('ramayan')) themeName = 'golden';
  else if (series.toLowerCase().includes('decoding')) themeName = 'cyan';
  else if (series.toLowerCase().includes('tatvarth') && section) {
    const s = section.toLowerCase();
    if (s.includes('adhyay 10')) themeName = 'red';
    else if (s.includes('adhyay 1')) themeName = 'purple';
    else if (s.includes('adhyay 2')) themeName = 'green';
    else if (s.includes('adhyay 3')) themeName = 'pink';
    else if (s.includes('adhyay 4')) themeName = 'blue';
    else if (s.includes('adhyay 5')) themeName = 'orange';
    else if (s.includes('adhyay 6')) themeName = 'amber';
    else if (s.includes('adhyay 7')) themeName = 'teal';
    else if (s.includes('adhyay 8')) themeName = 'indigo';
    else if (s.includes('adhyay 9')) themeName = 'lime';
    else themeName = 'blue';
  }

  const themes: Record<string, {
    text: string, 
    textDark: string,
    from: string, 
    to: string, 
    shadow: string, 
    hoverBorder: string,
    badgeBg: string,
    badgeText: string,
    badgeBorder: string,
    badgeHoverBg: string,
    playBg: string,
    playShadow: string,
    hex: string,
    hexDark: string
  }> = {
    purple: { text: 'text-purple-600', textDark: 'dark:text-purple-400', from: 'from-purple-500', to: 'to-purple-700', shadow: 'hover:shadow-purple-500/30', hoverBorder: 'hover:border-purple-500/40', badgeBg: 'bg-purple-50 dark:bg-purple-500/10', badgeText: 'text-purple-700 dark:text-purple-300', badgeBorder: 'border-purple-100 dark:border-purple-500/20', badgeHoverBg: 'hover:bg-purple-100 dark:hover:bg-purple-500/20', playBg: 'bg-purple-600/90 group-hover/video:bg-purple-500', playShadow: 'shadow-[0_0_30px_rgba(168,85,247,0.6)]', hex: '168, 85, 247', hexDark: '192, 132, 252' },
    green: { text: 'text-green-600', textDark: 'dark:text-green-400', from: 'from-green-500', to: 'to-green-700', shadow: 'hover:shadow-green-500/30', hoverBorder: 'hover:border-green-500/40', badgeBg: 'bg-green-50 dark:bg-green-500/10', badgeText: 'text-green-700 dark:text-green-300', badgeBorder: 'border-green-100 dark:border-green-500/20', badgeHoverBg: 'hover:bg-green-100 dark:hover:bg-green-500/20', playBg: 'bg-green-600/90 group-hover/video:bg-green-500', playShadow: 'shadow-[0_0_30px_rgba(34,197,94,0.6)]', hex: '34, 197, 94', hexDark: '74, 222, 128' },
    pink: { text: 'text-pink-600', textDark: 'dark:text-pink-400', from: 'from-pink-500', to: 'to-pink-700', shadow: 'hover:shadow-pink-500/30', hoverBorder: 'hover:border-pink-500/40', badgeBg: 'bg-pink-50 dark:bg-pink-500/10', badgeText: 'text-pink-700 dark:text-pink-300', badgeBorder: 'border-pink-100 dark:border-pink-500/20', badgeHoverBg: 'hover:bg-pink-100 dark:hover:bg-pink-500/20', playBg: 'bg-pink-600/90 group-hover/video:bg-pink-500', playShadow: 'shadow-[0_0_30px_rgba(236,72,153,0.6)]', hex: '236, 72, 153', hexDark: '244, 114, 182' },
    blue: { text: 'text-blue-600', textDark: 'dark:text-blue-400', from: 'from-blue-500', to: 'to-blue-700', shadow: 'hover:shadow-blue-500/30', hoverBorder: 'hover:border-blue-500/40', badgeBg: 'bg-blue-50 dark:bg-blue-500/10', badgeText: 'text-blue-700 dark:text-blue-300', badgeBorder: 'border-blue-100 dark:border-blue-500/20', badgeHoverBg: 'hover:bg-blue-100 dark:hover:bg-blue-500/20', playBg: 'bg-blue-600/90 group-hover/video:bg-blue-500', playShadow: 'shadow-[0_0_30px_rgba(59,130,246,0.6)]', hex: '59, 130, 246', hexDark: '96, 165, 250' },
    orange: { text: 'text-orange-600', textDark: 'dark:text-orange-400', from: 'from-orange-500', to: 'to-orange-700', shadow: 'hover:shadow-orange-500/30', hoverBorder: 'hover:border-orange-500/40', badgeBg: 'bg-orange-50 dark:bg-orange-500/10', badgeText: 'text-orange-700 dark:text-orange-300', badgeBorder: 'border-orange-100 dark:border-orange-500/20', badgeHoverBg: 'hover:bg-orange-100 dark:hover:bg-orange-500/20', playBg: 'bg-orange-600/90 group-hover/video:bg-orange-500', playShadow: 'shadow-[0_0_30px_rgba(249,115,22,0.6)]', hex: '249, 115, 22', hexDark: '251, 146, 60' },
    amber: { text: 'text-amber-600', textDark: 'dark:text-amber-400', from: 'from-amber-500', to: 'to-amber-700', shadow: 'hover:shadow-amber-500/30', hoverBorder: 'hover:border-amber-500/40', badgeBg: 'bg-amber-50 dark:bg-amber-500/10', badgeText: 'text-amber-700 dark:text-amber-300', badgeBorder: 'border-amber-100 dark:border-amber-500/20', badgeHoverBg: 'hover:bg-amber-100 dark:hover:bg-amber-500/20', playBg: 'bg-amber-600/90 group-hover/video:bg-amber-500', playShadow: 'shadow-[0_0_30px_rgba(245,158,11,0.6)]', hex: '245, 158, 11', hexDark: '251, 191, 36' },
    teal: { text: 'text-teal-600', textDark: 'dark:text-teal-400', from: 'from-teal-500', to: 'to-teal-700', shadow: 'hover:shadow-teal-500/30', hoverBorder: 'hover:border-teal-500/40', badgeBg: 'bg-teal-50 dark:bg-teal-500/10', badgeText: 'text-teal-700 dark:text-teal-300', badgeBorder: 'border-teal-100 dark:border-teal-500/20', badgeHoverBg: 'hover:bg-teal-100 dark:hover:bg-teal-500/20', playBg: 'bg-teal-600/90 group-hover/video:bg-teal-500', playShadow: 'shadow-[0_0_30px_rgba(20,184,166,0.6)]', hex: '20, 184, 166', hexDark: '45, 212, 191' },
    indigo: { text: 'text-indigo-600', textDark: 'dark:text-indigo-400', from: 'from-indigo-500', to: 'to-indigo-700', shadow: 'hover:shadow-indigo-500/30', hoverBorder: 'hover:border-indigo-500/40', badgeBg: 'bg-indigo-50 dark:bg-indigo-500/10', badgeText: 'text-indigo-700 dark:text-indigo-300', badgeBorder: 'border-indigo-100 dark:border-indigo-500/20', badgeHoverBg: 'hover:bg-indigo-100 dark:hover:bg-indigo-500/20', playBg: 'bg-indigo-600/90 group-hover/video:bg-indigo-500', playShadow: 'shadow-[0_0_30px_rgba(99,102,241,0.6)]', hex: '99, 102, 241', hexDark: '129, 140, 248' },
    lime: { text: 'text-lime-600', textDark: 'dark:text-lime-400', from: 'from-lime-500', to: 'to-lime-700', shadow: 'hover:shadow-lime-500/30', hoverBorder: 'hover:border-lime-500/40', badgeBg: 'bg-lime-50 dark:bg-lime-500/10', badgeText: 'text-lime-700 dark:text-lime-300', badgeBorder: 'border-lime-100 dark:border-lime-500/20', badgeHoverBg: 'hover:bg-lime-100 dark:hover:bg-lime-500/20', playBg: 'bg-lime-600/90 group-hover/video:bg-lime-500', playShadow: 'shadow-[0_0_30px_rgba(132,204,22,0.6)]', hex: '132, 204, 22', hexDark: '163, 230, 53' },
    red: { text: 'text-red-600', textDark: 'dark:text-red-400', from: 'from-red-500', to: 'to-red-700', shadow: 'hover:shadow-red-500/30', hoverBorder: 'hover:border-red-500/40', badgeBg: 'bg-red-50 dark:bg-red-500/10', badgeText: 'text-red-700 dark:text-red-300', badgeBorder: 'border-red-100 dark:border-red-500/20', badgeHoverBg: 'hover:bg-red-100 dark:hover:bg-red-500/20', playBg: 'bg-red-600/90 group-hover/video:bg-red-500', playShadow: 'shadow-[0_0_30px_rgba(239,68,68,0.6)]', hex: '239, 68, 68', hexDark: '248, 113, 113' },
    cyan: { text: 'text-cyan-600', textDark: 'dark:text-cyan-400', from: 'from-cyan-500', to: 'to-cyan-700', shadow: 'hover:shadow-cyan-500/30', hoverBorder: 'hover:border-cyan-500/40', badgeBg: 'bg-cyan-50 dark:bg-cyan-500/10', badgeText: 'text-cyan-700 dark:text-cyan-300', badgeBorder: 'border-cyan-100 dark:border-cyan-500/20', badgeHoverBg: 'hover:bg-cyan-100 dark:hover:bg-cyan-500/20', playBg: 'bg-cyan-600/90 group-hover/video:bg-cyan-500', playShadow: 'shadow-[0_0_30px_rgba(6,182,212,0.6)]', hex: '6, 182, 212', hexDark: '34, 211, 238' },
    golden: { text: 'text-yellow-600', textDark: 'dark:text-yellow-400', from: 'from-yellow-500', to: 'to-yellow-600', shadow: 'hover:shadow-yellow-500/30', hoverBorder: 'hover:border-yellow-500/40', badgeBg: 'bg-yellow-50 dark:bg-yellow-500/10', badgeText: 'text-yellow-700 dark:text-yellow-300', badgeBorder: 'border-yellow-100 dark:border-yellow-500/20', badgeHoverBg: 'hover:bg-yellow-100 dark:hover:bg-yellow-500/20', playBg: 'bg-yellow-500/90 group-hover/video:bg-yellow-400', playShadow: 'shadow-[0_0_30px_rgba(234,179,8,0.6)]', hex: '234, 179, 8', hexDark: '250, 204, 21' },
  };
  
  return themes[themeName];
};

export default function NotesClient({ initialNotes: rawInitialNotes, isIndic, t }: { initialNotes: Note[], isIndic: boolean, t: any }) {
  // Clean up notes: if a series has actual content, remove its series-level "coming soon" placeholder
  const initialNotes = useMemo(() => rawInitialNotes.filter(note => {
    const isSeriesPlaceholder = (note.section === "" || note.section?.toLowerCase() === "coming soon") && note.title.toLowerCase().includes("coming soon");
    
    if (isSeriesPlaceholder) {
      // Keep it ONLY if the series has NO other valid notes
      const seriesHasOtherNotes = rawInitialNotes.some(n => 
        n.series === note.series && n.id !== note.id && !((n.section === "" || n.section?.toLowerCase() === "coming soon") && n.title.toLowerCase().includes("coming soon"))
      );
      return !seriesHasOtherNotes;
    }
    
    return true; // Keep everything else (including Section-level coming soon notes like "Adhyay 2" -> "coming soon")
  }), [rawInitialNotes]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSeries, setSelectedSeries] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const [playingVideoUrl, setPlayingVideoUrl] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [highlightedNoteId, setHighlightedNoteId] = useState<string | null>(null);
  const [targetScrollId, setTargetScrollId] = useState<string | null>(null);
  const searchParams = useSearchParams();

  // Handle 'highlight' query parameter
  useEffect(() => {
    const highlightId = searchParams.get('highlight');
    if (highlightId && initialNotes.length > 0) {
      const targetNote = initialNotes.find(n => n.id === highlightId);
      if (targetNote) {
        setSelectedSeries(targetNote.series);
        if (targetNote.section) {
          setSelectedSection(targetNote.section);
        } else {
          setSelectedSection(null);
        }
        setTargetScrollId(highlightId);
      }
    }
  }, [searchParams, initialNotes]);

  // Scroll to highlighted note when grid is shown
  useEffect(() => {
    if (targetScrollId && selectedSeries !== null) {
      // Need a small timeout to let the grid and entrance animations render first
      const scrollTimer = setTimeout(() => {
        const element = document.getElementById(`note-${targetScrollId}`);
        if (element) {
          // Scroll into view first
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          
          // Wait for smooth scroll to finish (approx 800ms) before highlighting
          setTimeout(() => {
            setHighlightedNoteId(targetScrollId);
            
            // Remove the highlight after 5 seconds
            setTimeout(() => {
              setHighlightedNoteId(null);
              setTargetScrollId(null);
            }, 5000);
          }, 800);
        }
      }, 500); // 500ms delay to ensure elements are mounted and animating
      
      return () => clearTimeout(scrollTimer);
    }
  }, [targetScrollId, selectedSeries, selectedSection]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    setMounted(true);
    if (playingVideoUrl) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [playingVideoUrl]);

  // Unique series (filter out empty strings)
  const seriesList = Array.from(new Set(initialNotes.map(n => n.series).filter(Boolean)));

  // Unique sections for the currently selected series
  const seriesSectionsRaw = selectedSeries
    ? Array.from(new Set(initialNotes.filter(n => n.series === selectedSeries && n.section).map(n => n.section as string)))
    : [];

  // Sort sections (Intro first, then Adhyay 1, 2, 3...)
  const seriesSections = seriesSectionsRaw.sort((a, b) => {
    if (a.toLowerCase().includes("intro")) return -1;
    if (b.toLowerCase().includes("intro")) return 1;
    return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
  });

  const showSeriesSelection = selectedSeries === null;
  const showSectionSelection = selectedSeries !== null && seriesSections.length > 0 && selectedSection === null;
  const showNotesGrid = selectedSeries !== null && (!showSectionSelection);

  // Filter notes for the grid
  const filteredNotes = initialNotes.filter(note => {
    if (selectedSeries && note.series !== selectedSeries) return false;
    if (selectedSection && note.section !== selectedSection) return false;

    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (note.description || "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const getYoutubeEmbedUrl = (url: string) => {
    if (!url) return "";
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11)
      ? `https://www.youtube.com/embed/${match[2]}?autoplay=1`
      : url;
  };

  const getYoutubeThumbnail = (url: string) => {
    if (!url) return "";
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11)
      ? `https://img.youtube.com/vi/${match[2]}/hqdefault.jpg`
      : "";
  };

  const getSeriesPoster = (seriesName: string) => {
    const name = seriesName.toLowerCase();
    if (name.includes('decoding')) return '/images/resources/posters/decoding_jainism.jpeg';
    if (name.includes('tatvarth')) return '/images/resources/posters/tatvarth-series.jpeg';
    if (name.includes('the jain ramayan')) return '/images/resources/posters/the-jain-ramayan.jpeg';
    return null;
  };

  const getSectionPoster = (sectionName: string) => {
    const name = sectionName.toLowerCase();
    if (name.includes('intro')) return '/images/resources/posters/intro.jpeg';
    if (name.includes('adhyay 10')) return '/images/resources/posters/adhyay-10.jpeg';
    if (name.includes('adhyay 1')) return '/images/resources/posters/adhyay-1.jpeg';
    if (name.includes('adhyay 2')) return '/images/resources/posters/adhyay-2.jpeg';
    if (name.includes('adhyay 3')) return '/images/resources/posters/adhyay-3.jpeg';
    if (name.includes('adhyay 4')) return '/images/resources/posters/adhyay-4.jpeg';
    if (name.includes('adhyay 5')) return '/images/resources/posters/adhyay-5.jpeg';
    if (name.includes('adhyay 6')) return '/images/resources/posters/adhyay-6.jpeg';
    if (name.includes('adhyay 7')) return '/images/resources/posters/adhyay-7.jpeg';
    if (name.includes('adhyay 8')) return '/images/resources/posters/adhyay-8.jpeg';
    if (name.includes('adhyay 9')) return '/images/resources/posters/adhyay-9.jpeg';
    // Add more Adhyay images here as you create them!
    return null;
  };

  return (
    <div className="w-full max-w-7xl mx-auto z-10 relative">
      <AnimatePresence mode="wait">

        {showSeriesSelection && (
          /* STEP 1: SERIES SELECTION */
          <motion.div
            key="series-view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto w-full"
          >
            {seriesList.map((series) => {
              const seriesNotes = initialNotes.filter(n => n.series === series);
              const seriesNotesCount = seriesNotes.length;
              
              // If the series has exactly one entry and its title OR section contains "coming soon", lock it!
              const isComingSoon = seriesNotesCount === 1 && (
                seriesNotes[0].title.toLowerCase().includes("coming soon") ||
                (seriesNotes[0].section || "").toLowerCase().includes("coming soon")
              );

              return (
                <button
                  key={series}
                  onClick={() => {
                    if (isComingSoon) return;
                    setSelectedSeries(series);
                    setSelectedSection(null);
                    setSearchQuery("");
                  }}
                  className={`group relative flex flex-col items-center justify-center p-12 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl border border-zinc-200 dark:border-white/10 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform text-center aspect-[4/3] md:aspect-auto md:min-h-[300px] ${isComingSoon ? 'cursor-default' : 'hover:-translate-y-2 hover:border-blue-500/50'}`}
                >
                  {(() => {
                    const posterUrl = getSeriesPoster(series);
                    if (posterUrl) {
                      return (
                        <div className="absolute inset-0 w-full h-full overflow-hidden">
                          <img 
                            src={posterUrl} 
                            alt={series} 
                            className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                        </div>
                      );
                    }
                    return (
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    );
                  })()}

                  {isComingSoon && (
                    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/10 transition-all duration-500">
                      <div className="px-8 py-3 border border-white/30 bg-black/50 rounded-full text-white font-black tracking-widest uppercase text-2xl rotate-[-5deg] shadow-2xl backdrop-blur-md">
                        Coming Soon
                      </div>
                    </div>
                  )}

                  <div className={`relative z-10 flex flex-col items-center ${isComingSoon ? 'opacity-50 blur-[2px]' : ''}`}>
                    {!getSeriesPoster(series) && (
                      <div className="h-20 w-20 rounded-3xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                        <BookOpen size={40} />
                      </div>
                    )}

                    <h3 className={`text-2xl md:text-3xl font-black uppercase tracking-tight mb-2 ${isIndic ? 'leading-normal' : ''} ${getSeriesPoster(series) ? 'text-white drop-shadow-lg' : 'text-gray-900 dark:text-white'}`}>
                      {series}
                    </h3>
                    <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mt-2 ${getSeriesPoster(series) ? 'bg-white/20 text-white backdrop-blur-md border border-white/30 shadow-lg' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'}`}>
                      {seriesNotesCount} Videos & Notes
                    </div>
                  </div>
                </button>
              );
            })}
          </motion.div>
        )}

        {showSectionSelection && (
          /* STEP 2: SECTION SELECTION (Adhyays) */
          <motion.div
            key="section-view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="w-full"
          >
            <div className="flex items-center mb-12">
              <button
                onClick={() => setSelectedSeries(null)}
                className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md border border-zinc-200 dark:border-white/10 hover:border-blue-500 hover:text-blue-500 transition-all shadow-sm"
              >
                <ArrowLeft size={16} className="text-zinc-600 dark:text-zinc-400 group-hover:text-blue-500 transition-colors" />
                <span className="text-sm font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-400 group-hover:text-blue-500 transition-colors">Back to Series</span>
              </button>
            </div>

            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white uppercase tracking-widest mb-4">{selectedSeries}</h2>
              <p className="text-gray-500 dark:text-gray-400 font-serif">Select a section to view its sutras and notes.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto pb-32">
              {seriesSections.map(section => {
                const sectionNotes = initialNotes.filter(n => n.series === selectedSeries && n.section === section);
                const sectionNotesCount = sectionNotes.length;
                const isSectionComingSoon = sectionNotes.length > 0 && sectionNotes.every(n => n.title.toLowerCase().includes("coming soon"));
                const theme = getThemeColors(selectedSeries || "", section);

                return (
                  <button
                    key={section}
                    onClick={() => {
                      if (isSectionComingSoon) return;
                      setSelectedSection(section);
                      setSearchQuery("");
                    }}
                    className={`group relative p-8 rounded-2xl overflow-hidden text-left flex flex-col justify-between aspect-[4/3] md:aspect-auto md:min-h-[200px] transition-all duration-300 ${isSectionComingSoon ? 'cursor-default' : `hover:shadow-xl ${theme.shadow}`}`}
                  >
                    {/* Background Image Logic */}
                    {(() => {
                      const posterUrl = getSectionPoster(section);
                      if (posterUrl) {
                        return (
                          <div className="absolute inset-0 w-full h-full overflow-hidden">
                            <img 
                              src={posterUrl} 
                              alt={section} 
                              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${isSectionComingSoon ? 'opacity-40 blur-[2px]' : 'opacity-80 group-hover:opacity-100 group-hover:scale-105'}`} 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                            {!isSectionComingSoon && <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>}
                          </div>
                        );
                      }
                      return (
                        <div className={`absolute inset-0 bg-white/80 dark:bg-zinc-900/60 backdrop-blur-xl border border-zinc-200 dark:border-white/10 ${isSectionComingSoon ? 'opacity-50' : ''}`}></div>
                      );
                    })()}

                    {isSectionComingSoon && (
                      <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/10">
                        <div className="px-6 py-2 border border-white/30 bg-black/50 rounded-full text-white font-black tracking-widest uppercase text-lg rotate-[-5deg] shadow-2xl backdrop-blur-md">
                          Coming Soon
                        </div>
                      </div>
                    )}

                    {/* Text Content */}
                    <div className={`relative z-10 w-full h-full flex flex-col justify-between ${isSectionComingSoon ? 'opacity-40 blur-[1px]' : ''}`}>
                      <div>
                        <Layers className={`${getSectionPoster(section) ? 'text-white' : theme.text} mb-4 opacity-50 group-hover:opacity-100 transition-opacity`} size={28} />
                        <h3 className={`text-xl font-bold uppercase tracking-tight mb-2 ${getSectionPoster(section) ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                          {section}
                        </h3>
                      </div>
                      {!isSectionComingSoon && (
                        <div className={`mt-6 inline-flex items-center text-xs font-bold uppercase tracking-widest ${getSectionPoster(section) ? 'text-white/80' : theme.text}`}>
                          {sectionNotesCount} items <ArrowRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
                        </div>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}

        {showNotesGrid && (
          /* STEP 3: VIDEOS AND NOTES GRID */
          <motion.div
            key="notes-view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="w-full"
          >
            {/* Header / Back Button / Search Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
              <button
                onClick={() => {
                  if (seriesSections.length > 0) {
                    setSelectedSection(null); // Go back to sections
                  } else {
                    setSelectedSeries(null); // Go back to series
                  }
                  setSearchQuery("");
                }}
                className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md border border-zinc-200 dark:border-white/10 hover:border-blue-500 hover:text-blue-500 transition-all shadow-sm shrink-0"
              >
                <ArrowLeft size={16} className="text-zinc-600 dark:text-zinc-400 group-hover:text-blue-500 transition-colors" />
                <span className="text-sm font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-400 group-hover:text-blue-500 transition-colors">
                  {seriesSections.length > 0 ? `Back to ${selectedSeries}` : (t?.backToSeries || "Back to Series")}
                </span>
              </button>

              <div className="relative w-full max-w-xl">
                <div className="absolute inset-0 bg-blue-500/10 blur-xl rounded-full pointer-events-none"></div>
                <div className="relative flex items-center bg-white dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-200 dark:border-white/10 rounded-full px-6 py-3 shadow-lg">
                  <Search className="text-blue-500 mr-3" size={20} />
                  <input
                    type="text"
                    placeholder={t?.search || "Search..."}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder-gray-400 font-serif text-lg"
                  />
                </div>
              </div>
            </div>

            {selectedSection && (
              <div className="mb-10 flex items-center gap-4">
                {(() => {
                  const theme = getThemeColors(selectedSeries || "", selectedSection);
                  return (
                    <h2 className={`text-2xl md:text-3xl font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r ${theme.from} ${theme.to}`}>
                      {selectedSection}
                    </h2>
                  );
                })()}
                <div className="h-px bg-zinc-200 dark:bg-white/10 grow"></div>
              </div>
            )}

            {/* Flat Notes Grid (since it's already filtered to a section) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 pb-32">
              <AnimatePresence mode="popLayout">
                {filteredNotes.map((note) => {
                  const theme = getThemeColors(note.series, note.section);
                  
                  return (
                  <motion.div
                    key={note.id}
                    id={`note-${note.id}`}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      '--highlight-hex': theme.hex,
                      '--highlight-hex-dark': theme.hexDark,
                    } as React.CSSProperties}
                    className={`group flex flex-col md:flex-row bg-white/80 dark:bg-zinc-900/60 backdrop-blur-xl border border-zinc-200 dark:border-white/10 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl ${theme.hoverBorder} transition-all duration-500 ${highlightedNoteId === note.id ? 'dynamic-breathing-highlight' : ''}`}
                  >
                    {/* Video Thumbnail Area */}
                    <div
                      className="w-full md:w-2/5 aspect-video md:aspect-auto relative bg-black shrink-0 overflow-hidden cursor-pointer group/video"
                      onClick={() => {
                        if (note.youtubeLink) setPlayingVideoUrl(note.youtubeLink);
                      }}
                    >
                      {note.youtubeLink ? (
                        <>
                          <img
                            src={getYoutubeThumbnail(note.youtubeLink)}
                            alt={note.title}
                            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover/video:opacity-100 transition-opacity duration-500 group-hover/video:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/40 group-hover/video:bg-black/20 transition-colors duration-500"></div>

                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center group-hover/video:scale-110 transition-all duration-300 ${theme.playBg} ${theme.playShadow}`}>
                              <PlayCircle size={32} className="text-white ml-1" />
                            </div>
                          </div>
                          <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md px-2.5 py-1.5 rounded-md flex items-center gap-1.5 opacity-0 group-hover/video:opacity-100 transition-opacity">
                            <Maximize2 size={12} className="text-white" />
                            <span className="text-[10px] font-bold uppercase text-white tracking-wider">Play</span>
                          </div>
                        </>
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900">
                          <PlayCircle className="text-zinc-700 w-12 h-12 mb-2" />
                          <span className="text-xs font-bold uppercase tracking-widest text-zinc-600">No Video</span>
                        </div>
                      )}
                    </div>

                    {/* Content Area */}
                    <div className="p-6 flex flex-col justify-between grow">
                      <div>
                        <h3 className={`text-xl font-bold text-gray-900 dark:text-white mb-3 ${isIndic ? 'leading-normal tracking-normal pt-1' : 'leading-tight tracking-tight'}`}>
                          {note.title}
                        </h3>
                        {note.description && (
                          <p className={`text-gray-600 dark:text-gray-400 text-sm font-serif line-clamp-3 mb-4 ${isIndic ? 'leading-relaxed pt-1' : ''}`}>
                            {note.description}
                          </p>
                        )}
                      </div>

                      {note.driveFileId ? (
                        <a
                          href={`https://drive.google.com/uc?export=download&id=${note.driveFileId}`}
                          className={`mt-4 flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all duration-300 shadow-sm group/btn ${theme.badgeBg} ${theme.badgeHoverBg} ${theme.badgeBorder} border ${theme.badgeText}`}
                        >
                          <Download size={18} className="group-hover/btn:animate-bounce-subtle" />
                          {t?.download || "Download PDF"}
                        </a>
                      ) : (
                        <div className="mt-4 py-3.5 text-center text-xs font-bold uppercase tracking-widest text-zinc-400 border border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl">
                          PDF Coming Soon
                        </div>
                      )}
                    </div>
                  </motion.div>
                )})}
              </AnimatePresence>

              {filteredNotes.length === 0 && (
                <div className="col-span-full py-20 flex flex-col items-center justify-center text-center">
                  <BookOpen className="text-zinc-300 dark:text-zinc-700 w-16 h-16 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t?.noNotes || "No Notes Found"}</h3>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Video Modal (Rendered via Portal to escape z-index stacking context) */}
      {mounted && createPortal(
        <AnimatePresence>
          {playingVideoUrl && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 md:p-12"
            >
              <button
                onClick={() => setPlayingVideoUrl(null)}
                className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-[100000]"
              >
                <X size={24} />
              </button>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative"
              >
                <iframe
                  src={getYoutubeEmbedUrl(playingVideoUrl)}
                  className="absolute inset-0 w-full h-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
