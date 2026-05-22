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
  iconKey: string;
  accent: string;
  accentSoft: string;
  railTextExtraRem?: number;
};

const SKILL_THEME_TOKENS = {
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
    iconKey: 'product',
    railTextExtraRem: -0.3,
    ...SKILL_THEME_TOKENS.product,
  },
  {
    id: 'ai-automation',
    title: 'AI & Automation',
    subtitle: 'Agentic coding, AI-assisted workflows, CLI tools, and scripts.',
    iconKey: 'ai',
    railTextExtraRem: -0.3,
    ...SKILL_THEME_TOKENS.ai,
  },
  {
    id: 'code-architecture',
    title: 'Code Architecture',
    subtitle:
      'Design systems, component libraries, monorepos, and build pipelines.',
    iconKey: 'architecture',
    ...SKILL_THEME_TOKENS.architecture,
  },
  {
    id: 'developer-tooling',
    title: 'Developer Tooling',
    subtitle:
      'Internal tools, DX improvements, mentoring, and knowledge sharing.',
    iconKey: 'tooling',
    ...SKILL_THEME_TOKENS.tooling,
  },
  {
    id: 'shipping-testing',
    title: 'Shipping & Testing',
    subtitle:
      'CI/CD, automated testing, accessibility, and cloud infrastructure.',
    iconKey: 'shipping',
    railTextExtraRem: -0.3,
    ...SKILL_THEME_TOKENS.shipping,
  },
  {
    id: 'technical-strategy',
    title: 'Technical Strategy',
    subtitle:
      'Trade-offs, stakeholder communication, and business-minded decisions.',
    iconKey: 'strategy',
    ...SKILL_THEME_TOKENS.strategy,
  },
] as const satisfies readonly SkillProfile[];

export const MOBILE_OPEN_ACCORDION_INSET_REM = 0.75;

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
  | 'none'
  | 'scale-down'
  | 'stretch';

export type SkillCardSpan = 'half' | 'full';

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

export const SKILL_CARD_IMAGE_DEFAULT_SIZES = {
  top: '7rem',
  right: '34%',
  bottom: '7rem',
  left: '34%',
} as const satisfies Record<SkillCardImagePosition, string>;

export const SKILL_CARD_IMAGE_BACKGROUND_SIZE = {
  contain: 'contain',
  cover: 'cover',
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
  desktopWidthClassName: 'sm:w-40',
  indicatorLineClassName: 'h-1',
  scrollPauseMs: 500,
  showArrowButtons: false,
  swapMs: 130,
  swipeMaxOffAxisPx: 56,
  swipeMinDistancePx: 44,
};

export const SKILL_CARD_SPAN_CLASS_NAMES = {
  half: 'lg:col-span-3',
  full: 'lg:col-span-6',
} as const satisfies Record<SkillCardSpan, string>;

export type DesktopSkillsLayout = {
  id: string;
  panelClassName: string;
  contentAlignClassName: string;
  railWidthClassName: string;
  railItemWidthRem: number;
  selectedRailItemWidthRem: number;
  railTextInsetRem: number;
  railItemPaddingClassName: string;
  contentMaxClassName: string;
};

export const DESKTOP_SKILLS_LAYOUT = {
  id: 'primary',
  panelClassName: 'bg-skill-stage',
  contentAlignClassName: 'lg:pl-[25.75rem]',
  railWidthClassName: 'lg:w-[21rem]',
  railItemWidthRem: 21,
  selectedRailItemWidthRem: 22.6,
  railTextInsetRem: 4.625,
  railItemPaddingClassName: 'px-[1.125rem] py-[1.125rem]',
  contentMaxClassName: 'max-w-4xl',
} as const satisfies DesktopSkillsLayout;

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
