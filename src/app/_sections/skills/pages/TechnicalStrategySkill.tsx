import { SkillCard } from '@/components/skills/SkillCard/SkillCard';
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
      intro="I’m a Commerce graduate who turned to the nerd side, but strategy will always be my roots. I evaluate trade-offs, build business cases for technical decisions, and clearly communicate architecture to non-technical stakeholders."
      variant={variant}
    >
      <SkillPager isVisible={isVisible}>
        <SkillPage label="Page 1" summary="Technical Strategy examples page 1">
          <SkillGrid>
            <SkillCard
              eyebrow="Decision-making"
              title="Code Migration Proposal"
              description="Proposed a full code migration over quick-fix no-code workarounds. Built the business case, got buy-in, and delivered."
              image="/images/skills/webflow-pre-screening.jpg"
              imageAlt="Code migration project screenshot"
              imageFit="cover"
            />
            <SkillCard
              eyebrow="Communication"
              title="Company-Wide Product Demo"
              description="Presented a new patient onboarding flow to ~400 people on a near-company-wide call."
            />
            <SkillCard
              eyebrow="Client comms"
              title="Danone Client Communication"
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
              eyebrow="Stakeholders"
              title="Non-Technical Stakeholders"
              description="Explained web app architecture and technical constraints to property developers with no engineering background."
            />
            <SkillCard
              eyebrow="Background"
              title="Commerce to Code"
              description="Bachelor of Commerce graduate who moved from marketing strategy to engineering. Business thinking is built in, not bolted on."
            />
            <SkillCard
              eyebrow="Stack"
              title="Stack"
              cardSpan="full"
              chips={['GA4', 'GTM', 'VWO', 'A/B Testing', 'Figma']}
            />
          </SkillGrid>
        </SkillPage>
      </SkillPager>
    </SkillPageShell>
  );
}
