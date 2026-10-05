"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Star, Crown, Shield, Gem, CheckCircle2, ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/constants"; // Or just use the URL directly if this path is wrong.

// Let's make sure the path to constants is correct. If not, I'll fallback to a hardcoded URL.
// Actually it's better to just use "https://razorpay.me/@jainwisdomhub"

interface Tier {
  name: string;
  price: string;
  desc: string;
}

interface DonateClientProps {
  t: {
    oneTime: string;
    subscription: string;
    oneTimeTitle: string;
    oneTimeDesc: string;
    oneTimeBtn: string;
    mostPopular: string;
    subscribeBtn: string;
    tiers: Tier[];
  };
  lang: string;
  isIndic: boolean;
}

const icons = [Star, Shield, Gem, Crown];

const subscriptionButtonConfigs = [
  { id: "pl_TkAAZ5F9g5Llzw", theme: "rzp-outline-standard" }, // Aagam Ally 
  { id: "pl_TkANvItSucoFb4", theme: "rzp-outline-standard" }, // Ratnatray Patron 
  { id: "pl_TkAPH9TnzBk0T3", theme: "rzp-outline-standard" }, // Aagam Sanrakshak 
  { id: "pl_TkD0rVE4m3HRXJ", theme: "brand-color" }           // Dharm Prabhavak 
];

function RazorpaySubscriptionForm({ config }: { config: { id: string, theme: string } }) {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!config?.id || !formRef.current) return;

    if (formRef.current.children.length === 0) {
      const script = document.createElement("script");
      script.src = "https://cdn.razorpay.com/static/widget/subscription-button.js";
      script.setAttribute("data-subscription_button_id", config.id);
      script.setAttribute("data-button_theme", config.theme);
      script.async = true;
      formRef.current.appendChild(script);
    }
  }, [config]);

  return (
    <div className="w-full flex justify-center mt-4">
      <form ref={formRef} />
    </div>
  );
}

