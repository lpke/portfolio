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
        <SkillPage label="Page 1" summary="Technical Strategy examples">
          <SkillGrid>
            <SkillCard
              eyebrow="Greenfields DC"
              title="Property Releases Portal"
              titleSize="lg"
              description="Translated a messy (post-it notes and emails) EOI workflow into a full-stack portal for property developers and prospective buyers."
              cardSpan={4}
              image="/images/skills/opt-releases.png"
              imageAlt="Property releases portal screenshot"
              imageFit="cover"
              imagePosition={{
                base: 'top',
                md: 'left',
              }}
              imageSize={{
                base: '8rem',
                md: '45%',
              }}
              imageObjectPosition="left top"
              imageObjectScale={1.2}
            />
            <SkillCard
              eyebrow="Montu"
              title="Platform Research"
              description="Led research across Payload, Sanity, Prismic, Contentful, Insider One, and Webflow Optimize. Presented clear tradeoffs and a path forward."
              cardSpan={2}
              type="metric"
            >
              <dl className="space-y-2 text-xs text-white/72">
                <div className="flex justify-between gap-3 border-b border-white/10 pb-2">
                  <dt className="text-white/45">CMS</dt>
                  <dd className="text-right">Payload, Sanity, Prismic</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-white/45">Personalise</dt>
                  <dd className="text-right">Insider One vs Optimize</dd>
                </div>
              </dl>
            </SkillCard>
            <SkillCard
              eyebrow="Montu"
              title="Large Audience Demo"
              description="After the Portal build was complete, I presented the user flow to 500 people and kept product, management, data, and engineers aligned on scope, risks, and next steps."
              cardSpan={2}
            />
            <SkillCard
              eyebrow="Montu"
              title="React Email for Braze"
              description="Proposed a React Email workflow for CRM templates, built the POC, documented Braze integration, and presented it to CRM and vendor stakeholders."
              cardSpan={4}
              image="/images/skills/react-email-logo.png"
              imageAlt="React Email logo"
              imageColor="black"
              imageFit="contain"
              imageBlurBackground={false}
              imageObjectPosition="center"
              imageObjectScale={1.2}
              imagePosition={{
                base: 'top',
                md: 'left',
              }}
              imageSize={{
                base: '7rem',
                md: '42%',
              }}
            />
          </SkillGrid>
        </SkillPage>
      </SkillPager>
    </SkillPageShell>
  );
}
