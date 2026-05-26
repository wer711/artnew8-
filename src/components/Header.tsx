import React from "react";
import { Heart, Sparkles, Coffee, Facebook, Zap } from "lucide-react";
import { useDailyLimit } from "../hooks/useDailyLimit";

export function Header() {
  const { usage, maxUsage, streak } = useDailyLimit();

  return (
    <div className="bg-ink bg-opacity-95 text-center py-3 px-4 sticky top-0 z-40 backdrop-blur-md flex flex-wrap justify-between items-center gap-3">
      <div className="flex items-center gap-3">
        <span className="text-blush/90 text-sm font-semibold flex items-center gap-2">
          🌸 ArtNew8 Tools
        </span>
        <a
          href="https://www.facebook.com/share/g/1HLBeMbAVJ/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blush/70 hover:text-[#1877F2] transition-colors flex items-center gap-1 text-xs bg-white/5 py-1 px-2 rounded-full"
          title="Join our Facebook Group"
        >
          <Facebook size={14} /> <span className="hidden sm:inline">Join Group</span>
        </a>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-3 text-xs">
          {streak > 0 && <span className="text-gold flex items-center gap-1 font-medium"><Sparkles size={14}/> {streak} Day Streak</span>}
          <div className="flex items-center gap-1 text-blush/70 bg-white/5 px-2 py-1 rounded-full">
            <Zap size={14} className={usage >= maxUsage ? "text-rose" : "text-sage"} /> 
            {maxUsage - usage} / {maxUsage} <span className="hidden sm:inline opacity-70">actions left</span>
          </div>
        </div>
        <a
          href="#donation"
          className="text-ink bg-gold/90 hover:bg-gold px-4 py-1.5 rounded-full text-xs font-semibold no-underline transition-colors flex items-center gap-1"
        >
          💛 Support Project
        </a>
      </div>
    </div>
  );
}

export function Notice() {
  return (
    <div className="w-full max-w-4xl mx-auto px-5 my-16" id="donation">
      <div className="bg-gradient-to-br from-ink to-[#3d2820] rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden ring-1 ring-gold/20">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Sparkles size={160} />
        </div>
        <div className="relative z-10 text-center space-y-6">
          <div className="inline-flex justify-center items-center w-12 h-12 rounded-full bg-gold/10 text-gold mb-2">
            <Heart size={24} />
          </div>
          <h2 className="text-gold font-serif text-3xl md:text-4xl font-light">
            Help Keep ArtNew8 Free for Everyone
          </h2>
          <p className="text-blush/90 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            I built this tool to help paper crafters save time, eliminate waste, and increase their profits. My dream is to dedicate myself to this project full-time and continuously release new, powerful features for the entire crafting community.
          </p>
          <p className="text-blush/90 text-sm md:text-base max-w-2xl mx-auto leading-relaxed pb-4">
            Currently, these tools are 100% free and have zero ads, but Server costs add up quickly. If you found them helpful, please consider making a donation. Your support directly helps increase free daily limits and allows me to keep building the ultimate toolkit for you!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="https://www.paypal.com/ncp/payment/7TUYHE9XTU6AG" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gradient-to-br from-gold to-[#9e8055] text-ink px-8 py-3.5 rounded-xl font-semibold shadow-lg hover:-translate-y-0.5 hover:shadow-gold/30 transition-all flex items-center gap-2"
            >
              <Coffee size={18} />
              Support the Project via PayPal
            </a>
          </div>
          <p className="text-xs text-blush/50 mt-4">Every little bit helps to keep the servers running. Thank you for your kindness!</p>
        </div>
      </div>
    </div>
  );
}
