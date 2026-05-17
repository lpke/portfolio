'use client';

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { SKILLS, type SkillData } from '../data/skills';
import { getSkillIcon } from './SkillIcons';
import {
  SkillsHeading,
  StackChips,
  SkillsShell,
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

const IMMERSIVE_LAYOUT: ImmersiveLayout = {
  id: 'primary',
  panelClassName: 'bg-[#0b1322]',
  contentAlignClassName: 'lg:pl-[23rem]',
  descriptionClassName: 'text-base',
  railWidthClassName: 'lg:w-[19.5rem]',
  contentMaxClassName: 'max-w-4xl',
  competencyLimit: 3,
};

const FADE_MS = 100;

export function ImmersiveShowcaseSkills({
  withShell = true,
}: {
  withShell?: boolean;
}) {
  const layout = IMMERSIVE_LAYOUT;
  const initialId = SKILLS[0]?.id ?? '';
  const [selectedId, setSelectedId] = useState(initialId);
  const [visibleId, setVisibleId] = useState(initialId);
  const [isVisible, setIsVisible] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const selectedSkill =
    SKILLS.find((skill) => skill.id === selectedId) ?? SKILLS[0];
  const visibleSkill =
    SKILLS.find((skill) => skill.id === visibleId) ?? selectedSkill;

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (!selectedSkill || !visibleSkill) {
    return null;
  }

  const selectSkill = (nextId: string) => {
    if (!nextId || nextId === selectedId) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setSelectedId(nextId);
    setIsVisible(false);

    timeoutRef.current = setTimeout(() => {
      setVisibleId(nextId);
      setIsVisible(true);
      timeoutRef.current = null;
    }, FADE_MS);
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
    <section
      className={cx(
        'ghost-border relative min-h-[42rem] overflow-hidden transition-colors duration-300',
        layout.panelClassName,
      )}
      style={getSkillStyle(selectedSkill)}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.055),transparent_36%,rgba(255,255,255,0.025))]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,var(--skill-accent-soft),transparent_32%)] opacity-75" />

      <div className="relative z-10 mx-auto min-h-[42rem] max-w-7xl px-4 py-24 sm:px-6 md:px-8 lg:py-28">
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
              'mt-5 flex flex-col gap-5 lg:mt-0 lg:min-h-[38rem] lg:items-end',
              layout.contentAlignClassName,
            )}
          >
            <ImmersiveContent
              skill={visibleSkill}
              layout={layout}
              isVisible={isVisible}
            />
          </div>
        </div>
      </div>
    </section>
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
      aria-label="Skill focus areas"
      onKeyDown={onKeyDown}
      className="grid flex-1 gap-2"
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
            aria-controls={`immersive-${layout.id}-panel`}
            onMouseDown={(event) => {
              if (event.button !== 0) return;
              onSelect(skill.id);
            }}
            onClick={() => onSelect(skill.id)}
            className={cx(
              'grid w-full grid-cols-[1.75rem_minmax(0,1fr)] items-start gap-2.5 rounded-lg border border-transparent px-4 py-4 text-left transition-[background-color,border-color,color,box-shadow,min-height] duration-300',
              isSelected ? 'min-h-[8.75rem]' : 'min-h-[4.25rem]',
              getRailItemClass(isSelected),
            )}
            style={getSkillStyle(skill)}
          >
            <span className="flex h-7 w-7 items-center justify-center">
              {isSelected ? (
                <span
                  className="grid h-6 w-6 place-items-center text-[var(--skill-accent)] [&>svg]:h-5 [&>svg]:w-5"
                  aria-hidden="true"
                >
                  {getSkillIcon(skill.iconKey)}
                </span>
              ) : (
                <PlusIndicator />
              )}
            </span>

            <span className="min-w-0">
              <span className="font-headline block truncate text-lg font-bold text-white">
                {skill.title}
              </span>

              <span
                className={cx(
                  'grid transition-[grid-template-rows,opacity,margin-top] duration-200',
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

function getRailItemClass(isSelected: boolean) {
  const base =
    'bg-surface-container-high/85 text-on-surface-variant hover:bg-white/[0.10] hover:text-white';

  if (!isSelected) {
    return base;
  }

  return 'border-white/20 bg-white/[0.13] text-white shadow-[0_18px_45px_rgba(0,0,0,0.24)]';
}

function ImmersiveContent({
  skill,
  layout,
  isVisible,
}: {
  skill: SkillData;
  layout: ImmersiveLayout;
  isVisible: boolean;
}) {
  return (
    <article
      id={`immersive-${layout.id}-panel`}
      role="tabpanel"
      aria-labelledby={`immersive-${layout.id}-tab-${skill.id}`}
      className={cx(
        'w-full py-4 transition-opacity duration-150 ease-out lg:py-10',
        layout.contentMaxClassName,
        isVisible ? 'opacity-100' : 'opacity-0',
      )}
      style={getSkillStyle(skill)}
    >
      <p
        className={cx(
          'text-on-surface-variant max-w-3xl leading-relaxed',
          layout.descriptionClassName,
        )}
      >
        {skill.detail}
      </p>

      <div className="mt-8 grid gap-7 lg:grid-cols-2">
        <ContentSection title="Approach">
          <CompetencyGrid skill={skill} limit={layout.competencyLimit} />
        </ContentSection>

        <ContentSection title="Examples">
          <ExampleGrid skill={skill} />
          <StackChips items={skill.stack} className="mt-5" />
        </ContentSection>
      </div>
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
      <h4 className="font-label text-on-surface-variant/70 mb-4 text-xs font-bold tracking-widest uppercase">
        {title}
      </h4>
      {children}
    </section>
  );
}

function CompetencyGrid({ skill, limit }: { skill: SkillData; limit: number }) {
  return (
    <div className="grid gap-3">
      {skill.competencies.slice(0, limit).map((item) => (
        <div
          key={item.label}
          className="border-l border-[var(--skill-accent)] bg-white/[0.025] px-4 py-3"
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

function ExampleGrid({ skill }: { skill: SkillData }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {skill.examples.map((example) => (
        <div key={example.title} className="bg-white/[0.025] px-4 py-3">
          <h5 className="font-headline text-sm font-bold text-white">
            {example.title}
          </h5>
          <p className="text-on-surface-variant mt-2 text-sm leading-relaxed">
            {example.detail}
          </p>
        </div>
      ))}
    </div>
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
