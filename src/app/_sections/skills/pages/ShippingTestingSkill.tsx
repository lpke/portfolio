import { SkillCard } from '@/components/skills/SkillCard';
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
      intro="I write the tests, build the pipelines, and make sure what ships is solid. Playwright suites, GitHub Actions CI/CD with AWS IaC, accessibility audits, and A/B experimentation."
      variant={variant}
    >
      <SkillPager isVisible={isVisible}>
        <SkillPage label="Page 1" summary="Shipping & Testing examples page 1">
          <SkillGrid>
            <SkillCard
              title="Custom CI/CD Pipeline"
              eyebrow="CI/CD"
              description="GitHub Actions pipeline with AWS CDK infrastructure (S3 + CloudFront) for a multi-site Vite build."
            />
            <SkillCard
              title="Shared Tool E2E Suite"
              eyebrow="E2E testing"
              description="Built comprehensive Playwright E2E tests for an internal form tool used across multiple patient-facing apps."
            />
            <SkillCard
              title="A/B Experimentation"
              eyebrow="Experimentation"
              description="Built and shipped multiple VWO A/B campaigns with custom variant UIs, client-side logic, and GA4 event tracking."
            />
          </SkillGrid>
        </SkillPage>
        <SkillPage label="Page 2" summary="Shipping & Testing examples page 2">
          <SkillGrid>
            <SkillCard
              title="Accessibility at Montu"
              eyebrow="Accessibility"
              description="Implemented keyboard navigation, ARIA attributes, and contrast fixes across patient-facing apps."
            />
            <SkillCard
              title="Healthcare App QA"
              eyebrow="Unit testing"
              description="Unit testing with Vitest and a custom GUI testing tool with state controls for rapid manual QA."
              image="/images/skills/pre-consultation-portal.png"
              imageAlt="Healthcare app QA screenshot"
              imageFit="cover"
            />
            <SkillCard
              title="Stack"
              eyebrow="Stack"
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
