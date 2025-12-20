import { jainTopics } from "@/lib/jain-data";
import { notFound } from "next/navigation";
import { ArrowLeft, Play, Info, BookOpen, Quote } from "lucide-react";
import Link from "next/link";

export default async function TopicPage({ params }: { params: Promise<{ lang: string; topic: string }> }) {
  const { lang, topic } = await params;
  const data = jainTopics[topic];
  if (!data) return notFound();
  const l = (lang === "hi" || lang === "kn") ? lang : "en";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black pb-32">
      
      {/* 1. FIXED NAVIGATION (Updated Position & Name) */}
      <Link 
        href={`/${lang}`} 
        className="fixed top-20 left-4 md:top-24 md:left-8 z-40 flex items-center gap-2 text-gray-500 hover:text-orange-500 transition-all bg-white/80 dark:bg-black/40 px-4 py-2 rounded-full backdrop-blur-md border border-gray-200 dark:border-white/10 shadow-sm"
      >
         <ArrowLeft size={16} /> 
         <span className="text-[10px] font-bold uppercase tracking-[0.2em]">LIBRARY</span>
      </Link>

      {/* HERO */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 pt-20 md:pt-16 pb-12 px-6">
        <div className="max-w-4xl mx-auto mt-12 md:mt-16">
          <h1 className="text-4xl md:text-7xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">{data.title[l]}</h1>
          <p className="text-lg md:text-xl text-orange-600 font-medium">{data.subtitle[l]}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-6 mt-12 space-y-24 md:space-y-32">
        {data.chapters.map((chapter) => (
          <div key={chapter.chapterNumber}>
            <div className="flex items-center gap-4 md:gap-6 mb-12 md:mb-16">
              <span className="text-5xl md:text-7xl font-black text-gray-200 dark:text-gray-800 leading-none">0{chapter.chapterNumber}</span>
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white border-b-8 border-orange-500 pb-2">{chapter.chapterTitle[l]}</h2>
            </div>

            <div className="space-y-12 md:space-y-16">
                {chapter.sections.map((section, sIdx) => (
                    <div key={sIdx} className="relative">
                    <h3 className="text-[10px] md:text-sm font-black text-gray-400 uppercase tracking-[0.3em] mb-6 md:mb-8 flex items-center gap-4">
                        <span className="h-px bg-gray-200 dark:bg-gray-800 grow"></span>
                        {section.heading[l]}
                        <span className="h-px bg-gray-200 dark:bg-gray-800 grow"></span>
                    </h3>

                    {/* 1. Sacred Text Card */}
                    {section.type === "sacred-card" && (
                        <div className="bg-gray-950 p-8 md:p-20 rounded-[2rem] md:rounded-[3rem] text-center shadow-2xl relative border border-gray-800">
                        <button className="absolute top-4 right-4 md:top-8 md:right-8 bg-orange-600 p-3 md:p-4 rounded-full text-white hover:scale-110 active:scale-95 transition-all shadow-lg shadow-orange-600/30">
                            <Play fill="white" size={20} />
                        </button>
                        <div className="text-2xl md:text-5xl font-serif italic text-white whitespace-pre-line leading-relaxed mb-6">
                            {section.content?.[l]}
                        </div>
                        <span className="text-[10px] md:text-xs text-gray-600 tracking-widest font-bold uppercase">Click to Hear Pronunciation</span>
                        </div>
                    )}

                    {/* 2. Line by Line Meaning */}
                    {section.type === "line-meaning" && (
                        <div className="space-y-4">
                        {section.lines?.map((line, li) => (
                            <div key={li} className="bg-white dark:bg-gray-900 p-5 md:p-6 rounded-2xl border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
                            <span className="text-orange-600 font-serif font-bold text-lg md:text-xl md:w-1/3">{line.original}</span>
                            <span className="text-gray-600 dark:text-gray-400 md:w-2/3 italic text-base md:text-lg">{line.meaning[l]}</span>
                            </div>
                        ))}
                        </div>
                    )}

                    {/* 3. Deep Essay / Philosophy */}
                    {(section.type === "deep-essay" || section.type === "text") && (
                        <div className="bg-white dark:bg-gray-900 p-6 md:p-10 rounded-3xl md:rounded-4xl border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden">
                        <div className="text-lg md:text-xl leading-[1.8] text-gray-700 dark:text-gray-300 whitespace-pre-line">
                            {section.content?.[l]}
                        </div>
                        </div>
                    )}

                    {/* 4. Science Breakdown */}
                    {section.type === "science-breakdown" && (
                        <div className="bg-blue-50 dark:bg-blue-900/10 p-6 md:p-8 rounded-3xl border border-blue-100 dark:border-blue-800">
                        <div className="text-lg md:text-xl leading-[1.8] text-blue-900 dark:text-blue-200 whitespace-pre-line font-mono italic">
                            {section.content?.[l]}
                        </div>
                        </div>
                    )}

                    {/* 5. Story Mode */}
                    {section.type === "story-mode" && (
                        <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-[2rem] blur opacity-10"></div>
                        <div className="relative bg-white dark:bg-gray-950 p-8 md:p-16 rounded-[1.5rem] md:rounded-[2.5rem] border border-orange-100 dark:border-orange-900/30">
                            <div className="text-xl md:text-2xl leading-[1.8] text-gray-800 dark:text-gray-200 font-serif">
                            {section.content?.[l]}
                            </div>
                        </div>
                        </div>
                    )}

                    {/* 6. Paramesthi Grid */}
                    {section.type === "paramesthi-grid" && (
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        {section.items?.map((item, i) => (
                            <div key={i} className="flex flex-col items-center gap-4 p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
                                <div className={`w-16 h-16 rounded-full ${item.color} shadow-inner border border-gray-100`}></div>
                                <div className="text-center">
                                <h4 className="font-bold text-lg text-gray-900 dark:text-white">{item.name[l]}</h4>
                                <p className="text-gray-500 text-xs mt-1">{item.desc[l]}</p>
                                </div>
                            </div>
                        ))}
                        </div>
                    )}
                    </div>
                ))}
                </div>
          </div>
        ))}
      </div>
    </div>
  );
}