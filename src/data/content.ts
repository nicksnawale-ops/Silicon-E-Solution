import {
  ServiceItem,
  ApproachStep,
  TeamMember,
  ClientItem,
  HealthcareSolution,
  SolutionShowcaseItem,
} from '../types';

export const COMPANY_INFO = {
  name: 'Silicon e Solution',
  legalName: 'M/s. Silicon e Solution',
  tagline: 'A Complete IT Infrastructure Solution Provider.',
  subtagline:
    'Innovative turnkey solutions for IT, networking, security, voice, UPS, audio and visual systems — trusted by leading hospitals, universities, government and commercial enterprises across India.',
  experienceYears: 15,
  location: 'Vinayak Apartment, G-18, Shindenagar Lane No. 3, Bavdhan, Pune 411021',
  phones: ['020 2295 3999', '+91 83800 41202'],
  email: 'info@siliconesolution.in',
  website: 'www.siliconesolution.in',
  whatsapp: '+918380041202',
  mapCoordinates: { lat: 18.5147, lng: 73.7712 }, // Bavdhan, Pune
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15132.887859846067!2d73.7634289871582!3d18.518880600000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bec70470ff4f%3A0xb36ef20e3dcf8bfa!2sBavdhan%2C%20Pune%2C%20Maharashtra%20411021!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin',
};

export const STATS = [
  { value: 15, suffix: '+', label: 'Years of Experience', sub: 'Industry leadership since 2011' },
  { value: 100, suffix: '%', label: 'PAN India Execution', sub: 'From design to final handover' },
  { value: 15, suffix: '+', label: 'Solution Verticals', sub: 'Unified ELV & IT systems' },
  { value: 250, suffix: '+', label: 'Projects Delivered', sub: 'Healthcare, Campus & Enterprise' },
];

export const ABOUT_TEXT = {
  paragraph1:
    'Silicon e Solution is a complete IT Infrastructure solution provider dedicated to providing clients with innovative solutions for their technological needs. We have been in this business for over 15 years and have a strong hold in the education and government sectors, commercial units and construction, with business transactions carried out PAN India.',
  paragraph2:
    'We possess the requisite technical and engineering resources to execute mission-critical projects from initial consulting and design documentation through installation, commissioning, and lifetime post-sale support.',
  sectors: [
    { name: 'Education & Campuses', desc: 'Universities, Medical Colleges & Lecture Theatres' },
    { name: 'Healthcare & Hospitals', desc: 'Super Speciality Hospitals & OT Integration' },
    { name: 'Government & Defence', desc: 'Secure High-Availability Infrastructure' },
    { name: 'Commercial & Construction', desc: 'Grade-A Real Estate & Corporate Campuses' },
  ],
};

