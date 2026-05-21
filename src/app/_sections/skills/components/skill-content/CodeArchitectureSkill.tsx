import {
  ProofPointCard,
  SkillGrid,
  SkillPage,
  SkillPageShell,
  SkillPager,
} from './primitives';
import type { SkillPageProps } from './types';

export function CodeArchitectureSkill({
  isVisible = true,
  variant,
}: SkillPageProps) {
  return (
    <SkillPageShell
      intro="I care about how code is organised, not just that it works. Component libraries, monorepo architecture with clean boundaries, and custom build pipelines that cut bundle sizes dramatically."
      variant={variant}
    >
      <SkillPager isVisible={isVisible}>
        <SkillPage label="Page 1" summary="Code Architecture examples page 1">
          <SkillGrid>
            <ProofPointCard
              title="Custom Multi-Site Build"
              eyebrow="Build"
              description="Vite build pipeline with AWS CDK infra that replaced a no-code platform's limits. 75% bundle reduction, 70% faster builds."
              image="/images/skills/webflow-pre-screening.jpg"
              imageAlt="Custom multi-site build screenshot"
              imageFit="cover"
            />
            <ProofPointCard
              title="100+ Engineer Monorepo"
              eyebrow="Monorepo"
              description="Implemented new apps and packages in a large-scale Nx monorepo, including full CI/CD and IaC for new projects."
            />
            <ProofPointCard
              title="Shared Component Library"
              eyebrow="Components"
              description="Migrated an internal React form tool into a standalone shared package in an Nx monorepo. Owned the Storybook library and E2E coverage."
            />
          </SkillGrid>
        </SkillPage>
        <SkillPage label="Page 2" summary="Code Architecture examples page 2">
          <SkillGrid>
            <ProofPointCard
              title="Design System Rollout"
              eyebrow="Design system"
              description="Key contributor to design system adoption across multiple patient-facing apps at Montu."
            />
            <ProofPointCard
              title="Headless PWA (Nutricia)"
              eyebrow="Architecture"
              description="Frontend architecture for a headless React/Magento PWA with component reuse across checkout, SSO, and loyalty flows."
              image="/images/skills/nutriciastore.jpg"
              imageAlt="Nutricia headless PWA screenshot"
              imageFit="cover"
            />
            <ProofPointCard
              title="Stack"
              eyebrow="Stack"
              cardSpan="full"
              chips={[
                'Nx',
                'Vite',
                'Storybook',
                'Chromatic',
                'TypeScript',
                'AWS CDK',
                'GitHub Actions',
              ]}
            />
          </SkillGrid>
        </SkillPage>
      </SkillPager>
    </SkillPageShell>
  );
}
