import {
  CapabilityCard,
  ProofPointCard,
  SkillGrid,
  SkillPageShell,
  StackSkillCard,
} from './primitives';
import type { SkillPageProps } from './types';

export function GenericSkill({ skill, variant }: SkillPageProps) {
  return (
    <SkillPageShell intro={skill.intro} variant={variant}>
      <SkillGrid>
        {skill.capabilities.map((capability) => (
          <CapabilityCard key={capability.title} capability={capability} />
        ))}
        {skill.proofPoints.map((proofPoint) => (
          <ProofPointCard key={proofPoint.title} proofPoint={proofPoint} />
        ))}
        <StackSkillCard skill={skill} title="Stack" />
      </SkillGrid>
    </SkillPageShell>
  );
}
