import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  ChevronRight,
  ArrowRight,
  ArrowUpRight,
  Layers,
  Flame,
  Activity,
  Building2,
  Shield,
  Wifi,
  Projector,
  Sparkles,
} from 'lucide-react';
import { CLIENTS_LIST, EDUCATION_SECTION, HEALTHCARE_SECTION, SERVICES_LIST } from '../data/content';
import { INDUSTRIES, Industry, IndustryId } from '../data/industries';
import { ServiceItem } from '../types';
import { ServiceVisual } from '../components/ui/ServiceVisual';
import { serviceIconMap } from '../components/ui/ServiceCard';
import { industryIcons } from '../components/ui/SectorCard';
import { ClientLogo } from '../components/ui/ClientLogo';
import { CtaBand } from '../components/sections/CtaBand';
import { navigate } from '../lib/router';

interface IndustriesPageProps {
  onSelectService: (service: ServiceItem) => void;
  onOpenQuote: () => void;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
/** Fixed navbar (64px) + sticky sector bar (~64px) + breathing room. */
const CHAPTER_OFFSET = 140;

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.7, delay, ease: EASE },
});

const serviceById = (id: string) => SERVICES_LIST.find((s) => s.id === id);

/** Healthcare brochure items mapped to the matching service for the detail popup. */
const HEALTHCARE_SYSTEMS: { icon: React.ElementType; serviceId: string }[] = [
  { icon: Layers, serviceId: 'passive-cabling' },
  { icon: Flame, serviceId: 'evacuation-fapa' },
  { icon: Activity, serviceId: 'nurse-call' },
  { icon: Building2, serviceId: 'bms' },
  { icon: Shield, serviceId: 'security-systems' },
  { icon: Wifi, serviceId: 'wireless' },
];

/* ------------------------------------------------------------------ */
/* Building blocks                                                     */
/* ------------------------------------------------------------------ */

const SystemCard: React.FC<{
  icon: React.ElementType;
  title: string;
  desc: string;
  index: number;
  onClick?: () => void;
}> = ({ icon: Icon, title, desc, index, onClick }) => (
  <motion.button
    type="button"
    onClick={onClick}
    {...reveal((index % 3) * 0.06)}
    className="group relative text-left rounded-[22px] bg-white p-5 ring-1 ring-[#0A8BD3]/10 shadow-[0_14px_34px_-24px_rgba(11,37,69,0.45)] hover:-translate-y-1 hover:ring-[#0A8BD3]/35 hover:shadow-[0_24px_44px_-24px_rgba(10,139,211,0.5)] transition-all duration-500 cursor-pointer overflow-hidden"
  >
    <span aria-hidden="true" className="absolute left-0 bottom-0 h-[3px] w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 bg-gradient-to-r from-[#0A8BD3] via-[#4FC3F7] to-[#8DC63F]" />
    <div className="flex items-start gap-4">
      <span className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#0A8BD3] to-[#4FC3F7] text-white flex items-center justify-center shrink-0 shadow-[0_10px_22px_-10px_rgba(10,139,211,0.8)] transition-transform duration-500 group-hover:rotate-[-6deg]">
        <Icon className="w-5 h-5" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h4 className="text-[15px] font-bold text-[#0B2545] font-display leading-snug group-hover:text-[#0866A8] transition-colors">
            {title}
          </h4>
          <ArrowUpRight className="w-4 h-4 text-[#0A8BD3]/50 shrink-0 mt-0.5 transition-all group-hover:text-[#0A8BD3] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
        <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">{desc}</p>
      </div>
    </div>
  </motion.button>
);

const ImageSpotlight: React.FC<{ title: string; desc: string; tag: string; image: string; index: number }> = ({
  title,
  desc,
  tag,
  image,
  index,
}) => (
  <motion.div
    {...reveal(index * 0.08)}
    className="group relative h-[380px] rounded-[26px] overflow-hidden ring-1 ring-[#0A8BD3]/15 shadow-[0_30px_60px_-34px_rgba(8,27,51,0.75)] bg-gradient-to-br from-[#0B2545] to-[#0E3A66] flex flex-col justify-end"
  >
    <img
      src={image}
      alt={title}
      loading="lazy"
      decoding="async"
      className="absolute inset-0 w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-110"
      referrerPolicy="no-referrer"
      onError={(e) => {
        (e.target as HTMLElement).style.display = 'none';
      }}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#081B33] via-[#0B2545]/70 to-transparent" />
    <div className="relative p-6 text-white">
      <span className="inline-flex px-2.5 py-1 rounded-full bg-white/10 ring-1 ring-white/15 backdrop-blur text-[10px] font-mono font-semibold uppercase tracking-wider text-[#B5E07A]">
        {tag}
      </span>
      <h4 className="mt-3 text-xl font-bold font-display text-white group-hover:text-[#7FD3F7] transition-colors">{title}</h4>
      <p className="mt-2 text-sm text-white/75 leading-relaxed line-clamp-3">{desc}</p>
    </div>
  </motion.div>
);

