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

export function ProductEngineeringSkill({ skill, variant }: SkillPageProps) {
  const userApps = getCapability(skill, 'User-Facing Apps');
  const fullStack = getCapability(skill, 'Full-Stack Delivery');
  const platform = getCapability(skill, 'Platform & CMS Work');
  const portal = getProofPoint(skill, 'Healthcare Patient Portal');
  const menuBoards = getProofPoint(skill, "McDonald's Menu Boards");
  const nutricia = getProofPoint(skill, 'Nutricia / Danone');
  const propertyPortal = getProofPoint(skill, 'Property Listings Portal');
  const milkrun = getProofPoint(skill, 'Milkrun');

  return (
    <SkillPageShell intro={skill.intro} variant={variant}>
      <SkillPager>
        <SkillPage
          label="Build"
          summary="Product surfaces and end-to-end ownership."
        >
          <SkillGrid>
            <CapabilityCard
              capability={userApps}
              eyebrow="Capability"
              type="feature"
              className="lg:col-span-3"
            />
            <ProofPointCard
              proofPoint={portal}
              eyebrow="Production scale"
              type="feature"
              image={<SkillGraphic variant="product" />}
              imagePosition="right"
              imageRatio="36%"
              className="lg:col-span-3"
            >
              <SignalBars />
            </ProofPointCard>
            <CapabilityCard
              capability={fullStack}
              eyebrow="Ownership"
              className="lg:col-span-3"
            />
            <StackSkillCard
              skill={skill}
              title="Product Stack"
              className="lg:col-span-3"
            />
          </SkillGrid>
        </SkillPage>

        <SkillPage
          label="Proof"
          summary="Delivery examples across commerce, retail, and internal tools."
        >
          <SkillGrid>
            <ProofPointCard
              proofPoint={menuBoards}
              eyebrow="Retail rollout"
              className="lg:col-span-2"
            />
            <ProofPointCard
              proofPoint={propertyPortal}
              eyebrow="Full-stack build"
              className="lg:col-span-2"
            />
            <CapabilityCard
              capability={platform}
              eyebrow="Platform"
              className="lg:col-span-2"
            />
            <ProofPointCard
              proofPoint={nutricia}
              eyebrow="Commerce platform"
              className="lg:col-span-3"
            />
            <ProofPointCard
              proofPoint={milkrun}
              eyebrow="Senior frontend"
              className="lg:col-span-3"
            />
          </SkillGrid>
        </SkillPage>
      </SkillPager>
    </SkillPageShell>
  );
}

function SignalBars() {
  return (
    <div className="grid grid-cols-4 gap-2">
      <SignalBar height="42%" />
      <SignalBar height="68%" />
      <SignalBar height="88%" />
      <SignalBar height="56%" />
    </div>
  );
}

function SignalBar({ height }: { height: string }) {
  return (
    <span className="flex h-14 items-end rounded-sm bg-white/[0.04] p-1">
      <span
        className="w-full rounded-[3px] bg-[var(--skill-accent)] opacity-80"
        style={{ height }}
      />
    </span>
  );
}
