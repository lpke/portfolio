'use client';

import {
  isValidElement,
  useCallback,
  useMemo,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
} from 'react';
import {
  SKILL_CARD_CLASS_NAMES,
  SKILL_CARD_IMAGE_BACKGROUND_SIZE,
  SKILL_CARD_IMAGE_DEFAULT_SIZES,
  SKILL_CARD_PADDING_CLASS_NAMES,
  SKILL_CARD_SPAN_CLASS_NAMES,
  type SkillCardImageFit,
  type SkillCardImagePosition,
  type SkillCardSpan,
  type SkillCardType,
} from '@/utils/constants';
import { SurfaceOverlay } from '@/components/SurfaceOverlay';
import { SkillChips, cx } from './shared';

export type {
  SkillCardImageFit,
  SkillCardImagePosition,
  SkillCardSpan,
  SkillCardType,
};

type SkillCardStyle = CSSProperties & {
  '--skill-card-image-size'?: string;
  '--skill-card-image-min-size'?: string;
  '--skill-card-image-max-size'?: string;
};

type SkillCardIndicatorIcons = ReactNode | readonly ReactNode[];
type SkillCardTitleSize = 'sm' | 'md' | 'lg';
type SkillCardTailwindBreakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type SkillCardCustomBreakpoint =
  | number
  | `${number}`
  | `${number}px`
  | `${number}rem`
  | `${number}em`;
type SkillCardResponsiveValues<T> = {
  /** Applies below the first matching breakpoint. */
  base?: T;
  /** Alias for `base`. */
  default?: T;
} & Partial<Record<SkillCardTailwindBreakpoint, T>> &
  Partial<Record<SkillCardCustomBreakpoint, T>>;
type SkillCardResponsiveProp<T> = T | SkillCardResponsiveValues<T>;

type SkillCardBreakpointConfig = {
  key: string;
  query: string;
  order: number;
};

const SKILL_CARD_TITLE_SIZE_CLASS_NAMES = {
  sm: 'text-sm leading-snug lg:text-base',
  md: 'text-lg leading-tight lg:text-xl',
  lg: 'text-xl leading-tight lg:text-2xl',
} as const satisfies Record<SkillCardTitleSize, string>;

const SKILL_CARD_TAILWIND_BREAKPOINTS = {
  sm: { key: 'sm', query: '(min-width: 40rem)', order: 640 },
  md: { key: 'md', query: '(min-width: 48rem)', order: 768 },
  lg: { key: 'lg', query: '(min-width: 64rem)', order: 1024 },
  xl: { key: 'xl', query: '(min-width: 80rem)', order: 1280 },
  '2xl': { key: '2xl', query: '(min-width: 96rem)', order: 1536 },
} as const satisfies Record<
  SkillCardTailwindBreakpoint,
  SkillCardBreakpointConfig
>;

const SKILL_CARD_BASE_BREAKPOINT_KEYS = new Set(['base', 'default']);
const SKILL_CARD_CUSTOM_BREAKPOINT_PATTERN = /^(\d+(?:\.\d+)?)(px|rem|em)?$/;

type SkillCardMediaQuerySubscription = {
  mediaQueryList: MediaQueryList;
  listener: () => void;
  subscribers: Set<() => void>;
};

const skillCardMediaQuerySubscriptions = new Map<
  string,
  SkillCardMediaQuerySubscription
>();

