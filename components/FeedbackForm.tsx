// components/FeedbackForm.tsx
'use client';

import React, { useState } from 'react';
import { Send, Loader2, AlertCircle, CheckCircle } from 'lucide-react';

export default function FeedbackForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      // 🟢 Sends data to YOUR MongoDB API
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

  if (status === 'success') {
    return (
      <div className="p-8 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-500/20 rounded-3xl text-center animate-in fade-in zoom-in duration-300">
        <div className="flex justify-center mb-4">
          <CheckCircle size={48} className="text-green-600 dark:text-green-400" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Message Received!</h3>
        <p className="text-gray-600 dark:text-gray-300">
          Your feedback has been saved to our database. <br/>
          Thank you for helping improve Digital Aagam.
        </p>
        <button 
          onClick={() => setStatus('idle')}
          className="mt-6 text-sm font-semibold text-green-600 hover:text-green-700 underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-zinc-900/50 p-6 md:p-8 rounded-3xl border border-zinc-200 dark:border-white/10 backdrop-blur-sm shadow-xl">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Name (Optional)</label>
          <input 
            type="text" 
            name="name"
            placeholder="Your Name"
            className="w-full px-4 py-3 bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all text-gray-900 dark:text-white placeholder:text-gray-400"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Email (Optional)</label>
          <input 
            type="email" 
            name="email"
            placeholder="contact@email.com"
            className="w-full px-4 py-3 bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all text-gray-900 dark:text-white placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Feedback Type Dropdown */}
      <div className="space-y-2">
        <label className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Feedback Type</label>
        <div className="relative">
          <select 
            name="subject" 
            required
            className="w-full px-4 py-3 bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all text-gray-900 dark:text-white appearance-none cursor-pointer"
          >
            <option value="Suggestion">💡 Suggestion / Feature Request</option>
            <option value="Bug Report">🐛 Bug / Something is Broken</option>
            <option value="Correction">✏️ Data / Translation Correction</option>
            <option value="Appreciation">❤️ Just showing love</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">▼</div>
        </div>
      </div>

      {/* Message Area */}
      <div className="space-y-2">
        <label className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Message</label>
        <textarea 
          name="message" 
          required
          rows={5}
          placeholder="Tell us what you found or how we can improve..."
          className="w-full px-4 py-3 bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all text-gray-900 dark:text-white placeholder:text-gray-400 resize-none"
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
          <><Send size={20} /> Send Feedback</>
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
  );
}