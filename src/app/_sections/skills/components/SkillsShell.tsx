import type { ReactNode } from 'react';
import { SectionScrollIndicator } from '@/components/SectionScrollIndicator';
import { SECTION_IDS } from '@/utils/constants';

type SkillsShellProps = {
  children: ReactNode;
  className?: string;
  nextSectionId?: string;
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function SkillsShell({
  children,
  className,
  nextSectionId,
}: SkillsShellProps) {
  return (
    <section id={SECTION_IDS.skills} className={cx('relative', className)}>
      {children}
      {nextSectionId && (
        <SectionScrollIndicator nextSectionId={nextSectionId} />
      )}
    </section>
  );
}