type SkillCardBaseProps = {
  /** Main card heading. */
  title?: ReactNode;
  /** Responsive title scale. Example: `lg` for a featured project card. Defaults to `md`. */
  titleSize?: SkillCardTitleSize;
  /** Small uppercase label rendered above the title. Defaults to `Proof point`. */
  eyebrow?: ReactNode;
  /** Supporting body copy rendered below the title. */
  description?: ReactNode;
  /** Short tags rendered in the shared skill chip style. */
  chips?: readonly string[];
  /** Optional leading icon shown beside the eyebrow. */
  icon?: ReactNode;
  /** Custom trailing indicators shown in the card header. Example: `<CodeIcon />`. */
  indicatorIcons?: SkillCardIndicatorIcons;
  /** Whether to show the external-link indicator. Defaults to true when `href` is set. */
  showExternalLinkIndicator?: boolean;
  /** Whether to show the GitHub indicator. */
  showGithubIndicator?: boolean;
  /** External URL. Example: `https://github.com/user/repo`. When present, the card renders as a link. */
  href?: string;
  /** Visual treatment for card padding, background, borders, and description scale. Example: `feature`. */
  type?: SkillCardType;
  /** Grid span used by the skills page layout. Defaults to `half`. */
  cardSpan?: SkillCardSpan;
  /** Optional image content or image URL. */
  image?: ReactNode | string;
  /** Accessible label for string image URLs. Use an empty string for decorative images. */
  imageAlt?: string;
  /** Image placement relative to the card content. Example: `left`. Defaults to `top`. */
  imagePosition?: SkillCardImagePosition;
  /** CSS size for the image area. Example: `9rem` for top/bottom height or `42%` for left/right width. */
  imageSize?: string;
  /** CSS minimum size for left/right image widths. Example: `12rem`. */
  imageMinSize?: string;
  /** CSS maximum size for left/right image widths. Example: `22rem`. */
  imageMaxSize?: string;
  /** Object-fit style for string image URLs. Example: `cover`. Defaults to `contain`. */
  imageFit?: SkillCardImageFit;
  /** CSS background-position for string image URLs. Example: `center top` or `65% 50%`. Useful with `imageFit="cover"`. */
  imageObjectPosition?: string;
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

type SkillCardProps = {
  [Key in keyof SkillCardBaseProps]: SkillCardResponsiveProp<
    SkillCardBaseProps[Key]
  >;
};

const SKILL_CARD_PROP_KEYS = [
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
  'imageClassName',
  'imageFit',
  'imageMaxSize',
  'imageMinSize',
  'imageObjectPosition',
  'imagePosition',
  'imageSize',
  'indicatorIcons',
  'showExternalLinkIndicator',
  'showGithubIndicator',
  'title',
  'titleSize',
  'type',
] as const satisfies readonly (keyof SkillCardBaseProps)[];

export function SkillCard(props: SkillCardProps) {
  const resolvedProps = useResolvedSkillCardProps(props);

  return <SkillCardRoot {...resolvedProps} />;
}

function SkillCardRoot({
  title,
  titleSize = 'md',
  eyebrow = 'Proof point',
  description,
  chips,
  icon,
  indicatorIcons,
  showExternalLinkIndicator,
  showGithubIndicator = false,
  href,
  type,
  cardSpan = 'half',
  image,
  imageAlt = '',
  imagePosition = 'top',
  imageSize,
  imageMinSize,
  imageMaxSize,
  imageFit = 'contain',
  imageObjectPosition = 'center',
  imageClassName,
  className,
  contentClassName,
  ariaLabel,
  children,
}: SkillCardBaseProps) {
  const isLinked = Boolean(href);
  const hasImage = Boolean(image);
  const resolvedType = type ?? (hasImage ? 'feature' : 'default');
  const resolvedIndicatorIcons = getSkillCardIndicators({
    indicatorIcons,
    showExternalLinkIndicator: showExternalLinkIndicator ?? isLinked,
    showGithubIndicator,
  });
  const hasCustomImageSize = imageSize !== undefined;
  const resolvedImageSize =
    imageSize ?? SKILL_CARD_IMAGE_DEFAULT_SIZES[imagePosition];
  const isInlineImage = imagePosition === 'left' || imagePosition === 'right';
  const style: SkillCardStyle = {
    '--skill-card-image-size': resolvedImageSize,
    ...(isInlineImage
      ? {
          '--skill-card-image-min-size': imageMinSize ?? '0%',
          '--skill-card-image-max-size': imageMaxSize ?? '100%',
        }
      : {}),
  };
  const cardPaddingClassName = SKILL_CARD_PADDING_CLASS_NAMES[resolvedType];
  const cardClassName = cx(
    'group/skill-card relative isolate min-w-0 overflow-hidden rounded-[8px] border transition-[background-color,filter] duration-200',
    SKILL_CARD_SPAN_CLASS_NAMES[cardSpan],
    SKILL_CARD_CLASS_NAMES[resolvedType],
    !hasImage && cardPaddingClassName,
    isLinked && 'block cursor-pointer hover:brightness-105',
    className,
  );

  const body = (
    <div
      className={cx(
        'relative z-10 min-w-0',
        hasImage && getImageLayoutClassName(imagePosition),
        hasImage && getImageGapClassName(imagePosition),
      )}
    >
      {hasImage && shouldRenderImageBeforeContent(imagePosition) && (
        <SkillCardImage
          image={image}
          imageAlt={imageAlt}
          imageFit={imageFit}
          imageObjectPosition={imageObjectPosition}
          imagePlacement={imagePosition}
          isInlineImage={isInlineImage}
          hasCustomImageSize={hasCustomImageSize}
          className={imageClassName}
        />
      )}
      <SkillCardContent
        title={title}
        titleSize={titleSize}
        eyebrow={eyebrow}
        description={description}
        chips={chips}
        icon={icon}
        indicatorIcons={resolvedIndicatorIcons}
        isLinked={isLinked}
        type={resolvedType}
        hasImage={hasImage}
        imagePosition={imagePosition}
        cardPaddingClassName={cardPaddingClassName}
        className={contentClassName}
      >
        {children}
      </SkillCardContent>
      {hasImage && !shouldRenderImageBeforeContent(imagePosition) && (
        <SkillCardImage
          image={image}
          imageAlt={imageAlt}
          imageFit={imageFit}
          imageObjectPosition={imageObjectPosition}
          imagePlacement={imagePosition}
          isInlineImage={isInlineImage}
          hasCustomImageSize={hasCustomImageSize}
          className={imageClassName}
        />
      )}
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={ariaLabel}
        className={cardClassName}
        style={style}
      >
        <SurfaceOverlay className="bg-[color:color-mix(in_srgb,var(--skill-accent)_7%,rgba(255,255,255,0.045))] opacity-0 transition-opacity duration-200 group-hover/skill-card:opacity-100" />
        {body}
      </a>
    );
  }

  return (
    <article aria-label={ariaLabel} className={cardClassName} style={style}>
      {body}
    </article>
  );
}

