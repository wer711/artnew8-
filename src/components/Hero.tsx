import React from 'react';

export function Hero() {
  return (
    <section className="text-center py-16 md:py-24 px-5 relative overflow-hidden">
      <span className="inline-block bg-gradient-to-br from-sage/10 to-rose/10 border border-sage/20 rounded-full px-4 py-1.5 text-xs font-medium text-sage tracking-wide mb-5">
        ✦ 8 Free Daily — Color Extractor + Market Intel — No Sign-up
      </span>
      <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight text-ink mb-6">
        ArtNew8 — Free <em className="italic text-rose">Paper Craft</em>
        <br /> Color Planner & Smart Pricing
      </h1>
      
      <div className="flex justify-center gap-2 flex-wrap">
        <span className="text-[10px] md:text-[11px] font-medium tracking-wide px-3 py-1.5 rounded-full border border-rose/20 bg-rose/10 text-rose">
          Etsy Pricing Integrated
        </span>
        <span className="text-[10px] md:text-[11px] font-medium tracking-wide px-3 py-1.5 rounded-full border border-sage/20 bg-sage/10 text-sage">
          Material Waste Protection
        </span>
        <span className="text-[10px] md:text-[11px] font-medium tracking-wide px-3 py-1.5 rounded-full border border-gold/20 bg-gold/10 text-gold">
          🔒 Your Data Stays on Your Device
        </span>
      </div>
    </section>
  );
}
