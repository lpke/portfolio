'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react';
import type { SkillShowcaseData } from '../data/showcaseSkills';
import { SkillInfo } from './SkillInfo';

type SkillsProps = {
  skills: SkillShowcaseData[];
};

const CONTENT_FADE_MS = 160;

function ArrowUpIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <path d="m18 15-6-6-6 6" />
    </svg>
  );
}

function ArrowDownIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function Skills({ skills }: SkillsProps) {
  const initialId = skills[0]?.id ?? '';
  const [selectedId, setSelectedId] = useState(initialId);
  const [visibleId, setVisibleId] = useState(initialId);
  const [isContentVisible, setIsContentVisible] = useState(true);
  const fadeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const frameRef = useRef<number | null>(null);

  const selectedSkill =
    skills.find((skill) => skill.id === selectedId) ?? skills[0];
  const visibleSkill =
    skills.find((skill) => skill.id === visibleId) ?? selectedSkill;

  const clearPendingTransition = useCallback(() => {
    if (fadeTimeoutRef.current) {
      clearTimeout(fadeTimeoutRef.current);
      fadeTimeoutRef.current = null;
    }

    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
  }, []);

  const selectSkill = useCallback(
    (nextId: string) => {
      if (!nextId || nextId === selectedId) return;

      clearPendingTransition();
      setSelectedId(nextId);
      setIsContentVisible(false);

      fadeTimeoutRef.current = setTimeout(() => {
        setVisibleId(nextId);
        frameRef.current = requestAnimationFrame(() => {
          setIsContentVisible(true);
          frameRef.current = null;
        });
        fadeTimeoutRef.current = null;
      }, CONTENT_FADE_MS);
    },
    [clearPendingTransition, selectedId],
  );

  const selectByOffset = useCallback(
    (offset: number) => {
      if (skills.length === 0) return;

      const currentIndex = skills.findIndex((skill) => skill.id === selectedId);
      const baseIndex = currentIndex >= 0 ? currentIndex : 0;
      const nextIndex = (baseIndex + offset + skills.length) % skills.length;
      const nextSkill = skills[nextIndex];

      if (nextSkill) {
        selectSkill(nextSkill.id);
      }
    },
    [selectSkill, selectedId, skills],
  );

  const selectAtIndex = useCallback(
    (index: number) => {
      const nextSkill = skills[index];

      if (nextSkill) {
        selectSkill(nextSkill.id);
      }
    },
    [selectSkill, skills],
  );

  const handleTabsKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
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
      selectAtIndex(0);
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      selectAtIndex(skills.length - 1);
    }
  };

  useEffect(() => clearPendingTransition, [clearPendingTransition]);

  if (!selectedSkill || !visibleSkill) {
    return null;
  }

  return (
    <div
      className="ghost-border relative overflow-hidden rounded-lg transition-colors duration-500 ease-out"
      style={{ backgroundColor: selectedSkill.backgroundColor }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(255,255,255,0.06),transparent_34%,rgba(255,255,255,0.03))]" />
      <div className="relative z-10 grid min-h-[620px] gap-7 p-4 sm:p-5 lg:grid-cols-[2.75rem_22rem_minmax(0,1fr)] lg:gap-8 lg:p-10">
        <div className="hidden self-start pt-7 lg:flex">
          <div className="flex h-[32.5rem] flex-col items-center justify-center gap-2">
            <button
              type="button"
              aria-label="Select previous skill"
              onClick={() => selectByOffset(-1)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.07] bg-white/[0.03] text-white/35 transition-colors hover:border-white/15 hover:bg-white/[0.06] hover:text-white/75"
            >
              <ArrowUpIcon />
            </button>
            <button
              type="button"
              aria-label="Select next skill"
              onClick={() => selectByOffset(1)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.07] bg-white/[0.03] text-white/35 transition-colors hover:border-white/15 hover:bg-white/[0.06] hover:text-white/75"
            >
              <ArrowDownIcon />
            </button>
          </div>
        </div>

        <div
          role="tablist"
          aria-label="Skill focus areas"
          onKeyDown={handleTabsKeyDown}
          className="flex flex-wrap content-start items-start gap-3 lg:min-h-[32.5rem] lg:flex-col lg:pt-7"
        >
          {skills.map((skill) => (
            <SkillInfo
              key={skill.id}
              id={skill.id}
              title={skill.title}
              titleMobile={skill.titleMobile}
              description={skill.description}
              isSelected={skill.id === selectedId}
              onSelectAction={selectSkill}
            />
          ))}
        </div>

        <div
          id="skills-showcase-panel"
          role="tabpanel"
          aria-live="polite"
          aria-labelledby={`skill-tab-${selectedSkill.id}`}
          className="min-w-0 self-stretch"
        >
          <div
            className={`h-full transition-all duration-200 ease-out ${
              isContentVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-2 opacity-0'
            }`}
          >
            <div className="grid h-full min-h-[32rem] items-center gap-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(22rem,1.18fr)] lg:gap-10">
              <div className="max-w-3xl">
                <h3 className="font-headline max-w-[11ch] text-5xl leading-none font-black text-white sm:text-6xl lg:text-7xl xl:text-8xl">
                  <span className="lg:hidden">
                    {visibleSkill.titleMobile ?? visibleSkill.title}
                  </span>
                  <span className="hidden lg:inline">{visibleSkill.title}</span>
                </h3>
                <p className="text-on-surface-variant mt-6 max-w-xl text-base leading-relaxed sm:text-lg">
                  {visibleSkill.description}
                </p>
              </div>

              <div className="min-h-72 min-w-0 lg:min-h-[30rem]">
                {visibleSkill.content}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
