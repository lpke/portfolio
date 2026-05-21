'use client';

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from 'react';
import { MOBILE_OPEN_ACCORDION_INSET_REM } from '@/utils/constants';
import { SKILL_PROFILES, type SkillProfile } from '../data/skills';
import { getSkillIcon } from './SkillIcons';
import { SkillContent } from './SkillContent';
import { SkillsShell } from './SkillsShell';
import { ChevronIcon, SkillsHeading, cx, getSkillStyle } from './shared';

export function MobileSkills({ withShell = true }: { withShell?: boolean }) {
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set());

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

  const content = (
    <div className="ghost-border bg-skill-stage relative overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-5 pt-14 pb-8 md:px-8 md:pt-20">
        <SkillsHeading />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl gap-3 px-5 pb-6 md:px-8">
        {SKILL_PROFILES.map((skill) => {
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

export const AccordionIndexSkills = MobileSkills;

function MobileSkillPanel({
  skill,
  isOpen,
  onToggle,
}: {
  skill: SkillProfile;
  isOpen: boolean;
  onToggle: (id: string) => void;
}) {
  const [isSummaryCollapsed, setIsSummaryCollapsed] = useState(isOpen);
  const [isSummaryVisible, setIsSummaryVisible] = useState(!isOpen);
  const [isContentVisible, setIsContentVisible] = useState(isOpen);
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
      timers.push(setTimeout(() => setIsContentVisible(false), 0));
      timers.push(setTimeout(() => setIsSummaryCollapsed(true), 300));
      timers.push(setTimeout(() => setIsContentVisible(true), 360));
    } else {
      timers.push(setTimeout(() => setIsContentVisible(false), 0));
      timers.push(setTimeout(() => setIsSummaryCollapsed(false), 0));
      timers.push(setTimeout(() => setIsSummaryVisible(true), 260));
    }

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [isOpen]);

  const handlePointerDown = (event: PointerEvent<HTMLElement>) => {
    if (isInteractiveSkillContentTarget(event)) {
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

    if (!start || start.pointerId !== event.pointerId) {
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

  return (
    <div className="relative">
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
            'relative grid transition-[grid-template-rows,opacity] duration-500',
            isOpen
              ? 'grid-rows-[1fr] opacity-100'
              : 'grid-rows-[0fr] opacity-0',
          )}
        >
          <div className="min-h-0 overflow-hidden">
            <div
              data-skill-panel-content="true"
              className={cx(
                'px-4 pt-0 pb-5 transition-opacity duration-300',
                isContentVisible ? 'opacity-100' : 'opacity-0',
              )}
            >
              <SkillContent skill={skill} variant="mobile" />
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

function isInteractiveSkillContentTarget(event: PointerEvent<HTMLElement>) {
  const target = event.target;

  if (!(target instanceof Element)) {
    return false;
  }

  const content = target.closest('[data-skill-panel-content="true"]');

  if (!content || !event.currentTarget.contains(content)) {
    return false;
  }

  return Boolean(
    target.closest(
      'a,button,input,select,textarea,[role="button"],[data-accordion-interactive="true"]',
    ),
  );
}

function SkillStateIcon({ skill }: { skill: SkillProfile }) {
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
