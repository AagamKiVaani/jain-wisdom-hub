"use client"; // <--- 1. This makes useState work

import { Search, Sparkles, BookOpen } from "lucide-react";
import { useState, use } from "react"; // <--- 2. Import 'use' to handle the new params

export default function Home({ params }: { params: Promise<{ lang: string }> }) {
  // 3. This 'use()' hook unwraps the params Promise safely
  const { lang } = use(params); 
  
  const [searchQuery, setSearchQuery] = useState("");

  // Content Logic
  const title = lang === 'hi' ? "ज्ञान का मार्ग" : "The Path of Wisdom";
  const subtitle = "Explore the ancient Jain principles of non-violence, truth, and karma.";

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      
      {/* Badge */}
      <div className="mb-6 px-4 py-1.5 rounded-full bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 text-sm font-medium border border-orange-100 dark:border-orange-800/50">
        Digital Aagam Alpha 1.0
      </div>

      {/* Title */}
      <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-br from-gray-900 to-gray-500 dark:from-white dark:to-gray-500 mb-6">
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
          placeholder="Search for a concept..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Quick Links */}
      <div className="mt-12 flex gap-4 text-sm text-gray-500">
        <span className="flex items-center gap-2"><Sparkles size={16}/> Namokar Mantra</span>
        <span className="flex items-center gap-2"><BookOpen size={16}/> Ahimsa</span>
      </div>

    </div>
  );
}