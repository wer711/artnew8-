import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ToolModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function ToolModal({ isOpen, onClose, title, children }: ToolModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-ink/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-t-3xl sm:rounded-3xl w-full sm:max-w-5xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col shadow-2xl relative animate-in slide-in-from-bottom-8 duration-300 transform mt-auto sm:mt-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="shrink-0 bg-white/95 backdrop-blur z-20 px-4 sm:px-6 py-4 border-b border-sage/10 flex justify-between items-center relative">
          <h2 className="font-serif text-lg sm:text-xl font-bold text-ink pr-10">{title}</h2>
          <button 
            onClick={onClose}
            className="p-2 absolute right-4 top-1/2 -translate-y-1/2 bg-rose/5 hover:bg-rose/10 text-rose rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar pb-10">
          {children}
        </div>
      </div>
    </div>
  );
}
