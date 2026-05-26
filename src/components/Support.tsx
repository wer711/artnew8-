import React from 'react';
import { Heart, Sparkles, Coffee, ArrowRight, Construction, CheckCircle2, Map, Store } from 'lucide-react';

export function Support() {
  return (
    <section id="support" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-5">
        <div className="text-center mb-16">
          <div className="inline-flex justify-center items-center w-12 h-12 rounded-full bg-gold/10 text-gold mb-4">
            <Map size={24} />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink mb-4">Project Roadmap</h2>
          <p className="text-muted text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            See where we are and where we are heading. Every coffee you buy helps us unlock the next phase of development, keeping existing tools free while we build toward the ultimate crafter's marketplace.
          </p>
        </div>

        <div className="relative border-l-2 border-sage/20 ml-4 md:ml-8 space-y-12 pb-8">
          {/* Phase 1 */}
          <div className="relative pl-8 md:pl-12">
            <div className="absolute -left-[17px] top-1 bg-sage text-white w-8 h-8 rounded-full border-4 border-white flex items-center justify-center">
              <CheckCircle2 size={16} />
            </div>
            <div className="bg-white border border-sage/20 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
              <span className="text-xs font-bold uppercase tracking-wider text-sage mb-2 block">Phase 1 • Current Status</span>
              <h3 className="font-serif text-2xl font-bold text-ink mb-3">Essential Toolkit</h3>
              <p className="text-sm text-muted mb-4">
                We've successfully launched the core tools to help organize your crafting efficiently.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-ink/80"><CheckCircle2 size={18} className="text-sage shrink-0"/> Palette Generator & Image Extractor</li>
                <li className="flex items-start gap-2 text-sm text-ink/80"><CheckCircle2 size={18} className="text-sage shrink-0"/> Pricing Calculator & Material Layout</li>
                <li className="flex items-start gap-2 text-sm text-ink/80"><CheckCircle2 size={18} className="text-sage shrink-0"/> Guaranteed 100% Free Forever</li>
              </ul>
            </div>
          </div>

          {/* Phase 2 */}
          <div className="relative pl-8 md:pl-12">
            <div className="absolute -left-[17px] top-1 bg-gradient-to-r from-rose to-[#d9777f] text-white w-8 h-8 rounded-full border-4 border-white flex items-center justify-center shadow-sm">
              <Construction size={16} />
            </div>
            <div className="bg-gradient-to-b from-rose/5 to-white border border-rose/30 p-6 md:p-8 rounded-3xl shadow-md relative">
              <div className="absolute top-0 right-6 -translate-y-1/2 bg-gradient-to-r from-rose to-[#d9777f] text-white px-4 py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-1">
                <Sparkles size={12}/> Focus Area
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose mb-2 block">Phase 2 • In Development</span>
              <h3 className="font-serif text-2xl font-bold text-ink mb-3">Advanced AI Tools</h3>
              <p className="text-sm text-muted mb-6">
                Your donations directly fund the server costs and development time to build these advanced time-savers. Supporters get early access!
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2 text-sm text-ink/80"><ArrowRight size={18} className="text-rose/70 shrink-0"/> Automatic SVG outline generation</li>
                <li className="flex items-start gap-2 text-sm text-ink/80"><ArrowRight size={18} className="text-rose/70 shrink-0"/> AI-assisted Etsy listing descriptions</li>
                <li className="flex items-start gap-2 text-sm text-ink/80"><ArrowRight size={18} className="text-rose/70 shrink-0"/> Drag-and-drop shape layout planner</li>
              </ul>
              
              <a 
                href="https://www.paypal.com/ncp/payment/7TUYHE9XTU6AG" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex py-3.5 px-6 rounded-xl bg-gradient-to-r from-rose to-[#d9777f] text-white font-semibold text-sm hover:shadow-lg hover:opacity-95 transition-all items-center justify-center gap-2"
              >
                <Coffee size={18} /> Support Phase 2 & Get Early Access
              </a>
            </div>
          </div>

          {/* Phase 3 */}
          <div className="relative pl-8 md:pl-12">
            <div className="absolute -left-[17px] top-1 bg-gray-200 text-gray-500 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center">
              <Store size={14} />
            </div>
            <div className="bg-gray-50 border border-gray-100 p-6 md:p-8 rounded-3xl opacity-80">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 block">Phase 3 • Ultimate Goal</span>
              <h3 className="font-serif text-xl font-bold text-gray-700 mb-3">The Crafter's Marketplace</h3>
              <p className="text-sm text-gray-500">
                Our grand vision: a dedicated, massive marketplace platform tailored exclusively for paper crafters and creators to buy, sell, and share templates, SVGs, and physical items with community-friendly low fees.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
