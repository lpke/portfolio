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
              eyebrow="Stakeholder strategy"
              title="Property Releases Portal"
              titleSize="lg"
              description="Translated a messy EOI workflow into a full-stack portal for property developers: auth, dynamic data grids, and practical constraints explained in business terms."
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
              eyebrow="Decision filter"
              title="Business Case Lens"
              description="I frame technical recommendations around cost, risk, timing, and the team that has to operate the result."
              cardSpan={2}
              type="metric"
            >
              <dl className="grid gap-2 text-xs">
                <div>
                  <dt className="font-label tracking-widest text-white/40 uppercase">
                    Trade-off
                  </dt>
                  <dd className="text-white/78">Migration over workaround</dd>
                </div>
                <div>
                  <dt className="font-label tracking-widest text-white/40 uppercase">
                    Output
                  </dt>
                  <dd className="text-white/78">Buy-in, roadmap, delivery</dd>
                </div>
              </dl>
            </SkillCard>
            <SkillCard
              eyebrow="Company comms"
              title="Alternaleaf Portal Demo"
              description="Presented the Alternaleaf patient portal and onboarding flow to ~400 people, translating frontend architecture into product and operations impact."
              cardSpan={3}
              image="/images/skills/pre-consultation-portal.png"
              imageAlt="Alternaleaf patient portal screenshot"
              imageFit="cover"
              imagePosition={{
                base: 'top',
                md: 'right',
              }}
              imageSize={{
                base: '7rem',
                md: '42%',
              }}
            />
            <SkillCard
              eyebrow="Client strategy"
              title="Danone Stakeholder Decision"
              description="Explained implementation choices directly to senior Nutricia/Danone stakeholders while shipping integrations like Yotpo reviews."
              cardSpan={3}
            >
              <dl className="space-y-2 text-xs text-white/72">
                <div className="flex justify-between gap-3 border-b border-white/10 pb-2">
                  <dt className="text-white/45">Audience</dt>
                  <dd className="text-right">Senior client stakeholders</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-white/45">Focus</dt>
                  <dd className="text-right">
                    Scope, risk, integration trade-offs
                  </dd>
                </div>
              </dl>
            </SkillCard>
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
