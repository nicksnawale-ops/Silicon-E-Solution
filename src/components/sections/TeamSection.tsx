import React from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, UserCheck, Shield } from 'lucide-react';
import { TEAM_MEMBERS } from '../../data/content';
import { HexagonFrame } from '../ui/HexagonFrame';

export const TeamSection: React.FC = () => {
  return (
    <section id="team" className="relative py-20 lg:py-28 bg-[#F6FAFD]/50 border-b border-[#0A8BD3]/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0A8BD3] mb-2">
            <span>Brochure Page 8 Leadership</span>
            <span aria-hidden="true">·</span>
            <span>Technical Authority</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B2545] font-display tracking-tight">
            Our Core Leadership Team
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
            Direct access to veteran engineers, pre-sales specialists, and project directors with decades of hands-on delivery experience.
          </p>
        </div>

        {/* 5 Leadership Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {TEAM_MEMBERS.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="glass-card p-5 rounded-3xl border border-[#0A8BD3]/15 shadow-xs hover:border-[#0A8BD3]/35 hover:shadow-lg transition-all text-center flex flex-col justify-between group"
            >
              <div>
                {/* Initials Avatar inside Hexagon with Signature Gradient */}
                <div className="flex justify-center mb-4">
                  <div className="relative w-20 h-20 flex items-center justify-center">
                    <svg
                      viewBox="0 0 100 115"
                      className="absolute inset-0 w-full h-full group-hover:scale-105 transition-transform"
                      fill="none"
                    >
                      <path
                        d="M50 3 L96 28 L96 87 L50 112 L4 87 L4 28 Z"
                        fill="url(#teamHexGrad)"
                        stroke="#0A8BD3"
                        strokeWidth="2"
                      />
                      <defs>
                        <linearGradient id="teamHexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#0A8BD3" stopOpacity="0.15" />
                          <stop offset="100%" stopColor="#4FC3F7" stopOpacity="0.25" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <span className="relative z-10 text-xl font-black font-display text-[#0866A8]">
                      {member.initials}
                    </span>
                  </div>
                </div>

                <div className="text-[11px] font-mono text-[#8DC63F] font-bold uppercase tracking-wider mb-1">
                  {member.role}
                </div>

                <h3 className="text-base font-bold text-[#0B2545] font-display group-hover:text-[#0A8BD3] transition-colors">
                  {member.name}
                </h3>

                <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                  {member.department}
                </p>
              </div>

              {/* Direct Call & Email Actions */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-center gap-2">
                <a
                  href={`tel:${member.phone.replace(/[\s+]/g, '')}`}
                  aria-label={`Call ${member.name}`}
                  className="w-8 h-8 rounded-xl bg-[#E8F6FD] text-[#0A8BD3] hover:bg-[#0A8BD3] hover:text-white flex items-center justify-center transition-colors shadow-2xs"
                >
                  <Phone className="w-3.5 h-3.5" />
                </a>

                <a
                  href={`mailto:${member.email}`}
                  aria-label={`Email ${member.name}`}
                  className="w-8 h-8 rounded-xl bg-[#F6FAFD] text-slate-600 hover:bg-[#0866A8] hover:text-white flex items-center justify-center transition-colors shadow-2xs border border-slate-200"
                >
                  <Mail className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
