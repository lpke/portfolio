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

export function CodeArchitectureSkill({ skill, variant }: SkillPageProps) {
  const systems = getCapability(skill, 'Design Systems & Components');
  const monorepo = getCapability(skill, 'Monorepo Structure');
  const builds = getCapability(skill, 'Build & Bundle Optimisation');
  const library = getProofPoint(skill, 'Shared Component Library');
  const vite = getProofPoint(skill, 'Custom Multi-Site Build');
  const nx = getProofPoint(skill, '100+ Engineer Monorepo');
  const rollout = getProofPoint(skill, 'Design System Rollout');
  const pwa = getProofPoint(skill, 'Headless PWA (Nutricia)');

  return (
    <SkillPageShell intro={skill.intro} variant={variant}>
      <SkillPager>
        <SkillPage
          label="Systems"
          summary="Reusable UI, package boundaries, and architecture primitives."
        >
          <SkillGrid>
            <CapabilityCard
              capability={systems}
              eyebrow="System layer"
              type="feature"
              image={<SkillGraphic variant="architecture" />}
              imagePosition="right"
              imageRatio="34%"
              className="lg:col-span-3"
            >
              <SystemBlocks />
            </CapabilityCard>
            <ProofPointCard
              proofPoint={library}
              eyebrow="Shared package"
              type="feature"
              className="lg:col-span-3"
            />
            <CapabilityCard
              capability={monorepo}
              eyebrow="Boundaries"
              className="lg:col-span-3"
            />
            <StackSkillCard
              skill={skill}
              title="Architecture Stack"
              className="lg:col-span-3"
            />
          </SkillGrid>
        </SkillPage>

        <SkillPage
          label="Scale"
          summary="Build pipelines, rollout work, and large workspace delivery."
        >
          <SkillGrid>
            <ProofPointCard
              proofPoint={vite}
              eyebrow="Build result"
              type="metric"
              className="lg:col-span-2"
            />
            <ProofPointCard
              proofPoint={nx}
              eyebrow="Monorepo"
              className="lg:col-span-2"
            />
            <CapabilityCard
              capability={builds}
              eyebrow="Builds"
              className="lg:col-span-2"
            />
            <ProofPointCard
              proofPoint={rollout}
              eyebrow="Adoption"
              className="lg:col-span-2"
            />
            <ProofPointCard
              proofPoint={pwa}
              eyebrow="Commerce architecture"
              className="lg:col-span-4"
            />
          </SkillGrid>
        </SkillPage>
      </SkillPager>
    </SkillPageShell>
  );
}

function SystemBlocks() {
  return (
    <div className="grid grid-cols-3 gap-2">
      <SystemBlock label="UI" />
      <SystemBlock label="Pkg" accent />
      <SystemBlock label="CI" />
    </div>
  );
}

function SystemBlock({ label, accent }: { label: string; accent?: boolean }) {
  return (
    <span
      className={cx(
        'font-label rounded-sm border border-white/10 bg-white/[0.04] px-2 py-3 text-center text-[10px] font-bold tracking-widest uppercase',
        accent && 'text-[var(--skill-accent)]',
      )}
    >
      {label}
    </span>
  );
}
