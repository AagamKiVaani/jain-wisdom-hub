import { tirthankaras } from "@/lib/tirthankara-data";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function TirthankarGallery({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const l = (lang === "hi" || lang === "kn") ? lang : "en";

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white selection:bg-orange-500 selection:text-white p-6 md:p-12 transition-colors duration-500">
      
      {/* 1. FIXED NAVIGATION (Consistent Position) */}
      <Link 
        href={`/${lang}`} 
        className="fixed top-20 left-4 md:top-24 md:left-8 z-50 flex items-center gap-2 text-gray-500 hover:text-orange-500 transition-all bg-white/80 dark:bg-black/50 px-4 py-2 rounded-full backdrop-blur-md border border-gray-200 dark:border-white/10 shadow-sm"
      >
        <ArrowLeft size={16} /> 
        <span className="text-[10px] font-bold uppercase tracking-widest">Library</span>
      </Link>

      <div className="max-w-[1800px] mx-auto pt-24 md:pt-20">
        <div className="mb-12 md:mb-20">
          <h2 className="text-orange-600 dark:text-orange-500 font-bold tracking-[0.5em] mb-4 text-xs md:text-base">THE LINEAGE</h2>
          {/* Fluid Text Size */}
          <h1 className="text-[12vw] md:text-9xl font-black uppercase tracking-tighter leading-none text-gray-900 dark:text-white/90">
            24 Tirthankaras
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 pb-20">
          {tirthankaras.map((t) => (
            <Link 
              href={`/${lang}/tirthankars/${t.id}`} 
              key={t.id}
              // Card: Light mode (gray-50) vs Dark mode (zinc-900)
              className="group relative h-[400px] md:h-[500px] rounded-[2rem] bg-gray-50 dark:bg-zinc-900/50 border border-gray-200 dark:border-white/5 overflow-hidden transition-all hover:border-orange-500/50 hover:shadow-2xl hover:shadow-orange-500/10 dark:hover:shadow-orange-900/20"
            >
              {/* Background Glow */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity duration-700"
                style={{ backgroundColor: t.colorHex }}
              ></div>

              <div className="absolute top-6 left-8 z-10">
                 <span className="text-6xl font-black text-gray-200 dark:text-white/5 group-hover:text-gray-300 dark:group-hover:text-white/20 transition-colors">
                   {t.id}
                 </span>
              </div>

              {/* Card Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-6">
                
                {/* Image: Slides up on desktop hover */}
                <div className="relative w-full h-full flex items-center justify-center transition-all duration-500 md:group-hover:-translate-y-12">
                   <img 
                    src={t.tirthankaraImage} 
                    alt={t.name[l]} 
                    className="h-[55%] md:h-[60%] w-auto object-contain drop-shadow-2xl"
                   />
                </div>

                {/* Text Info: Visible mobile, Hover desktop */}
                <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-white via-white/90 to-transparent dark:from-black dark:via-black/80 dark:to-transparent flex flex-col items-start 
                                opacity-100 md:opacity-0 md:group-hover:opacity-100 md:translate-y-4 md:group-hover:translate-y-0 transition-all duration-500">
                   
                   <div className="text-orange-600 dark:text-orange-500 text-xs font-bold tracking-widest mb-1 uppercase">
                     {t.symbol[l]}
                   </div>
                   <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t.name[l]}</h2>
                   
                   {/* Visual cue */}
                   <div className="h-1 w-12 bg-gray-300 dark:bg-white/20 rounded-full mt-2"></div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}