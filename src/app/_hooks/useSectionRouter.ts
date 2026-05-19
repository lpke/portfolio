'use client';

import { useEffect, useRef, useCallback } from 'react';
import {
  DEFAULT_SECTION_ID,
  LAYOUT_CONFIG,
  SECTIONS,
} from '@/utils/constants';

/** Map sectionId → clean path */
const ID_TO_PATH: Record<string, string> = Object.fromEntries(
  SECTIONS.map(({ sectionId, path }) => [sectionId, path]),
);

/** Map clean path → sectionId */
const PATH_TO_ID: Record<string, string> = Object.fromEntries(
  SECTIONS.map(({ sectionId, path }) => [path, sectionId]),
);

const SECTION_IDS = SECTIONS.map(({ sectionId }) => sectionId);

/**
 * Keeps the browser URL in sync with the currently visible section and
 * handles initial scroll-to-section when the page loads with a section path.
 *
 * Returns `activeId` (the id of the currently visible section) and a
 * `navigateTo` function for programmatic scrolling.
 */
export function useSectionRouter() {
  const activeIdRef = useRef<string>(DEFAULT_SECTION_ID);
  const isUserScrolling = useRef(true);
  /** When true, observer notifications to listeners (navbar highlighting) are paused. */
  const isAnimating = useRef(false);
  const activeListeners = useRef<Set<(id: string) => void>>(new Set());

  // --- Update URL without triggering Next.js navigation ---
  const updateUrl = useCallback((sectionId: string) => {
    const path = ID_TO_PATH[sectionId] ?? '/';
    if (window.location.pathname !== path) {
      window.history.replaceState(null, '', path);
    }
  }, []);

  // --- Scroll to a section programmatically ---
  const navigateTo = useCallback(
    (sectionId: string, scrollTargetId?: string) => {
      const el = document.getElementById(scrollTargetId ?? sectionId);
      if (!el) return;

      // Temporarily mark as programmatic scroll so the observer doesn't
      // fight with the pushState below.
      isUserScrolling.current = false;

      // Pause observer-driven navbar highlighting during the animation.
      // Immediately highlight the target section instead.
      isAnimating.current = true;
      activeIdRef.current = sectionId;
      activeListeners.current.forEach((fn) => fn(sectionId));

      // Use pushState (not replaceState) so the back button works.
      const path = ID_TO_PATH[sectionId] ?? '/';
      if (window.location.pathname !== path) {
        window.history.pushState(null, '', path);
      }

      el.scrollIntoView({ behavior: 'smooth' });

      // Re-enable observer-driven URL updates and navbar highlighting
      // after the scroll finishes. Config value is generous enough for long
      // smooth scrolls.
      setTimeout(() => {
        isUserScrolling.current = true;
        isAnimating.current = false;
      }, LAYOUT_CONFIG.motion.navScrollSettleMs);
    },
    [],
  );

  useEffect(() => {
    // --- IntersectionObserver: track which section is in view ---
    const elements = SECTION_IDS.map((id) =>
      document.getElementById(id),
    ).filter(Boolean) as HTMLElement[];
    const sectionElements = new Map(elements.map((el) => [el.id, el]));

    if (elements.length === 0) return;

    // Keep a persistent map of which sections are currently intersecting,
    // so we can always pick the best one — not just from the current batch.
    const visibleSections = new Map<string, IntersectionObserverEntry>();

    const observer = new IntersectionObserver(
      (entries) => {
        // Update our persistent visibility map
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleSections.set(entry.target.id, entry);
          } else {
            visibleSections.delete(entry.target.id);
          }
        }

        if (visibleSections.size === 0) return;

        // Pick the visible section whose top edge is closest to (but not
        // above) the viewport top. This naturally selects the section the
        // user is reading, regardless of scroll direction.
        let bestId: string | null = null;
        let bestTop = Infinity;

        for (const [id] of visibleSections) {
          const el = sectionElements.get(id);
          if (!el) continue;
          const rect = el.getBoundingClientRect();
          // Use abs distance of the section top from the viewport top;
          // sections closer to the top win.
          const dist = Math.abs(rect.top);
          if (dist < bestTop) {
            bestTop = dist;
            bestId = id;
          }
        }

        if (bestId && bestId !== activeIdRef.current) {
          activeIdRef.current = bestId;
          // Only update the URL when the user is actually scrolling
          if (isUserScrolling.current) {
            updateUrl(bestId);
          }
          // Only notify listeners (navbar highlighting) when not animating
          // from a programmatic navigation — prevents the highlight from
          // jumping through intermediate sections during smooth scroll.
          if (!isAnimating.current) {
            activeListeners.current.forEach((fn) => fn(bestId!));
          }
        }
      },
      {
        rootMargin: LAYOUT_CONFIG.sectionObserver.rootMargin,
        threshold: [...LAYOUT_CONFIG.sectionObserver.threshold],
      },
    );

    elements.forEach((el) => observer.observe(el));

    // --- Handle browser back/forward ---
    const handlePopState = () => {
      const id =
        PATH_TO_ID[window.location.pathname] ?? DEFAULT_SECTION_ID;
      const el = document.getElementById(id);
      if (el) {
        isUserScrolling.current = false;
        isAnimating.current = true;
        activeIdRef.current = id;
        activeListeners.current.forEach((fn) => fn(id));

        el.scrollIntoView({ behavior: 'smooth' });

        setTimeout(() => {
          isUserScrolling.current = true;
          isAnimating.current = false;
        }, LAYOUT_CONFIG.motion.navScrollSettleMs);
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      observer.disconnect();
      window.removeEventListener('popstate', handlePopState);
    };
  }, [updateUrl]);

  return { navigateTo, activeListeners, activeIdRef };
}
