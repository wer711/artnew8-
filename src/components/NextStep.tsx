import React from 'react';
import { ArrowRight, Palette, Scissors, Calculator, Calendar } from 'lucide-react';

interface NextStepProps {
  title: string;
  description: string;
  targetId: string;
  icon: keyof typeof ICONS;
}

const ICONS = {
  palette: Palette,
  scissors: Scissors,
  calculator: Calculator,
  calendar: Calendar
};

export function NextStep({ title, description, targetId, icon }: NextStepProps) {
  const IconComponent = ICONS[icon];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="mt-8 bg-gradient-to-r from-sage/10 to-transparent p-4 rounded-xl border border-sage/20 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex items-center gap-4 text-left w-full">
        <div className="bg-white text-sage p-2.5 rounded-lg shadow-sm">
          <IconComponent size={20} />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-deep m-0">{title}</h4>
          <p className="text-xs text-muted m-0">{description}</p>
        </div>
      </div>
      <a 
        href={`#${targetId}`} 
        onClick={handleClick}
        className="shrink-0 flex items-center gap-2 text-xs font-semibold text-white bg-sage px-5 py-2.5 rounded-lg hover:bg-[#5a8a52] transition-colors whitespace-nowrap w-full sm:w-auto justify-center"
      >
        Go to Step <ArrowRight size={14} />
      </a>
    </div>
  );
}
