import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Lightbulb,
  ClipboardCheck,
  FileText,
  Settings,
  Headphones,
  GraduationCap,
  ShieldCheck,
  Layers,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Play,
  Pause,
} from 'lucide-react';
import { APPROACH_STEPS } from '../../data/content';
import { useIsDesktop } from '../../hooks/useIsMobile';

const iconMap: Record<string, React.ElementType> = {
  ClipboardCheck,
  FileText,
  Settings,
  Headphones,
  GraduationCap,
  ShieldCheck,
  Layers,
};

const PHASE_DELIVERABLES: Record<number, string[]> = {
  1: [
    'Comprehensive site inspection & physical pathway survey',
    'Throughput, bandwidth load & concurrency calculations',
    'Vendor-neutral technological audit & feasibility analysis',
  ],
  2: [
    'AutoCAD schematics, cable schedules & single-line diagrams',
    '3D RF heatmaps, thermal calculations & rack space layouts',
    'Exhaustive Bill of Quantities (BOQ) & execution specifications',
  ],
  3: [
    'Supply, Installation, Testing & Commissioning (SITC)',
    'Direct supervision by certified OEM project directors',
    'Zero-defect cabling termination & electromagnetic segregation',
  ],
  4: [
    '24/7 dedicated rapid-response technical helpdesk',
    'Scheduled preventive health checkups & firmware updates',
    'On-site field engineers dispatched for emergency incidents',
  ],
  5: [
    'Structured hands-on training workshops for internal IT staff',
    'Custom operational SOPs, runbooks & escalation matrices',
    'Interactive walkthroughs for AV, BMS & nurse call software',
  ],
  6: [
    'Comprehensive Annual Maintenance Contracts (AMC)',
    'Guaranteed SLAs with genuine OEM spare parts inventory',
    'Periodic calibration of acoustic, optical & security sensors',
  ],
  7: [
    'Single-point accountability from raw blueprint to handover',
    '100% Fluke & OTDR printed certification test reports',
    'Formal project commissioning & lifetime operational readiness',
  ],
};

