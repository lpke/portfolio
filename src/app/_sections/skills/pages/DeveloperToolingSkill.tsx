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
              eyebrow="Live Personal Project"
              title="sound-check"
              titleSize="lg"
              description={
                <>
                  I built sound-check because I was frustrated at the lack of
                  competent tools for quickly testing your mic/speakers. No
                  existing options did what I needed, so I built it
                  myself.&nbsp;
                  <a
                    href="https://github.com/lpke/sound-check"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Source
                  </a>
                </>
              }
              cardSpan={4}
              className="order-1"
              href="https://sound.lpdev.io/"
              image="/images/skills/sound-check.png"
              imageAlt="Sound Check audio testing app screenshot"
              imageFit="cover"
              imagePosition="top"
              imageSize={{
                base: '8rem',
                md: '8rem',
                lg: '9rem',
              }}
              imageObjectPosition="0.5% 3.1%"
              imageObjectScale={2}
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
              className="order-4 mt-2 mb-4 lg:order-2"
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
              title="How I Work"
              titleSize="lg"
              description="I'm a strong believer of knowing your tools. I've built a custom development environment on top of Neovim focusing on system/agent integration, Git workflows, and session management."
              cardSpan="half"
              className="order-3"
              href="https://github.com/lpke/nvim"
              showGithubIndicator
              image="/images/skills/nvim-codecompanion.png"
              imageAlt="Neovim agentic coding workflow screenshot"
              imageFit="cover"
              imagePosition="top"
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
              title="How I Help Others Work"
              titleSize="lg"
              description="On Milkrun's Next.js/React Shopify build, I helped a team newer to React ship confidently: explaining component patterns, reviewing state and data-flow decisions, and pairing through tricky UI work."
              cardSpan="half"
              className="order-2 lg:order-4"
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
              imagePosition="top"
              imageSize={{
                base: '8rem',
                md: '45%',
                lg: '9rem',
              }}
            />
          </SkillGrid>
        </SkillPage>
      </SkillPager>
    </SkillPageShell>
  );
}
