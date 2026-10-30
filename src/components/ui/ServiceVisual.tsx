import React, { useEffect, useRef, useState } from 'react';

/**
 * Dark "display" stage with a bespoke, lightweight animation for each service.
 * Pure SVG + CSS keyframes (defined in index.css under "Service visuals"),
 * animating transform/opacity only. Animations pause while off-screen and are
 * disabled for reduced-motion users.
 */

const C = {
  cyan: '#4FC3F7',
  blue: '#0A8BD3',
  lime: '#8DC63F',
  red: '#FF5D5D',
  amber: '#FFC857',
  line: 'rgba(255,255,255,0.18)',
  dim: 'rgba(255,255,255,0.35)',
  panel: 'rgba(255,255,255,0.06)',
  edge: 'rgba(79,195,247,0.45)',
};

type V = React.CSSProperties & Record<string, string | number>;

/** A glowing dot travelling from (x1,y1) to (x2,y2). */
const Packet: React.FC<{
  x1: number; y1: number; x2: number; y2: number;
  d?: number; delay?: number; color?: string; r?: number; hit?: boolean;
}> = ({ x1, y1, x2, y2, d = 2.4, delay = 0, color = C.cyan, r = 2.6, hit }) => (
  <circle
    cx={0}
    cy={0}
    r={r}
    fill={color}
    className={hit ? 'sv-hit' : 'sv-move'}
    style={{
      '--x1': `${x1}px`, '--y1': `${y1}px`, '--x2': `${x2}px`, '--y2': `${y2}px`,
      '--d': `${d}s`, '--delay': `${delay}s`,
      filter: `drop-shadow(0 0 3px ${color})`,
      transformBox: 'view-box', transformOrigin: '0 0',
    } as V}
  />
);

const Ring: React.FC<{ cx: number; cy: number; r: number; color?: string; d?: number; delay?: number; w?: number }> = ({
  cx, cy, r, color = C.cyan, d = 2.4, delay = 0, w = 1.4,
}) => (
  <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={w} className="sv-pulse"
    style={{ '--d': `${d}s`, '--delay': `${delay}s` } as V} />
);

const seq = (delay: number, d = 3.2): V => ({ '--delay': `${delay}s`, '--d': `${d}s` } as V);

/* ------------------------------------------------------------------ */
/* Scenes (viewBox 0 0 320 140)                                        */
/* ------------------------------------------------------------------ */

const Networking = () => {
  const nodes = [[44, 32], [44, 108], [276, 32], [276, 108], [160, 124]];
  return (
    <>
      {nodes.map(([x, y], i) => (
        <line key={`l${i}`} x1={160} y1={64} x2={x} y2={y} stroke={C.edge} strokeWidth={1} />
      ))}
      {nodes.map(([x, y], i) => (
        <g key={`n${i}`}>
          <circle cx={x} cy={y} r={9} fill="#0E3A66" stroke={C.cyan} strokeWidth={1.4} />
          <circle cx={x} cy={y} r={3} fill={C.cyan} className="sv-blink" style={seq(i * 0.3, 1.8)} />
        </g>
      ))}
      <rect x={124} y={50} width={72} height={28} rx={6} fill="#0E3A66" stroke={C.cyan} strokeWidth={1.5} />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x={132 + i * 9.5} y={60} width={6} height={4} rx={1} fill={i % 2 ? C.lime : C.cyan}
          className="sv-blink" style={seq(i * 0.15, 1.2)} />
      ))}
      <rect x={132} y={68} width={56} height={2} rx={1} fill={C.dim} />
      {nodes.map(([x, y], i) => (
        <React.Fragment key={`p${i}`}>
          <Packet x1={x} y1={y} x2={160} y2={64} delay={i * 0.45} d={2.2} />
          <Packet x1={160} y1={64} x2={x} y2={y} delay={i * 0.45 + 1.1} d={2.2} color={C.lime} r={2.2} />
        </React.Fragment>
      ))}
    </>
  );
};

