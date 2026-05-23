'use client';

import { type ReactNode } from 'react';
import { Button } from '@/components/Button';
import type { ButtonSize, ButtonVariant } from '@/components/Button';
import { useSectionNav } from '@/hooks/SectionRouterProvider';
import { SECTIONS } from '@/utils/constants';

/** Map sectionId → clean path */
const ID_TO_PATH: Record<string, string> = Object.fromEntries(
  SECTIONS.map(({ sectionId, path }) => [sectionId, path]),
);

type SectionLinkProps = {
  /** The section id to scroll to. */
  to: string;
  /** Optional DOM id to scroll to while keeping the URL/active section tied to `to`. */
  scrollTargetId?: string;
  children: ReactNode;
  className?: string;
  buttonVariant?: ButtonVariant;
  buttonSize?: ButtonSize;
};

/**
 * A client-side link that smooth-scrolls to a section and updates the URL
 * to a clean path. Renders an `<a>` for accessibility
 * with a real href as fallback.
 */
export function SectionLink({
  to,
  scrollTargetId,
  children,
  className,
  buttonVariant,
  buttonSize,
}: SectionLinkProps) {
  const { navigateTo } = useSectionNav();
  const href = ID_TO_PATH[to] ?? `/#${to}`;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigateTo(to, scrollTargetId);
  };

  if (buttonVariant) {
    return (
      <Button
        href={href}
        onClick={handleClick}
        variant={buttonVariant}
        size={buttonSize}
        className={className}
      >
        {children}
      </Button>
    );
  }

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
