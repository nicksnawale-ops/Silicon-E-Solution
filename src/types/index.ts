export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  category: 'core' | 'specialized' | 'infrastructure';
  shortDesc: string;
  fullDesc: string;
  features: string[];
  specs: string[];
  iconName: string;
  badge?: string;
  colSpan?: 'normal' | 'wide' | 'tall';
}

export interface ApproachStep {
  id: number;
  title: string;
  shortDesc: string;
  fullDesc: string;
  color: string;
  iconName: string;
}

export interface TeamMember {
  name: string;
  role: string;
  department: string;
  phone: string;
  email: string;
  initials: string;
  gradient: string;
}

export interface ClientItem {
  name: string;
  sector: string;
  location: string;
  description: string;
  logoText: string;
}

export interface HealthcareSolution {
  title: string;
  description: string;
  iconName: string;
  badge: string;
}

export interface SolutionShowcaseItem {
  id: string;
  title: string;
  subtitle: string;
  bullets: string[];
  specs: { label: string; value: string }[];
  highlight: string;
}
