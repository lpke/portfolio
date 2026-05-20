import type { ReactNode } from 'react';
import {
  type SkillCapability,
  type SkillProfile,
  type SkillProofPoint,
} from '../../data/skills';
import { SkillCard, type SkillCardType } from '../SkillCard';
import { GithubIcon, cx } from '../shared';
import type { SkillContentVariant } from './types';

export function SkillPageShell({
  intro,
  variant,
  children,
}: {
  intro: string;
  variant: SkillContentVariant;
  children: ReactNode;
}) {
  return (
    <>
      <p
        className={cx(
          'max-w-3xl leading-relaxed text-white/90',
          variant === 'desktop'
            ? 'text-[1.18rem] lg:text-[1.25rem]'
            : 'text-base font-medium',
        )}
      >
        {intro}
      </p>
      <div className={variant === 'desktop' ? 'mt-7' : 'mt-5'}>{children}</div>
    </>
  );
}

export function SkillGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-6">{children}</div>
  );
}

export function StackSkillCard({
  skill,
  title,
  className,
}: {
  skill: SkillProfile;
  title: string;
  className?: string;
}) {
  return (
    <SkillCard
      type="chips"
      title={title}
      eyebrow="Stack"
      chips={skill.tools}
      className={className}
    />
  );
}

export function CapabilityCard({
  capability,
  eyebrow = 'Capability',
  type = 'default',
  className,
  children,
}: {
  capability?: SkillCapability;
  eyebrow?: string;
  type?: SkillCardType;
  className?: string;
  children?: ReactNode;
}) {
  if (!capability) {
    return null;
  }

  return (
    <SkillCard
      type={type}
      title={capability.title}
      eyebrow={eyebrow}
      description={capability.description}
      className={className}
    >
      {children}
    </SkillCard>
  );
}

export function ProofPointCard({
  proofPoint,
  eyebrow = 'Proof point',
  type = 'default',
  className,
  children,
}: {
  proofPoint?: SkillProofPoint;
  eyebrow?: string;
  type?: SkillCardType;
  className?: string;
  children?: ReactNode;
}) {
  if (!proofPoint) {
    return null;
  }

  return (
    <SkillCard
      type={type}
      title={proofPoint.title}
      eyebrow={eyebrow}
      description={proofPoint.description}
      href={proofPoint.url}
      meta={
        proofPoint.showGithubIcon ? (
          <GithubIcon className="h-4 w-4 transition-colors duration-200 group-hover/skill-card:text-[var(--skill-accent)]" />
        ) : undefined
      }
      className={className}
    >
      {children}
    </SkillCard>
  );
}

export function getCapability(skill: SkillProfile, title: string) {
  return skill.capabilities.find((capability) => capability.title === title);
}

export function getProofPoint(skill: SkillProfile, title: string) {
  return skill.proofPoints.find((proofPoint) => proofPoint.title === title);
}
