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
          <div className="mt-6 bg-sage/5 border border-sage/10 p-4 rounded-xl flex gap-3 items-start">
            <AlertCircle className="text-sage shrink-0" size={18} />
            <p className="text-xs text-muted leading-relaxed">
              <strong>Action needed:</strong> {upcoming[0].daysToStart <= 0 
                ? `${upcoming[0].name} is fast approaching. You should start production now!` 
                : `Prepare for ${upcoming[0].name} in ${upcoming[0].daysToStart} days. We recommend ${upcoming[0].lead} weeks of lead time.`}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