export const ApproachWheel: React.FC = () => {
  const isDesktop = useIsDesktop(1024);
  const [activeStepId, setActiveStepId] = useState<number>(1);
  const [isHoveredWheel, setIsHoveredWheel] = useState<boolean>(false);
  const [hasUserInteracted, setHasUserInteracted] = useState<boolean>(false);
  const [isInView, setIsInView] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement>(null);

  const activeStep = APPROACH_STEPS.find((s) => s.id === activeStepId) || APPROACH_STEPS[0];
  const activeDeliverables = PHASE_DELIVERABLES[activeStep.id] || [];

  // Track if section is in viewport (Desktop only)
  useEffect(() => {
    if (!isDesktop) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [isDesktop]);

  // Auto-advance through phases every 4s on desktop when in view
  useEffect(() => {
    if (!isDesktop || hasUserInteracted || isHoveredWheel || !isInView) return;

    const timer = setInterval(() => {
      if (document.hidden) return;
      setActiveStepId((prev) => (prev % APPROACH_STEPS.length) + 1);
    }, 4000);

    return () => clearInterval(timer);
  }, [isDesktop, hasUserInteracted, isHoveredWheel, isInView]);

  const handleSelectPhase = (stepId: number, isDirectClick = true) => {
    if (isDirectClick) {
      setHasUserInteracted(true);
    }
    setActiveStepId(stepId);
  };

  const handlePrevPhase = () => {
    setHasUserInteracted(true);
    setActiveStepId((prev) => (prev === 1 ? APPROACH_STEPS.length : prev - 1));
  };

  const handleNextPhase = () => {
    setHasUserInteracted(true);
    setActiveStepId((prev) => (prev % APPROACH_STEPS.length) + 1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isDesktop) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      handleNextPhase();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      handlePrevPhase();
    }
  };

  // Circumference for outer dashed ring with radius = 38%
  const ringRadius = 38;
  const circumference = 2 * Math.PI * ringRadius;

  return (
    <section
      id="approach"
      ref={sectionRef}
      onKeyDown={handleKeyDown}
      className="relative w-full max-w-full overflow-x-clip py-16 sm:py-20 lg:py-28 surface-ice surface-ice--dots"
    >
      {/* Background soft radial glow - strictly constrained within container */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(10,139,211,0.06)_0%,transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full max-w-full">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0A8BD3] mb-2">
            <span>Turnkey IT & AV Delivery</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B2545] font-display tracking-tight">
            Our Approach: Solutions & Services
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Turnkey execution for IT, Networking, Voice, UPS, and Audio & Visual infrastructure — structured into 7 rigorous engineering phases from initial concept to lifecycle handover.
          </p>
        </div>

        {/* ======================================================== */}
        {/* DESKTOP (>= 1024px) RADIAL WHEEL VIEW                   */}
        {/* ======================================================== */}
        {isDesktop ? (
          <div className="w-full">
            <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column (55%): Radial Interactive Wheel */}
              <div className="col-span-7 flex flex-col items-center justify-center">
                <div
                  onMouseEnter={() => setIsHoveredWheel(true)}
                  onMouseLeave={() => setIsHoveredWheel(false)}
                  className="relative w-[500px] h-[500px] lg:w-[540px] lg:h-[540px] xl:w-[580px] xl:h-[580px] max-w-full aspect-square mx-auto select-none"
                >
                  {/* SVG Background Layer: Connecting lines, dashed ring, and progress arc */}
                  <svg
                    viewBox="0 0 100 100"
                    className="absolute inset-0 w-full h-full pointer-events-none z-0"
                  >
                    <defs>
                      <linearGradient id="activeLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#0A8BD3" />
                        <stop offset="100%" stopColor="#8DC63F" />
                      </linearGradient>
                      <linearGradient id="progressRingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#0A8BD3" />
                        <stop offset="50%" stopColor="#4FC3F7" />
                        <stop offset="100%" stopColor="#8DC63F" />
                      </linearGradient>
                    </defs>

                    {/* Outer base dashed ring */}
                    <circle
                      cx="50"
                      cy="50"
                      r={ringRadius}
                      stroke="rgba(10, 139, 211, 0.22)"
                      strokeWidth="0.5"
                      strokeDasharray="1.5 1.5"
                      fill="none"
                    />

                    {/* Colored progress arc showing active phase */}
                    <circle
                      cx="50"
                      cy="50"
                      r={ringRadius}
                      stroke="url(#progressRingGrad)"
                      strokeWidth="0.9"
                      strokeDasharray={`${(activeStepId / 7) * circumference} ${circumference}`}
                      strokeDashoffset="0"
                      strokeLinecap="round"
                      fill="none"
                      transform="rotate(-90 50 50)"
                      style={{ transition: 'stroke-dasharray 0.4s ease' }}
                    />

                    {/* Connector lines radiating from center to each node */}
                    {APPROACH_STEPS.map((step, idx) => {
                      const angleRad = (-90 + idx * (360 / 7)) * (Math.PI / 180);
                      const innerR = 19;
                      const outerR = ringRadius;
                      const x1 = 50 + innerR * Math.cos(angleRad);
                      const y1 = 50 + innerR * Math.sin(angleRad);
                      const x2 = 50 + outerR * Math.cos(angleRad);
                      const y2 = 50 + outerR * Math.sin(angleRad);
                      const isSelected = activeStepId === step.id;

                      return (
                        <g key={step.id}>
                          <line
                            x1={x1}
                            y1={y1}
                            x2={x2}
                            y2={y2}
                            stroke={isSelected ? 'url(#activeLineGrad)' : 'rgba(10, 139, 211, 0.15)'}
                            strokeWidth={isSelected ? '0.9' : '0.4'}
                            style={{ transition: 'stroke 0.3s ease, stroke-width 0.3s ease' }}
                          />
                          {isSelected && (
                            <circle r="1" fill="#8DC63F">
                              <animate
                                attributeName="cx"
                                from={x1}
                                to={x2}
                                dur="1.6s"
                                repeatCount="indefinite"
                              />
                              <animate
                                attributeName="cy"
                                from={y1}
                                to={y2}
                                dur="1.6s"
                                repeatCount="indefinite"
                              />
                              <animate
                                attributeName="opacity"
                                values="0;1;0"
                                dur="1.6s"
                                repeatCount="indefinite"
                              />
                            </circle>
                          )}
                        </g>
                      );
                    })}
                  </svg>

                  {/* Central Circle */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] lg:w-[220px] lg:h-[220px] rounded-full glass-card p-5 shadow-2xl border-2 border-[#0A8BD3]/25 flex flex-col items-center justify-center text-center z-10 pointer-events-none">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeStep.id}
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.92 }}
                        transition={{ duration: 0.25 }}
                        className="flex flex-col items-center justify-center"
                      >
                        <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#0A8BD3] to-[#8DC63F] text-white flex items-center justify-center shadow-md mb-2">
                          <Lightbulb className="w-5 h-5 animate-pulse" />
                        </div>

                        <span className="text-[10px] font-mono font-bold tracking-widest text-[#0A8BD3] uppercase">
                          Phase 0{activeStep.id} of 07
                        </span>

                        <h3 className="text-xs sm:text-sm font-bold text-[#0B2545] font-display max-w-[160px] line-clamp-2 mt-0.5 leading-snug">
                          {activeStep.title}
                        </h3>

                        <p className="text-[10px] text-slate-500 max-w-[160px] line-clamp-1 mt-1 leading-tight font-medium">
                          {activeStep.shortDesc}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* 7 Phase Nodes on the Outer Ring */}
                  {APPROACH_STEPS.map((step, idx) => {
                    const angleDeg = -90 + idx * (360 / 7);
                    const angleRad = angleDeg * (Math.PI / 180);
                    const x = 50 + ringRadius * Math.cos(angleRad);
                    const y = 50 + ringRadius * Math.sin(angleRad);
                    const isSelected = activeStepId === step.id;
                    const Icon = iconMap[step.iconName] || Layers;

                    return (
                      <div
                        key={step.id}
                        style={{
                          left: `${x}%`,
                          top: `${y}%`,
                          transform: 'translate(-50%, -50%)',
                        }}
                        className="absolute z-20 flex flex-col items-center"
                      >
                        {/* Node Trigger Button */}
                        <button
                          type="button"
                          onClick={() => handleSelectPhase(step.id, true)}
                          onMouseEnter={() => handleSelectPhase(step.id, false)}
                          aria-label={`Phase 0${step.id}: ${step.title}`}
                          className={`group relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${
                            isSelected
                              ? 'bg-gradient-to-tr from-[#0A8BD3] to-[#4FC3F7] text-white shadow-xl shadow-[#0A8BD3]/35 ring-4 ring-[#8DC63F]/35 scale-110'
                              : 'bg-white/95 text-[#0A8BD3] border border-[#0A8BD3]/25 hover:border-[#0A8BD3] hover:scale-105 shadow-md hover:shadow-lg'
                          }`}
                        >
                          <Icon
                            className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 ${
                              isSelected ? 'scale-110 text-white' : 'text-[#0A8BD3] group-hover:scale-110'
                            }`}
                          />

                          {/* Number Badge */}
                          <span
                            className={`absolute -top-1 -right-1 w-5 h-5 rounded-full text-[10px] font-mono font-bold flex items-center justify-center text-white border-2 border-white shadow-xs transition-colors ${
                              isSelected ? 'bg-[#8DC63F]' : 'bg-[#0B2545]'
                            }`}
                          >
                            0{step.id}
                          </span>
                        </button>

                        {/* Phase Title Label below node */}
                        <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-28 sm:w-32 text-center pointer-events-none select-none">
                          <span
                            className={`block text-[11px] sm:text-xs leading-tight line-clamp-2 transition-colors ${
                              isSelected
                                ? 'font-bold text-[#0866A8]'
                                : 'font-medium text-[#0B2545]/85'
                            }`}
                          >
                            {step.title}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Status bar & auto-play indicator under wheel */}
                <div className="mt-8 flex items-center gap-3 text-xs text-slate-500 font-mono">
                  <span className="flex items-center gap-1.5">
                    {hasUserInteracted ? (
                      <Pause className="w-3.5 h-3.5 text-slate-400" />
                    ) : isHoveredWheel ? (
                      <Pause className="w-3.5 h-3.5 text-[#0A8BD3]" />
                    ) : (
                      <Play className="w-3.5 h-3.5 text-[#8DC63F] animate-pulse" />
                    )}
                    <span>
                      {hasUserInteracted
                        ? 'Manual selection'
                        : isHoveredWheel
                        ? 'Paused on hover'
                        : 'Auto-advancing (4s)'}
                    </span>
                  </span>
                  <span className="text-slate-300">|</span>
                  <span>Use ← → keys to switch</span>
                </div>
              </div>

              {/* Right Column (45%): Active Phase Detail Card */}
              <div className="col-span-5 w-full max-w-xl mx-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="glass-card p-6 sm:p-8 rounded-3xl border border-[#0A8BD3]/25 shadow-xl text-left flex flex-col justify-between"
                  >
                    <div>
                      {/* Header meta badge */}
                      <div className="flex items-center justify-between gap-3 mb-3 pb-3 border-b border-[#0A8BD3]/10">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 rounded-lg bg-[#E8F6FD] text-[#0A8BD3] text-xs font-mono font-bold">
                            PHASE 0{activeStep.id} / 07
                          </span>
                          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                            Lifecycle Delivery
                          </span>
                        </div>
                        <div
                          className="w-8 h-8 rounded-xl flex items-center justify-center text-white shrink-0 shadow-xs"
                          style={{ backgroundColor: activeStep.color }}
                        >
                          {React.createElement(iconMap[activeStep.iconName] || Layers, {
                            className: 'w-4 h-4',
                          })}
                        </div>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-[#0B2545] font-display">
                        {activeStep.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-semibold text-[#0A8BD3] uppercase tracking-wider mt-0.5">
                        {activeStep.shortDesc}
                      </p>

                      <p className="text-slate-600 text-sm leading-relaxed mt-4">
                        {activeStep.fullDesc}
                      </p>

                      {/* Engineering Deliverables */}
                      <div className="mt-6 pt-4 border-t border-slate-100">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B2545] mb-2.5">
                          Key Engineering Milestones
                        </h4>
                        <ul className="space-y-2">
                          {activeDeliverables.map((item, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 leading-snug"
                            >
                              <CheckCircle2 className="w-4 h-4 text-[#8DC63F] shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Navigation controls */}
                    <div className="mt-8 pt-4 border-t border-[#0A8BD3]/15 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={handlePrevPhase}
                        className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-[#0B2545] hover:text-[#0A8BD3] text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Previous</span>
                      </button>

                      {/* Step pills */}
                      <div className="flex items-center gap-1">
                        {APPROACH_STEPS.map((s) => (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => handleSelectPhase(s.id, true)}
                            aria-label={`Go to phase 0${s.id}`}
                            className={`w-6 h-6 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer ${
                              activeStepId === s.id
                                ? 'bg-[#0A8BD3] text-white shadow-xs scale-105'
                                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                            }`}
                          >
                            {s.id}
                          </button>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={handleNextPhase}
                        className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#0A8BD3] to-[#4FC3F7] text-white text-xs font-semibold shadow-xs hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>Next</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        ) : (
          /* ======================================================== */
          /* MOBILE & TABLET (< 1024px) STRICT VERTICAL TIMELINE     */
          /* Zero horizontal movement, fully native touch scroll      */
          /* ======================================================== */
          <ol className="relative w-full max-w-full flex flex-col gap-6 text-left p-0 m-0 list-none">
            {/* The vertical line: absolute, left: 15px, top: 0, bottom: 0, width: 2px */}
            <div className="absolute left-[15px] top-3 bottom-6 w-[2px] bg-[#0A8BD3]/25 pointer-events-none" />

            {APPROACH_STEPS.map((step) => {
              const deliverables = PHASE_DELIVERABLES[step.id] || [];
              const Icon = iconMap[step.iconName] || Layers;

              return (
                <motion.li
                  key={step.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-full max-w-full min-w-0 pl-12 list-none"
                >
                  {/* Number badge absolutely positioned at left: 0 */}
                  <div
                    className="absolute left-0 top-0 w-8 h-8 rounded-full border-2 border-white shadow-md flex items-center justify-center text-white text-xs font-bold font-mono z-10"
                    style={{ backgroundColor: step.color }}
                  >
                    0{step.id}
                  </div>

                  {/* Card is w-full max-w-full min-w-0 */}
                  <div className="w-full max-w-full min-w-0 glass-card p-4 sm:p-5 rounded-2xl border border-[#0A8BD3]/15 shadow-xs bg-white text-left">
                    {/* Header info */}
                    <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2 mb-2 min-w-0">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="text-[11px] font-mono font-bold text-[#0A8BD3] uppercase tracking-wider shrink-0">
                          PHASE 0{step.id}
                        </span>
                        <span className="text-slate-300 text-xs shrink-0">·</span>
                        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider truncate min-w-0 [overflow-wrap:anywhere]">
                          {step.shortDesc}
                        </span>
                      </div>

                      <div
                        className="w-6 h-6 rounded-lg flex items-center justify-center text-white shrink-0 shadow-2xs"
                        style={{ backgroundColor: step.color }}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-bold text-[#0B2545] font-display min-w-0 [overflow-wrap:anywhere] break-words leading-snug">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed min-w-0 [overflow-wrap:anywhere] break-words">
                      {step.fullDesc}
                    </p>

                    {/* Key Engineering Milestones */}
                    <div className="mt-3.5 pt-3 border-t border-slate-100">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#0B2545] mb-2">
                        Key Engineering Milestones
                      </div>
                      <ul className="space-y-1.5 p-0 m-0 list-none">
                        {deliverables.map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-xs text-slate-600 min-w-0 [overflow-wrap:anywhere] break-words leading-tight"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#8DC63F] shrink-0 mt-0.5" />
                            <span className="min-w-0 [overflow-wrap:anywhere] break-words">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        )}
      </div>
    </section>
  );
};
