const firstName = 'Luke';
const lastName = 'Perich';
const siteName = `${firstName} ${lastName}`;
const role = 'Senior Software Engineer';
const email = 'luke@lpdev.io';
const githubHandle = 'lpke';
const githubUrl = `https://github.com/${githubHandle}`;
const linkedinPath = '/in/luke-perich';
const linkedinUrl = `https://www.linkedin.com${linkedinPath}`;

export const SITE = {
  firstName,
  lastName,
  name: siteName,
  title: siteName,
  role,
  email,
  emailHref: `mailto:${email}`,
  location: 'Remote / Sydney, AU',
  github: githubUrl,
  githubHandle: `@${githubHandle}`,
  linkedin: linkedinUrl,
  linkedinPath,
  sourceCode: `${githubUrl}/portfolio`,
} as const;

export const SITE_METADATA = {
  defaultTitle: `${SITE.name} | ${SITE.role}`,
  titleTemplate: '%s | lpdev',
  description:
    'Senior Front-End Developer focused on building great products and the systems that ship them. Specialising in TypeScript, React, monorepo architecture, CI/CD, and build tooling.',
  robots: {
    index: false,
    follow: false,
  },
} as const;

export const PAGE_METADATA = {
  skills: {
    title: 'Skills',
    description:
      'Product engineering, AI automation, code architecture, developer tooling, shipping, testing, and technical strategy skills.',
  },
  contact: {
    title: 'Contact',
    description:
      'Get in touch — currently open to freelance opportunities and technical consultations.',
  },
} as const;

export const ROBOTS_POLICY = {
  userAgent: '*',
  disallow: '/',
} as const;

export const SECTION_IDS = {
  home: 'home',
  skills: 'skills',
  contact: 'contact',
  projects: 'projects',
  experience: 'experience',
} as const;

export const DEFAULT_SECTION_ID = SECTION_IDS.home;

export const SCROLL_TARGETS = {
  contactCardFirst: 'contact-card-first',
} as const;

/**
 * Section definitions used for navigation, scroll-tracking and URL rewriting.
 * `path` is the clean URL shown in the address bar.
 * `sectionId` is the DOM id of the corresponding <section>.
 */
export const SECTIONS = [
  { label: 'Home', path: '/', sectionId: SECTION_IDS.home },
  { label: 'What I Do', path: '/skills', sectionId: SECTION_IDS.skills },
  { label: 'Contact', path: '/contact', sectionId: SECTION_IDS.contact },
] as const;

/** Backwards-compatible alias used by the Header nav and anywhere else. */
export const NAV_LINKS = SECTIONS;

export const LAYOUT_CONFIG = {
  breakpoints: {
    sm: 640,
    md: 768,
  },
  mediaQueries: {
    belowSm: '(max-width: 639px)',
    belowMd: '(max-width: 767px)',
    desktopSkills: '(min-width: 1024px)',
    sectionScrollIndicator: '(min-width: 768px) and (min-height: 1000px)',
  },
  cssVars: {
    heroStableHeight: '--hero-stable-height',
  },
  motion: {
    resumePanelMs: 300,
    resumeResetMs: 1400,
    navScrollSettleMs: 1200,
    mobileOrientationSettleMs: 250,
    contactCopyMs: 1500,
  },
  sectionObserver: {
    rootMargin: '-15% 0px -40% 0px',
    threshold: [0, 0.1, 0.25, 0.5],
  },
  scroller: {
    defaultSpeed: 0.5,
    heroToolsSpeed: 0.4,
    hydratedCopyCount: 3,
    pauseMs: 2000,
    scrollResumeDelayMs: 180,
    fadeWidthPx: 64,
    safetyMarginPx: 2,
  },
} as const;

export const HEADER_CONTENT = {
  ctaLabel: 'Get in Touch',
} as const;

export const FOOTER_CONTENT = {
  copyrightSymbol: '©',
  copyrightSuffix: '',
} as const;

export const FOOTER_LINKS = [
  { label: SITE.email, href: SITE.emailHref },
  { label: 'GitHub', href: SITE.github },
  { label: 'LinkedIn', href: SITE.linkedin },
  { label: 'Source Code', href: SITE.sourceCode },
] as const;

