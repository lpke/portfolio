import { SECTION_IDS } from '@/utils/constants';
import { ResponsiveSkills } from './components/ResponsiveSkills';
import { SkillsShell } from './components/SkillsShell';

export function Skills() {
  return (
    <SkillsShell nextSectionId={SECTION_IDS.contact}>
      <ResponsiveSkills />
    </SkillsShell>
  );
}
