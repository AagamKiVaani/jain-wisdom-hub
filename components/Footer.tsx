"use client";

import Link from "next/link";
import { Mail, ArrowUp } from "lucide-react"; // Only keeping generic UI icons from lucide

export default function Footer({ lang }: { lang: string }) {
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-zinc-50 dark:bg-zinc-950 text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-white/5 pt-20 pb-10 overflow-hidden">
      
      {/* Decorative Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-orange-500/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Top Section: Brand & Call to Action */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-start">
          
          {/* Brand Info */}
          <div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight uppercase mb-4">
              Jain Wisdom
            </h2>
            <p className="max-w-md text-sm leading-relaxed mb-8">
              Digitizing the ancient legacy of the Tirthankaras for the modern world. 
              A visual journey through time, philosophy, and divinity.
            </p>
            
            {/* Social Pill */}
            <div className="flex items-center gap-3 flex-wrap">
               {/* YOUTUBE */}
               <a 
                 href="https://www.youtube.com/@AagamKiVani" 
                 target="_blank"
                 rel="noopener noreferrer"
                 className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-widest transition-all hover:scale-105 shadow-lg shadow-red-600/20"
               >
                 <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                 </svg>
                 Subscribe
               </a>

               {/* 2. INSTAGRAM LINK (Changed button to 'a') */}
                <a 
                    href="https://www.instagram.com/aagamkivaani/" // <--- PASTE INSTA LINK HERE
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-pink-500 hover:text-pink-500 transition-colors flex items-center justify-center"
                >
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                </a>

                {/* 3. FACEBOOK LINK (Changed button to 'a') */}
                <a 
                    href="https://www.facebook.com/profile.php?id=61581831506049" // <--- PASTE FACEBOOK LINK HERE
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-blue-600 hover:text-blue-600 transition-colors flex items-center justify-center"
                >
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036c-2.148 0-2.971.956-2.971 3.594v.376h3.428l-.532 3.667h-2.896v7.981A10.309 10.309 0 0 0 22.28 12 10.28 10.28 0 1 0 1.72 12a10.3 10.3 0 0 0 7.381 11.691z"/>
                    </svg>
                </a>

                {/* 4. EMAIL LINK (Optional) */}
                <a 
                    href="mailto:aagamkivaani@gmail.com" // <--- PASTE EMAIL HERE
                    className="p-2.5 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-orange-500 hover:text-orange-500 transition-colors flex items-center justify-center"
                >
                    <Mail size={18} />
                </a>
            </div>
          </div>

          {/* Quick Links Grid */}
          <div className="grid grid-cols-2 gap-8 md:pl-20">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-900 dark:text-white mb-6">Explore</h4>
              <ul className="space-y-4 text-sm">
                <li><Link href={`/${lang}/tirthankars`} className="hover:text-orange-500 transition-colors">Tirthankar Gallery</Link></li>
                <li><Link href="#" className="hover:text-orange-500 transition-colors">Philosophy</Link></li>
                <li><Link href="#" className="hover:text-orange-500 transition-colors">Timeline</Link></li>
                <li><Link href="#" className="hover:text-orange-500 transition-colors">Map View</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-900 dark:text-white mb-6">Project</h4>
              <ul className="space-y-4 text-sm">
                <li><Link href="#" className="hover:text-orange-500 transition-colors">About Us</Link></li>
                <li><Link href="#" className="hover:text-orange-500 transition-colors">Contact</Link></li>
                <li><Link href="#" className="hover:text-orange-500 transition-colors">Donate</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-200 dark:bg-white/10 mb-8"></div>

        {/* Bottom Section: Copyright & Scroll Top */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-xs font-medium opacity-60">
            © {new Date().getFullYear()} Jain Wisdom. All rights reserved.
          </div>
          
          <button 
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-orange-500 transition-colors"
          >
            Back to Top 
            <span className="p-2 rounded-full bg-gray-100 dark:bg-white/10 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                <ArrowUp size={14} />
            </span>
          </button>
        </div>
        
      </div>
    </footer>
  );
}