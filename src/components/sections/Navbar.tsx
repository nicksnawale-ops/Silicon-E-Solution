import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useMotionValueEvent,
} from 'motion/react';
import {
  Menu,
  X,
  Phone,
  ArrowUpRight,
  ArrowRight,
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
  Award,
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

type DropdownKey = 'services' | 'industries' | 'company';
type TabKey = DropdownKey | 'solutions' | 'approach' | 'contact';

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Preferred panel width per dropdown (clamped to the viewport at runtime). */
const PANEL_WIDTH: Record<DropdownKey, number> = {
  services: 980,
  industries: 660,
  company: 400,
};

const SERVICE_GROUPS: { key: ServiceItem['category']; label: string }[] = [
  { key: 'core', label: 'Core IT & AV' },
  { key: 'specialized', label: 'Life Safety & BMS' },
  { key: 'infrastructure', label: 'Passive & Power' },
];

const TABS: { key: TabKey; label: string; href?: string; dropdown?: boolean }[] = [
  // Ordered to match the page: About → Approach → Services → Healthcare/Education → Solutions → Clients/Team → Contact
  { key: 'company', label: 'Company', dropdown: true },
  { key: 'approach', label: 'Approach', href: '#approach' },
  { key: 'services', label: 'Services', dropdown: true },
  { key: 'industries', label: 'Industries', dropdown: true },
  { key: 'solutions', label: 'Solutions', href: '#solutions' },
  { key: 'contact', label: 'Contact', href: '#contact' },
];

/** Maps the scroll-spy section id to the top-level tab that owns it. */
const sectionToTab = (section: string): TabKey | null => {
  switch (section) {
    case 'services':
      return 'services';
    case 'healthcare':
    case 'education':
      return 'industries';
    case 'solutions':
      return 'solutions';
    case 'approach':
      return 'approach';
    case 'about':
    case 'team':
    case 'clients':
      return 'company';
    case 'contact':
      return 'contact';
    default:
      return null;
  }
};

interface PanelGeometry {
  left: number;
  width: number;
  notch: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuote, activeSection, onSelectService }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Mobile accordion state
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false);
  const [mobileCompanyOpen, setMobileCompanyOpen] = useState(false);

  // Desktop dropdown state
  const [openMenu, setOpenMenu] = useState<DropdownKey | null>(null);
  const openMenuRef = useRef<DropdownKey | null>(null);
  openMenuRef.current = openMenu;
  const [panelGeom, setPanelGeom] = useState<PanelGeometry>({ left: 0, width: 0, notch: 0 });
  const [hoveredTab, setHoveredTab] = useState<TabKey | null>(null);
  const openTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRootRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<Partial<Record<DropdownKey, HTMLButtonElement | null>>>({});

  // Magnetic button state
  const [magnetPos, setMagnetPos] = useState({ x: 0, y: 0 });

  // Scroll state driven by motion values: no React re-render per scroll frame.
  const { scrollY, scrollYProgress } = useScroll();
  const progressScaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 32, restDelta: 0.001 });

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const next = latest > 40;
    setIsScrolled((prev) => (prev === next ? prev : next));
  });

  useEffect(() => {
    setIsScrolled(window.scrollY > 40);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  /** Positions a dropdown panel centered under its trigger, kept inside the viewport. */
  const computeGeometry = useCallback((menu: DropdownKey): PanelGeometry => {
    const trigger = triggerRefs.current[menu];
    const vw = window.innerWidth;

    // Keep panels inside the header's content column (aligned with the logo edge).
    let minLeft = 16;
    let maxRight = vw - 16;
    const container = containerRef.current;
    if (container) {
      const c = container.getBoundingClientRect();
      const cs = window.getComputedStyle(container);
      minLeft = Math.max(16, c.left + parseFloat(cs.paddingLeft));
      maxRight = Math.min(vw - 16, c.right - parseFloat(cs.paddingRight));
    }

    const width = Math.min(PANEL_WIDTH[menu], maxRight - minLeft);
    if (!trigger) {
      return { left: minLeft + (maxRight - minLeft - width) / 2, width, notch: width / 2 };
    }
    const rect = trigger.getBoundingClientRect();
    const center = rect.left + rect.width / 2;
    const left = Math.min(Math.max(center - width / 2, minLeft), maxRight - width);
    const notch = Math.min(Math.max(center - left, 28), width - 28);
    return { left, width, notch };
  }, []);

  const showMenu = useCallback(
    (menu: DropdownKey) => {
      setPanelGeom(computeGeometry(menu));
      setOpenMenu(menu);
    },
    [computeGeometry]
  );

  const clearTimers = () => {
    if (openTimerRef.current) {
      clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  // Close desktop dropdown on Escape or outside click; reposition on resize.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && openMenuRef.current) {
        triggerRefs.current[openMenuRef.current]?.focus();
        setOpenMenu(null);
      }
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (navRootRef.current && !navRootRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileMenuOpen(false);
      if (openMenuRef.current) setPanelGeom(computeGeometry(openMenuRef.current));
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', handleResize);
      clearTimers();
    };
  }, [computeGeometry]);

  // Dropdown hover timing: 120ms open delay, 200ms close delay, instant switch between menus.
  const handleDropdownEnter = (menu: DropdownKey) => {
    clearTimers();
    if (openMenu) {
      showMenu(menu);
    } else {
      openTimerRef.current = setTimeout(() => showMenu(menu), 120);
    }
  };

  const handleDropdownLeave = () => {
    if (openTimerRef.current) {
      clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
    closeTimerRef.current = setTimeout(() => setOpenMenu(null), 200);
  };

  const handleDropdownToggle = (menu: DropdownKey) => {
    clearTimers();
    if (openMenu === menu) {
      setOpenMenu(null);
    } else {
      showMenu(menu);
    }
  };

  const handleServiceClick = (service: ServiceItem) => {
    setOpenMenu(null);
    setMobileMenuOpen(false);
    onSelectService?.(service);
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNavClick = (href: string) => {
    setOpenMenu(null);
    setMobileMenuOpen(false);
    document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
  };

  const activeTab = sectionToTab(activeSection);
  const pillTab = hoveredTab ?? activeTab;

  const isServicesActive = activeTab === 'services';
  const isIndustriesActive = activeTab === 'industries';
  const isSolutionsActive = activeTab === 'solutions';
  const isApproachActive = activeTab === 'approach';
  const isCompanyActive = activeTab === 'company';
  const isContactActive = activeTab === 'contact';

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

  const handleMagnetLeave = () => setMagnetPos({ x: 0, y: 0 });

  const headerHeight = isScrolled ? 64 : 76;

  const renderTabInner = (tab: (typeof TABS)[number], isActive: boolean) => (
    <>
      {pillTab === tab.key && (
        <motion.span
          layoutId="navHoverPill"
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-white pointer-events-none"
          style={{
            boxShadow: '0 1px 2px rgba(11, 37, 69, 0.06), 0 4px 14px -6px rgba(10, 139, 211, 0.28)',
          }}
          transition={{ type: 'spring', stiffness: 480, damping: 36 }}
        />
      )}
      <span className="relative z-10">{tab.label}</span>
      {tab.dropdown && (
        <ChevronDown
          aria-hidden="true"
          className={`relative z-10 w-3.5 h-3.5 transition-transform duration-300 ${
            openMenu === tab.key ? 'rotate-180 text-[#0A8BD3]' : 'text-slate-400'
          }`}
        />
      )}
      {isActive && (
        <motion.span
          layoutId="navActiveDot"
          aria-hidden="true"
          className="absolute bottom-[3px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#8DC63F] z-10"
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      )}
    </>
  );

  const tabClass = (isActive: boolean, isOpen: boolean) =>
    `relative h-9 px-3.5 xl:px-[18px] text-[14px] xl:text-[15px] font-medium tracking-[0.01em] rounded-full flex items-center gap-1 cursor-pointer select-none whitespace-nowrap transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A8BD3] focus-visible:ring-offset-1 ${
      isActive || isOpen ? 'text-[#0A8BD3]' : 'text-[#0B2545] hover:text-[#0A8BD3]'
    }`;

  const tabActive: Record<TabKey, boolean> = {
    services: isServicesActive,
    industries: isIndustriesActive,
    solutions: isSolutionsActive,
    approach: isApproachActive,
    company: isCompanyActive,
    contact: isContactActive,
  };

  return (
    <div ref={navRootRef} id="desktop-navbar-root">
      {/* Always-visible fixed header */}
      <header
        className="fixed top-0 left-0 right-0 z-[1000] transition-[height,background-color,box-shadow,border-color] duration-[350ms] ease-out"
        style={{
          height: headerHeight,
          backgroundColor: isScrolled ? 'rgba(214, 234, 248, 0.88)' : 'rgba(225, 240, 250, 0.70)',
          backdropFilter: isScrolled ? 'blur(20px) saturate(170%)' : 'blur(16px) saturate(150%)',
          WebkitBackdropFilter: isScrolled ? 'blur(20px) saturate(170%)' : 'blur(16px) saturate(150%)',
          borderBottom: `1px solid ${isScrolled ? 'rgba(10, 139, 211, 0.16)' : 'rgba(10, 139, 211, 0)'}`,
          boxShadow: isScrolled ? '0 10px 40px -16px rgba(11, 37, 69, 0.22)' : '0 0 0 0 rgba(11, 37, 69, 0)',
        }}
      >
        {/* Fine top highlight for a glassy edge */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0) 100%)',
          }}
        />

        <div
          ref={containerRef}
          className="max-w-[1320px] mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4"
        >
          {/* LEFT: Logo (transparent PNG), scrolls to top */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              setOpenMenu(null);
              setMobileMenuOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group/logo flex items-center shrink-0 cursor-pointer rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A8BD3]"
            aria-label="Silicon é Solution - Back to top"
          >
            <motion.img
              src="/assets/silicon-logo.png"
              alt="Silicon é Solution"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_OUT }}
              className="w-auto object-contain select-none transition-[height,transform,filter] duration-300 group-hover/logo:scale-[1.04] group-hover/logo:drop-shadow-[0_4px_12px_rgba(10,139,211,0.25)]"
              style={{ height: isScrolled ? 34 : 38 }}
              draggable={false}
            />
          </a>

          {/* CENTER: floating glass pill with 6 items (desktop ≥ 1024px) */}
          <nav
            onMouseLeave={() => setHoveredTab(null)}
            className="hidden lg:flex items-center gap-0.5 relative rounded-full p-1 shrink-0"
            style={{
              background: 'rgba(255, 255, 255, 0.55)',
              border: '1px solid rgba(10, 139, 211, 0.12)',
              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.85), 0 6px 20px -10px rgba(11, 37, 69, 0.12)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
            aria-label="Primary"
          >
            {TABS.map((tab) => {
              const isActive = tabActive[tab.key];

              if (tab.dropdown) {
                const key = tab.key as DropdownKey;
                return (
                  <div
                    key={tab.key}
                    className="relative"
                    onMouseEnter={() => handleDropdownEnter(key)}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <button
                      ref={(el) => {
                        triggerRefs.current[key] = el;
                      }}
                      type="button"
                      aria-expanded={openMenu === key}
                      aria-controls="nav-dropdown-panel"
                      aria-haspopup="true"
                      onClick={() => handleDropdownToggle(key)}
                      onFocus={() => setHoveredTab(tab.key)}
                      onBlur={() => setHoveredTab(null)}
                      onMouseEnter={() => setHoveredTab(tab.key)}
                      onKeyDown={(e) => {
                        if (e.key === 'ArrowDown') {
                          e.preventDefault();
                          showMenu(key);
                          requestAnimationFrame(() => {
                            document
                              .querySelector<HTMLElement>('#nav-dropdown-panel a, #nav-dropdown-panel button')
                              ?.focus();
                          });
                        }
                      }}
                      className={tabClass(isActive, openMenu === key)}
                    >
                      {renderTabInner(tab, isActive)}
                    </button>
                  </div>
                );
              }

              return (
                <a
                  key={tab.key}
                  href={tab.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(tab.href!);
                  }}
                  onFocus={() => setHoveredTab(tab.key)}
                  onBlur={() => setHoveredTab(null)}
                  onMouseEnter={() => {
                    setHoveredTab(tab.key);
                    if (openMenu) {
                      clearTimers();
                      setOpenMenu(null);
                    }
                  }}
                  aria-current={isActive ? 'location' : undefined}
                  className={tabClass(isActive, false)}
                >
                  {renderTabInner(tab, isActive)}
                </a>
              );
            })}
          </nav>

          {/* RIGHT: expanding phone button + magnetic "Get a Quote" */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            <a
              href="tel:02022953999"
              aria-label="Call Silicon é Solution at 020 2295 3999"
              className="group/phone relative h-11 rounded-full border border-[#0A8BD3]/20 bg-white/70 hover:bg-white shadow-[0_4px_14px_-8px_rgba(11,37,69,0.25)] flex items-center text-[#0A8BD3] overflow-hidden transition-colors duration-300 cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A8BD3]"
            >
              <span className="w-11 h-11 flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4 transition-transform duration-300 group-hover/phone:rotate-[-12deg] group-hover/phone:scale-110" />
              </span>
              <span className="hidden xl:grid grid-cols-[0fr] group-hover/phone:grid-cols-[1fr] group-focus-visible/phone:grid-cols-[1fr] transition-[grid-template-columns] duration-300 ease-out">
                <span className="overflow-hidden whitespace-nowrap text-[13px] font-semibold tracking-wide text-[#0B2545] pr-0 group-hover/phone:pr-4 transition-[padding] duration-300">
                  020 2295 3999
                </span>
              </span>
            </a>

            <motion.button
              type="button"
              onClick={onOpenQuote}
              onMouseMove={handleMagnetMove}
              onMouseLeave={handleMagnetLeave}
              animate={{ x: magnetPos.x, y: magnetPos.y }}
              transition={{ type: 'spring', stiffness: 350, damping: 20 }}
              className="relative group/quote h-11 px-5 rounded-full bg-gradient-to-r from-[#0A8BD3] via-[#1597E5] to-[#4FC3F7] text-white text-[14px] font-semibold shadow-[0_8px_24px_-8px_rgba(10,139,211,0.55)] hover:shadow-[0_12px_30px_-8px_rgba(10,139,211,0.7)] active:scale-[0.98] transition-shadow flex items-center gap-1.5 whitespace-nowrap cursor-pointer overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0A8BD3]"
            >
              {/* Sheen sweeping across on hover */}
              <span
                aria-hidden="true"
                className="absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-0 group-hover/quote:translate-x-[300%] transition-transform duration-700 ease-out pointer-events-none"
              />
              <span className="relative z-10">Get a Quote</span>
              <ArrowUpRight className="relative z-10 w-4 h-4 transition-transform duration-200 group-hover/quote:translate-x-0.5 group-hover/quote:-translate-y-0.5" />
            </motion.button>
          </div>

          {/* MOBILE / TABLET CONTROLS (< 1024px) */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenQuote}
              className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#0A8BD3] to-[#4FC3F7] text-white text-xs font-semibold sm:hidden cursor-pointer shadow-xs active:scale-95 transition-transform"
            >
              Quote
            </button>
            <button
              onClick={onOpenQuote}
              className="hidden sm:flex px-4 py-2 rounded-full bg-gradient-to-r from-[#0A8BD3] to-[#4FC3F7] text-white text-sm font-semibold cursor-pointer shadow-xs active:scale-95 transition-transform items-center gap-1"
            >
              Get a Quote
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              className="w-10 h-10 rounded-full border border-[#0A8BD3]/25 flex items-center justify-center text-[#0B2545] hover:text-[#0A8BD3] transition-colors cursor-pointer bg-white/80 shadow-xs"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Scroll progress line along the bottom edge (transform-only) */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] pointer-events-none overflow-hidden">
          <motion.div
            className="h-full w-full bg-gradient-to-r from-[#0A8BD3] via-[#4FC3F7] to-[#8DC63F]"
            style={{ scaleX: progressScaleX, transformOrigin: '0% 50%' }}
          />
        </div>
      </header>

      {/* DESKTOP DROPDOWN PANEL (≥ 1024px): one panel that glides between triggers */}
      <div
        className="hidden lg:block fixed left-0 right-0 z-[999] pointer-events-none transition-[top] duration-[350ms] ease-out"
        style={{ top: headerHeight }}
      >
        <AnimatePresence>
          {openMenu && (
            <motion.div
              key="nav-dropdown"
              id="nav-dropdown-panel"
              role="region"
              aria-label={`${openMenu} menu`}
              initial={{ opacity: 0, y: 10, x: panelGeom.left, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, x: panelGeom.left, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.98, transition: { duration: 0.18 } }}
              transition={{
                duration: 0.28,
                ease: EASE_OUT,
                x: { type: 'spring', stiffness: 380, damping: 36 },
              }}
              onMouseEnter={clearTimers}
              onMouseLeave={handleDropdownLeave}
              className="absolute top-0 left-0 pt-3 pointer-events-auto origin-top"
              style={{ width: panelGeom.width }}
            >
              <div
                className="relative rounded-[20px] text-[#0B2545]"
                style={{
                  background: 'rgba(255, 255, 255, 0.94)',
                  backdropFilter: 'blur(20px) saturate(160%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(160%)',
                  border: '1px solid rgba(10, 139, 211, 0.14)',
                  boxShadow:
                    '0 30px 80px -20px rgba(11, 37, 69, 0.28), 0 2px 6px rgba(11, 37, 69, 0.04), inset 0 1px 0 rgba(255,255,255,0.9)',
                }}
              >
                {/* Arrow notch pointing at the active trigger */}
                {/* Slide (motion x) and rotation live on separate elements so the
                    CSS `rotate` property doesn't turn the slide into a diagonal move. */}
                <motion.span
                  aria-hidden="true"
                  className="absolute -top-[7px] left-0 w-3.5 h-3.5 pointer-events-none"
                  initial={false}
                  animate={{ x: panelGeom.notch - 7 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 36 }}
                >
                  <span
                    className="block w-full h-full rotate-45 rounded-[3px] bg-white"
                    style={{
                      borderLeft: '1px solid rgba(10, 139, 211, 0.14)',
                      borderTop: '1px solid rgba(10, 139, 211, 0.14)',
                    }}
                  />
                </motion.span>

                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={openMenu}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -2 }}
                    transition={{ duration: 0.16, ease: 'easeOut' }}
                    className="p-6"
                  >
                    {openMenu === 'services' && (
                      <ServicesMenu
                        onSelect={handleServiceClick}
                        onQuote={() => {
                          setOpenMenu(null);
                          onOpenQuote();
                        }}
                        onNav={handleNavClick}
                      />
                    )}
                    {openMenu === 'industries' && <IndustriesMenu onNav={handleNavClick} />}
                    {openMenu === 'company' && <CompanyMenu onNav={handleNavClick} />}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* MOBILE DRAWER MENU (< 1024px) with accordions */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed inset-x-0 bottom-0 z-[999] overflow-y-auto px-6 pt-6 pb-6 flex flex-col justify-between lg:hidden"
            style={{
              top: headerHeight,
              height: `calc(100dvh - ${headerHeight}px)`,
              background: 'rgba(214, 234, 248, 0.98)',
              backdropFilter: 'blur(20px) saturate(170%)',
              WebkitBackdropFilter: 'blur(20px) saturate(170%)',
            }}
          >
            <div className="flex flex-col space-y-0.5">
              {/* Company accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setMobileCompanyOpen(!mobileCompanyOpen)}
                  aria-expanded={mobileCompanyOpen}
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
                    {[
                      ['About Us', '#about'],
                      ['Our Clients', '#clients'],
                      ['Our Team', '#team'],
                    ].map(([label, href]) => (
                      <button
                        key={label}
                        type="button"
                        onClick={() => handleNavClick(href)}
                        className="block w-full py-1 text-left text-sm font-medium text-slate-700 hover:text-[#0A8BD3]"
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => handleNavClick('#approach')}
                className={`w-full py-[14px] text-lg font-bold font-display text-left transition-colors cursor-pointer ${
                  isApproachActive ? 'text-[#0A8BD3]' : 'text-[#0B2545]'
                }`}
              >
                Approach
              </button>

              {/* Services accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  aria-expanded={mobileServicesOpen}
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

              {/* Industries accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setMobileIndustriesOpen(!mobileIndustriesOpen)}
                  aria-expanded={mobileIndustriesOpen}
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
                    {[
                      ['Healthcare & Hospitals', '#healthcare'],
                      ['Medical Colleges & Education', '#education'],
                      ['Government & Defence', '#solutions'],
                      ['Commercial & Construction', '#solutions'],
                    ].map(([label, href]) => (
                      <button
                        key={label}
                        type="button"
                        onClick={() => handleNavClick(href)}
                        className="block w-full py-1 text-left text-sm font-medium text-slate-700 hover:text-[#0A8BD3]"
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => handleNavClick('#solutions')}
                className={`w-full py-[14px] text-lg font-bold font-display text-left transition-colors cursor-pointer ${
                  isSolutionsActive ? 'text-[#0A8BD3]' : 'text-[#0B2545]'
                }`}
              >
                Solutions
              </button>

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

            {/* Bottom actions */}
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
                  aria-label="Call Silicon é Solution"
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

