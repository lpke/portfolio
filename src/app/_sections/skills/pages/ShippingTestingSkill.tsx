import { SkillCard } from '@/components/skills/SkillCard/SkillCard';
import {
  SkillGrid,
  SkillPage,
  SkillPageShell,
  SkillPager,
} from '@/components/skills/SkillPagePrimitives';
import type { SkillPageProps } from '@/components/skills/types';

export function ShippingTestingSkill({
  isVisible = true,
  variant,
}: SkillPageProps) {
  return (
    <SkillPageShell
      intro="It’s not a product without production. I write the tests, build the pipelines, and make sure what ships is solid."
      variant={variant}
    >
      <SkillPager isVisible={isVisible}>
        <SkillPage label="Page 1" summary="Shipping & Testing examples page 1">
          <SkillGrid>
            <SkillCard
              eyebrow="Accessibility"
              title="Patient App Accessibility"
              description="Improved keyboard navigation, ARIA labelling, and contrast across Montu patient-facing flows."
              cardSpan={2}
              type="metric"
            >
              <div className="grid grid-cols-3 gap-1.5 text-center text-[11px] text-white/65 lg:grid-cols-1 lg:text-left">
                <span className="rounded-[6px] bg-white/[0.045] px-2 py-1.5">
                  Keyboard
                </span>
                <span className="rounded-[6px] bg-white/[0.045] px-2 py-1.5">
                  ARIA
                </span>
                <span className="rounded-[6px] bg-white/[0.045] px-2 py-1.5">
                  Contrast
                </span>
              </div>
            </SkillCard>
            <SkillCard
              eyebrow="CI/CD"
              title="Webflow-Embedded React Releases"
              titleSize="lg"
              description="GitHub Actions + AWS CDK deployment path for a multi-site Vite build on S3 and CloudFront after migrating out of no-code limits."
              href="https://www.alternaleaf.com.au"
              cardSpan={4}
              image="/images/skills/webflow-pre-screening.jpg"
              imageAlt="Webflow-embedded React release pipeline screenshot"
              imageFit="cover"
              imagePosition={{
                base: 'top',
                md: 'bottom',
              }}
              imageSize={{
                base: '8rem',
                md: '9rem',
              }}
              imageObjectPosition={{
                base: 'center 15%',
                md: 'center 5%',
              }}
              imageObjectScale={{
                md: 1.25,
              }}
            />
            <SkillCard
              eyebrow="Regression safety"
              title="Patient Flow QA Harness"
              description="Paired Vitest coverage with state-controlled GUI checks so complex healthcare flows could be exercised quickly before release."
              cardSpan={4}
              image="/images/skills/pre-consultation-portal.png"
              imageAlt="Healthcare app QA screenshot"
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
              eyebrow="Experiment shipping"
              title="A/B Campaigns With Analytics"
              description="Shipped VWO experiments with custom variant UIs, client-side branching, and GA4 events so product decisions had measurable signal."
              cardSpan={2}
            >
              <div className="grid grid-cols-2 gap-2 text-xs text-white/72">
                <span className="rounded-[6px] border border-white/10 px-2 py-1.5">
                  Variant UI
                </span>
                <span className="rounded-[6px] border border-white/10 px-2 py-1.5">
                  GA4 events
                </span>
                <span className="rounded-[6px] border border-white/10 px-2 py-1.5">
                  GTM
                </span>
                <span className="rounded-[6px] border border-white/10 px-2 py-1.5">
                  Flags
                </span>
              </div>
            </SkillCard>
          </SkillGrid>
        </SkillPage>
        <SkillPage label="Page 2" summary="Shipping & Testing examples page 2">
          <SkillGrid>
            <SkillCard
              eyebrow="Accessibility"
              title="Accessibility at Montu"
              description="Implemented keyboard navigation, ARIA attributes, and contrast fixes across patient-facing apps."
            />
            <SkillCard
              eyebrow="Unit testing"
              title="Healthcare App QA"
              description="Unit testing with Vitest and a custom GUI testing tool with state controls for rapid manual QA."
              image="/images/skills/pre-consultation-portal.png"
              imageAlt="Healthcare app QA screenshot"
              imageFit="cover"
            />
            <SkillCard
              eyebrow="Stack"
              title="Stack"
              cardSpan="full"
              chips={[
                'Playwright',
                'Vitest',
                'GitHub Actions',
                'AWS CDK',
                'Docker',
                'LaunchDarkly',
                'VWO',
              ]}
            />
          </SkillGrid>
        </SkillPage>
      </SkillPager>
    </SkillPageShell>
  );
}