export const APPROACH_STEPS: ApproachStep[] = [
  {
    id: 1,
    title: 'Pre-Project Consulting',
    shortDesc: 'Site inspection & feasibility assessment',
    fullDesc:
      'In-depth technological audits, site topography analysis, throughput calculations, and requirement discovery to establish an uncompromising architectural foundation.',
    color: '#0A8BD3',
    iconName: 'ClipboardCheck',
  },
  {
    id: 2,
    title: 'Project Design & Documentation',
    shortDesc: 'CAD drawings & single-line schematics',
    fullDesc:
      'Exhaustive engineering documentation including network topology diagrams, heatmaps, rack layout drawings, cable routing schedules, and power load budgeting.',
    color: '#4FC3F7',
    iconName: 'FileText',
  },
  {
    id: 3,
    title: 'Project Management & Execution',
    shortDesc: 'SITC under certified engineers',
    fullDesc:
      'Rigorous project management post-agreement: Supply, Installation, Testing & Commissioning (SITC) governed by strict milestone timelines, OEM standards, and safety compliances.',
    color: '#0866A8',
    iconName: 'Settings',
  },
  {
    id: 4,
    title: 'Post-Sale Support',
    shortDesc: '24/7 dedicated response desk',
    fullDesc:
      'Rapid incident resolution, firmware lifecycle upgrades, emergency on-site technician dispatch, and uptime assurance to prevent operational disruption.',
    color: '#8DC63F',
    iconName: 'Headphones',
  },
  {
    id: 5,
    title: 'Training Support',
    shortDesc: 'Comprehensive operational handover',
    fullDesc:
      'Hands-on technical workshops and structured operational training for your in-house IT, facilities, and clinical engineering teams before sign-off.',
    color: '#0B2545',
    iconName: 'GraduationCap',
  },
  {
    id: 6,
    title: 'Comprehensive AMC',
    shortDesc: 'Annual maintenance contracts',
    fullDesc:
      'Holistic Annual Maintenance Contracts for all audio, visual, networking, and security infrastructure with scheduled preventive maintenance and component replacement.',
    color: '#0A8BD3',
    iconName: 'ShieldCheck',
  },
  {
    id: 7,
    title: 'Turnkey Delivery',
    shortDesc: 'Design to handover lifecycle',
    fullDesc:
      'Single-point accountability from the raw blueprints of a new construction to a fully commissioned, tested, and certified technological ecosystem.',
    color: '#8DC63F',
    iconName: 'Layers',
  },
];

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'networking',
    number: '01',
    title: 'Integrated IT & Networking Infrastructure',
    category: 'core',
    shortDesc: 'Routing, Layer 3 & Layer 2 switching, distribution, and real-time network telemetry.',
    fullDesc:
      'Enterprise-grade core, distribution, and edge switching architectures. We configure high-availability redundant fabrics, automated network load balancers, VLAN segmentation, and proactive network performance monitoring to eliminate bottlenecks.',
    features: [
      'Layer 3 & Layer 2 High-Density Managed Switches',
      'Intelligent Network Load Balancers & Failover Routing',
      'QoS Policy Engineering for Voice & Video Stream Prioritization',
      'Real-Time SNMP Network Monitoring System (NMS)',
    ],
    specs: ['10G/40G/100G Backbone', 'Sub-millisecond Latency', 'Multi-VLAN Isolation'],
    iconName: 'Network',
    badge: 'Core Infrastructure',
    colSpan: 'wide',
  },
  {
    id: 'wireless',
    number: '02',
    title: 'Wireless & RF Solutions',
    category: 'core',
    shortDesc: 'Campus-wide high-density Wi-Fi, public hotspots, and Point-to-Point / Multipoint RF backhaul.',
    fullDesc:
      'Seamless indoor and outdoor wireless coverage designed using RF spectrum modeling. High client density capability for auditoriums, hospitals, and open campuses, backed by long-range wireless laser/RF backhaul bridges.',
    features: [
      'Wi-Fi 6 / 6E Enterprise Campus Access Points',
      'Centralized Cloud & On-Premise RF Controllers',
      'Point-to-Point (PtP) & Point-to-Multipoint (PtMP) RF Backhaul',
      'Captive Portal & Guest Access Management',
    ],
    specs: ['Gigabit Wireless Backhaul', 'Zero-Handoff Roaming', 'High-Density Concurrency'],
    iconName: 'Wifi',
    badge: 'High Density',
    colSpan: 'normal',
  },
  {
    id: 'datacentre',
    number: '03',
    title: 'Datacentre & Enterprise Storage',
    category: 'core',
    shortDesc: 'High-availability servers, enterprise storage arrays, disaster recovery, and server rooms.',
    fullDesc:
      'Complete turnkey server room architecture from precision environmental cooling and hot/cold aisle containment to compute cluster staging, SAN/NAS high-IOPS storage, and offsite disaster recovery synchronization.',
    features: [
      'Blade & Rackmount Compute Server Clusters',
      'Enterprise SAN/NAS Storage & Automated Deduplicated Backup',
      'Hot/Cold Aisle Containment & Precision Air Conditioning (PAC)',
      'Automated Disaster Recovery (DR) & Replication Links',
    ],
    specs: ['Tier III Standard Ready', '99.99% Uptime Architecture', 'Encrypted Deduplication'],
    iconName: 'Server',
    badge: 'Mission Critical',
    colSpan: 'normal',
  },
  {
    id: 'security-systems',
    number: '04',
    title: 'Security & Surveillance Systems',
    category: 'core',
    shortDesc: 'IP CCTV surveillance, access control, boom barriers, metal detectors, VDP, and UVSS.',
    fullDesc:
      'Integrated physical security ecosystems combining ultra-high-definition AI-powered video analytics, perimeter thermal cameras, multi-biometric access gates, automatic number plate recognition (ANPR), and under-vehicle surveillance systems.',
    features: [
      '4K & PTZ AI-Analytic IP Surveillance Cameras',
      'Under-Vehicle Surveillance Systems (UVSS) & ANPR',
      'RFID & Biometric Flap Barriers / Turnstiles',
      'High-Speed Automated Boom Barriers & Video Door Phones (VDP)',
    ],
    specs: ['H.265+ Video Retention', 'Wiegand / OSDP Protocols', 'IP67 Weather Resistance'],
    iconName: 'Shield',
    badge: 'Perimeter Defense',
    colSpan: 'wide',
  },
  {
    id: 'av-solutions',
    number: '05',
    title: 'Integrated AV Solutions',
    category: 'core',
    shortDesc: 'Video walls, sound systems, lecture capture, smart podiums, and interactive 4K touch panels.',
    fullDesc:
      'Immersive audiovisual systems for medical demonstration rooms, auditoriums, boardrooms, and command centers. Ultra-narrow bezel video walls, line-array acoustics, smart digital podiums, and multi-camera automated lecture capture suites.',
    features: [
      'Seamless Ultra-Narrow Bezel LED / LCD Video Walls',
      'Acoustic Engineered Sound Systems & Digital Signal Processors (DSP)',
      'Smart Digital Podiums with Interactive Pen Displays',
      'Multi-Zone 4K Lecture Capturing & Streaming Hardware',
    ],
    specs: ['Ultra-HD 4K 60Hz', 'Acoustic Feedback Suppression', 'Crestron/Extron Ready'],
    iconName: 'MonitorPlay',
    badge: 'Acoustic & Visual',
    colSpan: 'wide',
  },
  {
    id: 'endpoint-security',
    number: '06',
    title: 'Endpoint & Network Security',
    category: 'specialized',
    shortDesc: 'Next-Gen Firewalls (NGFW), zero-trust access, endpoint antivirus, and deep packet inspection.',
    fullDesc:
      'Hardened cybersecurity fabrics protecting hospital EHR data and campus research networks from ransomware, intrusions, and unauthorized lateral movement.',
    features: [
      'Next-Generation Firewalls (NGFW) with SSL/TLS Inspection',
      'Unified Threat Management (UTM) & IPS/IDS Defense',
      'Centralized Endpoint Detection & Remediation (EDR)',
      'Content Filtering & Role-Based Application Control',
    ],
    specs: ['Deep Packet Inspection', 'Zero-Day Threat Emulation', 'Zero Trust Isolation'],
    iconName: 'Lock',
    colSpan: 'normal',
  },
  {
    id: 'voice-solutions',
    number: '07',
    title: 'Voice & Unified Communications',
    category: 'specialized',
    shortDesc: 'IP-PBX telephone exchanges, VoIP SIP trunks, and HD executive IP phones.',
    fullDesc:
      'Resilient enterprise voice communications with multi-site inter-branch dialing, mobile softphones, IVR auto-attendants, and call recording for compliance.',
    features: [
      'Pure IP-PBX & Hybrid Communication Servers',
      'Executive HD Voice IP Telephony & Operator Consoles',
      'Interactive Voice Response (IVR) & Unified Messaging',
      'Direct Inward Dialing (DID) & SIP Trunk Interconnects',
    ],
    specs: ['G.722 HD Audio Codec', 'SIP RFC 3261 Compliant', 'Failover Trunk Switching'],
    iconName: 'PhoneCall',
    colSpan: 'normal',
  },
  {
    id: 'evacuation-fapa',
    number: '08',
    title: 'Integrated Fire Alarm & PA (FA-PA)',
    category: 'specialized',
    shortDesc: 'Life-safety IP Public Address coupled with addressable fire alarm integration.',
    fullDesc:
      'Certified life-safety systems where addressable optical/smoke detectors trigger automated phased audio evacuation announcements and background music (BGM) overrides.',
    features: [
      'Addressable Fire Alarm Panels & Intelligent Smoke Detectors',
      'Multi-Zone IP Public Address with Emergency Override',
      'Background Music (BGM) Distribution System',
      'Automated Phased Emergency Evacuation Chimes & Voice Prompts',
    ],
    specs: ['EN54-16 Certified', 'NFPA 72 Standards', 'Zone Fire Isolation'],
    iconName: 'Flame',
    colSpan: 'normal',
  },
  {
    id: 'bms',
    number: '09',
    title: 'Building Management System (BMS)',
    category: 'specialized',
    shortDesc: 'Unified control of HVAC, Genset, electrical metering, FA, and lighting automation.',
    fullDesc:
      'Centralized facility monitoring architecture integrating BACnet/Modbus protocols. Real-time energy telemetry, temperature comfort loops, and critical asset alarming.',
    features: [
      'BACnet, Modbus & LonWorks Protocol Gateways',
      'HVAC Chiller & Air Handling Unit (AHU) Automation',
      'Diesel Generator (Genset) & Power Telemetry Integration',
      'Real-Time Alarm Logging & Facility SCADA Dashboards',
    ],
    specs: ['BACnet/IP Native', 'Sub-second Polling', 'Predictive Energy Savings'],
    iconName: 'Building2',
    colSpan: 'normal',
  },
  {
    id: 'nurse-call',
    number: '10',
    title: 'Nurse Calling System',
    category: 'specialized',
    shortDesc: 'Bedside patient calling units, toilet emergency cords, and central nurse station displays.',
    fullDesc:
      'Critical medical response system designed for multi-bed wards, ICUs, and private rooms. Visual dome lights, corridor displays, and nurse station audible indicators.',
    features: [
      'Ergonomic Bedside Patient Handsets with Call / Cancel',
      'Waterproof Bathroom / Toilet Emergency Pull Cords',
      'Multi-Color Corridor LED Over-Door Indicator Lights',
      'Duty Room Master Console with Real-Time Response Logging',
    ],
    specs: ['HTM 08-03 Compliant', 'Audio-Visual Duplex', 'Anti-Bacterial Enclosures'],
    iconName: 'Activity',
    colSpan: 'normal',
  },
  {
    id: 'conference-solutions',
    number: '11',
    title: 'Conference & Collaboration Rooms',
    category: 'specialized',
    shortDesc: '4K video conferencing, beamforming mic arrays, and wireless BYOD presentation.',
    fullDesc:
      'Frictionless meeting spaces equipped with auto-framing PTZ optics, ceiling acoustic beamforming arrays, and wireless screen mirroring for Teams, Zoom, and Webex.',
    features: [
      'AI Auto-Framing & Speaker-Tracking PTZ Cameras',
      'Ceiling Array Microphones with Acoustic Echo Cancellation',
      'One-Touch Wireless Screen Sharing & Presentation (BYOD)',
      'Touch Controller Interfaces with Room Scheduling',
    ],
    specs: ['4K Camera Sensor', '360° Room Acoustic Capture', 'Native UC Platform Integration'],
    iconName: 'Users',
    colSpan: 'normal',
  },
  {
    id: 'passive-cabling',
    number: '12',
    title: 'Passive Cabling & OFC Solutions',
    category: 'infrastructure',
    shortDesc: 'Single-mode/multi-mode Optical Fiber Cabling, Cat6A/Cat6 LAN, and certified server racks.',
    fullDesc:
      'Structured cabling backbones certified with OTDR and Fluke certification. OFC fusion splicing, armored outdoor trenching, patch panels, and organized telecom racks.',
    features: [
      'Armored Single-Mode & OM3/OM4 Multi-Mode Fiber (OFC)',
      'Cat6 / Cat6A Gigabit Structured Copper LAN Cabling',
      'Precision Fiber Fusion Splicing & OTDR Test Verification',
      'High-Density 42U/48U Server & Telecom Networking Racks',
    ],
    specs: ['TIA/EIA 568-C.3 Standards', 'Fluke Certified Links', 'Zero Cross-Talk'],
    iconName: 'Cpu',
    colSpan: 'normal',
  },
  {
    id: 'cable-management',
    number: '13',
    title: 'Cable Management Solutions (CMS)',
    category: 'infrastructure',
    shortDesc: 'Cable raceways, GI trunking, wire-mesh trays, and pop-up floor junction boxes.',
    fullDesc:
      'Engineered pathway systems that prevent cable stress, ensure electromagnetic isolation between power and data, and enable rapid future capacity expansion.',
    features: [
      'Heavy-Duty Perforated GI Trays & Wire-Mesh Baskets',
      'Floor Raceways, Wall Trunking & Overhead Pathways',
      'Conference Table Pop-Up Modular Power & AV Boxes',
      'Organized Vertical & Horizontal Cable Organizers',
    ],
    specs: ['Hot-Dip Galvanized GI', 'EMI/RFI Segregation', 'High Load Capacity'],
    iconName: 'Layers',
    colSpan: 'normal',
  },
  {
    id: 'power-solutions',
    number: '14',
    title: 'Modular Power & Smart UPS',
    category: 'infrastructure',
    shortDesc: 'Online double-conversion modular UPS systems and rack-level metered Smart PDUs.',
    fullDesc:
      'Continuous clean power architectures ensuring zero transfer time for critical IT loads, surgical suites, and communication racks with battery bank health diagnostics.',
    features: [
      'Online True Double-Conversion Modular N+1 UPS Systems',
      'Hot-Swappable Power Modules with Zero System Downtime',
      'Intelligent Switched & Metered Rack Power Distribution Units (PDU)',
      'SNMP Remote Power Telemetry & Automatic Generator Sync',
    ],
    specs: ['0ms Transfer Time', '96% Double-Conversion Efficiency', 'Modular N+1 Redundancy'],
    iconName: 'Zap',
    colSpan: 'normal',
  },
  {
    id: 'lighting-automation',
    number: '15',
    title: 'Smart Lighting Automation',
    category: 'infrastructure',
    shortDesc: 'DALI/0-10V lighting control, daylight harvesting, and occupancy-based scheduling.',
    fullDesc:
      'Automated architectural illumination combining circadian lighting schedules, presence sensors, and aesthetic scene presets for auditoriums, hospitals, and offices.',
    features: [
      'DALI-2 & 0-10V Architectural Dimming Systems',
      'PIR & Dual-Technology Occupancy / Motion Sensors',
      'Daylight Harvesting Controls for Maximum Energy Savings',
      'Custom Auditorium & Seminar Hall Scene Controllers',
    ],
    specs: ['DALI-2 Standard', 'Up to 65% Energy Cut', 'Astronomical Time Clock'],
    iconName: 'Sun',
    colSpan: 'normal',
  },
];

