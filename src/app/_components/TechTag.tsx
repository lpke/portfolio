import type { ReactNode } from 'react';

type Variant = 'primary' | 'tertiary' | 'tool';

const VARIANT_STYLES: Record<Variant, string> = {
  primary: 'bg-primary-container text-on-primary-container',
  tertiary: 'bg-tertiary-container text-on-tertiary-container',
  tool: 'bg-surface-container-highest text-primary',
};

interface TechTagProps {
  children: ReactNode;
  variant?: Variant;
}

/** Small chip for highlighting tech stacks within cards */
export function TechTag({ children, variant = 'tertiary' }: TechTagProps) {
  return (
    <span
      className={`inline-block rounded-sm px-3 py-1 font-label text-xs font-bold uppercase tracking-wider ${VARIANT_STYLES[variant]}`}
    >
      {children}
    </span>
  );
}
