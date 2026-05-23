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
              title="How I Work"
              titleSize="lg"
              description="I'm a strong believer of knowing your tools. I've built a custom development environment on top of Neovim focusing on system/agent integration, Git workflows, and session management."
              cardSpan={4}
              href="https://github.com/lpke/nvim"
              showGithubIndicator
              image="/images/skills/nvim-codecompanion.png"
              imageAlt="Neovim agentic coding workflow screenshot"
              imageFit="cover"
              imagePosition="bottom"
              imageSize={{
                base: '8rem',
                md: '9rem',
              }}
              imageObjectPosition="60% top"
              imageObjectScale={{
                base: 2,
                md: 1.5,
              }}
            />
            <SkillCard
              cardless={{
                lg: true,
              }}
              title={{
                base: undefined,
                1250: 'My Development Environment',
              }}
              cardSpan={2}
              chips={[
                'Linux',
                'NixOS',
                'KDE Plasma',
                'Zsh',
                'Alacritty',
                'Chezmoi',
                'Tmux',
                'Neovim',
                'Codex CLI',
                'Node',
              ]}
            />
            <SkillCard
              title="How I Help Others Work"
              titleSize="lg"
              description="On Milkrun's Next.js/React Shopify build, I helped a team newer to React ship confidently: explaining component patterns, reviewing state and data-flow decisions, and pairing through tricky UI work."
              cardSpan="full"
              href="https://www.milkrun.com"
              cardMinHeight={{
                lg: '16rem',
              }}
              image="/images/skills/milkrun.jpg"
              imageAlt="Milkrun website screenshot"
              imageObjectScale={{
                base: 5,
                md: 6,
                lg: 1,
              }}
              imagePosition={{
                lg: 'right',
              }}
              imageSize={{
                base: '8rem',
                md: '9rem',
                lg: '40%'
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
              eyebrow="Internal enablement"
              title="Form Tool Adoption"
              description="Stabilised a reusable patient-form tool with Storybook examples, implementation notes, and E2E coverage so teams could adopt it confidently."
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
