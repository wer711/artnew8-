/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { ToolsGrid } from './components/ToolsGrid';
import { Testimonials } from './components/Testimonials';
import { Support } from './components/Support';
import { ToolModal } from './components/ToolModal';

import { Generator } from './components/Generator';
import { Calculator } from './components/Calculator';
import { CuttingBoard } from './components/CuttingBoard';
import { Calendar } from './components/Calendar';
import { ImageExtractor } from './components/ImageExtractor';

import { DailyLimitProvider } from './hooks/useDailyLimit';
import { LimitModal } from './components/LimitModal';

export default function App() {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const handleOpenTool = (toolId: string) => {
    if (toolId === 'palette') {
      // It's in the hero
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setActiveTool(toolId);
    }
  };

  return (
    <DailyLimitProvider>
      <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-10">
        <Header />
        
        <main>
          {/* Hero incorporates the Generator directly under it for immediate "Aha!" moment */}
          <div className="bg-gradient-to-b from-rose/5 to-white pb-20 border-b border-sage/10" id="palette">
            <Hero />
            <div className="relative z-10 -mt-10 md:-mt-6">
              <Generator />
              <ImageExtractor />
            </div>
            
            {/* Optional: we can display the Image Extractor here too, or just Generator */}
          </div>

          <Features />
          <ToolsGrid onOpenTool={handleOpenTool} />
          <Testimonials />
          <Support />
        </main>
        
        <footer className="bg-white border-t border-sage/10 py-12 px-5 mt-20 text-center">
          <div className="flex flex-col items-center gap-6 max-w-4xl mx-auto">
            <a 
              href="https://www.facebook.com/share/g/1HLBeMbAVJ/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white bg-[#1877F2] hover:bg-[#1877F2]/90 px-6 py-3 rounded-full font-semibold transition-colors shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              Join our Facebook Community
            </a>
            
            <p className="text-muted text-sm font-medium">Built with ❤️ for the paper crafting community.</p>
            
            <div className="flex items-center justify-center gap-4 text-sm mt-2">
              <a href="#" className="text-sage hover:text-sage/80 font-semibold transition-colors">
                Contact Support
              </a>
              <span className="text-sage/30">|</span>
              <a href="#" className="text-sage hover:text-sage/80 font-semibold transition-colors">
                Privacy Policy
              </a>
            </div>
          </div>
        </footer>
      </div>

      <ToolModal 
        isOpen={activeTool === 'pricing'} 
        onClose={() => setActiveTool(null)} 
        title="Profit & Pricing Calculator"
      >
        <Calculator />
      </ToolModal>

      <ToolModal 
        isOpen={activeTool === 'layout'} 
        onClose={() => setActiveTool(null)} 
        title="Material Layout Planner"
      >
        <CuttingBoard />
      </ToolModal>

      <ToolModal 
        isOpen={activeTool === 'calendar'} 
        onClose={() => setActiveTool(null)} 
        title="Seasonal Trends Calendar"
      >
        <Calendar />
      </ToolModal>

      <LimitModal />
    </DailyLimitProvider>
  );
}