export const HEALTHCARE_SECTION = {
  title: 'Solutions for Hospitals & Medical Colleges',
  subtitle:
    'Mission-critical turnkey ELV & IT infrastructure built for patient safety, continuous operation, and clinical precision.',
  elvItems: [
    {
      title: 'Turnkey ELV Projects',
      desc: 'Complete SITC of Passive Cabling, CMS, and high-resiliency Network Switching fabrics.',
      icon: 'Layers',
    },
    {
      title: 'Integrated FA-PA System',
      desc: 'Addressable fire alarm integrated with zoned public announcement and soothing background music.',
      icon: 'Flame',
    },
    {
      title: 'Nurse Call System',
      desc: 'Bedside touch call units, waterproof toilet pull cords, and duty room audio-visual alerts.',
      icon: 'Activity',
    },
    {
      title: 'Building Management System (BMS)',
      desc: 'Automated environmental monitoring for Operation Theatres, ICUs, HVAC chillers, and gensets.',
      icon: 'Building2',
    },
    {
      title: 'Hospital & Campus CCTV',
      desc: 'Perimeter and ward surveillance with AI face recognition and vehicle monitoring.',
      icon: 'Shield',
    },
    {
      title: 'Campus-Wide High-Speed Wi-Fi',
      desc: 'Segregated wireless networks for doctors, medical telemetry carts, and patient guest access.',
      icon: 'Wifi',
    },
  ],
  spotlights: [
    {
      title: 'Access Control Systems',
      desc: 'Multi-tiered biometric & RFID access restricting sensitive zones: Operation Theatres, Neonatal units, and Pharmacy cold storage.',
      specs: 'Anti-passback · Biometric + Smart Card · Emergency Fail-Safe',
      image:
        'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'OT Integration & Live Streaming',
      desc: 'Medical-grade zero-latency 4K video feeds routed directly from surgical endoscopes & overhead lamps to demo rooms for student training.',
      specs: 'Zero-Latency 4K · HIPAA Compliant · Two-Way Clinical Audio',
      image:
        'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Integrated Healthcare AV',
      desc: 'Acoustic-treated conference halls, clinical demo suites, and doctor briefing lounges with crystal-clear audio and multi-input matrixing.',
      specs: 'Matrix Switchers · Beamforming Audio · Tele-Medicine Ready',
      image:
        'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=800&q=80',
    },
  ],
};