export const CONTACT_LINKS = [
  {
    icon: '✉',
    iconSrc: '/images/icons/send_white.svg',
    label: 'Email',
    value: SITE.email,
    href: SITE.emailHref,
    copyContent: SITE.email,
  },
  {
    icon: '👤',
    iconSrc: '/images/icons/linkedin.svg',
    label: 'LinkedIn',
    value: SITE.linkedinPath,
    href: SITE.linkedin,
    copyContent: SITE.linkedin,
  },
  {
    icon: '</>',
    iconSrc: '/images/icons/github_white.svg',
    label: 'GitHub',
    value: SITE.githubHandle,
    href: SITE.github,
    copyContent: SITE.github,
  },
  {
    icon: '📍',
    iconSrc: '/images/icons/location_white.svg',
    label: 'Location',
    value: SITE.location,
    href: null,
    copyContent: null,
  },
] as const;

export const HERO_CONTENT = {
  portraitLabel: `${SITE.name} headshot`,
  bio: {
    beforeRole: 'Strategist turned',
    highlightedRole: SITE.role,
    afterRole:
      ". I build web apps, the infrastructure that ships them, and the tools that make writing them faster. When not coding, I'm training - calisthenics and competitive swimming.",
  },
  ctaLabel: 'Contact Me',
} as const;

export const RESUME_REQUEST_CONTENT = {
  triggerLabel: 'Download CV',
  submittedLabel: '✓ Sent',
  dialogTitle: 'Download CV',
  dialogAriaLabel: 'Download CV',
  closeDialogLabel: 'Close download CV dialog',
  emailPlaceholder: 'your@email.com',
  messagePlaceholder: 'Include an optional message...',
  noteToggleLabel: 'Add note',
} as const;

export const UI_TEXT = {
  copy: 'Copy',
  copied: 'Copied',
  examples: 'Examples',
  scroll: 'Scroll',
} as const;

export const CONTACT_SECTION_CONTENT = {
  title: {
    lead: "Let's",
    accent: 'Connect',
  },
} as const;

export const CONTACT_FORM_CONTENT = {
  fields: {
    name: {
      label: 'Name',
      placeholder: 'Your name',
    },
    email: {
      label: 'Email',
      placeholder: 'you@example.com',
    },
    details: {
      label: 'Message',
      placeholder: 'A few details, goals, timeline, or links.',
    },
  },
  submit: {
    idle: 'Send message',
    pending: 'Sending...',
  },
  feedback: {
    missingFields: 'Please fill in all fields.',
    success: "Message sent! I'll be in touch soon.",
  },
} as const;

export type HeroToolId =
  | 'node'
  | 'react'
  | 'typescript'
  | 'next'
  | 'claude'
  | 'codex'
  | 'aws'
  | 'tailwind'
  | 'vite'
  | 'graphql'
  | 'docker'
  | 'vercel'
  | 'playwright'
  | 'nx'
  | 'storybook'
  | 'github'
  | 'mongodb'
  | 'mui'
  | 'git'
  | 'linux'
  | 'bash'
  | 'vim'
  | 'lua'
  | 'nix'
  | 'ga4'
  | 'vwo'
  | 'launchdarkly';

export const HERO_TOOLS: Array<{ id: HeroToolId; label: string }> = [
  { id: 'node', label: 'Node.js' },
  { id: 'react', label: 'React' },
  { id: 'typescript', label: 'TypeScript' },
  { id: 'next', label: 'Next.js' },
  { id: 'claude', label: 'Claude' },
  { id: 'codex', label: 'Codex' },
  { id: 'aws', label: 'AWS' },
  { id: 'tailwind', label: 'Tailwind' },
  { id: 'vite', label: 'Vite' },
  { id: 'graphql', label: 'GraphQL' },
  { id: 'docker', label: 'Docker' },
  { id: 'vercel', label: 'Vercel' },
  { id: 'playwright', label: 'Playwright' },
  { id: 'nx', label: 'Nx' },
  { id: 'storybook', label: 'Storybook' },
  { id: 'github', label: 'GitHub' },
  { id: 'mongodb', label: 'MongoDB' },
  { id: 'mui', label: 'MUI' },
  { id: 'git', label: 'Git' },
  { id: 'linux', label: 'Linux' },
  { id: 'bash', label: 'Bash' },
  { id: 'vim', label: 'Vim' },
  { id: 'lua', label: 'Lua' },
  { id: 'nix', label: 'Nix' },
  { id: 'ga4', label: 'GA4' },
  { id: 'vwo', label: 'VWO' },
  { id: 'launchdarkly', label: 'LaunchDarkly' },
];

