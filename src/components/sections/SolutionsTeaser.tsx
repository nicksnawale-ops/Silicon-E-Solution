import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight, Layers } from 'lucide-react';
import { SHOWCASE_ITEMS, SERVICES_LIST } from '../../data/content';
import { ORDERED_SOLUTIONS, SolutionDomainId, solutionHref, servicesForSolution } from '../../data/solutions';
import { serviceIconMap } from '../ui/ServiceCard';
import { solutionIcons } from '../../pages/SolutionsPage';
import { navigate } from '../../lib/router';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Sector accents (shared with the sector names on /solutions). */
const SECTOR: Record<SolutionDomainId, { accent: string; soft: string }> = {
  care: { accent: '#5E9E1A', soft: '#EEF7E2' },
  workplace: { accent: '#0A8BD3', soft: '#E6F4FC' },
  critical: { accent: '#0E9AA7', soft: '#E3F6F7' },
};

const pad = (n: number) => String(n).padStart(2, '0');

const go = (href: string) => (e: React.MouseEvent) => {
  e.preventDefault();
  navigate(href);
};

/** One term of the headline equation: a big gradient numeral over a label. */
const Term: React.FC<{ value: string; label: string; strong?: boolean }> = ({ value, label, strong }) => (
  <div className="flex-1 sm:flex-none flex flex-col items-center text-center min-w-0">
    <span
      className={`font-display font-extrabold leading-none tracking-tight bg-clip-text text-transparent ${
        strong ? 'text-[44px] sm:text-[64px] lg:text-[84px]' : 'text-[36px] sm:text-[52px] lg:text-[68px]'
      }`}
      style={{
        backgroundImage: strong
          ? 'linear-gradient(135deg, #0A8BD3 0%, #1FA8C9 45%, #6FAE1F 100%)'
          : 'linear-gradient(180deg, #0B2545 0%, #2A4A6E 100%)',
      }}
    >
      {value}
    </span>
    <span className="mt-2 text-[9.5px] sm:text-xs font-semibold uppercase tracking-[0.08em] sm:tracking-[0.16em] text-slate-500 leading-tight">{label}</span>
  </div>
);

const Operator: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="shrink-0 font-display font-light text-3xl sm:text-5xl lg:text-6xl text-[#0A8BD3]/35 leading-none pb-7 sm:pb-7">{children}</span>
);

/**
 * Home-page Solutions: a typographic equation (services + one team = turnkey
 * solutions) followed by a quiet index of the six integrated solutions, each
 * with a stack of the services it combines. Motion is limited to hover.
 */
