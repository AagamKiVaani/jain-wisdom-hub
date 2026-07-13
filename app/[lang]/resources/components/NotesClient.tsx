"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
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

export default function NotesClient({ initialNotes, isIndic, t }: { initialNotes: Note[], isIndic: boolean, t: any }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSeries, setSelectedSeries] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const [playingVideoUrl, setPlayingVideoUrl] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

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
    if (name.includes('the jain ramayan')) return '/images/resources/posters/the_jain_ramayan.jpeg';
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
                const sectionNotesCount = initialNotes.filter(n => n.series === selectedSeries && n.section === section).length;
                return (
                  <button
                    key={section}
                    onClick={() => {
                      setSelectedSection(section);
                      setSearchQuery("");
                    }}
                    className="group relative p-8 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-indigo-500/20 transition-all duration-300 text-left flex flex-col justify-between aspect-[4/3] md:aspect-auto md:min-h-[200px]"
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
                              className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                          </div>
                        );
                      }
                      return (
                        <div className="absolute inset-0 bg-white/80 dark:bg-zinc-900/60 backdrop-blur-xl border border-zinc-200 dark:border-white/10"></div>
                      );
                    })()}

                    {/* Text Content */}
                    <div className="relative z-10 w-full h-full flex flex-col justify-between">
                      <div>
                        <Layers className={`${getSectionPoster(section) ? 'text-white' : 'text-indigo-400'} mb-4 opacity-50 group-hover:opacity-100 transition-opacity`} size={28} />
                        <h3 className={`text-xl font-bold uppercase tracking-tight mb-2 ${getSectionPoster(section) ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                          {section}
                        </h3>
                      </div>
                      <div className={`mt-6 inline-flex items-center text-xs font-bold uppercase tracking-widest ${getSectionPoster(section) ? 'text-white/80' : 'text-indigo-500'}`}>
                        {sectionNotesCount} items <ArrowRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
                      </div>
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
                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">
                  {selectedSection}
                </h2>
                <div className="h-px bg-zinc-200 dark:bg-white/10 grow"></div>
              </div>
            )}

            {/* Flat Notes Grid (since it's already filtered to a section) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 pb-32">
              <AnimatePresence mode="popLayout">
                {filteredNotes.map((note) => (
                  <motion.div
                    key={note.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="group flex flex-col md:flex-row bg-white/80 dark:bg-zinc-900/60 backdrop-blur-xl border border-zinc-200 dark:border-white/10 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:border-blue-500/30 transition-all duration-300"
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
                            <div className="w-16 h-16 rounded-full bg-blue-600/90 flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.6)] group-hover/video:scale-110 group-hover/video:bg-blue-500 transition-all duration-300">
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
                        <h3 className={`text-xl font-bold text-gray-900 dark:text-white mb-3 leading-tight ${isIndic ? 'tracking-normal' : 'tracking-tight'}`}>
                          {note.title}
                        </h3>
                        {note.description && (
                          <p className="text-gray-600 dark:text-gray-400 text-sm font-serif line-clamp-3 mb-4">
                            {note.description}
                          </p>
                        )}
                      </div>

                      {note.driveFileId ? (
                        <a
                          href={`https://drive.google.com/uc?export=download&id=${note.driveFileId}`}
                          className="mt-4 flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl bg-blue-50 dark:bg-blue-500/10 hover:bg-blue-100 dark:hover:bg-blue-500/20 border border-blue-100 dark:border-blue-500/20 text-blue-700 dark:text-blue-300 font-bold text-sm uppercase tracking-widest transition-all duration-300 shadow-sm group/btn"
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
                ))}
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
