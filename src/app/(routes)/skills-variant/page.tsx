import type { Metadata } from 'next';
import { SkillsVariantPage } from '@/sections/skills/variants/SkillsVariantPage';
import { AccordionIndexSkills } from '@/sections/skills/variants/components/AccordionIndexSkills';
import { ImmersiveShowcaseSkills } from '@/sections/skills/variants/components/ImmersiveShowcaseSkills';
import { VariantShell } from '@/sections/skills/variants/shared';

export const metadata: Metadata = {
  title: 'Skills',
  description: 'Skills and software delivery capabilities.',
};

export default function SkillsVariantRoute() {
  return (
    <SkillsVariantPage>
      <VariantShell>
        <div className="lg:hidden">
          <AccordionIndexSkills withShell={false} />
        </div>
        <div className="hidden lg:block">
          <ImmersiveShowcaseSkills variantId="09" withShell={false} />
        </div>
      </VariantShell>
    </SkillsVariantPage>
  );
}
