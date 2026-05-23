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
              imagePosition={{
                base: 'top',
                md: 'right',
                lg: 'bottom',
              }}
              imageSize={{
                base: '8rem',
                md: '45%',
                lg: '9rem',
              }}
              imageObjectPosition="60% top"
              imageObjectScale={{
                base: 2,
                md: 1.5,
              }}
            />
            <SkillCard
              cardless={{
                base: 'strip-padding',
                lg: true,
              }}
              title={{
                base: undefined,
                1250: 'My Development Environment',
              }}
              className={{
                direction: 'down',
                values: {
                  lg: 'mt-2 mb-4',
                },
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
                base: 1,
                md: 1,
                lg: 1,
              }}
              imagePosition={{
                sm: 'top',
                md: 'left',
                lg: 'right',
              }}
              imageSize={{
                base: '8rem',
                md: '45%',
                lg: '40%'
              }}
            />
          </SkillGrid>
        </SkillPage>
      </SkillPager>
    </SkillPageShell>
  );
}
