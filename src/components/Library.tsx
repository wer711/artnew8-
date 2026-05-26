import React, { useState } from 'react';
import { LIBRARY } from '../data/library';
import { LibraryItem } from '../types';

export function Library() {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' 
    ? LIBRARY 
    : LIBRARY.filter(i => i.type === filter);

  return (
    <section className="max-w-5xl mx-auto px-5 mb-16" id="library">
      <div className="text-center mb-8">
        <p className="text-[10px] tracking-[3px] uppercase text-sage font-medium mb-3">
          ✦ Inspiration Library
        </p>
        <h2 className="font-serif text-3xl md:text-4xl text-ink font-light mb-4">
          Browse <em className="italic text-rose">Ready-Made Ideas</em>
        </h2>
      </div>

      <div className="bg-warm rounded-3xl p-6 md:p-10 shadow-2xl shadow-ink/5 border border-gold/15">
        <div className="flex flex-wrap gap-2 mb-6 pb-6 border-b border-rose/10">
          {['all', 'palettes', 'keywords', 'titles', 'ideas'].map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wide transition-colors ${
                filter === tab 
                  ? 'bg-rose text-white' 
                  : 'bg-white text-muted border border-rose/20 hover:border-rose'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-5 border border-rose/10 hover:border-rose hover:-translate-y-1 transition-all cursor-pointer group shadow-sm hover:shadow-md">
              {item.colors && (
                <div className="flex h-8 gap-1 mb-4">
                  {item.colors.slice(0, 5).map((c, i) => (
                    <div key={i} className="flex-1 rounded" style={{ backgroundColor: c }} />
                  ))}
                </div>
              )}
              <h3 className="text-sm font-semibold text-ink line-clamp-1 mb-2">{item.title}</h3>
              <p className="text-xs text-muted leading-relaxed line-clamp-2 mb-4">{item.desc}</p>
              <div className="flex flex-wrap gap-1.5 mt-auto">
                <span className="text-[10px] px-2 py-1 rounded-md bg-sage/10 text-sage font-medium">{item.cat}</span>
                {item.badge && (
                  <span className={`text-[10px] px-2 py-1 rounded-md font-medium uppercase tracking-wider ${
                    item.badge === 'trending' ? 'bg-rose/10 text-rose' : 'bg-gold/10 text-gold'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
