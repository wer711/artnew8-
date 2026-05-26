import React from 'react';
import { Palette, Calculator as CalcIcon, Scissors, Calendar as CalIcon } from 'lucide-react';

interface ToolsGridProps {
  onOpenTool: (toolId: string) => void;
}

export function ToolsGrid({ onOpenTool }: ToolsGridProps) {
  const tools = [
    {
      id: 'palette',
      title: "Color Palette & Planner",
      desc: "Find harmonious colors for your paper projects and extract hues from images.",
      icon: <Palette size={28} className="text-sage" />,
      btnText: "Launch Tool",
      color: "bg-sage/5 border-sage/20",
      btnColor: "bg-sage text-white hover:bg-sage/90"
    },
    {
      id: 'pricing',
      title: "Profit & Pricing Calculator",
      desc: "Calculate material costs, Etsy fees, and your actual profit instantly.",
      icon: <CalcIcon size={28} className="text-rose" />,
      btnText: "Calculate Now",
      color: "bg-rose/5 border-rose/20",
      btnColor: "bg-rose text-white hover:bg-rose/90"
    },
    {
      id: 'layout',
      title: "Material Layout Planner",
      desc: "Minimize paper waste with smart cutting guides.",
      icon: <Scissors size={28} className="text-gold" />,
      btnText: "Plan Layout",
      color: "bg-gold/5 border-gold/20",
      btnColor: "bg-gold text-ink hover:bg-[#d4ad6a]"
    },
    {
      id: 'calendar',
      title: "Seasonal Trends Calendar",
      desc: "Never miss key selling seasons and crafting holidays.",
      icon: <CalIcon size={28} className="text-[#5a8a52]" />,
      btnText: "View Calendar",
      color: "bg-[#5a8a52]/5 border-[#5a8a52]/20",
      btnColor: "bg-[#5a8a52] text-white hover:bg-[#4a7343]"
    }
  ];

  return (
    <section id="tools-grid" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-5">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink mb-4">Everything a Paper Crafter Needs</h2>
          <p className="text-muted text-sm md:text-base max-w-2xl mx-auto">A complete suite of tools to take your Etsy shop from messy to professional.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map(tool => (
            <div key={tool.id} className={`p-8 rounded-3xl border ${tool.color} bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col items-start`}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-white shadow-sm border border-black/5">
                {tool.icon}
              </div>
              <h3 className="font-serif text-xl font-bold text-ink mb-2">{tool.title}</h3>
              <p className="text-muted text-sm leading-relaxed mb-8 flex-grow">{tool.desc}</p>
              
              <button 
                onClick={() => onOpenTool(tool.id)}
                className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors w-full sm:w-auto ${tool.btnColor}`}
              >
                {tool.btnText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
