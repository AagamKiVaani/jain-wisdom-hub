// app/[lang]/[...rest]/page.tsx
import { notFound } from "next/navigation";

export default function CatchAllPage() {
  // This triggers the not-found.tsx inside app/[lang]/
  notFound();
}