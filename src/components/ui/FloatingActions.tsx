import React, { useState } from 'react';
import { Phone, MessageSquare, X, ArrowUp } from 'lucide-react';
import { COMPANY_INFO } from '../../data/content';

export const FloatingActions: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto max-w-[calc(100vw-32px)]">
      {/* Expanded quick contact tray */}
      {isOpen && (
        <div className="glass-card p-3 rounded-2xl shadow-xl border border-[#0A8BD3]/20 flex flex-col gap-2 min-w-[210px] max-w-[calc(100vw-32px)] animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="text-[11px] font-semibold text-[#0B2545] uppercase tracking-wider px-2 py-1 border-b border-slate-100 flex items-center justify-between">
            <span>Direct Connect</span>
            <span className="text-[10px] font-mono text-[#8DC63F] font-bold">Pune Office</span>
          </div>

          <a
            href={`https://wa.me/918380041202?text=Hello%20Silicon%20e%20Solution,%20I%20would%20like%20to%20discuss%20an%20IT%20infrastructure%20project.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-[#8DC63F]/10 text-slate-700 hover:text-slate-900 transition-colors text-xs font-medium"
          >
            <div className="w-7 h-7 rounded-lg bg-[#8DC63F] text-white flex items-center justify-center shrink-0">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-[#0B2545]">WhatsApp Us</p>
              <p className="text-[11px] text-slate-500">+91 83800 41202</p>
            </div>
          </a>

          <a
            href="tel:02022953999"
            className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-[#0A8BD3]/10 text-slate-700 hover:text-slate-900 transition-colors text-xs font-medium"
          >
            <div className="w-7 h-7 rounded-lg bg-[#0A8BD3] text-white flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-[#0B2545]">Pune Desk</p>
              <p className="text-[11px] text-slate-500">020 2295 3999</p>
            </div>
          </a>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors text-xs font-medium border-t border-slate-100 mt-1"
          >
            <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
              <ArrowUp className="w-4 h-4" />
            </div>
            <span>Back to Top</span>
          </button>
        </div>
      )}

      {/* Main Trigger Button with pulse ring */}
      <div className="relative">
        {/* Soft Pulse ring - bounded within viewport */}
        <div className="absolute inset-0 rounded-full bg-[#8DC63F] opacity-40 animate-soft-pulse pointer-events-none" />

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Direct Contact Support"
          className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-[#0A8BD3] to-[#8DC63F] text-white flex items-center justify-center shadow-lg shadow-[#0A8BD3]/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Phone className="w-6 h-6" />}
        </button>
      </div>
    </div>
  );
};
