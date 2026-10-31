import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Cable,
  ChevronRight,
  ClipboardCheck,
  Flame,
  HeartPulse,
  Network,
  PenTool,
  PhoneCall,
  Server,
  Shield,
  Sparkles,
  Wifi,
  Wrench,
  ScanSearch,
} from 'lucide-react';
import { SERVICES_LIST, SHOWCASE_ITEMS } from '../data/content';
import { ORDERED_SOLUTIONS, SOLUTION_DOMAINS, SOLUTION_SERVICE, SolutionDomain } from '../data/solutions';
import { ServiceItem } from '../types';
import { ServiceVisual } from '../components/ui/ServiceVisual';
import { CtaBand } from '../components/sections/CtaBand';
import { navigate } from '../lib/router';

interface SolutionsPageProps {
  onSelectService: (service: ServiceItem) => void;
  onOpenQuote: () => void;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
/** Fixed navbar (64px) + sticky index bar (~60px) + breathing room. */
const ANCHOR_OFFSET = 140;

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.7, delay, ease: EASE },
});

export const solutionIcons: Record<string, React.ElementType> = {
  'networking-switches': Network,
  'rf-wireless': Wifi,
  'server-room': Server,
  'passive-cabling-sol': Cable,
  'security-system': Shield,
  'fapa-system': Flame,
  'nurse-calling': HeartPulse,
  'bms-system': Building2,
  'voice-solution': PhoneCall,
};

const HERO_STATS = [
  { value: '3.2 Tbps', label: 'Core switching' },
  { value: 'Tier III', label: 'Datacentre design' },
  { value: 'EN54', label: 'Life-safety standard' },
  { value: '25 yr', label: 'Cabling warranty' },
];

const STANDARDS = [
  'EN54 / NFPA 72',
  'HTM 08-03',
  'Tier III',
  'WPA3 Enterprise',
  '802.1X',
  'BACnet IP',
  'Modbus',
  'OSPF · BGP · VRRP',
  'TLS & SRTP',
  'Fluke Certified',
  'OS2 · OM3 · OM4',
  'IP68',
];

const DELIVERY = [
  { icon: ScanSearch, title: 'Site survey', desc: 'RF heatmaps, load studies and civil walkthroughs before a single drawing.' },
  { icon: PenTool, title: 'Architecture design', desc: 'CAD schematics, redundancy plans and a bill of materials you can audit.' },
  { icon: Wrench, title: 'Build & integrate', desc: 'Certified engineers install, terminate and integrate every subsystem.' },
  { icon: ClipboardCheck, title: 'Certify & hand over', desc: 'Test reports, as-built drawings, training and AMC from day one.' },
];

const pad = (n: number) => String(n).padStart(2, '0');

/* ------------------------------------------------------------------ */
/* Solution blueprint                                                  */
/* ------------------------------------------------------------------ */

