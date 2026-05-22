import type {
  SkillCardBaseProps,
  SkillCardDefaultConfigMap,
  SkillCardTitleSize,
} from './types';

export const SKILL_CARD_TITLE_SIZE_CLASS_NAMES = {
  sm: 'text-sm leading-snug lg:text-base',
  md: 'text-lg leading-tight lg:text-xl',
  lg: 'text-xl leading-tight lg:text-2xl',
} as const satisfies Record<SkillCardTitleSize, string>;

export const SKILL_CARD_PROP_KEYS = [
  'ariaLabel',
  'cardSpan',
  'children',
  'chips',
  'className',
  'contentClassName',
  'description',
  'eyebrow',
  'href',
  'icon',
  'image',
  'imageAlt',
  'imageBlurBackground',
  'imageClassName',
  'imageFit',
  'imageMaxSize',
  'imageMinSize',
  'imageObjectPosition',
  'imageObjectScale',
  'imagePosition',
  'imageSize',
  'indicatorIcons',
  'showExternalLinkIndicator',
  'showGithubIndicator',
  'title',
  'titleSize',
  'type',
] as const satisfies readonly (keyof SkillCardBaseProps)[];

export const SKILL_CARD_STATIC_DEFAULT_PROPS = {
  cardSpan: 'half',
  imageAlt: '',
  imageBlurBackground: true,
  imageFit: 'cover',
  imageObjectPosition: 'center top',
  imageObjectScale: 1,
  showGithubIndicator: false,
  titleSize: 'md',
} as const satisfies Partial<SkillCardBaseProps>;

export const SKILL_CARD_RESPONSIVE_DEFAULT_PROPS = {
  imagePosition: {
    direction: 'up',
    values: {
      base: 'top',
      md: 'right',
      lg: 'top',
      1250: 'right',
    },
  },
  imageSize: {
    direction: 'up',
    values: {
      base: '7rem',
      md: '50%',
      lg: '10rem',
      1250: '40%',
    },
  },
} as const satisfies SkillCardDefaultConfigMap;

export const SKILL_CARD_DEFAULT_PROP_CONFIG = {
  ariaLabel: { values: { base: undefined } },
  cardSpan: { values: { base: SKILL_CARD_STATIC_DEFAULT_PROPS.cardSpan } },
  children: { values: { base: undefined } },
  chips: { values: { base: undefined } },
  className: { values: { base: undefined } },
  contentClassName: { values: { base: undefined } },
  description: { values: { base: undefined } },
  eyebrow: { values: { base: undefined } },
  href: { values: { base: undefined } },
  icon: { values: { base: undefined } },
  image: { values: { base: undefined } },
  imageAlt: { values: { base: SKILL_CARD_STATIC_DEFAULT_PROPS.imageAlt } },
  imageBlurBackground: {
    values: { base: SKILL_CARD_STATIC_DEFAULT_PROPS.imageBlurBackground },
  },
  imageClassName: { values: { base: undefined } },
  imageFit: { values: { base: SKILL_CARD_STATIC_DEFAULT_PROPS.imageFit } },
  imageMaxSize: { values: { base: undefined } },
  imageMinSize: { values: { base: undefined } },
  imageObjectPosition: {
    values: { base: SKILL_CARD_STATIC_DEFAULT_PROPS.imageObjectPosition },
  },
  imageObjectScale: {
    values: { base: SKILL_CARD_STATIC_DEFAULT_PROPS.imageObjectScale },
  },
  imagePosition: SKILL_CARD_RESPONSIVE_DEFAULT_PROPS.imagePosition,
  imageSize: SKILL_CARD_RESPONSIVE_DEFAULT_PROPS.imageSize,
  indicatorIcons: { values: { base: undefined } },
  showExternalLinkIndicator: { values: { base: undefined } },
  showGithubIndicator: {
    values: { base: SKILL_CARD_STATIC_DEFAULT_PROPS.showGithubIndicator },
  },
  title: { values: { base: undefined } },
  titleSize: { values: { base: SKILL_CARD_STATIC_DEFAULT_PROPS.titleSize } },
  type: { values: { base: undefined } },
} as const satisfies SkillCardDefaultConfigMap;