const Wireless = () => (
  <>
    {[22, 42, 62].map((r, i) => (
      <path key={r} d={`M ${160 - r} 96 A ${r} ${r} 0 0 1 ${160 + r} 96`} fill="none"
        stroke={i === 2 ? C.lime : C.cyan} strokeWidth={2.4} strokeLinecap="round"
        className="sv-seq" style={seq(i * 0.35, 1.8)} />
    ))}
    <rect x={150} y={96} width={20} height={9} rx={4} fill="#0E3A66" stroke={C.cyan} strokeWidth={1.4} />
    <circle cx={160} cy={100.5} r={1.8} fill={C.lime} className="sv-blink" style={seq(0, 1.2)} />
    {/* Clients */}
    <g>
      <rect x={30} y={70} width={34} height={22} rx={3} fill={C.panel} stroke={C.dim} />
      <rect x={24} y={92} width={46} height={4} rx={2} fill={C.dim} />
      <circle cx={47} cy={64} r={2.4} fill={C.lime} className="sv-blink" style={seq(0.9, 1.8)} />
    </g>
    <g>
      <rect x={262} y={58} width={18} height={30} rx={4} fill={C.panel} stroke={C.dim} />
      <circle cx={271} cy={52} r={2.4} fill={C.lime} className="sv-blink" style={seq(1.2, 1.8)} />
    </g>
    <g>
      <rect x={232} y={98} width={30} height={22} rx={3} fill={C.panel} stroke={C.dim} />
      <circle cx={247} cy={92} r={2.4} fill={C.lime} className="sv-blink" style={seq(1.5, 1.8)} />
    </g>
    <Packet x1={160} y1={90} x2={47} y2={70} d={1.8} delay={0.2} r={2} />
    <Packet x1={160} y1={90} x2={271} y2={58} d={1.8} delay={0.7} r={2} />
    <Packet x1={160} y1={90} x2={247} y2={98} d={1.8} delay={1.2} r={2} />
  </>
);

const Datacentre = () => (
  <>
    {[0, 1, 2].map((r) => {
      const x = 92 + r * 48;
      return (
        <g key={r}>
          <rect x={x} y={26} width={40} height={96} rx={4} fill="#0E3A66" stroke={C.edge} strokeWidth={1.2} />
          {[0, 1, 2, 3, 4, 5, 6].map((u) => (
            <g key={u}>
              <rect x={x + 5} y={33 + u * 12.5} width={30} height={8} rx={1.5} fill={C.panel} />
              <circle cx={x + 10} cy={37 + u * 12.5} r={1.6} fill={(u + r) % 3 ? C.cyan : C.lime}
                className="sv-blink" style={seq(((u * 3 + r * 5) % 7) * 0.18, 1.1 + ((u + r) % 3) * 0.3)} />
              <rect x={x + 15} y={36 + u * 12.5} width={16} height={2} rx={1} fill={C.dim} />
            </g>
          ))}
          <Packet x1={x + 20} y1={24} x2={x + 20} y2={4} d={1.6} delay={r * 0.5} r={1.8} color={C.lime} />
        </g>
      );
    })}
    <rect x={84} y={122} width={152} height={3} rx={1.5} fill={C.edge} />
  </>
);

const Security = () => (
  <>
    <line x1={20} y1={126} x2={300} y2={126} stroke={C.line} />
    {/* Cone sweeping from the lens */}
    <g className="sv-sweep" style={{ '--ox': '62px', '--oy': '34px' } as V}>
      <path d="M 62 34 L 300 84 L 300 130 L 62 40 Z" fill="url(#sv-cone)" />
    </g>
    <defs>
      <linearGradient id="sv-cone" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor={C.cyan} stopOpacity="0.55" />
        <stop offset="1" stopColor={C.cyan} stopOpacity="0" />
      </linearGradient>
    </defs>
    {/* Camera */}
    <rect x={18} y={20} width={4} height={26} rx={2} fill={C.dim} />
    <rect x={22} y={26} width={40} height={16} rx={4} fill="#0E3A66" stroke={C.cyan} strokeWidth={1.4} />
    <circle cx={58} cy={34} r={4} fill={C.cyan} />
    <circle cx={28} cy={30} r={1.6} fill={C.red} className="sv-blink" style={seq(0, 1)} />
    {/* People */}
    {[[196, 0], [252, 0.8]].map(([x, delay]) => (
      <g key={x}>
        <circle cx={x} cy={88} r={7} fill="rgba(255,255,255,0.55)" />
        <path d={`M ${x - 11} 124 Q ${x - 11} 98 ${x} 98 Q ${x + 11} 98 ${x + 11} 124 Z`} fill="rgba(255,255,255,0.4)" />
        <rect x={x - 17} y={76} width={34} height={52} rx={3} fill="none" stroke={C.lime} strokeWidth={1.4}
          strokeDasharray="5 4" className="sv-seq" style={seq(delay, 2.4)} />
        <rect x={x - 17} y={68} width={22} height={8} rx={1.5} fill={C.lime} className="sv-seq" style={seq(delay, 2.4)} />
      </g>
    ))}
  </>
);