export const EDUCATION_SECTION = {
  title: 'AV Solutions for Medical Colleges & Campuses',
  subtitle:
    'Design, supply, installation, and commissioning of sound systems, AV solutions, projection screens, and video walls for next-generation education.',
  departments: [
    'Anatomy',
    'Physiology',
    'Biochemistry',
    'Microbiology',
    'FMT (Forensic Medicine)',
    'Pharmacology',
    'Pathology',
    'Community Medicine',
  ],
  features: [
    {
      dept: 'Anatomy Department',
      desc: 'Interactive digital 3D dissection display systems, ceiling-mounted multi-angle PTZ cameras over cadaver tables, and wireless audio for professors.',
      image:
        'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
      badge: '3D Dissection Integration',
    },
    {
      dept: 'Pathology Department',
      desc: 'High-definition digital microscopic camera broadcasting onto ultra-HD video walls, allowing hundreds of students to examine tissue samples simultaneously.',
      image:
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
      badge: 'Microscopic 4K Feeds',
    },
    {
      dept: 'Biochemistry Department',
      desc: 'Multi-screen synchronous lab demo arrays, digital podium control, and integrated wireless presentation hubs for research seminars.',
      image:
        'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80',
      badge: 'Interactive Lab Displays',
    },
  ],
};

export const SHOWCASE_ITEMS: SolutionShowcaseItem[] = [
  {
    id: 'networking-switches',
    title: 'Networking Switches & Core Routing',
    subtitle: 'Layer 3 & Layer 2 high-density fabrics with intelligent load balancers.',
    bullets: [
      'Wire-speed 10G/40G backplane architecture with zero packet loss under peak broadcast loads.',
      'Hardware-assisted ACLs and micro-segmentation preventing lateral malware propagation.',
      'Network Load Balancers distributing mission-critical enterprise traffic across redundant ISPs.',
    ],
    specs: [
      { label: 'Switching Capacity', value: 'Up to 3.2 Tbps' },
      { label: 'Protocols', value: 'OSPF, BGP, VRRP, LACP' },
      { label: 'Redundancy', value: 'Dual Hot-Swap PSUs' },
    ],
    highlight: 'Core Networking',
  },
  {
    id: 'rf-wireless',
    title: 'RF Management & Wireless Solutions',
    subtitle: 'Enterprise Wi-Fi 6, campus hotspots, and long-distance Point-to-Point backhauls.',
    bullets: [
      'Predictive 3D RF heatmapping ensuring uniform signal coverage even through concrete hospital walls.',
      'Seamless 802.11r/k fast roaming for mobile medical telemetry carts and VoIP handsets.',
      'Carrier-grade Point-to-Point RF links bridging separate campus buildings without trenching costs.',
    ],
    specs: [
      { label: 'Link Distance', value: 'Up to 25 km PtP' },
      { label: 'Client Density', value: '1,000+ per AP' },
      { label: 'Security', value: 'WPA3 Enterprise + 802.1X' },
    ],
    highlight: 'Wireless & RF',
  },
  {
    id: 'server-room',
    title: 'Server Room & Datacentre Infrastructure',
    subtitle: 'Enterprise storage, disaster recovery, precision cooling, and containment.',
    bullets: [
      'Modular server racks engineered with optimized thermal paths and intelligent cable conduits.',
      'High-IOPS all-flash enterprise SAN storage for electronic health records and ERP databases.',
      'Automated disaster recovery replication with cold-site and warm-site failover workflows.',
    ],
    specs: [
      { label: 'Storage Latency', value: '< 0.5 ms IOPS' },
      { label: 'Uptime Tier', value: 'Tier III Compliant' },
      { label: 'Cooling Design', value: 'Hot/Cold Aisle' },
    ],
    highlight: 'Datacentre',
  },
  {
    id: 'security-system',
    title: 'Integrated Physical Security Systems',
    subtitle: 'CCTV surveillance, UVSS vehicle scanners, boom barriers, and access control.',
    bullets: [
      'Deep learning video analytics for perimeter intrusion, unattended bag alerts, and line-crossing.',
      'Under-Vehicle Surveillance Systems (UVSS) providing automated color scans of vehicle chassis.',
      'Heavy-duty commercial boom barriers with loop detectors and high-speed opening cycles.',
    ],
    specs: [
      { label: 'Video Analytics', value: 'AI Face & ANPR' },
      { label: 'Barrier Cycle', value: '1.2s Fast Pass' },
      { label: 'Sensor Protection', value: 'IP68 Submersible' },
    ],
    highlight: 'Physical Security',
  },
  {
    id: 'voice-solution',
    title: 'IP-PBX & Unified Voice Telephony',
    subtitle: 'Enterprise telephone exchanges, VoIP SIP trunks, and executive IP phones.',
    bullets: [
      'Centralized IP-PBX supporting thousands of extensions across multiple remote branch campuses.',
      'Integrated IVR auto-attendants routing customer and patient inquiries effortlessly.',
      'Built-in call recording, voicemail-to-email dispatch, and mobile softphone twinning.',
    ],
    specs: [
      { label: 'Extensions', value: '10 to 10,000+' },
      { label: 'Audio Quality', value: 'Opus & G.722 HD' },
      { label: 'Encryption', value: 'TLS & SRTP' },
    ],
    highlight: 'Voice & UC',
  },
  {
    id: 'fapa-system',
    title: 'Integrated FA-PA Life Safety System',
    subtitle: 'Addressable fire detection married with intelligent public address evacuation.',
    bullets: [
      'Microprocessor-based addressable loop controllers locating hazards to the exact room coordinate.',
      'Automatic fire-triggered override silencing ambient music to deliver calm, clear evacuation directives.',
      'Battery-backed emergency power sustaining operational broadcast during mains electricity cutoff.',
    ],
    specs: [
      { label: 'Standards', value: 'EN54 / NFPA 72' },
      { label: 'Loop Capacity', value: '254 Devices / Loop' },
      { label: 'PA Intelligibility', value: 'STI > 0.65' },
    ],
    highlight: 'Life Safety',
  },
  {
    id: 'bms-system',
    title: 'Building Management System (BMS)',
    subtitle: 'Comprehensive automation for HVAC, Genset, electrical distribution, and energy.',
    bullets: [
      'Single-pane-of-glass SCADA visualization monitoring energy meters, water levels, and temperatures.',
      'Smart HVAC control algorithms adjusting setpoints dynamically based on indoor carbon dioxide levels.',
      'Instant SMS/Email alerts dispatched to facility managers whenever genset or power anomalies occur.',
    ],
    specs: [
      { label: 'Protocols', value: 'BACnet IP, Modbus, MQTT' },
      { label: 'Sensors Logged', value: '50,000+ Points' },
      { label: 'Efficiency Gain', value: '25% - 40% Energy' },
    ],
    highlight: 'Building Automation',
  },
  {
    id: 'nurse-calling',
    title: 'Medical Nurse Call System',
    subtitle: 'Ergonomic patient handsets, over-door corridor indicators, and master consoles.',
    bullets: [
      'Waterproof silicone patient handsets with antimicrobial coatings preventing clinical cross-contamination.',
      'Multi-tiered priority escalations: routine nurse call, toilet emergency pull, and Code Blue emergency.',
      'Detailed audit trails logging patient call response times for clinical quality accreditation.',
    ],
    specs: [
      { label: 'Standard', value: 'HTM 08-03' },
      { label: 'Response Logging', value: 'Millisecond Timestamped' },
      { label: 'Cabling', value: 'Cat6 Plug & Play' },
    ],
    highlight: 'Healthcare Systems',
  },
  {
    id: 'passive-cabling-sol',
    title: 'Passive Infrastructure & OFC Cabling',
    subtitle: 'Certified structured cabling, optical fiber fusion splicing, and server racks.',
    bullets: [
      'Armored fiber backbones connecting disparate blocks with zero outdoor interference or rodent damage.',
      'Certified Category 6A copper channels with full Fluke DTX/DSX printed test reports.',
      'High-grade ventilated telecom racks with organized raceways and precision patch cord labeling.',
    ],
    specs: [
      { label: 'Warranty', value: '25-Year Performance' },
      { label: 'Fiber Types', value: 'OS2, OM3, OM4' },
      { label: 'Testing', value: '100% Fluke Certified' },
    ],
    highlight: 'Passive Infrastructure',
  },
];

