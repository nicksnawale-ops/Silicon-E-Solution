import React from 'react';
import { motion } from 'motion/react';
import { MapPin } from 'lucide-react';
import { ClientLogo } from '../ui/ClientLogo';
import { CLIENTS_LIST } from '../../data/content';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Short city label for each client (falls back to the full location). */
const city = (location: string) => location.split(',')[0].trim();

/**
 * Clients: a deep-navy band for contrast against the light sections. Official
 * logos sit on glowing glass plates (kept white so every logo stays legible),
 * with name, sector and city beneath. Hover gives a gentle lift and glow.
 */
export const ClientsSection: React.FC = () => (
  <section
    id="clients"
    className="relative py-20 lg:py-28 overflow-hidden text-white"
    style={{ background: 'radial-gradient(120% 90% at 50% 0%, #0F4677 0%, #0B2E55 45%, #071A31 100%)' }}
  >
    {/* Ambient light, fine grid and horizon arc */}
    <div aria-hidden="true" className="pointer-events-none absolute -top-48 left-1/2 -translate-x-1/2 w-[1100px] h-[560px] rounded-full bg-[radial-gradient(closest-side,rgba(79,195,247,0.22),transparent)]" />
    <div aria-hidden="true" className="pointer-events-none absolute -bottom-56 -right-40 w-[620px] h-[620px] rounded-full bg-[radial-gradient(closest-side,rgba(141,198,63,0.16),transparent)]" />
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-60"
      style={{
        backgroundImage:
          'linear-gradient(rgba(79,195,247,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(79,195,247,0.07) 1px, transparent 1px)',
        backgroundSize: '44px 44px',
        maskImage: 'radial-gradient(ellipse 70% 70% at 50% 40%, #000 20%, transparent 75%)',
        WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 40%, #000 20%, transparent 75%)',
      }}
    />
    <svg aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 w-full h-[140px]" viewBox="0 0 1440 140" preserveAspectRatio="none">
      <defs>
        <linearGradient id="clients-arc" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#4FC3F7" stopOpacity="0" />
          <stop offset="35%" stopColor="#4FC3F7" stopOpacity="0.5" />
          <stop offset="65%" stopColor="#8DC63F" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#8DC63F" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M0,140 C360,40 1080,40 1440,140" fill="none" stroke="url(#clients-arc)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
    </svg>

    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="text-center max-w-3xl mx-auto"
      >
        <div className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7FD3F7]">
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#7FD3F7]" />
          Institutional partners
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#7FD3F7]" />
        </div>
        <h2 className="mt-4 text-[28px] sm:text-4xl lg:text-[44px] lg:leading-[1.1] font-extrabold tracking-tight text-white font-display">
          Trusted by{' '}
          <span className="bg-gradient-to-r from-[#7FD3F7] via-[#4FC3F7] to-[#B5E07A] bg-clip-text text-transparent">
            leading institutions
          </span>
        </h2>
        <p className="mt-4 text-white/65 text-sm sm:text-base leading-relaxed">
          High-consequence infrastructure engineered for premier university hospitals, deemed universities and creative
          studios.
        </p>
      </motion.div>

      {/* Logo plates */}
      <ul className="mt-12 lg:mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 sm:gap-x-5 gap-y-9">
        {CLIENTS_LIST.map((client, i) => (
          <motion.li
            key={client.name}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: i * 0.07, ease: EASE }}
            className={`group text-center ${i === CLIENTS_LIST.length - 1 && CLIENTS_LIST.length % 2 === 1 ? 'col-span-2 md:col-span-1 max-md:max-w-[50%] max-md:mx-auto max-md:w-full' : ''}`}
          >
            {/* Glass plate */}
            <div className="relative rounded-[22px] p-[1px] bg-gradient-to-br from-white/40 via-white/10 to-white/25 transition-all duration-500 group-hover:-translate-y-1.5 group-hover:from-[#7FD3F7]/80 group-hover:to-[#B5E07A]/70">
              <span
                aria-hidden="true"
                className="absolute -inset-3 rounded-[28px] bg-[radial-gradient(closest-side,rgba(79,195,247,0.45),transparent)] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
              />
              <div className="relative h-[104px] sm:h-[120px] rounded-[21px] bg-white flex items-center justify-center px-4 sm:px-5 shadow-[0_24px_48px_-28px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.9)]">
                {client.logo ? (
                  <ClientLogo client={client} size="sm" className="transition-transform duration-500 group-hover:scale-[1.05]" />
                ) : (
                  <span className="text-xs font-black font-display tracking-wider text-[#0B2545]">{client.logoText}</span>
                )}
              </div>
            </div>

            {/* Caption */}
            <div className="mt-4 px-1">
              <div className="text-[13px] sm:text-sm font-semibold text-white leading-snug line-clamp-2">{client.name}</div>
              <div className="mt-1 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.12em] text-[#7FD3F7]/80 line-clamp-1">
                {client.sector}
              </div>
              <div className="mt-1.5 inline-flex items-center gap-1 text-[11px] sm:text-xs text-white/50">
                <MapPin className="w-3 h-3 text-[#B5E07A]" />
                {city(client.location)}
              </div>
            </div>
          </motion.li>
        ))}
      </ul>

      <p className="mt-12 text-center text-xs sm:text-sm text-white/45">…and many more institutions across India</p>
    </div>
  </section>
);