export const SolutionsTeaser: React.FC = () => (
  <section id="solutions" className="relative py-20 lg:py-28 surface-ice overflow-hidden">
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="max-w-2xl"
        >
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0A8BD3]">Integrated solutions</div>
          <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0B2545] font-display">
            Our services are the building blocks.{' '}
            <span className="bg-gradient-to-r from-[#0A8BD3] via-[#1FA8C9] to-[#6FAE1F] bg-clip-text text-transparent">
              Our solutions put them together.
            </span>
          </h2>
        </motion.div>
        <a
          href="/solutions"
          onClick={go('/solutions')}
          className="group inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white ring-1 ring-[#0A8BD3]/25 text-sm font-semibold text-[#0A8BD3] hover:ring-[#0A8BD3]/50 hover:bg-[#F3F9FD] transition whitespace-nowrap self-start md:self-auto"
        >
          Explore all solutions
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>

      {/* The equation */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="mt-10 lg:mt-12 relative rounded-[32px] p-[1.5px] bg-gradient-to-r from-[#4FC3F7]/50 via-white to-[#8DC63F]/50 shadow-[0_30px_70px_-50px_rgba(11,37,69,0.6)]"
      >
        <div className="relative overflow-hidden rounded-[30.5px] bg-white/80 backdrop-blur-xl px-4 sm:px-10 py-8 sm:py-10">
          <div aria-hidden="true" className="absolute inset-0 opacity-60 bg-[radial-gradient(60%_120%_at_85%_50%,rgba(141,198,63,0.12),transparent_70%),radial-gradient(60%_120%_at_10%_50%,rgba(79,195,247,0.14),transparent_70%)]" />
          <div className="relative flex items-end justify-center gap-2 sm:gap-8 lg:gap-12">
            <Term value={String(SERVICES_LIST.length)} label="Services" />
            <Operator>+</Operator>
            <Term value="1" label="Accountable team" />
            <Operator>=</Operator>
            <Term value={String(SHOWCASE_ITEMS.length)} label="Turnkey solutions" strong />
          </div>
          <p className="relative mt-6 text-center text-sm sm:text-[15px] text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Each solution is designed, installed and commissioned as one coordinated system — no vendor juggling, one
            point of accountability from blueprint to handover.
          </p>
        </div>
      </motion.div>

      {/* Solution index */}
      <ol className="mt-10 lg:mt-12 grid lg:grid-cols-2 gap-x-12">
        {ORDERED_SOLUTIONS.map(({ domain, item }, i) => {
          const sector = SECTOR[domain.id];
          const services = servicesForSolution(item.id);
          const Icon = solutionIcons[item.id] ?? Layers;
          return (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: (i % 2) * 0.08, ease: EASE }}
              className="relative border-t border-[#0A8BD3]/12 lg:[&:nth-last-child(-n+2)]:border-b max-lg:last:border-b"
            >
              <a
                href={solutionHref(item.id)}
                onClick={go(solutionHref(item.id))}
                className="group relative flex items-center gap-4 sm:gap-5 py-5 sm:py-6 px-2 -mx-2 rounded-2xl transition-colors duration-300 hover:bg-white/70"
              >
                {/* Solution icon in its sector colour */}
                <span
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:-rotate-6"
                  style={{ background: sector.soft, color: sector.accent }}
                >
                  <Icon className="w-[22px] h-[22px]" />
                </span>

                {/* Name + sector / ideal-for */}
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2 min-w-0 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.12em] sm:tracking-[0.14em]" style={{ color: sector.accent }}>
                    <span className="font-mono shrink-0">{pad(i + 1)}</span>
                    <span className="w-1 h-1 rounded-full shrink-0" style={{ background: sector.accent }} />
                    <span className="truncate">{domain.name}</span>
                  </span>
                  <span className="mt-1 block text-base sm:text-lg font-bold text-[#0B2545] font-display leading-snug group-hover:text-[#0866A8] transition-colors">
                    {item.title}
                  </span>
                  <span className="mt-0.5 block text-xs sm:text-[13px] text-slate-500 truncate">{item.idealFor}</span>
                </span>

                {/* Stack of combined services (fans out on hover) */}
                <span className="hidden sm:flex items-center shrink-0" aria-label={`${services.length} services combined`}>
                  {services.map((svc, k) => {
                    const SvcIcon = serviceIconMap[svc.iconName] || Layers;
                    return (
                      <span
                        key={svc.id}
                        title={svc.title}
                        className="w-8 h-8 rounded-full bg-white ring-2 ring-[#F4F9FD] shadow-[0_4px_10px_-6px_rgba(11,37,69,0.5)] flex items-center justify-center text-[#0A8BD3] transition-[margin] duration-300 ease-out -ml-2.5 first:ml-0 group-hover:-ml-0.5 group-hover:first:ml-0"
                        style={{ zIndex: services.length - k }}
                      >
                        <SvcIcon className="w-3.5 h-3.5" />
                      </span>
                    );
                  })}
                </span>
                <span className="sm:hidden shrink-0 text-[11px] font-semibold text-slate-500 whitespace-nowrap">{services.length} services</span>

                <ArrowUpRight
                  className="w-5 h-5 shrink-0 text-[#0A8BD3]/40 transition-all duration-300 group-hover:text-[#0A8BD3] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </motion.li>
          );
        })}
      </ol>
    </div>
  </section>
);
