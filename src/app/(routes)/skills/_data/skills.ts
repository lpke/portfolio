export const CORE_FOCUS = [
  'JS / TS / React',
  'Web Apps / SPAs',
  'CI/CD',
  'Code Architecture',
  'IaC',
  'Build Tooling & DX',
] as const;

export const RUNTIMES = [
  'Typescript',
  'Javascript',
  'Node.js',
  'Next.js',
  'GraphQL',
  'Bash',
  'Lua',
] as const;

export const PRODUCT_STACK = [
  { tool: 'LaunchDarkly', category: 'Feature Toggles' },
  { tool: 'VWO', category: 'A/B Testing' },
  { tool: 'GA4/GTM', category: 'Analytics' },
  { tool: 'Braze', category: 'CRM' },
  { tool: 'Webflow', category: 'CMS' },
] as const;

export const TOOLS = [
  'Vite',
  'Nx',
  'AWS CDK',
  'GitHub Actions',
  'MUI',
  'Playwright',
  'Vitest',
  'Storybook',
  'Git',
  'Vim/Neovim',
  'Docker',
] as const;

export const TERMINAL_LINES = [
  { text: '# Initializing development environment...', color: 'tertiary' },
  { text: '> npx nx run project:build', color: 'default' },
  { text: '> playwright test --headed', color: 'default' },
  { text: '> cdk deploy --all', color: 'default' },
  { text: 'Status: INFRASTRUCTURE_READY [0.8s]', color: 'primary' },
] as const;

export const CONTACT_LINKS = [
  {
    icon: '✉',
    label: 'Email',
    value: 'luke@lpdev.io',
    href: 'mailto:luke@lpdev.io',
  },
  {
    icon: '👤',
    label: 'LinkedIn',
    value: '/in/lukeperich',
    href: 'https://www.linkedin.com/in/lukeperich',
  },
  {
    icon: '</>',
    label: 'GitHub',
    value: '@lpdev',
    href: 'https://github.com/lpdev',
  },
  {
    icon: '📍',
    label: 'Location',
    value: 'Remote / London, UK',
    href: null,
  },
] as const;
