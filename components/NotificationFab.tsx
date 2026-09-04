"use client";

import { useState } from "react";
import { Bell } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import NotificationModal from "./NotificationModal";

export default function NotificationFAB() {
  const [showNotify, setShowNotify] = useState(false);
  const pathname = usePathname();

  // The notification orb should only be present on the homescreen
  const isHomePage = /^\/(en|hi|kn)?\/?$/.test(pathname || "");

  return (
    <>
      {/* 1. The Floating Button (Fixed Bottom Right - Homescreen Only) */}
      <AnimatePresence>
        {isHomePage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-6 right-6 z-[90]"
          >
            <button
              onClick={() => setShowNotify(true)}
              className="relative group bg-rose-600 hover:bg-rose-700 text-white p-3 rounded-full shadow-[0_4px_14px_0_rgba(225,29,72,0.39)] transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center cursor-pointer"
              aria-label="Notification Settings"
            >
              <Bell className="w-6 h-6" />
              
              {/* Pulse Ring */}
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. The Modal (Hidden until clicked) */}
      <NotificationModal 
        isOpen={showNotify} 
        onClose={() => setShowNotify(false)} 
      />
    </>
  );
}