import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface Props {
  from: { value: string; label: string };
  to: { value: string; label: string };
}

/**
 * A "signal hand-off" that sits on the seam between two sections: a glowing
 * hairline draws outwards across the seam, a vertical signal line drops through
 * it with travelling pulses, and a glass pill names the hand-off
 * (e.g. 07 Phases → 15 Services). Takes no layout space.
 */
export const SectionConnector: React.FC<Props> = ({ from, to }) => (
  <div aria-hidden="true" className="relative h-0 z-20 pointer-events-none">
    <div className="absolute inset-x-0 top-0 -translate-y-1/2 h-[170px] sm:h-[200px]">
      {/* Soft light pooling on the seam */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[900px] h-[120px] rounded-full bg-[radial-gradient(closest-side,rgba(79,195,247,0.22),transparent)] blur-md" />

      {/* Seam hairline, drawn from the centre outwards */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 w-[92%] max-w-[1100px] h-px origin-center"
        style={{
          background:
            'linear-gradient(90deg, rgba(79,195,247,0) 0%, rgba(79,195,247,0.7) 30%, #0A8BD3 50%, rgba(141,198,63,0.75) 70%, rgba(141,198,63,0) 100%)',
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, amount: 1 }}
        transition={{ duration: 1.4, ease: EASE }}
      />

      {/* Vertical signal line */}
      <motion.div
        className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[2px] origin-top overflow-hidden"
        style={{ background: 'linear-gradient(180deg, rgba(10,139,211,0) 0%, rgba(10,139,211,0.55) 30%, rgba(141,198,63,0.55) 70%, rgba(141,198,63,0) 100%)' }}
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, amount: 1 }}
        transition={{ duration: 1, ease: EASE }}
      >
        {[0, 0.85, 1.7].map((d) => (
          <span
            key={d}
            className="conn-drop absolute left-1/2 -top-2 -translate-x-1/2 w-[4px] h-8 rounded-full"
            style={
              {
                '--delay': `${d}s`,
                '--conn-h': '200px',
                background: 'linear-gradient(180deg, transparent, #4FC3F7 60%, #FFFFFF)',
                boxShadow: '0 0 10px 2px rgba(79,195,247,0.65)',
              } as React.CSSProperties
            }
          />
        ))}
      </motion.div>

      {/* Hand-off pill */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0, scale: 0.85, y: 8 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 1 }}
        transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
      >
        <span className="conn-ring absolute inset-0 rounded-full ring-2 ring-[#4FC3F7]/50" />
        <span className="conn-ring absolute inset-0 rounded-full ring-2 ring-[#8DC63F]/40" style={{ '--delay': '1.2s' } as React.CSSProperties} />
        <div className="relative rounded-full p-[1.5px] bg-gradient-to-r from-[#4FC3F7] via-[#0A8BD3] to-[#8DC63F] shadow-[0_18px_40px_-16px_rgba(10,139,211,0.65)]">
          <div className="flex w-max whitespace-nowrap items-center gap-2.5 sm:gap-3.5 rounded-full bg-white/95 backdrop-blur-xl pl-2 pr-2 sm:pl-2.5 sm:pr-2.5 py-1.5 sm:py-2">
            <span className="flex items-center gap-2 rounded-full bg-[#E8F6FD] pl-2.5 pr-3 py-1">
              <span className="font-display font-extrabold text-sm sm:text-base text-[#0A8BD3] leading-none">{from.value}</span>
              <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0B2545]/70">{from.label}</span>
            </span>
            <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-[#0A8BD3] to-[#8DC63F] text-white flex items-center justify-center shrink-0">
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
            <span className="flex items-center gap-2 rounded-full bg-[#EEF7E2] pl-2.5 pr-3 py-1">
              <span className="font-display font-extrabold text-sm sm:text-base text-[#5E9E1A] leading-none">{to.value}</span>
              <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0B2545]/70">{to.label}</span>
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
);
