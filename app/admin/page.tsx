"use client";

import { useState } from "react";
import { Loader2, Send, ShieldAlert, Sparkles, Globe, ChevronDown, Lock, Link as LinkIcon, Image as ImageIcon } from "lucide-react";

export default function AdminPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [mode, setMode] = useState<"single" | "daily">("single");
  
  // Common State
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("Suprabhatam 🌅");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("/");

  // Single Mode State
  const [category, setCategory] = useState("dailyQuote"); // 👈 This was being ignored before
  const [language, setLanguage] = useState("hi");
  const [message, setMessage] = useState("");

  // Daily Mode State
  const [msgEn, setMsgEn] = useState("");
  const [msgHi, setMsgHi] = useState("");
  const [msgKn, setMsgKn] = useState("");

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      if (mode === "single") {
        // ✅ FIXED: Now passing the selected 'category' variable
        await sendNotification(language, message, category);
        setStatus(`✅ Sent single notification!`);
      } 
      else {
        // Daily Mode: Always forces "dailyQuote" category
        const promises = [];
        if (msgEn) promises.push(sendNotification("en", msgEn, "dailyQuote"));
        if (msgHi) promises.push(sendNotification("hi", msgHi, "dailyQuote"));
        if (msgKn) promises.push(sendNotification("kn", msgKn, "dailyQuote"));

        if (promises.length === 0) throw new Error("Please fill at least one message.");
        
        await Promise.all(promises);
        setStatus(`✅ Sent Daily Wisdom to all 3 languages!`);
      }
    } catch (err: any) {
      setStatus(`❌ Error: ${err.message || "Failed"}`);
    } finally {
      setLoading(false);
    }
  };

  // ✅ FIXED: Added 'cat' parameter here
  const sendNotification = async (lang: string, msgBody: string, cat: string) => {
    const res = await fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password,
        title,
        message: msgBody,
        image,
        category: cat, // 👈 USING THE PARAMETER NOW
        language: lang,
        url
      }),
    });
    if (!res.ok) throw new Error("Server rejected request");
    return res.json();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black p-4 md:p-6 flex items-center justify-center">
      <div className="max-w-xl w-full bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-zinc-800 overflow-hidden relative">
        
        {/* Decorative Top Bar */}
        <div className={`h-2 w-full ${mode === 'daily' ? 'bg-gradient-to-r from-rose-500 via-orange-500 to-purple-500' : 'bg-gray-800 dark:bg-zinc-700'}`} />

        {/* Header */}
        <div className="px-6 pt-6 pb-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <ShieldAlert className="text-rose-500 w-5 h-5" />
              Admin Panel
            </h1>
            <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-gray-100 dark:bg-zinc-800 px-2 py-1 rounded">
              {mode === 'daily' ? 'Broadcast Mode' : 'Single Mode'}
            </div>
          </div>
          
          {/* Mobile-Friendly Segmented Control */}
          <div className="flex bg-gray-100 dark:bg-zinc-800/50 p-1 rounded-xl">
            <button 
              onClick={() => setMode("single")}
              className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all duration-300 ${mode === "single" ? "bg-white dark:bg-zinc-700 text-black dark:text-white shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
            >
              Single
            </button>
            <button 
              onClick={() => setMode("daily")}
              className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-1.5 ${mode === "daily" ? "bg-rose-500 text-white shadow-md shadow-rose-500/20" : "text-gray-400 hover:text-gray-600"}`}
            >
              <Sparkles className="w-3 h-3" /> Daily Wisdom
            </button>
          </div>
        </div>

        <form onSubmit={handleSend} className="px-6 pb-8 space-y-5">
          
          {/* 1. Security (Compact) */}
          <div className="relative group">
            <Lock className="absolute left-3 top-3.5 w-4 h-4 text-gray-400 group-focus-within:text-rose-500 transition-colors" />
            <input 
              type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 rounded-xl outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all text-sm"
              placeholder="Admin Password"
            />
          </div>

          {/* 2. Title */}
          <div>
            <label className="text-[11px] font-bold uppercase text-gray-400 mb-1.5 block ml-1">Title</label>
            <input 
              type="text" required value={title} onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl outline-none focus:border-rose-500 transition-all font-medium text-gray-900 dark:text-white placeholder:text-gray-400 text-base"
              placeholder="Notification Title (e.g. Jai Jinendra {{name}})"
            />
          </div>

          {/* --- DYNAMIC SECTION --- */}
          {mode === "single" ? (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex gap-3">
                 <div className="flex-1">
                   {/* This dropdown sets 'category' state, which is now correctly passed to the function */}
                   <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-3 bg-gray-50 dark:bg-zinc-800 border-none rounded-xl text-sm appearance-none outline-none">
                     <option value="dailyQuote">Daily Quote</option>
                     <option value="tithi">Tithi</option>
                     <option value="updates">Updates</option>
                   </select>
                 </div>
                 <div className="w-1/3">
                   <select value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full px-3 py-3 bg-gray-50 dark:bg-zinc-800 border-none rounded-xl text-sm appearance-none outline-none">
                     <option value="hi">Hindi</option>
                     <option value="en">English</option>
                     <option value="kn">Kannada</option>
                   </select>
                 </div>
              </div>
              <textarea 
                required value={message} onChange={(e) => setMessage(e.target.value)}
                className="w-full p-4 bg-gray-50 dark:bg-zinc-800 border-none rounded-xl text-base outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-zinc-700 min-h-[120px] resize-none"
                placeholder="Type your message..."
              />
            </div>
          ) : (
            <div className="space-y-3 animate-in fade-in slide-in-from-right-2 duration-300">
               {/* English Card */}
               <div className="relative group">
                  <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-rose-500 rounded-l-xl" />
                  <div className="absolute top-3 right-3 text-[10px] font-bold text-rose-500/50 uppercase">English</div>
                  <textarea 
                    value={msgEn} onChange={(e) => setMsgEn(e.target.value)}
                    className="w-full pl-5 pr-4 py-3 bg-rose-50/50 dark:bg-rose-900/10 rounded-xl text-base border border-transparent focus:border-rose-200 dark:focus:border-rose-900/50 outline-none resize-none h-20 placeholder:text-rose-300/70"
                    placeholder="Message in English..."
                  />
               </div>

               {/* Hindi Card */}
               <div className="relative group">
                  <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-orange-500 rounded-l-xl" />
                  <div className="absolute top-3 right-3 text-[10px] font-bold text-orange-500/50 uppercase">Hindi</div>
                  <textarea 
                    value={msgHi} onChange={(e) => setMsgHi(e.target.value)}
                    className="w-full pl-5 pr-4 py-3 bg-orange-50/50 dark:bg-orange-900/10 rounded-xl text-base border border-transparent focus:border-orange-200 dark:focus:border-orange-900/50 outline-none resize-none h-20 placeholder:text-orange-300/70"
                    placeholder="Message in Hindi..."
                  />
               </div>

               {/* Kannada Card */}
               <div className="relative group">
                  <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-purple-500 rounded-l-xl" />
                  <div className="absolute top-3 right-3 text-[10px] font-bold text-purple-500/50 uppercase">Kannada</div>
                  <textarea 
                    value={msgKn} onChange={(e) => setMsgKn(e.target.value)}
                    className="w-full pl-5 pr-4 py-3 bg-purple-50/50 dark:bg-purple-900/10 rounded-xl text-base border border-transparent focus:border-purple-200 dark:focus:border-purple-900/50 outline-none resize-none h-20 placeholder:text-purple-300/70"
                    placeholder="Message in Kannada..."
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
            className={`w-full py-4 rounded-xl font-bold text-white transition-all active:scale-[0.98] shadow-lg shadow-gray-200 dark:shadow-none flex items-center justify-center gap-2 ${mode === "daily" ? "bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600" : "bg-gray-900 dark:bg-white dark:text-black hover:bg-black dark:hover:bg-white"}`}
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5"/> : <><Send className="w-5 h-5" /> {mode === "daily" ? "Blast All" : "Send Now"}</>}
          </button>
        </form>
      </div>
    </div>
  );
}