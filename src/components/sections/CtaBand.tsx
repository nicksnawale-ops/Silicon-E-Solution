import React from 'react';
import { motion } from 'motion/react';
import { Phone, ArrowRight, ShieldCheck, CheckCircle2, Mail, MessageCircle } from 'lucide-react';
import { COMPANY_INFO } from '../../data/content';

interface CtaBandProps {
  onOpenQuote: () => void;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const PROOF = [
  { value: '15+', label: 'Years of delivery' },
  { value: '250+', label: 'Projects delivered' },
  { value: 'PAN India', label: 'Execution' },
];

const INCLUDED = [
  'Site survey & requirement study',
  'Design consultation & BOQ evaluation',
  'Response within 4 business hours',
];

/**
 * Premium call-to-action: a floating navy panel with a living gradient border,
 * drifting light, a fine grid and a consultation card.
 */
export const CtaBand: React.FC<CtaBandProps> = ({ onOpenQuote }) => {
  const phone = COMPANY_INFO.phones[0];
  const tel = `tel:${phone.replace(/\s+/g, '')}`;
  const whatsapp = `https://wa.me/${COMPANY_INFO.whatsapp.replace(/\D/g, '')}`;

  return (
    <section className="relative py-16 lg:py-24 surface-ice overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative rounded-[36px] p-[1.5px] overflow-hidden shadow-[0_50px_100px_-50px_rgba(8,27,51,0.85)]"
        >
          {/* Rotating gradient border */}
          <div aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-[36px]">
            <div
              className="cta-spin absolute left-1/2 top-1/2 w-[220%] aspect-square -translate-x-1/2 -translate-y-1/2"
              style={{
                background:
                  'conic-gradient(from 0deg, rgba(79,195,247,0.1), #4FC3F7, rgba(141,198,63,0.15), #8DC63F, rgba(79,195,247,0.1), #0A8BD3, rgba(79,195,247,0.1))',
              }}
            />
          </div>

          <div
            className="relative rounded-[34.5px] overflow-hidden text-white"
            style={{ background: 'radial-gradient(120% 140% at 0% 0%, #0E4A80 0%, #0B2E55 45%, #071A31 100%)' }}
          >
            {/* Drifting light */}
            <div aria-hidden="true" className="pointer-events-none absolute -top-40 -left-32 w-[560px] h-[560px] rounded-full bg-[radial-gradient(closest-side,rgba(79,195,247,0.35),transparent)] cta-drift" />
            <div aria-hidden="true" className="pointer-events-none absolute -bottom-48 right-[-120px] w-[620px] h-[620px] rounded-full bg-[radial-gradient(closest-side,rgba(141,198,63,0.22),transparent)] cta-drift cta-drift--slow" />
            {/* Fine grid */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(79,195,247,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(79,195,247,0.08) 1px, transparent 1px)',
                backgroundSize: '32px 32px',
                maskImage: 'radial-gradient(ellipse 70% 80% at 30% 40%, #000 20%, transparent 75%)',
                WebkitMaskImage: 'radial-gradient(ellipse 70% 80% at 30% 40%, #000 20%, transparent 75%)',
              }}
            />
            {/* Horizon arc */}
            <svg aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 w-full h-[120px]" viewBox="0 0 1440 120" preserveAspectRatio="none">
              <defs>
                <linearGradient id="cta-arc" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#4FC3F7" stopOpacity="0" />
                  <stop offset="35%" stopColor="#4FC3F7" stopOpacity="0.55" />
                  <stop offset="65%" stopColor="#8DC63F" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#8DC63F" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,120 C360,30 1080,30 1440,120" fill="none" stroke="url(#cta-arc)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
            </svg>

            <div className="relative grid lg:grid-cols-12 gap-9 lg:gap-12 items-center p-5 pt-7 sm:p-10 lg:p-14">
              {/* Message */}
              <div className="lg:col-span-7">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.07] ring-1 ring-white/15 backdrop-blur text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.12em] sm:tracking-[0.14em] text-[#B5E07A]"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Turnkey ELV &amp; IT Architecture<span className="hidden sm:inline"> · PAN India</span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
                  className="mt-5 text-[28px] sm:text-4xl lg:text-[46px] lg:leading-[1.08] font-extrabold tracking-tight text-white font-display"
                >
                  Ready to build{' '}
                  <span className="bg-gradient-to-r from-[#7FD3F7] via-[#4FC3F7] to-[#B5E07A] bg-clip-text text-transparent">
                    reliable infrastructure
                  </span>{' '}
                  for your organisation?
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
                  className="mt-4 text-[15px] sm:text-base text-white/75 leading-relaxed max-w-xl"
                >
                  Connect with our senior engineering consultants in Pune for a comprehensive design consultation, site
                  survey, or BOQ evaluation.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
                  className="mt-8 grid grid-cols-3 max-w-lg divide-x divide-white/10 rounded-2xl bg-white/[0.04] ring-1 ring-white/10"
                >
                  {PROOF.map((p) => (
                    <div key={p.label} className="px-3 sm:px-5 py-4">
                      <div className="text-base sm:text-2xl font-extrabold font-display text-white leading-none whitespace-nowrap">{p.value}</div>
                      <div className="mt-1.5 text-[11px] sm:text-xs text-white/55 leading-tight">{p.label}</div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Consultation card */}
              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
                className="lg:col-span-5"
              >
                <div className="relative rounded-[26px] p-5 sm:p-7 bg-white/[0.07] ring-1 ring-white/15 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7FD3F7] whitespace-nowrap">Free consultation</span>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-white/60 whitespace-nowrap">
                      <span className="relative flex w-2 h-2">
                        <span className="absolute inset-0 rounded-full bg-[#8DC63F] animate-ping opacity-60" />
                        <span className="relative w-2 h-2 rounded-full bg-[#8DC63F]" />
                      </span>
                      Engineers available
                    </span>
                  </div>

                  <ul className="mt-5 space-y-3">
                    {INCLUDED.map((t) => (
                      <li key={t} className="flex items-start gap-3 text-sm text-white/85">
                        <CheckCircle2 className="w-[18px] h-[18px] text-[#8DC63F] shrink-0 mt-px" />
                        {t}
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={onOpenQuote}
                    className="group mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-[#0866A8] text-sm font-bold shadow-[0_16px_34px_-14px_rgba(79,195,247,0.9)] hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-14px_rgba(79,195,247,1)] active:translate-y-0 transition-all cursor-pointer"
                  >
                    Get a Free Consultation
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>

                  <a
                    href={tel}
                    className="mt-3 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/[0.06] ring-1 ring-white/20 text-sm font-semibold text-white hover:bg-white/[0.12] transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#8DC63F]" />
                    Call {phone}
                  </a>

                  <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-white/60">
                    <a href={`mailto:${COMPANY_INFO.email}`} className="inline-flex items-center gap-1.5 hover:text-white transition-colors">
                      <Mail className="w-3.5 h-3.5" />
                      {COMPANY_INFO.email}
                    </a>
                    <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-white transition-colors">
                      <MessageCircle className="w-3.5 h-3.5" />
                      WhatsApp
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
