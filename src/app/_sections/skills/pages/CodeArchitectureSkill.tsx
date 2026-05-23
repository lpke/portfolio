import { SkillCard } from '@/components/skills/SkillCard/SkillCard';
import {
  SkillGrid,
  SkillPage,
  SkillPageShell,
  SkillPager,
} from '@/components/skills/SkillPagePrimitives';
import type { SkillPageProps } from '@/components/skills/types';

export function CodeArchitectureSkill({
  isVisible = true,
  variant,
}: SkillPageProps) {
  return (
    <SkillPageShell
      intro="I care about how code is organised, not just that it works. I build component libraries, design monorepo architecture, and deploy with performant build pipelines."
      variant={variant}
    >
      <SkillPager isVisible={isVisible}>
        <SkillPage label="Page 1" summary="Code Architecture examples page 1">
          <SkillGrid>
            <SkillCard
              eyebrow="Case study @ Montu"
              title="Unblocking Alternaleaf with a React Microfrontend"
              titleSize="lg"
              description="When Alternaleaf hit a Webflow limit in 2025, I built a Vite-powered React microfrontend deployed with AWS CDK. It replaced legacy JS on Montu's key B2C site, delivered a 4x performance improvement, and unblocked multiple teams."
              href="https://www.alternaleaf.com.au"
              cardSpan="full"
              cardMinHeight={{
                md: '18rem',
              }}
              image="/images/skills/webflow-pre-screening.jpg"
              imageAlt="Custom multi-site build screenshot"
              imageFit="cover"
              imageSize={{
                base: '8rem',
                md: '40%',
              }}
              imageObjectPosition={{
                base: 'center 15%',
                md: 'center 5%',
              }}
              imageObjectScale={{
                md: 1.3,
              }}
            />
            <SkillCard
              title="Codebase Architecture"
              description="I define codebase and package boundaries, build paths, release workflows, and infrastructure for teams shipping at scale."
              chips={[
                'Nx',
                'Monorepos',
                'Microfrontends',
                'CI/CD',
                'AWS CDK',
                'GitHub Actions',
              ]}
            />
            <SkillCard
              title="Component Management"
              description="I turn shared UI patterns into dependable component APIs with docs, visual checks, and test coverage."
              chips={[
                'React',
                'Jest',
                'Vitest',
                'Storybook',
                'Playwright',
                'Chromatic',
              ]}
            />
          </SkillGrid>
        </SkillPage>
        <SkillPage label="Page 2" summary="Code Architecture examples page 2">
          <SkillGrid>
            <SkillCard
              eyebrow="Design system"
              title="Design System Rollout"
              description="Key contributor to design system adoption across multiple patient-facing apps at Montu."
            />
            <SkillCard
              eyebrow="Architecture"
              title="Headless PWA (Nutricia)"
              description="Frontend architecture for a headless React/Magento PWA with component reuse across checkout, SSO, and loyalty flows."
              image="/images/skills/nutriciastore.jpg"
              imageAlt="Nutricia headless PWA screenshot"
              imageFit="cover"
            />
            <SkillCard
              eyebrow="Stack"
              title="Stack"
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
