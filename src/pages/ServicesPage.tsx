import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Layers, ShieldCheck, Award, MapPin, Sparkles, ArrowRight } from 'lucide-react';
import { SERVICES_LIST } from '../data/content';
import { ServiceItem } from '../types';
import { ServiceCard, CATEGORY_LABEL } from '../components/ui/ServiceCard';
import { CtaBand } from '../components/sections/CtaBand';
import { navigate } from '../lib/router';

type Filter = 'all' | ServiceItem['category'];

interface ServicesPageProps {
  onSelectService: (service: ServiceItem) => void;
  onOpenQuote: () => void;
}

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'All services' },
  { key: 'core', label: CATEGORY_LABEL.core },
  { key: 'specialized', label: CATEGORY_LABEL.specialized },
  { key: 'infrastructure', label: CATEGORY_LABEL.infrastructure },
];

const FACTS = [
  { icon: Layers, value: `${SERVICES_LIST.length}`, label: 'Service lines' },
  { icon: Award, value: '15+', label: 'Years delivering' },
  { icon: ShieldCheck, value: 'SITC', label: 'Design to handover' },
  { icon: MapPin, value: 'PAN India', label: 'Project execution' },
];

/** Column span for the custom tile so it fills the remainder of the last row. */
const MD_SPAN = ['md:col-span-2', 'md:col-span-1'];
const LG_SPAN = ['lg:col-span-3', 'lg:col-span-2', 'lg:col-span-1'];

export const ServicesPage: React.FC<ServicesPageProps> = ({ onSelectService, onOpenQuote }) => {
  const [filter, setFilter] = useState<Filter>('all');

  useEffect(() => {
    const prev = document.title;
    document.title = 'Services | Silicon é Solution — IT Infrastructure, ELV, AV & Power';
    return () => {
      document.title = prev;
    };
  }, []);

  const visible = SERVICES_LIST.filter((s) => filter === 'all' || s.category === filter);
  const count = (f: Filter) => (f === 'all' ? SERVICES_LIST.length : SERVICES_LIST.filter((s) => s.category === f).length);

  return (
    <>
      {/* Page hero */}
      <section className="relative pt-32 lg:pt-36 pb-12 lg:pb-16 surface-ice surface-ice--grid overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute -top-32 right-[-10%] w-[640px] h-[640px] rounded-full bg-[radial-gradient(closest-side,rgba(79,195,247,0.22),transparent)]" />
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
            <span className="text-[#0B2545]">Services</span>
          </nav>

          <div className="mt-6 grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7">
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0A8BD3]">
                {SERVICES_LIST.length} end-to-end capabilities
              </div>
              <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0B2545] font-display">
                Infrastructure services,
                <br className="hidden sm:block" /> engineered end to end.
              </h1>
              <p className="mt-4 max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed">
                From core networking and data centres to life-safety, building automation, cabling and power — designed,
                supplied, installed, tested and commissioned by one accountable team.
              </p>
            </div>
            <div className="lg:col-span-5 grid grid-cols-2 gap-3">
              {FACTS.map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="rounded-2xl bg-white/90 p-4 ring-1 ring-[#0A8BD3]/10 shadow-[0_10px_26px_-18px_rgba(11,37,69,0.35)]"
                >
                  <Icon className="w-4 h-4 text-[#0A8BD3]" />
                  <div className="mt-2 text-xl font-extrabold text-[#0B2545] font-display">{value}</div>
                  <div className="text-xs text-slate-500">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filters + grid */}
      <section id="services" className="relative pb-20 lg:pb-28 surface-ice surface-ice--dots">
        <div className="sticky-tabbar sticky top-16 z-30 py-3 mb-8 border-y border-[#0A8BD3]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
            <div role="tablist" aria-label="Filter services" className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {FILTERS.map((f) => {
                const active = filter === f.key;
                return (
                  <button
                    key={f.key}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setFilter(f.key)}
                    className={`relative shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                      active ? 'text-white' : 'text-slate-600 hover:text-[#0B2545] hover:bg-white/70'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="svc-filter-pill"
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-[#0A8BD3] to-[#1597E5] shadow-[0_8px_20px_-8px_rgba(10,139,211,0.7)]"
                        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      />
                    )}
                    <span className="relative">
                      {f.label}
                      <span className={`ml-1.5 text-xs ${active ? 'text-white/80' : 'text-slate-400'}`}>{count(f.key)}</span>
                    </span>
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 items-stretch">
            <AnimatePresence mode="popLayout">
              {visible.map((service, i) => (
                <ServiceCard key={service.id} service={service} onSelect={onSelectService} index={i} />
              ))}
              {/* Custom-requirement tile: fills the rest of the last row so the grid never ends ragged. */}
              <motion.div
                key={`custom-${filter}`}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className={`${MD_SPAN[visible.length % 2]} ${LG_SPAN[visible.length % 3]} relative rounded-[28px] p-[1.5px] bg-gradient-to-br from-[#4FC3F7]/60 via-white to-[#8DC63F]/50`}
              >
                <div className="@container relative h-full overflow-hidden rounded-[26.5px] bg-gradient-to-br from-white via-[#F4FAFE] to-[#EEF7E2] p-7 sm:p-8 flex flex-col justify-center">
                  <div aria-hidden="true" className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-[radial-gradient(closest-side,rgba(79,195,247,0.22),transparent)]" />
                  <div aria-hidden="true" className="absolute -left-10 -bottom-16 w-48 h-48 rounded-full bg-[radial-gradient(closest-side,rgba(141,198,63,0.2),transparent)]" />
                  <div className="relative flex flex-col @xl:flex-row @xl:items-center gap-5 @xl:gap-7">
                    <span className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0A8BD3] to-[#8DC63F] text-white flex items-center justify-center shrink-0 shadow-[0_14px_30px_-12px_rgba(10,139,211,0.7)]">
                      <Sparkles className="w-6 h-6" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0A8BD3]">Custom requirement?</div>
                      <h3 className="mt-1.5 text-xl font-extrabold tracking-tight text-[#0B2545] font-display">Need something beyond this list?</h3>
                      <p className="mt-1.5 text-sm text-slate-600 leading-relaxed max-w-xl">
                        Our engineers design bespoke ELV, IT and AV systems around your site, standards and budget.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={onOpenQuote}
                      className="group self-start @xl:self-auto shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-[#0A8BD3] to-[#4FC3F7] text-white text-sm font-semibold shadow-[0_12px_28px_-10px_rgba(10,139,211,0.7)] hover:-translate-y-0.5 transition-transform cursor-pointer"
                    >
                      Discuss a project
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <CtaBand onOpenQuote={onOpenQuote} />
    </>
  );
};
