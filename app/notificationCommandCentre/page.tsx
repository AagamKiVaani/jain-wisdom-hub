"use client";

import { useState, useEffect } from "react";
import { Loader2, Send, ShieldAlert, Sparkles, Lock, Link as LinkIcon, Image as ImageIcon, Calendar, Bell, User } from "lucide-react";

// Types for our modes
type Mode = "single" | "dailyQuote" | "tithi" | "updates";

// ⚙️ CONFIGURATION: Set your Defaults here!
const DEFAULTS = {
  single: {
    title: "{{name}}", 
    image: "/images/single-placeholder.jpg" 
  },
  dailyQuote: {
    title: "Suprabhatam ☀️ {{name}}",
    image: "/images/daily-wisdom.jpg"
  },
  tithi: {
    title: "Jai Jinendra, {{name}}! 📅",
    image: "/images/tithi-default.jpg"
  },
  updates: {
    title: "Jai Jinendra, {{name}}! 🔔",
    image: "/images/update-default.jpg"
  }
};

export default function AdminPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  
  // 1. New Mode State
  const [mode, setMode] = useState<Mode>("single");

  // Common State
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState(""); // Title is dynamic based on mode usually
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("/");

  // Single Mode Specifics
  const [singleCategory, setSingleCategory] = useState("dailyQuote");
  const [singleLanguage, setSingleLanguage] = useState("hi");
  const [singleMessage, setSingleMessage] = useState("");

  // Broadcast Mode Specifics (Trilingual)
  const [msgEn, setMsgEn] = useState("");
  const [msgHi, setMsgHi] = useState("");
  const [msgKn, setMsgKn] = useState("");

  // ⚡ EFFECT: Auto-fill fields when Mode changes
  useEffect(() => {
    const def = DEFAULTS[mode];
    setTitle(def.title);
    setImage(def.image);
    // Reset status on mode switch for a clean slate
    setStatus(""); 
  }, [mode]);

  // Helper to get visual theme based on mode
  const getTheme = () => {
    switch (mode) {
      case "dailyQuote": return "from-orange-400 via-rose-500 to-purple-500";
      case "tithi": return "from-red-500 via-pink-600 to-rose-500";
      case "updates": return "from-blue-400 via-cyan-500 to-teal-400";
      default: return "bg-gray-800 dark:bg-zinc-700"; // Single mode
    }
  };

  const getIcon = () => {
    switch (mode) {
      case "dailyQuote": return <Sparkles className="w-5 h-5 text-orange-500" />;
      case "tithi": return <Calendar className="w-5 h-5 text-rose-500" />;
      case "updates": return <Bell className="w-5 h-5 text-blue-500" />;
      default: return <User className="w-5 h-5 text-gray-500" />;
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      if (mode === "single") {
        // Send 1 Notification
        await sendNotification(singleLanguage, singleMessage, singleCategory);
        setStatus(`✅ Sent single ${singleCategory} notification!`);
      } 
      else {
        // Broadcast Mode: Send 3 Notifications (En, Hi, Kn) for the SELECTED category
        const promises = [];
        
        // The 'mode' string matches the category name in DB exactly (dailyQuote, tithi, updates)
        const categoryToBlast = mode; 

        if (msgEn) promises.push(sendNotification("en", msgEn, categoryToBlast));
        if (msgHi) promises.push(sendNotification("hi", msgHi, categoryToBlast));
        if (msgKn) promises.push(sendNotification("kn", msgKn, categoryToBlast));

        if (promises.length === 0) throw new Error("Please fill at least one message.");
        
        await Promise.all(promises);
        setStatus(`✅ Sent Trilingual Blast for ${mode}!`);
      }
    } catch (err: any) {
      setStatus(`❌ Error: ${err.message || "Failed"}`);
    } finally {
      setLoading(false);
    }
  };

  const sendNotification = async (lang: string, msgBody: string, cat: string) => {
    const res = await fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password,
        title: title || getDefaultTitle(mode, lang), // Use default title if empty
        message: msgBody,
        image,
        category: cat,
        language: lang,
        url
      }),
    });
    if (!res.ok) throw new Error("Server rejected request");
    return res.json();
  };

  // Helper to auto-fill titles if you are lazy
  const getDefaultTitle = (m: Mode, lang: string) => {
    if (m === "tithi") return lang === "hi" ? "📅 जैन पर्व सूचना" : "📅 Jain Festival Alert";
    if (m === "updates") return "🔔 New Update";
    return "Suprabhatam 🌅";
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black p-4 md:p-6 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-zinc-800 overflow-hidden relative">
        
        {/* Dynamic Top Bar */}
        <div className={`h-2 w-full ${mode === 'single' ? getTheme() : `bg-gradient-to-r ${getTheme()}`}`} />

        {/* Header */}
        <div className="px-6 pt-6 pb-4">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <ShieldAlert className="text-gray-400 w-5 h-5" />
              Command Center
            </h1>
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-zinc-800 px-3 py-1.5 rounded-full border border-gray-200 dark:border-zinc-700">
              {getIcon()}
              <span className="text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">
                {mode === "dailyQuote" ? "Daily Wisdom" : mode === "single" ? "Single User" : mode.toUpperCase()}
              </span>
            </div>
          </div>
          
          {/* Mode Selector (Tabs) */}
          <div className="grid grid-cols-4 gap-2 p-1 bg-gray-100 dark:bg-zinc-800/50 rounded-xl mb-4">
             {/* 1. Single */}
             <button onClick={() => setMode("single")} className={`py-2 rounded-lg text-xs font-bold transition-all ${mode === "single" ? "bg-white dark:bg-zinc-700 shadow-sm" : "text-gray-400 hover:text-gray-600"}`}>Single</button>
             
             {/* 2. Daily */}
             <button onClick={() => setMode("dailyQuote")} className={`py-2 rounded-lg text-xs font-bold transition-all ${mode === "dailyQuote" ? "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400" : "text-gray-400 hover:text-orange-500"}`}>Daily</button>
             
             {/* 3. Tithi */}
             <button onClick={() => setMode("tithi")} className={`py-2 rounded-lg text-xs font-bold transition-all ${mode === "tithi" ? "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400" : "text-gray-400 hover:text-rose-500"}`}>Tithi</button>
             
             {/* 4. Updates */}
             <button onClick={() => setMode("updates")} className={`py-2 rounded-lg text-xs font-bold transition-all ${mode === "updates" ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" : "text-gray-400 hover:text-blue-500"}`}>Update</button>
          </div>
        </div>

        <form onSubmit={handleSend} className="px-6 pb-8 space-y-5">
          
          {/* 1. Security (Compact) */}
          <div className="relative group">
            <Lock className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
            <input 
              type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 rounded-xl outline-none focus:border-gray-400 transition-all text-sm"
              placeholder="Admin Password"
            />
          </div>

          {/* 2. Title (Optional now) */}
          <div>
            <input 
              type="text" value={title} onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl outline-none focus:ring-1 focus:ring-gray-300 transition-all font-medium text-gray-900 dark:text-white placeholder:text-gray-400 text-base"
              placeholder={mode === 'single' ? "Custom Title..." : "Title (Leave empty for default)"}
            />
          </div>

          {/* --- SINGLE MODE UI --- */}
          {mode === "single" && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex gap-3">
                 <div className="flex-1">
                   <select value={singleCategory} onChange={(e) => setSingleCategory(e.target.value)} className="w-full px-3 py-3 bg-gray-50 dark:bg-zinc-800 border-none rounded-xl text-sm outline-none">
                     <option value="dailyQuote">Daily Quote</option>
                     <option value="tithi">Tithi</option>
                     <option value="updates">Updates</option>
                   </select>
                 </div>
                 <div className="w-1/3">
                   <select value={singleLanguage} onChange={(e) => setSingleLanguage(e.target.value)} className="w-full px-3 py-3 bg-gray-50 dark:bg-zinc-800 border-none rounded-xl text-sm outline-none">
                     <option value="hi">Hindi</option>
                     <option value="en">English</option>
                     <option value="kn">Kannada</option>
                   </select>
                 </div>
              </div>
              <textarea 
                required value={singleMessage} onChange={(e) => setSingleMessage(e.target.value)}
                className="w-full p-4 bg-gray-50 dark:bg-zinc-800 border-none rounded-xl text-base outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-zinc-700 min-h-[120px] resize-none"
                placeholder="Type single message..."
              />
            </div>
          )}

          {/* --- BROADCAST MODE UI (Trilingual) --- */}
          {mode !== "single" && (
            <div className="space-y-3 animate-in fade-in slide-in-from-right-2 duration-300">
               {/* English */}
               <div className="flex gap-2">
                  <div className="w-1.5 bg-rose-500 rounded-full my-1 opacity-50"></div>
                  <textarea 
                    value={msgEn} onChange={(e) => setMsgEn(e.target.value)}
                    className="flex-1 p-3 bg-gray-50 dark:bg-zinc-800 rounded-xl text-sm outline-none resize-none h-20 placeholder:text-gray-400"
                    placeholder="English Message..."
                  />
               </div>
               {/* Hindi */}
               <div className="flex gap-2">
                  <div className="w-1.5 bg-orange-500 rounded-full my-1 opacity-50"></div>
                  <textarea 
                    value={msgHi} onChange={(e) => setMsgHi(e.target.value)}
                    className="flex-1 p-3 bg-gray-50 dark:bg-zinc-800 rounded-xl text-sm outline-none resize-none h-20 placeholder:text-gray-400"
                    placeholder="Hindi Message..."
                  />
               </div>
               {/* Kannada */}
               <div className="flex gap-2">
                  <div className="w-1.5 bg-purple-500 rounded-full my-1 opacity-50"></div>
                  <textarea 
                    value={msgKn} onChange={(e) => setMsgKn(e.target.value)}
                    className="flex-1 p-3 bg-gray-50 dark:bg-zinc-800 rounded-xl text-sm outline-none resize-none h-20 placeholder:text-gray-400"
                    placeholder="Kannada Message..."
                  />
               </div>
            </div>
          )}

          {/* Footer: Metadata */}
          <div className="grid grid-cols-2 gap-3 pt-2">
             <div className="relative">
                <ImageIcon className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input 
                  type="text" value={image} onChange={(e) => setImage(e.target.value)} 
                  className="w-full pl-9 pr-3 py-2.5 bg-gray-50 dark:bg-zinc-800 rounded-xl text-xs outline-none focus:ring-1 focus:ring-gray-300"
                  placeholder="Image URL" 
                />
             </div>
             <div className="relative">
                <LinkIcon className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input 
                  type="text" value={url} onChange={(e) => setUrl(e.target.value)} 
                  className="w-full pl-9 pr-3 py-2.5 bg-gray-50 dark:bg-zinc-800 rounded-xl text-xs outline-none focus:ring-1 focus:ring-gray-300"
                  placeholder="Link URL" 
                />
             </div>
          </div>

          {/* Status Message */}
          {status && (
            <div className={`text-xs font-bold text-center p-3 rounded-lg flex items-center justify-center gap-2 animate-in fade-in slide-in-from-top-1 ${status.includes("Success") || status.includes("Sent") ? "text-green-600 bg-green-50 dark:bg-green-900/20" : "text-rose-600 bg-rose-50 dark:bg-rose-900/20"}`}>
              {status}
            </div>
          )}

          {/* Big Action Button */}
          <button 
            type="submit" disabled={loading}
            className={`w-full py-4 rounded-xl font-bold text-white transition-all active:scale-[0.98] shadow-lg shadow-gray-200 dark:shadow-none flex items-center justify-center gap-2 ${mode === "single" ? "bg-gray-900 dark:bg-white dark:text-black" : `bg-gradient-to-r ${getTheme()}`}`}
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5"/> : <><Send className="w-5 h-5" /> {mode === "single" ? "Send Single" : `Blast ${mode.toUpperCase()}`}</>}
          </button>
        </form>
      </div>
    </div>
  );
}