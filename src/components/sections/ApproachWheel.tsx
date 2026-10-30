import React, { useState, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValueEvent,
  MotionValue,
} from 'motion/react';
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
  CheckCircle2,
  ChevronsDown,
  BadgeCheck,
} from 'lucide-react';
import { APPROACH_STEPS } from '../../data/content';
import { useIsDesktop } from '../../hooks/useIsMobile';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const iconMap: Record<string, React.ElementType> = {
  ClipboardCheck,
  FileText,
  Settings,
  Headphones,
  GraduationCap,
  ShieldCheck,
  Layers,
};

const STEP_COUNT = APPROACH_STEPS.length;
/** Scroll distance (in viewport heights) spent on each phase while the section is pinned. */
const VH_PER_STEP = 55;
/** Fixed navbar height once scrolled; the pinned stage sits right under it. */
const NAV_OFFSET = 64;
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Maps overall pinned-scroll progress (0..1) to the active phase index and progress within it. */
const phaseFromProgress = (v: number) => {
  const x = Math.min(Math.max(v, 0), 1) * STEP_COUNT;
  const index = Math.min(STEP_COUNT - 1, Math.floor(x));
  return { index, within: Math.min(1, x - index) };
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

/** 7-segment progress bar: finished phases full, current phase fills with scroll. */
const SegmentedProgress: React.FC<{ activeIndex: number; within: MotionValue<number> }> = ({
  activeIndex,
  within,
}) => (
  <div className="flex items-center gap-1.5" aria-hidden="true">
    {APPROACH_STEPS.map((s, i) => (
      <span key={s.id} className="relative h-1 flex-1 rounded-full bg-[#0A8BD3]/12 overflow-hidden">
        {i < activeIndex && (
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#0A8BD3] to-[#4FC3F7]" />
        )}
        {i === activeIndex && (
          <motion.span
            className="absolute inset-0 rounded-full bg-gradient-to-r from-[#0A8BD3] to-[#8DC63F] origin-left"
            style={{ scaleX: within }}
          />
        )}
      </span>
    ))}
  </div>
);

export const ApproachWheel: React.FC = () => {
  const isDesktop = useIsDesktop(1024);
  const prefersReduced = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  // Progress runs 0→1 across the pinned range: from the section reaching the
  // navbar until its bottom reaches the bottom of the viewport.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: [`start ${NAV_OFFSET}px`, 'end end'],
  });
  const withinPhase = useTransform(scrollYProgress, (v) => phaseFromProgress(v).within);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const { index } = phaseFromProgress(v);
    setActiveIndex((prev) => (prev === index ? prev : index));
  });

  const activeStep = APPROACH_STEPS[activeIndex];
  const activeDeliverables = PHASE_DELIVERABLES[activeStep.id] || [];
  const nextStep = APPROACH_STEPS[activeIndex + 1];
  const ActiveIcon = iconMap[activeStep.iconName] || Layers;

  /** Clicking a node scrolls to the middle of that phase's range, keeping scroll and state in sync. */
  const scrollToPhase = (index: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
    const range = el.offsetHeight - (window.innerHeight - NAV_OFFSET);
    window.scrollTo({
      top: top + ((index + 0.5) / STEP_COUNT) * range,
      behavior: prefersReduced ? 'auto' : 'smooth',
    });
  };

  const ringRadius = 38;

  const header = (compact: boolean) => (
    <div className={`max-w-3xl mx-auto text-center ${compact ? 'mb-5 xl:mb-7 [@media(max-height:820px)]:mb-4' : 'mb-10 sm:mb-12'}`}>
      <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0A8BD3] mb-2">
        <span>Turnkey IT & AV Delivery</span>
      </div>
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B2545] font-display tracking-tight">
        Our Approach: Solutions & Services
      </h2>
      <p className={`text-slate-600 text-sm sm:text-base mt-2 leading-relaxed ${compact ? '[@media(max-height:820px)]:hidden' : ''}`}>
        Turnkey execution for IT, Networking, Voice, UPS, and Audio & Visual infrastructure — structured into 7 rigorous engineering phases from initial concept to lifecycle handover.
      </p>
    </div>
  );

  // ================================================================
  // MOBILE & TABLET (< 1024px): plain vertical timeline, no pinning
  // ================================================================
  if (!isDesktop) {
    return (
      <section
        id="approach"
        className="relative w-full max-w-full overflow-x-clip py-16 sm:py-20 surface-ice surface-ice--dots"
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full max-w-full">
          {header(false)}
          {/* Strict vertical timeline: zero horizontal movement, native touch scroll */}
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
        </div>
      </section>
    );
  }

  // ================================================================
  // DESKTOP (>= 1024px): pinned stage, phases advance with scroll
  // ================================================================
  return (
    <section
      id="approach"
      ref={sectionRef}
      className="relative w-full max-w-full surface-ice surface-ice--dots"
      style={{ height: `calc(${STEP_COUNT * VH_PER_STEP}vh + 100vh - ${NAV_OFFSET}px)` }}
      aria-label="Our approach: seven delivery phases"
    >
      <div
        className="sticky w-full overflow-hidden flex flex-col"
        style={{ top: NAV_OFFSET, height: `calc(100vh - ${NAV_OFFSET}px)`, justifyContent: 'safe center' }}
      >
        {/* Soft radial glow behind the wheel */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-[32%] -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] bg-[radial-gradient(circle,rgba(10,139,211,0.08)_0%,transparent_70%)]" />
        </div>

        <div className="relative z-10 max-w-[1560px] mx-auto px-8 xl:px-12 w-full">
          {header(true)}

          {/* Wheel anchored left, card anchored right, generous gap between them */}
          <div className="flex items-center justify-between gap-10 xl:gap-16">
            {/* ---------------- Left: radial wheel ---------------- */}
            <div className="flex-1 min-w-0 flex justify-center xl:justify-start">
              <div
                className="relative aspect-square select-none"
                style={{ width: 'min(600px, calc(100vh - 330px), 100%)', minWidth: 400 }}
              >
                <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none z-0">
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

                  <circle
                    cx="50"
                    cy="50"
                    r={ringRadius}
                    stroke="rgba(10, 139, 211, 0.22)"
                    strokeWidth="0.5"
                    strokeDasharray="1.5 1.5"
                    fill="none"
                  />

                  {/* Progress ring follows scroll continuously */}
                  <motion.circle
                    cx="50"
                    cy="50"
                    r={ringRadius}
                    stroke="url(#progressRingGrad)"
                    strokeWidth="0.9"
                    strokeLinecap="round"
                    fill="none"
                    transform="rotate(-90 50 50)"
                    style={{ pathLength: scrollYProgress }}
                  />

                  {APPROACH_STEPS.map((step, idx) => {
                    const angleRad = (-90 + idx * (360 / STEP_COUNT)) * (Math.PI / 180);
                    const x1 = 50 + 19 * Math.cos(angleRad);
                    const y1 = 50 + 19 * Math.sin(angleRad);
                    const x2 = 50 + ringRadius * Math.cos(angleRad);
                    const y2 = 50 + ringRadius * Math.sin(angleRad);
                    const isSelected = idx === activeIndex;
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
                        {isSelected && !prefersReduced && (
                          <circle r="1" fill="#8DC63F">
                            <animate attributeName="cx" from={x1} to={x2} dur="1.6s" repeatCount="indefinite" />
                            <animate attributeName="cy" from={y1} to={y2} dur="1.6s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="0;1;0" dur="1.6s" repeatCount="indefinite" />
                          </circle>
                        )}
                      </g>
                    );
                  })}
                </svg>

                {/* Centre */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[38%] aspect-square rounded-full glass-card p-4 shadow-2xl border-2 border-[#0A8BD3]/25 flex flex-col items-center justify-center text-center z-10 pointer-events-none">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={activeStep.id}
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.92 }}
                      transition={{ duration: 0.25 }}
                      className="flex flex-col items-center justify-center"
                    >
                      <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#0A8BD3] to-[#8DC63F] text-white flex items-center justify-center shadow-md mb-2">
                        <Lightbulb className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono font-bold tracking-widest text-[#0A8BD3] uppercase">
                        Phase 0{activeStep.id} of 07
                      </span>
                      <h3 className="text-sm font-bold text-[#0B2545] font-display max-w-[160px] line-clamp-2 mt-0.5 leading-snug">
                        {activeStep.title}
                      </h3>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Nodes */}
                {APPROACH_STEPS.map((step, idx) => {
                  const angleRad = (-90 + idx * (360 / STEP_COUNT)) * (Math.PI / 180);
                  const x = 50 + ringRadius * Math.cos(angleRad);
                  const y = 50 + ringRadius * Math.sin(angleRad);
                  const isSelected = idx === activeIndex;
                  const isDone = idx < activeIndex;
                  const Icon = iconMap[step.iconName] || Layers;
                  return (
                    <div
                      key={step.id}
                      style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
                      className="absolute z-20 flex flex-col items-center"
                    >
                      <button
                        type="button"
                        onClick={() => scrollToPhase(idx)}
                        aria-label={`Go to phase 0${step.id}: ${step.title}`}
                        aria-current={isSelected ? 'step' : undefined}
                        className={`group relative w-14 h-14 xl:w-16 xl:h-16 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0A8BD3]/40 ${
                          isSelected
                            ? 'bg-gradient-to-tr from-[#0A8BD3] to-[#4FC3F7] text-white shadow-xl shadow-[#0A8BD3]/35 ring-4 ring-[#8DC63F]/35 scale-110'
                            : isDone
                            ? 'bg-white text-[#0A8BD3] border border-[#0A8BD3]/50 shadow-md hover:scale-105'
                            : 'bg-white/95 text-[#0A8BD3] border border-[#0A8BD3]/25 hover:border-[#0A8BD3] hover:scale-105 shadow-md hover:shadow-lg'
                        }`}
                      >
                        <Icon className={`w-5 h-5 xl:w-6 xl:h-6 ${isSelected ? 'text-white' : 'text-[#0A8BD3]'}`} />
                        <span
                          className={`absolute -top-1 -right-1 w-5 h-5 rounded-full text-[10px] font-mono font-bold flex items-center justify-center text-white border-2 border-white shadow-xs transition-colors ${
                            isSelected || isDone ? 'bg-[#8DC63F]' : 'bg-[#0B2545]'
                          }`}
                        >
                          0{step.id}
                        </span>
                      </button>
                      <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-32 text-center pointer-events-none select-none">
                        <span
                          className={`block text-[11px] xl:text-xs leading-tight line-clamp-2 transition-colors ${
                            isSelected ? 'font-bold text-[#0866A8]' : 'font-medium text-[#0B2545]/85'
                          }`}
                        >
                          {step.title}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ---------------- Right: premium phase card ---------------- */}
            <div className="w-[44%] max-w-[600px] shrink-0">
              <div
                className="relative rounded-[28px] bg-white text-left overflow-hidden"
                style={{
                  boxShadow:
                    '0 1px 2px rgba(11,37,69,0.05), 0 24px 60px -24px rgba(11,37,69,0.30), 0 0 0 1px rgba(10,139,211,0.10)',
                }}
              >
                {/* Gradient top edge */}
                <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#0A8BD3] via-[#4FC3F7] to-[#8DC63F]" />
                {/* Soft corner light */}
                <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[radial-gradient(closest-side,rgba(79,195,247,0.18),transparent)]" />

                <div className="relative p-7 xl:p-9 [@media(max-height:820px)]:p-6">
                  {/* Progress */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#0A8BD3]">
                      Phase {String(activeStep.id).padStart(2, '0')}
                      <span className="text-slate-400 font-semibold"> / 07</span>
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                      Lifecycle Delivery
                    </span>
                  </div>
                  <SegmentedProgress activeIndex={activeIndex} within={withinPhase} />

                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={activeStep.id}
                      initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                      transition={{ duration: 0.4, ease: EASE_OUT }}
                      className="relative"
                    >
                      {/* Icon tile + large outlined phase number on one row, title below */}
                      <div className="pt-6 [@media(max-height:820px)]:pt-4 flex items-end justify-between gap-4">
                        <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0A8BD3] to-[#4FC3F7] text-white flex items-center justify-center shrink-0 shadow-[0_10px_24px_-10px_rgba(10,139,211,0.7)]">
                          <ActiveIcon className="w-6 h-6" />
                        </span>
                        <span
                          aria-hidden="true"
                          className="font-display font-extrabold text-[64px] xl:text-[72px] leading-[0.8] select-none"
                          style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(10, 139, 211, 0.22)' }}
                        >
                          {String(activeStep.id).padStart(2, '0')}
                        </span>
                      </div>

                      <h3 className="mt-4 [@media(max-height:820px)]:mt-3 text-xl xl:text-2xl font-bold text-[#0B2545] font-display leading-tight">
                        {activeStep.title}
                      </h3>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#0A8BD3]">
                        {activeStep.shortDesc}
                      </p>

                      <p className="mt-4 [@media(max-height:820px)]:mt-3 text-[15px] [@media(max-height:820px)]:text-sm leading-relaxed text-slate-600">{activeStep.fullDesc}</p>

                      <div className="mt-6 [@media(max-height:820px)]:mt-4">
                        <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0B2545] mb-2">
                          Key Engineering Milestones
                        </div>
                        <ul className="divide-y divide-[#0A8BD3]/10">
                          {activeDeliverables.map((item, idx) => (
                            <motion.li
                              key={item}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.35, delay: 0.12 + idx * 0.07, ease: EASE_OUT }}
                              className="flex items-start gap-3 py-2.5 [@media(max-height:820px)]:py-2 text-sm text-slate-700 leading-snug"
                            >
                              <CheckCircle2 className="w-[18px] h-[18px] text-[#8DC63F] shrink-0 mt-px" />
                              <span>{item}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Footer: what comes next */}
                  <div className="mt-6 [@media(max-height:820px)]:mt-4 pt-4 [@media(max-height:820px)]:pt-3 border-t border-[#0A8BD3]/10 flex items-center justify-between gap-3 text-xs">
                    {nextStep ? (
                      <>
                        <span className="text-slate-500 truncate">
                          <span className="font-semibold uppercase tracking-wider text-slate-400 mr-1.5">Next</span>
                          <span className="font-semibold text-[#0B2545]">{nextStep.title}</span>
                        </span>
                        <span className="flex items-center gap-1.5 text-[#0A8BD3] font-semibold whitespace-nowrap">
                          <ChevronsDown className="w-4 h-4 motion-safe:animate-bounce" />
                          Scroll
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="flex items-center gap-1.5 font-semibold text-[#0B2545]">
                          <BadgeCheck className="w-4 h-4 text-[#8DC63F]" />
                          Turnkey handover complete
                        </span>
                        <span className="flex items-center gap-1 text-[#0A8BD3] font-semibold whitespace-nowrap">
                          Continue
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
