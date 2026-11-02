import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Quote, CheckCircle2, Plus } from 'lucide-react';
import { ClientLogo } from '../ui/ClientLogo';
import { CLIENTS_LIST } from '../../data/content';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Scope delivered per client (from each project description). */
const SCOPE: Record<string, string[]> = {
  'Symbiosis University Hospital & Research Centre': ['Passive cabling', 'IP CCTV surveillance', 'Nurse call', 'AV auditorium'],
  'Krishna Institute of Medical Sciences (KIMSDU)': ['Medical college AV', 'Lecture capture', 'Dissection camera feeds', 'Campus fibre backbone'],
  'Yashodhara Super Speciality Hospital': ['BMS', 'Fire alarm & PA', 'OT streaming', 'Hospital Wi-Fi'],
  'Anibrain Studio': ['10G/40G networking', 'Enterprise SAN storage', 'Access control'],
  'Symbiosis International (Deemed University)': ['Campus Wi-Fi', 'Video conferencing', 'Seminar hall audio'],
};

/**
 * Clients spotlight: a refined logo wall on the left; selecting a logo brings
 * that client's story forward on the right. Only a soft crossfade — no loops.
 */
export const ClientsSection: React.FC = () => {
  const [active, setActive] = useState(0);
  const client = CLIENTS_LIST[active];
  const scope = SCOPE[client.name] ?? [];

  return (
    <section id="clients" className="relative py-20 lg:py-28 surface-ice surface-ice--dots overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center max-w-3xl mx-auto mb-12 lg:mb-14"
        >
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0A8BD3]">Institutional partners</div>
          <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B2545] font-display tracking-tight">
            Trusted by{' '}
            <span className="bg-gradient-to-r from-[#0A8BD3] via-[#1FA8C9] to-[#6FAE1F] bg-clip-text text-transparent">
              leading institutions
            </span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            High-consequence infrastructure engineered for premier university hospitals, deemed universities and creative
            studios.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative rounded-[34px] p-[1.5px] bg-gradient-to-br from-[#4FC3F7]/50 via-white to-[#8DC63F]/45 shadow-[0_40px_90px_-55px_rgba(11,37,69,0.6)]"
        >
          <div className="relative grid lg:grid-cols-12 rounded-[32.5px] bg-white/85 backdrop-blur-xl overflow-hidden">
            {/* Logo wall */}
            <div className="lg:col-span-5 p-3 sm:p-4 lg:border-r border-[#0A8BD3]/10">
              <div className="grid grid-cols-2 gap-px rounded-[24px] overflow-hidden bg-[#0A8BD3]/10">
                {CLIENTS_LIST.map((c, i) => {
                  const isActive = i === active;
                  return (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setActive(i)}
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      aria-pressed={isActive}
                      aria-label={c.name}
                      className={`group relative h-[104px] sm:h-[124px] flex items-center justify-center px-4 sm:px-6 transition-colors duration-300 cursor-pointer ${
                        isActive ? 'bg-white' : 'bg-[#F7FBFE] hover:bg-white'
                      }`}
                    >
                      {/* Selected marker */}
                      <span
                        aria-hidden="true"
                        className={`absolute left-4 right-4 bottom-0 h-[3px] rounded-full bg-gradient-to-r from-[#0A8BD3] via-[#4FC3F7] to-[#8DC63F] origin-center transition-transform duration-500 ${
                          isActive ? 'scale-x-100' : 'scale-x-0'
                        }`}
                      />
                      <span className={`transition-all duration-500 ${isActive ? 'opacity-100 grayscale-0 scale-100' : 'opacity-60 grayscale group-hover:opacity-100 group-hover:grayscale-0 scale-95'}`}>
                        {c.logo ? (
                          <ClientLogo client={c} size="sm" />
                        ) : (
                          <span className="text-xs font-black font-display tracking-wider text-[#0B2545]">{c.logoText}</span>
                        )}
                      </span>
                    </button>
                  );
                })}
                {/* Closing tile */}
                <div className="h-[104px] sm:h-[124px] flex flex-col items-center justify-center gap-1.5 bg-[#F7FBFE] text-center px-4">
                  <span className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0A8BD3] to-[#8DC63F] text-white flex items-center justify-center">
                    <Plus className="w-4 h-4" />
                  </span>
                  <span className="text-xs font-semibold text-slate-500 leading-snug">and many more across India</span>
                </div>
              </div>
            </div>

            {/* Spotlight */}
            <div className="lg:col-span-7 relative p-6 sm:p-9 lg:p-11 min-h-[420px] sm:min-h-[400px]">
              <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(70%_80%_at_100%_0%,rgba(79,195,247,0.12),transparent_70%),radial-gradient(60%_70%_at_0%_100%,rgba(141,198,63,0.10),transparent_70%)]" />
              <Quote aria-hidden="true" className="absolute right-6 top-6 sm:right-9 sm:top-8 w-20 h-20 sm:w-28 sm:h-28 text-[#0A8BD3]/[0.06] rotate-180" />

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={client.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="relative h-full flex flex-col"
                >
                  <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0A8BD3]">
                    <span className="font-mono text-slate-400 whitespace-nowrap shrink-0">
                      {String(active + 1).padStart(2, '0')} / {String(CLIENTS_LIST.length).padStart(2, '0')}
                    </span>
                    <span className="h-px w-8 shrink-0 bg-gradient-to-r from-[#0A8BD3] to-[#8DC63F]" />
                    {client.sector}
                  </div>

                  <h3 className="mt-4 text-2xl sm:text-3xl lg:text-[34px] lg:leading-[1.15] font-extrabold tracking-tight text-[#0B2545] font-display max-w-xl">
                    {client.name}
                  </h3>
                  <div className="mt-2 inline-flex items-center gap-1.5 text-sm text-slate-500">
                    <MapPin className="w-4 h-4 text-[#0A8BD3]" />
                    {client.location}
                  </div>

                  <blockquote className="mt-6 pl-5 border-l-2 border-[#0A8BD3]/30 text-[15px] sm:text-lg text-slate-700 leading-relaxed max-w-2xl">
                    {client.description}
                  </blockquote>

                  {scope.length > 0 && (
                    <div className="mt-auto pt-8">
                      <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#0B2545]/60">Scope delivered</div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {scope.map((s) => (
                          <span
                            key={s}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white ring-1 ring-[#0A8BD3]/15 text-[13px] font-medium text-[#0B2545] shadow-[0_6px_16px_-12px_rgba(11,37,69,0.45)]"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#6FAE1F]" />
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
