import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowUpRight, Building2, Network, Shield } from 'lucide-react';
import { SHOWCASE_ITEMS } from '../../data/content';
import { SOLUTION_DOMAINS, SolutionDomainId, solutionHref } from '../../data/solutions';
import { ServiceVisual } from '../ui/ServiceVisual';
import { solutionIcons } from '../../pages/SolutionsPage';
import { navigate } from '../../lib/router';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Each engineering domain gets its own light accent. */
const DOMAIN_STYLE: Record<SolutionDomainId, { icon: React.ElementType; accent: string; soft: string; ring: string }> = {
  network: { icon: Network, accent: '#0A8BD3', soft: '#E6F4FC', ring: 'rgba(10,139,211,0.35)' },
  safety: { icon: Shield, accent: '#5E9E1A', soft: '#EEF7E2', ring: 'rgba(110,174,31,0.4)' },
  building: { icon: Building2, accent: '#0E9AA7', soft: '#E3F6F7', ring: 'rgba(14,154,167,0.35)' },
};

/** Standards each domain is engineered to (shown under the solution list). */
const DOMAIN_STANDARDS: Record<SolutionDomainId, string[]> = {
  network: ['OSPF · BGP · VRRP', 'WPA3 + 802.1X', 'Tier III', 'Fluke Certified'],
  safety: ['EN54 / NFPA 72', 'HTM 08-03', 'AI Face & ANPR', 'IP68'],
  building: ['BACnet IP', 'Modbus · MQTT', 'Opus & G.722 HD', 'TLS & SRTP'],
};

const ALL = SOLUTION_DOMAINS.flatMap((d) => d.solutionIds.map((id) => ({ domain: d.id, id })));
const pad = (n: number) => String(n).padStart(2, '0');
const AUTO_MS = 5000;

/**
 * Home-page "blueprint explorer": pick an engineering domain and a solution to
 * see its live diagram and key specs on a light blueprint stage. Full detail
 * lives on /solutions.
 */
