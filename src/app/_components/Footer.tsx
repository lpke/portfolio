import Link from 'next/link';
import { FOOTER_CONTENT, FOOTER_LINKS, SITE } from '@/utils/constants';

export function Footer() {
  return (
    <footer className="bg-surface-container-low mt-20 w-full border-t border-white/5 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-8 md:flex-row md:justify-between">
        <Link href="/" className="font-headline text-lg font-bold text-white">
          {SITE.name}
        </Link>

        <div className="flex flex-wrap justify-center gap-8">
          {FOOTER_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel={
                href.startsWith('mailto') ? undefined : 'noopener noreferrer'
              }
              className="font-body text-on-surface-variant/50 hover:text-primary text-sm transition-all duration-200 hover:-translate-y-0.5"
            >
              {label}
            </a>
          ))}
        </div>

        <p className="font-body text-on-surface-variant/50 text-sm">
          {FOOTER_CONTENT.copyrightSymbol} {new Date().getFullYear()}{' '}
          {SITE.name}. {FOOTER_CONTENT.copyrightSuffix}
        </p>
      </div>
    </footer>
  );
}
