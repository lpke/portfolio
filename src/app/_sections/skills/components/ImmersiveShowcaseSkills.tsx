'use client';

import {
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { UI_TEXT } from '@/utils/constants';
import {
  SKILLS,
  SKILLS_SECTION_CONTENT,
  type SkillData,
} from '../data/skills';
import { getSkillIcon } from './SkillIcons';
import { SkillsShell } from './SkillsShell';
import {
  GithubIcon,
  SkillsHeading,
  StackChips,
  cx,
  getSkillStyle,
} from './shared';

type ImmersiveLayout = {
  id: string;
  panelClassName: string;
  contentAlignClassName: string;
  descriptionClassName: string;
  railWidthClassName: string;
  contentMaxClassName: string;
  competencyLimit: number;
};

type RailTextStyle = CSSProperties & {
  '--skill-rail-text-extra': string;
};

const IMMERSIVE_LAYOUT: ImmersiveLayout = {
  id: 'primary',
  panelClassName: 'bg-skill-stage',
  contentAlignClassName: 'lg:pl-[24rem]',
  descriptionClassName: 'text-[1.25rem]',
  railWidthClassName: 'lg:w-[19.5rem]',
  contentMaxClassName: 'max-w-4xl',
  competencyLimit: 99,
};

export function ImmersiveShowcaseSkills({
  withShell = true,
}: {
  withShell?: boolean;
}) {
  const layout = IMMERSIVE_LAYOUT;
  const initialId = SKILLS[0]?.id ?? '';
  const [selectedId, setSelectedId] = useState(initialId);

  const selectedSkill =
    SKILLS.find((skill) => skill.id === selectedId) ?? SKILLS[0];

  if (!selectedSkill) {
    return null;
  }

  const selectSkill = (nextId: string) => {
    if (!nextId || nextId === selectedId) return;

    setSelectedId(nextId);
  };

  const selectByOffset = (offset: number) => {
    const currentIndex = SKILLS.findIndex((skill) => skill.id === selectedId);
    const baseIndex = currentIndex >= 0 ? currentIndex : 0;
    const nextIndex = (baseIndex + offset + SKILLS.length) % SKILLS.length;
    const nextSkill = SKILLS[nextIndex];

    if (nextSkill) {
      selectSkill(nextSkill.id);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      event.preventDefault();
      selectByOffset(1);
      return;
    }

    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      event.preventDefault();
      selectByOffset(-1);
      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      selectSkill(SKILLS[0]?.id ?? '');
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      selectSkill(SKILLS[SKILLS.length - 1]?.id ?? '');
    }
  };

  const content = (
    <div
      className={cx(
        'ghost-border relative min-h-[42rem] overflow-hidden transition-colors duration-300 lg:min-h-screen',
        layout.panelClassName,
      )}
      style={getSkillStyle(selectedSkill)}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.055),transparent_36%,rgba(255,255,255,0.025))]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,var(--skill-accent-soft),transparent_32%)] opacity-75" />

      <div className="relative z-10 mx-auto min-h-[42rem] max-w-7xl px-4 py-16 sm:px-6 sm:py-24 md:px-8 lg:min-h-screen lg:py-46">
        <div className="mb-10 lg:mb-12">
          <SkillsHeading />
        </div>

        <div className="relative min-h-[38rem]">
          <div
            className={cx(
              'lg:absolute lg:top-0 lg:left-0',
              layout.railWidthClassName,
            )}
          >
            <div className="flex gap-3">
              <SkillRail
                layout={layout}
                selectedId={selectedId}
                onSelect={selectSkill}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>

          <div
            className={cx(
              'mt-5 grid lg:mt-0 lg:min-h-[38rem] lg:justify-items-end',
              layout.contentAlignClassName,
            )}
          >
            {SKILLS.map((skill) => (
              <ImmersiveContent
                key={skill.id}
                skill={skill}
                layout={layout}
                isSelected={skill.id === selectedId}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  if (!withShell) {
    return content;
  }

  return <SkillsShell>{content}</SkillsShell>;
}

function SkillRail({
  layout,
  selectedId,
  onSelect,
  onKeyDown,
}: {
  layout: ImmersiveLayout;
  selectedId: string;
  onSelect: (id: string) => void;
  onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label={SKILLS_SECTION_CONTENT.railAriaLabel}
      onKeyDown={onKeyDown}
      className="grid flex-1 gap-3"
    >
      {SKILLS.map((skill) => {
        const isSelected = skill.id === selectedId;

        return (
          <button
            key={skill.id}
            id={`immersive-${layout.id}-tab-${skill.id}`}
            type="button"
            role="tab"
            aria-selected={isSelected}
            aria-controls={`immersive-${layout.id}-panel-${skill.id}`}
            onMouseDown={(event) => {
              if (event.button !== 0) return;
              onSelect(skill.id);
            }}
            onClick={() => onSelect(skill.id)}
            className={cx(
              'grid w-full cursor-pointer grid-cols-[1.75rem_minmax(0,1fr)] items-start gap-2.5 justify-self-start overflow-hidden rounded-lg border border-transparent px-4 py-4 text-left transition-[width,background-color,border-color,color,box-shadow] duration-600',
              isSelected ? 'lg:w-[calc(100%+1.5rem)]' : 'lg:w-full',
              getRailItemClass(isSelected),
            )}
            style={getSkillStyle(skill)}
          >
            <span className="flex h-7 w-7 items-center justify-center">
              {isSelected ? (
                <span
                  className="grid h-7 w-7 place-items-center text-[var(--skill-accent)]"
                  aria-hidden="true"
                >
                  {getSkillIcon(skill.iconKey)}
                </span>
              ) : (
                <PlusIndicator />
              )}
            </span>

            <span
              className="min-w-0 lg:w-[calc(21rem-4.75rem+var(--skill-rail-text-extra))]"
              style={getRailTextStyle(skill)}
            >
              <span
                className={cx(
                  'font-headline block truncate text-[1.4rem] font-bold',
                  isSelected ? 'text-[var(--skill-accent)]' : 'text-white',
                )}
              >
                {skill.title}
              </span>

              <span
                className={cx(
                  'grid transition-[grid-template-rows,opacity,margin-top] duration-500',
                  isSelected
                    ? 'mt-2 grid-rows-[1fr] opacity-100'
                    : 'mt-0 grid-rows-[0fr] opacity-0',
                )}
              >
                <span className="text-on-surface-variant min-h-0 overflow-hidden text-sm leading-relaxed">
                  {skill.summary}
                </span>
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

function getRailTextStyle(skill: SkillData): RailTextStyle {
  return {
    '--skill-rail-text-extra': `${skill.railTextExtraRem ?? 0}rem`,
  };
}

function getRailItemClass(isSelected: boolean) {
  const base =
    'bg-surface-container-high/85 text-on-surface-variant hover:bg-white/[0.10] hover:text-white';

  if (!isSelected) {
    return base;
  }

  return 'border-[color:color-mix(in_srgb,var(--skill-accent)_58%,rgba(255,255,255,0.16))] bg-[linear-gradient(90deg,color-mix(in_srgb,var(--skill-accent)_16%,rgba(255,255,255,0.105)),color-mix(in_srgb,var(--skill-accent)_13%,rgba(255,255,255,0.105))_52%,color-mix(in_srgb,var(--skill-accent)_10%,rgba(255,255,255,0.105)))] text-white shadow-[0_6px_16px_rgba(0,0,0,0.18),0_14px_30px_rgba(0,0,0,0.12)]';
}

function ImmersiveContent({
  skill,
  layout,
  isSelected,
}: {
  skill: SkillData;
  layout: ImmersiveLayout;
  isSelected: boolean;
}) {
  return (
    <article
      id={`immersive-${layout.id}-panel-${skill.id}`}
      role="tabpanel"
      aria-labelledby={`immersive-${layout.id}-tab-${skill.id}`}
      aria-hidden={!isSelected}
      className={cx(
        'col-start-1 row-start-1 w-full py-4 transition-[opacity,visibility] duration-250 ease-out lg:pt-0 lg:pb-4',
        layout.contentMaxClassName,
        isSelected
          ? 'visible opacity-100'
          : 'pointer-events-none invisible opacity-0',
      )}
      style={getSkillStyle(skill)}
    >
      <p
        className={cx(
          'max-w-3xl leading-relaxed text-white/90',
          layout.descriptionClassName,
        )}
      >
        {skill.detail}
      </p>

      <CompetencyGrid skill={skill} limit={layout.competencyLimit} />

      <div className="mt-8">
        <ContentSection title={UI_TEXT.examples}>
          <ExampleGrid skill={skill} />
        </ContentSection>
      </div>

      <StackChips items={skill.stack} className="mt-6" />
    </article>
  );
}

function ContentSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h4 className="font-label text-on-surface-variant/70 mb-4 text-xs font-bold tracking-widest uppercase lg:text-sm">
        {title}
      </h4>
      {children}
    </section>
  );
}

function CompetencyGrid({ skill, limit }: { skill: SkillData; limit: number }) {
  return (
    <div className="mt-7 flex flex-wrap gap-3">
      {skill.competencies.slice(0, limit).map((item) => (
        <div
          key={item.label}
          className="min-w-[14rem] flex-1 border-l border-[var(--skill-accent)] bg-white/[0.025] px-4 py-3"
        >
          <h5 className="font-headline text-base font-bold text-white lg:text-lg">
            {item.label}
          </h5>
          <p className="text-on-surface-variant mt-1 text-xs leading-relaxed lg:text-sm">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}

function ExampleGrid({ skill }: { skill: SkillData }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {skill.examples.map((example) => {
        const content = (
          <>
            <div className="flex items-start gap-3">
              <h5 className="font-headline flex-1 text-base font-bold text-white transition-colors duration-200 group-hover/example-card:text-[var(--skill-accent)] lg:text-lg">
                {example.title}
              </h5>
              <span className="flex shrink-0 items-center gap-2">
                {example.showGithubIcon && (
                  <GithubIcon className="text-on-surface-variant/70 mt-1 h-4 w-4 transition-colors duration-200 group-hover/example-card:text-[var(--skill-accent)]" />
                )}
                {example.url && <ExternalLinkIcon />}
              </span>
            </div>
            <p className="text-on-surface-variant mt-2 text-xs leading-relaxed lg:text-sm">
              {example.detail}
            </p>
          </>
        );

        if (example.url) {
          return (
            <div
              key={example.title}
              className="group/example-card relative overflow-hidden bg-white/[0.025]"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-white/[0.03] opacity-0 transition-opacity duration-200 group-hover/example-card:opacity-100"
              />
              <a
                href={example.url}
                target="_blank"
                rel="noreferrer"
                className="relative block cursor-pointer px-4 py-3"
              >
                {content}
              </a>
            </div>
          );
        }

        return (
          <div key={example.title} className="bg-white/[0.025] px-4 py-3">
            {content}
          </div>
        );
      })}
    </div>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      aria-hidden="true"
      className="text-on-surface-variant/70 mt-1 h-4 w-4 shrink-0 transition-colors duration-200 group-hover/example-card:text-[var(--skill-accent)]"
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

function PlusIndicator() {
  return (
    <span
      className="text-on-surface-variant/55 grid h-[1.125rem] w-[1.125rem] place-items-center rounded-full border border-white/10 bg-white/[0.025] text-sm leading-none"
      aria-hidden="true"
    >
      +
    </span>
  );
}
