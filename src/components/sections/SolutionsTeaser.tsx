import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { SHOWCASE_ITEMS } from '../../data/content';
import { SOLUTION_DOMAINS, solutionHref } from '../../data/solutions';
import { ServiceVisual } from '../ui/ServiceVisual';
import { navigate } from '../../lib/router';

const go = (href: string) => (e: React.MouseEvent) => {
  e.preventDefault();
  navigate(href);
};

/** Home-page overview of our solution architectures; full detail lives on /solutions. */
export const SolutionsTeaser: React.FC = () => (
  <section id="solutions" className="relative py-20 lg:py-28 surface-ice surface-ice--dots overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0A8BD3]">Solution architectures</div>
          <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0B2545] font-display">
            Engineered systems, documented down to the spec.
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            {SHOWCASE_ITEMS.length} turnkey architectures across {SOLUTION_DOMAINS.length} engineering domains — with the
            topologies, redundancies and standards behind each one.
          </p>
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

      <div className="grid md:grid-cols-3 gap-5">
        {SOLUTION_DOMAINS.map((d, i) => (
          <motion.div
            key={d.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="group relative rounded-[26px] p-[1px] bg-gradient-to-br from-[#4FC3F7]/60 via-white/10 to-[#8DC63F]/40 shadow-[0_24px_50px_-28px_rgba(8,27,51,0.75)]"
          >
            <div
              className="relative h-full flex flex-col overflow-hidden rounded-[25px] p-4 text-white"
              style={{ background: 'radial-gradient(130% 120% at 0% 0%, #165C95 0%, #0D2E52 52%, #081B33 100%)' }}
            >
              <ServiceVisual serviceId={d.visual} className="h-36 rounded-[18px] ring-1 ring-white/10" />
              <div className="px-2 pt-5 flex items-center justify-between">
                <h3 className="text-lg font-bold font-display text-white">{d.name}</h3>
                <span className="font-mono text-xs font-semibold text-white/40">0{i + 1}</span>
              </div>
              <p className="px-2 mt-1 text-sm text-white/65 leading-relaxed">{d.tagline}</p>
              <ul className="mt-4 px-1 pb-1 space-y-1">
                {d.solutionIds.map((sid) => {
                  const it = SHOWCASE_ITEMS.find((s) => s.id === sid);
                  if (!it) return null;
                  return (
                    <li key={sid}>
                      <a
                        href={solutionHref(sid)}
                        onClick={go(solutionHref(sid))}
                        className="group/link flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 bg-white/[0.05] ring-1 ring-white/[0.08] hover:bg-white/[0.11] hover:ring-[#4FC3F7]/50 transition"
                      >
                        <span className="text-[13px] font-semibold text-white/90 group-hover/link:text-white">{it.title}</span>
                        <ArrowUpRight className="w-4 h-4 text-[#7FD3F7]/60 shrink-0 transition group-hover/link:text-[#7FD3F7] group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
