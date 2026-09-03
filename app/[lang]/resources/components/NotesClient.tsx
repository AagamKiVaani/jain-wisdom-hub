"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Download, PlayCircle, BookOpen, X, ArrowLeft, ArrowRight, ArrowUp, ChevronRight, Maximize2, Layers, Sparkles } from "lucide-react";
import BorderBeam from "@/components/BorderBeam";
import { Card3DContainer, Card3DItem } from "@/components/Card3D";
import { playTapSound } from "@/lib/soundEffects";

export interface Note {
  id: string;
  series: string;
  section?: string;
  title: string;
  videoLink: string;
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

const getSeriesTheme = (seriesName: string) => {
  const name = seriesName.toLowerCase();
  if (name.includes('ramayan')) {
    return {
      glow: 'from-amber-500/25 via-yellow-500/20 to-orange-500/10',
      borderHover: 'hover:border-amber-500/60',
      shadow: 'hover:shadow-amber-500/20',
      accentText: 'text-amber-500',
    };
  }
  if (name.includes('tatvarth')) {
    return {
      glow: 'from-orange-500/25 via-amber-500/20 to-yellow-500/10',
      borderHover: 'hover:border-orange-500/60',
      shadow: 'hover:shadow-orange-500/20',
      accentText: 'text-orange-500',
    };
  }
  if (name.includes('decoding')) {
    return {
      glow: 'from-cyan-500/25 via-blue-500/20 to-indigo-500/10',
      borderHover: 'hover:border-cyan-500/60',
      shadow: 'hover:shadow-cyan-500/20',
      accentText: 'text-cyan-500',
    };
  }
  return {
    glow: 'from-amber-500/20 via-orange-500/15 to-transparent',
    borderHover: 'hover:border-amber-500/60',
    shadow: 'hover:shadow-amber-500/20',
    accentText: 'text-amber-500',
  };
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
  const [showScrollTop, setShowScrollTop] = useState(false);
  const searchParams = useSearchParams();

  // Mobile & desktop scroll-to-top detection
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mobile center-focus viewport illumination state
  const [activeMobileCardId, setActiveMobileCardId] = useState<string | null>(null);

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

  const contentContainerRef = useRef<HTMLDivElement>(null);

  // Smooth/instant scroll to dock the sticky bar right under the navbar (64px)
  const scrollToStickyPoint = () => {
    if (contentContainerRef.current) {
      const rect = contentContainerRef.current.getBoundingClientRect();
      const targetY = window.scrollY + rect.top - 64;
      window.scrollTo({
        top: Math.max(0, targetY),
        left: 0,
        behavior: 'instant',
      });
    }
  };

  // Scroll positioning when series or section changes
  useEffect(() => {
    if (targetScrollId || searchParams.get('highlight')) return;

    if (selectedSeries !== null) {
      // User opened a series or chapter: dock sticky bar right at the top
      scrollToStickyPoint();
      const timer = setTimeout(scrollToStickyPoint, 50);
      return () => clearTimeout(timer);
    } else {
      // User went back to "All Series": scroll to the very top of the page
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [selectedSeries, selectedSection]);

  // Initial mount: ensure fresh clean scroll to top
  useEffect(() => {
    if (!searchParams.get('highlight')) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, []);

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

  // Mobile center-focus viewport illumination (illuminated manuscript scroll effect)
  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth >= 768) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-note-id");
            if (id) setActiveMobileCardId(id);
          }
        });
      },
      {
        rootMargin: "-35% 0px -35% 0px",
        threshold: 0.1,
      }
    );

    const cards = document.querySelectorAll("[data-note-id]");
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [filteredNotes, selectedSeries, selectedSection]);

  const getVideoTypeAndId = (urlOrId: string) => {
    if (!urlOrId) return { type: 'none', id: '' };
    const str = urlOrId.trim();

    const ytRegExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|&v=)([^#&?]*).*/;
    const ytMatch = str.match(ytRegExp);
    if (ytMatch && ytMatch[2].length === 11) return { type: 'youtube', id: ytMatch[2] };

    if (str.includes('drive.google.com')) {
      const match = str.match(/[-\w]{15,}/);
      if (match) return { type: 'drive', id: match[0] };
    }

    if (/^[-\w]{15,}$/.test(str)) {
      return { type: 'drive', id: str };
    }

    return { type: 'unknown', id: str };
  };

  const getVideoEmbedUrl = (urlOrId: string) => {
    const { type, id } = getVideoTypeAndId(urlOrId);
    if (type === 'youtube') return `https://www.youtube.com/embed/${id}?autoplay=1`;
    if (type === 'drive') return `https://drive.google.com/file/d/${id}/preview`;
    
    const str = urlOrId.trim();
    if (str && !str.startsWith('http://') && !str.startsWith('https://')) {
      return `https://${str}`;
    }
    return str;
  };

  const getVideoThumbnail = (urlOrId: string) => {
    const { type, id } = getVideoTypeAndId(urlOrId);
    if (type === 'youtube') return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
    if (type === 'drive') return `https://drive.google.com/thumbnail?id=${id}&sz=w800`;
    return "";
  };

  const getSeriesPoster = (seriesName: string) => {
    const name = seriesName.toLowerCase();
    if (name.includes('decoding')) return '/images/resources/posters/decoding_jainism.jpeg';
    if (name.includes('tatvarth')) return '/images/resources/posters/tatvarth-series.png';
    if (name.includes('the jain ramayan')) return '/images/resources/posters/the-jain-ramayan.jpeg';
    return null;
  };

  const getSectionPoster = (sectionName: string) => {
    const name = sectionName.toLowerCase();
    if (name.includes('intro')) return '/images/resources/posters/introduction-to-tatvarth-series.jpeg';
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
    <div ref={contentContainerRef} className="w-full max-w-7xl mx-auto z-10 relative">

      {/* Sticky Hierarchy Breadcrumb Bar (Permanently visible on mobile & desktop when scrolling) */}
      <AnimatePresence>
        {selectedSeries && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="sticky top-16 z-40 w-full mb-8 py-2 px-3 sm:px-4 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-2xl border border-zinc-200/90 dark:border-white/10 rounded-2xl shadow-md transition-all"
          >
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap sm:flex-nowrap py-0.5">
              <button
                onClick={() => {
                  playTapSound();
                  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                  setSelectedSeries(null);
                  setSelectedSection(null);
                  setSearchQuery("");
                }}
                className="group inline-flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/80 dark:border-white/10 hover:border-amber-500/50 hover:bg-amber-50 dark:hover:bg-amber-500/10 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-300 transition-all active:scale-95 shrink-0"
                title="Back to all series"
              >
                <ArrowLeft size={13} className="text-zinc-400 group-hover:text-amber-500 transition-colors shrink-0" />
                <span className="hidden sm:inline">{t?.allSeries || "All Series"}</span>
                <span className="sm:hidden">All</span>
              </button>

              <ChevronRight size={13} className="text-zinc-400 dark:text-zinc-600 shrink-0" />

              <button
                onClick={() => {
                  if (seriesSections.length > 0) {
                    playTapSound();
                    scrollToStickyPoint();
                    setSelectedSection(null);
                    setSearchQuery("");
                  }
                }}
                className={`inline-flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all border shrink-0 ${
                  selectedSection 
                    ? "bg-zinc-100 dark:bg-zinc-900 border-zinc-200/80 dark:border-white/10 text-zinc-700 dark:text-zinc-300 hover:border-amber-500/50 hover:text-amber-600 dark:hover:text-amber-400 active:scale-95 cursor-pointer" 
                    : "bg-amber-500/15 border-amber-500/40 text-amber-800 dark:text-amber-300 font-black cursor-default"
                }`}
              >
                <span className="hidden sm:inline">{selectedSeries}</span>
                <span className="sm:hidden">{selectedSeries.replace(/\s*Series\s*/i, '').trim()}</span>
              </button>

              {selectedSection && (
                <>
                  <ChevronRight size={13} className="text-zinc-400 dark:text-zinc-600 shrink-0" />
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-gradient-to-r from-amber-500/15 to-orange-500/15 border border-amber-500/30 text-amber-800 dark:text-amber-200 text-[11px] sm:text-xs font-black uppercase tracking-wider shadow-xs shrink-0">
                    <Layers size={12} className="text-amber-500 shrink-0" />
                    <span>{selectedSection}</span>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">

        {showSeriesSelection && (
          /* STEP 1: SERIES SELECTION - Aceternity Ambient Glow & Bento Styling */
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

              const seriesTheme = getSeriesTheme(series);

              return (
                <motion.div
                  key={series}
                  layoutId={`series-card-shell-${series}`}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="relative group/card w-full h-full"
                >
                  {/* Ambient Halo Glow (Aceternity UI style) */}
                  <div className={`absolute -inset-1 rounded-3xl bg-gradient-to-r ${seriesTheme.glow} opacity-0 group-hover/card:opacity-100 blur-2xl transition-all duration-700 pointer-events-none -z-10`} />

                  <Card3DContainer
                    containerClassName="w-full h-full"
                    className="w-full h-full"
                    onClick={() => {
                      if (isComingSoon) return;
                      playTapSound();
                      scrollToStickyPoint();
                      setSelectedSeries(series);
                      setSelectedSection(null);
                      setSearchQuery("");
                    }}
                  >
                    <div
                      onMouseMove={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                        e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
                      }}
                      className={`group relative flex flex-col items-center justify-center p-10 md:p-12 w-full h-full bg-white/75 dark:bg-zinc-900/75 noise-overlay backdrop-blur-2xl border border-zinc-200/90 dark:border-white/10 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 text-center aspect-[4/3] md:aspect-auto md:min-h-[310px] ${seriesTheme.borderHover} ${seriesTheme.shadow} ${isComingSoon ? 'cursor-default' : 'cursor-pointer'}`}
                    >
                      {/* Aceternity Radial Cursor Spotlight */}
                      <div
                        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                        style={{
                          background: `radial-gradient(350px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(245, 158, 11, 0.18), transparent 80%)`,
                        }}
                      />

                      {/* Animated Golden Conic Border Beam */}
                      <BorderBeam size={220} duration={9} colorFrom="#f59e0b" colorTo="#fbbf24" className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

                      {(() => {
                        const posterUrl = getSeriesPoster(series);
                        if (posterUrl) {
                          return (
                            <div className="absolute inset-0 w-full h-full overflow-hidden">
                              <motion.img 
                                layoutId={`series-poster-${series}`}
                                src={posterUrl} 
                                alt={series} 
                                className="absolute inset-0 w-full h-full object-cover opacity-95 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                            </div>
                          );
                        }
                        return (
                          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        );
                      })()}

                      {isComingSoon && (
                        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/20 backdrop-blur-[2px] transition-all duration-500">
                          <div className="px-8 py-3 border border-white/30 bg-black/60 rounded-full text-white font-black tracking-widest uppercase text-2xl rotate-[-5deg] shadow-2xl backdrop-blur-md">
                            Coming Soon
                          </div>
                        </div>
                      )}

                      {/* Holographic Z-Depth Floating Layer */}
                      <Card3DItem
                        translateZ={45}
                        className={`relative z-10 flex flex-col items-center pointer-events-none ${isComingSoon ? 'opacity-50 blur-[2px]' : ''}`}
                      >
                        {!getSeriesPoster(series) && (
                          <>
                            <div className="h-20 w-20 rounded-3xl bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-6 shadow-inner border border-amber-200/40">
                              <BookOpen size={40} />
                            </div>
                            <h3 className={`text-2xl md:text-3xl font-black uppercase tracking-tight mb-2 ${isIndic ? 'leading-normal' : ''} text-gray-900 dark:text-white`}>
                              {series}
                            </h3>
                          </>
                        )}

                        <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mt-2 ${getSeriesPoster(series) ? 'bg-black/60 text-white backdrop-blur-md border border-white/30 shadow-lg' : 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 border border-amber-200/50'}`}>
                          {seriesNotesCount} Videos & Notes
                        </div>
                      </Card3DItem>
                    </div>
                  </Card3DContainer>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {showSectionSelection && (
          /* STEP 2: SECTION SELECTION (Adhyays) with Apple App Store Spring Morph Expansion */
          <motion.div
            key="section-view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="w-full"
          >
            {/* Apple App Store Morph Expanded Card Banner */}
            <motion.div
              layoutId={`series-card-shell-${selectedSeries}`}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full max-w-4xl mx-auto mb-12 overflow-hidden rounded-3xl border border-zinc-200/90 dark:border-white/10 shadow-2xl bg-white/80 dark:bg-zinc-900/80 noise-overlay backdrop-blur-2xl"
            >
              {getSeriesPoster(selectedSeries) ? (
                <div className="relative w-full aspect-[21/9] sm:aspect-[24/8] overflow-hidden">
                  <motion.img 
                    layoutId={`series-poster-${selectedSeries}`}
                    src={getSeriesPoster(selectedSeries)!} 
                    alt={selectedSeries} 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent"></div>
                  <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-widest mb-1">
                        <span>✦</span>
                        <span>SACRED SCRIPTURE SERIES</span>
                        <span>✦</span>
                      </div>
                      <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">{selectedSeries}</h2>
                    </div>
                    <button
                      onClick={() => {
                        playTapSound();
                        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                        setSelectedSeries(null);
                        setSelectedSection(null);
                        setSearchQuery("");
                      }}
                      className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white text-xs font-bold uppercase tracking-wider transition-all active:scale-95"
                    >
                      <ArrowLeft size={14} /> Back
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center">
                  <h2 className="text-3xl font-black uppercase text-gray-900 dark:text-white mb-2">{selectedSeries}</h2>
                  <p className="text-gray-500 font-serif text-sm">Select a section to explore its sacred sutras and study notes.</p>
                </div>
              )}
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto pb-32">
              {seriesSections.map(section => {
                const sectionNotes = initialNotes.filter(n => n.series === selectedSeries && n.section === section);
                const sectionNotesCount = sectionNotes.length;
                const isSectionComingSoon = sectionNotes.length > 0 && sectionNotes.every(n => n.title.toLowerCase().includes("coming soon"));
                const theme = getThemeColors(selectedSeries || "", section);

                return (
                  <Card3DContainer
                    key={section}
                    containerClassName="w-full h-full"
                    className="w-full h-full"
                    onClick={() => {
                      if (isSectionComingSoon) return;
                      playTapSound();
                      scrollToStickyPoint();
                      setSelectedSection(section);
                      setSearchQuery("");
                    }}
                  >
                    <div
                      onMouseMove={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                        e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
                      }}
                      className={`group relative p-8 w-full h-full rounded-3xl overflow-hidden text-left flex flex-col justify-between aspect-[4/3] md:aspect-auto md:min-h-[210px] noise-overlay shadow-md hover:shadow-2xl transition-all duration-500 ${isSectionComingSoon ? 'cursor-default' : `cursor-pointer ${theme.shadow} ${theme.hoverBorder} border border-transparent`}`}
                    >
                      {/* Aceternity Radial Cursor Spotlight */}
                      <div
                        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                        style={{
                          background: `radial-gradient(300px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(245, 158, 11, 0.18), transparent 80%)`,
                        }}
                      />

                      {/* Animated Golden Conic Border Beam */}
                      <BorderBeam size={180} duration={8} colorFrom="#f59e0b" colorTo="#fbbf24" className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

                      {/* Background Image Logic */}
                      {(() => {
                        const posterUrl = getSectionPoster(section);
                        if (posterUrl) {
                          return (
                            <div className="absolute inset-0 w-full h-full overflow-hidden">
                              <img 
                                src={posterUrl} 
                                alt={section} 
                                className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${isSectionComingSoon ? 'opacity-40 blur-[2px]' : 'opacity-95 group-hover:opacity-100 group-hover:scale-105'}`} 
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent"></div>
                            </div>
                          );
                        }
                        return (
                          <div className={`absolute inset-0 bg-white/80 dark:bg-zinc-900/70 backdrop-blur-xl border border-zinc-200/80 dark:border-white/10 ${isSectionComingSoon ? 'opacity-50' : ''}`}></div>
                        );
                      })()}

                      {isSectionComingSoon && (
                        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
                          <div className="px-6 py-2 border border-white/30 bg-black/60 rounded-full text-white font-black tracking-widest uppercase text-lg rotate-[-5deg] shadow-2xl backdrop-blur-md">
                            Coming Soon
                          </div>
                        </div>
                      )}

                      {/* Floating 3D Text Content */}
                      <Card3DItem
                        translateZ={40}
                        className={`relative z-10 w-full h-full flex flex-col justify-between pointer-events-none ${isSectionComingSoon ? 'opacity-40 blur-[1px]' : ''}`}
                      >
                        <div>
                          <Layers className={`${getSectionPoster(section) ? 'text-amber-400' : theme.text} mb-4 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all`} size={28} />
                          <h3 className={`text-xl font-bold uppercase tracking-tight mb-2 ${getSectionPoster(section) ? 'text-white drop-shadow-md' : 'text-gray-900 dark:text-white'}`}>
                            {section}
                          </h3>
                        </div>
                        {!isSectionComingSoon && (
                          <div className={`mt-6 inline-flex items-center text-xs font-bold uppercase tracking-widest ${getSectionPoster(section) ? 'text-white/90' : theme.text}`}>
                            {sectionNotesCount} items <ArrowRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
                          </div>
                        )}
                      </Card3DItem>
                    </div>
                  </Card3DContainer>
                );
              })}
            </div>
          </motion.div>
        )}

        {showNotesGrid && (
          /* STEP 3: VIDEOS AND NOTES GRID - Enhanced Search & Micro-Interactions */
          <motion.div
            key="notes-view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="w-full"
          >
            {/* Section Header & Search Bar on Mobile & Desktop */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
              {selectedSection && (
                <div className="flex items-center gap-3">
                  {(() => {
                    const theme = getThemeColors(selectedSeries || "", selectedSection);
                    return (
                      <h2 className={`text-2xl md:text-3xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r ${theme.from} ${theme.to}`}>
                        {selectedSection}
                      </h2>
                    );
                  })()}
                </div>
              )}

              <div className="relative w-full sm:w-80 lg:w-96 shrink-0">
                <div className="absolute inset-0 bg-amber-500/10 blur-xl rounded-full pointer-events-none"></div>
                <div className="relative flex items-center bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border border-zinc-200/90 dark:border-white/10 focus-within:border-amber-500/60 focus-within:ring-2 focus-within:ring-amber-500/20 rounded-full px-4 py-2.5 shadow-sm transition-all">
                  <Search className="text-amber-500 mr-2.5 shrink-0" size={17} />
                  <input
                    type="text"
                    placeholder={t?.search || "Search notes, sutras..."}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder-gray-400 font-serif text-sm"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => {
                        playTapSound();
                        setSearchQuery("");
                      }}
                      className="p-1 rounded-full text-zinc-400 hover:text-zinc-600 dark:hover:text-white transition-colors ml-1"
                      title="Clear"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Flat Notes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 pb-32">
              <AnimatePresence mode="popLayout">
                {filteredNotes.map((note) => {
                  const theme = getThemeColors(note.series, note.section);
                  const isMobileActive = activeMobileCardId === note.id;
                  
                  return (
                  <motion.div
                    key={note.id}
                    id={`note-${note.id}`}
                    data-note-id={note.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full"
                  >
                    <Card3DContainer
                      containerClassName="w-full h-full"
                      className="w-full h-full"
                    >
                      <div
                        style={{
                          '--highlight-hex': theme.hex,
                          '--highlight-hex-dark': theme.hexDark,
                        } as React.CSSProperties}
                        onMouseMove={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                          e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
                        }}
                        className={`group relative flex flex-col md:flex-row w-full h-full bg-white/85 dark:bg-zinc-900/75 noise-overlay backdrop-blur-2xl border border-zinc-200/90 dark:border-white/10 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl ${theme.hoverBorder} transition-all duration-500 ${highlightedNoteId === note.id ? 'dynamic-breathing-highlight' : ''} ${isMobileActive ? 'border-amber-500/80 shadow-[0_0_35px_rgba(245,158,11,0.28)] md:shadow-md' : ''}`}
                      >
                        {/* Aceternity Radial Cursor Spotlight */}
                        <div
                          className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                          style={{
                            background: `radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(245, 158, 11, 0.14), transparent 80%)`,
                          }}
                        />

                        {/* Animated Golden Conic Border Beam */}
                        <BorderBeam size={160} duration={9} colorFrom="#f59e0b" colorTo="#fbbf24" className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                        {/* Video Thumbnail Area */}
                        <div
                          className="w-full md:w-2/5 aspect-video md:aspect-auto relative bg-black shrink-0 overflow-hidden cursor-pointer group/video z-10"
                          onClick={() => {
                            playTapSound();
                            if (note.videoLink) setPlayingVideoUrl(note.videoLink);
                          }}
                        >
                          {note.videoLink ? (
                            <>
                              <img
                                src={getVideoThumbnail(note.videoLink)}
                                alt={note.title}
                                className="absolute inset-0 w-full h-full object-cover opacity-95 md:opacity-90 group-hover/video:opacity-100 transition-all duration-700 group-hover/video:scale-105"
                              />
                              <div className="absolute inset-0 bg-black/25 group-hover/video:bg-black/10 transition-colors duration-500"></div>

                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="relative">
                                  <span className="absolute -inset-2 rounded-full bg-white/20 animate-ping opacity-0 group-hover/video:opacity-60 transition-opacity duration-300 pointer-events-none" />
                                  <div className={`relative w-16 h-16 rounded-full flex items-center justify-center group-hover/video:scale-110 transition-all duration-300 ${theme.playBg} ${theme.playShadow}`}>
                                    <PlayCircle size={32} className="text-white ml-1" />
                                  </div>
                                </div>
                              </div>
                              <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 opacity-0 group-hover/video:opacity-100 transition-opacity">
                                <Maximize2 size={12} className="text-white" />
                                <span className="text-[10px] font-bold uppercase text-white tracking-wider">Play Video</span>
                              </div>
                            </>
                          ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900">
                              <PlayCircle className="text-zinc-700 w-12 h-12 mb-2" />
                              <span className="text-xs font-bold uppercase tracking-widest text-zinc-600">No Video</span>
                            </div>
                          )}
                        </div>

                        {/* Content Area with Sacred Temple Inscription Typography */}
                        <div className="p-6 md:p-7 flex flex-col justify-between grow relative z-10">
                          <Card3DItem translateZ={35}>
                            {/* Decorative Brass Flourish Badge */}
                            <div className="flex items-center gap-1.5 mb-2 text-amber-600/75 dark:text-amber-400/75 text-[10px] font-bold uppercase tracking-widest">
                              <span className="text-amber-500">✦</span>
                              <span>{selectedSection || note.series}</span>
                              <span className="text-amber-500">✦</span>
                            </div>

                            {(() => {
                              const containsDevanagari = (text?: string) => text ? /[\u0900-\u097F]/.test(text) : false;
                              const isTitleIndic = isIndic || containsDevanagari(note.title);
                              const isDescIndic = isIndic || containsDevanagari(note.description);
                              
                              return (
                                <>
                                  <h3 className={`text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors ${isTitleIndic ? 'leading-normal tracking-normal pt-0.5' : 'leading-tight tracking-tight'}`}>
                                    {note.title}
                                  </h3>
                                  {note.description && (
                                    <div className="border-l-2 border-amber-500/40 dark:border-amber-400/40 pl-3 py-1 my-2.5 bg-amber-500/5 dark:bg-amber-400/5 rounded-r-xl">
                                      <p className={`text-gray-700 dark:text-amber-100/90 font-serif text-sm md:text-base leading-relaxed tracking-wide italic ${isDescIndic ? 'leading-relaxed' : ''}`}>
                                        "{note.description}"
                                      </p>
                                    </div>
                                  )}
                                </>
                              );
                            })()}
                          </Card3DItem>

                          <Card3DItem translateZ={45}>
                            {note.driveFileId ? (
                              <a
                                href={`https://drive.google.com/uc?export=download&id=${note.driveFileId}`}
                                onClick={() => playTapSound()}
                                className={`mt-4 flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all duration-300 shadow-sm active:scale-[0.98] group/btn ${theme.badgeBg} ${theme.badgeHoverBg} ${theme.badgeBorder} border ${theme.badgeText}`}
                              >
                                <Download size={18} className="transition-transform group-hover/btn:-translate-y-0.5" />
                                {t?.download || "Download PDF"}
                              </a>
                            ) : (
                              <div className="mt-4 py-3.5 text-center text-xs font-bold uppercase tracking-widest text-zinc-400 border border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl">
                                PDF Coming Soon
                              </div>
                            )}
                          </Card3DItem>
                        </div>
                      </div>
                    </Card3DContainer>
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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-6xl aspect-[4/3] sm:aspect-video min-h-[300px] md:min-h-[400px] bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative z-50"
                style={{ WebkitOverflowScrolling: 'touch' }}
              >
                <iframe
                  src={getVideoEmbedUrl(playingVideoUrl)}
                  className="absolute inset-0 w-full h-full"
                  style={{ border: 'none' }}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* Mobile & Desktop Floating Scroll to Top Pill */}
      <AnimatePresence>
        {showScrollTop && selectedSeries && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 15 }}
            transition={{ duration: 0.2 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-40 flex items-center gap-1.5 px-3.5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs uppercase tracking-wider shadow-2xl shadow-amber-500/40 backdrop-blur-md active:scale-95 transition-all"
            title="Scroll to top"
          >
            <ArrowUp size={15} />
            <span className="hidden sm:inline">Top</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
