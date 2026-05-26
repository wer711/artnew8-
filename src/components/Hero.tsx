import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export function Hero() {
  const scrollToTools = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById('tools-grid')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="text-center pt-24 pb-12 px-5 relative overflow-hidden bg-gradient-to-b from-rose/5 to-transparent">
      <div className="max-w-4xl mx-auto">
        <span className="inline-flex items-center gap-2 bg-white shadow-sm border border-sage/10 rounded-full px-4 py-1.5 text-xs font-semibold text-sage tracking-wide mb-6">
          <Sparkles size={14} /> 100% Free & Private — No Sign-up Required
        </span>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight text-ink mb-6 max-w-3xl mx-auto leading-tight">
          Design, Price & Plan Your <span className="italic text-rose">Paper Crafts</span> — All in One Place
        </h1>
        <p className="text-muted text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
          Private, browser-based tools to pick perfect colors, calculate profits, and organize your cutting layouts. Stop guessing and start crafting profitably.
        </p>
        
        <div className="flex justify-center gap-4">
          <a href="#tools" onClick={scrollToTools} className="inline-flex items-center gap-2 text-sm font-semibold text-ink bg-white border border-sage/10 shadow-sm px-6 py-3 rounded-xl hover:shadow-md hover:border-sage/30 transition-all">
            Explore All Tools <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
