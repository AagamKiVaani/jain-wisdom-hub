'use client';
import { useEffect, useState, useRef } from 'react';

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  
  // Timers refs to clear them if user navigates away or dismisses
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Helper function to get fresh eligibility status instead of checking only on mount
  const checkEligibility = () => {
    // A. Is it already installed/running as an app?
    if (window.matchMedia('(display-mode: standalone)').matches) return false;

    // B. Did user already install it previously?
    if (localStorage.getItem('jw-app-installed') === 'true') return false;

    // C. Did user click "Later" recently? (24 Hour Cooldown)
    const lastDismissed = localStorage.getItem('jw-install-dismissed');
    if (lastDismissed) {
      const timeSinceDismiss = Date.now() - parseInt(lastDismissed, 10);
      const cooldownTime = 24 * 60 * 60 * 1000; // Changed to 24 Hours for better UX
      if (timeSinceDismiss < cooldownTime) return false; 
    }

    return true;
  };

  useEffect(() => {
    // If they aren't eligible right now, don't even bother setting up listeners
    if (!checkEligibility()) return;

    // 🕵️ DETECT PLATFORM
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);

    if (isIosDevice) {
      // iOS Logic: Wait 24 seconds, check eligibility ONE MORE TIME, then show
      timerRef.current = setTimeout(() => {
        if (checkEligibility()) setIsIOS(true);
      }, 24000);
    } else {
      // Android/Desktop Logic: Listen for browser event
      const handleBeforeInstallPrompt = (e: any) => {
        e.preventDefault();
        setDeferredPrompt(e);
        
        // CLEAR any existing timeouts so we don't queue up multiple popups
        if (timerRef.current) clearTimeout(timerRef.current);

        // Wait 20 seconds, check eligibility with FRESH data, then show
        timerRef.current = setTimeout(() => {
          if (checkEligibility()) setIsVisible(true);
        }, 20000); 
      };

      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      
      // Listen for successful install (to stop showing it forever)
      const handleAppInstalled = () => {
        localStorage.setItem('jw-app-installed', 'true');
        setIsVisible(false);
        setDeferredPrompt(null);
        if (timerRef.current) clearTimeout(timerRef.current);
      };
      
      window.addEventListener('appinstalled', handleAppInstalled);

      return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        window.removeEventListener('appinstalled', handleAppInstalled);
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      // User accepted! Mark as installed.
      localStorage.setItem('jw-app-installed', 'true');
      setIsVisible(false);
    } else {
      // User cancelled native prompt. Treat as "Later"
      handleDismiss();
    }
    
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    // Save current time so we don't bother them for 24 hours
    localStorage.setItem('jw-install-dismissed', Date.now().toString());
    setIsVisible(false);
    setIsIOS(false);
    
    // CRITICAL: Kill any pending timeouts so it doesn't pop back up in 2 seconds
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  if (!isVisible && !isIOS) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col gap-3 z-[100] animate-in fade-in slide-in-from-bottom-4">
      <div className="flex items-center gap-3">
        <span className="text-2xl">📲</span>
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 dark:text-white">Install Jain Wisdom</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {isIOS 
              ? "Get better performance and full-screen experience." 
              : "Install the app for offline access and notifications!"}
          </p>
        </div>
        
        {/* Close Button (Triggers Cooldown) */}
        <button 
            onClick={handleDismiss}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        >
            ✕
        </button>
      </div>

      {isIOS ? (
        // iOS Instructions
        <div className="flex flex-col gap-2">
            <div className="text-sm bg-gray-100 dark:bg-gray-900 p-3 rounded-lg text-gray-600 dark:text-gray-300">
            To install: Tap <span className="font-bold">Share</span> <span className="text-lg">⎋</span> and select <span className="font-bold">"Add to Home Screen" ➕</span>
            </div>
            <button 
                onClick={handleDismiss}
                className="w-full py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
                Dismiss
            </button>
        </div>
      ) : (
        // Android/Chrome Button
        <div className="flex gap-2">
            <button 
                onClick={handleInstallClick}
                className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
                Install Now
            </button>
            <button 
                onClick={handleDismiss}
                className="px-4 py-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
                Later
            </button>
        </div>
      )}
    </div>
  );
}