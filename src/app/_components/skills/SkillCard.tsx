import type { CSSProperties, ReactNode } from 'react';
import {
  SKILL_CARD_CLASS_NAMES,
  SKILL_CARD_IMAGE_BACKGROUND_SIZE,
  SKILL_CARD_IMAGE_DEFAULT_RATIOS,
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
  '--skill-card-image-ratio'?: string;
  '--skill-card-image-width'?: string;
  '--skill-card-image-min-width'?: string;
  '--skill-card-image-max-width'?: string;
};

type SkillCardIndicatorIcons = ReactNode | readonly ReactNode[];

type SkillCardProps = {
  title?: ReactNode;
  eyebrow?: ReactNode;
  description?: ReactNode;
  chips?: readonly string[];
  icon?: ReactNode;
  indicatorIcons?: SkillCardIndicatorIcons;
  showExternalLinkIndicator?: boolean;
  showGithubIndicator?: boolean;
  href?: string;
  type?: SkillCardType;
  cardSpan?: SkillCardSpan;
  image?: ReactNode | string;
  imageAlt?: string;
  imagePosition?: SkillCardImagePosition;
  imageRatio?: string;
  imageWidth?: string;
  imageMinWidth?: string;
  imageMaxWidth?: string;
  imageFit?: SkillCardImageFit;
  imageClassName?: string;
  className?: string;
  contentClassName?: string;
  ariaLabel?: string;
  children?: ReactNode;
};

export function SkillCard({
  title,
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
  imageRatio,
  imageWidth,
  imageMinWidth,
  imageMaxWidth,
  imageFit = 'contain',
  imageClassName,
  className,
  contentClassName,
  ariaLabel,
  children,
}: SkillCardProps) {
  const isLinked = Boolean(href);
  const hasImage = Boolean(image);
  const resolvedType = type ?? (hasImage ? 'feature' : 'default');
  const resolvedIndicatorIcons = getSkillCardIndicators({
    indicatorIcons,
    showExternalLinkIndicator: showExternalLinkIndicator ?? isLinked,
    showGithubIndicator,
  });
  const resolvedImageRatio =
    imageRatio ?? SKILL_CARD_IMAGE_DEFAULT_RATIOS[imagePosition];
  const isInlineImage = imagePosition === 'left' || imagePosition === 'right';
  const style: SkillCardStyle = {
    '--skill-card-image-ratio': resolvedImageRatio,
    ...(isInlineImage
      ? {
          '--skill-card-image-width': imageWidth ?? resolvedImageRatio,
          '--skill-card-image-min-width': imageMinWidth ?? '0%',
          '--skill-card-image-max-width': imageMaxWidth ?? '100%',
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
          imagePlacement={imagePosition}
          isInlineImage={isInlineImage}
          className={imageClassName}
        />
      )}
      <SkillCardContent
        title={title}
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
          imagePlacement={imagePosition}
          isInlineImage={isInlineImage}
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
            {icon && (
              <span className="text-[var(--skill-accent)]">{icon}</span>
            )}
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
            type === 'feature'
              ? 'text-xl leading-tight lg:text-2xl'
              : 'text-base leading-snug lg:text-lg',
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
  imagePlacement,
  isInlineImage,
  className,
}: {
  image: ReactNode | string | undefined;
  imageAlt: string;
  imageFit: SkillCardImageFit;
  imagePlacement: SkillCardImagePosition;
  isInlineImage: boolean;
  className?: string;
}) {
  return (
    <div
      className={cx(
        'min-w-0 shrink-0 overflow-hidden bg-white/[0.025]',
        isInlineImage
          ? 'h-28 w-full lg:h-auto lg:w-[var(--skill-card-image-width)] lg:max-w-[var(--skill-card-image-max-width)] lg:min-w-[var(--skill-card-image-min-width)]'
          : 'h-[var(--skill-card-image-ratio)] w-full',
        imagePlacement === 'right' && 'lg:order-last',
        className,
      )}
    >
      {typeof image === 'string' ? (
        <span
          role={imageAlt ? 'img' : undefined}
          aria-label={imageAlt || undefined}
          className="block h-full w-full bg-center bg-no-repeat"
          style={{
            backgroundImage: `url("${image}")`,
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
