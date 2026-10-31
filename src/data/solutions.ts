import { SHOWCASE_ITEMS } from './content';

/**
 * Solution architectures (detail in SHOWCASE_ITEMS) grouped into engineering
 * domains for the /solutions page and the home-page teaser.
 */
export type SolutionDomainId = 'network' | 'safety' | 'building';

export interface SolutionDomain {
  id: SolutionDomainId;
  name: string;
  tagline: string;
  /** ServiceVisual scene used to represent the domain. */
  visual: string;
  solutionIds: string[];
}

export const SOLUTION_DOMAINS: SolutionDomain[] = [
  {
    id: 'network',
    name: 'Network & Compute',
    tagline: 'Core fabrics, campus wireless, datacentres and certified cabling.',
    visual: 'networking',
    solutionIds: ['networking-switches', 'rf-wireless', 'server-room', 'passive-cabling-sol'],
  },
  {
    id: 'safety',
    name: 'Safety & Security',
    tagline: 'Surveillance, life-safety evacuation and clinical response systems.',
    visual: 'security-systems',
    solutionIds: ['security-system', 'fapa-system', 'nurse-calling'],
  },
  {
    id: 'building',
    name: 'Building & Communication',
    tagline: 'Intelligent automation and unified enterprise voice.',
    visual: 'bms',
    solutionIds: ['bms-system', 'voice-solution'],
  },
];

/** Matching service (SERVICES_LIST id) for each solution, used for the detail popup. */
export const SOLUTION_SERVICE: Record<string, string> = {
  'networking-switches': 'networking',
  'rf-wireless': 'wireless',
  'server-room': 'datacentre',
  'security-system': 'security-systems',
  'voice-solution': 'voice-solutions',
  'fapa-system': 'evacuation-fapa',
  'bms-system': 'bms',
  'nurse-calling': 'nurse-call',
  'passive-cabling-sol': 'passive-cabling',
};

export const solutionById = (id: string) => SHOWCASE_ITEMS.find((s) => s.id === id);

/** Solutions in page order (grouped by domain). */
export const ORDERED_SOLUTIONS = SOLUTION_DOMAINS.flatMap((d) =>
  d.solutionIds.map((id) => ({ domain: d, item: solutionById(id)! })).filter((x) => x.item)
);

export const solutionHref = (id: string) => `/solutions#${id}`;
