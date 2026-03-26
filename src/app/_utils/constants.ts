/** Shared site-wide data constants */

export const SITE = {
  name: 'lpdev',
  title: 'Luke Perich',
  role: 'Senior Software Engineer',
  email: 'luke@lpdev.io',
  location: 'Remote / London, UK',
  github: 'https://github.com/lpdev',
  linkedin: 'https://www.linkedin.com/in/lukeperich',
  sourceCode: 'https://github.com/lpdev/portfolio',
} as const;

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Experience', href: '/experience' },
  { label: 'Projects', href: '/projects' },
  { label: 'Skills', href: '/skills' },
  { label: 'Contact', href: '/skills#contact' },
] as const;
