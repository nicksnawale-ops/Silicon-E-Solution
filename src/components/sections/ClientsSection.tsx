import React from 'react';
import { motion } from 'motion/react';
import { Building2, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';
import { CLIENTS_LIST } from '../../data/content';

export const ClientsSection: React.FC = () => {
  return (
    <section id="clients" className="relative py-20 lg:py-28 bg-white border-b border-[#0A8BD3]/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0A8BD3] mb-2">
            <span>Brochure Page 8 Clientele</span>
            <span aria-hidden="true">·</span>
            <span>Institutional Partners</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B2545] font-display tracking-tight">
            Trusted by Leading Institutions
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
            High-consequence infrastructure engineered for premier university hospitals, deemed universities, and creative studios.
          </p>
        </div>

        {/* Client Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CLIENTS_LIST.map((client, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="glass-card p-6 rounded-3xl border border-[#0A8BD3]/15 shadow-xs hover:border-[#0A8BD3]/35 hover:shadow-lg transition-all text-left flex flex-col justify-between group"
            >
              <div>
                {/* Logo typography badge representing brochure logos */}
                <div className="h-14 flex items-center justify-start border-b border-slate-100 pb-3 mb-4">
                  <div className="px-3.5 py-1.5 rounded-xl bg-[#F6FAFD] border border-[#0A8BD3]/15 group-hover:bg-[#E8F6FD] transition-colors">
                    <span className="text-xs font-black font-display tracking-wider text-[#0B2545] group-hover:text-[#0866A8]">
                      {client.logoText}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[11px] font-semibold text-[#0A8BD3] uppercase tracking-wider mb-1">
                  <span>{client.sector}</span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[#0B2545] font-display group-hover:text-[#0866A8] transition-colors">
                  {client.name}
                </h3>

                <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1 mb-3">
                  <MapPin className="w-3.5 h-3.5 text-[#0A8BD3]" />
                  <span>{client.location}</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {client.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1.5 text-[#8DC63F] font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  Active Operational Scope
                </span>
                <span className="text-[11px] font-mono text-[#0A8BD3]">PAN India</span>
              </div>
            </motion.div>
          ))}

          {/* Plus Many More Card */}
          <div className="glass-card p-6 rounded-3xl border border-dashed border-[#0A8BD3]/30 bg-gradient-to-br from-[#F6FAFD] to-[#E8F6FD]/50 flex flex-col justify-center items-center text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#0A8BD3]/10 border border-[#0A8BD3]/25 flex items-center justify-center text-[#0A8BD3] mb-3">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#0B2545] font-display">
              And Many More...
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xs leading-relaxed">
              Serving hundreds of commercial units, colleges, construction groups, and government agencies nationwide.
            </p>
            <a
              href="#contact"
              className="mt-4 text-xs font-semibold text-[#0866A8] hover:text-[#0A8BD3] flex items-center gap-1"
            >
              <span>Join Our Client Network</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
