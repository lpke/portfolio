import { AccordionIndexSkills } from './components/AccordionIndexSkills';
import { ImmersiveShowcaseSkills } from './components/ImmersiveShowcaseSkills';
import { SkillsShell } from './components/shared';

export function Skills() {
  return (
    <SkillsShell nextSectionId="contact">
      <div className="lg:hidden">
        <AccordionIndexSkills withShell={false} />
      </div>
      <div className="hidden lg:block">
        <ImmersiveShowcaseSkills withShell={false} />
      </div>
    </SkillsShell>
  );
}
