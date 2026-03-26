'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_LINKS, SITE } from '@/utils/constants';

export function Header() {
  const pathname = usePathname();

  return (
    <header className="glass-nav ambient-shadow fixed top-0 z-50 w-full">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="font-headline text-2xl font-black tracking-tighter text-white"
        >
          {SITE.name}
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive =
              href === '/'
                ? pathname === '/'
                : pathname.startsWith(href.split('#')[0]!);

            return (
              <Link
                key={href}
                href={href}
                className={`font-headline text-sm font-bold tracking-tight transition-all duration-300 ${
                  isActive
                    ? 'border-b-2 border-primary pb-1 text-primary'
                    : 'rounded px-2 py-1 text-on-surface-variant/60 hover:bg-white/5 hover:text-white'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* CTA Button */}
        <Link
          href="/skills#contact"
          className="signature-gradient rounded-full px-6 py-2 font-headline text-sm font-bold text-on-primary transition-all hover:shadow-[0_0_20px_rgba(123,208,255,0.4)] active:scale-95"
        >
          Get in Touch
        </Link>
      </nav>
    </header>
  );
}
