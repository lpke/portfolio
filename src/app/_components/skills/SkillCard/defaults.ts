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

export const SKILL_CARD_DEFAULT_PROP_CONFIG = {
  ariaLabel: { values: { base: undefined } },
  cardHeight: { values: { base: undefined } },
  cardMaxHeight: { values: { base: undefined } },
  cardMinHeight: { values: { base: undefined } },
  cardSpan: { values: { base: 'half' } },
  children: { values: { base: undefined } },
  chips: { values: { base: undefined } },
  className: { values: { base: undefined } },
  contentClassName: { values: { base: undefined } },
  description: { values: { base: undefined } },
  eyebrow: { values: { base: undefined } },
  href: { values: { base: undefined } },
  icon: { values: { base: undefined } },
  modal: { values: { base: undefined } },
  image: { values: { base: undefined } },
  imageAlt: { values: { base: '' } },
  imageBlurBackground: { values: { base: true } },
  imageColor: { values: { base: undefined } },
  imageClassName: { values: { base: undefined } },
  imageFit: { values: { base: 'cover' } },
  imageMaxSize: { values: { base: undefined } },
  imageMinSize: { values: { base: undefined } },
  imageObjectPosition: { values: { base: 'center top' } },
  imageObjectScale: { values: { base: 1 } },
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
  indicatorIcons: { values: { base: undefined } },
  showExternalLinkIndicator: { values: { base: undefined } },
  showGithubIndicator: { values: { base: false } },
  title: { values: { base: undefined } },
  titleSize: { values: { base: 'md' } },
  type: { values: { base: undefined } },
} as const satisfies SkillCardDefaultConfigMap;

export const SKILL_CARD_PROP_KEYS = Object.keys(
  SKILL_CARD_DEFAULT_PROP_CONFIG,
) as readonly (keyof SkillCardBaseProps)[];

type SkillCardDefaultBaseProps = {
  [Key in keyof typeof SKILL_CARD_DEFAULT_PROP_CONFIG]: (typeof SKILL_CARD_DEFAULT_PROP_CONFIG)[Key]['values']['base'];
};

export type SkillCardResolvedBaseProps = {
  [Key in keyof SkillCardBaseProps]-?: undefined extends SkillCardDefaultBaseProps[Key]
    ? SkillCardBaseProps[Key]
    : Exclude<SkillCardBaseProps[Key], undefined>;
};

export const SKILL_CARD_DEFAULT_BASE_PROPS = Object.fromEntries(
  SKILL_CARD_PROP_KEYS.map((propKey) => [
    propKey,
    SKILL_CARD_DEFAULT_PROP_CONFIG[propKey].values.base,
  ]),
) as SkillCardDefaultBaseProps;
