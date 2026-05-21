import type { ComponentType } from 'react';

export type SkillPageVariant = 'desktop' | 'mobile';

export type SkillPageProps = {
  isVisible?: boolean;
  variant: SkillPageVariant;
};

export type SkillPageComponent = ComponentType<SkillPageProps>;
