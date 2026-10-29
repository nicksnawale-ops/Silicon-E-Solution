import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Award, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import { ABOUT_TEXT, COMPANY_INFO } from '../../data/content';

interface AboutUsProps {
  onOpenQuote: () => void;
}

export const AboutUs: React.FC<AboutUsProps> = ({ onOpenQuote }) => {
  return (
    <section
      id="about"
      className="relative py-20 lg:py-28 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #E3EEF8 0%, #E8F2FA 55%, #E4EFF8 100%)' }}
    >
      {/* Section divider: a soft centred hairline instead of a hard full-width border */}
      <div aria-hidden="true" className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-px w-[min(900px,80%)] bg-gradient-to-r from-transparent via-[#0A8BD3]/25 to-transparent" />

      {/* Blueprint grid, faded at the edges */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(10,139,211,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(10,139,211,0.07) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse 75% 65% at 60% 45%, #000 25%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 75% 65% at 60% 45%, #000 25%, transparent 80%)',
        }}
      />
      {/* Light pooling behind the image composition */}
      <div aria-hidden="true" className="pointer-events-none absolute top-1/2 right-[8%] -translate-y-1/2 w-[640px] h-[640px] max-w-full rounded-full bg-[radial-gradient(closest-side,rgba(79,195,247,0.22),transparent)]" />

      {/* Decorative subtle hexagon background watermark */}
      <div className="absolute right-0 top-1/4 -translate-y-1/2 pointer-events-none opacity-20 overflow-hidden max-w-full">
        <svg width="400" height="400" viewBox="0 0 100 100" fill="none">
          <polygon
            points="50 3, 93 25, 93 75, 50 97, 7 75, 7 25"
            stroke="#0A8BD3"
            strokeWidth="1"
            fill="none"
          />
          <polygon
            points="50 15, 83 32, 83 68, 50 85, 17 68, 17 32"
            stroke="#8DC63F"
            strokeWidth="0.8"
            fill="none"
          />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0A8BD3]"
            >
              <span>About Silicon é Solution</span>
              <span aria-hidden="true">·</span>
              <span>Pune, Maharashtra</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B2545] font-display tracking-tight leading-tight"
            >
              Architecting Resilient Infrastructure Across India for Over 15 Years
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed"
            >
              <p>{ABOUT_TEXT.paragraph1}</p>
              <p>{ABOUT_TEXT.paragraph2}</p>
            </motion.div>

            {/* 4 Core Vertical Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2"
            >
              {ABOUT_TEXT.sectors.map((sec, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-white border border-white ring-1 ring-[#0A8BD3]/10 shadow-[0_10px_24px_-18px_rgba(11,37,69,0.35)] flex items-start gap-3"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#8DC63F] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-[#0B2545]">{sec.name}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">{sec.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Action CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="pt-2 flex items-center gap-4"
            >
              <button
                onClick={onOpenQuote}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-[#0A8BD3] to-[#4FC3F7] text-white text-xs sm:text-sm font-semibold shadow-md shadow-[#0A8BD3]/25 hover:shadow-lg hover:shadow-[#0A8BD3]/40 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Consult Our Leadership</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="#approach"
                className="text-xs sm:text-sm font-semibold text-[#0B2545] hover:text-[#0A8BD3] transition-colors"
              >
                Explore Turnkey Delivery →
              </a>
            </motion.div>
          </div>

          {/* Right Column: Handshake / Skyline Image composition */}
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative mx-auto max-w-lg"
            >
              {/* Outer decorative card frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white bg-slate-900 group">
                <img
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80"
                  alt="City Skyline Architecture and Partnership"
                  className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback to stylized high-tech pattern
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />

                {/* Blue overlay  */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B2545]/90 via-[#0A8BD3]/35 to-transparent" />

                {/* Content inside image */}
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#8DC63F] uppercase tracking-wider mb-1">
                    <Award className="w-4 h-4" />
                    <span>Established 2011 · Pune Headquarters</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold font-display text-white">
                    Design · SITC · Lifecycle Handover
                  </h3>
                  <p className="text-xs text-white/80 mt-1">
                    Delivering enterprise technology systems across India with single-source accountability.
                  </p>
                </div>
              </div>

              {/* Floating Badge: 15+ Years Trust */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute -top-4 right-0 sm:-top-6 sm:-right-6 glass-card p-3 sm:p-4 rounded-2xl border border-[#0A8BD3]/25 shadow-xl max-w-[180px] sm:max-w-[200px]"
              >
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-[#0A8BD3] to-[#8DC63F] text-white flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <span className="block text-lg sm:text-xl font-extrabold text-[#0B2545] font-display">
                      15+ Years
                    </span>
                    <span className="block text-[10px] sm:text-[11px] text-slate-500 font-medium">
                      Proven Integrity
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Floating PAN India execution badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="absolute -bottom-4 left-0 sm:-bottom-6 sm:-left-6 glass-card p-2.5 sm:p-4 rounded-2xl border border-[#0A8BD3]/25 shadow-xl flex items-center gap-2.5 sm:gap-3 max-w-[calc(100%-16px)]"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#E8F6FD] text-[#0A8BD3] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="block text-[11px] sm:text-xs font-bold text-[#0B2545]">PAN India Operations</span>
                  <span className="block text-[9px] sm:text-[10px] text-slate-500">Maharashtra · Delhi · South</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
