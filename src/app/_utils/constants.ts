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
    lg: 1024,
  },
  mediaQueries: {
    belowSm: '(max-width: 639px)',
    belowMd: '(max-width: 767px)',
    desktopSkills: '(min-width: 1024px)',
    sectionScrollIndicator: '(min-width: 1024px) and (min-height: 1000px)',
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

export const SKILLS_SECTION_COPY = {
  heading: {
    lead: 'What I',
    accent: 'do',
  },
  railAriaLabel: 'Skill focus areas',
} as const;

export type SkillCapability = {
  title: string;
  description: string;
};

export type SkillProofPoint = {
  title: string;
  description: string;
  url?: string;
  showGithubIcon?: boolean;
};

export type SkillId =
  | 'product-engineering'
  | 'ai-automation'
  | 'code-architecture'
  | 'developer-tooling'
  | 'shipping-testing'
  | 'technical-strategy';

export type SkillProfile = {
  id: SkillId;
  title: string;
  subtitle: string;
  intro: string;
  iconKey: string;
  accent: string;
  accentSoft: string;
  railTextExtraRem?: number;
  capabilities: readonly SkillCapability[];
  tools: readonly string[];
  proofPoints: readonly SkillProofPoint[];
};

export type SkillCardType =
  | 'default'
  | 'feature'
  | 'chips'
  | 'compact'
  | 'metric'
  | 'quiet';

export type SkillCardImagePosition = 'top' | 'right' | 'bottom' | 'left';

export type SkillCardImageFit =
  | 'contain'
  | 'cover'
  | 'fill'
  | 'none'
  | 'scale-down'
  | 'stretch';

export const SKILL_CARD_CLASS_NAMES = {
  default:
    'border-white/[0.075] bg-white/[0.025] shadow-[0_14px_34px_rgba(0,0,0,0.15)]',
  feature:
    'border-white/[0.09] bg-white/[0.038] shadow-[0_18px_46px_rgba(0,0,0,0.20)]',
  chips: 'border-white/[0.075] bg-white/[0.022]',
  compact: 'border-white/10 bg-white/[0.025]',
  metric: 'border-white/[0.08] bg-surface-container-high/35',
  quiet: 'border-white/10 bg-transparent',
} as const satisfies Record<SkillCardType, string>;

export const SKILL_CARD_PADDING_CLASS_NAMES = {
  default: 'p-4 lg:p-5',
  feature: 'p-5 lg:p-6',
  chips: 'p-4 lg:p-5',
  compact: 'p-3.5 lg:p-4',
  metric: 'p-4 lg:p-5',
  quiet: 'p-0',
} as const satisfies Record<SkillCardType, string>;

export const SKILL_CARD_IMAGE_DEFAULT_RATIOS = {
  top: '7rem',
  right: '34%',
  bottom: '7rem',
  left: '34%',
} as const satisfies Record<SkillCardImagePosition, string>;

export const SKILL_CARD_IMAGE_BACKGROUND_SIZE = {
  contain: 'contain',
  cover: 'cover',
  fill: '100% 100%',
  none: 'auto',
  'scale-down': 'contain',
  stretch: '100% 100%',
} as const satisfies Record<SkillCardImageFit, string>;

export type SkillPageShellConfig = {
  contentGapClassNames: {
    desktop: string;
    mobile: string;
  };
};

export const SKILL_PAGE_SHELL_CONFIG: SkillPageShellConfig = {
  contentGapClassNames: {
    desktop: 'mt-4',
    mobile: 'mt-3',
  },
};

export const SKILL_PAGER_COPY = {
  ariaLabel: 'Skill content pages',
  pauseLabel: 'Pause skill content page timer',
  playLabel: 'Resume skill content page timer',
  previousLabel: 'Previous skill content page',
  nextLabel: 'Next skill content page',
} as const;

export type SkillPagerConfig = {
  autoTransitionMs: number;
  desktopWidthClassName: string;
  indicatorLineClassName: string;
  scrollPauseMs: number;
  showArrowButtons: boolean;
  swapMs: number;
  swipeMaxOffAxisPx: number;
  swipeMinDistancePx: number;
};

export const SKILL_PAGER_CONFIG: SkillPagerConfig = {
  autoTransitionMs: 8000,
  desktopWidthClassName: 'sm:w-32',
  indicatorLineClassName: 'h-1',
  scrollPauseMs: 500,
  showArrowButtons: false,
  swapMs: 130,
  swipeMaxOffAxisPx: 56,
  swipeMinDistancePx: 44,
};

export type DesktopSkillsLayout = {
  id: string;
  panelClassName: string;
  contentAlignClassName: string;
  railWidthClassName: string;
  contentMaxClassName: string;
};

export const DESKTOP_SKILLS_LAYOUT = {
  id: 'primary',
  panelClassName: 'bg-skill-stage',
  contentAlignClassName: 'lg:pl-[24rem]',
  railWidthClassName: 'lg:w-[19.5rem]',
  contentMaxClassName: 'max-w-4xl',
} as const satisfies DesktopSkillsLayout;

export const SKILL_THEME_TOKENS = {
  product: { accent: '#7bd0ff', accentSoft: 'rgba(123, 208, 255, 0.16)' },
  ai: { accent: '#c7a5ff', accentSoft: 'rgba(199, 165, 255, 0.16)' },
  architecture: { accent: '#3cddc7', accentSoft: 'rgba(60, 221, 199, 0.16)' },
  tooling: { accent: '#9ee493', accentSoft: 'rgba(158, 228, 147, 0.16)' },
  shipping: { accent: '#f7d774', accentSoft: 'rgba(247, 215, 116, 0.16)' },
  strategy: { accent: '#ffb4ab', accentSoft: 'rgba(255, 180, 171, 0.16)' },
} as const;

export const SKILL_PROFILES = [
  {
    id: 'product-engineering',
    title: 'Product Engineering',
    subtitle: 'React, TypeScript, full-stack features, end-to-end ownership.',
    intro:
      'I build the apps people actually use. React and TypeScript frontend, with enough backend to own features end-to-end.',
    iconKey: 'product',
    ...SKILL_THEME_TOKENS.product,
    capabilities: [
      {
        title: 'User-Facing Apps',
        description:
          'SPAs, portals, and interactive web experiences shipped to real users at scale. Greenfield to production.',
      },
      {
        title: 'Full-Stack Delivery',
        description:
          'Frontend-first, but comfortable owning API integration, serverless functions, and data layers.',
      },
      {
        title: 'Platform & CMS Work',
        description:
          'Shopify, Magento, Webflow, and headless CMS integrations across commerce and marketing.',
      },
    ],
    tools: [
      'React',
      'TypeScript',
      'Next.js',
      'Vite',
      'Node.js',
      'GraphQL',
      'MongoDB',
      'Tailwind',
      'Vercel',
      'Shopify',
    ],
    proofPoints: [
      {
        title: 'Healthcare Patient Portal',
        description:
          'Sole frontend architect of a greenfield React SPA serving ~1,500 new users daily across AU and NZ.',
      },
      {
        title: "McDonald's Menu Boards",
        description:
          "Built React components deployed to digital screens at 2,000+ McDonald's stores across Australia and New Zealand.",
      },
      {
        title: 'Nutricia / Danone',
        description:
          "SSO, loyalty program, and branded checkout on a headless React/Magento PWA for one of the world's largest food companies.",
        url: 'https://www.nutriciastore.com.au',
      },
      {
        title: 'Property Listings Portal',
        description:
          'Full-stack Next.js/MongoDB app with auth, serverless functions, and a dynamic data grid for real estate launches.',
      },
      {
        title: 'Milkrun',
        description:
          'Senior frontend on a TypeScript/React Shopify site built with Next.js. Provided code reviews and mentoring.',
        url: 'https://www.milkrun.com',
      },
    ],
  },
  {
    id: 'ai-automation',
    title: 'AI & Automation',
    subtitle: 'Agentic coding, AI-assisted workflows, CLI tools, and scripts.',
    intro:
      'AI is part of how I build every day. Agentic coding workflows, custom tooling, and terminal automation from editor to deploy.',
    iconKey: 'ai',
    ...SKILL_THEME_TOKENS.ai,
    capabilities: [
      {
        title: 'Agentic Development',
        description:
          'Multi-model AI workflows embedded in the editor. Not autocomplete, actual coding partners.',
      },
      {
        title: 'AI Tooling & Context',
        description:
          'Custom tools that feed structured codebase context to AI agents for planning and generation.',
      },
      {
        title: 'CLI & Pipelines',
        description:
          'Purpose-built terminal tools, local pipeline engines, bash scripts, and workflow glue.',
      },
    ],
    tools: [
      'GitHub Copilot',
      'Codex',
      'Claude',
      'Ollama',
      'Neovim',
      'Lua',
      'Bash',
    ],
    proofPoints: [
      {
        title: 'code-to-notion',
        description:
          'Open-source Node CLI that uploads codebases to Notion with full Git context. Built to give AI agents structured code reasoning.',
        url: 'https://github.com/lpke/code-to-notion',
        showGithubIcon: true,
      },
      {
        title: 'aspyn',
        description:
          'Local pipeline engine that gives your scripts a memory. Stateful step runners, change detection, crash recovery, and scheduling.',
        url: 'https://github.com/lpke/aspyn-legacy',
        showGithubIcon: true,
      },
      {
        title: 'Neovim + CodeCompanion',
        description:
          'Custom Lua-based AI config with multi-model support, agentic workflows, slash commands, and tool approval flows.',
        url: 'https://github.com/lpke/nvim',
        showGithubIcon: true,
      },
      {
        title: 'AI in Production Teams',
        description:
          'Used agentic coding tools daily for feature development, debugging, and iteration across a 100+ engineer codebase.',
      },
      {
        title: 'Local LLM Automation',
        description:
          'Ollama-powered local models for lightweight tasks like web page parsing and text processing.',
      },
    ],
  },
  {
    id: 'code-architecture',
    title: 'Code Architecture',
    subtitle:
      'Design systems, component libraries, monorepos, and build pipelines.',
    intro:
      'I care about how the code is organised, not just that it works. Package boundaries, shared systems, and builds that scale.',
    iconKey: 'architecture',
    ...SKILL_THEME_TOKENS.architecture,
    capabilities: [
      {
        title: 'Design Systems & Components',
        description:
          'Component libraries, Storybook, visual testing, and design consistency at scale.',
      },
      {
        title: 'Monorepo Structure',
        description:
          'Nx workspaces, app/package architecture, and clean dependency boundaries.',
      },
      {
        title: 'Build & Bundle Optimisation',
        description:
          'Custom Vite pipelines, multi-site builds, and performance-focused tooling.',
      },
    ],
    tools: [
      'Nx',
      'Vite',
      'Storybook',
      'Chromatic',
      'TypeScript',
      'AWS CDK',
      'GitHub Actions',
    ],
    proofPoints: [
      {
        title: 'Shared Component Library',
        description:
          'Migrated an internal React form tool into a standalone shared package in an Nx monorepo. Owned the Storybook library and E2E coverage.',
      },
      {
        title: 'Custom Multi-Site Build',
        description:
          "Vite build pipeline with AWS CDK infra that replaced a no-code platform's limits. 75% bundle reduction, 70% faster builds.",
      },
      {
        title: '100+ Engineer Monorepo',
        description:
          'Implemented new apps and packages in a large-scale Nx monorepo, including full CI/CD and IaC for new projects.',
      },
      {
        title: 'Design System Rollout',
        description:
          'Key contributor to design system adoption across multiple patient-facing apps at Montu.',
      },
      {
        title: 'Headless PWA (Nutricia)',
        description:
          'Frontend architecture for a headless React/Magento PWA with component reuse across checkout, SSO, and loyalty flows.',
      },
    ],
  },
  {
    id: 'developer-tooling',
    title: 'Developer Tooling',
    subtitle:
      'Internal tools, DX improvements, mentoring, and knowledge sharing.',
    intro:
      'I build the things that make the team faster. Internal tools, better workflows, and engineers who level up.',
    iconKey: 'tooling',
    ...SKILL_THEME_TOKENS.tooling,
    capabilities: [
      {
        title: 'Internal Tools',
        description:
          'Purpose-built tools and utilities that solve real workflow problems for the team.',
      },
      {
        title: 'Mentoring & Growth',
        description:
          'Levelling up junior engineers through pairing, code reviews, and structured guidance.',
      },
      {
        title: 'Dev Environment',
        description:
          'Neovim, dotfiles, and Linux config, precision-tuned for speed and control.',
      },
    ],
    tools: ['Neovim', 'Lua', 'Linux', 'Bash', 'Storybook', 'Playwright', 'Git'],
    proofPoints: [
      {
        title: 'Internal Tool Documentation',
        description:
          'Wrote docs and streamlined a Storybook library to drive adoption of a shared form tool across engineering.',
      },
      {
        title: 'Mentoring at Montu',
        description:
          'Mentored several junior-mid engineers on React patterns, frontend fundamentals, and code quality.',
      },
      {
        title: 'Technical Hiring',
        description:
          "Conducted technical candidate reviews for Montu's international engineering expansion.",
      },
      {
        title: 'Neovim Config',
        description:
          'Comprehensive custom Neovim setup in Lua. LSP, linting, type checking, keymaps, and AI integration from scratch.',
        url: 'https://github.com/lpke/nvim',
        showGithubIcon: true,
      },
      {
        title: 'Senior Code Reviews',
        description:
          'Provided code reviews and mentorship on a Next.js/React Shopify build as the senior frontend on the project.',
      },
    ],
  },
  {
    id: 'shipping-testing',
    title: 'Shipping & Testing',
    subtitle:
      'CI/CD, automated testing, accessibility, and cloud infrastructure.',
    intro:
      "I write the tests, build the pipelines, and make sure what ships is solid. Quality isn't a phase. It's how I work.",
    iconKey: 'shipping',
    ...SKILL_THEME_TOKENS.shipping,
    capabilities: [
      {
        title: 'Automated Testing',
        description:
          'Unit tests, E2E coverage, and quality gates across the test pyramid.',
      },
      {
        title: 'CI/CD & Infrastructure',
        description:
          'GitHub Actions pipelines, AWS CDK, and infrastructure-as-code for frontend delivery.',
      },
      {
        title: 'Accessibility',
        description:
          'Semantic HTML, ARIA, keyboard navigation, contrast ratios, and compliance audits.',
      },
    ],
    tools: [
      'Playwright',
      'Vitest',
      'GitHub Actions',
      'AWS CDK',
      'Docker',
      'LaunchDarkly',
      'VWO',
    ],
    proofPoints: [
      {
        title: 'Shared Tool E2E Suite',
        description:
          'Built comprehensive Playwright E2E tests for an internal form tool used across multiple patient-facing apps.',
      },
      {
        title: 'Custom CI/CD Pipeline',
        description:
          'GitHub Actions pipeline with AWS CDK infrastructure (S3 + CloudFront) for a multi-site Vite build.',
      },
      {
        title: 'Healthcare App QA',
        description:
          'Unit testing with Vitest and a custom GUI testing tool with state controls for rapid manual QA.',
      },
      {
        title: 'Accessibility at Montu',
        description:
          'Implemented keyboard navigation, ARIA attributes, and contrast fixes across patient-facing apps.',
      },
      {
        title: 'A/B Experimentation',
        description:
          'Built and shipped multiple VWO A/B campaigns with custom variant UIs, client-side logic, and GA4 event tracking.',
      },
    ],
  },
  {
    id: 'technical-strategy',
    title: 'Technical Strategy',
    subtitle:
      'Trade-offs, stakeholder communication, and business-minded decisions.',
    railTextExtraRem: 0.3,
    intro:
      'Commerce graduate turned engineer. I understand the business side because I came from it, and that shapes every technical decision I make.',
    iconKey: 'strategy',
    ...SKILL_THEME_TOKENS.strategy,
    capabilities: [
      {
        title: 'Technical Decision-Making',
        description:
          'Evaluating trade-offs, proposing solutions, and choosing the right approach over the easy one.',
      },
      {
        title: 'Stakeholder Communication',
        description:
          'Explaining technical concepts to non-technical people: clients, product, leadership.',
      },
      {
        title: 'Business Context',
        description:
          'Commerce degree, marketing background, and understanding the why behind the code.',
      },
    ],
    tools: ['GA4', 'GTM', 'VWO', 'A/B Testing', 'Figma'],
    proofPoints: [
      {
        title: 'Code Migration Proposal',
        description:
          'Proposed a full code migration over quick-fix no-code workarounds. Built the business case, got buy-in, and delivered.',
      },
      {
        title: 'Company-Wide Product Demo',
        description:
          'Presented a new patient onboarding flow to ~400 people on a near-company-wide call.',
      },
      {
        title: 'Danone Client Communication',
        description:
          'Communicated technical decisions directly to senior stakeholders at Nutricia/Danone while implementing systems like Yotpo reviews.',
      },
      {
        title: 'Non-Technical Stakeholders',
        description:
          'Explained web app architecture and technical constraints to property developers with no engineering background.',
      },
      {
        title: 'Commerce to Code',
        description:
          'Bachelor of Commerce graduate who moved from marketing strategy to engineering. Business thinking is built in, not bolted on.',
      },
    ],
  },
] as const satisfies readonly SkillProfile[];

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
  body: 'I believe that software is a craft. Beyond just “making it work,” I strive for code that is elegant, testable, and resilient. My approach combines rigorous engineering principles with the creative problem-solving required to navigate complex system constraints.',
  ctaLabel: 'Read the manifesto',
  ctaGlyph: '→',
  stats: {
    value: '12+',
    label: 'Projects Delivered',
    description: 'From startup MVPs to enterprise-grade cloud systems.',
  },
} as const;
