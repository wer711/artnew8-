/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Header, Notice } from './components/Header';
import { Hero } from './components/Hero';
import { Generator } from './components/Generator';
import { Calculator } from './components/Calculator';
import { Library } from './components/Library';
import { ImageExtractor } from './components/ImageExtractor';
import { CuttingBoard } from './components/CuttingBoard';
import { Calendar } from './components/Calendar';
import { InventoryTracker } from './components/InventoryTracker';
import { DailyLimitProvider } from './hooks/useDailyLimit';
import { LimitModal } from './components/LimitModal';

export default function App() {
  return (
    <DailyLimitProvider>
      <div className="min-h-screen pb-20 font-sans relative">
        <Header />
        <Hero />
        <div className="my-8" />
        <Generator />
        <ImageExtractor />
        <Library />
        <Notice />
        <Calculator />
        <CuttingBoard />
        <Calendar />
        <InventoryTracker />
        
        <footer className="max-w-4xl mx-auto px-5 mt-20 mb-8 text-center text-sm text-muted">
          <p className="mb-4">Crafted with passion for the paper crafting community.</p>
          <a 
            href="https://www.facebook.com/share/g/1HLBeMbAVJ/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white bg-[#1877F2] hover:bg-[#1877F2]/90 px-6 py-2.5 rounded-full font-medium transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            Join our Facebook Group to request features!
          </a>
        </footer>
      </div>
      <LimitModal />
    </DailyLimitProvider>
  );
}
