import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * A soft curved "horizon" that sits on top of a white section and rises into the
 * section above it. A fine blue→lime light stroke traces the curve (revealed from
 * the centre outwards), and the arc gently flattens as the section scrolls up to
 * the top of the viewport.
 *
 * Place it as the first child of a `relative` white section. Everything animates
 * with transform / opacity / clip-path only.
 */
export const HorizonEdge: React.FC<{ fill?: string }> = ({ fill = '#FFFFFF' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  // 0 when the edge enters from the bottom of the viewport, 1 when it reaches ~20% from the top.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 20%'] });
  const flatten = useTransform(scrollYProgress, [0.35, 1], [1, 0.28]);
  const glowOpacity = useTransform(scrollYProgress, [0.1, 0.5, 1], [0, 1, 0.55]);

  // Curve in a 1440×120 box: rests on the section edge at both sides, crests in the middle.
  const curve = 'M0,120 C260,52 520,14 720,14 C920,14 1180,52 1440,120';

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-full h-[44px] sm:h-[80px] lg:h-[104px]"
    >
      {/* Soft light pooling behind the crest */}
      <motion.div
        className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[80%] h-[220%]"
        style={{
          opacity: prefersReduced ? 0.7 : glowOpacity,
          background:
            'radial-gradient(50% 55% at 50% 100%, rgba(79, 195, 247, 0.20) 0%, rgba(10, 139, 211, 0.08) 45%, rgba(10, 139, 211, 0) 72%)',
        }}
      />

      {/* The curve itself: white fill + light stroke, flattening on scroll */}
      <motion.div
        className="absolute inset-0 origin-bottom"
        style={prefersReduced ? undefined : { scaleY: flatten }}
      >
        <svg
          className="absolute inset-0 w-full h-full overflow-visible"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path d={`${curve} L1440,121 L0,121 Z`} fill={fill} />
        </svg>

        {/* Stroke + glow, revealed from the centre outwards once in view */}
        <motion.div
          className="absolute inset-0"
          initial={prefersReduced ? false : { clipPath: 'inset(-20px 50% -20px 50%)', opacity: 0 }}
          whileInView={{ clipPath: 'inset(-20px 0% -20px 0%)', opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <svg
            className="absolute inset-0 w-full h-full overflow-visible"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="horizon-stroke" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#4FC3F7" stopOpacity="0" />
                <stop offset="22%" stopColor="#4FC3F7" stopOpacity="0.55" />
                <stop offset="50%" stopColor="#0A8BD3" stopOpacity="0.95" />
                <stop offset="78%" stopColor="#8DC63F" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#8DC63F" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Wide soft glow */}
            <path
              d={curve}
              fill="none"
              stroke="url(#horizon-stroke)"
              strokeWidth="10"
              strokeOpacity="0.18"
              vectorEffect="non-scaling-stroke"
              style={{ filter: 'blur(6px)' }}
            />
            {/* Crisp hairline */}
            <path
              d={curve}
              fill="none"
              stroke="url(#horizon-stroke)"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
};
