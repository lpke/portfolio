/**
 * BACKUP — Original Footer before WIP placeholder.
 * Delete this file when the full site is restored.
 */

// import Link from 'next/link';
// import { SITE } from '@/utils/constants';
//
// const FOOTER_LINKS = [
//   { label: 'luke@lpdev.io', href: `mailto:${SITE.email}` },
//   { label: 'GitHub', href: SITE.github },
//   { label: 'LinkedIn', href: SITE.linkedin },
//   { label: 'Source Code', href: SITE.sourceCode },
// ] as const;
//
// export function Footer() {
//   return (
//     <footer className="mt-20 w-full border-t border-white/5 bg-surface-container-low py-12">
//       <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-8 md:flex-row md:justify-between">
//         <Link
//           href="/"
//           className="font-headline text-lg font-bold text-white"
//         >
//           {SITE.name}
//         </Link>
//
//         <div className="flex flex-wrap justify-center gap-8">
//           {FOOTER_LINKS.map(({ label, href }) => (
//             <a
//               key={label}
//               href={href}
//               target={href.startsWith('mailto') ? undefined : '_blank'}
//               rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
//               className="font-body text-sm text-on-surface-variant/50 transition-all duration-200 hover:-translate-y-0.5 hover:text-primary"
//             >
//               {label}
//             </a>
//           ))}
//         </div>
//
//         <p className="font-body text-sm text-on-surface-variant/50">
//           © {new Date().getFullYear()} {SITE.name}. Built with precision.
//         </p>
//       </div>
//     </footer>
//   );
// }
