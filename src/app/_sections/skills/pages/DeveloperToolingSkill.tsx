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
              eyebrow="Dev environment"
              title="Neovim Config"
              description="Comprehensive custom Neovim setup in Lua. LSP, linting, type checking, keymaps, and AI integration from scratch."
              href="https://github.com/lpke/nvim"
              showGithubIndicator
              image="/images/skills/nvim-codecompanion.png"
              imageAlt="Neovim config screenshot"
              imageFit="cover"
            />
            <SkillCard
              eyebrow="Mentoring"
              title="Mentoring at Montu"
              description="Mentored several junior-mid engineers on React patterns, frontend fundamentals, and code quality."
            />
            <SkillCard
              eyebrow="Adoption"
              title="Internal Tool Documentation"
              description="Wrote docs and streamlined a Storybook library to drive adoption of a shared form tool across engineering."
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
