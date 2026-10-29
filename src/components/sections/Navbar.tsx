import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu,
  X,
  Phone,
  ArrowUpRight,
  ChevronDown,
  Network,
  Wifi,
  Server,
  Shield,
  MonitorPlay,
  Lock,
  PhoneCall,
  Flame,
  Building2,
  Activity,
  Users,
  Cpu,
  Layers,
  Zap,
  Sun,
  Heart,
  GraduationCap,
  Briefcase,
  Sparkles,
} from 'lucide-react';
import { SERVICES_LIST } from '../../data/content';
import { ServiceItem } from '../../types';

interface NavbarProps {
  onOpenQuote: () => void;
  activeSection: string;
  onSelectService?: (service: ServiceItem) => void;
}

const serviceIcons: Record<string, React.ElementType> = {
  Network,
  Wifi,
  Server,
  Shield,
  MonitorPlay,
  Lock,
  PhoneCall,
  Flame,
  Building2,
  Activity,
  Users,
  Cpu,
  Layers,
  Zap,
  Sun,
};

type MenuType = 'services' | 'industries' | 'company' | null;

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuote, activeSection, onSelectService }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Mobile accordion state
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false);
  const [mobileCompanyOpen, setMobileCompanyOpen] = useState(false);

  // Desktop dropdown state
  const [openMenu, setOpenMenu] = useState<MenuType>(null);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const openTimerRef = useRef<NodeJS.Timeout | null>(null);
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const navRootRef = useRef<HTMLDivElement>(null);

  // Magnetic button state
  const [magnetPos, setMagnetPos] = useState({ x: 0, y: 0 });

  // Scroll listener for height shrink & progress line
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const totalDocHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalDocHeight > 0) {
        setScrollProgress((currentScrollY / totalDocHeight) * 100);
      }
      setIsScrolled(currentScrollY > 40);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close desktop dropdown on Escape or outside click
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenMenu(null);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (navRootRef.current && !navRootRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close mobile menu on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Dropdown hover timing
  const handleDropdownEnter = (menu: 'services' | 'industries' | 'company') => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    if (openMenu) {
      // Switch immediately when moving between open menus
      setOpenMenu(menu);
    } else {
      openTimerRef.current = setTimeout(() => {
        setOpenMenu(menu);
      }, 120);
    }
  };

  const handleDropdownLeave = () => {
    if (openTimerRef.current) {
      clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
    closeTimerRef.current = setTimeout(() => {
      setOpenMenu(null);
    }, 200);
  };

  const handleDropdownToggle = (menu: 'services' | 'industries' | 'company') => {
    setOpenMenu((prev) => (prev === menu ? null : menu));
  };

  const handleServiceClick = (service: ServiceItem) => {
    setOpenMenu(null);
    setMobileMenuOpen(false);
    if (onSelectService) {
      onSelectService(service);
    }
    const servicesEl = document.getElementById('services');
    if (servicesEl) {
      servicesEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavClick = (href: string) => {
    setOpenMenu(null);
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Determine active states for the 6 primary tabs
  const isServicesActive = activeSection === 'services';
  const isIndustriesActive = activeSection === 'healthcare' || activeSection === 'education';
  const isSolutionsActive = activeSection === 'solutions';
  const isApproachActive = activeSection === 'approach';
  const isCompanyActive = activeSection === 'about' || activeSection === 'team' || activeSection === 'clients';
  const isContactActive = activeSection === 'contact';

  // Magnetic button hover handler
  const handleMagnetMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    setMagnetPos({
      x: Math.max(-6, Math.min(6, x * 0.15)),
      y: Math.max(-6, Math.min(6, y * 0.15)),
    });
  };

  const handleMagnetLeave = () => {
    setMagnetPos({ x: 0, y: 0 });
  };

  return (
    <div ref={navRootRef} id="desktop-navbar-root">
      {/* Always-visible sticky header */}
      <header
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-350 ease-out ${
          isScrolled ? 'h-[64px]' : 'h-[76px]'
        }`}
        style={{
          background: isScrolled
            ? 'rgba(214, 234, 248, 0.88)'
            : 'rgba(225, 240, 250, 0.70)',
          backdropFilter: isScrolled
            ? 'blur(20px) saturate(170%)'
            : 'blur(16px)',
          WebkitBackdropFilter: isScrolled
            ? 'blur(20px) saturate(170%)'
            : 'blur(16px)',
          borderBottom: isScrolled
            ? '1px solid rgba(10, 139, 211, 0.16)'
            : 'none',
          boxShadow: isScrolled
            ? '0 10px 40px -16px rgba(11, 37, 69, 0.22)'
            : 'none',
        }}
      >
        <div className="max-w-[1320px] mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* LEFT ZONE: Logo - Transparent, no background box, scrolls to top */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A8BD3] rounded-lg"
            aria-label="Silicon é Solution - Back to top"
          >
            <img
              src="/assets/aistudio/Silicon_logo_b101dd61.png"
              alt="Silicon é Solution"
              className={`w-auto object-contain transition-all duration-350 select-none ${
                isScrolled ? 'h-[34px]' : 'h-[38px]'
              }`}
              style={{ mixBlendMode: 'multiply' }}
            />
          </a>

          {/* CENTER ZONE: Floating Glass Pill with 6 items (desktop ≥ 1024px) */}
          <nav
            onMouseLeave={() => setHoveredTab(null)}
            className="hidden lg:flex items-center relative rounded-full p-1.5 transition-colors duration-300 shrink-0"
            style={{
              background: 'rgba(255, 255, 255, 0.60)',
              border: '1px solid rgba(10, 139, 211, 0.12)',
              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.8), 0 4px 16px -2px rgba(11, 37, 69, 0.05)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
            aria-label="Primary Navigation"
          >
            {/* 1. Services ▾ */}
            <div
              className="relative"
              onMouseEnter={() => handleDropdownEnter('services')}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                type="button"
                aria-expanded={openMenu === 'services'}
                aria-haspopup="true"
                onClick={() => handleDropdownToggle('services')}
                onMouseEnter={() => setHoveredTab('services')}
                className={`relative px-3.5 xl:px-4 py-2 text-[14px] xl:text-[15px] font-medium tracking-[0.01em] transition-colors rounded-full flex items-center gap-1 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A8BD3] whitespace-nowrap ${
                  isServicesActive || openMenu === 'services'
                    ? 'text-[#0A8BD3] font-semibold'
                    : 'text-[#0B2545] hover:text-[#0A8BD3]'
                }`}
              >
                {hoveredTab === 'services' && (
                  <motion.div
                    layoutId="navHoverPill"
                    className="absolute inset-0 rounded-full bg-white/90 shadow-xs border border-white/80 pointer-events-none"
                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                  />
                )}
                <span className="relative z-10">Services</span>
                <ChevronDown
                  className={`relative z-10 w-3.5 h-3.5 transition-transform duration-200 ${
                    openMenu === 'services' ? 'rotate-180 text-[#0A8BD3]' : 'text-slate-500'
                  }`}
                />
                {isServicesActive && (
                  <motion.span
                    layoutId="navActiveDot"
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#8DC63F]"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            </div>

            {/* 2. Industries ▾ */}
            <div
              className="relative"
              onMouseEnter={() => handleDropdownEnter('industries')}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                type="button"
                aria-expanded={openMenu === 'industries'}
                aria-haspopup="true"
                onClick={() => handleDropdownToggle('industries')}
                onMouseEnter={() => setHoveredTab('industries')}
                className={`relative px-3.5 xl:px-4 py-2 text-[14px] xl:text-[15px] font-medium tracking-[0.01em] transition-colors rounded-full flex items-center gap-1 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A8BD3] whitespace-nowrap ${
                  isIndustriesActive || openMenu === 'industries'
                    ? 'text-[#0A8BD3] font-semibold'
                    : 'text-[#0B2545] hover:text-[#0A8BD3]'
                }`}
              >
                {hoveredTab === 'industries' && (
                  <motion.div
                    layoutId="navHoverPill"
                    className="absolute inset-0 rounded-full bg-white/90 shadow-xs border border-white/80 pointer-events-none"
                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                  />
                )}
                <span className="relative z-10">Industries</span>
                <ChevronDown
                  className={`relative z-10 w-3.5 h-3.5 transition-transform duration-200 ${
                    openMenu === 'industries' ? 'rotate-180 text-[#0A8BD3]' : 'text-slate-500'
                  }`}
                />
                {isIndustriesActive && (
                  <motion.span
                    layoutId="navActiveDot"
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#8DC63F]"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            </div>

            {/* 3. Solutions */}
            <a
              href="#solutions"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#solutions');
              }}
              onMouseEnter={() => {
                setHoveredTab('solutions');
                if (openMenu) setOpenMenu(null);
              }}
              className={`relative px-3.5 xl:px-4 py-2 text-[14px] xl:text-[15px] font-medium tracking-[0.01em] transition-colors rounded-full cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A8BD3] whitespace-nowrap ${
                isSolutionsActive ? 'text-[#0A8BD3] font-semibold' : 'text-[#0B2545] hover:text-[#0A8BD3]'
              }`}
            >
              {hoveredTab === 'solutions' && (
                <motion.div
                  layoutId="navHoverPill"
                  className="absolute inset-0 rounded-full bg-white/90 shadow-xs border border-white/80 pointer-events-none"
                  transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                />
              )}
              <span className="relative z-10">Solutions</span>
              {isSolutionsActive && (
                <motion.span
                  layoutId="navActiveDot"
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#8DC63F]"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </a>

            {/* 4. Approach */}
            <a
              href="#approach"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#approach');
              }}
              onMouseEnter={() => {
                setHoveredTab('approach');
                if (openMenu) setOpenMenu(null);
              }}
              className={`relative px-3.5 xl:px-4 py-2 text-[14px] xl:text-[15px] font-medium tracking-[0.01em] transition-colors rounded-full cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A8BD3] whitespace-nowrap ${
                isApproachActive ? 'text-[#0A8BD3] font-semibold' : 'text-[#0B2545] hover:text-[#0A8BD3]'
              }`}
            >
              {hoveredTab === 'approach' && (
                <motion.div
                  layoutId="navHoverPill"
                  className="absolute inset-0 rounded-full bg-white/90 shadow-xs border border-white/80 pointer-events-none"
                  transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                />
              )}
              <span className="relative z-10">Approach</span>
              {isApproachActive && (
                <motion.span
                  layoutId="navActiveDot"
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#8DC63F]"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </a>

            {/* 5. Company ▾ */}
            <div
              className="relative"
              onMouseEnter={() => handleDropdownEnter('company')}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                type="button"
                aria-expanded={openMenu === 'company'}
                aria-haspopup="true"
                onClick={() => handleDropdownToggle('company')}
                onMouseEnter={() => setHoveredTab('company')}
                className={`relative px-3.5 xl:px-4 py-2 text-[14px] xl:text-[15px] font-medium tracking-[0.01em] transition-colors rounded-full flex items-center gap-1 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A8BD3] whitespace-nowrap ${
                  isCompanyActive || openMenu === 'company'
                    ? 'text-[#0A8BD3] font-semibold'
                    : 'text-[#0B2545] hover:text-[#0A8BD3]'
                }`}
              >
                {hoveredTab === 'company' && (
                  <motion.div
                    layoutId="navHoverPill"
                    className="absolute inset-0 rounded-full bg-white/90 shadow-xs border border-white/80 pointer-events-none"
                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                  />
                )}
                <span className="relative z-10">Company</span>
                <ChevronDown
                  className={`relative z-10 w-3.5 h-3.5 transition-transform duration-200 ${
                    openMenu === 'company' ? 'rotate-180 text-[#0A8BD3]' : 'text-slate-500'
                  }`}
                />
                {isCompanyActive && (
                  <motion.span
                    layoutId="navActiveDot"
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#8DC63F]"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            </div>

            {/* 6. Contact */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contact');
              }}
              onMouseEnter={() => {
                setHoveredTab('contact');
                if (openMenu) setOpenMenu(null);
              }}
              className={`relative px-3.5 xl:px-4 py-2 text-[14px] xl:text-[15px] font-medium tracking-[0.01em] transition-colors rounded-full cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A8BD3] whitespace-nowrap ${
                isContactActive ? 'text-[#0A8BD3] font-semibold' : 'text-[#0B2545] hover:text-[#0A8BD3]'
              }`}
            >
              {hoveredTab === 'contact' && (
                <motion.div
                  layoutId="navHoverPill"
                  className="absolute inset-0 rounded-full bg-white/90 shadow-xs border border-white/80 pointer-events-none"
                  transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                />
              )}
              <span className="relative z-10">Contact</span>
              {isContactActive && (
                <motion.span
                  layoutId="navActiveDot"
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#8DC63F]"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </a>
          </nav>

          {/* RIGHT ZONE: Expanding Glass Phone Button + Magnetic Get a Quote */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            {/* Phone button: 44px round glass; on desktop hover expands smoothly to show number */}
            <a
              href="tel:02022953999"
              aria-label="Call Silicon é Solution at 020 2295 3999"
              className="relative h-11 w-11 xl:hover:w-[178px] rounded-full border border-[#0A8BD3]/25 bg-white/70 hover:bg-white shadow-xs flex items-center justify-center text-[#0A8BD3] overflow-hidden transition-all duration-300 group cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A8BD3]"
            >
              <div className="flex items-center px-3.5 gap-2 whitespace-nowrap">
                <Phone className="w-4 h-4 shrink-0 text-[#0A8BD3] transition-transform duration-200 group-hover:scale-110" />
                <span className="hidden xl:inline-block max-w-0 opacity-0 group-hover:max-w-[130px] group-hover:opacity-100 font-mono text-xs font-bold text-[#0B2545] transition-all duration-300 overflow-hidden">
                  020 2295 3999
                </span>
              </div>
            </a>

            {/* "Get a Quote" gradient pill button with sheen & magnetic pull */}
            <motion.button
              type="button"
              onClick={onOpenQuote}
              onMouseMove={handleMagnetMove}
              onMouseLeave={handleMagnetLeave}
              animate={{ x: magnetPos.x, y: magnetPos.y }}
              transition={{ type: 'spring', stiffness: 350, damping: 20 }}
              className="relative group px-5 py-2.5 rounded-full bg-gradient-to-r from-[#0A8BD3] via-[#1597E5] to-[#4FC3F7] text-white text-[14px] font-semibold shadow-md shadow-[#0A8BD3]/25 hover:shadow-lg hover:shadow-[#0A8BD3]/40 active:scale-[0.98] transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A8BD3]"
            >
              {/* Light sheen sweeping across on hover */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none" />

              <span className="relative z-10">Get a Quote</span>
              <ArrowUpRight className="relative z-10 w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </motion.button>
          </div>

          {/* MOBILE / TABLET HEADER CONTROLS (< 1024px) */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenQuote}
              className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#0A8BD3] to-[#4FC3F7] text-white text-xs font-semibold sm:hidden cursor-pointer shadow-xs active:scale-95 transition-transform"
            >
              Quote
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              className="w-10 h-10 rounded-full border border-[#0A8BD3]/25 flex items-center justify-center text-[#0B2545] hover:text-[#0A8BD3] transition-colors cursor-pointer bg-white/80 shadow-xs"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* 2px Gradient Scroll Progress Bar along the BOTTOM edge */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-transparent pointer-events-none overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#0A8BD3] via-[#4FC3F7] to-[#8DC63F] transition-all duration-75"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </header>

      {/* DESKTOP MEGA MENUS / DROPDOWNS (≥ 1024px) */}
      <div
        className="hidden lg:block fixed left-0 right-0 z-[999] pointer-events-none"
        style={{ top: isScrolled ? '68px' : '80px' }}
      >
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          <AnimatePresence mode="wait">
            {openMenu && (
              <motion.div
                key={openMenu}
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.98 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => {
                  if (closeTimerRef.current) {
                    clearTimeout(closeTimerRef.current);
                    closeTimerRef.current = null;
                  }
                }}
                onMouseLeave={handleDropdownLeave}
                className="absolute pointer-events-auto rounded-[20px] p-6 text-[#0B2545] select-none"
                style={{
                  background: 'rgba(255, 255, 255, 0.94)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(10, 139, 211, 0.14)',
                  boxShadow: '0 30px 80px -20px rgba(11, 37, 69, 0.25)',
                  left:
                    openMenu === 'services'
                      ? '50%'
                      : openMenu === 'industries'
                      ? '42%'
                      : '52%',
                  transform: 'translateX(-50%)',
                  width:
                    openMenu === 'services'
                      ? 'min(880px, calc(100vw - 32px))'
                      : openMenu === 'industries'
                      ? 'min(640px, calc(100vw - 32px))'
                      : 'min(380px, calc(100vw - 32px))',
                }}
              >
                {/* 1. SERVICES MEGA MENU (15 Services across 3 columns + Right featured card) */}
                {openMenu === 'services' && (
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* 3 Columns of Services (5 per column) */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-2.5">
                      {SERVICES_LIST.map((service, idx) => {
                        const IconComponent = serviceIcons[service.iconName] || Network;
                        return (
                          <motion.button
                            key={service.id}
                            type="button"
                            onClick={() => handleServiceClick(service)}
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.02 }}
                            className="group/item flex items-start gap-2.5 p-2 rounded-xl text-left hover:bg-[#EBF5FB] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A8BD3]"
                          >
                            <div className="w-8 h-8 rounded-lg bg-[#0A8BD3]/10 text-[#0A8BD3] flex items-center justify-center shrink-0 group-hover/item:bg-[#0A8BD3] group-hover/item:text-white transition-colors mt-0.5">
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-[13px] font-bold text-[#0B2545] group-hover/item:text-[#0A8BD3] transition-colors leading-snug line-clamp-1">
                                {service.title}
                              </div>
                              <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                                {service.shortDesc}
                              </p>
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>

                    {/* Right Featured Card: Turnkey Delivery */}
                    <div className="w-full lg:w-[230px] shrink-0 rounded-2xl bg-gradient-to-br from-[#0B2545] via-[#11325c] to-[#0A8BD3] p-5 text-white flex flex-col justify-between shadow-md relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#4FC3F7]/10 rounded-full blur-xl pointer-events-none" />

                      <div className="relative z-10">
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#8DC63F]/20 text-[#8DC63F] border border-[#8DC63F]/30 text-[10px] font-bold uppercase tracking-wider mb-3">
                          <Sparkles className="w-3 h-3" />
                          <span>Turnkey Execution</span>
                        </div>

                        <h4 className="text-[15px] font-extrabold leading-snug font-display">
                          Turnkey Delivery — Design to Handover
                        </h4>
                        <p className="text-xs text-slate-200/90 mt-2 leading-relaxed">
                          Single-point accountability from engineering drawings to tested ELV commissioning and post-sale AMC.
                        </p>
                      </div>

                      <div className="relative z-10 pt-4 mt-4 border-t border-white/10">
                        <button
                          type="button"
                          onClick={() => {
                            setOpenMenu(null);
                            onOpenQuote();
                          }}
                          className="w-full py-2.5 px-3 rounded-xl bg-white text-[#0B2545] hover:bg-[#8DC63F] hover:text-white transition-colors text-xs font-bold shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <span>Free Consultation</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. INDUSTRIES MENU (2 Large Cards + Sector Tags) */}
                {openMenu === 'industries' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Card 1: Healthcare & Hospitals */}
                      <a
                        href="#healthcare"
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick('#healthcare');
                        }}
                        className="group relative rounded-2xl overflow-hidden border border-[#0A8BD3]/20 shadow-sm hover:shadow-md transition-all cursor-pointer block h-[180px]"
                      >
                        <img
                          src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80"
                          alt="Healthcare & Hospitals"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B2545] via-[#0B2545]/70 to-transparent p-4 flex flex-col justify-end text-white">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[11px] font-bold text-[#4FC3F7] uppercase tracking-wider flex items-center gap-1">
                              <Heart className="w-3 h-3 text-red-400 fill-red-400" />
                              Brochure Page 4
                            </span>
                            <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </div>
                          <h4 className="text-[16px] font-bold">Healthcare & Hospitals</h4>
                          <p className="text-[11px] text-slate-200 mt-0.5 line-clamp-1">
                            Critical Care ELV, OT Integration & IP Nurse Calling
                          </p>
                        </div>
                      </a>

                      {/* Card 2: Medical Colleges & Education */}
                      <a
                        href="#education"
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick('#education');
                        }}
                        className="group relative rounded-2xl overflow-hidden border border-[#0A8BD3]/20 shadow-sm hover:shadow-md transition-all cursor-pointer block h-[180px]"
                      >
                        <img
                          src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=600&q=80"
                          alt="Medical Colleges & Education"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B2545] via-[#0B2545]/70 to-transparent p-4 flex flex-col justify-end text-white">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[11px] font-bold text-[#8DC63F] uppercase tracking-wider flex items-center gap-1">
                              <GraduationCap className="w-3.5 h-3.5" />
                              Brochure Page 5
                            </span>
                            <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </div>
                          <h4 className="text-[16px] font-bold">Medical Colleges & Education</h4>
                          <p className="text-[11px] text-slate-200 mt-0.5 line-clamp-1">
                            Auditoriums, Multi-Screen Demo Rooms & Lecture Halls
                          </p>
                        </div>
                      </a>
                    </div>

                    {/* Small links: Government & Commercial */}
                    <div className="pt-3 border-t border-[#0A8BD3]/10 flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-4 text-slate-600">
                        <span className="font-semibold text-[#0B2545]">Other Verticals:</span>
                        <a
                          href="#solutions"
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavClick('#solutions');
                          }}
                          className="hover:text-[#0A8BD3] font-medium transition-colors flex items-center gap-1"
                        >
                          <Building2 className="w-3.5 h-3.5 text-[#0A8BD3]" />
                          <span>Government & Defence</span>
                        </a>
                        <a
                          href="#solutions"
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavClick('#solutions');
                          }}
                          className="hover:text-[#0A8BD3] font-medium transition-colors flex items-center gap-1"
                        >
                          <Briefcase className="w-3.5 h-3.5 text-[#0A8BD3]" />
                          <span>Commercial & Construction</span>
                        </a>
                      </div>
                      <a
                        href="#solutions"
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick('#solutions');
                        }}
                        className="text-[#0A8BD3] font-semibold hover:underline flex items-center gap-1"
                      >
                        <span>Explore all technical specs</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                )}

                {/* 3. COMPANY MENU (About Us, Our Team, Our Clients) */}
                {openMenu === 'company' && (
                  <div className="space-y-1">
                    <a
                      href="#about"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick('#about');
                      }}
                      className="group flex items-start gap-3 p-3 rounded-xl hover:bg-[#EBF5FB] transition-all cursor-pointer"
                    >
                      <div className="w-9 h-9 rounded-lg bg-[#0A8BD3]/10 text-[#0A8BD3] flex items-center justify-center shrink-0 group-hover:bg-[#0A8BD3] group-hover:text-white transition-colors">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#0B2545] group-hover:text-[#0A8BD3] transition-colors flex items-center gap-1">
                          <span>About Us</span>
                          <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          15+ years of IT & ELV infrastructure excellence across India.
                        </p>
                      </div>
                    </a>

                    <a
                      href="#team"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick('#team');
                      }}
                      className="group flex items-start gap-3 p-3 rounded-xl hover:bg-[#EBF5FB] transition-all cursor-pointer"
                    >
                      <div className="w-9 h-9 rounded-lg bg-[#0A8BD3]/10 text-[#0A8BD3] flex items-center justify-center shrink-0 group-hover:bg-[#0A8BD3] group-hover:text-white transition-colors">
                        <Users className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#0B2545] group-hover:text-[#0A8BD3] transition-colors flex items-center gap-1">
                          <span>Our Team</span>
                          <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Experienced leadership and certified engineering specialists.
                        </p>
                      </div>
                    </a>

                    <a
                      href="#clients"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick('#clients');
                      }}
                      className="group flex items-start gap-3 p-3 rounded-xl hover:bg-[#EBF5FB] transition-all cursor-pointer"
                    >
                      <div className="w-9 h-9 rounded-lg bg-[#0A8BD3]/10 text-[#0A8BD3] flex items-center justify-center shrink-0 group-hover:bg-[#0A8BD3] group-hover:text-white transition-colors">
                        <Shield className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#0B2545] group-hover:text-[#0A8BD3] transition-colors flex items-center gap-1">
                          <span>Our Clients</span>
                          <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Trusted by 250+ hospitals, universities & government bodies.
                        </p>
                      </div>
                    </a>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* MOBILE DRAWER MENU (< 1024px) with Accordions */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className={`fixed inset-x-0 bottom-0 z-[999] overflow-y-auto px-6 pt-6 pb-6 flex flex-col justify-between transition-all duration-300 lg:hidden ${
              isScrolled ? 'top-[64px] h-[calc(100dvh-64px)]' : 'top-[76px] h-[calc(100dvh-76px)]'
            }`}
            style={{
              background: 'rgba(214, 234, 248, 0.98)',
              backdropFilter: 'blur(20px) saturate(170%)',
              WebkitBackdropFilter: 'blur(20px) saturate(170%)',
              borderBottom: '1px solid rgba(10, 139, 211, 0.18)',
            }}
          >
            {/* Navigation links with accordions and 14px padding */}
            <div className="flex flex-col space-y-0.5">
              {/* 1. Services Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className={`w-full py-[14px] text-lg font-bold font-display flex items-center justify-between text-left transition-colors cursor-pointer ${
                    isServicesActive ? 'text-[#0A8BD3]' : 'text-[#0B2545]'
                  }`}
                >
                  <span>Services</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-200 ${
                      mobileServicesOpen ? 'rotate-180 text-[#0A8BD3]' : 'text-slate-500'
                    }`}
                  />
                </button>
                {mobileServicesOpen && (
                  <div className="pl-3 pb-3 space-y-2 border-l-2 border-[#0A8BD3]/30 ml-2">
                    {SERVICES_LIST.map((service) => (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => handleServiceClick(service)}
                        className="block w-full py-1 text-left text-sm font-medium text-slate-700 hover:text-[#0A8BD3] transition-colors"
                      >
                        <span className="font-mono text-xs text-[#0A8BD3] mr-2">{service.number}</span>
                        {service.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 2. Industries Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setMobileIndustriesOpen(!mobileIndustriesOpen)}
                  className={`w-full py-[14px] text-lg font-bold font-display flex items-center justify-between text-left transition-colors cursor-pointer ${
                    isIndustriesActive ? 'text-[#0A8BD3]' : 'text-[#0B2545]'
                  }`}
                >
                  <span>Industries</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-200 ${
                      mobileIndustriesOpen ? 'rotate-180 text-[#0A8BD3]' : 'text-slate-500'
                    }`}
                  />
                </button>
                {mobileIndustriesOpen && (
                  <div className="pl-3 pb-3 space-y-2 border-l-2 border-[#0A8BD3]/30 ml-2">
                    <button
                      type="button"
                      onClick={() => handleNavClick('#healthcare')}
                      className="block w-full py-1 text-left text-sm font-medium text-slate-700 hover:text-[#0A8BD3]"
                    >
                      Healthcare & Hospitals
                    </button>
                    <button
                      type="button"
                      onClick={() => handleNavClick('#education')}
                      className="block w-full py-1 text-left text-sm font-medium text-slate-700 hover:text-[#0A8BD3]"
                    >
                      Medical Colleges & Education
                    </button>
                    <button
                      type="button"
                      onClick={() => handleNavClick('#solutions')}
                      className="block w-full py-1 text-left text-sm font-medium text-slate-700 hover:text-[#0A8BD3]"
                    >
                      Government & Defence
                    </button>
                    <button
                      type="button"
                      onClick={() => handleNavClick('#solutions')}
                      className="block w-full py-1 text-left text-sm font-medium text-slate-700 hover:text-[#0A8BD3]"
                    >
                      Commercial & Construction
                    </button>
                  </div>
                )}
              </div>

              {/* 3. Solutions */}
              <button
                type="button"
                onClick={() => handleNavClick('#solutions')}
                className={`w-full py-[14px] text-lg font-bold font-display text-left transition-colors cursor-pointer ${
                  isSolutionsActive ? 'text-[#0A8BD3]' : 'text-[#0B2545]'
                }`}
              >
                Solutions
              </button>

              {/* 4. Approach */}
              <button
                type="button"
                onClick={() => handleNavClick('#approach')}
                className={`w-full py-[14px] text-lg font-bold font-display text-left transition-colors cursor-pointer ${
                  isApproachActive ? 'text-[#0A8BD3]' : 'text-[#0B2545]'
                }`}
              >
                Approach
              </button>

              {/* 5. Company Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setMobileCompanyOpen(!mobileCompanyOpen)}
                  className={`w-full py-[14px] text-lg font-bold font-display flex items-center justify-between text-left transition-colors cursor-pointer ${
                    isCompanyActive ? 'text-[#0A8BD3]' : 'text-[#0B2545]'
                  }`}
                >
                  <span>Company</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-200 ${
                      mobileCompanyOpen ? 'rotate-180 text-[#0A8BD3]' : 'text-slate-500'
                    }`}
                  />
                </button>
                {mobileCompanyOpen && (
                  <div className="pl-3 pb-3 space-y-2 border-l-2 border-[#0A8BD3]/30 ml-2">
                    <button
                      type="button"
                      onClick={() => handleNavClick('#about')}
                      className="block w-full py-1 text-left text-sm font-medium text-slate-700 hover:text-[#0A8BD3]"
                    >
                      About Us
                    </button>
                    <button
                      type="button"
                      onClick={() => handleNavClick('#team')}
                      className="block w-full py-1 text-left text-sm font-medium text-slate-700 hover:text-[#0A8BD3]"
                    >
                      Our Team
                    </button>
                    <button
                      type="button"
                      onClick={() => handleNavClick('#clients')}
                      className="block w-full py-1 text-left text-sm font-medium text-slate-700 hover:text-[#0A8BD3]"
                    >
                      Our Clients
                    </button>
                  </div>
                )}
              </div>

              {/* 6. Contact */}
              <button
                type="button"
                onClick={() => handleNavClick('#contact')}
                className={`w-full py-[14px] text-lg font-bold font-display text-left transition-colors cursor-pointer ${
                  isContactActive ? 'text-[#0A8BD3]' : 'text-[#0B2545]'
                }`}
              >
                Contact
              </button>
            </div>

            {/* Bottom Actions: Request Proposal & Direct Call */}
            <div className="pt-6 shrink-0">
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenQuote();
                  }}
                  className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-[#0A8BD3] to-[#4FC3F7] text-white text-sm font-semibold text-center cursor-pointer shadow-md shadow-[#0A8BD3]/25 active:scale-[0.98] transition-transform"
                >
                  Request Proposal
                </button>
                <a
                  href="tel:02022953999"
                  className="w-12 h-12 rounded-xl bg-white/80 border border-[#0A8BD3]/25 text-[#0A8BD3] flex items-center justify-center shrink-0 shadow-xs active:scale-95 transition-transform"
                  aria-label="Call direct"
                >
                  <Phone className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
