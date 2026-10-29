import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Network,
  Wifi,
  Server,
  Shield,
  MonitorPlay,
  Lock,
  PhoneCall,
  Flame,
  Building2,
  Activity,
  Users,
  Cpu,
  Layers,
  Zap,
  Sun,
  ArrowUpRight,
} from 'lucide-react';
import { SERVICES_LIST } from '../../data/content';
import { ServiceItem } from '../../types';
import { HexagonFrame } from '../ui/HexagonFrame';
import { ServiceAnimation } from '../ui/ServiceAnimation';

const iconMap: Record<string, React.ElementType> = {
  Network,
  Wifi,
  Server,
  Shield,
  MonitorPlay,
  Lock,
  PhoneCall,
  Flame,
  Building2,
  Activity,
  Users,
  Cpu,
  Layers,
  Zap,
  Sun,
};

interface ServicesGridProps {
  onSelectService: (service: ServiceItem) => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({ onSelectService }) => {
  const [filter, setFilter] = useState<'all' | 'core' | 'specialized' | 'infrastructure'>('all');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const filteredServices = SERVICES_LIST.filter((s) => {
    if (filter === 'all') return true;
    return s.category === filter;
  });

  // Explicit check for wide cards: only 01, 04, and 05 span 2 columns when viewing "all"
  const isWideCard = (service: ServiceItem) => {
    if (filter !== 'all') return false;
    return service.number === '01' || service.number === '04' || service.number === '05';
  };

  return (
    <section id="services" className="relative py-20 lg:py-28 bg-[#F6FAFD]/40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0A8BD3] mb-2">
              <span>15 End-to-End Capabilities</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B2545] font-display tracking-tight">
              Our Services
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl">
              End-to-end infrastructure engineered for maximum uptime, strict compliance, and future-proof scalability.
            </p>
          </div>

          {/* Interactive Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white border border-[#0A8BD3]/15 shadow-xs overflow-x-auto max-w-full">
            <button
              onClick={() => setFilter('all')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                filter === 'all'
                  ? 'bg-[#0A8BD3] text-white font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-[#0B2545]'
              }`}
            >
              All Services ({SERVICES_LIST.length})
            </button>
            <button
              onClick={() => setFilter('core')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                filter === 'core'
                  ? 'bg-[#0A8BD3] text-white font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-[#0B2545]'
              }`}
            >
              Core IT & AV
            </button>
            <button
              onClick={() => setFilter('specialized')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                filter === 'specialized'
                  ? 'bg-[#0A8BD3] text-white font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-[#0B2545]'
              }`}
            >
              Life Safety & BMS
            </button>
            <button
              onClick={() => setFilter('infrastructure')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                filter === 'infrastructure'
                  ? 'bg-[#0A8BD3] text-white font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-[#0B2545]'
              }`}
            >
              Passive & Power
            </button>
          </div>
        </div>

        {/* Services Grid / Flex Container */}
        <div
          className={
            filter === 'all'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch [grid-auto-flow:row_dense]'
              : 'flex flex-wrap justify-center gap-6 items-stretch'
          }
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service) => {
              const Icon = iconMap[service.iconName] || Layers;
              const isWide = isWideCard(service);
              const isHovered = hoveredCard === service.id;

              return (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  onMouseEnter={() => setHoveredCard(service.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => onSelectService(service)}
                  className={`group relative glass-card p-6 rounded-3xl border border-[#0A8BD3]/15 shadow-xs glass-card-hover flex flex-col h-full cursor-pointer ${
                    filter === 'all'
                      ? isWide
                        ? 'col-span-1 md:col-span-2 lg:col-span-2'
                        : 'col-span-1 md:col-span-1 lg:col-span-1'
                      : 'w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]'
                  }`}
                >
                  {/* Top Header Section */}
                  <div className="shrink-0 mb-3">
                    <div className="flex items-start justify-between gap-3 sm:gap-4 mb-3">
                      <div className="flex items-center gap-3">
                        <HexagonFrame
                          size={52}
                          borderColor={isHovered ? '#0A8BD3' : 'rgba(10, 139, 211, 0.2)'}
                          bgColor={isHovered ? '#E8F6FD' : 'rgba(232, 246, 253, 0.4)'}
                          glow={isHovered}
                        >
                          <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                        </HexagonFrame>

                        <div>
                          <div className="flex items-center gap-2 text-[11px] font-mono font-semibold text-[#0A8BD3]">
                            <span>{service.number}</span>
                            <span aria-hidden="true">·</span>
                            <span className="capitalize">{service.category}</span>
                          </div>
                          <h3 className="text-base sm:text-lg font-bold text-[#0B2545] font-display group-hover:text-[#0866A8] transition-colors leading-snug">
                            {service.title}
                          </h3>
                        </div>
                      </div>

                      <div className="w-8 h-8 rounded-full bg-white border border-slate-200 group-hover:border-[#0A8BD3] group-hover:bg-[#0A8BD3] text-slate-400 group-hover:text-white flex items-center justify-center transition-all shrink-0 mt-0.5">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {service.shortDesc}
                    </p>
                  </div>

                  {/* Themed Micro-Animation for this specific service */}
                  <div className="my-3 shrink-0">
                    <ServiceAnimation
                      serviceId={service.id}
                      isHovered={isHovered}
                      className={`${
                        isWide ? '!h-[120px]' : '!h-[110px]'
                      } transition-transform duration-300 group-hover:scale-[1.01]`}
                    />
                  </div>

                  {/* Bottom Specs Footer - Always Aligned via mt-auto */}
                  <div className="mt-auto pt-3.5 border-t border-[#0A8BD3]/10">
                    {isWide ? (
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                        <div className="text-[11px] text-slate-500 font-mono leading-relaxed">
                          <span>{service.specs[0]}</span>
                          {service.specs[1] && (
                            <>
                              <span className="mx-1.5 text-[#0A8BD3]/40" aria-hidden="true">
                                ·
                              </span>
                              <span>{service.specs[1]}</span>
                            </>
                          )}
                          {service.specs[2] && (
                            <>
                              <span className="mx-1.5 text-[#0A8BD3]/40" aria-hidden="true">
                                ·
                              </span>
                              <span>{service.specs[2]}</span>
                            </>
                          )}
                        </div>

                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0A8BD3] group-hover:translate-x-0.5 transition-transform shrink-0 self-end sm:self-auto">
                          <span>Explore Details</span>
                          <span aria-hidden="true">→</span>
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <div className="text-[11px] text-slate-500 font-mono leading-snug line-clamp-2">
                          <span>{service.specs[0]}</span>
                          {service.specs[1] && (
                            <>
                              <span className="mx-1.5 text-[#0A8BD3]/40" aria-hidden="true">
                                ·
                              </span>
                              <span>{service.specs[1]}</span>
                            </>
                          )}
                          {service.specs[2] && (
                            <>
                              <span className="mx-1.5 text-[#0A8BD3]/40" aria-hidden="true">
                                ·
                              </span>
                              <span>{service.specs[2]}</span>
                            </>
                          )}
                        </div>

                        <div className="text-right">
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0A8BD3] group-hover:translate-x-0.5 transition-transform">
                            <span>Explore Details</span>
                            <span aria-hidden="true">→</span>
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
