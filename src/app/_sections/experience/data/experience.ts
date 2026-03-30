export interface TimelineEntry {
  period: string;
  company: string;
  role: string;
  description: string;
  tags: string[];
  highlights: string[];
  /** Icon character or emoji */
  icon: string;
  /** Badge label style: 'current' | 'experience' | 'previous' | 'early' */
  badge: 'current' | 'experience' | 'previous' | 'early';
}

export const EXPERIENCE_DATA: TimelineEntry[] = [
  {
    period: '12/2023 — Present',
    company: 'Montu',
    role: 'Senior Software Engineer (SDE3)',
    description:
      'Driving engineering excellence in the health-tech space through robust system architecture and high-performance frontend solutions.',
    tags: ['NX Monorepo', 'React', 'TypeScript'],
    highlights: [
      'Leading the architectural direction for the **Pre-Consultation Portal**, ensuring a seamless patient journey.',
      'Spearheaded the migration and maintenance of a complex **NX Monorepo**, improving developer velocity and code sharing.',
      'Mentoring junior engineers and implementing rigorous code quality standards across the SDE group.',
    ],
    icon: '🏥',
    badge: 'current',
  },
  {
    period: '10/2023 — 12/2023',
    company: 'Akcelo',
    role: 'Senior Web Developer',
    description:
      'Focused on delivering high-impact digital experiences for global retail brands.',
    tags: ['Web Graphics', 'React', 'Digital Signage'],
    highlights: [
      "Developed and optimized the digital menu board systems for **McDonald's AU/NZ**, focusing on high uptime and real-time updates.",
      'Ensured cross-platform compatibility for large-scale digital signage across thousands of locations.',
    ],
    icon: '🍔',
    badge: 'experience',
  },
  {
    period: '',
    company: 'Acidgreen',
    role: 'React Developer',
    description:
      'E-commerce specialization, building scalable storefronts for high-growth Australian brands.',
    tags: ['React', 'Next.js', 'Shopify Plus'],
    highlights: [
      'Engineered performant frontend components for **Milkrun**, contributing to their rapid scaling phase.',
      'Delivered enterprise-grade e-commerce solutions for **NutriciaStore**, ensuring high conversion and accessibility.',
    ],
    icon: '🛒',
    badge: 'experience',
  },
  {
    period: '',
    company: 'Greenfields Development',
    role: 'Software/Systems Developer',
    description: '',
    tags: ['Systems Arch', 'Full Stack'],
    highlights: [
      'Built internal tooling and automated systems to streamline development workflows and project management.',
    ],
    icon: '💻',
    badge: 'previous',
  },
  {
    period: '',
    company: 'Greenhouse Creative',
    role: 'Developer',
    description:
      'Laying the foundation of technical expertise through diverse creative and technical projects.',
    tags: [],
    highlights: [
      'Bridged the gap between design and technology, delivering clean and functional web interfaces for creative campaigns.',
    ],
    icon: '🎨',
    badge: 'early',
  },
];