/* ------------------------------------------------------------------ */
/* Dropdown panel contents                                             */
/* ------------------------------------------------------------------ */

const ServicesMenu: React.FC<{
  onSelect: (service: ServiceItem) => void;
  onQuote: () => void;
  onNav: (href: string) => void;
}> = ({ onSelect, onQuote, onNav }) => (
  <div className="flex gap-6">
    <div className="flex-1 grid grid-cols-3 gap-x-5 min-w-0">
      {SERVICE_GROUPS.map((group, gIdx) => {
        const items = SERVICES_LIST.filter((s) => s.category === group.key);
        return (
          <div key={group.key} className="min-w-0">
            <div className="flex items-center gap-2 px-2 mb-2">
              <span className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#0A8BD3] whitespace-nowrap">
                {group.label}
              </span>
              <span className="h-px flex-1 bg-gradient-to-r from-[#0A8BD3]/25 to-transparent" />
            </div>
            <div className="space-y-0.5">
              {items.map((service, idx) => {
                const Icon = serviceIcons[service.iconName] || Network;
                return (
                  <motion.button
                    key={service.id}
                    type="button"
                    onClick={() => onSelect(service)}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: gIdx * 0.05 + idx * 0.03, duration: 0.25, ease: EASE_OUT }}
                    className="group/item w-full flex items-center gap-2.5 px-2 py-2 rounded-xl text-left hover:bg-[#EBF5FB] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A8BD3]"
                  >
                    <span className="w-8 h-8 rounded-lg bg-[#0A8BD3]/10 text-[#0A8BD3] flex items-center justify-center shrink-0 group-hover/item:bg-[#0A8BD3] group-hover/item:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </span>
                    <span className="min-w-0 flex-1 text-[13px] font-semibold leading-snug text-[#0B2545] group-hover/item:text-[#0A8BD3] transition-colors">
                      {service.title}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>

    {/* Featured card */}
    <div className="w-[236px] shrink-0 rounded-2xl bg-gradient-to-br from-[#0B2545] via-[#11325c] to-[#0A8BD3] p-5 text-white flex flex-col justify-between relative overflow-hidden">
      <div aria-hidden="true" className="absolute -top-10 -right-10 w-40 h-40 bg-[#4FC3F7]/20 rounded-full blur-2xl pointer-events-none" />
      <div aria-hidden="true" className="absolute -bottom-12 -left-8 w-32 h-32 bg-[#8DC63F]/15 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10">
        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#8DC63F]/20 text-[#B5E07A] border border-[#8DC63F]/30 text-[10px] font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-3 h-3" />
          <span>Turnkey Execution</span>
        </div>
        <h4 className="text-[16px] font-extrabold leading-snug font-display text-white">Turnkey Delivery — Design to Handover</h4>
        <p className="text-xs text-slate-200/90 mt-2 leading-relaxed">
          Single-point accountability from engineering drawings to tested commissioning and post-sale AMC.
        </p>
      </div>

      <div className="relative z-10 pt-4 mt-4 border-t border-white/10 space-y-2">
        <button
          type="button"
          onClick={onQuote}
          className="w-full py-2.5 px-3 rounded-xl bg-white text-[#0B2545] hover:bg-[#8DC63F] hover:text-white transition-colors text-xs font-bold cursor-pointer flex items-center justify-center gap-1.5"
        >
          <span>Get a Free Consultation</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => onNav('#services')}
          className="w-full py-1.5 text-[11px] font-semibold text-white/80 hover:text-white transition-colors cursor-pointer flex items-center justify-center gap-1"
        >
          View all 15 services
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  </div>
);

const INDUSTRY_CARDS = [
  {
    href: '#healthcare',
    title: 'Healthcare & Hospitals',
    tag: 'Critical Care',
    desc: 'ELV, OT integration, nurse calling & hospital Wi-Fi',
    img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80',
    Icon: Heart,
    tagColor: 'text-[#7DD3FC]',
  },
  {
    href: '#education',
    title: 'Medical Colleges & Education',
    tag: 'Academic Campuses',
    desc: 'Auditoriums, lecture capture & smart classrooms',
    img: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=600&q=80',
    Icon: GraduationCap,
    tagColor: 'text-[#B5E07A]',
  },
];

const IndustriesMenu: React.FC<{ onNav: (href: string) => void }> = ({ onNav }) => (
  <div className="space-y-4">
    <div className="grid grid-cols-2 gap-4">
      {INDUSTRY_CARDS.map(({ href, title, tag, desc, img, Icon, tagColor }, idx) => (
        <motion.a
          key={href}
          href={href}
          onClick={(e) => {
            e.preventDefault();
            onNav(href);
          }}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.06, duration: 0.3, ease: EASE_OUT }}
          className="group/card relative rounded-2xl overflow-hidden border border-[#0A8BD3]/15 block h-[176px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A8BD3]"
        >
          <img
            src={img}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-[1.06]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B2545] via-[#0B2545]/65 to-[#0A8BD3]/10" />
          <div className="absolute inset-0 p-4 flex flex-col justify-end text-white">
            <span className={`text-[10.5px] font-bold uppercase tracking-[0.12em] flex items-center gap-1.5 mb-1 ${tagColor}`}>
              <Icon className="w-3.5 h-3.5" />
              {tag}
            </span>
            <div className="flex items-end justify-between gap-2">
              <div className="min-w-0">
                <h4 className="text-[16px] font-bold font-display leading-tight text-white">{title}</h4>
                <p className="text-[11.5px] text-slate-200/90 mt-1">{desc}</p>
              </div>
              <span className="w-8 h-8 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center shrink-0 group-hover/card:bg-white group-hover/card:text-[#0A8BD3] transition-colors">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </motion.a>
      ))}
    </div>

    <div className="pt-3 border-t border-[#0A8BD3]/10 flex items-center justify-between gap-3 text-xs">
      <div className="flex items-center gap-4 text-slate-600">
        <span className="font-semibold text-[#0B2545]">Also serving:</span>
        <a
          href="#solutions"
          onClick={(e) => {
            e.preventDefault();
            onNav('#solutions');
          }}
          className="hover:text-[#0A8BD3] font-medium transition-colors flex items-center gap-1.5"
        >
          <Building2 className="w-3.5 h-3.5 text-[#0A8BD3]" />
          Government
        </a>
        <a
          href="#solutions"
          onClick={(e) => {
            e.preventDefault();
            onNav('#solutions');
          }}
          className="hover:text-[#0A8BD3] font-medium transition-colors flex items-center gap-1.5"
        >
          <Briefcase className="w-3.5 h-3.5 text-[#0A8BD3]" />
          Commercial & Construction
        </a>
      </div>
      <a
        href="#clients"
        onClick={(e) => {
          e.preventDefault();
          onNav('#clients');
        }}
        className="text-[#0A8BD3] font-semibold hover:underline underline-offset-2 flex items-center gap-1 whitespace-nowrap"
      >
        See our clients
        <ArrowRight className="w-3.5 h-3.5" />
      </a>
    </div>
  </div>
);

const COMPANY_LINKS = [
  {
    href: '#about',
    title: 'About Us',
    desc: '15+ years of IT & ELV infrastructure delivery, PAN India.',
    Icon: Building2,
  },
  {
    href: '#clients',
    title: 'Our Clients',
    desc: 'Hospitals, universities and enterprises that trust us.',
    Icon: Award,
  },
  {
    href: '#team',
    title: 'Our Team',
    desc: 'Leadership and engineering specialists behind every project.',
    Icon: Users,
  },
];

const CompanyMenu: React.FC<{ onNav: (href: string) => void }> = ({ onNav }) => (
  <div className="space-y-1 -m-2">
    {COMPANY_LINKS.map(({ href, title, desc, Icon }, idx) => (
      <motion.a
        key={href}
        href={href}
        onClick={(e) => {
          e.preventDefault();
          onNav(href);
        }}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: idx * 0.04, duration: 0.25, ease: EASE_OUT }}
        className="group/link flex items-start gap-3 p-3 rounded-xl hover:bg-[#EBF5FB] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A8BD3]"
      >
        <span className="w-9 h-9 rounded-lg bg-[#0A8BD3]/10 text-[#0A8BD3] flex items-center justify-center shrink-0 group-hover/link:bg-[#0A8BD3] group-hover/link:text-white transition-colors">
          <Icon className="w-4 h-4" />
        </span>
        <span className="min-w-0">
          <span className="text-sm font-bold text-[#0B2545] group-hover/link:text-[#0A8BD3] transition-colors flex items-center gap-1">
            {title}
            <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-200" />
          </span>
          <span className="block text-xs text-slate-500 mt-0.5 leading-relaxed">{desc}</span>
        </span>
      </motion.a>
    ))}
  </div>
);
