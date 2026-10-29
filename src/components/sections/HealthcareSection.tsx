import React from 'react';
import { motion } from 'motion/react';
import {
  Heart,
  Activity,
  Layers,
  Flame,
  Building2,
  Shield,
  Wifi,
  ChevronRight,
  Stethoscope,
  Video,
  Lock,
} from 'lucide-react';
import { HEALTHCARE_SECTION } from '../../data/content';

const iconMap: Record<string, React.ElementType> = {
  Layers,
  Flame,
  Activity,
  Building2,
  Shield,
  Wifi,
};

export const HealthcareSection: React.FC = () => {
  return (
    <section id="healthcare" className="relative py-20 lg:py-28 bg-white border-b border-[#0A8BD3]/10 overflow-hidden">
      {/* Background soft pulse ECG graphic */}
      <div className="absolute top-0 left-0 right-0 h-16 pointer-events-none opacity-20 overflow-hidden">
        <svg viewBox="0 0 1200 60" className="w-full h-full preserve-3d">
          <path
            d="M 0 30 L 300 30 L 320 10 L 335 50 L 350 5 L 365 45 L 380 30 L 700 30 L 720 10 L 735 50 L 750 5 L 765 45 L 780 30 L 1200 30"
            fill="none"
            stroke="#0A8BD3"
            strokeWidth="2.5"
            className="animate-ecg"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 text-left">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0A8BD3] mb-2">
            <Heart className="w-4 h-4 text-red-500 fill-red-500/20" />
            <span>Critical Care ELV</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B2545] font-display tracking-tight">
            Solutions for Hospitals & Medical Colleges
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
            Turnkey ELV engineering designed for zero-downtime medical campuses — meeting clinical protocols for patient call response, sterile OT streaming, and integrated life safety.
          </p>
        </div>

        {/* Arrow / Chevron Ribbon Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
          {HEALTHCARE_SECTION.elvItems.map((item, idx) => {
            const Icon = iconMap[item.icon] || Activity;
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="relative group p-4 sm:p-5 rounded-2xl bg-[#F6FAFD] hover:bg-white border border-[#0A8BD3]/15 hover:border-[#0A8BD3]/40 shadow-xs hover:shadow-md transition-all flex items-center justify-between gap-4"
              >
                {/* Accent ribbon arrow mark */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0A8BD3] to-[#4FC3F7] text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-[#0B2545] font-display">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="w-7 h-7 rounded-full bg-white border border-slate-200 group-hover:border-[#8DC63F] group-hover:bg-[#8DC63F] text-slate-400 group-hover:text-white flex items-center justify-center transition-all shrink-0">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 3 Large Featured Spotlight Image Cards */}
        <div>
          <div className="text-left mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-[#0B2545] font-display">
              Clinical Specialization Highlights
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              High-impact installations executed across super-speciality hospitals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HEALTHCARE_SECTION.spotlights.map((spot, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="group relative rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-[#0A8BD3]/20 bg-slate-900 h-96 flex flex-col justify-end"
              >
                {/* Background Image */}
                <img
                  src={spot.image}
                  alt={spot.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-75"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />

                {/* Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B2545] via-[#0B2545]/60 to-transparent" />

                {/* Card Content */}
                <div className="relative z-10 p-6 space-y-2 text-white text-left">
                  <span className="text-[11px] font-mono text-[#8DC63F] font-semibold tracking-wider uppercase block">
                    {spot.specs}
                  </span>
                  <h4 className="text-xl font-bold font-display text-white group-hover:text-[#4FC3F7] transition-colors">
                    {spot.title}
                  </h4>
                  <p className="text-xs text-slate-200 leading-relaxed line-clamp-3">
                    {spot.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
