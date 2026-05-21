import {
  SKILL_PROFILES,
  type SkillId,
  type SkillProfile,
} from '@/utils/constants';
import type { SkillPageComponent } from '@/components/skills/types';
import { AiAutomationSkill } from './AiAutomationSkill';
import { CodeArchitectureSkill } from './CodeArchitectureSkill';
import { DeveloperToolingSkill } from './DeveloperToolingSkill';
import { ProductEngineeringSkill } from './ProductEngineeringSkill';
import { ShippingTestingSkill } from './ShippingTestingSkill';
import { TechnicalStrategySkill } from './TechnicalStrategySkill';

const SKILL_PAGE_COMPONENTS = {
  'product-engineering': ProductEngineeringSkill,
  'ai-automation': AiAutomationSkill,
  'code-architecture': CodeArchitectureSkill,
  'developer-tooling': DeveloperToolingSkill,
  'shipping-testing': ShippingTestingSkill,
  'technical-strategy': TechnicalStrategySkill,
} as const satisfies Record<SkillId, SkillPageComponent>;

export type SkillPageDefinition = SkillProfile & {
  Page: SkillPageComponent;
};

export const SKILL_PAGES = SKILL_PROFILES.map((profile) => ({
  ...profile,
  Page: SKILL_PAGE_COMPONENTS[profile.id],
})) satisfies readonly SkillPageDefinition[];
