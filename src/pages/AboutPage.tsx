import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import {
  ChevronRight,
  ArrowRight,
  ArrowUpRight,
  Award,
  MapPin,
  ShieldCheck,
  Phone,
  Globe,
  GraduationCap,
  Building2,
  Network,
  Flame,
  Zap,
  ClipboardCheck,
  FileText,
  Settings,
  Headphones,
  Layers,
} from 'lucide-react';
import {
  ABOUT_TEXT,
  APPROACH_STEPS,
  COMPANY_INFO,
  SERVICES_LIST,
  STATS,
} from '../data/content';
import { Counter } from '../components/sections/StatsAndMarquee';
import { WhyChooseUs } from '../components/sections/WhyChooseUs';
import { ClientsSection } from '../components/sections/ClientsSection';
import { TeamSection } from '../components/sections/TeamSection';
import { CtaBand } from '../components/sections/CtaBand';
import { navigate } from '../lib/router';
import { INDUSTRIES } from '../data/industries';
import { SectorCard } from '../components/ui/SectorCard';

interface AboutPageProps {
  onOpenQuote: () => void;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, delay, ease: EASE },
});


const phaseIcons: Record<string, React.ElementType> = {
  ClipboardCheck,
  FileText,
  Settings,
  Headphones,
  GraduationCap,
  ShieldCheck,
  Layers,
};

const count = (c: string) => SERVICES_LIST.filter((s) => s.category === c).length;

const PILLARS = [
  {
    icon: Network,
    title: 'Core IT & AV',
    desc: 'Networking, wireless, datacentre, security and integrated audio-visual systems.',
    n: count('core'),
  },
  {
    icon: Flame,
    title: 'Life Safety & BMS',
    desc: 'Fire alarm & PA, building management, nurse call, voice and conferencing.',
    n: count('specialized'),
  },
  {
    icon: Zap,
    title: 'Passive & Power',
    desc: 'Structured cabling & fibre, cable management, modular UPS and lighting automation.',
    n: count('infrastructure'),
  },
];

