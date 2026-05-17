'use client';

import { useState } from 'react';
import { SKILLS } from '../data/skills';
import {
  ChevronIcon,
  CompetencyList,
  ExampleList,
  SkillsHeading,
  SkillIconBadge,
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
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleSkill = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  const content = (
    <div className="ghost-border relative overflow-hidden bg-[#0b1322]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.055),transparent_36%,rgba(255,255,255,0.025))]" />
      <div className="relative mx-auto max-w-7xl px-4 pt-24 pb-10 sm:px-6 md:px-8">
        <SkillsHeading />
      </div>
      <div className="divide-y divide-white/10">
        {SKILLS.map((skill) => {
          const isOpen = openId === skill.id;

          return (
            <article
              key={skill.id}
              className="relative overflow-hidden"
              style={getSkillStyle(skill)}
            >
              <div
                className={cx(
                  'pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_90%_18%,var(--skill-accent-soft),transparent_30%)] transition-opacity duration-200',
                  isOpen ? 'opacity-100' : 'opacity-0',
                )}
              />

              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`field-note-${skill.id}`}
                onClick={() => toggleSkill(skill.id)}
                className={cx(
                  'relative block w-full border-y py-4 text-left transition-[background-color,border-color,color] duration-300',
                  isOpen
                    ? 'border-white/20 bg-white/[0.13]'
                    : 'bg-surface-container-high/85 border-transparent hover:bg-white/[0.10]',
                )}
              >
                <span className="mx-auto grid w-full max-w-7xl grid-cols-[2rem_minmax(0,1fr)_auto] items-start gap-2.5 px-4 sm:px-6 md:px-8">
                  <SkillIconBadge
                    skill={skill}
                    className={cx(
                      'h-7 w-7 rounded-md [&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]',
                      !isOpen && 'border-white/5 bg-transparent shadow-none',
                    )}
                  />

                  <span className="min-w-0">
                    <span className="font-headline block truncate text-xl font-bold tracking-tight text-white">
                      {skill.title}
                    </span>
                    <span className="text-on-surface-variant mt-2 block text-sm leading-relaxed">
                      {skill.summary}
                    </span>
                  </span>

                  <span className="text-on-surface-variant">
                    <ChevronIcon open={isOpen} />
                  </span>
                </span>
              </button>

              <div
                id={`field-note-${skill.id}`}
                className={cx(
                  'relative grid transition-[grid-template-rows,opacity] duration-200',
                  isOpen
                    ? 'grid-rows-[1fr] opacity-100'
                    : 'grid-rows-[0fr] opacity-0',
                )}
              >
                <div className="min-h-0 overflow-hidden">
                  <div className="mx-auto max-w-7xl px-4 pb-4 sm:px-6 md:px-8">
                    <div className="bg-white/[0.025] px-4 py-3">
                      <p className="text-on-surface-variant max-w-4xl text-sm leading-relaxed sm:text-base">
                        {skill.detail}
                      </p>

                      <div className="mt-5 grid gap-6">
                        <div className="space-y-6">
                          <CompetencyList skill={skill} />
                          <ExampleList skill={skill} />
                        </div>
                        <div>
                          <h4 className="font-label text-on-surface-variant/70 mb-3 text-xs font-bold tracking-widest uppercase">
                            Tools and stack
                          </h4>
                          <StackChips items={skill.stack} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
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
