import React from 'react';
import { motion } from 'motion/react';

interface ServiceAnimationProps {
  serviceId: string;
  isHovered?: boolean;
  className?: string;
}

export const ServiceAnimation: React.FC<ServiceAnimationProps> = ({
  serviceId,
  isHovered = false,
  className = '',
}) => {
  switch (serviceId) {
    case 'networking':
    case 'networking-switches':
      return (
        <div className={`relative w-full h-24 overflow-hidden rounded-xl bg-[#0B2545]/5 border border-[#0A8BD3]/10 flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 200 80" className="w-full h-full">
            {/* Network nodes & links */}
            <line x1="30" y1="40" x2="100" y2="20" stroke="#0A8BD3" strokeWidth="1.5" strokeOpacity="0.3" />
            <line x1="30" y1="40" x2="100" y2="60" stroke="#0A8BD3" strokeWidth="1.5" strokeOpacity="0.3" />
            <line x1="100" y1="20" x2="170" y2="40" stroke="#0A8BD3" strokeWidth="1.5" strokeOpacity="0.3" />
            <line x1="100" y1="60" x2="170" y2="40" stroke="#0A8BD3" strokeWidth="1.5" strokeOpacity="0.3" />
            <line x1="100" y1="20" x2="100" y2="60" stroke="#0A8BD3" strokeWidth="1.5" strokeOpacity="0.3" />

            {/* Nodes */}
            <circle cx="30" cy="40" r="6" fill="#0A8BD3" />
            <circle cx="100" cy="20" r="6" fill="#0866A8" />
            <circle cx="100" cy="60" r="6" fill="#0866A8" />
            <circle cx="170" cy="40" r="6" fill="#0A8BD3" />

            {/* Glowing packets traveling */}
            <motion.circle
              r="3.5"
              fill="#8DC63F"
              animate={{
                cx: [30, 100, 170],
                cy: [40, 20, 40],
                opacity: [0, 1, 0],
              }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.circle
              r="3"
              fill="#4FC3F7"
              animate={{
                cx: [30, 100, 170],
                cy: [40, 60, 40],
                opacity: [0, 1, 0],
              }}
              transition={{ duration: 2.6, repeat: Infinity, delay: 0.8, ease: 'easeInOut' }}
            />
          </svg>
          <div className="absolute bottom-1 right-2 text-[10px] text-[#0A8BD3] font-mono tracking-tight font-medium">
            10G L3 Fabric · Active
          </div>
        </div>
      );

    case 'wireless':
    case 'rf-wireless':
      return (
        <div className={`relative w-full h-24 overflow-hidden rounded-xl bg-[#0B2545]/5 border border-[#0A8BD3]/10 flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 200 80" className="w-full h-full">
            <g transform="translate(100, 52)">
              {/* Access Point Icon Base */}
              <circle cx="0" cy="0" r="5" fill="#0A8BD3" />
              <line x1="0" y1="0" x2="0" y2="14" stroke="#0866A8" strokeWidth="2.5" />
              <line x1="-8" y1="14" x2="8" y2="14" stroke="#0866A8" strokeWidth="2" strokeLinecap="round" />

              {/* Pulsing concentric RF waves */}
              <motion.path
                d="M -16 -8 A 18 18 0 0 1 16 -8"
                fill="none"
                stroke="#0A8BD3"
                strokeWidth="2"
                strokeLinecap="round"
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.path
                d="M -28 -18 A 32 32 0 0 1 28 -18"
                fill="none"
                stroke="#4FC3F7"
                strokeWidth="2"
                strokeLinecap="round"
                animate={{ opacity: [0.1, 0.9, 0.1] }}
                transition={{ duration: 1.8, repeat: Infinity, delay: 0.4, ease: 'easeInOut' }}
              />
              <motion.path
                d="M -42 -28 A 48 48 0 0 1 42 -28"
                fill="none"
                stroke="#8DC63F"
                strokeWidth="2"
                strokeLinecap="round"
                animate={{ opacity: [0, 0.8, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, delay: 0.8, ease: 'easeInOut' }}
              />
            </g>
          </svg>
          <div className="absolute bottom-1 right-2 text-[10px] text-[#0A8BD3] font-mono tracking-tight font-medium">
            Wi-Fi 6E · 3D RF Mesh
          </div>
        </div>
      );

    case 'datacentre':
    case 'server-room':
      return (
        <div className={`relative w-full h-24 overflow-hidden rounded-xl bg-[#0B2545]/5 border border-[#0A8BD3]/10 flex items-center justify-center ${className}`}>
          <div className="flex items-center gap-2">
            {/* Rack units */}
            {[0, 1, 2].map((rack) => (
              <div
                key={rack}
                className="w-14 h-18 bg-[#0B2545] rounded-md p-1 border border-[#0A8BD3]/30 flex flex-col justify-between"
              >
                <div className="flex justify-between items-center px-1 border-b border-slate-700 pb-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#8DC63F] animate-pulse" />
                  <span className="text-[8px] font-mono text-slate-400">R0{rack + 1}</span>
                </div>
                <div className="space-y-1">
                  {[0, 1, 2].map((slot) => (
                    <div key={slot} className="flex items-center justify-between px-1">
                      <div className="flex gap-1">
                        <motion.div
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{
                            duration: 0.9 + slot * 0.3 + rack * 0.2,
                            repeat: Infinity,
                          }}
                          className="w-1 h-1 rounded-full bg-[#4FC3F7]"
                        />
                        <motion.div
                          animate={{ opacity: [0.2, 1, 0.2] }}
                          transition={{
                            duration: 1.1 + slot * 0.2,
                            repeat: Infinity,
                            delay: 0.2,
                          }}
                          className="w-1 h-1 rounded-full bg-[#8DC63F]"
                        />
                      </div>
                      <div className="w-5 h-0.5 bg-slate-700 rounded-full" />
                    </div>
                  ))}
                </div>
                {/* Hot aisle indicator */}
                <div className="w-full h-0.5 bg-[#0A8BD3]/40 rounded-full" />
              </div>
            ))}
          </div>
          {/* Subtle rising data stream particles */}
          <div className="absolute inset-0 pointer-events-none flex justify-around">
            <motion.div
              animate={{ y: [40, -10], opacity: [0, 0.8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
              className="w-1 h-3 rounded-full bg-[#4FC3F7]"
            />
            <motion.div
              animate={{ y: [40, -10], opacity: [0, 0.8, 0] }}
              transition={{ duration: 2.0, repeat: Infinity, delay: 0.5, ease: 'linear' }}
              className="w-1 h-2 rounded-full bg-[#8DC63F]"
            />
          </div>
          <div className="absolute bottom-1 right-2 text-[10px] text-[#0A8BD3] font-mono tracking-tight font-medium">
            Tier III · 99.99% SLA
          </div>
        </div>
      );

    case 'security-systems':
    case 'security-system':
      return (
        <div className={`relative w-full h-24 overflow-hidden rounded-xl bg-[#0B2545]/5 border border-[#0A8BD3]/10 flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 200 80" className="w-full h-full">
            {/* Camera */}
            <g transform="translate(35, 25)">
              <rect x="0" y="0" width="22" height="14" rx="3" fill="#0866A8" />
              <polygon points="22,3 32,0 32,14 22,11" fill="#0A8BD3" />
              <circle cx="10" cy="7" r="3" fill="#4FC3F7" />
              <path d="M 10 14 L 10 24 L 2 24" stroke="#0B2545" strokeWidth="2.5" fill="none" />

              {/* Scanning Cone */}
              <motion.polygon
                points="32,7 180,-10 180,50"
                fill="url(#camScanGradient)"
                animate={{
                  transform: [
                    'rotate(-8deg 32 7)',
                    'rotate(10deg 32 7)',
                    'rotate(-8deg 32 7)',
                  ],
                }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </g>
            {/* Scanning line sweep */}
            <motion.line
              x1="60"
              y1="5"
              x2="60"
              y2="75"
              stroke="#8DC63F"
              strokeWidth="1.5"
              strokeDasharray="2 2"
              animate={{ x1: [60, 180, 60], x2: [60, 180, 60] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            <defs>
              <linearGradient id="camScanGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0A8BD3" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#4FC3F7" stopOpacity="0.03" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute bottom-1 right-2 text-[10px] text-[#0A8BD3] font-mono tracking-tight font-medium">
            AI Analytics · ANPR
          </div>
        </div>
      );

    case 'av-solutions':
      return (
        <div className={`relative w-full h-24 overflow-hidden rounded-xl bg-[#0B2545]/5 border border-[#0A8BD3]/10 flex items-center justify-center ${className}`}>
          {/* Assembling video wall grid */}
          <div className="grid grid-cols-3 gap-1 p-2 bg-[#0B2545] rounded-lg shadow-inner">
            {[0, 1, 2, 3, 4, 5].map((tile) => (
              <motion.div
                key={tile}
                initial={false}
                animate={{
                  opacity: [0.6, 1, 0.7],
                  scale: isHovered ? [1, 1.04, 1] : 1,
                }}
                transition={{ duration: 2, delay: tile * 0.15, repeat: Infinity }}
                className="w-10 h-6 bg-gradient-to-tr from-[#0A8BD3] to-[#4FC3F7] rounded-[2px] flex items-center justify-center"
              >
                <div className="w-1 h-1 rounded-full bg-white/70" />
              </motion.div>
            ))}
          </div>
          {/* Projector beam overlay */}
          <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-white/20 to-transparent pointer-events-none" />
          <div className="absolute bottom-1 right-2 text-[10px] text-[#0A8BD3] font-mono tracking-tight font-medium">
            4K Video Wall · 0-Bezel
          </div>
        </div>
      );

    case 'voice-solutions':
    case 'voice-solution':
      return (
        <div className={`relative w-full h-24 overflow-hidden rounded-xl bg-[#0B2545]/5 border border-[#0A8BD3]/10 flex items-center justify-center ${className}`}>
          {/* Oscillating voice wave bars */}
          <div className="flex items-center gap-1.5 h-12">
            {[18, 32, 44, 24, 38, 50, 30, 20, 36, 42, 16].map((h, i) => (
              <motion.div
                key={i}
                className="w-1.5 rounded-full bg-gradient-to-t from-[#0866A8] via-[#0A8BD3] to-[#8DC63F]"
                animate={{
                  height: [h * 0.35, h, h * 0.35],
                }}
                transition={{
                  duration: 0.8 + (i % 3) * 0.25,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
          <div className="absolute bottom-1 right-2 text-[10px] text-[#0A8BD3] font-mono tracking-tight font-medium">
            G.722 HD · IP-PBX SIP
          </div>
        </div>
      );

    case 'evacuation-fapa':
    case 'fapa-system':
      return (
        <div className={`relative w-full h-24 overflow-hidden rounded-xl bg-[#0B2545]/5 border border-[#0A8BD3]/10 flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 200 80" className="w-full h-full">
            <g transform="translate(100, 38)">
              {/* Smoke detector head */}
              <circle cx="0" cy="0" r="16" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="2" />
              <circle cx="0" cy="0" r="6" fill="#EF4444" />

              {/* Pulsing warning aura */}
              <motion.circle
                cx="0"
                cy="0"
                r="16"
                stroke="#EF4444"
                strokeWidth="2"
                fill="none"
                animate={{ r: [16, 36], opacity: [0.8, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
              />

              {/* PA sound wave arches */}
              <motion.path
                d="M -30 -15 A 35 35 0 0 0 -30 15"
                fill="none"
                stroke="#0A8BD3"
                strokeWidth="2"
                strokeLinecap="round"
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              />
              <motion.path
                d="M 30 -15 A 35 35 0 0 1 30 15"
                fill="none"
                stroke="#0A8BD3"
                strokeWidth="2"
                strokeLinecap="round"
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              />
            </g>
          </svg>
          <div className="absolute bottom-1 right-2 text-[10px] text-red-600 font-mono tracking-tight font-medium">
            EN54 Phased Evacuation
          </div>
        </div>
      );

    case 'bms':
    case 'bms-system':
      return (
        <div className={`relative w-full h-24 overflow-hidden rounded-xl bg-[#0B2545]/5 border border-[#0A8BD3]/10 flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 200 80" className="w-full h-full">
            {/* Building silhouette */}
            <g transform="translate(70, 10)">
              <rect x="0" y="5" width="60" height="65" fill="#0B2545" rx="3" />
              {/* Floors / Windows illuminating sequentially */}
              {[0, 1, 2, 3].map((floor) => (
                <g key={floor} transform={`translate(8, ${12 + floor * 13})`}>
                  {[0, 1, 2].map((col) => (
                    <motion.rect
                      key={col}
                      x={col * 16}
                      y="0"
                      width="10"
                      height="8"
                      rx="1"
                      fill="#8DC63F"
                      animate={{ opacity: [0.2, 1, 0.4] }}
                      transition={{
                        duration: 1.8,
                        delay: floor * 0.3 + col * 0.15,
                        repeat: Infinity,
                      }}
                    />
                  ))}
                </g>
              ))}
            </g>
            {/* Connected telemetry lines */}
            <line x1="25" y1="40" x2="70" y2="40" stroke="#0A8BD3" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="130" y1="40" x2="175" y2="40" stroke="#0A8BD3" strokeWidth="1.5" strokeDasharray="3 3" />
            <circle cx="25" cy="40" r="4" fill="#0A8BD3" />
            <circle cx="175" cy="40" r="4" fill="#0A8BD3" />
          </svg>
          <div className="absolute bottom-1 right-2 text-[10px] text-[#0A8BD3] font-mono tracking-tight font-medium">
            BACnet / Modbus BMS
          </div>
        </div>
      );

    case 'nurse-call':
    case 'nurse-calling':
      return (
        <div className={`relative w-full h-24 overflow-hidden rounded-xl bg-[#0B2545]/5 border border-[#0A8BD3]/10 flex items-center justify-center ${className}`}>
          <div className="relative flex items-center gap-4">
            {/* Bedside console */}
            <div className="w-14 h-16 bg-white rounded-lg border-2 border-[#0A8BD3]/30 p-2 shadow-sm flex flex-col justify-between items-center">
              <div className="w-8 h-1 bg-slate-300 rounded-full" />
              <motion.div
                animate={{ scale: [1, 1.25, 1], backgroundColor: ['#8DC63F', '#EF4444', '#8DC63F'] }}
                transition={{ duration: 1.6, repeat: Infinity }}
                className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[9px] font-bold"
              >
                +
              </motion.div>
              <div className="w-6 h-0.5 bg-slate-200 rounded-full" />
            </div>

            {/* Dome corridor lamp */}
            <div className="relative flex flex-col items-center">
              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 5px rgba(239,68,68,0.3)',
                    '0 0 25px rgba(239,68,68,0.9)',
                    '0 0 5px rgba(239,68,68,0.3)',
                  ],
                }}
                transition={{ duration: 1.2, repeat: Infinity }}
                className="w-8 h-8 rounded-full bg-red-500 border-2 border-white flex items-center justify-center text-white text-[10px] font-bold"
              >
                CALL
              </motion.div>
              <span className="text-[9px] font-mono text-slate-500 mt-1">Ward 04</span>
            </div>
          </div>
          <div className="absolute bottom-1 right-2 text-[10px] text-[#0A8BD3] font-mono tracking-tight font-medium">
            HTM 08-03 Compliant
          </div>
        </div>
      );

    case 'passive-cabling':
    case 'passive-cabling-sol':
      return (
        <div className={`relative w-full h-24 overflow-hidden rounded-xl bg-[#0B2545]/5 border border-[#0A8BD3]/10 flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 200 80" className="w-full h-full">
            {/* Fiber Optic Cables drawing */}
            <motion.path
              d="M 10 20 C 60 20, 80 60, 190 60"
              fill="none"
              stroke="#0A8BD3"
              strokeWidth="2.5"
              strokeDasharray="6 3"
              animate={{ strokeDashoffset: [0, -36] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
            <motion.path
              d="M 10 40 C 70 40, 90 25, 190 25"
              fill="none"
              stroke="#8DC63F"
              strokeWidth="2"
              strokeDasharray="8 4"
              animate={{ strokeDashoffset: [0, -36] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
            />
            <motion.path
              d="M 10 60 C 50 60, 110 35, 190 45"
              fill="none"
              stroke="#4FC3F7"
              strokeWidth="2"
              strokeDasharray="6 3"
              animate={{ strokeDashoffset: [0, -36] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
            />
          </svg>
          <div className="absolute bottom-1 right-2 text-[10px] text-[#0A8BD3] font-mono tracking-tight font-medium">
            OFC Single-Mode · Fluke Certified
          </div>
        </div>
      );

    case 'power-solutions':
      return (
        <div className={`relative w-full h-24 overflow-hidden rounded-xl bg-[#0B2545]/5 border border-[#0A8BD3]/10 flex items-center justify-center ${className}`}>
          <div className="flex items-center gap-3">
            {/* Mains icon */}
            <span className="text-xs font-mono font-bold text-slate-600">230V AC</span>

            {/* Flow line */}
            <motion.div className="w-12 h-1 bg-slate-200 rounded-full overflow-hidden">
              <motion.div
                animate={{ x: [-48, 48] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                className="w-12 h-full bg-[#8DC63F]"
              />
            </motion.div>

            {/* Battery / UPS */}
            <div className="relative w-16 h-9 rounded-md border-2 border-[#0A8BD3] p-1 bg-white flex items-center">
              <motion.div
                animate={{ width: ['20%', '95%', '20%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="h-full bg-gradient-to-r from-[#0A8BD3] to-[#8DC63F] rounded-[2px]"
              />
              <div className="absolute -right-2 top-2.5 w-1.5 h-3 bg-[#0A8BD3] rounded-r-sm" />
            </div>
            <span className="text-xs font-mono font-bold text-[#8DC63F]">100% OK</span>
          </div>
          <div className="absolute bottom-1 right-2 text-[10px] text-[#0A8BD3] font-mono tracking-tight font-medium">
            0ms Transfer · N+1 UPS
          </div>
        </div>
      );

    case 'lighting-automation':
      return (
        <div className={`relative w-full h-24 overflow-hidden rounded-xl bg-[#0B2545]/5 border border-[#0A8BD3]/10 flex items-center justify-center ${className}`}>
          <div className="flex items-center gap-6">
            {[0, 1, 2, 3].map((bulb) => (
              <motion.div
                key={bulb}
                animate={{
                  opacity: [0.3, 1, 0.4],
                  scale: [0.95, 1.1, 0.95],
                }}
                transition={{ duration: 2, delay: bulb * 0.45, repeat: Infinity }}
                className="relative flex flex-col items-center"
              >
                {/* Bulb head */}
                <div className="w-5 h-5 rounded-full bg-[#8DC63F] shadow-[0_0_12px_#8DC63F]" />
                <div className="w-2.5 h-2 bg-slate-400 rounded-b-sm" />
              </motion.div>
            ))}
          </div>
          <div className="absolute bottom-1 right-2 text-[10px] text-[#0A8BD3] font-mono tracking-tight font-medium">
            DALI-2 / 0-10V Dimming
          </div>
        </div>
      );

    default:
      // Generic high-tech flow
      return (
        <div className={`relative w-full h-24 overflow-hidden rounded-xl bg-[#0B2545]/5 border border-[#0A8BD3]/10 flex items-center justify-center ${className}`}>
          <div className="flex items-center gap-2">
            {[0, 1, 2, 3, 4].map((dot) => (
              <motion.div
                key={dot}
                animate={{ y: [0, -8, 0], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.2, delay: dot * 0.15, repeat: Infinity }}
                className="w-2.5 h-2.5 rounded-full bg-[#0A8BD3]"
              />
            ))}
          </div>
          <div className="absolute bottom-1 right-2 text-[10px] text-[#0A8BD3] font-mono tracking-tight font-medium">
            Turnkey Engineered
          </div>
        </div>
      );
  }
};
