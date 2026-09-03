// Sound & Haptics Engine for Jain Wisdom Hub

let cachedAudio: HTMLAudioElement | null = null;

export const playTapSound = () => {
  if (typeof window === "undefined") return;

  // 1. Crisp physical haptic feedback on mobile phones
  if ("vibrate" in navigator) {
    try {
      navigator.vibrate(12);
    } catch (e) {}
  }

  // 2. Immediate audio click playback with pre-warmed audio instance
  try {
    if (!cachedAudio) {
      cachedAudio = new Audio("/sounds/resources/click2.mp3");
      cachedAudio.volume = 0.45;
    }
    cachedAudio.currentTime = 0;
    cachedAudio.play().catch(() => {
      // Fallback in case of restricted playback
      const fallback = new Audio("/sounds/resources/click2.mp3");
      fallback.volume = 0.45;
      fallback.play().catch(() => {});
    });
  } catch (e) {}
};

export default playTapSound;
