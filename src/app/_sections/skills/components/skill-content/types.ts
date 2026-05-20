import type { SkillProfile } from '../../data/skills';

export type SkillContentVariant = 'desktop' | 'mobile';

export type SkillPageProps = {
  isVisible?: boolean;
  skill: SkillProfile;
  variant: SkillContentVariant;
};
