import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, GraduationCap, HeartPulse, Landmark, Building2 } from 'lucide-react';
import { Industry, industryHref } from '../../data/industries';
import { navigate } from '../../lib/router';

export const industryIcons: Record<Industry['icon'], React.ElementType> = {
  HeartPulse,
  GraduationCap,
  Landmark,
  Building2,
};

/** Dark premium sector card linking to that sector on the Industries page. */
export const SectorCard: React.FC<{ industry: Industry; index: number; cta?: string }> = ({
  industry,
  index,
  cta = 'Explore sector',
}) => {
  const Icon = industryIcons[industry.icon];
  const href = industryHref(industry.id);
  return (
    <motion.a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        navigate(href);
      }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col rounded-[26px] p-[1px] bg-gradient-to-br from-[#4FC3F7]/60 via-white/10 to-[#8DC63F]/40 shadow-[0_24px_50px_-28px_rgba(8,27,51,0.75)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5"
    >
      <div
        className="relative flex flex-col h-full overflow-hidden rounded-[25px] p-6 text-white"
        style={{ background: 'radial-gradient(130% 120% at 0% 0%, #165C95 0%, #0D2E52 52%, #081B33 100%)' }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-40 group-hover:opacity-70 transition-opacity duration-500"
          style={{
            backgroundImage:
              'linear-gradient(rgba(79,195,247,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(79,195,247,0.10) 1px, transparent 1px)',
            backgroundSize: '22px 22px',
            maskImage: 'radial-gradient(ellipse 90% 70% at 100% 0%, #000 10%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse 90% 70% at 100% 0%, #000 10%, transparent 70%)',
          }}
        />
        <div aria-hidden="true" className="absolute -right-12 -bottom-12 w-44 h-44 rounded-full bg-[radial-gradient(closest-side,rgba(79,195,247,0.28),transparent)] transition-transform duration-700 group-hover:scale-125" />
        <Icon aria-hidden="true" className="absolute -right-3 -bottom-3 w-28 h-28 text-white/[0.05] stroke-[1.2] transition-transform duration-700 group-hover:rotate-[-6deg] group-hover:scale-110" />

        <div className="relative flex items-center justify-between">
          <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0A8BD3] to-[#4FC3F7] flex items-center justify-center shadow-[0_10px_24px_-8px_rgba(79,195,247,0.65)]">
            <Icon className="w-6 h-6 text-white" />
          </span>
          <span className="font-mono text-xs font-semibold text-white/40">0{index + 1}</span>
        </div>

        <h3 className="relative mt-5 text-lg font-bold font-display text-white leading-snug lg:min-h-[2.75em] lg:flex lg:items-end">
          {industry.name}
        </h3>
        <p className="relative mt-1.5 text-sm text-white/70 leading-relaxed lg:min-h-[3.25em]">{industry.short}</p>

        <div className="relative mt-5 pt-4 border-t border-white/10 flex flex-wrap gap-1.5">
          {industry.tags.map((t) => (
            <span key={t} className="px-2.5 py-1 rounded-full bg-white/[0.07] ring-1 ring-white/10 text-[11px] font-medium text-[#BFE6FA]">
              {t}
            </span>
          ))}
        </div>

        <span className="relative mt-auto pt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-[#7FD3F7] group-hover:text-white transition-colors">
          {cta}
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </motion.a>
  );
};
