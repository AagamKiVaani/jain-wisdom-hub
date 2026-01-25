// app/[lang]/coming-soon/page.tsx
'use client';

// 🟢 1. Import 'use'
import React, { use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Lock, Youtube } from 'lucide-react';

// 🟢 2. Update Type: params is now a Promise
export default function ComingSoon({ params }: { params: Promise<{ lang: string }> }) {
  
  // 🟢 3. Unwrap the params using the use() hook
  const { lang } = use(params);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-white dark:bg-black overflow-hidden px-4">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-rose-500/5 dark:bg-rose-900/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 text-center max-w-lg mx-auto">
        
        {/* Lock Icon Animation */}
        <div className="mb-8 flex justify-center">
           <div className="h-24 w-24 rounded-3xl bg-rose-50 dark:bg-white/5 border border-rose-100 dark:border-white/10 flex items-center justify-center shadow-2xl animate-pulse">
              <Lock size={40} className="text-rose-500 dark:text-rose-400" />
           </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter">
          Coming Soon
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 leading-relaxed font-serif">
          The ancient scriptures for this section are currently being digitized. 
          We are decoding them one by one.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href="https://youtube.com/@AagamKiVaani" 
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-full font-bold tracking-wide transition-all shadow-lg shadow-red-600/20 flex items-center justify-center gap-2"
          >
            <Youtube size={20} />
            GET NOTIFIED
          </a>
          
          <Link 
            href={`/${lang}`}
            className="w-full sm:w-auto px-8 py-3.5 border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 text-gray-900 dark:text-white rounded-full font-bold tracking-wide transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft size={20} />
            RETURN HOME
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 dark:border-white/5">
            <p className="text-xs text-gray-400 uppercase tracking-widest">Expected Release: Next Update</p>
        </div>
      </div>
    </div>
  );
}