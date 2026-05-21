export {
  DESKTOP_SKILLS_LAYOUT,
  SKILL_CARD_CLASS_NAMES,
  SKILL_CARD_IMAGE_BACKGROUND_SIZE,
  SKILL_CARD_IMAGE_DEFAULT_RATIOS,
  SKILL_CARD_PADDING_CLASS_NAMES,
  SKILL_PAGE_SHELL_CONFIG,
  SKILL_PAGER_CONFIG,
  SKILL_PAGER_COPY,
  SKILL_PROOF_POINT_CARD_SPAN_CLASS_NAMES,
  SKILLS_SECTION_COPY,
} from '@/utils/constants';
export type {
  DesktopSkillsLayout,
  SkillCardImageFit,
  SkillCardImagePosition,
  SkillProofPointCardSpan,
  SkillCardType,
  SkillPageShellConfig,
  SkillPagerConfig,
} from '@/utils/constants';

export type SkillId =
  | 'product-engineering'
  | 'ai-automation'
  | 'code-architecture'
  | 'developer-tooling'
  | 'shipping-testing'
  | 'technical-strategy';

export type SkillProfile = {
  id: SkillId;
  title: string;
  subtitle: string;
  iconKey: string;
  accent: string;
  accentSoft: string;
  railTextExtraRem?: number;
};

const SKILL_THEME_TOKENS = {
  product: { accent: '#7bd0ff', accentSoft: 'rgba(123, 208, 255, 0.16)' },
  ai: { accent: '#c7a5ff', accentSoft: 'rgba(199, 165, 255, 0.16)' },
  architecture: { accent: '#3cddc7', accentSoft: 'rgba(60, 221, 199, 0.16)' },
  tooling: { accent: '#9ee493', accentSoft: 'rgba(158, 228, 147, 0.16)' },
  shipping: { accent: '#f7d774', accentSoft: 'rgba(247, 215, 116, 0.16)' },
  strategy: { accent: '#ffb4ab', accentSoft: 'rgba(255, 180, 171, 0.16)' },
} as const;

export const SKILL_PROFILES = [
  {
    id: 'product-engineering',
    title: 'Product Engineering',
    subtitle: 'React, TypeScript, full-stack features, end-to-end ownership.',
    iconKey: 'product',
    ...SKILL_THEME_TOKENS.product,
  },
  {
    id: 'ai-automation',
    title: 'AI & Automation',
    subtitle: 'Agentic coding, AI-assisted workflows, CLI tools, and scripts.',
    iconKey: 'ai',
    ...SKILL_THEME_TOKENS.ai,
  },
  {
    id: 'code-architecture',
    title: 'Code Architecture',
    subtitle:
      'Design systems, component libraries, monorepos, and build pipelines.',
    iconKey: 'architecture',
    ...SKILL_THEME_TOKENS.architecture,
  },
  {
    id: 'developer-tooling',
    title: 'Developer Tooling',
    subtitle:
      'Internal tools, DX improvements, mentoring, and knowledge sharing.',
    iconKey: 'tooling',
    ...SKILL_THEME_TOKENS.tooling,
  },
  {
    id: 'shipping-testing',
    title: 'Shipping & Testing',
    subtitle:
      'CI/CD, automated testing, accessibility, and cloud infrastructure.',
    iconKey: 'shipping',
    ...SKILL_THEME_TOKENS.shipping,
  },
  {
    id: 'technical-strategy',
    title: 'Technical Strategy',
    subtitle:
      'Trade-offs, stakeholder communication, and business-minded decisions.',
    railTextExtraRem: 0.3,
    iconKey: 'strategy',
    ...SKILL_THEME_TOKENS.strategy,
  },
] as const satisfies readonly SkillProfile[];
