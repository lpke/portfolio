import type { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  /** Surface level for tonal hierarchy: 0 = base, 1 = low, 2 = container */
  level?: 0 | 1 | 2;
  id?: string;
}

const LEVEL_BG = {
  0: 'bg-surface',
  1: 'bg-surface-container-low',
  2: 'bg-surface-container',
} as const;

/** Full-width section wrapper with tonal background hierarchy */
export function Section({
  children,
  className = '',
  level = 0,
  id,
}: SectionProps) {
  return (
    <section className={`${LEVEL_BG[level]} ${className}`} id={id}>
      <div className="mx-auto max-w-7xl px-6 md:px-8">{children}</div>
    </section>
  );
}