const AudioVisual = () => (
  <>
    <rect x={92} y={22} width={136} height={80} rx={5} fill="#06172B" stroke={C.edge} />
    {[0, 1, 2].map((c) =>
      [0, 1].map((r) => (
        <rect key={`${c}${r}`} x={96 + c * 44} y={26 + r * 37} width={40} height={35} rx={2}
          fill={r ? '#145A93' : '#1B6FAE'} className="sv-seq" style={seq((c + r * 3) * 0.12, 3.6)} />
      ))
    )}
    <clipPath id="sv-wall"><rect x={96} y={26} width={128} height={72} /></clipPath>
    <g clipPath="url(#sv-wall)">
      <rect x={96} y={26} width={60} height={72} fill="url(#sv-sheen)" className="sv-wipe" style={seq(0.4, 3.6)} />
    </g>
    <defs>
      <linearGradient id="sv-sheen" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#fff" stopOpacity="0" />
        <stop offset="0.5" stopColor={C.cyan} stopOpacity="0.55" />
        <stop offset="1" stopColor="#fff" stopOpacity="0" />
      </linearGradient>
    </defs>
    <rect x={150} y={102} width={20} height={14} fill={C.dim} />
    <rect x={130} y={116} width={60} height={4} rx={2} fill={C.dim} />
    {/* Speakers */}
    {[[48, -1], [272, 1]].map(([x, dir]) => (
      <g key={x}>
        <rect x={x - 12} y={46} width={24} height={46} rx={4} fill="#0E3A66" stroke={C.edge} />
        <circle cx={x} cy={58} r={4} fill={C.dim} />
        <circle cx={x} cy={78} r={7} fill="none" stroke={C.cyan} strokeWidth={1.4} />
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M ${x + dir * (18 + i * 7)} 62 Q ${x + dir * (24 + i * 7)} 70 ${x + dir * (18 + i * 7)} 78`}
            fill="none" stroke={C.cyan} strokeWidth={1.4} strokeLinecap="round" className="sv-seq" style={seq(i * 0.25, 1.4)} />
        ))}
      </g>
    ))}
  </>
);

const Endpoint = () => (
  <>
    {/* Internet */}
    <circle cx={42} cy={70} r={20} fill="none" stroke={C.dim} />
    <ellipse cx={42} cy={70} rx={8} ry={20} fill="none" stroke={C.dim} />
    <line x1={22} y1={70} x2={62} y2={70} stroke={C.dim} />
    {/* Firewall wall */}
    {[0, 1, 2, 3, 4].map((r) => (
      <rect key={r} x={r % 2 ? 150 : 156} y={26 + r * 18} width={26} height={16} rx={1.5} fill="#6B2A2A" stroke="#B54848" strokeWidth={0.8} />
    ))}
    <path d="M 166 48 l 14 5 v 10 c 0 9 -6 15 -14 18 c -8 -3 -14 -9 -14 -18 v -10 z" fill="#0E3A66" stroke={C.lime} strokeWidth={1.6} />
    <path d="M 160 64 l 4 4 l 8 -9" fill="none" stroke={C.lime} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    {/* Protected laptop */}
    <rect x={238} y={52} width={46} height={30} rx={3} fill={C.panel} stroke={C.cyan} strokeWidth={1.2} />
    <rect x={230} y={82} width={62} height={5} rx={2.5} fill={C.dim} />
    <rect x={255} y={63} width={12} height={10} rx={2} fill={C.lime} />
    <path d="M 257 63 v -3 a 4 4 0 0 1 8 0 v 3" fill="none" stroke={C.lime} strokeWidth={1.6} />
    {/* Threats blocked, clean traffic passes */}
    <Packet x1={64} y1={60} x2={150} y2={60} hit color={C.red} d={2.2} delay={0} r={3} />
    <Packet x1={64} y1={86} x2={150} y2={86} hit color={C.red} d={2.2} delay={1.1} r={3} />
    <Packet x1={64} y1={72} x2={236} y2={68} color={C.lime} d={2.6} delay={0.5} />
    <Packet x1={64} y1={74} x2={236} y2={70} color={C.lime} d={2.6} delay={1.8} />
  </>
);

const Voice = () => (
  <>
    {/* Desk IP phone */}
    <path d="M 30 98 L 44 54 L 112 54 L 126 98 Z" fill="#0E3A66" stroke={C.edge} />
    <rect x={56} y={60} width={44} height={18} rx={2} fill="#06172B" stroke={C.cyan} strokeWidth={1} />
    <text x={78} y={72.5} textAnchor="middle" fontSize={8} fontFamily="monospace" fill={C.lime}>00:42</text>
    {[0, 1, 2].map((r) => [0, 1, 2].map((c) => (
      <rect key={`${r}${c}`} x={60 + c * 13} y={82 + r * 5} width={9} height={3} rx={1} fill={C.dim} />
    )))}
    <path d="M 34 52 Q 30 36 46 36 L 110 36 Q 126 36 122 52" fill="none" stroke={C.cyan} strokeWidth={5} strokeLinecap="round" />
    {/* Waveform */}
    {Array.from({ length: 14 }).map((_, i) => {
      const h = [18, 34, 26, 48, 30, 56, 40, 60, 36, 50, 28, 42, 22, 30][i];
      return (
        <rect key={i} x={148 + i * 10} y={70 - h / 2} width={5} height={h} rx={2.5}
          fill={i % 3 === 0 ? C.lime : C.cyan} className="sv-bar" style={seq((i % 5) * 0.12, 0.6 + (i % 4) * 0.12)} />
      );
    })}
  </>
);

const FireAlarm = () => (
  <>
    <line x1={20} y1={18} x2={300} y2={18} stroke={C.line} />
    {/* Smoke detector */}
    <rect x={70} y={18} width={40} height={6} rx={2} fill={C.dim} />
    <path d="M 66 24 h 48 a 6 6 0 0 1 -6 8 h -36 a 6 6 0 0 1 -6 -8 z" fill="#E9EEF3" />
    <circle cx={90} cy={28} r={2.4} fill={C.red} className="sv-blink" style={seq(0, 0.8)} />
    <Ring cx={90} cy={30} r={12} color={C.red} d={2} />
    <Ring cx={90} cy={30} r={12} color={C.red} d={2} delay={1} />
    {/* Smoke wisps */}
    {[0, 1, 2].map((i) => (
      <circle key={i} cx={78 + i * 12} cy={0} r={5} fill="rgba(255,255,255,0.18)"
        className="sv-move" style={{ '--x1': '0px', '--y1': '120px', '--x2': '0px', '--y2': '44px', '--d': '3s', '--delay': `${i * 0.9}s`, transformBox: 'view-box', transformOrigin: '0 0' } as V} />
    ))}
    {/* PA horn speaker */}
    <rect x={196} y={72} width={14} height={20} rx={2} fill="#0E3A66" stroke={C.edge} />
    <path d="M 210 74 L 232 62 L 232 102 L 210 90 Z" fill="#0E3A66" stroke={C.cyan} strokeWidth={1.4} />
    {[0, 1, 2].map((i) => (
      <path key={i} d={`M ${242 + i * 12} 66 Q ${254 + i * 12} 82 ${242 + i * 12} 98`} fill="none"
        stroke={i === 2 ? C.amber : C.cyan} strokeWidth={2} strokeLinecap="round" className="sv-seq" style={seq(i * 0.3, 1.5)} />
    ))}
    <rect x={150} y={112} width={44} height={14} rx={3} fill="#7A2E2E" />
    <text x={172} y={122} textAnchor="middle" fontSize={7.5} fontFamily="monospace" fill="#FFD7D7" className="sv-blink" style={seq(0, 1)}>EVACUATE</text>
  </>
);

const BMS = () => (
  <>
    {/* Building */}
    <path d="M 118 124 V 30 L 160 14 L 202 30 V 124" fill="#0E3A66" stroke={C.edge} strokeWidth={1.2} />
    {[0, 1, 2, 3, 4].map((f) => (
      <g key={f}>
        {[0, 1, 2].map((w) => (
          <rect key={w} x={128 + w * 24} y={106 - f * 17} width={16} height={9} rx={1.5}
            fill={f % 2 ? C.cyan : C.amber} className="sv-seq" style={seq(f * 0.35, 3)} />
        ))}
      </g>
    ))}
    <line x1={100} y1={124} x2={220} y2={124} stroke={C.line} />
    {/* HVAC fan */}
    <circle cx={58} cy={64} r={22} fill="#0E3A66" stroke={C.edge} />
    <g className="sv-spin" style={seq(0, 1.6)}>
      {[0, 120, 240].map((a) => (
        <path key={a} d="M 58 64 Q 52 50 58 44 Q 66 52 58 64" fill={C.cyan} transform={`rotate(${a} 58 64)`} />
      ))}
    </g>
    <circle cx={58} cy={64} r={3} fill={C.lime} />
    <text x={58} y={100} textAnchor="middle" fontSize={7.5} fontFamily="monospace" fill={C.dim}>HVAC</text>
    {/* Energy meter */}
    <rect x={238} y={40} width={50} height={50} rx={5} fill="#0E3A66" stroke={C.edge} />
    <path d="M 244 80 L 254 70 L 262 74 L 272 58 L 282 62" fill="none" stroke={C.lime} strokeWidth={1.8}
      strokeDasharray="60" className="sv-dash" style={{ '--dash': '-120', '--d': '3s' } as V} />
    <text x={263} y={52} textAnchor="middle" fontSize={7} fontFamily="monospace" fill={C.cyan}>kWh</text>
    <text x={263} y={102} textAnchor="middle" fontSize={7.5} fontFamily="monospace" fill={C.dim}>ENERGY</text>
    <line x1={80} y1={64} x2={118} y2={64} stroke={C.edge} strokeDasharray="3 3" className="sv-dash" />
    <line x1={202} y1={64} x2={238} y2={64} stroke={C.edge} strokeDasharray="3 3" className="sv-dash" />
  </>
);

const NurseCall = () => (
  <>
    {/* Bed */}
    <rect x={24} y={78} width={86} height={14} rx={4} fill="#E9EEF3" />
    <rect x={24} y={70} width={26} height={10} rx={5} fill="#FFFFFF" />
    <circle cx={42} cy={64} r={7} fill="rgba(255,255,255,0.7)" />
    <rect x={20} y={56} width={5} height={50} rx={2} fill={C.dim} />
    <rect x={108} y={70} width={5} height={36} rx={2} fill={C.dim} />
    {/* Call button */}
    <circle cx={124} cy={52} r={8} fill={C.red} />
    <Ring cx={124} cy={52} r={8} color={C.red} d={1.8} />
    <Ring cx={124} cy={52} r={8} color={C.red} d={1.8} delay={0.9} />
    {/* Signal path */}
    <path d="M 134 52 C 170 52 170 46 206 46" fill="none" stroke={C.red} strokeWidth={1.6} strokeDasharray="5 5"
      className="sv-dash" style={{ '--dash': '-20', '--d': '0.7s' } as V} />
    {/* Nurse station display */}
    <rect x={206} y={26} width={92} height={52} rx={5} fill="#06172B" stroke={C.edge} />
    <rect x={212} y={32} width={80} height={14} rx={2} fill="#7A2E2E" className="sv-blink" style={seq(0, 0.9)} />
    <text x={252} y={42} textAnchor="middle" fontSize={8} fontFamily="monospace" fill="#FFE3E3">WARD 04 · BED 2</text>
    <rect x={212} y={51} width={50} height={4} rx={2} fill={C.dim} />
    <rect x={212} y={59} width={64} height={4} rx={2} fill={C.dim} />
    <rect x={212} y={67} width={38} height={4} rx={2} fill={C.lime} />
    <rect x={244} y={78} width={8} height={16} fill={C.dim} />
    <rect x={226} y={94} width={44} height={4} rx={2} fill={C.dim} />
  </>
);

const Conference = () => (
  <>
    <rect x={84} y={14} width={152} height={84} rx={5} fill="#06172B" stroke={C.edge} />
    {[[0, 0], [1, 0], [0, 1], [1, 1]].map(([c, r], i) => {
      const x = 89 + c * 72;
      const y = 19 + r * 38;
      return (
        <g key={i}>
          <rect x={x} y={y} width={70} height={36} rx={3} fill="#103457" />
          <circle cx={x + 35} cy={y + 15} r={6} fill="rgba(255,255,255,0.55)" />
          <path d={`M ${x + 22} ${y + 36} Q ${x + 22} ${y + 23} ${x + 35} ${y + 23} Q ${x + 48} ${y + 23} ${x + 48} ${y + 36} Z`} fill="rgba(255,255,255,0.4)" />
          <rect x={x} y={y} width={70} height={36} rx={3} fill="none" stroke={C.lime} strokeWidth={2}
            className="sv-seq" style={seq(i * 1.1, 4.4)} />
        </g>
      );
    })}
    <circle cx={229} cy={21} r={2.2} fill={C.red} className="sv-blink" style={seq(0, 1.2)} />
    {/* Table + mic array */}
    <ellipse cx={160} cy={122} rx={90} ry={10} fill="#0E3A66" stroke={C.edge} />
    <ellipse cx={160} cy={118} rx={12} ry={4} fill={C.dim} />
    <Ring cx={160} cy={118} r={8} color={C.cyan} d={2.2} />
    <Ring cx={160} cy={118} r={8} color={C.cyan} d={2.2} delay={1.1} />
    <circle cx={160} cy={118} r={2} fill={C.lime} />
  </>
);

const PassiveCabling = () => {
  const paths = [
    { d: 'M 14 36 C 90 36 120 96 200 70 S 260 44 262 44', c: C.cyan },
    { d: 'M 14 70 C 80 70 130 30 200 56 S 250 70 262 70', c: C.lime },
    { d: 'M 14 104 C 90 104 130 80 200 92 S 250 96 262 96', c: C.blue },
  ];
  return (
    <>
      {paths.map((p, i) => (
        <g key={i}>
          <path d={p.d} fill="none" stroke={p.c} strokeOpacity={0.28} strokeWidth={3} strokeLinecap="round" />
          <path d={p.d} fill="none" stroke={p.c} strokeWidth={3} strokeLinecap="round" strokeDasharray="18 260"
            className="sv-dash" style={{ '--dash': '-278', '--d': `${1.8 + i * 0.3}s`, filter: `drop-shadow(0 0 4px ${p.c})` } as V} />
        </g>
      ))}
      {/* Patch panel */}
      <rect x={262} y={24} width={44} height={92} rx={4} fill="#0E3A66" stroke={C.edge} />
      {[0, 1, 2, 3, 4, 5, 6].map((r) => (
        <g key={r}>
          <rect x={270} y={32 + r * 11.5} width={9} height={7} rx={1} fill={C.panel} stroke={C.dim} strokeWidth={0.6} />
          <rect x={288} y={32 + r * 11.5} width={9} height={7} rx={1} fill={C.panel} stroke={C.dim} strokeWidth={0.6} />
          <circle cx={302} cy={35.5 + r * 11.5} r={1.2} fill={r % 2 ? C.lime : C.cyan} className="sv-blink" style={seq(r * 0.2, 1.4)} />
        </g>
      ))}
    </>
  );
};

const CableManagement = () => (
  <>
    {/* Ladder tray in perspective */}
    <path d="M 20 52 L 250 40 L 250 52 L 20 72 Z" fill="rgba(255,255,255,0.05)" stroke={C.edge} />
    {Array.from({ length: 10 }).map((_, i) => {
      const x = 32 + i * 23;
      const t = (x - 20) / 230;
      return <line key={i} x1={x} y1={52 - 12 * t} x2={x} y2={72 - 20 * t} stroke={C.dim} strokeWidth={1} />;
    })}
    {/* Cables laid neatly in the tray */}
    {[C.cyan, C.lime, C.blue, C.amber].map((c, i) => (
      <g key={i}>
        <path d={`M 20 ${57 + i * 4} L 250 ${44 + i * 2.2} L 262 ${46 + i * 2.2} L 262 128`} fill="none" stroke={c} strokeOpacity={0.55}
          strokeWidth={2.2} strokeLinejoin="round" />
        <path d={`M 20 ${57 + i * 4} L 250 ${44 + i * 2.2} L 262 ${46 + i * 2.2} L 262 128`} fill="none" stroke={c}
          strokeWidth={2.4} strokeDasharray="10 120" strokeLinejoin="round" className="sv-dash"
          style={{ '--dash': '-130', '--d': `${2 + i * 0.35}s` } as V} />
      </g>
    ))}
    {/* Drop to floor box */}
    <rect x={244} y={112} width={40} height={18} rx={3} fill="#0E3A66" stroke={C.cyan} strokeWidth={1.2} />
    <rect x={252} y={118} width={8} height={6} rx={1} fill={C.lime} />
    <rect x={266} y={118} width={8} height={6} rx={1} fill={C.cyan} />
    {/* Support hangers */}
    {[60, 150, 230].map((x) => (
      <line key={x} x1={x} y1={10} x2={x} y2={52 - 12 * ((x - 20) / 230)} stroke={C.dim} strokeWidth={1.4} />
    ))}
    <line x1={20} y1={10} x2={300} y2={10} stroke={C.line} />
  </>
);

const Power = () => (
  <>
    <text x={20} y={74} fontSize={10} fontFamily="monospace" fill={C.dim}>230V AC</text>
    <line x1={70} y1={70} x2={118} y2={70} stroke={C.lime} strokeOpacity={0.3} strokeWidth={3} />
    <line x1={70} y1={70} x2={118} y2={70} stroke={C.lime} strokeWidth={3} strokeDasharray="6 8" className="sv-dash"
      style={{ '--dash': '-28', '--d': '0.6s' } as V} />
    {/* UPS cabinet */}
    <rect x={118} y={34} width={52} height={72} rx={5} fill="#0E3A66" stroke={C.edge} />
    <text x={144} y={50} textAnchor="middle" fontSize={8} fontFamily="monospace" fill={C.cyan}>UPS</text>
    {[0, 1, 2].map((i) => (
      <g key={i}>
        <rect x={126} y={58 + i * 14} width={36} height={9} rx={2} fill={C.panel} />
        <circle cx={131} cy={62.5 + i * 14} r={1.8} fill={C.lime} className="sv-blink" style={seq(i * 0.3, 1.4)} />
      </g>
    ))}
    <line x1={170} y1={70} x2={200} y2={70} stroke={C.cyan} strokeWidth={3} strokeDasharray="6 8" className="sv-dash"
      style={{ '--dash': '-28', '--d': '0.6s' } as V} />
    {/* Battery */}
    <rect x={200} y={50} width={72} height={40} rx={6} fill="none" stroke={C.cyan} strokeWidth={2} />
    <rect x={272} y={62} width={6} height={16} rx={2} fill={C.cyan} />
    <rect x={205} y={55} width={62} height={30} rx={3} fill="url(#sv-batt)" className="sv-fill" />
    <defs>
      <linearGradient id="sv-batt" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor={C.blue} />
        <stop offset="1" stopColor={C.lime} />
      </linearGradient>
    </defs>
    <path d="M 238 58 L 230 72 L 238 72 L 234 84 L 246 68 L 238 68 Z" fill="#fff" />
    <text x={236} y={108} textAnchor="middle" fontSize={8} fontFamily="monospace" fill={C.lime}>N+1 · 0ms TRANSFER</text>
  </>
);

const Lighting = () => (
  <>
    <line x1={20} y1={16} x2={300} y2={16} stroke={C.line} />
    {[0, 1, 2, 3, 4].map((i) => {
      const x = 52 + i * 54;
      return (
        <g key={i}>
          <line x1={x} y1={16} x2={x} y2={36} stroke={C.dim} />
          <path d={`M ${x - 12} 46 Q ${x} 30 ${x + 12} 46 Z`} fill="#0E3A66" stroke={C.edge} />
          <ellipse cx={x} cy={84} rx={24} ry={36} fill="url(#sv-glow)" className="sv-seq" style={seq(i * 0.45, 3.4)} />
          <circle cx={x} cy={48} r={4} fill={C.amber} className="sv-seq" style={seq(i * 0.45, 3.4)} />
        </g>
      );
    })}
    <defs>
      <radialGradient id="sv-glow" cx="0.5" cy="0.1" r="0.9">
        <stop offset="0" stopColor={C.amber} stopOpacity="0.55" />
        <stop offset="1" stopColor={C.amber} stopOpacity="0" />
      </radialGradient>
    </defs>
    {/* Dimmer */}
    <rect x={100} y={124} width={120} height={4} rx={2} fill={C.dim} />
    <circle cx={110} cy={126} r={6} fill={C.lime} className="sv-slide" style={{ '--dx': '100px', '--d': '3.4s' } as V} />
  </>
);

const SCENES: Record<string, { label: string; render: () => React.ReactNode }> = {
  networking: { label: '10G L3 Fabric', render: Networking },
  wireless: { label: 'Wi-Fi 6E Campus Mesh', render: Wireless },
  datacentre: { label: 'Tier III · 99.99% SLA', render: Datacentre },
  'security-systems': { label: 'AI Video Analytics', render: Security },
  'av-solutions': { label: '4K Video Wall', render: AudioVisual },
  'endpoint-security': { label: 'NGFW · Zero Trust', render: Endpoint },
  'voice-solutions': { label: 'HD Voice · IP-PBX', render: Voice },
  'evacuation-fapa': { label: 'EN54 Voice Evacuation', render: FireAlarm },
  bms: { label: 'BACnet · HVAC · Energy', render: BMS },
  'nurse-call': { label: 'Bedside → Nurse Station', render: NurseCall },
  'conference-solutions': { label: '4K UC · Beamforming', render: Conference },
  'passive-cabling': { label: 'OFC · Cat6A · Fluke', render: PassiveCabling },
  'cable-management': { label: 'Trays · Raceways · CMS', render: CableManagement },
  'power-solutions': { label: 'Modular UPS · Smart PDU', render: Power },
  'lighting-automation': { label: 'DALI Scene Control', render: Lighting },
};

/** Alternate ids used by the Solutions showcase. */
const ALIASES: Record<string, string> = {
  'networking-switches': 'networking',
  'rf-wireless': 'wireless',
  'server-room': 'datacentre',
  'security-system': 'security-systems',
  'voice-solution': 'voice-solutions',
  'fapa-system': 'evacuation-fapa',
  'bms-system': 'bms',
  'nurse-calling': 'nurse-call',
  'passive-cabling-sol': 'passive-cabling',
};

export const ServiceVisual: React.FC<{ serviceId: string; className?: string; showLabel?: boolean }> = ({
  serviceId,
  className = '',
  showLabel = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const scene = SCENES[ALIASES[serviceId] ?? serviceId] ?? SCENES.networking;

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: '80px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-paused={visible ? 'false' : 'true'}
      className={`sv-stage relative overflow-hidden isolate ${className}`}
      aria-hidden="true"
    >
      <div className={`absolute inset-0 ${showLabel ? 'pt-6 pb-8 px-4' : 'p-4'}`}>
        <svg viewBox="0 0 320 140" preserveAspectRatio="xMidYMid meet" className="relative w-full h-full overflow-visible">
          {scene.render()}
        </svg>
      </div>
      {showLabel && (
        <>
          <span className="absolute left-3 bottom-2.5 text-[10px] font-mono font-semibold uppercase tracking-[0.12em] text-[#7FD3F7]/90">
            {scene.label}
          </span>
          <span className="absolute right-3 top-2.5 inline-flex items-center gap-1.5 text-[9px] font-mono font-semibold uppercase tracking-[0.14em] text-white/55">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8DC63F] shadow-[0_0_6px_#8DC63F] sv-blink" />
            Live
          </span>
        </>
      )}
      {/* Glass reflection */}
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.06] via-transparent to-transparent" />
    </div>
  );
};