export default function DonateClient({ t, lang, isIndic }: DonateClientProps) {
  const [activeTab, setActiveTab] = useState<"subscription" | "onetime">("subscription");
  const [checkoutPlanId, setCheckoutPlanId] = useState<string | null>(null);

  return (
    <div className="w-full flex flex-col items-center">
      
      {/* Tabs */}
      <div className="flex p-1.5 bg-gray-200/50 dark:bg-zinc-900/50 backdrop-blur-md rounded-2xl mb-12 relative z-10 border border-gray-300/50 dark:border-white/10">
        <button
          onClick={() => setActiveTab("onetime")}
          className={`relative px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 z-10 ${activeTab === "onetime" ? "text-white" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"}`}
        >
          {activeTab === "onetime" && (
            <motion.div 
              layoutId="donate-tab-bg"
              className="absolute inset-0 bg-gray-900 dark:bg-white rounded-xl -z-10 shadow-lg"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-20 mix-blend-difference dark:mix-blend-normal">{t.oneTime}</span>
        </button>

        <button
          onClick={() => setActiveTab("subscription")}
          className={`relative px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 z-10 ${activeTab === "subscription" ? "text-white" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"}`}
        >
          {activeTab === "subscription" && (
            <motion.div 
              layoutId="donate-tab-bg"
              className="absolute inset-0 bg-gray-900 dark:bg-white rounded-xl -z-10 shadow-lg"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-20 mix-blend-difference dark:mix-blend-normal flex items-center gap-2">
             {t.subscription}
             <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
             </span>
          </span>
        </button>
      </div>

      {/* Content */}
      <div className="w-full relative min-h-[400px]">
        <AnimatePresence mode="wait">
          
          {activeTab === "onetime" && (
            <motion.div
              key="onetime"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 flex justify-center"
            >
              <div className="w-full max-w-md bg-white dark:bg-zinc-900/80 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-3xl p-8 shadow-2xl flex flex-col items-center text-center">
                 <div className="w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-500/20 flex items-center justify-center mb-6 text-rose-500">
                    <Heart className="w-8 h-8 fill-rose-500/20" />
                 </div>
                 <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4">{t.oneTimeTitle}</h2>
                 <p className="text-gray-600 dark:text-gray-400 mb-8">{t.oneTimeDesc}</p>
                 
                 <a
                    href="https://razorpay.me/@jainwisdomhub"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full group relative inline-flex justify-center items-center gap-2.5 px-6 py-4 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-black font-bold text-lg shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 overflow-hidden"
                 >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-black/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
                    {t.oneTimeBtn}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                 </a>
              </div>
            </motion.div>
          )}

          {activeTab === "subscription" && (
            <motion.div
              key="subscription"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {t.tiers.map((tier, idx) => {
                const Icon = icons[idx];
                const isHighest = idx === 3; // The highest tier
                
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className={`relative flex flex-col h-full bg-white dark:bg-zinc-900/80 backdrop-blur-xl border rounded-3xl p-6 shadow-xl transition-all duration-300 hover:-translate-y-2
                      ${isHighest 
                        ? 'border-rose-500/50 dark:border-rose-500/50 shadow-rose-500/20' 
                        : 'border-gray-200 dark:border-white/10 hover:border-amber-500/30'
                      }
                    `}
                  >
                    {/* Highest Tier Glow & Badge */}
                    {isHighest && (
                      <>
                        <div className="absolute -inset-[1px] bg-gradient-to-b from-rose-500/50 via-amber-500/50 to-transparent rounded-[25px] -z-10 opacity-50 blur-sm" />
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-rose-500 to-amber-500 text-white text-xs font-black uppercase tracking-wider py-1 px-4 rounded-full shadow-lg whitespace-nowrap flex items-center gap-1.5">
                           <Sparkles size={12} /> {t.mostPopular}
                        </div>
                      </>
                    )}

                    <div className="flex justify-between items-start mb-6 mt-2">
                       <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isHighest ? 'bg-rose-100 dark:bg-rose-500/20 text-rose-500' : 'bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-gray-400'}`}>
                          <Icon size={24} className={isHighest ? 'fill-rose-500/20' : ''} />
                       </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{tier.name}</h3>
                    
                    <div className="flex items-baseline gap-1 mb-4">
                       <span className="text-3xl font-black text-gray-900 dark:text-white">₹{tier.price}</span>
                       <span className="text-sm font-medium text-gray-500">/mo</span>
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-8 flex-grow leading-relaxed">
                       {tier.desc}
                    </p>

                    <button
                      onClick={(e) => {
                          e.preventDefault();
                          if (subscriptionButtonConfigs[idx]?.id) {
                              setCheckoutPlanId(idx.toString());
                          } else {
                              alert("Please add the Razorpay Subscription ID for this plan.");
                          }
                      }}
                      className={`w-full group relative inline-flex justify-center items-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 overflow-hidden
                        ${isHighest 
                          ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-lg shadow-rose-500/25 hover:shadow-xl hover:shadow-rose-500/40' 
                          : 'bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-zinc-700'
                        }
                      `}
                    >
                      {isHighest && <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />}
                      <span className="relative z-10">{t.subscribeBtn}</span>
                      <ArrowRight size={16} className={`relative z-10 transition-transform ${isHighest ? 'group-hover:translate-x-1' : 'group-hover:translate-x-1'}`} />
                    </button>

                  </motion.div>
                );
              })}
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Checkout Modal */}
      <AnimatePresence>
        {checkoutPlanId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/10 rounded-3xl p-8 shadow-2xl flex flex-col items-center"
            >
              <button 
                onClick={() => setCheckoutPlanId(null)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                ✕
              </button>
              
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center mb-6 text-emerald-500">
                  <CheckCircle2 className="w-8 h-8 fill-emerald-500/20" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2 text-center">Secure Checkout</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 text-center">Complete your offering securely via Razorpay below.</p>
              
              <div className="w-full bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 p-3 rounded-xl text-sm font-bold mb-4 flex items-center justify-center gap-2 border border-rose-200 dark:border-rose-800/50 shadow-sm animate-pulse">
                  <ArrowRight className="w-4 h-4 rotate-90" />
                  Please click the amount box to select it first!
                  <ArrowRight className="w-4 h-4 rotate-90" />
              </div>

              <div className="w-full bg-gray-50 dark:bg-zinc-800/50 rounded-2xl p-4 border border-gray-100 dark:border-white/5 flex justify-center items-center">
                 {checkoutPlanId !== null && subscriptionButtonConfigs[parseInt(checkoutPlanId)] && (
                    <RazorpaySubscriptionForm config={subscriptionButtonConfigs[parseInt(checkoutPlanId)]} />
                 )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
