"use client"; // 👈 This enables State and Interactivity

import { useState } from "react";
import { Bell } from "lucide-react";
import NotificationModal from "./NotificationModal"; // Adjust path if needed

export default function NotificationFAB() {
  const [showNotify, setShowNotify] = useState(false);

  return (
    <>
      {/* 1. The Floating Button (Fixed Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-[90]">
        <button
          onClick={() => setShowNotify(true)}
          className="relative group bg-rose-600 hover:bg-rose-700 text-white p-4 rounded-full shadow-[0_4px_14px_0_rgba(225,29,72,0.39)] transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center"
          aria-label="Notification Settings"
        >
          <Bell className="w-6 h-6" />
          
          {/* Pulse Ring (Optional: remove if distracting) */}
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
          </span>
        </button>
      </div>

      {/* 2. The Modal (Hidden until clicked) */}
      <NotificationModal 
        isOpen={showNotify} 
        onClose={() => setShowNotify(false)} 
      />
    </>
  );
}