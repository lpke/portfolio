'use client';

import { useEffect, useState } from 'react';
import { LAYOUT_CONFIG, UI_TEXT } from '@/utils/constants';

const { mediaQueries } = LAYOUT_CONFIG;

type SectionScrollIndicatorProps = {
  nextSectionId: string;
  className?: string;
};

export function SectionScrollIndicator({
  nextSectionId,
  className = '',
}: SectionScrollIndicatorProps) {
  const [isNextHeadingEncountered, setIsNextHeadingEncountered] =
    useState(false);

  useEffect(() => {
    const indicatorQuery = window.matchMedia(
      mediaQueries.sectionScrollIndicator,
    );
    let cleanupActiveIndicator: (() => void) | undefined;

    const cleanup = () => {
      cleanupActiveIndicator?.();
      cleanupActiveIndicator = undefined;
    };

    const setup = () => {
      cleanup();

      if (!indicatorQuery.matches) {
        return;
      }

      const nextSection = document.getElementById(nextSectionId);
      if (!nextSection) return;

      const getTarget = () => {
        const headings = Array.from(
          nextSection.querySelectorAll<HTMLElement>(
            '[data-section-heading], h1, h2',
          ),
        );

        return (
          headings.find((heading) => heading.offsetParent !== null) ?? null
        );
      };

      const updateVisibility = (isVisible: boolean) => {
        setIsNextHeadingEncountered((current) =>
          current === isVisible ? current : isVisible,
        );
      };

      const updateFromRect = () => {
        const target = getTarget();

        if (!target) {
          updateVisibility(false);
          return;
        }

        const { top } = target.getBoundingClientRect();

        updateVisibility(top <= window.innerHeight);
      };

      let frame = 0;
      const requestUpdate = () => {
        if (frame) return;

        frame = window.requestAnimationFrame(() => {
          frame = 0;
          updateFromRect();
        });
      };

      const intersectionObserver = new IntersectionObserver(requestUpdate, {
        threshold: [0, 1],
      });
      const mutationObserver = new MutationObserver(requestUpdate);
      const resizeObserver =
        'ResizeObserver' in window ? new ResizeObserver(requestUpdate) : null;

      updateFromRect();

      intersectionObserver.observe(nextSection);
      mutationObserver.observe(nextSection, {
        childList: true,
        subtree: true,
      });
      resizeObserver?.observe(nextSection);
      window.addEventListener('scroll', requestUpdate, { passive: true });
      window.addEventListener('resize', requestUpdate);

      cleanupActiveIndicator = () => {
        intersectionObserver.disconnect();
        mutationObserver.disconnect();
        resizeObserver?.disconnect();
        window.removeEventListener('scroll', requestUpdate);
        window.removeEventListener('resize', requestUpdate);
        if (frame) {
          window.cancelAnimationFrame(frame);
        }
      };
    };

    setup();
    indicatorQuery.addEventListener('change', setup);

    return () => {
      indicatorQuery.removeEventListener('change', setup);
      cleanup();
    };
  }, [nextSectionId]);

  return (
    <div
      aria-hidden
      className={[
        'section-scroll-indicator pointer-events-none absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 select-none lg:flex',
        isNextHeadingEncountered
          ? 'invisible opacity-0'
          : 'visible opacity-100',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span className="text-on-surface-variant/55 font-mono text-[10px] font-semibold tracking-[0.28em] uppercase">
        {UI_TEXT.scroll}
      </span>
      <span className="section-scroll-line" />
    </div>
  );
}
