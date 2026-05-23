'use client';

import { useEffect, useState, type CSSProperties } from 'react';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { getSkillIcon } from '@/components/skills/SkillIcons';
import {
  HEADER_CONTENT,
  LAYOUT_CONFIG,
  MOBILE_SKILL_HEADER_EVENT,
  NAV_LINKS,
  SCROLL_TARGETS,
  SECTION_IDS,
  SITE,
  type MobileSkillHeaderDetail,
} from '@/utils/constants';
import { useSectionNav } from '@/hooks/SectionRouterProvider';

const MOBILE_QUERY = LAYOUT_CONFIG.mediaQueries.belowMd;
const SKILL_HEADER_EXIT_MS = 300;

type MobileSkillHeaderStyle = CSSProperties & {
  '--mobile-skill-accent': string;
  '--mobile-skill-accent-soft': string;
};

export function Header() {
  const { activeId, navigateTo } = useSectionNav();
  const [isConcealedForHero, setIsConcealedForHero] = useState(true);
  const [mobileSkillHeader, setMobileSkillHeader] =
    useState<MobileSkillHeaderDetail['skill']>(null);
  const [renderedMobileSkillHeader, setRenderedMobileSkillHeader] =
    useState<MobileSkillHeaderDetail['skill']>(null);

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

  useEffect(() => {
    const handleMobileSkillHeader = (event: Event) => {
      const { detail } = event as CustomEvent<MobileSkillHeaderDetail>;
      setMobileSkillHeader(detail.skill);
    };

    window.addEventListener(MOBILE_SKILL_HEADER_EVENT, handleMobileSkillHeader);

    return () => {
      window.removeEventListener(
        MOBILE_SKILL_HEADER_EVENT,
        handleMobileSkillHeader,
      );
    };
  }, []);

  useEffect(() => {
    if (mobileSkillHeader) {
      setRenderedMobileSkillHeader(mobileSkillHeader);
      return undefined;
    }

    const timeout = setTimeout(() => {
      setRenderedMobileSkillHeader(null);
    }, SKILL_HEADER_EXIT_MS);

    return () => {
      clearTimeout(timeout);
    };
  }, [mobileSkillHeader]);

  const handleNavigate =
    (sectionId: string, scrollTargetId?: string) =>
    (e: { preventDefault: () => void }) => {
      e.preventDefault();
      navigateTo(sectionId, scrollTargetId);
    };

  const handleContactNavigate = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    navigateTo(
      SECTION_IDS.contact,
      window.matchMedia(MOBILE_QUERY).matches
        ? SCROLL_TARGETS.contactCardFirst
        : undefined,
    );
  };

  const handleMobileSkillHeaderClick = () => {
    if (!renderedMobileSkillHeader) {
      return;
    }

    const panel = document.querySelector(
      `[data-mobile-skill-panel="${renderedMobileSkillHeader.id}"]`,
    );

    if (!(panel instanceof HTMLElement)) {
      return;
    }

    const headerPrimary = document.querySelector(
      '[data-site-header-primary="true"]',
    );
    const headerOffset =
      (headerPrimary instanceof HTMLElement
        ? headerPrimary.getBoundingClientRect().bottom
        : 0) + 8;
    const panelTop =
      window.scrollY + panel.getBoundingClientRect().top - headerOffset;

    window.scrollTo({
      top: Math.max(0, panelTop),
      behavior: 'smooth',
    });
  };

  const isSkillHeaderVisible = Boolean(mobileSkillHeader);
  const skillHeaderStyle: MobileSkillHeaderStyle | undefined =
    renderedMobileSkillHeader
      ? {
          '--mobile-skill-accent': renderedMobileSkillHeader.accent,
          '--mobile-skill-accent-soft': renderedMobileSkillHeader.accentSoft,
        }
      : undefined;

  return (
    <header
      data-site-header="true"
      className={`glass-nav ambient-shadow fixed top-0 z-50 w-full transition-opacity duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-[opacity] motion-reduce:transition-none md:opacity-100 ${
        isConcealedForHero
          ? 'pointer-events-none opacity-0 md:pointer-events-auto'
          : 'opacity-100'
      }`}
      style={{ paddingRight: 'var(--scrollbar-gutter, 0px)' }}
    >
      <nav
        data-site-header-primary="true"
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2.5 md:px-8 md:py-4"
      >
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
        <Button href="/contact" onClick={handleContactNavigate} size="sm">
          {HEADER_CONTENT.ctaLabel}
        </Button>
      </nav>

      <div
        aria-hidden={!isSkillHeaderVisible}
        className={`grid overflow-hidden transition-[grid-template-rows,opacity,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
          isSkillHeaderVisible
            ? 'grid-rows-[1fr] border-t border-white/[0.08] opacity-100'
            : 'grid-rows-[0fr] border-t border-transparent opacity-0'
        }`}
        style={skillHeaderStyle}
      >
        <div className="min-h-0">
          <div
            data-mobile-skill-header-menu="true"
            className="mx-auto max-w-7xl px-6 py-2 md:px-8"
          >
            <button
              type="button"
              aria-label={
                renderedMobileSkillHeader
                  ? `Scroll to ${renderedMobileSkillHeader.title} accordion`
                  : undefined
              }
              tabIndex={isSkillHeaderVisible ? 0 : -1}
              onClick={handleMobileSkillHeaderClick}
              className="grid h-10 w-full cursor-pointer grid-cols-[1.75rem_minmax(0,1fr)] items-center gap-3 rounded-md text-left text-[var(--mobile-skill-accent)] transition-[background-color,filter] duration-200 hover:bg-white/[0.045] hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--mobile-skill-accent)]"
            >
              <span
                aria-hidden="true"
                className="grid h-7 w-7 place-items-center"
              >
                {renderedMobileSkillHeader
                  ? getSkillIcon(renderedMobileSkillHeader.iconKey)
                  : null}
              </span>
              <span className="font-headline block min-w-0 truncate text-[1.15rem] leading-tight font-bold tracking-tight">
                {renderedMobileSkillHeader?.title}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
