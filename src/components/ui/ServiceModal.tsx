import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';
import { ServiceItem } from '../../types';
import { ServiceAnimation } from './ServiceAnimation';
import { HexagonFrame } from './HexagonFrame';

interface ServiceModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onRequestConsultation: (serviceTitle: string) => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({
  service,
  onClose,
  onRequestConsultation,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (service) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [service, onClose]);

  return (
    <AnimatePresence>
      {service && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0B2545]/60 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#0A8BD3]/20 overflow-hidden z-10 my-8"
          >
            {/* Header with decorative mesh */}
            <div className="relative p-6 sm:p-8 bg-gradient-to-r from-[#E8F6FD] via-white to-[#E8F6FD] border-b border-[#0A8BD3]/15">
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-slate-500 hover:text-[#0B2545] border border-slate-200 flex items-center justify-center transition-colors shadow-xs"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4">
                <HexagonFrame size={64} borderColor="#0A8BD3" bgColor="#E8F6FD">
                  <span className="text-sm font-bold font-mono text-[#0A8BD3]">{service.number}</span>
                </HexagonFrame>

                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0A8BD3] mb-1">
                    <span>{service.badge || 'Turnkey Solution'}</span>
                    <span aria-hidden="true">·</span>
                    <span>15+ Years Expertise</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0B2545] font-display">
                    {service.title}
                  </h3>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[65vh] overflow-y-auto">
              {/* Interactive micro animation */}
              <div className="w-full">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-[#0A8BD3]" />
                  <span>Real-Time System Simulation</span>
                </div>
                <ServiceAnimation serviceId={service.id} isHovered={true} className="h-28" />
              </div>

              <div>
                <h4 className="text-sm font-semibold text-[#0B2545] uppercase tracking-wider mb-2">
                  Overview & Engineering Scope
                </h4>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  {service.fullDesc}
                </p>
              </div>

              {/* Key Deliverables */}
              <div>
                <h4 className="text-sm font-semibold text-[#0B2545] uppercase tracking-wider mb-3">
                  Key Deliverables & Capabilities
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {service.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F6FAFD] border border-[#0A8BD3]/10 text-xs sm:text-sm text-[#0B2545]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#8DC63F] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specifications pills */}
              <div>
                <h4 className="text-sm font-semibold text-[#0B2545] uppercase tracking-wider mb-2">
                  Technical Standards & Compliances
                </h4>
                <div className="flex flex-wrap gap-2 text-xs font-mono text-slate-600">
                  {service.specs.map((spec, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-lg bg-[#E8F6FD] text-[#0866A8] border border-[#0A8BD3]/20 font-medium"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-[#F6FAFD] border-t border-[#0A8BD3]/15 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-[#0A8BD3]" />
                <span>OEM Certified Engineers · Comprehensive AMC Available</span>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onRequestConsultation(service.title);
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#0A8BD3] to-[#4FC3F7] text-white text-sm font-semibold shadow-md shadow-[#0A8BD3]/25 hover:shadow-lg hover:shadow-[#0A8BD3]/40 transition-all flex items-center justify-center gap-2"
              >
                <span>Request Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
