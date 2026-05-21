import { SkillPageShell, SkillProofPointPager } from './primitives';
import type { SkillPageProps } from './types';

export function CodeArchitectureSkill({
  isVisible = true,
  skill,
  variant,
}: SkillPageProps) {
  return (
    <SkillPageShell intro={skill.intro} variant={variant}>
      <SkillProofPointPager skill={skill} isVisible={isVisible} />
    </SkillPageShell>
  );
}
