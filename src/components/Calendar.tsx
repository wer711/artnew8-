import React from 'react';
import { Calendar as CalendarIcon, AlertCircle } from 'lucide-react';

const EVENTS = [
  {name: "Valentine's Day", emoji: "❤️", month: 2, day: 14, lead: 6},
  {name: "Mother's Day", emoji: "🌸", month: 5, day: 11, lead: 6},
  {name: "Father's Day", emoji: "👔", month: 6, day: 15, lead: 5},
  {name: "Halloween", emoji: "🎃", month: 10, day: 31, lead: 6},
  {name: "Thanksgiving", emoji: "🦃", month: 11, day: 27, lead: 5},
  {name: "Christmas", emoji: "🎄", month: 12, day: 25, lead: 8},
];

export function Calendar() {
  const now = new Date();
  const year = now.getFullYear();
  
  const upcoming = EVENTS.map(occ => {
    let eventDate = new Date(year, occ.month - 1, occ.day);
    if (eventDate < now) eventDate = new Date(year + 1, occ.month - 1, occ.day);
    const daysUntil = Math.ceil((eventDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    let startDate = new Date(eventDate);
    startDate.setDate(startDate.getDate() - occ.lead * 7);
    const daysToStart = Math.ceil((startDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    return { ...occ, daysUntil, daysToStart, eventDate };
  }).sort((a,b) => a.daysUntil - b.daysUntil).slice(0, 4);

  return (
    <section className="max-w-4xl mx-auto px-5 mb-16" id="calendar">
      <div className="bg-warm rounded-3xl p-6 md:p-10 shadow-2xl shadow-ink/5 border border-gold/15">
        <div className="text-center mb-8">
          <p className="text-[10px] tracking-[3px] uppercase text-gold font-medium mb-3">
            ✦ Smart Occasion Calendar
          </p>
          <h2 className="font-serif text-3xl font-light">Never Miss a Sales Season</h2>
        </div>

        <div className="space-y-3">
          {upcoming.map((ev, i) => {
            const isUrgent = ev.daysToStart <= 0;
            const isSoon = ev.daysToStart > 0 && ev.daysToStart <= 14;
            
            return (
              <div key={i} className={`flex items-center gap-4 p-4 bg-white rounded-xl border-l-4 ${isUrgent ? 'border-rose' : isSoon ? 'border-gold' : 'border-sage'} shadow-sm`}>
                <div className="text-2xl">{ev.emoji}</div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-ink">{ev.name}</div>
                  <div className="text-[10px] text-muted">{ev.eventDate.toLocaleDateString()} ({ev.daysUntil} days away)</div>
                </div>
                <div className={`text-[10px] font-semibold px-3 py-1.5 rounded-lg ${isUrgent ? 'bg-rose/10 text-rose' : isSoon ? 'bg-gold/10 text-gold' : 'bg-sage/10 text-sage'}`}>
                  {isUrgent ? '⚠️ START NOW!' : `Plan in ${ev.daysToStart} days`}
                </div>
              </div>
            );
          })}
        </div>

        {upcoming.length > 0 && (
          <div className="mt-6 bg-sage/5 border border-sage/10 p-4 rounded-xl flex flex-col gap-3">
            <div className="flex items-start gap-3">
                <AlertCircle className="text-sage shrink-0 mt-0.5" size={16} />
                <p className="text-xs text-muted leading-relaxed">
                <strong>Action needed:</strong> {upcoming[0].daysToStart <= 0 
                    ? `For ${upcoming[0].name}, start production and listing now! Ensure your SEO tags are updated.` 
                    : `Prepare materials for ${upcoming[0].name}. We recommend a ${upcoming[0].lead}-week lead time for production and marketing.`}
                </p>
            </div>
            
            <div className="border-t border-sage/10 pt-3 mt-1">
                <h4 className="text-[10px] uppercase font-bold text-sage mb-2">✦ Best Platforms to Showcase</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="bg-white p-2.5 rounded border border-sage/10">
                        <strong className="text-xs text-ink block mb-0.5">Instagram Reels & TikTok</strong>
                        <p className="text-[10px] text-muted leading-tight">Post ASMR paper-cutting videos or satisfying assembly timelapses. Use trending audio.</p>
                    </div>
                    <div className="bg-white p-2.5 rounded border border-sage/10">
                        <strong className="text-xs text-ink block mb-0.5">Pinterest </strong>
                        <p className="text-[10px] text-muted leading-tight">Post high-quality vertical flat-lays 6 weeks before {upcoming[0].name}. Huge for DIY craft searches.</p>
                    </div>
                </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
