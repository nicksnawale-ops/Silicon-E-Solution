import { SHOWCASE_ITEMS, SERVICES_LIST } from './content';

/**
 * Integrated solutions (detail in SHOWCASE_ITEMS) grouped by the kind of
 * client they serve, for the /solutions page and the home-page explorer.
 */
export type SolutionDomainId = 'care' | 'workplace' | 'critical';

export interface SolutionDomain {
  id: SolutionDomainId;
  name: string;
  tagline: string;
  solutionIds: string[];
}

export const SOLUTION_DOMAINS: SolutionDomain[] = [
  {
    id: 'care',
    name: 'Healthcare & Education',
    tagline: 'Hospitals, medical colleges and campuses where safety and learning cannot stop.',
    solutionIds: ['smart-hospital', 'smart-campus'],
  },
  {
    id: 'workplace',
    name: 'Workplace & Commercial',
    tagline: 'Offices and buildings that run on one intelligent infrastructure.',
    solutionIds: ['smart-office', 'intelligent-building'],
  },
  {
    id: 'critical',
    name: 'Mission-Critical',
    tagline: 'Datacentres and public facilities engineered for uptime and security.',
    solutionIds: ['enterprise-datacentre', 'secure-facility'],
  },
];

export const solutionById = (id: string) => SHOWCASE_ITEMS.find((s) => s.id === id);

/** Services an integrated solution combines, in display order. */
export const servicesForSolution = (id: string) =>
  (solutionById(id)?.serviceIds ?? [])
    .map((sid) => SERVICES_LIST.find((s) => s.id === sid))
    .filter((s): s is (typeof SERVICES_LIST)[number] => Boolean(s));

/** Solutions that include a given service (for cross-links from service popups). */
export const solutionsForService = (serviceId: string) => SHOWCASE_ITEMS.filter((s) => s.serviceIds.includes(serviceId));

/** Solutions in page order (grouped by domain). */
export const ORDERED_SOLUTIONS = SOLUTION_DOMAINS.flatMap((d) =>
  d.solutionIds.map((id) => ({ domain: d, item: solutionById(id)! })).filter((x) => x.item)
);

export const solutionHref = (id: string) => `/solutions#${id}`;