type SkillCardContentProps = {
  title?: ReactNode;
  titleSize: SkillCardTitleSize;
  eyebrow?: ReactNode;
  description?: ReactNode;
  chips?: readonly string[];
  icon?: ReactNode;
  indicatorIcons: ReactNode[];
  isLinked: boolean;
  type: SkillCardType;
  hasImage: boolean;
  imagePosition: SkillCardImagePosition;
  cardPaddingClassName: string;
  className?: string;
  children?: ReactNode;
};

export function SkillCardContent({
  title,
  titleSize,
  eyebrow,
  description,
  chips,
  icon,
  indicatorIcons,
  isLinked,
  type,
  hasImage,
  imagePosition,
  cardPaddingClassName,
  className,
  children,
}: SkillCardContentProps) {
  return (
    <div
      className={cx(
        'relative min-w-0',
        hasImage && cardPaddingClassName,
        hasImage && imagePosition === 'top' && 'pt-3 lg:pt-4',
        hasImage &&
          (imagePosition === 'left' || imagePosition === 'right') &&
          'lg:flex-1',
        className,
      )}
    >
      {(eyebrow || icon || indicatorIcons.length > 0) && (
        <div className="mb-3 flex min-w-0 items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            {icon && <span className="text-[var(--skill-accent)]">{icon}</span>}
            {eyebrow && (
              <span className="font-label min-w-0 truncate text-[11px] font-bold tracking-widest text-[color:color-mix(in_srgb,var(--skill-accent)_44%,white)] uppercase">
                {eyebrow}
              </span>
            )}
          </div>

          {indicatorIcons.length > 0 && (
            <span className="text-on-surface-variant/75 flex shrink-0 items-center gap-1.5">
              {indicatorIcons.map((indicatorIcon, index) => (
                <span
                  key={index}
                  className="grid h-4 w-4 place-items-center"
                  aria-hidden="true"
                >
                  {indicatorIcon}
                </span>
              ))}
            </span>
          )}
        </div>
      )}

      {title && (
        <h4
          className={cx(
            'font-headline min-w-0 font-bold text-white transition-colors duration-200',
            isLinked && 'group-hover/skill-card:text-[var(--skill-accent)]',
            SKILL_CARD_TITLE_SIZE_CLASS_NAMES[titleSize],
          )}
        >
          {title}
        </h4>
      )}

      {description && (
        <p
          className={cx(
            'text-on-surface-variant leading-relaxed',
            title ? 'mt-2' : '',
            type === 'feature'
              ? 'text-sm lg:text-[15px]'
              : 'text-xs lg:text-sm',
          )}
        >
          {description}
        </p>
      )}

      {chips && (
        <SkillChips
          items={chips}
          className={cx(title || description ? 'mt-4' : '')}
        />
      )}

      {children && (
        <div className={cx(title || description || chips ? 'mt-4' : '')}>
          {children}
        </div>
      )}
    </div>
  );
}