const ClientStrip: React.FC<{ names: string[] }> = ({ names }) => {
  const clients = names.map((n) => CLIENTS_LIST.find((c) => c.name === n)).filter(Boolean) as typeof CLIENTS_LIST;
  if (!clients.length) return null;
  return (
    <motion.div {...reveal()} className="mt-12">
      <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500 mb-4">Trusted in this sector by</div>
      <div className="flex flex-wrap gap-4">
        {clients.map((c) => (
          <div
            key={c.name}
            title={c.name}
            className="h-20 min-w-[200px] flex-1 sm:flex-none sm:w-[240px] rounded-2xl bg-white ring-1 ring-[#0A8BD3]/10 shadow-[0_10px_26px_-20px_rgba(11,37,69,0.45)] flex items-center justify-center px-5"
          >
            <ClientLogo client={c} size="sm" />
          </div>
        ))}
      </div>
    </motion.div>
  );
};

/* ------------------------------------------------------------------ */
/* Chapter                                                             */
/* ------------------------------------------------------------------ */

const Chapter: React.FC<{
  industry: Industry;
  index: number;
  onSelectService: (s: ServiceItem) => void;
  onOpenQuote: () => void;
  children?: React.ReactNode;
}> = ({ industry, index, onSelectService, onOpenQuote, children }) => {
  const Icon = industryIcons[industry.icon];
  const flip = index % 2 === 1;
  return (
    <section
      id={industry.id}
      className={`relative py-20 lg:py-28 surface-ice ${flip ? 'surface-ice--grid' : 'surface-ice--dots'} overflow-x-clip`}
      style={{ scrollMarginTop: CHAPTER_OFFSET }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Chapter header */}
        <div className={`grid lg:grid-cols-12 gap-10 lg:gap-14 items-center ${flip ? 'lg:[&>*:first-child]:order-2' : ''}`}>
          <div className="lg:col-span-6">
            <motion.div {...reveal()} className="flex items-center gap-3">
              <span
                className="font-display font-extrabold text-5xl leading-none"
                style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(10,139,211,0.35)' }}
              >
                0{index + 1}
              </span>
              <span className="h-px w-10 bg-[#0A8BD3]/30" />
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#0A8BD3]">
                <Icon className="w-4 h-4" />
                {industry.eyebrow}
              </span>
            </motion.div>
            <motion.h2
              {...reveal(0.05)}
              className="mt-4 text-2xl sm:text-3xl lg:text-[40px] lg:leading-[1.12] font-extrabold tracking-tight text-[#0B2545] font-display"
            >
              {industry.headline}
            </motion.h2>
            <motion.p {...reveal(0.1)} className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              {industry.intro}
            </motion.p>
            <motion.div {...reveal(0.15)} className="mt-6 flex flex-wrap gap-2">
              {industry.serviceIds.map((id) => {
                const s = serviceById(id);
                if (!s) return null;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => onSelectService(s)}
                    className="px-3 py-1.5 rounded-full bg-white ring-1 ring-[#0A8BD3]/15 text-xs font-semibold text-[#0866A8] hover:ring-[#0A8BD3]/45 hover:bg-[#F3F9FD] transition cursor-pointer"
                  >
                    {s.title}
                  </button>
                );
              })}
            </motion.div>
            <motion.div {...reveal(0.2)} className="mt-7">
              <button
                type="button"
                onClick={onOpenQuote}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#0A8BD3] to-[#4FC3F7] text-white text-sm font-semibold shadow-[0_12px_28px_-10px_rgba(10,139,211,0.7)] cursor-pointer"
              >
                Discuss a {industry.name.split(' ')[0].toLowerCase()} project
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="lg:col-span-6"
          >
            <div className="relative rounded-[30px] p-[1px] bg-gradient-to-br from-[#4FC3F7]/70 via-white/30 to-[#8DC63F]/50 shadow-[0_40px_80px_-40px_rgba(8,27,51,0.8)]">
              <ServiceVisual serviceId={industry.visual} className="h-[260px] sm:h-[320px] rounded-[29px]" />
            </div>
          </motion.div>
        </div>

        {children}
        <ClientStrip names={industry.clients} />
      </div>
    </section>
  );
};

