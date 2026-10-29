import React from 'react';
import { motion } from 'motion/react';
import { ArrowUp, Phone, Mail, MapPin, Globe, Shield, Heart } from 'lucide-react';
import { COMPANY_INFO, SERVICES_LIST } from '../../data/content';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#E8F6FD]/50 border-t border-[#0A8BD3]/15 text-slate-600 pt-16 pb-12 overflow-hidden">
      {/* Animated Network Line along top edge */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#0A8BD3] to-transparent overflow-hidden">
        <motion.div
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
          className="w-1/3 h-full bg-gradient-to-r from-transparent via-[#8DC63F] to-transparent"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#0A8BD3]/15">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4 text-left">
            <a href="#home" className="inline-block focus:outline-none" aria-label="Silicon é Solution Home">
              <img
                src="/assets/aistudio/Silicon_logo_b101dd61.png"
                alt="Silicon é Solution"
                className="h-10 w-auto object-contain hover:opacity-90 transition-opacity"
                style={{ mixBlendMode: 'multiply' }}
              />
            </a>

            <p className="text-xs font-semibold text-[#0A8BD3] uppercase tracking-wider">
              {COMPANY_INFO.tagline}
            </p>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm">
              Providing turnkey solutions for enterprise IT, networking, physical security, datacentres, voice systems, and professional audio-visual architectures across PAN India.
            </p>

            <div className="flex items-center gap-3 pt-2 text-xs text-slate-500 font-mono">
              <span className="w-2 h-2 rounded-full bg-[#8DC63F]" />
              <span>15+ Years Experience</span>
              <span aria-hidden="true">·</span>
              <span>Pune, MH</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-2 space-y-3 text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B2545] font-display">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <a href="#home" className="hover:text-[#0A8BD3] transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#0A8BD3] transition-colors">About Us</a>
              </li>
              <li>
                <a href="#approach" className="hover:text-[#0A8BD3] transition-colors">7-Step Approach</a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#0A8BD3] transition-colors">Our Services</a>
              </li>
              <li>
                <a href="#healthcare" className="hover:text-[#0A8BD3] transition-colors">Healthcare ELV</a>
              </li>
              <li>
                <a href="#education" className="hover:text-[#0A8BD3] transition-colors">Campus AV</a>
              </li>
              <li>
                <a href="#solutions" className="hover:text-[#0A8BD3] transition-colors">Technical Specs</a>
              </li>
              <li>
                <a href="#team" className="hover:text-[#0A8BD3] transition-colors">Leadership</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#0A8BD3] transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          {/* Core Services Breakdown */}
          <div className="lg:col-span-3 space-y-3 text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B2545] font-display">
              Core Capabilities
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>Integrated IT & Networking</li>
              <li>Wireless Campus Wi-Fi 6E</li>
              <li>Datacentre & Enterprise SAN</li>
              <li>IP CCTV Surveillance & UVSS</li>
              <li>Building Management (BMS)</li>
              <li>Life Safety & Integrated FA-PA</li>
              <li>Hospital Nurse Call Systems</li>
              <li>Video Wall & Lecture Capture</li>
              <li>Modular UPS & Power Solutions</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-3 text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B2545] font-display">
              Pune Headquarters
            </h4>
            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#0A8BD3] shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.location}</span>
              </div>
              <div className="flex items-center gap-2.5 font-mono">
                <Phone className="w-4 h-4 text-[#0A8BD3] shrink-0" />
                <span>020 2295 3999 / +91 83800 41202</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#0A8BD3] shrink-0" />
                <span>{COMPANY_INFO.email}</span>
              </div>
              <div className="flex items-center gap-2.5 font-mono text-[#0A8BD3]">
                <Globe className="w-4 h-4 shrink-0" />
                <span>{COMPANY_INFO.website}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Silicon é Solution. All rights reserved. A Complete IT Infrastructure Solution Provider.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#0A8BD3]/20 text-[#0B2545] hover:text-[#0A8BD3] hover:border-[#0A8BD3] transition-colors shadow-2xs cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