function useResolvedSkillCardProps(props: SkillCardProps): SkillCardBaseProps {
  const breakpointSignature = getSkillCardResponsiveBreakpointSignature(props);
  const viewportSignature = useSyncExternalStore(
    useCallback(
      (onStoreChange) =>
        subscribeSkillCardBreakpoints(breakpointSignature, onStoreChange),
      [breakpointSignature],
    ),
    useCallback(
      () => getSkillCardBreakpointSnapshot(breakpointSignature),
      [breakpointSignature],
    ),
    getSkillCardServerSnapshot,
  );
  const activeBreakpointKeys = useMemo(
    () => getSkillCardActiveBreakpointKeys(viewportSignature),
    [viewportSignature],
  );

  return resolveSkillCardProps(props, activeBreakpointKeys);
}

function resolveSkillCardProps(
  props: SkillCardProps,
  activeBreakpointKeys: ReadonlySet<string>,
) {
  const resolvedProps: Partial<Record<keyof SkillCardBaseProps, unknown>> = {};

  SKILL_CARD_PROP_KEYS.forEach((propKey) => {
    resolvedProps[propKey] = resolveSkillCardResponsiveProp(
      props[propKey],
      activeBreakpointKeys,
    );
  });

  return resolvedProps as SkillCardBaseProps;
}

function resolveSkillCardResponsiveProp<T>(
  value: SkillCardResponsiveProp<T> | undefined,
  activeBreakpointKeys: ReadonlySet<string>,
): T | undefined {
  if (!isSkillCardResponsiveValue(value)) {
    return value;
  }

  const responsiveValue = value as SkillCardResponsiveValues<T>;
  const baseValue = Object.hasOwn(responsiveValue, 'base')
    ? responsiveValue.base
    : responsiveValue.default;

  return getSkillCardResponsiveEntries(responsiveValue).reduce<T | undefined>(
    (resolvedValue, entry) =>
      activeBreakpointKeys.has(entry.breakpoint.key)
        ? entry.value
        : resolvedValue,
    baseValue,
  );
}

function getSkillCardResponsiveBreakpointSignature(props: SkillCardProps) {
  const breakpointKeys = new Set<string>();

  SKILL_CARD_PROP_KEYS.forEach((propKey) => {
    const propValue = props[propKey];

    if (!isSkillCardResponsiveValue(propValue)) {
      return;
    }

    getSkillCardResponsiveEntries(propValue).forEach(({ breakpoint }) => {
      breakpointKeys.add(breakpoint.key);
    });
  });

  return Array.from(breakpointKeys)
    .map((breakpointKey) => getSkillCardBreakpoint(breakpointKey))
    .filter((breakpoint): breakpoint is SkillCardBreakpointConfig =>
      Boolean(breakpoint),
    )
    .sort(compareSkillCardBreakpoints)
    .map(({ key }) => key)
    .join('|');
}

function getSkillCardResponsiveEntries<T>(
  responsiveValue: SkillCardResponsiveValues<T>,
) {
  return Object.entries(responsiveValue)
    .map(([key, value], index) => {
      const breakpoint = getSkillCardBreakpoint(key);

      if (!breakpoint) {
        return null;
      }

      return { breakpoint, index, value: value as T };
    })
    .filter(
      (
        entry,
      ): entry is {
        breakpoint: SkillCardBreakpointConfig;
        index: number;
        value: T;
      } => Boolean(entry),
    )
    .sort(
      (firstEntry, secondEntry) =>
        compareSkillCardBreakpoints(
          firstEntry.breakpoint,
          secondEntry.breakpoint,
        ) || firstEntry.index - secondEntry.index,
    );
}

