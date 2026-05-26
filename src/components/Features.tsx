import React from 'react';
import { Shield, Zap, Scissors } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: <Shield className="text-sage" size={24} />,
      title: "100% Private",
      description: "Your files, calculations, and data never leave your browser. Zero tracking.",
    },
    {
      icon: <Zap className="text-gold" size={24} />,
      title: "No Sign-Up",
      description: "Start using all tools instantly without creating an account or remembering passwords.",
    },
    {
      icon: <Scissors className="text-rose" size={24} />,
      title: "Made for Etsy Sellers",
      description: "Tailored specifically for paper craft shop owners, with marketplace fees integrated.",
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-5">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl font-bold text-ink mb-4">Why PaperCraft Studio?</h2>
          <p className="text-muted text-sm md:text-base max-w-2xl mx-auto">Built from the ground up to solve the real problems crafters face every day.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-sage/5 border border-sage/10 p-8 rounded-2xl text-center hover:shadow-md transition-shadow">
              <div className="inline-flex justify-center items-center w-12 h-12 rounded-full bg-white shadow-sm mb-6">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-ink mb-3">{feature.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
