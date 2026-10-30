import React from 'react';
import { motion } from 'motion/react';
import {
  Network, Wifi, Server, Shield, MonitorPlay, Lock, PhoneCall, Flame, Building2,
  Activity, Users, Cpu, Layers, Zap, Sun, ArrowUpRight,
} from 'lucide-react';
import { ServiceItem } from '../../types';
import { ServiceVisual } from './ServiceVisual';

export const serviceIconMap: Record<string, React.ElementType> = {
  Network, Wifi, Server, Shield, MonitorPlay, Lock, PhoneCall, Flame, Building2,
  Activity, Users, Cpu, Layers, Zap, Sun,
};

export const CATEGORY_LABEL: Record<ServiceItem['category'], string> = {
  core: 'Core IT & AV',
  specialized: 'Life Safety & BMS',
  infrastructure: 'Passive & Power',
};

interface ServiceCardProps {
  service: ServiceItem;
  onSelect: (service: ServiceItem) => void;
  index?: number;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onSelect, index = 0 }) => {
  const Icon = serviceIconMap[service.iconName] || Layers;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      role="button"
      tabIndex={0}
      aria-label={`${service.title} — view details`}
      onClick={() => onSelect(service)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(service);
        }
      }}
      className="group relative flex flex-col h-full rounded-[28px] p-2.5 cursor-pointer outline-none transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 focus-visible:ring-4 focus-visible:ring-[#0A8BD3]/35"
      style={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F7FAFD 100%)',
        boxShadow:
          '0 1px 2px rgba(11,37,69,0.06), 0 18px 40px -24px rgba(11,37,69,0.40), 0 0 0 1px rgba(10,139,211,0.12)',
      }}
    >
      {/* Hover glow ring */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ boxShadow: '0 30px 60px -28px rgba(10,139,211,0.55), 0 0 0 1px rgba(10,139,211,0.35)' }}
      />

      {/* Display panel */}
      <ServiceVisual serviceId={service.id} className="h-[176px] sm:h-[188px] rounded-[20px]" />

      <div className="relative flex flex-col flex-1 px-3.5 pt-5 pb-3.5">
        <div className="flex items-center gap-3">
          <span className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#0A8BD3] to-[#4FC3F7] text-white flex items-center justify-center shrink-0 shadow-[0_10px_22px_-10px_rgba(10,139,211,0.8)] transition-transform duration-500 group-hover:rotate-[-6deg] group-hover:scale-105">
            <Icon className="w-5 h-5" />
          </span>
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-[11px] font-semibold">
              <span className="font-mono text-[#0A8BD3]">{service.number}</span>
              <span className="h-3 w-px bg-[#0A8BD3]/25" />
              <span className="uppercase tracking-[0.12em] text-slate-500">{CATEGORY_LABEL[service.category]}</span>
            </div>
          </div>
        </div>

        <h3 className="mt-3.5 text-[19px] leading-snug font-bold text-[#0B2545] font-display group-hover:text-[#0866A8] transition-colors">
          {service.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{service.shortDesc}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {service.specs.slice(0, 2).map((spec) => (
            <span
              key={spec}
              className="px-2.5 py-1 rounded-full bg-[#EAF4FB] text-[11px] font-medium text-[#0866A8] ring-1 ring-[#0A8BD3]/12"
            >
              {spec}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-5 flex items-center justify-between">
          <span className="text-[13px] font-semibold text-[#0B2545] group-hover:text-[#0A8BD3] transition-colors">
            Explore service
          </span>
          <span className="relative w-10 h-10 rounded-full flex items-center justify-center ring-1 ring-[#0A8BD3]/25 text-[#0A8BD3] overflow-hidden transition-colors duration-300 group-hover:text-white">
            <span className="absolute inset-0 bg-gradient-to-br from-[#0A8BD3] to-[#4FC3F7] scale-0 group-hover:scale-100 transition-transform duration-500 ease-out rounded-full" />
            <ArrowUpRight className="relative w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </motion.article>
  );
};
