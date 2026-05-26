import React, { useState } from 'react';
import { Palette, Lock, LockOpen, Sparkles, TrendingUp, DollarSign } from 'lucide-react';
import { OCCASIONS, STYLES, getIdea } from '../data/db';
import { PaletteIdea } from '../types';

export function Generator() {
  const [occasion, setOccasion] = useState('');
  const [style, setStyle] = useState('classic');
  const [result, setResult] = useState<PaletteIdea | null>(null);
  const [locks, setLocks] = useState<Record<number, boolean>>({});

  const handleGenerate = () => {
    if (!occasion) return alert('Select an occasion first');
    const idea = getIdea(occasion, style);
    
    // Process locked colors
    if (result) {
      const mergedColors = [...idea.colors];
      const mergedNames = [...idea.names];
      idea.colors.forEach((c, i) => {
        if (locks[i] && result.colors[i]) {
          mergedColors[i] = result.colors[i];
          mergedNames[i] = result.names[i];
        }
      });
      idea.colors = mergedColors;
      idea.names = mergedNames;
    }
    setResult(idea);
  };

  const toggleLock = (i: number) => {
    setLocks(prev => ({ ...prev, [i]: !prev[i] }));
  };

  return (
    <section className="max-w-4xl mx-auto px-5 mb-16" id="tool">
      <div className="text-center mb-8">
        <p className="text-[10px] tracking-[3px] uppercase text-sage font-medium mb-3">
          ✦ Palette & Inspiration Generator
        </p>
        <h2 className="font-serif text-3xl md:text-4xl text-ink font-light mb-4">
          Plan Your <em className="italic text-rose">Colors</em> Before You Cut
        </h2>
      </div>

      <div className="bg-warm rounded-3xl p-6 md:p-10 shadow-2xl shadow-ink/5 border border-rose/10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-xs font-medium text-muted mb-1 tracking-wide">Project Type</label>
            <select className="w-full p-3 border border-rose/15 rounded-xl text-sm focus:border-rose outline-none bg-white">
              <option value="card_making">Card Making</option>
              <option value="paper_flowers">Paper Flowers</option>
              <option value="origami">Origami</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-muted mb-1 tracking-wide">Occasion</label>
            <select 
              className="w-full p-3 border border-rose/15 rounded-xl text-sm focus:border-rose outline-none bg-white"
              value={occasion}
              onChange={e => setOccasion(e.target.value)}
            >
              <option value="">Select occasion...</option>
              {OCCASIONS.map(occ => (
                <option key={occ.value} value={occ.value}>{occ.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-xs font-medium text-muted mb-2 tracking-wide">Color Mood</label>
          <div className="flex flex-wrap gap-2">
            {STYLES.map(s => (
              <button
                key={s.value}
                onClick={() => setStyle(s.value)}
                className={`px-4 py-2 rounded-full text-xs font-medium border transition-colors ${
                  style === s.value 
                    ? 'bg-rose text-white border-rose' 
                    : 'bg-white text-muted border-rose/15 hover:border-rose'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <button 
          onClick={handleGenerate}
          className="w-full py-3.5 rounded-xl bg-gradient-to-br from-rose to-deep text-white font-medium flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-rose/20 transition-all hover:-translate-y-0.5 mt-2"
        >
          <Palette size={18} />
          Generate Palette, Idea & Market Intel
        </button>

        {result && (
          <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-gradient-to-br from-sage/5 to-rose/5 rounded-2xl p-5 border border-sage/10 mb-5">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-sm font-semibold text-deep flex items-center gap-1.5"><Palette size={14} /> Color Palette</h4>
                <button onClick={handleGenerate} className="text-[10px] text-sage bg-white border border-sage/20 px-3 py-1.5 rounded-lg hover:bg-sage hover:text-white transition-colors">
                  Regenerate Unlocked
                </button>
              </div>
              
              <div className="flex gap-3 justify-center flex-wrap">
                {result.colors.map((color, i) => (
                  <div 
                    key={i} 
                    className="w-20 md:w-24 h-24 md:h-28 rounded-xl flex flex-col items-center justify-end p-2 pb-3 relative shadow-md cursor-pointer hover:-translate-y-1 transition-transform group"
                    style={{ backgroundColor: color }}
                    onClick={() => toggleLock(i)}
                  >
                    <div className="absolute top-2 right-2 text-white/80 group-hover:text-white bg-black/20 rounded-md p-1 backdrop-blur-sm">
                      {locks[i] ? <Lock size={12} /> : <LockOpen size={12} />}
                    </div>
                    <span className="text-[10px] font-semibold text-white bg-black/25 px-1.5 py-0.5 rounded shadow-sm">{color}</span>
                    <span className="text-[9px] text-white/90 text-center mt-1 leading-tight">{result.names[i]}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-rose/10 mb-3 shadow-sm">
              <h4 className="flex items-center text-xs font-semibold text-deep mb-2 gap-1.5">
                <Sparkles size={14} /> Trending Idea
                <span className="ml-auto text-[9px] px-2 py-0.5 rounded-md bg-rose/10 text-rose font-bold uppercase tracking-wider">{result.trendLevel}</span>
              </h4>
              <p className="text-sm text-ink/90 leading-relaxed">{result.idea}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <div className="bg-gradient-to-br from-gold/5 to-rose/5 rounded-xl p-4 border border-gold/15">
                <h4 className="flex items-center text-xs font-semibold text-gold mb-3 gap-1.5"><TrendingUp size={14} /> Intelligence</h4>
                <div className="flex justify-between gap-2">
                  <div className="flex-1 bg-white rounded-lg p-2 text-center text-sm font-semibold text-deep shadow-sm border border-gold/5">{result.price}</div>
                  <div className="flex-1 bg-white rounded-lg p-2 text-center text-sm font-semibold text-deep shadow-sm border border-gold/5">{result.demand}</div>
                  <div className="flex-1 bg-white rounded-lg p-2 text-center text-sm font-semibold text-deep shadow-sm border border-gold/5">{result.competition}</div>
                </div>
              </div>
              <div className="bg-sage/5 rounded-xl p-4 border border-sage/10">
                <h4 className="flex items-center text-xs font-semibold text-sage mb-2 gap-1.5">Materials</h4>
                <ul className="text-xs text-ink/80 space-y-1">
                  {result.materials.map((m, i) => <li key={i} className="border-b border-sage/10 pb-1 last:border-0">• {m}</li>)}
                </ul>
              </div>
            </div>

          </div>
        )}
      </div>
    </section>
  );
}
