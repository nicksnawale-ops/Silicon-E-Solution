import React from 'react';
import { motion } from 'motion/react';
import { Phone, ArrowRight, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO } from '../../data/content';

interface CtaBandProps {
  onOpenQuote: () => void;
}

export const CtaBand: React.FC<CtaBandProps> = ({ onOpenQuote }) => {
  return (
    <section className="relative py-16 lg:py-20 bg-gradient-to-r from-[#0A8BD3] via-[#0866A8] to-[#0B2545] text-white overflow-hidden">
      {/* Drifting subtle hexagon overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-15">
        <svg className="w-full h-full" viewBox="0 0 1200 400" fill="none">
          <g stroke="white" strokeWidth="1.5">
            <polygon points="150,50 200,80 200,140 150,170 100,140 100,80" />
            <polygon points="300,120 350,150 350,210 300,240 250,210 250,150" />
            <polygon points="850,70 900,100 900,160 850,190 800,160 800,100" />
            <polygon points="1020,150 1070,180 1070,240 1020,270 970,240 970,180" />
          </g>
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#8DC63F] uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Turnkey ELV & IT Architecture · PAN India</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-display tracking-tight leading-tight">
              Ready to Build Reliable Infrastructure for Your Organisation?
            </h2>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed">
              Connect with our senior engineering consultants in Pune for a comprehensive design consultation, site survey, or BOQ evaluation.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 shrink-0">
            <button
              onClick={onOpenQuote}
              className="px-7 py-3.5 rounded-full bg-white text-[#0866A8] hover:text-[#0B2545] hover:bg-slate-50 text-sm font-bold shadow-xl shadow-black/20 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Get a Free Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="tel:02022953999"
              className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/25 text-sm font-semibold backdrop-blur-md transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#8DC63F]" />
              <span>Call 020 2295 3999</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
