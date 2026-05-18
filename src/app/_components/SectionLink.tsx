'use client';

import { type ReactNode } from 'react';
import { useSectionNav } from '@/hooks/SectionRouterProvider';
import { SECTIONS } from '@/utils/constants';

/** Map sectionId → clean path */
const ID_TO_PATH: Record<string, string> = Object.fromEntries(
  SECTIONS.map(({ sectionId, path }) => [sectionId, path]),
);

type SectionLinkProps = {
  /** The section id to scroll to, e.g. 'projects' */
  to: string;
  /** Optional DOM id to scroll to while keeping the URL/active section tied to `to`. */
  scrollTargetId?: string;
  children: ReactNode;
  className?: string;
};

/**
 * A client-side link that smooth-scrolls to a section and updates the URL
 * to a clean path (e.g. `/projects`). Renders an `<a>` for accessibility
 * with a real href as fallback.
 */
export function SectionLink({
  to,
  scrollTargetId,
  children,
  className,
}: SectionLinkProps) {
  const { navigateTo } = useSectionNav();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigateTo(to, scrollTargetId);
  };

  return (
    <a
      href={ID_TO_PATH[to] ?? `/#${to}`}
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  );
}
