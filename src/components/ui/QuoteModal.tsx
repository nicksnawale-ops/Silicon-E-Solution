import React, { useState, useEffect } from 'react';
import { lenisRef } from '../../lib/lenis';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Send, Phone, Mail, Building, MapPin } from 'lucide-react';
import { SERVICES_LIST, COMPANY_INFO } from '../../data/content';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  preselectedService = '',
}) => {
  const [formData, setFormData] = useState({
    name: '',
    organisation: '',
    email: '',
    phone: '',
    service: preselectedService || SERVICES_LIST[0]?.title || '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      lenisRef.current?.stop();
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
      setIsSuccess(false);
    }
    return () => {
      document.body.style.overflow = '';
      if (isOpen) lenisRef.current?.start();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.organisation.trim()) newErrors.organisation = 'Organisation is required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      newErrors.phone = 'Valid phone number is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 900);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div data-lenis-prevent className="fixed inset-0 z-[1200] flex items-end sm:items-center justify-center sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0B2545]/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="quote-modal-title"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full sm:max-w-xl max-h-[92dvh] sm:max-h-[calc(100dvh-3rem)] flex flex-col bg-white rounded-t-[28px] sm:rounded-3xl shadow-2xl border border-[#0A8BD3]/20 overflow-hidden"
          >
            {/* Header */}
            <div className="relative shrink-0 px-5 pt-3 pb-4 sm:p-8 pr-16 sm:pr-16 bg-gradient-to-r from-[#E8F6FD] via-white to-[#E8F6FD] border-b border-[#0A8BD3]/15">
              {/* Grab handle (mobile bottom sheet) */}
              <span aria-hidden="true" className="sm:hidden block mx-auto mb-3 h-1.5 w-10 rounded-full bg-slate-300/80" />
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="absolute top-5 right-4 sm:top-6 sm:right-6 w-10 h-10 sm:w-9 sm:h-9 rounded-full bg-white/80 hover:bg-white text-slate-500 hover:text-[#0B2545] border border-slate-200 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#0A8BD3] mb-1">
                Design to Handover · Free Assessment
              </div>
              <h3 id="quote-modal-title" className="text-lg sm:text-2xl font-bold text-[#0B2545] font-display leading-snug">
                Request Infrastructure Consultation
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Direct engagement with our pre-sales & technical engineering team in Pune.
              </p>
            </div>

            {/* Content */}
            <div data-lenis-prevent className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-5 pt-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:p-8">
              {isSuccess ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-[#8DC63F]/15 border-2 border-[#8DC63F] flex items-center justify-center text-[#8DC63F]">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-xl font-bold text-[#0B2545] font-display">
                    Consultation Request Received!
                  </h4>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-[#0B2545]">{formData.name}</strong>. Our pre-sales engineering team for <span className="text-[#0A8BD3] font-medium">{formData.service}</span> will review your requirements and reach out within 4 business hours.
                  </p>

                  <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={`tel:${COMPANY_INFO.phones[0].replace(/\s+/g, '')}`}
                      className="px-4 py-2 rounded-xl bg-[#E8F6FD] text-[#0A8BD3] text-xs font-semibold flex items-center gap-2 hover:bg-[#0A8BD3] hover:text-white transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Direct Desk: 020 2295 3999</span>
                    </a>
                    <button
                      onClick={onClose}
                      className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#0B2545] uppercase tracking-wider mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Dr. Rajesh Sharma"
                        className={`w-full px-3.5 py-3 sm:py-2.5 rounded-xl border text-base sm:text-sm text-slate-800 focus:outline-none transition-colors ${
                          errors.name
                            ? 'border-red-400 bg-red-50/30'
                            : 'border-slate-200 focus:border-[#0A8BD3] focus:ring-2 focus:ring-[#0A8BD3]/15'
                        }`}
                      />
                      {errors.name && <p className="text-[11px] text-red-500 mt-0.5">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#0B2545] uppercase tracking-wider mb-1">
                        Organisation / Hospital / University *
                      </label>
                      <input
                        type="text"
                        value={formData.organisation}
                        onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
                        placeholder="e.g. Apex Health Institute"
                        className={`w-full px-3.5 py-3 sm:py-2.5 rounded-xl border text-base sm:text-sm text-slate-800 focus:outline-none transition-colors ${
                          errors.organisation
                            ? 'border-red-400 bg-red-50/30'
                            : 'border-slate-200 focus:border-[#0A8BD3] focus:ring-2 focus:ring-[#0A8BD3]/15'
                        }`}
                      />
                      {errors.organisation && (
                        <p className="text-[11px] text-red-500 mt-0.5">{errors.organisation}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#0B2545] uppercase tracking-wider mb-1">
                        Corporate / Work Email *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="rajesh@apexhealth.org"
                        className={`w-full px-3.5 py-3 sm:py-2.5 rounded-xl border text-base sm:text-sm text-slate-800 focus:outline-none transition-colors ${
                          errors.email
                            ? 'border-red-400 bg-red-50/30'
                            : 'border-slate-200 focus:border-[#0A8BD3] focus:ring-2 focus:ring-[#0A8BD3]/15'
                        }`}
                      />
                      {errors.email && <p className="text-[11px] text-red-500 mt-0.5">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#0B2545] uppercase tracking-wider mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98220 00000"
                        className={`w-full px-3.5 py-3 sm:py-2.5 rounded-xl border text-base sm:text-sm text-slate-800 focus:outline-none transition-colors ${
                          errors.phone
                            ? 'border-red-400 bg-red-50/30'
                            : 'border-slate-200 focus:border-[#0A8BD3] focus:ring-2 focus:ring-[#0A8BD3]/15'
                        }`}
                      />
                      {errors.phone && <p className="text-[11px] text-red-500 mt-0.5">{errors.phone}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0B2545] uppercase tracking-wider mb-1">
                      Primary Solution / Vertical of Interest
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-3.5 py-3 sm:py-2.5 rounded-xl border border-slate-200 text-base sm:text-sm text-slate-800 focus:outline-none focus:border-[#0A8BD3] focus:ring-2 focus:ring-[#0A8BD3]/15 bg-white"
                    >
                      {SERVICES_LIST.map((srv) => (
                        <option key={srv.id} value={srv.title}>
                          {srv.number}. {srv.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0B2545] uppercase tracking-wider mb-1">
                      Brief Project Scope or Query (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="e.g. Planning a 200-bed hospital ELV passive cabling and nurse call deployment..."
                      className="w-full px-3.5 py-3 sm:py-2.5 rounded-xl border border-slate-200 text-base sm:text-sm text-slate-800 focus:outline-none focus:border-[#0A8BD3] focus:ring-2 focus:ring-[#0A8BD3]/15 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#0A8BD3] to-[#4FC3F7] text-white text-sm font-semibold shadow-md shadow-[#0A8BD3]/25 hover:shadow-lg hover:shadow-[#0A8BD3]/40 transition-all flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span className="sm:hidden">Submit Request</span>
                        <span className="hidden sm:inline">Submit Infrastructure Proposal Request</span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-center text-slate-400">
                    Your information is held in strict commercial confidence.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
