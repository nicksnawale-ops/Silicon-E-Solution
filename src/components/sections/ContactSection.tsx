import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  Send,
  CheckCircle2,
  Building,
  ShieldCheck,
} from 'lucide-react';
import { COMPANY_INFO, SERVICES_LIST } from '../../data/content';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    organisation: '',
    email: '',
    phone: '',
    service: SERVICES_LIST[0]?.title || '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.organisation.trim()) newErrors.organisation = 'Organisation is required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Valid corporate email is required';
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
    <section id="contact" className="relative py-20 lg:py-28 surface-ice surface-ice--dots overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0A8BD3] mb-2">
            <span>Pune Corporate Office</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B2545] font-display tracking-tight">
            Connect With Our Engineering Team
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
            Reach out directly to discuss new campus tenders, hospital ELV packages, server room buildouts, or AMC contracts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Office Details & Embedded Map */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-[#0A8BD3]/20 shadow-sm space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-[#E8F6FD] border border-[#0A8BD3]/20 text-[#0A8BD3] flex items-center justify-center">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0B2545] font-display">
                    Silicon e Solution
                  </h3>
                  <p className="text-xs text-slate-500 font-mono">
                    PAN India Turnkey Operations
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#F6FAFD] text-[#0A8BD3] border border-[#0A8BD3]/15 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-xs font-bold uppercase text-[#0B2545]">
                    Headquarters Address
                  </span>
                  <p className="text-xs sm:text-sm text-slate-600 mt-0.5 leading-relaxed">
                    {COMPANY_INFO.location}
                  </p>
                </div>
              </div>

              {/* Phone Numbers */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#F6FAFD] text-[#0A8BD3] border border-[#0A8BD3]/15 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-xs font-bold uppercase text-[#0B2545]">
                    Phone Desk
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 font-mono mt-0.5">
                    <a href="tel:02022953999" className="hover:text-[#0A8BD3] transition-colors">
                      {COMPANY_INFO.phones[0]}
                    </a>
                    {' · '}
                    <a href="tel:+918380041202" className="hover:text-[#0A8BD3] transition-colors">
                      {COMPANY_INFO.phones[1]}
                    </a>
                  </p>
                </div>
              </div>

              {/* Website */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#F6FAFD] text-[#0A8BD3] border border-[#0A8BD3]/15 flex items-center justify-center shrink-0 mt-0.5">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-xs font-bold uppercase text-[#0B2545]">
                    Official Portal
                  </span>
                  <p className="text-xs sm:text-sm text-[#0A8BD3] font-mono mt-0.5">
                    {COMPANY_INFO.website}
                  </p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-3.5 pt-2 border-t border-slate-100">
                <div className="w-9 h-9 rounded-xl bg-[#8DC63F]/15 text-[#679927] flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-xs font-bold uppercase text-[#0B2545]">
                    Operations Schedule
                  </span>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Monday to Saturday · 9:30 AM to 6:30 PM IST (24/7 AMC Emergency Dispatch)
                  </p>
                </div>
              </div>
            </div>

            {/* Embedded Google Map (Bavdhan, Pune) */}
            <div className="rounded-3xl overflow-hidden border border-[#0A8BD3]/20 shadow-md h-56 bg-slate-100">
              <iframe
                title="Silicon e Solution Location Bavdhan Pune"
                src={COMPANY_INFO.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right Column: Glass Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="glass-card p-6 sm:p-10 rounded-3xl border border-[#0A8BD3]/20 shadow-lg text-left">
              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0A8BD3] block mb-1">
                  Project Request & Technical Tender Inquiries
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0B2545] font-display">
                  Initiate Infrastructure Assessment
                </h3>
              </div>

              {isSuccess ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-[#8DC63F]/15 border-2 border-[#8DC63F] flex items-center justify-center text-[#8DC63F]">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-xl font-bold text-[#0B2545] font-display">
                    Thank You for Your Inquiry!
                  </h4>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Your request regarding <strong className="text-[#0A8BD3]">{formData.service}</strong> has been logged. Our pre-sales engineering desk at Bavdhan, Pune will review the scope and contact you promptly.
                  </p>
                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      setFormData({
                        name: '',
                        organisation: '',
                        email: '',
                        phone: '',
                        service: SERVICES_LIST[0]?.title || '',
                        message: '',
                      });
                    }}
                    className="px-6 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#0B2545] uppercase tracking-wider mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Anand Deshmukh"
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-800 focus:outline-none transition-colors ${
                          errors.name
                            ? 'border-red-400 bg-red-50/20'
                            : 'border-slate-200 focus:border-[#0A8BD3] focus:ring-2 focus:ring-[#0A8BD3]/15'
                        }`}
                      />
                      {errors.name && <p className="text-[11px] text-red-500 mt-0.5">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#0B2545] uppercase tracking-wider mb-1">
                        Organisation / Institution *
                      </label>
                      <input
                        type="text"
                        value={formData.organisation}
                        onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
                        placeholder="e.g. Pune Health Campus"
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-800 focus:outline-none transition-colors ${
                          errors.organisation
                            ? 'border-red-400 bg-red-50/20'
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
                        Work Email *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="anand@punehealth.edu"
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-800 focus:outline-none transition-colors ${
                          errors.email
                            ? 'border-red-400 bg-red-50/20'
                            : 'border-slate-200 focus:border-[#0A8BD3] focus:ring-2 focus:ring-[#0A8BD3]/15'
                        }`}
                      />
                      {errors.email && <p className="text-[11px] text-red-500 mt-0.5">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#0B2545] uppercase tracking-wider mb-1">
                        Direct Phone / Mobile *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98220 12345"
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-800 focus:outline-none transition-colors ${
                          errors.phone
                            ? 'border-red-400 bg-red-50/20'
                            : 'border-slate-200 focus:border-[#0A8BD3] focus:ring-2 focus:ring-[#0A8BD3]/15'
                        }`}
                      />
                      {errors.phone && <p className="text-[11px] text-red-500 mt-0.5">{errors.phone}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0B2545] uppercase tracking-wider mb-1">
                      Target Solution / Vertical
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:border-[#0A8BD3] focus:ring-2 focus:ring-[#0A8BD3]/15 bg-white"
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
                      Project Notes / Timeline
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share details on your site location, timeline, or required SITC scope..."
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:border-[#0A8BD3] focus:ring-2 focus:ring-[#0A8BD3]/15 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#0A8BD3] to-[#4FC3F7] text-white text-sm font-semibold shadow-md shadow-[#0A8BD3]/25 hover:shadow-lg hover:shadow-[#0A8BD3]/40 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Engineering Inquiry</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 text-center">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#8DC63F]" />
                    <span>Confidentiality Guaranteed · Fast Technical Response</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
