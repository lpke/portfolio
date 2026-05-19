export const SKILLS_SECTION_CONTENT = {
  heading: {
    lead: 'What I',
    accent: 'do',
  },
  railAriaLabel: 'Skill focus areas',
} as const;

export type SkillCompetency = {
  label: string;
  description: string;
};

export type SkillExample = {
  title: string;
  detail: string;
  url?: string;
  showGithubIcon?: boolean;
};

export type SkillData = {
  id: string;
  title: string;
  summary: string;
  detail: string;
  iconKey: string;
  accent: string;
  accentSoft: string;
  railTextExtraRem?: number;
  competencies: SkillCompetency[];
  stack: string[];
  examples: SkillExample[];
};

export const SKILL_ACCENTS = {
  product: { accent: '#7bd0ff', accentSoft: 'rgba(123, 208, 255, 0.16)' },
  ai: { accent: '#c7a5ff', accentSoft: 'rgba(199, 165, 255, 0.16)' },
  architecture: { accent: '#3cddc7', accentSoft: 'rgba(60, 221, 199, 0.16)' },
  tooling: { accent: '#9ee493', accentSoft: 'rgba(158, 228, 147, 0.16)' },
  shipping: { accent: '#f7d774', accentSoft: 'rgba(247, 215, 116, 0.16)' },
  strategy: { accent: '#ffb4ab', accentSoft: 'rgba(255, 180, 171, 0.16)' },
} as const;

