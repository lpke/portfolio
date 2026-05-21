import { SkillCard } from '@/components/skills/SkillCard';
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
      intro="I build the things that make the team faster — internal tools, streamlined workflows, and mentoring that turns juniors into confident contributors. The layer that multiplies everyone's output."
      variant={variant}
    >
      <SkillPager isVisible={isVisible}>
        <SkillPage label="Page 1" summary="Developer Tooling examples page 1">
          <SkillGrid>
            <SkillCard
              title="Neovim Config"
              eyebrow="Dev environment"
              description="Comprehensive custom Neovim setup in Lua. LSP, linting, type checking, keymaps, and AI integration from scratch."
              href="https://github.com/lpke/nvim"
              showGithubIndicator
              image="/images/skills/nvim-codecompanion.png"
              imageAlt="Neovim config screenshot"
              imageFit="cover"
            />
            <SkillCard
              title="Mentoring at Montu"
              eyebrow="Mentoring"
              description="Mentored several junior-mid engineers on React patterns, frontend fundamentals, and code quality."
            />
            <SkillCard
              title="Internal Tool Documentation"
              eyebrow="Adoption"
              description="Wrote docs and streamlined a Storybook library to drive adoption of a shared form tool across engineering."
            />
          </SkillGrid>
        </SkillPage>
        <SkillPage label="Page 2" summary="Developer Tooling examples page 2">
          <SkillGrid>
            <SkillCard
              title="Senior Code Reviews"
              eyebrow="Code quality"
              description="Provided code reviews and mentorship on a Next.js/React Shopify build as the senior frontend on the project."
            />
            <SkillCard
              title="Technical Hiring"
              eyebrow="Hiring"
              description="Conducted technical candidate reviews for Montu's international engineering expansion."
            />
            <SkillCard
              title="Stack"
              eyebrow="Stack"
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
