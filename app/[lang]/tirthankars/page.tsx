import { tirthankaras } from "@/lib/tirthankara-data";
import { use } from "react";
import Link from "next/link";
import { Sparkles, MapPin } from "lucide-react";

export default function TirthankaraGallery({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = use(params);
  const l = (lang === "hi" || lang === "kn") ? lang : "en";

  return (
    <div className="min-h-screen bg-white dark:bg-black pb-20 overflow-x-hidden">
      
      {/* 1. Header Area */}
      <div className="pt-20 pb-12 px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter">
          THE 24 <span className="text-orange-600">TIRTHANKARS</span>
        </h1>
        <div className="h-1 w-20 bg-orange-500 mx-auto mb-6"></div>
      </div>

      {/* 2. Grid Area */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {tirthankaras.map((t) => (
          <Link 
            key={t.id} 
            href={`/${lang}/tirthankars/${t.id}`}
            // Added 'group' here to ensure hover works perfectly
            className="group relative h-[450px] bg-gray-50 dark:bg-[#0a0a0a] border border-gray-100 dark:border-white/5 rounded-[2.5rem] p-10 transition-all duration-700 hover:border-orange-500/30 overflow-hidden flex flex-col justify-end z-0"
          >
            
            {/* THE DIVINE MANIFESTATION (Custom Image) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
              
              {/* Radial Aura Glow (Only visible on hover) */}
              {/* CHANGE 1: Increased opacity from 20 to 50 */}
              <div 
                className="absolute w-96 h-96 rounded-full opacity-0 group-hover:opacity-50 blur-[120px] transition-all duration-1000 scale-50 group-hover:scale-100"
                style={{ backgroundColor: t.colorHex }}
              ></div>
              
              {/* Custom Symbol Image */}
              {/* CHANGE 2: Increased opacity from 30 to 70 for a much clearer view */}
              <img 
                src={t.symbol.imagePath} 
                alt={t.symbol.en}
                className="w-72 h-72 object-contain opacity-0 group-hover:opacity-70 transition-all duration-1000 translate-y-20 group-hover:-translate-y-4 scale-75 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
              />
            </div>

            {/* CONTENT LAYER */}
            <div className="relative z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <span className="text-6xl font-black text-gray-200 dark:text-white/5 italic block mb-2 group-hover:text-orange-500/20 transition-colors">
                {t.id < 10 ? `0${t.id}` : t.id}
              </span>

              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 drop-shadow-md">
                {t.name[l]}
              </h2>
              
              <div className="space-y-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                 <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-300 uppercase tracking-[0.2em] font-bold">
                    <Sparkles size={14} className="text-orange-500" />
                    <span>{t.symbol[l]}</span>
                 </div>
                 <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-300 uppercase tracking-[0.2em] font-bold">
                    <MapPin size={14} className="text-orange-500" />
                    <span>{t.placeOfNirvana[l]}</span>
                 </div>
              </div>
            </div>

            {/* Subtle Bottom Glow */}
            <div 
              className="absolute bottom-0 left-0 w-full h-2 opacity-0 group-hover:opacity-100 transition-opacity z-20"
              style={{ 
                background: `linear-gradient(90deg, transparent, ${t.colorHex}, transparent)` 
              }}
            ></div>
          </Link>
        ))}
      </div>
    </div>
  );
}