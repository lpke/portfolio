import type { ReactNode } from 'react';
import type { SkillProfile } from '../data/skills';
import { AiAutomationSkill } from './skill-content/AiAutomationSkill';
import { CodeArchitectureSkill } from './skill-content/CodeArchitectureSkill';
import { DeveloperToolingSkill } from './skill-content/DeveloperToolingSkill';
import { ProductEngineeringSkill } from './skill-content/ProductEngineeringSkill';
import { ShippingTestingSkill } from './skill-content/ShippingTestingSkill';
import { TechnicalStrategySkill } from './skill-content/TechnicalStrategySkill';
import type { SkillContentVariant } from './skill-content/types';
import { cx, getSkillStyle } from './shared';

type SkillContentProps = {
  skill: SkillProfile;
  variant?: SkillContentVariant;
  isSelected?: boolean;
  panelId?: string;
  labelledBy?: string;
  className?: string;
};

export function SkillContent({
  skill,
  variant = 'desktop',
  isSelected = true,
  panelId,
  labelledBy,
  className,
}: SkillContentProps) {
  const isDesktop = variant === 'desktop';

  return (
    <article
      id={panelId}
      role={labelledBy ? 'tabpanel' : undefined}
      aria-labelledby={labelledBy}
      aria-hidden={isDesktop ? !isSelected : undefined}
      className={cx(
        'w-full',
        isDesktop &&
          'col-start-1 row-start-1 py-4 transition-[opacity,visibility] duration-250 ease-out lg:pt-0 lg:pb-4',
        isDesktop &&
          (isSelected
            ? 'visible opacity-100'
            : 'pointer-events-none invisible opacity-0'),
        className,
      )}
      style={getSkillStyle(skill)}
    >
      {renderSkillPage(skill, variant, !isDesktop || isSelected)}
    </article>
  );
}

function renderSkillPage(
  skill: SkillProfile,
  variant: SkillContentVariant,
  isVisible: boolean,
): ReactNode {
  const props = { isVisible, variant };

  switch (skill.id) {
    case 'product-engineering':
      return <ProductEngineeringSkill {...props} />;
    case 'ai-automation':
      return <AiAutomationSkill {...props} />;
    case 'code-architecture':
      return <CodeArchitectureSkill {...props} />;
    case 'developer-tooling':
      return <DeveloperToolingSkill {...props} />;
    case 'shipping-testing':
      return <ShippingTestingSkill {...props} />;
    case 'technical-strategy':
      return <TechnicalStrategySkill {...props} />;
  }

  return null;
}
