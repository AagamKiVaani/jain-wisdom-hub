//GobalShare.tsx
'use client';

import { Share2, Check } from "lucide-react";
import { useState } from "react";

export default function GlobalShare() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    // 🟢 DYNAMIC DATA: Grabs the actual metadata of the current page
    const url = window.location.href;
    const title = document.title || "Jain Wisdom Hub"; 
    const text = `Check out this page about ${document.title} on Digital Aagam.`;

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch (err) {
        console.log("Share cancelled", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy", err);
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      aria-label="Share Page"
      className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative group"
    >
      <div className="relative">
        <Share2 
            size={20} 
            className={`transition-all duration-300 ${copied ? 'scale-0' : 'scale-100'} text-gray-700 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400`} 
        />
        <Check 
            size={20} 
            className={`absolute top-0 left-0 text-green-500 transition-all duration-300 ${copied ? 'scale-100' : 'scale-0'}`} 
        />
      </div>
    </button>
  );
}