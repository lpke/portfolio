export const CORE_FOCUS = [
  'TypeScript',
  'React',
  'Next.js',
  'Node.js',
] as const;

export const RUNTIMES = [
  'JavaScript',
  'HTML / CSS',
  'Bash',
  'Python',
  'Lua',
] as const;

export const PRODUCT_STACK: { tool: string; category: string }[] = [
  { tool: 'VWO / Optimizely', category: 'A/B Testing' },
  { tool: 'LaunchDarkly', category: 'Feature Flags' },
  { tool: 'GA4 / GTM', category: 'Analytics' },
  { tool: 'Segment', category: 'CDP' },
  { tool: 'Braze / Iterable', category: 'Lifecycle' },
];

export const TOOLS = [
  'Git',
  'Docker',
  'Nx',
  'Turborepo',
  'Vite',
  'Webpack',
  'Vitest',
  'Playwright',
  'Storybook',
  'Chromatic',
  'ESLint',
  'Prettier',
  'GitHub Actions',
  'Husky',
] as const;

export const TERMINAL_LINES: {
  text: string;
  color: 'tertiary' | 'primary' | '';
}[] = [
  { text: '$ nx run-many --target=build', color: 'tertiary' },
  { text: '✓ 12 projects built in 4.2s', color: 'primary' },
  { text: '$ vitest --coverage', color: 'tertiary' },
  { text: '✓ 348 tests passed · 94% coverage', color: 'primary' },
  { text: '$ playwright test', color: 'tertiary' },
  { text: '✓ 42 E2E scenarios passed', color: 'primary' },
  { text: '$ git push origin main', color: '' },
  { text: '✓ Pipeline green · deployed to prod', color: 'primary' },
];
