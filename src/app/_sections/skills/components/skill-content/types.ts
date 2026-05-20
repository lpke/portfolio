import type { SkillProfile } from '../../data/skills';

export type SkillContentVariant = 'desktop' | 'mobile';

export type SkillPageProps = {
  skill: SkillProfile;
  variant: SkillContentVariant;
};
