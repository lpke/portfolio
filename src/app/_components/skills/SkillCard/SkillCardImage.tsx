import type { CSSProperties, ReactNode } from 'react';
import { SKILL_CARD_IMAGE_BACKGROUND_SIZE } from '@/utils/constants';
import type { SkillCardImageFit, SkillCardImagePosition } from './types';
import { cx } from '../shared';

type SkillCardImageProps = {
  image: ReactNode | string | undefined;
  imageAlt: string;
  imageBlurBackground: boolean;
  imageFit: SkillCardImageFit;
  imageObjectPosition: string;
  imageObjectScale: number | string;
  imagePlacement: SkillCardImagePosition;
  imageColor?: CSSProperties['backgroundColor'];
  isInlineImage: boolean;
  className?: string;
};

export function SkillCardImage({
  image,
  imageAlt,
  imageBlurBackground,
  imageFit,
  imageObjectPosition,
  imageObjectScale,
  imagePlacement,
  imageColor,
  isInlineImage,
  className,
}: SkillCardImageProps) {
  const shouldRenderBlurBackground =
    typeof image === 'string' && imageBlurBackground && imageFit !== 'cover';

  return (
    <div
      className={cx(
        'relative min-w-0 shrink-0 overflow-hidden bg-white/[0.025]',
        isInlineImage
          ? 'w-[var(--skill-card-image-size)] max-w-[var(--skill-card-image-max-size)] min-w-[var(--skill-card-image-min-size)] self-stretch'
          : 'h-[var(--skill-card-image-size)] w-full',
        imagePlacement === 'right' && 'order-last',
        className,
      )}
      style={imageColor ? { backgroundColor: imageColor } : undefined}
    >
      {typeof image === 'string' ? (
        <>
          {shouldRenderBlurBackground && (
            <span
              aria-hidden="true"
              className="absolute inset-0 scale-110 bg-cover bg-no-repeat opacity-70 blur-xl"
              style={{
                backgroundImage: `url("${image}")`,
                backgroundPosition: imageObjectPosition,
              }}
            />
          )}
          <span
            role={imageAlt ? 'img' : undefined}
            aria-label={imageAlt || undefined}
            className="relative block h-full w-full bg-no-repeat"
            style={{
              backgroundImage: `url("${image}")`,
              backgroundPosition: imageObjectPosition,
              backgroundSize: SKILL_CARD_IMAGE_BACKGROUND_SIZE[imageFit],
              transform: `scale(${imageObjectScale})`,
              transformOrigin: imageObjectPosition,
            }}
          />
        </>
      ) : (
        <div className="h-full w-full">{image}</div>
      )}
    </div>
  );
}
