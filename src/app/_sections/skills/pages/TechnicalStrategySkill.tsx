import { SkillCard } from '@/components/skills/SkillCard';
import {
  SkillGrid,
  SkillPage,
  SkillPageShell,
  SkillPager,
} from '@/components/skills/SkillPagePrimitives';
import type { SkillPageProps } from '@/components/skills/types';

export function TechnicalStrategySkill({
  isVisible = true,
  variant,
}: SkillPageProps) {
  return (
    <SkillPageShell
      intro="Commerce graduate turned engineer. I evaluate trade-offs, build business cases for technical decisions, and communicate architecture to non-technical stakeholders. Business thinking built in, not bolted on."
      variant={variant}
    >
      <SkillPager isVisible={isVisible}>
        <SkillPage label="Page 1" summary="Technical Strategy examples page 1">
          <SkillGrid>
            <SkillCard
              title="Code Migration Proposal"
              eyebrow="Decision-making"
              description="Proposed a full code migration over quick-fix no-code workarounds. Built the business case, got buy-in, and delivered."
              image="/images/skills/webflow-pre-screening.jpg"
              imageAlt="Code migration project screenshot"
              imageFit="cover"
            />
            <SkillCard
              title="Company-Wide Product Demo"
              eyebrow="Communication"
              description="Presented a new patient onboarding flow to ~400 people on a near-company-wide call."
            />
            <SkillCard
              title="Danone Client Communication"
              eyebrow="Client comms"
              description="Communicated technical decisions directly to senior stakeholders at Nutricia/Danone while implementing systems like Yotpo reviews."
              image="/images/skills/nutriciastore.jpg"
              imageAlt="Danone Nutricia Store screenshot"
              imageFit="cover"
            />
          </SkillGrid>
        </SkillPage>
        <SkillPage label="Page 2" summary="Technical Strategy examples page 2">
          <SkillGrid>
            <SkillCard
              title="Non-Technical Stakeholders"
              eyebrow="Stakeholders"
              description="Explained web app architecture and technical constraints to property developers with no engineering background."
            />
            <SkillCard
              title="Commerce to Code"
              eyebrow="Background"
              description="Bachelor of Commerce graduate who moved from marketing strategy to engineering. Business thinking is built in, not bolted on."
            />
            <SkillCard
              title="Stack"
              eyebrow="Stack"
              cardSpan="full"
              chips={['GA4', 'GTM', 'VWO', 'A/B Testing', 'Figma']}
            />
          </SkillGrid>
        </SkillPage>
      </SkillPager>
    </SkillPageShell>
  );
}
