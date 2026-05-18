'use client';

import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import { SKILLS, type SkillData } from '../data/skills';
import { getSkillIcon } from './SkillIcons';
import {
  ChevronIcon,
  GithubIcon,
  SkillsHeading,
  StackChips,
  SkillsShell,
  cx,
  getSkillStyle,
} from './shared';

export function AccordionIndexSkills({
  withShell = true,
}: {
  withShell?: boolean;
}) {
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
    <div className="ghost-border relative overflow-hidden bg-[#0b1322]">
      <div className="relative mx-auto max-w-7xl px-5 pt-14 pb-8 md:px-8 md:pt-20">
        <SkillsHeading />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl gap-3 px-5 pb-6 md:px-8">
        {SKILLS.map((skill) => {
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
  skill: SkillData;
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

  const handlePointerDown = (event: React.PointerEvent<HTMLElement>) => {
    tapStartRef.current = {
      pointerId: event.pointerId,
      startedAt: Date.now(),
      x: event.clientX,
      y: event.clientY,
      moved: false,
    };
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
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

  const handlePointerUp = (event: React.PointerEvent<HTMLElement>) => {
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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }

    event.preventDefault();
    onToggle(skill.id);
  };

  return (
    <div className="relative">
      <div
        className={cx(
          'pointer-events-none absolute inset-y-0 z-0 rounded-lg transition-[box-shadow,inset] duration-500 ease-out',
          isOpen &&
            '-inset-x-2 shadow-[0_3px_10px_rgba(0,0,0,0.72),0_18px_36px_rgba(0,0,0,0.62),0_34px_90px_rgba(0,0,0,0.6)]',
          !isOpen && 'inset-x-0',
        )}
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
            'bg-surface-container-high/80 pointer-events-none absolute inset-y-0 rounded-lg border border-white/10 transition-[background-color,border-color,inset] duration-500 ease-out',
            isOpen
              ? '-inset-x-2 border-white/15 bg-white/[0.075]'
              : 'inset-x-0',
          )}
        />
        <div
          className={cx(
            'pointer-events-none absolute inset-y-0 rounded-lg bg-[radial-gradient(circle_at_92%_-8%,var(--skill-accent-soft),transparent_56%)] transition-[inset,opacity] duration-300',
            isOpen ? '-inset-x-2 opacity-45' : 'inset-x-0 opacity-0',
          )}
        />

        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={`skill-panel-${skill.id}`}
          onKeyDown={handleKeyDown}
          className="relative grid w-full grid-cols-[1.75rem_minmax(0,1fr)_1.75rem] items-start gap-3 px-4 py-4 text-left transition-colors duration-300 ease-out"
        >
          <SkillStateIcon skill={skill} isOpen={isOpen} />

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
              {skill.summary}
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
              className={cx(
                'px-4 pt-0 pb-5 transition-opacity duration-300',
                isContentVisible ? 'opacity-100' : 'opacity-0',
              )}
            >
              <p className="text-base leading-relaxed font-medium text-white/90">
                {skill.detail}
              </p>

              <MobileCompetencyList skill={skill} />

              <MobileContentSection title="Examples">
                <MobileExampleList skill={skill} />
              </MobileContentSection>

              <StackChips items={skill.stack} className="mt-6" />
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

function SkillStateIcon({
  skill,
  isOpen,
}: {
  skill: SkillData;
  isOpen: boolean;
}) {
  return (
    <span className="grid h-7 w-7 place-items-center">
      <span
        className={cx(
          'grid h-7 w-7 place-items-center transition-colors duration-300',
          isOpen ? 'text-[var(--skill-accent)]' : 'text-on-surface-variant/55',
        )}
        aria-hidden="true"
      >
        {getSkillIcon(skill.iconKey)}
      </span>
    </span>
  );
}

function MobileContentSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-5">
      <h4 className="font-label text-on-surface-variant/70 mb-3 text-[11px] font-bold tracking-widest uppercase">
        {title}
      </h4>
      {children}
    </section>
  );
}

function MobileCompetencyList({ skill }: { skill: SkillData }) {
  return (
    <div className="mt-5 grid gap-3">
      {skill.competencies.map((item) => (
        <div
          key={item.label}
          className="border-l border-[var(--skill-accent)] bg-white/[0.025] px-3 py-2.5"
        >
          <h5 className="font-headline text-base font-bold text-white">
            {item.label}
          </h5>
          <p className="text-on-surface-variant mt-1 text-xs leading-relaxed">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}

function MobileExampleList({ skill }: { skill: SkillData }) {
  return (
    <div className="grid gap-4">
      {skill.examples.map((example) => {
        const content = (
          <>
            <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
              <h5 className="font-headline text-[15px] leading-snug font-bold text-white transition-colors duration-200 group-hover/example-card:text-[var(--skill-accent)]">
                {example.title}
              </h5>
              <span className="inline-flex shrink-0 items-center gap-1.5">
                {example.showGithubIcon && (
                  <GithubIcon className="h-3.5 w-3.5 text-white/80 transition-colors duration-200 group-hover/example-card:text-[var(--skill-accent)]" />
                )}
                {example.url && <ExternalLinkIcon />}
              </span>
            </div>
            <p className="text-on-surface-variant mt-0.5 text-xs leading-snug">
              {example.detail}
            </p>
          </>
        );

        if (example.url) {
          return (
            <a
              key={example.title}
              href={example.url}
              target="_blank"
              rel="noreferrer"
              className="group/example-card block cursor-pointer"
            >
              {content}
            </a>
          );
        }

        return <div key={example.title}>{content}</div>;
      })}
    </div>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      aria-hidden="true"
      className="text-on-surface-variant/80 h-3.5 w-3.5 shrink-0 transition-colors duration-200 group-hover/example-card:text-[var(--skill-accent)]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  );
}
