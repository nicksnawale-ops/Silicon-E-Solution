import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ChevronRight, Layers, Sparkles } from 'lucide-react';
import { SHOWCASE_ITEMS } from '../../data/content';
import { ServiceAnimation } from '../ui/ServiceAnimation';

export const SolutionsShowcase: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(SHOWCASE_ITEMS[0].id);
  const activeItem = SHOWCASE_ITEMS.find((item) => item.id === activeId) || SHOWCASE_ITEMS[0];
  const activeIndex = SHOWCASE_ITEMS.findIndex((item) => item.id === activeId);

  return (
    <section id="solutions" className="relative py-20 lg:py-28 surface-ice surface-ice--dots overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 text-left">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0A8BD3] mb-2">
            <span>Interactive Technical Showcase</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B2545] font-display tracking-tight">
            Detailed Solution Architectures
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
            Examine the granular engineering specifications, equipment topologies, and failover redundancies powering our turnkey IT installations.
          </p>
        </div>

        {/* Desktop Sticky Layout */}
        <div className="hidden lg:grid grid-cols-12 gap-8 items-start">
          {/* Left Pinned Nav */}
          <div className="col-span-4 sticky top-28 space-y-1.5 p-3 rounded-3xl bg-[#F6FAFD] border border-[#0A8BD3]/15">
            <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-[#0B2545] border-b border-[#0A8BD3]/10 flex items-center justify-between">
              <span>Solution Categories</span>
              <span className="font-mono text-[10px] text-[#0A8BD3]">0{activeIndex + 1} / 0{SHOWCASE_ITEMS.length}</span>
            </div>

            <div className="space-y-1 pt-1">
              {SHOWCASE_ITEMS.map((item, idx) => {
                const isActive = item.id === activeId;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveId(item.id)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                      isActive
                        ? 'bg-white text-[#0866A8] shadow-xs border border-[#0A8BD3]/30'
                        : 'text-slate-600 hover:text-[#0B2545] hover:bg-white/60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isActive ? 'bg-[#8DC63F]' : 'bg-slate-300'}`} />
                      <span className="truncate">{item.title}</span>
                    </div>
                    {isActive && <ChevronRight className="w-4 h-4 text-[#0A8BD3] shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Dynamic Content Pane */}
          <div className="col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="glass-card p-8 rounded-3xl border border-[#0A8BD3]/20 shadow-lg space-y-6 text-left"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-4 border-b border-[#0A8BD3]/15 pb-6">
                  <div>
                    <span className="text-[11px] font-mono text-[#0A8BD3] font-bold uppercase tracking-wider block mb-1">
                      {activeItem.highlight}
                    </span>
                    <h3 className="text-2xl font-bold text-[#0B2545] font-display">
                      {activeItem.title}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                      {activeItem.subtitle}
                    </p>
                  </div>

                  <div className="w-12 h-12 rounded-2xl bg-[#E8F6FD] border border-[#0A8BD3]/20 flex items-center justify-center text-[#0A8BD3] shrink-0">
                    <Layers className="w-6 h-6" />
                  </div>
                </div>

                {/* Themed Live Simulation */}
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    Active System Diagram Simulation
                  </div>
                  <ServiceAnimation serviceId={activeItem.id} isHovered={true} className="h-28" />
                </div>

                {/* Key Architectural Bullets */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B2545] mb-3">
                    Architectural Highlights
                  </h4>
                  <div className="space-y-2.5">
                    {activeItem.bullets.map((bullet, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-[#8DC63F] shrink-0 mt-1" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Specifications Grid */}
                <div className="pt-4 border-t border-[#0A8BD3]/10">
                  <div className="grid grid-cols-3 gap-3">
                    {activeItem.specs.map((spec, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-[#F6FAFD] border border-[#0A8BD3]/10 text-left">
                        <span className="text-[10px] uppercase font-mono text-slate-400 block">
                          {spec.label}
                        </span>
                        <span className="text-xs font-bold text-[#0B2545] font-display mt-0.5 block">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Swipeable / Snap Carousel */}
        <div className="lg:hidden w-full max-w-full overflow-hidden">
          <div className="flex gap-4 overflow-x-auto pb-4 pt-2 snap-x snap-mandatory no-scrollbar text-left w-full max-w-full [overscroll-behavior-x:contain]">
            {SHOWCASE_ITEMS.map((item) => (
              <div
                key={item.id}
                className="w-[85vw] max-w-[calc(100vw-3rem)] sm:w-[420px] shrink-0 snap-center glass-card p-5 sm:p-6 rounded-3xl border border-[#0A8BD3]/20 shadow-md space-y-4"
              >
                <div>
                  <span className="text-[10px] font-mono text-[#0A8BD3] font-bold uppercase tracking-wider">
                    {item.highlight}
                  </span>
                  <h3 className="text-lg font-bold text-[#0B2545] font-display mt-0.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {item.subtitle}
                  </p>
                </div>

                <ServiceAnimation serviceId={item.id} className="h-24" />

                <div className="space-y-2">
                  {item.bullets.map((bullet, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#8DC63F] shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100">
                  {item.specs.map((spec, idx) => (
                    <div key={idx} className="p-2 rounded-lg bg-[#F6FAFD] text-[10px]">
                      <span className="text-slate-400 block">{spec.label}</span>
                      <span className="font-bold text-[#0B2545]">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
