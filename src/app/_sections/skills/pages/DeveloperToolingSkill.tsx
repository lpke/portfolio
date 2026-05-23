import { SkillCard } from '@/components/skills/SkillCard/SkillCard';
import {
  SkillGrid,
  SkillPage,
  SkillPageShell,
  SkillPager,
} from '@/components/skills/SkillPagePrimitives';
import type { SkillPageProps } from '@/components/skills/types';

export function DeveloperToolingSkill({
  isVisible = true,
  variant,
}: SkillPageProps) {
  return (
    <SkillPageShell
      intro="I do things that make other people faster: building internal tools, streamlining workflows, and providing mentorship that turns juniors into confident contributors."
      variant={variant}
    >
      <SkillPager isVisible={isVisible}>
        <SkillPage label="Page 1" summary="Developer Tooling examples page 1">
          <SkillGrid>
            <SkillCard
              eyebrow="Daily driver"
              title="Neovim Workbench"
              titleSize="lg"
              description="Lua config that makes the editor a repeatable workflow: LSP, diagnostics, formatter paths, Copilot, Codex ACP, and CodeCompanion."
              cardSpan={4}
              href="https://github.com/lpke/nvim"
              showGithubIndicator
              image="/images/skills/nvim-codecompanion.png"
              imageAlt="Neovim agentic coding workflow screenshot"
              imageFit="cover"
              imagePosition={{
                base: 'top',
                md: 'bottom',
              }}
              imageSize={{
                base: '8rem',
                md: '10rem',
              }}
              imageObjectPosition="60% top"
              imageObjectScale={{
                base: 2,
                md: 1.5,
              }}
            />
            <SkillCard
              eyebrow="Tooling stack"
              title="Editor & Team Enablement"
              cardSpan={2}
              chips={[
                'Neovim',
                'Lua',
                'Bash',
                'Storybook',
                'Playwright',
                'GitHub Actions',
              ]}
            />
            <SkillCard
              eyebrow="Internal enablement"
              title="Form Tool Adoption"
              description="Stabilised a reusable patient-form tool with Storybook examples, implementation notes, and E2E coverage so teams could adopt it confidently."
              cardSpan={3}
            />
            <SkillCard
              eyebrow="Acidgreen"
              title="Milkrun Mentoring"
              description="Senior frontend on a Next.js/React Shopify build. Reviewed implementation decisions and helped teammates work cleanly within the project patterns."
              cardSpan={3}
              href="https://www.milkrun.com"
              image="/images/skills/milkrun.png"
              imageAlt="Milkrun website screenshot"
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
          </SkillGrid>
        </SkillPage>
        <SkillPage label="Page 2" summary="Developer Tooling examples page 2">
          <SkillGrid>
            <SkillCard
              eyebrow="Code quality"
              title="Senior Code Reviews"
              description="Provided code reviews and mentorship on a Next.js/React Shopify build as the senior frontend on the project."
            />
            <SkillCard
              eyebrow="Hiring"
              title="Technical Hiring"
              description="Conducted technical candidate reviews for Montu's international engineering expansion."
            />
            <SkillCard
              eyebrow="Stack"
              title="Stack"
              cardSpan="full"
              chips={[
                'Neovim',
                'Lua',
                'Linux',
                'Bash',
                'Storybook',
                'Playwright',
                'Git',
              ]}
            />
          </SkillGrid>
        </SkillPage>
      </SkillPager>
    </SkillPageShell>
  );
}
