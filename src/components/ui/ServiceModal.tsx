import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, ArrowRight, ArrowLeft, ShieldCheck, Layers } from 'lucide-react';
import { ServiceItem } from '../../types';
import { SERVICES_LIST } from '../../data/content';
import { ServiceVisual } from './ServiceVisual';
import { serviceIconMap, CATEGORY_LABEL } from './ServiceCard';
import { lenisRef } from '../../lib/lenis';

interface ServiceModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onRequestConsultation: (serviceTitle: string) => void;
  /** Switch to another service without closing (prev / next). */
  onNavigate?: (service: ServiceItem) => void;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const ServiceModal: React.FC<ServiceModalProps> = ({ service, onClose, onRequestConsultation, onNavigate }) => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);
  const isOpen = Boolean(service);

  const index = service ? SERVICES_LIST.findIndex((s) => s.id === service.id) : -1;
  const prev = index >= 0 ? SERVICES_LIST[(index - 1 + SERVICES_LIST.length) % SERVICES_LIST.length] : null;
  const next = index >= 0 ? SERVICES_LIST[(index + 1) % SERVICES_LIST.length] : null;

  // Lock page scroll (native + smooth-scroll) while open; restore focus on close.
  useEffect(() => {
    if (!isOpen) return;
    lastFocused.current = document.activeElement as HTMLElement | null;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow = document.body.style.overflow;
    const prevPadding = document.body.style.paddingRight;
    document.body.style.overflow = 'hidden';
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    lenisRef.current?.stop();
    requestAnimationFrame(() => closeRef.current?.focus({ preventScroll: true }));

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPadding;
      lenisRef.current?.start();
      lastFocused.current?.focus?.({ preventScroll: true });
    };
  }, [isOpen]);

  // Keyboard: Escape closes, arrows switch service.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (onNavigate && e.key === 'ArrowRight' && next) onNavigate(next);
      if (onNavigate && e.key === 'ArrowLeft' && prev) onNavigate(prev);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose, onNavigate, next, prev]);

  // New service → back to top of the scroll area.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [service?.id]);

  if (typeof document === 'undefined') return null;

  const Icon = service ? serviceIconMap[service.iconName] || Layers : Layers;

  return createPortal(
    <AnimatePresence>
      {service && (
        <div
          className="fixed inset-0 z-[1200] flex items-end md:items-center justify-center md:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="service-modal-title"
        >
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#06152A]/70 backdrop-blur-[6px]"
          />

          {/* Panel */}
          <motion.div
            key="panel"
            ref={scrollRef}
            data-lenis-prevent
            initial={{ opacity: 0, y: 48, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.98 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="relative w-full md:max-w-[1040px] h-[92dvh] md:h-[min(720px,calc(100dvh-48px))] bg-white rounded-t-[28px] md:rounded-[32px] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.6)] overflow-y-auto overscroll-contain md:overflow-hidden md:grid md:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]"
          >
            {/* Mobile: grab handle + always-visible close */}
            <div className="md:hidden sticky top-0 z-30 h-0">
              <span className="absolute top-2.5 left-1/2 -translate-x-1/2 w-10 h-1.5 rounded-full bg-white/40" />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/15 backdrop-blur-md ring-1 ring-white/25 text-white flex items-center justify-center cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* ---------- Left: dark showcase ---------- */}
            <aside
              className="relative text-white p-5 pt-7 md:p-8 flex flex-col"
              style={{ background: 'radial-gradient(120% 120% at 0% 0%, #155A92 0%, #0D2E52 48%, #081B33 100%)' }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="flex flex-col h-full"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-11 h-11 rounded-2xl bg-white/10 ring-1 ring-white/20 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#7FD3F7]" />
                    </span>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7FD3F7]">
                      <span className="font-mono">{service.number}</span> / {String(SERVICES_LIST.length).padStart(2, '0')}
                      <span className="text-white/40"> · </span>
                      {CATEGORY_LABEL[service.category]}
                    </div>
                  </div>

                  <div className="mt-5 rounded-[20px] overflow-hidden ring-1 ring-white/10">
                    <ServiceVisual serviceId={service.id} className="h-[190px] md:h-[230px]" />
                  </div>

                  <div className="mt-6 hidden md:block">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50 mb-2.5">
                      Technical standards
                    </div>
                    <ul className="divide-y divide-white/10 rounded-2xl bg-white/[0.04] ring-1 ring-white/10">
                      {service.specs.map((spec) => (
                        <li key={spec} className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-white/85">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#8DC63F] shadow-[0_0_8px_#8DC63F]" />
                          {spec}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="hidden md:flex mt-auto pt-6 items-center gap-2 text-xs text-white/55">
                    <ShieldCheck className="w-4 h-4 text-[#8DC63F]" />
                    OEM-certified engineers · Comprehensive AMC available
                  </div>
                </motion.div>
              </AnimatePresence>
            </aside>

            {/* ---------- Right: details ---------- */}
            <div data-lenis-prevent className="relative flex flex-col md:overflow-y-auto overscroll-contain">
              {/* Top bar */}
              <div className="hidden md:flex sticky top-0 z-10 items-center justify-end gap-2 px-8 pt-4 pb-3 bg-white/90 backdrop-blur-md">
                {onNavigate && prev && next && (
                  <>
                    <button
                      type="button"
                      onClick={() => onNavigate(prev)}
                      aria-label={`Previous service: ${prev.title}`}
                      className="w-9 h-9 rounded-full ring-1 ring-slate-200 text-slate-500 hover:text-[#0A8BD3] hover:ring-[#0A8BD3]/40 flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onNavigate(next)}
                      aria-label={`Next service: ${next.title}`}
                      className="w-9 h-9 rounded-full ring-1 ring-slate-200 text-slate-500 hover:text-[#0A8BD3] hover:ring-[#0A8BD3]/40 flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <span className="w-px h-5 bg-slate-200 mx-1" />
                  </>
                )}
                <button
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="w-9 h-9 rounded-full bg-[#0B2545] text-white hover:bg-[#0A8BD3] flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0A8BD3]/35"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="px-5 md:px-8 pt-6 md:pt-0 pb-6"
                >
                  <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0A8BD3]">
                    {service.badge || 'Turnkey solution'}
                  </div>
                  <h3 id="service-modal-title" className="mt-1.5 text-2xl md:text-[28px] leading-tight font-extrabold tracking-tight text-[#0B2545] font-display">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm font-medium text-slate-500">{service.shortDesc}</p>

                  <div className="mt-6">
                    <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#0B2545] mb-2">
                      Overview &amp; engineering scope
                    </div>
                    <p className="text-[15px] leading-relaxed text-slate-600">{service.fullDesc}</p>
                  </div>

                  <div className="mt-7">
                    <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#0B2545] mb-3">
                      Key deliverables
                    </div>
                    <ul className="space-y-2.5">
                      {service.features.map((feat, i) => (
                        <motion.li
                          key={feat}
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 + i * 0.05, ease: EASE }}
                          className="flex items-start gap-3 rounded-2xl bg-[#F3F8FC] ring-1 ring-[#0A8BD3]/10 px-4 py-3 text-sm text-[#0B2545]"
                        >
                          <CheckCircle2 className="w-[18px] h-[18px] text-[#8DC63F] shrink-0 mt-px" />
                          <span>{feat}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-7 md:hidden">
                    <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#0B2545] mb-3">Technical standards</div>
                    <div className="flex flex-wrap gap-2">
                      {service.specs.map((spec) => (
                        <span key={spec} className="px-3 py-1.5 rounded-full bg-[#EAF4FB] text-xs font-medium text-[#0866A8] ring-1 ring-[#0A8BD3]/12">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Sticky footer CTA */}
              <div className="sticky bottom-0 mt-auto px-5 md:px-8 py-4 bg-white/95 backdrop-blur-md border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                {next && onNavigate ? (
                  <button
                    type="button"
                    onClick={() => onNavigate(next)}
                    className="order-2 sm:order-none inline-flex items-center justify-center sm:justify-start gap-1.5 text-xs text-slate-500 hover:text-[#0A8BD3] transition-colors cursor-pointer min-w-0"
                  >
                    <span className="uppercase tracking-wider text-slate-400">Next</span>
                    <span className="font-semibold text-[#0B2545] truncate">{next.title}</span>
                  </button>
                ) : (
                  <span />
                )}
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onRequestConsultation(service.title);
                  }}
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#0A8BD3] to-[#4FC3F7] text-white text-sm font-semibold shadow-[0_12px_28px_-10px_rgba(10,139,211,0.7)] hover:shadow-[0_16px_34px_-10px_rgba(10,139,211,0.85)] transition-shadow cursor-pointer"
                >
                  Request consultation
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};
