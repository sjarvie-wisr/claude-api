export type Method = 'GET' | 'POST' | 'PUT';

export interface NavItem {
  label: string;
  href: string;
  method?: Method;
  icon?: string;
}

export interface NavSection {
  group: string;
  items: NavItem[];
}

export const NAV_SECTIONS: NavSection[] = [
  {
    group: 'Getting Started',
    items: [
      { label: 'Overview & Flow', href: '/', icon: '🏠' },
      { label: 'Quickstart Guide', href: '/quickstart', icon: '⚡' },
      { label: 'Authentication', href: '/auth', icon: '🔑' },
    ],
  },
  {
    group: 'Rate Estimates',
    items: [
      { label: 'Submit Rate Estimate', href: '/rate-estimate/post', method: 'POST' },
      { label: 'Rate Estimate Status', href: '/rate-estimate/get', method: 'GET' },
    ],
  },
  {
    group: 'Applications',
    items: [
      { label: 'Save Draft', href: '/application/put', method: 'PUT' },
      { label: 'Submit Application', href: '/application/post', method: 'POST' },
      { label: 'Application Status', href: '/application/get', method: 'GET' },
    ],
  },
  {
    group: 'Reference',
    items: [
      { label: 'Terms & Conditions', href: '/terms', method: 'GET' },
      { label: 'Error Handling', href: '/errors', icon: '⚠️' },
      { label: 'Validation Guide', href: '/validation', icon: '✅' },
      { label: 'API Licence', href: '/legal', icon: '📋' },
    ],
  },
];