const SectionHeader: React.FC<{ eyebrow: string; title: string; sub?: string; center?: boolean }> = ({
  eyebrow,
  title,
  sub,
  center,
}) => (
  <motion.div {...reveal()} className={`max-w-3xl ${center ? 'mx-auto text-center' : ''} mb-10 lg:mb-12`}>
    <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0A8BD3]">{eyebrow}</div>
    <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0B2545] font-display">
      {title}
    </h2>
    {sub && <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">{sub}</p>}
  </motion.div>
);

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenQuote }) => {
  useEffect(() => {
    const prev = document.title;
    document.title = 'About Us | Silicon e Solution — IT Infrastructure Solution Provider, Pune';
    return () => {
      document.title = prev;
    };
  }, []);

  return (
    <>
      {/* ================= Hero ================= */}
      <section className="relative pt-32 lg:pt-36 pb-16 lg:pb-24 surface-ice surface-ice--grid overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute -top-40 -right-40 w-[720px] h-[720px] rounded-full bg-[radial-gradient(closest-side,rgba(79,195,247,0.22),transparent)]" />
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
            <span className="text-[#0B2545]">About us</span>
          </nav>

          <div className="mt-6 grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-6">
              <motion.div {...reveal()} className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0A8BD3]">
                About {COMPANY_INFO.name} · Pune, Maharashtra
              </motion.div>
              <motion.h1
                {...reveal(0.05)}
                className="mt-3 text-3xl sm:text-4xl lg:text-[52px] lg:leading-[1.08] font-extrabold tracking-tight text-[#0B2545] font-display"
              >
                Architecting resilient infrastructure across India{' '}
                <span className="bg-gradient-to-r from-[#0A8BD3] to-[#4FC3F7] bg-clip-text text-transparent">
                  since 2011.
                </span>
              </motion.h1>
              <motion.p {...reveal(0.1)} className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed">
                {ABOUT_TEXT.paragraph1}
              </motion.p>
              <motion.div {...reveal(0.15)} className="mt-7 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={onOpenQuote}
                  className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#0A8BD3] to-[#4FC3F7] text-white text-sm font-semibold shadow-[0_12px_28px_-10px_rgba(10,139,211,0.7)] cursor-pointer"
                >
                  Consult our leadership
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </button>
                <a
                  href="/services"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/services');
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-[#0B2545] text-sm font-semibold ring-1 ring-[#0A8BD3]/20 hover:ring-[#0A8BD3]/50 transition"
                >
                  Explore our services
                </a>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE }}
              className="lg:col-span-6 relative"
            >
              <div className="relative rounded-[32px] overflow-hidden shadow-[0_40px_80px_-40px_rgba(11,37,69,0.55)] ring-4 ring-white h-[340px] sm:h-[440px] bg-gradient-to-br from-[#0B2545] to-[#0E3A66]">
                <img
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
                  alt="Modern city skyline"
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B2545]/90 via-[#0A8BD3]/30 to-transparent" />
                <div className="absolute bottom-16 sm:bottom-[72px] left-6 right-6 sm:left-8 text-white">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#B5E07A]">
                    <Award className="w-4 h-4" /> Established 2011 · Pune headquarters
                  </div>
                  <div className="mt-1.5 text-xl sm:text-2xl font-bold font-display text-white">
                    Design · SITC · Lifecycle handover
                  </div>
                </div>
              </div>
              <div className="absolute -top-5 -right-2 sm:-right-6 rounded-2xl bg-white/95 backdrop-blur p-4 shadow-xl ring-1 ring-[#0A8BD3]/15 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0A8BD3] to-[#8DC63F] text-white flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </span>
                <div>
                  <div className="text-lg font-extrabold text-[#0B2545] font-display leading-none">15+ years</div>
                  <div className="text-[11px] text-slate-500 mt-1">Proven integrity</div>
                </div>
              </div>
              <div className="absolute -bottom-5 -left-2 sm:-left-6 rounded-2xl bg-white/95 backdrop-blur p-3.5 shadow-xl ring-1 ring-[#0A8BD3]/15 flex items-center gap-3">
                <span className="w-9 h-9 rounded-lg bg-[#E8F6FD] text-[#0A8BD3] flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </span>
                <div>
                  <div className="text-xs font-bold text-[#0B2545]">PAN India operations</div>
                  <div className="text-[11px] text-slate-500">Projects delivered nationwide</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= Numbers ================= */}
      <section className="relative py-14 lg:py-16 surface-ice surface-ice--dots">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              {...reveal(i * 0.08)}
              className="rounded-2xl bg-white p-5 sm:p-6 ring-1 ring-[#0A8BD3]/10 shadow-[0_14px_34px_-22px_rgba(11,37,69,0.4)]"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-[#0B2545] font-display">
                <Counter end={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-1.5 text-sm font-semibold text-[#0B2545] font-display">{s.label}</div>
              <div className="text-xs text-slate-500 mt-0.5">{s.sub}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= Who we are / what we deliver ================= */}
      <section className="relative py-20 lg:py-28 surface-ice surface-ice--grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10 lg:gap-14">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="Who we are"
              title="One accountable team, from first survey to final handover."
            />
            <motion.p {...reveal(0.05)} className="-mt-4 text-slate-600 leading-relaxed">
              {ABOUT_TEXT.paragraph2}
            </motion.p>
            <motion.ul {...reveal(0.1)} className="mt-6 space-y-3">
              {[
                'Turnkey IT, networking, voice, UPS, audio & visual infrastructure',
                'Pre-project consulting, design documentation and project management',
                'Post-sale support, training and comprehensive AMC',
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm text-[#0B2545]">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#8DC63F] shrink-0" />
                  {t}
                </li>
              ))}
            </motion.ul>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-3 lg:grid-cols-1 gap-4">
            {PILLARS.map(({ icon: Icon, title, desc, n }, i) => (
              <motion.a
                key={title}
                href="/services"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/services');
                }}
                {...reveal(i * 0.08)}
                className="group relative flex lg:items-center gap-4 lg:gap-6 flex-col lg:flex-row rounded-[24px] bg-white p-5 lg:p-6 ring-1 ring-[#0A8BD3]/10 shadow-[0_14px_34px_-22px_rgba(11,37,69,0.4)] hover:-translate-y-1 hover:ring-[#0A8BD3]/35 transition-all duration-500"
              >
                <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0A8BD3] to-[#4FC3F7] text-white flex items-center justify-center shrink-0 shadow-[0_10px_22px_-10px_rgba(10,139,211,0.8)]">
                  <Icon className="w-6 h-6" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-[#0B2545] font-display">{title}</h3>
                    <span className="text-[11px] font-semibold text-[#0A8BD3] bg-[#EAF4FB] rounded-full px-2 py-0.5">
                      {n} services
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-slate-600">{desc}</p>
                </div>
                <ArrowUpRight className="hidden lg:block w-5 h-5 text-[#0A8BD3] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ================= Sectors ================= */}
      <section className="relative py-20 lg:py-28 surface-ice surface-ice--dots">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Sectors we serve"
            title="A strong hold where reliability matters most."
            sub="Education, healthcare, government and commercial clients rely on us for infrastructure that has to work every day."
            center
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {INDUSTRIES.map((ind, i) => (
              <SectorCard key={ind.id} industry={ind} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= How we work ================= */}
      <section className="relative py-20 lg:py-28 surface-ice surface-ice--grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <SectionHeader
              eyebrow="How we work"
              title="Seven phases, one standard of delivery."
              sub="Every engagement follows the same disciplined path, so quality never depends on luck."
            />
            <a
              href="/#approach"
              onClick={(e) => {
                e.preventDefault();
                navigate('/#approach');
              }}
              className="group mb-10 lg:mb-12 inline-flex items-center gap-2 text-sm font-semibold text-[#0A8BD3] whitespace-nowrap"
            >
              See the full approach
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
          <ol className="relative grid sm:grid-cols-2 lg:grid-cols-7 gap-4">
            <span aria-hidden="true" className="hidden lg:block absolute top-6 left-[7%] right-[7%] h-px bg-gradient-to-r from-[#0A8BD3]/10 via-[#0A8BD3]/40 to-[#8DC63F]/40" />
            {APPROACH_STEPS.map((step, i) => {
              const Icon = phaseIcons[step.iconName] || Layers;
              return (
                <motion.li key={step.id} {...reveal(i * 0.06)} className="relative lg:text-center">
                  <div className="flex lg:flex-col items-center gap-3 lg:gap-0">
                    <span className="relative z-10 w-12 h-12 rounded-full bg-white ring-1 ring-[#0A8BD3]/25 shadow-md flex items-center justify-center text-[#0A8BD3] shrink-0">
                      <Icon className="w-5 h-5" />
                      <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#0B2545] text-white text-[10px] font-mono font-bold flex items-center justify-center ring-2 ring-white">
                        {step.id}
                      </span>
                    </span>
                    <div className="lg:mt-3">
                      <div className="text-sm font-bold text-[#0B2545] font-display leading-snug">{step.title}</div>
                      <div className="mt-0.5 text-xs text-slate-500 leading-snug">{step.shortDesc}</div>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ================= Reused sections ================= */}
      <WhyChooseUs />
      <ClientsSection />
      <TeamSection />

      {/* ================= Office ================= */}
      <section className="relative py-20 lg:py-24 surface-ice surface-ice--dots">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...reveal()}
            className="relative overflow-hidden rounded-[32px] bg-white ring-1 ring-[#0A8BD3]/10 shadow-[0_30px_70px_-40px_rgba(11,37,69,0.5)] grid lg:grid-cols-2"
          >
            <div className="p-7 sm:p-10">
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0A8BD3]">Visit or call us</div>
              <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0B2545] font-display">
                Pune corporate office
              </h2>
              <ul className="mt-6 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#0A8BD3] shrink-0 mt-0.5" />
                  <span className="text-slate-700">{COMPANY_INFO.location}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#0A8BD3] shrink-0 mt-0.5" />
                  <span className="text-slate-700">
                    {COMPANY_INFO.phones.map((p, i) => (
                      <React.Fragment key={p}>
                        {i > 0 && ' · '}
                        <a href={`tel:${p.replace(/\s/g, '')}`} className="hover:text-[#0A8BD3]">
                          {p}
                        </a>
                      </React.Fragment>
                    ))}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-[#0A8BD3] shrink-0 mt-0.5" />
                  <span className="text-slate-700">{COMPANY_INFO.website}</span>
                </li>
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={onOpenQuote}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#0A8BD3] to-[#4FC3F7] text-white text-sm font-semibold shadow-[0_12px_28px_-10px_rgba(10,139,211,0.7)] cursor-pointer"
                >
                  Request a proposal <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="/#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/#contact');
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-[#0B2545] ring-1 ring-[#0A8BD3]/25 hover:ring-[#0A8BD3]/50 transition"
                >
                  Contact form
                </a>
              </div>
            </div>
            <div className="relative min-h-[280px] bg-[#E4EFF8]">
              <iframe
                title="Silicon e Solution office location, Bavdhan, Pune"
                src={COMPANY_INFO.mapEmbedUrl}
                className="absolute inset-0 w-full h-full border-0 grayscale-[30%]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <CtaBand onOpenQuote={onOpenQuote} />
    </>
  );
};
