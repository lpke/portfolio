/** Shared site-wide data constants */

export const SITE = {
  name: 'lpdev',
  title: 'Luke Perich',
  role: 'Senior Software Engineer',
  email: 'luke@lpdev.io',
  location: 'Remote / Sydney, AU',
  github: 'https://github.com/lpke',
  linkedin: 'https://www.linkedin.com/in/luke-perich',
  sourceCode: 'https://github.com/lpke/portfolio',
} as const;

/**
 * Section definitions used for navigation, scroll-tracking and URL rewriting.
 * `path` is the clean URL shown in the address bar.
 * `sectionId` is the DOM id of the corresponding <section>.
 */
export const SECTIONS = [
  { label: 'Home', path: '/', sectionId: 'home' },
  { label: 'What I Do', path: '/skills', sectionId: 'skills' },
  { label: 'Contact', path: '/contact', sectionId: 'contact' },
] as const;

/** Backwards-compatible alias used by the Header nav and anywhere else. */
export const NAV_LINKS = SECTIONS;

export const CONTACT_LINKS = [
  {
    icon: '✉',
    iconSrc: '/images/icons/send_white.svg',
    label: 'Email',
    value: 'luke@lpdev.io',
    href: 'mailto:luke@lpdev.io',
    copyContent: 'luke@lpdev.io',
  },
  {
    icon: '👤',
    iconSrc: '/images/icons/linkedin.svg',
    label: 'LinkedIn',
    value: '/in/luke-perich',
    href: 'https://www.linkedin.com/in/luke-perich',
    copyContent: 'https://www.linkedin.com/in/luke-perich',
  },
  {
    icon: '</>',
    iconSrc: '/images/icons/github_white.svg',
    label: 'GitHub',
    value: '@lpke',
    href: 'https://github.com/lpke',
    copyContent: 'https://github.com/lpke',
  },
  {
    icon: '📍',
    iconSrc: '/images/icons/location_white.svg',
    label: 'Location',
    value: 'Remote / Sydney, AU',
    href: null,
    copyContent: null,
  },
] as const;
