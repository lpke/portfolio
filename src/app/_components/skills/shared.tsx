import type { CSSProperties } from 'react';
import { SKILLS_SECTION_COPY, type SkillProfile } from '@/utils/constants';

type SkillTokenStyle = CSSProperties & {
  '--skill-accent': string;
  '--skill-accent-soft': string;
};

export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function getSkillStyle(skill: SkillProfile): SkillTokenStyle {
  return {
    '--skill-accent': skill.accent,
    '--skill-accent-soft': skill.accentSoft,
  };
}

export function SkillsHeading() {
  return (
    <header>
      <h1
        data-section-heading
        className="font-headline text-5xl leading-none font-black tracking-tighter text-white sm:text-6xl md:text-7xl lg:text-8xl"
      >
        {SKILLS_SECTION_COPY.heading.lead}{' '}
        <span className="text-primary italic">
          {SKILLS_SECTION_COPY.heading.accent}
        </span>
      </h1>
    </header>
  );
}

export function SkillChips({
  items,
  limit,
  className,
}: {
  items: readonly string[];
  limit?: number;
  className?: string;
}) {
  const visible = typeof limit === 'number' ? items.slice(0, limit) : items;

  return (
    <div className={cx('flex flex-wrap gap-2', className)}>
      {visible.map((item) => (
        <span
          key={item}
          className="font-label rounded-sm border border-[color:color-mix(in_srgb,var(--skill-accent)_20%,transparent)] bg-[color:color-mix(in_srgb,var(--skill-accent)_7%,transparent)] px-2.5 py-1 text-xs font-bold tracking-wider text-[color:color-mix(in_srgb,var(--skill-accent)_28%,white)] uppercase lg:text-sm"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export const StackChips = SkillChips;

export function ChevronIcon({ open }: { open?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={cx(
        'h-5 w-5 transition-transform duration-300',
        open && 'rotate-180',
      )}
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
