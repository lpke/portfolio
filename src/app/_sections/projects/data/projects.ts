export type Project = {
  company: string;
  label: string;
  title: string;
  description: string;
  tags: string[];
  icon: string;
  /** 'large' for 8-col, 'small' for 4-col cards in the bento grid */
  size: 'large' | 'small';
  href?: string;
  ctaLabel?: string;
};

export const PROJECTS: Project[] = [
  {
    company: 'Montu | HealthTech',
    label: 'Montu | HealthTech',
    title: 'Pre-Consultation Portal',
    description:
      "GREENFIELD TS/Vite/React SPA architected for 1,500 users/day. Engineered for high performance and reliability as Australia's leading health tech solution.",
    tags: ['TypeScript', 'React', 'Vite', 'Nx'],
    icon: '🏥',
    size: 'large',
    href: '#',
    ctaLabel: 'View Project',
  },
  {
    company: "Akcelo | McDonald's",
    label: "Akcelo | McDonald's",
    title: 'Digital Menus',
    description:
      'Scaled React components to 2,000+ stores across AU/NZ for international digital menu boards.',
    tags: ['React', 'Tailwind'],
    icon: '📺',
    size: 'small',
  },
  {
    company: 'Acidgreen | Danone',
    label: 'Acidgreen | Danone',
    title: 'NutriciaStore',
    description:
      'Enterprise eCommerce solution featuring Magento SSO integration and a custom loyalty program.',
    tags: ['Magento', 'React'],
    icon: '🛒',
    size: 'small',
  },
  {
    company: 'Greenfields Development',
    label: 'Greenfields Development',
    title: 'Releases Web App',
    description:
      'Full-stack Next.js/Node/MongoDB application built for managing complex property releases and sales.',
    tags: ['Next.js', 'MongoDB'],
    icon: '🏘',
    size: 'large',
    href: '#',
    ctaLabel: 'View Case Study ↗',
  },
  {
    company: 'Acidgreen | Milkrun',
    label: 'Acidgreen | Milkrun',
    title: 'Milkrun Store',
    description:
      'TS/React Next.js Shopify site optimized for speed and conversion in the grocery delivery space.',
    tags: ['Next.js', 'Shopify'],
    icon: '🚚',
    size: 'small',
  },
];
