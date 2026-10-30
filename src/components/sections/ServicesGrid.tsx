import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SERVICES_LIST } from '../../data/content';
import { ServiceItem } from '../../types';
import { ServiceCard } from '../ui/ServiceCard';
import { navigate } from '../../lib/router';

/** The six services highlighted on the home page; the full list lives on /services. */
export const FEATURED_SERVICE_IDS = [
  'networking',
  'wireless',
  'datacentre',
  'security-systems',
  'av-solutions',
  'evacuation-fapa',
];

interface ServicesGridProps {
  onSelectService: (service: ServiceItem) => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({ onSelectService }) => {
  const featured = FEATURED_SERVICE_IDS.map((id) => SERVICES_LIST.find((s) => s.id === id)).filter(
    (s): s is ServiceItem => Boolean(s)
  );
  const more = SERVICES_LIST.filter((s) => !FEATURED_SERVICE_IDS.includes(s.id));

  return (
    <section id="services" className="relative py-20 lg:py-28 surface-ice surface-ice--grid overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0A8BD3] mb-2">
              <span>{SERVICES_LIST.length} End-to-End Capabilities</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B2545] font-display tracking-tight">
              Our Services
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl">
              End-to-end infrastructure engineered for maximum uptime, strict compliance, and future-proof scalability.
            </p>
          </div>
          <a
            href="/services"
            onClick={(e) => {
              e.preventDefault();
              navigate('/services');
            }}
            className="group hidden md:inline-flex items-center gap-2 text-sm font-semibold text-[#0A8BD3] hover:text-[#0866A8] whitespace-nowrap"
          >
            View all {SERVICES_LIST.length} services
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Featured six */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 items-stretch">
          {featured.map((service, i) => (
            <ServiceCard key={service.id} service={service} onSelect={onSelectService} index={i} />
          ))}
        </div>

        {/* "More services" call-to-action */}
        <div
          className="relative mt-10 rounded-[28px] overflow-hidden p-6 sm:p-8 lg:p-10 text-white"
          style={{ background: 'radial-gradient(120% 140% at 0% 0%, #155A92 0%, #0D2E52 50%, #081B33 100%)' }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                'linear-gradient(rgba(79,195,247,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(79,195,247,0.08) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
              maskImage: 'radial-gradient(ellipse 70% 90% at 80% 50%, #000 20%, transparent 80%)',
              WebkitMaskImage: 'radial-gradient(ellipse 70% 90% at 80% 50%, #000 20%, transparent 80%)',
            }}
          />
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 w-80 h-80 rounded-full bg-[radial-gradient(closest-side,rgba(141,198,63,0.25),transparent)]" />

          <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-10">
            <div className="min-w-0">
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7FD3F7]">
                + {more.length} more specialised services
              </div>
              <h3 className="mt-2 text-xl sm:text-2xl font-bold font-display text-white">
                Voice, life safety, building automation, cabling, power &amp; more
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {more.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => onSelectService(s)}
                    className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 ring-1 ring-white/15 text-xs font-medium text-white/90 transition-colors cursor-pointer"
                  >
                    {s.title}
                  </button>
                ))}
              </div>
            </div>
            <a
              href="/services"
              onClick={(e) => {
                e.preventDefault();
                navigate('/services');
              }}
              className="group shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-[#0B2545] text-sm font-semibold shadow-[0_12px_30px_-12px_rgba(0,0,0,0.5)] hover:bg-[#8DC63F] hover:text-white transition-colors"
            >
              View all {SERVICES_LIST.length} services
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
