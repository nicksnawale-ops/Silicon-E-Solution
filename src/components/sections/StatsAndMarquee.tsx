import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { HeartPulse, GraduationCap, Building2 } from 'lucide-react';
import { STATS, CLIENTS_LIST } from '../../data/content';
import { HorizonEdge } from '../ui/HorizonEdge';

/** Soft ice-blue surface shared with the About section below for a continuous band. */
export const SURFACE_TOP = '#EDF5FB';
export const SURFACE_BOTTOM = '#E3EEF8';

type SectorKind = 'healthcare' | 'education' | 'enterprise';

const SECTOR_THEME: Record<SectorKind, { gradient: string; accent: string; Icon: React.ElementType }> = {
  healthcare: { gradient: 'linear-gradient(135deg, #0A8BD3 0%, #4FC3F7 100%)', accent: '#0A8BD3', Icon: HeartPulse },
  education: { gradient: 'linear-gradient(135deg, #0A8BD3 0%, #8DC63F 100%)', accent: '#6FA82F', Icon: GraduationCap },
  enterprise: { gradient: 'linear-gradient(135deg, #0B2545 0%, #0A8BD3 100%)', accent: '#0B2545', Icon: Building2 },
};

const sectorKind = (sector: string, name: string): SectorKind => {
  const text = `${sector} ${name}`.toLowerCase();
  if (/hospital|health/.test(text)) return 'healthcare';
  if (/univ|education|campus|college|institute/.test(text)) return 'education';
  return 'enterprise';
};

/** Two-letter monogram from a client's wordmark: "SYMBIOSIS HOSPITAL" -> "SH", "ANIBRAIN" -> "AN". */
const monogram = (logoText: string) => {
  const words = logoText.split(/\s+/).filter(Boolean);
  const letters = words.length > 1 ? words[0][0] + words[1][0] : (words[0] ?? '').slice(0, 2);
  return letters.toUpperCase();
};

function Counter({ end, suffix }: { end: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const duration = 1600; // ms

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutExpo
      const easeVal = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeVal * end));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(step);
  }, [isInView, end]);

  return (
    <span ref={ref} className="font-mono tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export const StatsAndMarquee: React.FC = () => {
  return (
    <section
      className="relative z-20 pt-10 sm:pt-12 pb-16 overflow-x-clip"
      style={{ background: `linear-gradient(180deg, ${SURFACE_TOP} 0%, ${SURFACE_BOTTOM} 100%)` }}
    >
      {/* Curved horizon rising into the hero (same colour as this section's top) */}
      <HorizonEdge fill={SURFACE_TOP} />

      {/* Ambient light + fine dot texture */}
      {/* Faded at top and bottom so the glows never form a visible edge against
          the horizon above or the About section below. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{
          maskImage: 'linear-gradient(180deg, transparent 0%, #000 18%, #000 78%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, #000 18%, #000 78%, transparent 100%)',
        }}
      >
        <div className="absolute top-[8%] -left-40 w-[620px] h-[620px] rounded-full bg-[radial-gradient(closest-side,rgba(79,195,247,0.18),transparent)]" />
        <div className="absolute top-[20%] -right-48 w-[560px] h-[560px] rounded-full bg-[radial-gradient(closest-side,rgba(141,198,63,0.10),transparent)]" />
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage: 'radial-gradient(rgba(10,139,211,0.16) 1px, transparent 1px)',
            backgroundSize: '22px 22px',
            maskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, #000 20%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, #000 20%, transparent 75%)',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 4 Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {STATS.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 28, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, delay: 0.15 + idx * 0.09, ease: [0.22, 1, 0.36, 1] }}
              className="relative p-5 sm:p-6 rounded-2xl bg-white border border-white shadow-[0_1px_2px_rgba(11,37,69,0.04),0_12px_32px_-18px_rgba(11,37,69,0.28)] ring-1 ring-[#0A8BD3]/8 hover:-translate-y-1 hover:shadow-[0_2px_4px_rgba(11,37,69,0.04),0_22px_44px_-20px_rgba(10,139,211,0.40)] transition-[transform,box-shadow] duration-300 text-left group"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-[#0B2545] font-display flex items-baseline gap-1 group-hover:text-[#0A8BD3] transition-colors">
                <Counter end={stat.value} suffix={stat.suffix} />
              </div>
              <h3 className="text-sm font-semibold text-[#0B2545] mt-1.5 font-display">
                {stat.label}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">{stat.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Trusted-by strip */}
      <div className="relative mt-14 z-[1]">
        {/* Eyebrow with hairlines */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-4"
        >
          <span className="hidden sm:block h-px flex-1 max-w-[180px] bg-gradient-to-r from-transparent to-[#0A8BD3]/35" />
          <p className="text-center text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-[#0A8BD3]">
            Trusted by Leading Educational, Healthcare &amp; Enterprise Giants
          </p>
          <span className="hidden sm:block h-px flex-1 max-w-[180px] bg-gradient-to-l from-transparent to-[#0A8BD3]/35" />
        </motion.div>

        {/* Full-width seamless marquee; edges fade via mask (no overlay on the cards) */}
        <div
          className="group/marquee relative mt-7 overflow-hidden py-4"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0, #000 9%, #000 91%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0, #000 9%, #000 91%, transparent 100%)',
          }}
        >
          <div className="flex w-max animate-[client-marquee_42s_linear_infinite] group-hover/marquee:[animation-play-state:paused] motion-reduce:animate-none">
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                aria-hidden={copy === 1 ? true : undefined}
                className="flex shrink-0 items-stretch gap-5 pr-5"
              >
                {CLIENTS_LIST.map((client) => {
                  const kind = sectorKind(client.sector, client.name);
                  const theme = SECTOR_THEME[kind];
                  const Icon = theme.Icon;
                  return (
                    <li
                      key={`${copy}-${client.name}`}
                      className="group/client relative flex items-center gap-3.5 pl-3 pr-6 py-3 rounded-2xl bg-white border border-[#0A8BD3]/12 shadow-[0_8px_24px_-16px_rgba(11,37,69,0.28)] transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-[#0A8BD3]/35 hover:shadow-[0_18px_36px_-18px_rgba(10,139,211,0.45)]"
                    >
                      {/* Sector-coded monogram */}
                      <span
                        className="relative w-11 h-11 rounded-xl flex items-center justify-center shrink-0 text-white font-display font-bold text-[13px] tracking-wide overflow-hidden"
                        style={{ background: theme.gradient }}
                      >
                        <span className="absolute inset-0 bg-gradient-to-b from-white/25 to-transparent" aria-hidden="true" />
                        <span className="relative">{monogram(client.logoText)}</span>
                      </span>

                      <span className="min-w-0 text-left">
                        <span className="block whitespace-nowrap font-display text-[14px] font-semibold text-[#0B2545] group-hover/client:text-[#0A8BD3] transition-colors">
                          {client.name}
                        </span>
                        <span className="mt-0.5 flex items-center gap-1.5 whitespace-nowrap text-[11px] font-medium text-slate-500">
                          <Icon className="w-3 h-3 shrink-0" style={{ color: theme.accent }} aria-hidden="true" />
                          <span>{client.sector}</span>
                          <span className="text-slate-300" aria-hidden="true">•</span>
                          <span>{client.location}</span>
                        </span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            ))}
          </div>
        </div>

        <p className="mt-3 text-center text-xs text-slate-500">
          …and many more institutions across India
        </p>
      </div>

      <style>{`
        @keyframes client-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};