const SubHeading: React.FC<{ title: string; sub?: string }> = ({ title, sub }) => (
  <motion.div {...reveal()} className="mt-16 mb-6">
    <h3 className="text-lg sm:text-xl font-bold text-[#0B2545] font-display">{title}</h3>
    {sub && <p className="mt-1 text-sm text-slate-500">{sub}</p>}
  </motion.div>
);

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export const IndustriesPage: React.FC<IndustriesPageProps> = ({ onSelectService, onOpenQuote }) => {
  const [active, setActive] = useState<IndustryId>('healthcare');

  useEffect(() => {
    const prev = document.title;
    document.title = 'Industries | Silicon e Solution — Healthcare, Education, Government & Commercial';
    return () => {
      document.title = prev;
    };
  }, []);

  // Highlight the sector currently in the middle of the screen.
  useEffect(() => {
    const els = INDUSTRIES.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id as IndustryId);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const jump = (id: IndustryId) => navigate(`/industries#${id}`);

  return (
    <>
      {/* ================= Hero ================= */}
      <section className="relative pt-32 lg:pt-36 pb-14 lg:pb-20 surface-ice surface-ice--grid overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute -top-40 -right-40 w-[760px] h-[760px] rounded-full bg-[radial-gradient(closest-side,rgba(79,195,247,0.22),transparent)]" />
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
            <span className="text-[#0B2545]">Industries</span>
          </nav>

          <div className="mt-6 grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-6">
              <motion.div {...reveal()} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 ring-1 ring-[#0A8BD3]/15 text-xs font-semibold text-[#0A8BD3]">
                <Sparkles className="w-3.5 h-3.5" />
                4 sectors · {SERVICES_LIST.length} service lines · PAN India
              </motion.div>
              <motion.h1
                {...reveal(0.05)}
                className="mt-5 text-3xl sm:text-4xl lg:text-[54px] lg:leading-[1.06] font-extrabold tracking-tight text-[#0B2545] font-display"
              >
                Infrastructure for the sectors that{' '}
                <span className="bg-gradient-to-r from-[#0A8BD3] via-[#4FC3F7] to-[#8DC63F] bg-clip-text text-transparent">
                  can't afford downtime.
                </span>
              </motion.h1>
              <motion.p {...reveal(0.1)} className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                Hospitals, medical colleges, government institutions and commercial campuses trust us to design, build and
                maintain the systems they run on — every day.
              </motion.p>
              <motion.div {...reveal(0.15)} className="mt-8 grid grid-cols-2 gap-3 max-w-xl">
                {INDUSTRIES.map((ind, i) => {
                  const Icon = industryIcons[ind.icon];
                  return (
                    <button
                      key={ind.id}
                      type="button"
                      onClick={() => jump(ind.id)}
                      className="group flex items-center gap-3 rounded-2xl bg-white/90 p-3.5 text-left ring-1 ring-[#0A8BD3]/10 shadow-[0_10px_26px_-20px_rgba(11,37,69,0.45)] hover:ring-[#0A8BD3]/40 hover:-translate-y-0.5 transition-all cursor-pointer"
                    >
                      <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0A8BD3] to-[#4FC3F7] text-white flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5" />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-mono text-[10px] font-semibold text-[#0A8BD3]">0{i + 1}</span>
                        <span className="block text-sm font-bold text-[#0B2545] leading-tight group-hover:text-[#0866A8]">
                          {ind.name}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </motion.div>
            </div>

            {/* Mosaic of live sector visuals */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: EASE }}
              className="hidden lg:grid lg:col-span-6 grid-cols-2 gap-4"
            >
              {INDUSTRIES.map((ind, i) => (
                <button
                  key={ind.id}
                  type="button"
                  onClick={() => jump(ind.id)}
                  className={`group relative rounded-[24px] p-[1px] bg-gradient-to-br from-[#4FC3F7]/60 via-white/20 to-[#8DC63F]/40 shadow-[0_30px_60px_-36px_rgba(8,27,51,0.8)] text-left cursor-pointer transition-transform duration-500 hover:-translate-y-1 ${
                    i % 2 === 1 ? 'translate-y-8' : ''
                  }`}
                >
                  <ServiceVisual serviceId={ind.visual} showLabel={false} className="h-[200px] rounded-[23px]" />
                  <span className="absolute left-4 bottom-3.5 right-4 flex items-center justify-between text-white">
                    <span className="text-sm font-bold font-display">{ind.name}</span>
                    <ArrowUpRight className="w-4 h-4 text-[#7FD3F7] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </button>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= Sticky sector bar ================= */}
      <div className="sticky top-16 z-30 py-3 backdrop-blur-xl bg-[#E4EFF8]/80 border-y border-[#0A8BD3]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {INDUSTRIES.map((ind) => {
              const Icon = industryIcons[ind.icon];
              const isActive = active === ind.id;
              return (
                <button
                  key={ind.id}
                  type="button"
                  onClick={() => jump(ind.id)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors cursor-pointer ${
                    isActive ? 'text-white' : 'text-slate-600 hover:text-[#0B2545] hover:bg-white/70'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="industry-pill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#0A8BD3] to-[#1597E5] shadow-[0_8px_20px_-8px_rgba(10,139,211,0.7)]"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  )}
                  <Icon className="relative w-4 h-4" />
                  <span className="relative">{ind.name}</span>
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

      {/* ================= 01 Healthcare ================= */}
      <Chapter industry={INDUSTRIES[0]} index={0} onSelectService={onSelectService} onOpenQuote={onOpenQuote}>
        <SubHeading title="Critical care ELV systems" sub="Mission-critical systems for patient safety, continuous operation and clinical precision." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {HEALTHCARE_SECTION.elvItems.map((item, i) => {
            const map = HEALTHCARE_SYSTEMS[i];
            const s = map && serviceById(map.serviceId);
            return (
              <SystemCard
                key={item.title}
                icon={map?.icon ?? Layers}
                title={item.title}
                desc={item.desc}
                index={i}
                onClick={s ? () => onSelectService(s) : undefined}
              />
            );
          })}
        </div>

        <SubHeading title="Clinical specialisation highlights" sub="High-impact installations across super-speciality hospitals." />
        <div className="grid md:grid-cols-3 gap-5">
          {HEALTHCARE_SECTION.spotlights.map((s, i) => (
            <ImageSpotlight key={s.title} title={s.title} desc={s.desc} tag={s.specs.split('·')[0].trim()} image={s.image} index={i} />
          ))}
        </div>
      </Chapter>

      {/* ================= 02 Education ================= */}
      <Chapter industry={INDUSTRIES[1]} index={1} onSelectService={onSelectService} onOpenQuote={onOpenQuote}>
        {/* Auditorium feature band */}
        <motion.div
          {...reveal()}
          className="mt-16 relative overflow-hidden rounded-[30px] text-white grid lg:grid-cols-2"
          style={{ background: 'radial-gradient(120% 140% at 0% 0%, #155A92 0%, #0D2E52 50%, #081B33 100%)' }}
        >
          <div className="relative p-7 sm:p-10">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#B5E07A]">
              <Projector className="w-4 h-4" />
              Multi-screen demo rooms & seminar halls
            </div>
            <h3 className="mt-3 text-2xl sm:text-3xl font-extrabold font-display text-white leading-snug">
              Turnkey acoustic sound, projector & video wall integration
            </h3>
            <p className="mt-3 text-sm sm:text-base text-white/75 leading-relaxed">
              Equipping university auditoriums and demonstration rooms with motorised screens, line-array audio, touch podiums
              and automated lecture capture.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {EDUCATION_SECTION.departments.map((d) => (
                <span key={d} className="px-3 py-1.5 rounded-full bg-white/[0.08] ring-1 ring-white/15 text-xs font-medium text-[#D6EEFB]">
                  {d}
                </span>
              ))}
            </div>
          </div>
          <div className="relative min-h-[260px] p-4 sm:p-6 lg:pl-0">
            <ServiceVisual serviceId="conference-solutions" className="h-full min-h-[240px] rounded-[22px] ring-1 ring-white/10" />
          </div>
        </motion.div>

        <SubHeading title="Department-specific solutions" sub="Purpose-built AV for each medical-college department." />
        <div className="grid md:grid-cols-3 gap-5">
          {EDUCATION_SECTION.features.map((f, i) => (
            <ImageSpotlight key={f.dept} title={f.dept} desc={f.desc} tag={f.badge} image={f.image} index={i} />
          ))}
        </div>
      </Chapter>

      {/* ================= 03 Government ================= */}
      <Chapter industry={INDUSTRIES[2]} index={2} onSelectService={onSelectService} onOpenQuote={onOpenQuote}>
        <SubHeading title="Core capabilities" sub="Tap any capability for the full scope and technical standards." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {INDUSTRIES[2].serviceIds.map((id, i) => {
            const s = serviceById(id);
            if (!s) return null;
            return (
              <SystemCard key={id} icon={serviceIconMap[s.iconName] || Layers} title={s.title} desc={s.shortDesc} index={i} onClick={() => onSelectService(s)} />
            );
          })}
        </div>
      </Chapter>

      {/* ================= 04 Commercial ================= */}
      <Chapter industry={INDUSTRIES[3]} index={3} onSelectService={onSelectService} onOpenQuote={onOpenQuote}>
        <SubHeading title="From construction stage to smart operations" sub="Tap any capability for the full scope and technical standards." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {INDUSTRIES[3].serviceIds.map((id, i) => {
            const s = serviceById(id);
            if (!s) return null;
            return (
              <SystemCard key={id} icon={serviceIconMap[s.iconName] || Layers} title={s.title} desc={s.shortDesc} index={i} onClick={() => onSelectService(s)} />
            );
          })}
        </div>
      </Chapter>

      <CtaBand onOpenQuote={onOpenQuote} />
    </>
  );
};
