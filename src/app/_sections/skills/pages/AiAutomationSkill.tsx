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
      intro="AI is part of how I build every day — multi-model agentic workflows in the editor, custom context tools for AI agents, and terminal automation from editor to deploy."
      variant={variant}
    >
      <SkillPager isVisible={isVisible}>
        <SkillPage label="Page 1" summary="AI & Automation examples page 1">
          <SkillGrid>
            <SkillCard
              eyebrow="Personal Project"
              title="code-to-notion"
              description="Node CLI that uploads codebases to Notion, retaining filesystem structure and Git data. Built to give my Notion AI agents structured code reasoning ability."
              cardSpan="full"
              href="https://github.com/lpke/code-to-notion"
              showGithubIndicator
              image="/images/skills/notion-ai.png"
              imageObjectPosition="center"
              imageAlt="code-to-notion project screenshot"
              imageFit="cover"
            />
            <SkillCard
              eyebrow="Open source"
              title="aspyn"
              description="Local pipeline engine that gives your scripts a memory. Stateful step runners, change detection, crash recovery, and scheduling."
              cardSpan="full"
              href="https://github.com/lpke/aspyn-legacy"
              showGithubIndicator
              image="/images/skills/aspyn-cli.png"
              imageAlt="aspyn CLI screenshot"
              imageFit="cover"
              imagePosition="left"
              imageSize="46%"
            />
            <SkillCard
              eyebrow="Dev environment"
              title="Neovim + CodeCompanion"
              description="Custom Lua-based AI config with multi-model support, agentic workflows, slash commands, and tool approval flows."
              cardSpan="full"
              href="https://github.com/lpke/nvim"
              showGithubIndicator
              image="/images/skills/nvim-codecompanion.png"
              imageObjectPosition="60% top"
              imageAlt="Neovim CodeCompanion screenshot"
              imageFit="cover"
            />
          </SkillGrid>
        </SkillPage>
        <SkillPage label="Page 2" summary="AI & Automation examples page 2">
          <SkillGrid>
            <SkillCard
              eyebrow="Production"
              title="AI in Production Teams"
              description="Used agentic coding tools daily for feature development, debugging, and iteration across a 100+ engineer codebase."
            />
            <SkillCard
              eyebrow="Local AI"
              title="Local LLM Automation"
              description="Ollama-powered local models for lightweight tasks like web page parsing and text processing."
            />
            <SkillCard
              eyebrow="Stack"
              title="Stack"
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
