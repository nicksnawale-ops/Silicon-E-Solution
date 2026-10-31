/**
 * Industries served. Healthcare and Education detail comes from the brochure
 * (HEALTHCARE_SECTION / EDUCATION_SECTION in content.ts); Government and
 * Commercial are composed from the existing service catalogue.
 */
export type IndustryId = 'healthcare' | 'education' | 'government' | 'commercial';

export interface Industry {
  id: IndustryId;
  /** Matches ABOUT_TEXT.sectors names. */
  name: string;
  short: string;
  eyebrow: string;
  headline: string;
  intro: string;
  icon: 'HeartPulse' | 'GraduationCap' | 'Landmark' | 'Building2';
  tags: string[];
  /** Service ids (SERVICES_LIST) most relevant to this sector. */
  serviceIds: string[];
  /** Client names (CLIENTS_LIST) from this sector. */
  clients: string[];
  visual: string;
}

export const INDUSTRIES: Industry[] = [
  {
    id: 'healthcare',
    name: 'Healthcare & Hospitals',
    short: 'Super Speciality Hospitals & OT Integration',
    eyebrow: 'Critical care ELV',
    headline: 'Solutions for hospitals & medical colleges',
    intro:
      'Turnkey ELV engineering for zero-downtime medical campuses — patient call response, sterile OT streaming, integrated life safety and segregated clinical networks.',
    icon: 'HeartPulse',
    tags: ['Nurse call', 'OT integration', 'FA-PA'],
    serviceIds: ['nurse-call', 'evacuation-fapa', 'bms', 'security-systems', 'wireless', 'passive-cabling'],
    clients: [
      'Symbiosis University Hospital & Research Centre',
      'Yashodhara Super Speciality Hospital',
      'Krishna Institute of Medical Sciences (KIMSDU)',
    ],
    visual: 'nurse-call',
  },
  {
    id: 'education',
    name: 'Education & Campuses',
    short: 'Universities, Medical Colleges & Lecture Theatres',
    eyebrow: 'Academic campuses',
    headline: 'AV solutions for medical colleges & campuses',
    intro:
      'Design, supply, installation and commissioning of sound systems, AV, projection screens and video walls for classrooms, seminar halls and demo rooms.',
    icon: 'GraduationCap',
    tags: ['Lecture capture', 'Campus Wi-Fi', 'Smart classrooms'],
    serviceIds: ['av-solutions', 'conference-solutions', 'wireless', 'networking', 'evacuation-fapa'],
    clients: ['Symbiosis International (Deemed University)', 'Krishna Institute of Medical Sciences (KIMSDU)'],
    visual: 'av-solutions',
  },
  {
    id: 'government',
    name: 'Government & Defence',
    short: 'Secure High-Availability Infrastructure',
    eyebrow: 'Secure public infrastructure',
    headline: 'Secure, high-availability infrastructure for public institutions',
    intro:
      'Hardened networks, surveillance and access control, datacentres and life-safety systems engineered for uptime, auditability and strict security standards.',
    icon: 'Landmark',
    tags: ['CCTV & access', 'Datacentre', 'Secure networks'],
    serviceIds: ['security-systems', 'endpoint-security', 'datacentre', 'networking', 'evacuation-fapa', 'power-solutions'],
    clients: [],
    visual: 'security-systems',
  },
  {
    id: 'commercial',
    name: 'Commercial & Construction',
    short: 'Grade-A Real Estate & Corporate Campuses',
    eyebrow: 'Enterprise & real estate',
    headline: 'Smart infrastructure for commercial buildings & corporate campuses',
    intro:
      'From structured cabling at construction stage to BMS, power, lighting automation and collaboration rooms — one partner from blueprint to handover.',
    icon: 'Building2',
    tags: ['BMS', 'Structured cabling', 'Power & UPS'],
    serviceIds: ['bms', 'passive-cabling', 'cable-management', 'power-solutions', 'lighting-automation', 'conference-solutions'],
    clients: ['Anibrain Studio'],
    visual: 'bms',
  },
];

export const industryHref = (id: IndustryId) => `/industries#${id}`;
