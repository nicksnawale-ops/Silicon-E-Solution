import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { STATS, CLIENTS_LIST } from '../../data/content';

function Counter({ end, suffix }: { end: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const duration = 1600; // ms

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutExpo
      const easeVal = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeVal * end));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(step);
  }, [isInView, end]);

  return (
    <span ref={ref} className="font-mono tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export const StatsAndMarquee: React.FC = () => {
  return (
    <section className="relative py-12 bg-white border-y border-[#0A8BD3]/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 4 Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {STATS.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card p-5 sm:p-6 rounded-2xl border border-[#0A8BD3]/15 shadow-xs hover:border-[#0A8BD3]/30 hover:shadow-md transition-all text-left group"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-[#0B2545] font-display flex items-baseline gap-1 group-hover:text-[#0A8BD3] transition-colors">
                <Counter end={stat.value} suffix={stat.suffix} />
              </div>
              <h3 className="text-sm font-semibold text-[#0B2545] mt-1.5 font-display">
                {stat.label}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">{stat.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Marquee Header */}
        <div className="mt-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#0A8BD3]">
            Trusted by Leading Educational, Healthcare & Enterprise Giants
          </p>
        </div>

        {/* Infinite Pause-on-Hover Client Marquee */}
        <div className="relative mt-6 overflow-hidden py-3 mask-marquee">
          {/* Subtle gradient side fades */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div className="flex gap-8 w-max animate-[marquee_30s_linear_infinite] hover:[animation-play-state:paused]">
            {[...CLIENTS_LIST, ...CLIENTS_LIST, ...CLIENTS_LIST].map((client, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 px-6 py-3 rounded-xl bg-[#F6FAFD] border border-[#0A8BD3]/15 hover:border-[#0A8BD3]/40 hover:bg-white transition-all shadow-2xs shrink-0 cursor-default"
              >
                <div className="w-2 h-2 rounded-full bg-[#8DC63F]" />
                <div className="text-left">
                  <span className="text-xs sm:text-sm font-bold text-[#0B2545] font-display">
                    {client.name}
                  </span>
                  <span className="block text-[10px] text-slate-500 font-medium">
                    {client.sector} · {client.location}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};
