import { SkillCard } from '@/components/skills/SkillCard/SkillCard';
import {
  SkillGrid,
  SkillPage,
  SkillPageShell,
  SkillPager,
} from '@/components/skills/SkillPagePrimitives';
import type { SkillPageProps } from '@/components/skills/types';

export function AiAutomationSkill({
  isVisible = true,
  variant,
}: SkillPageProps) {
  return (
    <SkillPageShell
      intro="AI is part of how I build every day. I leverage multi-model agentic workflows, supercharged with my own scripts and tools, to help myself and my team to learn, build, and deliver faster."
      variant={variant}
    >
      <SkillPager isVisible={isVisible}>
        <SkillPage label="Page 1" summary="AI & Automation examples page 1">
          <SkillGrid>
            <SkillCard
              eyebrow={{
                base: 'OSS Project',
                md: 'Open-Source Project',
              }}
              title="code-to-notion"
              description="Node CLI that uploads codebases to Notion, retaining filesystem structure and Git data. Built to give my Notion AI agents complete code context alongside docs."
              cardSpan="full"
              href="https://github.com/lpke/code-to-notion"
              showGithubIndicator
              image="/images/skills/notion-ai.png"
              imagePosition="right"
              imageSize={{
                values: {
                  base: '6rem',
                  md: '45%',
                  lg: '40%',
                  1250: '45%',
                },
              }}
              imageObjectPosition="center"
              imageAlt="code-to-notion project screenshot"
              imageFit="cover"
              imageObjectScale={{
                direction: 'down',
                values: {
                  md: 1.1,
                },
              }}
            />
            <SkillCard
              eyebrow="My IDE Setup"
              title="Neovim + Codex ACP & Copilot"
              description="I use a heavily-customised config, written in Lua, that enables cross-provider model/adapter support for efficient in-editor agentic workflows."
              cardSpan="full"
              href="https://github.com/lpke/nvim"
              showGithubIndicator
              image="/images/skills/nvim-codecompanion.png"
              imagePosition="left"
              imageSize={{
                base: '7rem',
                md: '45%',
                lg: '40%',
                1250: '45%',
              }}
              imageObjectPosition={{
                base: '55% top',
                lg: '60% top',
              }}
              imageAlt="Neovim CodeCompanion screenshot"
              imageFit="cover"
              imageObjectScale={{
                base: 2.5,
                md: 2,
                1250: 1.5,
              }}
            />
            <SkillCard
              eyebrow={{
                base: 'OSS Project',
                md: 'Open-Source Project',
              }}
              title="aspyn"
              description="Local pipeline engine that gives your scripts a memory. Stateful step runners, change detection, crash recovery, and scheduling."
              cardSpan="full"
              href="https://github.com/lpke/aspyn-legacy"
              showGithubIndicator
              image="/images/skills/aspyn-cli.png"
              imageAlt="aspyn CLI screenshot"
              imageFit="cover"
              imagePosition="right"
              imageSize={{
                base: '6.5rem',
                md: '45%',
                lg: '40%',
                1250: '45%',
              }}
              imageObjectPosition={{
                base: '18% top',
                md: 'left top',
              }}
              imageObjectScale={{
                base: 3,
                md: 2,
              }}
            />
            <SkillCard
              cardSpan="full"
              chips={[
                'GitHub Copilot',
                'Codex',
                'Claude',
                'Ollama',
                'Neovim',
                'Lua',
                'Bash',
              ]}
            />
          </SkillGrid>
        </SkillPage>
      </SkillPager>
    </SkillPageShell>
  );
}