export const FOUNDATION_CONTENT = {
  heading: ['TECHNICAL', 'FOUNDATION'],
  intro:
    'My approach blends engineering rigor with creative problem solving to build future-proof software.',
  codeSnippet: `const engineer = {
  philosophy: "DX First",
  stack: ["React", "TS"],
  performance: "Optimized"
};`,
  skills: [
    {
      icon: '◇',
      title: 'Systems Architecture',
      description:
        'Designing modular monorepos and distributed frontend systems that handle scale with ease.',
    },
    {
      icon: '⚙',
      title: 'Build Tooling',
      description:
        'Customizing build pipelines and development environments to maximize team velocity.',
    },
    {
      icon: '◈',
      title: 'Frontend Excellence',
      description:
        'Pixel-perfect React interfaces crafted with performance and deep Type-safety.',
    },
    {
      icon: '🚀',
      title: 'CI/CD & Deployment',
      description:
        'Automated testing and delivery pipelines ensuring reliable and frequent releases.',
    },
  ],
} as const;

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

export const PROJECTS_SECTION_CONTENT = {
  title: {
    lead: 'Selected',
    accent: 'Works',
  },
  subtitle:
    'Exploring the intersection of high-performance backend architecture and intuitive, fluid user interfaces. Each project represents a unique challenge in precision engineering.',
  pagination: {
    more: 'More projects from Acidgreen, Greenfields, and Greenhouse Creative.',
    previousGlyph: '‹',
    nextGlyph: '›',
    previousLabel: 'Previous projects',
    nextLabel: 'Next projects',
  },
} as const;

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

export const RECENT_WORK_CONTENT = {
  title: 'RECENT WORK',
  intro:
    'Highlighting major contributions to large-scale digital products and platforms.',
  archiveLinkLabel: 'View Archive →',
  cards: {
    montu: {
      tags: ['React', 'TypeScript', 'Next.js'],
      title: 'Montu: Pre-Consultation Portal',
      description:
        'Streamlining patient intake and medical consultations through a robust, secure React application.',
    },
    akcelo: {
      tags: ['Akcelo'],
      title: "McDonald's Digital Menus",
      description:
        "Developing and optimizing high-traffic digital menu board systems for global McDonald's outlets.",
    },
    tooling: {
      icon: '⌨',
      title: 'Architecture & Tooling',
      description:
        'Specialising in monorepos, automated CI/CD pipelines, and internal DX tooling.',
    },
  },
  competencies: {
    label: 'Core Competencies',
    items: ['TypeScript', 'React', 'Monorepos', 'CI/CD', 'Build Tooling'],
    icon: '✦',
  },
} as const;

export type TimelineEntry = {
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
};

export const EXPERIENCE_SECTION_CONTENT = {
  title: {
    lead: 'Career',
    accent: 'Timeline',
  },
  subtitle:
    'A chronological mapping of my technical journey, focusing on architectural precision, scalable systems, and transformative engineering leadership.',
  badges: {
    current: null,
    experience: 'Experience',
    previous: 'Previous',
    early: 'Early Career',
  },
} as const;

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

export const PHILOSOPHY_CONTENT = {
  symbol: '</>',
  title: 'Technical Philosophy',
  body:
    'I believe that software is a craft. Beyond just “making it work,” I strive for code that is elegant, testable, and resilient. My approach combines rigorous engineering principles with the creative problem-solving required to navigate complex system constraints.',
  ctaLabel: 'Read the manifesto',
  ctaGlyph: '→',
  stats: {
    value: '12+',
    label: 'Projects Delivered',
    description: 'From startup MVPs to enterprise-grade cloud systems.',
  },
} as const;