function getSkillCardBreakpoint(
  breakpointKey: string,
): SkillCardBreakpointConfig | null {
  if (SKILL_CARD_BASE_BREAKPOINT_KEYS.has(breakpointKey)) {
    return null;
  }

  if (isSkillCardTailwindBreakpoint(breakpointKey)) {
    return SKILL_CARD_TAILWIND_BREAKPOINTS[breakpointKey];
  }

  const match = breakpointKey.match(SKILL_CARD_CUSTOM_BREAKPOINT_PATTERN);

  if (!match) {
    return null;
  }

  const [, numericValue = '0', unit = 'px'] = match;
  const parsedValue = Number(numericValue);

  return {
    key: breakpointKey,
    query: `(min-width: ${numericValue}${unit})`,
    order: getSkillCardBreakpointOrder(parsedValue, unit),
  };
}

function getSkillCardBreakpointOrder(value: number, unit: string) {
  if (unit === 'rem' || unit === 'em') {
    return value * 16;
  }

  return value;
}

function compareSkillCardBreakpoints(
  firstBreakpoint: SkillCardBreakpointConfig,
  secondBreakpoint: SkillCardBreakpointConfig,
) {
  return firstBreakpoint.order - secondBreakpoint.order;
}

function isSkillCardTailwindBreakpoint(
  breakpointKey: string,
): breakpointKey is SkillCardTailwindBreakpoint {
  return breakpointKey in SKILL_CARD_TAILWIND_BREAKPOINTS;
}

function isSkillCardResponsiveValue(
  value: unknown,
): value is SkillCardResponsiveValues<unknown> {
  if (
    typeof value !== 'object' ||
    value === null ||
    Array.isArray(value) ||
    isValidElement(value)
  ) {
    return false;
  }

  if ('$$typeof' in value) {
    return false;
  }

  return Object.keys(value).some(
    (key) =>
      SKILL_CARD_BASE_BREAKPOINT_KEYS.has(key) ||
      isSkillCardTailwindBreakpoint(key) ||
      SKILL_CARD_CUSTOM_BREAKPOINT_PATTERN.test(key),
  );
}

function subscribeSkillCardBreakpoints(
  breakpointSignature: string,
  onStoreChange: () => void,
) {
  if (!breakpointSignature || typeof window === 'undefined') {
    return () => {};
  }

  const unsubscribes = getSkillCardBreakpointsFromSignature(
    breakpointSignature,
  ).map((breakpoint) =>
    subscribeSkillCardBreakpoint(breakpoint, onStoreChange),
  );

  return () => {
    unsubscribes.forEach((unsubscribe) => {
      unsubscribe();
    });
  };
}

function subscribeSkillCardBreakpoint(
  breakpoint: SkillCardBreakpointConfig,
  onStoreChange: () => void,
) {
  const subscription =
    skillCardMediaQuerySubscriptions.get(breakpoint.query) ??
    createSkillCardBreakpointSubscription(breakpoint.query);

  subscription.subscribers.add(onStoreChange);

  return () => {
    subscription.subscribers.delete(onStoreChange);

    if (subscription.subscribers.size === 0) {
      subscription.mediaQueryList.removeEventListener(
        'change',
        subscription.listener,
      );
      skillCardMediaQuerySubscriptions.delete(breakpoint.query);
    }
  };
}

function createSkillCardBreakpointSubscription(query: string) {
  const mediaQueryList = window.matchMedia(query);
  const subscribers = new Set<() => void>();
  const listener = () => {
    subscribers.forEach((subscriber) => {
      subscriber();
    });
  };
  const subscription = {
    mediaQueryList,
    listener,
    subscribers,
  } satisfies SkillCardMediaQuerySubscription;

  mediaQueryList.addEventListener('change', listener);
  skillCardMediaQuerySubscriptions.set(query, subscription);

  return subscription;
}

