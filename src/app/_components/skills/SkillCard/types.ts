import type { CSSProperties, ReactNode } from 'react';
import type { ModalContentProps } from '@/components/Modal';
import type {
  SkillCardImageFit,
  SkillCardImagePosition,
  SkillCardNamedSpan,
  SkillCardNumericSpan,
  SkillCardSpan,
  SkillCardType,
} from '@/utils/constants';

export type {
  SkillCardImageFit,
  SkillCardImagePosition,
  SkillCardNamedSpan,
  SkillCardNumericSpan,
  SkillCardSpan,
  SkillCardType,
};

export type SkillCardIndicatorIcons = ReactNode | readonly ReactNode[];
export type SkillCardModal = ReactNode | ModalContentProps;
export type SkillCardTitleSize = 'sm' | 'md' | 'lg';
export type SkillCardTailwindBreakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type SkillCardCustomBreakpoint =
  | number
  | `${number}`
  | `${number}px`
  | `${number}rem`
  | `${number}em`;

export type SkillCardTailwindResponsiveValues<T> = {
  /** Tailwind `sm` breakpoint: 640px / 40rem. */
  sm?: T;
  /** Tailwind `md` breakpoint: 768px / 48rem. */
  md?: T;
  /** Tailwind `lg` breakpoint: 1024px / 64rem. */
  lg?: T;
  /** Tailwind `xl` breakpoint: 1280px / 80rem. */
  xl?: T;
  /** Tailwind `2xl` breakpoint: 1536px / 96rem. */
  '2xl'?: T;
};

export type SkillCardResponsiveValues<T> = {
  /** Base value used when no responsive breakpoint matches. Alias: `default`. */
  base?: T;
  /** Alias for `base`. */
  default?: T;
} & SkillCardTailwindResponsiveValues<T> &
  Partial<Record<SkillCardCustomBreakpoint, T>>;

export type SkillCardResponsiveDirection = 'up' | 'down';
export type SkillCardResponsiveMergeMode = 'replace' | 'merge' | 'overlay';

export type SkillCardResponsiveConfig<T> = {
  values: SkillCardResponsiveValues<T>;
  /** `up` means breakpoint and wider. `down` means breakpoint and narrower. Default: `up`. */
  direction?: SkillCardResponsiveDirection;
  /**
   * `replace`: ignore built-in defaults.
   * `merge`: merge matching breakpoint keys into defaults before resolving.
   * `overlay`: resolve defaults, then let matching provided ranges override them.
   * Default: `overlay`.
   */
  merge?: SkillCardResponsiveMergeMode;
};

export type SkillCardResponsiveProp<T> =
  | T
  | SkillCardResponsiveValues<T>
  | SkillCardResponsiveConfig<T>;

export type SkillCardBaseProps = {
  /** Main card heading. */
  title?: ReactNode;
  /**
   * Responsive title scale.
   * Options: `sm`, `md`, `lg`.
   * Example: `lg` for a featured project card.
   * Default: `md`.
   */
  titleSize?: SkillCardTitleSize;
  /** Small uppercase label rendered above the title. */
  eyebrow?: ReactNode;
  /** Supporting body copy rendered below the title. */
  description?: ReactNode;
  /** Short tags rendered in the shared skill chip style. */
  chips?: readonly string[];
  /** Optional leading icon shown beside the eyebrow. */
  icon?: ReactNode;
  /** Custom trailing indicators shown in the card header. Example: `<CodeIcon />`. */
  indicatorIcons?: SkillCardIndicatorIcons;
  /** Whether to show the external-link indicator. Default: true when `href` is set. */
  showExternalLinkIndicator?: boolean;
  /** Whether to show the GitHub indicator. */
  showGithubIndicator?: boolean;
  /** External URL. Example: `https://github.com/user/repo`. When present, the card renders as a link. */
  href?: string;
  /** Optional modal content or modal config opened by clicking the card. Overrides `href` when both are provided. */
  modal?: SkillCardModal;
  /**
   * Visual treatment for card padding, background, borders, and description scale.
   * Options: `default`, `feature`, `chips`, `compact`, `metric`, `quiet`.
   * Example: `feature`.
   */
  type?: SkillCardType;
  /**
   * Grid span used by the skills page layout.
   * Options: `1`, `2`, `3`, `4`, `5`, `6`, `half`, `full`.
   * `half` is an alias for `3`; `full` is an alias for `6`.
   * Default: `half`.
   */
  cardSpan?: SkillCardSpan;
  /** Direct CSS height for the root card. Example: `18rem` or `320`. */
  cardHeight?: CSSProperties['height'];
  /** Direct CSS min-height for the root card. Example: `14rem`. */
  cardMinHeight?: CSSProperties['minHeight'];
  /** Direct CSS max-height for the root card. Example: `28rem`. */
  cardMaxHeight?: CSSProperties['maxHeight'];
  /** Optional image content or image URL. */
  image?: ReactNode | string;
  /** Accessible label for string image URLs. Use an empty string for decorative images. */
  imageAlt?: string;
  /**
   * Image placement relative to the card content.
   * Options: `top`, `right`, `bottom`, `left`.
   * Example: `left`.
   * Default: `top` on base/lg and `right` on md/1250px.
   */
  imagePosition?: SkillCardImagePosition;
  /** CSS size for the image area. Example: `9rem` for top/bottom height or `42%` for left/right width. */
  imageSize?: string;
  /** CSS minimum size for left/right image widths. Example: `12rem`. */
  imageMinSize?: string;
  /** CSS maximum size for left/right image widths. Example: `22rem`. */
  imageMaxSize?: string;
  /**
   * Object-fit style for string image URLs.
   * Options: `contain`, `cover`, `none`, `scale-down`, `stretch`.
   * Default: `cover`.
   */
  imageFit?: SkillCardImageFit;
  /** CSS background-position for string image URLs. Example: `center top` or `65% 50%`. Useful with `imageFit="cover"`. */
  imageObjectPosition?: string;
  /** Visual scale for string image URLs. Example: `1.08` zooms the image in by 8%. Default: `1`. */
  imageObjectScale?: number | string;
  /** Whether to fill contain/none/scale-down letterboxing with a blurred cover copy of the image. Default: `true`. */
  imageBlurBackground?: boolean;
  /** Optional background color for the image area. Used behind loading, failed, or non-cover images. */
  imageColor?: CSSProperties['backgroundColor'];
  /** Extra class names for the image wrapper. Example: `bg-black/20`. */
  imageClassName?: string;
  /** Extra class names for the root card element. Example: `lg:col-span-2`. */
  className?: string;
  /** Extra class names for the content wrapper. Example: `self-center`. */
  contentClassName?: string;
  /** Accessible label for the root article or link. */
  ariaLabel?: string;
  /** Additional content rendered below title, description, and chips. */
  children?: ReactNode;
};

export type SkillCardResponsiveProps = {
  [Key in keyof SkillCardBaseProps]: SkillCardResponsiveProp<
    SkillCardBaseProps[Key]
  >;
};

export type SkillCardProps = SkillCardResponsiveProps;

export type SkillCardDefaultConfig<T> = {
  values: SkillCardResponsiveValues<T>;
  direction?: SkillCardResponsiveDirection;
};

export type SkillCardDefaultConfigMap = {
  [Key in keyof SkillCardBaseProps]: SkillCardDefaultConfig<
    SkillCardBaseProps[Key]
  >;
};
