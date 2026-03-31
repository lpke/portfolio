import type { ReactNode } from 'react';

export type SkillCardData = {
  id: string;
  title: string;
  summary: string;
  /** Key for the icon lookup — resolved in the component layer */
  iconKey: string;
  /** Whether clicking the card opens a detail modal */
  hasModal: boolean;
  /** Modal content (only used when hasModal is true) */
  modal?: {
    tagline: string;
    competencies: { label: string; description: string }[];
    highlights: { label: string; value: string }[];
    tags: string[];
  };
};

export const SKILL_CARDS: SkillCardData[] = [
  {
    id: 'frontend-architecture',
    title: 'Frontend Architecture',
    summary:
      'React, TypeScript, monorepo design, build tooling, microfrontends. Structural foundations for complex web apps.',
    iconKey: 'architecture',
    hasModal: true,
    modal: {
      tagline: 'Designing scalable frontend systems built for growth.',
      competencies: [
        {
          label: 'Monorepo design',
          description:
            'Structuring large-scale repositories using Nx and Turborepo for optimal DX and build performance.',
        },
        {
          label: 'Microfrontends',
          description:
            'Composing independently deployable frontend modules using Module Federation and custom orchestration.',
        },
        {
          label: 'State management',
          description:
            'Architecting predictable data flows with React Query, Zustand, and context-based patterns.',
        },
        {
          label: 'Build tooling',
          description:
            'Configuring Vite, Webpack, and esbuild pipelines tailored to project requirements.',
        },
      ],
      highlights: [
        { label: 'Monorepos shipped', value: '6+' },
        { label: 'Apps maintained', value: '20+' },
        { label: 'Build speed gains', value: '4×' },
      ],
      tags: ['React', 'TypeScript', 'Nx', 'Vite', 'Module Federation'],
    },
  },
  {
    id: 'ui-ux-engineering',
    title: 'UI/UX Engineering',
    summary:
      'Design system implementation, responsive/accessible UI. Translating design vision into pixel-perfect code.',
    iconKey: 'design',
    hasModal: true,
    modal: {
      tagline: 'Bridging design intent and engineering precision.',
      competencies: [
        {
          label: 'Design systems',
          description:
            'Building and maintaining component libraries with consistent tokens, patterns, and documentation.',
        },
        {
          label: 'Responsive layouts',
          description:
            'Crafting fluid interfaces that work beautifully across every viewport and device.',
        },
        {
          label: 'Accessibility',
          description:
            'Implementing WCAG-compliant interfaces with semantic HTML, ARIA, and keyboard navigation.',
        },
        {
          label: 'Motion & interaction',
          description:
            'Adding purposeful animations and micro-interactions that enhance user experience.',
        },
      ],
      highlights: [
        { label: 'Components built', value: '200+' },
        { label: 'Accessibility score', value: '95+' },
        { label: 'Design fidelity', value: '1:1' },
      ],
      tags: ['Figma', 'Storybook', 'MUI', 'Tailwind', 'Radix UI'],
    },
  },
  {
    id: 'developer-experience',
    title: 'Developer Experience',
    summary:
      'CI/CD pipelines, linting/formatting config, dev workflow optimisation. Empowering teams to ship faster.',
    iconKey: 'dx',
    hasModal: true,
    modal: {
      tagline: 'Optimising workflows and automating the path to production.',
      competencies: [
        {
          label: 'CI/CD pipelines',
          description:
            'Automated build, test, and deployment workflows using GitHub Actions and GitLab CI.',
        },
        {
          label: 'Linting/formatting config',
          description:
            'Standardising code quality with ESLint, Prettier, and custom rule-sets for unified codebases.',
        },
        {
          label: 'Dev workflow optimisation',
          description:
            'Reducing cycle times through hot-reloading architectures and efficient local environments.',
        },
        {
          label: 'Custom tooling',
          description:
            'Internal CLI tools and scaffolding engines built to eliminate repetitive boilerplate.',
        },
      ],
      highlights: [
        { label: 'Pipeline uptime', value: '99%' },
        { label: 'Manual debt', value: '0%' },
        { label: 'Build cycle', value: 'Fast' },
      ],
      tags: [
        'GitHub Actions',
        'Docker',
        'Node.js CLI',
        'Turborepo',
        'Husky',
        'Vitest',
      ],
    },
  },
  {
    id: 'automated-testing',
    title: 'Automated Testing',
    summary:
      'Implementing robust testing strategies from unit and integration to E2E and visual regression. Vitest, Playwright, Storybook, Chromatic.',
    iconKey: 'testing',
    hasModal: true,
    modal: {
      tagline:
        'Establishing comprehensive testing cultures for zero-regression deployments.',
      competencies: [
        {
          label: 'Unit & integration testing',
          description:
            'Writing fast, reliable tests with Vitest and React Testing Library for component and logic coverage.',
        },
        {
          label: 'End-to-end testing',
          description:
            'Automating critical user flows with Playwright across browsers and viewports.',
        },
        {
          label: 'Visual regression',
          description:
            'Catching unintended UI changes with Chromatic and Storybook snapshot comparisons.',
        },
        {
          label: 'Test strategy',
          description:
            'Designing the right balance of test types for maximum confidence with minimal overhead.',
        },
      ],
      highlights: [
        { label: 'Coverage target', value: '80%+' },
        { label: 'E2E suites', value: '10+' },
        { label: 'Regressions caught', value: '100s' },
      ],
      tags: ['Vitest', 'Playwright', 'Storybook', 'Chromatic', 'RTL'],
    },
  },
  {
    id: 'experimentation',
    title: 'Experimentation',
    summary:
      'A/B Testing, personalisation, feature flags, analytics. Driving decisions through integrated systems, data and testing.',
    iconKey: 'experimentation',
    hasModal: true,
    modal: {
      tagline:
        'Data-driven product decisions without compromising performance.',
      competencies: [
        {
          label: 'A/B testing',
          description:
            'Designing and implementing experiments with VWO, Optimizely, and custom solutions.',
        },
        {
          label: 'Feature flags',
          description:
            'Progressive rollouts and kill-switches using LaunchDarkly and custom flag systems.',
        },
        {
          label: 'Analytics integration',
          description:
            'Instrumenting events with GA4, GTM, and Segment for actionable product insights.',
        },
        {
          label: 'Personalisation',
          description:
            'Tailoring user experiences based on segments, behaviour, and real-time data.',
        },
      ],
      highlights: [
        { label: 'Experiments run', value: '50+' },
        { label: 'Conversion lifts', value: '15%+' },
        { label: 'Flag systems', value: '3' },
      ],
      tags: ['LaunchDarkly', 'VWO', 'GA4', 'GTM', 'Segment'],
    },
  },
  {
    id: 'performance',
    title: 'Performance',
    summary:
      'Website and build optimisation, bundle analysis, lighthouse audits. Making sites and tools fast for everyone.',
    iconKey: 'performance',
    hasModal: true,
    modal: {
      tagline: 'Making every millisecond count for users and developers.',
      competencies: [
        {
          label: 'Core Web Vitals',
          description:
            'Optimising LCP, FID, and CLS through lazy loading, code splitting, and render strategies.',
        },
        {
          label: 'Bundle analysis',
          description:
            'Identifying and eliminating bloat with webpack-bundle-analyzer and custom visualisation.',
        },
        {
          label: 'Build performance',
          description:
            'Reducing CI/CD build times through caching, parallelisation, and incremental builds.',
        },
        {
          label: 'Lighthouse audits',
          description:
            'Systematic performance scoring and improvement across all key metrics.',
        },
      ],
      highlights: [
        { label: 'Lighthouse score', value: '95+' },
        { label: 'Bundle reduction', value: '40%' },
        { label: 'Build speed', value: '3×' },
      ],
      tags: ['Lighthouse', 'Webpack Analyzer', 'Next.js', 'Vite', 'CDN'],
    },
  },
  {
    id: 'cms-content',
    title: 'CMS & Content',
    summary:
      'Headless CMS integration, component-driven content, configuration of no-code solutions. Modern content management strategies.',
    iconKey: 'cms',
    hasModal: true,
    modal: {
      tagline: 'Architecting flexible content systems for editorial teams.',
      competencies: [
        {
          label: 'Headless CMS integration',
          description:
            'Connecting frontends to Sanity, Contentful, and Strapi with type-safe content models.',
        },
        {
          label: 'Component-driven content',
          description:
            'Building block-based editors where content teams compose pages from reusable components.',
        },
        {
          label: 'No-code configuration',
          description:
            'Setting up Webflow, Builder.io, and similar platforms for non-technical stakeholders.',
        },
        {
          label: 'Content workflows',
          description:
            'Designing preview, approval, and publishing pipelines for content teams.',
        },
      ],
      highlights: [
        { label: 'CMS integrations', value: '5+' },
        { label: 'Content models', value: '50+' },
        { label: 'Editorial UX', value: 'A+' },
      ],
      tags: ['Sanity', 'Contentful', 'Webflow', 'GraphQL', 'REST'],
    },
  },
];
