import {
  CapabilityCard,
  ProofPointCard,
  SkillGrid,
  SkillPageShell,
  StackSkillCard,
  getCapability,
  getProofPoint,
} from './primitives';
import type { SkillPageProps } from './types';

export function TechnicalStrategySkill({ skill, variant }: SkillPageProps) {
  const decisions = getCapability(skill, 'Technical Decision-Making');
  const stakeholders = getCapability(skill, 'Stakeholder Communication');
  const business = getCapability(skill, 'Business Context');
  const migration = getProofPoint(skill, 'Code Migration Proposal');
  const demo = getProofPoint(skill, 'Company-Wide Product Demo');
  const danone = getProofPoint(skill, 'Danone Client Communication');
  const nonTechnical = getProofPoint(skill, 'Non-Technical Stakeholders');
  const commerce = getProofPoint(skill, 'Commerce to Code');

  return (
    <SkillPageShell intro={skill.intro} variant={variant}>
      <SkillGrid>
        <CapabilityCard
          capability={decisions}
          eyebrow="Trade-offs"
          type="feature"
          className="lg:col-span-4"
        >
          <DecisionScale />
        </CapabilityCard>
        <StackSkillCard
          skill={skill}
          title="Strategy Toolkit"
          className="lg:col-span-2"
        />
        <ProofPointCard
          proofPoint={migration}
          eyebrow="Business case"
          type="feature"
          className="lg:col-span-3"
        />
        <ProofPointCard
          proofPoint={demo}
          eyebrow="Communication"
          type="feature"
          className="lg:col-span-3"
        />
        <CapabilityCard
          capability={stakeholders}
          eyebrow="Stakeholders"
          className="lg:col-span-3"
        />
        <CapabilityCard
          capability={business}
          eyebrow="Context"
          className="lg:col-span-3"
        />
        <ProofPointCard
          proofPoint={danone}
          eyebrow="Client delivery"
          className="lg:col-span-2"
        />
        <ProofPointCard
          proofPoint={nonTechnical}
          eyebrow="Translation"
          className="lg:col-span-2"
        />
        <ProofPointCard
          proofPoint={commerce}
          eyebrow="Background"
          className="lg:col-span-2"
        />
      </SkillGrid>
    </SkillPageShell>
  );
}

function DecisionScale() {
  return (
    <div className="relative h-2 rounded-full bg-white/[0.08]">
      <span className="bg-surface-container-high absolute top-1/2 left-[18%] h-4 w-4 -translate-y-1/2 rounded-full border border-white/20" />
      <span className="absolute top-1/2 left-[58%] h-4 w-4 -translate-y-1/2 rounded-full border border-[var(--skill-accent)] bg-[var(--skill-accent)] shadow-[0_0_18px_var(--skill-accent-soft)]" />
      <span className="bg-surface-container-high absolute top-1/2 right-[12%] h-4 w-4 -translate-y-1/2 rounded-full border border-white/20" />
    </div>
  );
}
