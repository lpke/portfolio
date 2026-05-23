'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/Button';
import {
  HEADER_CONTENT,
  LAYOUT_CONFIG,
  NAV_LINKS,
  SCROLL_TARGETS,
  SECTION_IDS,
  SITE,
} from '@/utils/constants';
import { useSectionNav } from '@/hooks/SectionRouterProvider';

const MOBILE_QUERY = LAYOUT_CONFIG.mediaQueries.belowMd;

export function Header() {
  const { activeId, navigateTo } = useSectionNav();
  const [isConcealedForHero, setIsConcealedForHero] = useState(true);

  useEffect(() => {
    const mobileQuery = window.matchMedia(MOBILE_QUERY);
    let frame = 0;
    let actions: Element | null = document.querySelector('[data-hero-actions]');

    const setConcealed = (nextValue: boolean) => {
      setIsConcealedForHero((current) =>
        current === nextValue ? current : nextValue,
      );
    };

    const updateVisibility = () => {
      frame = 0;

      if (!mobileQuery.matches) {
        setConcealed(false);
        return;
      }

      actions ??= document.querySelector('[data-hero-actions]');
      setConcealed(actions ? actions.getBoundingClientRect().top > 0 : false);
    };

    const requestUpdate = () => {
      if (!mobileQuery.matches) return;
      if (frame) return;
      frame = window.requestAnimationFrame(updateVisibility);
    };

    updateVisibility();
    mobileQuery.addEventListener('change', updateVisibility);
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      mobileQuery.removeEventListener('change', updateVisibility);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, []);

  const handleNavigate =
    (sectionId: string, scrollTargetId?: string) =>
    (e: { preventDefault: () => void }) => {
      e.preventDefault();
      navigateTo(sectionId, scrollTargetId);
    };

  return (
    <header
      className={`glass-nav ambient-shadow fixed top-0 z-50 w-full transition-opacity duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-[opacity] motion-reduce:transition-none md:opacity-100 ${
        isConcealedForHero
          ? 'pointer-events-none opacity-0 md:pointer-events-auto'
          : 'opacity-100'
      }`}
      style={{ paddingRight: 'var(--scrollbar-gutter, 0px)' }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8">
        {/* Logo */}
        <Link
          href="/"
          onNavigate={handleNavigate(SECTION_IDS.home)}
          className="font-headline text-xl font-black tracking-tighter text-white/90"
        >
          {SITE.name}
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map(({ label, path, sectionId }) => {
            const isActive = activeId === sectionId;

            return (
              <Link
                key={path}
                href={path}
                onNavigate={handleNavigate(sectionId)}
                className={`font-headline after:bg-primary relative px-2 py-1 text-sm font-bold tracking-tight transition-colors duration-300 after:absolute after:inset-x-1 after:bottom-0 after:h-0.5 after:origin-center after:rounded-full after:transition-transform after:duration-300 ${
                  isActive
                    ? 'text-primary after:scale-x-100'
                    : 'text-on-surface-variant/60 after:scale-x-0 hover:bg-white/5 hover:text-white'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* CTA Button */}
        <Button
          href="/contact"
          onClick={handleNavigate(
            SECTION_IDS.contact,
            SCROLL_TARGETS.contactCardFirst,
          )}
          size="sm"
        >
          {HEADER_CONTENT.ctaLabel}
        </Button>
      </nav>
    </header>
  );
}
