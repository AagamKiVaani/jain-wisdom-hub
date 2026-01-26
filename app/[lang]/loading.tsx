// app/[lang]/loading.tsx
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-black z-50">
      <div className="relative">
        {/* Glowing Orb */}
        <div className="absolute inset-0 bg-orange-500/20 blur-xl rounded-full animate-pulse"></div>
        
        {/* Spinner */}
        <Loader2 size={48} className="text-orange-500 animate-spin relative z-10" />
      </div>
      
      <p className="mt-8 text-xs font-bold uppercase tracking-[0.3em] text-zinc-400 animate-pulse">
        Initializing Wisdom...
      </p>
    </div>
  );
}