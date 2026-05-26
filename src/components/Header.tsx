import React from "react";
import { Heart, Sparkles } from "lucide-react";

export function Header() {
  return (
    <div className="bg-ink bg-opacity-95 text-center py-2 px-4 sticky top-0 z-50 backdrop-blur-md flex flex-wrap justify-center items-center gap-3">
      <span className="text-blush/75 text-xs font-normal">
        🌸 ArtNew8 — Free Paper Craft Tools
      </span>
      <a
        href="#donation"
        className="text-gold text-xs font-semibold no-underline border-b border-gold/40 hover:text-white transition-colors"
      >
        💛 Support this tool — Keep it free
      </a>
    </div>
  );
}

export function Notice() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 mt-8" id="donation">
      <div className="bg-gradient-to-br from-ink to-[#3d2820] rounded-3xl p-8 shadow-2xl relative overflow-hidden ring-1 ring-gold/20">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Sparkles size={120} />
        </div>
        <div className="relative z-10 text-center space-y-4">
          <h2 className="text-gold font-serif text-3xl font-medium mb-2">
            Why We Need Your Support
          </h2>
          <p className="text-blush/80 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            <strong>Nothing of high value remains free forever.</strong> Currently, this entire suite of tools is 100% free, but this cannot continue indefinitely without generous community support.
          </p>
          <p className="text-blush/80 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            I aspire to make this my primary, full-time project in the future. By supporting this tool with generous donations today, you ensure it is developed continuously and rapidly, delivering the best specialized services exclusively to you—so that every crafter profits and thrives. Let’s build the ultimate toolkit together.
          </p>

          <div className="max-w-md mx-auto mt-6 bg-white/5 rounded-2xl p-4 border border-white/10">
            <div className="flex justify-between text-xs text-blush/70 mb-2"><span>Funds Raised</span><span>Goal: $5,000</span></div>
            <div className="h-2.5 bg-black/40 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-rose to-gold w-[3%]" />
            </div>
            <div className="text-[10px] text-blush/50 mt-2 text-right">$4,850 to go until we can guarantee full-time development</div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row gap-4 items-center justify-center">
            <button className="bg-gradient-to-br from-rose to-deep text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:-translate-y-0.5 hover:shadow-rose/30 transition-all flex items-center gap-2">
              <Heart size={18} />
              Donate $5 via PayPal
            </button>
            <button className="bg-white/10 border border-white/20 text-blush rounded-xl px-8 py-3 font-medium hover:bg-white/20 transition-all">
              Become a Monthly Supporter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
