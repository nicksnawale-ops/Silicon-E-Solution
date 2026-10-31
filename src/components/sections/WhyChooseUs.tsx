import React from 'react';
import { motion } from 'motion/react';
import { Award, Globe, CheckCircle2, Clock, ShieldCheck, Stethoscope } from 'lucide-react';
import { WHY_CHOOSE_US } from '../../data/content';

const iconMap: Record<string, React.ElementType> = {
  Award,
  Globe,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Stethoscope,
};

/** One headline proof point per card (same order as WHY_CHOOSE_US). */
const PROOF = [
  { value: '15+', label: 'Years delivering since 2011' },
  { value: 'PAN India', label: 'Multi-state project execution' },
  { value: '1', label: 'Accountable team, design to handover' },
  { value: '24/7', label: 'Technical incident support' },
  { value: 'SLA', label: 'Backed AMC with OEM spares' },
  { value: 'OT', label: 'Operation theatres & medical labs' },
];

/** Tracks the cursor so the card's spotlight and border glow follow it. */
const trackPointer = (e: React.PointerEvent<HTMLElement>) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
};

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="relative py-20 lg:py-28 surface-ice surface-ice--grid overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0A8BD3] mb-2">
            <span>Engineering Excellence</span>
            <span aria-hidden="true">·</span>
            <span>Uncompromising Accountability</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B2545] font-display tracking-tight">
            Why Partner with Silicon e Solution?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
            We bridge the gap between initial architectural blueprints and decades of flawless technological operation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {WHY_CHOOSE_US.map((item, idx) => {
            const Icon = iconMap[item.icon] || CheckCircle2;
            const proof = PROOF[idx];
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: (idx % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                onPointerMove={trackPointer}
                className="group relative rounded-[28px] p-[1px] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5"
                style={{
                  background:
                    'radial-gradient(420px circle at var(--mx, 50%) var(--my, 0%), rgba(79,195,247,0.85), transparent 45%), linear-gradient(160deg, rgba(10,139,211,0.28), rgba(255,255,255,0.7) 40%, rgba(141,198,63,0.28))',
                  boxShadow: '0 1px 2px rgba(11,37,69,0.05), 0 22px 46px -30px rgba(11,37,69,0.45)',
                }}
              >
                <div className="relative h-full overflow-hidden rounded-[27px] bg-gradient-to-b from-white to-[#F6FAFD] p-7 flex flex-col">
                  {/* Cursor spotlight */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background:
                        'radial-gradient(320px circle at var(--mx, 50%) var(--my, 0%), rgba(79,195,247,0.14), transparent 60%)',
                    }}
                  />
                  {/* Large ghost index */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-3 right-4 font-display font-extrabold text-[92px] leading-none select-none transition-transform duration-700 group-hover:-translate-y-1"
                    style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(10,139,211,0.12)' }}
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </span>

                  {/* Icon tile with glow ring */}
                  <div className="relative w-14 h-14">
                    <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#0A8BD3] to-[#4FC3F7] blur-lg opacity-30 group-hover:opacity-60 transition-opacity duration-500" />
                    <span className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0A8BD3] to-[#4FC3F7] text-white flex items-center justify-center shadow-[0_12px_26px_-10px_rgba(10,139,211,0.75)] transition-transform duration-500 group-hover:rotate-[-6deg] group-hover:scale-105">
                      <Icon className="w-6 h-6" />
                    </span>
                  </div>

                  <h3 className="relative mt-6 text-lg sm:text-[19px] font-bold text-[#0B2545] font-display leading-snug group-hover:text-[#0866A8] transition-colors">
                    {item.title}
                  </h3>
                  <p className="relative mt-2.5 text-sm text-slate-600 leading-relaxed">{item.desc}</p>

                  {/* Proof point */}
                  <div className="relative mt-auto pt-6">
                    <div className="flex items-center gap-3 rounded-2xl bg-white ring-1 ring-[#0A8BD3]/10 px-4 py-3 shadow-[0_8px_20px_-16px_rgba(11,37,69,0.4)]">
                      <span className="shrink-0 font-display font-extrabold text-lg leading-tight pr-0.5 bg-gradient-to-r from-[#0A8BD3] to-[#8DC63F] bg-clip-text text-transparent whitespace-nowrap">
                        {proof?.value}
                      </span>
                      <span className="shrink-0 h-6 w-px bg-[#0A8BD3]/15" />
                      <span className="min-w-0 text-xs font-medium text-slate-500 leading-snug">{proof?.label}</span>
                    </div>
                  </div>

                  {/* Bottom accent sweep */}
                  <span
                    aria-hidden="true"
                    className="absolute left-0 bottom-0 h-[3px] w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out bg-gradient-to-r from-[#0A8BD3] via-[#4FC3F7] to-[#8DC63F]"
                  />
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
