"use client"; // <--- 1. This makes useState work
import Link from "next/link";
import { Search, Sparkles, BookOpen, Users, ArrowRight, Ghost, Clock } from "lucide-react";
import { useState, use } from "react"; // <--- 2. Import 'use' to handle the new params

export default function Home({ params }: { params: Promise<{ lang: string }> }) {
  // 3. This 'use()' hook unwraps the params Promise safely
  const { lang } = use(params); 
  
  const [searchQuery, setSearchQuery] = useState("");

  // Content Logic
  const title = lang === 'hi' ? "ज्ञान का मार्ग" : "The Path of Wisdom";
  const subtitle = lang === 'hi' 
    ? "अहिंसा, सत्य और कर्म के प्राचीन जैन सिद्धांतों का अन्वेषण करें।" 
    : "Explore the ancient Jain principles of non-violence, truth, and karma.";

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-20">
      
      {/* Badge */}
      <div className="mb-6 px-4 py-1.5 rounded-full bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 text-sm font-medium border border-orange-100 dark:border-orange-800/50">
        Digital Aagam Alpha 1.0
      </div>

      {/* Title */}
      <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-br from-gray-900 to-gray-500 dark:from-white dark:to-gray-500 mb-6 uppercase tracking-tighter">
        {title}
      </h1>
      
      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl text-center mb-10">
        {subtitle}
      </p>

      {/* Search Bar */}
      <div className="relative w-full max-w-xl">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-11 pr-4 py-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xl shadow-gray-200/50 dark:shadow-none focus:ring-2 focus:ring-orange-500 outline-none transition-all"
          placeholder={lang === 'hi' ? "खोजें..." : "Search for a concept..."}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Quick Links Grid - Expanded to 3 columns on desktop */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        
        {/* Card 1: Namokar Mantra */}
        <Link 
          href={`/${lang}/learn/namokar-mantra`}
          className="group flex flex-col p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl hover:border-orange-500 dark:hover:border-orange-500 transition-all shadow-sm hover:shadow-xl"
        >
          <div className="h-12 w-12 rounded-2xl bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Sparkles size={24} />
          </div>
          <div className="text-left">
            <h3 className="font-bold text-gray-900 dark:text-white uppercase tracking-tight">Namokar Mantra</h3>
            <p className="text-sm text-gray-500">{lang === 'hi' ? "अनादि मंत्र" : "The Eternal Prayer"}</p>
          </div>
          <div className="mt-4 flex items-center text-[10px] font-bold text-orange-500 tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
            EXPLORE <ArrowRight size={12} className="ml-1" />
          </div>
        </Link>

        {/* Card 2: 24 Tirthankara Gallery */}
        <Link 
          href={`/${lang}/tirthankars`}
          className="group flex flex-col p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl hover:border-rose-500 dark:hover:border-rose-500 transition-all shadow-sm hover:shadow-xl"
        >
          {/* Icon Box - ROSE Color */}
          <div className="h-12 w-12 rounded-2xl bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Users size={24} />
          </div>
          
          {/* Text Content */}
          <div className="text-left">
            <h3 className="font-bold text-gray-900 dark:text-white uppercase tracking-tight">24 Tirthankaras</h3>
            <p className="text-sm text-gray-500">{lang === 'hi' ? "तीर्थंकर दर्शन" : "Sacred Gallery"}</p>
          </div>

          {/* Hover Text - ROSE Color */}
          <div className="mt-4 flex items-center text-[10px] font-bold text-rose-500 tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
            EXPLORE <ArrowRight size={12} className="ml-1" />
          </div>
        </Link>

        {/* Card 3: Ahimsa
        <Link 
          href={`/${lang}/learn/ahimsa`}
          className="group flex flex-col p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl hover:border-orange-500 dark:hover:border-orange-500 transition-all shadow-sm hover:shadow-xl"
        >
          <div className="h-12 w-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <BookOpen size={24} />
          </div>
          <div className="text-left">
            <h3 className="font-bold text-gray-900 dark:text-white uppercase tracking-tight">Ahimsa</h3>
            <p className="text-sm text-gray-500">{lang === 'hi' ? "परमो धर्म:" : "Non-Violence"}</p>
          </div>
        </Link> */}

        {/* Card 3: Kalchakra (Wheel of Time) */}
        <Link 
          href={`/${lang}/learn/kalchakra`}
          className="group flex flex-col p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl hover:border-green-500 dark:hover:border-green-500 transition-all shadow-sm hover:shadow-xl"
        >
          <div className="h-12 w-12 rounded-2xl bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            {/* Make sure you imported Clock from lucide-react */}
            <Clock size={24} />
          </div>
          <div className="text-left">
            <h3 className="font-bold text-gray-900 dark:text-white uppercase tracking-tight">The Wheel of Time</h3>
            <p className="text-sm text-gray-500">
              {lang === 'hi' ? "कालचक्र का रहस्य" : "The Cosmic Cycle"}
            </p>
          </div>
          <div className="mt-4 flex items-center text-[10px] font-bold text-green-500 tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
            EXPLORE <ArrowRight size={12} className="ml-1" />
          </div>
        </Link>

        {/* Card 4: Soul & Karma */}
        <Link 
          href={`/${lang}/learn/soul-karma`}
          className="group flex flex-col p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl hover:border-purple-500 dark:hover:border-purple-500 transition-all shadow-sm hover:shadow-xl"
        >
          <div className="h-12 w-12 rounded-2xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            {/* Make sure you imported Ghost from lucide-react */}
            <Ghost size={24} />
          </div>
          <div className="text-left">
            <h3 className="font-bold text-gray-900 dark:text-white uppercase tracking-tight">Soul & Karma</h3>
            <p className="text-sm text-gray-500">
              {lang === 'hi' ? "आत्मा और कर्म का विज्ञान" : "The Physics of the Soul"}
            </p>
          </div>
          <div className="mt-4 flex items-center text-[10px] font-bold text-purple-500 tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
            EXPLORE <ArrowRight size={12} className="ml-1" />
          </div>
        </Link>
      </div>
    </div>
  );
}