const Blueprint: React.FC<{
  id: string;
  number: number;
  flip: boolean;
  onSelectService: (s: ServiceItem) => void;
  onOpenQuote: () => void;
}> = ({ id, number, flip, onSelectService, onOpenQuote }) => {
  const item = SHOWCASE_ITEMS.find((s) => s.id === id);
  if (!item) return null;
  const Icon = solutionIcons[id] ?? Network;
  const service = SERVICES_LIST.find((s) => s.id === SOLUTION_SERVICE[id]);

  return (
    <motion.article
      id={id}
      style={{ scrollMarginTop: ANCHOR_OFFSET }}
      {...reveal()}
      className="relative rounded-[32px] p-[1px] bg-gradient-to-br from-[#4FC3F7]/50 via-[#0A8BD3]/10 to-[#8DC63F]/40 shadow-[0_40px_80px_-50px_rgba(8,27,51,0.7)]"
    >
      <div className="relative grid lg:grid-cols-2 overflow-hidden rounded-[31px] bg-white">
        {/* Dark engineering panel: live diagram + spec readouts */}
        <div
          className={`relative p-5 sm:p-7 lg:p-9 text-white flex flex-col ${flip ? 'lg:order-2' : ''}`}
          style={{ background: 'radial-gradient(120% 110% at 0% 0%, #165C95 0%, #0D2E52 50%, #081B33 100%)' }}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage:
                'linear-gradient(rgba(79,195,247,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(79,195,247,0.09) 1px, transparent 1px)',
              backgroundSize: '26px 26px',
              maskImage: 'radial-gradient(ellipse 90% 80% at 50% 30%, #000 20%, transparent 80%)',
              WebkitMaskImage: 'radial-gradient(ellipse 90% 80% at 50% 30%, #000 20%, transparent 80%)',
            }}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-4 -top-8 font-display font-extrabold text-[150px] leading-none text-white/[0.04] select-none"
          >
            {pad(number)}
          </span>

          <div className="relative flex items-center justify-between">
            <span className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7FD3F7]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8DC63F] shadow-[0_0_10px_#8DC63F]" />
              Architecture {pad(number)}
            </span>
            <span className="font-mono text-[10px] text-white/40">SYSTEM DIAGRAM</span>
          </div>

          <div className="relative mt-5 flex-1 flex flex-col rounded-[22px] p-[1px] bg-gradient-to-br from-[#4FC3F7]/50 via-white/10 to-[#8DC63F]/40">
            <ServiceVisual serviceId={id} className="flex-1 h-full min-h-[200px] sm:min-h-[240px] rounded-[21px]" />
          </div>

          <div className="relative grid grid-cols-3 gap-2.5 sm:gap-3 pt-5">
            {item.specs.map((spec) => (
              <div key={spec.label} className="rounded-2xl bg-white/[0.06] ring-1 ring-white/10 p-3 backdrop-blur-sm">
                <span className="block font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-white/45 leading-tight">
                  {spec.label}
                </span>
                <span className="mt-1 block text-[11px] sm:text-sm font-bold font-display text-white leading-snug">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Narrative */}
        <div className={`relative p-6 sm:p-8 lg:p-10 flex flex-col ${flip ? 'lg:order-1' : ''}`}>
          <div className="flex items-center gap-3">
            <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0A8BD3] to-[#4FC3F7] text-white flex items-center justify-center shadow-[0_12px_26px_-10px_rgba(10,139,211,0.8)]">
              <Icon className="w-6 h-6" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0A8BD3]">{item.highlight}</span>
          </div>

          <h3 className="mt-5 text-2xl sm:text-[28px] lg:text-[32px] leading-tight font-extrabold tracking-tight text-[#0B2545] font-display">
            {item.title}
          </h3>
          <p className="mt-3 text-[15px] sm:text-base text-slate-600 leading-relaxed">{item.subtitle}</p>

          <div className="mt-7 text-[11px] font-bold uppercase tracking-[0.16em] text-[#0B2545]/70">Architectural highlights</div>
          <ol className="mt-3 space-y-3">
            {item.bullets.map((b, i) => (
              <li
                key={i}
                className="group flex gap-4 rounded-2xl p-3.5 -mx-1 bg-[#F4F9FD] ring-1 ring-[#0A8BD3]/[0.08] hover:ring-[#0A8BD3]/25 hover:bg-white transition-all"
              >
                <span className="font-mono text-xs font-bold text-[#0A8BD3] pt-0.5 shrink-0">{pad(i + 1)}</span>
                <span className="text-sm text-slate-700 leading-relaxed">{b}</span>
              </li>
            ))}
          </ol>

          <div className="mt-auto pt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onOpenQuote}
              className="group inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-[#0A8BD3] to-[#4FC3F7] text-white text-sm font-semibold shadow-[0_12px_28px_-10px_rgba(10,139,211,0.7)] hover:-translate-y-0.5 transition-transform cursor-pointer"
            >
              Discuss this architecture
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            {service && (
              <button
                type="button"
                onClick={() => onSelectService(service)}
                className="group inline-flex items-center gap-1.5 px-5 py-3 rounded-full bg-white ring-1 ring-[#0A8BD3]/25 text-sm font-semibold text-[#0A8BD3] hover:ring-[#0A8BD3]/50 hover:bg-[#F3F9FD] transition cursor-pointer"
              >
                Service scope
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
};

/* ------------------------------------------------------------------ */
/* Domain header                                                       */
/* ------------------------------------------------------------------ */

const DomainHeader: React.FC<{ domain: SolutionDomain; index: number }> = ({ domain, index }) => (
  <motion.div {...reveal()} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
    <div>
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs font-bold text-[#0A8BD3]">DOMAIN {pad(index + 1)}</span>
        <span className="h-px w-12 bg-gradient-to-r from-[#0A8BD3] to-[#8DC63F]" />
      </div>
      <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0B2545] font-display">
        {domain.name}
      </h2>
      <p className="mt-2 text-slate-600 text-sm sm:text-base">{domain.tagline}</p>
    </div>
    <span className="self-start sm:self-auto px-3.5 py-1.5 rounded-full bg-white ring-1 ring-[#0A8BD3]/15 text-xs font-semibold text-[#0B2545]">
      {domain.solutionIds.length} architectures
    </span>
  </motion.div>
);

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export const SolutionsPage: React.FC<SolutionsPageProps> = ({ onSelectService, onOpenQuote }) => {
  const [active, setActive] = useState<string>(ORDERED_SOLUTIONS[0].item.id);

  useEffect(() => {
    const prev = document.title;
    document.title = 'Solutions | Silicon e Solution — Engineered IT & ELV Architectures';
    return () => {
      document.title = prev;
    };
  }, []);

  // Highlight the architecture currently in the middle of the screen.
  useEffect(() => {
    const els = ORDERED_SOLUTIONS.map(({ item }) => document.getElementById(item.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Keep the active chip visible in the horizontally scrolling index bar.
  useEffect(() => {
    document.getElementById(`chip-${active}`)?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  }, [active]);

  const jump = (id: string) => navigate(`/solutions#${id}`);
  let counter = 0;

  return (
    <>
      {/* ================= Hero ================= */}
      <section className="relative pt-32 lg:pt-36 pb-14 lg:pb-20 surface-ice surface-ice--grid overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute -top-40 -right-40 w-[760px] h-[760px] rounded-full bg-[radial-gradient(closest-side,rgba(79,195,247,0.22),transparent)]" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-52 -left-40 w-[600px] h-[600px] rounded-full bg-[radial-gradient(closest-side,rgba(141,198,63,0.14),transparent)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigate('/');
              }}
              className="hover:text-[#0A8BD3]"
            >
              Home
            </a>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#0B2545]">Solutions</span>
          </nav>

          <div className="mt-6 grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-6">
              <motion.div {...reveal()} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 ring-1 ring-[#0A8BD3]/15 text-xs font-semibold text-[#0A8BD3]">
                <Sparkles className="w-3.5 h-3.5" />
                {SHOWCASE_ITEMS.length} architectures · {SOLUTION_DOMAINS.length} engineering domains
              </motion.div>
              <motion.h1
                {...reveal(0.05)}
                className="mt-5 text-3xl sm:text-4xl lg:text-[54px] lg:leading-[1.06] font-extrabold tracking-tight text-[#0B2545] font-display"
              >
                Engineered architectures,{' '}
                <span className="bg-gradient-to-r from-[#0A8BD3] via-[#4FC3F7] to-[#8DC63F] bg-clip-text text-transparent">
                  not just equipment.
                </span>
              </motion.h1>
              <motion.p {...reveal(0.1)} className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                Explore the specifications, equipment topologies and failover redundancies behind every turnkey
                installation we deliver — from core network fabrics to life-safety evacuation.
              </motion.p>

              <motion.div {...reveal(0.15)} className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl">
                {HERO_STATS.map((s) => (
                  <div key={s.label} className="rounded-2xl bg-white/90 p-3.5 ring-1 ring-[#0A8BD3]/10 shadow-[0_10px_26px_-20px_rgba(11,37,69,0.45)]">
                    <div className="text-lg font-extrabold font-display text-[#0B2545] leading-none">{s.value}</div>
                    <div className="mt-1.5 text-[11px] font-medium text-slate-500 leading-tight">{s.label}</div>
                  </div>
                ))}
              </motion.div>

              <motion.div {...reveal(0.2)} className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => jump(ORDERED_SOLUTIONS[0].item.id)}
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#0A8BD3] to-[#4FC3F7] text-white text-sm font-semibold shadow-[0_12px_28px_-10px_rgba(10,139,211,0.7)] cursor-pointer"
                >
                  Explore architectures
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </button>
                <button
                  type="button"
                  onClick={onOpenQuote}
                  className="inline-flex items-center px-6 py-3 rounded-full bg-white ring-1 ring-[#0A8BD3]/25 text-sm font-semibold text-[#0A8BD3] hover:ring-[#0A8BD3]/50 transition cursor-pointer"
                >
                  Request a design review
                </button>
              </motion.div>
            </div>

            {/* Architecture index console */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: EASE }}
              className="lg:col-span-6"
            >
              <div className="relative rounded-[30px] p-[1px] bg-gradient-to-br from-[#4FC3F7]/70 via-white/30 to-[#8DC63F]/50 shadow-[0_40px_80px_-40px_rgba(8,27,51,0.8)]">
                <div
                  className="relative overflow-hidden rounded-[29px] p-5 sm:p-6 text-white"
                  style={{ background: 'radial-gradient(130% 120% at 100% 0%, #165C95 0%, #0D2E52 50%, #081B33 100%)' }}
                >
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-40"
                    style={{
                      backgroundImage:
                        'linear-gradient(rgba(79,195,247,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(79,195,247,0.10) 1px, transparent 1px)',
                      backgroundSize: '22px 22px',
                    }}
                  />
                  <div className="relative flex items-center justify-between pb-4 border-b border-white/10">
                    <span className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7FD3F7]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8DC63F] shadow-[0_0_10px_#8DC63F] animate-pulse" />
                      Architecture index
                    </span>
                    <span className="font-mono text-[10px] text-white/40">{pad(SHOWCASE_ITEMS.length)} SYSTEMS</span>
                  </div>
                  <div className="relative mt-4 space-y-4">
                    {SOLUTION_DOMAINS.map((d) => (
                      <div key={d.id}>
                        <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45 mb-2">{d.name}</div>
                        <div className="grid grid-cols-2 gap-2">
                          {d.solutionIds.map((sid) => {
                            const it = SHOWCASE_ITEMS.find((s) => s.id === sid);
                            const Icon = solutionIcons[sid] ?? Network;
                            if (!it) return null;
                            return (
                              <button
                                key={sid}
                                type="button"
                                onClick={() => jump(sid)}
                                className="group flex items-center gap-2 sm:gap-2.5 rounded-xl bg-white/[0.05] ring-1 ring-white/10 px-2.5 sm:px-3 py-2.5 text-left hover:bg-white/[0.1] hover:ring-[#4FC3F7]/50 transition cursor-pointer"
                              >
                                <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-[#0A8BD3] to-[#4FC3F7] flex items-center justify-center shrink-0">
                                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                </span>
                                <span className="min-w-0 flex-1 text-xs sm:text-[13px] font-semibold leading-tight text-white/90 group-hover:text-white truncate">
                                  {it.highlight}
                                </span>
                                <ArrowUpRight className="hidden sm:block w-3.5 h-3.5 text-[#7FD3F7]/60 shrink-0 transition group-hover:text-[#7FD3F7] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= Sticky architecture bar ================= */}
      <div className="sticky top-16 z-30 py-3 backdrop-blur-xl bg-[#E4EFF8]/80 border-y border-[#0A8BD3]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {ORDERED_SOLUTIONS.map(({ item }) => {
              const Icon = solutionIcons[item.id] ?? Network;
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  id={`chip-${item.id}`}
                  type="button"
                  onClick={() => jump(item.id)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors cursor-pointer ${
                    isActive ? 'text-white' : 'text-slate-600 hover:text-[#0B2545] hover:bg-white/70'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="solution-pill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#0A8BD3] to-[#1597E5] shadow-[0_8px_20px_-8px_rgba(10,139,211,0.7)]"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  )}
                  <Icon className="relative w-4 h-4" />
                  <span className="relative">{item.highlight}</span>
                </button>
              );
            })}
          </div>
          <button
            type="button"
            onClick={onOpenQuote}
            className="hidden md:inline-flex shrink-0 items-center px-4 py-2 rounded-full text-sm font-semibold text-[#0A8BD3] ring-1 ring-[#0A8BD3]/30 hover:bg-white transition-colors cursor-pointer"
          >
            Discuss a project
          </button>
        </div>
      </div>

      {/* ================= Domains ================= */}
      {SOLUTION_DOMAINS.map((domain, di) => (
        <section
          key={domain.id}
          id={`domain-${domain.id}`}
          className={`relative py-16 lg:py-24 overflow-hidden ${di % 2 === 0 ? 'surface-ice surface-ice--dots' : 'surface-ice'}`}
        >
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <DomainHeader domain={domain} index={di} />
            <div className="space-y-8 lg:space-y-10">
              {domain.solutionIds.map((sid) => {
                counter += 1;
                return (
                  <Blueprint
                    key={sid}
                    id={sid}
                    number={counter}
                    flip={counter % 2 === 0}
                    onSelectService={onSelectService}
                    onOpenQuote={onOpenQuote}
                  />
                );
              })}
            </div>
          </div>
        </section>
      ))}

      {/* ================= Standards & delivery ================= */}
      <section className="relative py-16 lg:py-24 surface-ice surface-ice--deep overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...reveal()} className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0A8BD3]">How we deliver</div>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0B2545] font-display">
              Every architecture, built to standard.
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              One accountable team from first survey to certified handover — designed against recognised international
              standards and documented end to end.
            </p>
          </motion.div>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {DELIVERY.map((d, i) => (
              <motion.div
                key={d.title}
                {...reveal(i * 0.07)}
                className="group relative rounded-[24px] bg-white p-6 ring-1 ring-[#0A8BD3]/10 shadow-[0_14px_34px_-24px_rgba(11,37,69,0.45)] hover:-translate-y-1 hover:ring-[#0A8BD3]/30 transition-all duration-500 overflow-hidden"
              >
                <span aria-hidden="true" className="absolute left-0 bottom-0 h-[3px] w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 bg-gradient-to-r from-[#0A8BD3] via-[#4FC3F7] to-[#8DC63F]" />
                <div className="flex items-center justify-between">
                  <span className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#0A8BD3] to-[#4FC3F7] text-white flex items-center justify-center shadow-[0_10px_22px_-10px_rgba(10,139,211,0.8)]">
                    <d.icon className="w-5 h-5" />
                  </span>
                  <span className="font-mono text-xs font-bold text-[#0A8BD3]/50">{pad(i + 1)}</span>
                </div>
                <h3 className="mt-5 text-base font-bold text-[#0B2545] font-display">{d.title}</h3>
                <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">{d.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div {...reveal(0.1)} className="mt-12">
            <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#0B2545]/60 mb-4">Standards we engineer to</div>
            <div className="flex flex-wrap gap-2">
              {STANDARDS.map((s) => (
                <span
                  key={s}
                  className="px-3.5 py-2 rounded-full bg-white ring-1 ring-[#0A8BD3]/15 font-mono text-xs font-semibold text-[#0B2545] shadow-[0_6px_16px_-12px_rgba(11,37,69,0.4)]"
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <CtaBand onOpenQuote={onOpenQuote} />
    </>
  );
};