export const SKILLS: SkillData[] = [
  {
    id: 'product-engineering',
    title: 'Product Engineering',
    summary: 'React, TypeScript, full-stack features, end-to-end ownership.',
    detail:
      'I build the apps people actually use. React and TypeScript frontend, with enough backend to own features end-to-end.',
    iconKey: 'product',
    ...SKILL_ACCENTS.product,
    competencies: [
      {
        label: 'User-Facing Apps',
        description:
          'SPAs, portals, and interactive web experiences shipped to real users at scale. Greenfield to production.',
      },
      {
        label: 'Full-Stack Delivery',
        description:
          'Frontend-first, but comfortable owning API integration, serverless functions, and data layers.',
      },
      {
        label: 'Platform & CMS Work',
        description:
          'Shopify, Magento, Webflow, and headless CMS integrations across commerce and marketing.',
      },
    ],
    stack: [
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
    examples: [
      {
        title: 'Healthcare Patient Portal',
        detail:
          'Sole frontend architect of a greenfield React SPA serving ~1,500 new users daily across AU and NZ.',
      },
      {
        title: "McDonald's Menu Boards",
        detail:
          "Built React components deployed to digital screens at 2,000+ McDonald's stores across Australia and New Zealand.",
      },
      {
        title: 'Nutricia / Danone',
        detail:
          "SSO, loyalty program, and branded checkout on a headless React/Magento PWA for one of the world's largest food companies.",
        url: 'https://www.nutriciastore.com.au',
      },
      {
        title: 'Property Listings Portal',
        detail:
          'Full-stack Next.js/MongoDB app with auth, serverless functions, and a dynamic data grid for real estate launches.',
      },
      {
        title: 'Milkrun',
        detail:
          'Senior frontend on a TypeScript/React Shopify site built with Next.js. Provided code reviews and mentoring.',
        url: 'https://www.milkrun.com',
      },
    ],
  },
  {
    id: 'ai-automation',
    title: 'AI & Automation',
    summary: 'Agentic coding, AI-assisted workflows, CLI tools, and scripts.',
    detail:
      'AI is part of how I build every day. Agentic coding workflows, custom tooling, and terminal automation from editor to deploy.',
    iconKey: 'ai',
    ...SKILL_ACCENTS.ai,
    competencies: [
      {
        label: 'Agentic Development',
        description:
          'Multi-model AI workflows embedded in the editor. Not autocomplete, actual coding partners.',
      },
      {
        label: 'AI Tooling & Context',
        description:
          'Custom tools that feed structured codebase context to AI agents for planning and generation.',
      },
      {
        label: 'CLI & Pipelines',
        description:
          'Purpose-built terminal tools, local pipeline engines, bash scripts, and workflow glue.',
      },
    ],
    stack: [
      'GitHub Copilot',
      'Codex',
      'Claude',
      'Ollama',
      'Neovim',
      'Lua',
      'Bash',
    ],
    examples: [
      {
        title: 'code-to-notion',
        detail:
          'Open-source Node CLI that uploads codebases to Notion with full Git context. Built to give AI agents structured code reasoning.',
        url: 'https://github.com/lpke/code-to-notion',
        showGithubIcon: true,
      },
      {
        title: 'aspyn',
        detail:
          'Local pipeline engine that gives your scripts a memory. Stateful step runners, change detection, crash recovery, and scheduling.',
        url: 'https://github.com/lpke/aspyn-legacy',
        showGithubIcon: true,
      },
      {
        title: 'Neovim + CodeCompanion',
        detail:
          'Custom Lua-based AI config with multi-model support, agentic workflows, slash commands, and tool approval flows.',
        url: 'https://github.com/lpke/nvim',
        showGithubIcon: true,
      },
      {
        title: 'AI in Production Teams',
        detail:
          'Used agentic coding tools daily for feature development, debugging, and iteration across a 100+ engineer codebase.',
      },
      {
        title: 'Local LLM Automation',
        detail:
          'Ollama-powered local models for lightweight tasks like web page parsing and text processing.',
      },
    ],
  },
  {
    id: 'code-architecture',
    title: 'Code Architecture',
    summary:
      'Design systems, component libraries, monorepos, and build pipelines.',
    detail:
      'I care about how the code is organised, not just that it works. Package boundaries, shared systems, and builds that scale.',
    iconKey: 'architecture',
    ...SKILL_ACCENTS.architecture,
    competencies: [
      {
        label: 'Design Systems & Components',
        description:
          'Component libraries, Storybook, visual testing, and design consistency at scale.',
      },
      {
        label: 'Monorepo Structure',
        description:
          'Nx workspaces, app/package architecture, and clean dependency boundaries.',
      },
      {
        label: 'Build & Bundle Optimisation',
        description:
          'Custom Vite pipelines, multi-site builds, and performance-focused tooling.',
      },
    ],
    stack: [
      'Nx',
      'Vite',
      'Storybook',
      'Chromatic',
      'TypeScript',
      'AWS CDK',
      'GitHub Actions',
    ],
    examples: [
      {
        title: 'Shared Component Library',
        detail:
          'Migrated an internal React form tool into a standalone shared package in an Nx monorepo. Owned the Storybook library and E2E coverage.',
      },
      {
        title: 'Custom Multi-Site Build',
        detail:
          "Vite build pipeline with AWS CDK infra that replaced a no-code platform's limits. 75% bundle reduction, 70% faster builds.",
      },
      {
        title: '100+ Engineer Monorepo',
        detail:
          'Implemented new apps and packages in a large-scale Nx monorepo, including full CI/CD and IaC for new projects.',
      },
      {
        title: 'Design System Rollout',
        detail:
          'Key contributor to design system adoption across multiple patient-facing apps at Montu.',
      },
      {
        title: 'Headless PWA (Nutricia)',
        detail:
          'Frontend architecture for a headless React/Magento PWA with component reuse across checkout, SSO, and loyalty flows.',
      },
    ],
  },
  {
    id: 'developer-tooling',
    title: 'Developer Tooling',
    summary:
      'Internal tools, DX improvements, mentoring, and knowledge sharing.',
    detail:
      'I build the things that make the team faster. Internal tools, better workflows, and engineers who level up.',
    iconKey: 'tooling',
    ...SKILL_ACCENTS.tooling,
    competencies: [
      {
        label: 'Internal Tools',
        description:
          'Purpose-built tools and utilities that solve real workflow problems for the team.',
      },
      {
        label: 'Mentoring & Growth',
        description:
          'Levelling up junior engineers through pairing, code reviews, and structured guidance.',
      },
      {
        label: 'Dev Environment',
        description:
          'Neovim, dotfiles, and Linux config, precision-tuned for speed and control.',
      },
    ],
    stack: [
      'Neovim',
      'Lua',
      'Linux',
      'Bash',
      'Storybook',
      'Playwright',
      'Git',
    ],
    examples: [
      {
        title: 'Internal Tool Documentation',
        detail:
          'Wrote docs and streamlined a Storybook library to drive adoption of a shared form tool across engineering.',
      },
      {
        title: 'Mentoring at Montu',
        detail:
          'Mentored several junior-mid engineers on React patterns, frontend fundamentals, and code quality.',
      },
      {
        title: 'Technical Hiring',
        detail:
          "Conducted technical candidate reviews for Montu's international engineering expansion.",
      },
      {
        title: 'Neovim Config',
        detail:
          'Comprehensive custom Neovim setup in Lua. LSP, linting, type checking, keymaps, and AI integration from scratch.',
        url: 'https://github.com/lpke/nvim',
        showGithubIcon: true,
      },
      {
        title: 'Senior Code Reviews',
        detail:
          'Provided code reviews and mentorship on a Next.js/React Shopify build as the senior frontend on the project.',
      },
    ],
  },
  {
    id: 'shipping-testing',
    title: 'Shipping & Testing',
    summary:
      'CI/CD, automated testing, accessibility, and cloud infrastructure.',
    detail:
      "I write the tests, build the pipelines, and make sure what ships is solid. Quality isn't a phase. It's how I work.",
    iconKey: 'shipping',
    ...SKILL_ACCENTS.shipping,
    competencies: [
      {
        label: 'Automated Testing',
        description:
          'Unit tests, E2E coverage, and quality gates across the test pyramid.',
      },
      {
        label: 'CI/CD & Infrastructure',
        description:
          'GitHub Actions pipelines, AWS CDK, and infrastructure-as-code for frontend delivery.',
      },
      {
        label: 'Accessibility',
        description:
          'Semantic HTML, ARIA, keyboard navigation, contrast ratios, and compliance audits.',
      },
    ],
    stack: [
      'Playwright',
      'Vitest',
      'GitHub Actions',
      'AWS CDK',
      'Docker',
      'LaunchDarkly',
      'VWO',
    ],
    examples: [
      {
        title: 'Shared Tool E2E Suite',
        detail:
          'Built comprehensive Playwright E2E tests for an internal form tool used across multiple patient-facing apps.',
      },
      {
        title: 'Custom CI/CD Pipeline',
        detail:
          'GitHub Actions pipeline with AWS CDK infrastructure (S3 + CloudFront) for a multi-site Vite build.',
      },
      {
        title: 'Healthcare App QA',
        detail:
          'Unit testing with Vitest and a custom GUI testing tool with state controls for rapid manual QA.',
      },
      {
        title: 'Accessibility at Montu',
        detail:
          'Implemented keyboard navigation, ARIA attributes, and contrast fixes across patient-facing apps.',
      },
      {
        title: 'A/B Experimentation',
        detail:
          'Built and shipped multiple VWO A/B campaigns with custom variant UIs, client-side logic, and GA4 event tracking.',
      },
    ],
  },
  {
    id: 'technical-strategy',
    title: 'Technical Strategy',
    summary:
      'Trade-offs, stakeholder communication, and business-minded decisions.',
    railTextExtraRem: 0.3,
    detail:
      'Commerce graduate turned engineer. I understand the business side because I came from it, and that shapes every technical decision I make.',
    iconKey: 'strategy',
    ...SKILL_ACCENTS.strategy,
    competencies: [
      {
        label: 'Technical Decision-Making',
        description:
          'Evaluating trade-offs, proposing solutions, and choosing the right approach over the easy one.',
      },
      {
        label: 'Stakeholder Communication',
        description:
          'Explaining technical concepts to non-technical people: clients, product, leadership.',
      },
      {
        label: 'Business Context',
        description:
          'Commerce degree, marketing background, and understanding the why behind the code.',
      },
    ],
    stack: ['GA4', 'GTM', 'VWO', 'A/B Testing', 'Figma'],
    examples: [
      {
        title: 'Code Migration Proposal',
        detail:
          'Proposed a full code migration over quick-fix no-code workarounds. Built the business case, got buy-in, and delivered.',
      },
      {
        title: 'Company-Wide Product Demo',
        detail:
          'Presented a new patient onboarding flow to ~400 people on a near-company-wide call.',
      },
      {
        title: 'Danone Client Communication',
        detail:
          'Communicated technical decisions directly to senior stakeholders at Nutricia/Danone while implementing systems like Yotpo reviews.',
      },
      {
        title: 'Non-Technical Stakeholders',
        detail:
          'Explained web app architecture and technical constraints to property developers with no engineering background.',
      },
      {
        title: 'Commerce to Code',
        detail:
          'Bachelor of Commerce graduate who moved from marketing strategy to engineering. Business thinking is built in, not bolted on.',
      },
    ],
  },
];
