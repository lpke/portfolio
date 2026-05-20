import { cx } from '../shared';
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

export function DeveloperToolingSkill({ skill, variant }: SkillPageProps) {
  const internalTools = getCapability(skill, 'Internal Tools');
  const mentoring = getCapability(skill, 'Mentoring & Growth');
  const environment = getCapability(skill, 'Dev Environment');
  const docs = getProofPoint(skill, 'Internal Tool Documentation');
  const montu = getProofPoint(skill, 'Mentoring at Montu');
  const hiring = getProofPoint(skill, 'Technical Hiring');
  const nvim = getProofPoint(skill, 'Neovim Config');
  const reviews = getProofPoint(skill, 'Senior Code Reviews');

  return (
    <SkillPageShell intro={skill.intro} variant={variant}>
      <SkillPager>
        <SkillPage
          label="DX"
          summary="Tools and environment work that remove friction."
        >
          <SkillGrid>
            <CapabilityCard
              capability={internalTools}
              eyebrow="DX"
              type="feature"
              image={<SkillGraphic variant="tooling" />}
              imagePosition="right"
              imageRatio="34%"
              className="lg:col-span-4"
            >
              <ToolMatrix />
            </CapabilityCard>
            <StackSkillCard
              skill={skill}
              title="Tooling Stack"
              className="lg:col-span-2"
            />
            <ProofPointCard
              proofPoint={docs}
              eyebrow="Adoption"
              className="lg:col-span-3"
            />
            <CapabilityCard
              capability={environment}
              eyebrow="Environment"
              className="lg:col-span-3"
            />
          </SkillGrid>
        </SkillPage>

        <SkillPage
          label="Team"
          summary="Mentoring, reviews, hiring, and knowledge sharing."
        >
          <SkillGrid>
            <CapabilityCard
              capability={mentoring}
              eyebrow="People"
              type="feature"
              className="lg:col-span-3"
            />
            <ProofPointCard
              proofPoint={montu}
              eyebrow="Mentoring"
              className="lg:col-span-3"
            />
            <ProofPointCard
              proofPoint={hiring}
              eyebrow="Hiring"
              className="lg:col-span-2"
            />
            <ProofPointCard
              proofPoint={nvim}
              eyebrow="Custom setup"
              className="lg:col-span-2"
            />
            <ProofPointCard
              proofPoint={reviews}
              eyebrow="Review culture"
              className="lg:col-span-2"
            />
          </SkillGrid>
        </SkillPage>
      </SkillPager>
    </SkillPageShell>
  );
}

function ToolMatrix() {
  return (
    <div className="grid grid-cols-4 gap-2">
      <ToolMatrixCell />
      <ToolMatrixCell accent />
      <ToolMatrixCell />
      <ToolMatrixCell />
      <ToolMatrixCell />
      <ToolMatrixCell />
      <ToolMatrixCell accent />
      <ToolMatrixCell />
    </div>
  );
}

function ToolMatrixCell({ accent }: { accent?: boolean }) {
  return (
    <span
      className={cx(
        'h-8 rounded-sm border border-white/10 bg-white/[0.04]',
        accent &&
          'bg-[color:color-mix(in_srgb,var(--skill-accent)_38%,transparent)]',
      )}
    />
  );
}
