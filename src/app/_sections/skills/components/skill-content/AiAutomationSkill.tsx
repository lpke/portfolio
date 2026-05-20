import {
  CapabilityCard,
  ProofPointCard,
  SkillGraphic,
  SkillGrid,
  SkillPage,
  SkillPageShell,
  SkillPager,
  StackSkillCard,
  getCapability,
  getProofPoint,
} from './primitives';
import type { SkillPageProps } from './types';

export function AiAutomationSkill({ skill, variant }: SkillPageProps) {
  const agentic = getCapability(skill, 'Agentic Development');
  const context = getCapability(skill, 'AI Tooling & Context');
  const pipelines = getCapability(skill, 'CLI & Pipelines');
  const codeToNotion = getProofPoint(skill, 'code-to-notion');
  const aspyn = getProofPoint(skill, 'aspyn');
  const nvim = getProofPoint(skill, 'Neovim + CodeCompanion');
  const production = getProofPoint(skill, 'AI in Production Teams');
  const localLlm = getProofPoint(skill, 'Local LLM Automation');

  return (
    <SkillPageShell intro={skill.intro} variant={variant}>
      <SkillPager>
        <SkillPage
          label="Workflow"
          summary="Daily AI-assisted development patterns and local automation."
        >
          <SkillGrid>
            <StackSkillCard
              skill={skill}
              title="Agent Stack"
              className="lg:col-span-2"
            />
            <CapabilityCard
              capability={agentic}
              eyebrow="Workflow"
              type="feature"
              image={<SkillGraphic variant="automation" />}
              imagePosition="right"
              imageRatio="38%"
              className="lg:col-span-4"
            >
              <AutomationFlow />
            </CapabilityCard>
            <CapabilityCard
              capability={context}
              eyebrow="Context"
              className="lg:col-span-3"
            />
            <CapabilityCard
              capability={pipelines}
              eyebrow="Automation"
              className="lg:col-span-3"
            />
          </SkillGrid>
        </SkillPage>

        <SkillPage
          label="Tools"
          summary="Open-source projects, editor workflows, and production team usage."
        >
          <SkillGrid>
            <ProofPointCard
              proofPoint={codeToNotion}
              eyebrow="Open source"
              className="lg:col-span-2"
            />
            <ProofPointCard
              proofPoint={aspyn}
              eyebrow="Pipeline engine"
              className="lg:col-span-2"
            />
            <ProofPointCard
              proofPoint={nvim}
              eyebrow="Editor system"
              className="lg:col-span-2"
            />
            <ProofPointCard
              proofPoint={production}
              eyebrow="Team usage"
              className="lg:col-span-3"
            />
            <ProofPointCard
              proofPoint={localLlm}
              eyebrow="Local models"
              className="lg:col-span-3"
            />
          </SkillGrid>
        </SkillPage>
      </SkillPager>
    </SkillPageShell>
  );
}

function AutomationFlow() {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2">
      <FlowStep label="Context" />
      <FlowConnector />
      <FlowStep label="Agent" />
      <FlowConnector />
      <FlowStep label="Ship" />
    </div>
  );
}

function FlowStep({ label }: { label: string }) {
  return (
    <span className="font-label rounded-sm border border-[color:color-mix(in_srgb,var(--skill-accent)_22%,transparent)] bg-white/[0.04] px-2 py-2 text-center text-[10px] font-bold tracking-widest text-white/80 uppercase">
      {label}
    </span>
  );
}

function FlowConnector() {
  return (
    <span className="h-px w-4 bg-[color:color-mix(in_srgb,var(--skill-accent)_52%,transparent)]" />
  );
}
