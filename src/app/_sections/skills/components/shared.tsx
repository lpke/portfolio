import type { CSSProperties, ReactNode } from 'react';
import { getSkillIcon } from './SkillIcons';
import type { SkillData } from '../data/skills';

type SkillsShellProps = {
  children: ReactNode;
  className?: string;
};

type SkillTokenStyle = CSSProperties & {
  '--skill-accent': string;
  '--skill-accent-soft': string;
};

export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function getSkillStyle(skill: SkillData): SkillTokenStyle {
  return {
    '--skill-accent': skill.accent,
    '--skill-accent-soft': skill.accentSoft,
  };
}

export function SkillsShell({ children, className }: SkillsShellProps) {
  return (
    <section id="skills" className={className}>
      {children}
    </section>
  );
}

export function SkillsHeading() {
  return (
    <header>
      <h1 className="font-headline text-5xl font-black tracking-tighter text-white md:text-7xl lg:text-8xl">
        What I <span className="text-primary italic">do</span>
      </h1>
    </header>
  );
}

export function SkillIconBadge({
  skill,
  className,
}: {
  skill: SkillData;
  className?: string;
}) {
  return (
    <span
      className={cx(
        'flex h-12 w-12 shrink-0 items-center justify-center rounded border border-white/10 bg-[var(--skill-accent-soft)] text-[var(--skill-accent)] shadow-[0_0_28px_var(--skill-accent-soft)]',
        className,
      )}
      style={getSkillStyle(skill)}
      aria-hidden="true"
    >
      {getSkillIcon(skill.iconKey)}
    </span>
  );
}

export function StackChips({
  items,
  limit,
  className,
}: {
  items: string[];
  limit?: number;
  className?: string;
}) {
  const visible = typeof limit === 'number' ? items.slice(0, limit) : items;

  return (
    <div className={cx('flex flex-wrap gap-2', className)}>
      {visible.map((item) => (
        <span
          key={item}
          className="font-label text-on-surface-variant rounded-sm border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-bold tracking-wider uppercase"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export function CompetencyList({
  skill,
  limit,
}: {
  skill: SkillData;
  limit?: number;
}) {
  const visible =
    typeof limit === 'number'
      ? skill.competencies.slice(0, limit)
      : skill.competencies;

  return (
    <div className="space-y-4">
      {visible.map((item) => (
        <div key={item.label} className="flex gap-3">
          <span
            className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--skill-accent)]"
            aria-hidden="true"
          />
          <div>
            <h4 className="font-headline text-sm font-bold text-white">
              {item.label}
            </h4>
            <p className="text-on-surface-variant mt-1 text-sm leading-relaxed">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ExampleList({ skill }: { skill: SkillData }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {skill.examples.map((example) => (
        <article
          key={example.title}
          className="rounded border border-white/10 bg-white/[0.035] p-4"
        >
          <h4 className="font-headline text-sm font-bold text-white">
            {example.title}
          </h4>
          <p className="text-on-surface-variant mt-2 text-sm leading-relaxed">
            {example.detail}
          </p>
        </article>
      ))}
    </div>
  );
}

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
