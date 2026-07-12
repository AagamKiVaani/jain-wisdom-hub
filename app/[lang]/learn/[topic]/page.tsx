import { jainTopics } from "@/lib/namokar-data";
import { notFound } from "next/navigation";
import TopicClient from "./TopicClient";

export default async function TopicPage({ params }: { params: Promise<{ lang: string; topic: string }> }) {
  const { lang, topic } = await params;
  const data = jainTopics[topic];
  if (!data) return notFound();
  
  // Resolve correct language code (defaulting to english if not hindi or kannada)
  const l = (lang === "hi" || lang === "kn") ? lang : "en";

  return <TopicClient data={data} lang={lang} l={l} />;
}