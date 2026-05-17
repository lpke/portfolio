import type { CSSProperties, ReactNode } from 'react';
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
      <h1 className="font-headline text-5xl leading-none font-black tracking-tighter text-white sm:text-6xl md:text-7xl lg:text-8xl">
        What I <span className="text-primary italic">do</span>
      </h1>
    </header>
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
