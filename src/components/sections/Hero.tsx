import React, { useRef, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform } from 'motion/react';
import {
  ArrowRight,
  PhoneCall,
  Wifi,
  Server,
  Shield,
  Phone,
  Volume2,
  Cpu,
  ChevronDown,
  Globe,
  Award,
  CheckCircle,
} from 'lucide-react';
import { HexagonFrame } from '../ui/HexagonFrame';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface HeroProps {
  onOpenQuote: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuote }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isHeroInView = useInView(containerRef, { amount: 0.1 });
  const prefersReduced = useReducedMotion();

  // Scroll-linked exit with parallax depth.
  // Transform/opacity only, so it stays on the GPU and doesn't cause layout work.
  const { scrollYProgress: heroProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  // Content lingers (moves slower than the page) so the next section's horizon
  // glides over it; it only fades once it's mostly out of view.
  const contentY = useTransform(heroProgress, [0, 1], [0, 160]);
  const contentScale = useTransform(heroProgress, [0, 1], [1, 0.96]);
  const contentOpacity = useTransform(heroProgress, [0, 0.55, 0.95], [1, 1, 0]);
  const bgY = useTransform(heroProgress, [0, 1], [0, 220]);
  const indicatorOpacity = useTransform(heroProgress, [0, 0.12], [1, 0]);

  // Lightweight network node canvas with travelling packets
  useEffect(() => {
    if (prefersReduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const updateDimensions = () => {
      const parent = canvas.parentElement;
      width = canvas.width = Math.min(window.innerWidth, parent?.clientWidth || window.innerWidth);
      height = canvas.height = parent?.clientHeight || window.innerHeight;
    };

    updateDimensions();

    const isMobile = window.innerWidth < 768;
    const nodeCount = isMobile ? 18 : 38;

    // Node definition
    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      isAccent: boolean;
    }

    const nodes: Node[] = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2 + 2,
        isAccent: Math.random() > 0.8,
      });
    }

    // Packet definition
    interface Packet {
      fromIndex: number;
      toIndex: number;
      progress: number;
      speed: number;
      isLime: boolean;
    }

    const packets: Packet[] = [];
    const maxPackets = isMobile ? 4 : 8;

    const handleResize = () => {
      updateDimensions();
    };

    window.addEventListener('resize', handleResize, { passive: true });

    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);

    const render = () => {
      if (!isVisible || document.hidden) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Update and draw connections
      const maxDistance = isMobile ? 100 : 150;
      const connections: [number, number][] = [];

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        // Draw connections
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n2.x - n.x;
          const dy = n2.y - n.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.22;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = `rgba(10, 139, 211, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();

            if (connections.length < 50) {
              connections.push([i, j]);
            }
          }
        }

        // Draw node
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = n.isAccent ? '#8DC63F' : '#0A8BD3';
        ctx.fill();
      }

      // Manage and render travelling data packets
      if (connections.length > 0 && packets.length < maxPackets && Math.random() < 0.05) {
        const [from, to] = connections[Math.floor(Math.random() * connections.length)];
        packets.push({
          fromIndex: from,
          toIndex: to,
          progress: 0,
          speed: 0.012 + Math.random() * 0.01,
          isLime: Math.random() > 0.65,
        });
      }

      for (let p = packets.length - 1; p >= 0; p--) {
        const packet = packets[p];
        packet.progress += packet.speed;

        if (packet.progress >= 1) {
          packets.splice(p, 1);
          continue;
        }

        const fromNode = nodes[packet.fromIndex];
        const toNode = nodes[packet.toIndex];
        if (!fromNode || !toNode) {
          packets.splice(p, 1);
          continue;
        }

        const px = fromNode.x + (toNode.x - fromNode.x) * packet.progress;
        const py = fromNode.y + (toNode.y - fromNode.y) * packet.progress;

        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = packet.isLime ? '#8DC63F' : '#4FC3F7';
        ctx.shadowColor = packet.isLime ? '#8DC63F' : '#4FC3F7';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, [prefersReduced]);

  const words = ['A', 'Complete', 'IT', 'Infrastructure', 'Solution', 'Provider.'];

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-[92vh] lg:min-h-screen pt-32 lg:pt-36 pb-36 sm:pb-40 lg:pb-44 flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #EAF3FB 0%, #E6F1FA 55%, #E1EDF8 100%)' }}
    >
      {/* Ambient light: a soft lift behind the headline and a cool glow behind the hub */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-32 w-[900px] h-[700px] max-w-none rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.85),rgba(255,255,255,0))]" />
        <div className="absolute top-[12%] right-[-8%] w-[760px] h-[760px] max-w-none rounded-full bg-[radial-gradient(closest-side,rgba(79,195,247,0.22),rgba(79,195,247,0))]" />
        <div className="absolute bottom-[-20%] left-[30%] w-[700px] h-[500px] max-w-none rounded-full bg-[radial-gradient(closest-side,rgba(141,198,63,0.08),rgba(141,198,63,0))]" />
      </div>
      {/* Contained Decorative Background & Canvas */}
      <motion.div className="absolute inset-0 overflow-hidden pointer-events-none" style={prefersReduced ? undefined : { y: bgY }}>
        {/* Hexagon Honeycomb Background Layer */}
        <div className="absolute inset-0 opacity-40">
          <svg
            className="w-full h-full object-cover"
            viewBox="0 0 1440 900"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.6">
              {/* Hexagon cells at various positions */}
              <path
                d="M1100 120 L1150 150 L1150 210 L1100 240 L1050 210 L1050 150 Z"
                stroke="#0A8BD3"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                fill="rgba(232, 246, 253, 0.4)"
              />
              <path
                d="M1220 190 L1270 220 L1270 280 L1220 310 L1170 280 L1170 220 Z"
                stroke="#4FC3F7"
                strokeWidth="1.5"
                fill="rgba(10, 139, 211, 0.05)"
              />
              <path
                d="M1000 260 L1050 290 L1050 350 L1000 380 L950 350 L950 290 Z"
                stroke="#8DC63F"
                strokeWidth="1.5"
                fill="rgba(141, 198, 63, 0.06)"
              />
              <path
                d="M1120 330 L1170 360 L1170 420 L1120 450 L1070 420 L1070 360 Z"
                stroke="#0A8BD3"
                strokeWidth="1.5"
              />
              <path
                d="M150 180 L190 205 L190 255 L150 280 L110 255 L110 205 Z"
                stroke="#0A8BD3"
                strokeWidth="1.2"
                fill="rgba(10, 139, 211, 0.03)"
              />
              <path
                d="M240 240 L280 265 L280 315 L240 340 L200 315 L200 265 Z"
                stroke="#4FC3F7"
                strokeWidth="1.2"
              />
            </g>
          </svg>
        </div>

        {/* Lightweight Network Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full z-0"
        />
      </motion.div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full origin-top will-change-transform"
        style={prefersReduced ? undefined : { y: contentY, scale: contentScale, opacity: contentOpacity }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline, Narrative & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Eyebrow metadata chip */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F6FD] border border-[#0A8BD3]/20 shadow-xs"
            >
              <span className="w-2 h-2 rounded-full bg-[#8DC63F]" />
              <span className="text-xs font-semibold text-[#0866A8] tracking-wide">
                15+ Years · PAN India · Design to Handover
              </span>
            </motion.div>

            {/* Main Headline with word-by-word reveal */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight text-[#0B2545] font-display leading-[1.12]">
              {words.map((word, i) => {
                const isHighlight = word === 'IT' || word === 'Infrastructure';
                return (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.1 + i * 0.07,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`inline-block mr-2.5 ${
                      isHighlight
                        ? 'bg-gradient-to-r from-[#0A8BD3] via-[#0866A8] to-[#4FC3F7] bg-clip-text text-transparent'
                        : ''
                    }`}
                  >
                    {word}
                  </motion.span>
                );
              })}
            </h1>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="text-base sm:text-lg text-[#4A5B6E] leading-relaxed max-w-2xl font-normal"
            >
              Innovative turnkey solutions for enterprise IT, high-density networking, physical security, IP-PBX voice, modular UPS, and professional audio-visual systems — trusted by leading hospitals, universities, government and commercial enterprises across India.
            </motion.p>

            {/* Primary & Secondary Action CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <a
                href="#services"
                className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#0A8BD3] to-[#4FC3F7] text-white text-sm font-semibold shadow-lg shadow-[#0A8BD3]/30 hover:shadow-xl hover:shadow-[#0A8BD3]/45 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2 group cursor-pointer"
              >
                <span>Explore Solutions</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <button
                onClick={onOpenQuote}
                className="px-7 py-3.5 rounded-full bg-white/80 hover:bg-white text-[#0B2545] hover:text-[#0A8BD3] border border-[#0A8BD3]/25 text-sm font-semibold shadow-xs hover:shadow-md transition-all flex items-center gap-2 backdrop-blur-sm cursor-pointer"
              >
                <PhoneCall className="w-4 h-4 text-[#0A8BD3]" />
                <span>Talk to an Expert</span>
              </button>
            </motion.div>

            {/* Key trust bullets */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.75 }}
              className="pt-4 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-500 font-medium"
            >
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-[#8DC63F]" />
                <span>SITC & Turnkey ELV</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-[#8DC63F]" />
                <span>Tier III Datacentre Design</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-[#8DC63F]" />
                <span>Comprehensive AMC</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Floating Infrastructure Hub Visual (Desktop) */}
          <div className="lg:col-span-5 relative flex items-center justify-center w-full overflow-visible">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] lg:w-[420px] lg:h-[420px] max-w-full flex items-center justify-center mx-auto"
            >
              {/* Outer Orbit Ring */}
              <div className="absolute inset-2 sm:inset-4 rounded-full border border-dashed border-[#0A8BD3]/25 animate-[spin_40s_linear_infinite]" />

              {/* Inner Orbit Ring */}
              <div className="absolute inset-10 sm:inset-16 rounded-full border border-[#4FC3F7]/30 animate-[spin_25s_linear_infinite_reverse]" />

              {/* Central Core Hexagon Infrastructure Hub */}
              <div
                className="relative z-20 flex flex-col items-center justify-center glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl border border-[#0A8BD3]/25 max-w-[180px] sm:max-w-[220px] w-full text-center"
                style={{ isolation: 'auto' }}
              >
                <motion.div
                  animate={isHeroInView ? { y: [0, -4, 0] } : { y: 0 }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="mb-1.5 sm:mb-2 flex items-center justify-center"
                >
                  <img
                    src="/assets/silicon-logo.png"
                    alt="Silicon é Solution"
                    className="h-9 sm:h-12 w-auto object-contain drop-shadow-xs"
                  />
                </motion.div>
                <h3 className="text-[11px] sm:text-xs font-bold text-[#0B2545] font-display uppercase tracking-wider">
                  Silicon é Solution
                </h3>
                <span className="text-[9px] sm:text-[10px] text-[#0A8BD3] font-semibold mt-0.5">
                  Infrastructure Hub
                </span>
                <span className="mt-1.5 sm:mt-2 text-[8px] sm:text-[9px] px-2 py-0.5 rounded-full bg-[#8DC63F]/15 text-[#679927] font-mono font-bold">
                  SITC Certified
                </span>
              </div>

              {/* Orbiting Satellite Node 1: Wi-Fi */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 pointer-events-none"
              >
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl glass-card border border-[#0A8BD3]/30 shadow-md flex items-center justify-center text-[#0A8BD3] absolute -top-1 sm:-top-2 left-1/2 -translate-x-1/2 pointer-events-auto hover:scale-110 transition-transform">
                  <Wifi className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </motion.div>

              {/* Orbiting Satellite Node 2: Server */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 pointer-events-none"
              >
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl glass-card border border-[#0A8BD3]/30 shadow-md flex items-center justify-center text-[#0866A8] absolute top-1/2 -right-1 sm:-right-3 -translate-y-1/2 pointer-events-auto hover:scale-110 transition-transform">
                  <Server className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </motion.div>

              {/* Orbiting Satellite Node 3: CCTV Shield */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 pointer-events-none"
              >
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl glass-card border border-[#0A8BD3]/30 shadow-md flex items-center justify-center text-[#8DC63F] absolute -bottom-1 sm:-bottom-2 left-1/2 -translate-x-1/2 pointer-events-auto hover:scale-110 transition-transform">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </motion.div>

              {/* Orbiting Satellite Node 4: IP Telephony */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 pointer-events-none"
              >
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl glass-card border border-[#0A8BD3]/30 shadow-md flex items-center justify-center text-[#0A8BD3] absolute top-1/2 -left-1 sm:-left-3 -translate-y-1/2 pointer-events-auto hover:scale-110 transition-transform">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </motion.div>

              {/* Floating Trust Badge */}
              <div className="absolute -bottom-4 sm:-bottom-6 right-0 sm:right-0 glass-card p-2 sm:p-3 rounded-xl sm:rounded-2xl border border-[#0A8BD3]/20 shadow-lg flex items-center gap-2 sm:gap-3 animate-bounce [animation-duration:5s] max-w-[calc(100%-16px)]">
                <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-gradient-to-tr from-[#0A8BD3] to-[#8DC63F] text-white flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <div className="text-[11px] sm:text-xs font-bold text-[#0B2545]">15+ Years</div>
                  <div className="text-[9px] sm:text-[10px] text-slate-500">Government & Healthcare</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Animated Scroll Down Indicator */}
      <motion.div
        className="absolute bottom-20 sm:bottom-28 lg:bottom-32 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-1 text-slate-400 pointer-events-none"
        style={prefersReduced ? undefined : { opacity: indicatorOpacity }}
      >
        <span className="text-[10px] uppercase tracking-widest font-mono">Scroll</span>
        <div className="w-5 h-8 rounded-full border-2 border-slate-300 flex justify-center pt-1">
          <motion.div
            animate={{ y: [0, 8, 0], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1.5 h-1.5 rounded-full bg-[#0A8BD3]"
          />
        </div>
      </motion.div>
    </section>
  );
};
