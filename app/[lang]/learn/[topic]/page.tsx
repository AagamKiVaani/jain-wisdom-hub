import { jainTopics } from "@/lib/jain-data";
import { notFound } from "next/navigation";
import { ArrowLeft, PlayCircle, Share2 } from "lucide-react";
import Link from "next/link";

export default async function TopicPage({
  params,
}: {
  params: Promise<{ lang: string; topic: string }>;
}) {
  const { lang, topic } = await params;
  const data = jainTopics[topic];

  if (!data) return notFound();

  // Helper to pick language safely
  const l = (lang === "hi" || lang === "kn") ? lang : "en";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      
      {/* 1. HERO SECTION (The "Cinematic" Top Part) */}
      <div className="relative bg-gradient-to-b from-orange-50 to-white dark:from-orange-950/30 dark:to-black py-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link href={`/${lang}`} className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-orange-600 mb-8 transition-colors">
            <ArrowLeft size={16} className="mr-2" />
            Back to Library
          </Link>

          {/* Title & Subtitle */}
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
            {data.title[l]}
          </h1>
          <p className="text-xl text-orange-600 dark:text-orange-400 font-medium">
            {data.subtitle[l]}
          </p>

          {/* Action Buttons (Visual only for now) */}
          <div className="flex gap-4 mt-8">
            <button className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-full font-medium transition-all shadow-lg shadow-orange-600/20">
              <PlayCircle size={20} />
              Listen Mantra
            </button>
            <button className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 px-6 py-3 rounded-full font-medium transition-all">
              <Share2 size={20} />
              Share
            </button>
          </div>
        </div>
      </div>

      {/* 2. CONTENT SECTIONS */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        
        {/* Video Placeholder */}
        <div className="aspect-video w-full bg-gray-100 dark:bg-gray-900 rounded-2xl mb-16 flex flex-col items-center justify-center border border-gray-200 dark:border-gray-800 shadow-sm">
             <PlayCircle className="w-16 h-16 text-gray-300 dark:text-gray-700 mb-4" />
             <span className="text-gray-400 font-medium">Video Experience Coming Soon</span>
        </div>

        {/* Dynamic Sections Loop */}
        <div className="space-y-12">
          {data.sections.map((section, index) => (
            <div key={index} className="relative pl-8 md:pl-0">
              
              {/* Decorative Line on Left (Cinematic touch) */}
              <div className="absolute left-0 top-2 bottom-2 w-1 bg-orange-200 dark:bg-orange-900 md:hidden rounded-full"></div>

              {/* Section Heading */}
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                <span className="hidden md:flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400 text-sm font-bold">
                  {index + 1}
                </span>
                {section.heading[l]}
              </h2>

              {/* Section Text */}
              <div className={`text-lg leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-line p-6 rounded-2xl ${
                  index === 0 ? "bg-orange-50/50 dark:bg-orange-900/10 font-serif text-xl italic" : ""
              }`}>
                {section.text[l]}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}