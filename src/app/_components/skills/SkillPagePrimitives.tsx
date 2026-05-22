import {
  Children,
  isValidElement,
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import {
  SKILL_PAGE_SHELL_CONFIG,
  SKILL_PAGER_CONFIG,
  SKILL_PAGER_COPY,
} from '@/utils/constants';
import { SurfaceOverlay } from '@/components/SurfaceOverlay';
import { cx } from './shared';
import type { SkillPageVariant } from './types';

type SkillPagerPageProps = {
  label: string;
  summary?: string;
  children: ReactNode;
};

type SkillPagerDirection = 'next' | 'previous';
type SkillPagerPhase = 'enter' | 'exit';
type SkillPagerSwipeStart = {
  pointerId: number;
  x: number;
  y: number;
};

type SkillPagerProgressStyle = CSSProperties & {
  '--skill-pager-auto-ms': string;
};

type SkillPagerProps = {
  autoTransition?: boolean;
  autoTransitionMs?: number | null;
  children: ReactNode;
  isVisible?: boolean;
  showArrowButtons?: typeof SKILL_PAGER_CONFIG.showArrowButtons;
};

export function SkillPageShell({
  intro,
  variant,
  children,
}: {
  intro: string;
  variant: SkillPageVariant;
  children: ReactNode;
}) {
  return (
    <>
      <p
        className={cx(
          'max-w-3xl leading-relaxed text-white/90',
          variant === 'desktop'
            ? 'text-[1.18rem] lg:text-[1.25rem]'
            : 'text-base font-medium',
        )}
      >
        {intro}
      </p>
      <div
        className={
          variant === 'desktop'
            ? SKILL_PAGE_SHELL_CONFIG.contentGapClassNames.desktop
            : SKILL_PAGE_SHELL_CONFIG.contentGapClassNames.mobile
        }
      >
        {children}
      </div>
    </>
  );
}

export function SkillGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-flow-dense lg:grid-cols-6">
      {children}
    </div>
  );
}

