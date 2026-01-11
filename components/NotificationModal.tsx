"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, Check, Loader2, Globe } from "lucide-react";

// --- UTILITY: Convert VAPID key ---
function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

type Lang = "en" | "hi" | "kn";

export default function NotificationModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"form" | "success">("form");
  const [userName, setUserName] = useState("");

  // Granular State
  const [quote, setQuote] = useState<{ enabled: boolean; lang: Lang }>({ enabled: true, lang: "hi" });
  const [tithi, setTithi] = useState<{ enabled: boolean; lang: Lang }>({ enabled: true, lang: "hi" });
  const [updates, setUpdates] = useState<{ enabled: boolean; lang: Lang }>({ enabled: true, lang: "en" });

  // ✅ SMART LOAD: LocalStorage -> Fallback to API
  useEffect(() => {
    const loadPreferences = async () => {
      // 1. Try LocalStorage First (Fastest)
      const saved = localStorage.getItem("jain_notification_prefs");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.name) setUserName(parsed.name);
          if (parsed.preferences) {
            if (parsed.preferences.dailyQuote) setQuote(parsed.preferences.dailyQuote);
            if (parsed.preferences.tithi) setTithi(parsed.preferences.tithi);
            if (parsed.preferences.updates) setUpdates(parsed.preferences.updates);
          }
          return; // Found data, stop here.
        } catch (e) {
          console.error("Parse error", e);
        }
      }

      // 2. Fallback: Check Database (If user cleared cache but is still subscribed)
      try {
        const registration = await navigator.serviceWorker.ready;
        const sub = await registration.pushManager.getSubscription();

        if (sub && sub.endpoint) {
          // We have a subscription ID! Let's ask the DB.
          const res = await fetch(`/api/subscribe?endpoint=${encodeURIComponent(sub.endpoint)}`);
          if (res.ok) {
            const data = await res.json();
            
            // Restore from DB
            if (data.name) setUserName(data.name);
            if (data.preferences) {
              setQuote(data.preferences.dailyQuote);
              setTithi(data.preferences.tithi);
              setUpdates(data.preferences.updates);
              
              // Refill LocalStorage so we don't ask DB next time
              localStorage.setItem("jain_notification_prefs", JSON.stringify(data));
            }
          }
        }
      } catch (err) {
        console.log("No existing subscription found or offline.");
      }
    };

    loadPreferences();
  }, [isOpen]);

  // ✅ FIX 2: STRONG SCROLL LOCK (Mobile Friendly)
  useEffect(() => {
    if (isOpen) {
      // 1. Lock both HTML and Body
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      document.body.style.height = "100%"; // Ensures lock works on iOS
    } else {
      // 2. Unlock everything
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.height = "";
    }

    // Cleanup ensures we don't leave the site locked if component crashes
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.height = "";
    };
  }, [isOpen]);

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const registration = await navigator.serviceWorker.ready;
      
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!),
      });

      const payload = {
        subscription: sub,
        name: userName,
        language: "en",
        preferences: {
          dailyQuote: quote,
          tithi: tithi,
          updates: updates,
        },
      };

      // 1. Send to Server (Database)
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // 2. Save to Local Storage (Browser Memory)
      // This ensures that when they refresh, the data persists visually.
      localStorage.setItem("jain_notification_prefs", JSON.stringify({
        name: userName,
        preferences: payload.preferences
      }));

      setStep("success");
      setTimeout(() => {
        onClose();
        setStep("form");
      }, 3000);

    } catch (error) {
      console.error("Subscription failed:", error);
      alert("Please allow notifications in your browser settings first!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-2xl border border-white/10 overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            {step === "form" ? (
              <>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <Bell className="w-5 h-5 text-rose-500 fill-rose-500" /> 
                      Stay Connected
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">Customize your spiritual updates.</p>
                  </div>
                  <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="mb-6">
                   <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">Your Name (Optional)</label>
                   <input 
                      type="text" 
                      placeholder="e.g. Veer" 
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-rose-500 transition-colors"
                   />
                </div>

                <div className="space-y-4 mb-8">
                  <PreferenceRow 
                    label="🌅 Daily Wisdom" 
                    desc="Start the day with a Sutra."
                    state={quote} setState={setQuote} 
                  />
                  <PreferenceRow 
                    label="📅 Tithi & Parva" 
                    desc="Reminders for Ashtami/Chaudas."
                    state={tithi} setState={setTithi} 
                  />
                  <PreferenceRow 
                    label="✨ App Updates" 
                    desc="New features & stories."
                    state={updates} setState={setUpdates} 
                  />
                </div>

                <button
                  onClick={handleSubscribe}
                  disabled={loading}
                  className="w-full py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold tracking-wide transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="animate-spin w-5 h-5"/> : "Save Preferences"}
                </button>
              </>
            ) : (
              <div className="py-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4 text-green-600 dark:text-green-400">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">You're all set!</h3>
                <p className="text-gray-500 mt-2">Notifications enabled successfully.</p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// (The PreferenceRow component stays exactly the same as before, no changes needed there)
function PreferenceRow({ label, desc, state, setState }: any) {
  return (
    <div className={`p-3 rounded-xl border transition-all ${state.enabled ? 'bg-rose-50/50 dark:bg-rose-900/10 border-rose-200 dark:border-rose-900/30' : 'bg-transparent border-gray-100 dark:border-zinc-800 opacity-60'}`}>
      <div className="flex items-center justify-between mb-2">
        <div>
          <h4 className="font-bold text-sm text-gray-900 dark:text-gray-200">{label}</h4>
          <p className="text-[10px] text-gray-500">{desc}</p>
        </div>
        
        <button 
          onClick={() => setState({ ...state, enabled: !state.enabled })}
          className={`w-10 h-6 rounded-full p-1 transition-colors duration-300 ${state.enabled ? 'bg-rose-500' : 'bg-gray-300 dark:bg-zinc-700'}`}
        >
          <div className={`w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-300 ${state.enabled ? 'translate-x-4' : 'translate-x-0'}`} />
        </button>
      </div>

      <AnimatePresence>
        {state.enabled && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: "auto", opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="flex items-center gap-2 mt-2 pt-2 border-t border-rose-100 dark:border-white/5">
              <Globe className="w-3 h-3 text-rose-500" />
              <span className="text-[10px] font-bold uppercase text-gray-500">Receive in:</span>
              <div className="flex gap-1">
                {['en', 'hi', 'kn'].map((l) => (
                  <button
                    key={l}
                    onClick={() => setState({ ...state, lang: l })}
                    className={`text-[10px] px-2 py-0.5 rounded border transition-colors ${state.lang === l ? 'bg-rose-500 text-white border-rose-500' : 'bg-white dark:bg-black text-gray-500 border-gray-200 dark:border-zinc-700'}`}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}