'use client';

import type { ReactNode } from 'react';
import { useRef, useState } from 'react';
import { SKILLS, type SkillData } from '../data/skills';
import { getSkillIcon } from './SkillIcons';
import {
  ChevronIcon,
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
  const tapStartRef = useRef<{
    pointerId: number;
    startedAt: number;
    x: number;
    y: number;
    moved: boolean;
  } | null>(null);

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
    <div
      className={cx(
        'relative transition-[margin] duration-500 ease-out',
        isOpen && '-mx-2',
      )}
    >
      <div
        className={cx(
          'pointer-events-none absolute inset-0 z-0 rounded-lg transition-shadow duration-500 ease-out',
          isOpen &&
            'shadow-[0_3px_10px_rgba(0,0,0,0.72),0_18px_36px_rgba(0,0,0,0.62),0_34px_90px_rgba(0,0,0,0.6)]',
        )}
      />

      <article
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        className={cx(
          'relative isolate z-10 overflow-hidden rounded-lg border transition-[background-color,border-color] duration-500 ease-out',
          isOpen
            ? 'border-white/15 bg-white/[0.075]'
            : 'bg-surface-container-high/80 border-white/10',
        )}
        style={getSkillStyle(skill)}
      >
        <div
          className={cx(
            'pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_92%_-8%,var(--skill-accent-soft),transparent_56%)] transition-opacity duration-300',
            isOpen ? 'opacity-45' : 'opacity-0',
          )}
        />

        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={`skill-panel-${skill.id}`}
          onKeyDown={handleKeyDown}
          className={cx(
            'relative grid w-full grid-cols-[1.75rem_minmax(0,1fr)_1.75rem] items-start gap-3 py-4 text-left transition-[color,padding] duration-500 ease-out',
            isOpen ? 'px-6' : 'px-4',
          )}
        >
          <SkillStateIcon skill={skill} isOpen={isOpen} />

          <span className="min-w-0">
            <span className="font-headline block text-xl leading-tight font-bold tracking-tight text-white">
              {skill.title}
            </span>
            <span className="text-on-surface-variant mt-2 block text-sm leading-relaxed">
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
            'relative grid transition-[grid-template-rows,opacity] duration-300',
            isOpen
              ? 'grid-rows-[1fr] opacity-100'
              : 'grid-rows-[0fr] opacity-0',
          )}
        >
          <div className="min-h-0 overflow-hidden">
            <div
              className={cx(
                'border-t border-white/10 pt-4 pb-5 transition-[padding] duration-500 ease-out',
                isOpen ? 'px-6' : 'px-4',
              )}
            >
              <p className="text-on-surface-variant text-sm leading-relaxed">
                {skill.detail}
              </p>

              <StackChips items={skill.stack} className="mt-4" />

              <MobileCompetencyList skill={skill} />

              <MobileContentSection title="Examples">
                <MobileExampleList skill={skill} />
              </MobileContentSection>
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
    <span className="mt-0.5 grid h-7 w-7 place-items-center">
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
          <h5 className="font-headline text-sm font-bold text-white">
            {item.label}
          </h5>
          <p className="text-on-surface-variant mt-1 text-sm leading-relaxed">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}

function MobileExampleList({ skill }: { skill: SkillData }) {
  return (
    <div className="divide-y divide-white/10 border-y border-white/10">
      {skill.examples.map((example) => (
        <div key={example.title} className="py-3 first:pt-0 last:pb-0">
          <h5 className="font-headline text-sm font-bold text-white">
            {example.title}
          </h5>
          <p className="text-on-surface-variant mt-1 text-sm leading-relaxed">
            {example.detail}
          </p>
        </div>
      ))}
    </div>
  );
}