export const CLIENTS_LIST: ClientItem[] = [
  {
    name: 'Symbiosis University Hospital & Research Centre',
    sector: 'Healthcare & Medical Education',
    location: 'Lavale, Pune',
    description:
      'Turnkey ELV execution comprising campus-wide passive cabling, IP CCTV surveillance, nurse call systems, and integrated AV auditorium.',
    logoText: 'SYMBIOSIS HOSPITAL',
    logo: '/assets/clients/symbiosis-hospital.webp',
  },
  {
    name: 'Krishna Institute of Medical Sciences (KIMSDU)',
    sector: 'Deemed to be University',
    location: 'Karad, Maharashtra',
    description:
      'Comprehensive medical college AV deployment, lecture capture halls, anatomy dissection camera feeds, and campus fiber backbone.',
    logoText: 'KRISHNA INSTITUTE',
    logo: '/assets/clients/kimsdu.webp',
  },
  {
    name: 'Yashodhara Super Speciality Hospital',
    sector: 'Multi-Speciality Healthcare',
    location: 'Solapur, Maharashtra',
    description:
      'Integrated BMS, Fire Alarm & Public Address system, Operation Theatre streaming, and high-reliability hospital Wi-Fi.',
    logoText: 'YASHODHARA HOSPITAL',
    logo: '/assets/clients/yashodhara.webp',
  },
  {
    name: 'Anibrain Studio',
    sector: 'VFX & Creative Technology',
    location: 'Pune, India',
    description:
      'Ultra-high-throughput 10G/40G networking fabric, enterprise storage SAN, and perimeter access control for global VFX production.',
    logoText: 'ANIBRAIN',
    logo: '/assets/clients/anibrain.webp',
  },
  {
    name: 'Symbiosis International (Deemed University)',
    sector: 'Higher Education & Campuses',
    location: 'PAN India Campuses',
    description:
      'Multi-campus wireless hotspot coverage, boardroom video conferencing systems, and high-density seminar hall audio.',
    logoText: 'SYMBIOSIS INTERNATIONAL',
    logo: '/assets/clients/symbiosis-international.webp',
  },
];

