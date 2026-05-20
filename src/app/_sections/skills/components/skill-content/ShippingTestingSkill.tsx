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

export function ShippingTestingSkill({ skill, variant }: SkillPageProps) {
  const testing = getCapability(skill, 'Automated Testing');
  const delivery = getCapability(skill, 'CI/CD & Infrastructure');
  const accessibility = getCapability(skill, 'Accessibility');
  const e2e = getProofPoint(skill, 'Shared Tool E2E Suite');
  const pipeline = getProofPoint(skill, 'Custom CI/CD Pipeline');
  const qa = getProofPoint(skill, 'Healthcare App QA');
  const a11y = getProofPoint(skill, 'Accessibility at Montu');
  const experiments = getProofPoint(skill, 'A/B Experimentation');

  return (
    <SkillPageShell intro={skill.intro} variant={variant}>
      <SkillPager>
        <SkillPage
          label="Quality"
          summary="Testing, accessibility, and quality gates before release."
        >
          <SkillGrid>
            <CapabilityCard
              capability={testing}
              eyebrow="Quality gate"
              type="metric"
              className="lg:col-span-2"
            />
            <CapabilityCard
              capability={delivery}
              eyebrow="Delivery"
              type="metric"
              className="lg:col-span-2"
            />
            <CapabilityCard
              capability={accessibility}
              eyebrow="Inclusive UI"
              type="metric"
              className="lg:col-span-2"
            />
            <ProofPointCard
              proofPoint={e2e}
              eyebrow="Coverage"
              type="feature"
              image={<SkillGraphic variant="shipping" />}
              imagePosition="right"
              imageRatio="34%"
              className="lg:col-span-6"
            >
              <QualityGateRow />
            </ProofPointCard>
          </SkillGrid>
        </SkillPage>

        <SkillPage
          label="Release"
          summary="Pipelines, QA tools, experiments, and shipping infrastructure."
        >
          <SkillGrid>
            <ProofPointCard
              proofPoint={pipeline}
              eyebrow="Infrastructure"
              type="feature"
              className="lg:col-span-3"
            />
            <StackSkillCard
              skill={skill}
              title="Shipping Stack"
              className="lg:col-span-3"
            />
            <ProofPointCard
              proofPoint={qa}
              eyebrow="Manual QA"
              className="lg:col-span-2"
            />
            <ProofPointCard
              proofPoint={a11y}
              eyebrow="Accessibility"
              className="lg:col-span-2"
            />
            <ProofPointCard
              proofPoint={experiments}
              eyebrow="Experimentation"
              className="lg:col-span-2"
            />
          </SkillGrid>
        </SkillPage>
      </SkillPager>
    </SkillPageShell>
  );
}

function QualityGateRow() {
  return (
    <div className="grid grid-cols-4 gap-2">
      <QualityGate label="Unit" />
      <QualityGate label="E2E" />
      <QualityGate label="A11y" />
      <QualityGate label="Ship" />
    </div>
  );
}

function QualityGate({ label }: { label: string }) {
  return (
    <span className="font-label rounded-sm bg-[color:color-mix(in_srgb,var(--skill-accent)_13%,rgba(255,255,255,0.04))] px-2 py-2 text-center text-[10px] font-bold tracking-widest text-white/80 uppercase">
      {label}
    </span>
  );
}
