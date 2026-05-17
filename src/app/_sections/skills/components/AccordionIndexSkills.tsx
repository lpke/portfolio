'use client';

import type { ReactNode } from 'react';
import { useState } from 'react';
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
  const [openId, setOpenId] = useState<string | null>(SKILLS[0]?.id ?? null);

  const toggleSkill = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  const content = (
    <div className="ghost-border relative overflow-hidden bg-[#0b1322]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.055),transparent_36%,rgba(255,255,255,0.025))]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(123,208,255,0.10),transparent_34%)]" />

      <div className="relative mx-auto max-w-2xl px-4 pt-20 pb-8 sm:px-6">
        <SkillsHeading />
      </div>

      <div className="relative mx-auto grid max-w-2xl gap-3 px-4 pb-6 sm:px-6">
        {SKILLS.map((skill) => {
          const isOpen = openId === skill.id;

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
  return (
    <article
      className={cx(
        'relative overflow-hidden rounded border transition-[background-color,border-color,box-shadow] duration-300',
        isOpen
          ? 'border-white/20 bg-white/[0.11] shadow-[0_18px_44px_rgba(0,0,0,0.22)]'
          : 'bg-surface-container-high/80 border-white/10',
      )}
      style={getSkillStyle(skill)}
    >
      <div
        className={cx(
          'pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_92%_0%,var(--skill-accent-soft),transparent_44%)] transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0',
        )}
      />

      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={`skill-panel-${skill.id}`}
        onClick={() => onToggle(skill.id)}
        className="relative grid w-full grid-cols-[1.75rem_minmax(0,1fr)_1.75rem] items-start gap-3 px-4 py-4 text-left transition-colors duration-300"
      >
        <SkillStateIcon skill={skill} isOpen={isOpen} />

        <span className="min-w-0">
          <span className="font-headline block text-lg leading-tight font-bold tracking-tight text-white">
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
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="border-t border-white/10 px-4 pt-4 pb-5">
            <p className="text-on-surface-variant text-sm leading-relaxed">
              {skill.detail}
            </p>

            <MobileContentSection title="Approach">
              <MobileCompetencyList skill={skill} />
            </MobileContentSection>

            <MobileContentSection title="Examples">
              <MobileExampleList skill={skill} />
            </MobileContentSection>

            <MobileContentSection title="Tools and stack">
              <StackChips items={skill.stack} />
            </MobileContentSection>
          </div>
        </div>
      </div>
    </article>
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
      {isOpen ? (
        <span
          className="grid h-6 w-6 place-items-center text-[var(--skill-accent)] [&>svg]:h-5 [&>svg]:w-5"
          aria-hidden="true"
        >
          {getSkillIcon(skill.iconKey)}
        </span>
      ) : (
        <span
          className="text-on-surface-variant/55 grid h-[1.125rem] w-[1.125rem] place-items-center rounded-full border border-white/10 bg-white/[0.025] text-sm leading-none"
          aria-hidden="true"
        >
          +
        </span>
      )}
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
    <div className="grid gap-3">
      {skill.competencies.map((item) => (
        <div
          key={item.label}
          className="border-l border-[var(--skill-accent)] pl-3"
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
