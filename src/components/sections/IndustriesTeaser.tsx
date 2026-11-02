import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { INDUSTRIES, IndustryId, industryHref } from '../../data/industries';
import { industryIcons } from '../ui/SectorCard';
import { ServiceVisual } from '../ui/ServiceVisual';
import { navigate } from '../../lib/router';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const PREVIEW_H = 250;

/** Each sector's accent, used for its number, hover wash and preview frame. */
const ACCENT: Record<IndustryId, string> = {
  healthcare: '#0A8BD3',
  education: '#5E9E1A',
  government: '#0E9AA7',
  commercial: '#1F6FD1',
};

const go = (href: string) => (e: React.MouseEvent) => {
  e.preventDefault();
  navigate(href);
};

/**
 * Home-page "industries index": an editorial list of sectors instead of cards.
 * Hovering a row highlights it and glides a live preview alongside (desktop).
 */
export const IndustriesTeaser: React.FC = () => {
  const [active, setActive] = useState<IndustryId>(INDUSTRIES[0].id);
  const [previewY, setPreviewY] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);
  const rowRefs = useRef<Record<string, HTMLLIElement | null>>({});
  const current = INDUSTRIES.find((i) => i.id === active)!;
  const accent = ACCENT[active];

  // Keep the floating preview vertically centred on the active row.
  const measure = () => {
    const list = listRef.current;
    const row = rowRefs.current[active];
    if (!list || !row) return;
    const centre = row.offsetTop + row.offsetHeight / 2 - PREVIEW_H / 2;
    setPreviewY(Math.max(0, Math.min(centre, list.offsetHeight - PREVIEW_H)));
  };
  useLayoutEffect(measure, [active]);
  useEffect(() => {
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  });

  return (
    <section id="industries" className="relative py-20 lg:py-28 surface-ice surface-ice--dots overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 -left-40 w-[620px] h-[620px] rounded-full bg-[radial-gradient(closest-side,rgba(79,195,247,0.16),transparent)]" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-48 right-[-160px] w-[620px] h-[620px] rounded-full bg-[radial-gradient(closest-side,rgba(141,198,63,0.12),transparent)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 lg:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0A8BD3]">Industries we serve</div>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0B2545] font-display">
              Built for sectors where{' '}
              <span className="bg-gradient-to-r from-[#0A8BD3] via-[#1FA8C9] to-[#6FAE1F] bg-clip-text text-transparent">
                reliability matters most.
              </span>
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              From operation theatres and lecture halls to secure public buildings and corporate campuses.
            </p>
          </motion.div>
          <a
            href="/industries"
            onClick={go('/industries')}
            className="group inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white ring-1 ring-[#0A8BD3]/25 text-sm font-semibold text-[#0A8BD3] hover:ring-[#0A8BD3]/50 hover:bg-[#F3F9FD] transition whitespace-nowrap self-start md:self-auto"
          >
            Explore all industries
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Editorial index */}
          <ol ref={listRef} className="lg:col-span-8 relative">
            {INDUSTRIES.map((ind, i) => {
              const isActive = ind.id === active;
              const Icon = industryIcons[ind.icon];
              const a = ACCENT[ind.id];
              return (
                <motion.li
                  key={ind.id}
                  ref={(el) => {
                    rowRefs.current[ind.id] = el;
                  }}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
                  className="relative"
                >
                  {/* Hairline divider */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-px"
                    style={{ background: 'linear-gradient(90deg, rgba(10,139,211,0.28), rgba(10,139,211,0.08) 70%, transparent)' }}
                  />
                  <a
                    href={industryHref(ind.id)}
                    onClick={go(industryHref(ind.id))}
                    onMouseEnter={() => setActive(ind.id)}
                    onFocus={() => setActive(ind.id)}
                    className="group relative grid grid-cols-[auto_1fr_auto] sm:grid-cols-[96px_1fr_auto] items-center gap-4 sm:gap-6 py-6 sm:py-7 pl-1 pr-1 sm:pr-3 rounded-2xl"
                  >
                    {/* Hover wash */}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-y-1 -inset-x-3 rounded-2xl transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}
                      style={{ background: `linear-gradient(90deg, ${a}14, ${a}06 55%, transparent)` }}
                    />

                    {/* Outlined numeral (icon chip on mobile) */}
                    <span className="relative hidden sm:block font-display font-extrabold text-[64px] leading-none tracking-tight select-none">
                      <span
                        className="transition-colors duration-500"
                        style={{
                          color: isActive ? a : 'transparent',
                          WebkitTextStroke: `1.5px ${isActive ? a : 'rgba(11,37,69,0.22)'}`,
                        }}
                      >
                        0{i + 1}
                      </span>
                    </span>
                    <span
                      className="relative sm:hidden w-11 h-11 rounded-2xl flex items-center justify-center text-white shrink-0"
                      style={{ background: a }}
                    >
                      <Icon className="w-5 h-5" />
                    </span>

                    {/* Name + detail */}
                    <span className="relative min-w-0">
                      <span className="flex items-center gap-3">
                        <span
                          className={`block text-xl sm:text-[28px] lg:text-[32px] font-extrabold tracking-tight font-display leading-tight transition-all duration-500 ${
                            isActive ? 'translate-x-1 text-[#0B2545]' : 'text-[#0B2545]/80'
                          }`}
                        >
                          {ind.name}
                        </span>
                      </span>
                      <span className="mt-1.5 block text-sm sm:text-[15px] text-slate-500 leading-relaxed">{ind.short}</span>
                      <span className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                        {ind.tags.map((t, k) => (
                          <span key={t} className="inline-flex items-center gap-3 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: a }}>
                            {k > 0 && <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-slate-300" />}
                            {t}
                          </span>
                        ))}
                      </span>
                    </span>

                    {/* Arrow */}
                    <span
                      className={`relative w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0 transition-all duration-500 ${
                        isActive ? 'text-white rotate-0 shadow-[0_12px_26px_-10px_rgba(10,139,211,0.7)]' : 'text-[#0A8BD3] -rotate-45 ring-1 ring-[#0A8BD3]/20 bg-white'
                      }`}
                      style={isActive ? { background: a } : undefined}
                    >
                      <ArrowRight className="w-[18px] h-[18px]" />
                    </span>
                  </a>
                </motion.li>
              );
            })}
            <li aria-hidden="true" className="h-px" style={{ background: 'linear-gradient(90deg, rgba(10,139,211,0.28), rgba(10,139,211,0.08) 70%, transparent)' }} />
          </ol>

          {/* Floating live preview (desktop) */}
          <div className="hidden lg:block lg:col-span-4 relative">
            <motion.div
              className="absolute inset-x-0"
              style={{ height: PREVIEW_H }}
              animate={{ y: previewY }}
              transition={{ type: 'spring', stiffness: 160, damping: 24 }}
            >
              <div
                className="relative h-full rounded-[26px] p-[1.5px] shadow-[0_30px_60px_-34px_rgba(11,37,69,0.55)] transition-[background] duration-500"
                style={{ background: `linear-gradient(135deg, ${accent}99, #FFFFFF 45%, #8DC63F88)` }}
              >
                <div className="relative h-full rounded-[24.5px] overflow-hidden bg-white">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={active}
                      initial={{ opacity: 0, scale: 1.03 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="absolute inset-x-0 top-0 bottom-[66px]"
                    >
                      <ServiceVisual serviceId={current.visual} tone="light" showLabel={false} className="h-full" />
                    </motion.div>
                  </AnimatePresence>

                  {/* Caption */}
                  <div className="absolute left-3 right-3 bottom-3 rounded-2xl bg-[#F4F9FD] ring-1 ring-[#0A8BD3]/10 px-4 py-2.5 flex items-center justify-between gap-3">
                    <span className="min-w-0">
                      <span className="block text-[10px] font-semibold uppercase tracking-[0.16em]" style={{ color: accent }}>
                        {current.eyebrow}
                      </span>
                      <span className="block text-[13px] font-bold text-[#0B2545] truncate">
                        {current.clients[0] ? `Trusted by ${current.clients[0]}` : current.headline}
                      </span>
                    </span>
                    <ArrowUpRight className="w-4 h-4 shrink-0" style={{ color: accent }} />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
