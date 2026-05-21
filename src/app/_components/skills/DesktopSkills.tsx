'use client';

import { useState, type CSSProperties, type KeyboardEvent } from 'react';
import {
  DESKTOP_SKILLS_LAYOUT,
  SKILLS_SECTION_COPY,
  type DesktopSkillsLayout,
} from '@/utils/constants';
import {
  SKILL_PAGES,
  type SkillPageDefinition,
} from '@/sections/skills/pages/skillPages';
import { getSkillIcon } from './SkillIcons';
import { SkillsShell } from './SkillsShell';
import { SkillsHeading, cx, getSkillStyle } from './shared';

type RailTextStyle = CSSProperties & {
  '--skill-rail-text-extra': string;
  width: string;
};

type RailItemStyle = CSSProperties & {
  '--skill-accent': string;
  '--skill-accent-soft': string;
};

export function DesktopSkills({ withShell = true }: { withShell?: boolean }) {
  const layout = DESKTOP_SKILLS_LAYOUT;
  const initialId = SKILL_PAGES[0]?.id ?? '';
  const [selectedId, setSelectedId] = useState<string>(initialId);

  const selectedSkill =
    SKILL_PAGES.find((skill) => skill.id === selectedId) ?? SKILL_PAGES[0];

  if (!selectedSkill) {
    return null;
  }

  const selectSkill = (nextId: string) => {
    if (!nextId || nextId === selectedId) return;

    setSelectedId(nextId);
  };

  const selectByOffset = (offset: number) => {
    const currentIndex = SKILL_PAGES.findIndex(
      (skill) => skill.id === selectedId,
    );
    const baseIndex = currentIndex >= 0 ? currentIndex : 0;
    const nextIndex =
      (baseIndex + offset + SKILL_PAGES.length) % SKILL_PAGES.length;
    const nextSkill = SKILL_PAGES[nextIndex];

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
      selectSkill(SKILL_PAGES[0]?.id ?? '');
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      selectSkill(SKILL_PAGES[SKILL_PAGES.length - 1]?.id ?? '');
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
            <SkillRail
              layout={layout}
              selectedId={selectedId}
              onSelect={selectSkill}
              onKeyDown={handleKeyDown}
            />
          </div>

          <div
            className={cx(
              'mt-5 grid lg:mt-0 lg:min-h-[38rem] lg:justify-items-end',
              layout.contentAlignClassName,
            )}
          >
            {SKILL_PAGES.map((skill) => {
              const { Page } = skill;
              const isSelected = skill.id === selectedId;

              return (
                <article
                  key={skill.id}
                  id={getPanelId(layout.id, skill.id)}
                  role="tabpanel"
                  aria-labelledby={getTabId(layout.id, skill.id)}
                  aria-hidden={!isSelected}
                  className={cx(
                    'w-full col-start-1 row-start-1 py-4 transition-[opacity,visibility] duration-250 ease-out lg:pt-0 lg:pb-4',
                    isSelected
                      ? 'visible opacity-100'
                      : 'pointer-events-none invisible opacity-0',
                    layout.contentMaxClassName,
                  )}
                  style={getSkillStyle(skill)}
                >
                  <Page variant="desktop" isVisible={isSelected} />
                </article>
              );
            })}
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
  layout: DesktopSkillsLayout;
  selectedId: string;
  onSelect: (id: string) => void;
  onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label={SKILLS_SECTION_COPY.railAriaLabel}
      onKeyDown={onKeyDown}
      className="grid flex-1 gap-3"
    >
      {SKILL_PAGES.map((skill) => (
        <SkillRailItem
          key={skill.id}
          skill={skill}
          isSelected={skill.id === selectedId}
          tabId={getTabId(layout.id, skill.id)}
          panelId={getPanelId(layout.id, skill.id)}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

function SkillRailItem({
  skill,
  isSelected,
  tabId,
  panelId,
  onSelect,
}: {
  skill: SkillPageDefinition;
  isSelected: boolean;
  tabId: string;
  panelId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <button
      id={tabId}
      type="button"
      role="tab"
      aria-selected={isSelected}
      aria-controls={panelId}
      onMouseDown={(event) => {
        if (event.button !== 0) return;
        onSelect(skill.id);
      }}
      onClick={() => onSelect(skill.id)}
      className={cx(
        'grid w-full cursor-pointer grid-cols-[1.75rem_minmax(0,1fr)] items-start gap-2.5 justify-self-start overflow-hidden rounded-lg border border-transparent text-left transition-[width,background-color,border-color,color,box-shadow] duration-600',
        DESKTOP_SKILLS_LAYOUT.railItemPaddingClassName,
        getRailItemClass(isSelected),
      )}
      style={getRailItemStyle(skill, isSelected)}
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

      <span className="min-w-0" style={getRailTextStyle(skill)}>
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
            {skill.subtitle}
          </span>
        </span>
      </span>
    </button>
  );
}

function getTabId(layoutId: string, skillId: string) {
  return `skill-${layoutId}-tab-${skillId}`;
}

function getPanelId(layoutId: string, skillId: string) {
  return `skill-${layoutId}-panel-${skillId}`;
}

function getRailTextStyle(skill: SkillPageDefinition): RailTextStyle {
  return {
    '--skill-rail-text-extra': `${skill.railTextExtraRem ?? 0}rem`,
    width: `calc(${
      DESKTOP_SKILLS_LAYOUT.selectedRailItemWidthRem -
      DESKTOP_SKILLS_LAYOUT.railTextInsetRem
    }rem + var(--skill-rail-text-extra))`,
  };
}

function getRailItemStyle(
  skill: SkillPageDefinition,
  isSelected: boolean,
): RailItemStyle {
  return {
    ...getSkillStyle(skill),
    width: `${
      isSelected
        ? DESKTOP_SKILLS_LAYOUT.selectedRailItemWidthRem
        : DESKTOP_SKILLS_LAYOUT.railItemWidthRem
    }rem`,
  };
}

function getRailItemClass(isSelected: boolean) {
  const base =
    'bg-surface-container-high/30 text-on-surface-variant hover:bg-white/7 hover:text-white';

  if (!isSelected) {
    return base;
  }

  return 'border-[color:color-mix(in_srgb,var(--skill-accent)_58%,rgba(255,255,255,0.16))] bg-[linear-gradient(90deg,color-mix(in_srgb,var(--skill-accent)_16%,rgba(255,255,255,0.105)),color-mix(in_srgb,var(--skill-accent)_13%,rgba(255,255,255,0.105))_52%,color-mix(in_srgb,var(--skill-accent)_10%,rgba(255,255,255,0.105)))] text-white shadow-[0_6px_16px_rgba(0,0,0,0.18),0_14px_30px_rgba(0,0,0,0.12)]';
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
