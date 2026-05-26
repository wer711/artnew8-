import React from 'react';
import { useDailyLimit } from '../hooks/useDailyLimit';
import { Heart, Lock, Sparkles, Coffee } from 'lucide-react';

export function LimitModal() {
  const { showModal, setShowModal, maxUsage, streak } = useDailyLimit();

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden relative scale-in-center">
        <div className="bg-gradient-to-br from-ink to-deep p-6 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Lock size={100} />
          </div>
          <div className="relative z-10">
             <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-rose/20 text-rose mb-4 relative">
                <Lock size={32} />
             </div>
             <h2 className="text-2xl font-serif font-light text-white mb-2">Daily Limit Reached</h2>
             <p className="text-white/80 text-sm">You have exhausted your {maxUsage} free tasks for today.</p>
          </div>
        </div>
        
        <div className="p-6 text-center space-y-4">
           {streak > 0 && (
             <div className="bg-gold/10 text-gold rounded-xl p-3 inline-flex items-center gap-2 mb-2 font-medium">
                <Sparkles size={16} /> {streak} Day Streak! Come back tomorrow to keep it growing.
             </div>
           )}
           <p className="text-muted text-sm leading-relaxed">
             ArtNew8 is currently 100% free and ad-free! Server costs add up quickly. Your donations help increase these free daily limits and allow me to develop powerful new tools for crafters.
           </p>
           
           <div className="pt-4 flex flex-col gap-3">
              <a 
                href="https://www.paypal.com/ncp/payment/7TUYHE9XTU6AG" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-br from-gold to-[#9e8055] text-ink py-3.5 rounded-xl font-semibold shadow-lg hover:shadow-gold/30 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
              >
                <Coffee size={18} /> Donate to the Project
              </a>
              <button 
                onClick={() => setShowModal(false)}
                className="text-sm font-medium text-muted hover:text-ink py-2"
              >
                I'll wait until tomorrow
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
