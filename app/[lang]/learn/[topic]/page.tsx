// app/[lang]/learn/[topic]/page.tsx
import { jainTopics } from "@/lib/jain-data";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

// This function generates the content
export default async function TopicPage({
  params,
}: {
  params: Promise<{ lang: string; topic: string }>;
}) {
  // 1. Unwrap the params (Next.js 15 requirement)
  const { lang, topic } = await params;

  // 2. Find the topic in our "Brain"
  const data = jainTopics[topic];

  // 3. If topic doesn't exist, show 404 Error
  if (!data) {
    return notFound();
  }

  // 4. Select the correct language text
  // We force 'en' as fallback if the language isn't found
  const language = (lang === "hi" || lang === "kn") ? lang : "en";
  
  const title = data.title[language];
  const content = data.content[language];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      
      {/* Back Button */}
      <Link 
        href={`/${lang}`} 
        className="inline-flex items-center text-sm text-gray-500 hover:text-orange-500 mb-8 transition-colors"
      >
        <ArrowLeft size={16} className="mr-2" />
        Back to Library
      </Link>

      {/* Main Content Card */}
      <article className="prose dark:prose-invert lg:prose-xl mx-auto">
        
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
          {title}
        </h1>
        
        {/* Video Placeholder */}
        <div className="aspect-video w-full bg-gray-100 dark:bg-gray-800 rounded-2xl mb-10 flex items-center justify-center border border-gray-200 dark:border-gray-700">
             <span className="text-gray-400">Video Player will go here</span>
        </div>

        {/* Text Content */}
        <div className="text-xl leading-relaxed text-gray-700 dark:text-gray-300">
          {content}
        </div>

      </article>
    </div>
  );
}