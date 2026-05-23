'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from 'react';
import {
  LAYOUT_CONFIG,
  MOBILE_OPEN_ACCORDION_INSET_REM,
  MOBILE_SKILL_HEADER_EVENT,
  type MobileSkillHeaderDetail,
} from '@/utils/constants';
import {
  SKILL_PAGES,
  type SkillPageDefinition,
} from '@/sections/skills/pages/skillPages';
import { getSkillIcon } from './SkillIcons';
import { SkillsShell } from './SkillsShell';
import { ChevronIcon, SkillsHeading, cx, getSkillStyle } from './shared';

const MOBILE_SKILL_HEADER_FALLBACK_HEIGHT_PX = 56;

export function MobileSkills({ withShell = true }: { withShell?: boolean }) {
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set());
  const lastHeaderSkillIdRef = useRef<string | null>(null);

  const toggleSkill = (id: string) => {
    setOpenIds((current) => {
      const next = new Set(current);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  };

  useEffect(() => {
    const desktopQuery = window.matchMedia(
      LAYOUT_CONFIG.mediaQueries.desktopSkills,
    );
    let frame: number | null = null;

    const setHeaderSkill = (skill: SkillPageDefinition | null) => {
      const nextId = skill?.id ?? null;

      if (lastHeaderSkillIdRef.current === nextId) {
        return;
      }

      lastHeaderSkillIdRef.current = nextId;
      dispatchMobileSkillHeaderChange(skill);
    };

    const updateHeaderSkill = () => {
      frame = null;

      if (desktopQuery.matches || openIds.size === 0) {
        setHeaderSkill(null);
        return;
      }

      const headerPrimary = document.querySelector(
        '[data-site-header-primary="true"]',
      );
      const triggerBottom = headerPrimary?.getBoundingClientRect().bottom ?? 0;
      const titleMenuHeight = getMobileSkillHeaderMenuHeight();
      const requiredVisiblePanelHeight = titleMenuHeight * 2;
      let activeSkill: SkillPageDefinition | null = null;

      SKILL_PAGES.forEach((skill) => {
        if (!openIds.has(skill.id)) {
          return;
        }

        const heading = document.querySelector(
          `[data-mobile-skill-heading="${skill.id}"]`,
        );
        const panel = document.querySelector(
          `[data-mobile-skill-panel="${skill.id}"]`,
        );

        if (
          !(heading instanceof HTMLElement) ||
          !(panel instanceof HTMLElement)
        ) {
          return;
        }

        const headingRect = heading.getBoundingClientRect();
        const panelRect = panel.getBoundingClientRect();
        const isInHeaderRange =
          headingRect.bottom <= triggerBottom &&
          panelRect.bottom > triggerBottom;
        const visiblePanelHeightPastHeader = panelRect.bottom - triggerBottom;
        const hasEnoughVisiblePanel =
          visiblePanelHeightPastHeader >= requiredVisiblePanelHeight;

        if (isInHeaderRange && hasEnoughVisiblePanel) {
          activeSkill = skill;
        }
      });

      setHeaderSkill(activeSkill);
    };

    const scheduleHeaderSkillUpdate = () => {
      if (frame !== null) {
        return;
      }

      frame = window.requestAnimationFrame(updateHeaderSkill);
    };

    updateHeaderSkill();
    desktopQuery.addEventListener('change', scheduleHeaderSkillUpdate);
    window.addEventListener('scroll', scheduleHeaderSkillUpdate, {
      passive: true,
    });
    window.addEventListener('resize', scheduleHeaderSkillUpdate);

    return () => {
      if (frame !== null) {
        window.cancelAnimationFrame(frame);
      }

      desktopQuery.removeEventListener('change', scheduleHeaderSkillUpdate);
      window.removeEventListener('scroll', scheduleHeaderSkillUpdate);
      window.removeEventListener('resize', scheduleHeaderSkillUpdate);
    };
  }, [openIds]);

  useEffect(() => {
    return () => {
      dispatchMobileSkillHeaderChange(null);
    };
  }, []);

  const content = (
    <div className="ghost-border bg-skill-stage relative overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-5 pt-20 pb-8 md:px-8 md:pt-24">
        <SkillsHeading />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl gap-3 px-5 pb-6 md:px-8">
        {SKILL_PAGES.map((skill) => {
          const isOpen = openIds.has(skill.id);

          return (
            <MobileSkillPanel
              key={skill.id}
              skill={skill}
              isOpen={isOpen}
              onToggle={toggleSkill}
            />
          );
        })}
      </div>
    </div>
  );

  if (!withShell) {
    return content;
  }

  return <SkillsShell>{content}</SkillsShell>;
}

function MobileSkillPanel({
  skill,
  isOpen,
  onToggle,
}: {
  skill: SkillPageDefinition;
  isOpen: boolean;
  onToggle: (id: string) => void;
}) {
  const [isSummaryCollapsed, setIsSummaryCollapsed] = useState(isOpen);
  const [isSummaryVisible, setIsSummaryVisible] = useState(!isOpen);
  const [contentMaxHeight, setContentMaxHeight] = useState('0px');
  const contentRef = useRef<HTMLDivElement | null>(null);
  const tapStartRef = useRef<{
    pointerId: number;
    startedAt: number;
    x: number;
    y: number;
    moved: boolean;
  } | null>(null);

  useEffect(() => {
    const timers: Array<ReturnType<typeof setTimeout>> = [];

    if (isOpen) {
      timers.push(setTimeout(() => setIsSummaryVisible(false), 0));
      timers.push(setTimeout(() => setIsSummaryCollapsed(true), 300));
    } else {
      timers.push(setTimeout(() => setIsSummaryCollapsed(false), 0));
      timers.push(setTimeout(() => setIsSummaryVisible(true), 260));
    }

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [isOpen]);

  const syncContentHeight = useCallback(() => {
    const content = contentRef.current;

    if (!content) {
      return;
    }

    setContentMaxHeight(isOpen ? `${content.scrollHeight}px` : '0px');
  }, [isOpen]);

  useEffect(() => {
    const content = contentRef.current;

    if (!content) {
      return undefined;
    }

    let frame: number | null = null;
    const scheduleSync = () => {
      if (frame !== null) {
        cancelAnimationFrame(frame);
      }

      frame = requestAnimationFrame(() => {
        syncContentHeight();
        frame = null;
      });
    };

    scheduleSync();

    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', scheduleSync);

      return () => {
        window.removeEventListener('resize', scheduleSync);

        if (frame !== null) {
          cancelAnimationFrame(frame);
        }
      };
    }

    const observer = new ResizeObserver(scheduleSync);
    observer.observe(content);

    return () => {
      observer.disconnect();

      if (frame !== null) {
        cancelAnimationFrame(frame);
      }
    };
  }, [syncContentHeight]);

  const handlePointerDown = (event: PointerEvent<HTMLElement>) => {
    if (isSkillPanelNonToggleTarget(event)) {
      tapStartRef.current = null;
      return;
    }

    tapStartRef.current = {
      pointerId: event.pointerId,
      startedAt: Date.now(),
      x: event.clientX,
      y: event.clientY,
      moved: false,
    };
  };

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const start = tapStartRef.current;

    if (!start || start.pointerId !== event.pointerId) {
      return;
    }

    const movement = Math.hypot(
      event.clientX - start.x,
      event.clientY - start.y,
    );

    if (movement > 8) {
      start.moved = true;
    }
  };

  const handlePointerUp = (event: PointerEvent<HTMLElement>) => {
    const start = tapStartRef.current;
    tapStartRef.current = null;

    if (
      !start ||
      start.pointerId !== event.pointerId ||
      isSkillPanelNonToggleTarget(event)
    ) {
      return;
    }

    const isShortTap = Date.now() - start.startedAt < 450;
    const selectedText = window.getSelection()?.toString().trim();

    if (isShortTap && !start.moved && !selectedText) {
      onToggle(skill.id);
    }
  };

  const handlePointerCancel = () => {
    tapStartRef.current = null;
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }

    event.preventDefault();
    onToggle(skill.id);
  };

  const railInset = isOpen ? `-${MOBILE_OPEN_ACCORDION_INSET_REM}rem` : '0rem';
  const railInsetStyle = { left: railInset, right: railInset };
  const Page = skill.Page;

  return (
    <div className="relative" data-mobile-skill-panel={skill.id}>
      <div
        className={cx(
          'pointer-events-none absolute inset-y-0 z-0 rounded-lg transition-[box-shadow,left,right] duration-500 ease-out',
          isOpen &&
            'shadow-[0_3px_10px_rgba(0,0,0,0.72),0_18px_36px_rgba(0,0,0,0.62),0_34px_90px_rgba(0,0,0,0.6)]',
        )}
        style={railInsetStyle}
      />

      <article
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        className="relative isolate z-10 rounded-lg"
        style={getSkillStyle(skill)}
      >
        <div
          className={cx(
            'bg-surface-container-high/80 pointer-events-none absolute inset-y-0 rounded-lg border border-white/10 transition-[background-color,border-color,left,right] duration-500 ease-out',
            isOpen
              ? 'border-white/15 bg-white/[0.075]'
              : 'bg-surface-container-high/80 border-white/10',
          )}
          style={railInsetStyle}
        />
        <div
          className={cx(
            'pointer-events-none absolute inset-y-0 rounded-lg bg-[radial-gradient(circle_at_92%_-8%,var(--skill-accent-soft),transparent_56%)] transition-[left,right,opacity] duration-300',
            isOpen ? 'opacity-45' : 'opacity-0',
          )}
          style={railInsetStyle}
        />

        <button
          data-mobile-skill-heading={skill.id}
          type="button"
          aria-expanded={isOpen}
          aria-controls={`skill-panel-${skill.id}`}
          onKeyDown={handleKeyDown}
          className="relative grid w-full grid-cols-[1.75rem_minmax(0,1fr)_1.75rem] items-start gap-3 px-4 py-4 text-left transition-colors duration-300 ease-out"
        >
          <SkillStateIcon skill={skill} />

          <span className="min-w-0">
            <span
              className={cx(
                'font-headline block text-xl leading-tight font-bold tracking-tight transition-colors duration-300',
                isOpen ? 'text-[var(--skill-accent)]' : 'text-white',
              )}
            >
              {skill.title}
            </span>
            <span
              className={cx(
                'text-on-surface-variant block overflow-hidden text-sm leading-relaxed transition-opacity',
                isSummaryVisible ? 'duration-500' : 'duration-300',
                isSummaryVisible ? 'opacity-100' : 'opacity-0',
                isSummaryCollapsed ? 'mt-0 max-h-0' : 'mt-2 max-h-20',
              )}
            >
              {skill.subtitle}
            </span>
          </span>

          <span className="text-on-surface-variant/70 grid h-7 w-7 place-items-center rounded-full border border-white/10 bg-white/[0.025]">
            <ChevronIcon open={isOpen} />
          </span>
        </button>

        <div
          id={`skill-panel-${skill.id}`}
          className={cx(
            'relative overflow-hidden transition-[max-height] duration-500 ease-out',
            !isOpen && 'pointer-events-none',
          )}
          style={{ maxHeight: contentMaxHeight }}
        >
          <div
            ref={contentRef}
            data-skill-panel-content="true"
            className={cx(
              'px-4 pt-0 pb-5 transition-[opacity,transform] ease-out',
              isOpen
                ? 'translate-y-0 opacity-100 delay-300 duration-300'
                : 'translate-y-1 opacity-0 delay-0 duration-150',
            )}
          >
            <Page variant="mobile" isVisible={isOpen} />
          </div>
        </div>
      </article>
    </div>
  );
}

