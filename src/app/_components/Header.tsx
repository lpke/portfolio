'use client';

import { NAV_LINKS, SITE } from '@/utils/constants';
import { useSectionNav } from '@/hooks/SectionRouterProvider';

export function Header() {
  const { activeId, navigateTo } = useSectionNav();

  const handleClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    navigateTo(sectionId);
  };

  return (
    <header className="glass-nav ambient-shadow fixed top-0 z-50 w-full">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
        {/* Logo */}
        <a
          href="/"
          onClick={(e) => handleClick(e, 'home')}
          className="font-headline text-2xl font-black tracking-tighter text-white"
        >
          {SITE.name}
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map(({ label, path, sectionId }) => {
            const isActive = activeId === sectionId;

            return (
              <a
                key={path}
                href={path}
                onClick={(e) => handleClick(e, sectionId)}
                className={`font-headline after:bg-primary relative px-2 py-1 text-sm font-bold tracking-tight transition-colors duration-300 after:absolute after:inset-x-1 after:bottom-0 after:h-0.5 after:origin-center after:rounded-full after:transition-transform after:duration-300 ${
                  isActive
                    ? 'text-primary after:scale-x-100'
                    : 'text-on-surface-variant/60 after:scale-x-0 hover:bg-white/5 hover:text-white'
                }`}
              >
                {label}
              </a>
            );
          })}
        </div>

        {/* CTA Button */}
        <a
          href="/contact"
          onClick={(e) => handleClick(e, 'contact')}
          className="signature-gradient font-headline text-on-primary rounded-full px-6 py-2 text-sm font-bold transition-all hover:shadow-[0_0_20px_rgba(123,208,255,0.4)] active:scale-95"
        >
          Get in Touch
        </a>
      </nav>
    </header>
  );
}
