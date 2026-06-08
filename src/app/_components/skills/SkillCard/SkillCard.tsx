'use client';

import { isValidElement, type CSSProperties, type MouseEvent } from 'react';
import {
  SKILL_CARD_CLASS_NAMES,
  SKILL_CARD_IMAGE_DEFAULT_SIZES,
  SKILL_CARD_PADDING_CLASS_NAMES,
  SKILL_CARD_SPAN_CLASS_NAMES,
} from '@/utils/constants';
import { Modal } from '@/components/Modal';
import type { ModalContentProps } from '@/components/Modal';
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
  cardless,
  icon,
  indicatorIcons,
  showExternalLinkIndicator,
  showGithubIndicator,
  href,
  modal,
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
  imageColor,
  imageClassName,
  className,
  contentClassName,
  ariaLabel,
  children,
}: SkillCardResolvedBaseProps) {
  const hasModal = Boolean(modal);
  const effectiveHref = hasModal ? undefined : href;
  const isLinked = Boolean(effectiveHref);
  const isInteractive = isLinked || hasModal;
  const hasImage = Boolean(image);
  const resolvedType = type ?? (hasImage ? 'feature' : 'default');
  const resolvedIndicatorIcons = getSkillCardIndicators({
    indicatorIcons,
    showExternalLinkIndicator: showExternalLinkIndicator ?? isLinked,
    showGithubIndicator: showGithubIndicator ?? false,
  });
  const resolvedImagePosition = imagePosition;
  const resolvedImageSize = getImageSize({
    imagePosition: resolvedImagePosition,
    imageSize,
  });
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
  const stripCardPadding = cardless === 'strip-padding';
  const cardPaddingClassName = stripCardPadding
    ? ''
    : SKILL_CARD_PADDING_CLASS_NAMES[resolvedType];
  const cardClassName = cx(
    'group/skill-card relative isolate h-full min-w-0 transition-[background-color,filter] duration-200',
    !cardless && 'overflow-hidden rounded-[8px] border',
    SKILL_CARD_SPAN_CLASS_NAMES[cardSpan],
    !cardless && SKILL_CARD_CLASS_NAMES[resolvedType],
    !hasImage && cardPaddingClassName,
    isInteractive && 'block cursor-pointer hover:brightness-105',
    className,
  );

  const body = (
    <div
      className={cx(
        'relative z-10 h-full min-w-0',
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
          imageColor={imageColor}
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
        isInteractive={isInteractive}
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
          imageColor={imageColor}
          isInlineImage={isInlineImage}
          className={imageClassName}
        />
      )}
    </div>
  );

  if (hasModal) {
    const modalProps = getModalProps(modal);

    return (
      <Modal
        trigger={
          <>
            {!cardless && (
              <SurfaceOverlay className="bg-[color:color-mix(in_srgb,var(--skill-accent)_7%,rgba(255,255,255,0.045))] opacity-0 transition-opacity duration-200 group-hover/skill-card:opacity-100" />
            )}
            {body}
          </>
        }
        triggerClassName={cx(
          cardClassName,
          'w-full appearance-none p-0 text-left leading-normal font-[inherit]',
        )}
        triggerStyle={style}
        triggerAriaLabel={
          ariaLabel ?? (typeof title === 'string' ? title : 'Open skill card')
        }
        modalAriaLabel={
          modalProps.modalAriaLabel ??
          (typeof title === 'string'
            ? `${title} details`
            : 'Skill card details')
        }
        title={modalProps.title}
        titleSize={modalProps.titleSize}
        hideCloseButton={modalProps.hideCloseButton}
        className={modalProps.className}
        classNameFloating={modalProps.classNameFloating}
        classNameSheet={modalProps.classNameSheet}
        padding={modalProps.padding}
      >
        {modalProps.children}
      </Modal>
    );
  }

  if (effectiveHref) {
    return (
      <article aria-label={ariaLabel} className={cardClassName} style={style}>
        {!cardless && (
          <SurfaceOverlay className="bg-[color:color-mix(in_srgb,var(--skill-accent)_7%,rgba(255,255,255,0.045))] opacity-0 transition-opacity duration-200 group-hover/skill-card:opacity-100" />
        )}
        <a
          href={effectiveHref}
          target="_blank"
          rel="noreferrer"
          aria-label={ariaLabel ?? getLinkAriaLabel(title)}
          className="focus-visible:ring-offset-surface-container absolute inset-0 z-0 rounded-[inherit] outline-none focus-visible:z-30 focus-visible:ring-2 focus-visible:ring-[var(--skill-accent)] focus-visible:ring-offset-2"
        />
        <div
          onClick={(event) => {
            handleLinkedCardClick(event, effectiveHref);
          }}
          className="h-full"
        >
          {body}
        </div>
      </article>
    );
  }

  return (
    <article aria-label={ariaLabel} className={cardClassName} style={style}>
      {body}
    </article>
  );
}

function getLinkAriaLabel(title: SkillCardResolvedBaseProps['title']) {
  return typeof title === 'string' ? title : 'Open skill card link';
}

function handleLinkedCardClick(
  event: MouseEvent<HTMLDivElement>,
  href: string,
) {
  if (event.defaultPrevented || isNestedInteractiveTarget(event.target)) {
    return;
  }

  window.open(href, '_blank', 'noopener,noreferrer');
}

function isNestedInteractiveTarget(target: EventTarget | null) {
  return (
    target instanceof Element &&
    Boolean(target.closest('a, button, input, select, textarea, summary'))
  );
}

function getImageLayoutClassName(position: SkillCardImagePosition) {
  if (position === 'left' || position === 'right') {
    return 'flex flex-row';
  }

  return 'flex flex-col';
}

function getImageGapClassName(position: SkillCardImagePosition) {
  if (position === 'top' || position === 'bottom') {
    return 'gap-0';
  }

  return 'gap-4';
}

function shouldRenderImageBeforeContent(position: SkillCardImagePosition) {
  return position === 'top' || position === 'left' || position === 'right';
}

function getImageSize({
  imagePosition,
  imageSize,
}: {
  imagePosition: SkillCardImagePosition;
  imageSize?: string;
}) {
  if (
    imageSize &&
    isStackedImagePosition(imagePosition) &&
    isPercentageImageSize(imageSize)
  ) {
    return SKILL_CARD_IMAGE_DEFAULT_SIZES[imagePosition];
  }

  return imageSize ?? SKILL_CARD_IMAGE_DEFAULT_SIZES[imagePosition];
}

function isStackedImagePosition(position: SkillCardImagePosition) {
  return position === 'top' || position === 'bottom';
}

function isPercentageImageSize(imageSize: string) {
  return imageSize.includes('%');
}

function getModalProps(
  modal: SkillCardResolvedBaseProps['modal'],
): ModalContentProps {
  if (isModalContentProps(modal)) {
    return modal;
  }

  return {
    children: modal,
  };
}

function isModalContentProps(
  modal: SkillCardResolvedBaseProps['modal'],
): modal is ModalContentProps {
  return (
    typeof modal === 'object' &&
    modal !== null &&
    !Array.isArray(modal) &&
    !isValidElement(modal) &&
    'children' in modal
  );
}