export const WHY_CHOOSE_US = [
  {
    title: '15+ Years Industry Experience',
    desc: 'Established track record delivering robust infrastructure projects across Western India and nationally since 2011.',
    icon: 'Award',
  },
  {
    title: 'PAN India Project Execution',
    desc: 'Proven logistics, supplier networks, and certified engineering teams ready to deploy projects across any state in India.',
    icon: 'Globe',
  },
  {
    title: 'Turnkey: Design to Handover',
    desc: 'Single-source responsibility from CAD schematics and civil co-ordination to commissioning, testing, and training.',
    icon: 'CheckCircle2',
  },
  {
    title: 'Dedicated Post-Sale & Training',
    desc: 'Structured knowledge transfer for your in-house teams plus 24/7 technical incident support to safeguard uptime.',
    icon: 'Clock',
  },
  {
    title: 'Comprehensive AMC Assurance',
    desc: 'Guaranteed SLAs, scheduled preventive maintenance, and genuine OEM spares for all visual, audio, and network systems.',
    icon: 'ShieldCheck',
  },
  {
    title: 'Deep Vertical Expertise',
    desc: 'Recognized authority in specialized environments: clean-room Operation Theatres, medical demo halls, and secure campuses.',
    icon: 'Stethoscope',
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Mr. Suhas Shahane',
    role: 'CEO',
    department: 'Executive Leadership & Strategy',
    phone: '+91 90110 04999',
    email: 'suhas@siliconesolution.in',
    initials: 'SS',
    gradient: 'from-[#0A8BD3] to-[#4FC3F7]',
  },
  {
    name: 'Mr. Avinash Kholamkar',
    role: 'CTO',
    department: 'Technology Architecture & R&D',
    phone: '+91 92712 55357',
    email: 'avinash@siliconesolution.in',
    initials: 'AK',
    gradient: 'from-[#0866A8] to-[#0A8BD3]',
  },
  {
    name: 'Mr. Santosh Vaidya',
    role: 'Head - Lighting & Electrical',
    department: 'Automation, BMS & Power Systems',
    phone: '+91 70203 07799',
    email: 'santosh@siliconesolution.in',
    initials: 'SV',
    gradient: 'from-[#8DC63F] to-[#0A8BD3]',
  },
  {
    name: 'Mr. Nitish Srivastava',
    role: 'Head - Sales & Business Dev',
    department: 'Enterprise & Institutional Relations',
    phone: '+91 95755 12000',
    email: 'nitish@siliconesolution.in',
    initials: 'NS',
    gradient: 'from-[#0A8BD3] to-[#0B2545]',
  },
  {
    name: 'Mr. Pratap Shahane',
    role: 'Head - Pre-Sales & Estimations',
    department: 'Solution Architecture & BOQ Engineering',
    phone: '+91 90110 57893',
    email: 'pratap@siliconesolution.in',
    initials: 'PS',
    gradient: 'from-[#4FC3F7] to-[#0866A8]',
  },
];
