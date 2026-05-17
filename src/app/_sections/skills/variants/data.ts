export type SkillMetric = {
  label: string;
  value: string;
};

export type SkillCompetency = {
  label: string;
  description: string;
};

export type SkillExample = {
  title: string;
  detail: string;
};

export type SkillVariantData = {
  id: string;
  title: string;
  shortTitle: string;
  eyebrow: string;
  summary: string;
  detail: string;
  iconKey: string;
  accent: string;
  accentSoft: string;
  metrics: SkillMetric[];
  competencies: SkillCompetency[];
  stack: string[];
  examples: SkillExample[];
};

export const VARIANT_SKILLS: SkillVariantData[] = [
  {
    id: 'frontend-architecture',
    title: 'Frontend Architecture',
    shortTitle: 'Architecture',
    eyebrow: 'Systems design',
    summary:
      'React, TypeScript, monorepos, build tooling, and composable foundations for complex web apps.',
    detail:
      'I turn frontend codebases into systems that stay readable while teams, surfaces, and delivery pressure grow. The work spans app boundaries, state strategy, package structure, build pipelines, and clear component contracts.',
    iconKey: 'architecture',
    accent: '#7bd0ff',
    accentSoft: 'rgba(123, 208, 255, 0.16)',
    metrics: [
      { label: 'Monorepos', value: '6+' },
      { label: 'Apps', value: '20+' },
      { label: 'Build gains', value: '4x' },
    ],
    competencies: [
      {
        label: 'Monorepo design',
        description:
          'Nx and Turborepo structures with clear ownership, fast affected builds, and shared package boundaries.',
      },
      {
        label: 'App composition',
        description:
          'Microfrontend and modular app patterns that let teams ship independently without fragmenting UX.',
      },
      {
        label: 'State and data flow',
        description:
          'Predictable React state, server state, caching, and hydration decisions for resilient interfaces.',
      },
      {
        label: 'Build tooling',
        description:
          'Vite, Webpack, and compiler setup tuned for project constraints instead of generic defaults.',
      },
    ],
    stack: ['React', 'TypeScript', 'Next.js', 'Nx', 'Turborepo', 'Vite'],
    examples: [
      {
        title: 'Shared foundations',
        detail:
          'Design tokens, typed utilities, app shells, and package boundaries that reduce duplicate implementation.',
      },
      {
        title: 'Delivery architecture',
        detail:
          'Pipelines and ownership models that let multiple product streams ship without blocking each other.',
      },
    ],
  },
  {
    id: 'ui-ux-engineering',
    title: 'UI/UX Engineering',
    shortTitle: 'UI/UX',
    eyebrow: 'Interface craft',
    summary:
      'Design systems, responsive implementation, accessibility, and product UI that respects design intent.',
    detail:
      'I sit close to the handoff between design and engineering: preserving visual intent, tightening interaction states, and making the result work under real content, real devices, and real users.',
    iconKey: 'design',
    accent: '#c7a5ff',
    accentSoft: 'rgba(199, 165, 255, 0.16)',
    metrics: [
      { label: 'Components', value: '200+' },
      { label: 'A11y score', value: '95+' },
      { label: 'Fidelity', value: '1:1' },
    ],
    competencies: [
      {
        label: 'Design systems',
        description:
          'Reusable components, tokens, variants, docs, and usage rules that keep product UI coherent.',
      },
      {
        label: 'Responsive layouts',
        description:
          'Interfaces that adapt cleanly across mobile, tablet, desktop, and dense internal tools.',
      },
      {
        label: 'Accessibility',
        description:
          'Semantic HTML, keyboard flows, focus states, and ARIA where it improves assistive technology support.',
      },
      {
        label: 'Motion and states',
        description:
          'Small interactions that clarify cause and effect without slowing down repeated use.',
      },
    ],
    stack: ['Figma', 'Storybook', 'Tailwind', 'Radix UI', 'HTML', 'CSS'],
    examples: [
      {
        title: 'Responsive product surfaces',
        detail:
          'Layouts that preserve hierarchy from compact mobile views through wide operational workspaces.',
      },
      {
        title: 'Accessible component systems',
        detail:
          'Keyboard-friendly primitives with consistent state, disabled, focus, and error behavior.',
      },
    ],
  },
  {
    id: 'developer-experience',
    title: 'Developer Experience',
    shortTitle: 'DX',
    eyebrow: 'Team leverage',
    summary:
      'CI/CD, linting, local workflow, internal tooling, and automation that helps teams ship without drag.',
    detail:
      'I remove friction from the path between idea and production. That usually means better local feedback, sharper CI gates, reusable scaffolds, and guardrails that improve code quality without slowing teams down.',
    iconKey: 'dx',
    accent: '#3cddc7',
    accentSoft: 'rgba(60, 221, 199, 0.16)',
    metrics: [
      { label: 'Uptime', value: '99%' },
      { label: 'Manual steps', value: '0' },
      { label: 'Cycle time', value: 'Fast' },
    ],
    competencies: [
      {
        label: 'CI/CD pipelines',
        description:
          'Automated build, test, deploy, cache, and release flows with useful failure signals.',
      },
      {
        label: 'Code quality systems',
        description:
          'ESLint, Prettier, TypeScript, hooks, and review checks that are strict but explainable.',
      },
      {
        label: 'Local workflow',
        description:
          'Fast dev servers, seed data, scripts, and task runners that make everyday work smoother.',
      },
      {
        label: 'Custom tooling',
        description:
          'Internal CLIs and generators that remove repetitive setup and keep conventions consistent.',
      },
    ],
    stack: [
      'GitHub Actions',
      'Docker',
      'Node.js',
      'ESLint',
      'Prettier',
      'Husky',
    ],
    examples: [
      {
        title: 'Automated quality path',
        detail:
          'Pre-merge feedback that catches type, test, visual, and formatting issues before they become review noise.',
      },
      {
        title: 'Scaffolding engines',
        detail:
          'Generators that create routes, components, test files, and package wiring from one command.',
      },
    ],
  },
  {
    id: 'automated-testing',
    title: 'Automated Testing',
    shortTitle: 'Testing',
    eyebrow: 'Confidence systems',
    summary:
      'Testing strategy across unit, integration, E2E, and visual regression for confident product changes.',
    detail:
      'I build test coverage around user value and change risk. The goal is not just more tests, but feedback that catches breakage at the cheapest useful layer and stays stable through refactors.',
    iconKey: 'testing',
    accent: '#9ee493',
    accentSoft: 'rgba(158, 228, 147, 0.16)',
    metrics: [
      { label: 'Coverage', value: '80%+' },
      { label: 'E2E suites', value: '10+' },
      { label: 'Regression risk', value: 'Lower' },
    ],
    competencies: [
      {
        label: 'Unit and integration',
        description:
          'Fast component and logic tests with clear mocks, useful assertions, and low maintenance overhead.',
      },
      {
        label: 'End-to-end flows',
        description:
          'Playwright coverage for critical paths, permissions, viewport behavior, and browser differences.',
      },
      {
        label: 'Visual regression',
        description:
          'Storybook and screenshot checks for high-value UI surfaces where pixel shifts matter.',
      },
      {
        label: 'Testing strategy',
        description:
          'Choosing the right test layer and keeping the suite fast enough that teams trust it.',
      },
    ],
    stack: ['Vitest', 'Playwright', 'Storybook', 'Chromatic', 'RTL', 'MSW'],
    examples: [
      {
        title: 'Risk-based suites',
        detail:
          'Coverage concentrated around payments, auth, forms, navigation, and high-change shared components.',
      },
      {
        title: 'Visual safety net',
        detail:
          'Component stories and snapshots for UI states that are expensive to inspect manually.',
      },
    ],
  },
  {
    id: 'experimentation',
    title: 'Experimentation',
    shortTitle: 'Experiments',
    eyebrow: 'Product learning',
    summary:
      'A/B testing, feature flags, analytics, personalisation, and measurement systems for product decisions.',
    detail:
      'I implement experimentation systems that are measurable, performant, and operationally safe. That includes flag architecture, analytics instrumentation, rollout controls, and clean removal paths.',
    iconKey: 'experimentation',
    accent: '#f7d774',
    accentSoft: 'rgba(247, 215, 116, 0.16)',
    metrics: [
      { label: 'Experiments', value: '50+' },
      { label: 'Lift seen', value: '15%+' },
      { label: 'Flag systems', value: '3' },
    ],
    competencies: [
      {
        label: 'A/B testing',
        description:
          'Client and server experiments with predictable bucketing, clean targeting, and reliable exposure events.',
      },
      {
        label: 'Feature flags',
        description:
          'Progressive rollout, kill switches, environment targeting, and technical-debt cleanup paths.',
      },
      {
        label: 'Analytics integration',
        description:
          'Event naming, payload contracts, and QA flows that make downstream analysis trustworthy.',
      },
      {
        label: 'Personalisation',
        description:
          'Segment-aware experiences that avoid layout instability and unexpected performance costs.',
      },
    ],
    stack: ['LaunchDarkly', 'VWO', 'Optimizely', 'GA4', 'GTM', 'Segment'],
    examples: [
      {
        title: 'Measured releases',
        detail:
          'Flagged launches with cohort tracking, exposure events, and fast rollback paths.',
      },
      {
        title: 'Analytics contracts',
        detail:
          'Typed event maps that let engineering and product agree on what success means before launch.',
      },
    ],
  },
  {
    id: 'performance',
    title: 'Performance',
    shortTitle: 'Performance',
    eyebrow: 'Speed work',
    summary:
      'Core Web Vitals, bundle analysis, build optimisation, and practical speed work for real users.',
    detail:
      'I work performance from both sides: user-perceived speed in the browser and developer-perceived speed in the toolchain. The best gains usually come from measurement, budgets, and targeted removal of waste.',
    iconKey: 'performance',
    accent: '#ffb4ab',
    accentSoft: 'rgba(255, 180, 171, 0.16)',
    metrics: [
      { label: 'Lighthouse', value: '95+' },
      { label: 'Bundle cut', value: '40%' },
      { label: 'Build speed', value: '3x' },
    ],
    competencies: [
      {
        label: 'Core Web Vitals',
        description:
          'LCP, INP, and CLS work grounded in field data, not only lab scores.',
      },
      {
        label: 'Bundle analysis',
        description:
          'Dependency audits, splitting strategy, dead-code removal, and route-level budgets.',
      },
      {
        label: 'Runtime profiling',
        description:
          'React render analysis, main-thread work reduction, and expensive interaction cleanup.',
      },
      {
        label: 'Build performance',
        description:
          'Cache strategy, parallel tasks, incremental builds, and CI tuning for faster delivery.',
      },
    ],
    stack: ['Lighthouse', 'Web Vitals', 'Next.js', 'Webpack', 'Vite', 'CDN'],
    examples: [
      {
        title: 'User speed budgets',
        detail:
          'Route-level performance budgets tied to real content and device constraints.',
      },
      {
        title: 'Build pipeline tuning',
        detail:
          'Cache-aware task graphs that reduce unnecessary rebuilds and shorten feedback loops.',
      },
    ],
  },
  {
    id: 'cms-content',
    title: 'CMS & Content',
    shortTitle: 'CMS',
    eyebrow: 'Editorial systems',
    summary:
      'Headless CMS integration, content modelling, previews, and editor-friendly component systems.',
    detail:
      'I build content systems that give editors real flexibility while keeping engineering control over quality, performance, and design consistency. Schema design matters as much as rendering.',
    iconKey: 'cms',
    accent: '#f2a7d8',
    accentSoft: 'rgba(242, 167, 216, 0.16)',
    metrics: [
      { label: 'CMS builds', value: '5+' },
      { label: 'Models', value: '50+' },
      { label: 'Editor UX', value: 'A+' },
    ],
    competencies: [
      {
        label: 'Headless integration',
        description:
          'Typed data access, preview flows, caching, and deployment integration for modern CMS platforms.',
      },
      {
        label: 'Content modelling',
        description:
          'Schemas that match editorial intent without creating unmaintainable presentation escape hatches.',
      },
      {
        label: 'Composable pages',
        description:
          'Block systems where teams can assemble flexible pages from well-tested components.',
      },
      {
        label: 'Publishing workflow',
        description:
          'Draft, preview, approval, rollback, and localization flows that fit team operations.',
      },
    ],
    stack: ['Sanity', 'Contentful', 'Strapi', 'GraphQL', 'REST', 'Preview'],
    examples: [
      {
        title: 'Component-driven content',
        detail:
          'Reusable content blocks with guardrails for layout, spacing, media, and accessibility.',
      },
      {
        title: 'Preview pipelines',
        detail:
          'Draft previews that let editors inspect real pages before publishing changes.',
      },
    ],
  },
];
