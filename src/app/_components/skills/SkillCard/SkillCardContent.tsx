import type { ReactNode } from 'react';
import { SKILL_CARD_TITLE_SIZE_CLASS_NAMES } from './defaults';
import type { SkillCardImagePosition, SkillCardTitleSize } from './types';
import { SkillChips, cx } from '../shared';

type SkillCardContentProps = {
  title?: ReactNode;
  titleSize: SkillCardTitleSize;
  eyebrow?: ReactNode;
  description?: ReactNode;
  chips?: readonly string[];
  icon?: ReactNode;
  indicatorIcons: ReactNode[];
  isInteractive: boolean;
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
  isInteractive,
  hasImage,
  imagePosition,
  cardPaddingClassName,
  className,
  children,
}: SkillCardContentProps) {
  const hasLeadingMetadata = Boolean(eyebrow || icon);
  const hasIndicatorIcons = indicatorIcons.length > 0;
  const titleClassName = cx(
    'font-headline min-w-0 font-bold text-white transition-colors duration-200',
    isInteractive && 'group-hover/skill-card:text-[var(--skill-accent)]',
    SKILL_CARD_TITLE_SIZE_CLASS_NAMES[titleSize],
  );
  const renderedIndicatorIcons = hasIndicatorIcons && (
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
  );

  return (
    <div
      className={cx(
        'relative min-w-0',
        '[--skill-card-eyebrow-color:color-mix(in_srgb,var(--skill-accent)_44%,white)]',
        hasImage && cardPaddingClassName,
        hasImage && imagePosition === 'top' && 'pt-4 lg:pt-5',
        hasImage &&
          (imagePosition === 'left' || imagePosition === 'right') &&
          'flex-1',
        className,
      )}
    >
      {hasLeadingMetadata && (
        <div className="mb-3 flex min-w-0 items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            {icon && <span className="text-[var(--skill-accent)]">{icon}</span>}
            {eyebrow && (
              <span className="font-label min-w-0 truncate text-[11px] font-bold tracking-widest text-[var(--skill-card-eyebrow-color)] uppercase">
                {eyebrow}
              </span>
            )}
          </div>

          {renderedIndicatorIcons}
        </div>
      )}

      {title &&
        (hasIndicatorIcons && !hasLeadingMetadata ? (
          <div className="flex min-w-0 items-start justify-between gap-3">
            <h4 className={cx(titleClassName, 'flex-1')}>{title}</h4>
            {renderedIndicatorIcons}
          </div>
        ) : (
          <h4 className={titleClassName}>{title}</h4>
        ))}

      {!title && hasIndicatorIcons && !hasLeadingMetadata && (
        <div className="mb-3 flex justify-end">{renderedIndicatorIcons}</div>
      )}

      {description && (
        <p
          className={cx(
            'text-on-surface-variant leading-relaxed',
            title ? 'mt-2' : '',
            'text-sm lg:text-[15px]',
            '[&_a]:relative [&_a]:z-30 [&_a]:font-normal [&_a]:text-[color:color-mix(in_srgb,var(--skill-card-eyebrow-color)_84%,transparent)] [&_a]:underline [&_a]:decoration-[color:color-mix(in_srgb,currentColor_45%,transparent)] [&_a]:underline-offset-[3px] [&_a]:transition-colors [&_a:hover]:text-white',
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
