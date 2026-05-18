export type SkillCompetency = {
  label: string;
  description: string;
};

export type SkillExample = {
  title: string;
  detail: string;
};

export type SkillData = {
  id: string;
  title: string;
  summary: string;
  detail: string;
  iconKey: string;
  accent: string;
  accentSoft: string;
  competencies: SkillCompetency[];
  stack: string[];
  examples: SkillExample[];
};

export const SKILLS: SkillData[] = [
  {
    id: 'product-engineering',
    title: 'Product Engineering',
    summary: 'React, TypeScript, full-stack features, end-to-end ownership.',
    detail:
      'I build the apps people actually use. React and TypeScript frontend, with enough backend to own features end-to-end.',
    iconKey: 'product',
    accent: '#7bd0ff',
    accentSoft: 'rgba(123, 208, 255, 0.16)',
    competencies: [
      {
        label: 'User-Facing Apps',
        description:
          'SPAs, portals, and interactive web experiences shipped to real users at scale.',
      },
      {
        label: 'Full-Stack Delivery',
        description:
          'Frontend-first, but comfortable owning API integration, serverless functions, and data layers.',
      },
      {
        label: 'Greenfield Builds',
        description:
          'New products from zero. Stack selection, architecture decisions, and first deploy.',
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
      'REST',
      'MongoDB',
      'MUI',
      'Tailwind',
      'Zod',
      'Vercel',
      'Shopify',
      'Magento',
      'Webflow',
      'Sanity',
      'Contentful',
    ],
    examples: [
      {
        title: 'Pre-Consultation Portal',
        detail:
          'Sole frontend architect of a greenfield React SPA at Montu, serving ~1,500 new users daily across AU and NZ.',
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
      },
      {
        title: 'Releases Web App',
        detail:
          'Full-stack Next.js/MongoDB portal with auth, serverless functions, and a dynamic data grid for property releases.',
      },
      {
        title: 'Milkrun',
        detail:
          'Senior frontend on a TypeScript/React Shopify site built with Next.js. Provided code reviews and mentoring.',
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
    accent: '#c7a5ff',
    accentSoft: 'rgba(199, 165, 255, 0.16)',
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
      'OpenAI Codex',
      'Claude',
      'GPT',
      'Ollama',
      'CodeCompanion.nvim',
      'Neovim',
      'Lua',
      'Bash',
      'Node.js',
      'TypeScript',
      'Notion API',
      'Google Stitch',
    ],
    examples: [
      {
        title: 'code-to-notion',
        detail:
          'Open-source Node CLI that uploads codebases to Notion with full Git context. Built to give AI agents structured code reasoning.',
      },
      {
        title: 'aspyn',
        detail:
          'Local pipeline engine that gives your scripts a memory. Stateful step runners, change detection, crash recovery, and scheduling.',
      },
      {
        title: 'Neovim + CodeCompanion',
        detail:
          'Custom Lua-based AI config with multi-model support, agentic workflows, slash commands, and tool approval flows.',
      },
      {
        title: 'AI at Montu',
        detail:
          'Used agentic coding tools daily for feature development, debugging, and iteration across a 100+ engineer monorepo.',
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
    accent: '#3cddc7',
    accentSoft: 'rgba(60, 221, 199, 0.16)',
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
      'Webpack',
      'Storybook',
      'Chromatic',
      'MUI',
      'Tailwind',
      'pnpm',
      'TypeScript',
      'AWS CDK',
      'GitHub Actions',
      'React',
      'ESLint',
      'Prettier',
    ],
    examples: [
      {
        title: 'FormBuilder Migration',
        detail:
          'Helped migrate an internal React form tool into a standalone shared package in an Nx monorepo. Owned the Storybook library and E2E coverage.',
      },
      {
        title: 'Alternaleaf Build Pipeline',
        detail:
          "Custom Vite multi-site build with AWS CDK infra that replaced Webflow's code limits. 75% bundle reduction, 70% faster builds.",
      },
      {
        title: 'Montu Monorepo',
        detail:
          'Implemented new apps and packages in a 100+ engineer Nx monorepo, including full CI/CD and IaC for new projects.',
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
    accent: '#9ee493',
    accentSoft: 'rgba(158, 228, 147, 0.16)',
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
      'Vitest',
      'Figma',
      'Jira',
      'Confluence',
      'Notion',
      'Git',
      'GitHub',
    ],
    examples: [
      {
        title: 'FormBuilder Docs & Adoption',
        detail:
          'Wrote internal documentation and streamlined the Storybook library to drive adoption of a shared form tool across engineering.',
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
      },
      {
        title: 'Milkrun Code Reviews',
        detail:
          'Senior frontend providing code reviews and mentorship on a Next.js/React Shopify build at Acidgreen.',
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
    accent: '#f7d774',
    accentSoft: 'rgba(247, 215, 116, 0.16)',
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
      'S3',
      'CloudFront',
      'Vercel',
      'LaunchDarkly',
      'VWO',
      'GA4',
      'GTM',
      'Docker',
    ],
    examples: [
      {
        title: 'FormBuilder E2E',
        detail:
          'Built comprehensive Playwright E2E test suites for a shared form tool used across multiple patient-facing apps.',
      },
      {
        title: 'Alternaleaf CI/CD',
        detail:
          'GitHub Actions pipeline with AWS CDK infrastructure (S3 + CloudFront) for a custom Vite multi-site build.',
      },
      {
        title: 'Pre-Consultation Portal QA',
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
    detail:
      'Commerce graduate turned engineer. I understand the business side because I came from it, and that shapes every technical decision I make.',
    iconKey: 'strategy',
    accent: '#ffb4ab',
    accentSoft: 'rgba(255, 180, 171, 0.16)',
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
    stack: [
      'Commerce',
      'Marketing',
      'Strategy',
      'Google Ads',
      'GA4',
      'GTM',
      'VWO',
      'Braze',
      'A/B Testing',
      'Figma',
      'Webflow',
    ],
    examples: [
      {
        title: 'Alternaleaf Migration Proposal',
        detail:
          'Proposed a full code migration over quick-fix Webflow workarounds. Built the business case, got buy-in, and delivered.',
      },
      {
        title: 'Portal Presentation',
        detail:
          "Presented the Pre-Consultation Portal's new user flow to ~400 people on a near-company-wide call at Montu.",
      },
      {
        title: 'Danone Client Communication',
        detail:
          'Communicated technical decisions directly to senior stakeholders at Nutricia/Danone while implementing systems like Yotpo reviews.',
      },
      {
        title: 'Greenfields Tech Translation',
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