export function SkillPager({
  autoTransition = false,
  autoTransitionMs,
  children,
  isVisible = true,
  showArrowButtons = SKILL_PAGER_CONFIG.showArrowButtons,
}: SkillPagerProps) {
  const pages = getSkillPages(children);
  const [requestedIndex, setRequestedIndex] = useState(0);
  const [direction, setDirection] = useState<SkillPagerDirection>('next');
  const [phase, setPhase] = useState<SkillPagerPhase>('enter');
  const [isManualAutoTransitionPaused, setIsManualAutoTransitionPaused] =
    useState(false);
  const [isPointerAutoTransitionPaused, setIsPointerAutoTransitionPaused] =
    useState(false);
  const [isScrollAutoTransitionPaused, setIsScrollAutoTransitionPaused] =
    useState(false);
  const autoTransitionRemainingMsRef = useRef<number | null>(null);
  const autoTransitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const scrollPauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const swapTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigationGenerationRef = useRef(0);
  const skipNextContentClickPauseRef = useRef(false);
  const swipeStartRef = useRef<SkillPagerSwipeStart | null>(null);
  const isVisibleRef = useRef(isVisible);
  const pageCount = pages.length;
  const activeIndex = Math.min(requestedIndex, Math.max(pageCount - 1, 0));
  const activePage = pages[activeIndex] ?? pages[0];
  const resolvedAutoTransitionMs =
    autoTransition || typeof autoTransitionMs === 'number'
      ? (autoTransitionMs ?? SKILL_PAGER_CONFIG.autoTransitionMs)
      : null;
  const hasAutoTransition = Boolean(resolvedAutoTransitionMs);
  const isAutoTransitionPaused =
    isManualAutoTransitionPaused ||
    isPointerAutoTransitionPaused ||
    isScrollAutoTransitionPaused;
  const isAutoTransitionVisuallyPaused = isAutoTransitionPaused || !isVisible;
  const shouldShowProgress = hasAutoTransition && !isManualAutoTransitionPaused;
  const progressStyle: SkillPagerProgressStyle | undefined =
    resolvedAutoTransitionMs
      ? { '--skill-pager-auto-ms': `${resolvedAutoTransitionMs}ms` }
      : undefined;

  const clearAutoTransitionTimer = useCallback(() => {
    if (!autoTransitionTimeoutRef.current) {
      return;
    }

    clearTimeout(autoTransitionTimeoutRef.current);
    autoTransitionTimeoutRef.current = null;
  }, []);

  const cancelPendingPageSwap = useCallback(() => {
    if (!swapTimeoutRef.current) {
      return false;
    }

    clearTimeout(swapTimeoutRef.current);
    swapTimeoutRef.current = null;

    return true;
  }, []);

  const cancelScheduledNavigation = useCallback(() => {
    navigationGenerationRef.current += 1;
    clearAutoTransitionTimer();
    return cancelPendingPageSwap();
  }, [cancelPendingPageSwap, clearAutoTransitionTimer]);

  const changePage = useCallback(
    (nextIndex: number, nextDirection: SkillPagerDirection) => {
      const navigationGeneration = navigationGenerationRef.current + 1;
      navigationGenerationRef.current = navigationGeneration;
      const hadPendingPageSwap = cancelPendingPageSwap();

      if (nextIndex === activeIndex) {
        if (hadPendingPageSwap) {
          setPhase('enter');
        }

        return;
      }

      setDirection(nextDirection);
      setPhase('exit');
      swapTimeoutRef.current = setTimeout(() => {
        if (navigationGenerationRef.current !== navigationGeneration) {
          return;
        }

        swapTimeoutRef.current = null;
        setRequestedIndex(nextIndex);
        setPhase('enter');
      }, SKILL_PAGER_CONFIG.swapMs);
    },
    [activeIndex, cancelPendingPageSwap],
  );

  const pauseManualAutoTransition = useCallback(() => {
    if (!hasAutoTransition) {
      return;
    }

    cancelScheduledNavigation();
    autoTransitionRemainingMsRef.current = resolvedAutoTransitionMs;
    setPhase('enter');
    setIsManualAutoTransitionPaused(true);
  }, [cancelScheduledNavigation, hasAutoTransition, resolvedAutoTransitionMs]);

  const toggleManualAutoTransitionPause = useCallback(() => {
    if (!hasAutoTransition) {
      return;
    }

    if (isManualAutoTransitionPaused) {
      cancelScheduledNavigation();
      autoTransitionRemainingMsRef.current = resolvedAutoTransitionMs;
      setPhase('enter');
      setIsManualAutoTransitionPaused(false);
      return;
    }

    pauseManualAutoTransition();
  }, [
    cancelScheduledNavigation,
    hasAutoTransition,
    isManualAutoTransitionPaused,
    pauseManualAutoTransition,
    resolvedAutoTransitionMs,
  ]);

  const selectPageManually = useCallback(
    (nextIndex: number) => {
      if (pageCount <= 1) {
        return;
      }

      const nextActiveIndex = Math.min(
        Math.max(nextIndex, 0),
        Math.max(pageCount - 1, 0),
      );

      cancelScheduledNavigation();
      autoTransitionRemainingMsRef.current = resolvedAutoTransitionMs;

      if (hasAutoTransition) {
        setIsManualAutoTransitionPaused(true);
      }

      if (nextActiveIndex !== activeIndex) {
        setDirection(nextActiveIndex > activeIndex ? 'next' : 'previous');
        setRequestedIndex(nextActiveIndex);
      }

      setPhase('enter');
    },
    [
      activeIndex,
      cancelScheduledNavigation,
      hasAutoTransition,
      pageCount,
      resolvedAutoTransitionMs,
    ],
  );

  const handlePageIndicatorPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLButtonElement>, nextIndex: number) => {
      if (event.pointerType === 'mouse' && event.button !== 0) {
        return;
      }

      selectPageManually(nextIndex);
    },
    [selectPageManually],
  );

  const handlePageIndicatorClick = useCallback(
    (nextIndex: number) => {
      selectPageManually(nextIndex);
    },
    [selectPageManually],
  );

  const pauseAutoTransition = useCallback(() => {
    if (!hasAutoTransition) {
      return;
    }

    if (cancelScheduledNavigation()) {
      setPhase('enter');
    }

    setIsPointerAutoTransitionPaused(true);
  }, [cancelScheduledNavigation, hasAutoTransition]);

  const resumeAutoTransition = useCallback(() => {
    if (!hasAutoTransition) {
      return;
    }

    setIsPointerAutoTransitionPaused(false);
  }, [hasAutoTransition]);

  const clearSwipeStart = useCallback(() => {
    swipeStartRef.current = null;
  }, []);

  const handleSwipeStart = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      skipNextContentClickPauseRef.current = false;

      if (event.pointerType === 'mouse' || hasActiveTextSelection()) {
        return;
      }

      swipeStartRef.current = {
        pointerId: event.pointerId,
        x: event.clientX,
        y: event.clientY,
      };
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [],
  );

  const handleSwipeEnd = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const start = swipeStartRef.current;

      if (!start || start.pointerId !== event.pointerId) {
        return;
      }

      swipeStartRef.current = null;
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }

      if (hasActiveTextSelection()) {
        return;
      }

      const deltaX = event.clientX - start.x;
      const deltaY = event.clientY - start.y;

      if (
        Math.abs(deltaX) < SKILL_PAGER_CONFIG.swipeMinDistancePx ||
        Math.abs(deltaY) > SKILL_PAGER_CONFIG.swipeMaxOffAxisPx
      ) {
        return;
      }

      if (hasActiveTextSelection()) {
        return;
      }

      skipNextContentClickPauseRef.current = true;
      pauseManualAutoTransition();

      if (deltaX < 0) {
        changePage((activeIndex + 1) % pageCount, 'next');
      } else {
        changePage((activeIndex + pageCount - 1) % pageCount, 'previous');
      }
    },
    [activeIndex, changePage, pageCount, pauseManualAutoTransition],
  );

  const handleContentClick = useCallback(() => {
    if (skipNextContentClickPauseRef.current) {
      skipNextContentClickPauseRef.current = false;
      return;
    }

    pauseManualAutoTransition();
  }, [pauseManualAutoTransition]);

  useEffect(() => {
    return () => {
      if (autoTransitionTimeoutRef.current) {
        clearTimeout(autoTransitionTimeoutRef.current);
      }

      if (scrollPauseTimeoutRef.current) {
        clearTimeout(scrollPauseTimeoutRef.current);
      }

      if (swapTimeoutRef.current) {
        clearTimeout(swapTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    isVisibleRef.current = isVisible;
  }, [isVisible]);

  useEffect(() => {
    autoTransitionRemainingMsRef.current = resolvedAutoTransitionMs;
  }, [activeIndex, resolvedAutoTransitionMs]);

  useEffect(() => {
    if (
      !hasAutoTransition ||
      !resolvedAutoTransitionMs ||
      isAutoTransitionPaused ||
      !isVisible ||
      pageCount <= 1 ||
      phase !== 'enter'
    ) {
      return undefined;
    }

    const remainingMs =
      autoTransitionRemainingMsRef.current ?? resolvedAutoTransitionMs;
    const timerStartedAt = performance.now();
    const navigationGeneration = navigationGenerationRef.current;
    const autoTransitionTimeout = setTimeout(() => {
      if (autoTransitionTimeoutRef.current === autoTransitionTimeout) {
        autoTransitionTimeoutRef.current = null;
      }

      if (navigationGenerationRef.current !== navigationGeneration) {
        return;
      }

      autoTransitionRemainingMsRef.current = resolvedAutoTransitionMs;
      changePage((activeIndex + 1) % pageCount, 'next');
    }, remainingMs);
    autoTransitionTimeoutRef.current = autoTransitionTimeout;

    return () => {
      clearTimeout(autoTransitionTimeout);

      if (autoTransitionTimeoutRef.current === autoTransitionTimeout) {
        autoTransitionTimeoutRef.current = null;
      }

      const elapsedMs = performance.now() - timerStartedAt;
      autoTransitionRemainingMsRef.current = Math.max(
        0,
        remainingMs - elapsedMs,
      );
    };
  }, [
    activeIndex,
    changePage,
    hasAutoTransition,
    isManualAutoTransitionPaused,
    isAutoTransitionPaused,
    isVisible,
    pageCount,
    phase,
    resolvedAutoTransitionMs,
  ]);

  useEffect(() => {
    if (!hasAutoTransition) {
      return undefined;
    }

    const pauseAfterScroll = () => {
      if (!isVisibleRef.current) {
        return;
      }

      setIsScrollAutoTransitionPaused(true);

      if (cancelScheduledNavigation()) {
        setPhase('enter');
      }

      if (scrollPauseTimeoutRef.current) {
        clearTimeout(scrollPauseTimeoutRef.current);
      }

      scrollPauseTimeoutRef.current = setTimeout(() => {
        setIsScrollAutoTransitionPaused(false);
        scrollPauseTimeoutRef.current = null;
      }, SKILL_PAGER_CONFIG.scrollPauseMs);
    };

    window.addEventListener('scroll', pauseAfterScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', pauseAfterScroll);

      if (scrollPauseTimeoutRef.current) {
        clearTimeout(scrollPauseTimeoutRef.current);
        scrollPauseTimeoutRef.current = null;
      }
    };
  }, [cancelScheduledNavigation, hasAutoTransition]);

  if (!activePage) {
    return null;
  }

  if (pageCount === 1) {
    return <>{activePage.props.children}</>;
  }

  return (
    <div>
      <nav
        aria-label={SKILL_PAGER_COPY.ariaLabel}
        className="mb-3 flex justify-end sm:mb-2"
      >
        <div
          className={cx(
            'relative flex w-full items-center justify-end gap-2 sm:w-auto',
          )}
        >
          {showArrowButtons && (
            <PagerArrowButton
              label={SKILL_PAGER_COPY.previousLabel}
              direction="previous"
              onClick={() => {
                pauseManualAutoTransition();
                changePage(
                  (activeIndex + pageCount - 1) % pageCount,
                  'previous',
                );
              }}
            />
          )}

          <div
            className={cx(
              'flex h-8 flex-1 items-center gap-2 sm:h-4 sm:flex-none sm:gap-1',
              SKILL_PAGER_CONFIG.desktopWidthClassName,
            )}
          >
            {pages.map((page, index) => {
              const isActive = index === activeIndex;
              const isActiveManuallyPaused =
                isActive && isManualAutoTransitionPaused;

              return (
                <button
                  key={page.props.label}
                  type="button"
                  aria-label={getPageButtonLabel(page, index, pageCount)}
                  aria-current={isActive ? 'page' : undefined}
                  onPointerDown={(event) => {
                    handlePageIndicatorPointerDown(event, index);
                  }}
                  onClick={() => handlePageIndicatorClick(index)}
                  className={cx(
                    'group -my-2 flex h-12 min-w-10 flex-1 items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--skill-accent)] sm:-my-3 sm:h-10 sm:min-w-8',
                    isActive && !hasAutoTransition
                      ? 'cursor-default'
                      : 'cursor-pointer',
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cx(
                      'relative block w-full overflow-hidden rounded-full transition-[box-shadow] duration-200',
                      SKILL_PAGER_CONFIG.indicatorLineClassName,
                      isActiveManuallyPaused
                        ? 'bg-[var(--skill-accent)] opacity-100 shadow-[0_0_10px_var(--skill-accent-soft)]'
                        : isActive
                          ? 'bg-[color:color-mix(in_srgb,var(--skill-accent)_24%,transparent)] opacity-95 shadow-[0_0_10px_var(--skill-accent-soft)]'
                          : 'bg-white/[0.24] opacity-70',
                    )}
                  >
                    {!isActive && (
                      <SurfaceOverlay className="rounded-full bg-white/[0.55] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                    )}

                    {isActive && (
                      <span
                        key={`${activePage.props.label}-${activeIndex}`}
                        aria-hidden="true"
                        data-skill-pager-paused={
                          isAutoTransitionVisuallyPaused ? 'true' : undefined
                        }
                        className={cx(
                          'absolute inset-y-0 left-0 rounded-full bg-[var(--skill-accent)]',
                          shouldShowProgress
                            ? 'skill-pager-progress-bar w-full'
                            : 'w-full',
                        )}
                        style={progressStyle}
                      />
                    )}
                  </span>
                </button>
              );
            })}
          </div>

          <span className="sr-only" aria-live="polite">
            {activePage.props.label} skill content page {activeIndex + 1} of{' '}
            {pageCount}
          </span>

          {hasAutoTransition && isVisible && (
            <div className="shrink-0">
              <SkillPagerTimerButton
                isPaused={isManualAutoTransitionPaused}
                onClick={toggleManualAutoTransitionPause}
              />
            </div>
          )}

          {showArrowButtons && (
            <PagerArrowButton
              label={SKILL_PAGER_COPY.nextLabel}
              direction="next"
              onClick={() => {
                pauseManualAutoTransition();
                changePage((activeIndex + 1) % pageCount, 'next');
              }}
            />
          )}
        </div>
      </nav>

      <div
        className="[touch-action:pan-y]"
        onClick={handleContentClick}
        onMouseLeave={resumeAutoTransition}
        onMouseMove={pauseAutoTransition}
        onPointerCancel={clearSwipeStart}
        onPointerDown={handleSwipeStart}
        onPointerUp={handleSwipeEnd}
      >
        <div
          key={activePage.props.label}
          className="skill-page-panel"
          data-skill-page-direction={direction}
          data-skill-page-phase={phase}
        >
          {activePage.props.children}
        </div>
      </div>
    </div>
  );
}

function getPageButtonLabel(
  page: ReactElement<SkillPagerPageProps>,
  index: number,
  pageCount: number,
) {
  return `${page.props.label} skill content page ${index + 1} of ${pageCount}`;
}

function hasActiveTextSelection() {
  const selection = window.getSelection();

  return Boolean(selection?.toString().trim());
}

function SkillPagerTimerButton({
  isPaused,
  onClick,
}: {
  isPaused: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={
        isPaused ? SKILL_PAGER_COPY.playLabel : SKILL_PAGER_COPY.pauseLabel
      }
      onClick={onClick}
      className={cx(
        'group/timer -my-2 grid h-12 w-8 shrink-0 cursor-pointer place-items-center focus-visible:outline-2 focus-visible:outline-offset-2 sm:-my-3 sm:h-10 sm:w-6',
        isPaused
          ? 'focus-visible:outline-white/35'
          : 'focus-visible:outline-[var(--skill-accent)]',
      )}
    >
      <span
        aria-hidden="true"
        className={cx(
          'grid h-[18px] w-[18px] place-items-center rounded-full border transition-[background-color,border-color,color,opacity] duration-200',
          isPaused
            ? 'text-on-surface-variant/55 group-hover/timer:text-on-surface-variant/75 border-white/[0.13] bg-white/[0.025] opacity-65 group-hover/timer:border-white/[0.22] group-hover/timer:bg-white/[0.045] group-hover/timer:opacity-90'
            : 'border-[color:color-mix(in_srgb,var(--skill-accent)_38%,transparent)] bg-[color:color-mix(in_srgb,var(--skill-accent)_7%,transparent)] text-[var(--skill-accent)] opacity-72 group-hover/timer:border-[color:color-mix(in_srgb,var(--skill-accent)_68%,transparent)] group-hover/timer:bg-[color:color-mix(in_srgb,var(--skill-accent)_12%,transparent)] group-hover/timer:opacity-100',
        )}
      >
        {isPaused ? <TimerPlayIcon /> : <TimerPauseIcon />}
      </span>
    </button>
  );
}

function TimerPauseIcon() {
  return (
    <span
      aria-hidden="true"
      className="flex items-center justify-center gap-[3px]"
    >
      <span className="h-2 w-0.5 rounded-full bg-current" />
      <span className="h-2 w-0.5 rounded-full bg-current" />
    </span>
  );
}

function TimerPlayIcon() {
  return (
    <svg aria-hidden="true" className="ml-px h-3 w-3" viewBox="0 0 12 12">
      <path d="M3.5 2.3v7.4L9 6z" fill="currentColor" />
    </svg>
  );
}

function PagerArrowButton({
  label,
  direction,
  onClick,
}: {
  label: string;
  direction: SkillPagerDirection;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="text-on-surface-variant/74 grid h-6 w-6 place-items-center rounded-[5px] transition-[background-color,color,filter] duration-200 hover:bg-white/[0.055] hover:text-white hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--skill-accent)]"
    >
      <PagerArrowIcon direction={direction} />
    </button>
  );
}

function PagerArrowIcon({ direction }: { direction: SkillPagerDirection }) {
  return (
    <svg
      aria-hidden="true"
      className={cx('h-3.5 w-3.5', direction === 'previous' && 'rotate-180')}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M7.5 4.5 13 10l-5.5 5.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export function SkillPage({ children }: SkillPagerPageProps) {
  return <>{children}</>;
}

function getSkillPages(children: ReactNode) {
  return Children.toArray(children).filter(
    (child): child is ReactElement<SkillPagerPageProps> =>
      isValidElement<SkillPagerPageProps>(child) && child.type === SkillPage,
  );
}
