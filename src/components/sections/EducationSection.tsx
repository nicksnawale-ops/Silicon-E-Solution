import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Projector, MonitorPlay, Sparkles, CheckCircle2 } from 'lucide-react';
import { EDUCATION_SECTION } from '../../data/content';

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="relative py-20 lg:py-28 surface-ice surface-ice--grid overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0A8BD3] mb-2">
            <GraduationCap className="w-4 h-4 text-[#0A8BD3]" />
            <span>Academic Campuses</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B2545] font-display tracking-tight">
            {EDUCATION_SECTION.title}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            {EDUCATION_SECTION.subtitle}
          </p>
        </div>

        {/* Academic Auditorium Banner with Video Wall Showcase */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#0A8BD3]/20 bg-slate-900 mb-14">
          <img
            src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80"
            alt="Auditorium Lecture Hall AV Installation"
            className="w-full h-[320px] sm:h-[400px] object-cover opacity-60"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#0B2545] via-[#0B2545]/80 to-transparent" />

          {/* Overlay info */}
          <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-center max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#8DC63F] font-bold uppercase tracking-wider mb-2">
              <Projector className="w-4 h-4" />
              <span>Multi-Screen Demo Room & Seminar Halls</span>
            </div>
            <h3 className="text-xl sm:text-3xl font-extrabold text-white font-display leading-snug">
              Turnkey Acoustic Sound, Projector & Video Wall Integration
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 mt-2 leading-relaxed">
              Equipping university auditoriums and demonstration rooms with motorized screens, line-array audio suppression, touch podiums, and automated lecture capture.
            </p>

            {/* Assembling Video Wall visual simulation */}
            <div className="mt-6 flex items-center gap-3">
              <div className="grid grid-cols-4 gap-1 p-1 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
                {[0, 1, 2, 3, 4, 5, 6, 7].map((tile) => (
                  <motion.div
                    key={tile}
                    animate={{ opacity: [0.6, 1, 0.7] }}
                    transition={{ duration: 1.5, delay: tile * 0.1, repeat: Infinity }}
                    className="w-6 h-4 bg-gradient-to-tr from-[#0A8BD3] to-[#8DC63F] rounded-[1px]"
                  />
                ))}
              </div>
              <div className="text-[11px] text-white/90 font-mono">
                Active 4K 8-Screen Matrix Broadcast
              </div>
            </div>
          </div>
        </div>

        {/* Department Chips Staggered Display  */}
        <div className="mb-12">
          <p className="text-xs font-semibold text-center text-slate-500 uppercase tracking-wider mb-4">
            Custom Departmental Solutions Deployed Across:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {EDUCATION_SECTION.departments.map((dept, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="px-4 py-2 rounded-xl bg-white border border-[#0A8BD3]/15 shadow-2xs hover:border-[#0A8BD3]/40 hover:shadow-xs transition-all text-xs font-semibold text-[#0B2545] flex items-center gap-2"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#8DC63F]" />
                <span>{dept}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 3 Department Feature Cards: Anatomy, Pathology, Biochemist */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {EDUCATION_SECTION.features.map((feat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card rounded-3xl overflow-hidden border border-[#0A8BD3]/15 shadow-xs hover:shadow-lg transition-all group text-left flex flex-col justify-between"
            >
              <div className="relative h-48 overflow-hidden bg-slate-800">
                <img
                  src={feat.image}
                  alt={feat.dept}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B2545]/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-[10px] font-mono text-[#8DC63F] font-bold uppercase tracking-wider">
                    {feat.badge}
                  </span>
                  <h4 className="text-base font-bold text-white font-display">
                    {feat.dept}
                  </h4>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {feat.desc}
                </p>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-[#0A8BD3]">
                  <CheckCircle2 className="w-4 h-4 text-[#8DC63F]" />
                  <span>Interactive Smart Board Ready</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