export const SolutionsTeaser: React.FC = () => {
  const [domainId, setDomainId] = useState<SolutionDomainId>(SOLUTION_DOMAINS[0].id);
  const [solutionId, setSolutionId] = useState<string>(SOLUTION_DOMAINS[0].solutionIds[0]);
  const [auto, setAuto] = useState(true);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const domain = SOLUTION_DOMAINS.find((d) => d.id === domainId)!;
  const style = DOMAIN_STYLE[domainId];
  const item = SHOWCASE_ITEMS.find((s) => s.id === solutionId)!;
  const ItemIcon = solutionIcons[solutionId] ?? Network;
  const globalIndex = ALL.findIndex((x) => x.id === solutionId);

  // Only auto-advance while the section is on screen.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Gently tour all architectures until the visitor takes over.
  useEffect(() => {
    if (!auto || !inView) return;
    const t = setTimeout(() => {
      const next = ALL[(globalIndex + 1) % ALL.length];
      setDomainId(next.domain);
      setSolutionId(next.id);
    }, AUTO_MS);
    return () => clearTimeout(t);
  }, [auto, inView, globalIndex]);

  const pickDomain = (id: SolutionDomainId) => {
    setAuto(false);
    setDomainId(id);
    setSolutionId(SOLUTION_DOMAINS.find((d) => d.id === id)!.solutionIds[0]);
  };

  const pickSolution = (id: string) => {
    setAuto(false);
    setSolutionId(id);
  };

  const open = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(solutionHref(id));
  };

  return (
    <section ref={sectionRef} id="solutions" className="relative py-20 lg:py-28 surface-ice surface-ice--dots overflow-hidden">
      {/* Soft colour wash */}
      <div aria-hidden="true" className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[1100px] h-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(79,195,247,0.18),transparent)]" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 -right-32 w-[560px] h-[560px] rounded-full bg-[radial-gradient(closest-side,rgba(141,198,63,0.14),transparent)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 lg:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0A8BD3]">Solution architectures</div>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0B2545] font-display">
              Engineered systems,{' '}
              <span className="bg-gradient-to-r from-[#0A8BD3] via-[#1FA8C9] to-[#6FAE1F] bg-clip-text text-transparent">
                documented down to the spec.
              </span>
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              {SHOWCASE_ITEMS.length} turnkey architectures across {SOLUTION_DOMAINS.length} engineering domains. Pick one to see
              it running.
            </p>
          </motion.div>
          <a
            href="/solutions"
            onClick={(e) => {
              e.preventDefault();
              navigate('/solutions');
            }}
            className="group inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white ring-1 ring-[#0A8BD3]/25 text-sm font-semibold text-[#0A8BD3] hover:ring-[#0A8BD3]/50 hover:bg-[#F3F9FD] transition whitespace-nowrap self-start md:self-auto"
          >
            Explore all solutions
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Explorer */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative rounded-[32px] p-[1.5px] bg-gradient-to-br from-[#4FC3F7]/70 via-white to-[#8DC63F]/60 shadow-[0_40px_90px_-50px_rgba(11,37,69,0.55)]"
        >
          <div className="relative rounded-[31px] bg-white/85 backdrop-blur-xl overflow-hidden">
            {/* Domain switcher */}
            <div className="grid grid-cols-3 gap-1.5 sm:gap-3 p-2 sm:p-4 border-b border-[#0A8BD3]/10 bg-gradient-to-b from-[#F5FAFE] to-white">
              {SOLUTION_DOMAINS.map((d, i) => {
                const st = DOMAIN_STYLE[d.id];
                const Icon = st.icon;
                const isActive = d.id === domainId;
                return (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => pickDomain(d.id)}
                    aria-pressed={isActive}
                    className={`relative flex flex-col sm:flex-row items-center sm:items-center gap-1.5 sm:gap-3 rounded-2xl px-1.5 sm:px-4 py-2.5 sm:py-3 text-center sm:text-left transition-all duration-300 cursor-pointer ${
                      isActive ? 'bg-white shadow-[0_12px_28px_-16px_rgba(11,37,69,0.45)]' : 'hover:bg-white/70'
                    }`}
                    style={isActive ? { boxShadow: `0 0 0 1.5px ${st.ring}, 0 12px 28px -16px rgba(11,37,69,0.45)` } : undefined}
                  >
                    <span
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300"
                      style={{ background: isActive ? st.accent : st.soft, color: isActive ? '#fff' : st.accent }}
                    >
                      <Icon className="w-5 h-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="hidden sm:block font-mono text-[10px] font-semibold" style={{ color: st.accent }}>
                        DOMAIN {pad(i + 1)} · {d.solutionIds.length} systems
                      </span>
                      <span className="block text-[11px] sm:text-sm font-bold text-[#0B2545] font-display leading-tight lg:whitespace-nowrap">{d.name}</span>
                    </span>
                    {isActive && auto && inView && (
                      <motion.span
                        key={solutionId}
                        aria-hidden="true"
                        className="absolute left-4 right-4 bottom-1 h-[2px] rounded-full origin-left"
                        style={{ background: st.accent }}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: AUTO_MS / 1000, ease: 'linear' }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="grid lg:grid-cols-12">
              {/* Solution list */}
              <div className="lg:col-span-5 flex flex-col p-4 sm:p-6 lg:p-7 pb-0 sm:pb-0 lg:pb-7 lg:border-r border-[#0A8BD3]/10">
                <p className="hidden sm:block px-1 mb-4 text-sm text-slate-500 leading-relaxed">{domain.tagline}</p>
                <ul className="space-y-2">
                  {domain.solutionIds.map((sid) => {
                    const it = SHOWCASE_ITEMS.find((s) => s.id === sid);
                    if (!it) return null;
                    const Icon = solutionIcons[sid] ?? Network;
                    const isActive = sid === solutionId;
                    const n = ALL.findIndex((x) => x.id === sid) + 1;
                    return (
                      <li key={sid}>
                        <button
                          type="button"
                          onClick={() => pickSolution(sid)}
                          onMouseEnter={() => pickSolution(sid)}
                          aria-pressed={isActive}
                          className={`group relative w-full flex items-center gap-3.5 rounded-2xl px-3.5 py-3 text-left transition-all duration-300 cursor-pointer ${
                            isActive ? 'bg-white' : 'hover:bg-[#F4F9FD]'
                          }`}
                          style={isActive ? { boxShadow: `0 0 0 1.5px ${style.ring}, 0 14px 30px -20px rgba(11,37,69,0.5)` } : undefined}
                        >
                          {isActive && (
                            <motion.span
                              layoutId="sol-teaser-bar"
                              className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full"
                              style={{ background: style.accent }}
                              transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                            />
                          )}
                          <span
                            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300"
                            style={{ background: isActive ? style.soft : '#F1F5F9', color: isActive ? style.accent : '#64748B' }}
                          >
                            <Icon className="w-[18px] h-[18px]" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block font-mono text-[10px] font-semibold text-slate-400">
                              {pad(n)} · {it.highlight}
                            </span>
                            <span className={`block text-[14px] font-bold font-display leading-snug ${isActive ? 'text-[#0B2545]' : 'text-slate-600'}`}>
                              {it.title}
                            </span>
                          </span>
                          <ArrowRight
                            className={`w-4 h-4 shrink-0 transition-all duration-300 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-1'}`}
                            style={{ color: style.accent }}
                          />
                        </button>
                      </li>
                    );
                  })}
                </ul>

                <div className="hidden lg:block mt-auto pt-8">
                  <div className="rounded-2xl p-4 ring-1 ring-[#0A8BD3]/10" style={{ background: `linear-gradient(135deg, ${style.soft}, #FFFFFF)` }}>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#0B2545]/70">Engineered to standard</span>
                      <span className="flex gap-1">
                        {ALL.map((x) => (
                          <span
                            key={x.id}
                            className="h-1.5 rounded-full transition-all duration-300"
                            style={{
                              width: x.id === solutionId ? 14 : 6,
                              background: x.domain === domainId ? style.accent : 'rgba(11,37,69,0.15)',
                              opacity: x.id === solutionId ? 1 : 0.55,
                            }}
                          />
                        ))}
                      </span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {DOMAIN_STANDARDS[domainId].map((std) => (
                        <span key={std} className="px-2.5 py-1 rounded-full bg-white ring-1 ring-[#0A8BD3]/10 font-mono text-[11px] font-semibold text-[#0B2545]">
                          {std}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Blueprint stage */}
              <div className="lg:col-span-7 p-4 sm:p-6 lg:p-7">
                <div className="relative rounded-[24px] p-3 sm:p-4 bg-[#F6FAFD] ring-1 ring-[#0A8BD3]/10">
                  {/* Corner crop marks */}
                  {['left-2 top-2 border-l-2 border-t-2', 'right-2 top-2 border-r-2 border-t-2', 'left-2 bottom-2 border-l-2 border-b-2', 'right-2 bottom-2 border-r-2 border-b-2'].map((c) => (
                    <span key={c} aria-hidden="true" className={`absolute w-4 h-4 rounded-[3px] ${c}`} style={{ borderColor: style.ring }} />
                  ))}

                  <div className="flex items-center justify-between gap-3 px-1 pb-3">
                    <span className="inline-flex items-center gap-2 min-w-0">
                      <span className="w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0" style={{ background: style.accent }}>
                        <ItemIcon className="w-4 h-4" />
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-[0.14em] truncate" style={{ color: style.accent }}>
                        {item.highlight}
                      </span>
                    </span>
                    <span className="font-mono text-[10px] font-semibold text-slate-400 shrink-0">
                      ARCH {pad(globalIndex + 1)} / {pad(ALL.length)}
                    </span>
                  </div>

                  <div className="relative h-[210px] sm:h-[270px] lg:h-[290px]">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={solutionId}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        className="absolute inset-0"
                      >
                        <ServiceVisual
                          serviceId={solutionId}
                          tone="light"
                          className="h-full rounded-[18px] ring-1 ring-[#0A8BD3]/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]"
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={solutionId}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.3, ease: EASE }}
                    >
                      <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {item.specs.map((spec) => (
                          <div
                            key={spec.label}
                            className="flex items-center justify-between gap-3 sm:block rounded-xl bg-white ring-1 ring-[#0A8BD3]/10 px-3.5 py-2.5 shadow-[0_8px_20px_-16px_rgba(11,37,69,0.45)]"
                          >
                            <span className="block font-mono text-[10px] uppercase tracking-wider text-slate-400">{spec.label}</span>
                            <span className="sm:mt-0.5 block text-right sm:text-left text-[13px] font-bold font-display text-[#0B2545]">{spec.value}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
                        <p className="text-sm text-slate-600 leading-relaxed">{item.subtitle}</p>
                        <a
                          href={solutionHref(solutionId)}
                          onClick={open(solutionId)}
                          className="group inline-flex items-center gap-1.5 shrink-0 self-start sm:self-auto px-4 py-2.5 rounded-full text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                          style={{ background: style.accent, boxShadow: `0 12px 24px -12px ${style.accent}` }}
                        >
                          View architecture
                          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
