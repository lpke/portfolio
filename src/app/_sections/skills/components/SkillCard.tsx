import type { CSSProperties, ReactNode } from 'react';
import {
  SKILL_CARD_CLASS_NAMES,
  SKILL_CARD_IMAGE_BACKGROUND_SIZE,
  SKILL_CARD_IMAGE_DEFAULT_RATIOS,
  SKILL_CARD_PADDING_CLASS_NAMES,
  type SkillCardImageFit,
  type SkillCardImagePosition,
  type SkillCardType,
} from '../data/skills';
import { SkillChips, cx } from './shared';

export type { SkillCardImageFit, SkillCardImagePosition, SkillCardType };

type SkillCardStyle = CSSProperties & {
  '--skill-card-image-ratio'?: string;
};

type SkillCardProps = {
  title?: ReactNode;
  eyebrow?: ReactNode;
  description?: ReactNode;
  chips?: readonly string[];
  icon?: ReactNode;
  meta?: ReactNode;
  href?: string;
  type?: SkillCardType;
  image?: ReactNode | string;
  imageAlt?: string;
  imagePosition?: SkillCardImagePosition;
  imageRatio?: string;
  imageFit?: SkillCardImageFit;
  imageClassName?: string;
  className?: string;
  contentClassName?: string;
  ariaLabel?: string;
  children?: ReactNode;
};

export function SkillCard({
  title,
  eyebrow,
  description,
  chips,
  icon,
  meta,
  href,
  type = 'default',
  image,
  imageAlt = '',
  imagePosition = 'top',
  imageRatio,
  imageFit = 'contain',
  imageClassName,
  className,
  contentClassName,
  ariaLabel,
  children,
}: SkillCardProps) {
  const isLinked = Boolean(href);
  const hasImage = Boolean(image);
  const resolvedImageRatio =
    imageRatio ?? SKILL_CARD_IMAGE_DEFAULT_RATIOS[imagePosition];
  const style: SkillCardStyle = {
    '--skill-card-image-ratio': resolvedImageRatio,
  };
  const cardPaddingClassName = SKILL_CARD_PADDING_CLASS_NAMES[type];
  const cardClassName = cx(
    'group/skill-card relative isolate min-w-0 overflow-hidden rounded-[8px] border transition-[background-color,filter] duration-200',
    SKILL_CARD_CLASS_NAMES[type],
    !hasImage && cardPaddingClassName,
    isLinked && 'block cursor-pointer hover:brightness-110',
    className,
  );

  const body = (
    <div
      className={cx(
        'relative min-w-0 gap-4',
        hasImage && getImageLayoutClassName(imagePosition),
      )}
    >
      {hasImage && shouldRenderImageBeforeContent(imagePosition) && (
        <SkillCardImage
          image={image}
          imageAlt={imageAlt}
          imageFit={imageFit}
          imagePosition={imagePosition}
          className={imageClassName}
        />
      )}
      <div
        className={cx(
          'relative min-w-0',
          hasImage && cardPaddingClassName,
          contentClassName,
        )}
      >
        {(eyebrow || icon || meta || (isLinked && !meta)) && (
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

            {(meta || isLinked) && (
              <span className="text-on-surface-variant/75 shrink-0">
                {meta ?? <ExternalLinkIcon />}
              </span>
            )}
          </div>
        )}

        {title && (
          <h4
            className={cx(
              'font-headline min-w-0 font-bold text-white',
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
      {hasImage && !shouldRenderImageBeforeContent(imagePosition) && (
        <SkillCardImage
          image={image}
          imageAlt={imageAlt}
          imageFit={imageFit}
          imagePosition={imagePosition}
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

function SkillCardImage({
  image,
  imageAlt,
  imageFit,
  imagePosition,
  className,
}: {
  image: ReactNode | string | undefined;
  imageAlt: string;
  imageFit: SkillCardImageFit;
  imagePosition: SkillCardImagePosition;
  className?: string;
}) {
  return (
    <div
      className={cx(
        'min-w-0 shrink-0 overflow-hidden bg-white/[0.025]',
        imagePosition === 'left' || imagePosition === 'right'
          ? 'h-28 w-full lg:h-auto lg:w-[var(--skill-card-image-ratio)]'
          : 'h-[var(--skill-card-image-ratio)] w-full',
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

function shouldRenderImageBeforeContent(position: SkillCardImagePosition) {
  return position === 'top' || position === 'left';
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
