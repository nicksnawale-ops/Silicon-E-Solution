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
import { ServicesPage } from './pages/ServicesPage';
import { AboutPage } from './pages/AboutPage';
import { usePathname, navigate, scrollToHash } from './lib/router';
import { lenisRef } from './lib/lenis';

export default function App() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [isQuoteOpen, setIsQuoteOpen] = useState<boolean>(false);
  const [quoteServicePrefill, setQuoteServicePrefill] = useState<string>('');
  const [activeSection, setActiveSection] = useState<string>('home');
  const pathname = usePathname();
  const route = pathname.replace(/\/+$/, '') || '/';
  const isServicesPage = route === '/services';
  const isAboutPage = route === '/about';
  const isSubPage = isServicesPage || isAboutPage;

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
          lenisRef.current = null;
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
          lenisRef.current = lenis;

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
      lenisRef.current = null;
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
      if ((window.location.pathname.replace(/\/+$/, '') || '/') !== '/') return;
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

  // Page changes: jump to the top, or to the requested section ("/#contact").
  useEffect(() => {
    const { hash } = window.location;
    if (hash) {
      scrollToHash(hash);
    } else {
      lenisRef.current?.scrollTo(0, { immediate: true });
      window.scrollTo(0, 0);
    }
    if (isServicesPage) setActiveSection('services');
    if (isAboutPage) setActiveSection('about');
  }, [pathname, isServicesPage, isAboutPage]);

  // Internal page links (<a href="/about">, "/services", "/#contact") navigate without a full reload.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.('a[href^="/"]') as HTMLAnchorElement | null;
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank') return;
      const href = a.getAttribute('href') || '';
      if (href.startsWith('//') || /\.[a-z0-9]+($|[?#])/i.test(href.split('#')[0])) return;
      e.preventDefault();
      navigate(href);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  // On sub-pages, in-page "#section" links (footer, CTAs) go back to the home page section.
  useEffect(() => {
    if (!isSubPage) return;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey) return;
      e.preventDefault();
      navigate('/' + a.getAttribute('href'));
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [isSubPage]);

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
        {isAboutPage ? (
          <AboutPage
            onOpenQuote={() => {
              setQuoteServicePrefill('');
              setIsQuoteOpen(true);
            }}
          />
        ) : isServicesPage ? (
          <ServicesPage
            onSelectService={(service) => setSelectedService(service)}
            onOpenQuote={() => {
              setQuoteServicePrefill('');
              setIsQuoteOpen(true);
            }}
          />
        ) : (
          <>
            {/* Hero Section */}
            <Hero
              onOpenQuote={() => {
                setQuoteServicePrefill('');
                setIsQuoteOpen(true);
              }}
            />

            {/* Stats & Trust Marquee */}
            <StatsAndMarquee />

            {/* About Silicon e Solution */}
            <AboutUs
              onOpenQuote={() => {
                setQuoteServicePrefill('');
                setIsQuoteOpen(true);
              }}
            />

            {/* 7-Step Turnkey Approach Wheel */}
            <ApproachWheel />

            {/* 15 Bento Services */}
            <ServicesGrid onSelectService={(service) => setSelectedService(service)} />

            {/* Healthcare & Medical College ELV */}
            <HealthcareSection />

            {/* Campus & Medical College AV Solutions */}
            <EducationSection />

            {/* Granular Technical Specifications Showcase */}
            <SolutionsShowcase />

            {/* Why Choose Us */}
            <WhyChooseUs />

            {/* Clientele Portfolio */}
            <ClientsSection />

            {/* Leadership Team */}
            <TeamSection />

            {/* High Conversion CTA Band */}
            <CtaBand
              onOpenQuote={() => {
                setQuoteServicePrefill('');
                setIsQuoteOpen(true);
              }}
            />

            {/* Contact & Bavdhan Map */}
            <ContactSection />
          </>
        )}
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
        onNavigate={(service) => setSelectedService(service)}
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
