/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/sections/Navbar';
import { Hero } from './components/sections/Hero';
import { StatsAndMarquee } from './components/sections/StatsAndMarquee';
import { AboutUs } from './components/sections/AboutUs';
import { ApproachWheel } from './components/sections/ApproachWheel';
import { ServicesGrid } from './components/sections/ServicesGrid';
import { HealthcareSection } from './components/sections/HealthcareSection';
import { EducationSection } from './components/sections/EducationSection';
import { SolutionsShowcase } from './components/sections/SolutionsShowcase';
import { WhyChooseUs } from './components/sections/WhyChooseUs';
import { ClientsSection } from './components/sections/ClientsSection';
import { TeamSection } from './components/sections/TeamSection';
import { CtaBand } from './components/sections/CtaBand';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/sections/Footer';
import { Preloader } from './components/ui/Preloader';
import { FloatingActions } from './components/ui/FloatingActions';
import { ServiceModal } from './components/ui/ServiceModal';
import { QuoteModal } from './components/ui/QuoteModal';
import { ServiceItem } from './types';

export default function App() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [isQuoteOpen, setIsQuoteOpen] = useState<boolean>(false);
  const [quoteServicePrefill, setQuoteServicePrefill] = useState<string>('');
  const [activeSection, setActiveSection] = useState<string>('home');

  // Lenis Smooth Inertial Scroll (Desktop Mouse Only, disabled on < 1024px and touch devices)
  useEffect(() => {
    let lenis: Lenis | null = null;
    let rafId: number | null = null;

    const setupLenis = () => {
      const isTouch =
        window.matchMedia('(pointer: coarse)').matches ||
        navigator.maxTouchPoints > 0 ||
        'ontouchstart' in window;
      const isSmallScreen = window.innerWidth < 1024;

      if (isTouch || isSmallScreen) {
        if (lenis) {
          lenis.destroy();
          lenis = null;
        }
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
        return;
      }

      if (!lenis) {
        try {
          lenis = new Lenis({
            duration: 1.1,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });

          const raf = (time: number) => {
            lenis?.raf(time);
            rafId = requestAnimationFrame(raf);
          };

          rafId = requestAnimationFrame(raf);
        } catch {
          // Graceful fallback to native scroll
        }
      }
    };

    setupLenis();

    const handleResize = () => {
      setupLenis();
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      if (rafId) cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, []);

  // Section Observer for Active Navigation
  useEffect(() => {
    const sectionIds = [
      'home',
      'about',
      'approach',
      'services',
      'healthcare',
      'education',
      'solutions',
      'clients',
      'team',
      'contact',
    ];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 250;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenQuoteWithService = (serviceTitle: string) => {
    setQuoteServicePrefill(serviceTitle);
    setIsQuoteOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-white text-slate-800 antialiased selection:bg-[#0A8BD3]/20 selection:text-[#0866A8]">
      {/* Brand Preloader */}
      <Preloader />

      {/* Global Top Navbar */}
      <Navbar
        activeSection={activeSection}
        onOpenQuote={() => {
          setQuoteServicePrefill('');
          setIsQuoteOpen(true);
        }}
        onSelectService={(service) => setSelectedService(service)}
      />

      {/* Main Content Flow */}
      <main>
        {/* Hero Section */}
        <Hero
          onOpenQuote={() => {
            setQuoteServicePrefill('');
            setIsQuoteOpen(true);
          }}
        />

        {/* Stats & Trust Marquee */}
        <StatsAndMarquee />

        {/* About Silicon é Solution */}
        <AboutUs
          onOpenQuote={() => {
            setQuoteServicePrefill('');
            setIsQuoteOpen(true);
          }}
        />

        {/* 7-Step Turnkey Approach Wheel (Brochure Page 2) */}
        <ApproachWheel />

        {/* 15 Bento Services (Brochure Page 3) */}
        <ServicesGrid onSelectService={(service) => setSelectedService(service)} />

        {/* Healthcare & Medical College ELV (Brochure Page 4) */}
        <HealthcareSection />

        {/* Campus & Medical College AV Solutions (Brochure Page 5) */}
        <EducationSection />

        {/* Granular Technical Specifications Showcase (Brochure Pages 6 & 7) */}
        <SolutionsShowcase />

        {/* Why Choose Us */}
        <WhyChooseUs />

        {/* Clientele Portfolio (Brochure Page 8) */}
        <ClientsSection />

        {/* Leadership Team (Brochure Page 8) */}
        <TeamSection />

        {/* High Conversion CTA Band */}
        <CtaBand
          onOpenQuote={() => {
            setQuoteServicePrefill('');
            setIsQuoteOpen(true);
          }}
        />

        {/* Contact & Bavdhan Map (Brochure Page 8) */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Direct Actions (WhatsApp & Phone) */}
      <FloatingActions />

      {/* Interactive Service Detail Modal */}
      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onRequestConsultation={handleOpenQuoteWithService}
      />

      {/* Consultation & Quote Modal */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        preselectedService={quoteServicePrefill}
      />
    </div>
  );
}
