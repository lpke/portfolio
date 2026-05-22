'use client';

import type { CSSProperties } from 'react';
import {
  SKILL_CARD_CLASS_NAMES,
  SKILL_CARD_IMAGE_DEFAULT_SIZES,
  SKILL_CARD_PADDING_CLASS_NAMES,
  SKILL_CARD_SPAN_CLASS_NAMES,
} from '@/utils/constants';
import { SurfaceOverlay } from '@/components/SurfaceOverlay';
import type { SkillCardResolvedBaseProps } from './defaults';
import { getSkillCardIndicators } from './icons';
import { useResolvedSkillCardProps } from './responsive';
import { SkillCardContent } from './SkillCardContent';
import { SkillCardImage } from './SkillCardImage';
import type {
  SkillCardImageFit,
  SkillCardImagePosition,
  SkillCardProps,
  SkillCardSpan,
  SkillCardType,
} from './types';
import { cx } from '../shared';

export type {
  SkillCardImageFit,
  SkillCardImagePosition,
  SkillCardProps,
  SkillCardSpan,
  SkillCardType,
};

type SkillCardStyle = CSSProperties & {
  '--skill-card-image-size'?: string;
  '--skill-card-image-min-size'?: string;
  '--skill-card-image-max-size'?: string;
};

export function SkillCard(props: SkillCardProps) {
  const resolvedProps = useResolvedSkillCardProps(props);

  return <SkillCardRoot {...resolvedProps} />;
}

function SkillCardRoot({
  title,
  titleSize,
  eyebrow,
  description,
  chips,
  icon,
  indicatorIcons,
  showExternalLinkIndicator,
  showGithubIndicator,
  href,
  type,
  cardSpan,
  cardHeight,
  cardMinHeight,
  cardMaxHeight,
  image,
  imageAlt,
  imagePosition,
  imageSize,
  imageMinSize,
  imageMaxSize,
  imageFit,
  imageObjectPosition,
  imageObjectScale,
  imageBlurBackground,
  imageClassName,
  className,
  contentClassName,
  ariaLabel,
  children,
}: SkillCardResolvedBaseProps) {
  const isLinked = Boolean(href);
  const hasImage = Boolean(image);
  const resolvedType = type ?? (hasImage ? 'feature' : 'default');
  const resolvedIndicatorIcons = getSkillCardIndicators({
    indicatorIcons,
    showExternalLinkIndicator: showExternalLinkIndicator ?? isLinked,
    showGithubIndicator: showGithubIndicator ?? false,
  });
  const resolvedImagePosition = imagePosition;
  const resolvedImageSize =
    imageSize ?? SKILL_CARD_IMAGE_DEFAULT_SIZES[resolvedImagePosition];
  const isInlineImage =
    resolvedImagePosition === 'left' || resolvedImagePosition === 'right';
  const style: SkillCardStyle = {
    height: cardHeight,
    minHeight: cardMinHeight,
    maxHeight: cardMaxHeight,
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
    'group/skill-card relative isolate h-full min-w-0 overflow-hidden rounded-[8px] border transition-[background-color,filter] duration-200',
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
        hasImage && getImageLayoutClassName(resolvedImagePosition),
        hasImage && getImageGapClassName(resolvedImagePosition),
        hasImage && isInlineImage && 'h-full',
      )}
    >
      {hasImage && shouldRenderImageBeforeContent(resolvedImagePosition) && (
        <SkillCardImage
          image={image}
          imageAlt={imageAlt}
          imageBlurBackground={imageBlurBackground}
          imageFit={imageFit}
          imageObjectPosition={imageObjectPosition}
          imageObjectScale={imageObjectScale}
          imagePlacement={resolvedImagePosition}
          isInlineImage={isInlineImage}
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
        imagePosition={resolvedImagePosition}
        cardPaddingClassName={cardPaddingClassName}
        className={contentClassName}
      >
        {children}
      </SkillCardContent>
      {hasImage && !shouldRenderImageBeforeContent(resolvedImagePosition) && (
        <SkillCardImage
          image={image}
          imageAlt={imageAlt}
          imageBlurBackground={imageBlurBackground}
          imageFit={imageFit}
          imageObjectPosition={imageObjectPosition}
          imageObjectScale={imageObjectScale}
          imagePlacement={resolvedImagePosition}
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

function getImageLayoutClassName(position: SkillCardImagePosition) {
  if (position === 'left' || position === 'right') {
    return 'flex flex-row';
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
