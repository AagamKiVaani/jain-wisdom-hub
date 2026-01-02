"use client"; // <--- This magic line makes it work

import { useEffect } from "react";

export default function LocaleSync({ lang }: { lang: string }) {
  useEffect(() => {
    // Save language preference silently
    document.cookie = `NEXT_LOCALE=${lang}; path=/; max-age=31536000; SameSite=Lax`;
  }, [lang]);

  return null; // It renders nothing visually
}