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
      {/* HERO */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 pt-16 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <Link href={`/${lang}`} className="text-orange-600 flex items-center text-sm font-bold mb-4">
            <ArrowLeft size={16} className="mr-2" /> LIBRARY
          </Link>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">{data.title[l]}</h1>
          <p className="text-xl text-orange-600 font-medium">{data.subtitle[l]}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 mt-16 space-y-32">
        {data.chapters.map((chapter) => (
          <div key={chapter.chapterNumber}>
            <div className="flex items-center gap-6 mb-16">
              <span className="text-7xl font-black text-gray-200 dark:text-gray-800 leading-none">0{chapter.chapterNumber}</span>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white border-b-8 border-orange-500 pb-2">{chapter.chapterTitle[l]}</h2>
            </div>

            <div className="space-y-16">
                {chapter.sections.map((section, sIdx) => (
                    <div key={sIdx} className="relative">
                    <h3 className="text-sm font-black text-gray-400 uppercase tracking-[0.3em] mb-8 flex items-center gap-4">
                        <span className="h-px bg-gray-200 dark:bg-gray-800 grow"></span>
                        {section.heading[l]}
                        <span className="h-px bg-gray-200 dark:bg-gray-800 grow"></span>
                    </h3>

                    {/* 1. Sacred Text Card (Mantra/Gatha) */}
                    {section.type === "sacred-card" && (
                        <div className="bg-gray-950 p-12 md:p-20 rounded-[3rem] text-center shadow-2xl relative border border-gray-800">
                        <button className="absolute top-8 right-8 bg-orange-600 p-4 rounded-full text-white hover:scale-110 active:scale-95 transition-all shadow-lg shadow-orange-600/30">
                            <Play fill="white" size={24} />
                        </button>
                        <div className="text-3xl md:text-5xl font-serif italic text-white whitespace-pre-line leading-relaxed mb-4">
                            {section.content?.[l]}
                        </div>
                        <span className="text-xs text-gray-600 tracking-widest font-bold uppercase">Click to Hear Pronunciation</span>
                        </div>
                    )}

                    {/* 2. Line by Line Meaning */}
                    {section.type === "line-meaning" && (
                        <div className="space-y-4">
                        {section.lines?.map((line, li) => (
                            <div key={li} className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row md:items-center gap-4">
                            <span className="text-orange-600 font-serif font-bold text-xl md:w-1/3">{line.original}</span>
                            <span className="text-gray-600 dark:text-gray-400 md:w-2/3 italic text-lg">{line.meaning[l]}</span>
                            </div>
                        ))}
                        </div>
                    )}

                    {/* 3. Deep Essay / Philosophy */}
                    {(section.type === "deep-essay" || section.type === "text") && (
                        <div className="bg-white dark:bg-gray-900 p-10 rounded-4xl border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden">
                        <div className="text-xl leading-[1.8] text-gray-700 dark:text-gray-300 whitespace-pre-line">
                            {section.content?.[l]}
                        </div>
                        </div>
                    )}

                    {/* 4. Science Breakdown (Aksharas/Matras) */}
                    
                    {section.type === "science-breakdown" && (
                        <div className="bg-blue-50 dark:bg-blue-900/10 p-8 rounded-3xl border border-blue-100 dark:border-blue-800">
                        <div className="text-xl leading-[1.8] text-blue-900 dark:text-blue-200 whitespace-pre-line font-mono italic">
                            {section.content?.[l]}
                        </div>
                        </div>
                    )}

                    {/* 5. Story Mode (Anjan Chor etc) */}
                    {section.type === "story-mode" && (
                        <div className="relative group">
                        <div className="absolute -inset-1 bg-linear-to-r from-orange-400 to-red-500 rounded-[3rem] blur opacity-10"></div>
                        <div className="relative bg-white dark:bg-gray-950 p-10 md:p-16 rounded-[2.5rem] border border-orange-100 dark:border-orange-900/30">
                            <div className="text-2xl leading-[1.8] text-gray-800 dark:text-gray-200 font-serif">
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