function getMobileSkillHeaderMenuHeight() {
  const titleMenu = document.querySelector(
    '[data-mobile-skill-header-menu="true"]',
  );

  if (!(titleMenu instanceof HTMLElement)) {
    return MOBILE_SKILL_HEADER_FALLBACK_HEIGHT_PX;
  }

  return (
    titleMenu.getBoundingClientRect().height ||
    MOBILE_SKILL_HEADER_FALLBACK_HEIGHT_PX
  );
}

function isSkillPanelNonToggleTarget(event: PointerEvent<HTMLElement>) {
  const target = event.target;

  if (!(target instanceof Element)) {
    return false;
  }

  const content = target.closest('[data-skill-panel-content="true"]');

  if (!content || !event.currentTarget.contains(content)) {
    return false;
  }

  const intro = target.closest('[data-skill-page-intro="true"]');

  return !intro || !event.currentTarget.contains(intro);
}

function dispatchMobileSkillHeaderChange(skill: SkillPageDefinition | null) {
  const detail: MobileSkillHeaderDetail = {
    skill: skill
      ? {
          id: skill.id,
          title: skill.title,
          iconKey: skill.iconKey,
          accent: skill.accent,
          accentSoft: skill.accentSoft,
        }
      : null,
  };

  window.dispatchEvent(
    new CustomEvent<MobileSkillHeaderDetail>(MOBILE_SKILL_HEADER_EVENT, {
      detail,
    }),
  );
}

function SkillStateIcon({ skill }: { skill: SkillPageDefinition }) {
  return (
    <span className="grid h-7 w-7 place-items-center">
      <span
        className="grid h-7 w-7 place-items-center text-[var(--skill-accent)]"
        aria-hidden="true"
      >
        {getSkillIcon(skill.iconKey)}
      </span>
    </span>
  );
}
