import React, { useState } from "react";
import { Sparkles, Menu, X, Facebook } from "lucide-react";
import { useDailyLimit } from "../hooks/useDailyLimit";

export function Header() {
  const { usage, maxUsage } = useDailyLimit();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-sage/10 relative">
      <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 text-ink font-serif font-bold text-xl">
          <span className="text-sage">✂️</span> PaperCraft Studio
        </a>

        <nav className="hidden md:flex items-center gap-4 sm:gap-6">
          <a href="#tools" onClick={(e) => scrollToSection(e, 'tools-grid')} className="text-sm font-medium text-ink/70 hover:text-ink transition-colors">Tools</a>
          <a href="#features" onClick={(e) => scrollToSection(e, 'features')} className="text-sm font-medium text-ink/70 hover:text-ink transition-colors">Why Us</a>
          <a href="#testimonials" onClick={(e) => scrollToSection(e, 'testimonials')} className="text-sm font-medium text-ink/70 hover:text-ink transition-colors">Loved By</a>
        </nav>

        <div className="flex items-center gap-3 sm:gap-4">
          <a
            href="https://www.facebook.com/share/g/1HLBeMbAVJ/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex text-[#1877F2] bg-[#1877F2]/10 hover:bg-[#1877F2]/20 px-3 py-1.5 rounded-xl text-sm font-semibold transition-all items-center gap-2"
            title="Join our Facebook Group"
          >
            <Facebook size={16} /> <span className="hidden lg:inline">Community</span>
          </a>
          <div className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-sage bg-sage/10 px-3 py-1.5 rounded-full">
            <Sparkles size={12} /> {maxUsage - usage} actions left
          </div>
          <a
            href="#support"
            onClick={(e) => scrollToSection(e, 'support')}
            className="hidden md:flex text-white bg-gradient-to-r from-rose to-[#d9777f] hover:opacity-90 px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold shadow-sm transition-all flex items-center gap-1.5"
          >
            <Sparkles size={14} />
            Support <span className="hidden sm:inline">Project</span>
          </a>
          <button 
            className="md:hidden text-ink/70 p-1 hover:bg-sage/5 rounded-md transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white border-b border-sage/10 shadow-lg p-5 flex flex-col gap-4 md:hidden animate-in slide-in-from-top-2">
          <div className="flex items-center justify-between bg-sage/5 px-4 py-3 rounded-xl mb-2">
            <span className="text-sm font-medium text-ink">Remaining Actions:</span>
            <div className="flex items-center gap-1.5 text-xs font-medium text-sage bg-white border border-sage/10 shadow-sm px-3 py-1.5 rounded-full">
              <Sparkles size={12} /> {maxUsage - usage} / {maxUsage}
            </div>
          </div>
          <a href="#tools" onClick={(e) => scrollToSection(e, 'tools-grid')} className="text-base font-medium text-ink hover:text-rose transition-colors py-2 border-b border-sage/5">Tools</a>
          <a href="#features" onClick={(e) => scrollToSection(e, 'features')} className="text-base font-medium text-ink hover:text-rose transition-colors py-2 border-b border-sage/5">Why Us</a>
          <a href="#testimonials" onClick={(e) => scrollToSection(e, 'testimonials')} className="text-base font-medium text-ink hover:text-rose transition-colors py-2 border-b border-sage/5">Loved By Crafters</a>
          <a 
            href="https://www.facebook.com/share/g/1HLBeMbAVJ/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-base font-medium text-[#1877F2] hover:text-[#1877F2]/80 transition-colors py-2 border-b border-sage/5 flex items-center gap-2"
          >
            <Facebook size={18} /> Join Facebook Community
          </a>
          <a
            href="#support"
            onClick={(e) => scrollToSection(e, 'support')}
            className="mt-2 text-white bg-gradient-to-r from-rose to-[#d9777f] hover:opacity-90 px-5 py-3 rounded-xl text-sm font-semibold shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <Sparkles size={16} />
            Support Project
          </a>
        </div>
      )}
    </header>
  );
}
