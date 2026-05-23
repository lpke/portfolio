import { SECTION_IDS } from '@/utils/constants';
import { ResponsiveSkills } from '@/components/skills/ResponsiveSkills';
import { SkillsShell } from '@/components/skills/SkillsShell';

export function Skills() {
  return (
    <SkillsShell nextSectionId={SECTION_IDS.contact}>
      <ResponsiveSkills />
    </SkillsShell>
  );
}