function getSkillCardBreakpointSnapshot(breakpointSignature: string) {
  if (!breakpointSignature || typeof window === 'undefined') {
    return '';
  }

  return getSkillCardBreakpointsFromSignature(breakpointSignature)
    .filter((breakpoint) => window.matchMedia(breakpoint.query).matches)
    .map(({ key }) => key)
    .join('|');
}

function getSkillCardServerSnapshot() {
  return '';
}

function getSkillCardBreakpointsFromSignature(breakpointSignature: string) {
  if (!breakpointSignature) {
    return [];
  }

  return breakpointSignature
    .split('|')
    .map((breakpointKey) => getSkillCardBreakpoint(breakpointKey))
    .filter((breakpoint): breakpoint is SkillCardBreakpointConfig =>
      Boolean(breakpoint),
    );
}

function getSkillCardActiveBreakpointKeys(viewportSignature: string) {
  return new Set(viewportSignature ? viewportSignature.split('|') : []);
}

function getSkillCardIndicators({
  indicatorIcons,
  showExternalLinkIndicator,
  showGithubIndicator,
}: {
  indicatorIcons?: SkillCardIndicatorIcons;
  showExternalLinkIndicator: boolean;
  showGithubIndicator: boolean;
}) {
  const icons = normalizeIndicatorIcons(indicatorIcons);

  if (showGithubIndicator) {
    icons.push(<GithubIcon />);
  }

  if (showExternalLinkIndicator) {
    icons.push(<ExternalLinkIcon />);
  }

  return icons;
}

function normalizeIndicatorIcons(indicatorIcons?: SkillCardIndicatorIcons) {
  if (!indicatorIcons) {
    return [];
  }

  return Array.isArray(indicatorIcons) ? [...indicatorIcons] : [indicatorIcons];
}

function SkillCardImage({
  image,
  imageAlt,
  imageFit,
  imageObjectPosition,
  imagePlacement,
  isInlineImage,
  hasCustomImageSize,
  className,
}: {
  image: ReactNode | string | undefined;
  imageAlt: string;
  imageFit: SkillCardImageFit;
  imageObjectPosition: string;
  imagePlacement: SkillCardImagePosition;
  isInlineImage: boolean;
  hasCustomImageSize: boolean;
  className?: string;
}) {
  return (
    <div
      className={cx(
        'min-w-0 shrink-0 overflow-hidden bg-white/[0.025]',
        isInlineImage
          ? cx(
              'h-28 lg:h-auto lg:w-[var(--skill-card-image-size)] lg:max-w-[var(--skill-card-image-max-size)] lg:min-w-[var(--skill-card-image-min-size)]',
              hasCustomImageSize
                ? 'w-[var(--skill-card-image-size)] max-w-[var(--skill-card-image-max-size)] min-w-[var(--skill-card-image-min-size)]'
                : 'w-full',
            )
          : 'h-[var(--skill-card-image-size)] w-full',
        imagePlacement === 'right' &&
          hasCustomImageSize &&
          'self-end lg:self-auto',
        imagePlacement === 'right' && 'lg:order-last',
        className,
      )}
    >
      {typeof image === 'string' ? (
        <span
          role={imageAlt ? 'img' : undefined}
          aria-label={imageAlt || undefined}
          className="block h-full w-full bg-no-repeat"
          style={{
            backgroundImage: `url("${image}")`,
            backgroundPosition: imageObjectPosition,
            backgroundSize: SKILL_CARD_IMAGE_BACKGROUND_SIZE[imageFit],
          }}
        />
      ) : (
        <div className="h-full w-full">{image}</div>
      )}
    </div>
  );
}

function getImageLayoutClassName(position: SkillCardImagePosition) {
  if (position === 'left' || position === 'right') {
    return 'flex flex-col lg:flex-row';
  }

  return 'flex flex-col';
}

function getImageGapClassName(position: SkillCardImagePosition) {
  if (position === 'top') {
    return 'gap-0';
  }

  return 'gap-4';
}

function shouldRenderImageBeforeContent(position: SkillCardImagePosition) {
  return position === 'top' || position === 'left' || position === 'right';
}

function GithubIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4"
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  );
}
