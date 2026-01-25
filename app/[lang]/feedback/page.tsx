'use client';

import React, { useState } from 'react';
import Link from 'next/link'; // 👈 Import Link
import { Send, Loader2, AlertCircle, CheckCircle, ThumbsUp, ThumbsDown, Sparkles, MessageSquare, ArrowLeft } from 'lucide-react';

export default function FeedbackForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  // 🟢 WRAPPER ADDED: Outer div handles the vertical spacing (py-12 md:py-20)
  return (
    <div className="w-full min-h-screen px-4 py-12 md:py-20 flex flex-col items-center">
      
      {/* 🟢 ADDED: Back to Home Button */}
      <div className="w-full max-w-2xl mb-8 flex justify-start">
        <Link 
          href="/" 
          className="group flex items-center gap-2 text-gray-500 hover:text-orange-600 dark:text-gray-400 dark:hover:text-orange-400 transition-colors duration-300"
        >
          <div className="p-2 rounded-full bg-gray-100 dark:bg-white/5 group-hover:bg-orange-50 dark:group-hover:bg-orange-500/10 transition-colors">
            <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
          </div>
          <span className="font-semibold text-sm">Back to Home</span>
        </Link>
      </div>

      {status === 'success' ? (
        <div className="w-full max-w-lg mx-auto p-8 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-500/20 rounded-3xl text-center animate-in fade-in zoom-in duration-300">
          <div className="flex justify-center mb-4">
            <CheckCircle size={48} className="text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Feedback Received!</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Your insights help us make Digital Aagam better. <br/>
            Thank you for your time.
          </p>
          <button 
            onClick={() => setStatus('idle')}
            className="mt-6 text-sm font-semibold text-green-600 hover:text-green-700 underline"
          >
            Send another response
          </button>
        </div>
      ) : (
        <form 
          onSubmit={handleSubmit} 
          className="w-full max-w-2xl mx-auto space-y-8 bg-white dark:bg-zinc-900/50 p-6 md:p-8 rounded-3xl border border-zinc-200 dark:border-white/10 backdrop-blur-sm shadow-xl"
        >
          {/* Header text inside form for better context */}
          <div className="text-center mb-4">
             <h2 className="text-2xl font-bold text-gray-900 dark:text-white">We value your feedback</h2>
             <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Help us improve your experience</p>
          </div>

          {/* SECTION 1: IDENTITY */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Name (Optional)</label>
              <input 
                type="text" 
                name="name"
                placeholder="Veer Jain"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all text-gray-900 dark:text-white placeholder:text-gray-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Email (Optional)</label>
              <input 
                type="email" 
                name="email"
                placeholder="veer@gmail.com"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all text-gray-900 dark:text-white placeholder:text-gray-500"
              />
            </div>
          </div>

          <div className="w-full h-px bg-gray-100 dark:bg-white/5"></div>

          {/* SECTION 2: THE SURVEY */}
          <div className="space-y-6">
            
            {/* Liked */}
            <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300">
                    <ThumbsUp size={16} className="text-green-500" />
                    What did you like best?
                </label>
                <input 
                    type="text" 
                    name="liked"
                    placeholder="e.g. The 4K animations, the clean design..."
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all text-gray-900 dark:text-white placeholder:text-gray-500"
                />
            </div>

            {/* Disliked */}
            <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300">
                    <ThumbsDown size={16} className="text-red-500" />
                    What is bad / needs fixing?
                </label>
                <input 
                    type="text" 
                    name="disliked"
                    placeholder="e.g. Loading speed, font size is too small..."
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all text-gray-900 dark:text-white placeholder:text-gray-500"
                />
            </div>

            {/* Improvement */}
            <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300">
                    <Sparkles size={16} className="text-yellow-500" />
                    What can be improved?
                </label>
                <input 
                    type="text" 
                    name="improvement"
                    placeholder="e.g. Add more Hindi translations, add audio..."
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none transition-all text-gray-900 dark:text-white placeholder:text-gray-500"
                />
            </div>
          </div>

          <div className="w-full h-px bg-gray-100 dark:bg-white/5"></div>

          {/* SECTION 3: THE MESSAGE */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300">
                <MessageSquare size={16} className="text-orange-500" />
                Final Message <span className="text-red-500">*</span>
            </label>
            <textarea 
              name="message" 
              required
              rows={4}
              placeholder="Anything else you want to tell us?"
              className="w-full px-4 py-3 bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all text-gray-900 dark:text-white placeholder:text-gray-500 resize-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={status === 'submitting'}
            className="w-full py-4 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white font-bold rounded-xl transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2"
          >
            {status === 'submitting' ? (
              <><Loader2 className="animate-spin" size={20} /> Sending...</>
            ) : (
              <><Send size={20} /> Submit Feedback</>
            )}
          </button>

          {/* Error Message */}
          {status === 'error' && (
            <div className="flex items-center gap-2 text-red-500 text-sm justify-center mt-2">
              <AlertCircle size={16} />
              <span>Something went wrong. Please try again.</span>
            </div>
          )}
        </form>
      )}
    </div>
  );
}