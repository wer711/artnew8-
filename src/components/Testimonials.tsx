import React from 'react';

export function Testimonials() {
  const reviews = [
    {
      name: "Sarah Jenkins",
      role: "Etsy Seller (5k+ Sales)",
      text: "This color tool saved me hours! Finally, I can automatically generate matching palettes for my layered mandala designs. Highly recommended.",
      initials: "SJ",
      color: "bg-rose/20 text-rose"
    },
    {
      name: "Emily Chen",
      role: "Paper Florist",
      text: "The pricing calculator handles all the confusing Etsy fees perfectly. I realized I was undercharging for my time for the last two years!",
      initials: "EC",
      color: "bg-sage/20 text-sage"
    },
    {
      name: "Jessica V.",
      role: "Card Maker",
      text: "Love that everything is private and fast. The layout planner helps me use every last inch of my expensive cardstock.",
      initials: "JV",
      color: "bg-gold/20 text-gold"
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-rose/5 border-t border-rose/10">
      <div className="max-w-7xl mx-auto px-5">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl font-bold text-ink mb-4">Loved by Crafters</h2>
          <p className="text-muted text-sm md:text-base max-w-2xl mx-auto">See how other shop owners are improving their workflow and increasing profits.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-sage/10">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${review.color}`}>
                  {review.initials}
                </div>
                <div>
                  <h4 className="font-bold text-ink text-sm">{review.name}</h4>
                  <p className="text-xs text-muted">{review.role}</p>
                </div>
              </div>
              <p className="text-sm text-ink/80 leading-relaxed italic">"{review.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
